import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleStop,
  Info,
  Loader2,
  Pause,
  Play,
  Plug,
  RotateCcw,
  Save,
  Send,
  X,
} from "lucide-react";
import { m } from "@paraglide/messages";
import { toast } from "sonner";
import { ErrorBanner } from "@/components/error-banner";
import { GenerateStep, type GenerateState } from "@/components/generate-step";
import { MessageEditor } from "@/components/message-editor";
import { RecipientsStep } from "@/components/recipients-step";
import { TemplateStep } from "@/components/template-step";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import { plural } from "@/lib/plural";
import { slotCoverage } from "../../../shared/generate";
import { normalizeIdentity, senderIdentityWarning } from "../../../shared/sender-identity";
import { messageCoverage } from "../../../shared/send";
import {
  DEFAULT_RATE_LIMIT_DELAY_MS,
  parseRateLimitMs,
  RATE_LIMIT_MAX_MS,
  RATE_LIMIT_MIN_MS,
  RATE_LIMIT_STEP_MS,
  SETTING_KEYS,
} from "../../../shared/settings";
import type {
  MessageTemplate,
  Recipient,
  SendJob,
  SendStartPayload,
  Template,
} from "../../../shared/ipc";

export const Route = createFileRoute("/compose")({
  component: ComposePage,
});

/**
 * The 6-step compose wizard (spec decision 8). Ticket 13 built steps
 * 1 (recipients), 2 (template), and 5 (generate & review); ticket 15
 * completes steps 3 (message), 4 (SMTP), and 6 (send) end to end.
 * Wizard state lives in React and is handed forward step by step; step 5
 * records the generated-only recipient list for the send step, excluding
 * failures automatically.
 */

const WIZARD_STEPS = [
  { n: 1, label: () => m["compose.stepRecipients"]() },
  { n: 2, label: () => m["compose.stepTemplate"]() },
  { n: 3, label: () => m["compose.stepMessage"]() },
  { n: 4, label: () => m["compose.stepSmtp"]() },
  { n: 5, label: () => m["compose.stepGenerate"]() },
  { n: 6, label: () => m["compose.stepSend"]() },
] as const;

/** The SMTP identity + sender fields the wizard carries from step 4. */
interface SmtpFormState {
  mode: "profile" | "inline";
  profileId: string | null;
  host: string;
  port: string;
  username: string;
  password: string;
  saveAsProfile: boolean;
  profileName: string;
  senderName: string;
  senderAddress: string;
  /** The per-job Reply-To (ticket 01); blank sends no Reply-To header. */
  replyTo: string;
  delayMs: number;
}

const INITIAL_SMTP: SmtpFormState = {
  mode: "profile",
  profileId: null,
  host: "",
  port: "587",
  username: "",
  password: "",
  saveAsProfile: false,
  profileName: "",
  senderName: "",
  senderAddress: "",
  replyTo: "",
  delayMs: DEFAULT_RATE_LIMIT_DELAY_MS,
};

/** One per-recipient log row (names seeded from the job; `skipped` appears on cancel). */
interface SendLogRow {
  status: "sent" | "failed" | "skipped" | null;
  messageId: string | null;
  error: string | null;
  name: string;
}

/**
 * The running log's initial rows: every recipient with its name, so the
 * per-recipient list reads correctly before the first event lands.
 */
function seedResults(job: SendJob): Record<string, SendLogRow> {
  return Object.fromEntries(
    job.recipients.map((r) => [
      r.recipientId,
      { status: null, messageId: null, error: null, name: r.recipientName },
    ]),
  );
}

/** The live state of a send job in the wizard. */
type SendState =
  | { kind: "idle" }
  | { kind: "starting" }
  | {
      kind: "running";
      jobId: string;
      total: number;
      current: number;
      paused: boolean;
      results: Record<string, SendLogRow>;
    }
  | { kind: "paused"; jobId: string; job: SendJob; windingDown: boolean }
  | { kind: "done"; jobId: string; job: SendJob }
  | { kind: "cancelled"; jobId: string; job: SendJob }
  | { kind: "error"; message: string; jobId: string | null };

function ComposePage() {
  const [step, setStep] = useState<number>(1);
  const [selection, setSelection] = useState<Map<string, Recipient>>(new Map());
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [generate, setGenerate] = useState<GenerateState>({ kind: "idle" });
  // The send handoff: only recipients with confirmed output (ticket 13).
  const [sendRecipientIds, setSendRecipientIds] = useState<string[]>([]);
  const [message, setMessage] = useState({ subject: "", bodyHtml: "" });
  const [smtp, setSmtp] = useState<SmtpFormState>(INITIAL_SMTP);
  const [send, setSend] = useState<SendState>({ kind: "idle" });

  // The Logs retry pre-fill arrives through the router's location state
  // (the job detail navigates here with it); a plain sidebar visit has
  // none and the wizard starts empty.
  const routerState = useRouterState({ select: (state) => state.location.state });
  const prefill = routerState.composePrefill ?? null;

  const templatesQuery = useQuery({
    queryKey: ["templates", "list"],
    queryFn: () => window.api.templates.list(),
  });
  const templates = templatesQuery.data ?? [];
  const template = templates.find((t) => t.id === templateId) ?? null;

  // Message Templates (ticket 03): the pick select on the message step
  // and the "Save as template" action. The step's copy-on-pick contract
  // means the job never references a template - picking only seeds the
  // job's own subject/body state below.
  const queryClient = useQueryClient();
  const messageTemplatesQuery = useQuery({
    queryKey: ["messageTemplates", "list"],
    queryFn: () => window.api.messageTemplates.list(),
  });
  const messageTemplates = messageTemplatesQuery.data ?? [];
  const [saveAsOpen, setSaveAsOpen] = useState(false);
  const saveAsMutation = useMutation({
    mutationFn: (payload: Parameters<typeof window.api.messageTemplates.create>[0]) =>
      window.api.messageTemplates.create(payload),
    onSuccess: (created) => {
      toast.success(m["messages.saveAsCreated"]({ name: created.name }));
      setSaveAsOpen(false);
      void queryClient.invalidateQueries({ queryKey: ["messageTemplates"] });
    },
    onError: (err) => {
      setSaveAsOpen(false);
      toast.error(errorMessage(err, m["messages.couldNotSave"]()));
    },
  });

  const pickMessageTemplate = (id: string): void => {
    const picked = messageTemplates.find((t) => t.id === id);
    if (picked === undefined) return;
    // Copy-on-pick (ADR 0005): the template's subject and body become the
    // job's own editable copy; nothing references the template from here on.
    setMessage({ subject: picked.subject, bodyHtml: picked.bodyHtml });
  };

  const selectedRecipients = useMemo(() => [...selection.values()], [selection]);

  const coverage = useMemo(
    () => slotCoverage(selectedRecipients, template?.slots ?? []),
    [selectedRecipients, template],
  );

  const messageReport = useMemo(
    () => messageCoverage(selectedRecipients, `${message.subject} ${message.bodyHtml}`),
    [selectedRecipients, message],
  );

  /** The step-4 validity the wizard gates on (sender + one SMTP identity). */
  const smtpValid =
    smtp.senderName.trim() !== "" &&
    smtp.senderAddress.trim() !== "" &&
    (smtp.mode === "profile"
      ? smtp.profileId !== null
      : smtp.host.trim() !== "" &&
        Number.isInteger(Number(smtp.port)) &&
        Number(smtp.port) > 0 &&
        Number(smtp.port) < 65536 &&
        smtp.username.trim() !== "" &&
        smtp.password !== "");

  const messageValid =
    message.subject.trim() !== "" &&
    message.bodyHtml.trim() !== "" &&
    messageReport.unknownSlots.length === 0;

  const canNext =
    step === 1
      ? selection.size > 0
      : step === 2
        ? template !== null && coverage.ok
        : step === 3
          ? messageValid
          : step === 4
            ? smtpValid
            : generate.kind === "done";

  const nextStep = (): void => setStep((s) => Math.min(6, s + 1));
  const backStep = (): void => setStep((s) => Math.max(1, s - 1));

  const failedCount =
    generate.kind === "done"
      ? generate.job.recipients.filter((r) => r.status === "failed").length
      : 0;

  // A finished generate is bound to the selection and template it was
  // started from; changing either invalidates the done state and the send
  // handoff, so the wizard can never hand a stale job forward. The send
  // state is bound to the same handoff - a stale job snapshot would leave
  // step 6 showing an old completion summary with no way to send the new
  // selection, so it resets with the handoff. Toggling a recipient on and
  // off back to the same set keeps the job valid.
  useEffect(() => {
    if (generate.kind !== "done") return;
    const nowBound = [...selection.keys()].toSorted().join(",");
    if (generate.bound.recipientIds !== nowBound || generate.bound.templateId !== templateId) {
      setGenerate({ kind: "idle" });
      setSendRecipientIds([]);
      setSend({ kind: "idle" });
    }
  }, [selection, templateId, generate]);

  // Load the stored rate limit once; the step-4 slider writes it back
  // live, so the gate and every slider agree. A Logs retry pre-fill
  // carries the original job's pacing instead.
  useEffect(() => {
    if (prefill !== null) return;
    window.api.settings
      .get(SETTING_KEYS.rateLimitDelayMs)
      .then((raw) => setSmtp((prev) => ({ ...prev, delayMs: parseRateLimitMs(raw) })))
      .catch(() => undefined);
  }, [prefill]);

  // The Logs retry pre-fill (ticket 16): the failed recipients, template,
  // message, and SMTP identity of a finished job, applied once on mount.
  // The wizard then runs its normal flow, and step 6's send creates a NEW
  // job scoped to those recipients. The inline password is never carried
  // (the bridge never echoes a stored credential), so the user re-enters
  // it at step 4 - the notice below says so.
  const prefillAppliedRef = useRef(false);
  const [prefillNotice, setPrefillNotice] = useState<string | null>(null);
  useEffect(() => {
    if (prefill === null || prefillAppliedRef.current) return;
    prefillAppliedRef.current = true;
    const apply = async (): Promise<void> => {
      const recipients = (
        await Promise.all(prefill.recipientIds.map((id) => window.api.recipients.get(id)))
      ).filter((recipient): recipient is Recipient => recipient !== null);
      if (recipients.length > 0) {
        setSelection(new Map(recipients.map((recipient) => [recipient.id, recipient])));
      }
      if (prefill.templateId !== null) setTemplateId(prefill.templateId);
      setMessage(prefill.message);
      setSmtp({
        ...INITIAL_SMTP,
        ...prefill.smtp,
        password: "",
        delayMs: prefill.delayMs,
      });
      const missing = prefill.recipientIds.length - recipients.length;
      const parts = [
        plural(
          recipients.length,
          m["compose.prefillRetryOne"],
          m["compose.prefillRetryOther"],
        ),
      ];
      if (prefill.smtp.mode === "inline") {
        parts.push(m["compose.prefillReenterPassword"]());
      }
      if (missing > 0) {
        parts.push(
          plural(missing, m["compose.prefillDeletedOne"], m["compose.prefillDeletedOther"]),
        );
      }
      setPrefillNotice(parts.join(" "));
    };
    void apply();
  }, [prefill]);

  return (
    <div className="flex h-full flex-col">
      <header className="px-6 pb-4 pt-6">
        <h1 className="text-2xl font-semibold">{m["compose.title"]()}</h1>
        <p className="text-sm text-muted-foreground">{m["compose.description"]()}</p>
      </header>

      <WizardStepper
        current={step}
        onGoTo={setStep}
        done={stepDone({ selection, template, coverage, messageValid, smtpValid, generate })}
      />

      {prefillNotice !== null && (
        <div className="mx-6 mt-4 flex items-start gap-2 rounded-lg border border-sky-600/40 bg-sky-600/10 px-4 py-2.5 text-sm text-sky-900">
          <Info className="mt-0.5 size-4 shrink-0" />
          <span>{prefillNotice}</span>
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6 pb-4">
        {step === 1 && <RecipientsStep selection={selection} onSelectionChange={setSelection} />}
        {step === 2 && (
          <TemplateStep
            templates={templates}
            template={template}
            onTemplateChange={setTemplateId}
            selectedRecipients={selectedRecipients}
            coverage={coverage}
          />
        )}
        {step === 3 && (
          <MessageStep
            recipients={selectedRecipients}
            message={message}
            onChange={setMessage}
            messageTemplates={messageTemplates}
            onPickTemplate={pickMessageTemplate}
            onSaveAsTemplate={() => setSaveAsOpen(true)}
            saveAsPending={saveAsMutation.isPending}
          />
        )}
        {step === 4 && <SmtpStep config={smtp} onChange={setSmtp} />}
        {step === 5 && (
          <GenerateStep
            recipients={selectedRecipients}
            template={template}
            state={generate}
            onStateChange={setGenerate}
            onGenerated={setSendRecipientIds}
          />
        )}
        {step === 6 && (
          <SendStep
            recipientIds={sendRecipientIds}
            generateJobId={generate.kind === "done" ? generate.jobId : null}
            message={message}
            smtp={smtp}
            state={send}
            onStateChange={setSend}
          />
        )}
      </div>

      <footer className="flex items-center justify-between border-t px-6 py-4">
        <Button variant="outline" onClick={backStep} disabled={step === 1}>
          <ChevronLeft className="size-4" /> {m["common.back"]()}
        </Button>
        <span className="text-sm text-muted-foreground">
          {step === 1 &&
            plural(selection.size, m["compose.recipientsSelectedOne"], m["compose.recipientsSelectedOther"])}
          {step === 2 &&
            coverage.ok &&
            m["compose.dataCoversAllSlots"]({ count: selectedRecipients.length })}
          {step === 3 &&
            (messageReport.unknownSlots.length > 0
              ? m["compose.unknownSlotFooter"]({ slot: `{${messageReport.unknownSlots[0]}}` })
              : message.subject.trim() === ""
                ? m["compose.writeSubjectToContinue"]()
                : message.bodyHtml.trim() === ""
                  ? m["compose.writeBodyToContinue"]()
                  : m["compose.messageLooksGood"]())}
          {step === 4 &&
            (smtpValid ? m["compose.connectionDetailsReady"]() : m["compose.completeSmtpDetails"]())}
          {step === 5 && generate.kind === "done" && (
            <>
              {m["compose.generatedFailedFooter"]({
                generated: generate.job.recipients.filter((r) => r.status === "generated").length,
                failed: failedCount,
              })}
            </>
          )}
        </span>
        {step !== 6 && (
          <Button onClick={nextStep} disabled={!canNext}>
            {m["common.next"]()}
            <ChevronRight className="size-4" />
          </Button>
        )}
      </footer>

      {saveAsOpen && (
        <SaveAsTemplateDialog
          defaultName={message.subject.trim()}
          saving={saveAsMutation.isPending}
          onCancel={() => setSaveAsOpen(false)}
          onSave={(name) =>
            saveAsMutation.mutate({ name, subject: message.subject, bodyHtml: message.bodyHtml })
          }
        />
      )}
    </div>
  );
}

/**
 * The "Save as template" dialog (ticket 03): writes the job's current
 * message into the library as a new Message Template. The name defaults
 * to the subject, so the common "one template per campaign" case needs
 * only a confirm click.
 */
function SaveAsTemplateDialog({
  defaultName,
  saving,
  onCancel,
  onSave,
}: {
  defaultName: string;
  saving: boolean;
  onCancel: () => void;
  onSave: (name: string) => void;
}) {
  const [name, setName] = useState(defaultName);
  const valid = name.trim() !== "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onMouseDown={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-as-title"
        className="w-full max-w-md rounded-lg border bg-card p-6 shadow-lg"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id="save-as-title" className="text-lg font-semibold">
          {m["messages.saveAsTitle"]()}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{m["messages.saveAsDescription"]()}</p>
        <label className="mt-4 block">
          <span className="mb-1 block text-xs font-medium text-muted-foreground">
            {m["messages.name"]()}
          </span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={m["messages.name"]()}
            autoFocus
            className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          />
        </label>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={saving}>
            {m["common.cancel"]()}
          </Button>
          <Button onClick={() => onSave(name.trim())} disabled={!valid || saving}>
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" /> {m["common.saving"]()}
              </>
            ) : (
              // "Save template" (distinct from the step's "Save as
              // template" opener, so the dialog's own action is
              // unambiguous in the UI and in tests).
              m["messages.saveTemplate"]()
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Whether each wizard step's prerequisites are satisfied (for the stepper). */
function stepDone(state: {
  selection: Map<string, Recipient>;
  template: Template | null;
  coverage: ReturnType<typeof slotCoverage>;
  messageValid: boolean;
  smtpValid: boolean;
  generate: GenerateState;
}): Record<number, boolean> {
  return {
    1: state.selection.size > 0,
    2: state.template !== null && state.coverage.ok,
    3: state.messageValid,
    4: state.smtpValid,
    5: state.generate.kind === "done",
  };
}

function WizardStepper({
  current,
  onGoTo,
  done,
}: {
  current: number;
  onGoTo: (n: number) => void;
  done: Record<number, boolean>;
}) {
  return (
    <ol className="flex items-center gap-1 px-6 pb-2 text-sm">
      {WIZARD_STEPS.map((s, index) => {
        const complete = done[s.n];
        const active = current === s.n;
        // A step is reachable when every earlier step is complete.
        const clickable = WIZARD_STEPS.slice(0, s.n - 1).every((prev) => done[prev.n]);
        return (
          <li key={s.n} className="flex min-w-0 items-center gap-1">
            {index > 0 && <span className="mx-1 h-px w-4 shrink-0 bg-border" />}
            <button
              type="button"
              onClick={() => clickable && onGoTo(s.n)}
              disabled={!clickable}
              className={`flex min-w-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                active ? "bg-primary text-primary-foreground" : clickable ? "hover:bg-muted" : ""
              } ${clickable ? "text-foreground" : "text-muted-foreground/60"}`}
            >
              {complete && !active ? (
                <Check className="size-3 shrink-0" />
              ) : (
                <span className="shrink-0">{s.n}</span>
              )}
              <span className="truncate">{s.label()}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

// ---- Step 3: message ----

function MessageStep({
  recipients,
  message,
  onChange,
  messageTemplates,
  onPickTemplate,
  onSaveAsTemplate,
  saveAsPending,
}: {
  recipients: Recipient[];
  message: { subject: string; bodyHtml: string };
  onChange: (next: { subject: string; bodyHtml: string }) => void;
  messageTemplates: MessageTemplate[];
  onPickTemplate: (id: string) => void;
  onSaveAsTemplate: () => void;
  saveAsPending: boolean;
}) {
  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <div className="flex items-end gap-2">
        {messageTemplates.length > 0 && (
          <label className="block flex-1">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              {m["messages.pickLabel"]()}
            </span>
            <select
              aria-label={m["messages.pickLabel"]()}
              value=""
              onChange={(event) => {
                // Copy-on-pick (ADR 0005): choosing a template copies its
                // subject and body into the job; the select resets to the
                // placeholder because the job now owns its copy and the
                // pick is a one-shot action, not a live binding.
                const id = event.target.value;
                if (id !== "") onPickTemplate(id);
              }}
              className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring"
            >
              <option value="">{m["messages.pickPlaceholder"]()}</option>
              {messageTemplates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <Button variant="outline" onClick={onSaveAsTemplate} disabled={saveAsPending}>
          <Save className="size-4" /> {m["messages.saveAs"]()}
        </Button>
      </div>
      <MessageEditor recipients={recipients} message={message} onChange={onChange} />
    </div>
  );
}

// ---- Step 4: SMTP ----

function SmtpStep({
  config,
  onChange,
}: {
  config: SmtpFormState;
  onChange: (next: SmtpFormState) => void;
}) {
  const profilesQuery = useQuery({
    queryKey: ["smtp", "list"],
    queryFn: () => window.api.smtp.list(),
  });
  const profiles = profilesQuery.data ?? [];
  const profile = profiles.find((p) => p.id === config.profileId) ?? null;

  const [testState, setTestState] = useState<
    { kind: "idle" } | { kind: "testing" } | { kind: "ok" } | { kind: "error"; message: string }
  >({ kind: "idle" });
  const [saveError, setSaveError] = useState<string | null>(null);
  const rateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // The stored rate limit is loaded once by the wizard (ComposePage); the
  // slider writes it back live here.

  // Changing the connection details invalidates a previous test result -
  // "Connected" must never refer to credentials the form no longer holds.
  const updateConnection = (patch: Partial<SmtpFormState>): void => {
    setTestState({ kind: "idle" });
    onChange({ ...config, ...patch });
  };

  useEffect(
    () => () => {
      if (rateTimer.current !== null) clearTimeout(rateTimer.current);
    },
    [],
  );

  const commitRate = (ms: number): void => {
    if (rateTimer.current !== null) clearTimeout(rateTimer.current);
    rateTimer.current = setTimeout(() => {
      void window.api.settings.set(SETTING_KEYS.rateLimitDelayMs, String(ms));
    }, 400);
  };

  const testConnection = async (): Promise<void> => {
    setTestState({ kind: "testing" });
    try {
      if (config.mode === "profile" && config.profileId !== null) {
        await window.api.smtp.testProfile(config.profileId);
      } else {
        await window.api.smtp.test({
          host: config.host,
          port: Number(config.port),
          username: config.username,
          password: config.password,
        });
      }
      setTestState({ kind: "ok" });
    } catch (error) {
      setTestState({ kind: "error", message: errorMessage(error, m["compose.connectionFailed"]()) });
    }
  };

  const saveProfile = async (): Promise<void> => {
    setSaveError(null);
    try {
      const created = await window.api.smtp.create({
        name: config.profileName,
        host: config.host,
        port: Number(config.port),
        username: config.username,
        password: config.password,
        // The typed identity becomes the profile's default (ticket 01) -
        // blank stays unset, so a saved one-off connection keeps working
        // exactly as before.
        senderName: normalizeIdentity(config.senderName),
        senderAddress: normalizeIdentity(config.senderAddress),
        replyTo: normalizeIdentity(config.replyTo),
      });
      onChange({
        ...config,
        mode: "profile",
        profileId: created.id,
        saveAsProfile: false,
        profileName: "",
      });
    } catch (error) {
      setSaveError(errorMessage(error, m["smtp.couldNotSaveProfile"]()));
    }
  };

  const inputClass =
    "h-9 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

  // The soft, advisory-only From warning (ticket 01): comparing the
  // per-job From against the connection's account domain (known providers)
  // or the profile's default identity. It never gates the send - the
  // footer and stepper stay driven by `smtpValid` alone.
  const effectiveConnection =
    config.mode === "profile" && profile !== null
      ? { host: profile.host, username: profile.username }
      : { host: config.host, username: config.username };
  const identityWarning = senderIdentityWarning({
    host: effectiveConnection.host,
    username: effectiveConnection.username,
    senderAddress: config.senderAddress,
    profileSenderAddress: config.mode === "profile" ? (profile?.senderAddress ?? null) : null,
  });

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {m["compose.emailConnection"]()}
        </h3>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => updateConnection({ mode: "profile" })}
            className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
              config.mode === "profile" ? "border-primary bg-primary/5" : "hover:bg-muted"
            }`}
          >
            {m["compose.savedProfile"]()}
          </button>
          <button
            type="button"
            onClick={() => updateConnection({ mode: "inline" })}
            className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
              config.mode === "inline" ? "border-primary bg-primary/5" : "hover:bg-muted"
            }`}
          >
            {m["compose.enterDetails"]()}
          </button>
        </div>

        {config.mode === "profile" ? (
          <div className="mt-3 space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                {m["compose.savedProfile"]()}
              </span>
              <select
                value={config.profileId ?? ""}
                onChange={(event) => {
                  setTestState({ kind: "idle" });
                  const nextId = event.target.value === "" ? null : event.target.value;
                  const next = profiles.find((p) => p.id === nextId) ?? null;
                  // The identity always reflects the chosen profile
                  // (ticket 01): prefill its defaults, and clear the fields
                  // when the profile carries none - a stale identity from a
                  // previous profile must never ride along silently. Every
                  // prefilled field stays editable per job without ever
                  // mutating the profile.
                  onChange({
                    ...config,
                    profileId: nextId,
                    senderName: next?.senderName ?? "",
                    senderAddress: next?.senderAddress ?? "",
                    replyTo: next?.replyTo ?? "",
                  });
                }}
                className={inputClass}
              >
                <option value="">{m["compose.chooseProfile"]()}</option>
                {profiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} · {p.host}:{p.port}
                  </option>
                ))}
              </select>
            </label>
            {profiles.length === 0 && (
              <p className="text-xs text-muted-foreground">
                {m["compose.noSavedProfilesHint"]()}{" "}
                <Link to="/settings" className="text-primary underline underline-offset-2">
                  {m["compose.settingsLink"]()}
                </Link>
                .
              </p>
            )}
            {profile !== null && (
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Plug className="size-3.5" />
                {profile.username} · {profile.host}:{profile.port}
              </p>
            )}
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                {m["compose.host"]()}
              </span>
              <input
                type="text"
                value={config.host}
                onChange={(event) => onChange({ ...config, host: event.target.value })}
                placeholder="smtp.gmail.com"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                {m["compose.portLabel"]()}
              </span>
              <input
                type="number"
                value={config.port}
                onChange={(event) => onChange({ ...config, port: event.target.value })}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                {m["compose.usernameLabel"]()}
              </span>
              <input
                type="text"
                value={config.username}
                onChange={(event) => onChange({ ...config, username: event.target.value })}
                placeholder="you@gmail.com"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                {m["compose.appPasswordLabel"]()}
              </span>
              <input
                type="password"
                value={config.password}
                onChange={(event) => onChange({ ...config, password: event.target.value })}
                placeholder={m["compose.appPasswordPlaceholder"]()}
                className={inputClass}
              />
            </label>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={config.saveAsProfile}
                  onChange={(event) => onChange({ ...config, saveAsProfile: event.target.checked })}
                  className="size-4 accent-primary"
                />
                {m["compose.saveAsProfile"]()}
              </label>
              {config.saveAsProfile && (
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={config.profileName}
                    onChange={(event) => onChange({ ...config, profileName: event.target.value })}
                    placeholder={m["compose.profileNamePlaceholder"]()}
                    className={inputClass}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={config.profileName.trim() === ""}
                    onClick={() => void saveProfile()}
                  >
                    {m["common.save"]()}
                  </Button>
                </div>
              )}
              {saveError !== null && <p className="mt-2 text-xs text-red-700">{saveError}</p>}
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={
              testState.kind === "testing" ||
              (config.mode === "profile"
                ? config.profileId === null
                : config.host.trim() === "" ||
                  config.username.trim() === "" ||
                  config.password === "")
            }
            onClick={() => void testConnection()}
          >
            {testState.kind === "testing" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Plug className="size-4" />
            )}
            {m["compose.testConnectionButton"]()}
          </Button>
          {testState.kind === "ok" && (
            <p className="flex items-center gap-1.5 text-xs text-emerald-700">
              <Check className="size-4" /> {m["smtp.connected"]()}
            </p>
          )}
          {testState.kind === "error" && (
            <p className="flex items-center gap-1.5 text-xs text-red-700">{testState.message}</p>
          )}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {m["compose.senderIdentity"]()}
        </h3>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              {m["compose.senderName"]()}
            </span>
            <input
              type="text"
              value={config.senderName}
              onChange={(event) => onChange({ ...config, senderName: event.target.value })}
              placeholder="Yayasan X"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              {m["compose.senderAddress"]()}
            </span>
            <input
              type="email"
              value={config.senderAddress}
              onChange={(event) => onChange({ ...config, senderAddress: event.target.value })}
              placeholder="iym@example.org"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              {m["compose.replyTo"]()}
            </span>
            <input
              type="email"
              value={config.replyTo}
              onChange={(event) => onChange({ ...config, replyTo: event.target.value })}
              placeholder={m["compose.replyToPlaceholder"]()}
              className={inputClass}
            />
          </label>
        </div>
        {identityWarning !== null && (
          <p
            className="mt-3 flex items-start gap-2 rounded-md border border-amber-600/40 bg-amber-600/10 px-3 py-2 text-xs text-amber-900"
            role="status"
          >
            <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
            <span>
              {identityWarning.kind === "provider-domain-mismatch"
                ? m["compose.senderDomainMismatch"]({
                    provider: identityWarning.provider,
                    domain: identityWarning.accountDomain,
                    from: config.senderAddress,
                  })
                : m["compose.senderDiffersFromProfile"]({
                    address: identityWarning.profileAddress,
                  })}
            </span>
          </p>
        )}
      </div>

      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {m["compose.sendingRate"]()}
          </h3>
          <span className="font-mono text-sm">{m["compose.sendingRateMs"]({ ms: config.delayMs })}</span>
        </div>
        <input
          type="range"
          min={RATE_LIMIT_MIN_MS}
          max={RATE_LIMIT_MAX_MS}
          step={RATE_LIMIT_STEP_MS}
          value={config.delayMs}
          onChange={(event) => {
            const ms = Number(event.target.value);
            onChange({ ...config, delayMs: ms });
            commitRate(ms);
          }}
          className="mt-3 w-full accent-primary"
        />
        <p className="mt-1 text-xs text-muted-foreground">{m["compose.sendingRateHint"]()}</p>
      </div>
    </div>
  );
}

// ---- Step 6: send ----

function SendStep({
  recipientIds,
  generateJobId,
  message,
  smtp,
  state,
  onStateChange,
}: {
  recipientIds: string[];
  generateJobId: string | null;
  message: { subject: string; bodyHtml: string };
  smtp: SmtpFormState;
  state: SendState;
  onStateChange: React.Dispatch<React.SetStateAction<SendState>>;
}) {
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const pausedRef = useRef<(() => void) | null>(null);
  const logRef = useRef<HTMLUListElement>(null);
  const runRef = useRef<number>(0);

  // Unmount (or leaving step 6 mid-run) unsubscribes the event listeners;
  // a returning mount re-subscribes through the running state below.
  useEffect(
    () => () => {
      unsubscribeRef.current?.();
      pausedRef.current?.();
      unsubscribeRef.current = null;
      pausedRef.current = null;
    },
    [],
  );

  // The run flow: start a job and drive it to a terminal or paused state.
  // The run promise is the primary completion signal; progress events and
  // the job-paused event update the running state as it streams.
  const runSendFlow = async (jobId: string, isResume: boolean): Promise<void> => {
    const flow = ++runRef.current;
    unsubscribeRef.current?.();
    pausedRef.current?.();
    unsubscribeRef.current = window.api.send.onSendProgress((event) => {
      if (event.jobId !== jobId || flow !== runRef.current) return;
      onStateChange((prev) => {
        if (prev.kind !== "running" || prev.jobId !== jobId) return prev;
        return {
          ...prev,
          current: event.current,
          // The events carry the authoritative total - a resumed run
          // starts with a placeholder 0 until the first event lands.
          total: event.total,
          results: {
            ...prev.results,
            [event.recipientId]: {
              // Keep the seeded name; only the outcome fields change.
              ...prev.results[event.recipientId],
              status: event.status,
              messageId: event.messageId,
              error: event.error,
            },
          },
        };
      });
    });
    pausedRef.current = window.api.send.onJobPaused((event) => {
      if (event.jobId !== jobId || flow !== runRef.current) return;
      onStateChange((prev) => (prev.kind === "running" ? { ...prev, paused: true } : prev));
    });
    try {
      if (isResume) await window.api.send.resumeSend(jobId);
      const done = await window.api.send.runSend(jobId);
      if (flow !== runRef.current) return;
      unsubscribeRef.current?.();
      pausedRef.current?.();
      unsubscribeRef.current = null;
      pausedRef.current = null;
      onStateChange(
        done.status === "paused"
          ? // The loop has fully stopped now - resume is safe again.
            { kind: "paused", jobId, job: done, windingDown: false }
          : done.status === "cancelled"
            ? { kind: "cancelled", jobId, job: done }
            : { kind: "done", jobId, job: done },
      );
    } catch (error) {
      if (flow !== runRef.current) return;
      onStateChange({
        kind: "error",
        message: errorMessage(error, m["compose.sendingFailed"]()),
        jobId,
      });
    }
  };

  const startSending = async (): Promise<void> => {
    if (generateJobId === null || recipientIds.length === 0) return;
    try {
      const payload: SendStartPayload = {
        generateJobId,
        recipientIds,
        smtpProfileId: smtp.mode === "profile" ? smtp.profileId : null,
        smtpOverride:
          smtp.mode === "inline"
            ? {
                host: smtp.host,
                port: Number(smtp.port),
                username: smtp.username,
                password: smtp.password,
              }
            : null,
        subject: message.subject,
        bodyHtml: message.bodyHtml,
        senderName: smtp.senderName,
        senderAddress: smtp.senderAddress,
        replyTo: normalizeIdentity(smtp.replyTo),
        delayMs: smtp.delayMs,
      };
      onStateChange({ kind: "starting" });
      const job = await window.api.send.startSend(payload);
      onStateChange({
        kind: "running",
        jobId: job.id,
        total: job.total,
        current: 0,
        paused: false,
        results: seedResults(job),
      });
      await runSendFlow(job.id, false);
    } catch (error) {
      onStateChange({
        kind: "error",
        message: errorMessage(error, m["compose.couldNotStartSend"]()),
        jobId: null,
      });
    }
  };

  const pauseSend = async (jobId: string): Promise<void> => {
    try {
      const job = await window.api.send.pauseSend(jobId);
      // The DB is paused, but the old loop may still be finishing an
      // in-flight send - resume stays disabled until the run promise
      // resolves (windingDown false), so a quick pause -> resume can
      // never double-deliver the in-flight recipient.
      onStateChange({ kind: "paused", jobId, job, windingDown: true });
    } catch (error) {
      onStateChange({
        kind: "error",
        message: errorMessage(error, m["compose.couldNotPauseSend"]()),
        jobId,
      });
    }
  };

  const resumeSend = (job: SendJob): void => {
    onStateChange({
      kind: "running",
      jobId: job.id,
      total: job.total,
      current: job.cursorIndex,
      paused: false,
      results: seedResults(job),
    });
    void runSendFlow(job.id, true);
  };

  const cancelSend = async (jobId: string, current: number, total: number): Promise<void> => {
    if (!window.confirm(m["compose.cancelSendConfirm"]({ current, total }))) return;
    try {
      const job = await window.api.send.cancelSend(jobId);
      onStateChange({ kind: "cancelled", jobId, job });
    } catch (error) {
      onStateChange({
        kind: "error",
        message: errorMessage(error, m["compose.couldNotCancelSend"]()),
        jobId,
      });
    }
  };

  const retryFailures = async (job: SendJob): Promise<void> => {
    try {
      await window.api.send.retryFailedSend(job.id);
      onStateChange({
        kind: "running",
        jobId: job.id,
        total: job.total,
        current: job.cursorIndex,
        paused: false,
        results: seedResults(job),
      });
      await runSendFlow(job.id, false);
    } catch (error) {
      onStateChange({
        kind: "error",
        message: errorMessage(error, m["compose.couldNotRetryFailures"]()),
        jobId: job.id,
      });
    }
  };

  /** Resume from an error state, where no job snapshot is held. */
  const resumeFromError = async (jobId: string): Promise<void> => {
    try {
      const job = await window.api.send.getSendStatus(jobId);
      if (job === null) {
        onStateChange({
          kind: "error",
          message: m["compose.sendJobNoLongerExists"](),
          jobId: null,
        });
        return;
      }
      resumeSend(job);
    } catch (error) {
      onStateChange({
        kind: "error",
        message: errorMessage(error, m["compose.couldNotResumeSend"]()),
        jobId,
      });
    }
  };

  // Auto-scroll the per-recipient log as events arrive.
  useEffect(() => {
    const list = logRef.current;
    if (list !== null) list.scrollTop = list.scrollHeight;
  });

  const smtpLabel =
    smtp.mode === "profile" && smtp.profileId !== null
      ? m["compose.savedProfile"]()
      : `${smtp.host}:${smtp.port}`;

  // The per-recipient log rows, one shape for every state: the live
  // results map while running (names seeded up front), the job's
  // authoritative rows once a snapshot exists (skipped included).
  const snapshotRows =
    state.kind === "paused" || state.kind === "done" || state.kind === "cancelled"
      ? Object.fromEntries(
          state.job.recipients.map((r) => [
            r.recipientId,
            {
              status: r.status === "pending" ? null : r.status,
              messageId: r.messageId,
              error: r.errorMessage,
              name: r.recipientName,
            },
          ]),
        )
      : {};
  const rows = state.kind === "running" ? state.results : snapshotRows;
  const rowList = Object.entries(rows);
  const total =
    state.kind === "running"
      ? state.total
      : state.kind === "paused" || state.kind === "done" || state.kind === "cancelled"
        ? state.job.total
        : 0;
  const current =
    state.kind === "running"
      ? state.current
      : state.kind === "paused" || state.kind === "done" || state.kind === "cancelled"
        ? state.job.cursorIndex
        : 0;
  const rowStatuses = Object.values(rows).map((r) => r.status);
  const sentCount = rowStatuses.filter((s) => s === "sent").length;
  const failedCount = rowStatuses.filter((s) => s === "failed").length;

  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {m["compose.sendSummary"]()}
        </h3>
        <dl className="mt-2 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted-foreground">{m["compose.recipients"]()}</dt>
            <dd className="font-medium">{recipientIds.length}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{m["compose.subject"]()}</dt>
            <dd className="truncate font-medium" title={message.subject}>
              {message.subject}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{m["compose.sender"]()}</dt>
            <dd
              className="truncate font-medium"
              title={`${smtp.senderName} <${smtp.senderAddress}>`}
            >
              {smtp.senderName} &lt;{smtp.senderAddress}&gt;
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{m["compose.connection"]()}</dt>
            <dd className="font-medium">{smtpLabel}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{m["compose.pacing"]()}</dt>
            <dd className="font-medium">{m["compose.sendingRateMs"]({ ms: smtp.delayMs })}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{m["compose.attachments"]()}</dt>
            <dd className="font-medium">
              {m["compose.generatedPdfsCount"]({ count: recipientIds.length })}
            </dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-muted-foreground">{m["compose.preflightHint"]()}</p>
      </div>

      {state.kind === "idle" && (
        <div className="flex flex-col items-start gap-2">
          <Button disabled={recipientIds.length === 0} onClick={() => void startSending()}>
            <Send className="size-4" />{" "}
            {recipientIds.length === 1
              ? m["compose.sendCountOne"]({ count: recipientIds.length })
              : m["compose.sendCountOther"]({ count: recipientIds.length })}
          </Button>
          {recipientIds.length === 0 && (
            <p className="text-xs text-muted-foreground">{m["compose.noGeneratedAttachments"]()}</p>
          )}
        </div>
      )}

      {state.kind === "starting" && (
        <div className="flex items-center gap-2 rounded-lg border bg-card p-4 text-sm">
          <Loader2 className="size-4 animate-spin" /> {m["compose.preparingSend"]()}
        </div>
      )}

      {(state.kind === "running" || state.kind === "paused") && (
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 font-medium">
              {state.kind === "paused" || (state.kind === "running" && state.paused) ? (
                <>
                  <Pause className="size-4" /> {m["status.paused"]()}
                </>
              ) : (
                <>
                  <Loader2 className="size-4 animate-spin" /> {m["compose.sending"]()}
                </>
              )}
            </span>
            <span className="text-muted-foreground">
              {m["compose.sendCounts"]({
                sent: sentCount,
                failed: failedCount,
                pending: Math.max(0, total - current),
              })}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${total === 0 ? 0 : (current / total) * 100}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {state.kind === "running" && !state.paused && (
              <Button variant="outline" size="sm" onClick={() => void pauseSend(state.jobId)}>
                <Pause className="size-4" /> {m["common.pause"]()}
              </Button>
            )}
            {state.kind === "paused" && (
              <Button
                size="sm"
                disabled={state.windingDown}
                title={state.windingDown ? m["compose.windingDownTitle"]() : undefined}
                onClick={() => resumeSend(state.job)}
              >
                <Play className="size-4" /> {m["common.resume"]()}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => void cancelSend(state.jobId, current, total)}
            >
              <CircleStop className="size-4" /> {m["common.cancel"]()}
            </Button>
          </div>
        </div>
      )}

      {(state.kind === "running" || state.kind === "paused") && (
        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {m["compose.perRecipientLog"]()}
          </h3>
          <ul ref={logRef} className="mt-2 max-h-48 space-y-1 overflow-y-auto text-sm">
            {rowList.length === 0 && (
              <li className="text-xs text-muted-foreground">{m["compose.waitingFirstEmail"]()}</li>
            )}
            {rowList.map(([recipientId, row]) => (
              <SendLogRowView key={recipientId} row={row} />
            ))}
          </ul>
        </div>
      )}

      {state.kind === "done" && (
        <>
          <div
            className={`flex items-center gap-2 rounded-md border p-3 text-sm ${
              failedCount === 0
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700"
                : "border-amber-500/40 bg-amber-500/10 text-amber-700"
            }`}
          >
            {failedCount === 0 ? (
              <>
                <Check className="size-4 shrink-0" />
                {m["compose.allEmailsSent"]({ count: sentCount })}
              </>
            ) : (
              <>
                <AlertTriangle className="size-4 shrink-0" />
                {m["compose.sentWithFailures"]({ sent: sentCount, failed: failedCount })}
              </>
            )}
          </div>
          {failedCount > 0 && (
            <div>
              <Button onClick={() => void retryFailures(state.job)}>
                <RotateCcw className="size-4" /> {m["common.retryFailures"]()}
              </Button>
            </div>
          )}
          <div className="rounded-lg border bg-card p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {m["compose.perRecipientLog"]()}
            </h3>
            <ul className="mt-2 max-h-48 space-y-1 overflow-y-auto text-sm">
              {rowList.map(([recipientId, row]) => (
                <SendLogRowView key={recipientId} row={row} />
              ))}
            </ul>
          </div>
        </>
      )}

      {state.kind === "cancelled" && (
        <>
          <div className="flex items-start gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-700">
            <CircleStop className="mt-0.5 size-4 shrink-0" />
            <div>
              <p className="font-medium">{m["compose.sendCancelled"]()}</p>
              <p className="mt-1 text-xs">
                {m["compose.cancelledDetail"]({
                  sent: sentCount,
                  skipped: Math.max(0, state.job.total - sentCount - failedCount),
                })}
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {m["compose.perRecipientLog"]()}
            </h3>
            <ul className="mt-2 max-h-48 space-y-1 overflow-y-auto text-sm">
              {rowList.map(([recipientId, row]) => (
                <SendLogRowView key={recipientId} row={row} />
              ))}
            </ul>
          </div>
        </>
      )}

      {state.kind === "error" &&
        (() => {
          const jobId = state.jobId;
          return (
            <div className="flex flex-col gap-3">
              <ErrorBanner message={state.message} />
              <div className="flex gap-2">
                {jobId !== null && (
                  <Button onClick={() => void resumeFromError(jobId)}>
                    <Play className="size-4" /> {m["common.resume"]()}
                  </Button>
                )}
                <Button variant="outline" onClick={() => void startSending()}>
                  {m["compose.tryAgain"]()}
                </Button>
              </div>
            </div>
          );
        })()}
    </div>
  );
}

/** One per-recipient log row, shared by the live and snapshot renderers. */
function SendLogRowView({ row }: { row: SendLogRow }) {
  return (
    <li className="flex items-start gap-2">
      {row.status === "sent" ? (
        <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />
      ) : row.status === "failed" ? (
        <X className="mt-0.5 size-3.5 shrink-0 text-destructive" />
      ) : (
        <span className="mt-0.5 size-3.5 shrink-0 text-muted-foreground">·</span>
      )}
      <span className="min-w-0">
        <span className="font-medium">{row.name ?? m["compose.recipient"]()}</span>
        {row.status === "sent" && row.messageId !== null && (
          <span className="text-muted-foreground"> - {row.messageId}</span>
        )}
        {row.status === "failed" && row.error !== null && (
          <span className="text-destructive"> - {row.error}</span>
        )}
        {row.status === "skipped" && (
          <span className="text-muted-foreground">{m["compose.rowSkipped"]()}</span>
        )}
      </span>
    </li>
  );
}

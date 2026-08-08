import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleStop,
  FileText,
  Info,
  Loader2,
  Pause,
  Play,
  Plug,
  RotateCcw,
  Send,
  Users,
  X,
} from "lucide-react";
import { m } from "@paraglide/messages";
import { ErrorBanner } from "@/components/error-banner";
import { PatternPreview } from "@/components/pattern-preview";
import { PdfPreview } from "@/components/pdf-preview";
import { TemplateBadge } from "@/components/template-badge";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import { plural } from "@/lib/plural";
import { slotCoverage } from "../../../shared/generate";
import {
  availableSlots,
  interpolateMessageHtml,
  interpolateMessagePlain,
  messageCoverage,
  messageValues,
} from "../../../shared/send";
import {
  DEFAULT_RATE_LIMIT_DELAY_MS,
  parseRateLimitMs,
  RATE_LIMIT_MAX_MS,
  RATE_LIMIT_MIN_MS,
  RATE_LIMIT_STEP_MS,
  SETTING_KEYS,
} from "../../../shared/settings";
import type {
  GenerateJob,
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

const PAGE_SIZE = 25;

/** The live state of a generate job in the wizard. */
type GenerateState =
  | { kind: "idle" }
  | {
      kind: "running";
      jobId: string;
      total: number;
      current: number;
      results: Record<string, { status: "generated" | "failed"; error: string | null }>;
      /** The selection and template the job was started from, for staleness checks. */
      bound: { recipientIds: string; templateId: string };
    }
  | {
      kind: "done";
      jobId: string;
      job: GenerateJob;
      bound: { recipientIds: string; templateId: string };
    }
  | { kind: "error"; message: string };

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
            report={messageReport}
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

// ---- Step 1: recipients ----

function RecipientsStep({
  selection,
  onSelectionChange,
}: {
  selection: Map<string, Recipient>;
  onSelectionChange: (next: Map<string, Recipient>) => void;
}) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [importBatch, setImportBatch] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // Debounce the search input like the Recipients screen.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 250);
    return () => clearTimeout(timer);
  }, [search]);
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, importBatch]);

  const batchesQuery = useQuery({
    queryKey: ["recipients", "batches"],
    queryFn: () => window.api.recipients.listBatches(),
  });
  const batches = batchesQuery.data ?? [];

  const listQuery = useQuery({
    queryKey: ["recipients", "list", debouncedSearch, importBatch, page],
    queryFn: () =>
      window.api.recipients.list({
        search: debouncedSearch === "" ? null : debouncedSearch,
        importBatch,
        page,
        pageSize: PAGE_SIZE,
      }),
    placeholderData: (prev) => prev,
  });
  const items = listQuery.data?.items ?? [];
  const total = listQuery.data?.total ?? 0;

  const toggle = (recipient: Recipient): void => {
    const next = new Map(selection);
    if (next.has(recipient.id)) next.delete(recipient.id);
    else next.set(recipient.id, recipient);
    onSelectionChange(next);
  };

  const pageSelected = items.length > 0 && items.every((r) => selection.has(r.id));
  const pagePartial = items.some((r) => selection.has(r.id));
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const selectAllMatching = async (): Promise<void> => {
    try {
      const all = await window.api.recipients.listAll({
        search: debouncedSearch === "" ? null : debouncedSearch,
        importBatch,
      });
      onSelectionChange(new Map(all.map((r) => [r.id, r])));
    } catch (error) {
      // The list query error banner already covers read failures; a select
      // failure here just leaves the current selection intact.
      console.error("select all failed", error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex min-w-52 flex-1 items-center gap-2">
          <span className="sr-only">{m["compose.searchRecipients"]()}</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={m["compose.searchPlaceholder"]()}
            className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          />
        </label>
        <select
          value={importBatch ?? ""}
          onChange={(event) =>
            setImportBatch(event.target.value === "" ? null : event.target.value)
          }
          aria-label={m["compose.filterByBatch"]()}
          className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring"
        >
          <option value="">{m["compose.allBatches"]()}</option>
          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {m["compose.batchOption"]({ count: batch.count, stamp: formatStamp(batch.createdAt) })}
            </option>
          ))}
        </select>
        {total > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => void selectAllMatching()}
            title={m["compose.selectAllMatchingTitle"]({ total })}
          >
            <Users className="size-4" /> {m["compose.selectAllCount"]({ total })}
          </Button>
        )}
      </div>

      {listQuery.isError && (
        <ErrorBanner message={errorMessage(listQuery.error, m["compose.couldNotLoadRecipients"]())} />
      )}

      {!listQuery.isError && total === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
          <Users className="size-10 text-muted-foreground" />
          <p className="text-sm font-medium">
            {debouncedSearch === "" && importBatch === null
              ? m["compose.noRecipientsYet"]()
              : m["compose.noRecipientsMatchFilter"]()}
          </p>
          <p className="max-w-sm text-xs text-muted-foreground">
            {debouncedSearch === "" && importBatch === null ? (
              <>
                {m["compose.noRecipientsHint"]()}
                <Link
                  to="/import"
                  className="block text-primary underline-offset-2 hover:underline"
                >
                  {m["compose.goToImport"]()}
                </Link>
              </>
            ) : (
              m["compose.tryDifferentFilter"]()
            )}
          </p>
        </div>
      )}

      {total > 0 && (
        <>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="w-10 px-3 py-2">
                    <input
                      type="checkbox"
                      aria-label={m["compose.selectAllOnPage"]()}
                      checked={pageSelected}
                      ref={(node) => {
                        if (node !== null) node.indeterminate = pagePartial && !pageSelected;
                      }}
                      onChange={() => {
                        const next = new Map(selection);
                        for (const item of items) {
                          if (selection.has(item.id)) next.delete(item.id);
                          else next.set(item.id, item);
                        }
                        onSelectionChange(next);
                      }}
                      className="size-4 accent-primary"
                    />
                  </th>
                  <th className="px-3 py-2">{m["compose.name"]()}</th>
                  <th className="px-3 py-2">{m["compose.email"]()}</th>
                  <th className="hidden px-3 py-2 sm:table-cell">{m["compose.phone"]()}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map((recipient) => (
                  <tr
                    key={recipient.id}
                    className={`transition-colors hover:bg-muted/40 ${
                      selection.has(recipient.id) ? "bg-primary/5" : ""
                    }`}
                  >
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        aria-label={m["compose.selectRecipient"]({ name: recipient.name })}
                        checked={selection.has(recipient.id)}
                        onChange={() => toggle(recipient)}
                        className="size-4 accent-primary"
                      />
                    </td>
                    <td className="px-3 py-2 font-medium">{recipient.name}</td>
                    <td className="px-3 py-2 text-muted-foreground">{recipient.email ?? "-"}</td>
                    <td className="hidden px-3 py-2 text-muted-foreground sm:table-cell">
                      {recipient.phone ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{m["compose.selectionCount"]({ selected: selection.size, total })}</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="size-4" /> {m["common.prev"]()}
              </Button>
              <span>
                {m["compose.pageOf"]({ page: Math.min(page, totalPages), total: totalPages })}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              >
                {m["common.next"]()} <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ---- Step 2: template ----

function TemplateStep({
  templates,
  template,
  onTemplateChange,
  selectedRecipients,
  coverage,
}: {
  templates: Template[];
  template: Template | null;
  onTemplateChange: (id: string | null) => void;
  selectedRecipients: Recipient[];
  coverage: ReturnType<typeof slotCoverage>;
}) {
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-muted-foreground">
          {m["compose.templateLabel"]()}
        </span>
        <select
          value={template?.id ?? ""}
          onChange={(event) =>
            onTemplateChange(event.target.value === "" ? null : event.target.value)
          }
          className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring"
        >
          <option value="">{m["compose.chooseTemplate"]()}</option>
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </label>

      {templates.length === 0 && (
        <p className="rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700">
          {m["compose.noTemplatesRegistered"]()}{" "}
          <Link to="/templates" className="underline underline-offset-2">
            {m["compose.registerTemplateLink"]()}
          </Link>{" "}
          {m["compose.noTemplatesRegisteredHint"]()}
        </p>
      )}

      {template !== null && (
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-semibold">{template.name}</h3>
                <TemplateBadge type={template.type} />
              </div>
              <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                {template.filePath}
              </p>
            </div>
          </div>
          <div className="mt-3 space-y-3">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {m["compose.requiredSlots"]()}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {template.slots.map((slot) => (
                  <code
                    key={slot}
                    className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-foreground"
                  >
                    {"{"}
                    {slot}
                    {"}"}
                  </code>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {m["compose.outputPattern"]()}
              </p>
              <p className="rounded-md border bg-background px-3 py-2">
                <PatternPreview pattern={template.outputPattern} slots={template.slots} />
              </p>
            </div>
          </div>
        </div>
      )}

      {template !== null && coverage.ok && (
        <p className="flex items-center gap-2 text-sm text-emerald-700">
          <Check className="size-4" />
          {m["compose.allCovered"]({ count: selectedRecipients.length })}
        </p>
      )}

      {template !== null && !coverage.ok && (
        <div className="flex items-start gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700">
          <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
          <div>
            <p className="font-medium">
              {m["compose.missingDataSummary"]({
                missing: coverage.recipientsMissing,
                count: selectedRecipients.length,
              })}
            </p>
            <ul className="mt-1 list-inside list-disc">
              {coverage.slots.map((entry) => (
                <li key={entry.slot}>
                  {entry.missingCount === 1
                    ? m["compose.slotMissingCountOne"]({
                        slot: `{${entry.slot}}`,
                        count: entry.missingCount,
                      })
                    : m["compose.slotMissingCountOther"]({
                        slot: `{${entry.slot}}`,
                        count: entry.missingCount,
                      })}
                </li>
              ))}
            </ul>
            <p className="mt-1">{m["compose.missingDataHint"]()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Step 3: message ----

function MessageStep({
  recipients,
  message,
  onChange,
  report,
}: {
  recipients: Recipient[];
  message: { subject: string; bodyHtml: string };
  onChange: (next: { subject: string; bodyHtml: string }) => void;
  report: ReturnType<typeof messageCoverage>;
}) {
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [completion, setCompletion] = useState<{
    start: number;
    query: string;
    index: number;
  } | null>(null);
  const suggestions = useMemo(() => {
    if (completion === null) return [];
    return availableSlots(recipients).filter((slot) => slot.startsWith(completion.query));
  }, [completion, recipients]);

  // Recompute the {slot} completion state from the textarea's cursor:
  // open when the last "{" is after the last "}" before the cursor.
  const updateCompletion = (textarea: HTMLTextAreaElement): void => {
    const before = textarea.value.slice(0, textarea.selectionStart);
    const brace = before.lastIndexOf("{");
    const close = before.lastIndexOf("}");
    if (brace !== -1 && brace > close) {
      setCompletion((prev) => ({
        start: brace,
        query: before.slice(brace + 1),
        index: Math.min(prev?.index ?? 0, Math.max(0, availableSlots(recipients).length - 1)),
      }));
    } else {
      setCompletion(null);
    }
  };

  const insertSlot = (slot: string): void => {
    const textarea = bodyRef.current;
    if (textarea === null || completion === null) return;
    const cursor = textarea.selectionStart;
    const next =
      message.bodyHtml.slice(0, completion.start) + `{${slot}}` + message.bodyHtml.slice(cursor);
    onChange({ ...message, bodyHtml: next });
    setCompletion(null);
    // Restore focus and place the cursor after the inserted placeholder.
    requestAnimationFrame(() => {
      textarea.focus();
      const pos = completion.start + slot.length + 2;
      textarea.setSelectionRange(pos, pos);
    });
  };

  const onBodyKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (completion === null || suggestions.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCompletion({ ...completion, index: (completion.index + 1) % suggestions.length });
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCompletion({
        ...completion,
        index: (completion.index - 1 + suggestions.length) % suggestions.length,
      });
    } else if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      insertSlot(suggestions[Math.min(completion.index, suggestions.length - 1)]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setCompletion(null);
    }
  };

  // The live preview: the first 2-3 selected recipients render the
  // interpolated subject and body; a missing or unknown slot shows a
  // descriptive error instead of a silent literal placeholder.
  const samples = recipients.slice(0, 3);
  const previews = samples.map((recipient) => {
    const values = messageValues(recipient);
    try {
      return {
        recipient,
        subject: interpolateMessagePlain(message.subject, values),
        body: interpolateMessageHtml(message.bodyHtml, values),
        error: null as string | null,
      };
    } catch (error) {
      return {
        recipient,
        subject: "",
        body: "",
        error: error instanceof Error ? error.message : String(error),
      };
    }
  });

  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-muted-foreground">
          {m["compose.subject"]()}
        </span>
        <input
          type="text"
          value={message.subject}
          onChange={(event) => onChange({ ...message, subject: event.target.value })}
          placeholder={m["compose.subjectPlaceholder"]({ name: "{name}", instansi: "{instansi}" })}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-xs font-medium text-muted-foreground">
          {m["compose.bodyLabel"]()}
        </span>
        <div className="relative">
          <textarea
            ref={bodyRef}
            value={message.bodyHtml}
            rows={9}
            onChange={(event) => {
              onChange({ ...message, bodyHtml: event.target.value });
              updateCompletion(event.target);
            }}
            onKeyDown={onBodyKeyDown}
            onSelect={(event) => updateCompletion(event.currentTarget)}
            onClick={(event) => updateCompletion(event.currentTarget)}
            placeholder={m["compose.bodyPlaceholder"]({ name: "{name}" })}
            className="w-full resize-y rounded-md border bg-background px-3 py-2 font-mono text-xs leading-relaxed outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          />
          {completion !== null && suggestions.length > 0 && (
            <ul className="absolute left-2 top-2 z-10 max-h-48 w-64 overflow-y-auto rounded-md border bg-popover py-1 shadow-lg">
              {suggestions.map((slot, i) => (
                <li key={slot}>
                  <button
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      insertSlot(slot);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-1 text-left font-mono text-xs ${
                      i === completion.index ? "bg-accent" : ""
                    }`}
                  >
                    {"{"}
                    {slot}
                    {"}"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </label>

      {report.unknownSlots.length > 0 && (
        <div className="flex items-start gap-2 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-700">
          <X className="mt-0.5 size-3.5 shrink-0" />
          <div>
            <p className="font-medium">
              {report.unknownSlots.length === 1
                ? m["compose.unknownSlotTitleOne"]({
                    list: report.unknownSlots.map((s) => `{${s}}`).join(", "),
                  })
                : m["compose.unknownSlotTitleOther"]({
                    list: report.unknownSlots.map((s) => `{${s}}`).join(", "),
                  })}
            </p>
            <p className="mt-1">{m["compose.unknownSlotHint"]()}</p>
          </div>
        </div>
      )}
      {report.unknownSlots.length === 0 && report.missing.length > 0 && (
        <div className="flex items-start gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700">
          <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
          <div>
            <p className="font-medium">
              {m["compose.missingSlotTitle"]({
                list: report.missing.map((entry) => `{${entry.slot}} (${entry.missingCount})`).join(", "),
              })}
            </p>
            <p className="mt-1">{m["compose.missingSlotHint"]()}</p>
          </div>
        </div>
      )}

      {previews.length > 0 && (
        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {m["compose.livePreview"]()}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {previews.length === 1
              ? m["compose.livePreviewHintOne"]({ count: previews.length })
              : m["compose.livePreviewHintOther"]({ count: previews.length })}
          </p>
          <div className="mt-3 grid gap-3">
            {previews.map((preview) => (
              <div key={preview.recipient.id} className="rounded-md border bg-background p-3">
                <p className="text-xs font-medium">
                  {preview.recipient.name}
                  {preview.recipient.email !== null && (
                    <span className="text-muted-foreground"> ({preview.recipient.email})</span>
                  )}
                </p>
                {preview.error !== null ? (
                  <p className="mt-2 flex items-start gap-1.5 text-xs text-red-700">
                    <X className="mt-0.5 size-3.5 shrink-0" />
                    {preview.error}
                  </p>
                ) : (
                  <>
                    <p className="mt-2 text-sm font-medium">{preview.subject}</p>
                    <iframe
                      title={m["compose.previewFor"]({ name: preview.recipient.name })}
                      sandbox=""
                      srcDoc={`<!doctype html><html><head><style>body{font-family:system-ui,sans-serif;font-size:13px;margin:0}</style></head><body>${preview.body}</body></html>`}
                      className="mt-1 h-28 w-full rounded border bg-white"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
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
                  onChange({
                    ...config,
                    profileId: event.target.value === "" ? null : event.target.value,
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
        </div>
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

// ---- Step 5: generate & review ----

function GenerateStep({
  recipients,
  template,
  state,
  onStateChange,
  onGenerated,
}: {
  recipients: Recipient[];
  template: Template | null;
  state: GenerateState;
  onStateChange: React.Dispatch<React.SetStateAction<GenerateState>>;
  onGenerated: (ids: string[]) => void;
}) {
  const [outputDir, setOutputDir] = useState<string | null>(null);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [spotIndex, setSpotIndex] = useState(0);
  const [spotPdf, setSpotPdf] = useState<{ fileName: string; dataBase64: string } | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    window.api.settings
      .get(SETTING_KEYS.outputDir)
      .then((dir) => setOutputDir(dir))
      .catch(() => setOutputDir(null));
    return () => {
      unsubscribeRef.current?.();
    };
  }, []);

  const generated =
    state.kind === "done" ? state.job.recipients.filter((r) => r.status === "generated") : [];
  const failed =
    state.kind === "done" ? state.job.recipients.filter((r) => r.status === "failed") : [];
  const spotRecipients = generated.map((g) => ({
    jobRecipient: g,
    recipient: recipients.find((r) => r.id === g.recipientId),
  }));
  const clampedIndex = Math.min(spotIndex, Math.max(0, spotRecipients.length - 1));
  const spot = spotRecipients[clampedIndex] ?? null;

  // Fetch the spot-check PDF whenever the done job or the previewed index
  // changes; the recipient id derives from both.
  useEffect(() => {
    if (state.kind !== "done" || spot === null) {
      setSpotPdf(null);
      return;
    }
    let cancelled = false;
    window.api.generate
      .getRecipientPdf({ jobId: state.jobId, recipientId: spot.jobRecipient.recipientId })
      .then((pdf) => {
        if (!cancelled) setSpotPdf(pdf);
      })
      .catch(() => {
        if (!cancelled) setSpotPdf(null);
      });
    return () => {
      cancelled = true;
    };
  }, [state, clampedIndex, spot]);

  const startGeneration = async (): Promise<void> => {
    setGenerateError(null);
    try {
      // Snapshot what the job was started from, so a later selection or
      // template change can invalidate it (stale-state guard).
      const bound = {
        recipientIds: recipients
          .map((r) => r.id)
          .toSorted()
          .join(","),
        templateId: template!.id,
      };
      const started = await window.api.generate.startGenerate({
        templateId: template!.id,
        recipientIds: recipients.map((r) => r.id),
      });
      const running: GenerateState = {
        kind: "running",
        jobId: started.id,
        total: started.total,
        current: 0,
        results: {},
        bound,
      };
      onStateChange(running);
      // Subscribe before running so no event is missed.
      unsubscribeRef.current = window.api.generate.onGenerateProgress((event) => {
        if (event.jobId !== started.id) return;
        onStateChange((prev) => {
          if (prev.kind !== "running") return prev;
          return {
            ...prev,
            current: event.current,
            results: {
              ...prev.results,
              [event.recipientId]: { status: event.status, error: event.error },
            },
          };
        });
      });
      const done = await window.api.generate.runGenerate(started.id);
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
      onStateChange({ kind: "done", jobId: started.id, job: done, bound });
      onGenerated(
        done.recipients.filter((r) => r.status === "generated").map((r) => r.recipientId),
      );
      setSpotIndex(0);
    } catch (error) {
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
      onStateChange({ kind: "error", message: errorMessage(error, m["compose.generationFailed"]()) });
    }
  };

  if (template === null) {
    return <p className="text-sm text-muted-foreground">{m["compose.chooseTemplateFirst"]()}</p>;
  }

  const counts =
    state.kind === "running"
      ? {
          generated: Object.values(state.results).filter((r) => r.status === "generated").length,
          failed: Object.values(state.results).filter((r) => r.status === "failed").length,
          pending: state.total - state.current,
        }
      : null;

  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {m["compose.campaignSummary"]()}
        </h3>
        <dl className="mt-2 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted-foreground">{m["compose.recipients"]()}</dt>
            <dd className="font-medium">{recipients.length}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{m["compose.template"]()}</dt>
            <dd className="font-medium">{template.name}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{m["compose.outputFolder"]()}</dt>
            <dd className="truncate font-mono text-xs" title={outputDir ?? undefined}>
              {outputDir ?? "-"}
            </dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-muted-foreground">{m["compose.campaignSummaryHint"]()}</p>
      </div>

      {generateError !== null && (
        <ErrorBanner message={generateError} onDismiss={() => setGenerateError(null)} />
      )}

      {state.kind === "idle" && (
        <div>
          <Button onClick={() => void startGeneration()}>
            <FileText className="size-4" /> {m["compose.generatePdfs"]()}
          </Button>
        </div>
      )}

      {state.kind === "running" && counts !== null && (
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 font-medium">
              <Loader2 className="size-4 animate-spin" /> {m["compose.generating"]()}
            </span>
            <span className="text-muted-foreground">
              {m["compose.ofTotal"]({ current: state.current, total: state.total })}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${state.total === 0 ? 0 : (state.current / state.total) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {m["compose.generatedCounts"]({
              generated: counts.generated,
              failed: counts.failed,
              pending: counts.pending,
            })}
          </p>
        </div>
      )}

      {state.kind === "error" && (
        <div className="flex items-center gap-2">
          <Button onClick={() => void startGeneration()}>{m["compose.tryAgain"]()}</Button>
        </div>
      )}

      {state.kind === "done" && (
        <>
          <div
            className={`flex items-center gap-2 rounded-md border p-3 text-sm ${
              failed.length === 0
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700"
                : "border-amber-500/40 bg-amber-500/10 text-amber-700"
            }`}
          >
            {failed.length === 0 ? (
              <>
                <Check className="size-4 shrink-0" />
                {m["compose.allGenerated"]({ count: generated.length })}
              </>
            ) : (
              <>
                <AlertTriangle className="size-4 shrink-0" />
                {m["compose.generatedWithFailures"]({
                  generated: generated.length,
                  failed: failed.length,
                })}
              </>
            )}
          </div>

          {failed.length > 0 && (
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {m["compose.failedRecipientsTitle"]({ count: failed.length })}
              </h3>
              <ul className="mt-2 max-h-40 space-y-1 overflow-y-auto text-sm">
                {failed.map((f) => {
                  const recipient = recipients.find((r) => r.id === f.recipientId);
                  return (
                    <li key={f.recipientId} className="flex items-start gap-2">
                      <X className="mt-0.5 size-3.5 shrink-0 text-destructive" />
                      <span>
                        <span className="font-medium">{recipient?.name ?? f.recipientName}</span>
                        {recipient?.email !== null && recipient?.email !== undefined && (
                          <span className="text-muted-foreground"> ({recipient.email})</span>
                        )}
                        <span className="text-destructive"> - {f.errorMessage}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {spotRecipients.length > 0 && (
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {m["compose.spotCheck"]()}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {m["compose.spotIndex"]({ index: clampedIndex + 1, total: spotRecipients.length })}
                </span>
              </div>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  {spotPdf === null ? (
                    <div className="flex h-48 items-center justify-center rounded-md border bg-muted/30 text-sm text-muted-foreground">
                      <Loader2 className="mr-2 size-4 animate-spin" /> {m["compose.loadingPreview"]()}
                    </div>
                  ) : (
                    <PdfPreview dataBase64={spotPdf.dataBase64} />
                  )}
                  <p className="mt-1 truncate text-center font-mono text-xs text-muted-foreground">
                    {spotPdf?.fileName ?? ""}
                  </p>
                </div>
                {spot !== null && (
                  <div className="flex flex-col justify-center gap-2 text-sm">
                    <p className="font-medium">
                      {spot.recipient?.name ?? spot.jobRecipient.recipientName}
                    </p>
                    {spot.recipient?.email !== null && spot.recipient?.email !== undefined && (
                      <p className="text-muted-foreground">{spot.recipient.email}</p>
                    )}
                    {spot.recipient?.phone !== null && spot.recipient?.phone !== undefined && (
                      <p className="text-muted-foreground">{spot.recipient.phone}</p>
                    )}
                    <dl className="mt-1 space-y-1">
                      {Object.entries(spot.recipient?.metadata ?? {}).map(([key, value]) => (
                        <div key={key} className="flex justify-between gap-4">
                          <dt className="text-muted-foreground">{key}</dt>
                          <dd className="truncate font-medium">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={clampedIndex <= 0}
                  onClick={() => setSpotIndex((i) => Math.max(0, i - 1))}
                >
                  <ChevronLeft className="size-4" /> {m["common.prev"]()}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={clampedIndex >= spotRecipients.length - 1}
                  onClick={() => setSpotIndex((i) => i + 1)}
                >
                  {m["common.next"]()} <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
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

/** SQLite UTC stamp -> short local date, e.g. "Aug 3, 2026, 2:11 PM". */
function formatStamp(sqliteUtc: string): string {
  const date = new Date(`${sqliteUtc.replace(" ", "T")}Z`);
  if (Number.isNaN(date.getTime())) return sqliteUtc;
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { m } from "@paraglide/messages";
import { toast } from "sonner";
import { GenerateStep, type GenerateState } from "@/components/generate-step";
import { MessageStep } from "@/components/message-step";
import { RecipientsStep } from "@/components/recipients-step";
import { SaveAsTemplateDialog } from "@/components/save-as-template-dialog";
import { SendStep, type SendState } from "@/components/send-step";
import { INITIAL_SMTP, smtpFormValid, SmtpStep, type SmtpFormState } from "@/components/smtp-step";
import { TemplateStep } from "@/components/template-step";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import { plural } from "@/lib/plural";
import { slotCoverage } from "../../../shared/generate";
import { messageCoverage } from "../../../shared/send";
import { parseRateLimitMs, SETTING_KEYS } from "../../../shared/settings";
import type { Recipient, Template } from "../../../shared/ipc";

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
  const smtpValid = smtpFormValid(smtp);

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
        plural(recipients.length, m["compose.prefillRetryOne"], m["compose.prefillRetryOther"]),
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
            attachments={null}
          />
        )}
      </div>

      <footer className="flex items-center justify-between border-t px-6 py-4">
        <Button variant="outline" onClick={backStep} disabled={step === 1}>
          <ChevronLeft className="size-4" /> {m["common.back"]()}
        </Button>
        <span className="text-sm text-muted-foreground">
          {step === 1 &&
            plural(
              selection.size,
              m["compose.recipientsSelectedOne"],
              m["compose.recipientsSelectedOther"],
            )}
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
            (smtpValid
              ? m["compose.connectionDetailsReady"]()
              : m["compose.completeSmtpDetails"]())}
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

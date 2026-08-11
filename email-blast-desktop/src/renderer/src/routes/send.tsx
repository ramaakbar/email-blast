import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Clock, FileOutput, Search, Users, X } from "lucide-react";
import { m } from "@paraglide/messages";
import { toast } from "sonner";
import { ErrorBanner } from "@/components/error-banner";
import { MessageStep } from "@/components/message-step";
import { RecipientsStep } from "@/components/recipients-step";
import { SaveAsTemplateDialog } from "@/components/save-as-template-dialog";
import { SendStep, type SendState } from "@/components/send-step";
import { INITIAL_SMTP, smtpFormValid, SmtpStep, type SmtpFormState } from "@/components/smtp-step";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import { formatTimestamp } from "@/lib/format";
import { messageCoverage } from "../../../shared/send";
import { parseRateLimitMs, SETTING_KEYS } from "../../../shared/settings";
import type {
  GenerateJob,
  GenerateJobRecipient,
  GenerateJobSummary,
  Recipient,
} from "../../../shared/ipc";

export const Route = createFileRoute("/send")({
  component: SendPage,
});

/**
 * The Send workspace (ticket 06): the wizard's online steps as a single
 * page - recipient source (a past Generate Job with per-recipient
 * generate status and attachment flags, or the imported list directly for
 * plain no-attachment sends), the message, SMTP with its Sender Identity,
 * and the send with pause/resume/cancel and per-recipient logs. The
 * "Send these" pre-link from Generate results opens here with the job
 * picked and its generated recipients pre-selected.
 */
function SendPage() {
  const [source, setSource] = useState<"generate" | "list">("generate");
  const [jobId, setJobId] = useState<string | null>(null);
  const [generateJob, setGenerateJob] = useState<GenerateJob | null>(null);
  const [jobRecipients, setJobRecipients] = useState<Recipient[]>([]);
  const [jobError, setJobError] = useState<string | null>(null);
  const [selection, setSelection] = useState<Map<string, Recipient>>(new Map());
  const [message, setMessage] = useState({ subject: "", bodyHtml: "" });
  const [smtp, setSmtp] = useState<SmtpFormState>(INITIAL_SMTP);
  const [send, setSend] = useState<SendState>({ kind: "idle" });

  // The "Send these" pre-link (ticket 06): the generate job to open
  // pre-linked to. Applied once on mount; a plain sidebar visit has none
  // and the workspace starts with an empty job picker. `preselectJobId`
  // binds the pre-select to the exact job it belongs to: the job load
  // pre-selects its generated recipients ("send THESE") and clears the
  // binding - a manual pick made while the pre-link load is in flight,
  // or a failed load, can never inherit the pre-selection.
  const routerState = useRouterState({ select: (state) => state.location.state });
  const prefill = routerState.sendPrefill ?? null;
  const prefillAppliedRef = useRef(false);
  const preselectJobIdRef = useRef<string | null>(null);

  const pastJobsQuery = useQuery({
    queryKey: ["generate", "list"],
    queryFn: () => window.api.generate.list(),
  });
  const pastJobs = pastJobsQuery.data ?? [];

  useEffect(() => {
    if (prefill === null || prefillAppliedRef.current) return;
    prefillAppliedRef.current = true;
    setSource("generate");
    setJobId(prefill.generateJobId);
    preselectJobIdRef.current = prefill.generateJobId;
  }, [prefill]);

  // Loading the picked job: its snapshot plus the live recipient rows for
  // the table (deleted recipients fall back to the job's names). A
  // manual job change clears the selection; a pre-link load replaces it
  // with the generated recipients.
  useEffect(() => {
    let cancelled = false;
    setJobError(null);
    if (jobId === null) {
      setGenerateJob(null);
      setJobRecipients([]);
      return;
    }
    window.api.generate
      .getGenerateStatus(jobId)
      .then((job) => {
        if (cancelled) return;
        if (job === null) {
          // The pre-linked job is gone; there is nothing to pre-select.
          if (preselectJobIdRef.current === jobId) preselectJobIdRef.current = null;
          setJobError(m["send.couldNotLoadJob"]());
          return;
        }
        setGenerateJob(job);
        void Promise.all(
          job.recipients.map((row) => window.api.recipients.get(row.recipientId)),
        ).then((rows) => {
          if (cancelled) return;
          const live = rows.filter((recipient): recipient is Recipient => recipient !== null);
          setJobRecipients(live);
          const preselect = preselectJobIdRef.current === jobId;
          if (preselect) preselectJobIdRef.current = null;
          if (preselect) {
            setSelection(
              new Map(
                live
                  .filter((recipient) =>
                    job.recipients.some(
                      (row) => row.recipientId === recipient.id && row.status === "generated",
                    ),
                  )
                  .map((recipient) => [recipient.id, recipient]),
              ),
            );
          } else {
            setSelection(new Map());
          }
        });
      })
      .catch(() => {
        if (cancelled) return;
        if (preselectJobIdRef.current === jobId) preselectJobIdRef.current = null;
        setJobError(m["send.couldNotLoadJob"]());
      });
    return () => {
      cancelled = true;
    };
  }, [jobId]);

  // Message Templates (ticket 03): the pick select on the message step
  // and the "Save as template" action, same copy-on-pick semantics as
  // the wizard.
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

  // Load the stored rate limit once; the SMTP slider writes it back
  // live, so the gate and every slider agree.
  useEffect(() => {
    window.api.settings
      .get(SETTING_KEYS.rateLimitDelayMs)
      .then((raw) => setSmtp((prev) => ({ ...prev, delayMs: parseRateLimitMs(raw) })))
      .catch(() => undefined);
  }, []);

  const selectedRecipients = useMemo(() => [...selection.values()], [selection]);

  const messageReport = useMemo(
    () => messageCoverage(selectedRecipients, `${message.subject} ${message.bodyHtml}`),
    [selectedRecipients, message],
  );

  const messageValid =
    message.subject.trim() !== "" &&
    message.bodyHtml.trim() !== "" &&
    messageReport.unknownSlots.length === 0;

  const smtpValid = smtpFormValid(smtp);

  const startDisabledHint = !messageValid
    ? message.subject.trim() === ""
      ? m["compose.writeSubjectToContinue"]()
      : message.bodyHtml.trim() === ""
        ? m["compose.writeBodyToContinue"]()
        : m["compose.unknownSlotHint"]()
    : !smtpValid
      ? m["compose.completeSmtpDetails"]()
      : null;

  // The pre-flight summary counts: who of the selection receives an
  // attachment (a `generated` generate-job row) and who does not. Plain
  // list sends have no attachments at all.
  const selectedWithAttachment = useMemo(() => {
    if (source !== "generate" || generateJob === null) return 0;
    let count = 0;
    for (const row of generateJob.recipients) {
      if (row.status === "generated" && selection.has(row.recipientId)) count++;
    }
    return count;
  }, [source, generateJob, selection]);

  const switchSource = (next: "generate" | "list"): void => {
    if (next === source) return;
    setSource(next);
    // The two sources are different recipient pools - never carry a
    // selection across.
    setSelection(new Map());
    setSend({ kind: "idle" });
  };

  return (
    <div className="flex h-full flex-col">
      <header className="px-6 pb-4 pt-6">
        <h1 className="text-2xl font-semibold">{m["send.title"]()}</h1>
        <p className="text-sm text-muted-foreground">{m["send.description"]()}</p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-6 pb-6">
        <section aria-labelledby="send-recipients">
          <h2
            id="send-recipients"
            className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {m["compose.stepRecipients"]()}
          </h2>

          <p className="mb-2 text-xs font-medium text-muted-foreground">
            {m["send.recipientSource"]()}
          </p>
          <div className="mb-3 flex max-w-3xl flex-wrap gap-2">
            <button
              type="button"
              onClick={() => switchSource("generate")}
              className={`flex-1 rounded-lg border p-3 text-left text-sm ${
                source === "generate" ? "border-primary bg-primary/5" : "hover:bg-muted"
              }`}
            >
              <span className="flex items-center gap-2 font-medium">
                <FileOutput className="size-4" /> {m["send.sourceFromJob"]()}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {m["send.sourceFromJobHint"]()}
              </span>
            </button>
            <button
              type="button"
              onClick={() => switchSource("list")}
              className={`flex-1 rounded-lg border p-3 text-left text-sm ${
                source === "list" ? "border-primary bg-primary/5" : "hover:bg-muted"
              }`}
            >
              <span className="flex items-center gap-2 font-medium">
                <Users className="size-4" /> {m["send.sourceFromList"]()}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {m["send.sourceFromListHint"]()}
              </span>
            </button>
          </div>

          {source === "generate" ? (
            <div className="flex max-w-3xl flex-col gap-3">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">
                  {m["send.chooseJob"]()}
                </span>
                <select
                  value={jobId ?? ""}
                  onChange={(event) =>
                    setJobId(event.target.value === "" ? null : event.target.value)
                  }
                  className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring"
                >
                  <option value="">{m["send.chooseJob"]()}</option>
                  {pastJobs.map((job) => (
                    <option key={job.id} value={job.id}>
                      {jobOptionLabel(job)}
                    </option>
                  ))}
                </select>
              </label>

              {pastJobsQuery.isError && (
                <ErrorBanner
                  message={errorMessage(pastJobsQuery.error, m["send.couldNotLoadJobs"]())}
                />
              )}

              {!pastJobsQuery.isError && pastJobs.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
                  <FileOutput className="size-8 text-muted-foreground" />
                  <p className="text-sm font-medium">{m["send.noGenerateJobsYet"]()}</p>
                  <p className="max-w-sm text-xs text-muted-foreground">
                    {m["send.noGenerateJobsHint"]()}
                  </p>
                </div>
              )}

              {jobError !== null && <ErrorBanner message={jobError} />}

              {generateJob !== null && (
                <JobRecipientTable
                  job={generateJob}
                  liveRecipients={jobRecipients}
                  selection={selection}
                  onSelectionChange={setSelection}
                />
              )}
            </div>
          ) : (
            <RecipientsStep selection={selection} onSelectionChange={setSelection} />
          )}
        </section>

        <section aria-labelledby="send-message">
          <h2
            id="send-message"
            className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {m["compose.stepMessage"]()}
          </h2>
          <MessageStep
            recipients={selectedRecipients}
            message={message}
            onChange={setMessage}
            messageTemplates={messageTemplates}
            onPickTemplate={pickMessageTemplate}
            onSaveAsTemplate={() => setSaveAsOpen(true)}
            saveAsPending={saveAsMutation.isPending}
          />
        </section>

        <section aria-labelledby="send-smtp">
          <h2
            id="send-smtp"
            className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {m["compose.stepSmtp"]()}
          </h2>
          <SmtpStep config={smtp} onChange={setSmtp} />
        </section>

        <section aria-labelledby="send-send">
          <h2
            id="send-send"
            className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {m["compose.stepSend"]()}
          </h2>
          <SendStep
            recipientIds={selectedRecipients.map((r) => r.id)}
            generateJobId={source === "generate" ? jobId : null}
            message={message}
            smtp={smtp}
            state={send}
            onStateChange={setSend}
            attachments={{
              withAttachment: selectedWithAttachment,
              withoutAttachment: selection.size - selectedWithAttachment,
            }}
            startDisabled={!messageValid || !smtpValid}
            startDisabledHint={startDisabledHint}
          />
        </section>
      </div>

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

/** The display label of one Past Generate Jobs row in the picker. */
function jobOptionLabel(job: GenerateJobSummary): string {
  return m["send.jobOption"]({
    template: job.templateName,
    generated: job.generatedCount,
    failed: job.failedCount,
    stamp: formatTimestamp(job.createdAt),
  });
}

/**
 * The recipient table of a picked Generate Job: every job recipient with
 * its generate status, the attachment flag (generated = has a PDF), the
 * flagged failed-generate rows, a search filter, and the has-attachment /
 * no-attachment / all filter (ticket 06). The selection lives in the
 * parent so the send handoff owns the same Map as the list source.
 */
function JobRecipientTable({
  job,
  liveRecipients,
  selection,
  onSelectionChange,
}: {
  job: GenerateJob;
  /** Live recipient rows for names/emails; deleted recipients fall back to the job's names. */
  liveRecipients: Recipient[];
  selection: Map<string, Recipient>;
  onSelectionChange: (next: Map<string, Recipient>) => void;
}) {
  const [search, setSearch] = useState("");
  const [attachmentFilter, setAttachmentFilter] = useState<"all" | "with" | "without">("all");

  const liveById = useMemo(() => new Map(liveRecipients.map((r) => [r.id, r])), [liveRecipients]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return job.recipients.filter((row) => {
      if (attachmentFilter === "with" && row.status !== "generated") return false;
      if (attachmentFilter === "without" && row.status === "generated") return false;
      if (query === "") return true;
      const live = liveById.get(row.recipientId);
      return (
        row.recipientName.toLowerCase().includes(query) ||
        (live?.email?.toLowerCase().includes(query) ?? false)
      );
    });
  }, [job.recipients, liveById, search, attachmentFilter]);

  const selectedRows = useMemo(
    () => job.recipients.filter((row) => selection.has(row.recipientId)),
    [job.recipients, selection],
  );
  const selectedWithAttachment = selectedRows.filter((row) => row.status === "generated").length;

  const toggle = (row: GenerateJobRecipient): void => {
    const next = new Map(selection);
    if (next.has(row.recipientId)) next.delete(row.recipientId);
    else {
      const live = liveById.get(row.recipientId);
      if (live !== undefined) next.set(row.recipientId, live);
    }
    onSelectionChange(next);
  };

  /** Selects every filtered row whose live recipient still exists. */
  const selectFiltered = (): void => {
    onSelectionChange(
      new Map(
        filtered
          .map((row) => [row.recipientId, liveById.get(row.recipientId)] as const)
          .filter((entry): entry is readonly [string, Recipient] => entry[1] !== undefined),
      ),
    );
  };

  const filteredSelected = filtered.filter((row) => selection.has(row.recipientId));
  const allFilteredSelected = filtered.length > 0 && filteredSelected.length === filtered.length;

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {m["send.jobRecipients"]()}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{m["send.jobRecipientsHint"]()}</p>
      </div>
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
          value={attachmentFilter}
          onChange={(event) =>
            setAttachmentFilter(event.target.value as "all" | "with" | "without")
          }
          aria-label={m["send.attachmentFilterAria"]()}
          className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring"
        >
          <option value="all">{m["send.filterAll"]()}</option>
          <option value="with">{m["send.filterWithAttachment"]()}</option>
          <option value="without">{m["send.filterWithoutAttachment"]()}</option>
        </select>
        {filtered.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={selectFiltered}
            title={m["compose.selectAllMatchingTitle"]({ total: filtered.length })}
          >
            <Users className="size-4" /> {m["compose.selectAllCount"]({ total: filtered.length })}
          </Button>
        )}
      </div>

      {job.recipients.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
          <Users className="size-8 text-muted-foreground" />
          <p className="text-sm font-medium">{m["send.noRecipientsInJob"]()}</p>
        </div>
      )}

      {job.recipients.length > 0 && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
          <Search className="size-8 text-muted-foreground" />
          <p className="text-sm font-medium">{m["compose.noRecipientsMatchFilter"]()}</p>
        </div>
      )}

      {filtered.length > 0 && (
        <>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="w-10 px-3 py-2">
                    <input
                      type="checkbox"
                      aria-label={m["compose.selectAllOnPage"]()}
                      checked={allFilteredSelected}
                      ref={(node) => {
                        if (node !== null) {
                          node.indeterminate = filteredSelected.length > 0 && !allFilteredSelected;
                        }
                      }}
                      onChange={() => {
                        if (allFilteredSelected) {
                          const next = new Map(selection);
                          for (const row of filtered) next.delete(row.recipientId);
                          onSelectionChange(next);
                        } else {
                          selectFiltered();
                        }
                      }}
                      className="size-4 accent-primary"
                    />
                  </th>
                  <th className="px-3 py-2">{m["compose.name"]()}</th>
                  <th className="px-3 py-2">{m["compose.email"]()}</th>
                  <th className="hidden px-3 py-2 sm:table-cell">{m["send.generateStatus"]()}</th>
                  <th className="hidden px-3 py-2 sm:table-cell">{m["send.attachment"]()}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((row) => {
                  const live = liveById.get(row.recipientId);
                  return (
                    <tr
                      key={row.recipientId}
                      className={`transition-colors hover:bg-muted/40 ${
                        selection.has(row.recipientId) ? "bg-primary/5" : ""
                      }`}
                    >
                      <td className="px-3 py-2">
                        <input
                          type="checkbox"
                          aria-label={m["compose.selectRecipient"]({ name: row.recipientName })}
                          checked={selection.has(row.recipientId)}
                          onChange={() => toggle(row)}
                          className="size-4 accent-primary"
                        />
                      </td>
                      <td className="px-3 py-2 font-medium">{row.recipientName}</td>
                      <td className="px-3 py-2 text-muted-foreground">{live?.email ?? "-"}</td>
                      <td className="hidden px-3 py-2 sm:table-cell">
                        {row.status === "failed" ? (
                          <span
                            className="inline-flex items-center gap-1 rounded-full border border-red-600/40 bg-red-600/10 px-2 py-0.5 text-xs font-medium text-red-700"
                            title={m["send.failedGenerateTitle"]()}
                          >
                            <X className="size-3" /> {m["status.failed"]()}
                          </span>
                        ) : row.status === "generated" ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-600/40 bg-emerald-600/10 px-2 py-0.5 text-xs font-medium text-emerald-700">
                            <Check className="size-3" /> {m["status.generated"]()}
                          </span>
                        ) : (
                          // A pending row (interrupted or never-run job)
                          // has no PDF: never claim "Generated" for it.
                          <span className="inline-flex items-center gap-1 rounded-full border border-slate-600/40 bg-slate-600/10 px-2 py-0.5 text-xs font-medium text-slate-700">
                            <Clock className="size-3" /> {m["status.pending"]()}
                          </span>
                        )}
                      </td>
                      <td className="hidden px-3 py-2 text-muted-foreground sm:table-cell">
                        {row.status === "generated"
                          ? m["send.rowHasAttachment"]()
                          : m["send.rowNoAttachment"]()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {m["compose.selectionCount"]({
                selected: selection.size,
                total: filtered.length,
              })}
            </span>
            {selection.size > 0 && (
              <span className="text-xs">
                {m["send.attachmentsSummary"]({
                  with: selectedWithAttachment,
                  without: selectedRows.length - selectedWithAttachment,
                })}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

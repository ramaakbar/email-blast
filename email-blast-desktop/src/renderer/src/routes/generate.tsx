import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Clock, FileText, Info, Loader2, RotateCcw, X } from "lucide-react";
import { m } from "@paraglide/messages";
import { ErrorBanner } from "@/components/error-banner";
import { GenerateResults } from "@/components/generate-results";
import { GenerateStep, type GenerateState } from "@/components/generate-step";
import { RecipientsStep } from "@/components/recipients-step";
import { TemplateRoutingStep, buildRoutingReport } from "@/components/template-routing-step";
import { TemplateStep } from "@/components/template-step";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import { formatTimestamp } from "@/lib/format";
import { plural } from "@/lib/plural";
import { slotCoverage } from "../../../shared/generate";
import type { GenerateJob, GenerateJobSummary, Recipient } from "../../../shared/ipc";

export const Route = createFileRoute("/generate")({
  component: GeneratePage,
});

/**
 * The Generate workspace (ticket 05): the wizard's offline steps as a
 * single page - recipient picker, Document Template with slot-coverage
 * validation, and generate & review with live progress, failures, and
 * PDF re-download. No message, SMTP, or send step exists anywhere here;
 * the Send workspace (06) is the send side. Past Generate Jobs can be
 * reopened below with their PDFs re-downloaded, retried into the
 * workspace pre-filled with the job's recipients and template (ticket
 * 07), and "Send these" jumps into the Send workspace pre-linked to the
 * job.
 */

/**
 * Loads one job's snapshot plus its live recipients (deleted ones fall
 * back to the job's names) - shared by the Reopen results view and the
 * Retry pre-fill (ticket 07).
 */
async function loadJobSnapshot(
  jobId: string,
): Promise<{ job: GenerateJob; recipients: Recipient[] } | null> {
  const job = await window.api.generate.getGenerateStatus(jobId);
  if (job === null) return null;
  const recipients = (
    await Promise.all(job.recipients.map((r) => window.api.recipients.get(r.recipientId)))
  ).filter((r): r is Recipient => r !== null);
  return { job, recipients };
}

function GeneratePage() {
  const [selection, setSelection] = useState<Map<string, Recipient>>(new Map());
  const [templateId, setTemplateId] = useState<string | null>(null);
  // The Template Assignment (ticket 08): the routing column (null = no
  // routing, one template for everyone), the value -> template mapping,
  // and the job's ONE output naming pattern.
  const [templateColumn, setTemplateColumn] = useState<string | null>(null);
  const [assignment, setAssignment] = useState<Record<string, string>>({});
  const [jobPattern, setJobPattern] = useState<string>("");
  const [generate, setGenerate] = useState<GenerateState>({ kind: "idle" });
  // The reopened past job: its snapshot plus the live recipients for the
  // spot-check details (deleted ones fall back to the job's names).
  const [reopened, setReopened] = useState<{
    job: GenerateJob;
    recipients: Recipient[];
  } | null>(null);
  const [reopenError, setReopenError] = useState<string | null>(null);
  // The Retry pre-fill's deleted-recipient notice (ticket 07), mirroring
  // the Send workspace's Logs-retry banner.
  const [retryNotice, setRetryNotice] = useState<string | null>(null);

  const templatesQuery = useQuery({
    queryKey: ["templates", "list"],
    queryFn: () => window.api.templates.list(),
  });
  // Memoized so memos below can depend on it without re-running every
  // render (the query data reference is stable; the `?? []` fallback is not).
  const templates = useMemo(() => templatesQuery.data ?? [], [templatesQuery.data]);
  const template = templates.find((t) => t.id === templateId) ?? null;

  // The Past Generate Jobs list is fetched once on mount; a fresh run
  // adds a row, so the list refetches when a job completes - or when a
  // job-level failure leaves the row behind (a `pending` job is still
  // history worth showing).
  const queryClient = useQueryClient();
  useEffect(() => {
    if (generate.kind === "done" || generate.kind === "error") {
      void queryClient.invalidateQueries({ queryKey: ["generate", "list"] });
    }
  }, [generate, queryClient]);

  const pastJobsQuery = useQuery({
    queryKey: ["generate", "list"],
    queryFn: () => window.api.generate.list(),
  });
  const pastJobs = pastJobsQuery.data ?? [];

  const selectedRecipients = useMemo(() => [...selection.values()], [selection]);

  const coverage = useMemo(
    () => slotCoverage(selectedRecipients, template?.slots ?? []),
    [selectedRecipients, template],
  );

  // The Template Assignment report (ticket 08): unassigned values, the
  // shared pattern's validity, and per-template slot coverage. Without a
  // routing column the report is trivially complete and the legacy
  // single-template coverage gates the start action.
  const routingReport = useMemo(
    () =>
      buildRoutingReport(
        selectedRecipients,
        templates,
        template,
        templateColumn,
        assignment,
        jobPattern,
      ),
    [selectedRecipients, templates, template, templateColumn, assignment, jobPattern],
  );
  // Same key order as the GenerateStep serializes its `routing` prop -
  // the bound snapshot must match exactly or a finished job would look
  // stale and reset to idle.
  const routingSignature = JSON.stringify({ templateColumn, assignment, outputPattern: jobPattern });
  const startDisabled = templateColumn === null ? !coverage.ok : !routingReport.complete;
  const startDisabledHint =
    templateColumn !== null && routingReport.unassigned.length > 0
      ? m["generate.startDisabledRouting"]()
      : templateColumn !== null && routingReport.patternError !== null
        ? m["generate.startDisabledPattern"]()
        : m["generate.startDisabledCoverage"]();

  // A finished generate is bound to the selection, default template, and
  // Template Assignment it was started from; changing any of them
  // invalidates the done state, so the results shown can never be stale
  // relative to the workspace inputs.
  useEffect(() => {
    if (generate.kind !== "done") return;
    const nowBound = [...selection.keys()].toSorted().join(",");
    if (
      generate.bound.recipientIds !== nowBound ||
      generate.bound.templateId !== templateId ||
      generate.bound.routing !== routingSignature
    ) {
      setGenerate({ kind: "idle" });
    }
  }, [selection, templateId, routingSignature, generate]);

  /** Routing column change: reset the assignment and seed the pattern from the default template. */
  const handleRoutingColumnChange = (column: string | null): void => {
    setTemplateColumn(column);
    setAssignment({});
    if (column !== null && template !== null) {
      setJobPattern(template.outputPattern);
    }
  };

  /** Default template change: while routing is active, re-seed the shared pattern. */
  const handleTemplateChange = (id: string | null): void => {
    setTemplateId(id);
    if (templateColumn !== null) {
      setJobPattern(templates.find((t) => t.id === id)?.outputPattern ?? "");
    }
  };

  const navigate = useNavigate();

  /** The "Send these" pre-link (ticket 06): jump to the Send workspace with this job picked. */
  const sendThese = (jobId: string): void => {
    void navigate({ to: "/send", state: { sendPrefill: { kind: "job", generateJobId: jobId } } });
  };

  /** Loads one job's snapshot plus its live recipients (deleted ones fall back to the job's names). */
  const openJob = async (jobId: string): Promise<void> => {
    setReopenError(null);
    try {
      const snapshot = await loadJobSnapshot(jobId);
      if (snapshot === null) {
        setReopenError(m["generate.jobNoLongerExists"]());
        return;
      }
      setReopened(snapshot);
    } catch (error) {
      setReopenError(errorMessage(error, m["generate.couldNotReopenJob"]()));
    }
  };

  // The page's scroll container, so a retry can bring the pre-filled
  // workspace inputs back into view.
  const scrollRef = useRef<HTMLDivElement | null>(null);

  /** Retry (ticket 07): pre-fill the workspace with the job's recipients and template. */
  const retryJob = async (jobId: string): Promise<void> => {
    setReopenError(null);
    try {
      const snapshot = await loadJobSnapshot(jobId);
      if (snapshot === null) {
        setReopenError(m["generate.jobNoLongerExists"]());
        return;
      }
      setReopened(null);
      setTemplateId(snapshot.job.templateId);
      // The Template Assignment rides along (ticket 08): the routing
      // column, the value -> template mapping, and the job's own pattern
      // - a routed job retries as the same routed job.
      setTemplateColumn(snapshot.job.templateColumn);
      setAssignment(snapshot.job.assignment ?? {});
      setJobPattern(snapshot.job.outputPattern ?? "");
      setSelection(new Map(snapshot.recipients.map((r) => [r.id, r])));
      // A done run bound to the same inputs would look stale next to the
      // pre-filled state, so the workspace always starts fresh.
      setGenerate({ kind: "idle" });
      // Recipients deleted since the job ran are left out of the pre-fill
      // - say so, exactly like the Send workspace's Logs-retry banner.
      const missing = snapshot.job.recipients.length - snapshot.recipients.length;
      setRetryNotice(
        missing > 0
          ? plural(missing, m["generate.prefillDeletedOne"], m["generate.prefillDeletedOther"])
          : null,
      );
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setReopenError(errorMessage(error, m["generate.couldNotReopenJob"]()));
    }
  };

  return (
    <div className="flex h-full flex-col">
      <header className="px-6 pb-4 pt-6">
        <h1 className="text-2xl font-semibold">{m["generate.title"]()}</h1>
        <p className="text-sm text-muted-foreground">{m["generate.description"]()}</p>
      </header>

      {retryNotice !== null && (
        <div className="mx-6 mb-4 flex items-start gap-2 rounded-lg border border-sky-600/40 bg-sky-600/10 px-4 py-2.5 text-sm text-sky-900">
          <Info className="mt-0.5 size-4 shrink-0" />
          <span>{retryNotice}</span>
        </div>
      )}

      <div ref={scrollRef} className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-6 pb-6">
        <section aria-labelledby="generate-recipients">
          <h2
            id="generate-recipients"
            className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {m["compose.stepRecipients"]()}
          </h2>
          <RecipientsStep selection={selection} onSelectionChange={setSelection} />
        </section>

        <section aria-labelledby="generate-template">
          <h2
            id="generate-template"
            className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {m["compose.stepTemplate"]()}
          </h2>
          <TemplateStep
            templates={templates}
            template={template}
            onTemplateChange={handleTemplateChange}
            selectedRecipients={selectedRecipients}
            coverage={coverage}
          />
        </section>

        <section aria-labelledby="generate-routing">
          <h2
            id="generate-routing"
            className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {m["generate.routingTitle"]()}
          </h2>
          <TemplateRoutingStep
            templates={templates}
            template={template}
            recipients={selectedRecipients}
            report={routingReport}
            templateColumn={templateColumn}
            onTemplateColumnChange={handleRoutingColumnChange}
            assignment={assignment}
            onAssignmentChange={setAssignment}
            jobPattern={jobPattern}
            onJobPatternChange={setJobPattern}
          />
        </section>

        <section aria-labelledby="generate-review">
          <h2
            id="generate-review"
            className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {m["compose.stepGenerate"]()}
          </h2>
          <GenerateStep
            recipients={selectedRecipients}
            template={template}
            state={generate}
            onStateChange={setGenerate}
            // The workspace gates the start action directly, so
            // generation never begins with recipients missing required
            // slot data, an unassigned routing value, or a pattern one
            // routed template cannot fill.
            startDisabled={startDisabled}
            startDisabledHint={startDisabledHint}
            routing={{ templateColumn, assignment, outputPattern: jobPattern }}
            onSendThese={sendThese}
          />
        </section>

        <section aria-labelledby="generate-past-jobs">
          <h2
            id="generate-past-jobs"
            className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {m["generate.pastJobs"]()}
          </h2>

          {pastJobsQuery.isError && (
            <ErrorBanner
              message={errorMessage(pastJobsQuery.error, m["generate.couldNotLoadJobs"]())}
            />
          )}

          {!pastJobsQuery.isError && pastJobs.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-10 text-center">
              <Clock className="size-10 text-muted-foreground" />
              <p className="text-sm font-medium">{m["generate.pastJobsEmpty"]()}</p>
            </div>
          )}

          {pastJobs.length > 0 && (
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2">{m["generate.jobTemplate"]()}</th>
                    <th className="px-3 py-2">{m["generate.jobStatus"]()}</th>
                    <th className="hidden px-3 py-2 sm:table-cell">{m["generate.jobCreated"]()}</th>
                    <th className="px-3 py-2" />
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {pastJobs.map((job) => (
                    <PastJobRow
                      key={job.id}
                      job={job}
                      onOpen={() => void openJob(job.id)}
                      onRetry={() => void retryJob(job.id)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {reopenError !== null && (
            <div className="mt-3">
              <ErrorBanner message={reopenError} onDismiss={() => setReopenError(null)} />
            </div>
          )}

          {reopened !== null && (
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {m["generate.reopenedTitle"]()}
                </h3>
                <Button variant="outline" size="sm" onClick={() => setReopened(null)}>
                  <X className="size-4" /> {m["common.close"]()}
                </Button>
              </div>
              <GenerateResults
                job={reopened.job}
                recipients={reopened.recipients}
                onSendThese={sendThese}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/** One row of the Past Generate Jobs table. */
function PastJobRow({
  job,
  onOpen,
  onRetry,
}: {
  job: GenerateJobSummary;
  onOpen: () => void;
  onRetry: () => void;
}) {
  const statusLabel = generateStatusLabel(job.status);
  return (
    <tr className="transition-colors hover:bg-muted/40">
      <td className="px-3 py-2 font-medium">{job.templateName}</td>
      <td className="px-3 py-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-600/40 bg-slate-600/10 px-2 py-0.5 text-xs font-medium text-slate-700">
          {job.status === "generated" ? (
            <Check className="size-3" />
          ) : job.status === "pending" || job.status === "generating" ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            <FileText className="size-3" />
          )}
          {statusLabel}
        </span>
      </td>
      <td className="hidden px-3 py-2 text-muted-foreground sm:table-cell">
        {formatTimestamp(job.createdAt)}
      </td>
      <td className="px-3 py-2 text-right">
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            title={m["generate.retryJobHint"]()}
          >
            <RotateCcw className="size-3.5" /> {m["common.retry"]()}
          </Button>
          <Button variant="outline" size="sm" onClick={onOpen}>
            {m["generate.reopenJob"]()}
          </Button>
        </div>
      </td>
    </tr>
  );
}

/** The display label of a generate job status. */
function generateStatusLabel(status: GenerateJobSummary["status"]): string {
  switch (status) {
    case "pending":
      return m["status.pending"]();
    case "generating":
      return m["status.generating"]();
    case "generated":
      return m["status.generated"]();
    case "cancelled":
      return m["status.cancelled"]();
  }
}

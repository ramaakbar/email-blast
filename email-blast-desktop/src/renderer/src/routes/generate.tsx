import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Clock, FileText, Loader2, X } from "lucide-react";
import { m } from "@paraglide/messages";
import { ErrorBanner } from "@/components/error-banner";
import { GenerateResults } from "@/components/generate-results";
import { GenerateStep, type GenerateState } from "@/components/generate-step";
import { RecipientsStep } from "@/components/recipients-step";
import { TemplateStep } from "@/components/template-step";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import { formatTimestamp } from "@/lib/format";
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
 * the old composer route remains the send-side bridge until the Send
 * workspace (06) replaces it. Past Generate Jobs can be reopened below
 * with their PDFs re-downloaded.
 */
function GeneratePage() {
  const [selection, setSelection] = useState<Map<string, Recipient>>(new Map());
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [generate, setGenerate] = useState<GenerateState>({ kind: "idle" });
  // The reopened past job: its snapshot plus the live recipients for the
  // spot-check details (deleted ones fall back to the job's names).
  const [reopened, setReopened] = useState<{
    job: GenerateJob;
    recipients: Recipient[];
  } | null>(null);
  const [reopenError, setReopenError] = useState<string | null>(null);

  const templatesQuery = useQuery({
    queryKey: ["templates", "list"],
    queryFn: () => window.api.templates.list(),
  });
  const templates = templatesQuery.data ?? [];
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

  // A finished generate is bound to the selection and template it was
  // started from; changing either invalidates the done state, so the
  // results shown can never be stale relative to the workspace inputs.
  useEffect(() => {
    if (generate.kind !== "done") return;
    const nowBound = [...selection.keys()].toSorted().join(",");
    if (generate.bound.recipientIds !== nowBound || generate.bound.templateId !== templateId) {
      setGenerate({ kind: "idle" });
    }
  }, [selection, templateId, generate]);

  const openJob = async (jobId: string): Promise<void> => {
    setReopenError(null);
    try {
      const job = await window.api.generate.getGenerateStatus(jobId);
      if (job === null) {
        setReopenError(m["generate.jobNoLongerExists"]());
        return;
      }
      const recipients = (
        await Promise.all(job.recipients.map((r) => window.api.recipients.get(r.recipientId)))
      ).filter((r): r is Recipient => r !== null);
      setReopened({ job, recipients });
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

      <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-6 pb-6">
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
            onTemplateChange={setTemplateId}
            selectedRecipients={selectedRecipients}
            coverage={coverage}
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
            // The wizard gates its own coverage check on the stepper; the
            // workspace gates the start action directly, so generation
            // never begins with recipients missing required slot data.
            startDisabled={!coverage.ok}
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
                    <PastJobRow key={job.id} job={job} onOpen={() => void openJob(job.id)} />
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
              <GenerateResults job={reopened.job} recipients={reopened.recipients} />
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
}: {
  job: GenerateJobSummary;
  onOpen: () => void;
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
        <Button variant="outline" size="sm" onClick={onOpen}>
          {m["generate.reopenJob"]()}
        </Button>
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

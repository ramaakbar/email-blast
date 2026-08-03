import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  FileText,
  Loader2,
  Lock,
  Send,
  Users,
  X,
} from "lucide-react";
import { ErrorBanner } from "@/components/error-banner";
import { PatternPreview } from "@/components/pattern-preview";
import { PdfPreview } from "@/components/pdf-preview";
import { TemplateBadge } from "@/components/template-badge";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import { slotCoverage } from "../../../shared/generate";
import type { GenerateJob, Recipient, Template } from "../../../shared/ipc";
import { SETTING_KEYS } from "../../../shared/settings";

export const Route = createFileRoute("/compose")({
  component: ComposePage,
});

/**
 * The 6-step compose wizard (spec decision 8). Ticket 13 builds steps
 * 1 (recipients), 2 (template), and 5 (generate & review) end to end;
 * steps 3 (message) and 4 (SMTP) arrive with the send pipeline (ticket
 * 15), so they are locked placeholders here. Wizard state lives in React
 * and is handed forward step by step; step 5 records the generated-only
 * recipient list for the send step, excluding failures automatically.
 */

const WIZARD_STEPS = [
  { n: 1, label: "Recipients" },
  { n: 2, label: "Template" },
  { n: 3, label: "Message" },
  { n: 4, label: "SMTP" },
  { n: 5, label: "Generate & Review" },
  { n: 6, label: "Send" },
] as const;

/** Steps 3, 4, and 6 belong to tickets 14/15; they render as locked here. */
const LOCKED_STEPS = new Set([3, 4, 6]);

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

function ComposePage() {
  const [step, setStep] = useState<number>(1);
  const [selection, setSelection] = useState<Map<string, Recipient>>(new Map());
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [generate, setGenerate] = useState<GenerateState>({ kind: "idle" });
  // The send handoff: only recipients with confirmed output (ticket 15).
  const [sendRecipientIds, setSendRecipientIds] = useState<string[]>([]);

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

  const canNext =
    step === 1
      ? selection.size > 0
      : step === 2
        ? template !== null && coverage.ok
        : generate.kind === "done";

  const nextStep = (): void => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(5);
    else if (step === 5) setStep(6);
  };

  const backStep = (): void => {
    if (step === 2) setStep(1);
    else if (step === 5) setStep(2);
    else setStep(5);
  };

  const failedCount =
    generate.kind === "done"
      ? generate.job.recipients.filter((r) => r.status === "failed").length
      : 0;

  // A finished generate is bound to the selection and template it was
  // started from; changing either invalidates the done state and the send
  // handoff, so the wizard can never hand a stale job forward. Toggling a
  // recipient on and off back to the same set keeps the job valid.
  useEffect(() => {
    if (generate.kind !== "done") return;
    const nowBound = [...selection.keys()].toSorted().join(",");
    if (generate.bound.recipientIds !== nowBound || generate.bound.templateId !== templateId) {
      setGenerate({ kind: "idle" });
      setSendRecipientIds([]);
    }
  }, [selection, templateId, generate]);

  return (
    <div className="flex h-full flex-col">
      <header className="px-6 pb-4 pt-6">
        <h1 className="text-2xl font-semibold">Compose</h1>
        <p className="text-sm text-muted-foreground">
          Pick who receives the documents, choose a template, and generate the PDFs.
        </p>
      </header>

      <WizardStepper
        current={step}
        onGoTo={(n) => setStep(n)}
        reachable5={selection.size > 0 && template !== null && coverage.ok}
      />

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
          <SendPlaceholder sendCount={sendRecipientIds.length} failedCount={failedCount} />
        )}
      </div>

      <footer className="flex items-center justify-between border-t px-6 py-4">
        <Button variant="outline" onClick={backStep} disabled={step === 1}>
          <ChevronLeft className="size-4" /> Back
        </Button>
        <span className="text-sm text-muted-foreground">
          {step === 1 && `${selection.size} recipient${selection.size === 1 ? "" : "s"} selected`}
          {step === 2 &&
            coverage.ok &&
            `${selectedRecipients.length} recipients, data covers all slots`}
          {step === 5 && generate.kind === "done" && (
            <>
              {generate.job.recipients.filter((r) => r.status === "generated").length} generated,{" "}
              {generate.job.recipients.filter((r) => r.status === "failed").length} failed
            </>
          )}
        </span>
        {step !== 6 && (
          <Button onClick={nextStep} disabled={!canNext}>
            Next
            <ChevronRight className="size-4" />
          </Button>
        )}
      </footer>
    </div>
  );
}

function WizardStepper({
  current,
  onGoTo,
  reachable5,
}: {
  current: number;
  onGoTo: (n: number) => void;
  reachable5: boolean;
}) {
  return (
    <ol className="flex items-center gap-1 px-6 pb-2 text-sm">
      {WIZARD_STEPS.map((s, index) => {
        const locked = LOCKED_STEPS.has(s.n);
        const done = current > s.n && !locked;
        const active = current === s.n;
        const clickable = !locked && (s.n <= 2 || (s.n === 5 && reachable5));
        return (
          <li key={s.n} className="flex min-w-0 items-center gap-1">
            {index > 0 && <span className="mx-1 h-px w-4 shrink-0 bg-border" />}
            <button
              type="button"
              onClick={() => clickable && onGoTo(s.n)}
              disabled={!clickable}
              title={locked ? "Arrives with the send pipeline (next update)" : undefined}
              className={`flex min-w-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                active ? "bg-primary text-primary-foreground" : clickable ? "hover:bg-muted" : ""
              } ${locked ? "text-muted-foreground/60" : "text-foreground"}`}
            >
              {locked ? (
                <Lock className="size-3 shrink-0" />
              ) : done ? (
                <Check className="size-3 shrink-0" />
              ) : (
                <span className="shrink-0">{s.n}</span>
              )}
              <span className="truncate">{s.label}</span>
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
          <span className="sr-only">Search recipients</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name, email, or any field…"
            className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          />
        </label>
        <select
          value={importBatch ?? ""}
          onChange={(event) =>
            setImportBatch(event.target.value === "" ? null : event.target.value)
          }
          aria-label="Filter by import batch"
          className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring"
        >
          <option value="">All batches</option>
          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.count} recipients · {formatStamp(batch.createdAt)}
            </option>
          ))}
        </select>
        {total > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => void selectAllMatching()}
            title={`Select all ${total} recipients matching the current filter`}
          >
            <Users className="size-4" /> Select all {total}
          </Button>
        )}
      </div>

      {listQuery.isError && (
        <ErrorBanner message={errorMessage(listQuery.error, "Could not load recipients.")} />
      )}

      {!listQuery.isError && total === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
          <Users className="size-10 text-muted-foreground" />
          <p className="text-sm font-medium">
            {debouncedSearch === "" && importBatch === null
              ? "No recipients yet"
              : "No recipients match this filter"}
          </p>
          <p className="max-w-sm text-xs text-muted-foreground">
            {debouncedSearch === "" && importBatch === null ? (
              <>
                Import an Excel file first, then come back here to build a campaign.
                <Link
                  to="/import"
                  className="block text-primary underline-offset-2 hover:underline"
                >
                  Go to Import
                </Link>
              </>
            ) : (
              "Try a different search or batch filter."
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
                      aria-label="Select all on this page"
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
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="hidden px-3 py-2 sm:table-cell">Phone</th>
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
                        aria-label={`Select ${recipient.name}`}
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
            <span>
              {selection.size} selected · {total} matching
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="size-4" /> Prev
              </Button>
              <span>
                Page {Math.min(page, totalPages)} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              >
                Next <ChevronRight className="size-4" />
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
          Letter or certificate template
        </span>
        <select
          value={template?.id ?? ""}
          onChange={(event) =>
            onTemplateChange(event.target.value === "" ? null : event.target.value)
          }
          className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring"
        >
          <option value="">Choose a template…</option>
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </label>

      {templates.length === 0 && (
        <p className="rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700">
          No templates registered yet.{" "}
          <Link to="/templates" className="underline underline-offset-2">
            Register a template
          </Link>{" "}
          first, then come back.
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
                Required slots
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
                Output pattern
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
          All {selectedRecipients.length} selected recipients have data for every required slot.
        </p>
      )}

      {template !== null && !coverage.ok && (
        <div className="flex items-start gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700">
          <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
          <div>
            <p className="font-medium">
              {coverage.recipientsMissing} of {selectedRecipients.length} selected recipients are
              missing data for:
            </p>
            <ul className="mt-1 list-inside list-disc">
              {coverage.slots.map((entry) => (
                <li key={entry.slot}>
                  {"{"}
                  {entry.slot}
                  {"}"} - {entry.missingCount} recipient{entry.missingCount === 1 ? "" : "s"}
                </li>
              ))}
            </ul>
            <p className="mt-1">
              Fix the recipients' data or pick another template before continuing - missing slots
              produce broken PDFs.
            </p>
          </div>
        </div>
      )}
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
        recipientIds: recipients.map((r) => r.id).toSorted().join(","),
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
      onStateChange({ kind: "error", message: errorMessage(error, "Generation failed.") });
    }
  };

  if (template === null) {
    return <p className="text-sm text-muted-foreground">Go back and choose a template first.</p>;
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
          Campaign summary
        </h3>
        <dl className="mt-2 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted-foreground">Recipients</dt>
            <dd className="font-medium">{recipients.length}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Template</dt>
            <dd className="font-medium">{template.name}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Output folder</dt>
            <dd className="truncate font-mono text-xs" title={outputDir ?? undefined}>
              {outputDir ?? "-"}
            </dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-muted-foreground">
          One PDF per recipient, named by the template's output pattern. Failures are reported per
          recipient while the rest of the batch continues.
        </p>
      </div>

      {generateError !== null && (
        <ErrorBanner message={generateError} onDismiss={() => setGenerateError(null)} />
      )}

      {state.kind === "idle" && (
        <div>
          <Button onClick={() => void startGeneration()}>
            <FileText className="size-4" /> Generate PDFs
          </Button>
        </div>
      )}

      {state.kind === "running" && counts !== null && (
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 font-medium">
              <Loader2 className="size-4 animate-spin" /> Generating…
            </span>
            <span className="text-muted-foreground">
              {state.current} of {state.total}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${state.total === 0 ? 0 : (state.current / state.total) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {counts.generated} generated · {counts.failed} failed · {counts.pending} pending
          </p>
        </div>
      )}

      {state.kind === "error" && (
        <div className="flex items-center gap-2">
          <Button onClick={() => void startGeneration()}>Try again</Button>
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
                All {generated.length} PDFs generated.
              </>
            ) : (
              <>
                <AlertTriangle className="size-4 shrink-0" />
                {generated.length} generated, {failed.length} failed. Failed recipients are excluded
                from the send automatically.
              </>
            )}
          </div>

          {failed.length > 0 && (
            <div className="rounded-lg border bg-card p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Failed recipients ({failed.length})
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
                  Spot-check
                </h3>
                <span className="text-xs text-muted-foreground">
                  {clampedIndex + 1} of {spotRecipients.length}
                </span>
              </div>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  {spotPdf === null ? (
                    <div className="flex h-48 items-center justify-center rounded-md border bg-muted/30 text-sm text-muted-foreground">
                      <Loader2 className="mr-2 size-4 animate-spin" /> Loading preview…
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
                  <ChevronLeft className="size-4" /> Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={clampedIndex >= spotRecipients.length - 1}
                  onClick={() => setSpotIndex((i) => i + 1)}
                >
                  Next <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ---- Step 6 placeholder (send pipeline, ticket 15) ----

function SendPlaceholder({ sendCount, failedCount }: { sendCount: number; failedCount: number }) {
  return (
    <div className="flex max-w-2xl flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
      <Send className="size-10 text-muted-foreground" />
      <p className="text-sm font-medium">Ready to send - the send step arrives next</p>
      <p className="max-w-md text-xs text-muted-foreground">
        {sendCount} recipient{sendCount === 1 ? "" : "s"} with generated attachments are queued here
        {failedCount > 0
          ? `; ${failedCount} failed recipient${failedCount === 1 ? "" : "s"} were excluded`
          : ""}
        . The SMTP and message steps (3 and 4) plus the send pipeline land in the next update.
      </p>
    </div>
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

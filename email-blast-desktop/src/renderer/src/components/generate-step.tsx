import { useEffect, useRef, useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { m } from "@paraglide/messages";
import { ErrorBanner } from "@/components/error-banner";
import { GenerateResults } from "@/components/generate-results";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import { SETTING_KEYS } from "../../../shared/settings";
import type { GenerateJob, Recipient, Template } from "../../../shared/ipc";

/** The no-routing default: a stable reference for the `routing` prop default. */
const NO_ROUTING = { templateColumn: null, assignment: {}, outputPattern: "" } as const;

/**
 * The live state of a generate job in the Generate workspace: idle →
 * running (progress events streaming in) → done, or error. `bound`
 * snapshots the selection and template the job was started from, so a
 * later change can invalidate the done state (stale-state guard, owned
 * by the host page).
 */
export type GenerateState =
  | { kind: "idle" }
  | {
      kind: "running";
      jobId: string;
      total: number;
      current: number;
      results: Record<string, { status: "generated" | "failed"; error: string | null }>;
      /**
       * The selection, default template, and Template Assignment the job
       * was started from, for staleness checks (ticket 08).
       */
      bound: { recipientIds: string; templateId: string; routing: string };
    }
  | {
      kind: "done";
      jobId: string;
      job: GenerateJob;
      bound: { recipientIds: string; templateId: string; routing: string };
    }
  | { kind: "error"; message: string };

/**
 * The generate & review panel of the Generate workspace: a campaign
 * summary, the start action, live per-recipient progress, and - once
 * finished - the results view (banner, failures, spot-check with
 * re-download).
 */
export function GenerateStep({
  recipients,
  template,
  state,
  onStateChange,
  startDisabled = false,
  startDisabledHint,
  routing = NO_ROUTING,
  onSendThese,
}: {
  recipients: Recipient[];
  template: Template | null;
  state: GenerateState;
  onStateChange: React.Dispatch<React.SetStateAction<GenerateState>>;
  /**
   * Gates the start action, e.g. the workspace's slot-coverage check,
   * so generation never begins with recipients missing required slot
   * data.
   */
  startDisabled?: boolean;
  /** The hint under the disabled start button; defaults to the coverage hint. */
  startDisabledHint?: string;
  /**
   * The Template Assignment (ticket 08): the routing column (null = no
   * routing), the value -> template mapping, and the job's output
   * pattern. Sent with the start payload and folded into the bound
   * snapshot, so a later change invalidates the done state exactly like
   * a selection change.
   */
  routing?: {
    templateColumn: string | null;
    assignment: Record<string, string>;
    outputPattern: string;
  };
  /** The Send workspace pre-link ("Send these"). */
  onSendThese?: (jobId: string) => void;
}) {
  const [outputDir, setOutputDir] = useState<string | null>(null);
  const [generateError, setGenerateError] = useState<string | null>(null);
  // In-flight guard: between `startGenerate` resolving and the running
  // state landing, the button still shows idle - a second click would
  // start a second job and leak the first subscription.
  const [starting, setStarting] = useState(false);
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

  const startGeneration = async (): Promise<void> => {
    if (template === null || starting) return;
    setStarting(true);
    setGenerateError(null);
    try {
      // Snapshot what the job was started from, so a later selection,
      // template, or Template Assignment change can invalidate it
      // (stale-state guard).
      const bound = {
        recipientIds: recipients
          .map((r) => r.id)
          .toSorted()
          .join(","),
        templateId: template.id,
        routing: JSON.stringify(routing),
      };
      const started = await window.api.generate.startGenerate({
        templateId: template.id,
        recipientIds: recipients.map((r) => r.id),
        templateColumn: routing.templateColumn,
        assignment: routing.assignment,
        outputPattern: routing.outputPattern,
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
    } catch (error) {
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
      onStateChange({
        kind: "error",
        message: errorMessage(error, m["compose.generationFailed"]()),
      });
    } finally {
      setStarting(false);
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
          <Button onClick={() => void startGeneration()} disabled={startDisabled || starting}>
            {starting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <FileText className="size-4" />
            )}
            {m["compose.generatePdfs"]()}
          </Button>
          {startDisabled && (
            <p className="mt-2 text-xs text-amber-700">
              {startDisabledHint ?? m["generate.startDisabledCoverage"]()}
            </p>
          )}
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
        <GenerateResults job={state.job} recipients={recipients} onSendThese={onSendThese} />
      )}
    </div>
  );
}

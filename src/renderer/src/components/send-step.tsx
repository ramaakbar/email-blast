import { useEffect, useRef } from "react";
import {
  AlertTriangle,
  Check,
  CircleStop,
  Loader2,
  Pause,
  Play,
  RotateCcw,
  Send,
  X,
} from "lucide-react";
import { m } from "@paraglide/messages";
import { ErrorBanner } from "@/components/error-banner";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import { normalizeIdentity } from "../../../shared/sender-identity";
import { parseSmtpCredentials } from "../../../shared/smtp-validation";
import type { SendJob, SendStartPayload } from "../../../shared/ipc";
import type { SmtpFormState } from "./smtp-step";

/**
 * The send step of the Send workspace (ticket 06): the pre-flight
 * summary, the start action, and the live run with pause/resume/cancel
 * and the per-recipient log. `attachments` carries the per-recipient
 * attachment counts so the summary shows who gets attachments and who
 * does not.
 */

/** One per-recipient log row (names seeded from the job; `skipped` appears on cancel). */
export interface SendLogRow {
  status: "sent" | "failed" | "skipped" | null;
  messageId: string | null;
  error: string | null;
  name: string;
}

/**
 * The running log's initial rows: every recipient with its name, so the
 * per-recipient list reads correctly before the first event lands.
 */
export function seedResults(job: SendJob): Record<string, SendLogRow> {
  return Object.fromEntries(
    job.recipients.map((r) => [
      r.recipientId,
      { status: null, messageId: null, error: null, name: r.recipientName },
    ]),
  );
}

/** The live state of a send job in the host page. */
export type SendState =
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

export function SendStep({
  recipientIds,
  generateJobId,
  message,
  smtp,
  state,
  onStateChange,
  attachments,
  startDisabled = false,
  startDisabledHint = null,
}: {
  recipientIds: string[];
  /** Null for a plain no-attachment send (ticket 06). */
  generateJobId: string | null;
  message: { subject: string; bodyHtml: string };
  smtp: SmtpFormState;
  state: SendState;
  onStateChange: React.Dispatch<React.SetStateAction<SendState>>;
  /**
   * The per-recipient attachment counts for the pre-flight summary: who
   * of the selection receives a PDF and who does not.
   */
  attachments: { withAttachment: number; withoutAttachment: number };
  /**
   * An extra gate on the start action, e.g. the Send workspace's message
   * validity check.
   */
  startDisabled?: boolean;
  /** The reason shown under the disabled button; null keeps the hint hidden. */
  startDisabledHint?: string | null;
}) {
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const pausedRef = useRef<(() => void) | null>(null);
  const logRef = useRef<HTMLUListElement>(null);
  const runRef = useRef<number>(0);

  // Unmount (or leaving the step mid-run) unsubscribes the event
  // listeners; a returning mount re-subscribes through the running state
  // below.
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
    if (recipientIds.length === 0) return;
    try {
      // The inline override is built through the shared credential shape
      // (one typed construction, no local port coercion). The send button
      // is gated on smtpFormValid, which uses the same parse, so the
      // error branch is unreachable here.
      const smtpOverride = smtp.mode === "inline" ? parseSmtpCredentials(smtp) : null;
      if (smtpOverride !== null && "message" in smtpOverride) return;
      const payload: SendStartPayload = {
        generateJobId,
        recipientIds,
        smtpProfileId: smtp.mode === "profile" ? smtp.profileId : null,
        smtpOverride,
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
              {m["send.attachmentsSummary"]({
                with: attachments.withAttachment,
                without: attachments.withoutAttachment,
              })}
            </dd>
          </div>
        </dl>
        <p className="mt-2 text-xs text-muted-foreground">{m["send.preflightHint"]()}</p>
      </div>

      {state.kind === "idle" && (
        <div className="flex flex-col items-start gap-2">
          <Button
            disabled={recipientIds.length === 0 || startDisabled}
            onClick={() => void startSending()}
          >
            <Send className="size-4" />{" "}
            {recipientIds.length === 1
              ? m["compose.sendCountOne"]({ count: recipientIds.length })
              : m["compose.sendCountOther"]({ count: recipientIds.length })}
          </Button>
          {recipientIds.length === 0 ? (
            <p className="text-xs text-muted-foreground">{m["sendJob.selectRecipients"]()}</p>
          ) : (
            startDisabled &&
            startDisabledHint !== null && (
              <p className="text-xs text-amber-700">{startDisabledHint}</p>
            )
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
export function SendLogRowView({ row }: { row: SendLogRow }) {
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

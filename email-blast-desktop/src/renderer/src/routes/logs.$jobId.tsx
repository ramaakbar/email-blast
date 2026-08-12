import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowLeft, Loader2, Play, RotateCcw, Search } from "lucide-react";
import { m } from "@paraglide/messages";
import { ErrorBanner } from "@/components/error-banner";
import { SendStatusBadge } from "@/components/send-status-badge";
import { Button } from "@/components/ui/button";
import { buildRetryPrefill } from "@/lib/send-prefill";
import { errorMessage } from "@/lib/error-message";
import { formatDuration, formatTimestamp } from "@/lib/format";
import { useResumeSend } from "@/lib/use-resume-send";
import type { SendJobRecipient, SendRecipientStatus } from "../../../shared/ipc";

export const Route = createFileRoute("/logs/$jobId")({
  component: JobDetailPage,
});

const ALL_STATUSES = "all";
const RECIPIENT_STATUS_OPTIONS: ReadonlyArray<{ value: SendRecipientStatus; label: () => string }> = [
  { value: "sent", label: () => m["status.sent"]() },
  { value: "failed", label: () => m["status.failed"]() },
  { value: "skipped", label: () => m["status.skipped"]() },
  { value: "pending", label: () => m["status.pending"]() },
];

const RECIPIENT_BADGE_STYLES: Record<SendRecipientStatus, string> = {
  pending: "border-slate-600/40 bg-slate-600/10 text-slate-700",
  sent: "border-emerald-600/40 bg-emerald-600/10 text-emerald-700",
  failed: "border-rose-600/40 bg-rose-600/10 text-rose-700",
  skipped: "border-zinc-600/40 bg-zinc-600/10 text-zinc-600",
};

const columnHelper = createColumnHelper<SendJobRecipient>();

/**
 * The job detail screen (ticket 16): a summary header (subject, template,
 * SMTP identity, timestamps) over a per-recipient table with status,
 * error messages, and timestamps - searchable and filterable. Failed
 * recipients retry individually or all at once, opening the Send
 * workspace pre-filled with the same recipients, message, and SMTP
 * identity; the re-send creates a NEW job scoped to them (ticket 07).
 */
function JobDetailPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { jobId } = Route.useParams();
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>(ALL_STATUSES);
  const { resumingId, resumeError, dismissResumeError, resume } = useResumeSend();

  const detailQuery = useQuery({
    queryKey: ["logs", "detail", jobId],
    // The full snapshot is the send domain's existing get-status; the
    // Logs screen adds no channel of its own (additive contract).
    queryFn: () => window.api.send.getSendStatus(jobId),
  });

  // Live updates: a resume started here (or a send elsewhere) moves the
  // rows under the table without a manual refresh.
  useEffect(() => {
    const offProgress = window.api.send.onSendProgress(() => {
      void queryClient.invalidateQueries({ queryKey: ["logs", "detail", jobId] });
    });
    const offPaused = window.api.send.onJobPaused(() => {
      void queryClient.invalidateQueries({ queryKey: ["logs", "detail", jobId] });
    });
    return () => {
      offProgress();
      offPaused();
    };
  }, [queryClient, jobId]);

  const job = detailQuery.data;

  const failedRecipients = useMemo(
    () =>
      job === null || job === undefined ? [] : job.recipients.filter((r) => r.status === "failed"),
    [job],
  );

  /** Retry = open the Send workspace pre-filled with the failed recipients. */
  const retry = useCallback(
    (recipientIds: string[]): void => {
      if (job === null || job === undefined) return;
      void navigate({
        to: "/send",
        state: { sendPrefill: buildRetryPrefill(job, recipientIds) },
      });
    },
    [job, navigate],
  );

  const smtpLabel = useMemo(() => {
    if (job === null || job === undefined) return "-";
    if (job.smtpProfileId !== null) return job.smtpProfileName ?? m["jobDetail.deletedProfile"]();
    if (job.smtpOverride !== null) {
      const { host, port, username } = job.smtpOverride;
      return `${username}@${host}:${port} ${m["jobDetail.inline"]()}`;
    }
    return "-";
  }, [job]);

  // Client-side narrowing of the per-recipient rows: the job is the unit
  // of history, its recipient list is small enough to filter in memory.
  const visibleRecipients = useMemo(() => {
    if (job === null || job === undefined) return [];
    const term = searchInput.trim().toLowerCase();
    return job.recipients.filter((recipient) => {
      if (statusFilter !== ALL_STATUSES && recipient.status !== statusFilter) return false;
      if (term === "") return true;
      return (
        recipient.recipientName.toLowerCase().includes(term) ||
        (recipient.recipientEmail ?? "").toLowerCase().includes(term)
      );
    });
  }, [job, searchInput, statusFilter]);

  const hasFilters = searchInput.trim() !== "" || statusFilter !== ALL_STATUSES;

  /* eslint-disable react/no-unstable-nested-components */
  // TanStack column definitions are render functions by design - the JSX
  // they return is invoked by the table, not defined as a component.
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "recipient",
        header: m["jobDetail.recipient"],
        cell: (info) => (
          <div className="min-w-0">
            <p className="truncate font-medium">{info.row.original.recipientName}</p>
            <p className="truncate text-xs text-muted-foreground">
              {info.row.original.recipientEmail ?? m["jobDetail.noEmailAddress"]()}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor("status", {
        header: m["jobDetail.status"],
        cell: (info) => (
          <span
            className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${RECIPIENT_BADGE_STYLES[info.getValue()]}`}
          >
            {info.getValue() === "pending"
              ? m["status.pending"]()
              : info.getValue() === "sent"
                ? m["status.sent"]()
                : info.getValue() === "failed"
                  ? m["status.failed"]()
                  : m["status.skipped"]()}
          </span>
        ),
      }),
      columnHelper.accessor("errorMessage", {
        header: m["jobDetail.error"],
        cell: (info) => {
          const error = info.getValue();
          return error === null ? (
            <span className="text-muted-foreground">-</span>
          ) : (
            <span className="block max-w-72 truncate text-rose-700" title={error}>
              {error}
            </span>
          );
        },
      }),
      columnHelper.accessor("sentAt", {
        header: m["jobDetail.sentAt"],
        cell: (info) => {
          const stamp = info.getValue();
          return stamp === null ? (
            <span className="text-muted-foreground">-</span>
          ) : (
            <span className="whitespace-nowrap text-muted-foreground">
              {formatTimestamp(stamp)}
            </span>
          );
        },
      }),
      columnHelper.accessor("messageId", {
        header: m["jobDetail.messageId"],
        cell: (info) => {
          const id = info.getValue();
          return id === null ? (
            <span className="text-muted-foreground">-</span>
          ) : (
            <span className="block max-w-56 truncate text-muted-foreground" title={id}>
              {id}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: "retry",
        header: "",
        cell: (info) =>
          info.row.original.status === "failed" ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => retry([info.row.original.recipientId])}
            >
              {m["jobDetail.retry"]()}
            </Button>
          ) : null,
      }),
    ],
    // `retry` closes over the job snapshot, which is a fresh object on
    // every refetch - the table is rebuilt then, which is harmless here
    // (no selection state).
    [retry],
  );
  /* eslint-enable react/no-unstable-nested-components */

  const table = useReactTable({
    data: visibleRecipients,
    columns,
    getRowId: (row) => row.recipientId,
    getCoreRowModel: getCoreRowModel(),
  });

  const duration =
    job === null || job === undefined ? null : formatDuration(job.createdAt, job.completedAt);
  const counts = useMemo(() => {
    if (job === null || job === undefined) return { sent: 0, failed: 0, skipped: 0, pending: 0 };
    return job.recipients.reduce(
      (acc, recipient) => {
        acc[recipient.status] += 1;
        return acc;
      },
      { sent: 0, failed: 0, skipped: 0, pending: 0 },
    );
  }, [job]);

  return (
    <div className="flex h-full flex-col">
      <header className="border-b px-6 pb-4 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              to="/logs"
              className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" /> {m["jobDetail.allLogs"]()}
            </Link>
            <h1 className="truncate text-xl font-semibold">
              {job?.subject ?? m["jobDetail.jobDetail"]()}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <SendStatusBadge status={job?.status ?? "pending"} />
              <span>
                {m["jobDetail.counts"]({
                  sent: counts.sent,
                  failed: counts.failed,
                  skipped: counts.skipped,
                })}
              </span>
              {job !== null &&
                job !== undefined &&
                job.status === "paused" && (
                  // The delivered count, not the cursor: a paused job whose
                  // last attempts failed should not claim them as sent.
                  <span className="text-amber-700">
                    {m["logs.pausedProgress"]({
                      sent: job.recipients.filter((r) => r.status === "sent").length,
                      total: job.total,
                    })}
                  </span>
                )}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {job !== null && job !== undefined && job.status === "paused" && (
              <Button disabled={resumingId !== null} onClick={() => void resume(job.id)}>
                {resumingId === job.id ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> {m["logs.resuming"]()}
                  </>
                ) : (
                  <>
                    <Play className="size-4" /> {m["jobDetail.resume"]()}
                  </>
                )}
              </Button>
            )}
            {failedRecipients.length > 0 && (
              <Button onClick={() => retry(failedRecipients.map((r) => r.recipientId))}>
                {m["jobDetail.retryAllFailures"]({ count: failedRecipients.length })}
              </Button>
            )}
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-sm md:grid-cols-4">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {m["jobDetail.template"]()}
            </dt>
            <dd className="mt-0.5">{job?.templateName ?? "-"}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {m["jobDetail.smtp"]()}
            </dt>
            <dd className="mt-0.5">{smtpLabel}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {m["jobDetail.sender"]()}
            </dt>
            <dd className="mt-0.5 truncate">
              {job === null || job === undefined ? "-" : `${job.senderName} <${job.senderAddress}>`}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {m["jobDetail.startedDuration"]()}
            </dt>
            <dd className="mt-0.5">
              {job === null || job === undefined
                ? "-"
                : `${formatTimestamp(job.createdAt)}${duration === null ? "" : ` · ${duration}`}`}
            </dd>
          </div>
        </dl>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-4 px-6 py-4">
        {resumeError !== null && (
          <ErrorBanner message={resumeError} onDismiss={dismissResumeError} />
        )}
        {detailQuery.isError && (
          <ErrorBanner message={errorMessage(detailQuery.error, m["jobDetail.couldNotLoad"]())} />
        )}

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder={m["jobDetail.searchPlaceholder"]()}
              className="h-9 w-72 rounded-md border bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              aria-label={m["jobDetail.searchAria"]()}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label={m["jobDetail.filterByStatus"]()}
            className="h-9 rounded-md border bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            <option value={ALL_STATUSES}>{m["logs.allStatuses"]()}</option>
            {RECIPIENT_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label()}
              </option>
            ))}
          </select>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchInput("");
                setStatusFilter(ALL_STATUSES);
              }}
            >
              <RotateCcw className="size-3.5" /> {m["common.clear"]()}
            </Button>
          )}
          {detailQuery.isFetching && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Loader2 className="size-3 animate-spin" /> {m["common.loading"]()}
            </span>
          )}
        </div>

        {detailQuery.isLoading && (
          <div className="flex flex-1 items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> {m["jobDetail.loadingJob"]()}
          </div>
        )}

        {!detailQuery.isLoading && !detailQuery.isError && job === null && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
            <p className="text-sm font-medium">{m["jobDetail.jobNotFound"]()}</p>
            <p className="text-xs text-muted-foreground">{m["jobDetail.jobNotFoundHint"]()}</p>
            <Button asChild variant="outline" size="sm" className="mt-2">
              <Link to="/logs">{m["jobDetail.backToLogs"]()}</Link>
            </Button>
          </div>
        )}

        {job !== null && job !== undefined && (
          <>
            {visibleRecipients.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
                <p className="text-sm font-medium">{m["jobDetail.noMatchSearch"]()}</p>
                <p className="text-xs text-muted-foreground">{m["jobDetail.noMatchHint"]()}</p>
              </div>
            ) : (
              <div className="min-h-0 flex-1 overflow-y-auto rounded-lg border">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="sticky top-0 bg-muted">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            className="whitespace-nowrap border-b px-3 py-2 font-medium"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="border-b transition-colors odd:bg-background even:bg-muted/30"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-3 py-2">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

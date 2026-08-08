import { useEffect, useMemo, useState } from "react";
import { Outlet, createFileRoute, useMatchRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Calendar, Loader2, Play, RotateCcw } from "lucide-react";
import { m } from "@paraglide/messages";
import { ErrorBanner } from "@/components/error-banner";
import { SendStatusBadge } from "@/components/send-status-badge";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import { formatDuration, formatTimestamp, localDayToUtcRange } from "@/lib/format";
import { useResumeSend } from "@/lib/use-resume-send";
import type { SendJobStatus, SendJobSummary } from "../../../shared/ipc";

export const Route = createFileRoute("/logs")({
  component: LogsPage,
});

const ALL_STATUSES = "all";
const STATUS_OPTIONS: ReadonlyArray<{ value: SendJobStatus; label: () => string }> = [
  { value: "pending", label: () => m["status.pending"]() },
  { value: "sending", label: () => m["status.sending"]() },
  { value: "paused", label: () => m["status.paused"]() },
  { value: "completed", label: () => m["status.completed"]() },
  { value: "cancelled", label: () => m["status.cancelled"]() },
];

const columnHelper = createColumnHelper<SendJobSummary>();

/**
 * The Logs screen (ticket 16): every send job, most recent first, with its
 * status, subject, template, per-recipient counts, and timestamps -
 * filterable by status and creation date. Paused jobs show "Paused -
 * N of M sent" with a Resume button (resume + run, the same pair the
 * wizard's Resume uses). Row click opens `/logs/$jobId`.
 */
function LogsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const matchRoute = useMatchRoute();
  const isJobDetail = matchRoute({ to: "/logs/$jobId" });
  const [statusFilter, setStatusFilter] = useState<string>(ALL_STATUSES);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const { resumingId, resumeError, dismissResumeError, resume } = useResumeSend();

  const listQuery = useQuery({
    queryKey: ["logs", "list", { status: statusFilter, dateFrom, dateTo }],
    queryFn: () =>
      window.api.logs.list({
        statusFilter: statusFilter === ALL_STATUSES ? null : (statusFilter as SendJobStatus),
        // The date inputs are local calendar days; the filter compares
        // UTC creation stamps, so the day bounds are converted here.
        dateFrom: dateFrom === "" ? null : localDayToUtcRange(dateFrom).from,
        dateTo: dateTo === "" ? null : localDayToUtcRange(dateTo).to,
      }),
  });

  // Live updates: while a send runs or resumes, its progress events and
  // the paused event invalidate the table, so counts and statuses move
  // without a manual refresh.
  useEffect(() => {
    const offProgress = window.api.send.onSendProgress(() => {
      void queryClient.invalidateQueries({ queryKey: ["logs"] });
    });
    const offPaused = window.api.send.onJobPaused(() => {
      void queryClient.invalidateQueries({ queryKey: ["logs"] });
    });
    return () => {
      offProgress();
      offPaused();
    };
  }, [queryClient]);

  const hasFilters = statusFilter !== ALL_STATUSES || dateFrom !== "" || dateTo !== "";

  const clearFilters = () => {
    setStatusFilter(ALL_STATUSES);
    setDateFrom("");
    setDateTo("");
  };

  /* eslint-disable react/no-unstable-nested-components */
  // TanStack column definitions are render functions by design - the JSX
  // they return is invoked by the table, not defined as a component.
  const columns = useMemo(
    () => [
      columnHelper.accessor("status", {
        header: m["logs.status"],
        cell: (info) => (
          <span className="flex items-center gap-2">
            <SendStatusBadge status={info.getValue()} />
            {info.getValue() === "paused" && (
              // The delivered count, not the cursor: a paused job whose
              // last attempts failed should not claim them as sent.
              <span className="whitespace-nowrap text-xs text-amber-700">
                {m["logs.pausedProgress"]({
                  sent: info.row.original.sentCount,
                  total: info.row.original.total,
                })}
              </span>
            )}
          </span>
        ),
      }),
      columnHelper.accessor("subject", {
        header: m["logs.subject"],
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor("templateName", {
        header: m["logs.template"],
        cell: (info) => info.getValue() ?? "-",
      }),
      columnHelper.accessor("sentCount", {
        header: m["logs.sentFailedSkipped"],
        cell: (info) => {
          const row = info.row.original;
          return (
            <span className="whitespace-nowrap text-muted-foreground">
              <span className="text-emerald-700">{row.sentCount}</span>
              {" / "}
              <span className="text-rose-700">{row.failedCount}</span>
              {" / "}
              {row.skippedCount}
            </span>
          );
        },
      }),
      columnHelper.accessor("createdAt", {
        header: m["logs.started"],
        cell: (info) => (
          <span className="whitespace-nowrap text-muted-foreground">
            {formatTimestamp(info.getValue())}
          </span>
        ),
      }),
      columnHelper.display({
        id: "duration",
        header: m["logs.duration"],
        cell: ({ row }) => {
          const duration = formatDuration(row.original.createdAt, row.original.completedAt);
          return <span className="whitespace-nowrap text-muted-foreground">{duration ?? "-"}</span>;
        },
      }),
      columnHelper.display({
        id: "resume",
        header: "",
        cell: ({ row }) =>
          row.original.status === "paused" ? (
            // Resuming must not open the job detail.
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div onClick={(event) => event.stopPropagation()}>
              <Button
                size="sm"
                disabled={resumingId !== null}
                onClick={() => void resume(row.original.id)}
              >
                {resumingId === row.original.id ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> {m["logs.resuming"]()}
                  </>
                ) : (
                  <>
                    <Play className="size-4" /> {m["common.resume"]()}
                  </>
                )}
              </Button>
            </div>
          ) : null,
      }),
    ],
    // The resume button reads the live resuming state; the table is
    // rebuilt when it changes, which is harmless here (no selection state).
    // `resume` is stable (useCallback over setState + queryClient).
    [resumingId, resume],
  );
  /* eslint-enable react/no-unstable-nested-components */

  const table = useReactTable({
    data: listQuery.data ?? [],
    columns,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative flex h-full flex-col">
      {isJobDetail ? (
        <Outlet />
      ) : (
        <>
          <header className="px-6 pb-4 pt-6">
            <h1 className="text-2xl font-semibold">{m["logs.title"]()}</h1>
            <p className="text-sm text-muted-foreground">{m["logs.description"]()}</p>
          </header>

          <div className="flex min-h-0 flex-1 flex-col gap-4 px-6 pb-6">
            <div className="flex items-center gap-3">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                aria-label={m["logs.filterByStatus"]()}
                className="h-9 rounded-md border bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              >
                <option value={ALL_STATUSES}>{m["logs.allStatuses"]()}</option>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label()}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <label className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  {m["logs.from"]()}
                  <input
                    type="date"
                    value={dateFrom}
                    max={dateTo === "" ? undefined : dateTo}
                    onChange={(event) => setDateFrom(event.target.value)}
                    aria-label={m["logs.jobsCreatedFrom"]()}
                    className="h-9 rounded-md border bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  />
                </label>
                <label className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  {m["logs.to"]()}
                  <input
                    type="date"
                    value={dateTo}
                    min={dateFrom === "" ? undefined : dateFrom}
                    onChange={(event) => setDateTo(event.target.value)}
                    aria-label={m["logs.jobsCreatedUpTo"]()}
                    className="h-9 rounded-md border bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  />
                </label>
              </div>
              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <RotateCcw className="size-3.5" /> {m["common.clear"]()}
                </Button>
              )}
              {listQuery.isFetching && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Loader2 className="size-3 animate-spin" /> {m["common.loading"]()}
                </span>
              )}
            </div>

            {resumeError !== null && (
              <ErrorBanner message={resumeError} onDismiss={dismissResumeError} />
            )}
            {listQuery.isError && (
              <ErrorBanner message={errorMessage(listQuery.error, m["logs.couldNotLoad"]())} />
            )}

            {listQuery.isLoading && (
              <div className="flex flex-1 items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" /> {m["logs.loadingLogs"]()}
              </div>
            )}

            {!listQuery.isLoading && !listQuery.isError && (listQuery.data?.length ?? 0) === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
                {hasFilters ? (
                  <>
                    <p className="text-sm font-medium">{m["logs.noJobsMatchFilters"]()}</p>
                    <p className="text-xs text-muted-foreground">{m["logs.noJobsHint"]()}</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={clearFilters}>
                      {m["recipients.clearFilters"]()}
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium">{m["logs.noSendJobsYet"]()}</p>
                    <p className="text-xs text-muted-foreground">{m["logs.noSendJobsHint"]()}</p>
                  </>
                )}
              </div>
            )}

            {(listQuery.data?.length ?? 0) > 0 && (
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
                        onClick={() =>
                          void navigate({ to: "/logs/$jobId", params: { jobId: row.id } })
                        }
                        className="cursor-pointer border-b transition-colors odd:bg-background even:bg-muted/30 hover:bg-muted/60"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="whitespace-nowrap px-3 py-2">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type RowSelectionState,
} from "@tanstack/react-table";
import { AlertTriangle, ChevronLeft, ChevronRight, Loader2, Search, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import type { ImportBatch, Recipient } from "../../../shared/ipc";

export const Route = createFileRoute("/recipients")({
  component: RecipientsPage,
});

const PAGE_SIZE = 25;
const ALL_BATCHES = "all";

/**
 * SQLite stores `datetime('now')` as UTC "YYYY-MM-DD HH:MM:SS". JS parses
 * space-separated stamps as local time, so normalize to an ISO UTC string
 * first and let Intl render it in the user's timezone.
 */
function formatTimestamp(sqliteUtc: string): string {
  const date = new Date(`${sqliteUtc.replace(" ", "T")}Z`);
  if (Number.isNaN(date.getTime())) return sqliteUtc;
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

/** The human label of an import batch: its import stamp (batches have no name of their own). */
function batchLabel(batchId: string, batches: ImportBatch[] | undefined): string {
  const batch = batches?.find((b) => b.id === batchId);
  if (batch !== undefined) return formatTimestamp(batch.createdAt);
  // The batches list may still be loading; show the id's short form.
  return batchId.slice(0, 8);
}

const columnHelper = createColumnHelper<Recipient>();

function RecipientsPage() {
  const queryClient = useQueryClient();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [batchFilter, setBatchFilter] = useState<string>(ALL_BATCHES);
  const [page, setPage] = useState(1);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Debounce the search box so typing does not fire an IPC round trip per key.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput), 250);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // A new search or batch filter changes the result set entirely - return to
  // the first page and drop any selection that no longer belongs to it.
  useEffect(() => {
    setPage(1);
    setRowSelection({});
  }, [debouncedSearch, batchFilter]);

  const listQuery = useQuery({
    queryKey: ["recipients", "list", { search: debouncedSearch, batch: batchFilter, page }],
    queryFn: () =>
      window.api.recipients.list({
        search: debouncedSearch.trim() === "" ? null : debouncedSearch.trim(),
        importBatch: batchFilter === ALL_BATCHES ? null : batchFilter,
        page,
        pageSize: PAGE_SIZE,
      }),
    placeholderData: keepPreviousData,
  });

  const batchesQuery = useQuery({
    queryKey: ["recipients", "batches"],
    queryFn: () => window.api.recipients.listBatches(),
  });

  const deleteMutation = useMutation({
    mutationFn: (ids: string[]) => window.api.recipients.delete(ids),
    onSuccess: (result) => {
      toast.success(`Deleted ${result.deleted} recipient${result.deleted === 1 ? "" : "s"}.`);
      setRowSelection({});
      setSelectedId(null);
      setConfirmOpen(false);
      // Deterministic page clamp without waiting for the refetch: the new
      // total is the old one minus what was deleted.
      const previousTotal = listQuery.data?.total ?? 0;
      const newTotal = previousTotal - result.deleted;
      const newPageCount = Math.max(1, Math.ceil(newTotal / PAGE_SIZE));
      if (page > newPageCount) setPage(newPageCount);
      // refetchType "all" also refetches the cached pages that are not
      // currently shown - without it, paging back to them would surface
      // pre-delete rows and a stale total.
      void queryClient.invalidateQueries({ queryKey: ["recipients"], refetchType: "all" });
    },
    onError: (err) => {
      setConfirmOpen(false);
      setLoadError(errorMessage(err, "Could not delete the selected recipients."));
    },
  });

  const selectedCount = Object.keys(rowSelection).length;
  const total = listQuery.data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  /* eslint-disable react/no-unstable-nested-components */
  // TanStack column definitions are render functions by design - the JSX
  // they return is invoked by the table, not defined as a component.
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => (
          <HeaderCheckbox
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          // Selecting a row must not open the detail panel.
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div onClick={(event) => event.stopPropagation()}>
            <input
              type="checkbox"
              className="size-4 accent-primary"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
              aria-label={`Select ${row.original.name}`}
            />
          </div>
        ),
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue() ?? "-",
      }),
      columnHelper.accessor("phone", {
        header: "Phone",
        cell: (info) => info.getValue() ?? "-",
      }),
      columnHelper.display({
        id: "importBatch",
        header: "Import batch",
        cell: ({ row }) => batchLabel(row.original.importBatch, batchesQuery.data),
      }),
      columnHelper.accessor("createdAt", {
        header: "Imported",
        cell: (info) => formatTimestamp(info.getValue()),
      }),
    ],
    [batchesQuery.data],
  );
  /* eslint-enable react/no-unstable-nested-components */

  const table = useReactTable({
    data: listQuery.data === undefined ? [] : [...listQuery.data.items],
    columns,
    getRowId: (row) => row.id,
    manualPagination: true,
    pageCount,
    state: {
      rowSelection,
      pagination: { pageIndex: page - 1, pageSize: PAGE_SIZE },
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex: page - 1, pageSize: PAGE_SIZE })
          : updater;
      setPage(next.pageIndex + 1);
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  // Escape closes whichever overlay is open (the panel, then the dialog).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (confirmOpen) setConfirmOpen(false);
      else if (selectedId !== null) setSelectedId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [confirmOpen, selectedId]);

  // The panel fetches the row by id (the spec's `get`) instead of reading
  // it from the page's items, so it stays correct while the list refetches
  // and survives search/filter changes that move the row off the page.
  const detailQuery = useQuery({
    queryKey: ["recipients", "detail", selectedId],
    queryFn: () => window.api.recipients.get(selectedId as string),
    enabled: selectedId !== null,
  });

  const hasFilters = debouncedSearch.trim() !== "" || batchFilter !== ALL_BATCHES;

  const clearFilters = () => {
    setSearchInput("");
    setBatchFilter(ALL_BATCHES);
    setPage(1);
    setRowSelection({});
  };

  return (
    <div className="relative flex h-full flex-col">
      <header className="flex items-center justify-between px-6 pb-4 pt-6">
        <div>
          <h1 className="text-2xl font-semibold">Recipients</h1>
          <p className="text-sm text-muted-foreground">
            {total} recipient{total === 1 ? "" : "s"} in the directory
          </p>
        </div>
        <Button
          variant="destructive"
          disabled={selectedCount === 0 || deleteMutation.isPending}
          onClick={() => setConfirmOpen(true)}
        >
          <Trash2 className="size-4" />
          {deleteMutation.isPending
            ? "Deleting…"
            : selectedCount === 0
              ? "Delete selected"
              : `Delete selected (${selectedCount})`}
        </Button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-4 px-6 pb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search name, email, phone, or any field…"
              className="h-9 w-80 rounded-md border bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              aria-label="Search recipients"
            />
          </div>
          <select
            value={batchFilter}
            onChange={(event) => setBatchFilter(event.target.value)}
            aria-label="Filter by import batch"
            className="h-9 rounded-md border bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            <option value={ALL_BATCHES}>All batches</option>
            {batchesQuery.data?.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {formatTimestamp(batch.createdAt)} ({batch.count})
              </option>
            ))}
          </select>
          {listQuery.isFetching && !listQuery.isPlaceholderData && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Loader2 className="size-3 animate-spin" /> Loading…
            </span>
          )}
        </div>

        {loadError !== null && (
          <ErrorBanner message={loadError} onDismiss={() => setLoadError(null)} />
        )}

        {listQuery.isError && (
          <ErrorBanner message={errorMessage(listQuery.error, "Could not load recipients.")} />
        )}

        {listQuery.isLoading && (
          <div className="flex flex-1 items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Loading recipients…
          </div>
        )}

        {/* The empty states only render once the first fetch has settled -
        until then the loading state above shows, so a directory with data
        never flashes "No recipients yet". */}
        {!listQuery.isLoading && !listQuery.isError && total === 0 && !hasFilters && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
            <p className="text-sm font-medium">No recipients yet</p>
            <p className="text-xs text-muted-foreground">
              Import an Excel file to fill the directory.
            </p>
            <Button asChild size="sm" className="mt-2">
              <Link to="/import">Go to Import</Link>
            </Button>
          </div>
        )}

        {!listQuery.isLoading && !listQuery.isError && total === 0 && hasFilters && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
            <p className="text-sm font-medium">No recipients match your filters</p>
            <p className="text-xs text-muted-foreground">Try a different search or batch.</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}

        {total > 0 && (
          <>
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
                        setSelectedId((current) => (current === row.id ? null : row.id))
                      }
                      className={`cursor-pointer border-b transition-colors odd:bg-background even:bg-muted/30 hover:bg-muted/60 ${
                        selectedId === row.id ? "bg-muted/70" : ""
                      }`}
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

            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">
                Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, total)} of {total}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1 || listQuery.isFetching}
                  onClick={() => setPage((current) => current - 1)}
                >
                  <ChevronLeft className="size-4" /> Previous
                </Button>
                <span className="text-xs text-muted-foreground">
                  Page {page} of {pageCount}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= pageCount || listQuery.isFetching}
                  onClick={() => setPage((current) => current + 1)}
                >
                  Next <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {selectedId !== null && detailQuery.data !== null && detailQuery.data !== undefined && (
        <DetailPanel
          recipient={detailQuery.data}
          batchLabel={batchLabel(detailQuery.data.importBatch, batchesQuery.data)}
          onClose={() => setSelectedId(null)}
        />
      )}

      {confirmOpen && (
        <ConfirmDeleteDialog
          count={selectedCount}
          pending={deleteMutation.isPending}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => deleteMutation.mutate(Object.keys(rowSelection))}
        />
      )}
    </div>
  );
}

function ErrorBanner({ message, onDismiss }: { message: string; onDismiss?: () => void }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
      <AlertTriangle className="mt-0.5 size-4 shrink-0" />
      <span className="flex-1">{message}</span>
      {onDismiss !== undefined && (
        <button
          type="button"
          className="text-xs underline-offset-2 hover:underline"
          onClick={onDismiss}
        >
          Dismiss
        </button>
      )}
    </div>
  );
}

function HeaderCheckbox({
  checked,
  indeterminate,
  onChange,
}: {
  checked: boolean;
  indeterminate: boolean;
  onChange: (event: unknown) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current !== null) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <input
      type="checkbox"
      ref={ref}
      className="size-4 accent-primary"
      checked={checked}
      onChange={onChange}
      aria-label="Select all recipients on this page"
    />
  );
}

function DetailPanel({
  recipient,
  batchLabel: batch,
  onClose,
}: {
  recipient: Recipient;
  batchLabel: string;
  onClose: () => void;
}) {
  const metadataEntries = Object.entries(recipient.metadata);
  return (
    <aside className="absolute inset-y-0 right-0 z-20 flex w-96 flex-col border-l bg-card shadow-2xl">
      <header className="flex items-start justify-between gap-3 border-b px-5 py-4">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold">{recipient.name}</h2>
          <p className="truncate text-sm text-muted-foreground">
            {recipient.email ?? "No email address"}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close details">
          <X className="size-4" />
        </Button>
      </header>
      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Phone</dt>
            <dd className="text-right">{recipient.phone ?? "-"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Import batch</dt>
            <dd className="text-right">{batch}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Imported</dt>
            <dd className="text-right">{formatTimestamp(recipient.createdAt)}</dd>
          </div>
        </dl>
        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Custom fields
          </h3>
          {metadataEntries.length === 0 ? (
            <p className="text-sm text-muted-foreground">No custom fields.</p>
          ) : (
            <dl className="space-y-2">
              {metadataEntries.map(([key, value]) => (
                <div key={key} className="text-sm">
                  <dt className="text-xs font-medium text-muted-foreground">{key}</dt>
                  <dd className="break-words">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>
      </div>
    </aside>
  );
}

function ConfirmDeleteDialog({
  count,
  pending,
  onCancel,
  onConfirm,
}: {
  count: number;
  pending: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onMouseDown={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-title"
        className="w-full max-w-sm rounded-lg border bg-card p-6 shadow-lg"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-delete-title" className="text-lg font-semibold">
          Delete {count} recipient{count === 1 ? "" : "s"}?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          They will be removed from the directory. Past job history is kept.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={pending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={pending} autoFocus>
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Deleting…
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

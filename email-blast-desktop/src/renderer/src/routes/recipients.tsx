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
import { ChevronLeft, ChevronRight, Loader2, Pencil, Search, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { m } from "@paraglide/messages";
import { ErrorBanner } from "@/components/error-banner";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import { formatTimestamp } from "@/lib/format";
import type { ImportBatch, Recipient, RecipientUpdatePayload } from "../../../shared/ipc";

export const Route = createFileRoute("/recipients")({
  component: RecipientsPage,
});

const PAGE_SIZE = 25;
const ALL_BATCHES = "all";

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
  const [editing, setEditing] = useState<Recipient | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);

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
      toast.success(
        result.deleted === 1
          ? m["recipients.deletedCountOne"]({ count: result.deleted })
          : m["recipients.deletedCountOther"]({ count: result.deleted }),
      );
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
      setLoadError(errorMessage(err, m["recipients.couldNotDelete"]()));
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: RecipientUpdatePayload) => window.api.recipients.update(payload),
    onSuccess: () => {
      toast.success(m["recipients.updated"]());
      setEditing(null);
      // The detail panel reads the row by id, so a closed panel next to
      // an edited row must not surface stale fields.
      void queryClient.invalidateQueries({ queryKey: ["recipients"], refetchType: "all" });
    },
    onError: (err) => {
      setUpdateError(errorMessage(err, m["recipients.couldNotUpdate"]()));
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
              aria-label={m["recipients.selectRecipient"]({ name: row.original.name })}
            />
          </div>
        ),
      }),
      columnHelper.accessor("name", {
        header: m["recipients.name"],
        cell: (info) => <span className="font-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor("email", {
        header: m["recipients.email"],
        cell: (info) => info.getValue() ?? "-",
      }),
      columnHelper.accessor("phone", {
        header: m["recipients.phone"],
        cell: (info) => info.getValue() ?? "-",
      }),
      columnHelper.display({
        id: "importBatch",
        header: m["recipients.importBatch"],
        cell: ({ row }) => batchLabel(row.original.importBatch, batchesQuery.data),
      }),
      columnHelper.accessor("createdAt", {
        header: m["recipients.imported"],
        cell: (info) => formatTimestamp(info.getValue()),
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }) => (
          // Editing must not open the detail panel.
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div onClick={(event) => event.stopPropagation()}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setUpdateError(null);
                setEditing(row.original);
              }}
              aria-label={m["recipients.edit"]()}
            >
              <Pencil className="size-3.5" />
            </Button>
          </div>
        ),
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

  // Escape closes whichever overlay is open (the edit dialog, then the
  // confirm dialog, then the panel).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (editing !== null) setEditing(null);
      else if (confirmOpen) setConfirmOpen(false);
      else if (selectedId !== null) setSelectedId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [editing, confirmOpen, selectedId]);

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
          <h1 className="text-2xl font-semibold">{m["recipients.title"]()}</h1>
          <p className="text-sm text-muted-foreground">
            {total === 1
              ? m["recipients.countInDirectoryOne"]({ count: total })
              : m["recipients.countInDirectoryOther"]({ count: total })}
          </p>
        </div>
        <Button
          variant="destructive"
          disabled={selectedCount === 0 || deleteMutation.isPending}
          onClick={() => setConfirmOpen(true)}
        >
          <Trash2 className="size-4" />
          {deleteMutation.isPending
            ? m["common.deleting"]()
            : selectedCount === 0
              ? m["recipients.deleteSelected"]()
              : m["recipients.deleteSelectedCount"]({ count: selectedCount })}
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
              placeholder={m["recipients.searchPlaceholder"]()}
              className="h-9 w-80 rounded-md border bg-background pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              aria-label={m["recipients.searchAria"]()}
            />
          </div>
          <select
            value={batchFilter}
            onChange={(event) => setBatchFilter(event.target.value)}
            aria-label={m["recipients.filterByBatch"]()}
            className="h-9 rounded-md border bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
            <option value={ALL_BATCHES}>{m["recipients.allBatches"]()}</option>
            {batchesQuery.data?.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {formatTimestamp(batch.createdAt)} ({batch.count})
              </option>
            ))}
          </select>
          {listQuery.isFetching && !listQuery.isPlaceholderData && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Loader2 className="size-3 animate-spin" /> {m["common.loading"]()}
            </span>
          )}
        </div>

        {loadError !== null && (
          <ErrorBanner message={loadError} onDismiss={() => setLoadError(null)} />
        )}

        {listQuery.isError && (
          <ErrorBanner message={errorMessage(listQuery.error, m["recipients.couldNotLoad"]())} />
        )}

        {listQuery.isLoading && (
          <div className="flex flex-1 items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> {m["recipients.loadingRecipients"]()}
          </div>
        )}

        {/* The empty states only render once the first fetch has settled -
        until then the loading state above shows, so a directory with data
        never flashes "No recipients yet". */}
        {!listQuery.isLoading && !listQuery.isError && total === 0 && !hasFilters && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
            <p className="text-sm font-medium">{m["recipients.noRecipientsYet"]()}</p>
            <p className="text-xs text-muted-foreground">{m["recipients.noRecipientsHint"]()}</p>
            <Button asChild size="sm" className="mt-2">
              <Link to="/import">{m["recipients.goToImport"]()}</Link>
            </Button>
          </div>
        )}

        {!listQuery.isLoading && !listQuery.isError && total === 0 && hasFilters && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
            <p className="text-sm font-medium">{m["recipients.noMatchFilters"]()}</p>
            <p className="text-xs text-muted-foreground">{m["recipients.noMatchHint"]()}</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={clearFilters}>
              {m["recipients.clearFilters"]()}
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
                {m["recipients.showingRange"]({
                  from: (page - 1) * PAGE_SIZE + 1,
                  to: Math.min(page * PAGE_SIZE, total),
                  total,
                })}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1 || listQuery.isFetching}
                  onClick={() => setPage((current) => current - 1)}
                >
                  <ChevronLeft className="size-4" /> {m["recipients.previous"]()}
                </Button>
                <span className="text-xs text-muted-foreground">
                  {m["recipients.pageOf"]({ page, count: pageCount })}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= pageCount || listQuery.isFetching}
                  onClick={() => setPage((current) => current + 1)}
                >
                  {m["recipients.next"]()} <ChevronRight className="size-4" />
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

      {editing !== null && (
        <EditRecipientDialog
          recipient={editing}
          pending={updateMutation.isPending}
          error={updateError}
          onCancel={() => setEditing(null)}
          onSave={(values) =>
            updateMutation.mutate({
              id: editing.id,
              name: values.name,
              email: values.email,
              phone: values.phone,
            })
          }
        />
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
      aria-label={m["recipients.selectAllOnPage"]()}
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
            {recipient.email ?? m["recipients.noEmailAddress"]()}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label={m["common.closeDetails"]()}>
          <X className="size-4" />
        </Button>
      </header>
      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{m["recipients.phone"]()}</dt>
            <dd className="text-right">{recipient.phone ?? "-"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{m["recipients.importBatch"]()}</dt>
            <dd className="text-right">{batch}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{m["recipients.imported"]()}</dt>
            <dd className="text-right">{formatTimestamp(recipient.createdAt)}</dd>
          </div>
        </dl>
        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {m["recipients.customFields"]()}
          </h3>
          {metadataEntries.length === 0 ? (
            <p className="text-sm text-muted-foreground">{m["recipients.noCustomFields"]()}</p>
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

/**
 * The per-row edit dialog (ADR 0008): name, email, and phone prefilled
 * from the row. Email is optional but must contain "@" when given - the
 * main process validates and rejects with the typed error shown here.
 * The metadata bag is not editable; it stays a record of the import.
 */
function EditRecipientDialog({
  recipient,
  pending,
  error,
  onCancel,
  onSave,
}: {
  recipient: Recipient;
  pending: boolean;
  error: string | null;
  onCancel: () => void;
  onSave: (values: { name: string; email: string | null; phone: string | null }) => void;
}) {
  const [name, setName] = useState(recipient.name);
  const [email, setEmail] = useState(recipient.email ?? "");
  const [phone, setPhone] = useState(recipient.phone ?? "");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onMouseDown={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-recipient-title"
        className="w-full max-w-sm rounded-lg border bg-card p-6 shadow-lg"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id="edit-recipient-title" className="text-lg font-semibold">
          {m["recipients.editTitle"]()}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{recipient.name}</p>
        <div className="mt-4 space-y-3">
          <label className="block text-sm">
            <span className="font-medium">{m["recipients.name"]()}</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium">{m["recipients.email"]()}</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium">{m["recipients.phone"]()}</span>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="mt-1 h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            />
          </label>
        </div>
        {error !== null && <p className="mt-3 text-sm text-rose-700">{error}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={pending}>
            {m["common.cancel"]()}
          </Button>
          <Button
            onClick={() =>
              onSave({
                name,
                email: email.trim() === "" ? null : email,
                phone: phone.trim() === "" ? null : phone,
              })
            }
            disabled={pending}
            autoFocus
          >
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> {m["common.saving"]()}
              </>
            ) : (
              m["common.save"]()
            )}
          </Button>
        </div>
      </div>
    </div>
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
          {count === 1
            ? m["recipients.deleteTitleOne"]({ count })
            : m["recipients.deleteTitleOther"]({ count })}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{m["recipients.deleteDescription"]()}</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={pending}>
            {m["common.cancel"]()}
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={pending} autoFocus>
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> {m["common.deleting"]()}
              </>
            ) : (
              m["common.delete"]()
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { m } from "@paraglide/messages";
import { ErrorBanner } from "@/components/error-banner";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import { formatTimestamp } from "@/lib/format";
import type { Recipient } from "../../../shared/ipc";

/**
 * The filterable recipient picker shared by the compose wizard's step 1
 * and the Generate workspace: search (debounced like the Recipients
 * screen), import-batch filter, per-page selection, and "select all
 * matching". The selection lives in the parent (a Map of id -> recipient)
 * so both hosts own their stale-state guards around it.
 */

const PAGE_SIZE = 25;

export function RecipientsStep({
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
          value={importBatch ?? ""}
          onChange={(event) =>
            setImportBatch(event.target.value === "" ? null : event.target.value)
          }
          aria-label={m["compose.filterByBatch"]()}
          className="h-9 rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring"
        >
          <option value="">{m["compose.allBatches"]()}</option>
          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {m["compose.batchOption"]({ count: batch.count, stamp: formatTimestamp(batch.createdAt) })}
            </option>
          ))}
        </select>
        {total > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => void selectAllMatching()}
            title={m["compose.selectAllMatchingTitle"]({ total })}
          >
            <Users className="size-4" /> {m["compose.selectAllCount"]({ total })}
          </Button>
        )}
      </div>

      {listQuery.isError && (
        <ErrorBanner message={errorMessage(listQuery.error, m["compose.couldNotLoadRecipients"]())} />
      )}

      {!listQuery.isError && total === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
          <Users className="size-10 text-muted-foreground" />
          <p className="text-sm font-medium">
            {debouncedSearch === "" && importBatch === null
              ? m["compose.noRecipientsYet"]()
              : m["compose.noRecipientsMatchFilter"]()}
          </p>
          <p className="max-w-sm text-xs text-muted-foreground">
            {debouncedSearch === "" && importBatch === null ? (
              <>
                {m["compose.noRecipientsHint"]()}
                <Link
                  to="/import"
                  className="block text-primary underline-offset-2 hover:underline"
                >
                  {m["compose.goToImport"]()}
                </Link>
              </>
            ) : (
              m["compose.tryDifferentFilter"]()
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
                      aria-label={m["compose.selectAllOnPage"]()}
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
                  <th className="px-3 py-2">{m["compose.name"]()}</th>
                  <th className="px-3 py-2">{m["compose.email"]()}</th>
                  <th className="hidden px-3 py-2 sm:table-cell">{m["compose.phone"]()}</th>
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
                        aria-label={m["compose.selectRecipient"]({ name: recipient.name })}
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
            <span>{m["compose.selectionCount"]({ selected: selection.size, total })}</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="size-4" /> {m["common.prev"]()}
              </Button>
              <span>
                {m["compose.pageOf"]({ page: Math.min(page, totalPages), total: totalPages })}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              >
                {m["common.next"]()} <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

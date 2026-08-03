# 11 — Recipients management

**What to build:** The Recipients screen end to end: a table of all imported recipients (name, email, phone, import batch, imported date), full-text search across name/email/custom fields, filtering by import batch, a detail side panel with every metadata key, and bulk delete with confirmation.

**Blocked by:** 10 — Excel import

**Status:** done

- [x] Table lists recipients with search (name, email, custom fields) and batch filter; pagination works
- [x] Row click opens a detail side panel showing all metadata-bag keys
- [x] Bulk select + delete with confirmation; deleted recipients disappear and counts reflect it
- [x] Seam A: `list` with search/filter/pagination, `get`, and `delete` round-trip against a temp database through the Effect Layer

## Answer

Implemented in `email-blast-desktop/`:

- `src/main/services/recipients.ts` - the recipients domain service: `list` (search/filter/pagination), `get`, `delete`, `listBatches`, following the ImportService pattern (Context.Service + `Layer.provideMerge` providing SqliteRepo alongside)
- `src/main/services/sqlite-repo.ts` - `listRecipients` (case-insensitive LIKE search across name/email/phone and the serialized metadata bag with ESCAPE'd wildcards, batch filter, `COUNT(*)` + `LIMIT/OFFSET`, newest-first ordering with name tiebreak), `getRecipient`, `deleteRecipients` (single `IN`-delete, returns the row count; historical job rows keep referencing deleted ids - foreign keys are not enforced by default in SQLite - so past job outcomes survive), `listImportBatches` (distinct batches with their `MIN(created_at)` stamp and size)
- `src/shared/ipc.ts` + `ipc-channels.ts` + `preload/index.ts` + `src/main/index.ts` + `runtime.ts` - additive contract (decision 4): `recipients.list({ search, importBatch, page, pageSize })` → `PaginatedRecipients`, `get(id)` → `Recipient | null`, `delete(ids)` → `{ deleted }`, `listBatches()` → `ImportBatch[]`. Handlers decode at the boundary; list/delete/list-batches responses are Schema-encoded. `RecipientsService.Live` added to the root layer
- Renderer `routes/recipients.tsx` - TanStack Table (arrives here per the ticket-10 note): checkbox column with selection keyed by row id (persists across pages for cross-page bulk delete), 250ms-debounced search, batch filter dropdown (batches labeled by import stamp + size), server-side pagination at 25/page with `keepPreviousData`, row click opens a detail side panel that fetches the row via `get(id)` (page-independent), bulk delete behind a confirmation dialog, error banners, loading and empty states, deterministic page clamp after delete
- `src/renderer/src/lib/error-message.ts` - the Electron IPC-prefix stripper extracted from `import.tsx`, now shared by both screens

Verified end to end on 2026-08-03:

- Seam A: 12 new vitest tests green (42 total): empty database, pagination across seeded batches including beyond-the-last page, full recipient shape round-trip (metadata bag parsed), case-insensitive search across name/email/phone/metadata values, literal LIKE wildcard matching ("100%", "_"), batch filter and combined search+filter, `get` for existing and unknown ids, delete counts with re-delete returning 0 and empty-id no-ops, `listBatches` with stamps and sizes
- Live app driven with Playwright `_electron` against a temp userData (`--user-data-dir` honored by Electron for `app.getPath("userData")`, verified with a probe before any run so the real user database was never touched): first-launch Get Started, two real imports via CDP file drag-and-drop (32 + 3 recipients), table shows 35 with 25 rows on page 1 and 10 on page 2 (newest batch first), Next/Previous paging, search "S00" (names) and "alpha"/"gamma" (metadata values), batch filter options labeled "Aug 3, 2026, 2:11 PM (3)" style, row click opens the panel with every metadata key, the panel stays open and correct while a search hides its row from the list, bulk select 2 rows → "Delete selected (2)" → confirmation dialog → toast "Deleted 2 recipients." → count drops to 33, delete all 8 rows on page 2 → clamp back to page 1 with "25 recipients" and "Page 1 of 1", DB verified: 25 rows, deleted ids absent, both batches intact (3 + 22)
- typecheck (node + web), oxlint, oxfmt, full vitest suite green; `npm run build` green

Code review (standards + spec axes, 2-agent pass) found 6 issues, all fixed and re-verified in the live app:

- The detail panel read the row from the page's items instead of the spec's `get(id)`: with `keepPreviousData` it could show a stale row during refetch, it silently closed when a filter moved the row off the page, and the spec'd `get` stayed dead from the renderer. The panel now fetches by id through a react-query query keyed on the selection (verified live: the panel stays correct while a search hides its row)
- Em-dash placeholders ("—") in the table cells and panel violated the no-em-dash rule; replaced with "-"
- Initial load flashed "No recipients yet" before the first fetch resolved; the empty states now render only after the first fetch settles, with a loading state in between
- `invalidateQueries` refetches only active queries, so paging back to a previously-visited page after a delete surfaced pre-delete rows and the pre-delete total; `refetchType: "all"` now refreshes the hidden pages too (verified live: page 2 shows 8 rows and "33 recipients" after the delete, not the stale 10 and "35")
- Duplicated error banners extracted into a shared `ErrorBanner`; `recipients:list-batches` now Schema-encodes its response like the other handlers
- Search matches the serialized metadata JSON as text, so JSON punctuation can match (a degenerate "," query matches everything with a comma); documented in the repo as the accepted tradeoff for keeping the search index-free

Deviations from the spec, all deliberate:

- `recipients.listBatches()` is a fourth channel beyond the IPC table's list/get/delete: the batch filter needs the batch list, and batches have no entity of their own - each batch is labeled by its import stamp (`MIN(created_at)`) with its size
- Search also matches phone, a superset of the ticket's "name, email, custom fields" (and the spec screen text says "full-text search across name/email/custom fields")
- Row selection persists across pages (deliberate cross-page bulk delete); the header checkbox reflects the current page while the Delete button shows the total selection count
- The detail panel renders the fetched row directly; the query is local IPC and cached per id, so no explicit loading seam was needed
- Deleting a recipient leaves historical job rows referencing the id (no FK enforcement) - per-recipient job outcomes must survive per the spec, and Logs joins are a later ticket's concern

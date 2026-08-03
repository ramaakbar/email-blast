# 10 — Excel import

**What to build:** The Import screen end to end: the user picks a `.xlsx`/`.xls` file (drag-and-drop or browse), sees a preview table of the first 50 parsed rows with dynamic metadata columns, reviews the auto-suggested column mapping (name / email / phone / custom metadata / skip), and commits the import. Duplicate email addresses are skipped with the count reported; a file with no recognizable name or email column shows a warning but still allows manual mapping.

**Blocked by:** 09 — First launch, database & settings

**Status:** done

- [x] File selection → import preview (first 50 rows, dynamic metadata columns) with `ImportPreview { recipients, skippedDuplicates, warnings }`
- [x] Column mapping UI: read-only Excel column name mapped to name / email / phone / custom metadata / skip, auto-mapped suggestions pre-selected, user-overridable
- [x] No recognizable name/email column → warning shown, mapping still possible
- [x] Commit imports recipients as an import batch; success toast "Imported N recipients. M duplicates skipped."; duplicate detection is lowercased-email based
- [x] Seam A: the import pipeline parses a fixture spreadsheet, applies the mapping, dedupes, and reports skipped/warnings; commit persists recipients with their metadata bag and batch id

## Answer

Implemented in `email-blast-desktop/`:

- `src/main/services/import.ts` - the import pipeline: `parseWorkbook` (first sheet, every cell normalized to a string, trimmed headers), `suggestMapping` (exact header synonyms first, substring fallback, one column per role, everything else metadata), `applyMapping` (first column per role wins, rows without a name dropped, `skip` ignored, metadata bag keyed by column name), `dedupeRecipients` (lowercased email, first occurrence wins, seedable with existing DB emails). `ImportService` Effect service with `read` (parse → suggest → map → dedupe → warnings) and `commit` (apply user mapping → dedupe vs DB + within batch → persist one batch in a transaction); typed `UnreadableExcel` error for unreadable files
- `src/main/services/sqlite-repo.ts` - `insertRecipients` (one transaction, ids via `crypto.randomUUID()`, emails normalized trim+lowercase on the way in) and `listRecipientEmails` (the dedupe key set)
- `src/shared/ipc.ts` + `ipc-channels.ts` + `preload/index.ts` - typed contract: `import.read(excelPath)` → `ImportPreview`, `import.commit({ rows, columnMapping })` → `{ imported, duplicatesSkipped, batchId }`, `system.pickExcelFile` (native .xlsx/.xls dialog), `system.getPathForFile` (sandbox-safe dropped-file path via `webUtils`)
- `src/main/index.ts` + `runtime.ts` - `ImportService.Live` added to the root layer; handlers decode at the boundary and Schema-encode responses
- Renderer `routes/import.tsx` - state machine (idle → loading → preview → done): drop zone (drag-over highlight) + Browse, warning banner, preview table of the first 50 rows (dynamic columns, horizontal scroll, truncated cells), column mapping editor (per-column role select, name/email/phone exclusive, Reset mapping), effective-mapping summary, commit button (disabled without a name column), success toast (sonner) + persistent success panel with Go to Compose / Go to Recipients / Import another file
- `sonner` (renderer toast) and `@e965/xlsx` 0.20.3 (main, spec decision 2) added; `playwright-core` added as a devDependency (the Seam B E2E driver's base, per spec decision 1 - used for this ticket's verification)

Verified end to end on 2026-08-03:
- Seam A: 30 vitest tests green (16 new import tests + 2 new repo tests on top of the 12 from ticket 09): fixture parsing with string coercion, header synonym suggestion, trim-collision handling, within-file dedupe (case-insensitive, keeps first), warnings for unrecognizable columns / missing names, typed errors on missing and non-Excel files, batch persistence with metadata bag, user-mapping override, dedupe vs DB + within batch, empty-name commit imports nothing (reported via rowsSkippedNoName), skip-mapped columns stored nowhere, second import as its own batch
- Live app driven with Playwright `_electron` against a temp userData (real preload → IPC boundary → main pipeline → SQLite): app boots to the shell; `import.read` returns the correct preview through the real bridge; a real CDP file-backed drag-and-drop of a fixture spreadsheet renders the preview table and pre-selected mapping; mapping edit (Keterangan → skip) applied; commit through the real button shows the success panel + sonner toast "Imported 4 recipients. 1 duplicate skipped." with Go to Compose / Go to Recipients; DB rows verified: one shared batch id, metadata bag without the skipped column, numeric phone coerced to string, email-less row stored with null email
- typecheck (node + web), oxlint, oxfmt, full suite green; `npm run build` green

Code review (5-agent pass + independent verification) found 6 issues, all fixed and re-verified in the live app:
- Header trim-collision: `sheet_to_json` keyed mode silently collapses headers differing only by whitespace (e.g. "Nama" vs "Nama ") and keeps the last column's data. The parser now reads the grid as array-of-arrays, keeps the first occurrence per trimmed header, preserves original cell indices so no surviving column shifts, and warns ("Column headers ... appear more than once after trimming")
- Drop handling only existed on the idle dropzone, so dropping a file while a preview was showing silently did nothing. Drops are now handled at the page level in every state (a drop replaces the current file); the dropzone keeps the visual highlight
- Renderer race: reset stayed enabled during an in-flight commit, and async resolutions applied unconditionally, so a stale commit could clobber a newer preview. A load token now guards every async resolution (load/commit), and the "Import another file" button is disabled while committing
- Electron prefixes rejected invokes ("Error invoking remote method 'import:read': Error: ..."); the renderer now strips the prefix so the banner shows the clean message (verified with a corrupt zip: "Unsupported ZIP encryption")
- Commit silently dropped rows whose name was empty under the user's final mapping. `ImportCommitResponse` now carries `rowsSkippedNoName`, reported in the success panel
- `listRecipientEmails` promised "trimmed and lowercased" but only lowercased; it now trims, matching the single normalizing writer

Also from review: the "Import N recipients" button label used the parse-time count (stale after remapping or against existing DB rows) - the label is now "Import recipients" and the commit result reports the honest numbers. The read path is async for the file read (large sheets no longer block the event loop on I/O; the SheetJS parse itself is synchronous). `playwright-core` was removed again - the E2E driver was throwaway verification; Seam B (ticket 18) will add it for real. Added tests for the trim-collision warning and the non-Excel rejection; 30 tests green after the fixes.

Known limitation, documented rather than fixed: phone numbers stored as Excel numbers lose a leading zero (e.g. "0812..." -> "8123456") because Excel itself discards it - the formatted cell is all that survives; no warning is shown for this.

Deviations from the spec, all deliberate:
- `import.commit` payload is `{ rows, columnMapping }` (the parsed rows from the preview, not pre-built recipients) - main re-applies the user's mapping, dedupes, and persists, so all mapping business logic stays in the main process (spec decision 3); the spec IPC table's `commit(recipients, columnMapping)` is realized as rows + mapping
- `ImportPreview` additionally carries `columns`, `rows` (all parsed rows) and `suggestedMapping` - the preview table and the mapping UI need them; the table itself shows the first 50 rows
- Duplicate detection runs at read (within-file) and again at commit (within-batch + against existing DB recipients). Rows without an email are never duplicate candidates (lowercased-email rule, per the ticket), so a re-import of the same file re-inserts only the email-less rows - the counts are reported honestly
- The preview table is a plain HTML table, not TanStack Table - a static read-only 50-row view gets nothing from the library; TanStack Table arrives with ticket 11's recipients management
- "Success toast" is a sonner toast plus a persistent success panel carrying the Go to Compose / Go to Recipients / Import another file actions (a toast alone would lose the actions)
- `system.pickExcelFile` and `system.getPathForFile` were added to the IPC contract (additive-only per decision 4): the browse dialog, and resolving a dropped file's path without the deprecated `File.path` (unavailable with the sandbox on)
- Effect 4 beta API differs from the v3 docs: `Schema.Literals([...])` for literal unions and `Schema.Union([...])` array form - worth knowing for every later ticket that adds schemas
- The `@e965/xlsx` ESM build's `writeFile` hits its browser save path under Node, so tests generate fixture bytes via `XLSX.write(..., { type: "buffer" })` + `fs.writeFileSync` (and any future fixture code should do the same)

# 09 — Import allow-duplicates choice (Test Blasts)

**What to build:** The import preview screen gains a checkbox "allow duplicate emails" (default off). When checked, the commit skips BOTH dedupes — within-file and against-table (the existing `dedupeRecipients` seed) — so every row of the sheet imports even when all emails are identical. The preview's skipped-duplicates warning reflects the checkbox state. The database gains no uniqueness constraint; duplicate rows are ordinary recipients once imported. This is the Test Blast escape hatch (ADR 0007).

**Blocked by:** None — can start immediately.

**Status:** done

- [x] Import preview shows the allow-duplicates checkbox, default off
- [x] With the box off, behavior is unchanged: within-file and against-table dedupe skip duplicates and the count shows in the preview
- [x] With the box on, all rows import regardless of duplicate emails, including duplicates of already-imported addresses
- [x] The skipped-duplicates warning in the preview reflects the checkbox state before commit
- [x] Rows without an email are never duplicate candidates, unchanged
- [x] Service and e2e tests cover both checkbox states (e2e: duplicate-email sheet imports 1 row off, N rows on)

## Answer

Implemented in `email-blast-desktop/`:

- `src/shared/ipc.ts` - `ImportReadPayload` is now a struct `{ excelPath, allowDuplicates }` (was the bare path) and `ImportCommitPayload` gains `allowDuplicates`; the `Api` interface's `import.read` takes the struct. Wire table untouched (both ops stay 1-arg).
- `src/main/services/import.ts` - `ImportServiceShape.read(excelPath, allowDuplicates)` and `commit(rows, columnMapping, allowDuplicates)`. With duplicates allowed, `buildPreview` skips the parse-time dedupe (`skippedDuplicates: 0`, all mapped rows in `recipients`) and the commit skips BOTH dedupes without reading the table's existing emails (`imported = mapped.length`, `duplicatesSkipped: 0`). The `dedupeRecipients` function is unchanged - the flag gates its use, so rows without an email are never duplicate candidates in either state.
- `src/renderer/src/routes/import.tsx` - the preview section gains the "Allow duplicate emails" checkbox (default off) with a hint line. Toggling re-reads the same file through `import.read` with the new flag, so the preview's skipped-duplicates warning is computed against the choice before commit; commit sends the flag.
- `messages/en.json` + `id.json` - `importPage.allowDuplicates` / `importPage.allowDuplicatesHint`, compiled into `src/paraglide/`.
- `src/main/services/import.test.ts` - two new Seam A tests (read keeps every row on; commit imports duplicates within the batch AND against the table on), existing call sites updated to the explicit `false` flag.
- `e2e/import-allow-duplicates.test.ts` - Seam B: a 4-row sheet sharing one email imports 1 row off ("3 duplicates already skipped during parsing", done screen "Imported 1 recipients ... 3 duplicates skipped", directory shows 1) and all 4 on (warning gone after checking the box, "Imported 4 recipients ... 0 duplicates skipped", directory shows 4).

Verified on 2026-08-12:

- TDD: both new service tests failed before the service change, pass after (19/19 import tests).
- `pnpm typecheck:node && pnpm typecheck:web && pnpm lint` clean; full unit suite 282/282; full e2e suite against a fresh `pnpm package` 21/21 (13 files, +2 new).
- `src/paraglide/` regenerated with the pinned `@inlang/paraglide-js` 2.23.2 using the same options the vite plugin passes (`--strategy globalVariable baseLocale --emit-ts-declarations --no-emit-git-ignore`). This replaces a stale-format working-tree state produced outside the pinned toolchain; the committed output is what the vite plugin regenerates on any build.

Deviations from the spec, all deliberate:

- The checkbox re-reads the file on toggle instead of only masking the warning in the renderer. The preview (recipients list and skipped count) is then genuinely computed against the commit-time choice - the data contract stays honest rather than the UI hiding a stale count. Cost: one re-parse per toggle, which is a local file read.
- No `API_VERSION` bump: the payload changes are shape changes to channels renderer and main ship together (same precedent as the ticket 08 payload changes).

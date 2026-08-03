# 12 — Templates

**What to build:** The Templates screen end to end: the user registers a DOCX letter template (slot names auto-detected, editable) or an image certificate template (slot names and text coordinates entered manually), sets the output pattern (e.g. `LOA_{name}.pdf`), and can edit or delete it afterwards. Templates appear as cards with name, type badge, slot count, and created date; the card detail shows slots and the pattern preview.

**Blocked by:** 09 — First launch, database & settings

**Status:** done

- [x] Add template via file picker; DOCX → slots auto-detected from `{placeholder}` patterns and editable; image → manual slot entry
- [x] Output pattern set on creation and previewed; a template declares its required slots
- [x] Card grid + detail view; edit (slots, output pattern) and delete work
- [x] Seam A: slot scanning on a fixture DOCX returns the declared slots; template create/update/delete round-trip against a temp database

## Answer

Implemented in `email-blast-desktop/`:

- `src/main/services/templates.ts` - the templates domain service: `list`/`get`/`create`/`update`/`delete`/`scanSlots`, following the ImportService pattern (`Context.Service` + `Layer.provideMerge` providing SqliteRepo alongside). Errors are `Data.TaggedError`s: `InvalidTemplate` (validation), `UnreadableDocx` (scan failures, path-prefixed for actionable messages), `TemplateUpdateNotFound` (update on a deleted row - named so it cannot collide with the generate pipeline's `TemplateNotFound` in ticket 13, which means a missing template *file*). `scanDocxSlots` uses docxtemplater's `getTags()` - the same engine that fills at generate time - so scanned slots and fill behavior can never drift apart; the report is flattened across document + headers + footers, deduped in first-seen order. `getTags()` is a runtime API the bundled types don't declare; the read shape is declared locally
- `src/main/services/sqlite-repo.ts` - the five template queries/statements: `listTemplates` (newest first, name tiebreak), `getTemplate`, `insertTemplate` (id assigned, returns the stored row), `updateTemplate` (mutable fields only: name, slots, output pattern; file path and type are immutable), `deleteTemplate` (row count). Slots round-trip through JSON like the recipients metadata bag
- `src/shared/template-validation.ts` - NEW shared module, zero dependencies: `normalizeSlots` (trim/dedupe/order), `patternSlots`, `validateTemplate`, `TEMPLATE_EXTENSIONS` + `templateTypeForFile`. The main process re-validates at the boundary; the renderer uses the same functions for instant feedback, so user-visible error messages can never drift from what main rejects. The extension list also drives the native file-picker filter in `src/main/index.ts`
- `src/shared/ipc.ts` + `ipc-channels.ts` + `preload/index.ts` + `src/main/index.ts` + `runtime.ts` - additive contract: `templates.list()` → `Template[]`, `get(id)` → `Template | null`, `create(payload)` → `Template`, `update({id, name, slots, outputPattern})` → `Template`, `delete(id)` → `{ deleted }`, `scanSlots(docxPath)` → `{ slots }`, plus `system:pick-template-file` (docx/png/jpg/jpeg). Handlers decode at the boundary and Schema-encode responses; `TemplatesService.Live` joined the root layer
- Renderer `routes/templates.tsx` - card grid (name, DOCX/Image badge, slot count, created date), add flow behind the native file picker: DOCX auto-scans on open with a stale-result token guard and a Rescan button, image starts from manual slot rows (stable ids so removing a row never rebinds another input); output pattern input with live validation and a preview that highlights every `{slot}` (undeclared references render red); detail side panel (file path, registered date, slot chips, pattern preview, "edit the file externally" hint) with Edit and Delete behind a confirmation dialog. Validation failures disable Save with the shared error message
- `src/renderer/src/components/error-banner.tsx` - the destructive error banner extracted from its second copy in `recipients.tsx` (now used by both screens; the import screen's inline variant predates it)

Verified end to end on 2026-08-03:

- Seam A: 21 new vitest tests green (63 total): slot scanning on fixture DOCX built in-test with PizZip (document/header/footer parts wired through `word/_rels/document.xml.rels` - minimal-but-valid, the same shape Word writes), document order, cross-part dedupe, split-run tag joining, no-placeholder docx, extension and corrupt-file scan failures, create round-trip through list/get (full shape, JSON slots, id/createdAt formats), slot normalization (trim/dedupe/drop-empty), image template creation, pattern validation (undeclared reference, no reference, empty slots, empty name), update persistence with the file immutable, `TemplateUpdateNotFound` on missing id, update re-validates, delete counts and leaves other templates, plus the shared validation helpers
- Live app driven with Playwright `_electron` against a temp userData (`--user-data-dir` probe first, real profile never touched): first-launch Get Started, empty state, Add template with the native dialog stubbed in main to return the real `templates/ff.docx` - auto-scan returned `["no", "name"]`, form registered "Surat LOA" with `LOA_{no}_{name}.pdf`, card shows DOCX badge and "2 slots", detail panel shows file path, slot chips, and pattern preview, invalid pattern ("LOA.pdf") shows the shared error and disables Save, edit persists the pattern, Rescan in edit mode asks "Replace slots?" first and "Keep my slots" preserves edits, delete confirms and returns to the empty state, image template through the UI with manual slots and Image badge, DB truth verified after close (one row, image type, slots JSON), zero renderer console errors
- Layout audit at 1280x800: no horizontal overflow, 3-column grid with consistent card heights, long names truncate, panel anchored right full-height at w-96, dialog centered with max-height and internal scroll (20 slots), no console errors
- typecheck (node + web), oxlint, oxfmt, full vitest suite green; `pnpm build` green

Code review (two-axis: standards + spec, parallel agents) found no hard violations; the fixed items:

- Validation logic and error strings existed in two copies (main service + renderer); extracted to the shared `template-validation.ts` so messages can never drift
- File-extension knowledge lived in both the dialog filter and the renderer; the picker filter now derives from the shared `TEMPLATE_EXTENSIONS`
- Rescan in edit mode silently overwrote the user's edited slots; it now asks for confirmation ("Replace slots" / "Keep my slots")
- `TemplateNotFound` renamed to `TemplateUpdateNotFound` to prevent a conceptual collision with ticket 13's `GenerateError.TemplateNotFound` (row missing vs file missing)
- Third copy of the error banner extracted to `components/error-banner.tsx`, used by recipients and templates
- Inert `keepPreviousData` removed from the unpaginated templates query

Deviations from the spec, all deliberate:

- `templates.delete` returns `{ deleted }` instead of the spec table's `void` - matches the `recipients.delete` precedent from ticket 11; the renderer ignores the count
- `scanSlots` returns `{ slots }` instead of the spec table's bare `string[]` - matches the response-envelope convention of every other handler
- The output pattern is hard-validated to reference at least one declared slot and nothing else. The spec only says the user "sets the output pattern", but a constant pattern like `letter.pdf` silently overwrites itself for every recipient, and `LOA_{naem}.pdf` would too; the validation prevents a real data-loss footgun. This also gives "a template declares its required slots" teeth: compose (ticket 13) can check the pattern and the declared slots against recipient metadata
- The ticket's "text coordinates entered manually" for image templates is NOT implemented here: the spec's own schema (templates table, decision 7) and screen text omit coordinates, and the CONTEXT.md glossary places them at Generate-Job time ("(Image templates only) text coordinate overrides per slot") - they belong to the compose step, not template registration. Documented here so ticket 14 does not misread the ticket line
- New IPC: `system:pick-template-file` is plumbing (the sandboxed renderer cannot open native dialogs) and `templates:scan-slots` is the auto-detection seam the ticket asks for; both are additive per decision 4
- docxtemplater 3.69.3 + PizZip 3.2.0 added to `dependencies` at the spec-pinned versions (electron-vite externalizes `dependencies` by default, no bundling config needed)

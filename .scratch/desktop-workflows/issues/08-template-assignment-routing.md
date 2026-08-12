# 08 — Template Assignment routing

**What to build:** Import gains a "template" column role, auto-suggested for headers like `template`/`jenis`/`kategori` and confirmable in the column-mapping UI; the chosen header is the routing key. A Generate Job that declares a template column shows the distinct values found in the data and lets the user assign each value to a Document Template, with a default template covering blank values. Unassigned values fail fast before generation, listing the affected recipients by name. Slot coverage is validated per template against the recipients routed to it. All recipients share the job's output naming pattern regardless of their template (per ADR 0006).

**Blocked by:** 05 — Generate workspace.

**Status:** done

- [x] Import column mapping offers a "template" role, auto-suggested for headers like template/jenis/kategori
- [x] A Generate Job with a template column shows the distinct values in the data; the user assigns each value to a Document Template and sets a default
- [x] Blank values use the default template
- [x] Unassigned values fail fast before generation, listing the affected recipients by name; no partial or wrong-template output is produced
- [x] Slot coverage is validated per template against the recipients routed to it; missing coverage fails the affected recipients with clear errors
- [x] All recipients share the job's output naming pattern regardless of template
- [x] E2E: two variants in one job produce correctly routed PDFs in one output batch, with per-recipient statuses as expected
- [x] Jobs without a template column behave exactly as today (single default template, no routing UI)

## Answer

Implemented per ADR 0006 (commit for ticket 08, `email-blast-desktop/`).

- **Import**: `ColumnRole` gains `template`; `suggestMapping` auto-suggests it (synonyms template/jenis/kategori/tipe/type/category/kind, substring fallback) via the shared `suggestTemplateColumn`; the value stays in the metadata bag under its original header — the import never interprets it.
- **Shared logic**: `src/shared/template-assignment.ts` — column suggestion, distinct values, per-recipient resolution (blank → default), the unassigned fail-fast report (with recipient names), and job output-pattern validation (every referenced slot must be declared by EVERY involved template). Pure, vitest-covered, used by main and renderer.
- **Schema**: `generate_jobs` gains `template_column`, `template_assignment` (value → template id JSON), and `output_pattern` (the ONE pattern the whole job shares); `generate_job_recipients` gains `template_value` (the routing value at job start, the audit trail). Migration `0004_happy_killraven.sql`. Legacy rows keep working: null columns fall back to the template's pattern.
- **Generate service**: `start` takes an optional routing draft and refuses incomplete assignments (unassigned values listed by name), unknown assigned templates, and patterns one variant cannot fill — before anything is persisted. `run` resolves each row's template, groups by template (first-appearance order), and runs one pipeline per group with the job's shared pattern; unresolvable rows (deleted recipients, or values unmapped behind the service's back) fail per-recipient. Non-routed jobs are byte-for-byte the old behavior (recorded pattern = the template's).
- **Workspace**: the Generate page gains a Template Routing section — a route-by-column select (candidate metadata keys, the synonym match marked "(suggested)"), per-value template assignment, the default-template box (blank values), per-template slot coverage, the shared output-pattern editor with live validation, and the unassigned-values warning listing recipients by name. The start action is gated on complete assignment + valid pattern + full coverage; the done-state staleness guard now includes the routing; Retry pre-fills the job's routing.
- **E2E** (`e2e/template-routing.test.ts`): two docx variants (LOA with `{instansi}`, SK without) in one job — 4 recipients (2 LOA, 1 SK, 1 blank) produce `BATCH_*.pdf` in one output batch; the produced PDFs' text (extracted with pdfjs) proves each recipient got its own template; the fail-fast scenario leaves the button disabled with "Fauziah Zahra" listed and zero files on disk, then completes once the value is assigned.
- Verified: `pnpm typecheck`, `pnpm lint` green; 271 unit tests + 19 E2E tests pass (full suites, no regressions).

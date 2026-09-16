# 05 — Generate workspace

**What to build:** The sidebar replaces Compose with two entries: Generate and Send. The Generate workspace collects the wizard's offline steps — recipient picker (searchable, filterable, batch-select), single Document Template with slot-coverage validation, generation with live per-recipient progress, per-recipient failure list with errors, and results with PDF re-download. No message, SMTP, or send step exists anywhere in this workspace. The old Composer route remains temporarily for the send side only, until the Send workspace (06) replaces it.

**Blocked by:** None — can start immediately.

**Status:** done

- [x] Sidebar shows Generate and Send; Generate opens the workspace
- [x] Generate workspace: pick recipients (search/filter/batch as today), pick a Document Template with slot-coverage validation, start generation with live progress
- [x] Per-recipient failures are listed with their errors; successful PDFs land in the output folder named by the template's pattern
- [x] Past Generate Jobs can be reopened and their PDFs re-downloaded
- [x] No message, SMTP, or send step exists anywhere in the workspace — a certificate batch can be generated with zero email configuration
- [x] The old Composer route still works for the send side (temporary bridge to 06)

## Answer

Implemented in `email-blast-desktop/` (commit `c7d0131`):

- Sidebar splits into Generate and Send; `routes/generate.tsx` is the Generate workspace: RecipientsStep (search/filter/batch select, unchanged from the wizard), TemplateStep with slot-coverage validation (missing metadata per slot listed), GenerateStep with live per-recipient progress, per-recipient failure list with errors, and results with the spot-check PDF preview and per-file re-download
- No message, SMTP, or send step exists anywhere in the workspace; a certificate batch generates with zero email configuration
- The old Composer route remained for the send side until ticket 06 replaced it (then retired in ticket 07)
- The generate pipeline itself (jobs, progress hub, LibreOffice batch conversion, output naming) was already in place from the wizard era; the workspace is the new UI over it

Tests: Seam B `e2e/generate-workspace.test.ts` walks import → Generate workspace → generate → failure list → re-download against the packaged app.

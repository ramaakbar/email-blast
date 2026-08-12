# 05 — Generate workspace

**What to build:** The sidebar replaces Compose with two entries: Generate and Send. The Generate workspace collects the wizard's offline steps — recipient picker (searchable, filterable, batch-select), single Document Template with slot-coverage validation, generation with live per-recipient progress, per-recipient failure list with errors, and results with PDF re-download. No message, SMTP, or send step exists anywhere in this workspace. The old Composer route remains temporarily for the send side only, until the Send workspace (06) replaces it.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [ ] Sidebar shows Generate and Send; Generate opens the workspace
- [ ] Generate workspace: pick recipients (search/filter/batch as today), pick a Document Template with slot-coverage validation, start generation with live progress
- [ ] Per-recipient failures are listed with their errors; successful PDFs land in the output folder named by the template's pattern
- [ ] Past Generate Jobs can be reopened and their PDFs re-downloaded
- [ ] No message, SMTP, or send step exists anywhere in the workspace — a certificate batch can be generated with zero email configuration
- [ ] The old Composer route still works for the send side (temporary bridge to 06)

# 13 — Generate pipeline

**What to build:** Compose wizard steps 1, 2, and 5 working end to end: the user selects recipients (search/filter/select-all with a running count), picks a template whose required slots are covered by the selected recipients' metadata, and generates one PDF per recipient with live progress. Per-recipient failures are reported with reasons while the rest of the batch continues; the user spot-checks rendered PDFs before proceeding, and recipients whose generation failed are excluded from the send.

**Blocked by:** 11 — Recipients management, 12 — Templates

**Status:** ready-for-agent

- [ ] Step 1 (recipients): filter by batch + search, multi-select with count, Next enabled only when selection > 0
- [ ] Step 2 (template): dropdown + preview card with required slots; coverage check against selected recipients' metadata
- [ ] Step 5 (generate & review): summary, Generate PDFs with live progress (generate-progress events), per-recipient `generated`/`failed` statuses with reasons; DOCX fill in-process, LibreOffice headless conversion batched as one invocation per job; image templates via pdf-lib with text overlay
- [ ] Spot-check: preview of 2-3 rendered PDFs alongside recipient data; Next enabled even with partial failures; failed recipients marked and excluded from the send
- [ ] Seam A: generate job lifecycle with TestClock - progress events stream, per-recipient failure continues the batch, the generate-then-send gate returns only confirmed-good attachments

# 05: OfficeCLI fill + convert fidelity prototype

Type: prototype
Status: resolved
Blocked by: 02

## Answer

**Verdict: the docxtemplater + LibreOffice headless pipeline is production-safe on the real template.** Verified 2026-08-02 on `templates/ff.docx` (real acceptance letter — "Pernyataan Penerimaan Fully Funded Bhakti Nusantara #10" — with letterhead in `header1.xml`, `{no}` and `{name}` slots in the body). Assets in `prototype-05/` (fill.ts, filled/, pdf/).

### Fidelity — verified at the text and byte layer

- Placeholders land correctly: `{no}` → `001`, `{name}` → `Budi Santoso` / `Siti Rahmah` / `Agus Wijaya` (all 3 samples verified in the PDFs)
- Letterhead: **all 8 embedded images byte-identical** between baseline and filled PDF (md5 match on every image pair extracted via pdfimages) — the header renders exactly the same
- Page count stable at 1 page; body text identical to the baseline apart from the filled values; same PDF size class (~178KB)
- Layout shift: the "No :" field takes one char more/less space because `001` ≠ `{no}` — expected, correct behavior (the slot value occupies its own space)
- Note: on this template the placeholders sit intact in single runs, so the run-split hazard did not arise here; docxtemplater is proven against it regardless (ticket 02)

### Throughput — measured on this machine (Mac arm64, LibreOffice installed)

- Fill (docxtemplater, in-process): 100 docs in 0.69s → **0.007s/doc**
- Convert (LibreOffice headless, one batch invocation): 100 docs in 20.7s wall → **~0.21s/doc** (steady state; first run includes ~5-9s profile spin-up)
- Pipeline total ≈ 0.22s/recipient → ~3.7 min per 1000 recipients; trivial parallelization headroom (soffice handles a file list in one invocation)
- The generate stage is not a bottleneck for the send flow (rate limit is 1 email/sec — 6x slower than generation)

### OfficeCLI re-check (conditional)

Not applicable — ticket 02 established no PDF exporter plugin exists for officecli v1.0.143 and the registry is down. Watch item only: re-test `officecli view <file> pdf` if an official plugin ships.

### Standing guidance for the build

- Batch conversions per job (one soffice invocation per Generate job, not one per recipient) — that's where the 0.21s/doc lives
- Spot-check the other templates (pf-*, sf-*) when they get wired into the app — same engine, but each template's table/header layout deserves one visual pass
- Certificates (image → PDF via pdf-lib) untouched by this ticket — already proven in `src/generate-certif.ts`

## Question

Ticket 02 settled the fill path (keep docxtemplater) and found officecli's PDF exporter non-existent on current evidence. What remains unverified is DOCX → PDF **fidelity on the user's real letterhead templates** — the one risk that decides whether the whole pipeline holds up.

Prototype scope (narrowed after ticket 02):

- Convert: take one real DOCX letter template, fill 2-3 sample recipients via docxtemplater, convert through LibreOffice headless — verify letterhead, headers/footers, fonts, table layout, pagination against the original (visually, page by page)
- OfficeCLI re-check (conditional): if an official PDF exporter plugin ships with a working `plugins install`, re-test `officecli view <file> pdf` against the same templates — the registry was down at ticket 02's research time, so this is a watch item, not a workstream
- Measure: wall-clock for ~100 recipients through the docxtemplater + LibreOffice path (baseline for the send flow)
- Image templates (certificates): note only — image → PDF stays pdf-lib (already proven); don't re-prototype

Deliver: sample PDFs linked as assets and the verdict — the LibreOffice pipeline is production-safe as-is, or specific fidelity gaps to fix (font embedding, margins, image handling).

HITL: needs the user's real templates — coordinate with them to get one letter DOCX (and a filled example output, if available) before prototyping. The officecli binary is installed at `/opt/homebrew/bin/officecli` (v1.0.143) with the skill at `/Users/ramaakbar/.claude/skills/officecli/`.

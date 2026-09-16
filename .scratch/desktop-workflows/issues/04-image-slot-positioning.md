# 04 — Image slot text positioning

**What to build:** Each slot of an image Document Template is configurable with X/Y position, font size, color, and alignment. Configuration happens in the template editor with numeric inputs plus a live preview overlaid on the template image, where text boxes are draggable and the numeric fields update in sync. Generation renders each slot's text at its configured position, single-line with auto-shrink to fit the slot width. Templates without any slot configuration fall back to the current centered stacked layout, so existing templates keep working unchanged.

**Blocked by:** None — can start immediately.

**Status:** done

- [x] Each slot of an image Document Template can be configured with X/Y position, font size, color, and alignment
- [x] The editor shows a live preview over the template image; dragging a text box updates the numeric fields and vice versa
- [x] Generating with configured slots places text at the configured position, size, color, and alignment in the output PDF
- [x] Long values auto-shrink to fit the slot width without wrapping or overflow
- [x] Templates without slot configuration still generate with the current centered stacked layout
- [x] Existing image templates and past Generate Jobs are unaffected by the schema change

## Answer

Implemented in `email-blast-desktop/` (commit `7c92ee5`):

- `templates.slot_layout` JSON column stores per-slot config `{ x, y, fontSize, color, align, maxWidth }`; the file path and type stay immutable, past Generate Jobs reference their own rows and generated PDFs on disk, so nothing existing changes
- `shared/slot-layout.ts` owns the pure math both sides share: `fitFontSize` (single-line auto-shrink to the box width, legibility floor), `slotTextX` (alignment), `pdfBaselineY` (CSS top-left to pdf-lib baseline), `validateSlotLayout` — the renderer preview and the main-process generator call the same functions, so preview and PDF cannot drift
- The template editor's "Position text on image" opens `components/slot-layout-editor.tsx`: the template image with one draggable box per slot (pointer drag + arrow keys), numeric X/Y/size/max-width/color/alignment controls, both directions in sync; a slot with no saved config shows an ephemeral default box that materializes only when touched, so unpositioned slots keep the legacy centered stacked layout
- `renderImagePdf` in `generate-jobs.ts` draws configured slots at position/size/color/alignment, auto-shrunk to fit; unconfigured slots keep the legacy centered stacked draw (byte-identical to before)

Tests: Seam A `shared/slot-layout.test.ts` (fit/shrink/alignment/baseline/validation) and `generate-jobs.test.ts` positioning tests; Seam B `e2e/image-slot-positioning.test.ts` drives the editor through the UI, generates, and asserts the PDF draws text at the configured coordinates, sizes, colors, and alignments. Extended later by ticket 11 (per-slot font faces).

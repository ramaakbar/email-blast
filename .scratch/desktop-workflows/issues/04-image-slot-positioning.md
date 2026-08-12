# 04 — Image slot text positioning

**What to build:** Each slot of an image Document Template is configurable with X/Y position, font size, color, and alignment. Configuration happens in the template editor with numeric inputs plus a live preview overlaid on the template image, where text boxes are draggable and the numeric fields update in sync. Generation renders each slot's text at its configured position, single-line with auto-shrink to fit the slot width. Templates without any slot configuration fall back to the current centered stacked layout, so existing templates keep working unchanged.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [ ] Each slot of an image Document Template can be configured with X/Y position, font size, color, and alignment
- [ ] The editor shows a live preview over the template image; dragging a text box updates the numeric fields and vice versa
- [ ] Generating with configured slots places text at the configured position, size, color, and alignment in the output PDF
- [ ] Long values auto-shrink to fit the slot width without wrapping or overflow
- [ ] Templates without slot configuration still generate with the current centered stacked layout
- [ ] Existing image templates and past Generate Jobs are unaffected by the schema change

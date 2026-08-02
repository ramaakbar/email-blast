# 12 — Templates

**What to build:** The Templates screen end to end: the user registers a DOCX letter template (slot names auto-detected, editable) or an image certificate template (slot names and text coordinates entered manually), sets the output pattern (e.g. `LOA_{name}.pdf`), and can edit or delete it afterwards. Templates appear as cards with name, type badge, slot count, and created date; the card detail shows slots and the pattern preview.

**Blocked by:** 09 — First launch, database & settings

**Status:** ready-for-agent

- [ ] Add template via file picker; DOCX → slots auto-detected from `{placeholder}` patterns and editable; image → manual slot entry
- [ ] Output pattern set on creation and previewed; a template declares its required slots
- [ ] Card grid + detail view; edit (slots, output pattern) and delete work
- [ ] Seam A: slot scanning on a fixture DOCX returns the declared slots; template create/update/delete round-trip against a temp database

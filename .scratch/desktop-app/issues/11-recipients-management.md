# 11 — Recipients management

**What to build:** The Recipients screen end to end: a table of all imported recipients (name, email, phone, import batch, imported date), full-text search across name/email/custom fields, filtering by import batch, a detail side panel with every metadata key, and bulk delete with confirmation.

**Blocked by:** 10 — Excel import

**Status:** ready-for-agent

- [ ] Table lists recipients with search (name, email, custom fields) and batch filter; pagination works
- [ ] Row click opens a detail side panel showing all metadata-bag keys
- [ ] Bulk select + delete with confirmation; deleted recipients disappear and counts reflect it
- [ ] Seam A: `list` with search/filter/pagination, `get`, and `delete` round-trip against a temp database through the Effect Layer

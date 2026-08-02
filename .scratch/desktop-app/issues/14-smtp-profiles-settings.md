# 14 — SMTP profiles & Settings completion

**What to build:** The Settings screen's SMTP section end to end: the user saves named SMTP profiles (host, port, username, app password), sees them listed with masked passwords, edits and deletes them, and can test a profile's connection with a typed error on failure. The profile list is exposed through IPC for the compose wizard's SMTP step.

**Blocked by:** 09 — First launch, database & settings

**Status:** ready-for-agent

- [ ] Profile list with masked passwords; add/edit/delete dialogs work
- [ ] "Test Connection" per profile succeeds against a valid SMTP server and reports a typed error (connect/auth) when not
- [ ] Profiles are available to the wizard's SMTP step (via the `smtp` domain IPC)
- [ ] Seam A: profile CRUD round-trip; `test` against a local SMTP server succeeds, and against a bad host fails with a typed `SendError`

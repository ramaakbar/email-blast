# 07 — Retire the old wizard

**What to build:** The old 6-step Compose wizard and its prefill machinery are deleted — both workspaces are the only paths. Retrying a past Send Job from Logs opens the Send workspace prefilled with its recipients, message, Sender Identity, and profile; retrying a past Generate Job from Logs opens the Generate workspace prefilled. Dead code from the wizard era is removed.

**Blocked by:** 05 — Generate workspace; 06 — Send workspace.

**Status:** ready-for-agent

- [ ] The old 6-step composer route is gone; no links, redirects, or dead imports remain
- [ ] Retrying a past Send Job from Logs opens the Send workspace prefilled (recipients, message, identity, profile; password re-entered as today)
- [ ] Retrying a past Generate Job from Logs opens the Generate workspace prefilled
- [ ] Full E2E regression: import → generate → send passes through the new workspaces end to end
- [ ] Old wizard-era prefill code is removed, not left dead

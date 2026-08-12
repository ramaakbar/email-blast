# 07 — Retire the old wizard

**What to build:** The old 6-step Compose wizard and its prefill machinery are deleted — both workspaces are the only paths. Retrying a past Send Job from Logs opens the Send workspace prefilled with its recipients, message, Sender Identity, and profile; retrying a past Generate Job from Logs opens the Generate workspace prefilled. Dead code from the wizard era is removed.

**Blocked by:** 05 — Generate workspace; 06 — Send workspace.

**Status:** done

- [x] The old 6-step composer route is gone; no links, redirects, or dead imports remain
- [x] Retrying a past Send Job from Logs opens the Send workspace prefilled (recipients, message, identity, profile; password re-entered as today)
- [x] Retrying a past Generate Job from Logs opens the Generate workspace prefilled
- [x] Full E2E regression: import → generate → send passes through the new workspaces end to end
- [x] Old wizard-era prefill code is removed, not left dead

## Answer

Implemented in `email-blast-desktop/` (commit `37043bc`):

- The 6-step Compose route is deleted; the sidebar's Compose entry is gone and `routes/` holds only the workspaces (Import, Generate, Send, Logs, Recipients, Templates, Settings) — no dead imports or redirects remain (the `compose.*` i18n keys live on, reused by the workspaces' shared copy)
- Logs retry flows open the workspaces pre-filled: a Send Job retry seeds the Send workspace with the job's recipients (the failed ones), message, sender identity, and profile — the inline password is re-entered as before; a Generate Job retry opens the Generate workspace with its recipients pre-selected
- The prefill machinery lives in `lib/send-prefill.ts` / `lib/use-resume-send.ts` (workspace retry prefill + resume), not wizard-era dead code
- The send pipeline's retry (`retryFailedSend`) and the generate gate surfaced through the workspaces

Tests: Seam B `e2e/send-workspace.test.ts`, `e2e/generate-workspace.test.ts`, and `e2e/logs-retry.test.ts` cover the import → generate → send regression and both Logs retry paths against the packaged app.

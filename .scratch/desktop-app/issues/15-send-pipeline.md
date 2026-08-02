# 15 — Send pipeline

**What to build:** Compose wizard steps 3, 4, and 6 working end to end: the user writes a subject and HTML body with `{slot}` interpolation (autocomplete, live preview for sample recipients), chooses a saved SMTP profile or enters one inline for this job only (with "Save as profile" and Test Connection), then sends with a pre-flight check, a per-recipient pacing gate, automatic retry with backoff, pause/resume/cancel, and a cursor persisted after every send so nothing double-sends. The user watches live progress and gets a completion summary with retry-failures entry.

**Blocked by:** 13 — Generate pipeline, 14 — SMTP profiles & Settings completion

**Status:** ready-for-agent

- [ ] Step 3 (message): subject + HTML body with `{slot}` autocomplete and live preview rendered for 2-3 sample recipients; unknown or missing slot → descriptive error, no silent literal placeholder
- [ ] Step 4 (SMTP): saved profile or inline override (save-as-profile option), Test Connection, rate-limit override 500-5000ms
- [ ] Step 6 (send): final summary; pre-flight (SMTP connect + auth, at least one recipient with a confirmed generated attachment) fails fast with a clear message
- [ ] Sending: live progress bar, scrolling per-recipient log, failure counter; per-recipient `sent` (with message id) / `failed` (with error) / `skipped`
- [ ] Retry: 3 retries at 1s/2s/4s exponential backoff, then the job transitions to a persisted `paused` state and the renderer is notified (job-paused event)
- [ ] Pause/Resume toggle and Cancel with confirmation ("N of M sent - cancel anyway?") - cancel marks the remainder `skipped` in one transaction and the job `cancelled` (terminal)
- [ ] Cursor persisted in the same transaction as the per-recipient status after each send; the pacing gate fires before each send (delay → send → persist)
- [ ] Completion summary "N sent, M failed" with a Retry Failures action
- [ ] Seam A: full send lifecycle with TestClock and a captured SMTP server - retry schedule timing, live pacing-gate interval change, pause/resume, cancel, cursor persist, restart-resume on the same database, and the quit Latch losing at most the in-flight recipient

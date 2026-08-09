# 18 — End-to-end suite

**What to build:** The Seam B test suite: Playwright's Electron launcher drives the real window against a local SMTP capture server. It proves the full happy path (import → generate → send → logs), the quit/resume story across app restarts, the first-launch flow without LibreOffice, and the one-active-job block — everything the Layer-seam tests cannot see (IPC surface, preload bridge, wizard wiring).

**Blocked by:** 17, 19, 20, 22, 24, 25 - all done; 21 and 23 scrapped as wontfix (user decision 2026-08-09). Unblocked.

**Status:** resolved

- [x] Happy path: import a fixture spreadsheet, generate PDFs, send to a local SMTP capture server, verify sent rows land in Logs with per-recipient outcomes
- [x] Quit mid-send → relaunch → resume from Logs completes the job with no skipped or double-sent recipients
- [x] First-launch flow with LibreOffice absent shows the install guidance; "Check Again" re-checks
- [x] One-active-job block is visible in the UI
- [x] The suite runs as a single command and is green

## Answer

The Seam B suite lives in `email-blast-desktop/e2e/` and runs as
`pnpm test:e2e` (vitest with `vitest.e2e.config.ts`, serialized files,
180s timeouts; requires the packaged app - `pnpm package` first, or
`APP_PATH` to point elsewhere). The harness (`e2e/harness.ts`) launches
the packaged app with Playwright's Electron driver against an isolated
`--user-data-dir` (macOS ignores HOME for userData) and `--lang=en` so
the English-string selectors never flip with the OS locale, seeds the
app-created schema with `node:sqlite` between launches, and answers the
native dialogs by patching `dialog` in the main process (the picker for
import, the quit dialog with [Quit & Pause]).

- `e2e/app.test.ts` - the full happy path through the real window: import
  page (patched picker) → 6-step compose wizard (recipients, template,
  message, inline SMTP with a live Test Connection against the capture
  server, generate via real LibreOffice, send) → Logs job detail with
  per-recipient Sent outcomes. Asserts the 4 PDFs land in the output dir
  named by the output pattern, and each captured MIME carries the
  personalized body and the pattern-named attachment.
- `e2e/quit-resume.test.ts` - sends a real 5-recipient campaign at 1000ms
  pacing and drives BOTH branches of the close guard (spec Testing
  Decisions): [Keep Sending] leaves the app alive and the send continues
  (2 → 4 sent), then [Quit & Pause] quits with the job paused at the
  persisted cursor. Relaunching on the same userData: boot recovery turns
  the job paused, the launch banner names it, Logs shows "Paused - 4 of 5
  sent", and the resume delivers exactly the remaining recipient - the
  captured set is exactly the five distinct recipients, nothing skipped
  or double-sent.
- `e2e/first-launch.test.ts` - with `EMAIL_BLAST_SOFFICE` forcing a
  nonexistent soffice, the welcome screen shows the install guidance and
  Get Started stays disabled; writing the stub file and hitting
  Check Again flips it to found and unlocks the app shell.
- `e2e/one-active-job.test.ts` - two paused jobs: the Logs Resume button
  fails with "Another send is in progress or paused..." (also proven
  through the bridge), and the rule is symmetric - cancelling one job
  (the wizard Cancel's IPC) frees the other to resume and deliver.

New test seams: `EMAIL_BLAST_SOFFICE` in `libreoffice.ts` (set even to
an empty string → the probe is overridden; a non-empty existing path is
forced, anything else reads as absent - CI can also point it at a
non-standard install). The `libreoffice.test.ts` Seam A test still
passes with the seam unset. 4 e2e tests + 175 Seam A tests green,
typecheck and oxlint clean.

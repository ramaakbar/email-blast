# 18 — End-to-end suite

**What to build:** The Seam B test suite: Playwright's Electron launcher drives the real window against a local SMTP capture server. It proves the full happy path (import → generate → send → logs), the quit/resume story across app restarts, the first-launch flow without LibreOffice, and the one-active-job block — everything the Layer-seam tests cannot see (IPC surface, preload bridge, wizard wiring).

**Blocked by:** 17 — Quit/resume resilience, 19 - Vite 8 upgrade, 20 - Electron Forge migration, 21 - Auto-update, 22 - Drizzle migration, 23 - TanStack Table v9, 24 - Paraglide + Bahasa Indonesia, 25 - Effect codebase refactor

**Status:** ready-for-agent

- [ ] Happy path: import a fixture spreadsheet, generate PDFs, send to a local SMTP capture server, verify sent rows land in Logs with per-recipient outcomes
- [ ] Quit mid-send → relaunch → resume from Logs completes the job with no skipped or double-sent recipients
- [ ] First-launch flow with LibreOffice absent shows the install guidance; "Check Again" re-checks
- [ ] One-active-job block is visible in the UI
- [ ] The suite runs as a single command and is green

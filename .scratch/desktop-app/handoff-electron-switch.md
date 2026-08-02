# Handoff: Email Blast Desktop App — Stack Switch Tauri → Electron

> **SUPERSEDED 2026-08-02 (charting session complete).** The stack decisions below were re-derived and resolved the same day. See `map.md` (current) for the Electron-era chart: decisions 01-05 resolved (scaffold, officecli, libraries, Effect, fidelity prototype), tickets 06-07 (IPC surface, process model) open. The open questions and next steps in this file are historical.

**Date:** 2026-08-02
**Decision:** User chose **Electron** (not Tauri). Also interested in **Effect v4** for the TypeScript backend and **OfficeCLI** as a possible LibreOffice replacement. This invalidates the Rust/Tauri-specific parts of the existing map, spec, and tickets. The new session should re-derive the stack decisions, then re-run `/to-spec` + `/to-tickets`.

## What transfers (decisions still valid)

These are framework-agnostic. Do NOT re-litigate them.

- **Destination** (from `map.md`): A desktop app that imports Excel recipients, previews them in a table, generates PDF letters from DOCX templates + certificates from image templates, bulk-sends via Gmail SMTP, and shows send logs. Local-only, no server, no multi-user. Channel seam for WhatsApp v2.
- **Data model** (ticket 04, `CONTEXT.md`): Recipient = name + channel addresses + metadata bag (dumb pipe). Template = user-declared slots (not auto-discovered) + file + type + output pattern. Generate Job and Send Job are independent. Send status: pending → sent | failed | skipped. Per-job SMTP config (not global).
- **Screens & navigation** (ticket 05): Sidebar + 6-step compose wizard. Routes: Import, Recipients, Templates, Compose, Logs (+ /logs/:jobId), Settings. React is still React — this transfers nearly wholesale (only the IPC calls change from `invoke()` to Electron IPC).
- **Resilience model** (ticket 06, concepts only): Per-recipient failure continues batch. 3x retry with exponential backoff (1s/2s/4s), then pause with resume. Cursor persisted to SQLite after each send, resume on restart. Rate limit 1 email/sec default (500ms–5000ms). Generate-then-send: only send to confirmed-good attachments. Pre-flight SMTP check before Send.
- **DOCX → PDF: LibreOffice headless** (ticket 03): `soffice --headless --convert-to pdf`. Language-agnostic — still the chosen path. ~200MB prerequisite, check on first launch.
- **Image → PDF**: same approach as existing CLI — pdf-lib with embedded background + fontkit (in `src/generate-certif.ts`). In Rust this was printpdf; in Electron it's pdf-lib again.
- **Existing Bun CLI** (`src/`): NOW the primary code reference, not just behavioral. It already uses nodemailer, pdf-lib, xlsx, PizZip + docxtemplater — the exact libraries the Electron app will use. Read it, don't re-derive.

## What's invalidated (re-derive in the new session)

- **Ticket 01** (Rust crate survey): calamine/lettre/rusqlite/printpdf → JS equivalents (xlsx or exceljs, nodemailer, better-sqlite3, pdf-lib).
- **Ticket 02** (Tauri scaffold) → Electron scaffold: electron-vite vs Electron Forge vs electron-builder, packaging, main/renderer/preload structure.
- **Ticket 06** Rust error types → Effect v4: typed errors, `Schedule` for retry, `Stream` for send progress.
- **`spec.md`**: architecture, project structure, Tauri commands, Rust types — all Tauri/Rust-specific. Keep it as a record; the new session writes a fresh spec.
- **Tickets 07–26**: implementation tickets are Tauri/Rust-specific. Regenerate after the new spec. (Keep files as history.)

## Open questions for the new wayfinder

1. **Electron scaffold recipe**: electron-vite + React + TypeScript? Electron Forge? electron-builder for packaging? Which is the current best practice (2026).
2. **JS library survey** (replaces ticket 01): Excel reading (xlsx vs exceljs), DOCX fill (docxtemplater — existing CLI uses it, `{placeholder}` single-brace compatible, or OfficeCLI merge with `{{key}}`), SQLite (better-sqlite3), SMTP (nodemailer — existing CLI proven), image→PDF (pdf-lib + fontkit — existing CLI proven).
3. **Effect v4 architecture**: how to structure the main-process backend with Effect (services, retry schedules, streams for progress events to renderer). Effect v4 is beta — decide whether beta is acceptable or use stable Effect v3.
4. **OfficeCLI** (user asked): Apache-2.0 single binary, `merge` fills `{{key}}` across headers/footers/table cells, `view` exports PDF via plugin. Two caveats: `{{}}` delimiter mismatch with existing templates, and PDF fidelity (letterhead) unverified. Worth a prototype ticket against the real templates before it can replace LibreOffice. If adopted for fill+convert it could drop the LibreOffice dependency.
5. **IPC surface**: contextBridge + ipcMain handlers replacing Tauri commands. Channel-based progress (webContents.send) replacing Tauri events.
6. **Process model**: long-running send jobs in the main process vs utility process; app-quit mid-send behavior in Electron (beforeunload/quit handling for cursor persistence).

## Suggested next steps for the new session

1. Read this handoff + `map.md` + `CONTEXT.md` + the 6 wayfinder tickets (they're in `.scratch/desktop-app/issues/`).
2. Run `/wayfinder` — destination is already known (the map's destination), stack decision made (Electron + React + Effect v4), the open decision tickets are the ones above. Resolve them (research/prototype/grilling), update the map.
3. Merge onto the main flow: `/to-spec` → `/to-tickets` → `/implement`.

## Repo state

- `main` at `6fda254`, clean tree, everything committed.
- `.scratch/desktop-app/` contains: `map.md`, `spec.md` (Tauri-era, to be replaced), `handoff-electron-switch.md`, `issues/01-26` (01-06 decisions, 07-26 Tauri implementation tickets to be replaced).
- `CONTEXT.md` (domain glossary) at repo root — transfers as-is.
- Existing Bun CLI in `src/` — reference for behavior AND code patterns now.

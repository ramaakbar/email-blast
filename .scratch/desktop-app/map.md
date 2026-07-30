# Map: Email Blast Desktop App

## Destination

A Tauri v2 desktop app (React + TanStack + Tailwind + shadcn, pnpm, oxlint/oxfmt) that lets a non-dev import an Excel file, preview recipients in a table, generate PDF letters from DOCX templates and certificates from image templates, bulk-send emails via Gmail SMTP, and view send logs.
All business logic in Rust.
Mixed Mac + Windows, local-only (no server, no multi-user).
Architecture leaves a seam for WhatsApp sending later.

## Notes

- Skills to consult: `/grill-with-docs`, `/domain-modeling`, `/tdd`, `/code-review`, `/prototype`
- Tech stack: Tauri v2, React, TanStack Router/Query/Table, Tailwind CSS v4, shadcn/ui, Vite, pnpm, oxlint, oxfmt
- Current codebase is a Bun CLI with three tools (generate-attachment, generate-certif, send-email) — reference for behavior but not code to port
- DOCX to PDF pipeline: own zip XML string replace for fill, then LibreOffice headless for DOCX→PDF (`soffice --headless --convert-to pdf`). Same approach as existing CLI. Certificate images → PDF via `printpdf` (no LibreOffice needed for that path)
- Template editing remains in Word/Photoshop/Figma for v1; built-in editor is out of scope

## Decisions so far

- [01: Rust crate survey](./issues/01-rust-crate-survey.md) — All-MIT/Apache-2.0 stack. Excel: `calamine`. SMTP: `lettre`. DB: `rusqlite` (bundled). PDF from image: `printpdf`. DOCX fill: own zip XML string replace (not `docx-template` — `{{}}` delimiter incompatible with existing `{placeholder}` templates). DOCX→PDF: LibreOffice headless (rdocx-html + webview print-to-PDF proved insufficient — no header/footer support).
- [02: Tauri v2 + React + Vite + pnpm scaffold](./issues/02-tauri-scaffold.md) — `pnpm create tauri-app@latest` with React + TypeScript + pnpm works out of the box. Tailwind v4 + shadcn/ui fully compatible with Tauri webview (CSS-first config, no `tailwind.config.ts`). TanStack Router/Query/Table integrate cleanly via Vite plugin. oxlint stable v1.x, oxfmt alpha v0.x. Full step-by-step recipe in the answer file.
- [04: Data model & domain glossary](./issues/04-data-model-and-glossary.md) — Wrote `CONTEXT.md`. Recipient = name + channel addresses + metadata bag (dumb pipe from Excel to template). Template = user-declared slots, not auto-discovered. Generate Job and Send Job are independent actions. Send status: pending → sent | failed | skipped. Per-job SMTP config (not global). Channel seam for WhatsApp v2.
- [05: App screens & navigation](./issues/05-app-screens-and-navigation.md) — Sidebar + compose wizard hybrid. Six routes: Import, Recipients, Templates, Compose (6-step wizard: recipients → template → message → SMTP → generate & review → send), Logs (with per-recipient drill-down and retry), Settings (SMTP profiles, rate limit delay slider, default paths). Import auto-maps Excel columns with manual override, skips duplicate emails. Live progress bar + scrolling log during send with pause/cancel. Message body supports `{slot}` interpolation from template + metadata keys.
- [06: Error handling & batch resilience](./issues/06-error-handling-and-resilience.md) — Per-recipient failure: continue batch, mark failed, retryable. SMTP disconnect: 3 retries with exponential backoff (1s/2s/4s), then pause with resume from cursor. Rate limiting: 1 email/second default, simple sleep between dispatches. App quit: cursor persisted to SQLite after each send, resume on restart. Generation failure: skip recipient, continue, only send to confirmed-good attachments. Validate everything during Generate step + SMTP pre-flight at Send time. Defined Rust error types (GenerateError, SendError), JobStatus enum, and SendCursor struct.
- [03: DOCX-to-PDF pipeline prototype](./issues/03-docx-pdf-pipeline-prototype.md) — rdocx-html + webview path **failed** (no header/footer support — letterhead dropped). Revised to **LibreOffice headless** (`soffice --headless --convert-to pdf`), same as existing CLI. Fill: own zip XML string replace (~25 lines). Certificate images: `printpdf` (LibreOffice not needed). LibreOffice is a prerequisite (~200MB on macOS/Windows); app should check on first launch and link to download if missing.

## Implementation tickets (from /to-tickets)

Tracer-bullet tickets with blocking edges. Work blockers-first. Each ticket is `ready-for-agent`.

- [07: Scaffold Tauri v2 + React + Vite + pnpm](./issues/07-scaffold-tauri-project.md)
- [08: Database schema and Rust model types](./issues/08-database-schema-and-models.md) — blocked by 07
- [09: Excel import pipeline (calamine)](./issues/09-excel-import-pipeline.md) — blocked by 08
- [10: DOCX fill and DOCX-to-PDF pipeline](./issues/10-docx-fill-and-convert-pipeline.md) — blocked by 08
- [11: Image to PDF pipeline (printpdf)](./issues/11-image-to-pdf-pipeline.md) — blocked by 08
- [12: SMTP email sender (lettre)](./issues/12-smtp-email-sender.md) — blocked by 08
- [13: Recipient and template CRUD + Tauri commands](./issues/13-recipient-and-template-crud.md) — blocked by 08, 09
- [14: Job CRUD and cursor persistence](./issues/14-job-crud-and-cursor.md) — blocked by 08
- [15: Compose — Generate job Tauri command](./issues/15-compose-generate-command.md) — blocked by 10, 11, 13, 14
- [16: Compose — Send job Tauri command](./issues/16-compose-send-command.md) — blocked by 12, 14
- [17: Settings and SMTP profile Tauri commands](./issues/17-settings-and-logs-commands.md) — blocked by 08
- [18: App shell — Tauri setup and React routing](./issues/18-app-shell-and-routing.md) — blocked by 07
- [19: Import screen](./issues/19-import-screen.md) — blocked by 09, 13, 18
- [20: Recipients screen](./issues/20-recipients-screen.md) — blocked by 13, 18
- [21: Templates screen](./issues/21-templates-screen.md) — blocked by 13, 18
- [22: Compose wizard (all 6 steps)](./issues/22-compose-wizard.md) — blocked by 15, 16, 17, 18
- [23: Logs screen and job detail](./issues/23-logs-screen.md) — blocked by 16, 18
- [24: Settings screen](./issues/24-settings-screen.md) — blocked by 17, 18
- [25: First-launch experience and restart resilience](./issues/25-first-launch-and-resilience.md) — blocked by 15, 16, 18
- [26: End-to-end integration test and final verification](./issues/26-end-to-end-integration.md) — blocked by 22, 23, 24, 25

## Not yet specified

- WhatsApp architecture — depends on the SMTP/email/job model from ticket 04. Likely a Baileys-based sidecar or pure Rust implementation; revisit after 04 is resolved
- Template editor — v2 only; v1 templates are edited externally (Word, Figma, Photoshop)

## Out of scope

- Multi-user / team features
- Server/cloud backend — app runs entirely locally
- WhatsApp sending (this map only sets up the architecture seam; actual WhatsApp belongs to a future map)

# 03 — Message Templates

**What to build:** A library of Message Templates — name, subject, and HTML body with `{slot}` placeholders — managed under a "Messages" tab in the Templates screen, alongside Documents. Picking a Message Template in a send job copies its contents into the job (copy-on-pick, per ADR 0005); editing the job's copy never changes the template. A "Save as template" action writes an edited job message back into the library as a new template. `{slot}` autocomplete and the live 3-recipient preview work in the template editor.

**Blocked by:** None — can start immediately.

**Status:** done

- [x] User can create, edit, and delete a Message Template (name, subject, HTML body)
- [x] `{slot}` autocomplete works in the template editor; unknown slots are flagged; missing metadata for a slot warns
- [x] Templates screen shows Documents and Messages tabs; the Messages tab lists templates with their previews
- [x] Picking a Message Template in a send job copies subject and body into the job's message editor
- [x] Editing the job's message leaves the saved template unchanged (verified by re-picking the template after a job edit)
- [x] "Save as template" from an edited job message creates a new Message Template with that subject and body
- [x] The live 3-recipient preview interpolates placeholders in both subject and body, as in the current message step

## Answer

Implemented 2026-08-09.

**Data:** `message_templates` table (id, name, subject, body_html, created_at, updated_at) via drizzle migration `0002_loving_cloak.sql`; SQLiteRepo gains the five CRUD methods following the template/smtp-profile pattern; the list orders by most-recently-edited.

**Domain:** `MessageTemplatesService` (Effect Context.Service, mirroring TemplatesService) validates name/subject/body non-empty via the new shared `validateMessageTemplate` in `shared/send.ts` (the same module that already owns `{slot}` interpolation and coverage, so slot validation can never drift). IPC: five channels (`message-templates:*`), schemas and `Api.messageTemplates` in `shared/ipc.ts`, wired through main/index.ts and the preload.

**UI:** the Templates screen gained a Documents/Messages tab bar. The Messages tab lists templates (name, subject, body preview, edited stamp) with a detail panel (sandboxed iframe body preview), create/edit dialog (name + the shared MessageEditor) and delete confirm. The wizard's message step gained a "Message template" pick select (copy-on-pick: seeds the job's own subject/body, select resets - the job owns its copy) and a "Save as template" action (name defaults to the subject; creates a new template). The message editor itself (subject, body with `{slot}` autocomplete, unknown-slot/missing-metadata warnings, live 3-recipient preview) was extracted into `components/message-editor.tsx`, shared verbatim by the wizard and the template dialog - the template dialog's slot inventory is the imported recipients (listAll), with a hint instead of false alarms when none are imported.

**Tests:** Seam A - `message-templates.test.ts` (10 tests: CRUD round-trips, normalization, validation, ordering). Seam B - `e2e/message-templates.test.ts` walks the full copy-on-pick cycle against the packaged app: create in Messages tab (preview interpolates Budi's body), pick in wizard, edit the job copy, save-as-template, re-pick proves the original untouched, library lists both. Full suites green: 215 unit + 9 E2E, typecheck and oxlint clean.

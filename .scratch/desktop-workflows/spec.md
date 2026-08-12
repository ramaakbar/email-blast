# Email Blast Desktop - Workflow Improvements Specification

Status: ready-for-agent

Synthesized from: grill-with-docs session (2026-08-09, decisions 1a/2a/3a/4a, 5a+c, 6a, 7a, 8, 9, 10a, 11a, 12, 13a, 14a, 15b, 16c).
Domain vocabulary: `CONTEXT.md` (Document Template, Message Template, Template Assignment, SMTP Profile, Sender Identity, Generate Job, Send Job).
Decisions recorded in: `docs/adr/0005-message-template-copy-on-pick.md`, `docs/adr/0006-template-assignment-via-excel-column.md`.

## Problem Statement

The app today chains generation and sending into one linear 6-step wizard (recipients → template → message → SMTP → generate → send). For a user whose real workflow is "generate certificates now, send letters later, never email the certificates", the wizard forces irrelevant steps on every run: generating certificates requires passing through message and SMTP steps, and sending a previously generated batch requires re-walking the whole wizard from the start. The message body is retyped for every campaign, a generate job can only use one template even when half a recipient list needs a different variant, the sender identity is retyped every job instead of living with the connection profile, and image-template text can only be auto-centered — not positioned on the design.

## Solution

The app splits into two independent workspaces. The **Generate workspace** covers recipient selection, Template Assignment (one default Document Template plus optional per-recipient routing via an Excel column), generation, and review — with no email steps anywhere. The **Send workspace** covers picking recipients (from a previously generated job, or directly from the imported list for plain messages), the message, the SMTP profile with its default Sender Identity, and sending. Message Templates (subject + body with placeholders) are saved and reused with copy-on-pick semantics. SMTP Profiles gain a default Sender Identity, still overridable per job. Image Document Templates gain per-slot text positioning with a live draggable preview.

## User Stories

### Generate workspace

1. As a user who only generates certificates, I want to generate documents without any email configuration, so that I never touch message or SMTP steps for an offline task.
2. As a user, I want to revisit any past Generate Job and re-download its PDFs, so that I can recover outputs from earlier campaigns.
3. As a user, I want a "Send these" shortcut on Generate Job results, so that I can jump into the Send workspace pre-linked to the job when I do want to email the output.
4. As a user, I want to route recipients to different Document Templates through a template column in my Excel, so that half a list can get variant A and half variant B in one Generate Job.
5. As a user, I want to assign each distinct template-column value to a Document Template at generate time, so that the mapping is visible and per-campaign.
6. As a user, I want recipients with a blank template-column value to use the job's default template, so that a mostly-default list needs no column at all.
7. As a user, I want a Generate Job with unassigned template-column values to fail fast and list the affected recipients, so that no recipient is ever generated with the wrong template silently.
8. As a user, I want slot-coverage validation per Document Template against the recipients routed to it, so that a variant missing a column is caught before generation.
9. As a user, I want all recipients of a Generate Job to share one output naming pattern regardless of which template they used, so that files sort into one coherent batch.
10. As a user, I want one document per recipient per Generate Job, so that a second document type means a second job with its own review.
11. As a user, I want to position each text slot on an image Document Template (X/Y, font size, color, alignment) with a live draggable preview on the template image, so that certificate text sits on the design's lines.
12. As a user, I want each slot's text to render on a single line with auto-shrink to fit, so that long names still fit the design.

### Send workspace

13. As a user, I want to start a Send Job by picking a past Generate Job, so that I can email previously generated PDFs without regenerating anything.
14. As a user, I want to filter a Generate Job's recipients at send time and send to a subset, so that I can blast one group and hold another.
15. As a user, I want recipients whose generate failed to remain sendable without an attachment, flagged in the UI, so that the message still reaches them and I can follow up about the PDF.
16. As a user, I want a has-attachment / no-attachment / all filter on the Send workspace recipient table, so that I can switch between "everyone with a PDF" and "everyone else".
17. As a user, I want to send a plain message with no attachments to recipients picked directly from the imported list, so that announcement emails need no Generate Job at all.
18. As a user, I want the pre-flight summary to show which recipients receive attachments and which do not, so that no send choice is invisible.

### Message Templates

19. As a user, I want to create, edit, and delete Message Templates (name, subject, HTML body with `{slot}` placeholders), so that I don't retype a body per campaign.
20. As a user, I want Message Templates managed in the Templates screen under a "Messages" tab alongside "Documents", so that all templates live in one place.
21. As a user, I want picking a Message Template to copy its contents into the Send Job, so that I can edit the copy freely without ever changing the template.
22. As a user, I want a "Save as template" action on the edited job message, so that a message that works becomes reusable with one click.
23. As a user, I want `{slot}` autocomplete and the live 3-recipient preview in the message editor, seeded from the Message Template, so that personalization stays as safe as it is today.

### SMTP Profiles and Sender Identity

24. As a user, I want each SMTP Profile to carry a default Sender Identity (from name, from address, optional reply-to), so that my identity lives with the connection.
25. As a user, I want the Send workspace to prefill the Sender Identity from the chosen profile, still fully editable per job, so that a campaign can speak in a different voice without changing the profile.
26. As a user, I want a soft warning when the overridden From address looks like the provider will reject it, so that I'm alerted without being blocked.
27. As a user, I want to keep entering SMTP inline without creating a profile, so that one-off test connections stay quick.
28. As a user, I want my SMTP passwords encrypted at rest, so that a leaked database file doesn't expose credentials.
29. As a user, I want SMTP Profile management to stay in Settings, so that the Send workspace stays focused on the send.

### Navigation and history

30. As a user, I want the sidebar to show Generate and Send instead of Compose, so that the app's structure matches my workflow.
31. As a user, I want retry-from-logs to prefill the matching workspace (Send for Send Jobs, Generate for Generate Jobs), so that retry keeps the same recovery semantics as today.

## Implementation Decisions

- **Workspace split**: the 6-step wizard is replaced by two routes: a Generate workspace (recipient picker, Template Assignment, generate with progress, per-recipient failure list, results with re-download and "Send these") and a Send workspace (recipient source: Generate Job or imported list; message; SMTP; send with pause/resume/cancel). Existing shared components — the filterable recipient table, the stepper-free step panels, progress and failure lists — are reused, not duplicated. The old compose route and its prefill logic are removed; retry-from-logs targets the matching workspace.
- **Template Assignment (ADR 0006)**: the import pipeline gains a "template" column role, auto-suggested for headers like `template`/`jenis`/`kategori`, always confirmable in the column-mapping UI. The value stays in the recipient's metadata bag under its original header — the import itself still does not interpret metadata; the Generate Job does, by declared role. Schema: the Generate Job records its assignment (default template id, header name, mapping of distinct value → template id); each generate-job recipient records its template-column value for audit and validation. Output naming pattern stays a single pattern per job.
- **Assignment validation**: pure logic in `src/shared/` — per-template slot coverage against the recipients routed to that template, plus fail-fast reporting of unassigned values with the affected recipient list. Generate refuses to start with an incomplete assignment; errors are per-recipient at generate time, matching today's `generated`/`failed` statuses.
- **Message Template (ADR 0005)**: new table (name, subject, body_html, timestamps). Copy-on-pick: picking seeds the Send Job's subject/body columns (existing), and the job owns its copy. "Save as template" inserts a new row from the job's message. Management UI is a second tab in the Templates screen. `{slot}` validation and interpolation reuse the existing shared send logic unchanged.
- **SMTP Profile Sender Identity**: profiles gain nullable default sender name, address, and reply-to columns. The Send workspace prefills identity from the selected profile and remains editable per job; inline (ephemeral) connection entry is unchanged. The From-mismatch warning is a pure function: for known providers (e.g. Gmail), warn when the From domain does not match the authenticated account's domain; otherwise warn only when the From address differs from the profile's default identity. Advisory only, never blocking.
- **Password encryption at rest**: profile passwords and inline `smtp_override` passwords migrate to Electron `safeStorage` on first run after upgrade; plaintext legacy values are encrypted in place; runtime sends read through a decrypting accessor. No user-visible behavior change.
- **Image slot positioning**: the Document Template gains per-slot layout config (X/Y, font size, color, alignment, max width), stored as JSON keyed by slot name. Rendering uses it with single-line auto-shrink; templates without config fall back to today's centered stacked layout, so existing templates keep working. Per-job coordinate overrides are intentionally dropped (ADR scope: layout lives on the template).
- **IPC contract**: new channels for Message Template CRUD, assignment validation, profile identity defaults, and slot-layout config, following the existing typed-channel pattern in `src/shared/ipc.ts`.
- **Migration**: SQLite migrations add the new columns and table; existing Generate Jobs, Send Jobs, templates, and profiles remain valid. Existing profiles get no default identity (nullable); the Send workspace prefills nothing for them and the user can set one in Settings.

## Testing Decisions

- **E2E seam (primary)**: the existing Playwright `_electron` harness with the SMTP capture server and isolated user-data dir. Scenarios: generate-only flow without touching message/SMTP steps; send-from-job with subset filter; plain no-attachment send from the imported list; failed-generate recipient flagged and sendable without attachment; template routing with two variants in one job, including the fail-fast list for unassigned values; Message Template pick → edit → save-as-template cycle; SMTP profile identity prefill → override per job; inline ephemeral connection; coordinate editor config persisting and rendering into the generated PDF.
- **Pure seam**: new `src/shared/` modules tested with vitest, following the existing `generate.test.ts` / `send.test.ts` / `template-validation.ts` pattern: template-assignment validation (coverage, unassigned values, header resolution), sender-identity warning heuristics, and image slot layout math (bounds, auto-shrink, alignment).
- **Service seam**: only where behavior cannot live in shared logic — the safeStorage migration and coordinate rendering in the generate service, tested at the service level like the existing `templates.test.ts` / `smtp.test.ts`.
- Tests assert external behavior only: what the user sees and what lands in the SMTP capture server and the output folder — never implementation details.

## Out of Scope

- Combining attachments from multiple Generate Jobs into one Send Job (one job per send, for now).
- Multiple documents per recipient within one Generate Job (a second document type is a second job).
- Storing value→template mappings on the Document Template itself (mapping is per-job, per ADR 0006).
- Referenced/shared Message Templates with propagation (copy-on-pick only, per ADR 0005).
- Multi-line slot text or word wrapping in image templates; per-job coordinate overrides.
- Rich-text message editor (plain textarea with HTML and `{slot}` autocomplete remains).
- Per-recipient message overrides, conditional body logic, or per-recipient senders.
- WhatsApp channel.
- In-app DOCX editing or in-app template asset editing.
- Inline SMTP persistence beyond the existing "save as profile" checkbox.

## Further Notes

- The old 6-step Compose wizard disappears; Logs keeps both job types with the same history and retry semantics.
- Glossary and ADRs referenced above are authoritative for terminology (Document Template, Message Template, Template Assignment, SMTP Profile, Sender Identity).
- The template column is the one interpreted column; every other metadata column remains passthrough per the domain glossary.

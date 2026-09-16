# Email Blast Desktop App - Electron Era Specification

Status: ready-for-agent

Supersedes: `archive/tauri-era/spec.md` (Tauri/Rust era, kept as history).
Decisions synthesized from: `.scratch/desktop-app/map.md` and decision tickets 01-07 (all resolved 2026-08-02).

## Problem Statement

A non-technical user (e.g. an office staff member at a scholarship foundation) has an Excel list of recipients and must produce personalized documents and send bulk email.

Today this requires assembling a pipeline of CLI scripts, editing a config file, and babysitting a terminal.
Each campaign mixes several error-prone steps: reading an Excel file, filling a DOCX letter per recipient, converting hundreds of documents to PDF, generating certificate PDFs from images, and sending personalized HTML emails through Gmail SMTP with an app password.
A single typo, a dropped network connection, or a closed laptop halfway through can silently skip or double-send recipients, and the user has no way to see what happened.

The user needs a desktop application that makes the whole campaign a guided, observable, resumable process on their own computer.

## Solution

A local-only Electron desktop app (Mac + Windows, single user, no server) that guides the user through a campaign in one place:

- Import an Excel file, preview the parsed recipients, confirm the column mapping, and commit them to a local database.
- Browse, search, and manage recipients; register DOCX letter templates and image certificate templates with their placeholder slots.
- Run a 6-step compose wizard that selects recipients, picks a template, writes the message, configures SMTP, generates the PDFs, and sends the emails.
- Generate one PDF per recipient (DOCX fill + LibreOffice conversion, or image + text overlay), review spot checks, and send through Gmail SMTP with a per-job sender identity.
- Watch live per-recipient progress, pause, resume, cancel, and retry failures.
- Keep a permanent history of every generate and send job in Logs, with per-recipient outcomes.
- Survive anything: per-recipient failures continue the batch, transient SMTP errors retry with backoff, the app pauses instead of failing, and quitting mid-send never loses more than one in-flight recipient because a persisted cursor resumes the job after restart.

All business logic lives in the Electron main process as an Effect v4 Layer program.
The renderer (React) is a thin client over a typed, versioned IPC contract.
A channel seam keeps WhatsApp sending reachable for v2.

## User Stories

1. As a user, I want to drag-and-drop an Excel file onto the Import screen, so that I can load my recipient list without typing it manually.
2. As a user, I want to see a preview table of the parsed rows before importing, so that I can verify the file was read correctly.
3. As a user, I want Excel columns auto-mapped to name, email, phone, and template slots with the ability to override the mapping, so that files with varied layouts import correctly.
4. As a user, I want a clear warning when the file has no recognizable name or email column, so that I can fix the mapping instead of importing garbage.
5. As a user, I want duplicate email addresses skipped during import with the count reported, so that I never send two messages to the same address by accident.
6. As a user, I want to know exactly how many recipients were imported and how many duplicates were skipped, so that I can trust the import result.
7. As a user, I want each import kept as a batch that I can filter by later, so that I can target a campaign to one import.
8. As a user, I want to browse all imported recipients in a table with search, so that I can find anyone quickly.
9. As a user, I want to filter recipients by import batch, so that I can work with one campaign's data at a time.
10. As a user, I want to see a recipient's full details including custom fields, so that I can verify their data before sending.
11. As a user, I want to delete selected recipients with a confirmation, so that I can remove bad entries without destroying the rest.
12. As a user, I want to register a DOCX letter template with its slot names and output pattern, so that I can generate personalized letters.
13. As a user, I want the app to auto-detect `{placeholder}` slots from a DOCX file, so that I don't have to type them by hand.
14. As a user, I want to register an image certificate template with manually entered slot names and text coordinates, so that certificates render with text in the right place.
15. As a user, I want the app to check that the selected recipients' metadata covers every declared slot before generating, so that I fail fast instead of producing broken PDFs.
16. As a user, I want to edit a template's slots and output pattern after creation, so that I can fix mistakes without re-adding the file.
17. As a user, I want to delete a template, so that stale templates don't clutter the list.
18. As a user, I want a guided 6-step compose wizard, so that I don't forget any part of a campaign setup.
19. As a user, I want to select recipients by search, filter, and select-all with a running count, so that I control exactly who is included.
20. As a user, I want to pick the template and see its required slots, so that I know the data must cover them.
21. As a user, I want to write a subject and HTML body with `{slot}` interpolation and autocomplete, so that every recipient gets a personalized message.
22. As a user, I want a live preview of the rendered subject and body for sample recipients, so that I can check the personalization before sending.
23. As a user, I want to choose a saved SMTP profile or enter one inline for this job only, so that different campaigns can use different sender identities.
24. As a user, I want to test the SMTP connection from the wizard, so that I catch credential problems before sending hundreds of emails.
25. As a user, I want to override the rate limit for this job, so that I can slow down a campaign when needed.
26. As a user, I want to generate one PDF per recipient with live progress, so that I can watch the batch complete.
27. As a user, I want per-recipient generation failures reported with reasons while the rest continue, so that one bad row doesn't stop the batch.
28. As a user, I want to spot-check a few rendered PDFs before sending, so that I can catch template issues early.
29. As a user, I want recipients whose generation failed excluded from the send automatically, so that no one gets an empty or broken attachment.
30. As a user, I want a pre-flight check (SMTP connect and auth) before the first send, so that the batch fails fast instead of halfway through.
31. As a user, I want live send progress with per-recipient outcomes and a running failure counter, so that I can monitor the campaign.
32. As a user, I want to pause and resume a running send, so that I can back off if something looks wrong.
33. As a user, I want to cancel a send with a confirmation showing progress, so that I can abort a bad campaign without double-sending anyone.
34. As a user, I want failed sends retried automatically with exponential backoff, so that transient network errors don't need manual attention.
35. As a user, I want the job to pause automatically when retries are exhausted, so that I can investigate and resume cleanly.
36. As a user, I want to retry only the failed recipients of a job, so that I don't re-send to people who already got the email.
37. As a user, I want to quit mid-send without losing progress, with a clear dialog offering Quit & Pause or Keep Sending, so that closing the app is never destructive.
38. As a user, I want an unfinished send resumed exactly where it stopped after a crash or power loss, so that no one is skipped or double-sent.
39. As a user, I want a one-time banner on launch when exactly one paused job exists, so that I remember to resume it.
40. As a user, I want the Logs screen to show "Paused - N of M sent" with a Resume button, so that I can resume from anywhere in the app.
41. As a user, I want only one send job active at a time, so that rate limiting and SMTP credentials never conflict.
42. As a user, I want a history of all generate and send jobs with status and counts, so that I can see what happened in past campaigns.
43. As a user, I want to filter logs by status and date, so that I can find a specific campaign.
44. As a user, I want per-recipient detail per job with error messages, so that I can diagnose failures.
45. As a user, I want failed recipients re-sendable in one click with the compose wizard pre-filled, so that retry is effortless.
46. As a user, I want SMTP profiles saved and reusable with a test button, so that I configure my mail provider once.
47. As a user, I want a rate-limit slider (500ms-5000ms) that applies live, so that I can tune sending speed without restarting.
48. As a user, I want the app to check for LibreOffice on first launch and guide me to install it, so that DOCX templates work.
49. As a user, I want default templates and output directories created on first launch, so that the app is immediately usable.
50. As a user, I want the same flows on both Mac and Windows, so that I can switch machines without relearning the app.

## Implementation Decisions

### 1. Stack and scaffold (ticket 01)

- Electron 43 (template pins EOL 39; bump at scaffold). Build toolchain: Vite 8 drives all three builds (main/preload/renderer, plain configs) and electron-builder packages them (ADR-0010, superseding ADR-0001/tickets 19-20). `node scripts/dev.mjs` is the dev loop; targets are dmg + zip (macOS) and NSIS (Windows, x64, one-click per-user); Linux targets are dropped.
- React + TypeScript, TanStack Router / Query / Table, Tailwind CSS v4, shadcn/ui, pnpm.
- oxlint + oxfmt as standalone packages; vitest for tests.
- Security baseline: `sandbox: true` (remove the template's `sandbox: false`), contextIsolation on, nodeIntegration off, preload as the only bridge, no remote content.
- Code signing deferred (local single-user app); local macOS builds ad-hoc sign via `mac.identity: "-"` (electron-builder does not sign by default). Buying Apple Developer Program + notarization is the gate for shipping a mac build that can ever self-update (ADR-0003/ADR-0010).
- Scaffold recipe and pnpm gotchas (`pnpm approve-builds` for the electron binary) are recorded in ticket 01.

### 2. Libraries (ticket 03)

- Excel read: `@e965/xlsx` 0.20.3 (CVE-patched SheetJS fork; npm `xlsx` 0.18.5 is frozen with unpatchable CVEs and must not be shipped).
- SQLite: `node:sqlite` (Electron 43 ships Node 24.18, Release Candidate and unflagged; sync API mirrors better-sqlite3; zero native-module surface).
  better-sqlite3 13.0.2 is the documented fallback if `node:sqlite` hits an API gap.
- DOCX fill: docxtemplater 3.69.3 + PizZip 3.2.0 (single-brace `{}` default matches the locked `{placeholder}` syntax; PizZip MIT license option satisfies the no-GPL constraint).
- DOCX to PDF: LibreOffice headless via libreoffice-convert 1.8.2 (external ~200MB prerequisite, checked on first launch).
- Image to PDF: pdf-lib 1.17.1 + @pdf-lib/fontkit 1.1.1 (proven in the existing CLI).
- SMTP: nodemailer 9.0.3 (Gmail App Password auth, local-path attachments; no pool limiter - the job runner owns pacing).
- HTML body: a small plain `{slot}` replace helper (regex over declared slots, escapeHTML on values, throw on unknown or missing slot).
  No template library; eta (MIT) only if per-recipient conditionals ever arrive.
- officecli (ticket 02): rejected for both fill and convert - fill adds a 17.4MB native binary and ~0.2-0.8s process spawn per recipient for no functional win; convert does not exist (no PDF exporter plugin in v1.0.143, registry down). Watch item only.

### 3. Main-process architecture - Effect v4 (ticket 04)

- User decision: pin the Effect v4 beta (latest `4.0.0-beta.x`, currently beta.102; exact version pinned in the lockfile at implementation).
  v3 (3.22.1 stable) is the documented fallback if the beta blocks progress; the v3 to v4 migration guide and codemods exist, so the decision is reversible without a rewrite.
- Services are `Context.Service<"X">` class-style keys with a static `layer`, composed in one main-process `Layer`:
  `SmtpSender` (wraps nodemailer, transporter built in `make` and released on layer close), `SqliteRepo`, `TemplatePipeline` (generate-then-send gate), `JobRunner` (orchestrator), `ProgressHub`.
- Retry: `Schedule.exponential("1 second", 2).pipe(Schedule.times(3))` = 3 retries at 1s/2s/4s (4 attempts total), then a persisted `paused` state instead of a thrown error.
- Progress: every sender writes `ProgressEvent { jobId, cursor, recipient, result }` to a Hub; the main process subscribes with a bounded queue (256, drop-oldest) and forwards each event via `webContents.send`.
  The send loop never blocks on the renderer; progress is lossy-tolerant because SQLite is the source of truth and the renderer can fetch a snapshot.
- Typed errors: `GenerateError` and `SendError` stay distinct tagged errors; across IPC they serialize as a curated envelope `{ ok, data?, error?: { _tag, message, jobId?, recipient? } }` encoded with Schema, decoded at the main boundary, switched on `_tag` in the UI.
  The full Effect Cause stays in main-process logs.
- Lifecycle: one `Runtime` in the main process; quit runs through a shutdown Latch; the job fiber checks it between recipients; the cursor persist is an uninterruptible critical section right after each send (send → persist → emit), so a quit at any moment loses at most the in-flight recipient.
- Effect stays main-process-only; the React renderer is dependency-free.

### 4. IPC surface and typed channels (ticket 06)

- Shape: contextBridge-exposed typed API object `window.api.<domain>.<method>`; the renderer never sees channel strings or `ipcRenderer`.
- Security: contextIsolation on, sandbox on, preload exposes exactly the listed methods with no wildcard; main validates `event.senderFrame` is a top-level frame of our own webContents.
- Typing: Effect Schema is the single source of truth for ALL payloads in `src/shared/ipc.ts`; types are derived, never hand-written; main decodes every renderer-to-main payload at the boundary (malformed calls become typed ParseErrors); main-to-renderer is typed without symmetric decode.
- Versioning: additive-only - channels and fields are added, never removed or renamed; fields demote to `optional` rather than delete; breaking changes only via a deliberate `API_VERSION` bump plus a migration pass.
  `API_VERSION` is a constant in `src/shared/ipc.ts`, dev-asserted equal between preload and main.
- The WhatsApp v2 seam adds channels later, never modifies existing ones.

Full API surface (methods; all `ipcRenderer.invoke` on one namespaced channel each, all payloads Effect Schemas):

| Domain | Method | Returns |
|---|---|---|
| import | `read(excelPath)` | `ImportPreview { recipients, skippedDuplicates, warnings }` |
| | `commit(recipients, columnMapping)` | `{ imported, duplicatesSkipped }` |
| recipients | `list({ search?, importBatch?, page, pageSize })` | `PaginatedRecipients` |
| | `get(id)` | `Recipient` |
| | `delete(ids)` | `count` |
| templates | `list()` / `get(id)` | `Template[]` / `Template` |
| | `create({ name, filePath, slots, outputPattern })` / `update(...)` | `Template` |
| | `delete(id)` | `void` |
| | `scanSlots(filePath)` | `string[]` |
| jobs | `startGenerate({ templateId, recipientIds })` | `GenerateJob` |
| | `runGenerate(jobId)` | `void` |
| | `getGenerateStatus(jobId)` / `cancelGenerate(jobId)` | `GenerateJob` / `void` |
| | `startSend({ generateJobId?, recipientIds, smtpProfileId?, smtpOverride?, subject, bodyHtml, senderName, senderAddress, attachments, delayMs })` | `SendJob` |
| | `runSend(jobId)` / `pause(jobId)` / `resume(jobId)` / `cancel(jobId)` | `void` |
| | `getSendStatus(jobId)` | `SendJob` |
| logs | `list({ statusFilter?, dateFrom?, dateTo? })` | `SendJobSummary[]` |
| | `detail(jobId)` | `SendJob` |
| | `retryFailed(jobId, recipientIds)` | `SendJob` |
| smtp | `list()` / `create(...)` / `update(...)` / `delete(id)` | per-shape |
| | `test({ host, port, username, password })` | `void` (throws typed error) |
| settings | `get(key)` / `set(key, value)` | `string?` / `void` |
| system | `checkLibreOffice()` | `string?` (path or null) |

Events (main to renderer via `webContents.send`; each `onX(cb)` returns an unsubscribe function; events are deltas, not the source of truth):

- `onGenerateProgress(cb)` - `{ jobId, current, total, status, recipientId, error? }`
- `onSendProgress(cb)` - `{ jobId, current, total, status, recipientId, messageId?, error? }`
- `onJobPaused(cb)` - `{ jobId, reason, lastIndex }`
- `onJobCompleted(cb)` - `{ jobId, kind: "generate" | "send", counts }`

### 5. Process model, quit, and resume (ticket 07)

- Send and generate jobs run in the Electron main process as a clean Effect Layer with no direct renderer/main coupling.
  A utility process is rejected for v1; the Layer seam is the future home of WhatsApp's Baileys sidecar.
- Rate limiting: the job runner owns an explicit pacing gate - `Effect.sleep(interval)` between sends, interval read live from the settings Layer each iteration (default 1000ms; the Settings slider 500-5000ms applies to a running job without restart).
  The gate fires before each send (delay → send → persist cursor), so pausing mid-delay never leaves a half-sent email.
  Nodemailer's built-in pool limiter is not used; plain transport, no pooling.
- Pause and cancel checkpoints exist only between sends; an in-flight SMTP call always completes and its cursor persists.
  Pause interrupts the sleep gate, sets a persisted `paused` state, and supports unlimited pause/resume cycles; auto-pause on retry exhaustion uses the same state.
  Cancel uses the same checkpoint, shows a confirmation with progress ("123 of 500 sent - cancel anyway?"), marks remaining recipients `pending` → `skipped` in one transaction, sets the job to `cancelled` (terminal, no resume).
  A re-send after cancel is a fresh job from the same compose data; generation results are reusable.
- Quit mid-send: window close or app quit while a job is running or paused shows a uniform dialog on both platforms (including macOS window-close-not-quit): "Send in progress - 250 of 500 sent. The job will pause and you can resume it later from Logs." with [Quit & Pause] / [Keep Sending].
  Quitting only pauses, never cancels; background continue is deferred to v2.
- Resume: on launch, any job in `paused` or `running` state is incomplete; `running` (hard crash, power loss, kill) is treated as `paused` - the persisted cursor is authoritative, nothing double-sends.
  The Logs screen shows "Paused - N of M sent" with a prominent Resume button; a one-time launch banner appears if exactly one paused job exists.
  Resume re-runs the SMTP pre-flight, then continues from the first `pending` recipient at the configured rate.
- One active job at a time in v1: starting a new send while one is running or paused-unresumed is blocked with a message.

### 6. Pipelines (tickets 02, 03, 05)

- DOCX fill: docxtemplater in-process (verified ~0.007s/doc; handles split runs, headers, footers, table cells).
- DOCX to PDF: one LibreOffice headless batch invocation per Generate job (not one per recipient), verified ~0.21s/doc, ~3.7 min per 1000 recipients - 6x faster than the 1/sec send rate, so generation is not a bottleneck.
- Fidelity: verified production-safe on the real letterhead template (all 8 embedded images byte-identical between baseline and filled PDF, 1-page layout stable, `{no}`/`{name}` land correctly).
- Image to PDF: pdf-lib + fontkit, preload image and fonts once per job, per-recipient embed/draw/save (proven in the existing CLI).
- Generate-then-send: the send step only includes recipients whose attachments are confirmed generated; `failed` recipients are excluded automatically.

### 7. Data model and SQLite schema (archived decision 04, transfers as-is)

Glossary terms from `CONTEXT.md` apply: Recipient (name + channel addresses + metadata bag as a dumb pipe), Template (file path + type + user-declared slots + output pattern), Generate Job and Send Job as independent entities, per-job channel config, send status `pending` → `sent | failed | skipped`.

Schema (transferred from the Tauri era; the per-job channel config is persisted per the per-job SMTP decision):

```sql
CREATE TABLE recipients (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT,
    phone       TEXT,
    metadata    TEXT NOT NULL DEFAULT '{}',
    import_batch TEXT NOT NULL,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_recipients_email ON recipients(email);
CREATE INDEX idx_recipients_import_batch ON recipients(import_batch);

CREATE TABLE templates (
    id              TEXT PRIMARY KEY,
    name            TEXT NOT NULL,
    file_path       TEXT NOT NULL,
    type            TEXT NOT NULL CHECK(type IN ('docx', 'image')),
    slots           TEXT NOT NULL DEFAULT '[]',
    output_pattern  TEXT NOT NULL,
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE generate_jobs (
    id              TEXT PRIMARY KEY,
    template_id     TEXT NOT NULL REFERENCES templates(id),
    status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK(status IN ('pending','generating','generated','cancelled')),
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    completed_at    TEXT
);

CREATE TABLE generate_job_recipients (
    job_id          TEXT NOT NULL REFERENCES generate_jobs(id),
    recipient_id    TEXT NOT NULL REFERENCES recipients(id),
    status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK(status IN ('pending','generated','failed')),
    output_path     TEXT,
    error_message   TEXT,
    PRIMARY KEY (job_id, recipient_id)
);

CREATE TABLE send_jobs (
    id              TEXT PRIMARY KEY,
    generate_job_id TEXT REFERENCES generate_jobs(id),
    channel         TEXT NOT NULL DEFAULT 'email'
                    CHECK(channel IN ('email', 'whatsapp')),
    status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK(status IN ('pending','sending','paused','completed','cancelled')),
    smtp_profile_id TEXT REFERENCES smtp_profiles(id),
    smtp_override   TEXT,             -- JSON snapshot of the per-job SMTP config when entered inline
    subject         TEXT NOT NULL,
    body_html       TEXT NOT NULL,
    sender_name     TEXT NOT NULL,
    sender_address  TEXT NOT NULL,
    delay_ms        INTEGER NOT NULL DEFAULT 1000,
    cursor_index    INTEGER NOT NULL DEFAULT 0,
    total_count     INTEGER NOT NULL DEFAULT 0,
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    completed_at    TEXT
);

CREATE TABLE send_job_recipients (
    job_id          TEXT NOT NULL REFERENCES send_jobs(id),
    recipient_id    TEXT NOT NULL REFERENCES recipients(id),
    status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK(status IN ('pending','sent','failed','skipped')),
    message_id      TEXT,
    error_message   TEXT,
    sent_at         TEXT,
    PRIMARY KEY (job_id, recipient_id)
);

CREATE TABLE smtp_profiles (
    id              TEXT PRIMARY KEY,
    name            TEXT NOT NULL,
    host            TEXT NOT NULL,
    port            INTEGER NOT NULL DEFAULT 587,
    username        TEXT NOT NULL,
    password        TEXT NOT NULL,
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE settings (
    key             TEXT PRIMARY KEY,
    value           TEXT NOT NULL
);
```

Default settings on first launch: `rate_limit_delay_ms = 1000`, `templates_dir = ~/Documents/EmailBlast/templates`, `output_dir = ~/Documents/EmailBlast/output`, `libreoffice_checked = false`.
`cursor_index` update and `send_job_recipients` status update happen in the same SQLite transaction; a crash between send and persist can re-send at most one recipient on resume (re-sending one email beats skipping one).

### 8. Screens and navigation (archived decision 05, transfers with IPC changes)

Route tree: `/` redirects to `/recipients`; `/import`, `/recipients`, `/templates`, `/compose`, `/logs`, `/logs/$jobId`, `/settings`.
Navigation shell: always-visible sidebar (Import, Recipients, Templates, Compose, Logs, Settings) with the active route highlighted and an `<Outlet />` content area.

- **Import**: drag-and-drop or browse for `.xlsx`/`.xls` (Electron dialog); preview table of the first 50 rows (TanStack Table) with dynamic metadata columns; two-column column mapping (Excel column → name / email / phone / custom metadata / skip) with auto-mapped suggestions; commit with a success toast ("Imported 142 recipients. 3 duplicates skipped.") and actions Go to Compose / Go to Recipients.
- **Recipients**: table with name, email, phone, import batch, imported date; full-text search across name/email/custom fields; filter by import batch; row click opens a detail side panel with all metadata; bulk delete with confirmation.
- **Templates**: grid of template cards (name, type badge DOCX/Image, slot count, created date); Add Template via file picker; auto `scanSlots` for DOCX, manual slot entry for images; user confirms slots and sets the output pattern; card detail shows slots, pattern preview, edit/delete; hint that editing happens externally (Word, Figma, Photoshop).
- **Compose wizard** (6 steps, state held in React until Generate/Send):
  1. Recipients - filter by import batch + search, multi-select with count, Next enabled only when selection > 0.
  2. Template - dropdown + preview card with required slots; check that selected recipients' metadata covers the slots.
  3. Message - subject input and HTML body textarea with `{slot}` autocomplete; live preview rendered for 2-3 sample recipients.
  4. SMTP - saved profile dropdown or inline form (host, port, username, app password) with "Save as profile" and "Test Connection"; rate limit override (default from Settings, 500-5000ms).
  5. Generate & Review - summary, Generate PDFs with live progress, spot-check preview of 2-3 rendered PDFs, per-recipient failure list with reasons; Next enabled even with partial failures (failed recipients excluded from send).
  6. Send - final summary; Send All after pre-flight (SMTP connect + auth, at least one recipient has a generated attachment, fail fast otherwise); inline live progress view replacing the summary.
- **Send progress**: progress bar "87/142 sent"; scrolling timestamped log ("✓ alice@co.com sent" / "✗ bob@co.com failed: mailbox full"); failure counter; Pause/Resume toggle and Cancel (with confirmation) active while running or paused; completion banner "138 sent, 4 failed" with a Retry Failures action.
- **Logs**: table of jobs, most recent first (status badge, subject, template, sent/failed/skipped counts, timestamps, duration); filters for date range, status, template; paused jobs show "Paused - N of M sent" with a Resume button; row click → `/logs/$jobId`.
- **Job detail** (`/logs/$jobId`): summary header (subject, template, SMTP profile, timestamps); per-recipient table (name, email, status badge, error message, timestamp) with search/filter; per-recipient Retry and Retry All Failures which opens the wizard pre-filled (failed recipients, same template, same message, same SMTP).
- **Settings**: SMTP profiles (list with masked passwords, add/edit/delete, per-profile Test Connection); rate-limit slider 500-5000ms step 100ms with a live label ("1 email per second"); default templates/output directories with folder pickers; About section.

### 9. Error handling and resilience (archived decision 06, concepts re-typed in Effect)

- Failure modes: single-recipient generate failure marks `failed` with reason and continues; single-recipient send failure marks `failed` with the SMTP error and continues; SMTP disconnect mid-batch retries 3x at 1s/2s/4s then pauses the job; LibreOffice missing blocks compose and shows a download link; template file deleted after job creation fails generation with `TemplateNotFound`; Excel file missing name/email columns warns and requires manual mapping; duplicate emails are skipped with a count.
- Error taxonomy: `GenerateError` (TemplateNotFound, SlotMissing, DocxFillFailed, LibreOfficeFailed, ImagePdfFailed) and `SendError` (SmtpConnectFailed, SmtpAuthFailed, SmtpSendFailed, AttachmentNotFound), serialized across IPC as the tagged envelope.
- Transaction safety: cursor and per-recipient status persist in one transaction; at most one in-flight recipient can be lost or re-sent on crash.

### 10. First-launch experience (transferred)

1. App opens to a welcome/setup screen (not the normal sidebar layout).
2. Checks: LibreOffice installed (if not, download link + Check Again; macOS `brew install --cask libreoffice`, Windows download from libreoffice.org); default directories exist (create if not); at least one SMTP profile (prompt to create, skippable).
3. "Get Started" transitions to the normal layout.
4. Subsequent launches skip the LibreOffice check when `libreoffice_checked = true`, and show the unfinished-send banner when a paused/incomplete send job exists.

## Testing Decisions

- A good test exercises external behavior only - the job's persisted state, per-recipient outcomes, and the rendered UI - never Effect internals, fibers, or private helpers.
- Two seams, confirmed with the user on 2026-08-02:

**Seam A (primary): the main-process Layer program, headless.** The `JobRunner` and services are tested with vitest against a real Effect Layer instance: temp-file or in-memory SQLite (`node:sqlite`), a local SMTP capture server, real docxtemplater fill, and real or stubbed LibreOffice.
`TestClock` makes the retry schedule (1s/2s/4s) and the pacing gate deterministic.
Covered at this seam: import parse and duplicate handling; generate flow including per-recipient failure continuation and the generate-then-send gate; send flow including pre-flight, per-recipient outcomes, retry-then-pause, pause/resume, cancel semantics; cursor persistence and restart-resume (rebuild the Layer on the same database file and assert continuation from the cursor); the quit Latch losing at most the in-flight recipient; one-active-job enforcement.
No Electron window is involved - this is the seam ticket 07 designed by keeping the Layer free of renderer/main coupling.

**Seam B (top): one E2E through the real app.** Playwright's Electron launcher drives the packaged-style app against the same local SMTP capture server.
Covered at this seam: import → generate → send → logs happy path end to end; quit mid-send → relaunch → resume from Logs; the quit dialog's two branches; the first-launch flow without LibreOffice installed; the one-active-job block.
This proves the IPC surface, the preload bridge, and the wizard wiring that Seam A cannot see.

- Prior art: the existing Bun CLI in `src/` has no automated tests (it is a reference, not a test suite); the fidelity prototype (`prototype-05/`) is the manual-verification prior art for the pipeline; vitest, TestClock, and Playwright's Electron support are newly introduced per ticket 01.
- The renderer intentionally has no separate component-test seam - it is thin, and its main flows are covered by Seam B.

## Out of Scope

- Built-in template editor (templates are edited externally in Word, Figma, Photoshop).
- WhatsApp sending (the channel seam is set up; actual sending architecture belongs to a future map).
- Multi-user / team features.
- Server/cloud backend - the app runs entirely locally.
- Email tracking (opens, clicks).
- Rich text editor for the email body (plain HTML textarea in v1).
- Visual coordinate picker for image templates (manual coordinate entry in v1).
- Dark mode toggle and internationalization (UI in English).
- Automated app updates.
- Background continue on quit (tray/dock affordances are v2).
- officecli adoption (fill and convert both rejected; watch item only).
- Code signing and notarization (deferred until distribution starts).

## Further Notes

- Watch item: re-test `officecli view <file> pdf` only if an official PDF exporter plugin ships with a working `plugins install` (registry was down at research time).
- Spot-check the `pf-*` / `sf-*` templates visually when wired into the app - same engine, but each template's table/header layout deserves one pass (verified template: `templates/ff.docx`).
- Licensing: `@e965/xlsx` Apache-2.0, PizZip dual-licensed (MIT option used), LibreOffice MPL-2.0 (external binary), everything else MIT-family; no GPL dependencies.
- Packaging gotchas recorded in ticket 01: `pnpm approve-builds` for the electron binary, Electron 39 → 43 bump, `sandbox: true`, ad-hoc identity for unsigned local macOS builds. Current-chain gotchas (ticket 26, ADR-0010): the electron-builder config must be passed with `--config electron-builder.mjs` (only .yml/.json/.json5/.js/.ts are auto-detected), `mac.identity: "-"` is required for a local build to launch, `dependencies` must stay at one entry (`better-sqlite3`) or Vite-bundled libraries ship twice, and the Windows NSIS installer builds from macOS with no wine/Rosetta.
- Gmail sends use App Passwords (regular account passwords are rejected by Gmail SMTP).
- Generation performance (~0.22s/recipient) is not a bottleneck: the send rate gate (min 500ms) is 2x slower than the fastest generate throughput even before LibreOffice batch overhead.
- The old Tauri-era spec at `archive/tauri-era/spec.md` remains the history record; this spec supersedes it.

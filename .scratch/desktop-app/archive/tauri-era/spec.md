# Email Blast Desktop App — Buildable Specification

> Collapsed from the wayfinder map and 6 resolved decision tickets.
> Do NOT re-litigate decisions in this document.
> See `.scratch/desktop-app/map.md` for the full decision trail.

## 1. Architecture Overview

A Tauri v2 desktop app (macOS + Windows) that lets a non-dev user:
1. Import recipients from Excel files
2. Manage DOCX and image templates with `{placeholder}` slots
3. Generate personalized PDFs by filling templates with recipient data
4. Bulk-send emails with PDF attachments via SMTP (Gmail)
5. View send logs with per-recipient status and retry capability

**Architecture principle:** All business logic lives in Rust.
React is a pure UI layer — it calls Tauri commands via IPC and renders the results.
No business logic in TypeScript.

**Local-only:** No server, no multi-user, no cloud.
SQLite via `rusqlite` (bundled) for all persistence.

**Channel seam:** The data model and job structure leave a clean extension point for WhatsApp sending in a future version.
v1 is email-only.

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Desktop shell | Tauri | v2 |
| Frontend framework | React | 19+ |
| Language | TypeScript | 5.x |
| Router | TanStack Router | latest (file-based) |
| Server state | TanStack Query | latest |
| Table | TanStack Table | latest |
| Styling | Tailwind CSS | v4 (CSS-first config) |
| Component library | shadcn/ui | latest (New York style) |
| Bundler | Vite | 6.x |
| Package manager | pnpm | 9.x |
| Linter | oxlint | v1.x |
| Formatter | oxfmt | v0.x (alpha) |
| Excel reader | calamine | 0.35 (Rust) |
| SMTP | lettre | 0.11 (Rust) |
| Database | rusqlite | 0.38 (Rust, bundled SQLite) |
| PDF from image | printpdf | 0.9 (Rust) |
| DOCX→PDF | LibreOffice headless | system prerequisite |
| DOCX fill | custom zip XML string replace | ~25 lines Rust |

## 3. Project Structure

```
email-blast-desktop/
  package.json              # pnpm scripts: dev, build, tauri, lint, fmt
  pnpm-workspace.yaml
  pnpm-lock.yaml
  vite.config.ts            # Vite + React + TanStack Router + Tailwind v4 plugins
  tsconfig.json
  index.html
  .oxlintrc.json
  src/
    main.tsx                # RouterProvider + QueryClientProvider
    index.css               # Tailwind v4 + shadcn/ui CSS variables
    lib/
      utils.ts              # cn() helper
      db.ts                 # TanStack Query hooks wrapping Tauri invoke()
    routes/
      __root.tsx            # Sidebar layout + <Outlet />
      index.tsx             # redirect to /recipients
      import.tsx            # Import screen
      recipients.tsx        # Recipients browser
      templates.tsx         # Templates manager
      compose.tsx           # Compose wizard (steps 1-6)
      logs.tsx              # Send log history
      logs.$jobId.tsx       # Job detail with per-recipient breakdown
      settings.tsx          # App settings
    components/
      ui/                   # shadcn/ui components (button, input, table, dialog, etc.)
      ImportDropzone.tsx
      RecipientTable.tsx
      TemplateCard.tsx
      ComposeWizard.tsx
      ComposeStepRecipients.tsx
      ComposeStepTemplate.tsx
      ComposeStepMessage.tsx
      ComposeStepSmtp.tsx
      ComposeStepGenerate.tsx
      ComposeStepSend.tsx
      SendProgress.tsx
      SmtpProfileForm.tsx
  src-tauri/
    Cargo.toml
    tauri.conf.json
    capabilities/
      default.json
    src/
      main.rs               # Tauri entry point
      lib.rs                 # Tauri command registrations + app setup
      db/
        mod.rs
        schema.rs            # CREATE TABLE statements + migrations
        recipients.rs        # Recipient CRUD
        templates.rs         # Template CRUD
        jobs.rs              # GenerateJob + SendJob CRUD + cursor ops
        smtp_profiles.rs     # SMTP profile CRUD
        settings.rs          # App settings key-value store
      pipeline/
        mod.rs
        excel.rs             # calamine-based Excel reader
        docx_fill.rs         # ZIP XML string replace on {placeholder}
        docx_to_pdf.rs       # LibreOffice headless subprocess
        image_to_pdf.rs      # printpdf-based certificate generator
      email/
        mod.rs
        sender.rs            # lettre SMTP sending with rate limiting + retry
        cursor.rs            # SendCursor persistence + resume logic
      models/
        mod.rs
        recipient.rs         # Recipient struct
        template.rs          # Template struct
        job.rs               # GenerateJob, SendJob, JobStatus enums
        smtp_profile.rs      # SmtpProfile struct
      error.rs               # GenerateError, SendError enums
      commands/
        mod.rs
        import.rs            # import_recipients command
        recipients.rs        # list/search/delete recipients
        templates.rs         # CRUD templates
        compose.rs           # generate_pdfs, send_emails, pause, cancel, resume
        logs.rs              # list_jobs, get_job_detail, retry_recipient
        settings.rs          # get/set settings, CRUD SMTP profiles
```

## 4. Data Model

### 4.1 SQLite Schema

```sql
-- Recipients imported from Excel
CREATE TABLE recipients (
    id          TEXT PRIMARY KEY,          -- UUID v4
    name        TEXT NOT NULL,
    email       TEXT,                      -- NULL ok (WhatsApp-only recipients in v2)
    phone       TEXT,                      -- NULL ok (email-only recipients in v1)
    metadata    TEXT NOT NULL DEFAULT '{}', -- JSON object of custom fields
    import_batch TEXT NOT NULL,            -- UUID grouping recipients from same import
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_recipients_email ON recipients(email);
CREATE INDEX idx_recipients_import_batch ON recipients(import_batch);

-- Templates for document generation
CREATE TABLE templates (
    id              TEXT PRIMARY KEY,       -- UUID v4
    name            TEXT NOT NULL,          -- user-visible name
    file_path       TEXT NOT NULL,          -- absolute path to .docx or image file
    type            TEXT NOT NULL CHECK(type IN ('docx', 'image')),
    slots           TEXT NOT NULL DEFAULT '[]', -- JSON array of slot names e.g. ["name","instansi","tanggal"]
    output_pattern  TEXT NOT NULL,          -- e.g. "LOA_{name}.pdf"
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Generate jobs: produce PDFs from templates + recipients
CREATE TABLE generate_jobs (
    id              TEXT PRIMARY KEY,       -- UUID v4
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
    output_path     TEXT,                   -- absolute path to generated PDF (NULL if failed)
    error_message   TEXT,                   -- failure reason (NULL if success)
    PRIMARY KEY (job_id, recipient_id)
);

-- Send jobs: deliver emails to recipients
CREATE TABLE send_jobs (
    id              TEXT PRIMARY KEY,       -- UUID v4
    generate_job_id TEXT REFERENCES generate_jobs(id), -- NULL if sending without generate
    channel         TEXT NOT NULL DEFAULT 'email'
                    CHECK(channel IN ('email', 'whatsapp')),
    status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK(status IN ('pending','sending','paused','completed','cancelled')),
    smtp_profile_id TEXT REFERENCES smtp_profiles(id),
    subject         TEXT NOT NULL,
    body_html       TEXT NOT NULL,
    sender_name     TEXT NOT NULL,
    sender_address  TEXT NOT NULL,
    cursor_index    INTEGER NOT NULL DEFAULT 0,    -- last successfully-sent recipient index
    total_count     INTEGER NOT NULL DEFAULT 0,    -- total recipients in this job
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    completed_at    TEXT
);

CREATE TABLE send_job_recipients (
    job_id          TEXT NOT NULL REFERENCES send_jobs(id),
    recipient_id    TEXT NOT NULL REFERENCES recipients(id),
    status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK(status IN ('pending','sent','failed','skipped')),
    message_id      TEXT,                   -- SMTP message ID (NULL if failed)
    error_message   TEXT,                   -- failure reason (NULL if success)
    sent_at         TEXT,
    PRIMARY KEY (job_id, recipient_id)
);

-- SMTP profiles saved in Settings
CREATE TABLE smtp_profiles (
    id              TEXT PRIMARY KEY,       -- UUID v4
    name            TEXT NOT NULL,          -- user-visible label e.g. "Gmail IYM"
    host            TEXT NOT NULL,
    port            INTEGER NOT NULL DEFAULT 587,
    username        TEXT NOT NULL,
    password        TEXT NOT NULL,          -- app password (encrypted at rest in v2; plaintext in v1)
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Key-value settings store
CREATE TABLE settings (
    key             TEXT PRIMARY KEY,
    value           TEXT NOT NULL
);

-- Default settings inserted on first launch:
-- key: 'rate_limit_delay_ms'    value: '1000'
-- key: 'templates_dir'          value: '~/Documents/EmailBlast/templates'
-- key: 'output_dir'             value: '~/Documents/EmailBlast/output'
-- key: 'libreoffice_checked'    value: 'false'
```

### 4.2 Rust Model Types

```rust
// models/recipient.rs
struct Recipient {
    id: String,           // UUID
    name: String,
    email: Option<String>,
    phone: Option<String>,
    metadata: HashMap<String, String>,  // custom fields from Excel
    import_batch: String, // UUID
    created_at: DateTime,
}

// models/template.rs
enum TemplateType { Docx, Image }

struct Template {
    id: String,
    name: String,
    file_path: String,
    template_type: TemplateType,
    slots: Vec<String>,        // ["name", "instansi", "tanggal"]
    output_pattern: String,    // "LOA_{name}.pdf"
    created_at: DateTime,
}

// models/job.rs
enum JobStatus {
    Pending,
    Generating,
    Generated,
    Sending,
    Paused,
    Completed,
    Cancelled,
}

enum RecipientJobStatus {
    Pending,
    Generated,
    Sent,
    Failed,
    Skipped,
}

struct GenerateJob {
    id: String,
    template_id: String,
    status: JobStatus,
    recipients: Vec<GenerateJobRecipient>,
    created_at: DateTime,
    completed_at: Option<DateTime>,
}

struct GenerateJobRecipient {
    recipient_id: String,
    status: RecipientJobStatus,
    output_path: Option<String>,
    error_message: Option<String>,
}

struct SendJob {
    id: String,
    generate_job_id: Option<String>,
    channel: String,           // "email"
    status: JobStatus,
    smtp_profile_id: Option<String>,
    subject: String,
    body_html: String,
    sender_name: String,
    sender_address: String,
    cursor_index: u32,
    total_count: u32,
    recipients: Vec<SendJobRecipient>,
    created_at: DateTime,
    completed_at: Option<DateTime>,
}

struct SendJobRecipient {
    recipient_id: String,
    status: RecipientJobStatus,
    message_id: Option<String>,
    error_message: Option<String>,
    sent_at: Option<DateTime>,
}

// models/smtp_profile.rs
struct SmtpProfile {
    id: String,
    name: String,
    host: String,
    port: u16,
    username: String,
    password: String,          // app password
    created_at: DateTime,
}
```

## 5. Tauri Commands (IPC API)

Every command is `#[tauri::command]` in Rust, called from React via `invoke()`.

### 5.1 Import

```
import_recipients(excel_path: String) -> ImportResult
```
- Reads Excel via `calamine` (first sheet, header row)
- Auto-maps columns by case-insensitive name match: "name" → name, "email" → email, "phone" → phone
- Unrecognized columns become metadata keys
- Returns: `{ recipients: Vec<RecipientPreview>, skipped_duplicates: u32, warnings: Vec<String> }`
- Does NOT persist yet — caller confirms, then calls `commit_import`

```
commit_import(recipients: Vec<RecipientImport>, column_mapping: HashMap<String,String>) -> CommitResult
```
- Persists recipients to SQLite with a shared `import_batch` UUID
- Skips duplicate emails (case-insensitive match on existing recipients)
- Returns: `{ imported: u32, duplicates_skipped: u32 }`

### 5.2 Recipients

```
list_recipients(search: Option<String>, import_batch: Option<String>, page: u32, page_size: u32) -> PaginatedRecipients
delete_recipients(ids: Vec<String>) -> u32  // returns count deleted
get_recipient(id: String) -> Recipient
```

### 5.3 Templates

```
list_templates() -> Vec<Template>
get_template(id: String) -> Template
create_template(name: String, file_path: String, slots: Vec<String>, output_pattern: String) -> Template
update_template(id: String, name: String, slots: Vec<String>, output_pattern: String) -> Template
delete_template(id: String) -> ()
scan_template_slots(file_path: String) -> Vec<String>
    // DOCX: unzip, read document.xml, extract {placeholder} patterns via regex
    // Image: return empty vec (user declares slots manually)
```

### 5.4 Compose — Generate

```
start_generate_job(template_id: String, recipient_ids: Vec<String>) -> GenerateJob
    // Creates generate_job + generate_job_recipients rows, status='pending'
    // Returns job id

run_generate_job(job_id: String) -> ()
    // Async — spawns tokio task, updates job status to 'generating'
    // For each recipient:
    //   1. Fill DOCX template with recipient data (or overlay text on image)
    //   2. Convert to PDF (LibreOffice for DOCX, printpdf for image)
    //   3. Update generate_job_recipients row
    // Progress emitted via Tauri events (see 5.6)

get_generate_job_status(job_id: String) -> GenerateJob
cancel_generate_job(job_id: String) -> ()
```

### 5.5 Compose — Send

```
start_send_job(
    generate_job_id: Option<String>,
    recipient_ids: Vec<String>,
    smtp_profile_id: Option<String>,
    smtp_override: Option<SmtpConfig>,  // inline SMTP for this send only
    subject: String,
    body_html: String,
    sender_name: String,
    sender_address: String,
    attachment_paths: HashMap<String, String>,  // recipient_id -> PDF path
    delay_ms: u32,                              // rate limit override
) -> SendJob

run_send_job(job_id: String) -> ()
    // Async — spawns tokio task
    // For each recipient (sequential, rate-limited):
    //   1. Build email with attachment via lettre
    //   2. Send via SMTP
    //   3. Update send_job_recipients row
    //   4. Update cursor_index after each successful send
    //   5. Sleep delay_ms between sends
    // On SMTP disconnect: retry 3x with exponential backoff (1s/2s/4s)
    //   If all retries fail, pause job (status='paused')
    // Progress emitted via Tauri events

pause_send_job(job_id: String) -> ()
resume_send_job(job_id: String) -> ()  // reads cursor_index, continues from there
cancel_send_job(job_id: String) -> ()
get_send_job_status(job_id: String) -> SendJob
```

### 5.6 Progress Events (Tauri events, Rust → React)

```
generate-progress: { job_id, current: u32, total: u32, status: "generating"|"generated"|"failed", recipient_id, error? }
send-progress:     { job_id, current: u32, total: u32, status: "sent"|"failed", recipient_id, message_id?, error? }
job-paused:        { job_id, reason: String, last_index: u32 }
job-completed:     { job_id, sent: u32, failed: u32 }
```

### 5.7 Logs

```
list_send_jobs(status_filter: Option<String>, date_from: Option<String>, date_to: Option<String>) -> Vec<SendJobSummary>
get_send_job_detail(job_id: String) -> SendJob  // includes all recipients
retry_failed_recipients(job_id: String, recipient_ids: Vec<String>) -> SendJob  // creates new send job
```

### 5.8 Settings

```
list_smtp_profiles() -> Vec<SmtpProfile>
create_smtp_profile(name, host, port, username, password) -> SmtpProfile
update_smtp_profile(id, name, host, port, username, password) -> SmtpProfile
delete_smtp_profile(id) -> ()
test_smtp_connection(host, port, username, password) -> Result<(), String>

get_setting(key: String) -> Option<String>
set_setting(key: String, value: String) -> ()

check_libreoffice() -> Option<String>  // returns path or None
```

## 6. Pipeline Specifications

### 6.1 DOCX Fill (Rust)

Input: template_path (.docx), data: HashMap<String, String>
Output: filled .docx bytes (Vec<u8>)

Algorithm:
1. Open .docx as ZIP archive
2. Read `word/document.xml` as string
3. For each (key, value) in data: replace `{key}` with XML-escaped value
4. Read `word/header*.xml` and `word/footer*.xml` if they exist — do the same replacements
5. Write modified XML back into ZIP
6. Return ZIP bytes

Edge cases:
- Placeholders spanning XML runs: the existing templates do NOT have this problem.
  `{name}` appears inside a single `<w:r><w:t>{name}</w:t></w:r>`.
  If a template does have split placeholders, the fill will fail.
  The template upload flow should warn about this.
- Special characters in values: XML-escape `&`, `<`, `>`, `"`, `'` before substitution.
- No external crate needed. ~25 lines of Rust using the `zip` crate for read/write
  plus `quick-xml` for safe XML manipulation (optional; string replace works for v1).

### 6.2 DOCX to PDF (LibreOffice headless)

Input: filled .docx bytes + output filename
Output: PDF file at specified path

Algorithm:
1. Write filled .docx to temp file: `{temp_dir}/{job_id}_{recipient_id}.docx`
2. Spawn: `soffice --headless --convert-to pdf --outdir {temp_dir} {temp_file}`
3. Read generated PDF: `{temp_dir}/{job_id}_{recipient_id}.pdf`
4. Move to output directory with proper filename from template's `output_pattern`
5. Clean up temp .docx

Requirements:
- LibreOffice must be installed. App checks on first launch via `which soffice` (macOS) / `where soffice` (Windows).
  If missing, show setup screen with download link and block compose functionality.
- Conversion is one-shot per file (no daemon mode).
- Timeout: 30 seconds per conversion. If LibreOffice hangs, kill the process and mark recipient as failed.

### 6.3 Image to PDF (printpdf)

Input: image_path (.png/.jpg), font_paths: Vec<String>, text_overlays: Vec<TextOverlay>
Output: PDF bytes (Vec<u8>)

```rust
struct TextOverlay {
    text: String,
    font_size: f64,
    x_mm: f64,       // from bottom-left
    y_mm: f64,       // from bottom-left
    font_index: usize,
    color: (u8, u8, u8),
}
```

Algorithm:
1. Load image via the `image` crate
2. Create PdfDocument with page matching image dimensions (at 300 DPI)
3. Add image as background layer
4. Load TTF/OTF fonts from provided paths
5. For each overlay, call `layer.use_text(text, font_size, x_mm, y_mm, &font)`
6. Save PDF

- Text coordinates: printpdf uses cartesian coordinates (bottom-left origin).
  The UI for image templates must let the user set Y from top, then convert:
  `printpdf_y = page_height_mm - ui_y_mm - font_size_mm`.
  In v1, coordinates are hardcoded per template (entered in Settings/Templates as numbers).
  Visual coordinate picker is v2.

### 6.4 SMTP Send (lettre)

Input: SmtpConfig, email: EmailToSend, recipient: Recipient
Output: Result<String, SendError> (message ID or error)

```rust
struct SmtpConfig {
    host: String,        // "smtp.gmail.com"
    port: u16,           // 587
    username: String,    // "sender@gmail.com"
    password: String,    // app password
}

struct EmailToSend {
    from_name: String,
    from_address: String,
    to_address: String,
    subject: String,
    body_html: String,
    attachment_paths: Vec<String>,
}
```

Algorithm:
1. Build lettre `Message` with `MultiPart::mixed()`:
   - `SinglePart::html(body_html)`
   - For each attachment: `SinglePart::builder().body_from_file(path)`
2. Create `AsyncSmtpTransport` with STARTTLS, credentials
3. Send with 3 retries on transient failures (1s/2s/4s backoff)
4. Return message ID on success

Rate limiting: The caller (send job runner) sleeps `delay_ms` between recipients.
Not enforced inside the send function itself.

### 6.5 Excel Import (calamine)

Input: file_path (.xlsx/.xls)
Output: Vec<Vec<(String, String)>> (rows of (column_name, value) pairs)

Algorithm:
1. Open workbook with `calamine::open_workbook_auto(file_path)`
2. Read first sheet via `worksheet.range()`
3. First row = headers (normalized: trim, lowercase for matching)
4. Subsequent rows = data
5. Auto-map columns: "name" → name, "email" → email, "phone" → phone
   Everything else → metadata
6. Return rows with mapped fields

## 7. Frontend Routes & Screens

### 7.1 Route Tree (TanStack Router, file-based)

```
/               → redirect to /recipients
/import         → Import screen
/recipients     → Recipients browser
/templates      → Templates manager
/compose        → Compose wizard (multi-step)
/logs           → Send log history
/logs/$jobId    → Job detail with per-recipient breakdown
/settings       → App settings
```

### 7.2 Navigation Shell (__root.tsx)

Sidebar on the left, always visible:
- Import (Upload icon)
- Recipients (Users icon)
- Templates (FileText icon)
- Compose (Send icon)
- Logs (History icon)
- Settings (Gear icon)

Active route highlighted. Content area on the right with TanStack Router `<Outlet />`.

### 7.3 Screen: Import (/import)

1. **File selection:** Drag-and-drop zone for `.xlsx`/`.xls` files, or "Browse files" button using Tauri file dialog
2. **Preview:** On file selection, call `import_recipients()` to parse and preview.
   TanStack Table showing first 50 rows with columns: name, email, phone, plus dynamic metadata columns
3. **Column mapping:** Two-column layout.
   Left: Excel column name (read-only).
   Right: mapped field dropdown (name / email / phone / custom metadata / skip).
   Auto-mapped suggestions pre-selected.
4. **Import button:** Calls `commit_import()`.
   Success toast: "Imported 142 recipients. 3 duplicates skipped."
   Action buttons: "Go to Compose" or "Go to Recipients"

### 7.4 Screen: Recipients (/recipients)

- TanStack Table with columns: name, email, phone, import batch label, imported date
- Search bar: full-text across name, email, custom fields
- Filter by import batch (dropdown populated from DB)
- Click row → expand side panel with full recipient details (all metadata keys)
- Bulk select → "Delete Selected" button with confirmation dialog

### 7.5 Screen: Templates (/templates)

- Grid of template cards.
  Each card: template name, type badge (DOCX/Image), slot count, created date
- "Add Template" button → file picker for `.docx` or image files
- On add: `scan_template_slots()` for DOCX (auto-extract `{placeholder}` patterns).
  For images, prompt user to enter slot names manually.
- User confirms/edits slot list and sets output pattern (e.g. `LOA_{name}.pdf`)
- Click card → detail view: slot list, output pattern preview, edit/delete buttons
- "Edit in Word" / "Edit in Photoshop" hint text (no built-in editor in v1)

### 7.6 Screen: Compose Wizard (/compose)

Multi-step wizard with step indicator at top. State held in React (not persisted until Generate/Send).

**Step 1 — Recipients:**
- Filter recipients by import batch dropdown + free-text search
- Checkbox multi-select or "Select All"
- Shows count: "142 recipients selected"
- Next button enabled only when selection > 0

**Step 2 — Template:**
- Dropdown of available templates
- Preview card: template name, type badge, slot list
- "Template requires slots: name, instansi, tanggal" — check that selected recipients have these fields
- Next button

**Step 3 — Message:**
- Subject line text input with `{slot}` autocomplete suggestions (from template slots + metadata keys)
- Body HTML textarea (or rich text in v2; plain textarea in v1)
- Same `{slot}` interpolation
- Live preview toggle: show rendered subject+body for 2-3 sample recipients
- Next button

**Step 4 — SMTP:**
- Dropdown of saved SMTP profiles from Settings
- Or "Enter new" inline form: host, port, username, app password
- "Save as profile" checkbox
- "Test Connection" button
- Rate limit delay override (default from Settings, adjustable 500ms–5000ms)
- Next button

**Step 5 — Generate & Review:**
- Summary: "142 recipients × [Template Name] → PDFs"
- "Generate PDFs" button → calls `start_generate_job()` + `run_generate_job()`
- Progress bar during generation with live counter (Tauri events)
- On completion: spot-check preview of 2-3 rendered PDFs (side-by-side with recipient data)
- List of generation failures inline with error reasons
- Back button to fix issues; Next to proceed
- Next enabled even with partial failures (failed recipients are excluded from send)

**Step 6 — Send:**
- Final summary: recipient count, subject line, template, SMTP profile, attachment count
- "Send All" button → calls `start_send_job()` + `run_send_job()`
- Pre-flight check before first send:
  1. Verify SMTP connection (connect + auth)
  2. Confirm at least one recipient has a generated attachment
  3. Fail fast with error message if either check fails
- Transitions to live progress view (in-page, replacing the summary)

### 7.7 Send Progress (inline within Compose Step 6)

- Progress bar: "87/142 sent"
- Scrolling log: timestamped lines — "✓ alice@co.com sent" / "✗ bob@co.com failed: mailbox full"
- Failure counter: "4 failed so far"
- Pause button: stops dispatching new emails. Changes to Resume.
- Cancel button: stops the job entirely. Already-sent emails stay sent. Confirmation dialog before cancel.
- On completion: summary banner "138 sent, 4 failed" with "Retry Failures" button → opens mini Compose flow

### 7.8 Screen: Logs (/logs)

- TanStack Table: most recent jobs first
- Columns: status badge, subject, template used, sent/failed/skipped counts, timestamp, duration
- Filters: date range, status dropdown, template dropdown
- Click row → `/logs/$jobId`

### 7.9 Screen: Job Detail (/logs/$jobId)

- Job summary header: subject, template, SMTP profile, timestamps
- Per-recipient TanStack Table: name, email, status badge, error message (if failed), timestamp
- Search/filter within the recipient list
- "Retry" button per failed recipient
- "Retry All Failures" button → opens Compose wizard pre-filled:
  - Recipients: the failed ones from this job
  - Template: same template
  - Message: same subject + body
  - SMTP: same profile

### 7.10 Screen: Settings (/settings)

- **SMTP Profiles section:**
  - List of saved profiles (name, host, username, password masked as ••••••••)
  - Add/Edit/Delete buttons
  - Add/Edit opens inline form or dialog
  - "Test Connection" button per profile

- **Rate Limiting section:**
  - Slider: 500ms to 5000ms, step 100ms, default 1000ms
  - Live label: "1 email per second" / "1 email every 2.5 seconds"
  - Stored as `rate_limit_delay_ms` in settings table

- **Default Paths section:**
  - Templates directory: text input + folder picker button (Tauri file dialog)
  - PDF output directory: text input + folder picker button
  - Default: `~/Documents/EmailBlast/templates` and `~/Documents/EmailBlast/output`

- **About section:**
  - App name, version (from Cargo.toml), license

## 8. Error Handling & Resilience

### 8.1 Rust Error Types

```rust
// error.rs

#[derive(Debug, thiserror::Error)]
enum GenerateError {
    #[error("Template not found: {0}")]
    TemplateNotFound(String),
    #[error("Required slot '{slot_name}' missing for template {template_id}")]
    SlotMissing { template_id: String, slot_name: String },
    #[error("DOCX fill failed for recipient {recipient_id}: {reason}")]
    DocxFillFailed { recipient_id: String, reason: String },
    #[error("LibreOffice PDF conversion failed: {reason}")]
    LibreOfficeFailed { reason: String },
    #[error("Image PDF generation failed: {reason}")]
    ImagePdfFailed { reason: String },
}

#[derive(Debug, thiserror::Error)]
enum SendError {
    #[error("SMTP connection failed: {reason}")]
    SmtpConnectFailed { reason: String },
    #[error("SMTP authentication failed: {reason}")]
    SmtpAuthFailed { reason: String },
    #[error("SMTP send failed for recipient {recipient_id}: {reason}")]
    SmtpSendFailed { recipient_id: String, reason: String },
    #[error("Attachment not found for recipient {recipient_id}: {path}")]
    AttachmentNotFound { recipient_id: String, path: String },
}

// This is how errors cross the Tauri IPC boundary:
// All commands return Result<T, String> where String is the error's Display impl.
// The React layer shows the error string to the user.
```

### 8.2 Failure Modes & Responses

| Failure | Response |
|---------|----------|
| Single recipient generation fails | Mark `failed` with reason. Continue generating others. |
| Single recipient send fails | Mark `failed` with SMTP error. Continue sending others. |
| SMTP disconnects mid-batch | Retry 3x (1s/2s/4s backoff). If all fail, pause job. User clicks Resume. |
| App quits mid-send | Cursor persisted to SQLite after each successful send. On restart, detect in-progress SendJob, show banner: "Unfinished send: 87/200 sent. Resume?" |
| LibreOffice not found | Check on first launch. If missing, block compose, show download link. |
| Template file deleted after job created | Generate fails for all recipients with `TemplateNotFound`. User sees error in Generate step. |
| Excel file has no name/email columns | Import warns: "No 'name' or 'email' column found. Map columns manually." |
| Duplicate email on import | Skipped silently with count reported in toast. |

### 8.3 Cursor-Based Resume

```rust
// After each successful send, atomic update:
UPDATE send_jobs
SET cursor_index = cursor_index + 1
WHERE id = ?1;

// On resume:
// Read cursor_index, then iterate from cursor_index to total_count.
// Already-sent recipients (status='sent') are never re-sent.
// If the SMTP connection drops again, cursor_index is already saved
// at the last successfully-sent recipient.
```

### 8.4 Transaction Safety

- `cursor_index` update and `send_job_recipients` status update happen in the same SQLite transaction
- If the app crashes between sending an email and writing to SQLite, that recipient will be re-sent on resume
  (acceptable — SMTP is not idempotent but re-sending one email is better than skipping one)

## 9. First-Launch Experience

1. App opens to a welcome/setup screen (not the normal sidebar layout)
2. Checks:
   - LibreOffice installed? If not, show download link + "Check Again" button.
     macOS: `brew install --cask libreoffice` or direct download
     Windows: download from libreoffice.org
   - Default directories exist? Create them if not.
   - At least one SMTP profile? Prompt to create one (can skip).
3. "Get Started" button → transitions to normal app layout

On subsequent launches:
- If LibreOffice was previously found, skip check (stored as `libreoffice_checked: true` in settings)
- If an in-progress SendJob exists, show banner: "Unfinished send from [date]. Resume?"

## 10. Out of Scope (v1)

- Built-in template editor (templates edited in Word/Photoshop/Figma)
- WhatsApp sending (architecture seam only)
- Multi-user / team features
- Server/cloud backend
- Email tracking (opens, clicks)
- Rich text editor for email body (textarea with HTML in v1)
- Visual coordinate picker for image templates (manual coordinate entry in v1)
- Dark mode (CSS variables are set up for it; toggle is v2)
- Internationalization (UI in English; template content is user-controlled)
- Automated updates (manual download in v1)

## 11. Appendix: Existing CLI Behavior Reference

The existing Bun CLI at `src/` has three tools.
The desktop app replicates their behavior, not their code.

### A. generate-attachment.ts
- Reads Excel, picks template based on `keterangan` column ("lolos" → template-lolos.docx, else → template-tidak-lolos.docx)
- Replaces `{no}`, `{name}`, `{instansi}`, `{keterangan}`, `{tanggal}` in DOCX via docxtemplater
- Converts DOCX to PDF via LibreOffice (`libreoffice-convert` npm package)
- Fallback: if PDF conversion fails, sends DOCX instead (desktop app does NOT do this — PDF is required)
- Output filename: `{fileType}#7_{sanitized_name}.pdf`
- Sequential processing with delay between recipients

### B. send-email.ts
- Reads Excel with columns: No, name, email, subject, body, file
- "file" column = prefix; actual attachment = `{prefix}_{sanitized_name}.pdf` from attachments directory
- Gmail SMTP via nodemailer with pool-based connection management
- Rate limiting: `rateDelta` (ms between messages), `rateLimit` (max messages per rateDelta window)
- Dry run mode via `DRY_RUN` env var
- Log: appends to `emails.log` with timestamp, email, message ID, attachment path
- Sender: `"Indonesia Youth Movement" <iym@yuanabhaktinusantara.org>` (hardcoded)

### C. generate-certif.ts
- Reads Excel for names
- Loads PNG template + TTF fonts (Montserrat Bold, Poppins Bold)
- pdf-lib: embed background image, draw text at coordinates with centered alignment
- Concurrent generation (4 at a time via p-limit)
- Output: `certificates/{name}.pdf`
- Hardcoded text positions (nomor at y=2850, name at y=2200)

### Key Differences: CLI → Desktop

| Aspect | CLI | Desktop |
|--------|-----|---------|
| Template selection | Hardcoded by `keterangan` value | User picks template per job |
| Slots | Fixed: no, name, instansi, keterangan, tanggal | User-declared per template |
| SMTP config | Environment variables | Per-job profile (stored in DB) |
| Rate limiting | env var `MAIL_RATE_DELTA_MS` | Settings slider + per-send override |
| Resume on failure | None | Cursor-based resume from SQLite |
| Log | Append to text file | SQLite + UI table |
| Attachment path | Convention: `{prefix}_{name}.pdf` | Full path stored in generate_job_recipients |
| Sender identity | Hardcoded | Per-job (from SMTP profile or inline) |
| Attachments without PDF | Fallback to DOCX | PDF required (no fallback) |

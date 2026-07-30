# 05: App screens & navigation design

Type: grilling
Status: resolved
Assignee: Akbar Ramadhan Yusri
Blocked by: 04

## Question

Define the route tree and what each screen does, informed by the domain model from ticket 04.

## Answer

### Navigation Pattern

**Sidebar + wizard hybrid.** Sidebar on the left (icon + label, always visible) for top-level navigation between areas. The Compose area uses an internal step wizard for the send flow. Settings, Logs, and Recipients are one-click away at any time.

### Route Tree

```
/                          → redirect to /recipients
/import                    → Import screen
/recipients                → Recipients browser
/templates                 → Templates manager
/compose                   → Compose wizard (steps below)
/logs                      → Send log history
/logs/:jobId               → Job detail with per-recipient breakdown
/settings                  → App settings
```

TanStack Router with file-based routing.

### Screen-by-Screen

**Import (`/import`)**
- Drag-and-drop zone for `.xlsx` / `.xls` files
- On drop: parse with `calamine`, show preview table (first 50 rows)
- Auto-map columns: match Excel headers to known fields (name, email, phone) by case-insensitive name match. Unrecognized columns become custom metadata fields automatically
- Two-column mapping review: Excel column name on the left, mapped Recipient field on the right. Each mapping is a dropdown the user can override
- "Import Recipients" button commits to DB. Duplicates (same email) are skipped; a toast reports "Imported 142 recipients. 3 duplicates skipped."
- After import: option to "Go to Compose" or "Go to Recipients"

**Recipients (`/recipients`)**
- TanStack Table with columns: name, email, phone, import batch, imported date
- Search bar (full-text across name, email, custom fields)
- Filter by import batch (dropdown of past imports)
- Click a row → expand inline or side panel with full details (all channel addresses, metadata)
- Bulk select for deletion (with confirmation)

**Templates (`/templates`)**
- Grid or list of uploaded templates, each card showing: template name, type badge (DOCX | Image), slots count, last used date
- "Upload Template" button → file picker for `.docx` or image files (PNG/JPG)
- On upload: parse slots from DOCX (`{placeholder}` extraction) or let user declare named regions on image templates
- Click a template → preview with slot list, edit name, delete
- No built-in editor; edit-in-Word/Photoshop hint text

**Compose (`/compose`)** — wizard with steps:
1. **Recipients** — filter by import batch + free-text search. Checkbox multi-select or "Select All." Shows count: "142 recipients selected"
2. **Template** — dropdown of available templates. Preview card shows template name, type, and slot count. "What slots does this template have?" expandable section
3. **Message** — free-text subject line with `{slot}` autocomplete (pulled from template slots + recipient metadata keys). Free-text body with same `{slot}` interpolation. Live preview toggling between 2-3 sample recipients
4. **SMTP** — dropdown of saved profiles from Settings. Inline "or enter new" to type SMTP details for this send only. "Save as profile" checkbox
5. **Generate & Review** — "Generate PDFs" button triggers Generate Job. Shows progress bar during generation. On completion: spot-check preview of 2-3 rendered PDFs/emails (side-by-side with recipient data). List of any generation failures inline. User can go back to fix issues or proceed
6. **Send** — final summary (142 recipients, subject line, template used, SMTP profile). "Send All" button. On click: transitions to live progress view

**Progress (in-page within Compose, step 6 or slide-over panel)**
- Progress bar: "87/142 sent"
- Scrolling log below: timestamped line per email — "✓ alice@co.com sent" / "✗ bob@co.com failed: mailbox full"
- Failure counter visible: "4 failed so far"
- Pause and Cancel buttons. Pause stops dispatching new emails; Resume continues. Cancel stops the job entirely; already-sent emails stay sent
- On completion: summary banner "138 sent, 4 failed" with "Retry failures" button

**Logs (`/logs`)**
- TanStack Table: most recent jobs first. Columns: status badge, subject line, template used, recipient count (sent/failed/skipped), timestamp, duration
- Filters: date range picker, status dropdown, template dropdown, import batch dropdown
- Click a job → `/logs/:jobId` detail view: full per-recipient table with name, email, status, error message (if failed), timestamp
- "Retry" button per failed recipient (or "Retry All Failures") — opens a mini Compose flow pre-filled with that recipient + original template + message

**Settings (`/settings`)**
- **SMTP Profiles** — list of saved profiles (host, port, username, app password masked). Add/edit/delete. These populate the Compose wizard dropdown
- **Rate Limiting** — delay slider: 500ms to 5000ms, default 1000ms (1 email/second). Matches current CLI behavior. Per-send override available in Compose wizard step 4
- **Default Paths** — Templates directory and PDF output directory. Text inputs with folder picker buttons. Default to `~/Documents/EmailBlast/templates` and `~/Documents/EmailBlast/output`
- **About** — version, license info

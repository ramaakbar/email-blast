# CONTEXT.md

## Glossary

### Recipient

A person the user communicates with. A recipient has a **name** (required) and zero or more **channel addresses**: an email address for email sending, a phone number for WhatsApp (future).

Additional fields from the imported Excel (e.g. `instansi`, `keterangan`, `no`) are stored in a **metadata bag** (`Map<String, String>`) and passed through to template placeholders by key. The app does not interpret them — Excel column names map directly to template slot names.

### Template

A document template the user configures to generate PDFs. Defined by:
- **File path**: the asset (`.docx` for letters, `.png`/`.jpg` for certificates)
- **Type**: `docx` or `image`
- **Slots**: user-declared placeholder names the template expects (e.g. `name`, `instansi`, `tanggal`). The app validates that imported Excel columns include all declared slots.
- **Output pattern**: how generated files are named (e.g. `LOA_{name}.pdf`)

Template editing (changing the DOCX or image, adjusting text coordinates) is done externally (Word, Figma, Photoshop). In-app template editing is out of scope for v1.

### Generate Job

An action on a list of recipients against a template. Produces one PDF file per recipient. The job persists forever — the user can revisit any past generate job to see what was produced and re-download files.

Inputs:
- A template (DOCX or image)
- A list of recipients (from Excel import or manual entry)
- (Image templates only) text coordinate overrides per slot

Outputs:
- One PDF per recipient, stored locally
- Per-recipient status: `generated` or `failed` (with error)

### Send Job

An action that delivers messages to a list of recipients through a **channel**. Independent from Generate — the user may generate PDFs, review them, then send; or send to a subset after generating; or send certificates that were generated earlier.

Inputs:
- **Channel config**: for email, this is SMTP credentials (host, port, username, app-password), sender name+address, subject line, and HTML body. Per-job, not global — different campaigns may use different sender identities.
- A list of recipients with channel addresses (email for email channel, phone for future WhatsApp)
- References to attachment files (generated PDFs)

Outputs per recipient:
- `pending` — queued, not yet attempted
- `sent` — delivered successfully, with message ID
- `failed` — delivery failed, with error message
- `skipped` — user chose not to send to this recipient

### Channel

The delivery mechanism for a Send Job. v1 supports **email** (SMTP). Future: **WhatsApp**. Each channel carries its own configuration shape — email has SMTP, WhatsApp will have auth credentials and message template. The channel is set per Send Job, so a single recipient list could be sent via email today and WhatsApp tomorrow.

<!-- end glossary -->

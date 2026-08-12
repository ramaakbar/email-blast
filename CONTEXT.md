# CONTEXT.md

## Glossary

### Recipient

A person the user communicates with. A recipient has a **name** (required) and zero or more **channel addresses**: an email address for email sending, a phone number for WhatsApp (future).

Additional fields from the imported Excel (e.g. `instansi`, `keterangan`, `no`) are stored in a **metadata bag** (`Map<String, String>`) and passed through to template placeholders by key. The app does not interpret them — Excel column names map directly to template slot names.

### Document Template

A document template the user configures to generate PDFs. Defined by:
- **File path**: the asset (`.docx` for letters, `.png`/`.jpg` for certificates)
- **Type**: `docx` or `image`
- **Slots**: user-declared placeholder names the template expects (e.g. `name`, `instansi`, `tanggal`). The app validates that imported Excel columns include all declared slots.
- **Output pattern**: how generated files are named (e.g. `LOA_{name}.pdf`)

Document template editing (changing the DOCX or image asset itself) is done externally (Word, Figma, Photoshop). Image templates additionally support in-app per-slot text positioning: X/Y, font size, color, and alignment configured per slot on the template, with a live preview.
_Avoid_: Template (ambiguous — use Document Template for PDF-generation assets, Message Template for email bodies).

### Message Template

A reusable email message the user can pick in a Send Job: a name, subject line, and HTML body with `{slot}` placeholders. Picking a Message Template copies its contents into the Send Job, where the user edits them freely — the template itself never changes.
_Avoid_: Email template, body template

### Template Assignment

The mapping that decides which Document Template a recipient is generated with. Each recipient carries an optional **template column** value from the imported Excel; the generate job maps each distinct value to a Document Template, and a **default template** covers recipients with no value. All recipients of a generate job share the same output naming pattern regardless of their template.

### Generate Job

An action on a list of recipients against a Document Template (or several, via a Template Assignment). Produces one PDF file per recipient. The job persists forever — the user can revisit any past generate job to see what was produced and re-download files.

Inputs:
- A Template Assignment (default Document Template plus optional per-recipient routing)
- A list of recipients (from Excel import or manual entry)

Outputs:
- One PDF per recipient, stored locally
- Per-recipient status: `generated` or `failed` (with error)

### Send Job

An action that delivers messages to a list of recipients through a **channel**. Independent from Generate — the user may generate PDFs, review them, then send; or send to a subset after generating; or send certificates that were generated earlier.

Inputs:
- **Channel config**: for email, a chosen SMTP Profile with per-job overrides — Sender Identity, subject line, and HTML body (seeded from a picked Message Template). Per-job, not global — different campaigns may use different sender identities.
- A list of recipients with channel addresses (email for email channel, phone for future WhatsApp)
- References to attachment files (generated PDFs), or none for a plain message

### SMTP Profile

A saved email connection: host, port, security, username, password, and a default **Sender Identity**. Send Jobs reference a profile and may override any part of it per job without changing the profile.

### Sender Identity

The from-name and from-address (optionally a reply-to) an email is sent with. Every SMTP Profile carries a default Sender Identity; a Send Job may override it per job.

Outputs per recipient:
- `pending` — queued, not yet attempted
- `sent` — delivered successfully, with message ID
- `failed` — delivery failed, with error message
- `skipped` — user chose not to send to this recipient

### Channel

The delivery mechanism for a Send Job. v1 supports **email** (SMTP). Future: **WhatsApp**. Each channel carries its own configuration shape — email has SMTP, WhatsApp will have auth credentials and message template. The channel is set per Send Job, so a single recipient list could be sent via email today and WhatsApp tomorrow.

<!-- end glossary -->

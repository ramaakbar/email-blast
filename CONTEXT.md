# CONTEXT.md

## Glossary

### Recipient

A person the user communicates with. A recipient has a **name** (required) and zero or more **channel addresses**: an email address for email sending, a phone number for WhatsApp (future).

A recipient's name and channel addresses are **editable** in-app: the edit applies to subsequent send attempts, while past send outcomes keep their record.

Additional fields from the imported Excel (e.g. `instansi`, `keterangan`, `no`) are stored in a **metadata bag** (`Map<String, String>`) and passed through to template placeholders by key. The app does not interpret them — Excel column names map directly to template slot names.

**Email dedupe**:
At import, a row whose email matches one already in the recipients table (or an earlier row of the same file) is skipped, keeping the first occurrence. A per-import allow-duplicates choice disables this for that batch — primarily for Test Blasts. The database itself never enforces email uniqueness.
_Avoid_: unique email (there is no uniqueness constraint)

### Document Template

A document template the user configures to generate PDFs. Defined by:

- **File path**: the asset (`.docx` for letters, `.png`/`.jpg` for certificates)
- **Type**: `docx` or `image`
- **Slots**: user-declared placeholder names the template expects (e.g. `name`, `instansi`, `tanggal`). The app validates that imported Excel columns include all declared slots.
- **Output pattern**: how generated files are named (e.g. `LOA_{name}.pdf`)

Document template editing (changing the DOCX or image asset itself) is done externally (Word, Figma, Photoshop). Image templates additionally support in-app per-slot text positioning: X/Y, font size, font face, color, and alignment configured per slot on the template, with a live preview.
_Avoid_: Template (ambiguous — use Document Template for PDF-generation assets, Message Template for email bodies).

**Font Face**:
A typeface a slot layout renders its text with. The app ships a small bundled set and accepts user-uploaded font files; every slot picks one face, and slots without a choice render in Helvetica Bold (the legacy look). A face renders identically in the live preview and the generated PDF.
_Avoid_: custom font (a face is either bundled or uploaded; both are ordinary faces)

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

**Test Blast**:
A send meant to verify the pipeline without touching real recipients — typically every row's email rewritten to the sender's own address. A Test Blast import enables the allow-duplicates choice so all rows import; the rows remain ordinary recipients and are cleaned up like any other batch.
_Avoid_: test send (the send itself is ordinary — the special part is the duplicated addresses)

### IPC Bridge

The module that carries calls between the renderer and the main process. One **wire table** (`shared/wire.ts`, zero-dependency by sandbox constraint) names every operation's channel and argument count; the preload derives `window.api` from it, and each domain service exports an **operation table** (`makeOp` rows: channel, payload schema, response schema, handler) that the composition root registers in one loop. Adding an operation touches one service module plus the wire table — never the preload or the registration glue. The registration machinery (`main/ipc-core.ts`) owns decode → run → encode uniformly; the registry is a seam with two adapters (Electron in production, a fake in tests).

### Release

A published version of the app on GitHub Releases: the installable artifacts (dmg/zip for macOS, Setup.exe for Windows) plus the update metadata the app reads to detect new versions. A **draft** release is invisible to everyone but the maintainer; a **pre-release** is visible but ignored by shipped apps, which makes it the test build for verifying an update before colleagues see it.
_Avoid_: channel (a Channel is how a Send Job delivers messages — email or WhatsApp — not how the app itself ships a version)

### Update Check

The app asking the Release feed whether a newer version exists. Silent at launch, and manual from Settings. A check never installs anything; installing is the user's click, and it is refused while a Send Job is running.
_Avoid_: auto-update (only Windows installs updates itself — see Self-install)

**Self-install**:
The platform split in how an available update is applied (ADR-0011). On Windows the app downloads the new version and installs it on one click. On macOS it only notifies and opens the Release page: Squirrel.Mac validates an update against the running app's code signature, and an unsigned bundle is a new identity on every build. The app ships unsigned, so macOS colleagues replace it by hand.
_Avoid_: silent update (nothing installs without the user's click)

**What's-new notice**:
The one-time message on the first launch after the app's version changed, so an update is visible rather than inferred. It fires for both platforms — including a macOS colleague who replaced the app by hand.

<!-- end glossary -->

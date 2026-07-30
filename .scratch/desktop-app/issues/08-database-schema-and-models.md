# 08: Database schema and Rust model types

Type: task
Status: ready-for-agent
Blocked by: 07

## What

Create the SQLite schema (all tables, indexes, default settings) and all Rust model types with serde Serialize/Deserialize.

## Steps

### DB Layer

1. Create `src-tauri/src/db/mod.rs` with `pub fn init(db_path: &str) -> Result<Connection>` that sets `PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;` and runs migrations
2. Create `src-tauri/src/db/schema.rs` with `pub fn run_migrations(conn: &Connection) -> Result<()>` containing all CREATE TABLE statements:

- `recipients` — id TEXT PK, name TEXT NOT NULL, email TEXT, phone TEXT, metadata TEXT NOT NULL DEFAULT '{}', import_batch TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now'))
- `templates` — id TEXT PK, name TEXT NOT NULL, file_path TEXT NOT NULL, type TEXT CHECK(docx|image), slots TEXT NOT NULL DEFAULT '[]', output_pattern TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now'))
- `generate_jobs` — id TEXT PK, template_id TEXT NOT NULL REFERENCES templates(id), status TEXT CHECK(pending|generating|generated|cancelled), created_at TEXT, completed_at TEXT
- `generate_job_recipients` — job_id + recipient_id composite PK, status TEXT CHECK(pending|generated|failed), output_path TEXT, error_message TEXT
- `send_jobs` — id TEXT PK, generate_job_id TEXT REFERENCES generate_jobs(id), channel TEXT CHECK(email|whatsapp), status TEXT CHECK(pending|sending|paused|completed|cancelled), smtp_profile_id TEXT REFERENCES smtp_profiles(id), subject TEXT NOT NULL, body_html TEXT NOT NULL, sender_name TEXT NOT NULL, sender_address TEXT NOT NULL, cursor_index INTEGER NOT NULL DEFAULT 0, total_count INTEGER NOT NULL DEFAULT 0, created_at TEXT, completed_at TEXT
- `send_job_recipients` — job_id + recipient_id composite PK, status TEXT CHECK(pending|sent|failed|skipped), message_id TEXT, error_message TEXT, sent_at TEXT
- `smtp_profiles` — id TEXT PK, name TEXT NOT NULL, host TEXT NOT NULL, port INTEGER NOT NULL DEFAULT 587, username TEXT NOT NULL, password TEXT NOT NULL, created_at TEXT
- `settings` — key TEXT PK, value TEXT NOT NULL

Plus indexes: `idx_recipients_email`, `idx_recipients_import_batch`. Default settings: `rate_limit_delay_ms=1000`, `templates_dir=~/Documents/EmailBlast/templates`, `output_dir=~/Documents/EmailBlast/output`, `libreoffice_checked=false`.

3. Write a `#[test]` that opens `Connection::open_in_memory()`, runs migrations, and asserts all 8 table names exist

### Models

4. Create `src-tauri/src/models/` with `mod.rs` (re-exports), `recipient.rs`, `template.rs`, `job.rs`, `smtp_profile.rs`
5. All structs derive `Debug, Clone, Serialize, Deserialize`. Use `HashMap<String, String>` for metadata. Use `Vec<String>` for slots. Use enum for `TemplateType { Docx, Image }`, `JobStatus { Pending, Generating, Generated, Sending, Paused, Completed, Cancelled }`, `RecipientJobStatus { Pending, Generated, Sent, Failed, Skipped }`
6. Verify: `cargo check` passes

## Acceptance

- `cargo test` passes (schema creation test)
- `cargo check` passes
- All models match the spec in `.scratch/desktop-app/spec.md` Section 4.2

## Reference

Full schema in `.scratch/desktop-app/spec.md` Section 4.1. Full model types in Section 4.2.

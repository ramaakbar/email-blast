# 13: Recipient and template CRUD + Tauri commands

Type: task
Status: ready-for-agent
Blocked by: 08, 09

## What

Implement SQLite CRUD operations for recipients and templates, plus their Tauri IPC commands.

## Steps

### DB Layer

1. Create `src-tauri/src/db/recipients.rs`:
   - `pub fn insert_batch(conn: &Connection, recipients: &[RecipientImport], import_batch: &str) -> Result<InsertResult, String>` — inserts all, skips duplicate emails (case-insensitive), returns `{ imported: u32, duplicates_skipped: u32 }`
   - `pub fn list(conn: &Connection, search: Option<&str>, import_batch: Option<&str>, page: u32, page_size: u32) -> Result<PaginatedResult<Recipient>, String>` — full-text search across name/email/metadata, optional import_batch filter
   - `pub fn delete_by_ids(conn: &Connection, ids: &[String]) -> Result<u32, String>` — returns count deleted
   - `pub fn get_by_id(conn: &Connection, id: &str) -> Result<Option<Recipient>, String>`

2. Create `src-tauri/src/db/templates.rs`:
   - `list`, `get_by_id`, `insert`, `update`, `delete`
   - `pub fn scan_docx_slots(file_path: &str) -> Result<Vec<String>, String>` — unzips .docx, reads `word/document.xml`, extracts `{placeholder}` patterns via regex `\{(\w+)\}`, returns deduplicated slot names

3. Write tests for each CRUD function

### Tauri Commands

4. Create `src-tauri/src/commands/mod.rs`, `src-tauri/src/commands/import.rs`, `src-tauri/src/commands/recipients.rs`, `src-tauri/src/commands/templates.rs`

5. Commands:
   - `import_recipients(excel_path: String) -> Result<ImportResult, String>` — calls pipeline::excel::parse_recipients, does NOT persist
   - `commit_import(state, recipients: Vec<RecipientImport>, column_mapping: HashMap<String, String>) -> Result<CommitResult, String>` — generates UUIDs, inserts batch with shared import_batch UUID, returns counts
   - `list_recipients(state, search, import_batch, page, page_size) -> Result<PaginatedRecipients, String>`
   - `delete_recipients(state, ids) -> Result<u32, String>`
   - `list_templates(state) -> Result<Vec<Template>, String>`
   - `get_template(state, id) -> Result<Template, String>`
   - `create_template(state, name, file_path, slots, output_pattern) -> Result<Template, String>`
   - `update_template(state, id, name, slots, output_pattern) -> Result<Template, String>`
   - `delete_template(state, id) -> Result<(), String>`
   - `scan_template_slots(file_path: String) -> Result<Vec<String>, String>`

Each command takes `state: tauri::State<'_, AppState>` and locks `state.db`.

## Acceptance

- `cargo test` passes (CRUD tests + slot scanning)
- `cargo check` passes
- All commands properly manage DB state via Tauri managed state

## Reference

Spec Sections 5.1, 5.2, 5.3. Models from ticket 08.

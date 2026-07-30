# 14: Job CRUD and cursor persistence

Type: task
Status: ready-for-agent
Blocked by: 08

## What

Implement SQLite CRUD for generate jobs, send jobs, and the cursor-based resume mechanism.

## Steps

1. Create `src-tauri/src/db/jobs.rs`:

### Generate Jobs
- `pub fn create_generate_job(conn: &Connection, template_id: &str, recipient_ids: &[String]) -> Result<GenerateJob, String>` — inserts generate_jobs row + generate_job_recipients rows (one per recipient, status=pending), generates UUIDs
- `pub fn update_generate_recipient(conn: &Connection, job_id: &str, recipient_id: &str, status: &str, output_path: Option<&str>, error_message: Option<&str>) -> Result<(), String>`
- `pub fn get_generate_job(conn: &Connection, job_id: &str) -> Result<GenerateJob, String>` — returns job with all recipients joined
- `pub fn set_generate_job_status(conn: &Connection, job_id: &str, status: &str) -> Result<(), String>`

### Send Jobs
- `pub fn create_send_job(conn: &Connection, params: &CreateSendJobParams) -> Result<SendJob, String>` — inserts send_jobs + send_job_recipients rows, sets total_count
- `pub fn update_send_recipient(conn: &Connection, job_id: &str, recipient_id: &str, status: &str, message_id: Option<&str>, error_message: Option<&str>) -> Result<(), String>`
- `pub fn update_cursor(conn: &Connection, job_id: &str, index: u32) -> Result<(), String>` — atomic: `UPDATE send_jobs SET cursor_index = ?1 WHERE id = ?2`
- `pub fn get_send_job_detail(conn: &Connection, job_id: &str) -> Result<SendJob, String>` — job + all recipients joined
- `pub fn list_send_jobs(conn: &Connection, status_filter: Option<&str>, date_from: Option<&str>, date_to: Option<&str>) -> Result<Vec<SendJobSummary>, String>`
- `pub fn get_in_progress_job(conn: &Connection) -> Result<Option<SendJob>, String>` — finds any send job with status='sending' or status='paused', used on app restart

### Cursor Safety
- `update_send_recipient` and `update_cursor` MUST happen in the same transaction for each successful send
- On resume: read `cursor_index`, iterate from that index to `total_count`, skip recipients already marked 'sent'

2. Write tests:
   - Create generate job, verify recipients are created with pending status
   - Create send job, update a recipient + cursor in one transaction, verify
   - List jobs with date filter
   - Get in-progress job

3. Create `src-tauri/src/db/settings.rs`:
   - `pub fn get_setting(conn: &Connection, key: &str) -> Result<Option<String>, String>`
   - `pub fn set_setting(conn: &Connection, key: &str, value: &str) -> Result<(), String>`

4. Create `src-tauri/src/db/smtp_profiles.rs`:
   - `list`, `insert`, `update`, `delete`, `count`

## Acceptance

- `cargo test` passes (all CRUD + cursor tests)
- Cursor update and recipient status update happen atomically
- `get_in_progress_job` returns the correct job on simulated restart

## Reference

Spec Sections 4.1 (schema), 8.3 (cursor-based resume). SendCursor concept from ticket 06.

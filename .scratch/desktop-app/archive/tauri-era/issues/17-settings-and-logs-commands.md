# 17: Settings and SMTP profile Tauri commands

Type: task
Status: ready-for-agent
Blocked by: 08

## What

Implement Tauri commands for app settings (key-value) and SMTP profile CRUD, plus SMTP connection testing.

## Steps

1. Create `src-tauri/src/commands/settings.rs`:

### SMTP Profiles

```rust
#[tauri::command]
async fn list_smtp_profiles(state: tauri::State<'_, AppState>) -> Result<Vec<SmtpProfile>, String>

#[tauri::command]
async fn create_smtp_profile(
    state: tauri::State<'_, AppState>,
    name: String, host: String, port: u16,
    username: String, password: String,
) -> Result<SmtpProfile, String>

#[tauri::command]
async fn update_smtp_profile(
    state: tauri::State<'_, AppState>,
    id: String, name: String, host: String, port: u16,
    username: String, password: String,
) -> Result<SmtpProfile, String>

#[tauri::command]
async fn delete_smtp_profile(state: tauri::State<'_, AppState>, id: String) -> Result<(), String>
```

### Test Connection

```rust
#[tauri::command]
async fn test_smtp_connection(
    host: String, port: u16, username: String, password: String,
) -> Result<(), String>
```

Uses `lettre::AsyncSmtpTransport` to connect + auth, then drops the connection. Returns Ok(()) or error message. This is a blocking operation (~2-5 seconds) so it must be async.

### Settings

```rust
#[tauri::command]
async fn get_setting(state: tauri::State<'_, AppState>, key: String) -> Result<Option<String>, String>

#[tauri::command]
async fn set_setting(state: tauri::State<'_, AppState>, key: String, value: String) -> Result<(), String>
```

### LibreOffice Check

```rust
#[tauri::command]
async fn check_libreoffice() -> Result<Option<String>, String>
```

Calls `pipeline::docx_to_pdf::check_libreoffice()`. Returns path or None.

2. Create `src-tauri/src/commands/logs.rs`:

```rust
#[tauri::command]
async fn list_send_jobs(
    state: tauri::State<'_, AppState>,
    status_filter: Option<String>,
    date_from: Option<String>,
    date_to: Option<String>,
) -> Result<Vec<SendJobSummary>, String>

#[tauri::command]
async fn get_send_job_detail(
    state: tauri::State<'_, AppState>,
    job_id: String,
) -> Result<SendJob, String>

#[tauri::command]
async fn retry_failed_recipients(
    state: tauri::State<'_, AppState>,
    job_id: String,
    recipient_ids: Vec<String>,
) -> Result<SendJob, String>
```

`retry_failed_recipients` creates a new SendJob with just the failed recipients, pre-filled with the original job's subject/body/template/SMTP profile.

`SendJobSummary` is a lighter struct (no per-recipient details) for the list view:
```rust
struct SendJobSummary {
    id: String,
    status: String,
    subject: String,
    template_name: Option<String>,
    sent_count: u32,
    failed_count: u32,
    skipped_count: u32,
    total_count: u32,
    created_at: String,
    completed_at: Option<String>,
}
```

## Acceptance

- `cargo check` passes
- SMTP connection test works with valid Gmail App Password
- `check_libreoffice` returns correct path on macOS with LibreOffice installed
- Job list returns correct sent/failed/skipped counts

## Reference

Spec Sections 5.7, 5.8.

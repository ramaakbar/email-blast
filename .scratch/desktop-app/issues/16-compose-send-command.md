# 16: Compose — Send job Tauri command

Type: task
Status: ready-for-agent
Blocked by: 12, 14

## What

Implement the Tauri command that orchestrates a Send Job: sequential SMTP dispatch with rate limiting, cursor persistence, retry, pause/resume/cancel.

## Steps

### Send Job Runner

1. In `src-tauri/src/commands/compose.rs`, add:

```rust
#[tauri::command]
async fn start_send_job(
    state: tauri::State<'_, AppState>,
    generate_job_id: Option<String>,
    recipient_ids: Vec<String>,
    smtp_profile_id: Option<String>,
    smtp_override: Option<SmtpConfig>,  // inline SMTP for this send only
    subject: String,
    body_html: String,
    sender_name: String,
    sender_address: String,
    attachment_paths: HashMap<String, String>,  // recipient_id -> PDF path
    delay_ms: u32,
) -> Result<SendJob, String>
```

Creates send_job + send_job_recipients rows, status='pending'. Resolves SMTP config from profile_id or override.

```rust
#[tauri::command]
async fn run_send_job(
    state: tauri::State<'_, AppState>,
    app_handle: tauri::AppHandle,
    job_id: String,
) -> Result<(), String>
```

2. Algorithm (runs in `tokio::task::spawn`, may run for hours):
   - Load job + SMTP config from DB
   - Set status to 'sending'
   - **Pre-flight check:** verify SMTP connection (connect + auth via lettre). If fails, return error before sending anything.
   - Read `cursor_index`. Iterate from `cursor_index` to `total_count`:
     a. Load recipient + attachment path
     b. Build `EmailToSend` struct
     c. Call `email::sender::send_email(&smtp_config, &email)` — this has 3x retry internally
     d. On success:
        - Update send_job_recipients (status='sent', message_id)
        - Update cursor_index (in same SQLite transaction)
        - Emit `send-progress`: `{ job_id, current, total, status: "sent", recipient_id, message_id }`
     e. On SMTP disconnect (all 3 retries exhausted):
        - Set job status to 'paused'
        - Emit `job-paused`: `{ job_id, reason, last_index }`
        - Return (do NOT continue)
     f. On single-recipient failure (non-connection error):
        - Update send_job_recipients (status='failed', error_message)
        - Continue to next recipient
     g. `tokio::time::sleep(Duration::from_millis(delay_ms as u64))` between sends
   - On completion: set status to 'completed', emit `job-completed`: `{ job_id, sent, failed }`

### Control Commands

3. `pause_send_job(state, job_id)` — sets status to 'paused'. The runner loop checks a shared `AtomicBool` or DB status before each send; alternatively, use a `tokio::sync::CancellationToken`.
4. `resume_send_job(state, app_handle, job_id)` — reads cursor_index, calls run_send_job again (picks up from cursor)
5. `cancel_send_job(state, job_id)` — sets status to 'cancelled', signals cancellation token
6. `get_send_job_status(state, job_id) -> Result<SendJob, String>`

### Cancellation Pattern

7. Store a `HashMap<String, CancellationToken>` in AppState (behind Mutex) so pause/cancel can signal the running task:

```rust
pub struct AppState {
    pub db: Mutex<Connection>,
    pub cancel_tokens: Mutex<HashMap<String, CancellationToken>>,
}
```

On `run_send_job`: create token, store it. Loop checks `token.is_cancelled()` before each send.
On `cancel`: get token, call `token.cancel()`.

## Acceptance

- `cargo check` passes
- Manual test: create send job with 5 recipients + delay_ms=500, observe sequential sends with correct rate
- Pause stops dispatching, resume continues from cursor
- Cancel stops immediately, already-sent recipients stay sent
- Cursor persists to DB after each send

## Reference

Spec Sections 5.5, 5.6, 8.2, 8.3. Error model from ticket 06. Existing CLI: `src/send-email.ts` `sendBulkFromExcel()`.

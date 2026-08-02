# 15: Compose — Generate job Tauri command

Type: task
Status: ready-for-agent
Blocked by: 10, 11, 13, 14

## What

Implement the Tauri command that orchestrates a Generate Job: fill templates + convert to PDF for each recipient, emitting progress events.

## Steps

1. Create `src-tauri/src/commands/compose.rs` (compose-related commands live together)

### Generate Job Runner

2. Implement:

```rust
#[tauri::command]
async fn start_generate_job(
    state: tauri::State<'_, AppState>,
    template_id: String,
    recipient_ids: Vec<String>,
) -> Result<GenerateJob, String>
```
Creates the generate_job in DB, returns it. Status = 'pending'.

```rust
#[tauri::command]
async fn run_generate_job(
    state: tauri::State<'_, AppState>,
    app_handle: tauri::AppHandle,
    job_id: String,
) -> Result<(), String>
```

3. Algorithm (runs in a `tokio::task::spawn` since it may take minutes):
   - Load job + template + recipients from DB
   - Set job status to 'generating'
   - For each recipient:
     a. Build data HashMap from recipient fields: name, email, phone, plus all metadata keys
     b. If template type is DOCX:
        - Call `pipeline::docx_fill::fill_template(template_path, &data)`
        - Call `pipeline::docx_to_pdf::convert(&filled_docx, output_path)`
     c. If template type is Image:
        - Build TextOverlay list from template's slot configuration
        - Call `pipeline::image_to_pdf::generate(image_path, &overlays, &font_paths, output_path)`
     d. On success: update generate_job_recipients row (status='generated', output_path)
     e. On failure: update row (status='failed', error_message)
     f. Emit Tauri event `generate-progress`: `{ job_id, current, total, status, recipient_id, error? }`
   - Set job status to 'generated' (or 'generated' even with partial failures)
   - Emit `job-completed`: `{ job_id, generated: u32, failed: u32 }`

4. Add `cancel_generate_job` and `get_generate_job_status` commands

### Progress Events

5. Emit events using `app_handle.emit("generate-progress", payload)` 
6. Frontend listens via `listen('generate-progress', (event) => { ... })` from `@tauri-apps/api/event`

### File Path Conventions

7. Generated PDFs go to the configured output directory (from settings), named using template's `output_pattern` with `{slot}` interpolation:
   - e.g. `{output_dir}/LOA_{name}.pdf` → `/Users/x/Documents/EmailBlast/output/LOA_Alice.pdf`

## Acceptance

- `cargo check` passes
- Manual test: create a template, import recipients, run generate job, verify PDFs appear in output directory
- Progress events fire and can be observed from frontend
- Failed recipients are marked with error messages, successful ones continue

## Reference

Spec Sections 5.4, 5.6. Pipeline specs Sections 6.1-6.3. Existing CLI: `src/generate-attachment.ts` `sendBulkFromExcel()` (sequential loop with progress bar).

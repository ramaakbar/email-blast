# 26: End-to-end integration test and final verification

Type: task
Status: ready-for-agent
Blocked by: 22, 23, 24, 25

## What

Write an integration test covering the full generate-and-send flow, then verify the complete app against a checklist.

## Steps

### Integration Test

1. Create `src-tauri/tests/integration_test.rs`

```rust
use rusqlite::Connection;

fn setup_test_db() -> Connection {
    let conn = Connection::open_in_memory().unwrap();
    email_blast_desktop_lib::db::schema::run_migrations(&conn).unwrap();
    conn
}

#[test]
fn test_full_generate_flow() {
    let conn = setup_test_db();
    // 1. Import a recipient manually
    // 2. Create a DOCX template
    // 3. Create and run a generate job
    // 4. Verify generate_job_recipients all have output_paths
    // 5. Verify generated PDF files exist on disk
}

#[test]
fn test_send_job_creation_and_cursor() {
    let conn = setup_test_db();
    // 1. Create recipients + SMTP profile
    // 2. Create send job
    // 3. Simulate cursor updates: update recipient status + cursor_index
    // 4. Verify cursor_index matches
    // 5. Verify get_in_progress_job returns the job
}

#[test]
fn test_template_slot_scanning() {
    // Test scan_docx_slots with a known .docx fixture
}

#[test]
fn test_excel_import_dedup() {
    // Test that duplicate emails are skipped on import
}

#[test]
fn test_cursor_resume() {
    let conn = setup_test_db();
    // 1. Create send job with 5 recipients
    // 2. Mark first 3 as sent, cursor_index = 3
    // 3. Simulate resume: iterate from index 3
    // 4. Verify recipients 0-2 are skipped (already sent), 3-4 are pending
}
```

### Final Verification Checklist

2. Run and verify each:

- [ ] `pnpm fmt:check` passes
- [ ] `pnpm lint` passes with no errors
- [ ] `pnpm tsc --noEmit` passes (no TypeScript errors)
- [ ] `cargo check` passes (no Rust errors)
- [ ] `cargo test` passes (all unit + integration tests green)
- [ ] `cargo clippy` passes with no warnings
- [ ] `pnpm tauri dev` launches the app on macOS
- [ ] `pnpm tauri build` produces a working `.app` bundle (macOS) or `.msi` (Windows)

### Manual Walkthrough

3. Full manual test:

- [ ] First launch: welcome screen, LibreOffice check, dirs created
- [ ] Import: drag Excel, preview renders, column mapping works, commit succeeds
- [ ] Recipients: table loads, search filters, detail panel opens, bulk delete works
- [ ] Templates: add DOCX (slots auto-scanned), add image (manual slots), edit/delete work
- [ ] Compose step 1: select recipients by batch + search
- [ ] Compose step 2: pick template, slot validation shows
- [ ] Compose step 3: subject + body with {slot} interpolation, live preview
- [ ] Compose step 4: SMTP profile dropdown, test connection, rate limit set
- [ ] Compose step 5: generate PDFs, progress bar updates, spot-check preview, failures shown
- [ ] Compose step 6: pre-flight check, send with live progress, pause/resume/cancel
- [ ] Logs: job appears in list, detail view shows per-recipient status
- [ ] Retry: retry failed recipient from logs → pre-filled compose
- [ ] Settings: SMTP profiles CRUD, rate limit slider, paths with browse
- [ ] Restart: in-progress job banner appears, resume works

### Bug Fixes

4. Any issues found during the walkthrough: fix before marking this ticket resolved.

## Acceptance

- All automated checks pass (fmt, lint, tsc, cargo check, cargo test, cargo clippy)
- `pnpm tauri build` succeeds
- Full manual walkthrough completes with no blockers

## Reference

Full spec at `.scratch/desktop-app/spec.md`.

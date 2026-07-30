# 25: First-launch experience and restart resilience

Type: task
Status: ready-for-agent
Blocked by: 15, 16, 18

## What

Implement first-launch checks (LibreOffice detection, default directories) and in-progress job detection on app restart for cursor-based resume.

## Steps

### First-Launch Check

1. In `src-tauri/src/lib.rs`, add a startup check before building the Tauri app:

```rust
struct FirstLaunchStatus {
    libreoffice_found: bool,
    libreoffice_path: Option<String>,
    default_dirs_ok: bool,
}

fn check_first_launch() -> FirstLaunchStatus {
    let libreoffice_path = pipeline::docx_to_pdf::check_libreoffice();
    let templates_dir = dirs::document_dir()
        .unwrap_or_else(|| PathBuf::from("~"))
        .join("EmailBlast/templates");
    let output_dir = dirs::document_dir()
        .unwrap_or_else(|| PathBuf::from("~"))
        .join("EmailBlast/output");

    // Create dirs if they don't exist
    let dirs_ok = std::fs::create_dir_all(&templates_dir).is_ok()
        && std::fs::create_dir_all(&output_dir).is_ok();

    FirstLaunchStatus {
        libreoffice_found: libreoffice_path.is_some(),
        libreoffice_path,
        default_dirs_ok: dirs_ok,
    }
}
```

2. Expose this via a Tauri command:

```rust
#[tauri::command]
async fn get_first_launch_status(state: tauri::State<'_, AppState>) -> Result<FirstLaunchStatus, String>
```

Reads `libreoffice_checked` from settings. If false, runs the checks, saves result, returns status.
If true, returns cached result.

### In-Progress Job Detection

3. On app startup (in `lib.rs` `run()`), after DB init:

```rust
let in_progress_job = db::jobs::get_in_progress_job(&conn).ok().flatten();
// Store in AppState so frontend can query it
```

4. Expose via command:

```rust
#[tauri::command]
async fn get_in_progress_job(state: tauri::State<'_, AppState>) -> Result<Option<SendJob>, String>
```

### Welcome Screen (frontend)

5. Create `src/routes/welcome.tsx`:

- Shown on first launch (when `libreoffice_checked` is false)
- Displays:
  - LibreOffice status: ✓ Found or ✗ Not Found (with download link: https://www.libreoffice.org/download/)
  - Default directories: ✓ Created or ✗ Error
  - SMTP prompt: "Add your first SMTP profile" button → opens SMTP profile form inline
- "Get Started" button → sets `libreoffice_checked: true`, navigates to `/recipients`
- If LibreOffice not found: "Get Started" still works, but Compose will show a warning

### Restart Banner

6. In `__root.tsx` (or `recipients.tsx` as the default route), on mount:

```tsx
const { data: inProgressJob } = useQuery({
  queryKey: ['inProgressJob'],
  queryFn: () => invoke('get_in_progress_job'),
})

if (inProgressJob) {
  // Show a banner at the top of the screen:
  // "Unfinished send from [date]. 87/200 sent. Resume?"
  // [Resume] [Dismiss]
}
```

- Resume: navigates to `/compose` pre-filled, or has a dedicated resume flow
- Dismiss: just hides the banner (job remains partial in DB, can be resumed from Logs)

### Conditional Routing

7. In `__root.tsx` or `main.tsx`, check if first launch and render welcome screen instead of normal layout:

```tsx
const { data: status } = useQuery({
  queryKey: ['firstLaunchStatus'],
  queryFn: () => invoke('get_first_launch_status'),
})

if (status && !status.libreofficeFound) {
  return <WelcomeScreen status={status} />
}
```

### Platform Support

8. Add `dirs` crate to `Cargo.toml` for cross-platform document directory resolution:
   ```toml
   dirs = "5"
   ```

## Acceptance

- First launch: welcome screen appears, checks LibreOffice, creates default dirs
- LibreOffice not found: warning shown, download link provided, app still usable (compose blocked)
- LibreOffice found: status cached, welcome screen not shown on subsequent launches
- In-progress send job detected on restart: banner shows with resume option
- Resume picks up from cursor_index correctly

## Reference

Spec Section 9. Cursor resume from ticket 14. LibreOffice check from ticket 10. Error model from ticket 06 Section 4.

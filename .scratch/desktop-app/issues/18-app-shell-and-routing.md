# 18: App shell — Tauri setup and React routing

Type: task
Status: ready-for-agent
Blocked by: 07

## What

Wire up the Tauri app with managed DB state, register all Tauri commands, and create the full React route tree with sidebar navigation shell.

## Steps

### Tauri App Setup

1. Modify `src-tauri/src/lib.rs`:

```rust
mod db;
mod models;
mod pipeline;
mod email;
mod commands;

use std::collections::HashMap;
use std::sync::Mutex;
use rusqlite::Connection;
use tokio::sync::CancellationToken;

pub struct AppState {
    pub db: Mutex<Connection>,
    pub cancel_tokens: Mutex<HashMap<String, CancellationToken>>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Determine DB path: use tauri::api::path::app_data_dir or default
    // Initialize DB: db::init(&db_path).expect("Failed to initialize database")
    // Check for in-progress send jobs

    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .manage(AppState {
            db: Mutex::new(conn),
            cancel_tokens: Mutex::new(HashMap::new()),
        })
        .invoke_handler(tauri::generate_handler![
            commands::import::import_recipients,
            commands::import::commit_import,
            commands::recipients::list_recipients,
            commands::recipients::delete_recipients,
            commands::templates::list_templates,
            commands::templates::get_template,
            commands::templates::create_template,
            commands::templates::update_template,
            commands::templates::delete_template,
            commands::templates::scan_template_slots,
            commands::compose::start_generate_job,
            commands::compose::run_generate_job,
            commands::compose::cancel_generate_job,
            commands::compose::get_generate_job_status,
            commands::compose::start_send_job,
            commands::compose::run_send_job,
            commands::compose::pause_send_job,
            commands::compose::resume_send_job,
            commands::compose::cancel_send_job,
            commands::compose::get_send_job_status,
            commands::settings::list_smtp_profiles,
            commands::settings::create_smtp_profile,
            commands::settings::update_smtp_profile,
            commands::settings::delete_smtp_profile,
            commands::settings::test_smtp_connection,
            commands::settings::get_setting,
            commands::settings::set_setting,
            commands::settings::check_libreoffice,
            commands::logs::list_send_jobs,
            commands::logs::get_send_job_detail,
            commands::logs::retry_failed_recipients,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

2. Modify `src-tauri/src/main.rs`:

```rust
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    email_blast_desktop_lib::run();
}
```

3. Set `tauri.conf.json` build section:
   - `beforeDevCommand`: `pnpm dev`
   - `beforeBuildCommand`: `pnpm build`
   - `devUrl`: `http://localhost:5173`
   - `frontendDist`: `../dist`

### React Route Shell

4. The route tree was stubbed in ticket 07. Now create ALL route files as stubs (empty page with title):

```
src/routes/
  __root.tsx          # sidebar layout with NavLink items
  index.tsx            # redirect to /recipients
  import.tsx           # "Import" placeholder
  recipients.tsx       # "Recipients" placeholder
  templates.tsx        # "Templates" placeholder
  compose.tsx          # "Compose" placeholder
  logs.tsx             # "Logs" placeholder
  logs.$jobId.tsx      # "Job Detail" placeholder
  settings.tsx         # "Settings" placeholder
```

5. Sidebar items in `__root.tsx`:
   - Import (`/import`) — Upload icon
   - Recipients (`/recipients`) — Users icon
   - Templates (`/templates`) — FileText icon
   - Compose (`/compose`) — Send icon
   - Logs (`/logs`) — History icon
   - Settings (`/settings`) — Gear icon

   Use `lucide-react` for icons. Active route highlighted with `bg-muted font-medium`.

6. Each placeholder route renders a `<div>` with the route title for now. Actual screen implementation happens in tickets 19-24.

## Acceptance

- `pnpm tauri dev` opens the app with sidebar, all 6 nav links work, clicking navigates to placeholder pages
- `cargo check` passes
- All Tauri commands are registered (they will fail at runtime if their DB tables don't exist yet, but registration succeeds)

## Reference

Spec Sections 5 (all commands), 7.1 (route tree), 7.2 (navigation shell). Scaffold recipe in ticket 02-answer.

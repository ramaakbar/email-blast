# 09 — First launch, database & settings

**What to build:** A fresh install opens a welcome/setup screen instead of the normal layout: it checks for LibreOffice (download link + "Check Again" when missing), creates the default templates and output directories, and on "Get Started" transitions to the app. The SQLite database is created on this first run with the full schema and default settings rows. The Settings screen (rate-limit slider, default paths with folder pickers, About section) reads and writes settings through IPC, persisting across restarts.

**Blocked by:** 08 — Electron scaffold & app shell

**Status:** ready-for-agent

- [ ] Fresh profile: welcome/setup screen shows; LibreOffice found → skipped on subsequent launches (`libreoffice_checked` setting); missing → download link + Check Again; default directories created if absent
- [ ] First run creates the database with all tables (recipients, templates, generate jobs, send jobs + per-recipient rows, SMTP profiles, settings) and default settings (`rate_limit_delay_ms = 1000`, default paths, `libreoffice_checked = false`)
- [ ] Settings screen: rate slider 500-5000ms step 100 with a live label ("1 email per second"), path fields with folder pickers, About section; changes persist across restart
- [ ] Settings get/set flow through the typed IPC contract (Effect Schema payloads, decoded at the main boundary)
- [ ] Seam A: `SqliteRepo` create/read on a temp database; settings round-trip through the Effect Layer

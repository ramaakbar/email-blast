# 09 — First launch, database & settings

**What to build:** A fresh install opens a welcome/setup screen instead of the normal layout: it checks for LibreOffice (download link + "Check Again" when missing), creates the default templates and output directories, and on "Get Started" transitions to the app. The SQLite database is created on this first run with the full schema and default settings rows. The Settings screen (rate-limit slider, default paths with folder pickers, About section) reads and writes settings through IPC, persisting across restarts.

**Blocked by:** 08 — Electron scaffold & app shell

**Status:** done

- [x] Fresh profile: welcome/setup screen shows; LibreOffice found → skipped on subsequent launches (`libreoffice_checked` setting); missing → download link + Check Again; default directories created if absent
- [x] First run creates the database with all tables (recipients, templates, generate jobs, send jobs + per-recipient rows, SMTP profiles, settings) and default settings (`rate_limit_delay_ms = 1000`, default paths, `libreoffice_checked = false`)
- [x] Settings screen: rate slider 500-5000ms step 100 with a live label ("1 email per second"), path fields with folder pickers, About section; changes persist across restart
- [x] Settings get/set flow through the typed IPC contract (Effect Schema payloads, decoded at the main boundary)
- [x] Seam A: `SqliteRepo` create/read on a temp database; settings round-trip through the Effect Layer

## Answer

Implemented in `email-blast-desktop/`:

- `src/main/services/sqlite-repo.ts` - `openDatabase` (applies the full spec-decision-7 schema idempotently), `seedSettings` (INSERT OR IGNORE defaults), `SqliteRepo` service (raw `getSetting`/`setSetting`)
- `src/main/services/settings.ts` - `Settings` service with typed accessors (rate limit clamped 500-5000, paths with defaults fallback, `libreoffice_checked`) and `ensureDirectories`
- `src/main/services/default-paths.ts` - `~/Documents/EmailBlast/{templates,output}` from home
- `src/main/services/libreoffice.ts` - `findLibreOffice` probing install locations + PATH
- `src/shared/ipc.ts` + `ipc-channels.ts` + `preload/index.ts` - typed contract: `settings.get/set` (Schema payloads decoded at the main boundary), `system.checkLibreOffice`, `system.pickFolder`, `system.getAppInfo`
- `src/main/index.ts` - layer booted before window creation (DB opened, defaults seeded, dirs ensured), handlers run Effect programs against the shared layer
- Renderer: setup gate in `routes/__root.tsx` (welcome screen until `libreoffice_checked = true`), `components/welcome-screen.tsx`, real Settings screen (`routes/settings.tsx`)

Verified end to end on 2026-08-02:
- Seam A: 12 vitest tests green (schema on a temp DB, defaults seeded without clobbering, get/set round-trip, reopen-persistence, `ensureDirectories`, LibreOffice candidates, root layer composition)
- Fresh profile (wiped dev `userData`): welcome screen shows; LibreOffice found at `/Applications/LibreOffice.app/Contents/MacOS/soffice`; DB created with all 8 tables and the four default settings; `~/Documents/EmailBlast/{templates,output}` created
- Get Started → `libreoffice_checked = true` → sidebar layout; rate slider 1000→2500 persisted through IPC to SQLite ("Saved" indicator); app restart skips the welcome screen and the slider shows 2500 ms ("0.4 emails per second")
- typecheck (node + web), oxlint, oxfmt, full suite green; `pnpm dev` + `pnpm build:unpack` unchanged from ticket 08 baseline

Deviations from the spec, all deliberate:
- No SMTP profiles anywhere yet: neither the welcome-screen prompt (spec decision 10 item 2) nor the Settings SMTP section (spec decision 8). Ticket 09's own "What to build" and checklist cover only the LibreOffice check, directory creation, the rate slider, path pickers, and About - SMTP profiles (list, add/edit/delete, Test Connection) belong to their own ticket
- `system.pickFolder` and `system.getAppInfo` were added to the IPC contract (additive-only per decision 4) - the Settings screen's folder pickers and About section need them
- The rate limit is clamped on read as well as write (the generic `settings.set` IPC writes raw values, so a stored value outside 500-5000ms is never served); the renderer slider additionally debounces writes during drag

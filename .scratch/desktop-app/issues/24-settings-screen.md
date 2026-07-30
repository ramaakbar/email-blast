# 24: Settings screen

Type: task
Status: ready-for-agent
Blocked by: 17, 18

## What

Build the Settings screen: SMTP profile management, rate limiting slider, default paths, and about section.

## Steps

1. Create `src/components/SmtpProfileForm.tsx`
2. Create `src/routes/settings.tsx`

### SMTP Profiles Section

- List of saved profiles. Each row: name, host:port, username, password (••••••••), Edit button, Delete button
- "Add Profile" button → opens shadcn `Dialog` with form:
  - Name (text input)
  - Host (text input, default: "smtp.gmail.com")
  - Port (number input, default: 587)
  - Username (text input)
  - Password (type=password, placeholder: "App Password")
  - "Test Connection" button — calls `invoke('test_smtp_connection', { host, port, username, password })`, shows success/error
  - Save button — calls `invoke('create_smtp_profile', { ... })`
- Edit: opens same form pre-filled, calls `invoke('update_smtp_profile', { ... })`
- Delete: confirmation dialog, calls `invoke('delete_smtp_profile', { id })`

### Rate Limiting Section

- Slider: 500ms to 5000ms, step 100ms
- Live label that updates as slider moves:
  - "1 email per second" (1000ms)
  - "2 emails per second" (500ms)
  - "1 email every 5 seconds" (5000ms)
- On change (debounced 500ms): `invoke('set_setting', { key: 'rate_limit_delay_ms', value: String(delayMs) })`
- Load current value on mount: `invoke('get_setting', { key: 'rate_limit_delay_ms' })`

### Default Paths Section

- Templates directory: text input showing current path + "Browse" button
  - Browse: Tauri file dialog `open({ directory: true })`
  - On change: save to settings
- Output directory: same pattern
- Default values: `~/Documents/EmailBlast/templates`, `~/Documents/EmailBlast/output`

### About Section

- App name: "Email Blast Desktop"
- Version: read from `package.json` version or display static
- License: MIT
- LibreOffice status: "LibreOffice: Found at /usr/bin/soffice" or "Not found — PDF generation unavailable"
  - Checked via `invoke('check_libreoffice')`

### Dependencies

```bash
pnpm dlx shadcn@latest add slider dialog input label
```

## Acceptance

- SMTP profiles: add, edit, delete, test connection all work
- Rate limit slider updates setting in DB
- Default paths show correct values, browse button opens native folder picker
- About section shows version and LibreOffice status

## Reference

Spec Section 7.10. Commands from ticket 17.

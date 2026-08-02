# 22: Compose wizard

Type: task
Status: ready-for-agent
Blocked by: 15, 16, 17, 18

## What

Build the full 6-step Compose wizard: select recipients → pick template → write message → configure SMTP → generate PDFs → send with live progress.

## Steps

1. Create `src/components/ComposeWizard.tsx` — step indicator + Back/Next shell
2. Create each step as a separate component file under `src/components/`

### Wizard Shell

- Step indicator at top: horizontal stepper showing all 6 steps, current step highlighted
- Step content area below
- Back/Next buttons at bottom
- State: all compose state held in a single `useState` object in `compose.tsx`, passed down as props
- Next button disabled until current step is valid

### Step 1 — Recipients (`ComposeStepRecipients.tsx`)

- Import batch dropdown (populated from distinct batches)
- Free-text search input
- TanStack Table with checkbox column
- "Select All" checkbox in header
- Live count: "142 recipients selected"
- Next enabled when selection.length > 0

### Step 2 — Template (`ComposeStepTemplate.tsx`)

- Dropdown of templates from `invoke('list_templates')`
- Selected template preview card: name, type badge, slot list
- Validation message: "Template requires slots: name, instansi, tanggal"
- Next always enabled (slot validation happens at Generate time)

### Step 3 — Message (`ComposeStepMessage.tsx`)

- Subject line: text input with hint "{slot} placeholders available"
- Body: `<textarea>` for HTML input (v1)
- Slot suggestions: below the inputs, show available slots as clickable badges: clicking `{name}` inserts it at cursor position
- Live preview toggle: "Preview with sample data" — picks first 2-3 selected recipients, interpolates subject + body, shows rendered result
- Next always enabled

### Step 4 — SMTP (`ComposeStepSmtp.tsx`)

- Dropdown: "Select saved profile" — populated from `invoke('list_smtp_profiles')`
- OR "Enter new" toggle → inline form: host, port (default 587), username, password (type=password)
- "Save as profile" checkbox (when using inline form)
- "Test Connection" button with loading spinner + result feedback
- Rate limit delay override: slider 500ms–5000ms, default from `invoke('get_setting', { key: 'rate_limit_delay_ms' })`
- Next enabled when: (profile selected OR inline form filled) AND connection test passed (optional but recommended)

### Step 5 — Generate & Review (`ComposeStepGenerate.tsx`)

- Summary line: "142 recipients × [Template Name] → PDFs"
- "Generate PDFs" button:
  a. Calls `invoke('start_generate_job', { templateId, recipientIds })`
  b. Calls `invoke('run_generate_job', { jobId })` (async, runs in background)
  c. Shows progress bar + counter updated via `listen('generate-progress', ...)`
- On completion:
  - Summary: "138 generated, 4 failed"
  - Spot-check preview: 2-3 rendered PDFs shown in iframe/embed (using Tauri `convertFileSrc` to get asset URL)
  - Failure list: table of failed recipients with error reasons
- Back button (to fix issues), Next button (proceed to send — failed recipients excluded)
- Next enabled when generate is complete (even with partial failures)

### Step 6 — Send (`ComposeStepSend.tsx`) + `SendProgress.tsx`

**Pre-send summary:**
- Recipient count, subject line, template, SMTP profile, attachment count
- "Send All" button

**Pre-flight (on click):**
- Call `invoke('test_smtp_connection', { ...smtpConfig })` — verify SMTP works
- Confirm at least one recipient has a generated attachment
- Fail fast with error dialog if either check fails

**Send progress (replaces summary after send starts):**
- Call `invoke('start_send_job', { ... })` then `invoke('run_send_job', { jobId })`
- Progress bar: "87/142 sent" — updated via `listen('send-progress', ...)`
- Scrolling log below: timestamped lines — "✓ alice@co.com sent" (green) / "✗ bob@co.com failed: mailbox full" (red)
- Failure counter: "4 failed so far"
- Pause button: calls `invoke('pause_send_job', { jobId })`, changes to Resume
- Cancel button: calls `invoke('cancel_send_job', { jobId })`, confirmation dialog first. Already-sent emails stay sent.
- On completion: summary banner "138 sent, 4 failed" with "Retry Failures" button

**Retry Failures:**
- Opens a mini compose flow (or navigates to `/compose` pre-filled with failed recipients + original template + original message + original SMTP)

### Dependencies

```bash
pnpm dlx shadcn@latest add progress scroll-area slider
pnpm add @tauri-apps/api
```

### Tauri Event Listener Pattern

```tsx
import { listen } from '@tauri-apps/api/event'
import { useEffect } from 'react'

useEffect(() => {
  const unlistenPromise = listen<GenerateProgress>('generate-progress', (event) => {
    setProgress(event.payload)
  })
  return () => { unlistenPromise.then(fn => fn()) }
}, [])
```

## Acceptance

- Full wizard flow: recipients → template → message → SMTP → generate → send
- Progress bar updates in real time during generate and send
- Failed recipients shown with error reasons
- Pause stops dispatching, Resume continues
- Cancel stops with confirmation, sent emails stay sent
- Retry failures creates a new pre-filled compose flow

## Reference

Spec Sections 7.6, 7.7. Commands from tickets 15, 16, 17. Screen design from ticket 05.

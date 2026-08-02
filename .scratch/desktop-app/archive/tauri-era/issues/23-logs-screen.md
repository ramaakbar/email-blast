# 23: Logs screen and job detail

Type: task
Status: ready-for-agent
Blocked by: 16, 18

## What

Build the Logs history screen (list of past send jobs) and the job detail drill-down with per-recipient status and retry capability.

## Steps

1. Create `src/routes/logs.tsx`
2. Create `src/routes/logs.$jobId.tsx`

### Logs List (`/logs`)

- Top filters bar:
  - Date range picker (from/to)
  - Status dropdown: All, Completed, Paused, Cancelled
  - (Template dropdown can be derived from job data)
- TanStack Table columns:
  - Status badge (colored: green=completed, yellow=paused, red=cancelled, blue=sending)
  - Subject line
  - Template name (if linked to generate_job)
  - Recipient counts: "138/4/0" (sent/failed/skipped) with color coding
  - Created timestamp
  - Duration (completed_at - created_at)
- Click row → navigate to `/logs/$jobId`
- "Refresh" button to reload data

### Job Detail (`/logs/$jobId`)

- Header section:
  - Job ID, status badge
  - Subject line, template, SMTP profile name
  - Created at, completed at, duration
  - Summary counts: sent, failed, skipped
- Per-recipient TanStack Table:
  - Columns: Name, Email, Status badge (sent/failed/skipped), Error message (if failed), Sent timestamp
  - Search within recipient list
  - Filter by status (sent/failed/skipped)
- Action buttons:
  - "Retry" per failed recipient (single button in row)
  - "Retry All Failures" button at top (only visible when failures exist)
  - Retry navigates to `/compose` with state pre-filled:
    - Recipients: the failed ones
    - Template: from the original generate_job
    - Message: same subject + body
    - SMTP: same profile

### Navigation Pattern for Retry

Use TanStack Router's search params or location state to pre-fill compose:

```tsx
// In logs.$jobId.tsx:
const navigate = useNavigate()
const handleRetryAll = () => {
  navigate({
    to: '/compose',
    search: {
      retryJobId: jobId,
      recipientIds: failedIds,
    },
  })
}
```

In `compose.tsx`, check for `retryJobId` search param on mount and pre-fill steps 1-4.

### Dependencies

```bash
pnpm dlx shadcn@latest add badge
```

## Acceptance

- Logs list shows all past send jobs with correct status badges and counts
- Date range and status filters work
- Job detail shows full per-recipient table with statuses
- "Retry All Failures" navigates to compose pre-filled with failed recipients
- Single recipient retry works

## Reference

Spec Sections 7.8, 7.9. Commands from ticket 17 (list_send_jobs, get_send_job_detail, retry_failed_recipients).

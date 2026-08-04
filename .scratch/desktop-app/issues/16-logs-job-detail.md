# 16 — Logs & job detail

**What to build:** The Logs screen end to end: a history of all send jobs (most recent first) with status badge, subject, template, sent/failed/skipped counts, timestamps, and duration, filterable by status and date range. Clicking a job opens `/logs/$jobId` with a summary header and a per-recipient table showing status, error messages, and timestamps. Failed recipients can be retried individually or all at once, opening the compose wizard pre-filled with the same recipients, template, message, and SMTP config. Paused jobs show "Paused - N of M sent" with a Resume button.

**Blocked by:** 15 — Send pipeline, 22 - Drizzle migration, 23 - TanStack Table v9, 24 - Paraglide + Bahasa Indonesia

**Status:** ready-for-agent

- [ ] Logs table: most recent first; filters for status and date range work
- [ ] Paused jobs show "Paused - N of M sent" with a prominent Resume button that resumes the send
- [ ] Job detail (`/logs/$jobId`): summary header (subject, template, SMTP, timestamps) + per-recipient table with error messages; search/filter within the list
- [ ] Retry per failed recipient and Retry All Failures → compose wizard pre-filled (failed recipients, same template, same message, same SMTP)
- [ ] Seam A: `retryFailed` creates a new send job scoped to the failed recipients; logs list/detail filtering round-trip against a temp database

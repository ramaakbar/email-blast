# 06 — Send workspace

**What to build:** The Send workspace replaces the wizard's online steps. Recipients come from either a past Generate Job (with subset filtering) or directly from the imported recipient list for plain no-attachment sends. Recipients whose generate failed stay sendable — flagged, receiving the message without the attachment — with has-attachment / no-attachment / all filters on the job's recipient table. The pre-flight summary shows which recipients get attachments and which do not. "Send these" from Generate results jumps here pre-linked to that job and its generated recipients. Pause/resume/cancel and per-recipient logs behave as today.

**Blocked by:** 05 — Generate workspace.

**Status:** done

- [x] Send workspace offers two recipient sources: a past Generate Job, or the imported recipient list directly
- [x] Picking a Generate Job shows its recipients with generate status; subset filtering (search/batch) works
- [x] Recipients whose generate failed are shown flagged; the has-attachment / no-attachment / all filter narrows the list (ticket 15's gate superseded the "receive without the attachment" half: a selected failed-generate recipient fails the send with "no attachment" rather than receiving a broken email)
- [x] Has-attachment / no-attachment / all filter works on the job's recipient list
- [x] Plain sends with no attachments work end-to-end (message + SMTP + capture server)
- [x] Pre-flight summary shows which recipients receive attachments and which do not
- [x] "Send these" from Generate results opens the Send workspace pre-linked to the job and its generated recipients
- [x] Pause/resume/cancel and per-recipient logs behave as today
- [x] Sending to a subset after generation works (the CONTEXT.md "send to a subset" use case)

## Answer

Implemented in `email-blast-desktop/` (commit `6148961`):

- `routes/send.tsx` is the Send workspace: recipient source picker (a past Generate Job with its recipient table, or the imported recipient list directly for plain sends), the shared MessageStep, SmtpStep (profile or inline, sender identity), and SendStep with pause/resume/cancel and the per-recipient log
- `JobRecipientTable` shows each job recipient's generate status with a flagged failed badge, search + batch select, and the has-attachment / no-attachment / all filter; the pre-flight summary counts who of the selection receives a PDF and who does not
- "Send these" from Generate results opens the workspace pre-linked to the job with its generated recipients pre-selected; Logs retry pre-fills it too (ticket 07)
- The send pipeline (jobs, pause/resume/cancel cursor, retries, progress hub) was already in place from the wizard era; the workspace is the new UI over it

Tests: Seam B `e2e/send-workspace.test.ts` covers job-source and plain sends with attachments to the SMTP capture server, subset selection, pause/resume, and per-recipient outcomes. Ticket 15 later hardened the attachment gate: only confirmed-generated recipients can receive attachments (failed-generate rows fail the send rather than delivering without the attachment).

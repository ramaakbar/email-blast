# 06 — Send workspace

**What to build:** The Send workspace replaces the wizard's online steps. Recipients come from either a past Generate Job (with subset filtering) or directly from the imported recipient list for plain no-attachment sends. Recipients whose generate failed stay sendable — flagged, receiving the message without the attachment — with has-attachment / no-attachment / all filters on the job's recipient table. The pre-flight summary shows which recipients get attachments and which do not. "Send these" from Generate results jumps here pre-linked to that job and its generated recipients. Pause/resume/cancel and per-recipient logs behave as today.

**Blocked by:** 05 — Generate workspace.

**Status:** ready-for-agent

- [ ] Send workspace offers two recipient sources: a past Generate Job, or the imported recipient list directly
- [ ] Picking a Generate Job shows its recipients with generate status; subset filtering (search/batch) works
- [ ] Recipients whose generate failed are shown flagged; they can be included and receive the message without the attachment
- [ ] Has-attachment / no-attachment / all filter works on the job's recipient list
- [ ] Plain sends with no attachments work end-to-end (message + SMTP + capture server)
- [ ] Pre-flight summary shows which recipients receive attachments and which do not
- [ ] "Send these" from Generate results opens the Send workspace pre-linked to the job and its generated recipients
- [ ] Pause/resume/cancel and per-recipient logs behave as today
- [ ] Sending to a subset after generation works (the CONTEXT.md "send to a subset" use case)

# 17 — Quit/resume resilience

**What to build:** The app survives being closed mid-send. Window close or app quit during a running or paused job shows a uniform dialog on both platforms ("Send in progress - N of M sent. The job will pause and you can resume it later from Logs.") with [Quit & Pause] / [Keep Sending]; quitting pauses, never cancels. On launch, any job stuck in `running` (hard crash, power loss) is treated as `paused` - the persisted cursor is authoritative. Exactly one paused job produces a one-time launch banner; resume re-runs the SMTP pre-flight. Starting a new send while one is active is blocked with a message.

**Blocked by:** 16 — Logs & job detail, 25 - Effect codebase refactor

**Status:** ready-for-agent

- [ ] Quit/close during running or paused job → uniform dialog with both branches; [Quit & Pause] quits with the job paused (never cancelled), [Keep Sending] cancels the quit
- [ ] On launch: `running` jobs are treated as `paused` (cursor authoritative); exactly one paused job → one-time banner; resume from the banner or Logs re-runs the SMTP pre-flight before continuing from the first `pending` recipient
- [ ] Starting a new send while one is running or paused-unresumed is blocked with a clear message
- [ ] Seam A: relaunch-on-same-database resume continues from the cursor without double-sending; the one-active-job rule rejects a second job; the quit path loses at most one in-flight recipient

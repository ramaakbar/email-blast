# 07: Process model & quit resilience

Type: grilling
Status: resolved
Blocked by: 01, 04

## Question

Decide where long-running work lives and how the app survives being closed mid-send.

Decisions to make (grill with the user):

- **Where send/generate jobs run**: Electron main process vs utility process (`utilityProcess.fork`) — the job runner is I/O-bound (SMTP, filesystem, PDF), so main-process-thread blocking matters. Cross-reference ticket 04's Effect Stream progress design.
- **Quit mid-send**: what happens when the user closes the window during an active send — beforeunload / window close vs app quit semantics; per-send SQLite cursor already decided (archive ticket 06) but the interaction UX (confirm dialog? background continue? pause-on-close?) is open
- **Resume**: restart → detect incomplete send job → offer resume; what the Logs screen shows while a job is paused
- **Pause/cancel**: mid-send pause (rate limiter gates the next email) vs cancel (flush cursor, mark remainder failed/skipped) — mapping to the 6-step wizard's send screen
- **Rate limiting**: the 1 email/sec default (500ms–5000ms slider, Settings screen) — timer implementation, and whether it lives in the job runner

Deliver: the process model + quit/resume behavior spec section for /to-spec. This ticket is HITL — the grilling must happen with the user, not unilaterally.

## Answer

Grilled with the user (2026-08-02, all five areas confirmed). Full decisions:

**1. Job location — main process.** Send/generate jobs run in the Electron main process. The work is I/O-bound (nodemailer SMTP, fs, SQLite, LibreOffice as spawned child); per-recipient CPU (docxtemplater fill ~0.007s + pdf-lib) is negligible against the rate gate. utilityProcess.fork rejected for v1 — it would push the ticket-04 Effect Layers, progress Hub, and SQLite cursor through process IPC for zero gain. Keep the JobRunner a clean Effect `Layer` with no direct renderer/main coupling — that seam is the future home if WhatsApp's Baileys sidecar ever lands.

**2. Rate limiting — job runner owns an explicit pacing gate.** `Effect.sleep(interval)` between sends, interval read live from a settings Layer each iteration (default 1000ms; 500–5000ms slider in Settings applies to a running job without restart). Gate fires before each send (delay → send → persist cursor), so pausing mid-delay never leaves a half-sent email. Nodemailer's built-in pool limiter (`pool: {rateLimit, rateDelta}` as in the existing CLI) is NOT used — the runner must own pacing so pause/cancel/quit have a single checkpoint. Plain transport, no pooling.

**3. Pause / cancel.** Checkpoints only between sends — an in-flight SMTP call always completes (already counted; cursor persists after each send). Pause: interrupt the sleep gate, job state → `paused` (persisted), unlimited pause/resume cycles; auto-pause on retry exhaustion (archived resilience decision) uses the same state. Cancel: same checkpoint, confirm dialog ("123 of 500 sent — cancel anyway?"), one transaction marking remaining `pending` → `skipped`, job state → `cancelled`, terminal (no resume). `skipped` = never attempted; job-level `cancelled` distinguishes it from attachment-bad skips in Logs. Re-send path after cancel: fresh job from the same compose data (generation results reusable). Send screen (wizard step 6): Pause/Resume toggle + Cancel, active only while running or paused.

**4. Quit mid-send — dialog, never cancel, no background continue.** Window close or app quit while a job is running or paused → uniform dialog (both platforms, incl. macOS window-close-not-quit): "Send in progress — 250 of 500 sent. The job will pause and you can resume it later from Logs." — [Quit & Pause] / [Keep Sending]. Quitting only pauses, never cancels (ticket 04's before-quit latch + per-send cursor persist unchanged: at most one in-flight recipient lost). Background continue deferred to v2 (would need tray/dock affordances, silently-sending surprise, Mac/Windows divergence).

**5. Resume.** On launch, any job in `paused` or `running` state is incomplete; `running` (hard crash: power loss, kill) is treated as `paused` — the persisted cursor is authoritative, nothing double-sends. Logs screen shows "Paused — N of M sent" with a prominent Resume button; one-time launch banner if exactly one paused job. Resume re-runs the SMTP pre-flight, then continues from the first `pending` recipient at the configured rate. **One active job at a time** in v1: starting a new send while one is running or paused-unresumed is blocked with a message — single owner of the rate gate, guarantees at most one resumable job.

Spec section feed: these five decisions become the Process model + Quit/Resume behavior sections in /to-spec.

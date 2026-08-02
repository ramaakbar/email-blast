# 04: Effect v4 vs v3 and main-process architecture

Type: research
Status: resolved

## Question

Decide the error-handling / concurrency architecture for the Electron main process backend. The user is interested in Effect v4; the handoff notes v4 is beta. The old map's resilience decisions (archive ticket 06) transfer as concepts but were typed in Rust — re-derive them for the JS world.

Investigate and recommend:

- **Version**: Effect v4 (beta) vs stable v3 — current state mid-2026: maturity, breaking changes, migration story, ecosystem/library support, when v4 stable is expected. Decide: adopt v4, adopt v3, or skip Effect entirely (plain TypeScript + async/await is the honest baseline to compare against).
- **Architecture sketch** for the main process, mapped to the locked decisions:
  - Services: SMTP sender (nodemailer), SQLite repository, job runner (send/generate), template pipeline
  - `Schedule` for the retry policy: 3x exponential backoff 1s/2s/4s, then pause with resume-from-cursor
  - `Stream` for per-recipient send progress → renderer via `webContents.send` (this feeds ticket 07's process model)
  - Typed errors: GenerateError / SendError equivalents; how they serialize across IPC
  - Lifecycle: how Effect fibers interact with Electron app quit (cursor persistence per send)
- **Tradeoff honesty**: is Effect worth it here, or does it add complexity the app doesn't need? Size, build implications, learning curve.

Context: local-only desktop app, single user, batch sends of hundreds of emails; job runner must survive app restarts via SQLite cursor. Existing CLI in `src/` is plain TypeScript — that's the baseline the recommendation is measured against.

## Answer

**Verdict: build on Effect v3 (stable, currently 3.22.1, published 2026-07-30) now; do not build the initial implementation on the v4 beta; adopt v4 after it reaches stable via the official migration guide.**

**Decision update (2026-08-02, user overrides the research verdict):** pin the **Effect v4 beta** (latest `4.0.0-beta.x`, currently beta.102 — exact version pinned in the lockfile at implementation). Consequence: accept API churn (the service API was renamed 3x during the beta), use the v4 syntax variants noted below (`Context.Service`, `effect/unstable/sql`), and treat v3 (3.22.1 stable) as the documented fallback if the beta blocks progress. The v3→v4 migration guide + codemods exist, so this decision is reversible without a rewrite.

Plain TypeScript remains the honest baseline and is defensible for a single-user batch app, but the four locked resilience decisions (retry schedule, persisted pause/resume, progress stream to renderer, quit-safe cursor persistence) are exactly the four things Effect's primitives make correct by construction, so Effect earns its place here.
v4 beta is not a quality problem — it is a moving-target problem: the API surface itself has been renamed during the beta (the service-definition API went `Effect.Service` → `ServiceMap.Service` → `Context.Service` between February and April 2026 alone).

**Why not v4 beta (state as of 2026-08-02).**

v4 has been in beta since 2026-02-18 and is at `4.0.0-beta.102` (published 2026-07-26) — about 5 months and 100 betas in, still moving fast.
The Effect team's own guidance is explicit: "If you're running Effect in production, v3 remains our recommended choice for now" ([v4 beta release post](https://effect.website/blog/releases/effect/40-beta/)).
No stable-version ETA has been announced anywhere — the weekly "This Week in Effect" posts through late June 2026 contain no timeline ([2026-06-26 post](https://effect.website/blog/this-week-in-effect/2026/06/26/)).
v4's payoff is real: a rewritten runtime, and a minimal Effect+Stream+Schema program dropping from ~70 kB (v3) to ~20 kB (core ~6.3 kB gzipped) — but bundle size is nearly irrelevant in the Electron main process, where node_modules ship as-is.
The risk is beta churn: breaking changes between beta releases are documented per release; `effect/unstable/*` modules (SQL, HTTP, RPC, CLI, workflows — 17 modules) "may receive breaking changes in minor releases"; early adopters have hit ecosystem friction (Drizzle needed [runtime patches for v4](https://github.com/drizzle-team/drizzle-orm/pull/5484); Val Town's Tom MacWright has publicly deferred migration).
The migration story is explicitly designed to be mechanical: the core model (Effect, Layer, Schema, Stream) is unchanged; the changes are package organization, unified versioning, and renames (Either→Result, Schema.Literal→Literals, TaggedError→TaggedErrorClass, accessors:true removed, .Default→.layer), with an official [v3→v4 migration guide](https://github.com/Effect-TS/effect/blob/main/MIGRATION.md) plus codemods in progress.
Work written against v3 today transfers with a mechanical pass — it is not wasted.

**Ecosystem on v4 (mid-2026, verified via npm registry 2026-08-02):** all packages now share one version number and release together — `effect`, `@effect/platform-node`, `@effect/sql-sqlite-node` are all at `4.0.0-beta.102`.
Core platform/RPC/cluster functionality was consolidated into the `effect` package; SQL core lives in `effect/unstable/sql`, drivers stay separate (`@effect/sql-sqlite-node@4.0.0-beta.102` peer-depends only on `effect`).
`@effect/experimental` has no beta — v3-only for now.
v3 receives active maintenance plus a feature freeze (bug fixes/security continue; new features only in v4), and v3 remains supported after v4 stabilizes (maintenance schedule to be published).
SQLite on v3 is the settled path: `@effect/sql-sqlite-node@0.53.0` (better-sqlite3-backed).

**Architecture sketch (v3 syntax; v4 equivalents noted).**

Services — `Effect.Service<"X">` (v3) / `Context.Service<"X">` (v4 beta.102) class-style keys with a static `layer`, composed in one main-process `Layer`:
- `SmtpSender` — wraps nodemailer: `send(recipient, message): Effect<void, SendError>`; the transporter is built in the layer's `make` and released on layer close; SendError is a tagged error (`_tag: "SendError"` plus discriminants Auth/Network/Timeout/InvalidRecipient and recipient id).
- `SqliteRepo` — better-sqlite3 wrapped directly in a service (simplest), or `@effect/sql-sqlite-node` on v3 / `effect/unstable/sql-sqlite` on v4; owns `jobs`/`job_runs` tables and `persistCursor(jobId, cursor)`.
- `TemplatePipeline` — generate-then-send gate: `generate(): Effect<Attachment, GenerateError>`; GenerateError stays distinct from SendError so the two locked failure domains never blur.
- `JobRunner` — the orchestrator below.
- `ProgressHub` — a `Hub<ProgressEvent>`/Topic every sender writes to; subscribers derive their own streams (feeds ticket 07's process model).

Retry — `SendError` retried with `Schedule.exponential("1 second", 2).pipe(Schedule.times(3))` = 3 retries at 1s/2s/4s, 4 attempts total (the locked "3x retry 1s/2s/4s"; "3 attempts" vs "3 retries" is a one-line change).
On final failure, `catchTag("SendError", ...)` transitions the job to a persisted `paused` state: cursor stays where it is, job status row updated, renderer notified, and the job fiber awaits a resume signal (Latch/Deferred) or restart.
Pause is a first-class persisted state, not a thrown error — exactly the locked pause-with-resume decision.

Progress — `JobRunner` writes `ProgressEvent { jobId, cursor, recipient, result }` to the Hub; the main process subscribes with a bounded queue (e.g. 256) and forwards each event to the renderer via `webContents.send("job-progress", envelope)`.
Backpressure: the send loop never blocks on the renderer — if the renderer is slow, the bounded queue drops oldest events (progress is lossy-tolerant; the authoritative cursor is in SQLite, and the renderer can request a snapshot event on subscribe to catch up).
`Stream.broadcastN` (new in v4) or Hub (v3) serve multiple subscribers (UI + log).

Typed errors across IPC — error definitions: `Data.TaggedError` (v3) / `Schema.TaggedErrorClass` (v4).
Across IPC, serialize a curated envelope, not the Effect Cause: `{ ok, data?, error?: { _tag: "GenerateError" | "SendError" | "JobError", message, jobId?, recipient? } }`, encoded with Schema at the boundary, decoded on the renderer, switched on `_tag` for UI.
Structured-clone IPC preserves the envelope as plain JSON; the full Cause stays in main-process logs.

Lifecycle / quit — one `Runtime` in the main process (v4: `Runtime.runMainWith` + services), layers installed once.
Quit path: `app.on("before-quit")` → signal a shutdown `Latch` → the job fiber checks it between recipients; the in-flight SMTP call is interruptible, and the cursor persist runs in an uninterruptible critical section right after each send (per-recipient atomicity: send → persist → emit), so a quit at any moment loses at most the in-flight recipient; resume-from-cursor covers it on next launch.
After the latch, run the runtime shutdown, then `app.exit()`.
`Effect.acquireRelease`/finalizers keep listener registration leak-free (the pattern used by desktop Effect codebases such as Land).

**Tradeoff honesty.**

What Effect buys for this specific app: (1) the retry schedule is one correct line instead of a hand-rolled loop; (2) streams give progress plumbing with backpressure without custom emitter code; (3) typed errors force distinct handling of generate vs send failure — the two locked error domains; (4) structured concurrency makes quit-safe cancellation (the subtle part of this app) tractable; (5) `TestClock` tests the 1s/2s/4s retry timing deterministically.
What it costs: a real learning curve (Schedule, Stream, Layer are new concepts), type-level noise, one non-trivial dependency, and fighting the model for trivial things.
Bundle size is a non-issue in the main process; keep Effect out of the renderer entirely (React side stays dependency-free).
Plain TypeScript + async/await plus ~150 lines of hand-rolled retry/pause/stream/shutdown code is a genuinely defensible alternative and is the honest baseline: if the user wants minimal dependencies and maximum velocity, choose plain TS.
But the resilience requirements here are not simple (pause-with-resume, per-recipient atomicity, quit safety), and that is precisely where hand-rolled code gets subtle — Effect v3 converts those subtleties into library semantics at the price of the learning curve.
Recommendation: Effect v3, main-process only, SQLite via better-sqlite3 wrapped in a service; adopt the v4 SQL modules later with the rest of v4.

**Open questions for the user.**

1. Accept the v3-first plan (recommended) with a mechanical v3→v4 migration later, or take the v4 beta now (pin exact beta version, review each bump)? v4 beta only if the user personally accepts churn on a local tool.
2. Is the Effect learning curve acceptable, or is plain TypeScript preferred for maximal simplicity? (Both are on the table; Effect v3 is the recommendation.)
3. Confirm Effect stays main-process-only (renderer stays plain React).
4. SQLite: wrap better-sqlite3 in a service (simplest) vs adopt @effect/sql-sqlite-node v3 now (free migrations/tracing).
5. Progress delivery policy: drop-oldest bounded queue (send loop never blocked; renderer may skip events) vs strict backpressure (send loop throttled by renderer) — matters for ticket 07's process model.

Sources: [Effect v4 Beta release post](https://effect.website/blog/releases/effect/40-beta/), [Effect v4 Beta: February–May Recap](https://effect.website/blog/effect-v4beta-launch-to-may-recap/), [v3 to v4 Migration Guide](https://github.com/Effect-TS/effect/blob/main/MIGRATION.md), [Schema v4 Migration Guide](https://github.com/Effect-TS/effect/blob/main/packages/effect/SCHEMA.md), [This Week in Effect 2026-06-26](https://effect.website/blog/this-week-in-effect/2026/06/26/), [InfoQ: Effect v4 Beta](https://www.infoq.com/news/2026/04/effect-v4-beta/), npm registry dist-tags and package metadata for effect / @effect/sql-sqlite-node / @effect/platform-node / @effect/experimental (checked 2026-08-02), [drizzle-orm v4 compatibility PR #5484](https://github.com/drizzle-team/drizzle-orm/pull/5484).

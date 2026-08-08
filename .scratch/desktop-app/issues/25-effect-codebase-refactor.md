# 25 - Effect codebase refactor

**What to build:** Bring the main process to consistent Effect 4 idioms, driven with the effect-ts skill: typed errors everywhere (no `throw` or raw promises inside services), `Effect.Schema` on every IPC boundary (already done for most handlers - make it all), Layers for dependency injection instead of module singletons, and structured concurrency in the send/generate job fibers (the deepest Effect code in the app). Behavior must not change: the existing unit and Layer-seam suites staying green is the proof.

**Blocked by:** 22 - Drizzle migration

**Status:** done

- [x] Main-process services audited with the effect-ts skill; no raw throw / promise inside services
- [x] Every IPC handler Schema-decodes and Schema-encodes at the boundary
- [x] Layers replace module singletons; job fibers use structured concurrency
- [x] Full suite green, behavior unchanged

## Answer

Verified end to end on 2026-08-08:

- Seam A: the full vitest suite stays green, 169 tests in 12 files (behavior unchanged - the suite is the proof); typecheck (node + web) and oxlint clean

Audit outcome (effect-ts skill, vendored source at `.repos/effect` added via `scripts/prepare-effect.sh` + gitignore + desktop `prepare` script):

- Already idiomatic before this ticket: `db/repository.ts` (all statements in `Effect.sync`, `Context.Service` + `Live`), `smtp.ts`/`import.ts`/`recipients.ts`/`settings.ts`/`templates.ts` (`Data.TaggedError` + `Layer.provideMerge`), the shared IPC contract (every payload/response a Schema), and every service-backed handler in `index.ts` (decode at the boundary, `Schema.encodeSync` responses, `Effect.runPromise` with the root layer)
- Fixed in this ticket:
  - `uniquePath` (generate-jobs.ts) threw a raw `Error` from inside `Effect.gen` - a name-budget exhaustion defected the whole job. Now returns `string | null`; both callers fail that recipient with the same `generateJob.noFreeFileName` message and the batch continues
  - `fillDocx` (docx fill loop) and `scanDocxSlots` (templates) used raw `try/catch` inside service code - now `Effect.try` + `Result`, identical messages and control flow
  - `ProgressHub.Live` eagerly constructed the hub at module load (`Layer.succeed(ProgressHub, makeProgressHub())`) - now `Layer.sync`, constructed at layer build time
  - `GenerateEnv`/`SendEnv` were factory-function DI (`realGenerateEnv(settings)`, `realSendEnv()`); LibreOffice detection and the DOCX-to-PDF conversion were a plain module function, not a service. New `LibreOfficeService` (find + batch conversion, `LibreOfficeFailed` moved there, re-exported from generate-jobs so test imports keep working), `GenerateEnvService` (builds the env from LibreOffice + Settings), `SendEnvService` (owns the quit latch). All three are `Context.Service` classes with `Live` layers; the factory test seams (`makeGenerateJobService(repo, hub, env)`, `makeSendJobService(repo, hub, generate, smtp, env)`) are unchanged
  - The five `system:*` IPC handlers that bypassed the layer and the schemas now encode at the boundary: `system:check-libreoffice` runs through `LibreOfficeService` in the layer, and the three `system:pick-*` dialogs encode their `string | null` result with the new `PickPathResponse` schema
  - Job fibers already used Effect structured concurrency (Latch-based pause/cancel/quit wake, `Effect.race` at the pacing gate, `Result` per-recipient outcomes, TestClock-deterministic sleeps) - unchanged

One architectural correction found by the code review (five-axis, parallel agents):

- Effect 4.0.0-beta.102 rebuilds a layer on EVERY `Effect.provide` call - the boot-time progress forwarder and each IPC handler's job run got distinct service instances, so `Layer.sync` (correct per the guides) silently broke progress-event delivery, and the pre-existing wiring had the same flaw for the send service's in-memory pause/cancel control. `index.ts` now builds the service graph ONCE (`Layer.buildWithScope(layer, scope)` under a held `Scope.make()`) and every program - boot sequence, all IPC handlers, the progress forwarder - runs against that context (`Effect.provideContext`). Verified empirically: one instance across programs (hub and SendJobService identity shared), and the full suite stays green. This also fixes the latent pause/cancel-wake and quit-latch seams: ticket 17's quit wiring must run against the same context to open the latch the run loop checks
- Also from the review: the image path's `writeFileSync` (and the pre-existing `renameSync` in the docx path) could defect the whole job on a disk error - both now wrapped in `Effect.try` + `Result`, failing only that recipient

Deviations from the ticket text, all deliberate:

- "Layers replace module singletons" is implemented as "services are layered, and the service graph is built once at boot and shared via a context": in the pinned beta, per-call layer construction is the anti-pattern for stateful services (progress hub, pause control, quit latch), so the shared-context wiring is the Effect-idiomatic expression of the intent. `Layer.sync`/`Layer.succeed` remain as the per-service constructors
- The ticket's "job fibers use structured concurrency" was already satisfied (Latch/race/Result/checkpoint design from ticket 15); the review's context fix is what actually keeps those fibers coordinated across IPC calls
- The `prepare` script clones Effect `main` unpinned, per the effect-ts skill's mandated setup shape (the user chose the local-clone option); the vendored source is research-only, the app pins `effect@4.0.0-beta.102`
- The `system:*` dialogs stay promise-based (Electron boundary adapters, not services) but their responses now Schema-encode like every other handler

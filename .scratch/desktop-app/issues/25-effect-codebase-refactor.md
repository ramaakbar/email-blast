# 25 - Effect codebase refactor

**What to build:** Bring the main process to consistent Effect 4 idioms, driven with the effect-ts skill: typed errors everywhere (no `throw` or raw promises inside services), `Effect.Schema` on every IPC boundary (already done for most handlers - make it all), Layers for dependency injection instead of module singletons, and structured concurrency in the send/generate job fibers (the deepest Effect code in the app). Behavior must not change: the existing unit and Layer-seam suites staying green is the proof.

**Blocked by:** 22 - Drizzle migration

**Status:** ready-for-agent

- [ ] Main-process services audited with the effect-ts skill; no raw throw / promise inside services
- [ ] Every IPC handler Schema-decodes and Schema-encodes at the boundary
- [ ] Layers replace module singletons; job fibers use structured concurrency
- [ ] Full suite green, behavior unchanged

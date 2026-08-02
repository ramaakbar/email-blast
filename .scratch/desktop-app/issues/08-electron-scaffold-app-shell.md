# 08 — Electron scaffold & app shell

**What to build:** A `pnpm dev` run opens a native window showing the app shell: a sidebar with the six routes (Import, Recipients, Templates, Compose, Logs, Settings) and a routed content area. The preload exposes the `window.api` skeleton with `API_VERSION` dev-asserted equal between preload and main. The toolchain (typecheck, lint, format, unit tests) is configured and green.

**Blocked by:** None — can start immediately.

**Status:** done

- [x] `pnpm dev` opens a window with the sidebar and a working route tree (`/` redirects to `/recipients`); every route renders an empty placeholder
- [x] Security baseline: `sandbox: true`, contextIsolation on, nodeIntegration off, no remote content; preload exposes exactly the skeleton API (no wildcard passthrough, no channel strings in the renderer)
- [x] `API_VERSION` constant in the shared module, dev-asserted equal between preload and main
- [x] `pnpm typecheck`, `pnpm lint`, `pnpm fmt`, and `pnpm test` all pass
- [x] `pnpm build:unpack` produces a launchable unsigned app (ad-hoc identity on macOS)
- [x] Seam A: a smoke test proves the Effect runtime initializes in the main process (one service layer composing and resolving)

## Answer

Implemented in `email-blast-desktop/` (commit `b4369e5`), scaffolded with the ticket 01 recipe: `@quick-start/electron` react-ts template, Electron 43.2.0, electron-vite 5.0.0, electron-builder 26.15.3, React 19 + TanStack Router/Query/Table + Tailwind v4 + shadcn (zinc) + lucide, oxlint/oxfmt/vitest, `effect@4.0.0-beta.102` pinned exactly.

Verified end to end on 2026-08-02:
- `pnpm dev` and the packaged app both launch; sidebar + all seven routes render, `/` redirects to `#/recipients` (hash history is required for `file://` loads in packaged builds), one nav item highlighted per route
- `window.api.system.ping()` returns `{ pong: true, apiVersion: 1 }` through the sandboxed preload; the dev handshake asserts preload/main `API_VERSION` agreement and re-fires on every renderer load (stale-bundle guard)
- Seam A vitest smoke test passes; typecheck/lint/fmt green
- `pnpm build:unpack` produces `dist/mac-arm64/Email Blast.app`, ad-hoc signed (`identity: "-"`, `hardenedRuntime: false`), launched and verified

Deviations from the spec, both deliberate:
- `API_VERSION` and the `IPC` channel constants live in `src/shared/ipc-channels.ts` (zero-dependency) and are re-exported from `src/shared/ipc.ts`: the sandboxed preload cannot load external modules, so `effect` (needed by the schemas in `ipc.ts`) must stay out of the preload bundle
- Hash history (`createHashHistory`) instead of history-push state: `location.pathname` on a `file://` URL is the absolute file path and never matches a route

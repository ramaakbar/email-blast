# 08 — Electron scaffold & app shell

**What to build:** A `pnpm dev` run opens a native window showing the app shell: a sidebar with the six routes (Import, Recipients, Templates, Compose, Logs, Settings) and a routed content area. The preload exposes the `window.api` skeleton with `API_VERSION` dev-asserted equal between preload and main. The toolchain (typecheck, lint, format, unit tests) is configured and green.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [ ] `pnpm dev` opens a window with the sidebar and a working route tree (`/` redirects to `/recipients`); every route renders an empty placeholder
- [ ] Security baseline: `sandbox: true`, contextIsolation on, nodeIntegration off, no remote content; preload exposes exactly the skeleton API (no wildcard passthrough, no channel strings in the renderer)
- [ ] `API_VERSION` constant in the shared module, dev-asserted equal between preload and main
- [ ] `pnpm typecheck`, `pnpm lint`, `pnpm fmt`, and `pnpm test` all pass
- [ ] `pnpm build:unpack` produces a launchable unsigned app (ad-hoc identity on macOS)
- [ ] Seam A: a smoke test proves the Effect runtime initializes in the main process (one service layer composing and resolving)

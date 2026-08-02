# 01: Electron scaffold — Vite+ or electron-vite

Type: research
Status: resolved

## Question

The user wants "vite-plus" for the Electron scaffold. Pin down what Vite+ actually is (candidates: voidzero-dev/vite-plus, npm `vite-plus` / `@tiara-stack/vite-plus` — a unified toolchain bundling Vite, Vitest, Oxlint, Oxfmt, Rolldown, tsdown; or the user may mean electron-vite) and whether it can scaffold and build an Electron app: main + preload + renderer bundles, dev server with HMR, and packaging for distribution.

If Vite+ has a genuine Electron recipe, verify it end-to-end and detail it. If it does not, recommend the closest path that does (electron-vite is the likely candidate) and say so plainly — the user's preference is Vite+ if it works, otherwise the best verified recipe.

Deliver, mirroring the recipe format of `archive/tauri-era/issues/02-tauri-scaffold-answer.md`:

- What Vite+ is and its Electron story (or an explicit "no Electron story" verdict)
- A concrete step-by-step scaffold recipe: Electron + React + TypeScript + pnpm, Mac + Windows, main/preload/renderer structure, contextIsolation + sandbox on
- Packaging: electron-builder vs Electron Forge vs Vite+ `vp pack`; code signing (Mac notarization, Windows) — decide now or defer
- Native module story: better-sqlite3 and @electron/rebuild, if the survey (ticket 03) touches it
- Where oxlint/oxfmt fit (Vite+ bundles both)

Cross-check the existing `src/` CLI so the recipe matches what the app will actually do (file I/O, SQLite, SMTP, PDF generation — all main-process concerns).

Context: local-only desktop app, mixed Mac + Windows, React + TanStack + Tailwind + shadcn renderer, all business logic in the main process. The old Tauri-era scaffold ticket (archived) is the format reference. Existing Bun CLI in `src/` is the code reference.

## Answer

**Decision update (2026-08-02, user):** confirmed electron-vite (plain Vite) over the literal Vite+ toolchain; oxlint + oxfmt as standalone packages; vitest added for the test setup (electron-vite supports it). Also confirmed: React, TanStack Router/Query/Table, Tailwind v4, shadcn/ui, pnpm — matching the previous Tauri-era stack.

### Verdict

"vite-plus" resolves to two unrelated things, and neither scaffolds Electron, so the recipe below uses **electron-vite** (alex8088), the verified Electron + Vite toolchain.

- **Vite+** (voidzero-dev/vite-plus; npm `vite-plus` 0.2.7; docs at viteplus.dev) is "The Unified Toolchain for the Web".
  It bundles Vite, Vitest, Oxlint, Oxfmt, Rolldown, tsdown and Vite Task into one CLI (`vp`) with runtime and package-manager management plus monorepo task caching.
- **@tiara-stack/vite-plus** (0.2.4) is a fork of the same project (same `vp`/`vpr`/`oxfmt`/`oxlint` bins, repo tiara-stack/native-tooling) with zero dependents.
  It is not relevant.
- Most plausible user intent: "vite-plus" is shorthand for electron-vite (github.com/alex8088/electron-vite), i.e. "Vite for Electron".
  The same verdict applies under either reading.

**Verdict: use electron-vite** (stable 5.0.0 as of 2026-08-02) with **electron-builder** (26.15.3) for packaging.
Vite+ has no Electron story, and adopting it would conflict with electron-vite (section 1.4).
The user still gets Vite+'s quality tools, oxlint and oxfmt, as standalone packages (section 5).

### 1. What Vite+ is, and its (missing) Electron story

1.1 Vite+ is a general web toolchain: `vp create` scaffolds `vite:monorepo`, `vite:application`, `vite:library` and `vite:generator`, plus community shorthands (vite, react-router, svelte, nuxt, next-app, vue, @tanstack/start) and arbitrary npm create packages.
No Electron template exists anywhere in the documented list.

1.2 `vp dev` runs a plain web dev server.
There is no main/preload/renderer concept.

1.3 `vp pack` builds npm libraries via tsdown, and "standalone app binaries" via tsdown's `exe` option, which is Node.js Single Executable Applications (requires Node 25.7+).
Those are Node CLIs, not Electron app binaries.

1.4 Adopting Vite+ also conflicts with electron-vite: Vite+ expects the project to alias `vite` to `@voidzero-dev/vite-plus-core` via overrides, while electron-vite 5 declares `vite` (`^5 || ^6 || ^7`) as a peer dependency.
The combination is undocumented and untested.
`vp create` can pass through to `@quick-start/electron`, but the result would still need plain vite for electron-vite, so that path buys nothing.

### 2. electron-vite: the verified recipe

Verified versions as of 2026-08-02: electron-vite 5.0.0 (stable; v6.0.0-beta exists since 2026-04, do not use), Electron 43.2.0 (stable), electron-builder 26.15.3, @quick-start/create-electron 1.0.30.

#### 2.1 Prerequisites

- Node.js 22 LTS (electron-vite 5 / Vite 7 need Node 20.19+ or 22.12+; pnpm 10 needs Node 18+)
- pnpm via corepack: `corepack enable && corepack prepare pnpm@latest --activate`
- Xcode Command Line Tools on macOS: `xcode-select --install`

#### 2.2 Scaffold

```bash
pnpm create @quick-start/electron@latest
```

Prompts:

| Prompt | Answer |
|--------|--------|
| Project name | `email-blast-desktop` |
| Select a framework | `React` |
| Add TypeScript? | `Yes` |
| Add Electron updater plugin? | `No` (local app, no update server) |
| Enable Electron download mirror proxy? | `No` |

Non-interactive form: `pnpm create @quick-start/electron email-blast-desktop --template react-ts`

#### 2.3 What it produces

```
email-blast-desktop/
  package.json            # main: ./out/main/index.js; scripts: dev, build, start,
                          #   build:mac, build:win, postinstall: electron-builder install-app-deps
  electron.vite.config.ts # main / preload / renderer sections
  electron-builder.yml    # appId, productName, files exclusions
  tsconfig.json, tsconfig.node.json, tsconfig.web.json
  src/
    main/index.ts         # Electron main: app lifecycle, BrowserWindow, ipcMain
    preload/index.ts      # contextBridge API + index.d.ts typings
    renderer/index.html   # Vite entry
    renderer/src/         # React app (App.tsx, main.tsx, ...)
  resources/icon.png      # app icon
```

`pnpm install` and `pnpm dev` open a native window immediately.
Renderer changes get instant HMR.

#### 2.4 pnpm setup (gotchas, verified 2026)

- pnpm 10+ blocks dependency build scripts by default, so the `electron` binary never downloads.
  Fix: `pnpm approve-builds` and allow `electron` (adds `onlyBuiltDependencies: [electron, ...]` to `pnpm-workspace.yaml`; source: pnpm.io/settings).
- Keep the template's `postinstall: electron-builder install-app-deps`.
- If packaging ever fails with missing modules, the documented fallback is `node-linker=hoisted` in `.npmrc`; the electron-vite stack is pnpm-first and normally does not need it.

#### 2.5 Security defaults: sandbox on

The template sets `sandbox: false` in the BrowserWindow webPreferences.
This project requires `sandbox: true` (contextIsolation is already on by default since Electron 12, and enforced since Electron 20).
Remove `sandbox: false`; electron-vite bundles the preload into a single file, so the preload works under sandbox (sandboxed preloads get only a polyfilled `require` with `events`/`timers`/`url` plus Electron renderer modules).
Never `import` Node modules directly in preload source; electron-vite bundles them.

#### 2.6 electron.vite.config.ts

The template's config is already correct:

```ts
export default defineConfig({
  main: {},       // defaults: externalize node deps via externalizeDepsPlugin
  preload: {},
  renderer: {
    plugins: [react()],   // add tailwindcss(), tanstackRouter() here
    resolve: { alias: { '@renderer': resolve('src/renderer/src') } }
  }
})
```

Use `externalizeDepsPlugin()` in `main`/`preload` (the template applies it) so runtime dependencies stay in `node_modules` instead of being bundled; native modules like better-sqlite3 require this.

#### 2.7 Dev workflow and HMR

- `pnpm dev` = `electron-vite dev`: builds main/preload to `out/`, starts the renderer dev server, launches Electron.
- Renderer: true HMR, instant.
- Main process: hot reloading via `electron-vite dev --watch` (rebuild + restart Electron on change).
- Preload: rebuild + renderer reload on change.
- Hot reloading is development-only by design; the docs recommend the `--watch` flag over config.

#### 2.8 Renderer stack

Tailwind v4, shadcn/ui, TanStack Router/Query/Table setup is unchanged from the archived Tauri answer (sections 4-6 of archive/tauri-era/issues/02-tauri-scaffold-answer.md): `pnpm add tailwindcss @tailwindcss/vite`, add the plugin to `renderer.plugins`, `pnpm dlx shadcn@latest init`, `pnpm add @tanstack/react-router @tanstack/react-query @tanstack/react-table` plus `@tanstack/router-plugin`.

#### 2.9 Main-process architecture (cross-check against existing `src/` Bun CLI)

Everything the current CLI does moves into `src/main/` behind `ipcMain.handle` calls; the renderer talks only through the preload contextBridge API:

| Current CLI dep (verified in src/) | Electron role |
|------------------------------------|---------------|
| `xlsx` (send-email.ts, index.ts) | Excel recipient import/read, main process |
| `docxtemplater` + `pizzip` (index.ts) | DOCX letter generation, main process |
| `pdf-lib` + `@pdf-lib/fontkit` (generate-certif.ts) | Certificate PDFs, main process |
| `nodemailer` (index.ts, send-email*.ts) | Gmail SMTP send, main process |
| `cli-progress` | Replaced by renderer progress UI |
| `elysia` (local web server) | Replaced by the Electron window |
| `libreoffice-convert` + `soffice` | DOCX-to-PDF conversion; requires the LibreOffice binary at runtime (packaging concern for ticket 03, do not bundle silently) |

All of these are pure JS except the LibreOffice runtime dependency, so nothing here blocks the scaffold.

### 3. Packaging: electron-builder, and code signing

3.1 Recommendation: **electron-builder** (26.15.3).
The official electron-vite scaffold ships it (postinstall script, `build:mac`/`build:win` scripts, `electron-builder.yml`), it has native macOS notarization and Windows Authenticode signing integration, and it covers every target this app needs: `dmg`+`zip` on macOS (default), `nsis`/`portable` on Windows, `dir` for local testing.

3.2 Electron Forge is the official Electron tool, but its Vite plugin does renderer-only HMR, needs its own per-target vite config files and `*_DEV_SERVER_URL` globals, and duplicates electron-vite's job.
Mixing Forge + electron-vite is not a documented path.
Forge is not the right fit here.

3.3 Vite+ `vp pack` is not an Electron packager (section 1.3).
Out of scope.

3.4 Build commands (template defaults, verified in the react-ts playground package.json):

```bash
pnpm build        # typecheck + electron-vite build -> out/{main,preload,renderer}
pnpm build:mac    # electron-builder --mac      (dmg + zip)
pnpm build:win    # electron-builder --win      (nsis)
pnpm build:unpack # electron-builder --dir      (unpacked, local testing)
```

Set `appId: com.emailblast.desktop` and `productName` in `electron-builder.yml`.
Windows installers must be built on Windows (or CI), macOS on macOS.

3.5 Code signing: **defer**.
This is a local single-user app with no distribution channel yet, so unsigned builds are fine for now.
When distribution starts: macOS needs a Developer ID Application certificate plus notarization (electron-builder `notarize: true` with `APPLE_ID`/`APPLE_APP_SPECIFIC_PASSWORD`/`APPLE_TEAM_ID` or the `APPLE_API_KEY` trio); Windows needs an Authenticode certificate (`WIN_CSC_LINK` + `WIN_CSC_KEY_PASSWORD`, or Azure Trusted Signing via `sign.type`).
Local gotcha: disabling signing on macOS while Hardened Runtime stays on can prevent launch, so use ad-hoc identity (`identity: "-"`) or `hardenedRuntime: false` for unsigned local builds.

### 4. Native modules: better-sqlite3 and @electron/rebuild

better-sqlite3 v13 (13.0.2) is now a Node-API module: `gypfile: false`, `node-addon-api ^8`, platform prebuilds shipped inside the npm package (`prebuilds/**`, per-platform `lib/*.js` entries), engines `node >= 22` (Electron 43 bundles Node 22).
Node-API is ABI-stable across Node and Electron, so better-sqlite3 loads in the Electron main process without any rebuild in the common case.
Keep the template's `postinstall: electron-builder install-app-deps` anyway as the standard safety net (it runs @electron/rebuild under the hood; Electron's docs recommend "@electron/rebuild first" when a native module misbehaves, and Forge runs it automatically).
If a future dependency is NAN-based (has an install script and binding.gyp), `@electron/rebuild` (or `electron-builder install-app-deps`) is the standard fix.

### 5. Where oxlint/oxfmt fit

Vite+ bundles both, but they are standalone Oxc tools, so install them directly:

```bash
pnpm add -D oxlint oxfmt
```

Add `lint`/`fmt` scripts and `.oxlintrc.json` exactly as in the archived Tauri answer's section 6 (ignore `out/` and `src/renderer/src/routeTree.gen.ts`).
This delivers the Vite+ lint/format experience without adopting Vite+ itself.

### 6. Verification

```bash
pnpm install
pnpm dev            # window opens, HMR works
pnpm typecheck
pnpm build          # out/main, out/preload, out/renderer
pnpm build:unpack   # packaged app in dist/ (unsigned, local)
```

### 7. Known issues and gotchas

| Issue | Handling |
|-------|----------|
| Electron binary not downloaded under pnpm 10+ | `pnpm approve-builds`, allow `electron` (onlyBuiltDependencies in pnpm-workspace.yaml) |
| Template pins `electron ^39.2.6` (outside support window) | Bump to `electron@^43`; as of 2026-08-02 the supported majors are 41/42/43 |
| Template sets `sandbox: false` | Set `sandbox: true`; electron-vite bundles the preload so it still works |
| Main-process changes do not hot-update | By design; use `electron-vite dev --watch` for rebuild + restart |
| Unsigned macOS build fails to launch | Ad-hoc `identity: "-"` or `hardenedRuntime: false` |
| Native module ABI | better-sqlite3 v13 is Node-API, no rebuild; keep install-app-deps; NAN modules need @electron/rebuild |
| soffice in current src/ CLI | External runtime binary; plan for it in ticket 03 (do not bundle silently) |
| Sandboxed preload module limits | Only events/timers/url + Electron renderer modules; electron-vite bundles preload deps |

### 8. Sources

- https://viteplus.dev/guide/ (Vite+ docs, Getting Started)
- https://viteplus.dev/guide/create (vp create templates)
- https://viteplus.dev/guide/pack (vp pack, standalone executables = Node SEA)
- https://github.com/voidzero-dev/vite-plus (README: bundled tools, overrides, oxlint/oxfmt bins)
- https://www.npmjs.com/package/vite-plus (voidzero local package, 0.2.7)
- https://www.npmjs.com/package/@tiara-stack/vite-plus (fork, 0.2.4)
- https://electron-vite.org/guide/ (scaffold, entry point, CLI)
- https://electron-vite.org/guide/dev (sandbox/preload limitations)
- https://electron-vite.org/guide/build (out/ structure)
- https://electron-vite.org/guide/hmr-and-hot-reloading (--watch, hot reloading)
- https://electron-vite.org/config/ (built-in defaults)
- https://github.com/alex8088/electron-vite/releases (v5.0.0, v6 beta)
- https://www.npmjs.com/package/@quick-start/create-electron (react-ts template)
- https://github.com/alex8088/quick-start/tree/master/packages/create-electron/playground/react-ts (template package.json, electron-builder.yml, src/main/index.ts)
- https://www.electron.build/docs/mac (targets, notarization env vars)
- https://www.electron.build/docs/win (signing options)
- https://www.electronjs.org/docs/latest/tutorial/using-native-node-modules (@electron/rebuild, prebuild)
- https://github.com/WiseLibs/better-sqlite3 (v13.0.2 package.json: gypfile false, node-addon-api, prebuilds)
- https://pnpm.io/settings (onlyBuiltDependencies)
- https://www.electronforge.io/config/plugins/vite (Forge Vite plugin, renderer-only HMR)

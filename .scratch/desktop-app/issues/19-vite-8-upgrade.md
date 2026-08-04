# 19 - Vite 8 upgrade

**What to build:** Upgrade the build toolchain from Vite 7 (`vite ^7.2.6`) to Vite 8. The gate for this ticket is compat research against primary sources: which electron-vite version supports Vite 8 (currently `electron-vite ^5.0.0`), whether the renderer plugins (`@vitejs/plugin-react`, `@tailwindcss/vite`, `@tanstack/router-plugin`) are Vite 8-compatible, and whether the Electron Forge Vite plugin (which ticket 20 will use) supports Vite 8 - that last result decides whether 20 pins to the same Vite version. Then upgrade, update configs for any API changes, and prove the whole chain green: typecheck, lint, vitest, dev, build, and an E2E smoke run. Blocks the tickets that need the new toolchain (18, 20, 24).

**Status:** done

- [x] Compat research recorded: electron-vite, renderer plugins, and the Forge Vite plugin vs Vite 8 (primary sources)
- [x] Vite 8 + matching electron-vite installed; dev, preview, and build all work
- [x] Renderer plugins verified compatible (react, tailwind, router)
- [x] typecheck, lint, vitest, and an E2E smoke run all green on the new toolchain

## Answer

**Compat research (primary sources, 2026-08-04).**

- **Vite:** 8.0.0 stable shipped 2026-03-12; latest 8.2.0. Engines `^20.19.0 || >=22.12.0` (local node 24.19.0 OK). Vite 8 is ESM-only - no `main`/`require` export condition (Vite 7 still had `main`).
- **electron-vite:** stable 5.0.0 peer-caps at Vite 7 (`^5 || ^6 || ^7`); Vite 8 support exists only in 6.0.0-beta.1 (peer `^6 || ^7 || ^8`, published 2026-04-12; the changelog shows the Vite 8 work - environment API, rolldown/rollup options compat). No 6.0.0 stable ~4 months later. **SUPERSEDED BY USER DECISION**: do not use electron-vite at all - the Electron Forge Vite plugin (ticket 20's mechanism) became the Vite 8 vehicle, and this ticket was completed in one pass with ticket 20.
- **Renderer plugins (npm peer ranges):**
  - `@vitejs/plugin-react`: latest 5.x (5.2.0) peer includes `^8.0.0`; 6.0.5 requires `^8` plus rolldown babel peers. Stayed on 5.x - Vite 8 support with no new required peers.
  - `@tailwindcss/vite ^4.3.3`: peer `^5.2.0 || ^6 || ^7 || ^8` - unchanged.
  - `@tanstack/router-plugin`: peer `>=8.0.0` - unchanged.
  - `vitest 4.1.10`: depends on vite `^6 || ^7 || ^8` - unchanged.
- **Electron Forge Vite plugin (`@electron-forge/plugin-vite` 7.11.2):** consumes the app's own vite (`import { default as vite } from 'vite'`), calls only stable public APIs (`vite.build`, `vite.createServer`), no version pin. Vite 8's ESM-only layout works from the plugin's CJS loading on node >= 22.12 (require(esm)); the plugin sets `VITE_CJS_IGNORE_WARNING` for the loader warning. No official "Vite 8 supported" statement - the source still carries a Vite-6-era TODO comment, and Forge's own CI only moved to vite 6.4.3 (dependabot, merged 2026-06-28). **Verdict: pin the same Vite 8 for ticket 20** - confirmed empirically in this pass (dev, package, make, and the packaged smoke all run on vite 8.2.0).

**What changed (toolchain, all in `email-blast-desktop/`).**

- `vite ^7.2.6` → `vite ^8.2.0`; `@vitejs/plugin-react ^5.1.1` → `^5.2.0`; electron-vite 5.0.0 and electron-builder 26.15.3 removed entirely.
- `electron.vite.config.ts` → Forge's three configs: `forge.config.ts`, `vite.main.config.mjs`, `vite.preload.config.mjs`, `vite.renderer.config.mjs`.
- `src/main/index.ts`: the electron-vite env var `ELECTRON_RENDERER_URL` → the Forge-injected build-time globals `MAIN_WINDOW_VITE_DEV_SERVER_URL` / `MAIN_WINDOW_VITE_NAME`; preload path `join(__dirname, "preload.js")`; production renderer `loadFile(join(__dirname, "../renderer/${MAIN_WINDOW_VITE_NAME}/index.html"))`.
- `index.html` moved from `src/renderer/` to the project root with the script src retargeted to `/src/renderer/src/main.tsx` - the Forge plugin forces the renderer root to the project directory (electron-vite's `src/renderer` root no longer applies).
- Main/preload lib entries are objects (`{ main: ... }`, `{ preload: ... }`) so the bundles are `main.js`/`preload.js` - both source files are named `index.ts` and the plugin names output after the entry file, which would have made them collide on `index.js`.
- `@tanstack/router-plugin` gets explicit `routesDirectory: "src/renderer/src/routes"` - with the renderer root at the project dir its `src/routes` default pointed at nothing.

**pnpm config** (pnpm 11 reads settings from `pnpm-workspace.yaml`; only auth/registry come from `.npmrc`):

- `nodeLinker: hoisted` (in both `pnpm-workspace.yaml` and `.npmrc`) - Forge's packager walks the app's node_modules for runtime dependencies; it refuses to run otherwise. Forge's system check reads the `.npmrc` value, pnpm 11 links from the workspace value; both are set.
- `blockExoticSubdeps: false` - pnpm 10.26+ blocks exotic (git) subdeps by default; `@electron/rebuild` (a Forge CLI dependency) pulls `@electron/node-gyp` from a git repository. Trusted: the Electron org's own node-gyp fork.
- `allowBuilds: fs-xattr, macos-alias` - macOS packaging deps with build scripts (packager/dmg maker).

**Verification (all on vite 8.2.0, 2026-08-04):**

- typecheck (node + web), `oxlint src`, `oxfmt --check`, vitest 12 files / 161 tests - all green.
- `pnpm package` green: `.vite/build/main.js` + `preload.js`, `.vite/renderer/main_window/` (index.html + assets) all inside the packaged asar.
- Dev loop `pnpm dev` (= `electron-forge start`): renderer dev server starts, window loads the dev URL, the dev API_VERSION handshake fires ("preload and main agree"), no errors.
- `pnpm make` green: `Email Blast-1.0.0-arm64.dmg` (115MB) + zip.
- Packaged smoke (Playwright `_electron`, temp `--user-data-dir`, real dev DB untouched): the packaged app, the zip-extracted app, and the DMG-mounted app each launch, render the first-launch screen, answer the bridge ping (`pong`, apiVersion 1), round-trip app info (the AppInfo service, hardcoded for now), read a DB-backed setting ("1000" - the seeded default), and show zero renderer console errors. Script: `scripts/smoke-packaged.mjs` (reusable by ticket 18's suite).

**Deviation from the checklist wording:** "matching electron-vite installed; dev, preview, and build" - electron-vite is gone; the equivalents on the Forge toolchain are `dev`/`start` (`electron-forge start`), `package`, and `make` (the old `preview` had no Forge counterpart; the packaged app runs directly).

Code review (five-axis, parallel agents over the working-tree diff - CLAUDE.md compliance, bug scan, git history, prior-ticket patterns, code-comment contracts) found 8 issues; the real ones were fixed and re-verified:

- `pdf-lib` was imported by `src/main/services/generate-jobs.ts` but declared in no package.json section and absent from the lockfile - it only resolved through the parent repo's node_modules (a pre-existing hole the toolchain rewrite surfaced). Declared in `dependencies`; a full-import scan of src confirmed no other undeclared packages.
- The packaged app would have shipped the default Electron icon: `resources/` held only a 512px `icon.png`, while `packagerConfig.icon` expects `icon.icns`/`icon.ico`. Generated both from `icon.png` (iconutil iconset for the icns; a minimal PNG-embedded ICO for Windows).
- The packaged app's `app.getName()` would change from "Email Blast" (electron-builder injected `productName`) to "email-blast-desktop" (@electron/packager does not), moving the userData/DB location and confusing the future auto-updater (ADR-0003). `productName: "Email Blast"` added to package.json.
- `allowBuilds: electron-winstaller: false` (left over from the pre-Forge workspace file) would break the newly declared Windows maker - its install script copies the host-arch 7z binary. Set to true (declared Windows packaging is otherwise untestable from macOS).
- map.md's Notes stack line and spec.md's stack/gotcha sections still named electron-vite + electron-builder; updated to the Forge toolchain and pointed at the ticket records.
- The smoke script asserted app info "reads the packaged package.json" - AppInfo is hardcoded; the comment and the ticket record now say so, and the launch/cleanup was hardened (temp dir removed even if launch fails, no crash on a failed launch in the finally block).
- A dangling "see vite.base.config" comment in src/main/index.ts pointed at a nonexistent project file (it is the plugin's internal module); reworded.
- Flagged and cleared as false positives: a claimed CSP block on React's dev fast-refresh preamble (verified live via CDP - the preamble inline script precedes the CSP meta in the head, React mounts, zero console errors) and a claimed mac Info.plist metadata drop (the old electron-builder.yml never had a mac section).

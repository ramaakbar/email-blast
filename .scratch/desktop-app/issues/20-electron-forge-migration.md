# 20 - Electron Forge migration

**What to build:** Replace electron-vite + electron-builder with Electron Forge per the official docs (electronforge.io), using Forge's Vite plugin and Vite 8. The Vite plugin replaces electron-vite for building main/preload/renderer; the dev loop becomes `electron-forge start`. Declare makers for macOS (dmg, zip), Windows (nsis), and Linux, replace the postinstall native-module handling, and prove the packaged artifacts launch and pass a smoke E2E. Coupled to 19: the Forge Vite plugin must support Vite 8 - if it lags, decide with 19 whether to pin Vite or fall back to the hybrid (Forge consuming an electron-vite build).

**Blocked by:** 19 - Vite 8 upgrade

**Status:** done

- [x] Forge Vite plugin drives the build (main/preload/renderer); `electron-forge start` is the dev loop
- [x] Vite 8 confirmed with the Forge Vite plugin (see 19)
- [x] Makers declared for mac/win/linux; `package` and `make` artifacts launch
- [x] Native-module handling in place (postinstall equivalent)
- [x] Packaged app passes a smoke E2E; ADR-0001 stays accurate

## Answer

Completed in one pass with ticket 19 (the Vite 8 upgrade) - the user's call after the 19 research showed electron-vite stable cannot host Vite 8 and only a stale beta could. All in `email-blast-desktop/`.

**What changed.**

- **`forge.config.ts`** (loaded natively via jiti since Forge 7.8.1): `packagerConfig` (asar, name "Email Blast", appBundleId `com.emailblast.desktop`, icon `resources/icon`), `rebuildConfig: {}`, makers for darwin (dmg, zip), win32 (squirrel), linux (deb, rpm), and the `@electron-forge/plugin-vite` plugin with build entries `src/main/index.ts` (target main) + `src/preload/index.ts` (target preload) and renderer `main_window`.
- **`vite.main/preload/renderer.config.mjs`** replace `electron.vite.config.ts` (deleted); `electron-builder.yml` deleted; `electron-builder` and `electron-vite` removed from package.json.
- **Scripts:** `dev`/`start` = `electron-forge start`; `package` = `electron-forge package`; `make` = `electron-forge make`; `build` = typecheck + `electron-forge package`; the electron-builder `build:unpack`/`build:mac`/`build:win` and the `postinstall: electron-builder install-app-deps` are gone. `main` → `.vite/build/main.js`.
- **Main process:** Forge's injected defines `MAIN_WINDOW_VITE_DEV_SERVER_URL`/`MAIN_WINDOW_VITE_NAME` replace `ELECTRON_RENDERER_URL`; preload path `join(__dirname, "preload.js")`; production renderer `loadFile("../renderer/main_window/index.html")`.
- **`index.html`** moved to the project root (the plugin forces the renderer root to the project directory).
- **pnpm:** `nodeLinker: hoisted` (Forge requires it), `blockExoticSubdeps: false` + `allowBuilds` for the mac packaging deps (details in ticket 19).
- **Native modules:** the app has no native dependencies (all of `@e965/xlsx`, docxtemplater, pizzip, nodemailer, effect, @electron-toolkit/utils are pure JS), so `rebuildConfig: {}` is the whole native-module story - no postinstall step needed. If a native dep is added later, Forge rebuilds it against Electron's ABI at package time.

**Verification (2026-08-04).**

- `pnpm package` green; the asar contains `.vite/build/main.js` + `preload.js` and `.vite/renderer/main_window/` (index.html + assets incl. the pdf.js worker).
- `pnpm make` green: `Email Blast-1.0.0-arm64.dmg` (115MB) + `out/make/zip/`.
- Packaged smoke (`scripts/smoke-packaged.mjs`, Playwright `_electron`, temp `--user-data-dir`): the packaged app, the zip-extracted app, and the DMG-mounted app each launch and pass - first-launch screen renders, bridge ping answers, app info reads from the asar, DB-backed settings round-trip works, zero renderer console errors. Dev loop verified via the app's own dev handshake (API_VERSION agreement) with no errors.
- Full chain green: typecheck, `oxlint`, `oxfmt`, vitest 161, `pnpm build`.
- ADR-0001 updated to the actual decision (below).

**Deviation: Windows maker is Squirrel, not NSIS.** `@electron-forge/maker-nsis` does not exist in the npm registry (404 at 7.11.2; NSIS installers only exist as third-party makers). Forge's official Windows maker - and the one in its own template - is `@electron-forge/maker-squirrel` (Squirrel.Windows). Declared that instead. If an NSIS installer is a hard requirement for distribution, the third-party `@electron-addons/electron-forge-maker-nsis` (v7-era) can be swapped in later.

**Supersedes:** ticket 01's scaffold verdict (electron-vite 5.0.0 + electron-builder 26.15.3, "Forge is not the right fit here") - overtaken by the user's call during 19/20 (Forge Vite plugin + Vite 8). ADR-0001 now records the actual decision.

**Superseded by:** ticket 26 / ADR-0010 (2026-09-15) - Forge's Squirrel.Windows maker needs mono+wine, so the Windows installer could not be built on Apple Silicon; electron-builder replaced the whole Forge chain. This file records the Forge era.

Code review (five-axis, parallel agents over the working-tree diff): findings shared with ticket 19 (pdf-lib declaration, app icon, productName, electron-winstaller, stale docs); the ticket-specific outcomes were the maker-squirrel note staying accurate and the .npmrc/workspace-yaml nodeLinker duplication being documented (Forge's system check reads .npmrc; pnpm 11 links from pnpm-workspace.yaml - both kept). No ticket-specific defects remained.

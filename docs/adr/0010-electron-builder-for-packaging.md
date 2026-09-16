# ADR-0010: electron-builder packages the app; Forge and electron-vite are dropped, Vite 8 stays

**Status:** Accepted

**Date:** 2026-09-15

## Context

Windows users need a real installer, and NSIS was chosen for it. Electron Forge's only official Windows maker is Squirrel.Windows, which requires `mono` + `wine` on the build host - unavailable on Apple Silicon - so `electron-forge make --platform=win32` cannot run on the maintainer's Mac (installed `electron-winstaller` throws *"You must install both Mono and Wine on non-Windows"*). Separately, auto-update is planned via electron-updater against a public GitHub Releases feed (ADR-0003, ticket 21), and that metadata/publish pipeline is electron-builder's own. Vite 8 (ticket 19) must stay: `electron-vite` stable still peer-caps at Vite 7, and its Vite-8 line is a five-month-stale beta with open Vite 8 bugs.

## Decision

electron-builder 26.15.3 packages the app; `@electron-forge/*` and `electron-vite` are gone. Vite 8 keeps building main/preload/renderer as three plain configs (`vite.main|preload|renderer.config.mjs`) driven by our own scripts: three `vite build` runs for a build, and `scripts/dev.mjs` for development (renderer dev server, watch builds for main/preload, Electron respawn on main changes, renderer reload on preload changes). The dev orchestration is hand-rolled, modelled on `cawa-93/vite-electron-builder`.

## Considered Options

- **Stay on Forge, replace only the Windows maker.** `@electron-forge/maker-zip` for `win32` is genuinely wine-free (packager 18.4.4 rewrites the PE icon/manifest/version with the pure-JS `resedit`, and the zip maker reports itself supported everywhere) but yields a portable folder, not an installer - rejected once NSIS was the requirement. A local `MakerBase` subclass calling `app-builder-lib`'s `buildForge` is wine-free and would work, but keeps two packagers and produces no `latest.yml`/publish pipeline - rejected because auto-update is on the roadmap.
- **`electron-forge-maker-nsis` from npm** (26.15.3, published from electron-builder's own monorepo) looks like the one-package answer, but its module shape predates Forge 7: the default export is a bare function that calls `buildForge(options, ...)`, while Forge 7.11's loader does `new MakerClass(config, platforms)` and then reads `maker.platforms`. It cannot load, and `buildForge` would receive a config with no `dir`. Dead end.
- **`electron-vite` on Vite 8**: rejected - stable caps at Vite 7, the Vite-8 line is a stale beta.
- **`vite-plugin-electron` instead of hand-rolled orchestration**: viable (1.1.2, Vite 7+8 support with automatic `rolldownOptions` adaptation), but it absorbs the three existing config files into its own option surface. Hand-rolled keeps the configs readable and adds no toolchain dependency; the fallback stays open if the dev script proves fiddly.

## Consequences

- **Targets.** Windows: NSIS, x64, one-click per-user install, `Email Blast Setup <version>.exe`. macOS: dmg + zip with `mac.identity: "-"` - electron-builder does *not* ad-hoc sign by default the way `@electron/packager` did, and an unsigned bundle will not launch on Apple Silicon. Linux targets are dropped (never built, no user).
- **Dependencies shrink to one runtime entry.** `better-sqlite3` stays in `dependencies`; every other library Vite already bundles moves to `devDependencies`. electron-builder's node-module collector copies production dependencies independently of `files`, so leaving them in `dependencies` would ship each one twice.
- **Packaging config.** `files: ["out/**", "package.json"]`, `asarUnpack: ["**/*.node"]` (top-level key in v26 - `asar.unpack` is the v27 shape and a schema violation here), `extraResources` for `drizzle/` and `resources/fonts/` so `process.resourcesPath` reads in the main process stay valid, `npmRebuild: false` because better-sqlite3 v13 ships ABI-stable Node-API prebuilds (no gyp rebuild). Icons are declared explicitly (`mac.icon: resources/icon.icns`, `win.icon: resources/icon.ico`): electron-builder's default icon discovery reads the `build/` buildResources directory, which still held the pre-Forge 512px set, so the first packages silently shipped a downgraded icon; `build/` is deleted.
- **Output layout changed.** Vite writes `out/{main,preload,renderer}`; electron-builder writes `dist/` with the unpacked app at `dist/mac-arm64/Email Blast.app` and `dist/win-unpacked/Email Blast.exe`. The five files carrying the old Forge path constant were repointed.
- **`appId` (`com.emailblast.desktop`) and product name (`Email Blast`) are frozen.** They decide `appData`/`userData` - where the SQLite database lives - and the NSIS registry GUID.
- **Auto-update constraints (evidence for ticket 21).** The feed must be public: electron-updater's GitHub provider only authenticates with a token shipped to every machine, which is a non-starter. macOS auto-update requires a Developer ID-signed and notarized build *from the first shipped version* - Squirrel.Mac validates the downloaded bundle against the running app's designated requirement, and an ad-hoc signature changes every build. Unsigned Windows NSIS updates do apply (the signature check is skipped when `publisherName` is absent).
- **The Forge Vite plugin's defines are gone.** `MAIN_WINDOW_VITE_DEV_SERVER_URL`/`MAIN_WINDOW_VITE_NAME` are replaced by `process.env.VITE_DEV_SERVER_URL` (set by `scripts/dev.mjs`) and a fixed `../renderer/index.html` path.

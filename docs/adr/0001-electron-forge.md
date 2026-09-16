# ADR-0001: Electron Forge for packaging and distribution

**Status:** Superseded by [ADR-0010](./0010-electron-builder-for-packaging.md)

**Date:** 2026-08-04

## Context

The app is packaged with electron-builder (`electron-builder ^26.15.3`). The build chain is electron-vite (dev/build) plus electron-builder (packaging). We want the official Electron toolchain for packaging and distribution, and the auto-update decision (ADR-0003) pairs naturally with Forge's ecosystem.

## Decision

Migrate to Electron Forge as the entire build chain. Forge's Vite plugin replaces electron-vite for building main/preload/renderer (the dev loop becomes `electron-forge start`), and Forge's makers replace electron-builder for packaging. The Vite plugin was originally slated as a fallback ("hybrid" - Forge consuming an electron-vite build), but it proved cleaner during implementation (tickets 19/20): with Vite 8 required, electron-vite stable cannot host it (only a stale beta can), while Forge's Vite plugin consumes the app's own Vite 8 with no version pin and works end to end - dev, package, make, and the packaged smoke all green.

## Consequences

- `electron-builder` config and the build:mac/build:win/build:unpack scripts are replaced by `forge.config` plus Forge commands (`package`, `make`); `electron-vite` and its config are gone.
- `postinstall: electron-builder install-app-deps` is gone; Forge rebuilds native modules at package time (`rebuildConfig`). Corrected 2026-09-15: the app *does* have a native dependency - `better-sqlite3` v13, kept external by the main Vite build and shipped with its Node-API prebuilds (`asar.unpack: "**/*.node"`), so `rebuildConfig` never had anything to rebuild.
- Makers are declared per target: macOS (dmg, zip), Windows (Squirrel.Windows - there is no `@electron-forge/maker-nsis` in the registry), Linux (deb, rpm). Superseded: Squirrel.Windows needs mono+wine on the build host and cannot run on Apple Silicon, which is what forced ADR-0010.
- The dev loop is `electron-forge start`; production entry is `.vite/build/main.js`. Corrected 2026-09-15: the dev loop is `node scripts/dev.mjs` and the production entry is `out/main/index.js` (ticket 26, ADR-0010).
- Auto-update (ADR-0003) is implemented on top of Forge and its published artifacts. Corrected 2026-09-15: nothing is implemented - ticket 21 is `wontfix`, and electron-updater's metadata is electron-builder's output, not Forge's.
- pnpm is configured for Forge: `nodeLinker: hoisted`, `blockExoticSubdeps: false` (@electron/rebuild pulls `@electron/node-gyp` from git), and build-script approval for the macOS packaging deps. Corrected 2026-09-15: `node-linker=hoisted` lives in `.npmrc` and stays (ADR-0010 keeps the hoisted tree), while `blockExoticSubdeps` and the `fs-xattr`/`macos-alias` approvals went with Forge and `electron-winstaller` is now explicitly denied.

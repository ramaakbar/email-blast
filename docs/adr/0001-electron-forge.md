# ADR-0001: Electron Forge for packaging and distribution

**Status:** Accepted

**Date:** 2026-08-04

## Context

The app is packaged with electron-builder (`electron-builder ^26.15.3`). The build chain is electron-vite (dev/build) plus electron-builder (packaging). We want the official Electron toolchain for packaging and distribution, and the auto-update decision (ADR-0003) pairs naturally with Forge's ecosystem.

## Decision

Migrate packaging and distribution from electron-builder to Electron Forge. The dev loop and build stay on electron-vite; Forge consumes the built output (hybrid) unless Forge's Vite plugin proves cleaner during implementation.

## Consequences

- `electron-builder` config and the build:mac/build:win/build:unpack scripts are replaced by `forge.config` plus Forge commands.
- `postinstall: electron-builder install-app-deps` is replaced by Forge's native-module handling.
- Makers must be declared for each target: macOS (dmg, zip), Windows (nsis), Linux.
- Auto-update (ADR-0003) is implemented on top of Forge and its published artifacts.

# ADR-0003: Auto-update via electron-updater with GitHub Releases

**Status:** Accepted

**Date:** 2026-08-04

## Context

Users today would have to uninstall and reinstall the app to receive a new version - a hassle the maintainers want to avoid. The app is a local desktop tool meant to be distributed as a signed, installable app.

## Decision

Ship auto-update via electron-updater with the GitHub Releases provider. The app is code-signed: Apple Developer ID + notarization on macOS, a code-signing certificate on Windows. A public GitHub repository hosts the release artifacts (the repo does not exist yet; creating it is part of ticket 21).

## Consequences

- Code signing becomes a hard requirement: without it, macOS Gatekeeper blocks the replaced app and Windows shows SmartScreen nags. Requires an Apple Developer account (~$99/yr) and a Windows signing certificate, configured in the release pipeline.
- **Status 2026-09-15:** not implemented (ticket 21 is `wontfix`); ADR-0001's claim that this was "implemented on top of Forge" was wrong. Two constraints were established while migrating the build chain (ADR-0010): the releases feed must be **public** (electron-updater's GitHub provider otherwise needs a token on every user's machine), and **macOS auto-update must be signed from the first shipped version** - Squirrel.Mac validates the downloaded bundle against the running app's designated requirement, so an ad-hoc/unsigned install can never self-update. Unsigned Windows NSIS updates do apply.
- The app checks for updates on launch and notifies the user in the renderer when one is ready; install-and-restart is a single user action.
- Each release bumps the app version and publishes artifacts (and electron-updater metadata) to the GitHub Releases feed.

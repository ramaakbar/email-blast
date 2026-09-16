# 21 - Auto-update

**What to build:** Auto-update via electron-updater with the GitHub Releases provider (ADR-0003), so users never reinstall. Create the public GitHub repository and releases feed. Wire electron-updater into the main process: check on launch, notify the renderer when an update is ready, install-and-restart on user action. Configure code signing: Apple Developer ID + notarization for macOS, signing certificate for Windows. Bump the app version per release and publish artifacts plus electron-updater metadata to the feed. The update round-trip must be verified on a test channel before release.

**Blocked by:** -

**Status:** wontfix (user decision 2026-08-09 - auto-update is out of the current scope; the release story stays manual. Revivable by flipping the status back; the full ticket text remains above.)

**Constraints established while migrating the build chain (2026-09-15, ADR-0010) - read before reviving:** the releases feed must be **public** (electron-updater's GitHub provider otherwise needs a token on every user's machine); **macOS auto-update requires a Developer ID-signed + notarized build from the first shipped version** (Squirrel.Mac validates against the running app's designated requirement, and an ad-hoc signature changes every build), so unsigned mac installs would need a one-time manual reinstall of a signed build; unsigned Windows NSIS updates do apply (the signature check is skipped when `publisherName` is absent); the toolchain side is now electron-builder, which emits `latest.yml`/`latest-mac.yml` + `.blockmap` on any host and takes a `publish` block for the GitHub provider.

- [ ] GitHub repository created; release feed accepts artifacts
- [ ] electron-updater wired: launch check, ready notification in the renderer, install and restart
- [ ] Signing + notarization configured in the release pipeline (mac and win)
- [ ] Update round-trip verified on a test channel: old version updates to new version cleanly

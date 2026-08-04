# 21 - Auto-update

**What to build:** Auto-update via electron-updater with the GitHub Releases provider (ADR-0003), so users never reinstall. Create the public GitHub repository and releases feed. Wire electron-updater into the main process: check on launch, notify the renderer when an update is ready, install-and-restart on user action. Configure code signing: Apple Developer ID + notarization for macOS, signing certificate for Windows. Bump the app version per release and publish artifacts plus electron-updater metadata to the feed. The update round-trip must be verified on a test channel before release.

**Blocked by:** 20 - Electron Forge migration

**Status:** ready-for-agent

- [ ] GitHub repository created; release feed accepts artifacts
- [ ] electron-updater wired: launch check, ready notification in the renderer, install and restart
- [ ] Signing + notarization configured in the release pipeline (mac and win)
- [ ] Update round-trip verified on a test channel: old version updates to new version cleanly

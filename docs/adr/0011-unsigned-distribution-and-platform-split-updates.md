# ADR-0011: Unsigned distribution - Windows self-updates, macOS notifies

**Status:** Accepted

**Date:** 2026-09-16

**Amends:** [ADR-0003](./0003-auto-update.md) (auto-update via electron-updater with GitHub Releases) - its signing requirement is dropped; the release mechanism stays.

## Context

The app needs to reach colleagues without them reinstalling it by hand, and the maintainer wants one place to download it from. ADR-0003 chose electron-updater with the GitHub Releases provider and assumed code signing (Apple Developer Program, ~$99/yr, plus a Windows certificate).

The maintainer decided against buying any signing identity: this is an internal tool for a handful of colleagues on macOS (Apple Silicon) and Windows. Ticket 21 was `wontfix` for that reason until the distribution need outweighed it.

The two platform constraints that shape the decision are not preferences:

- **Windows**: electron-updater skips the signature check when the update config carries no `publisherName`, so an unsigned per-user NSIS install updates itself. The updater's own download carries no Mark-of-the-Web, so SmartScreen does not interrupt it either.
- **macOS**: auto-update is impossible unsigned. Squirrel.Mac validates the downloaded bundle against the _running_ app's designated requirement, and an ad-hoc signature's requirement pins the exact code-directory hash - which changes on every build. electron-builder's documentation states the requirement outright: "macOS application must be signed in order for auto updating to work."

## Decision

Distribute unsigned builds through GitHub Releases on the public repository `ramaakbar/email-blast` (a private repository would need a `GH_TOKEN` on every colleague's machine - electron-builder's docs call private update repos "not intended and not suitable for all users"). Update behavior splits by platform:

- **Windows (x64, NSIS per-user)**: the app downloads the new version in the background and installs it when the user clicks Restart & install. Full auto-update.
- **macOS (arm64)**: the app checks, tells the user a version is available, and opens that release's page. The colleague downloads the new build and replaces the app; the app then shows a one-time "updated to version X" notice so the change is visible.
- **Test channel**: a GitHub **pre-release** carries the verification build - shipped apps ignore pre-releases (`allowPrerelease = false`), so colleagues never see it.
- **Publishing**: `--publish` decides whether the artifacts are _uploaded_, not whether the update metadata exists. Any build with a real target writes it - `pnpm make:mac` emits `dist/latest-mac.yml` and puts `app-update.yml` into the bundle - because electron-builder writes those for the dmg/zip and NSIS targets. A `--dir` package (`pnpm package`, which the smoke and E2E harness use) has neither, so it cannot exercise the updater: it takes a `make` build to check for updates.

## Consequences

- **Installing on macOS costs the colleague a Gatekeeper step**: System Settings → Privacy & Security → Open Anyway (on Sequoia the old right-click → Open bypass no longer exists), or `xattr -dr com.apple.quarantine "/Applications/Email Blast.app"`. It repeats for every manual update, because each unsigned build is a new identity. Windows shows SmartScreen once, on the first install.
- **Buying the Apple Developer Program later upgrades macOS to real auto-update - but every install made before that must be replaced manually once.** Squirrel.Mac validates the new bundle against the running app's designated requirement; an ad-hoc install can never satisfy a Developer ID requirement. Signing is therefore only worth doing _before_ the first build colleagues install, not after.
- **The first public release must already contain the update code**, or those installs would never learn about a newer version. It does: the app ships at `1.0.0` and nothing has been published yet.
- `electron-updater` becomes the second runtime dependency (the first since ticket 26's reduction is `better-sqlite3`) and is externalized in the main Vite build, so electron-builder ships it into the asar from `dependencies` rather than bundling it - it resolves its own `app-update.yml` at runtime.
- macOS builds stay **arm64-only**: an Intel Mac cannot run the app. Revisit with a universal target (`arch: ["universal"]`, the `darwin-x64` prebuilds already ship) if a colleague turns out to be on Intel.
- Going private later breaks updates on every install - the GitHub provider would then need a token on each machine. The repository stays public.
- The app never installs anything behind the user's back: checking is silent, downloading is silent on Windows, and installing is one explicit click that is refused while a send job is in progress (the ticket-17 quit guard would otherwise fight the installer and strand a running send).

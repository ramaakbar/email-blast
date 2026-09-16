# 21 - Auto-update & distribution

**What to build:** Ship the app to colleagues through GitHub Releases and keep them current. Releases are published to the public repo `ramaakbar/email-blast`; electron-updater is wired into the main process; the renderer shows a dismissible "version X is available" banner and a one-time "updated to version X" notice. Windows downloads the update in the background and installs it on one click; macOS notifies and opens the release page (ADR-0011 - the app ships unsigned, so Squirrel.Mac can never validate an update). Scope: publishing config + release workflow + install docs, the update service, the renderer surfacing, the Settings About row. Out of scope: code signing and notarization (ADR-0011), Linux targets, delta/staged rollouts.

**Blocked by:** -

**Status:** done (revived 2026-09-16 from `wontfix`; completed the same day)

**Decisions (user, 2026-09-16):** do not buy any signing identity; macOS arm64 + Windows x64 only; GitHub Releases is the feed; notifications are wanted, silent installs are not. Recorded in ADR-0011, which amends ADR-0003 (its signing requirement is dropped, its release mechanism stays).

**Constraints established while migrating the build chain (2026-09-15, ADR-0010):** the releases feed must be **public** (electron-updater's GitHub provider otherwise needs a token on every user's machine); **macOS auto-update requires a Developer ID-signed + notarized build** (Squirrel.Mac validates against the running app's designated requirement, and an ad-hoc signature changes every build); unsigned Windows NSIS updates do apply (the signature check is skipped when `publisherName` is absent). Verified 2026-09-16: electron-builder writes `latest-mac.yml` and the bundle's `app-update.yml` for any build with a real target (`pnpm make:mac`, `--publish never` included) - `--publish` only controls the upload; a `--dir` package has neither, so the smoke/E2E harness cannot exercise the updater.

- [x] `publish` config (GitHub provider, draft releases) + release workflow on `v*` tags; artifacts and `latest*.yml` land in a draft release
- [x] Update service: launch check, background download on Windows, state pushed to the renderer over the frozen `update` IPC domain
- [x] Windows: Restart & install quits and installs; refused while a send job is active (the ticket-17 quit guard and the installer must not fight)
- [x] macOS: notify + open the release page; never download what it cannot install
- [x] Notifications: dismissible available-update banner + one-time "updated to version X" notice on first launch after a version change
- [x] Settings About: current version, update status, Check for updates
- [x] Install docs for colleagues (unsigned first-run steps on both platforms; how a release is cut)
- [x] Update check verified end to end against the live feed (`scripts/update-check-e2e.mjs`), empty feed included
- [ ] **Accepted gap:** the platform round trip (old version updates to new) needs a published newer version and a Windows host - see the Answer

## Answer

Completed 2026-09-16. ADR-0011 amends ADR-0003: the app ships **unsigned on purpose**, so the platforms split.

**Publishing and release flow.**

- `electron-builder.mjs` gained a `publish` block for the GitHub provider (`owner: ramaakbar`, `repo: email-blast`, `releaseType: draft`). electron-builder writes it into the bundle as `resources/app-update.yml` and emits the `latest*.yml` feed next to the artifacts. `electronUpdaterCompatibility` is deliberately absent: the installed app-builder-lib applies `|| ">=2.15"` before the legacy-fields branch, so the modern `files[]` metadata is what gets written (confirmed against a stub app on both platforms — the key cannot change the output).
- `electron-updater@6.8.9` is a runtime dependency, external in the main Vite build so electron-builder ships it from `dependencies` (70 entries under `node_modules/electron-updater` inside the asar).
- Scripts: `package` / `make` / `make:mac` / `make:win` pass `--publish never` (a local build must never upload, even where `CI` makes electron-builder imply publishing); `make:mac:publish` / `make:win:publish` pass `--publish always`.
- `.github/workflows/release.yml`: a `v*` tag → one `macos-latest` job (standard runners are free for public repositories, and NSIS cross-builds on Apple Silicon) → a guard that the tag equals `package.json` version → both platform builds publishing into one draft release with `GH_TOKEN`. The maintainer reviews the draft and publishes it; a pre-release is the test channel.
- README: "Download & install" (the unsigned first-run steps per platform, and that macOS updates are manual) plus "Cutting a release".

**Main process.** New `update` domain (`src/main/services/update.ts`), built against the frozen wire/schema surface: an `UpdateEnvService` DI seam and a `UpdateService` state machine — `unsupported` (unpackaged, never touches the network) → `checking` → `available`/`up-to-date`/`error`, then `downloading` (progress) → `ready`. Windows auto-downloads behind the check; macOS never downloads what it cannot install. `install()` refuses while a send job is active (`update.errorActiveJob`), so quit-and-install can never fight the ticket-17 quit guard and strand a running send. At boot `recordLaunch()` raises the one-time what's-new notice when `last_run_version` differs; a launch check runs behind the window; every transition is pushed to windows on `update-state`.

**Renderer.** `UpdateBanner` (one strip at a time, toned apart from the amber send banner) covering available / downloading / ready and the what's-new notice, with Download, Open download page, Restart & install and Dismiss; the Settings About row shows the version, live status and a Check for updates button; an `update` namespace in both catalogs, compiled output regenerated in the committed locale-modules layout (6 files).

**Verification (2026-09-16, macOS 15.6 arm64).**

- `pnpm typecheck`, `pnpm lint`, `oxfmt --check` on the touched files: clean. `pnpm test` → **332 passed** (21 files; 13 of them the new update service).
- `pnpm make:mac` → `dist/latest-mac.yml` (modern `files[]` + sha512) and `dist/mac-arm64/Email Blast.app/Contents/Resources/app-update.yml` carrying `provider: github` / `releaseType: draft`. `pnpm package` (`--dir`) has neither — that is why the harness cannot check for updates.
- `node scripts/smoke-packaged.mjs` → SMOKE PASS: the app boots with the update service in the graph, the bridge answers, zero console errors.
- `node scripts/update-check-e2e.mjs` (new) → UPDATE CHECK PASS against the live feed: correct `currentVersion`/`canSelfInstall`, the what's-new notice raised by a version change and rendered in the shell, a manual check answering `up-to-date` on the (still empty) feed, dismissal clearing it, zero console errors.
- `pnpm test:e2e` → **15 files / 25 tests passed** (147 s) against the electron-builder artifact with the update service wired in.

**Findings worth keeping.**

- A `--dir` package is updater-blind: electron-builder writes `app-update.yml` only when the target list contains dmg/zip (mac) or a suitable Windows target, so `pnpm package` cannot exercise the updater.
- electron-builder's GitHub uploader cannot assemble a release: it creates one release per artifact it uploads, **concurrently**, so the first v1.0.0 publish produced two drafts with the assets split between them (mac zip + Windows setup in one, dmg + `latest-mac.yml` in the other). The workflow now builds with `--publish never`, guards that every artifact and both feeds exist, and creates the release once with `gh release create`. Artifact names are declared explicitly on both platforms because GitHub rewrites spaces on upload, which would leave the feeds pointing at files that do not exist.
- An empty feed, a draft-only feed, and a pre-release-only feed all look the same to a client: electron-updater answers `No published versions on GitHub`, or `releases/latest` answers 406 wrapped as "please ensure a production release exists". All of them mean "nothing to install yet" and map to `up-to-date`; a 404 stays an error, because that is the feed itself being gone. The messages also carry the raw HTTP response (headers, cookies, CSP), so the user-facing text is trimmed to its first line.

**Accepted gaps.**

- The Windows half — background download → Restart & install — is unverified end to end: it needs a published newer version and a Windows host. The macOS half is notify-only by design (ADR-0011).
- The release workflow ran three times on tag `v1.0.0` (all green). The first run produced the split drafts above, which were deleted; the later runs produced **one draft release with all eight assets** (`Email-Blast-1.0.0-arm64.dmg`/`.zip` + blockmaps, `Email-Blast-Setup-1.0.0.exe` + blockmap, `latest-mac.yml`, `latest.yml`).
- **Published 2026-09-16**: https://github.com/ramaakbar/email-blast/releases/tag/v1.0.0 is live (not a draft, not a pre-release), cut from `e8a27e6`. Verified anonymous (no GitHub account, as a colleague's browser would): `latest-mac.yml` → HTTP 200, `latest.yml` → HTTP 200, the `.dmg` → HTTP 200; and the packaged app, pointed at the live feed, resolves the release and answers `up-to-date` — the full check path against a real published version.

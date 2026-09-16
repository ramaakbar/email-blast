# Email Blast

Local desktop app for bulk email campaigns: import recipients from a
spreadsheet, generate personalized PDFs from document and image templates, and
send them over SMTP - all on-device.

An Electron application with React and TypeScript: built with Vite 8, packaged with [electron-builder](https://www.electron.build/) (ADR-0010).

Repository layout: the app is the repository root. `docs/adr/` holds the
architecture decisions, `CONTEXT.md` the domain glossary, and `.scratch/` the
ticket trail.

## Download & install

Installers are published to
[github.com/ramaakbar/email-blast/releases](https://github.com/ramaakbar/email-blast/releases):
macOS (Apple Silicon) and Windows (x64) only. Nothing is code-signed
(ADR-0011), so each platform warns once on first launch.

**macOS**

1. Open the `.dmg`, drag _Email Blast_ into _Applications_.
2. Launch it. macOS blocks the first attempt and points at System Settings.
3. _System Settings_ -> _Privacy & Security_, scroll to the _Security_
   section, press **Open Anyway** for Email Blast, then confirm with your
   password and open it again. If macOS reports the app as _damaged_ instead
   (no "Open Anyway" button), clear the quarantine attribute and launch it:
   `xattr -dr com.apple.quarantine "/Applications/Email Blast.app"`.
4. **Updates are manual**: macOS validates a downloaded bundle against the
   running app's signature, which an unsigned build can never satisfy, so the
   in-app update notice opens the release page - download the newer `.dmg`
   and drag it over the old copy.

**Windows**

1. Run `Email Blast Setup <version>.exe`. SmartScreen shows _"Windows
   protected your PC"_: **More info** -> **Run anyway**.
2. The installer is one-click and per-user: no admin prompt, and uninstalling
   leaves your data in `%APPDATA%` alone.
3. **Updates are automatic**: the app checks on launch, offers the new version
   in the update notice, and installs it on restart.

### Cutting a release

1. Bump `version` in `package.json`, commit, and push.
2. Tag that commit and push the tag:
   `git tag v1.1.0 && git push origin v1.1.0`. The guard in
   `.github/workflows/release.yml` rejects a tag that disagrees with
   `package.json`, so a stale tag fails the run instead of publishing under
   the wrong version.
3. That tag push runs the workflow: one macOS runner (free for public
   repositories, and it can build the Windows installer too) packages the
   macOS dmg/zip and the Windows `Setup.exe`, and uploads them plus the
   `latest*.yml` update feed into a **draft** GitHub release.
4. Review the draft under _Releases_ and press **Publish release** -
   colleagues see nothing before that, and installed apps ignore drafts.
5. **Test channel.** To give a build to one person ahead of a real release,
   publish the draft as a **pre-release** (the checkbox on the draft, or
   `EP_PRE_RELEASE=true` on the publishing run): shipped builds ignore
   pre-releases, so only someone who downloads it by hand ends up on it.

Publishing from a workstation needs `GH_TOKEN` with `contents: write` on the
repository: `pnpm make:mac:publish` / `pnpm make:win:publish`.

## Project Setup

### Install

```bash
$ pnpm install
```

### Development (dev loop)

```bash
$ pnpm dev
```

### Build & package

```bash
$ pnpm package    # build + unpacked app in dist/ (used by the smoke and E2E)
$ pnpm make       # installers for this host: dmg + zip on macOS, NSIS Setup.exe on Windows
$ pnpm make:mac   # macOS dmg + zip, from any host
$ pnpm make:win   # Windows NSIS Setup.exe, from any host
$ pnpm make:mac:publish   # as make:mac, and upload to a draft GitHub release
$ pnpm make:win:publish   # as make:win, and upload to a draft GitHub release
$ pnpm compile    # typecheck + make
```

Both platforms build from macOS: electron-builder's NSIS target runs a native
`makensis` and needs no wine/Rosetta, so `make:win` yields the installer on an
Apple Silicon Mac. Vite writes `out/`, electron-builder packs it into `dist/`.

### Test / lint

```bash
$ pnpm test       # vitest (main + shared unit tests)
$ pnpm typecheck  # tsc for node + web
$ pnpm lint       # oxlint
$ pnpm fmt        # oxfmt
```

### End-to-end suite (Seam B)

The packaged app driven by Playwright's Electron launcher against a local
SMTP capture server: import -> generate -> send -> logs, both quit-dialog
branches and the resume across restarts, first launch without LibreOffice,
and the one-active-job block.
Needs the packaged app (or `APP_PATH` pointing at a packaged binary):

```bash
$ pnpm package && pnpm test:e2e
```

### Packaged smoke E2E

```bash
$ pnpm package && node scripts/smoke-packaged.mjs
```

### Update check (against the live release feed)

```bash
$ pnpm make:mac && node scripts/update-check-e2e.mjs
```

Drives the packaged app's real update domain: the what's-new notice raised by
a version change, a manual check against the published feed, and dismissal.
It needs a `make` build - a `--dir` package carries no `app-update.yml`, so
it cannot check for updates at all.

## License

MIT - see [LICENSE](LICENSE). Bundled fonts and the E2E font fixture are
distributed under the SIL Open Font License; their license texts sit next to
the files (`resources/fonts/OFL-*.txt`, `e2e/assets/OFL-Carlito.txt`).

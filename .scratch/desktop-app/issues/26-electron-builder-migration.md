# 26 - Electron builder migration

**What to build:** Replace Electron Forge (and its Vite plugin) with electron-builder as the packager, keeping Vite 8 for the main/preload/renderer builds, so the Windows artifact is an NSIS installer built on the maintainer's Mac (Forge's Squirrel.Windows maker needs mono+wine). Per ADR-0010. Scope: packaging config, build/dev scripts, dependency split, main-process env contract, artifact paths in the E2E harness and manual scripts. Out of scope: auto-update wiring and the GitHub repo (ticket 21), Windows code signing, macOS notarization.

**Blocked by:** -

**Status:** done

- [x] electron-builder packages mac (dmg + zip) and Windows (NSIS x64), no Forge, no electron-vite
- [x] Vite 8 builds main/preload/renderer via plain configs; dev loop has HMR + main-process restart
- [x] `dependencies` reduced to `better-sqlite3`; `asarUnpack` + `extraResources` keep runtime paths valid
- [x] Packaged smoke and the `e2e/` suite pass against the electron-builder artifact
- [x] A Windows NSIS installer is produced from macOS (installer itself untestable here: no Windows host)

## Answer

Completed 2026-09-15 in one pass. ADR-0010 supersedes ADR-0001. All in `email-blast-desktop/`.

**Toolchain.**

- Deleted `forge.config.ts` and the five `@electron-forge/*` devDependencies; added `electron-builder@26.15.3`. `main` is now `out/main/index.js`.
- New `electron-builder.mjs`: `appId com.emailblast.desktop` + `productName "Email Blast"` (frozen: they decide `userData` - the SQLite database - and the NSIS registry GUID), `files: ["out/**", "package.json"]`, `asarUnpack: ["**/*.node"]`, `extraResources` for `drizzle` + `resources/fonts`, `npmRebuild: false`, mac `dmg`+`zip` with `identity: "-"`, win `nsis` x64 one-click per-user.
- Scripts: `dev` = `node scripts/dev.mjs`; `build` = three `vite build` runs; `package` = build + `electron-builder --dir`; `make` = build + `electron-builder` for the host, `make:mac` / `make:win` pin the target; `compile` = typecheck + make. Every `electron-builder` invocation passes `--config electron-builder.mjs` explicitly.
- The three Vite configs are standalone (no plugin): explicit `out/main`, `out/preload`, `out/renderer` outputs with `emptyOutDir`, `electron` + node builtins external, CJS preserved, renderer `base: "./"`. Both Paraglide plugin blocks pin `outputStructure: "locale-modules"` (ADR-0004): the compiler default re-emits one module per message (1229 files) and deletes the committed per-locale bundles, so a build rewrote the tracked tree.
- New `scripts/dev.mjs`: renderer dev server, watch builds for main/preload, Electron respawn on main changes, renderer full-reload on preload changes (modelled on cawa-93/vite-electron-builder). No orchestration dependency.
- `dependencies` shrank to `better-sqlite3` alone; the other nine runtime libraries moved to `devDependencies` (electron-builder's node-module collector copies `dependencies` independently of `files` - leaving them would ship each twice).
- pnpm: dropped the Forge-era `blockExoticSubdeps` (nothing resolves `@electron/node-gyp` any more) and the `fs-xattr`/`macos-alias` approvals; `electron-winstaller` is explicitly denied (pulled in for electron-builder's Squirrel target, which this app does not use). `nodeLinker: hoisted` is kept deliberately.
- `src/main/index.ts`: the Forge defines are gone - `process.env.VITE_DEV_SERVER_URL` (set by `scripts/dev.mjs`) replaces `MAIN_WINDOW_VITE_DEV_SERVER_URL`, the renderer loads `../renderer/index.html`, the preload resolves `../preload/index.js`.
- The packaged-app path moved to `dist/mac-arm64/...` behind one owner: `scripts/packaged-app.mjs` exports `findPackagedExecutable()` (with the `APP_PATH` override; `packaged-app.d.mts` declares it for the TypeScript caller), and `e2e/harness.ts` plus the four `scripts/*-e2e.mjs` resolve through it. Before the review fix below it was five hand-copied constants, and only two of the five honoured `APP_PATH`.

**Learned the hard way (recorded in ADR-0010).**

- electron-builder auto-detects only `electron-builder.yml/.json/.json5/.js/.ts`. The first `--dir` run silently used **defaults** - no extraResources, no `identity`, and an `@electron/rebuild` pass. The scripts now pass `--config electron-builder.mjs`, which also makes `npmRebuild: false` take effect ("skipped dependencies rebuild reason=npmRebuild is set to false").
- electron-builder does not ad-hoc sign on macOS by default; `mac.identity: "-"` is required or the bundle stays linker-signed only.
- The Windows NSIS target on macOS arm64 is wine-free *and* Rosetta-free: it downloads `nsis-3.0.4.1`, `nsis-resources-3.4.1` and `7zip-darwin-arm64`.
- `identity: "-"` + hardened runtime triggers electron-builder's `disable-library-validation` warning; the unpacked `better-sqlite3` binary is signed by the same ad-hoc pass, so it loads (smoke-verified). Noted in the config for a future native module.
- **The first packages shipped a downgraded app icon.** electron-builder discovers icons in the default `buildResources` directory (`build/`), which still held the pre-Forge 512px set from ticket 08, while the current 1024px icon lives in `resources/` (updated by the Forge migration commit). The packaged `Contents/Resources/icon.icns` hashed to the stale file. Icons are now declared explicitly (`mac.icon: resources/icon.icns`, `win.icon: resources/icon.ico`) and `build/` is deleted - auto-discovery into a directory nobody owns is a trap.

**Verification (2026-09-15, macOS 24.6.0 arm64).**

- `pnpm typecheck`, `pnpm lint`, `pnpm fmt:check` (on the touched files) clean; `pnpm test` → 319 passed (20 files).
- `pnpm build` → `out/main/index.js` (2.0 MB, `require("electron")` + better-sqlite3 external), `out/preload/index.js` (3.4 kB, single file), `out/renderer/index.html` + assets.
- `pnpm package` → `dist/mac-arm64/Email Blast.app`, ad-hoc signed (`Identifier=com.emailblast.desktop`, `flags=ad hoc,runtime`), carrying `resources/drizzle`, `resources/fonts`, `app.asar.unpacked/.../prebuilds/darwin-arm64.node`.
- `node scripts/smoke-packaged.mjs` → SMOKE PASS: window renders, bridge ping answers, app info reads from the asar, DB-backed settings round trip works, zero renderer console errors (re-run after the icon fix).
- Icon parity with the previous chain: `md5(dist/mac-arm64/Email Blast.app/Contents/Resources/icon.icns)` = `md5(resources/icon.icns)` = `1221098cac84513bbb69bce578991ce9`. The first packages carried `f56361951d73d3449ecc3290a779f762` - the stale 512px `build/icon.icns`.
- `pnpm test:e2e` → 15 files / 25 tests passed in 183 s against the electron-builder artifact.
- Dev loop: `pnpm dev` boots the renderer server and launches Electron; touching `src/main/index.ts` restarts the app (PID 80304 → 80463, loop survives); touching `src/preload/index.ts` rebuilds the preload in watch mode with the loop and the app alive.
- `npx electron-builder --config electron-builder.mjs --win` → `dist/Email Blast Setup 1.0.0.exe` (121 MB) + `.blockmap` + `dist/win-unpacked` with `resources/drizzle`, `resources/fonts` and `prebuilds/win32-x64.node`.
- `npx electron-builder --config electron-builder.mjs --mac` → `dist/Email Blast-1.0.0-arm64.dmg` + `Email Blast-1.0.0-arm64-mac.zip` (both with `.blockmap`); ad-hoc signed, notarization skipped as expected (`identity: "-"`).

**Code review (2026-09-16, two-axis over the working-tree diff).** Standards (repo standards + Fowler baseline smells) and Spec (this ticket + ADR-0010) ran as parallel agents. Four findings, none blocking; a fifth surfaced while preparing the commit. All fixed:

- *Spec -* the headline Windows artifact had no repo command: only the `npx electron-builder ... --win` line below could produce it. Added `make:mac` / `make:win` and documented both in the desktop README.
- *Spec -* ADR-0001's dev-loop and pnpm bullets still described Forge; annotated in the same "Corrected 2026-09-15" style as the bullets ticket 26 already corrected.
- *Standards -* the packaged-app path was copy-pasted in five files, and only `harness.ts` / `smoke-packaged.mjs` honoured `APP_PATH`. Replaced with `scripts/packaged-app.mjs` (+ `.d.mts`); all five now share one resolver, so `i18n-e2e`/`logs-e2e`/`quit-resume-e2e` gained the override and a clear missing-artifact error.
- *Standards -* six comments still explained the packaging as Forge's `extraResource`: `src/main/index.ts`, `src/main/db/repository.ts`, `src/main/services/fonts.ts`, `e2e/slot-font-faces.test.ts`, the `smoke-packaged.mjs` header, and ADR-0002's implementation note.
- *Found while preparing the commit -* the tree carried a `src/paraglide/` flip no ticket mentioned: `message-modules` (1229 files, `en.js`/`id.js` deleted) against the committed `locale-modules`. Pinned in both Vite configs; the regenerated output is byte-identical to the committed six files, and `git status` on `src/paraglide/` is clean. Recorded in ADR-0004.

Re-verified after the fixes: `pnpm typecheck` (node + web), `pnpm lint`, `oxfmt --check` on the touched files, `node --check` on all five scripts, `pnpm test` 319 passed (20 files), `pnpm build` re-emitting `src/paraglide/` with zero git delta, `node scripts/smoke-packaged.mjs` SMOKE PASS with and without `APP_PATH` set, and `findPackagedExecutable()` falling back to the default when `APP_PATH` points at nothing.

**Accepted gaps.** The NSIS installer is built but was never executed - there is no Windows host here, so install → launch → generate → uninstall on real Windows remains the follow-up. Windows code signing and macOS notarization stay deferred (ticket 21). The pre-existing `oxfmt` debt in 43 untouched files was left alone (not this ticket's diff).


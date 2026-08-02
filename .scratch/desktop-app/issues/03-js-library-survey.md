# 03: JS library survey

Type: research
Status: resolved

## Question

Survey and recommend the JS libraries for each function the app needs, replacing the old Rust crate survey (`archive/tauri-era/issues/01-rust-crate-survey.md`). The existing Bun CLI in `src/` already uses several — confirm them rather than re-derive, and call out anything the CLI does not cover.

Areas to cover, with license note (MIT/Apache-2.0 preferred, GPL not acceptable):

- **Excel reading**: xlsx (existing CLI) vs exceljs — read large files, column mapping to slots, duplicate-email detection. Current maintenance state of both (2026).
- **SQLite**: better-sqlite3 (native module — needs @electron/rebuild; verify current Electron version support) vs Node's built-in `node:sqlite` (check the Electron-bundled Node version and its stability) vs alternatives. App runs in the main process.
- **DOCX fill**: docxtemplater (existing CLI, proven, `{placeholder}` syntax) — confirm; cross-reference officecli (ticket 02) which may displace it.
- **DOCX → PDF**: LibreOffice headless is the incumbent (external binary); officecli `view pdf` candidate (ticket 02). No JS library needed unless one of those falls through — note current best JS-only option for completeness only.
- **Image → PDF**: pdf-lib + fontkit (existing CLI, proven) — confirm for certificate templates with text overlay.
- **SMTP**: nodemailer (existing CLI, proven) — confirm Gmail App Password auth, attachments, rate limiting hooks.
- **HTML email body**: message body with `{slot}` interpolation — string replace or a tiny template lib; note options (the old spec used plain interpolation).

Deliver a matrix: library | role | verdict | license | notes (Electron compatibility, native-module rebuild, maintenance). Cross-check against what `src/` actually does so nothing is re-derived from scratch.

## Answer

Research date 2026-08-02.
Basis: read the existing CLI in `src/` (index.ts, generate-attachment.ts, generate-certif.ts, send-email.ts, const.ts, type.ts, utils.ts) and the root package.json, then verified current state against the npm registry, GitHub API, and 2026 web sources.
The CLI already uses xlsx, docxtemplater + PizZip, libreoffice-convert, pdf-lib + @pdf-lib/fontkit, nodemailer, cli-progress.
Everything below is confirm/replace against that reality, not a fresh derivation.
Two adoptions and three version upgrades are recommended; everything else the CLI already runs is confirmed as-is.

### Decision matrix

| Library | Role | Verdict | Version (CLI -> current) | License | Notes |
|---|---|---|---|---|---|
| @e965/xlsx | Excel read | Adopt | n/a -> 0.20.3 | Apache-2.0 | Drop-in for the SheetJS API the CLI uses (XLSX.read/readFile, sheet_to_json, defval, header-row -> slot mapping). Community mirror with the SheetJS CVEs patched. Last publish Jul 2024: patched state is the point, not freshness. |
| xlsx (SheetJS) | Excel read | Replace | 0.18.5 | Apache-2.0 | npm registry frozen at 0.18.5 since ~2022/2023. Known prototype-pollution (fixed in 0.19.3) and ReDoS (fixed in 0.20.2) CVEs, no patched npm release, so npm audit can never fix it. Patched builds only via cdn.sheetjs.com with commercial terms. The CLI's exact API. |
| exceljs | Excel read | Reject | 4.4.0 | MIT | npm latest stuck at 4.4.0 since 2023, GitHub last push Jan 2025, 798 open issues. Streaming row reader only matters at 100k+ rows. No legacy .xls support. API change for zero benefit here. |
| node:sqlite | SQLite, main process | Adopt | built-in (Node 24.18) | MIT | Electron 43.1 (current stable, Jul 2026) ships Node 24.18; all 2026 Electron lines (41-45) bundle Node 24.x. Unflagged since Node 22.13, Release Candidate (stability 1.2) since 24.15, works in the Electron main process. Sync DatabaseSync API mirrors better-sqlite3. Zero native-module rebuild or packaging surface. |
| better-sqlite3 | SQLite fallback | Fallback | 13.0.2 | MIT | engines >=22, very actively maintained (repo pushed 2026-07-29, 68 open issues). Native addon: needs @electron/rebuild, ABI-matched prebuilds, and packaging integration. The 12.x line had real prebuild churn (two "not viable" releases, rollbacks, Windows fixes). Keep only as fallback if node:sqlite hits an API gap. |
| docxtemplater | DOCX fill | Confirm, upgrade | 3.67.1 -> 3.69.3 | MIT | Default delimiters are single braces `{` `}` - matches the locked `{placeholder}` decision exactly. paragraphLoop and linebreaks are free core features. Paid modules only cover pptx/html-in-doc extras, not needed. |
| PizZip | DOCX zip handling | Confirm | 3.2.0 | MIT OR GPL-3.0 (MIT option) | Same as CLI. Dual license: the MIT option satisfies the no-GPL constraint. Paid pro features (zip passwords) not needed. |
| LibreOffice headless (soffice) | DOCX -> PDF | Confirm (incumbent) | system LibreOffice; libreoffice-convert 1.7.0 -> 1.8.2 wrapper | MPL-2.0 (LibreOffice), MIT (libreoffice-convert) | Decided path per handoff + ticket 02. ~200MB prerequisite, detect on first launch. officecli `view pdf` is the challenger under ticket 02. |
| pdf-lib | Image -> PDF | Confirm | 1.17.1 | MIT | Proven in CLI: embedPng/embedJpg, embedFont with subset, drawText, widthOfTextAtSize. Last release 2021, maintenance-mode but stable, no native deps, main-process safe. |
| @pdf-lib/fontkit | Font embedding for pdf-lib | Confirm | 1.1.1 | MIT | Same as CLI. Font subsetting and width metrics for text centering. |
| nodemailer | SMTP | Confirm, upgrade | 7.0.10 -> 9.0.3 | MIT-0 | 7.0.0 May 2025 (SESv2 only, SES rate-limit helpers removed), 8.0.0 Feb 2026 (error code NoAuth -> ENOAUTH), 9.0.0 Jun 2026 (TLS cert validation on by default for remote content fetches). None of these affect this app: no SES, local-path attachments, no remote fetches. Gmail App Password auth, attachments, and pool rateLimit/rateDelta unchanged. |
| plain `{slot}` replace helper | HTML email body | Adopt | n/a | n/a | Small helper: regex over declared slots, escapeHTML on values, throw on unknown or missing slot. No template lib needed at this spec. Add eta (MIT) only if per-recipient conditionals arrive. |

### Area notes

1. **Excel reading**: all three options map header row to columns and leave duplicate-email detection to app logic (Set over lowercased emails); the CLI's column mapping pattern (lowercase header keys, defval "") ports unchanged.
The deciding factor is security posture, not features: shipping xlsx@0.18.5 means shipping known, npm-unpatchable CVEs in an app that reads files the user may have downloaded from email.
@e965/xlsx is the same codebase at 0.20.3 with those CVEs patched and the identical API, which is why it wins over both xlsx@0.18.5 and exceljs.
Sources: [amCharts upgrade guide](https://www.amcharts.com/docs/v5/tutorials/upgrading-version-of-the-xlsx-library/), [aistudio issue 918](https://github.com/psd401/aistudio/issues/918), [dev.to xls-reader article](https://dev.to/thiago_zanluca_25d94a7637/i-needed-to-read-an-old-xls-file-in-node-and-it-was-harder-than-it-should-be-2bg7), [exceljs repo](https://github.com/exceljs/exceljs).

2. **SQLite**: node:sqlite is the recommendation because the app has no other native modules, the DB workload is small and synchronous (recipients, jobs, logs, persisted send cursor), and Electron 43+ ships Node 24.18 where node:sqlite is Release Candidate and unflagged.
Two confirmed caveats: electron-vite must externalize `node:sqlite` for the main-process build (it does by default for node: builtins), and Electron 37.2.0 had a fixed regression ("No such binding: sqlite", fixed in 37.2.1 via PR 47706) - irrelevant on 43.
If a gap appears (extension loading, more exotic SQLite features), better-sqlite3 13.0.2 is the drop-in fallback.
Sources: [Node sqlite docs](https://nodejs.org/download/nightly/v24.0.0-nightly2025012408eeddfa83/docs/api/sqlite.html#class-session), [Better Auth sqlite docs](https://raw.githubusercontent.com/better-auth/better-auth/refs/heads/main/docs/content/docs/adapters/sqlite.mdx), [replace better-sqlite3 issue](https://github.com/alexey-pelykh/lhremote/issues/72), [Electron releases](https://releases.electronjs.org/schedule), [Electron PR 47706](https://github.com/electron/electron/pull/47706), [vite discussion 19278](https://github.com/vitejs/vite/discussions/19278).

3. **DOCX fill**: docxtemplater 3.69.3 confirms single-brace `{placeholder}` support (default delimiters `{` `}`), so the locked spec needs no delimiter shim.
Cross-reference ticket 02: officecli `merge` is delimiter-agnostic find/replace, which would remove the `{{key}}` vs `{placeholder}` concern entirely, but its PDF export fidelity is unverified (ticket 05 prototype).
Recommendation stands: docxtemplater remains the fill path until ticket 05 concludes; the ticket 02 note on `{{key}}` does not need to block anything.
Sources: [docxtemplater tag types](https://docxtemplater.com/docs/tag-types/), [docxtemplater configuration](https://raw.githubusercontent.com/open-xml-templating/docxtemplater/v3.4.2/docs/source/configuration.rst).

4. **DOCX -> PDF**: LibreOffice headless stays (decided), officecli `view pdf` is the ticket 02 candidate.
Best pure-JS fallback for completeness only: there is no free, reliable, pure-JS DOCX -> PDF renderer as of 2026.
Closest options: @matbee/libreoffice-converter (real LibreOffice compiled to WASM, ~150MB binary, slow init, effectively shipping LibreOffice in a worse form) and reamkit (pure spec-based TypeScript converter, genuinely dependency-free, but new with a tiny user base).
mammoth + jsPDF is documented as poor fidelity for letterhead-style layouts.
Keep LibreOffice/officecli; revisit reamkit only if both fall through.
Sources: [dev.to conversion comparison](https://dev.to/jakexkim/convert-docx-to-pdf-in-nodejs-every-option-compared-1oee), [@matbee/libreoffice-converter](https://www.npmjs.com/package/@matbee/libreoffice-converter), [reamkit](https://www.npmjs.com/package/reamkit), [dev.to WASM reality check](https://dev.to/digitalofen/i-tried-running-file-conversion-fully-in-the-browser-wasm-libreoffice-ffmpeg-57mh).

5. **Image -> PDF**: pdf-lib 1.17.1 + @pdf-lib/fontkit 1.1.1 confirmed, exactly what generate-certif.ts does (preload image and fonts once, per-recipient embedPng/embedFont/drawText, save).
Maintenance is slow (pdf-lib last release 2021) but the API surface is frozen and proven; no alternatives worth the churn.
Sources: [pdf-lib](https://github.com/Hopding/pdf-lib).

6. **SMTP**: nodemailer confirmed at 9.0.3 (MIT-0, more permissive than MIT).
Gmail App Password auth (service "gmail" or smtp.gmail.com + user/pass app password), file attachments (filename/path), and pool rate limiting (pool: true, rateLimit, rateDelta - exactly what send-email.ts uses) all unchanged through 7 -> 8 -> 9.
v9's TLS-certificate-verification change only affects remote URL attachments and OAuth fetches; this app uses local paths, so no opt-out needed.
Verdict: upgrade from ^7.0.10 to ^9.0.3; no code migration beyond the bump.
Sources: [nodemailer changelog](https://app.unpkg.com/nodemailer@8.0.1/files/CHANGELOG.md), [nodemailer v7.0.0 release](https://newreleases.io/project/github/nodemailer/nodemailer/release/v7.0.0), [Budibase 8 -> 9 bump](https://dependabot.ecosyste.ms/hosts/GitHub/repositories/Budibase%2Fbudibase/issues/18976).

7. **HTML email body**: the old spec's plain `{slot}` interpolation is sufficient; recommend a small helper, not a template lib.
Helper contract: parse the body for `{name}` patterns, replace only declared slots (the user-declared slot set), escapeHTML every value before insertion, and throw a descriptive error on unknown or missing slots.
This keeps the locked `{placeholder}` syntax, adds injection safety for free, and avoids the `{{}}` delimiter mismatch that mustache/handlebars would introduce.
If per-recipient conditionals ever appear, eta (MIT, ~5KB) is the smallest fit; not needed today.

### Native modules in Electron (@electron/rebuild) - only if better-sqlite3 is chosen

Node.js and Electron use different ABIs, so a native addon compiled for Node will crash Electron and vice versa.
Workflow: install @electron/rebuild as a devDependency, add a script `"rebuild": "electron-rebuild -f -w better-sqlite3"`, run it after every install and before packaging (electron-builder also runs @electron/rebuild automatically at package time).
Force (-f) a source rebuild when prebuilds lag a new Electron major; the better-sqlite3 12.x release notes show this lag is real (two "not viable" releases, a rollback, and a Windows-specific fix).
Verify the packaged binary by spawning Electron with ELECTRON_RUN_AS_NODE=1 and requiring the module before shipping.
Windows source builds require VS2022 Build Tools with the C++ workload.
Adopting node:sqlite (recommended) eliminates this entire class of problems: no rebuild script, no .node packaging, no ABI drift on Electron upgrades.
Sources: [electron-vite better-sqlite3 setup](https://blog.csdn.net/g470641382/article/details/161269561), [deepwiki desktop builds](https://deepwiki.com/yelanyanyu/ad-fontes-manager/7.1-desktop-builds-(electron)), [packaged app fix PR](https://github.com/bitsocialnet/5chan/pull/1095).

### Needs a call

1. Excel source: adopt @e965/xlsx (recommended) vs keep xlsx@0.18.5 pinned and accept known CVEs vs exceljs (not recommended).
2. SQLite: node:sqlite (recommended, Release Candidate not formally stable) vs better-sqlite3 (formally stable but native-module friction).
3. nodemailer major: ^9.0.3 (recommended) vs ^8.x if the June 2026 TLS change feels too fresh; no functional difference for this app.

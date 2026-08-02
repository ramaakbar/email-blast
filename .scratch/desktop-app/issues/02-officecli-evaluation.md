# 02: OfficeCLI evaluation

Type: research
Status: resolved

## Question

Evaluate officecli for this project. The user has the officecli skill installed (`/Users/ramaakbar/.claude/skills/officecli/`, binary `/opt/homebrew/bin/officecli` v1.0.143) and wants to know if it is beneficial — specifically whether it can replace parts of the current pipeline.

The app fills DOCX templates with `{placeholder}` single-brace slots (user-declared, matching Excel column names), then converts DOCX → PDF per recipient. Incumbents: fill via PizZip + docxtemplater (existing CLI, proven) or own zip XML string replace (old prototype); convert via LibreOffice headless (~200MB prerequisite).

Investigate and verify (the binary is installed — run `officecli help` / `officecli help docx` etc. to confirm capabilities against the skill's claims):

- **Fill**: `officecli set doc.docx / --find '{name}' --replace 'Budi'` — does it match across run boundaries (critical: Word splits text into runs mid-phrase)? Headers, footers, and table cells included? Batch mode for ~100-1000 docs? Resident mode performance for many sequential docs?
- **Convert**: `officecli view <file> pdf` — the PDF exporter plugin. Evidence of fidelity for letterhead-style DOCX (headers/footers/fonts/layout). This is the unverified part; flag clearly what needs a real-template prototype (ticket 05).
- **License**: handoff claims Apache-2.0 — verify against the actual project. Install model (curl script — audit-ability). Mac + Windows support.
- **XLSX read**: it can read .xlsx too — note whether it could serve Excel import (likely overkill; one-line note only, don't scope-creep).
- **Verdict**: recommendation on fill path (officecli vs docxtemplater vs zip replace) and convert path (officecli vs LibreOffice), and whether ticket 05 (fidelity prototype against the user's real templates) is worth running.

Context: existing CLI in `src/` (generate-attachment.ts, generate-certif.ts, send-email.ts) is the code reference. Templates live outside the repo (user's files). The handoff (`handoff-electron-switch.md`) raised the `{{key}}` vs `{placeholder}` delimiter question — the user's templates use `{placeholder}`, and officecli's find/replace is delimiter-agnostic, which may remove that concern entirely.

## Answer

**Verdict (short):** officecli is fully verified for fill, but its convert path is non-existent on current evidence - it cannot replace LibreOffice today.
(a) Fill: keep docxtemplater as the fill engine (in-process, proven, verified here to handle split runs / header / footer / table identically to officecli).
officecli `set --find/--replace` is verified as a capable, delimiter-agnostic alternative but adds a bundled 17.4MB native binary and a ~0.2-0.8s per-recipient process spawn for no functional win.
Raw zip string-replace: rejected - Word splits text into runs, which is exactly why docxtemplater was adopted.
(b) Convert: keep LibreOffice headless.
`officecli view <file> pdf` fails on this machine ("No exporter plugin found"), the plugin install command does not exist in v1.0.143, the official plugin registry is unreachable, and the only exporter implementation evidence (official plugin-protocol.md) wraps `soffice --headless --convert-to pdf` itself.
(c) Ticket 05: yes, worth running - DOCX->PDF fidelity on the user's real letterhead templates is still the unverified risk for whichever engine, and officecli's pdf story is fluid (registry down, plugins pre-release).

### Fill - verified working (binary v1.0.143)

- `officecli set doc.docx / --find '{name}' --replace 'Budi' --json` works and `--json` reports matched counts.
Actual run on a scratch doc with 5 occurrences returned `"matched": 5` and post-hoc verification confirmed all five replaced: body paragraph, a paragraph where `{name}` was deliberately split across three runs, a table cell, the header, and the footer.
- Cross-run matching: VERIFIED with a real split - paragraph built as runs "Hello " + "{na" + "me} world" replaced to "HelloBudi world".
This is the critical case (Word splits text into runs mid-phrase) and officecli handles it.
- Scope `/` covers headers, footers, and table cells (paths `/header[1]`, `/footer[1]`, `/body/tbl[N]/tr[N]/tc[N]` also addressable).
- No-match: exit 0 with `"matched": 0` and a JSON warning (`"code": "zero_matches"` plus a suggestion) - silent-success-with-warning, safe for scripts.
- Case-sensitive by default; regex via `r"..."` prefix on --find.
- Delimiter-agnostic: `{placeholder}` single-brace templates work directly, which removes the handoff's `{{key}}` vs `{placeholder}` concern for the fill path.
- Caveat found: replacing across run boundaries with differing formatting collapses the replacement to the first run's formatting (bold on the second run was LOST in the test).
Word's own replace and docxtemplater preserve per-run formatting.
Irrelevant for uniform-format placeholders, but worth one check against a real template.

### Batch fill - verified

- No batch-of-files command; batch paths are per-file CLI invocation, `merge`, or resident+batch for many ops on one document.
- `merge <template> <output> --data <json>` replaces `{{key}}` DOUBLE-brace placeholders only (single-brace `{single}` left untouched - verified), reports `replacedKeys` and `unresolvedPlaceholders` (missing keys stay literal in the output and are reported - verified).
Works across header/footer/table/split runs (verified).
- Measured performance (this machine, v1.0.143):
  - per-file `merge` (5 keys): 20 docs in 4.2s = ~0.21s/recipient, ~3.5 min for 1000 serial.
  - per-file `set --find/--replace` (fresh process, 200-paragraph doc): ~0.82s/recipient, ~14 min for 1000 serial.
  - 100 ops in ONE `batch` process on one document: 0.47s total, versus 26.9s for 100 sequential CLI calls - process spawn dominates, resident mode (open/close, 60s idle auto-flush) only helps many ops on one doc.
  - All per-file paths are process-based and trivially parallelizable across cores.

### Convert - NOT available on current evidence (the unverified risk)

- `officecli view <file> pdf -o out.pdf` exists as a mode but fails here: `Error: No exporter plugin found for .docx -> .pdf.` (exit 1, no output file).
`plugins list` reports "No plugins installed."
- v1.0.143 has NO `plugins install` subcommand (only list/info/lint) - the protocol's built-in installer is not shipped; manual install per protocol.
- Official plugin registry (https://officecli.ai/plugins/registry.json) returned HTTP 522 (and the mirror a 404) at research time - could not enumerate the official plugin set.
- The only exporter implementation evidence is the official repo's plugins/plugin-protocol.md (status "v1 final draft", "all plugins are pre-release"): the `officecli-pdf` example manifest (runtime dotnet, supports docx/xlsx/pptx) whose reference code runs `exec.Command("soffice", "--headless", "--convert-to", "pdf", ...)`.
The PDF exporter is DESIGNED to wrap LibreOffice, not to replace it.
- The HTML rendering engine (README's "high-fidelity" claim) powers html/screenshot/watch preview; per the protocol the pdf exporter plugin reads the source with its own libraries - no evidence of an HTML-engine-based PDF exporter exists.
- Web search found nothing for an officecli-pdf plugin in the wild.
- Conclusion: officecli cannot replace LibreOffice for conversion today.
At best, when the official plugin ships, it would be an interface over LibreOffice (same dependency, possibly a fidelity interface change - unverifiable until the plugin exists and is tested on real templates).

### License + platform - verified

- Apache-2.0 confirmed from the project's actual LICENSE file: https://github.com/iOfficeAI/OfficeCLI (raw: https://raw.githubusercontent.com/iOfficeAI/OfficeCLI/main/LICENSE).
- Platforms: macOS arm64/x64, Linux x64/arm64, Windows x64/arm64 (README binary table); Windows install via install.ps1.
- Install model: `curl -fsSL https://d.officecli.ai/install.sh | bash` (macOS/Linux), PowerShell for Windows, also brew/npm.
Audit notes: the script resolves an IMMUTABLE versioned release tag (vX.Y.Z) up-front, downloads from mirror (d.officecli.ai) with GitHub fallback, and verifies SHA256SUMS from both sources, aborting on mismatch; no code-signing mentioned.
curl|bash is the classic audit trade-off, mitigated by checksum verification plus an open repo.
- Binary: 17.4MB (plus ~1.9MB PDB), .NET-based (version string "@(#)Version 10.0.1026.32716"); locally installed via Homebrew.

### XLSX read - one line

officecli reads/writes .xlsx fully (get/query/set/import), but the app already ships the xlsx library - adding a native binary for Excel import is overkill, no benefit.

### Ticket 05 - worth running

The fill side of this ticket is now settled (cross-run/header/footer/table all verified for both officecli and docxtemplater), so ticket 05 should focus purely on conversion fidelity: DOCX->PDF of the user's real letterhead templates (headers/footers/images/fonts) with LibreOffice as the baseline, and re-test officecli pdf only if an official exporter plugin ships by then.
That is the single remaining unverified risk in the pipeline.

### Sources

- https://github.com/iOfficeAI/OfficeCLI (repo, Apache-2.0, README binary table, rendering engine claims)
- https://raw.githubusercontent.com/iOfficeAI/OfficeCLI/main/LICENSE (Apache-2.0 text)
- https://raw.githubusercontent.com/iOfficeAI/OfficeCLI/main/plugins/plugin-protocol.md (exporter protocol, officecli-pdf manifest, soffice reference implementation)
- https://d.officecli.ai/install.sh (install script: versioned immutable URLs, SHA256SUMS verification)
- Binary v1.0.143 local verification (commands and outputs as recorded above, scratch files under /tmp/octest)

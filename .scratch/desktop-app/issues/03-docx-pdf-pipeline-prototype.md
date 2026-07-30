# 03: DOCX to PDF pipeline prototype

Type: prototype
Status: resolved
Assignee: Akbar Ramadhan Yusri
Blocked by: 01

## Question

Can the rdocx-html + platform webview print-to-PDF pipeline produce PDF output from the existing DOCX templates that looks correct enough to ship?

Note from ticket 01: mammoth-rs does not exist. Tauri v2 has no first-party print-to-PDF API. The actual path is:
1. `docx-template` fills placeholders in DOCX
2. `rdocx-html` converts filled DOCX to HTML (early-stage crate, ~350 downloads)
3. Platform-specific webview APIs print HTML to PDF: WKWebView `createPDF()` on macOS, WebView2 `PrintToPdf()` on Windows

Test with:
1. The actual `template-lolos.docx` and `template-tidak-lolos.docx` templates (or equivalents)
2. Fill placeholder fields with sample data via `docx-template`
3. Convert via `rdocx-html` to HTML
4. Print HTML to PDF via platform webview API (macOS first)
5. Compare output side-by-side with the current LibreOffice-produced PDF

Acceptance criteria:
- Text content matches
- Positioning and alignment are close enough (doesn't need pixel-perfect, but must look professional)
- Tables, if present, render correctly
- Fonts are preserved or have acceptable fallbacks
- The approach is programmatically triggerable from Rust (no manual steps in the final flow)

If rdocx-html + webview print falls short, report exactly where and how. Fallback: generate document PDFs directly with `printpdf`, abandoning DOCX templates for a programmatic layout.

## Answer

**Result: FAIL (rdocx-html is insufficient) → Revised approach: LibreOffice.**

Prototype code and test outputs at `/tmp/docx-prototype-output/`.

### What was tested
1. **Fill**: ZIP XML string replace works perfectly — `{no}`, `{name}` → values. Skip `docx-template` crate (uses `{{}}` delimiters, incompatible).
2. **DOCX → HTML (rdocx-html 0.4.1)**: Parses and converts body paragraphs OK (fonts, bold, alignment preserved), but **does not support headers, footers, or images embedded in headers**. The letterhead (organization logo + name in header) is silently dropped. This is a dealbreaker for formal letter templates.
3. **HTML → PDF (WKWebView createPDF)**: Works programmatically on macOS 12+, but the HTML input is incomplete so the PDF is unusable.

### Revised approach: LibreOffice headless
- **Fill**: own zip XML string replace (~25 lines, no crate needed). Same as before.
- **DOCX → PDF**: LibreOffice headless (`soffice --headless --convert-to pdf`), identical to the existing CLI implementation
- **Certificate (image template → PDF)**: `printpdf` crate — overlay text on PNG background. No LibreOffice needed for this path.
- **SMTP**: `lettre` crate. No change.

### Implications
- LibreOffice is a prerequisite (~200MB install). The desktop app installer should check for it on first launch and provide a download link if missing.
- On macOS: `brew install --cask libreoffice` or bundled `.app`
- On Windows: installer download or bundled
- The app spawns `soffice` as a subprocess from Rust — no daemon mode needed, one-shot conversion per PDF
- This is exactly what the current Bun CLI does with `libreoffice-convert` — proven workflow, moving from JS to Rust with the same binary dependency

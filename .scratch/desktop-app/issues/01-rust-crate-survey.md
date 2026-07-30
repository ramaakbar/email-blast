# 01: Rust crate survey

Type: research
Status: resolved

## Question

Survey and recommend crates for each function the app needs.

Areas to cover:
- **Excel reading**: calamine vs xlsx-reader vs alternative
- **DOCX template filling**: docx-rs vs modify existing DOCX XML directly
- **DOCX to HTML**: mammoth-rs — confirm it handles the template's formatting (tables, alignment, fonts)
- **PDF generation from image template**: printpdf vs genpdf vs pdf-canvas — overlay text on PNG/JPG background
- **SMTP email**: lettre vs async-smtp — Gmail App Password auth, attachment support, rate limiting
- **PDF from HTML via Tauri webview**: confirm Tauri v2's webview print-to-PDF API exists and can be driven programmatically from Rust
- **State management**: sqlite (via rusqlite) vs a simpler embedded DB
- **CLI vs sidecar**: confirm whether mammoth + the PDF print step can run in-process or need external binaries

For each, give: the recommended crate, why, and its license compatibility with Tauri (MIT/Apache-2.0 preferred, GPL is not acceptable).

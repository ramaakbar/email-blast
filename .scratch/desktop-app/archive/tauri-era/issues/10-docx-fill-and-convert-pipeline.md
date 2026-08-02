# 10: DOCX fill and DOCX-to-PDF pipeline

Type: task
Status: ready-for-agent
Blocked by: 08

## What

Implement DOCX template filling (zip XML string replace on `{placeholder}`) and DOCX-to-PDF conversion via LibreOffice headless.

## Steps

### Part A: DOCX Fill

1. Create `src-tauri/src/pipeline/docx_fill.rs`
2. Implement `pub fn fill_template(template_path: &str, data: &HashMap<String, String>) -> Result<Vec<u8>, String>`
3. Algorithm:
   - Open .docx as ZIP archive via `zip` crate
   - Read `word/document.xml` into String
   - For each (key, value) in data: replace `{key}` with XML-escaped value
   - Also process `word/header*.xml` and `word/footer*.xml` if they exist in the ZIP
   - Write modified XML back into a new ZIP buffer, return it
4. XML-escape helper: `&` → `&amp;`, `<` → `&lt;`, `>` → `&gt;`, `"` → `&quot;`, `'` → `&apos;`
5. Write a test with a minimal .docx fixture containing `{name}` and `{date}` placeholders

### Part B: DOCX to PDF

6. Create `src-tauri/src/pipeline/docx_to_pdf.rs`
7. Implement:
   - `pub fn check_libreoffice() -> Option<String>` — runs `which soffice` (macOS) or `where soffice` (Windows), returns path or None
   - `pub fn convert(docx_bytes: &[u8], output_path: &str) -> Result<(), String>` — writes docx to temp file, spawns `soffice --headless --convert-to pdf --outdir <temp_dir> <temp_file>`, waits with 30s timeout, moves generated PDF to output_path, cleans up temp docx
8. Use `std::process::Command` with 30-second timeout (spawn + wait_with_output + timeout via tokio or separate thread)

## Acceptance

- `cargo test` passes (DOCX fill test with placeholder replacement + header/footer)
- `check_libreoffice()` returns Some(path) on systems with LibreOffice installed
- Manual test: fill a real DOCX template, convert to PDF, verify output looks correct

## Reference

Spec Sections 6.1 and 6.2. Decision from ticket 03: rdocx-html failed, LibreOffice headless is the chosen path. Existing CLI: `src/generate-attachment.ts` `generateLetterPDF()`.

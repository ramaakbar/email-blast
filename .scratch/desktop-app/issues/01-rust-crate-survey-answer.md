# 01: Rust crate survey -- answer

## Summary table

| Category | Recommended crate | Version | License | macOS | Windows | GPL? | Sidecar needed? |
|---|---|---|---|---|---|---|---|
| Excel reading | calamine | 0.35.0 | MIT | yes | yes | no | no |
| DOCX template filling | docx-template (xamgore) | 0.1.x | MIT | yes | yes | no | no |
| DOCX to HTML | rdocx-html | 0.1.2 | MIT / Apache-2.0 | yes | yes | no | no |
| PDF from image template | printpdf | 0.9.1 | MIT | yes | yes | no | no |
| SMTP email | lettre | 0.11.19 | MIT | yes | yes | no | no |
| PDF from HTML (webview) | platform-specific APIs | n/a | n/a | yes (WKWebView) | yes (WebView2) | no | no |
| Embedded database | rusqlite | 0.38.0 | MIT | yes | yes | no | no |

## Per-category details

### 1. Excel reading -- calamine

**Crate:** `calamine` (author: tafia)

**Version:** 0.35.0 (July 2025), 70+ releases, 9.4M total downloads.

**License:** MIT (not dual-licensed, but MIT is compatible with Tauri's permissive stack).

**Why:** Calamine is the dominant Rust library for reading Excel spreadsheets. It is pure Rust (no system dependencies), supports xlsx, xls, xlsb, xla, xlam, and ODS formats through a common Reader trait. It can deserialize rows directly into Rust structs via serde. Benchmarks from the Python binding (python-calamine) show ~5x speedup vs. pandas alone -- it reads a 100,000-row file in ~2.8 seconds. For this app, recipient data from spreadsheets is a perfect fit: read-only, structured rows, no formatting needed.

**Caveats:**
- Read-only (no writing). Writing is not needed here, but if you need it later, pair with `rust_xlsxwriter`.
- Dates may come back as f64 serial numbers; use the `chrono` feature for automatic conversion.
- No support for cell formatting, formulas, or encrypted workbooks.

**Alternatives considered:**
- `xlsx_reader` (v3.1.1): 0% documentation coverage on docs.rs -- too risky.
- `xlsx_batch_reader`: Low-memory batch processing for huge files, but narrower format support.
- `excel_reader` (v2.0.2): Good formatting support but heavier than needed.

---

### 2. DOCX template filling -- docx-template

**Crate:** `docx-template` (author: xamgore)

**Version:** 0.1.x (created June 2024, actively maintained).

**License:** MIT.

**Why:** This crate is purpose-built for replacing `{placeholder}` markers inside .docx files. It handles the tricky edge case where placeholders span across adjacent XML nodes (e.g., `<w:run>{place</w:run><w:run>holder}</w:run>`), which naive string replacement on the XML would miss. It uses Aho-Corasick internally for single-pass, near-O(n) replacement. It also supports image swapping and custom markup insertion, with optional integration via `docx-rs` or `docx-rust` features.

**Caveats:**
- Small but active community (13 GitHub stars, but the problem it solves is well-defined).
- Relies on the .docx file having specific `{placeholder}` markers already in the template.
- For complex table row duplication (repeating rows per recipient), you may need to manipulate the XML directly or use the `docx-rs` feature for custom markup.

**GPL-3.0 flag:**
- `simple-docx-template` (v0.1.0, November 2025) is **GPL-3.0**. Flagged as a deal-breaker. Do not use.

**Alternatives considered:**
- `docx-rs` (bokuweb, v0.4.x, MIT): Designed for building documents from scratch, not for template modification. Good for constructing new .docx files programmatically, but round-trip fidelity on existing documents is not guaranteed.
- `docxide-template` (v1.4.2): Type-safe compile-time approach that generates Rust structs from templates. Interesting but requires a build step and may be over-engineered for simple placeholder replacement.
- Direct XML manipulation: Always possible but error-prone and time-consuming. The .docx format uses complex XML schemas (Office Open XML) with relationships, styles, numbering, and content types that are easy to break.

---

### 3. DOCX to HTML -- rdocx-html

**Crate:** `rdocx-html` (part of the rdocx ecosystem)

**Version:** 0.1.2 (MIT / Apache-2.0 dual license).

**License:** MIT OR Apache-2.0.

**Why:** mammoth-rs does **not exist** as a Rust crate. The mammoth converter is available in JavaScript, Python, C#, and Java, but not Rust. `rdocx-html` fills this gap -- it is a pure Rust library that converts DOCX to HTML (and Markdown) by working directly from OOXML types. It provides `to_html_document()`, `to_html_fragment()`, and `to_markdown()`, supporting images, formatting, tables, and lists.

**Caveats:**
- Low download count (~350 all-time). The crate is in early stages and may lack edge-case handling for complex documents.
- The broader `rdocx` ecosystem also includes `rdocx-pdf` (PDF renderer from DOCX) and `rdocx-cli`, suggesting ongoing development.
- If rdocx-html proves insufficient for your template's formatting, fall back to bundling mammoth.js as a Node.js sidecar, or generate the HTML directly from data (skipping the DOCX intermediate entirely).

**Sidecar assessment:** rdocx-html runs in-process (no sidecar). mammoth.js would require bundling a Node.js runtime as a Tauri sidecar, which adds ~30MB to the bundle. Pure Rust is strongly preferred.

**Alternatives considered:**
- `rust365`: Comprehensive dependency-free CLI tool, byte-identical output to Fast365 across 400 real-world documents. But it's a CLI binary, not a library -- would need sidecar invocation.
- mammoth.js as a sidecar: Well-tested, handles complex formatting, but requires Node.js.

---

### 4. PDF generation from image template -- printpdf

**Crate:** `printpdf` (author: fschutt / RustWorks)

**Version:** 0.9.1 (February 2026), with 0.8.2 (March 2025). Actively maintained.

**License:** MIT.

**Why:** printpdf is the most capable pure-Rust PDF generation library with a layer-based architecture that is ideal for certificate generation. The workflow: add a PNG/JPG image to a PDF layer (the certificate background), then overlay text at precise coordinates on the same layer. It supports full Unicode via TTF/OTF font embedding, multiple pages, vector graphics, and SVG embedding (experimental in 0.8+).

For certificate generation specifically, the flow is:
1. Create a PdfDocument with a page/layer.
2. Load the background image (PNG/JPG) via the `image` crate and call `image.add_to_layer()`.
3. Call `layer.use_text("Recipient Name", font_size, x, y, &font)` for each text field.
4. Save the PDF.

**Caveats:**
- Text positioning is from the bottom-left corner of the page (cartesian coordinates). You may need to convert from top-left to bottom-left.
- Images are scaled at 300 DPI by default (one pixel = one dot at 300 DPI). May need to adjust if your templates use a different resolution.
- In debug mode, PDFs can be 6+ MB (images are not compressed). Always build in release mode for production (~100-200 KB).
- Fonts must be explicitly loaded from TTF/OTF files and embedded in the PDF.

**Alternatives considered:**
- `genpdf` / `genpdfi`: Higher-level API built on printpdf, but lacks a dedicated "set background image" API. Would need custom PageDecorator implementation. genpdfi (v0.2.3, July 2025) is the actively maintained fork.
- `pdf-canvas`: Lower-level, less documentation, smaller community.

---

### 5. SMTP email -- lettre

**Crate:** `lettre`

**Version:** 0.11.19 (stable), actively maintained.

**License:** MIT.

**Why:** Lettre is the de-facto standard for SMTP email in Rust. It supports Gmail SMTP with App Password authentication via STARTTLS on port 587. Attachments are supported via `MultiPart::mixed()` with `Attachment` and `SinglePart` builders. Async support via `AsyncSmtpTransport` + `Tokio1Executor`. The library is well-documented, widely adopted (92k+ downloads, used by hundreds of crates).

**Gmail configuration:**
- Host: `smtp.gmail.com`, port 587, STARTTLS
- Auth: `Credentials::new("email", "app-password")`
- App passwords require 2FA enabled on the Google account

**Rate limiting:** lettre does not provide built-in rate limiting. For bulk email sending to multiple recipients, implement throttling in your application layer -- for example, use `tokio::time::sleep` between sends or a `tokio::sync::Semaphore` to limit concurrency. A practical approach: send with a 500ms-1000ms delay between emails to avoid Gmail's rate limits (Google recommends no more than ~1 email per second for App Password auth).

**Caveats:**
- MIT-only license (not dual Apache-2.0, but fully compatible with Tauri).
- For very high-volume sending (>500 recipients), consider Gmail's daily sending limits (500 per day for standard accounts, 2000 for Workspace).
- No built-in retry logic -- implement your own for transient SMTP failures.

**Alternatives considered:**
- `async-smtp`: Largely superseded by lettre's async support. Less maintained.

---

### 6. PDF from HTML via Tauri webview

**Status:** No first-party Rust API in Tauri v2. Tracked in [tauri-apps/tauri#12284](https://github.com/tauri-apps/tauri/issues/12284).

**Platform-specific options:**

a. **Windows -- WebView2 PrintToPdf (recommended for Windows):**
   Access the underlying `ICoreWebView2_7` COM interface via `window.with_webview()` and call `PrintToPdf()`. This uses the exact same rendering engine as the webview, producing high-fidelity PDFs. Requires `webview2-com` and `windows` crates. Example:
   ```rust
   main_window.with_webview(|webview| {
       #[cfg(windows)]
       unsafe {
           let core = webview.controller().CoreWebView2().unwrap();
           let webview2 = core.cast::<ICoreWebView2_10>().expect("...");
           // webview2.PrintToPdf(...)
       }
   })
   ```

b. **macOS -- WKWebView createPDF():**
   Access the underlying `WKWebView` through wry's raw handle and call `createPDF(configuration:completionHandler:)`. Available on macOS 10.11+. Not exposed through Tauri's public API -- requires unsafe access to the webview internals.

c. **Pure Rust with printpdf (recommended cross-platform approach):**
   Generate PDFs directly from your data model using printpdf. For this app, this means:
   - **Certificates:** printpdf handles this natively (image background + text overlay).
   - **Document PDFs:** Either generate them programmatically with printpdf, or use `rdocx-html` to get HTML and then load that HTML into a hidden webview for printing.

**Current best practice for this app:**
- For certificates, use printpdf directly (no HTML step needed).
- For letter/document PDFs, use rdocx-html to produce HTML, then either (a) print via webview platform API, or (b) keep it in Rust with printpdf by generating the document layout programmatically.
- Avoid wkhtmltopdf -- the Rust crate is archived and the underlying library uses an outdated QT WebKit engine.

**Sidecar assessment:** The webview print approach is in-process (no sidecar). If you use printpdf everywhere, there is no sidecar dependency at all.

---

### 7. State management -- rusqlite

**Crate:** `rusqlite`

**Version:** 0.38.0 (actively maintained, versions 0.34 through 0.38 released in 2024-2025).

**License:** MIT.

**Why:** rusqlite is the most mature and widely used SQLite binding for Rust. It is a perfect fit for this app's state management needs: job history, logs, configuration. SQLite is embedded (no server process), cross-platform, and requires zero setup from the end user. The `bundled` feature compiles SQLite from source, ensuring consistent behavior and eliminating system library dependencies -- critical for shipping to both macOS and Windows.

Key features for this app:
- `bundled` feature: cross-platform SQLite compilation, no system deps.
- Serde integration: serialize/deserialize Rust structs directly.
- `chrono` feature: automatic timestamp conversion for job logs.
- `uuid` feature: if you need unique job IDs.

**Caveats:**
- SQLite's write concurrency is limited (single writer). For this app (one user, local database), this is irrelevant.
- The `bundled` feature adds ~5s to first compilation but produces a self-contained binary.

**Alternatives considered:**
- sled: Embedded key-value store, but less mature and no SQL query capability.
- redb: Embedded key-value store, fast, but no SQL.
- `hiqlite`: Built on rusqlite with Raft clustering -- overkill for a single-user desktop app.

---

### 8. CLI vs sidecar assessment

For every major function:

| Function | Recommended approach | Runs in-process? | Sidecar needed? |
|---|---|---|---|
| Excel reading | calamine (Rust lib) | yes | no |
| DOCX template filling | docx-template (Rust lib) | yes | no |
| DOCX to HTML | rdocx-html (Rust lib) | yes | no |
| PDF from image template | printpdf (Rust lib) | yes | no |
| SMTP email | lettre (Rust lib) | yes | no |
| PDF from HTML (documents) | Tauri webview platform API | yes (in-app webview) | no |
| State management | rusqlite (Rust lib) | yes | no |

**Conclusion: No external binaries or sidecars are required.** Every function can be implemented with pure Rust crates running in-process. This eliminates the complexity of bundling, versioning, and platform-specific binary management for external tools.

The only scenario that would require a sidecar is if you decide to use mammoth.js (Node.js) instead of rdocx-html -- but rdocx-html removes that need.

---

## License compatibility note

All recommended crates use MIT or MIT/Apache-2.0 licenses, which are fully compatible with Tauri's permissive (MIT/Apache-2.0) licensing. No GPL crates are recommended.

**Deal-breakers flagged:**
- `simple-docx-template`: GPL-3.0 -- do not use.
- `wkhtmltopdf` Rust crate: LGPLv3 (wkhtmltopdf itself) plus the Rust bindings are archived -- avoid.

## Cross-platform compilation

All recommended crates compile on both x86_64 macOS and x86_64/aarch64 Windows. Key notes:
- `rusqlite` with `bundled` feature: uses cc crate to compile SQLite from C source. Works on all platforms.
- `printpdf`: pure Rust, no native deps. Uses the `image` crate internally for raster graphics.
- `calamine`: pure Rust ZIP and XML parsing. No system deps.
- `lettre`: pure Rust SMTP. Uses `rustls` by default (no OpenSSL needed on macOS).

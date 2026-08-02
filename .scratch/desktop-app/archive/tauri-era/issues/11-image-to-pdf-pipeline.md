# 11: Image to PDF pipeline (printpdf)

Type: task
Status: ready-for-agent
Blocked by: 08

## What

Implement image-to-PDF certificate generation via the `printpdf` crate.

## Steps

1. Create `src-tauri/src/pipeline/image_to_pdf.rs`
2. Define:

```rust
pub struct TextOverlay {
    pub text: String,
    pub font_size: f64,
    pub x_mm: f64,       // from bottom-left (cartesian coordinates)
    pub y_mm: f64,
    pub font_index: usize,
    pub color: (u8, u8, u8),
}

pub fn generate(
    image_path: &str,
    overlays: &[TextOverlay],
    font_paths: &[String],
    output_path: &str,
) -> Result<(), String>
```

3. Algorithm:
   - Load background image via `image` crate, get pixel dimensions
   - Create `PdfDocument` with page matching image dimensions at 300 DPI
   - Add image as background layer on the page
   - Load each TTF/OTF font from `font_paths`
   - For each overlay: call `layer.use_text(text, font_size, x_mm, y_mm, &font)` with specified color
   - Save PDF to `output_path`
4. Write a test: create a 100x100 white PNG programmatically, overlay one text, verify PDF output is non-empty

## Acceptance

- `cargo test` passes (generates valid PDF from image + text overlay)
- Fonts load and render correctly (Unicode names work)
- Text positioning uses bottom-left origin (cartesian)

## Reference

Spec Section 6.3. Crate decision from ticket 01: `printpdf` 0.9. Existing CLI: `src/generate-certif.ts` (pdf-lib, same concept in JS).

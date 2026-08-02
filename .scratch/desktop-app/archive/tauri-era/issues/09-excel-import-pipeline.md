# 09: Excel import pipeline (calamine)

Type: task
Status: ready-for-agent
Blocked by: 08

## What

Implement the Excel reader pipeline that parses `.xlsx`/`.xls` files into recipient import previews.

## Steps

1. Create `src-tauri/src/pipeline/mod.rs`
2. Create `src-tauri/src/pipeline/excel.rs` with:

```rust
pub struct RecipientImport {
    pub name: String,
    pub email: Option<String>,
    pub phone: Option<String>,
    pub metadata: HashMap<String, String>,
    pub warnings: Vec<String>,
}

pub struct ImportResult {
    pub recipients: Vec<RecipientImport>,
    pub skipped_rows: u32,
    pub warnings: Vec<String>,
}

pub fn parse_recipients(file_path: &str) -> Result<ImportResult, String>
```

3. Algorithm:
   - Open workbook with `calamine::open_workbook_auto(file_path)`
   - Read first sheet, first row = headers (normalize: trim, lowercase)
   - Auto-map: "name" column → name field, "email" → email, "phone" → phone
   - All other columns → metadata HashMap (key = original header, value = cell string)
   - Skip rows with empty name, increment `skipped_rows`
   - Return `ImportResult`

4. Write a test with a minimal `.xlsx` fixture (create programmatically or read from a test file)

## Acceptance

- `cargo test` passes (Excel parse test)
- Reads both `.xlsx` and `.xls` formats
- Rows missing name are skipped with warning
- Extra columns land in metadata bag

## Reference

Spec Section 6.5. Existing CLI behavior in `src/generate-attachment.ts` `loadRecipientsFromExcel()`.

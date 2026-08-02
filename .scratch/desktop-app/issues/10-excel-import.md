# 10 — Excel import

**What to build:** The Import screen end to end: the user picks a `.xlsx`/`.xls` file (drag-and-drop or browse), sees a preview table of the first 50 parsed rows with dynamic metadata columns, reviews the auto-suggested column mapping (name / email / phone / custom metadata / skip), and commits the import. Duplicate email addresses are skipped with the count reported; a file with no recognizable name or email column shows a warning but still allows manual mapping.

**Blocked by:** 09 — First launch, database & settings

**Status:** ready-for-agent

- [ ] File selection → import preview (first 50 rows, dynamic metadata columns) with `ImportPreview { recipients, skippedDuplicates, warnings }`
- [ ] Column mapping UI: read-only Excel column name mapped to name / email / phone / custom metadata / skip, auto-mapped suggestions pre-selected, user-overridable
- [ ] No recognizable name/email column → warning shown, mapping still possible
- [ ] Commit imports recipients as an import batch; success toast "Imported N recipients. M duplicates skipped."; duplicate detection is lowercased-email based
- [ ] Seam A: the import pipeline parses a fixture spreadsheet, applies the mapping, dedupes, and reports skipped/warnings; commit persists recipients with their metadata bag and batch id

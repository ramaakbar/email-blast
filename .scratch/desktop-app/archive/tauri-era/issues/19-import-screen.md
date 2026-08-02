# 19: Import screen

Type: task
Status: ready-for-agent
Blocked by: 09, 13, 18

## What

Build the Import screen: drag-and-drop Excel file, preview table with auto-mapped columns, column mapping review, and commit to database.

## Steps

1. Create `src/components/ImportDropzone.tsx`
2. Create `src/routes/import.tsx`

### Flow

**Step A — File Selection:**
- Large drag-and-drop zone ("Drop Excel file here or click to browse")
- On click: open native file dialog via `@tauri-apps/plugin-dialog` `open()` filtered to `.xlsx,.xls`
- On drop/file selected: call `invoke('import_recipients', { excelPath })`
- Show loading spinner during parse

**Step B — Preview Table:**
- Render TanStack Table showing first 50 rows
- Columns: all detected Excel columns (dynamic)
- Rows that have warnings (missing name) are highlighted in yellow

**Step C — Column Mapping:**
- Two-column layout below the preview:
  - Left column: Excel column name (read-only label)
  - Right column: `<Select>` dropdown with options: "Name", "Email", "Phone", "Custom Metadata", "Skip"
- Auto-mapped suggestions are pre-selected (name → Name, email → Email, phone → Phone, everything else → Custom Metadata)
- User can override any mapping

**Step D — Commit:**
- "Import Recipients" button calls `invoke('commit_import', { recipients, columnMapping })`
- Success toast via shadcn `sonner`: "Imported 142 recipients. 3 duplicates skipped."
- Two action buttons appear: "Go to Compose" (navigates to `/compose`) and "Go to Recipients" (navigates to `/recipients`)

### Dependencies

```bash
pnpm add lucide-react
pnpm dlx shadcn@latest add table select dropdown-menu toast card button
```

### Components

- `ImportDropzone`: handles drag events, file dialog trigger, loading state
- Table: TanStack Table with `getCoreRowModel`, `flexRender`
- Column mapping: shadcn `Select` per column
- Toast: shadcn `sonner` `toast()`

## Acceptance

- Drag an `.xlsx` onto the zone → preview table renders with data
- Column mapping dropdowns work, can override auto-map
- "Import Recipients" commits to DB, toast shows count
- Duplicate emails are skipped with accurate count
- Navigation buttons appear after successful import

## Reference

Spec Section 7.3. Commands from ticket 13. `tauri-plugin-dialog` for file open.

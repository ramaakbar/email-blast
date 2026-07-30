# 20: Recipients screen

Type: task
Status: ready-for-agent
Blocked by: 13, 18

## What

Build the Recipients browser: TanStack Table with search, filter by import batch, inline detail panel, and bulk delete.

## Steps

1. Create `src/components/RecipientTable.tsx`
2. Create `src/routes/recipients.tsx`

### Layout

- Top bar: search input (full-text across name, email, custom fields) + import batch filter dropdown
- Main area: TanStack Table
- Right side: detail panel (slides in when a row is clicked)

### Table

Columns: Name, Email, Phone, Import Batch (label), Imported Date

- Data fetched via `useQuery({ queryKey: ['recipients', search, batch, page], queryFn: () => invoke('list_recipients', { search, importBatch: batch, page, pageSize: 50 }) })`
- Search input: debounced 300ms, triggers query refetch
- Import batch dropdown: populated from a separate query that gets distinct import batches (or derived from recipient list)
- Pagination: server-side via `page`/`pageSize` params
- Checkbox column for bulk select
- "Delete Selected" button appears when any checked, with shadcn `AlertDialog` confirmation

### Detail Panel

- Slides in from the right when a row is clicked (shadcn `Sheet` or custom slide-over)
- Shows: Name, Email, Phone, all metadata keys as key-value pairs, Import Batch ID, Imported Date
- "Close" button

### Bulk Delete

- Confirmation dialog: "Delete 5 recipients? This cannot be undone."
- On confirm: `invoke('delete_recipients', { ids })`, refetch table, toast "5 recipients deleted"

### Dependencies

```bash
pnpm dlx shadcn@latest add input badge alert-dialog sheet
```

## Acceptance

- Table loads recipients from DB
- Search filters results as you type (debounced)
- Import batch dropdown filters correctly
- Click row → detail panel opens with all metadata
- Bulk select + delete works with confirmation

## Reference

Spec Section 7.4. Commands from ticket 13.

# 21: Templates screen

Type: task
Status: ready-for-agent
Blocked by: 13, 18

## What

Build the Templates manager: grid of template cards, upload flow with slot scanning, and template detail/edit/delete.

## Steps

1. Create `src/components/TemplateCard.tsx`
2. Create `src/routes/templates.tsx`

### Layout

- Top: "Add Template" button
- Main: responsive grid of template cards (2-3 columns)
- Each card: template name, type badge (DOCX/Image), slot count, created date
- Click card → detail view (inline expansion or dialog)

### Add Template Flow

1. User clicks "Add Template" → native file dialog filtered to `.docx,.png,.jpg,.jpeg`
2. On file selected:
   - If DOCX: call `invoke('scan_template_slots', { filePath })` to extract `{placeholder}` patterns
   - If Image: show empty slot list, user must add slots manually
3. Show form:
   - Template name (text input, defaults to filename)
   - Slots (displayed as tags/badges, editable — user can add/remove)
   - Output pattern (text input, default: `{name}.pdf`, help text shows available slots)
   - Preview of first rendered filename: "LOA_Alice.pdf"
4. "Create Template" button → `invoke('create_template', { name, filePath, slots, outputPattern })`
5. Toast: "Template created"

### Template Detail

- Opens when clicking a card (shadcn `Dialog` or expand inline)
- Shows: name, type, file path, all slots as tags, output pattern, created date
- "Edit" button → switches to edit mode (inline form)
- "Delete" button → confirmation dialog → `invoke('delete_template', { id })`
- Text hint: "Edit this template in Word" (DOCX) or "Edit in Photoshop/Figma" (Image)

### Dependencies

```bash
pnpm dlx shadcn@latest add card badge dialog input label
```

## Acceptance

- Template grid loads from DB
- Add flow: file picker → slot scan → form → create → appears in grid
- DOCX slot scanning extracts `{placeholder}` patterns correctly
- Edit updates template fields
- Delete removes with confirmation

## Reference

Spec Section 7.5. Commands from ticket 13. Decision from ticket 03: no built-in editor; templates edited externally.

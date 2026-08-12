# 10 — Recipient edit + Logs inline fix

**What to build:** A new `recipients.update` operation (name, email, phone) on RecipientsService, surfaced in two places: a row edit on the Recipients page, and a "fix email" action on failed rows in Logs that fetches the recipient by id, saves through the same op, and hands off to the existing failed-recipients retry flow (single or batch). Email gets a light "must contain @" check on edit only; import stays permissive. Edits are live: send jobs read current recipient rows, so a paused job's resume picks up a fixed address while sent/failed rows keep their recorded outcome. Logs rows whose recipient was deleted are display-only (no edit). No email snapshot added to job history — SMTP error text already records the rejected address (ADR 0008).

**Blocked by:** None — can start immediately.

**Status:** done

- [x] `recipients.update` op exists on the wire table, service, and repository: name/email/phone, not-found error, "must contain @" validation on email
- [x] Recipients page offers edit per row and persists through the new op
- [x] Logs failed rows offer "fix email"; the modal shows the current address, saves via the same op, and retry sends to the corrected address
- [x] Deleted-recipient rows in Logs are display-only
- [x] Pause → edit → resume delivers to the new address for pending recipients; sent/failed outcomes unchanged
- [x] Service tests for update (validation, not-found) and e2e for edit-then-retry landing on the SMTP capture server with the corrected address

## Answer

Implemented in `email-blast-desktop/`:

- `src/shared/wire.ts` + `src/shared/ipc.ts` - `recipients.update` (1-arg channel) with `RecipientUpdatePayload` `{ id, name, email|null, phone|null }` → `Recipient`; the preload derives the method from the wire table automatically (additive contract)
- `src/shared/recipient-edit.ts` (pure seam) - `validateRecipientEdit`: name required, email optional but must contain "@" on edit only (import stays permissive); returns the i18n message or null
- `src/main/db/repository.ts` - `RecipientPatch` + `updateRecipient(id, patch)`: updates name/email/phone in place, email normalized trim+lowercase exactly like insert, returns the updated row or none
- `src/main/services/recipients.ts` - `RecipientsServiceShape.update` with `InvalidRecipientEdit` (validation message) and `RecipientNotFound` tagged errors; the `update` op row in `recipientsOperations`
- Renderer `routes/recipients.tsx` - per-row pencil Edit button (row-click still opens the detail panel), `EditRecipientDialog` prefilled with name/email/phone, server-side validation errors shown in the dialog, toast "Recipient updated." + query invalidation (list and detail) on success
- Renderer `routes/logs.$jobId.tsx` - failed rows gain "Fix email" next to Retry; `FixEmailDialog` fetches the recipient by id (`recipients.get`), shows the CURRENT address, saves through the same `recipients.update` op (name/phone carried through unchanged), toasts "Address fixed - retrying the send.", and hands off to the existing per-row retry flow (`retry([recipientId])` → Send workspace prefill, ticket 07). A fetch that returns null (recipient deleted) renders the dialog as display-only with no save button
- No email snapshot added to job history (ADR 0008): the send loop already resolves current recipient rows per run, so a resume or retry picks up the fixed address while sent/failed outcomes keep their recorded result
- i18n: 11 new keys across `recipients`/`jobDetail` in `messages/en.json` + `messages/id.json`, compiled into `src/paraglide/` (committed)

Tests:
- Seam A (service): 6 new tests in `recipients.test.ts` - edit persists with metadata untouched, email normalization (trim+lowercase) and blank-phone → null, empty-name and missing-@ rejections (failed edits change nothing), RecipientNotFound for unknown id, null-email edit accepted
- Pure seam: `src/shared/recipient-edit.test.ts` - 6 cases over the email-format check
- Seam B (e2e, `e2e/recipient-edit.test.ts`): edit on the Recipients page persists in the directory; fix-email in Logs shows the current address, saves, and the retry lands on the SMTP capture server with the corrected address (attachment included); a seeded paused job's pending recipient is edited on the Recipients page and the Logs resume delivers exactly that recipient at the corrected address while the sent outcome stays untouched

Verified 2026-08-12: typecheck (node + web), oxlint, full vitest suite (293 tests, 19 files), full e2e suite (24 tests, 14 files) against the freshly packaged app; the repo's committed code is not oxfmt-clean under the installed formatter (39 pre-existing files), so only the new code follows oxfmt and pre-existing lines were left untouched.

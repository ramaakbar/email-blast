# 14 — SMTP profiles & Settings completion

**What to build:** The Settings screen's SMTP section end to end: the user saves named SMTP profiles (host, port, username, app password), sees them listed with masked passwords, edits and deletes them, and can test a profile's connection with a typed error on failure. The profile list is exposed through IPC for the compose wizard's SMTP step.

**Blocked by:** 09 — First launch, database & settings

**Status:** done

- [x] Profile list with masked passwords; add/edit/delete dialogs work
- [x] "Test Connection" per profile succeeds against a valid SMTP server and reports a typed error (connect/auth) when not
- [x] Profiles are available to the wizard's SMTP step (via the `smtp` domain IPC)
- [x] Seam A: profile CRUD round-trip; `test` against a local SMTP server succeeds, and against a bad host fails with a typed `SendError`

---

Verified end to end on 2026-08-03:

- Seam A: 14 new vitest tests green (109 total): create round-trip with the password masked (the public shape carries `hasPassword`, never the credential), trim normalization, validation rejections (empty name/host/username, ports 0 and 70000, empty password on create); update round-trips with a null password keeping the stored one - proven against a live server that only accepts the NEW credential; update/testProfile of unknown ids fail with SmtpProfileNotFound; delete reports the count and newest-first ordering is deterministic (rowid tiebreak within the same creation second); `test` succeeds against a real local SMTP server (smtp-server on an ephemeral port), fails with typed SmtpConnectFailed against a closed port, and fails with typed SmtpAuthFailed against a credential-rejecting server; `testProfile` uses the stored credential.
  The connection tests run over plaintext (`hideSTARTTLS`): smtp-server's bundled STARTTLS certificate expired 2025-02-09 and modern Node rejects it before auth is ever reached; the seam is about connect + auth semantics.
- Live app driven with Playwright `_electron` against a temp userData (`--user-data-dir` - a HOME override does not move userData on macOS; the real dev database was left untouched and verified empty of test rows): first-launch Get Started, Settings screen: the add-profile dialog (name, host, port with the 465 = Implicit TLS / else STARTTLS hint, username, app password with the Gmail app-password note), the profile row shows the masked password, per-profile Test Connection succeeds against a live local server ("Connected - the server accepted these credentials.") and shows the typed connect error inline for a closed port ("SmtpConnectFailed: connect ECONNREFUSED 127.0.0.1:9999"), edit keeps the stored password when the field is left blank, delete with confirmation returns to the empty state.
  The save-failure path was exercised for real: deleting a profile through the bridge while its edit dialog is open makes the update fail with SmtpProfileNotFound, which renders inline inside the dialog while the dialog stays open.
- typecheck (node + web), oxlint, oxfmt, full vitest suite green; `pnpm build` green

Code review (five-axis, parallel agents; findings scored 0-100) found 10 issues; the real ones were fixed and re-verified in the live app:

- A failed save showed its error behind the dialog's backdrop (the section banner renders under the fixed overlay, so the message was invisible while the dialog stayed open) - the dialog now receives the mutation error and renders it inline, staying open; verified live by deleting the profile mid-edit and watching the SmtpProfileNotFound strip appear in the dialog
- Escape and backdrop clicks closed the form/confirm overlays while a save/delete was in flight, so "cancel" lied (the operation still committed, and a stale onSuccess could close a freshly reopened dialog) - dismissal is now gated on the mutation's pending state
- A stale error banner persisted after a subsequent successful mutation - onSuccess now clears loadError, and opening a dialog resets it
- `smtp:get` returned a raw value where every other handler Schema-encodes (the exact shape ticket 13's review fixed for `generate:get-status`) - now encoded like the rest
- The shared Api doc claimed the test "fails with a typed SendError", but SendError lives in main and only a string crosses the bridge - reworded to describe what the renderer actually receives
- The error-message comment overclaimed ("every domain service error", "what stays is the actionable message"): tag-only errors (SmtpProfileNotFound) surface as the bare tag, and the tag stays in the message - comment corrected; the tag is kept deliberately because it names the failing phase the ticket asks the UI to report
- The smtp.test.ts comment blamed "@types/smtp-server" for a promise close() the types never declared (they declare the callback form; the runtime returns nothing without a callback) - corrected
- SMTP app passwords are stored plaintext at rest (the schema shipped with ticket 09 and the spec never mandates encryption; safeStorage would couple the deliberately Electron-free domain layer) - recorded under deviations as the v1 posture, with the password masked at the IPC boundary
- The port-field validation flash on clear (Number("") === 0) and the unqualified "STARTTLS" label were reviewed and kept: the port error is factually accurate, the save button gates correctly, and the label's doc comment now carries the "when the server offers it" qualifier

Deviations from the spec, all deliberate:

- `smtp:get` and `smtp:testProfile(id)` are additive beyond the decision-4 table (`list/create/update/delete/test`): the per-profile Test Connection must work without the stored password, which never crosses the bridge, so the main process resolves it from the profile row - `test({ host, port, username, password })` stays for the wizard's inline form
- The SendError taxonomy lands typed at the service boundary (SmtpConnectFailed / SmtpAuthFailed / SmtpSendFailed); across IPC the rejection carries the "Tag: detail" message string, matching how tickets 10-13 already serialize errors (the decision-4 curated envelope is not implemented; `errorMessage()` strips the Electron prefix and keeps the tag so the UI can tell connect from auth). AttachmentNotFound is deferred to the send pipeline, which will extend the union
- Passwords are stored plaintext at rest (the ticket-09 schema) and never leave the main process: the public shape carries `hasPassword` only, and testProfile/update resolve the credential internally. safeStorage-backed encryption would make the domain layer Electron-bound and break the headless Seam A tests; a future ticket can inject a cipher without changing the repo contract
- Port 465 gets implicit TLS, every other port STARTTLS when the server offers it (nodemailer's behavior), falling back to plaintext - the form labels the modes so the user knows what to expect for common ports (465/587/25)

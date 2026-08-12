# 02 — SMTP passwords encrypted at rest

**What to build:** SMTP passwords — both in profiles and in the inline overrides stored with past Send Jobs — are encrypted at rest with the OS keychain via Electron safeStorage. On first run after upgrade, any legacy plaintext values are migrated to ciphertext in place. No user-visible behavior changes; sending and "Test connection" keep working.

**Blocked by:** None — can start immediately.

**Status:** done

- [x] After first run post-upgrade, stored profile passwords are not readable plaintext in the database
- [x] Inline SMTP overrides stored with past Send Jobs are also encrypted
- [x] Sending through an existing profile after migration works (mail reaches the capture server)
- [x] "Test connection" works after migration
- [x] Newly created profiles store their password encrypted from the start
- [x] On platforms where safeStorage is unavailable, the app degrades gracefully (clearly logged, no crash)

## Answer

Implemented in `email-blast-desktop/` (commit `281d9de`):

- `main/services/credential-crypto.ts` wraps Electron safeStorage with a ciphertext marker (`enc:v1:` prefix, `isCiphertext`), so stored values are recognizable and never double-encrypted; legacy plaintext passes through reads unchanged
- Profile passwords and inline Send Job SMTP overrides are stored encrypted (columns `password`, `smtp_override_json`); reads decrypt through the same seam
- `migrateCredentialsAtRest` runs at boot before any service reads credentials: legacy plaintext values are encrypted in place; on platforms without a usable keychain it logs clearly and the app stores plaintext (graceful degradation, no crash)
- The credential crypto rides the same seam into the repository (injected, so tests use a null keychain)

Tests: Seam A in `repository.test.ts`/`smtp.test.ts` (encrypted-at-rest assertions, ciphertext never double-encrypted, migration of plaintext rows); Seam B `e2e/passwords-at-rest.test.ts` launches the packaged app on a fresh userData dir, seeds a legacy plaintext profile, relaunches, and asserts the DB holds ciphertext while sending and Test Connection still work against the SMTP capture server.

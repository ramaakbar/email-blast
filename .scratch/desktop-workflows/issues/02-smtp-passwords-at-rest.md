# 02 — SMTP passwords encrypted at rest

**What to build:** SMTP passwords — both in profiles and in the inline overrides stored with past Send Jobs — are encrypted at rest with the OS keychain via Electron safeStorage. On first run after upgrade, any legacy plaintext values are migrated to ciphertext in place. No user-visible behavior changes; sending and "Test connection" keep working.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [x] After first run post-upgrade, stored profile passwords are not readable plaintext in the database
- [x] Inline SMTP overrides stored with past Send Jobs are also encrypted
- [x] Sending through an existing profile after migration works (mail reaches the capture server)
- [x] "Test connection" works after migration
- [x] Newly created profiles store their password encrypted from the start
- [x] On platforms where safeStorage is unavailable, the app degrades gracefully (clearly logged, no crash)

# 01 — SMTP Profile default Sender Identity

**What to build:** SMTP Profiles carry a default Sender Identity (from name, from address, optional reply-to) that the send step prefills from the selected profile — still fully editable per job, never mutating the profile. Inline (ephemeral, no-profile) SMTP entry keeps working exactly as today. A soft, non-blocking warning appears when the per-job From address is overridden to one the provider is likely to reject.

**Blocked by:** None — can start immediately.

**Status:** done

- [x] Creating or editing an SMTP Profile in Settings lets the user set a default sender name, from address, and optional reply-to
- [x] Choosing a profile in the send step prefills sender name, from address, and reply-to from the profile
- [x] The prefilled identity is editable per job, and job edits do not change the profile
- [x] Sending with an overridden identity delivers mail with the overridden name/address/reply-to (verified via the SMTP capture server)
- [x] A soft, non-blocking warning shows when the From address is overridden to one the provider likely rejects (e.g. a different domain on a known provider like Gmail); sending still proceeds
- [x] Inline (no-profile) SMTP entry and "save as profile" work as before
- [x] Existing profiles without a default identity still send with a manually typed identity

## Answer

Implemented in `email-blast-desktop/` (commit `f8412b4`):

- `smtp_profiles` gains `default_sender_name`, `default_sender_address`, `default_reply_to`; profile CRUD + `getCredentials` return the default identity
- Send step: picking a profile seeds the job's sender name/address/reply-to from it; job edits never write back to the profile (per-job columns on the send job, ADR 0008's shape)
- A soft non-blocking warning flags a per-job From address that mismatches the account domain of a known provider (e.g. Gmail) or differs from the profile's default identity; sending proceeds regardless
- `shared/sender-identity.ts` owns the identity normalization/validation used by both the profile form and the send step

Tests: Seam A in `smtp.test.ts`/`send-jobs.test.ts` (identity round-trips, override delivery); Seam B `e2e/smtp-profile-identity.test.ts` verifies override mail lands on the SMTP capture server with the overridden name/address/reply-to.

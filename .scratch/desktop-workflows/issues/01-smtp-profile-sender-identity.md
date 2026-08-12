# 01 — SMTP Profile default Sender Identity

**What to build:** SMTP Profiles carry a default Sender Identity (from name, from address, optional reply-to) that the send step prefills from the selected profile — still fully editable per job, never mutating the profile. Inline (ephemeral, no-profile) SMTP entry keeps working exactly as today. A soft, non-blocking warning appears when the per-job From address is overridden to one the provider is likely to reject.

**Blocked by:** None — can start immediately.

**Status:** ready-for-human

- [x] Creating or editing an SMTP Profile in Settings lets the user set a default sender name, from address, and optional reply-to
- [x] Choosing a profile in the send step prefills sender name, from address, and reply-to from the profile
- [x] The prefilled identity is editable per job, and job edits do not change the profile
- [x] Sending with an overridden identity delivers mail with the overridden name/address/reply-to (verified via the SMTP capture server)
- [x] A soft, non-blocking warning shows when the From address is overridden to one the provider likely rejects (e.g. a different domain on a known provider like Gmail); sending still proceeds
- [x] Inline (no-profile) SMTP entry and "save as profile" work as before
- [x] Existing profiles without a default identity still send with a manually typed identity

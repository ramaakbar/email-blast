# 04: Data model & domain glossary

Type: grilling
Status: resolved

## Answer

See `CONTEXT.md` at the repo root for the full glossary. Summary of decisions:

- **Recipient**: name + channel addresses (email, phone for WA later) + metadata bag for campaign-specific fields. App is a dumb pipe: Excel column names map to template slots.
- **Template**: user-declared slots (not auto-discovered). File + type (docx|image) + output naming pattern.
- **Generate Job**: recipients × template → PDFs. Independent from Send.
- **Send Job**: recipients × channel → delivery status. Per-job channel config (SMTP per campaign, not global).
- **Send status**: pending → sent | failed | skipped.
- **Channel seam**: email (SMTP) v1, WhatsApp v2. Same job structure, different config per channel.
- All jobs persist forever; user can revisit past jobs.

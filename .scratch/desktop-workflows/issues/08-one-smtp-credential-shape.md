# 08 — One SMTP credential shape, shared across the seam

**What to build:** The SMTP inline-credential concept currently exists as three unconnected shapes. Lift it into ONE Effect `Schema` in `shared/ipc.ts`; main and renderer consume that same shape, and the renderer's hand-rolled reshape plus `Number(port)` coercion dies.

**Status:** ready-for-agent

**Origin:** architecture review candidate 2 (Strong) — "The SMTP credential leaks across the seam as three unconnected shapes; string/number drift is untyped."

## The three shapes today

1. `main/services/smtp.ts:66` — `SmtpCredentials` interface `{ host, port: number, username, password }` (main-only, unimportable by the renderer). Used by `verifySmtp`, `sendSmtp`, `SmtpServiceShape.test/send/getCredentials`, and `send-jobs.ts` `resolveCredentials`.
2. `shared/ipc.ts:621` — `SendSmtpOverrideInfo` schema `{ host, port, username }` — NO password, deliberately: the read-back contract (`SendJob.smtpOverride`), so `send.get-status` never echoes a credential. This one stays as the projection.
3. `shared/ipc.ts` `SendStartPayload.smtpOverride` — an inline anonymous `Schema.Struct({host, port: Number, username, password})` — the actual wire shape, duplicated in-line instead of named.
4. Renderer `smtp-step.tsx` — hand-rebuilds the override object from form strings and `Number()`-coerces the string port.

## Design direction (settled in the parent session's grilling)

- Add `SmtpCredentials` as a named `Schema.Struct` in `shared/ipc.ts` (4 fields, `port: Schema.Number`), export its `Schema.Schema.Type`; make `SendStartPayload.smtpOverride` reference it. Keep `SendSmtpOverrideInfo` as the password-stripped projection — it is a different contract, not the same concept.
- `main/services/smtp.ts` deletes its local `SmtpCredentials` interface; imports the type from `shared/ipc`. Same for `send-jobs.ts`'s import.
- `send-jobs.ts` `resolveCredentials` currently hand-checks the decrypted `smtpOverrideJson` with four `typeof` checks and a custom error. Replace with `Schema.decodeUnknownSync(SmtpCredentials)` — the manual check dies, the schema validates, error path preserved.
- Renderer: `smtp-step.tsx` builds the override through the shared shape; the string-port coercion collapses into one typed construction (or a shared parse helper in `shared/` if the form keeps strings).

## Open frontier for the implementing session (grill these first)

- Q1 — Renderer coercion: (a) keep `Number(port)` at the single payload-construction site, typed against the shared type; (b) `Schema.NumberFromString` on the wire so main decodes "587" and the renderer never coerces; (c) a shared parse helper `parseSmtpOverride(form): SmtpCredentials | error`. Recommended: (a) or (c) — keep the wire schema's `Type` exactly the domain type.
- Q2 — Scope of validation: validate only the wire path (`decodePayload` already does), or ALSO the decrypted-JSON path in `resolveCredentials` (recommended: yes — it kills the hand-rolled typeof ladder).

## Verification expected

- `pnpm typecheck:node && pnpm typecheck:web && pnpm lint`
- `pnpm test` — smtp/send-jobs suites cover the changed paths
- e2e (19 tests) against a fresh `pnpm package` — the Send workspace's inline override path (connect test + send) is the proof
- Renderer compiles with zero `Number(` coercion of the port

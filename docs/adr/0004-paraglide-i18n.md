# ADR-0004: Paraglide for UI language, Bahasa Indonesia + English

**Status:** Accepted

**Date:** 2026-08-04

## Context

The UI is English-only with strings hard-coded in components. The target users speak Bahasa Indonesia; the app must present in Bahasa Indonesia and English, with the user's choice persisting across launches and room to add more languages later without restructuring.

## Decision

Use Paraglide-JS (inlang) for renderer i18n, shipping two locales: `id` (Bahasa Indonesia) and `en` (English). A language switcher in Settings saves the choice through the settings store; on launch the saved choice applies, defaulting to the system locale with English as fallback. User-facing strings in the main process (errors, dialogs) use the Paraglide JS runtime variant.

## Consequences

- Message catalogs live in Paraglide resource files in both locales; the Vite plugin compiles them into typed message functions, so a wrong message key is a type error.
- UI strings move out of components into the catalog.
- Additional locales are additive: one more resource file and locale config.
- Paraglide's Vite plugin must support Vite 8 (verified in ticket 19); the main process needs the JS runtime variant, not the renderer plugin.
- **Output structure is pinned (2026-09-16).** Both `vite.main.config.mjs` and `vite.renderer.config.mjs` pass `outputStructure: "locale-modules"`. The compiler default, `message-modules`, emits one module per message - 1200+ files under `src/paraglide/messages/` - and deletes the per-locale `en.js`/`id.js` bundles, so every `pnpm dev`/`pnpm build` rewrote the committed tree (the state ticket 26's working tree was left in). `locale-modules` reproduces the committed output byte for byte; it is also the compiler's dev recommendation, and the app ships both locales anyway, so the production tree-shaking argument for `message-modules` does not apply here.

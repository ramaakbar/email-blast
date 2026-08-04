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

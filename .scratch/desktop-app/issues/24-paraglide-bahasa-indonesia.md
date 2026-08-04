# 24 - Paraglide i18n (Bahasa Indonesia + English)

**What to build:** UI language via Paraglide-JS (ADR-0004) with two locales: `id` (Bahasa Indonesia) and `en` (English). Wire the Paraglide Vite plugin (Vite 8 compatibility verified first), create the message catalog in both locales, move every user-facing renderer string out of components into the catalog, and localize main-process user-facing strings (errors, dialogs) via the Paraglide JS runtime variant. Add a language switcher in Settings; the choice persists (saved via the settings store) and applies on launch. Default follows the system locale with English as fallback. Screens built after this ticket use the catalog, not hard-coded strings (applies to ticket 16's Logs screens).

**Blocked by:** 19 - Vite 8 upgrade

**Status:** ready-for-agent

- [ ] Paraglide Vite plugin works on Vite 8
- [ ] Catalog holds `id` and `en`; the UI switches between both
- [ ] Language switcher in Settings; the choice is saved and restored on launch
- [ ] Main-process strings localized via the JS runtime variant
- [ ] typecheck + lint green (wrong message keys are type errors); E2E smoke passes with both locales

# 24 - Paraglide i18n (Bahasa Indonesia + English)

**What to build:** UI language via Paraglide-JS (ADR-0004) with two locales: `id` (Bahasa Indonesia) and `en` (English). Wire the Paraglide Vite plugin (Vite 8 compatibility verified first), create the message catalog in both locales, move every user-facing renderer string out of components into the catalog, and localize main-process user-facing strings (errors, dialogs) via the Paraglide JS runtime variant. Add a language switcher in Settings; the choice persists (saved via the settings store) and applies on launch. Default follows the system locale with English as fallback. Screens built after this ticket use the catalog, not hard-coded strings (applies to ticket 16's Logs screens).

**Blocked by:** 19 - Vite 8 upgrade

**Status:** done (2026-08-08)

- [x] Paraglide Vite plugin works on Vite 8
- [x] Catalog holds `id` and `en`; the UI switches between both
- [x] Language switcher in Settings; the choice is saved and restored on launch
- [x] Main-process strings localized via the JS runtime variant
- [x] typecheck + lint green (wrong message keys are type errors); E2E smoke passes with both locales

**Stack (verified against the released packages):** `@inlang/paraglide-js@2.23.2` only - its `paraglideVitePlugin` (unplugin-based, peer `vite >=5.0.0`) compiles the catalog in both the main and renderer Vite builds; the separate `@inlang/paraglide-js-adapter-vite` package is not needed. The message-format plugin (`plugin-message-format@4.4.0`, loaded from jsdelivr per inlang's module system) requires an explicit `plugin.inlang.messageFormat.pathPattern` in `project.inlang/settings.json` - without it the SDK imports zero messages. Its syntax has no ICU plural/select and no literal-brace escape, so plurals are `_one`/`_other` message pairs resolved in code (`lib/plural.ts`), and literal `{placeholder}` text is passed as a param value from the call site.

**How it works:**

- `project.inlang/settings.json` + `messages/en.json` + `messages/id.json` (the `id` catalog is the source of truth for future locales; the compiled output is committed under `src/paraglide/` like `routeTree.gen.ts`, with `emitTsDeclarations` so a wrong message key or parameter is a type error)
- The Vite plugin runs with `strategy: ["globalVariable", "baseLocale"]` - the app owns the locale via `setLocale(locale, { reload: false })` (no URL/cookie/localStorage paths), and `baseLocale` is the fallback before the first `setLocale` (a `globalVariable`-only strategy throws "No locale found" in the tests until a locale is set)
- Settings: the `language` row joins `SETTING_KEYS`, seeded at first launch from `app.getLocale()` normalized by `normalizeUiLocale` (shared `src/shared/settings.ts`, en fallback); `Settings` gains typed `getLanguage`/`setLanguage`; the boot program applies the persisted locale before window creation so the main process's error strings are in the user's language from the first IPC call
- Renderer: `main.tsx` reads the setting (fallback `navigator.language`) and applies it before the first paint; `lib/locale.ts` holds a tiny store (`applyLocale` + `useLocale` over `useSyncExternalStore`) because `setLocale(..., { reload: false })` does not re-render anything itself; `__root.tsx` subscribes at the root so the whole tree re-renders on a switch (message functions read the locale at call time)
- The Settings screen gained a Language section with the two options; clicking applies the locale instantly and persists it through the settings store
- Every user-facing renderer string now comes from the catalog (verified by a leftover-string scan - only the "Email Blast" brand and the "Bahasa Indonesia"/"English" self-names remain hard-coded); main-process user-facing strings (send/generate/templates/import services, the shared SMTP and template validations, native dialog filter names) use the same compiled messages
- The language switcher, the locale seeding, and `normalizeUiLocale` are covered by new unit tests (settings.test.ts)

Verified end to end on 2026-08-08:

- Seam A: 4 new vitest assertions green (169 total): the language seeds from a normalized OS locale (id-ID -> id, fr-FR -> en) without clobbering on re-seed, and round-trips through the Effect Layer with normalization on the raw-write path
- Seam B (`scripts/i18n-e2e.mjs`, packaged app, temp userData): a first launch seeds a valid shipped locale from the OS (asserted); the seeded English profile renders the shell and Settings in English; the language switcher flips the shell and Settings to Bahasa Indonesia instantly (no reload); a relaunch with the same userData dir boots straight into Bahasa Indonesia - the choice persisted. Zero renderer console errors. Screenshot: `scripts/i18n-e2e-id.png`
- The existing `scripts/logs-e2e.mjs` and `scripts/smoke-packaged.mjs` now seed `language=en` (they drive the UI by English strings - a non-English OS locale would otherwise flip their assertions) and both pass; the packaged smoke additionally seeds `libreoffice_checked=true` so the second launch renders the shell deterministically
- typecheck (node + web), oxlint, the full vitest suite, and `pnpm build` (electron-forge package) all green

Packaging fix found along the way (pre-existing, exposed by the ticket's fresh `pnpm install`):

- The packaged app crashed at boot: `better_sqlite3.node` was missing. better-sqlite3 v13 is Node-API (`gypfile: false`) and its published prebuilds are ABI-stable, but `forge.config.ts` excluded `/node_modules/better-sqlite3/prebuilds` under the stock-Node-ABI assumption, relying on a `build/Release` binary that @electron/rebuild skips for Node-API modules and that the ticket's `pnpm add` had wiped from node_modules. The ignore rule now ships the prebuilds (unpacked via `**/*.node`); binding.js resolves them in Electron directly. `scripts/smoke-packaged.mjs` verifies the packaged app boots.

Deviations from the spec, all deliberate:

- The catalog holds plural forms as `_one`/`_other` pairs resolved in code (the message-format plugin has no plural syntax) instead of ICU plurals in the message text
- Literal `{placeholder}` examples in the catalog are parametrized (the call site passes the braced literal) because the plugin treats every `{...}` as a variable reference with no escape syntax
- Persisted send-log error strings are stored in the language that was active when the failure happened; a later language switch does not re-translate history (data, not UI)

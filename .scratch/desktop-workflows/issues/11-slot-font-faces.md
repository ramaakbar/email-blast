# 11 — Per-slot font faces for image templates

**What to build:** Slot layouts gain a font face (family + weight where available), defaulting to Helvetica Bold so unconfigured slots and the legacy render branch are byte-identical. A main-process font manager lists bundled faces and manages uploads (TTF/OTF copied into the app data dir; missing files fall back to Helvetica Bold). The slot-layout editor's per-slot controls gain a face picker plus an "add font" file picker. Rendering: the renderer preview loads the same file bytes via `FontFace` (measurement for fit-to-width uses the chosen face) and pdf-lib embeds them at generate time — the preview-equals-PDF invariant must hold. Bundled set: Great Vibes, Montserrat, Poppins (SIL OFL, static weights where available). pdf-lib embeds whole fonts; certificate size grows by used face size (~100-500KB) — accepted (ADR 0009).

**Blocked by:** None — can start immediately.

**Status:** done

- [x] Slot layout config carries a font face id; absent = Helvetica Bold, validation covers the new field
- [x] Font manager service: list bundled faces, add uploaded font, resolve face id → file bytes, fallback on missing file
- [x] Slot editor shows the face picker per slot (family + weight where available) and an add-font file picker
- [x] Preview renders slot text in the chosen face and measures fit-to-width with it
- [x] Generate embeds the chosen face via pdf-lib; PDF text matches the preview
- [x] Legacy/unconfigured templates render exactly as today (Helvetica Bold)
- [x] Bundled faces ship as app resources in packaged builds (forge extraResource); uploads persist in the app data dir
- [x] Shared tests for resolution/fallback; service tests for the font manager; e2e: configure a slot face, generate, PDF renders in that face

## Answer

Implemented in `email-blast-desktop/`:

- `src/shared/ipc.ts` - `SlotLayout.fontFace` (string id or null = legacy Helvetica Bold), `FontFaceInfo` `{ id, family, weight|null, weightLabel|null, kind: bundled|uploaded }`, `FontFileResponse`; `fonts` domain (`list`/`getFile`/`add`) plus `system.pickFontFile` added to WIRE + Api (the preload's compile-time wire/Api drift guard enforces them)
- `src/shared/slot-layout.ts` - `validateSlotLayout` covers `fontFace` (null or non-empty string; undefined/other types rejected), `normalizeSlotLayout` reads pre-ticket JSON rows as Helvetica Bold; applied in `db/repository.ts` `toTemplate` so old templates render byte-identical
- `src/main/services/fonts.ts` - font manager: bundled table (Great Vibes, Montserrat Regular/Bold, Poppins Regular/Medium/SemiBold/Bold, all SIL OFL) + uploads scanned from the app data dir, each parsed via fontkit for family/weight; `addFont` validates TTF/OTF, copies into `userData/fonts` with a unique name; `resolveBytes`/`getFileData` return none for unknown, missing, unreadable, or path-traversal ids (reads wrapped so the generate pipeline falls back instead of throwing); `fontsOperations` registered in the composition root
- `src/main/services/generate-jobs.ts` - `GenerateEnv.findFontBytes` (sync seam over the font manager); `renderImagePdf` pre-embeds the distinct used faces with pdf-lib + `@pdf-lib/fontkit` (whole-file embed, one PDFFont per face) and falls back to Helvetica Bold for unconfigured/unknown/missing/corrupt faces; the legacy branch is untouched
- Renderer `lib/font-faces.ts` - face list + per-face `FontFace` loader over `fonts.getFile` (the same bytes the PDF embeds), cached per id, settled-null treated as missing
- Renderer `components/slot-layout-editor.tsx` - per-slot face picker (family + weight where available) and an add-font flow (native picker → `fonts.add` → list refresh + toast); fit-to-width measurement and the preview boxes render with the chosen face, falling back to the legacy Helvetica approximation for unconfigured/unknown/loading/failed faces
- `resources/fonts/` - bundled TTFs + OFL licenses; shipped via Forge `extraResource: ["drizzle", "resources/fonts"]` (verified inside the packaged .app's `Contents/Resources/fonts`)
- i18n: 9 new keys (slotFontFace, slotFontFaceDefault, addFont, fontAdded, fontAddFailed, fontListFailed, dialogs.fontFilter, fontsService.*) across `messages/en.json` + `messages/id.json`, compiled into `src/paraglide/` (committed)

Tests:
- Pure seam: `src/shared/slot-layout.test.ts` - fontFace validation (null/string accepted, undefined/number/empty rejected) and `normalizeSlotLayout` legacy-row cases
- Seam A (service): `src/main/services/fonts.test.ts` - 16 tests: bundled list metadata, upload add/copy/parse, per-add unique copies, extension/garbage/missing rejections, byte resolution for bundled + uploaded, none for unknown/missing/deleted/stray-directory/traversal ids, mime + base64 payload, unreadable-file skip
- Seam A (generate): 4 tests in `generate-jobs.test.ts` - chosen face embedded next to Helvetica Bold, fit-to-width uses the face's own metrics, missing face falls back to Helvetica Bold at the configured position, corrupt face still generates (helper `pdfUsedFonts` in `test-helpers.ts` reads the PDF's font resources)
- Seam B (e2e, `e2e/slot-font-faces.test.ts`): registers an image template, uploads a font through the editor's add-font flow, configures a bundled face (Great Vibes) on one slot and the upload on another, generates, and asserts the PDF embeds both `GreatVibes-Regular` and `TheSeasons-Bd` - covering the packaged app's bundled resources too

Verified 2026-08-12: typecheck (node + web), oxlint, full vitest suite (319 tests, 20 files), full e2e suite (25 tests, 15 files) against the freshly packaged app; code review (agent) flagged 2 issues (settled-null face load measured with an unregistered family; TOCTOU in face byte reads) - both fixed with regression tests.

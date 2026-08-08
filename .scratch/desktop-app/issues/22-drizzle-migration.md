# 22 - Drizzle migration

**What to build:** Replace the hand-written `src/main/services/sqlite-repo.ts` with Drizzle ORM over SQLite (ADR-0002): Drizzle schema definitions that mirror the existing tables, repository modules, and all services re-pointed to them. The on-disk database keeps its tables and format so existing user data opens unmodified. The transactional critical sections (send outcome + cursor in one transaction, cancel remainder + status in one transaction) keep their atomicity guarantees. Wire drizzle-kit for future schema changes. The existing unit and Layer-seam suites staying green with identical behavior is the migration proof.

**Blocked by:** none (parallel with 19)

**Status:** resolved

- [x] Drizzle schema mirrors the current tables; an existing database file opens unmodified
- [x] All services use the Drizzle repository; `sqlite-repo.ts` deleted
- [x] Critical-section transactions verified equivalent (no double-send, no partial cancel)
- [x] drizzle-kit wired for future migrations
- [x] Full suite green, behavior unchanged

## Answer

The hand-written layer is replaced by two modules under `src/main/db/`:

- `schema.ts` - the Drizzle schema mirroring the on-disk format (spec decision 7, verbatim): the eight tables, defaults, indexes, FKs, and CHECK constraints.
  The CHECKs are declared explicitly because drizzle's sqlite `text({ enum })` mode is TypeScript-only and emits no column CHECK; the original tables carried them, so the mirror does too.
- `repository.ts` - the same `SqliteRepo`/`SqliteRepoShape`/`makeSqliteRepo` surface, now Drizzle-backed (`drizzle-orm/better-sqlite3`), plus `openDatabase` which applies pending migrations on open.
  The service imports only moved (`./sqlite-repo` to `../db/repository`); no consumer code changed shape.

**Driver (ADR-0002 "better-sqlite3 dialect"):** `drizzle-orm/better-sqlite3` + the `better-sqlite3` package (13.0.3).
Drizzle's `node:sqlite` driver only exists in the 1.0-rc line (the stable 0.45.x line does not ship it), so the battle-tested stable combo wins; the migration-proof ticket does not bet on an rc.
better-sqlite3 v13 enables FK enforcement by default (the inverse of raw SQLite and of the `node:sqlite` driver the old layer guarded against), so `openDatabase` turns it off explicitly - deleted recipients/templates keep their historical job rows (ticket 11).

**Migrations (drizzle-kit wired):** `drizzle.config.ts` at the package root, `drizzle/` folder with the bootstrap migration, `pnpm db:generate` / `pnpm db:push` scripts.
The bootstrap migration (0000) was generated from the schema and hand-edited to `CREATE TABLE IF NOT EXISTS` / `CREATE INDEX IF NOT EXISTS`, so an existing database opens unmodified (its stored DDL is never rewritten) while fresh databases get the full schema; the snapshot file is untouched so future `drizzle-kit generate` diffs work.
`openDatabase` runs `migrate()` from `drizzle-orm/better-sqlite3/migrator` on every open; future migrations apply automatically.
The packaged app resolves the folder via forge `extraResource` (`resources/drizzle`), dev/tests from the package root.

**Packaging:** the forge vite plugin's default ignore packs only the `.vite` build (every dependency was bundled before).
better-sqlite3 is the first externalized module (its `binding.js` resolves the native binary relative to its own package directory), so the forge config now also ships `node_modules/better-sqlite3` (+ its build dep `node-addon-api`, which the native rebuild resolves), unpacks `**/*.node` from the asar, and excludes the published `prebuilds/` (stock-Node ABI; they would shadow the Electron-ABI binary forge rebuilds into `build/Release`).
`vite.main.config.mjs` externalizes `better-sqlite3`.

**Verification (2026-08-08):**

- The existing `sqlite-repo.test.ts` moved to `src/main/db/repository.test.ts` and passes unchanged against the Drizzle implementation (Seam A, the TDD seam); a new test seeds a database with the historical pre-Drizzle DDL + data and asserts it opens unmodified (tables, data, stored DDL all intact).
- The real dev database (`~/Library/Application Support/Email Blast/email-blast.db`) opens on a copy: every table, every row, and the original stored DDL untouched; only `__drizzle_migrations` bookkeeping added.
- Full suite 168 tests / 12 files green, `typecheck` (node + web), `oxlint`, `oxfmt` all green.
- Packaged smoke (`scripts/smoke-packaged.mjs`, Playwright `_electron`, temp `--user-data-dir`): packaged app launches, renderer loads, bridge answers, DB-backed settings round-trip through the Drizzle repository, zero console errors.
- Dev boot (`pnpm dev`): `[boot] Effect layer ready` with the Drizzle layer.

**Critical sections:** unchanged semantics, now via `db.transaction` (better-sqlite3): `persistSendOutcome` (outcome + cursor in one tx), `cancelSendJob` (pending→skipped + status/completedAt in one tx), `retryFailedSendJob` (reset + cursor rewind in one tx), plus the batch inserts.
The send-pipeline suite (ticket 15) covers the double-send / partial-cancel / cursor-rewind behaviors and stays green.

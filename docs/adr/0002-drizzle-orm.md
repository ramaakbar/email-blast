# ADR-0002: Drizzle ORM for the persistence layer

**Status:** Accepted

**Date:** 2026-08-04

## Context

Persistence is a hand-written repository over SQLite (`src/main/services/sqlite-repo.ts`) with raw SQL statements and manual row mapping. Every feature duplicates statement-writing and mapping, and the send/generate pipelines hand-roll transactions for their critical sections. As the schema grows (recipients, templates, settings, send jobs, progress), the raw layer costs more per feature.

## Decision

Replace the custom repository with Drizzle ORM over SQLite (better-sqlite3 dialect). The on-disk database keeps its existing tables and format so user data survives the migration unchanged.

## Consequences

- `sqlite-repo.ts` is replaced by a Drizzle schema plus repository modules; services re-point to them.
- drizzle-kit is introduced for future schema changes.
- The transactional critical sections (send outcome + cursor in one transaction, cancel remainder + status in one transaction) must preserve their atomicity guarantees under Drizzle.
- The existing unit and Layer-seam test suites are the migration proof: they must stay green with identical behavior.

## Implementation notes (ticket 22, 2026-08-08)

- Driver: `drizzle-orm/better-sqlite3` + the `better-sqlite3` package (the "better-sqlite3 dialect" in this ADR).
  Drizzle's `node:sqlite` driver exists only in the 1.0-rc line, so the stable line wins.
  better-sqlite3 v13 turns FK enforcement ON by default; `openDatabase` turns it off explicitly (historical job rows must survive recipient/template deletion, ticket 11).
- Layout: `src/main/db/schema.ts` (tables, with the CHECK constraints declared explicitly - drizzle's sqlite enum mode is TypeScript-only) and `src/main/db/repository.ts` (the `SqliteRepo` service, unchanged shape).
  `drizzle/` holds migrations, applied by `migrate()` on open; the bootstrap migration is idempotent (`IF NOT EXISTS`) so existing databases open unmodified.
  The packaged app ships the folder as a forge extra resource.
- The `node:sqlite` `DatabaseSync` handle is gone everywhere; the layers take a better-sqlite3 `Database`.

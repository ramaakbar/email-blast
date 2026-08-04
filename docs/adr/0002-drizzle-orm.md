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

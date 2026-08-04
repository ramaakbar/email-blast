# 22 - Drizzle migration

**What to build:** Replace the hand-written `src/main/services/sqlite-repo.ts` with Drizzle ORM over SQLite (ADR-0002): Drizzle schema definitions that mirror the existing tables, repository modules, and all services re-pointed to them. The on-disk database keeps its tables and format so existing user data opens unmodified. The transactional critical sections (send outcome + cursor in one transaction, cancel remainder + status in one transaction) keep their atomicity guarantees. Wire drizzle-kit for future schema changes. The existing unit and Layer-seam suites staying green with identical behavior is the migration proof.

**Blocked by:** none (parallel with 19)

**Status:** ready-for-agent

- [ ] Drizzle schema mirrors the current tables; an existing database file opens unmodified
- [ ] All services use the Drizzle repository; `sqlite-repo.ts` deleted
- [ ] Critical-section transactions verified equivalent (no double-send, no partial cancel)
- [ ] drizzle-kit wired for future migrations
- [ ] Full suite green, behavior unchanged

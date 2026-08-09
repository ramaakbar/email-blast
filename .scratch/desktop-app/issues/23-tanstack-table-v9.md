# 23 - TanStack Table v9

**What to build:** Upgrade `@tanstack/react-table` from v8 (`^8.21.3`) to v9 and move every screen's tables onto it: recipients, logs, job detail (per-recipient table), templates. Start with a research step on the v9 API deltas from v8 (column definitions, filtering/pagination surface) against primary sources, keeping current sorting/filtering behavior and the existing styling. Compatibility with React 19 is verified before the switch.

**Status:** wontfix (user decision 2026-08-09 - the v8 tables are shipped and working; the v9 upgrade is deferred. Revivable by flipping the status back; the full ticket text remains above.)

- [ ] v9 research recorded: API deltas from v8, React 19 compatibility (primary sources)
- [ ] All tables on v9; sorting/filtering behavior preserved
- [ ] Visual consistency checked across screens (E2E smoke)

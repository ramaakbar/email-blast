## Agent skills

### Issue tracker

Issues are tracked as local markdown files under `.scratch/<feature-slug>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Uses the five canonical triage labels with their default names (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout — one `CONTEXT.md` at the repo root plus `docs/adr/`. See `docs/agents/domain.md`.

## Learning more about the Effect

This repository uses the Effect Typescript library (pinned `4.0.0-beta.102` in `package.json`).

Before writing any Effect code, read the usage documentation in `.repos/effect/LLMS.md` (generated from `.repos/effect/ai-docs/`) for the APIs and best practices you need. The docs track the latest `main`, so confirm anything that seems new or different against the installed source.

If you need to learn more about particular Effect apis and concepts that the guide doesn't cover, search through the source code in `node_modules/effect/src` (the installed version) or `.repos/effect/src` (the vendored repo).

`.repos/effect/.agents/AGENTS.md` is the library's contributor guide for editing Effect itself, not for app code - its commands and patterns do not apply here.

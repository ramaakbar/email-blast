# 02: Tauri v2 + React + Vite + pnpm scaffold

Type: research
Status: resolved

## Question

What is the correct way to scaffold a Tauri v2 project with:
- React + TypeScript frontend inside a pnpm workspace
- Vite as the bundler (via `vite-plus` or plain Vite)
- oxlint for linting, oxfmt for formatting
- Tailwind CSS v4 + shadcn/ui
- TanStack Router, TanStack Query, TanStack Table

Specific unknowns:
- Does `pnpm create tauri-app` support React + TypeScript + pnpm out of the box, or is manual wiring needed?
- How to configure pnpm workspace so Tauri's Rust backend and the React frontend coexist cleanly?
- What's the correct way to integrate oxlint + oxfmt into the pipeline (pre-commit hook, CI)?
- Tailwind v4 + shadcn/ui in a Tauri webview — any known issues?
- Vite dev server proxying to Tauri — does Tauri v2's `beforeDevCommand` handle this or is there a better pattern?

Output: a working `pnpm tauri dev` that opens a window with a React app shell.

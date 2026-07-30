# 07: Scaffold Tauri v2 + React + Vite + pnpm project

Type: task
Status: ready-for-agent

## What

Scaffold the full Tauri v2 desktop app project with the complete frontend toolchain.

## Steps

1. Run `pnpm create tauri-app@latest email-blast-desktop` with React + TypeScript + pnpm
2. Install Tailwind CSS v4 + @tailwindcss/vite, replace `src/index.css` with the full shadcn/ui New York style CSS (variables at `:root`/`.dark`, `@theme inline` block, `@layer base`)
3. Create `src/lib/utils.ts` with `cn()` helper, install `clsx` + `tailwind-merge`
4. Run `pnpm dlx shadcn@latest init` (New York, Zinc, CSS variables=Yes, RSC=No)
5. Add a shadcn `button` component to verify, delete `tailwind.config.ts` if present
6. Install TanStack Router + Query + Table, configure Vite plugin, wire up `src/main.tsx` with `RouterProvider` + `QueryClientProvider`
7. Create `src/routes/__root.tsx` (sidebar layout shell) and `src/routes/index.tsx` (redirect to `/recipients`)
8. Install oxlint + oxfmt, create `.oxlintrc.json`, add `package.json` scripts (`lint`, `lint:fix`, `fmt`, `fmt:check`), add `.vscode/settings.json` and `.vscode/extensions.json`
9. Verify: `pnpm install && pnpm tauri dev` opens a native window with the React app and sidebar

## Acceptance

- `pnpm tauri dev` opens a native macOS window with sidebar navigation
- `pnpm fmt:check` and `pnpm lint` pass
- `pnpm tsc --noEmit` passes
- shadcn/ui `Button` component renders with correct styling

## Reference

Full step-by-step recipe in `.scratch/desktop-app/issues/02-tauri-scaffold-answer.md`.

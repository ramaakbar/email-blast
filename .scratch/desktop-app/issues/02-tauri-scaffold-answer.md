# 02: Tauri v2 + React + Vite + pnpm scaffold

Type: research
Status: resolved

## Research Summary

All research was conducted against the latest Tauri v2 docs (tauri.app), TanStack docs, Oxc project docs, shadcn/ui docs, and community patterns as of mid-2026.

---

## Step-by-Step Scaffold Recipe

### 1. Prerequisites

- **macOS** Catalina (10.15) or later
- **Xcode** (full install from App Store) OR just Command Line Tools:
  ```bash
  xcode-select --install
  ```
- **Rust** via rustup:
  ```bash
  curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
  # restart terminal after
  ```
- **Node.js** LTS (install from nodejs.org or via nvm/volta)
- **pnpm**:
  ```bash
  corepack enable && corepack prepare pnpm@latest --activate
  ```
- **Verify**:
  ```bash
  rustc --version   # should be 1.80+
  cargo --version
  node --version
  pnpm --version
  ```

---

### 2. Scaffold with `pnpm create tauri-app`

The official `create-tauri-app` utility (v4, for Tauri v2) supports React + TypeScript + pnpm out of the box.

```bash
pnpm create tauri-app@latest
```

**CLI prompts:**

| Prompt | Answer |
|--------|--------|
| Project name | `email-blast-desktop` |
| Bundle identifier | `com.emailblast.desktop` |
| Frontend language | `TypeScript / JavaScript` |
| Package manager | `pnpm` |
| UI template | `React` |
| UI flavor | `TypeScript` |

**What it produces:**

```
email-blast-desktop/
  package.json            # pnpm scripts: dev, build, tauri
  pnpm-lock.yaml
  tsconfig.json
  tsconfig.node.json
  vite.config.ts          # Vite + React plugin configured
  index.html
  src/
    App.tsx
    App.css
    main.tsx
    vite-env.d.ts
  src-tauri/
    Cargo.toml
    tauri.conf.json       # build.beforeDevCommand, build.devUrl, build.frontendDist
    capabilities/
    src/
      lib.rs
      main.rs
```

**Verify immediately:**

```bash
cd email-blast-desktop
pnpm install
pnpm tauri dev
```

This starts the Vite dev server on `http://localhost:5173`, then opens a native Tauri window pointing at it. Hot Module Replacement (HMR) works out of the box for frontend changes.

---

### 3. pnpm Workspace Structure (Monorepo)

For the Email Blast Desktop App, a monorepo with a **single frontend + Tauri** is sufficient. The scaffold above creates a single-package project. To make it a proper workspace for future growth (shared packages, API client, etc.):

**`pnpm-workspace.yaml`** (root):
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

**Directory layout:**

```
email-blast-desktop/
  pnpm-workspace.yaml
  package.json              # root workspace package
  pnpm-lock.yaml
  .npmrc                    # shamefully-hoist=false (Tauri needs strict isolation)
  apps/
    desktop/
      package.json          # main app package
      vite.config.ts
      index.html
      tsconfig.json
      src/
        routes/             # TanStack Router file-based routes
        components/         # shadcn/ui components
        lib/                # utilities (cn(), API client)
        hooks/              # TanStack Query hooks
        main.tsx
      src-tauri/
        Cargo.toml
        tauri.conf.json
        src/
          lib.rs
          main.rs
  packages/
    ui/                     # shared UI components (optional, for future)
    utils/                  # shared TS utilities (optional)
```

**Key decision:** The default scaffold keeps `src/` and `src-tauri/` at root level, which is fine for a focused desktop app. If you anticipate sharing code with web/mobile later, use the `apps/desktop/` layout. The rest of this recipe assumes the default flat layout for simplicity.

---

### 4. Tailwind CSS v4 + shadcn/ui Setup

Tailwind CSS v4 uses a **CSS-first configuration** (no `tailwind.config.ts`). shadcn/ui officially supports Tailwind v4 as of February 2026.

**4a. Install Tailwind v4 + Vite plugin:**

```bash
pnpm add tailwindcss @tailwindcss/vite
```

**4b. Update `vite.config.ts`:**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  clearScreen: false,
  server: {
    port: 5173,
    strictPort: true,
    host: process.env.TAURI_DEV_HOST || false,
    watch: { ignored: ['**/src-tauri/**'] },
  },
  envPrefix: ['VITE_', 'TAURI_ENV_*'],
  build: {
    target: process.env.TAURI_ENV_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
    minify: !process.env.TAURI_ENV_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_ENV_DEBUG,
  },
})
```

**4c. Initialize shadcn/ui:**

```bash
pnpm dlx shadcn@latest init
```

CLI answers:

| Prompt | Answer |
|--------|--------|
| Style | `New York` |
| Base color | `Zinc` (or your preference) |
| CSS variables | `Yes` |
| React Server Components | `No` (Tauri is SPA) |
| Import alias `@/components` | accept default |
| Import alias `@/lib/utils` | accept default |
| Tailwind config path | leave empty (v4 has no config file) |

**4d. Replace `src/index.css` with Tailwind v4 + shadcn/ui CSS architecture:**

```css
@import "tailwindcss";

/* 1. CSS variables at root (NOT inside @layer base) */
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(240 10% 3.9%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(240 10% 3.9%);
  --popover: hsl(0 0% 100%);
  --popover-foreground: hsl(240 10% 3.9%);
  --primary: hsl(240 5.9% 10%);
  --primary-foreground: hsl(0 0% 98%);
  --secondary: hsl(240 4.8% 95.9%);
  --secondary-foreground: hsl(240 5.9% 10%);
  --muted: hsl(240 4.8% 95.9%);
  --muted-foreground: hsl(240 3.8% 46.1%);
  --accent: hsl(240 4.8% 95.9%);
  --accent-foreground: hsl(240 5.9% 10%);
  --destructive: hsl(0 84.2% 60.2%);
  --destructive-foreground: hsl(0 0% 98%);
  --border: hsl(240 5.9% 90%);
  --input: hsl(240 5.9% 90%);
  --ring: hsl(240 5.9% 10%);
  --radius: 0.5rem;
}

.dark {
  --background: hsl(240 10% 3.9%);
  --foreground: hsl(0 0% 98%);
  --card: hsl(240 10% 3.9%);
  --card-foreground: hsl(0 0% 98%);
  --popover: hsl(240 10% 3.9%);
  --popover-foreground: hsl(0 0% 98%);
  --primary: hsl(0 0% 98%);
  --primary-foreground: hsl(240 5.9% 10%);
  --secondary: hsl(240 3.7% 15.9%);
  --secondary-foreground: hsl(0 0% 98%);
  --muted: hsl(240 3.7% 15.9%);
  --muted-foreground: hsl(240 5% 64.9%);
  --accent: hsl(240 3.7% 15.9%);
  --accent-foreground: hsl(0 0% 98%);
  --destructive: hsl(0 62.8% 30.6%);
  --destructive-foreground: hsl(0 0% 98%);
  --border: hsl(240 3.7% 15.9%);
  --input: hsl(240 3.7% 15.9%);
  --ring: hsl(240 4.9% 83.9%);
}

/* 2. Map CSS variables to Tailwind theme tokens */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

/* 3. Apply base styles */
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

**4e. Create `src/lib/utils.ts`:**

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**4f. Install dependencies for cn():**

```bash
pnpm add clsx tailwind-merge
```

**4g. Add a shadcn/ui component to verify:**

```bash
pnpm dlx shadcn@latest add button
```

**4h. Delete `tailwind.config.ts`** if it was generated by the scaffold (v4 does not use it).

**No known Tauri webview issues** with Tailwind v4 or shadcn/ui. The Tauri webview is a modern WebKit (Safari) on macOS -- it supports all CSS features Tailwind v4 uses.

---

### 5. TanStack Router + Query + Table

**5a. Install packages:**

```bash
pnpm add @tanstack/react-router @tanstack/react-query @tanstack/react-table
pnpm add -D @tanstack/router-plugin @tanstack/react-router-devtools
```

**5b. Add TanStack Router Vite plugin to `vite.config.ts`** (before `react()`):

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  // ... rest of config from step 4b
})
```

**5c. Set up file-based routing structure:**

```
src/
  routes/
    __root.tsx        # root layout with <Outlet />
    index.tsx          # home page
    compose.tsx        # email compose (future)
    history.tsx        # email history (future)
  routeTree.gen.ts     # auto-generated by plugin
```

**5d. Wire up `src/main.tsx`:**

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import './index.css'

const router = createRouter({ routeTree })
const queryClient = new QueryClient()

declare module '@tanstack/react-router' {
  interface Register { router: typeof router }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
```

**5e. Ignore auto-generated route tree** in `.vscode/settings.json`:

```json
{
  "files.readonlyInclude": { "**/routeTree.gen.ts": true },
  "files.watcherExclude": { "**/routeTree.gen.ts": true },
  "search.exclude": { "**/routeTree.gen.ts": true }
}
```

**5f. Using TanStack Table** -- import per-component:

```tsx
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table'
```

No global setup needed; Table is fully declarative.

---

### 6. oxlint + oxfmt Integration

Both tools are from the Oxc project. oxlint is stable v1.x; oxfmt is alpha v0.x but usable.

**6a. Install as dev dependencies:**

```bash
pnpm add -D oxlint oxfmt
```

**6b. Add `package.json` scripts:**

```json
{
  "scripts": {
    "lint": "oxlint",
    "lint:fix": "oxlint --fix",
    "fmt": "oxfmt --write",
    "fmt:check": "oxfmt --check"
  }
}
```

**6c. Create `.oxlintrc.json`:**

```json
{
  "$schema": "https://raw.githubusercontent.com/oxc-project/oxc/refs/heads/main/crates/oxc_linter/src/config/schema.json",
  "env": {
    "browser": true,
    "node": false,
    "es2024": true
  },
  "plugins": ["typescript", "react", "unicorn", "import", "promise"],
  "rules": {
    "no-unused-vars": ["error", { "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }],
    "react/jsx-no-target-blank": "error"
  },
  "ignorePatterns": ["node_modules/**", "dist/**", "src-tauri/**", "src/routeTree.gen.ts"]
}
```

**6d. VS Code integration:**

Create `.vscode/extensions.json`:
```json
{
  "recommendations": ["oxc.oxc-vscode"]
}
```

Create `.vscode/settings.json`:
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.oxc": "always"
  },
  "oxc.lint.run": "onType",
  "oxc.configPath": ".oxlintrc.json",
  "files.readonlyInclude": {
    "**/routeTree.gen.ts": true
  },
  "files.watcherExclude": {
    "**/routeTree.gen.ts": true
  },
  "search.exclude": {
    "**/routeTree.gen.ts": true
  }
}
```

Note: oxfmt has **no config file** -- it follows a fixed, opinionated style (like Prettier). This is intentional by the Oxc team to eliminate formatting debates.

**6e. Pre-commit hook with husky + lint-staged:**

```bash
pnpm add -D husky lint-staged
pnpm exec husky init
```

`.husky/pre-commit`:
```bash
pnpm lint-staged
```

In `package.json`:
```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["oxlint --fix", "oxfmt --write"]
  }
}
```

**6f. CI (GitHub Actions) -- `.github/workflows/ci.yml`:**

```yaml
name: CI
on: [push, pull_request]
jobs:
  lint-and-fmt:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'pnpm' }
      - run: pnpm install
      - run: pnpm fmt:check
      - run: pnpm lint --deny-warnings
  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'pnpm' }
      - run: pnpm install
      - run: pnpm tsc --noEmit
  tauri-build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'pnpm' }
      - name: Install Rust
        uses: dtolnay/rust-toolchain@stable
      - run: pnpm install
      - run: pnpm tauri build
```

---

### 7. Vite Dev Server + Tauri Dev Command Integration

**7a. `src-tauri/tauri.conf.json` (build section):**

```json
{
  "build": {
    "beforeDevCommand": "pnpm dev",
    "beforeBuildCommand": "pnpm build",
    "devUrl": "http://localhost:5173",
    "frontendDist": "../dist"
  }
}
```

**7b. How it works end-to-end:**

1. User runs `pnpm tauri dev`
2. Tauri CLI executes `beforeDevCommand` (`pnpm dev` -> `vite`)
3. Vite starts on `http://localhost:5173` (strict port, no auto-switching)
4. Tauri CLI compiles the Rust backend with `cargo build`
5. Tauri opens a native window, loads `devUrl` in the WebView
6. On frontend file changes: Vite's HMR updates the page instantly (no full reload)
7. On Rust file changes: Tauri recompiles and restarts the app window

**Key configuration points from `vite.config.ts`:**

| Setting | Why |
|---------|-----|
| `clearScreen: false` | Keeps Rust compiler errors visible in terminal |
| `server.port: 5173, strictPort: true` | Tauri expects a fixed port; no fallback to a different port |
| `watch.ignored: ['**/src-tauri/**']` | Prevents Vite from watching Rust files (they trigger their own rebuild) |
| `build.target` | Safari 13 on macOS (WebKit), Chrome 105 on Windows (WebView2) |

---

### 8. Complete File Checklist

After following all steps above, verify these files exist:

**Root:**
- [ ] `pnpm-workspace.yaml`
- [ ] `package.json` (with dev/fmt/lint/tauri scripts, lint-staged config)
- [ ] `.oxlintrc.json`
- [ ] `.husky/pre-commit`
- [ ] `vite.config.ts`
- [ ] `tsconfig.json`
- [ ] `.gitignore`
- [ ] `.github/workflows/ci.yml`

**VS Code:**
- [ ] `.vscode/extensions.json`
- [ ] `.vscode/settings.json`

**Frontend:**
- [ ] `src/main.tsx` (RouterProvider + QueryClientProvider)
- [ ] `src/index.css` (Tailwind v4 + shadcn/ui CSS)
- [ ] `src/lib/utils.ts` (cn() helper)
- [ ] `src/routes/__root.tsx`
- [ ] `src/routes/index.tsx`

**Tauri:**
- [ ] `src-tauri/tauri.conf.json` (build section configured)
- [ ] `src-tauri/Cargo.toml`
- [ ] `src-tauri/src/main.rs`
- [ ] `src-tauri/src/lib.rs`

---

### 9. Known Issues & Caveats

| Issue | Workaround |
|-------|------------|
| Vanilla JS template bug (create-tauri-app skips Vite deps) | Always choose TypeScript flavor, or manually `pnpm add -D vite` |
| shadcn CLI looking for tailwind.config.js | Use latest shadcn@canary; set `"config": ""` in components.json |
| `tw-animate-css` needed instead of `tailwindcss-animate` | Install `tw-animate-css` for Tailwind v4 animation utilities |
| Vite auto-switching port if 5173 is busy | Always use `strictPort: true` |
| Rust initial compile is slow (60-90s) | Normal; incremental compiles are 5-15s |
| oxfmt still alpha (v0.x) | Fine for daily use; check `--check` in CI; fallback to Prettier if needed |
| TanStack Router `routeTree.gen.ts` triggers lint/formatter errors | Add to `ignorePatterns` in oxlint config and `.vscode/settings.json` |

---

### 10. Verification Command

To confirm everything works:

```bash
pnpm install
pnpm fmt:check        # oxfmt formatting check
pnpm lint             # oxlint linting
pnpm tsc --noEmit     # TypeScript type check
pnpm tauri dev        # opens native window with React app
```

The first `pnpm tauri dev` run will:
1. Install npm dependencies (if not already)
2. Start Vite on port 5173
3. Compile Rust (60-90s first time)
4. Open a native macOS window with the React app shell
5. HMR updates the window on any frontend file save

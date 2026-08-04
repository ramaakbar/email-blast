# email-blast-desktop

An Electron application with React and TypeScript, built with [Electron Forge](https://www.electronforge.io/) (Vite plugin) and Vite 8.

## Project Setup

### Install

```bash
$ pnpm install
```

### Development (dev loop)

```bash
$ pnpm dev
```

### Build & package

```bash
$ pnpm package    # typecheck + unpacked app in out/
$ pnpm make       # distributables (dmg + zip on macOS, per forge.config)
```

### Test / lint

```bash
$ pnpm test       # vitest (main + shared unit tests)
$ pnpm typecheck  # tsc for node + web
$ pnpm lint       # oxlint
$ pnpm fmt        # oxfmt
```

### Packaged smoke E2E

```bash
$ pnpm package && node scripts/smoke-packaged.mjs
```

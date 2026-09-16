# email-blast-desktop

An Electron application with React and TypeScript: built with Vite 8, packaged with [electron-builder](https://www.electron.build/) (ADR-0010).

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
$ pnpm package    # build + unpacked app in dist/ (used by the smoke and E2E)
$ pnpm make       # installers for this host: dmg + zip on macOS, NSIS Setup.exe on Windows
$ pnpm make:mac   # macOS dmg + zip, from any host
$ pnpm make:win   # Windows NSIS Setup.exe, from any host
$ pnpm compile    # typecheck + make
```

Both platforms build from macOS: electron-builder's NSIS target runs a native
`makensis` and needs no wine/Rosetta, so `make:win` yields the installer on an
Apple Silicon Mac. Vite writes `out/`, electron-builder packs it into `dist/`.

### Test / lint

```bash
$ pnpm test       # vitest (main + shared unit tests)
$ pnpm typecheck  # tsc for node + web
$ pnpm lint       # oxlint
$ pnpm fmt        # oxfmt
```

### End-to-end suite (Seam B)

The packaged app driven by Playwright's Electron launcher against a local
SMTP capture server: import -> generate -> send -> logs, both quit-dialog
branches and the resume across restarts, first launch without LibreOffice,
and the one-active-job block.
Needs the packaged app (or `APP_PATH` pointing at a packaged binary):

```bash
$ pnpm package && pnpm test:e2e
```

### Packaged smoke E2E

```bash
$ pnpm package && node scripts/smoke-packaged.mjs
```

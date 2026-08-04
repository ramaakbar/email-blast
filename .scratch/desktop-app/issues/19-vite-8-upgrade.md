# 19 - Vite 8 upgrade

**What to build:** Upgrade the build toolchain from Vite 7 (`vite ^7.2.6`) to Vite 8. The gate for this ticket is compat research against primary sources: which electron-vite version supports Vite 8 (currently `electron-vite ^5.0.0`), whether the renderer plugins (`@vitejs/plugin-react`, `@tailwindcss/vite`, `@tanstack/router-plugin`) are Vite 8-compatible, and whether the Electron Forge Vite plugin (which ticket 20 will use) supports Vite 8 - that last result decides whether 20 pins to the same Vite version. Then upgrade, update configs for any API changes, and prove the whole chain green: typecheck, lint, vitest, dev, build, and an E2E smoke run. Blocks the tickets that need the new toolchain (20, 24).

**Status:** ready-for-agent

- [ ] Compat research recorded: electron-vite, renderer plugins, and the Forge Vite plugin vs Vite 8 (primary sources)
- [ ] Vite 8 + matching electron-vite installed; dev, preview, and build all work
- [ ] Renderer plugins verified compatible (react, tailwind, router)
- [ ] typecheck, lint, vitest, and an E2E smoke run all green on the new toolchain

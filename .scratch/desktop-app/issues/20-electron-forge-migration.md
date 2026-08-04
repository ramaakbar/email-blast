# 20 - Electron Forge migration

**What to build:** Replace electron-vite + electron-builder with Electron Forge per the official docs (electronforge.io), using Forge's Vite plugin and Vite 8. The Vite plugin replaces electron-vite for building main/preload/renderer; the dev loop becomes `electron-forge start`. Declare makers for macOS (dmg, zip), Windows (nsis), and Linux, replace the postinstall native-module handling, and prove the packaged artifacts launch and pass a smoke E2E. Coupled to 19: the Forge Vite plugin must support Vite 8 - if it lags, decide with 19 whether to pin Vite or fall back to the hybrid (Forge consuming an electron-vite build).

**Blocked by:** 19 - Vite 8 upgrade

**Status:** ready-for-agent

- [ ] Forge Vite plugin drives the build (main/preload/renderer); `electron-forge start` is the dev loop
- [ ] Vite 8 confirmed with the Forge Vite plugin (see 19)
- [ ] Makers declared for mac/win/linux; `package` and `make` artifacts launch
- [ ] Native-module handling in place (postinstall equivalent)
- [ ] Packaged app passes a smoke E2E; ADR-0001 stays accurate

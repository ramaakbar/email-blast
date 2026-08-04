import type { ForgeConfig } from "@electron-forge/shared-types";

// Electron Forge drives the build (main/preload/renderer via its Vite plugin)
// and the packaging (makers per platform). ADR-0001.
const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    name: "Email Blast",
    appBundleId: "com.emailblast.desktop",
    icon: "resources/icon",
    // Unsigned local builds: @electron/packager ad-hoc signs on darwin (an
    // ad-hoc signature is mandatory on Apple Silicon); signing and
    // notarization with a real identity are deferred until distribution.
  },
  // No native modules are used today; if one is added, Forge rebuilds it
  // against Electron's ABI from here (no postinstall step needed).
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-dmg",
      platforms: ["darwin"],
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
      config: {},
    },
    // Forge's official Windows maker is Squirrel.Windows (there is no
    // @electron-forge/maker-nsis in the registry; NSIS installers exist only
    // as third-party makers, see ticket 20).
    {
      name: "@electron-forge/maker-squirrel",
      platforms: ["win32"],
      config: {},
    },
    {
      name: "@electron-forge/maker-deb",
      platforms: ["linux"],
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      platforms: ["linux"],
      config: {},
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-vite",
      config: {
        // `build` can specify multiple entry builds, which can be Main
        // process, Preload scripts, Worker process, etc.
        build: [
          {
            // `entry` is an alias for `build.lib.entry` in the
            // corresponding file of `config`.
            entry: "src/main/index.ts",
            config: "vite.main.config.mjs",
            target: "main",
          },
          {
            entry: "src/preload/index.ts",
            config: "vite.preload.config.mjs",
            target: "preload",
          },
        ],
        renderer: [
          {
            name: "main_window",
            config: "vite.renderer.config.mjs",
          },
        ],
      },
    },
  ],
};

export default config;

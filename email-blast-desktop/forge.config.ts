import type { ForgeConfig } from "@electron-forge/shared-types";

// Electron Forge drives the build (main/preload/renderer via its Vite plugin)
// and the packaging (makers per platform). ADR-0001.
const config: ForgeConfig = {
  packagerConfig: {
    asar: {
      // Native modules cannot load from inside the archive; better-sqlite3's
      // binary is unpacked alongside it (app.asar.unpacked).
      unpack: "**/*.node",
    },
    name: "Email Blast",
    appBundleId: "com.emailblast.desktop",
    icon: "resources/icon",
    // Unsigned local builds: @electron/packager ad-hoc signs on darwin (an
    // ad-hoc signature is mandatory on Apple Silicon); signing and
    // notarization with a real identity are deferred until distribution.
    // The Drizzle migrations folder ships as an extra resource; the app
    // resolves it next to the binary (openDatabase in db/repository.ts).
    extraResource: ["drizzle"],
    // The Vite plugin's default ignore packs ONLY the .vite build (every
    // runtime dependency is bundled into it). better-sqlite3 is the
    // exception: a native module the main bundle externalizes, so its
    // package ships inside the app. The /node_modules directory itself
    // must pass the filter so fs-extra descends into it; everything else
    // under it stays excluded.
    ignore: (file) => {
      if (!file) return false;
      if (file.startsWith("/.vite")) return false;
      if (file === "/node_modules") return false;
      // better-sqlite3 v13 is Node-API (gypfile: false): the published
      // prebuilds are ABI-stable and load in Electron as-is, so they ship
      // with the app (the `unpack` above moves the .node binaries to
      // app.asar.unpacked) and binding.js resolves them - no node-gyp
      // rebuild step is involved at all.
      if (file.startsWith("/node_modules/better-sqlite3")) return false;
      return true;
    },
  },
  // Forge rebuilds native modules (better-sqlite3) against Electron's ABI
  // from here (no postinstall step needed).
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

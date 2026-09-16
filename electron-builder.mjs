// electron-builder packages the app; it never runs a bundler (ADR-0010).
// `pnpm build` produces `out/` first, `pnpm make` turns it into installers.
// The package scripts pass this file explicitly: electron-builder only
// auto-detects electron-builder.yml/.json/.json5/.js/.ts, so a bare
// `electron-builder` run would silently fall back to defaults.
export default {
  appId: "com.emailblast.desktop",
  // The product name is also frozen by the data layout: it decides
  // appData/userData, i.e. where the SQLite database lives.
  productName: "Email Blast",
  directories: {
    output: "dist",
  },
  // Only the Vite output ships. Every JS dependency is bundled into it by
  // the vite.*.config.mjs builds, so the app's node_modules holds exactly
  // one module - better-sqlite3 - which electron-builder copies from
  // package.json `dependencies` on its own, independently of this glob.
  files: ["out/**", "package.json"],
  // A native module cannot load from inside the archive: better-sqlite3's
  // prebuilt binary is moved next to it (app.asar.unpacked).
  asarUnpack: ["**/*.node"],
  // The main process resolves both next to the binary via
  // process.resourcesPath: the Drizzle migrations (db/repository.ts) and the
  // bundled font faces (index.ts).
  extraResources: [
    { from: "drizzle", to: "drizzle" },
    { from: "resources/fonts", to: "fonts" },
  ],
  // better-sqlite3 v13 ships ABI-stable Node-API prebuilds (gypfile: false):
  // a rebuild would need a native toolchain for every target platform and
  // would replace a working prebuild with a compiled one.
  npmRebuild: false,
  // Icons are declared explicitly rather than left to the default
  // buildResources directory (build/), which held a stale 512px set from the
  // pre-Forge scaffold: auto-discovery would silently package that instead of
  // the current 1024px icon in resources/ (ticket 26).
  mac: {
    icon: "resources/icon.icns",
    target: ["dmg", "zip"],
    // Unsigned local builds still need a signature to launch at all on
    // Apple Silicon: "-" is the ad-hoc identity. electron-builder does not
    // ad-hoc sign by default (unlike @electron/packager). Real signing and
    // notarization are deferred until distribution (ADR-0003); macOS
    // auto-update will require them from the first shipped version.
    // electron-builder warns that ad-hoc signing with hardenedRuntime may
    // need com.apple.security.cs.disable-library-validation; the unpacked
    // better-sqlite3 binary is signed by the same ad-hoc pass, so it loads
    // (verified by scripts/smoke-packaged.mjs). Add that entitlement if a
    // future native module fails to load.
    identity: "-",
    category: "public.app-category.productivity",
  },
  win: {
    icon: "resources/icon.ico",
    target: [{ target: "nsis", arch: ["x64"] }],
  },
  nsis: {
    // One-click, per-user, no elevation: the installer never asks a
    // non-technical user a question. Uninstalling leaves the user's data
    // (%APPDATA%) alone.
    oneClick: true,
    perMachine: false,
    artifactName: "${productName} Setup ${version}.${ext}",
  },
};

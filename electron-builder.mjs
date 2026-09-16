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
  // Where the installers go, and where the auto-update metadata comes from
  // (ADR-0003). electron-builder writes the same block into the packaged app
  // as `resources/app-update.yml`, which is what electron-updater reads at
  // runtime; it also emits the `latest*.yml` feed next to the artifacts.
  // The repository is public on purpose: the GitHub provider has no other way
  // to reach the feed from a colleague's machine without shipping a token
  // (ADR-0010).
  publish: [
    {
      provider: "github",
      owner: "ramaakbar",
      repo: "email-blast",
      // A draft release: the artifacts land on GitHub but nothing is visible
      // to colleagues until the draft is reviewed and published by hand.
      // `EP_PRE_RELEASE=true` overrides this to a pre-release, which is the
      // test channel - shipped builds ignore pre-releases.
      releaseType: "draft",
    },
  ],
  // No `electronUpdaterCompatibility`: electron-builder 26.15.3 already
  // applies its own ">=2.15" default in `out/publish/updateInfoBuilder.js`
  // before the update feed is written, which is what electron-updater 6.8.9
  // wants. Setting it explicitly changes nothing (verified by packaging the
  // same app with and without the key: byte-identical feed shape).
  // Icons are declared explicitly rather than left to the default
  // buildResources directory (build/), which held a stale 512px set from the
  // pre-Forge scaffold: auto-discovery would silently package that instead of
  // the current 1024px icon in resources/ (ticket 26).
  // The published artifact names must equal the URLs inside `latest*.yml`,
  // because the release is assembled with `gh release create` from the files
  // in `dist/` (the workflow) rather than by electron-builder's own uploader.
  // electron-builder's defaults carry spaces (`Email Blast-1.0.0-arm64.dmg`)
  // and its uploader silently renames them to dashes, which is exactly the
  // mismatch that would leave a feed pointing at a file that does not exist.
  // Explicit names on both platforms keep disk, feed and release in step.
  mac: {
    icon: "resources/icon.icns",
    target: ["dmg", "zip"],
    artifactName: "Email-Blast-${version}-${arch}.${ext}",
    // Unsigned builds still need a signature to launch at all on Apple
    // Silicon: "-" is the ad-hoc identity. electron-builder does not ad-hoc
    // sign by default (unlike @electron/packager). This is the shipped
    // signature too (ADR-0011: no Developer ID for now), which is why macOS
    // cannot self-update - Squirrel.Mac checks a downloaded bundle against
    // the running app's designated requirement, and an ad-hoc signature is a
    // fresh hash in every build. macOS releases are a manual re-download.
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
    // Same contract as the mac names above: this is the name `latest.yml`
    // publishes and the name the release carries.
    artifactName: "Email-Blast-Setup-${version}.${ext}",
  },
};

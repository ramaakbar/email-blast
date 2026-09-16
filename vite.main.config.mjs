import { builtinModules } from "node:module";
import { resolve } from "path";
import { defineConfig } from "vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

// Main-process build. electron-builder packages `out/` (ADR-0010); the dev
// loop is scripts/dev.mjs.
// electron and the node builtins stay external - only the Electron runtime
// provides them. Each build owns its output directory so the three builds
// cannot clobber each other, and the lib entry is an object so the bundles
// are named index.js wherever they land.
// better-sqlite3 stays external (not bundled): its binding.js resolves the
// native binary relative to its own package directory, which only works
// when the module is required from node_modules (packaged with the app).
export default defineConfig({
  resolve: {
    alias: {
      // The compiled Paraglide output (ADR-0004), shared with the renderer:
      // main-process user-facing strings use the same message functions.
      "@paraglide": resolve("src/paraglide"),
    },
  },
  // The main process compiles messages too, so the generated output exists
  // even when the main build runs before the renderer build.
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      strategy: ["globalVariable", "baseLocale"],
      // The compiler default (message-modules) re-emits one module per
      // message - 1200+ files - and drops the per-locale bundles the repo
      // commits (c8d7091). The dev-recommended locale-modules shape is the
      // committed one; keep the two Vite configs in step.
      outputStructure: "locale-modules",
      emitTsDeclarations: true,
      emitGitIgnore: false,
    }),
  ],
  build: {
    outDir: "out/main",
    emptyOutDir: true,
    // Electron 43 runs Node 24: nothing needs downleveling, and a pinned
    // node version string here would silently age with every Electron bump.
    target: "esnext",
    lib: {
      entry: { index: "src/main/index.ts" },
      formats: ["cjs"],
    },
    rollupOptions: {
      external: [
        "electron",
        "better-sqlite3",
        // electron-updater stays external too (ADR-0011): it resolves its
        // own `app-update.yml` at runtime and is required from node_modules
        // inside the asar - electron-builder's module collector copies it
        // from `dependencies`, exactly like better-sqlite3.
        "electron-updater",
        ...builtinModules,
        ...builtinModules.map((m) => `node:${m}`),
      ],
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});

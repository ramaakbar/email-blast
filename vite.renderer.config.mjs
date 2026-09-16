import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

// The renderer root is the project directory (index.html lives there), so no
// root is set here - the aliases point at the renderer source tree.
export default defineConfig({
  // The packaged renderer loads over file://, so its asset URLs must be
  // relative (the Forge Vite plugin used to set this for us).
  base: "./",
  resolve: {
    alias: {
      "@renderer": resolve("src/renderer/src"),
      "@": resolve("src/renderer/src"),
      // The compiled Paraglide output (ADR-0004): message functions and the
      // runtime, generated from project.inlang + messages/ on build.
      "@paraglide": resolve("src/paraglide"),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    // The renderer root is the project directory, so the route files must
    // be pointed at explicitly (they live in src/renderer/src/routes).
    tanstackRouter({
      routesDirectory: "src/renderer/src/routes",
      generatedRouteTree: "src/renderer/src/routeTree.gen.ts",
    }),
    // i18n: compiles the message catalog into typed message functions.
    // globalVariable first (setLocale owns the locale, persisted in
    // settings), baseLocale as the fallback before any setLocale - no
    // URL/cookie/localStorage paths. Declarations are emitted so wrong
    // message keys are type errors; the generated output is committed like
    // routeTree.gen.ts (no .gitignore).
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
    // Its own directory: electron-builder packs out/ (ADR-0010) and the
    // three builds must not empty each other's output.
    outDir: "out/renderer",
    emptyOutDir: true,
  },
});

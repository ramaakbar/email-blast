import { defineConfig } from "vite";

// The Forge Vite plugin merges this over its main-process defaults
// (externalized electron + node builtins, CJS output to .vite/build).
// The lib entry is an object so the bundle is named main.js - the entry
// file's own base name (index.ts) would collide with the preload build.
// better-sqlite3 stays external (not bundled): its binding.js resolves the
// native binary relative to its own package directory, which only works
// when the module is required from node_modules (packaged with the app).
export default defineConfig({
  build: {
    lib: {
      entry: { main: "src/main/index.ts" },
      formats: ["cjs"],
    },
    rollupOptions: {
      external: ["better-sqlite3"],
    },
  },
});

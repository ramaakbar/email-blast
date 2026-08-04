import { defineConfig } from "vite";

// The Forge Vite plugin merges this over its preload defaults (externalized
// electron + node builtins, single-file CJS output - the sandboxed preload
// contract: no split chunks, no ESM). The lib entry is an object so the
// bundle is named preload.js, not index.js.
export default defineConfig({
  build: {
    lib: {
      entry: { preload: "src/preload/index.ts" },
      formats: ["cjs"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "preload.js",
      },
    },
  },
});

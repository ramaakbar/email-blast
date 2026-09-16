import { builtinModules } from "node:module";
import { defineConfig } from "vite";

// Preload build: one CJS file, no chunks - the sandboxed-preload contract
// (`sandbox: true` in the main process window options). electron and the node
// builtins stay external; the preload imports nothing else that is not
// bundled. Output: out/preload/index.js.
export default defineConfig({
  build: {
    outDir: "out/preload",
    emptyOutDir: true,
    target: "esnext",
    lib: {
      entry: { index: "src/preload/index.ts" },
      formats: ["cjs"],
    },
    rollupOptions: {
      external: ["electron", ...builtinModules, ...builtinModules.map((m) => `node:${m}`)],
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});

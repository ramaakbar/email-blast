import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// The Forge Vite plugin forces the renderer root to the project directory
// (index.html lives at the project root, the plugin's convention), so no
// root is set here - the aliases point at the renderer source tree.
export default defineConfig({
  resolve: {
    alias: {
      "@renderer": resolve("src/renderer/src"),
      "@": resolve("src/renderer/src"),
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
  ],
});

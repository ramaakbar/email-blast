import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/main/**/*.test.ts", "src/shared/**/*.test.ts"],
  },
  resolve: {
    alias: {
      // Same alias the Vite builds use - the compiled Paraglide output.
      "@paraglide": resolve(__dirname, "src/paraglide"),
    },
  },
});

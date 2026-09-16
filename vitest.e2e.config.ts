import { defineConfig } from "vitest/config";

/**
 * The Seam B suite (spec Testing Decisions): the real packaged app driven
 * by Playwright's Electron launcher against a local SMTP capture server.
 * One file per scenario, serialized - every test launches its own app
 * instance and SMTP server, so running files in parallel would stack
 * Electron processes. Long timeouts: each test spans app boots, a real
 * LibreOffice conversion, and real SMTP deliveries.
 */
export default defineConfig({
  test: {
    environment: "node",
    include: ["e2e/**/*.test.ts"],
    fileParallelism: false,
    testTimeout: 180_000,
    hookTimeout: 60_000,
  },
});

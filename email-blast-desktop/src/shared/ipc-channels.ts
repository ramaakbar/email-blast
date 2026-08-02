/**
 * The wire-level part of the IPC contract - channel names and the version
 * constant. Zero dependencies by design: the sandboxed preload imports
 * this module, and a sandboxed preload cannot load external modules at
 * runtime, so nothing here may import from `effect` or any other package.
 * The schemas and the `Api` shape live in `ipc.ts`.
 */
export const API_VERSION = 1;

/**
 * Channel names, namespaced per domain (`domain:method`).
 * The `dev:*` channels are development-only machinery (never used in
 * packaged builds) - they back the API_VERSION preload/main handshake.
 */
export const IPC = {
  "system:ping": "system:ping",
  "dev:api-version-check": "dev:api-version-check",
  "dev:api-version-report": "dev:api-version-report",
} as const;

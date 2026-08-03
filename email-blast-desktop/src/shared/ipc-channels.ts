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
  "system:check-libreoffice": "system:check-libreoffice",
  "system:pick-folder": "system:pick-folder",
  "system:pick-excel-file": "system:pick-excel-file",
  "system:pick-template-file": "system:pick-template-file",
  "system:get-app-info": "system:get-app-info",
  "settings:get": "settings:get",
  "settings:set": "settings:set",
  "import:read": "import:read",
  "import:commit": "import:commit",
  "recipients:list": "recipients:list",
  "recipients:get": "recipients:get",
  "recipients:delete": "recipients:delete",
  "recipients:list-batches": "recipients:list-batches",
  "recipients:list-all": "recipients:list-all",
  "templates:list": "templates:list",
  "templates:get": "templates:get",
  "templates:create": "templates:create",
  "templates:update": "templates:update",
  "templates:delete": "templates:delete",
  "templates:scan-slots": "templates:scan-slots",
  "generate:start": "generate:start",
  "generate:run": "generate:run",
  "generate:get-status": "generate:get-status",
  "generate:get-recipient-pdf": "generate:get-recipient-pdf",
  "generate-progress": "generate-progress",
  "smtp:list": "smtp:list",
  "smtp:get": "smtp:get",
  "smtp:create": "smtp:create",
  "smtp:update": "smtp:update",
  "smtp:delete": "smtp:delete",
  "smtp:test": "smtp:test",
  "smtp:test-profile": "smtp:test-profile",
  "dev:api-version-check": "dev:api-version-check",
  "dev:api-version-report": "dev:api-version-report",
} as const;

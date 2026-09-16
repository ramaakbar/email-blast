/**
 * The wire-level part of the IPC contract - the zero-dependency operation
 * table. The sandboxed preload imports this module and derives the whole
 * `window.api` surface from it (`buildApi` in preload/index.ts), the main
 * process derives channel constants and registration from it, so a channel
 * string exists exactly once.
 *
 * Zero dependencies by design: a sandboxed preload cannot load external
 * modules at runtime, so nothing here may import from `effect` or any
 * other package. The schemas and the `Api` shape live in `ipc.ts`.
 *
 * `args` is the argument count the renderer passes to `invoke` (0, 1, or
 * 2); `event: true` marks a main-to-renderer push channel, exposed to the
 * renderer as an `onX(cb)` subscription. Keys must match the `Api` method
 * names in `ipc.ts` - the preload's compile-time check enforces it.
 */
export const API_VERSION = 1;

/**
 * Development-only channels, never used in packaged builds. They back the
 * API_VERSION preload/main handshake and are not part of the renderer's
 * `window.api` surface, so they stay out of the WIRE table.
 */
export const DEV_CHANNELS = {
  apiVersionCheck: "dev:api-version-check",
  apiVersionReport: "dev:api-version-report",
} as const;

export const WIRE = {
  system: {
    ping: { channel: "system:ping", args: 0 },
    checkLibreOffice: { channel: "system:check-libreoffice", args: 0 },
    pickFolder: { channel: "system:pick-folder", args: 0 },
    pickExcelFile: { channel: "system:pick-excel-file", args: 0 },
    pickTemplateFile: { channel: "system:pick-template-file", args: 0 },
    pickFontFile: { channel: "system:pick-font-file", args: 0 },
    getAppInfo: { channel: "system:get-app-info", args: 0 },
  },
  settings: {
    get: { channel: "settings:get", args: 1 },
    set: { channel: "settings:set", args: 2 },
  },
  import: {
    read: { channel: "import:read", args: 1 },
    commit: { channel: "import:commit", args: 1 },
  },
  recipients: {
    list: { channel: "recipients:list", args: 1 },
    get: { channel: "recipients:get", args: 1 },
    update: { channel: "recipients:update", args: 1 },
    delete: { channel: "recipients:delete", args: 1 },
    listBatches: { channel: "recipients:list-batches", args: 0 },
    listAll: { channel: "recipients:list-all", args: 1 },
  },
  templates: {
    list: { channel: "templates:list", args: 0 },
    get: { channel: "templates:get", args: 1 },
    create: { channel: "templates:create", args: 1 },
    update: { channel: "templates:update", args: 1 },
    delete: { channel: "templates:delete", args: 1 },
    scanSlots: { channel: "templates:scan-slots", args: 1 },
    getImage: { channel: "templates:get-image", args: 1 },
  },
  fonts: {
    list: { channel: "fonts:list", args: 0 },
    getFile: { channel: "fonts:get-file", args: 1 },
    add: { channel: "fonts:add", args: 1 },
  },
  messageTemplates: {
    list: { channel: "message-templates:list", args: 0 },
    get: { channel: "message-templates:get", args: 1 },
    create: { channel: "message-templates:create", args: 1 },
    update: { channel: "message-templates:update", args: 1 },
    delete: { channel: "message-templates:delete", args: 1 },
  },
  generate: {
    startGenerate: { channel: "generate:start", args: 1 },
    runGenerate: { channel: "generate:run", args: 1 },
    getGenerateStatus: { channel: "generate:get-status", args: 1 },
    getRecipientPdf: { channel: "generate:get-recipient-pdf", args: 1 },
    list: { channel: "generate:list", args: 0 },
    saveRecipientPdf: { channel: "generate:save-recipient-pdf", args: 1 },
    onGenerateProgress: { channel: "generate-progress", event: true },
  },
  smtp: {
    list: { channel: "smtp:list", args: 0 },
    get: { channel: "smtp:get", args: 1 },
    create: { channel: "smtp:create", args: 1 },
    update: { channel: "smtp:update", args: 1 },
    delete: { channel: "smtp:delete", args: 1 },
    test: { channel: "smtp:test", args: 1 },
    testProfile: { channel: "smtp:test-profile", args: 1 },
  },
  send: {
    startSend: { channel: "send:start", args: 1 },
    runSend: { channel: "send:run", args: 1 },
    pauseSend: { channel: "send:pause", args: 1 },
    resumeSend: { channel: "send:resume", args: 1 },
    cancelSend: { channel: "send:cancel", args: 1 },
    getSendStatus: { channel: "send:get-status", args: 1 },
    retryFailedSend: { channel: "send:retry-failed", args: 1 },
    getLaunchBanner: { channel: "send:get-launch-banner", args: 0 },
    onSendProgress: { channel: "send-progress", event: true },
    onJobPaused: { channel: "job-paused", event: true },
  },
  logs: {
    list: { channel: "logs:list", args: 1 },
  },
} as const;

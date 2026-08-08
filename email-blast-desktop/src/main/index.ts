import { app, shell, BrowserWindow, ipcMain, dialog } from "electron";
import { join } from "path";
import { homedir } from "os";
import assert from "node:assert";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import { Effect, Layer, Option, Schema } from "effect";
import {
  API_VERSION,
  GenerateJob,
  GeneratePdfPayload,
  GeneratePdfResponse,
  GenerateStartPayload,
  GetAppInfoResponse,
  ImportBatch,
  ImportCommitPayload,
  ImportCommitResponse,
  ImportPreview,
  ImportReadPayload,
  IPC,
  LogsListPayload,
  PaginatedRecipients,
  PingResponse,
  Recipient,
  RecipientDeletePayload,
  RecipientDeleteResponse,
  RecipientListAllPayload,
  RecipientListPayload,
  ScanSlotsResponse,
  SendJob,
  SendJobSummary,
  SendStartPayload,
  SettingsGetPayload,
  SettingsSetPayload,
  SmtpDeleteResponse,
  SmtpProfile,
  SmtpProfileCreatePayload,
  SmtpProfileUpdatePayload,
  SmtpTestPayload,
  Template,
  TemplateCreatePayload,
  TemplateDeleteResponse,
  TemplateUpdatePayload,
} from "../shared/ipc";
import { TEMPLATE_EXTENSIONS } from "../shared/template-validation";
import { decodePayload, registerWindowHandler } from "./ipc";
import { rootLayer, type AppServices } from "./runtime";
import { AppInfo } from "./services/app-info";
import { defaultPathsForHome } from "./services/default-paths";
import { GenerateJobService } from "./services/generate-jobs";
import { ImportService } from "./services/import";
import { findLibreOffice } from "./services/libreoffice";
import { ProgressHub } from "./services/progress-hub";
import { RecipientsService } from "./services/recipients";
import { SendJobService } from "./services/send-jobs";
import { SmtpService } from "./services/smtp";
import { openDatabase, SqliteRepo } from "./db/repository";
import { Settings } from "./services/settings";
import { TemplatesService } from "./services/templates";

// Forge's Vite plugin defines these at build time (bare identifiers, from
// its getBuildDefine): the dev-server URL in `electron-forge start`,
// `undefined` in packaged builds, plus the renderer's output name.
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined;
declare const MAIN_WINDOW_VITE_NAME: string;

// The only origins the app may ever display: the Vite dev server in dev,
// the local packaged file in production. Everything else is a navigation
// away from the app and gets blocked.
const expectedOrigin =
  is.dev && MAIN_WINDOW_VITE_DEV_SERVER_URL
    ? new URL(MAIN_WINDOW_VITE_DEV_SERVER_URL).origin
    : "file://";

function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 960,
    minHeight: 600,
    title: "Email Blast",
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      // Security baseline: sandbox on, contextIsolation on, nodeIntegration off,
      // preload as the only bridge, no remote content ever loaded.
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  // No remote content: window.open and navigation away from the app are
  // denied; external links go to the OS browser instead.
  mainWindow.webContents.setWindowOpenHandler((details) => {
    void shell.openExternal(details.url);
    return { action: "deny" };
  });
  mainWindow.webContents.on("will-navigate", (event, url) => {
    let origin: string;
    try {
      origin = new URL(url).origin;
    } catch {
      origin = "";
    }
    if (origin !== expectedOrigin) event.preventDefault();
  });

  // Load the remote URL for development or the local html file for production.
  if (is.dev && MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    void mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    void mainWindow.loadFile(join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  return mainWindow;
}

/**
 * Dev-only handshake: main pings every window after each load; the preload
 * replies with its API_VERSION; a mismatch crashes the dev process.
 * Registered once - it must survive renderer reloads (the preload rebuilds
 * and re-registers its listener on every load, so main must re-check).
 */
function registerApiVersionAssertion(): void {
  ipcMain.on(IPC["dev:api-version-report"], (event, reported: unknown) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;
    assert.equal(
      reported,
      API_VERSION,
      `API_VERSION mismatch: preload reports ${String(reported)}, main is ${API_VERSION}. Rebuild the preload.`,
    );
    console.log(`[dev] API_VERSION ok (${API_VERSION}): preload and main agree`);
  });
  app.on("web-contents-created", (_event, contents) => {
    contents.on("did-finish-load", () => {
      contents.send(IPC["dev:api-version-check"]);
    });
  });
}

/**
 * The full IPC surface. Renderer-to-main payloads are decoded at the
 * boundary (malformed calls become typed ParseErrors); every handler that
 * needs a service runs an Effect program provided with the root layer.
 */
function registerIpcHandlers(layer: Layer.Layer<AppServices>): void {
  const run = <A, E>(program: Effect.Effect<A, E, AppServices>): Promise<A> =>
    Effect.runPromise(program.pipe(Effect.provide(layer)));

  registerWindowHandler(IPC["system:ping"], () => {
    return Schema.encodeSync(PingResponse)({ pong: true, apiVersion: API_VERSION });
  });

  registerWindowHandler(IPC["system:check-libreoffice"], () => {
    return findLibreOffice();
  });

  registerWindowHandler(IPC["system:pick-folder"], () => {
    return dialog
      .showOpenDialog({ properties: ["openDirectory"] })
      .then((result) => (result.canceled ? null : (result.filePaths[0] ?? null)));
  });

  registerWindowHandler(IPC["system:pick-excel-file"], () => {
    return dialog
      .showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: "Excel", extensions: ["xlsx", "xls"] }],
      })
      .then((result) => (result.canceled ? null : (result.filePaths[0] ?? null)));
  });

  registerWindowHandler(IPC["system:pick-template-file"], () => {
    // The accepted extensions come from the shared template domain so the
    // dialog filter and the renderer's type detection can never drift apart.
    const extensions = Object.values(TEMPLATE_EXTENSIONS)
      .flat()
      .map((ext) => ext.slice(1));
    return dialog
      .showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: "Template", extensions }],
      })
      .then((result) => (result.canceled ? null : (result.filePaths[0] ?? null)));
  });

  registerWindowHandler(IPC["system:get-app-info"], () => {
    return run(
      Effect.gen(function* () {
        // Schema-encoded at the boundary like every other response.
        return Schema.encodeSync(GetAppInfoResponse)(yield* AppInfo);
      }),
    );
  });

  registerWindowHandler(IPC["settings:get"], (payload) => {
    const key = decodePayload(SettingsGetPayload, payload);
    return run(
      Effect.gen(function* () {
        const repo = yield* SqliteRepo;
        return Option.getOrNull(yield* repo.getSetting(key));
      }),
    );
  });

  registerWindowHandler(IPC["settings:set"], (payload) => {
    const [key, value] = decodePayload(SettingsSetPayload, payload);
    return run(
      Effect.gen(function* () {
        const repo = yield* SqliteRepo;
        yield* repo.setSetting(key, value);
      }),
    );
  });

  registerWindowHandler(IPC["import:read"], (payload) => {
    const excelPath = decodePayload(ImportReadPayload, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* ImportService;
        return Schema.encodeSync(ImportPreview)(yield* service.read(excelPath));
      }),
    );
  });

  registerWindowHandler(IPC["import:commit"], (payload) => {
    const { rows, columnMapping } = decodePayload(ImportCommitPayload, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* ImportService;
        return Schema.encodeSync(ImportCommitResponse)(yield* service.commit(rows, columnMapping));
      }),
    );
  });

  registerWindowHandler(IPC["recipients:list"], (payload) => {
    const filter = decodePayload(RecipientListPayload, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* RecipientsService;
        return Schema.encodeSync(PaginatedRecipients)(yield* service.list(filter));
      }),
    );
  });

  registerWindowHandler(IPC["recipients:get"], (payload) => {
    const id = decodePayload(Schema.String, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* RecipientsService;
        return Option.getOrNull(yield* service.get(id));
      }),
    );
  });

  registerWindowHandler(IPC["recipients:delete"], (payload) => {
    const ids = decodePayload(RecipientDeletePayload, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* RecipientsService;
        return Schema.encodeSync(RecipientDeleteResponse)({ deleted: yield* service.delete(ids) });
      }),
    );
  });

  registerWindowHandler(IPC["recipients:list-batches"], () => {
    return run(
      Effect.gen(function* () {
        const service = yield* RecipientsService;
        return Schema.encodeSync(Schema.Array(ImportBatch))(yield* service.listBatches());
      }),
    );
  });

  registerWindowHandler(IPC["recipients:list-all"], (payload) => {
    const filter = decodePayload(RecipientListAllPayload, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* RecipientsService;
        return Schema.encodeSync(Schema.Array(Recipient))(yield* service.listAll(filter));
      }),
    );
  });

  registerWindowHandler(IPC["templates:list"], () => {
    return run(
      Effect.gen(function* () {
        const service = yield* TemplatesService;
        return Schema.encodeSync(Schema.Array(Template))(yield* service.list());
      }),
    );
  });

  registerWindowHandler(IPC["templates:get"], (payload) => {
    const id = decodePayload(Schema.String, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* TemplatesService;
        return Option.getOrNull(yield* service.get(id));
      }),
    );
  });

  registerWindowHandler(IPC["templates:create"], (payload) => {
    const draft = decodePayload(TemplateCreatePayload, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* TemplatesService;
        return Schema.encodeSync(Template)(yield* service.create(draft));
      }),
    );
  });

  registerWindowHandler(IPC["templates:update"], (payload) => {
    const { id, name, slots, outputPattern } = decodePayload(TemplateUpdatePayload, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* TemplatesService;
        return Schema.encodeSync(Template)(
          yield* service.update(id, { name, slots, outputPattern }),
        );
      }),
    );
  });

  registerWindowHandler(IPC["templates:delete"], (payload) => {
    const id = decodePayload(Schema.String, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* TemplatesService;
        return Schema.encodeSync(TemplateDeleteResponse)({ deleted: yield* service.delete(id) });
      }),
    );
  });

  registerWindowHandler(IPC["templates:scan-slots"], (payload) => {
    const docxPath = decodePayload(Schema.String, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* TemplatesService;
        return Schema.encodeSync(ScanSlotsResponse)({ slots: yield* service.scanSlots(docxPath) });
      }),
    );
  });

  registerWindowHandler(IPC["generate:start"], (payload) => {
    const { templateId, recipientIds } = decodePayload(GenerateStartPayload, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* GenerateJobService;
        return Schema.encodeSync(GenerateJob)(yield* service.start(templateId, recipientIds));
      }),
    );
  });

  registerWindowHandler(IPC["generate:run"], (payload) => {
    const jobId = decodePayload(Schema.String, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* GenerateJobService;
        return Schema.encodeSync(GenerateJob)(yield* service.run(jobId));
      }),
    );
  });

  registerWindowHandler(IPC["generate:get-status"], (payload) => {
    const jobId = decodePayload(Schema.String, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* GenerateJobService;
        return Option.getOrNull(
          yield* service
            .getStatus(jobId)
            .pipe(Effect.map(Option.map((job) => Schema.encodeSync(GenerateJob)(job)))),
        );
      }),
    );
  });

  registerWindowHandler(IPC["generate:get-recipient-pdf"], (payload) => {
    const { jobId, recipientId } = decodePayload(GeneratePdfPayload, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* GenerateJobService;
        return Option.getOrNull(
          yield* service
            .getRecipientPdf(jobId, recipientId)
            .pipe(Effect.map(Option.map((pdf) => Schema.encodeSync(GeneratePdfResponse)(pdf)))),
        );
      }),
    );
  });

  registerWindowHandler(IPC["smtp:list"], () => {
    return run(
      Effect.gen(function* () {
        const service = yield* SmtpService;
        return Schema.encodeSync(Schema.Array(SmtpProfile))(yield* service.list());
      }),
    );
  });

  registerWindowHandler(IPC["smtp:get"], (payload) => {
    const id = decodePayload(Schema.String, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* SmtpService;
        return Option.getOrNull(
          yield* service
            .get(id)
            .pipe(Effect.map(Option.map((profile) => Schema.encodeSync(SmtpProfile)(profile)))),
        );
      }),
    );
  });

  registerWindowHandler(IPC["smtp:create"], (payload) => {
    const draft = decodePayload(SmtpProfileCreatePayload, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* SmtpService;
        return Schema.encodeSync(SmtpProfile)(yield* service.create(draft));
      }),
    );
  });

  registerWindowHandler(IPC["smtp:update"], (payload) => {
    const { id, name, host, port, username, password } = decodePayload(
      SmtpProfileUpdatePayload,
      payload,
    );
    return run(
      Effect.gen(function* () {
        const service = yield* SmtpService;
        return Schema.encodeSync(SmtpProfile)(
          yield* service.update(id, { name, host, port, username, password }),
        );
      }),
    );
  });

  registerWindowHandler(IPC["smtp:delete"], (payload) => {
    const id = decodePayload(Schema.String, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* SmtpService;
        return Schema.encodeSync(SmtpDeleteResponse)({ deleted: yield* service.delete(id) });
      }),
    );
  });

  registerWindowHandler(IPC["smtp:test"], (payload) => {
    const { host, port, username, password } = decodePayload(SmtpTestPayload, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* SmtpService;
        yield* service.test({ host, port, username, password });
      }),
    );
  });

  registerWindowHandler(IPC["smtp:test-profile"], (payload) => {
    const id = decodePayload(Schema.String, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* SmtpService;
        yield* service.testProfile(id);
      }),
    );
  });

  registerWindowHandler(IPC["send:start"], (payload) => {
    const draft = decodePayload(SendStartPayload, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* SendJobService;
        return Schema.encodeSync(SendJob)(yield* service.start(draft));
      }),
    );
  });

  registerWindowHandler(IPC["send:run"], (payload) => {
    const jobId = decodePayload(Schema.String, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* SendJobService;
        return Schema.encodeSync(SendJob)(yield* service.run(jobId));
      }),
    );
  });

  registerWindowHandler(IPC["send:pause"], (payload) => {
    const jobId = decodePayload(Schema.String, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* SendJobService;
        return Schema.encodeSync(SendJob)(yield* service.pause(jobId));
      }),
    );
  });

  registerWindowHandler(IPC["send:resume"], (payload) => {
    const jobId = decodePayload(Schema.String, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* SendJobService;
        return Schema.encodeSync(SendJob)(yield* service.resume(jobId));
      }),
    );
  });

  registerWindowHandler(IPC["send:cancel"], (payload) => {
    const jobId = decodePayload(Schema.String, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* SendJobService;
        return Schema.encodeSync(SendJob)(yield* service.cancel(jobId));
      }),
    );
  });

  registerWindowHandler(IPC["send:get-status"], (payload) => {
    const jobId = decodePayload(Schema.String, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* SendJobService;
        return Option.getOrNull(
          yield* service
            .getStatus(jobId)
            .pipe(Effect.map(Option.map((job) => Schema.encodeSync(SendJob)(job)))),
        );
      }),
    );
  });

  registerWindowHandler(IPC["send:retry-failed"], (payload) => {
    const jobId = decodePayload(Schema.String, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* SendJobService;
        return Schema.encodeSync(SendJob)(yield* service.retryFailed(jobId));
      }),
    );
  });

  registerWindowHandler(IPC["logs:list"], (payload) => {
    const { statusFilter, dateFrom, dateTo } = decodePayload(LogsListPayload, payload);
    return run(
      Effect.gen(function* () {
        const service = yield* SendJobService;
        return Schema.encodeSync(Schema.Array(SendJobSummary))(
          yield* service.list({ statusFilter, dateFrom, dateTo }),
        );
      }),
    );
  });
}

/**
 * Forwards every job event to every open window, routed to the channel
 * its kind belongs to. Subscribed once at boot; the hub is the only
 * source of job events and windows come and go, so a fresh window picks
 * up the stream from its next event onward (events are deltas - the
 * snapshot API stays the source of truth).
 */
function forwardProgressToWindows(layer: Layer.Layer<AppServices>): void {
  void Effect.runPromise(
    Effect.gen(function* () {
      const hub = yield* ProgressHub;
      hub.subscribe((event) => {
        const channel =
          event.kind === "generate-progress"
            ? IPC["generate-progress"]
            : event.kind === "send-progress"
              ? IPC["send-progress"]
              : IPC["job-paused"];
        for (const win of BrowserWindow.getAllWindows()) {
          win.webContents.send(channel, event);
        }
      });
    }).pipe(Effect.provide(layer)),
  );
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.emailblast.desktop");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // Boot the Effect layer before any window exists: the database is opened
  // (schema applied, defaults seeded) and the configured templates/output
  // directories are ensured. The DB handle stays open for the app lifetime.
  const db = openDatabase(join(app.getPath("userData"), "email-blast.db"));
  const layer = rootLayer(db, defaultPathsForHome(homedir()));
  app.on("will-quit", () => db.close());

  // Awaited before window creation, so the first paint always sees the
  // finished first-run state (directories exist, defaults seeded).
  await Effect.runPromise(
    Effect.gen(function* () {
      const settings = yield* Settings;
      yield* settings.ensureDirectories();
      const info = yield* AppInfo;
      console.log(`[boot] Effect layer ready: ${info.name} v${info.version}`);
    }).pipe(Effect.provide(layer)),
  );

  registerIpcHandlers(layer);
  // Job progress events flow hub -> every window; subscribed before the
  // first window exists so no event is ever missed after windows appear.
  forwardProgressToWindows(layer);
  // Dev-only: assert the preload's API_VERSION matches ours (stale-bundle guard).
  // Registered before window creation so it catches the first webContents too.
  if (is.dev) registerApiVersionAssertion();
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

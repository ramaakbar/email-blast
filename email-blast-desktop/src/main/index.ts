import { app, shell, BrowserWindow, ipcMain, dialog } from "electron";
import { join } from "path";
import { homedir } from "os";
import assert from "node:assert";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import { Context, Effect, Exit, Layer, Option, Schema, Scope } from "effect";
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
  PickPathResponse,
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
import { normalizeUiLocale, SETTING_KEYS } from "../shared/settings";
import { m } from "@paraglide/messages";
import { setLocale } from "@paraglide/runtime";
import { decodePayload, registerWindowHandler } from "./ipc";
import { rootLayer, type AppServices } from "./runtime";
import { AppInfo } from "./services/app-info";
import { defaultPathsForHome } from "./services/default-paths";
import { GenerateJobService } from "./services/generate-jobs";
import { ImportService } from "./services/import";
import { LibreOfficeService } from "./services/libreoffice";
import { ProgressHub } from "./services/progress-hub";
import { RecipientsService } from "./services/recipients";
import { SendEnvService, SendJobService, type SendEnv } from "./services/send-jobs";
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

function createWindow(context: Context.Context<AppServices>, sendEnv: SendEnv): BrowserWindow {
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

  // Ticket 17's quit/close guard: closing the window (X, Cmd+W) or
  // quitting (Cmd+Q, app.quit) while a send is running or paused shows
  // the same dialog on both platforms - [Quit & Pause] opens the quit
  // latch so the run loop stops at its next checkpoint (the job stays
  // `sending` with the cursor persisted; boot recovery turns it `paused`
  // on the next launch) and quits; [Keep Sending] cancels the close.
  // Quitting pauses, never cancels: the job is always resumable from
  // Logs, losing at most the in-flight recipient.
  //
  // The active-job check runs SYNCHRONOUSLY (the repo queries are plain
  // better-sqlite3, so Effect.runSync works) because the decision must
  // land in the same tick as the event: a close that is not prevented
  // here proceeds untouched, including the app.quit() a window-close
  // normally triggers - preventing it unconditionally would abort that
  // quit and strand the app alive with no window (the E2E harness's
  // close hangs on exactly that).
  let closeAllowed = false;
  let quitDialogOpen = false;
  mainWindow.on("close", (event) => {
    if (closeAllowed) return;
    if (quitDialogOpen) {
      // A second close while the dialog is open (Cmd+Q stays active over
      // the sheet, OS session end) must not bypass the guard: prevent it
      // and let the dialog's own decision stand.
      event.preventDefault();
      return;
    }
    let active;
    try {
      active = Effect.runSync(
        Effect.gen(function* () {
          const service = yield* SendJobService;
          return Option.getOrNull(yield* service.activeJobSummary());
        }).pipe(Effect.provideContext(context)),
      );
    } catch {
      // The query itself failed (unreadable DB and the like): fail open -
      // the per-recipient cursor persists regardless, so a close cannot
      // lose more than the boot recovery already accounts for.
      active = null;
    }
    if (active === null) return;
    event.preventDefault();
    quitDialogOpen = true;
    void (async () => {
      try {
        const { response } = await dialog.showMessageBox(mainWindow, {
          type: "warning",
          message: m["sendJob.quitInProgress"]({
            sent: active.sentCount,
            total: active.total,
          }),
          buttons: [m["sendJob.quitAndPause"](), m["sendJob.keepSending"]()],
          defaultId: 1,
          cancelId: 1,
          noLink: true,
        });
        if (response === 0) {
          closeAllowed = true;
          sendEnv.quitLatch.openUnsafe();
          app.quit();
        }
      } finally {
        quitDialogOpen = false;
      }
    })();
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
 * needs a service runs an Effect program against the app context built
 * once at boot - the same service instances every other program shares.
 */
function registerIpcHandlers(context: Context.Context<AppServices>): void {
  const run = <A, E>(program: Effect.Effect<A, E, AppServices>): Promise<A> =>
    Effect.runPromise(program.pipe(Effect.provideContext(context)));

  registerWindowHandler(IPC["system:ping"], () => {
    return Schema.encodeSync(PingResponse)({ pong: true, apiVersion: API_VERSION });
  });

  registerWindowHandler(IPC["system:check-libreoffice"], () => {
    return run(
      Effect.gen(function* () {
        const service = yield* LibreOfficeService;
        return Schema.encodeSync(PickPathResponse)(service.findLibreOffice());
      }),
    );
  });

  registerWindowHandler(IPC["system:pick-folder"], () => {
    return dialog
      .showOpenDialog({ properties: ["openDirectory"] })
      .then((result) =>
        Schema.encodeSync(PickPathResponse)(result.canceled ? null : (result.filePaths[0] ?? null)),
      );
  });

  registerWindowHandler(IPC["system:pick-excel-file"], () => {
    return dialog
      .showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: m["dialogs.excelFilter"](), extensions: ["xlsx", "xls"] }],
      })
      .then((result) =>
        Schema.encodeSync(PickPathResponse)(result.canceled ? null : (result.filePaths[0] ?? null)),
      );
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
        filters: [{ name: m["dialogs.templateFilter"](), extensions }],
      })
      .then((result) =>
        Schema.encodeSync(PickPathResponse)(result.canceled ? null : (result.filePaths[0] ?? null)),
      );
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
        // The language row IS the main process's locale (ADR-0004): keep
        // the runtime in sync so main-produced strings (service errors,
        // dialog filter names) switch language live, not only at boot.
        if (key === SETTING_KEYS.language) {
          setLocale(normalizeUiLocale(value), { reload: false });
        }
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

  registerWindowHandler(IPC["send:get-launch-banner"], () => {
    return run(
      Effect.gen(function* () {
        const service = yield* SendJobService;
        return Option.getOrNull(yield* service.launchBannerJob());
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
 * its kind belongs to. Subscribed once at boot against the shared app
 * context, so the hub this subscribes to is the same instance every job
 * run emits into; the hub is the only source of job events and windows
 * come and go, so a fresh window picks up the stream from its next event
 * onward (events are deltas - the snapshot API stays the source of truth).
 */
function forwardProgressToWindows(context: Context.Context<AppServices>): void {
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
    }).pipe(Effect.provideContext(context)),
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
  // The OS locale seeds the UI language setting on first run (ADR-0004).
  const layer = rootLayer(db, defaultPathsForHome(homedir()), app.getLocale());
  app.on("will-quit", () => {
    db.close();
    // The service graph holds no scoped resources, but the scope is closed
    // anyway - the counterpart of the Scope.make at boot.
    void Effect.runPromise(Scope.close(scope, Exit.void));
  });

  // The service graph is BUILT ONCE here and every program - the boot
  // sequence, the IPC handlers, the progress forwarder - runs against the
  // same context. Effect 4.0 beta rebuilds a layer on every provide call,
  // so services that carry process state (the progress hub's listeners,
  // the send service's pause/cancel control, the quit latch) would get a
  // fresh instance per IPC call and silently stop coordinating.
  const { context, scope } = await Effect.runPromise(
    Effect.gen(function* () {
      // The locals are named differently from the destructured pair to
      // keep oxlint's no-shadow quiet (the destructured names are in
      // scope for the whole block, so the generator's own locals would
      // shadow them).
      const builtScope = yield* Scope.make();
      const builtContext = yield* Layer.buildWithScope(layer, builtScope);
      return { context: builtContext, scope: builtScope };
    }),
  );

  // Awaited before window creation, so the first paint always sees the
  // finished first-run state (directories exist, defaults seeded) and the
  // main-process locale matches the persisted UI language - every
  // user-facing string a service produces from here on is in that language.
  await Effect.runPromise(
    Effect.gen(function* () {
      const settings = yield* Settings;
      yield* settings.ensureDirectories();
      setLocale(yield* settings.getLanguage(), { reload: false });
      const info = yield* AppInfo;
      console.log(`[boot] Effect layer ready: ${info.name} v${info.version}`);
    }).pipe(Effect.provideContext(context)),
  );

  // Ticket 17 boot recovery: a job stuck `sending` (hard crash, power
  // loss, or a quit that landed between recipients) becomes `paused` -
  // the persisted cursor is authoritative. Runs before any window exists,
  // so the first paint already sees the recovered state (the launch
  // banner queries it via IPC at mount). The same program hands out the
  // quit latch the close guard opens when the user picks Quit & Pause.
  const sendEnv = await Effect.runPromise(
    Effect.gen(function* () {
      const service = yield* SendJobService;
      const recovered = yield* service.recoverInterrupted();
      if (recovered > 0) {
        console.log(`[boot] recovered ${recovered} interrupted send job(s) to paused`);
      }
      return yield* SendEnvService;
    }).pipe(Effect.provideContext(context)),
  );

  registerIpcHandlers(context);
  // Job progress events flow hub -> every window; subscribed before the
  // first window exists so no event is ever missed after windows appear.
  forwardProgressToWindows(context);
  // Dev-only: assert the preload's API_VERSION matches ours (stale-bundle guard).
  // Registered before window creation so it catches the first webContents too.
  if (is.dev) registerApiVersionAssertion();
  createWindow(context, sendEnv);

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow(context, sendEnv);
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

import { app, shell, BrowserWindow, dialog, ipcMain, safeStorage } from "electron";
import { join } from "path";
import { homedir } from "os";
import assert from "node:assert";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import { Context, Effect, Exit, Layer, Option, Scope } from "effect";
import { m } from "@paraglide/messages";
import { setLocale } from "@paraglide/runtime";
import { API_VERSION, DEV_CHANNELS, WIRE } from "../shared/wire";
import { registerHandlers } from "./ipc-core";
import { electronRegistry, systemOperations } from "./ipc";
import { rootLayer, type AppServices } from "./runtime";
import { AppInfo } from "./services/app-info";
import { defaultPathsForHome } from "./services/default-paths";
import { importOperations } from "./services/import";
import { ProgressHub } from "./services/progress-hub";
import { recipientsOperations } from "./services/recipients";
import {
  logsOperations,
  sendOperations,
  SendEnvService,
  SendJobService,
  type SendEnv,
} from "./services/send-jobs";
import { smtpOperations } from "./services/smtp";
import { migrateCredentialsAtRest, openDatabase } from "./db/repository";
import { makeCredentialCrypto } from "./services/credential-crypto";
import { settingsOperations, Settings } from "./services/settings";
import { messageTemplatesOperations } from "./services/message-templates";
import { templatesOperations } from "./services/templates";
import { fontsOperations } from "./services/fonts";
import { generateOperations } from "./services/generate-jobs";
import { updateOperations, UpdateService } from "./services/update";

// Set by scripts/dev.mjs before Electron starts; absent in every packaged
// run, where the renderer loads from out/renderer/index.html (ADR-0010).
const devServerUrl = process.env.VITE_DEV_SERVER_URL;

// The only origins the app may ever display: the Vite dev server in dev,
// the local packaged file in production. Everything else is a navigation
// away from the app and gets blocked.
const expectedOrigin = is.dev && devServerUrl ? new URL(devServerUrl).origin : "file://";

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
      preload: join(__dirname, "../preload/index.js"),
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

  // Load the dev server in development, the packaged html file otherwise.
  if (is.dev && devServerUrl) {
    void mainWindow.loadURL(devServerUrl);
  } else {
    void mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
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
  ipcMain.on(DEV_CHANNELS.apiVersionReport, (event, reported: unknown) => {
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
      contents.send(DEV_CHANNELS.apiVersionCheck);
    });
  });
}

/**
 * The full IPC surface, one operation table per domain, each colocated
 * with its service module. Registering is a loop over this list - adding
 * a domain is adding its table here and nothing else; the wire table and
 * the domain module hold the rest of an operation's facts.
 */
const DOMAINS = [
  systemOperations,
  settingsOperations,
  importOperations,
  recipientsOperations,
  templatesOperations,
  fontsOperations,
  messageTemplatesOperations,
  generateOperations,
  smtpOperations,
  sendOperations,
  logsOperations,
  updateOperations,
] as const;

/**
 * Registers every operation against the Electron registry. The shared
 * context built once at boot provides the same service instances every
 * other program uses; per-call decode/run/encode is the machinery's job.
 */
function registerIpcHandlers(context: Context.Context<AppServices>): void {
  registerHandlers(electronRegistry, context, DOMAINS);
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
            ? WIRE.generate.onGenerateProgress.channel
            : event.kind === "send-progress"
              ? WIRE.send.onSendProgress.channel
              : WIRE.send.onJobPaused.channel;
        for (const win of BrowserWindow.getAllWindows()) {
          win.webContents.send(channel, event);
        }
      });
    }).pipe(Effect.provideContext(context)),
  );
}

/**
 * Forwards every update-state change to every open window. Subscribed once
 * at boot against the shared app context, before the first window exists -
 * the service's subscription set is what carries a transition, so a window
 * that appears later picks the stream up from its next state and reads the
 * current one through `getState` when it mounts.
 */
function forwardUpdateToWindows(context: Context.Context<AppServices>): void {
  void Effect.runPromise(
    Effect.gen(function* () {
      const update = yield* UpdateService;
      update.subscribe((state) => {
        for (const win of BrowserWindow.getAllWindows()) {
          win.webContents.send(WIRE.update.onState.channel, state);
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
  // Ticket 02: legacy plaintext SMTP credentials are encrypted in place
  // before any service reads them; on platforms without a usable keychain
  // the migration logs clearly and the app stores plaintext (graceful
  // degradation). The credential crypto rides the same seam into the repo.
  const credCrypto = makeCredentialCrypto(safeStorage, (message) => console.log(message));
  migrateCredentialsAtRest(db, credCrypto, (message) => console.log(message));
  // Ticket 11: the bundled faces ship inside the packaged app
  // (process.resourcesPath/fonts via electron-builder's extraResources
  // entry, ADR-0010); in
  // dev they live in the project's resources/fonts. Uploads are copied
  // into the app data dir next to the database.
  const fontDirs = {
    fontsDir: join(app.getPath("userData"), "fonts"),
    bundledFontsDir: is.dev
      ? join(app.getAppPath(), "resources", "fonts")
      : join(process.resourcesPath, "fonts"),
  };
  // The OS locale seeds the UI language setting on first run (ADR-0004).
  const layer = rootLayer(
    db,
    defaultPathsForHome(homedir()),
    app.getLocale(),
    credCrypto,
    fontDirs,
  );
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
      // Ticket 21: the launch bookkeeping. A version change since the last
      // launch raises the one-time "updated to version X" notice; a first
      // run only records the baseline, and an unchanged one leaves a notice
      // the user never dismissed in place - all before the first paint, so
      // the renderer's mount snapshot already carries it.
      const update = yield* UpdateService;
      yield* update.recordLaunch();
      return yield* SendEnvService;
    }).pipe(Effect.provideContext(context)),
  );

  registerIpcHandlers(context);
  // Job progress events flow hub -> every window; subscribed before the
  // first window exists so no event is ever missed after windows appear.
  forwardProgressToWindows(context);
  // Update-state changes flow service -> every window, subscribed here for
  // the same reason (the service holds the subscription set).
  forwardUpdateToWindows(context);
  // Dev-only: assert the preload's API_VERSION matches ours (stale-bundle guard).
  // Registered before window creation so it catches the first webContents too.
  if (is.dev) registerApiVersionAssertion();
  createWindow(context, sendEnv);
  // Ticket 21: one launch check, fired behind the window - the first paint
  // never waits on a network round-trip, and the banner for a found version
  // arrives over the pushed state when the check lands (a packaged run only;
  // an unpackaged one reports `unsupported` without touching the network).
  void Effect.runPromise(
    Effect.gen(function* () {
      const update = yield* UpdateService;
      yield* update.check();
    }).pipe(Effect.provideContext(context)),
  );

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

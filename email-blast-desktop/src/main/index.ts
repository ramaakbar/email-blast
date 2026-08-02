import { app, shell, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import assert from "node:assert";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import { Effect, Schema } from "effect";
import { API_VERSION, IPC, PingResponse } from "../shared/ipc";
import { registerWindowHandler } from "./ipc";
import { rootLayer } from "./runtime";
import { AppInfo } from "./services/app-info";

// The only origins the app may ever display: the Vite dev server in dev,
// the local packaged file in production. Everything else is a navigation
// away from the app and gets blocked.
const expectedOrigin =
  is.dev && process.env["ELECTRON_RENDERER_URL"]
    ? new URL(process.env["ELECTRON_RENDERER_URL"]).origin
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
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    void mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
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

// Skeleton IPC surface. Responses are Schema-encoded at the boundary;
// later tickets add the full domain surface with payload decoding.
function registerIpcHandlers(): void {
  registerWindowHandler(IPC["system:ping"], () => {
    return Schema.encodeSync(PingResponse)({ pong: true, apiVersion: API_VERSION });
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.emailblast.desktop");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  registerIpcHandlers();
  // Dev-only: assert the preload's API_VERSION matches ours (stale-bundle guard).
  // Registered before window creation so it catches the first webContents too.
  if (is.dev) registerApiVersionAssertion();
  createWindow();

  // Seam A: boot the main-process Effect layer (the composition root that
  // later tickets grow into the full service graph).
  void Effect.runPromise(
    Effect.gen(function* () {
      const info = yield* AppInfo;
      return info;
    }).pipe(Effect.provide(rootLayer)),
  ).then((info) => {
    console.log(`[boot] Effect layer ready: ${info.name} v${info.version}`);
  });

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

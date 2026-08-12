import { ipcMain, BrowserWindow, dialog, type IpcMainInvokeEvent } from "electron";
import { Effect } from "effect";
import { m } from "@paraglide/messages";
import { API_VERSION, WIRE } from "../shared/wire";
import { GetAppInfoResponse, PickPathResponse, PingResponse } from "../shared/ipc";
import { TEMPLATE_EXTENSIONS } from "../shared/template-validation";
import { AppInfo } from "./services/app-info";
import { LibreOfficeService } from "./services/libreoffice";
import { makeOp, type IpcRegistry } from "./ipc-core";

/**
 * True when the event comes from the top-level frame of one of our own
 * windows. Rejects calls from subframes, devtools, or any other content.
 */
export function isTrustedSender(event: IpcMainInvokeEvent): boolean {
  return BrowserWindow.getAllWindows().some(
    (win) =>
      win.webContents === event.sender &&
      event.senderFrame !== null &&
      event.senderFrame === win.webContents.mainFrame,
  );
}

/**
 * The production registry adapter: Electron's `ipcMain.handle` behind the
 * trusted-sender check. The test adapter is a capturing fake - two
 * adapters make the seam real.
 */
export const electronRegistry: IpcRegistry = {
  handle(channel, handler) {
    ipcMain.handle(channel, (event, ...args) => {
      if (!isTrustedSender(event)) {
        throw new Error(`Blocked IPC call "${channel}" from an unexpected sender`);
      }
      return handler(args.length === 0 ? null : args.length === 1 ? args[0] : args);
    });
  },
};

/**
 * The system domain's operation table. Every other domain table is
 * colocated with its service module; system has no service - its
 * operations are native dialogs and app identity - so it lives here with
 * the bridge.
 */
export const systemOperations = {
  ping: makeOp(WIRE.system.ping, null, PingResponse, () =>
    Effect.sync(() => ({ pong: true as const, apiVersion: API_VERSION })),
  ),
  checkLibreOffice: makeOp(WIRE.system.checkLibreOffice, null, PickPathResponse, () =>
    Effect.gen(function* () {
      const service = yield* LibreOfficeService;
      return service.findLibreOffice();
    }),
  ),
  pickFolder: makeOp(WIRE.system.pickFolder, null, PickPathResponse, () =>
    Effect.promise(() =>
      dialog
        .showOpenDialog({ properties: ["openDirectory"] })
        .then((result) => (result.canceled ? null : (result.filePaths[0] ?? null))),
    ),
  ),
  pickExcelFile: makeOp(WIRE.system.pickExcelFile, null, PickPathResponse, () =>
    Effect.promise(() =>
      dialog
        .showOpenDialog({
          properties: ["openFile"],
          filters: [{ name: m["dialogs.excelFilter"](), extensions: ["xlsx", "xls"] }],
        })
        .then((result) => (result.canceled ? null : (result.filePaths[0] ?? null))),
    ),
  ),
  pickTemplateFile: makeOp(WIRE.system.pickTemplateFile, null, PickPathResponse, () =>
    Effect.promise(() => {
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
        .then((result) => (result.canceled ? null : (result.filePaths[0] ?? null)));
    }),
  ),
  pickFontFile: makeOp(WIRE.system.pickFontFile, null, PickPathResponse, () =>
    Effect.promise(() =>
      dialog
        .showOpenDialog({
          properties: ["openFile"],
          filters: [{ name: m["dialogs.fontFilter"](), extensions: ["ttf", "otf"] }],
        })
        .then((result) => (result.canceled ? null : (result.filePaths[0] ?? null))),
    ),
  ),
  getAppInfo: makeOp(WIRE.system.getAppInfo, null, GetAppInfoResponse, () =>
    Effect.gen(function* () {
      return yield* AppInfo;
    }),
  ),
};

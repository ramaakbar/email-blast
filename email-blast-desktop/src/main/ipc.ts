import { ipcMain, BrowserWindow, type IpcMainInvokeEvent } from "electron";

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
 * Registers an IPC handler behind the sender check.
 * Handlers are registered once per channel for the app's lifetime;
 * later tickets add payload schemas decoded at this boundary.
 */
export function registerWindowHandler(
  channel: string,
  handler: () => Promise<unknown> | unknown,
): void {
  ipcMain.handle(channel, (event) => {
    if (!isTrustedSender(event)) {
      throw new Error(`Blocked IPC call "${channel}" from an unexpected sender`);
    }
    return handler();
  });
}

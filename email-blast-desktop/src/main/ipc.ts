import { ipcMain, BrowserWindow, type IpcMainInvokeEvent } from "electron";
import { Schema } from "effect";

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
 * Decodes a renderer-to-main payload at the boundary. The wire payload is
 * the raw `invoke` argument (bare value for single-argument calls, tuple
 * for multi-argument calls); malformed payloads throw a typed ParseError
 * before any handler logic runs.
 */
export function decodePayload<S extends Schema.ConstraintDecoder<unknown>>(
  schema: S,
  payload: unknown,
): S["Type"] {
  return Schema.decodeUnknownSync(schema)(payload);
}

/**
 * Registers an IPC handler behind the sender check.
 * The handler receives the raw invoke payload (null when the call had no
 * arguments) and must decode it at the boundary before doing any work.
 * Handlers are registered once per channel for the app's lifetime.
 */
export function registerWindowHandler(
  channel: string,
  handler: (payload: unknown) => Promise<unknown> | unknown,
): void {
  ipcMain.handle(channel, (event, ...args) => {
    if (!isTrustedSender(event)) {
      throw new Error(`Blocked IPC call "${channel}" from an unexpected sender`);
    }
    return handler(args.length === 0 ? null : args.length === 1 ? args[0] : args);
  });
}

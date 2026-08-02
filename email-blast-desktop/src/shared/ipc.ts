import { Schema } from "effect";
import { API_VERSION, IPC } from "./ipc-channels";

export { API_VERSION, IPC };

/**
 * The IPC contract between the renderer and the main process.
 *
 * This module is the single source of truth for the contract:
 * - `API_VERSION` guards against stale builds (dev-asserted between preload and main)
 * - `IPC` holds every channel name; the renderer never sees these strings,
 *   the preload maps them to the typed `window.api` object
 * - Effect `Schema`s define every payload; types are derived, never hand-written
 *
 * Versioning is additive-only: channels and fields are added, never removed
 * or renamed; fields demote to `optional` rather than delete.
 */

/**
 * `system.ping` response - proves the bridge works and reports the
 * main process's API_VERSION to the renderer.
 */
export const PingResponse = Schema.Struct({
  pong: Schema.Literal(true),
  apiVersion: Schema.Number,
});
export type PingResponse = Schema.Schema.Type<typeof PingResponse>;

/**
 * `system.getAppInfo` response - the static identity of the app,
 * shown in the Settings About section.
 */
export const GetAppInfoResponse = Schema.Struct({
  name: Schema.String,
  version: Schema.String,
});
export type GetAppInfoResponse = Schema.Schema.Type<typeof GetAppInfoResponse>;

/**
 * Renderer-to-main payloads, decoded at the main boundary (malformed calls
 * become typed ParseErrors). Single-argument calls carry the bare value;
 * multi-argument calls carry a tuple, mirroring `ipcRenderer.invoke(...args)`.
 */
export const SettingsGetPayload = Schema.String;
export const SettingsSetPayload = Schema.Tuple([Schema.String, Schema.String]);
export type SettingsSetPayload = Schema.Schema.Type<typeof SettingsSetPayload>;

/**
 * The contextBridge-exposed API (`window.api`). Domains and methods are
 * added additively as later tickets land.
 */
export interface Api {
  system: {
    ping(): Promise<PingResponse>;
    /** Path of a usable `soffice` binary, or null when LibreOffice is missing. */
    checkLibreOffice(): Promise<string | null>;
    /** Opens a native folder picker; the chosen path, or null when cancelled. */
    pickFolder(): Promise<string | null>;
    getAppInfo(): Promise<GetAppInfoResponse>;
  };
  settings: {
    /** Raw setting value by key (persisted in SQLite), or null when unset. */
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
  };
}

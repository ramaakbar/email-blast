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
 * The contextBridge-exposed API skeleton (`window.api`).
 * Domains and methods are added additively as later tickets land.
 */
export interface Api {
  system: {
    ping(): Promise<PingResponse>;
  };
}

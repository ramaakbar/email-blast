import { contextBridge, ipcRenderer, webUtils } from "electron";
import { API_VERSION, DEV_CHANNELS, WIRE } from "../shared/wire";
import type { Api } from "../shared/ipc";

/**
 * A wire-table entry: an invoke call (with its argument count) or a
 * main-to-renderer push event.
 */
type WireEntry =
  | { readonly channel: string; readonly args: 0 | 1 | 2 }
  | { readonly channel: string; readonly event: true };

/**
 * The object shape the wire table generates, mirroring the `Api` domains:
 * zero-arg invokes become `() => Promise`, one-arg `(arg) => Promise`,
 * two-arg `(a, b) => Promise`, and events `(cb) => unsubscribe`. Payload
 * types stay `unknown` here - the `Api` contract is enforced by the
 * `_WireKeysMatchApi` type assertion, not by assignability.
 */
type ApiFromWire<W> = {
  [D in keyof W]: W[D] extends Record<string, WireEntry>
    ? {
        [M in keyof W[D]]: W[D][M] extends { readonly event: true }
          ? (cb: (payload: unknown) => void) => () => void
          : W[D][M] extends { readonly args: 0 }
            ? () => Promise<unknown>
            : W[D][M] extends { readonly args: 2 }
              ? (a: unknown, b: unknown) => Promise<unknown>
              : (arg: unknown) => Promise<unknown>;
      }
    : never;
};

/**
 * Builds the whole invoke/event surface from the wire table: one generic
 * `ipcRenderer.invoke` per operation, one subscription helper per event.
 * Method names come from the table's keys, channel strings from its
 * entries - neither exists in the preload by hand.
 */
function buildApi<W extends Record<string, Record<string, WireEntry>>>(wire: W): ApiFromWire<W> {
  const api: Record<string, Record<string, unknown>> = {};
  for (const [domainName, ops] of Object.entries(wire)) {
    const domain: Record<string, unknown> = {};
    for (const [method, entry] of Object.entries(ops)) {
      const e = entry as WireEntry;
      domain[method] =
        "event" in e && e.event
          ? (cb: (payload: unknown) => void) => {
              const listener = (_event: unknown, payload: unknown): void => cb(payload);
              ipcRenderer.on(e.channel, listener);
              return () => {
                ipcRenderer.removeListener(e.channel, listener);
              };
            }
          : (...args: unknown[]) => ipcRenderer.invoke(e.channel, ...args);
    }
    api[domainName] = domain;
  }
  return api as unknown as ApiFromWire<W>;
}

/** Preload-local methods that never cross the wire. */
type Locals = { system: "getPathForFile" };

type WireKeys = { [D in keyof typeof WIRE]: keyof (typeof WIRE)[D] };
type ApiKeys = {
  [D in keyof Api]: Exclude<keyof Api[D], D extends keyof Locals ? Locals[D] : never>;
};

/**
 * The compile-time drift guard: the wire table's domains and methods must
 * exactly match the `Api` contract's, minus the preload locals. A wire
 * method added without an Api method (or vice versa) makes this `false`,
 * and the conditional in the `api` cast below resolves to `never` -
 * failing the preload's typecheck.
 */
type WireKeysMatchApi = [ApiKeys] extends [WireKeys]
  ? [WireKeys] extends [ApiKeys]
    ? true
    : false
  : false;

const wireApi = buildApi(WIRE);

/**
 * The contextBridge API skeleton, derived from the wire table. The cast
 * is unchecked by design: the key-level match is asserted by
 * `WireKeysMatchApi`, and the `Api` interface supplies the payload and
 * return types the renderer sees.
 */
const api = {
  ...wireApi,
  system: {
    ...wireApi.system,
    // Not an IPC call: webUtils runs entirely in the preload (the
    // deprecated File.path is not available with the sandbox on).
    getPathForFile: (file: File) => webUtils.getPathForFile(file),
  },
} as unknown as WireKeysMatchApi extends true ? Api : never;

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld("api", api);
} else {
  // Our webPreferences always enable contextIsolation; refuse to run weakened.
  throw new Error("[preload] contextIsolation is disabled - refusing to expose the API");
}

// Dev-only handshake: report our API_VERSION to main so it can assert
// preload and main agree (stale-bundle guard). Never triggered in packaged builds.
ipcRenderer.on(DEV_CHANNELS.apiVersionCheck, () => {
  ipcRenderer.send(DEV_CHANNELS.apiVersionReport, API_VERSION);
});

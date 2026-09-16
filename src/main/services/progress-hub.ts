import { Context, Layer } from "effect";
import type { HubEvent } from "../../shared/ipc";

/**
 * The progress event hub (spec decision 3): every job writes its events
 * here - generate progress, send progress, and job-paused - and the main
 * process subscribes once at boot and forwards each event to every window
 * via `webContents.send`, routed by `kind`. Emitting is synchronous and
 * loss-free for the subscription side; the renderer treats events as
 * deltas and SQLite stays the source of truth (a missed event is
 * recovered from the next snapshot), so the hub needs no queue or
 * backpressure.
 */

export interface ProgressHubShape {
  /** Subscribes a listener; returns the unsubscribe function. */
  readonly subscribe: (listener: (event: HubEvent) => void) => () => void;
  /** Emits an event to every current subscriber. */
  readonly emit: (event: HubEvent) => void;
}

export function makeProgressHub(): ProgressHubShape {
  const listeners = new Set<(event: HubEvent) => void>();
  return {
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    emit: (event) => {
      for (const listener of listeners) listener(event);
    },
  };
}

/**
 * The progress hub service. The root layer provides it alongside the job
 * services; the boot code subscribes once and forwards to windows.
 * `Layer.sync` defers construction to layer build time, and the layer is
 * built ONCE at boot (index.ts builds the graph and every program runs
 * against that context), so the hub the jobs emit into is the same
 * instance the forwarder subscribed to. Building it per `Effect.provide`
 * call would silently drop every progress event - Effect 4.0 beta
 * rebuilds a layer for each provide.
 */
export class ProgressHub extends Context.Service<ProgressHub, ProgressHubShape>()("ProgressHub") {
  static readonly Live: Layer.Layer<ProgressHub> = Layer.sync(ProgressHub, makeProgressHub);
}

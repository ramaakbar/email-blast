import type { ComposePrefill } from "./lib/compose-prefill";

/**
 * TanStack Router's `HistoryState` is declared with only its internal
 * keys; the Logs retry passes the compose pre-fill through it, so the
 * interface is augmented here (the router's documented way to type custom
 * location state). Both the navigator and the reader stay type-checked.
 */
declare module "@tanstack/history" {
  interface HistoryState {
    composePrefill?: ComposePrefill;
  }
}

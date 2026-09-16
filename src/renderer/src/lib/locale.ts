import { useSyncExternalStore } from "react";
import { getLocale, isLocale, setLocale } from "@paraglide/runtime";
import {
  DEFAULT_UI_LOCALE,
  normalizeUiLocale,
  type UiLocale,
} from "../../../shared/settings";

/**
 * The renderer's locale wiring (ADR-0004). The Paraglide runtime runs with
 * the globalVariable strategy, so `setLocale` never touches cookies, URLs,
 * or localStorage - the persisted settings row is the source of truth and
 * the runtime state is applied at boot. The language switcher calls
 * `applyLocale` + persists; this tiny store re-renders subscribers through
 * `useSyncExternalStore` (message functions read the locale at call time,
 * so a re-render is all that's needed).
 */

const listeners = new Set<() => void>();

/** Applies a UI locale to the Paraglide runtime without a page reload. */
export function applyLocale(locale: UiLocale): void {
  if (!isLocale(locale)) return;
  setLocale(locale, { reload: false });
  for (const listener of listeners) listener();
}

/** The locale the Paraglide runtime currently serves messages in. */
export function currentLocale(): UiLocale {
  return normalizeUiLocale(getLocale());
}

/** Re-renders the component when the locale changes. */
export function useLocale(): UiLocale {
  return useSyncExternalStore(
    (onStoreChange) => {
      listeners.add(onStoreChange);
      return () => listeners.delete(onStoreChange);
    },
    currentLocale,
  );
}

/** The system's UI language normalized to a shipped locale (en fallback). */
export function systemLocale(): UiLocale {
  return normalizeUiLocale(
    typeof navigator !== "undefined" ? navigator.language : DEFAULT_UI_LOCALE,
  );
}

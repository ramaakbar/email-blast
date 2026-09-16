import "./assets/main.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createHashHistory, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { normalizeUiLocale, SETTING_KEYS } from "../../shared/settings";
import { applyLocale, systemLocale } from "./lib/locale";

// Hash history: in packaged builds the renderer loads from a file:// URL,
// where location.pathname is the absolute file path and would never match a
// route. Hash-based URLs (#/recipients) match reliably on any scheme.
const router = createRouter({ routeTree, history: createHashHistory() });
const queryClient = new QueryClient();

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

/**
 * Applies the persisted UI language before the first paint (ADR-0004). The
 * main process seeds the setting from the OS locale on first launch; when
 * the row is missing (fresh profile mid-setup, dev bridge quirks) the
 * renderer falls back to its own system locale. Message functions read the
 * locale at call time, so applying it before `createRoot` renders every
 * first-paint string in the right language.
 */
async function bootLocale(): Promise<void> {
  try {
    const raw = await window.api.settings.get(SETTING_KEYS.language);
    applyLocale(normalizeUiLocale(raw ?? systemLocale()));
  } catch {
    applyLocale(systemLocale());
  }
}

void bootLocale().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
});

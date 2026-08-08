import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { FileText, History, Send, Settings, Upload, Users } from "lucide-react";
import { Toaster } from "sonner";
import { m } from "@paraglide/messages";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale";
import { WelcomeScreen } from "@/components/welcome-screen";
import { SETTING_KEYS } from "../../../shared/settings";

const NAV_ITEMS = [
  { to: "/import", label: () => m["nav.import"](), icon: Upload },
  { to: "/recipients", label: () => m["nav.recipients"](), icon: Users },
  { to: "/templates", label: () => m["nav.templates"](), icon: FileText },
  { to: "/compose", label: () => m["nav.compose"](), icon: Send },
  { to: "/logs", label: () => m["nav.logs"](), icon: History },
  { to: "/settings", label: () => m["nav.settings"](), icon: Settings },
] as const;

export const Route = createRootRoute({
  component: RootLayout,
});

/**
 * Setup gate: a fresh profile (`libreoffice_checked` unset/false) shows the
 * welcome screen instead of the app shell; once the user has gone through
 * setup the setting is true and every later launch goes straight to the app.
 */
function RootLayout() {
  const [setupDone, setSetupDone] = useState<boolean | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  // Subscribed at the root so the whole tree re-renders when the language
  // changes - message functions read the locale at call time, so a single
  // re-render flips every string in the current screen (ADR-0004).
  useLocale();

  useEffect(() => {
    let cancelled = false;
    window.api.settings
      .get(SETTING_KEYS.libreofficeChecked)
      .then((value) => {
        if (!cancelled) setSetupDone(value === "true");
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const retry = useCallback(() => {
    setLoadError(false);
    setSetupDone(null);
    setReloadKey((key) => key + 1);
  }, []);

  if (loadError) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background p-8">
        <p className="text-sm text-muted-foreground">{m["app.backendUnreachable"]()}</p>
        <Button onClick={retry}>{m["common.retry"]()}</Button>
      </div>
    );
  }

  if (setupDone === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="animate-pulse text-sm font-semibold tracking-tight">Email Blast</p>
      </div>
    );
  }

  if (!setupDone) {
    return <WelcomeScreen onComplete={() => setSetupDone(true)} />;
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="flex w-60 shrink-0 flex-col border-r bg-sidebar">
        <div className="flex h-14 items-center px-4 text-sm font-semibold tracking-tight">
          Email Blast
        </div>
        <nav className="flex-1 space-y-1 px-2 py-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              activeProps={{ className: "bg-muted text-foreground" }}
              inactiveProps={{
                className: "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              }}
            >
              <item.icon className="size-4" />
              {item.label()}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

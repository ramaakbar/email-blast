import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { FileText, History, Loader2, Play, Send, Settings, Upload, Users, X } from "lucide-react";
import { Toaster } from "sonner";
import { m } from "@paraglide/messages";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale";
import { errorMessage } from "@/lib/error-message";
import { WelcomeScreen } from "@/components/welcome-screen";
import { SETTING_KEYS } from "../../../shared/settings";
import type { SendJobSummary } from "../../../shared/ipc";

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
  const queryClient = useQueryClient();
  // Subscribed at the root so the whole tree re-renders when the language
  // changes - message functions read the locale at call time, so a single
  // re-render flips every string in the current screen (ADR-0004).
  useLocale();

  // Ticket 17's one-time launch banner: exactly one `paused` job at
  // startup (an interrupted send recovered to `paused` at boot, or an
  // explicit pause) offers Resume right away. Fetched at mount; progress
  // and pause events refresh it, so a resume from the banner or from Logs
  // retires it. Dismiss sticks for the session - the banner never
  // re-appears after the user closed it (the ref keeps the event-driven
  // refresh from undoing the dismissal).
  const bannerDismissedRef = useRef(false);
  // Mirrors `bannerJob` for the event listeners: while the banner is
  // visible, per-recipient progress refreshes it (a resumed run retires
  // it); once it is gone, progress events are skipped so a large batch
  // does not run a full send-jobs scan on the shared main-process event
  // loop for every recipient. Pause events always refresh - they are the
  // only ones that can CREATE a fresh banner.
  const bannerVisibleRef = useRef(false);
  const [bannerJob, setBannerJob] = useState<SendJobSummary | null>(null);
  const [bannerResuming, setBannerResuming] = useState(false);
  const [bannerError, setBannerError] = useState<string | null>(null);

  useEffect(() => {
    bannerVisibleRef.current = bannerJob !== null;
  }, [bannerJob]);

  const refreshBanner = useCallback((): void => {
    window.api.send
      .getLaunchBanner()
      .then((job) => {
        if (!bannerDismissedRef.current) setBannerJob(job);
      })
      // The banner is best-effort decoration - a failure must never
      // block the app shell.
      .catch(() => {});
  }, []);

  useEffect(() => {
    refreshBanner();
    const offProgress = window.api.send.onSendProgress(() => {
      if (bannerVisibleRef.current) refreshBanner();
    });
    const offPaused = window.api.send.onJobPaused(() => refreshBanner());
    return () => {
      offProgress();
      offPaused();
    };
  }, [refreshBanner]);

  const dismissBanner = useCallback(() => {
    bannerDismissedRef.current = true;
    setBannerJob(null);
  }, []);

  // The same resume pair as the Logs Resume button (useResumeSend): mark
  // the job `pending`, then run - `run` re-runs the SMTP pre-flight and
  // continues from the first `pending` recipient after the persisted
  // cursor. A failed resume (pre-flight, one-active) reverts the job to
  // `paused`, so the banner stays with its error and Resume remains
  // available. A run that resolves `paused` means the loop auto-paused
  // (retries exhausted) - the banner stays up for that job too; only a
  // terminal run retires it.
  const resumeBannerJob = useCallback(
    async (job: SendJobSummary): Promise<void> => {
      setBannerResuming(true);
      setBannerError(null);
      try {
        await window.api.send.resumeSend(job.id);
        const done = await window.api.send.runSend(job.id);
        if (done.status === "paused") {
          refreshBanner();
        } else {
          bannerDismissedRef.current = true;
          setBannerJob(null);
        }
      } catch (error) {
        setBannerError(errorMessage(error, m["sendJob.couldNotResumeJob"]()));
      } finally {
        setBannerResuming(false);
        void queryClient.invalidateQueries({ queryKey: ["logs"] });
      }
    },
    [queryClient, refreshBanner],
  );

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
        {bannerJob !== null && (
          <div className="flex items-start gap-3 border-b bg-amber-50 px-6 py-3 text-sm">
            <History className="mt-0.5 size-4 shrink-0 text-amber-700" />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-amber-900">
                {m["sendJob.launchBanner"]({
                  subject: bannerJob.subject,
                  sent: bannerJob.sentCount,
                  total: bannerJob.total,
                })}
              </p>
              {bannerError !== null && <p className="mt-1 text-destructive">{bannerError}</p>}
            </div>
            <Button
              size="sm"
              disabled={bannerResuming}
              onClick={() => void resumeBannerJob(bannerJob)}
            >
              {bannerResuming ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> {m["logs.resuming"]()}
                </>
              ) : (
                <>
                  <Play className="size-4" /> {m["common.resume"]()}
                </>
              )}
            </Button>
            <button
              type="button"
              aria-label={m["common.dismiss"]()}
              onClick={dismissBanner}
              className="rounded p-1 text-amber-700 transition-colors hover:bg-amber-100"
            >
              <X className="size-4" />
            </button>
          </div>
        )}
        <Outlet />
      </main>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

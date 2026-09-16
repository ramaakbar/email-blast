import { useCallback, useState } from "react";
import { CheckCircle2, Download, ExternalLink, Loader2, X } from "lucide-react";
import { m } from "@paraglide/messages";
import { Button } from "@/components/ui/button";
import type { UpdateDismissPayload, UpdateState } from "../../../shared/ipc";

/**
 * The app shell's update strip (ticket 21, ADR-0011). One banner at a time,
 * in the slot under the launch banner and with the same shape (a full-width
 * strip above the screen), so the two never cover each other:
 *
 * - the one-time `whatsNew` notice wins when set - the profile just moved to
 *   a new version, which on macOS only happens by hand, so the change has to
 *   be visible;
 * - otherwise `available` / `downloading` / `ready` drive one banner that
 *   walks the user through the update.
 *
 * Platform split: `canSelfInstall` is true on Windows, where the app
 * downloads and installs the update itself; an unsigned macOS bundle can
 * never satisfy Squirrel.Mac, so there the banner only offers the release
 * page and says the app has to be replaced by hand.
 *
 * Dismissal is the main process's bookkeeping, not local state: it resets
 * the status, so a later check (or a newer version) brings the banner back.
 */

/** Sky while something is in flight, emerald once only a confirmation is left. */
const TONES = {
  sky: {
    strip: "bg-sky-50",
    title: "text-sky-900",
    icon: "text-sky-700",
    dismissHover: "hover:bg-sky-100",
  },
  emerald: {
    strip: "bg-emerald-50",
    title: "text-emerald-900",
    icon: "text-emerald-700",
    dismissHover: "hover:bg-emerald-100",
  },
} as const;

/** The banner's headline, keyed by the state it is showing. */
function bannerTitle(state: UpdateState): string {
  if (state.whatsNew !== null) return m["update.updatedTo"]({ version: state.whatsNew });
  // The available version names the update; the running one is the only
  // version a `ready` state has left to show.
  const version = state.availableVersion ?? state.currentVersion;
  switch (state.status) {
    case "available":
      return m["update.available"]({ version });
    case "downloading":
      return m["update.downloading"]({ version, progress: Math.round(state.progress ?? 0) });
    default:
      return m["update.ready"]({ version });
  }
}

export function UpdateBanner({
  state,
  onState,
}: {
  state: UpdateState;
  onState: (next: UpdateState) => void;
}) {
  const [busy, setBusy] = useState<"download" | "install" | null>(null);

  // Adopts the state the main process recorded, so a failure it already
  // described (the frozen `error` field is localized there) reaches the
  // banner without a second wording for the same failure here.
  const refresh = useCallback((): void => {
    window.api.update
      .getState()
      .then(onState)
      .catch(() => {});
  }, [onState]);

  const dismiss = useCallback(
    (what: UpdateDismissPayload): void => {
      window.api.update
        .dismiss(what)
        .then(onState)
        .catch(() => {});
    },
    [onState],
  );

  const download = useCallback((): void => {
    setBusy("download");
    window.api.update
      .download()
      .then(onState)
      // A failed download leaves its reason in the main process's state -
      // re-reading it keeps that the only wording for it.
      .catch(() => refresh())
      .finally(() => setBusy(null));
  }, [onState, refresh]);

  // `install` reports through the state, never by rejecting: success quits
  // the app, and a refusal (a send job is running - ADR-0011, the ticket-17
  // quit guard would otherwise fight the installer and strand the job)
  // arrives as a pushed state whose `error` this banner renders.
  const install = useCallback((): void => {
    setBusy("install");
    window.api.update
      .install()
      .catch(() => refresh())
      .finally(() => setBusy(null));
  }, [refresh]);

  const whatsNew = state.whatsNew;
  const status = state.status;
  // The what's-new notice is the one-time event; the rest share a banner.
  const showUpdate =
    whatsNew === null && (status === "available" || status === "downloading" || status === "ready");
  if (whatsNew === null && !showUpdate) return null;

  const tone = TONES[status === "ready" && whatsNew === null ? "emerald" : "sky"];

  return (
    <div
      role="status"
      className={`flex items-start gap-3 border-b px-6 py-3 text-sm ${tone.strip}`}
    >
      {status === "downloading" ? (
        <Loader2 className={`mt-0.5 size-4 shrink-0 animate-spin ${tone.icon}`} />
      ) : status === "available" && whatsNew === null ? (
        <Download className={`mt-0.5 size-4 shrink-0 ${tone.icon}`} />
      ) : (
        <CheckCircle2 className={`mt-0.5 size-4 shrink-0 ${tone.icon}`} />
      )}
      <div className="min-w-0 flex-1">
        <p className={`font-medium ${tone.title}`}>{bannerTitle(state)}</p>
        {status === "downloading" && whatsNew === null && (
          <div className="mt-1.5 h-1 w-full max-w-md overflow-hidden rounded-full bg-sky-200">
            <div
              className="h-1 rounded-full bg-sky-600 transition-[width]"
              style={{ width: `${state.progress ?? 0}%` }}
            />
          </div>
        )}
        {status === "available" && whatsNew === null && !state.canSelfInstall && (
          <p className="mt-1 text-muted-foreground">{m["update.replaceManually"]()}</p>
        )}
        {state.error !== null && <p className="mt-1 text-destructive">{state.error}</p>}
      </div>
      {whatsNew === null && status === "available" && state.canSelfInstall && (
        <Button size="sm" disabled={busy !== null} onClick={download}>
          {busy === "download" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Download className="size-4" />
          )}
          {m["update.download"]()}
        </Button>
      )}
      {whatsNew === null && status === "available" && !state.canSelfInstall && (
        <Button
          size="sm"
          disabled={busy !== null}
          onClick={() => {
            window.api.update.openRelease().catch(() => refresh());
          }}
        >
          <ExternalLink className="size-4" /> {m["update.openReleasePage"]()}
        </Button>
      )}
      {whatsNew === null && status === "ready" && (
        <Button size="sm" disabled={busy !== null} onClick={install}>
          {busy === "install" && <Loader2 className="size-4 animate-spin" />}
          {m["update.restartAndInstall"]()}
        </Button>
      )}
      {/* Dismissing is the not-yet-downloaded nag only: the main process
          treats it as a no-op once a download is done or running (that
          update must stay installable), so the strip offers no X there
          rather than a button that would do nothing. */}
      {(whatsNew !== null || status === "available") && (
        <button
          type="button"
          aria-label={m["common.dismiss"]()}
          onClick={() => dismiss(whatsNew !== null ? "whatsNew" : "available")}
          className={`rounded p-1 transition-colors ${tone.icon} ${tone.dismissHover}`}
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

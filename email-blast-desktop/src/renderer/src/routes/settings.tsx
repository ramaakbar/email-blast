import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, FolderOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_RATE_LIMIT_DELAY_MS,
  RATE_LIMIT_MAX_MS,
  RATE_LIMIT_MIN_MS,
  RATE_LIMIT_STEP_MS,
  SETTING_KEYS,
  type SettingKey,
} from "../../../shared/settings";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

/** "1000" -> "1 email per second", "500" -> "2 emails per second". */
function rateLabel(ms: number): string {
  const rate = Math.round((1000 / ms) * 10) / 10;
  const text = Number.isInteger(rate) ? String(rate) : rate.toFixed(1);
  return `${text} ${rate === 1 ? "email" : "emails"} per second`;
}

function SettingsPage() {
  const [rateMs, setRateMs] = useState<number | null>(null);
  const [templatesDir, setTemplatesDir] = useState<string | null>(null);
  const [outputDir, setOutputDir] = useState<string | null>(null);
  const [appInfo, setAppInfo] = useState<{ name: string; version: string } | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const [rate, templates, output, info] = await Promise.all([
          window.api.settings.get(SETTING_KEYS.rateLimitDelayMs),
          window.api.settings.get(SETTING_KEYS.templatesDir),
          window.api.settings.get(SETTING_KEYS.outputDir),
          window.api.system.getAppInfo(),
        ]);
        if (cancelled) return;
        setRateMs(rate === null ? DEFAULT_RATE_LIMIT_DELAY_MS : Number(rate));
        setTemplatesDir(templates);
        setOutputDir(output);
        setAppInfo(info);
      } catch {
        if (!cancelled) setError("Could not load settings.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Clear any pending writes on unmount.
  useEffect(
    () => () => {
      if (rateTimer.current !== null) clearTimeout(rateTimer.current);
    },
    [],
  );

  const flashSaved = useCallback(() => {
    setSaved(true);
    if (savedTimer.current !== null) clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setSaved(false), 1500);
  }, []);

  const persist = useCallback(
    async (key: SettingKey, value: string) => {
      try {
        await window.api.settings.set(key, value);
        setError(null);
        flashSaved();
      } catch {
        setError(`Could not save ${key}.`);
      }
    },
    [flashSaved],
  );

  const commitRate = useCallback(
    (ms: number) => {
      void persist(SETTING_KEYS.rateLimitDelayMs, String(ms));
    },
    [persist],
  );

  // Dragging or holding an arrow key fires many change events; write at most
  // once per pause, and flush immediately when the drag/click ends.
  const scheduleRateCommit = useCallback(
    (ms: number) => {
      if (rateTimer.current !== null) clearTimeout(rateTimer.current);
      rateTimer.current = setTimeout(() => commitRate(ms), 400);
    },
    [commitRate],
  );

  const flushRate = useCallback(
    (ms: number) => {
      if (rateTimer.current !== null) {
        clearTimeout(rateTimer.current);
        rateTimer.current = null;
      }
      commitRate(ms);
    },
    [commitRate],
  );

  const pickAndSetDir = useCallback(
    async (key: SettingKey, setDir: (dir: string) => void) => {
      const dir = await window.api.system.pickFolder();
      if (dir === null) return;
      setDir(dir);
      await persist(key, dir);
    },
    [persist],
  );

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Sending rate, default folders, and app information.
          </p>
        </div>
        {saved && (
          <span className="flex items-center gap-1 text-sm text-emerald-600">
            <CheckCircle2 className="size-4" /> Saved
          </span>
        )}
        {error !== null && <span className="text-sm text-destructive">{error}</span>}
      </header>

      {rateMs === null || templatesDir === null || outputDir === null ? (
        <div className="flex items-center gap-2 py-16 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> Loading settings…
        </div>
      ) : (
        <>
          <section>
            <h2 className="text-sm font-semibold">Rate limiting</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              The delay between each email while a send job runs.
            </p>
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-sm font-medium">{rateMs} ms per email</span>
                <span className="text-sm text-muted-foreground">{rateLabel(rateMs)}</span>
              </div>
              <input
                type="range"
                min={RATE_LIMIT_MIN_MS}
                max={RATE_LIMIT_MAX_MS}
                step={RATE_LIMIT_STEP_MS}
                value={rateMs}
                aria-label="Delay between emails"
                onChange={(event) => {
                  const ms = Number(event.target.value);
                  setRateMs(ms);
                  scheduleRateCommit(ms);
                }}
                onPointerUp={(event) => flushRate(Number((event.target as HTMLInputElement).value))}
                className="w-full accent-foreground"
              />
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold">Default folders</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Where templates live and where generated PDFs are written. The app creates them when
              missing.
            </p>
            <div className="space-y-3">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">
                  Templates folder
                </span>
                <span className="flex gap-2">
                  <input
                    readOnly
                    value={templatesDir}
                    className="h-9 flex-1 rounded-md border bg-background px-3 font-mono text-xs text-muted-foreground outline-none"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => void pickAndSetDir(SETTING_KEYS.templatesDir, setTemplatesDir)}
                  >
                    <FolderOpen className="size-4" /> Browse…
                  </Button>
                </span>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">
                  Output folder
                </span>
                <span className="flex gap-2">
                  <input
                    readOnly
                    value={outputDir}
                    className="h-9 flex-1 rounded-md border bg-background px-3 font-mono text-xs text-muted-foreground outline-none"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => void pickAndSetDir(SETTING_KEYS.outputDir, setOutputDir)}
                  >
                    <FolderOpen className="size-4" /> Browse…
                  </Button>
                </span>
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold">About</h2>
            <dl className="rounded-lg border p-4 text-sm">
              <div className="flex justify-between py-1">
                <dt className="text-muted-foreground">App</dt>
                <dd className="font-medium">{appInfo?.name ?? "…"}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-muted-foreground">Version</dt>
                <dd className="font-medium">{appInfo?.version ?? "…"}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-muted-foreground">Data</dt>
                <dd className="font-medium">Stored locally on this machine</dd>
              </div>
            </dl>
          </section>
        </>
      )}
    </div>
  );
}

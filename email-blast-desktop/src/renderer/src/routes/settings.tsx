import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  CheckCircle2,
  FolderOpen,
  Languages,
  Loader2,
  Mail,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { m } from "@paraglide/messages";
import { ErrorBanner } from "@/components/error-banner";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import { applyLocale, useLocale } from "@/lib/locale";
import {
  DEFAULT_RATE_LIMIT_DELAY_MS,
  RATE_LIMIT_MAX_MS,
  RATE_LIMIT_MIN_MS,
  RATE_LIMIT_STEP_MS,
  SETTING_KEYS,
  UI_LOCALES,
  type SettingKey,
  type UiLocale,
} from "../../../shared/settings";
import { normalizeIdentity } from "../../../shared/sender-identity";
import { validateSmtpProfile } from "../../../shared/smtp-validation";
import type { SmtpProfile } from "../../../shared/ipc";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

/** The catalog names the language options by their own names. */
const LOCALE_LABELS: Record<UiLocale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
};

/** "1000" -> "1 email per second", "500" -> "2 emails per second". */
function rateLabel(ms: number): string {
  const rate = Math.round((1000 / ms) * 10) / 10;
  return rate === 1
    ? m["settingsPage.ratePerSecondOne"]({ rate })
    : m["settingsPage.ratePerSecondOther"]({ rate });
}

function SettingsPage() {
  const [rateMs, setRateMs] = useState<number | null>(null);
  const [templatesDir, setTemplatesDir] = useState<string | null>(null);
  const [outputDir, setOutputDir] = useState<string | null>(null);
  const [appInfo, setAppInfo] = useState<{ name: string; version: string } | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
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
        if (!cancelled) setError(m["settingsPage.couldNotLoad"]());
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
        setError(m["common.couldNotSave"]({ key }));
      }
    },
    [flashSaved],
  );

  /** Applies the language immediately and persists the choice (ADR-0004). */
  const changeLanguage = useCallback(
    async (next: UiLocale) => {
      applyLocale(next);
      try {
        await window.api.settings.set(SETTING_KEYS.language, next);
        setError(null);
        flashSaved();
      } catch {
        setError(m["common.couldNotSave"]({ key: SETTING_KEYS.language }));
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
          <h1 className="text-2xl font-semibold">{m["settingsPage.title"]()}</h1>
          <p className="text-sm text-muted-foreground">{m["settingsPage.description"]()}</p>
        </div>
        {saved && (
          <span className="flex items-center gap-1 text-sm text-emerald-600">
            <CheckCircle2 className="size-4" /> {m["common.saved"]()}
          </span>
        )}
        {error !== null && <span className="text-sm text-destructive">{error}</span>}
      </header>

      {rateMs === null || templatesDir === null || outputDir === null ? (
        <div className="flex items-center gap-2 py-16 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> {m["common.loading"]()}
        </div>
      ) : (
        <>
          <SmtpProfilesSection />

          <section>
            <h2 className="text-sm font-semibold">{m["settingsPage.rateLimiting"]()}</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              {m["settingsPage.rateLimitingDescription"]()}
            </p>
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-baseline justify-between">
                <span className="text-sm font-medium">
                  {m["settingsPage.msPerEmail"]({ ms: rateMs })}
                </span>
                <span className="text-sm text-muted-foreground">{rateLabel(rateMs)}</span>
              </div>
              <input
                type="range"
                min={RATE_LIMIT_MIN_MS}
                max={RATE_LIMIT_MAX_MS}
                step={RATE_LIMIT_STEP_MS}
                value={rateMs}
                aria-label={m["settingsPage.delayBetweenEmails"]()}
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
            <h2 className="text-sm font-semibold">{m["settingsPage.language"]()}</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              {m["settingsPage.languageDescription"]()}
            </p>
            <div className="flex gap-2 rounded-lg border p-4">
              <Languages className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              {UI_LOCALES.map((option) => (
                <Button
                  key={option}
                  type="button"
                  variant={locale === option ? "default" : "outline"}
                  onClick={() => void changeLanguage(option)}
                >
                  {LOCALE_LABELS[option]}
                </Button>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold">{m["settingsPage.defaultFolders"]()}</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              {m["settingsPage.defaultFoldersDescription"]()}
            </p>
            <div className="space-y-3">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">
                  {m["settingsPage.templatesFolder"]()}
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
                    <FolderOpen className="size-4" /> {m["common.browse"]()}
                  </Button>
                </span>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">
                  {m["settingsPage.outputFolder"]()}
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
                    <FolderOpen className="size-4" /> {m["common.browse"]()}
                  </Button>
                </span>
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold">{m["settingsPage.about"]()}</h2>
            <dl className="rounded-lg border p-4 text-sm">
              <div className="flex justify-between py-1">
                <dt className="text-muted-foreground">{m["settingsPage.app"]()}</dt>
                <dd className="font-medium">{appInfo?.name ?? "…"}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-muted-foreground">{m["settingsPage.version"]()}</dt>
                <dd className="font-medium">{appInfo?.version ?? "…"}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-muted-foreground">{m["settingsPage.data"]()}</dt>
                <dd className="font-medium">{m["settingsPage.storedLocally"]()}</dd>
              </div>
            </dl>
          </section>
        </>
      )}
    </div>
  );
}

/**
 * The result of the last per-profile connection test, keyed by profile id.
 * One test runs at a time; a fresh test replaces the previous result.
 */
type ProfileTestState =
  | { kind: "idle" }
  | { kind: "testing"; profileId: string }
  | { kind: "ok"; profileId: string }
  | { kind: "error"; profileId: string; message: string };

/** The profile form, shared by the create and edit dialogs. */
type ProfileFormState = { kind: "create" } | { kind: "edit"; profile: SmtpProfile };

function SmtpProfilesSection() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<ProfileFormState | null>(null);
  const [confirmProfile, setConfirmProfile] = useState<SmtpProfile | null>(null);
  const [testState, setTestState] = useState<ProfileTestState>({ kind: "idle" });
  const [loadError, setLoadError] = useState<string | null>(null);

  const listQuery = useQuery({
    queryKey: ["smtp", "profiles"],
    queryFn: () => window.api.smtp.list(),
  });

  const createMutation = useMutation({
    mutationFn: (payload: Parameters<typeof window.api.smtp.create>[0]) =>
      window.api.smtp.create(payload),
    onSuccess: (created) => {
      toast.success(m["smtp.profileSaved"]({ name: created.name }));
      setLoadError(null);
      setForm(null);
      void queryClient.invalidateQueries({ queryKey: ["smtp", "profiles"] });
    },
    onError: (err) => {
      setLoadError(errorMessage(err, m["smtp.couldNotSaveProfile"]()));
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: Parameters<typeof window.api.smtp.update>[0]) =>
      window.api.smtp.update(payload),
    onSuccess: (updated) => {
      toast.success(m["smtp.profileSaved"]({ name: updated.name }));
      setLoadError(null);
      setForm(null);
      void queryClient.invalidateQueries({ queryKey: ["smtp", "profiles"] });
    },
    onError: (err) => {
      setLoadError(errorMessage(err, m["smtp.couldNotSaveProfile"]()));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => window.api.smtp.delete(id),
    onSuccess: () => {
      toast.success(m["smtp.profileDeleted"]());
      setLoadError(null);
      setConfirmProfile(null);
      void queryClient.invalidateQueries({ queryKey: ["smtp", "profiles"] });
    },
    onError: (err) => {
      setConfirmProfile(null);
      setLoadError(errorMessage(err, m["smtp.couldNotDeleteProfile"]()));
    },
  });

  const testMutation = useMutation({
    mutationFn: (profileId: string) => window.api.smtp.testProfile(profileId),
    onSuccess: (_result, profileId) => {
      setTestState({ kind: "ok", profileId });
      toast.success(m["smtp.connectionOk"]());
    },
    onError: (err, profileId) => {
      setTestState({ kind: "error", profileId, message: errorMessage(err, m["smtp.connectionFailed"]()) });
    },
  });

  const saving = createMutation.isPending || updateMutation.isPending;
  const deleting = deleteMutation.isPending;

  // Escape closes whichever overlay is open: the form, then the confirm
  // dialog. While a mutation is in flight the overlay is not dismissible -
  // the operation would still commit, so a "cancel" would lie.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (form !== null) {
        if (!saving) setForm(null);
      } else if (confirmProfile !== null && !deleting) {
        setConfirmProfile(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [form, confirmProfile, saving, deleting]);

  const runTest = (profile: SmtpProfile) => {
    if (testMutation.isPending) return;
    setTestState({ kind: "testing", profileId: profile.id });
    testMutation.mutate(profile.id);
  };

  const profiles = listQuery.data ?? [];

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold">{m["smtp.title"]()}</h2>
          <p className="text-xs text-muted-foreground">{m["smtp.description"]()}</p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setLoadError(null);
            setForm({ kind: "create" });
          }}
        >
          <Plus className="size-4" /> {m["smtp.addProfile"]()}
        </Button>
      </div>

      {loadError !== null && (
        <div className="mb-3">
          <ErrorBanner message={loadError} onDismiss={() => setLoadError(null)} />
        </div>
      )}

      {listQuery.isError && (
        <ErrorBanner message={errorMessage(listQuery.error, m["smtp.couldNotLoadProfiles"]())} />
      )}

      {listQuery.isLoading && (
        <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> {m["smtp.loadingProfiles"]()}
        </div>
      )}

      {!listQuery.isLoading && !listQuery.isError && profiles.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-8 text-center">
          <Mail className="size-8 text-muted-foreground" />
          <p className="text-sm font-medium">{m["smtp.noProfilesYet"]()}</p>
          <p className="max-w-sm text-xs text-muted-foreground">{m["smtp.noProfilesDescription"]()}</p>
          <Button
            size="sm"
            className="mt-1"
            onClick={() => {
              setLoadError(null);
              setForm({ kind: "create" });
            }}
          >
            <Plus className="size-4" /> {m["smtp.addProfile"]()}
          </Button>
        </div>
      )}

      {!listQuery.isLoading && !listQuery.isError && profiles.length > 0 && (
        <div className="space-y-3">
          {profiles.map((profile) => {
            const rowTest = testState;
            return (
              <div key={profile.id} className="rounded-lg border bg-card px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="truncate font-medium">{profile.name}</span>
                      <span className="shrink-0 font-mono text-xs text-muted-foreground">
                        {profile.host}:{profile.port}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {profile.username} · {m["smtp.passwordLabel"]()}{" "}
                      {profile.hasPassword ? (
                        <span className="tracking-widest">••••••••</span>
                      ) : (
                        m["smtp.passwordNotSet"]()
                      )}
                    </p>
                    {profile.senderAddress !== null && (
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {[profile.senderName ?? "", `<${profile.senderAddress}>`, profile.replyTo]
                          .filter((part) => part !== "")
                          .join(" · ")}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {rowTest.kind === "testing" && rowTest.profileId === profile.id ? (
                      <Button size="sm" variant="outline" disabled>
                        <Loader2 className="size-4 animate-spin" /> {m["common.testing"]()}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => runTest(profile)}
                        disabled={testMutation.isPending}
                      >
                        <CheckCircle2 className="size-4" /> {m["smtp.testConnection"]()}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setLoadError(null);
                        setForm({ kind: "edit", profile });
                      }}
                    >
                      <Pencil className="size-4" /> {m["templates.edit"]()}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setConfirmProfile(profile)}>
                      <Trash2 className="size-4" /> {m["common.delete"]()}
                    </Button>
                  </div>
                </div>
                {rowTest.kind === "ok" && rowTest.profileId === profile.id && (
                  <p className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                    <CheckCircle2 className="size-3.5" /> {m["smtp.connected"]()}
                  </p>
                )}
                {rowTest.kind === "error" && rowTest.profileId === profile.id && (
                  <p className="mt-2 flex items-start gap-1 text-xs text-destructive">
                    <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                    <span>{rowTest.message}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {form !== null && (
        <ProfileFormDialog
          form={form}
          saving={saving}
          saveError={loadError}
          onCancel={() => setForm(null)}
          onSave={(fields) => {
            if (fields.kind === "create") {
              createMutation.mutate(fields);
            } else {
              updateMutation.mutate(fields);
            }
          }}
        />
      )}

      {confirmProfile !== null && (
        <ConfirmDeleteProfileDialog
          name={confirmProfile.name}
          pending={deleteMutation.isPending}
          onCancel={() => setConfirmProfile(null)}
          onConfirm={() => deleteMutation.mutate(confirmProfile.id)}
        />
      )}
    </section>
  );
}

/**
 * The create/edit profile form. Port 465 gets implicit TLS, everything
 * else STARTTLS when the server offers it, so the form only asks for the
 * four fields the user knows.
 */
function ProfileFormDialog({
  form,
  saving,
  saveError,
  onCancel,
  onSave,
}: {
  form: ProfileFormState;
  saving: boolean;
  /**
   * The last save attempt's rejection. The section's error banner sits
   * behind this dialog's backdrop, so a failed save is shown here, inline,
   * where the user is actually looking.
   */
  saveError: string | null;
  onCancel: () => void;
  /**
   * The fields with the password already resolved per mode: create always
   * submits a string, edit submits null for "keep the stored password".
   * The identity fields submit null for blank, mirroring how they are
   * stored ("not set" - the send step then keeps the typed identity).
   * The `kind` discriminant lets the section narrow without guessing.
   */
  onSave: (
    fields:
      | {
          kind: "create";
          name: string;
          host: string;
          port: number;
          username: string;
          password: string;
          senderName: string | null;
          senderAddress: string | null;
          replyTo: string | null;
        }
      | {
          kind: "edit";
          id: string;
          name: string;
          host: string;
          port: number;
          username: string;
          password: string | null;
          senderName: string | null;
          senderAddress: string | null;
          replyTo: string | null;
        },
  ) => void;
}) {
  const [name, setName] = useState(form.kind === "create" ? "" : form.profile.name);
  const [host, setHost] = useState(form.kind === "create" ? "" : form.profile.host);
  const [port, setPort] = useState(form.kind === "create" ? 587 : form.profile.port);
  const [username, setUsername] = useState(form.kind === "create" ? "" : form.profile.username);
  // The stored password never reaches the renderer: the edit dialog starts
  // blank and a blank field means "keep the stored password".
  const [passwordInput, setPasswordInput] = useState("");
  // The profile's default Sender Identity (ticket 01): visible to the
  // dialog, so edit starts from the stored values and blank means "unset".
  const [senderName, setSenderName] = useState(
    form.kind === "create" ? "" : (form.profile.senderName ?? ""),
  );
  const [senderAddress, setSenderAddress] = useState(
    form.kind === "create" ? "" : (form.profile.senderAddress ?? ""),
  );
  const [replyTo, setReplyTo] = useState(form.kind === "create" ? "" : (form.profile.replyTo ?? ""));
  const isCreate = form.kind === "create";
  const password = isCreate ? passwordInput : passwordInput === "" ? null : passwordInput;

  const error = validateSmtpProfile({ name, host, port, username, password });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      // Backdrop dismissal is disabled while a save is in flight - the
      // operation would still commit, so a "cancel" would lie.
      onMouseDown={saving ? undefined : onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="smtp-form-title"
        className="flex max-h-[85vh] w-full max-w-md flex-col rounded-lg border bg-card shadow-lg"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-3 border-b px-6 py-4">
          <div>
            <h2 id="smtp-form-title" className="text-lg font-semibold">
              {isCreate ? m["smtp.addProfileTitle"]() : m["smtp.editProfileTitle"]({ name: form.profile.name })}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {isCreate ? m["smtp.createHint"]() : m["smtp.editHint"]()}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel} aria-label={m["common.cancel"]()}>
            <X className="size-4" />
          </Button>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              {m["smtp.profileName"]()}
            </span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Gmail utama"
              className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              {m["smtp.smtpHost"]()}
            </span>
            <input
              type="text"
              value={host}
              onChange={(event) => setHost(event.target.value)}
              placeholder="e.g. smtp.gmail.com"
              className="h-9 w-full rounded-md border bg-background px-3 font-mono text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              {m["smtp.port"]()}
            </span>
            <input
              type="number"
              min={1}
              max={65535}
              value={port}
              onChange={(event) => setPort(Number(event.target.value))}
              className="h-9 w-32 rounded-md border bg-background px-3 font-mono text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            />
            <span className="ml-2 text-xs text-muted-foreground">
              {port === 465 ? m["smtp.implicitTls"]() : m["smtp.starttls"]()}
            </span>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              {m["smtp.username"]()}
            </span>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="e.g. akbar@example.com"
              className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              {m["smtp.appPassword"]()}
            </span>
            <input
              type="password"
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
              placeholder={isCreate ? "e.g. abcd efgh ijkl mnop" : m["smtp.leaveBlankToKeep"]()}
              autoComplete="new-password"
              className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            />
            <span className="mt-1 block text-xs text-muted-foreground">
              {m["smtp.gmailAppPasswordHint"]()}
            </span>
          </label>

          <div className="border-t pt-4">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                {m["smtp.defaultSenderName"]()}
              </span>
              <input
                type="text"
                value={senderName}
                onChange={(event) => setSenderName(event.target.value)}
                placeholder="e.g. Yayasan X"
                className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              />
            </label>

            <label className="mt-3 block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                {m["smtp.defaultSenderAddress"]()}
              </span>
              <input
                type="email"
                value={senderAddress}
                onChange={(event) => setSenderAddress(event.target.value)}
                placeholder="e.g. iym@example.org"
                className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              />
            </label>

            <label className="mt-3 block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                {m["smtp.replyTo"]()}
              </span>
              <input
                type="email"
                value={replyTo}
                onChange={(event) => setReplyTo(event.target.value)}
                placeholder="e.g. sekretariat@example.org"
                className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              />
            </label>
            <p className="mt-2 text-xs text-muted-foreground">{m["smtp.identityHint"]()}</p>
          </div>

          {error !== null && <span className="block text-xs text-destructive">{error}</span>}
        </div>

        {saveError !== null && (
          <div className="flex items-start gap-2 border-t px-6 py-3 text-xs text-destructive">
            <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
            <span>{saveError}</span>
          </div>
        )}

        <footer className="flex items-center justify-end gap-2 border-t px-6 py-4">
          <Button variant="outline" onClick={onCancel} disabled={saving}>
            {m["common.cancel"]()}
          </Button>
          <Button
            disabled={error !== null || saving}
            title={error ?? undefined}
            onClick={() =>
              onSave(
                form.kind === "create"
                  ? {
                      kind: "create",
                      name,
                      host,
                      port,
                      username,
                      password: passwordInput,
                      senderName: normalizeIdentity(senderName),
                      senderAddress: normalizeIdentity(senderAddress),
                      replyTo: normalizeIdentity(replyTo),
                    }
                  : {
                      kind: "edit",
                      id: form.profile.id,
                      name,
                      host,
                      port,
                      username,
                      password: passwordInput === "" ? null : passwordInput,
                      senderName: normalizeIdentity(senderName),
                      senderAddress: normalizeIdentity(senderAddress),
                      replyTo: normalizeIdentity(replyTo),
                    },
              )
            }
          >
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" /> {m["common.saving"]()}
              </>
            ) : isCreate ? (
              m["smtp.saveProfile"]()
            ) : (
              m["smtp.saveChanges"]()
            )}
          </Button>
        </footer>
      </div>
    </div>
  );
}

function ConfirmDeleteProfileDialog({
  name,
  pending,
  onCancel,
  onConfirm,
}: {
  name: string;
  pending: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      // Same in-flight guard as the form: the delete commits even if the
      // overlay disappears, so it stays until the mutation settles.
      onMouseDown={pending ? undefined : onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-profile-title"
        className="w-full max-w-sm rounded-lg border bg-card p-6 shadow-lg"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-delete-profile-title" className="text-lg font-semibold">
          {m["smtp.deleteProfileTitle"]({ name })}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{m["smtp.deleteProfileDescription"]()}</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={pending}>
            {m["common.cancel"]()}
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={pending} autoFocus>
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> {m["common.deleting"]()}
              </>
            ) : (
              m["common.delete"]()
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

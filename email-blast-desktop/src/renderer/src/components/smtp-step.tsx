import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Check, Loader2, Plug } from "lucide-react";
import { m } from "@paraglide/messages";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import { normalizeIdentity, senderIdentityWarning } from "../../../shared/sender-identity";
import {
  DEFAULT_RATE_LIMIT_DELAY_MS,
  RATE_LIMIT_MAX_MS,
  RATE_LIMIT_MIN_MS,
  RATE_LIMIT_STEP_MS,
  SETTING_KEYS,
} from "../../../shared/settings";

/**
 * The SMTP step shared by the compose wizard's step 4 and the Send
 * workspace (ticket 06): the saved-profile / inline connection pick with
 * a live Test Connection, the Sender Identity (prefilled from the chosen
 * profile's defaults, ticket 01, still editable per job), and the sending
 * rate slider.
 */

/** The SMTP identity + sender fields the step carries. */
export interface SmtpFormState {
  mode: "profile" | "inline";
  profileId: string | null;
  host: string;
  port: string;
  username: string;
  password: string;
  saveAsProfile: boolean;
  profileName: string;
  senderName: string;
  senderAddress: string;
  /** The per-job Reply-To (ticket 01); blank sends no Reply-To header. */
  replyTo: string;
  delayMs: number;
}

export const INITIAL_SMTP: SmtpFormState = {
  mode: "profile",
  profileId: null,
  host: "",
  port: "587",
  username: "",
  password: "",
  saveAsProfile: false,
  profileName: "",
  senderName: "",
  senderAddress: "",
  replyTo: "",
  delayMs: DEFAULT_RATE_LIMIT_DELAY_MS,
};

/** The step's validity gate: a sender plus exactly one SMTP identity. */
export function smtpFormValid(config: SmtpFormState): boolean {
  return (
    config.senderName.trim() !== "" &&
    config.senderAddress.trim() !== "" &&
    (config.mode === "profile"
      ? config.profileId !== null
      : config.host.trim() !== "" &&
        Number.isInteger(Number(config.port)) &&
        Number(config.port) > 0 &&
        Number(config.port) < 65536 &&
        config.username.trim() !== "" &&
        config.password !== "")
  );
}

export function SmtpStep({
  config,
  onChange,
}: {
  config: SmtpFormState;
  onChange: (next: SmtpFormState) => void;
}) {
  const profilesQuery = useQuery({
    queryKey: ["smtp", "list"],
    queryFn: () => window.api.smtp.list(),
  });
  const profiles = profilesQuery.data ?? [];
  const profile = profiles.find((p) => p.id === config.profileId) ?? null;

  const [testState, setTestState] = useState<
    { kind: "idle" } | { kind: "testing" } | { kind: "ok" } | { kind: "error"; message: string }
  >({ kind: "idle" });
  const [saveError, setSaveError] = useState<string | null>(null);
  const rateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // The stored rate limit is loaded once by the host page; the slider
  // writes it back live here.

  // Changing the connection details invalidates a previous test result -
  // "Connected" must never refer to credentials the form no longer holds.
  const updateConnection = (patch: Partial<SmtpFormState>): void => {
    setTestState({ kind: "idle" });
    onChange({ ...config, ...patch });
  };

  useEffect(
    () => () => {
      if (rateTimer.current !== null) clearTimeout(rateTimer.current);
    },
    [],
  );

  const commitRate = (ms: number): void => {
    if (rateTimer.current !== null) clearTimeout(rateTimer.current);
    rateTimer.current = setTimeout(() => {
      void window.api.settings.set(SETTING_KEYS.rateLimitDelayMs, String(ms));
    }, 400);
  };

  const testConnection = async (): Promise<void> => {
    setTestState({ kind: "testing" });
    try {
      if (config.mode === "profile" && config.profileId !== null) {
        await window.api.smtp.testProfile(config.profileId);
      } else {
        await window.api.smtp.test({
          host: config.host,
          port: Number(config.port),
          username: config.username,
          password: config.password,
        });
      }
      setTestState({ kind: "ok" });
    } catch (error) {
      setTestState({
        kind: "error",
        message: errorMessage(error, m["compose.connectionFailed"]()),
      });
    }
  };

  const saveProfile = async (): Promise<void> => {
    setSaveError(null);
    try {
      const created = await window.api.smtp.create({
        name: config.profileName,
        host: config.host,
        port: Number(config.port),
        username: config.username,
        password: config.password,
        // The typed identity becomes the profile's default (ticket 01) -
        // blank stays unset, so a saved one-off connection keeps working
        // exactly as before.
        senderName: normalizeIdentity(config.senderName),
        senderAddress: normalizeIdentity(config.senderAddress),
        replyTo: normalizeIdentity(config.replyTo),
      });
      onChange({
        ...config,
        mode: "profile",
        profileId: created.id,
        saveAsProfile: false,
        profileName: "",
      });
    } catch (error) {
      setSaveError(errorMessage(error, m["smtp.couldNotSaveProfile"]()));
    }
  };

  const inputClass =
    "h-9 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

  // The soft, advisory-only From warning (ticket 01): comparing the
  // per-job From against the connection's account domain (known providers)
  // or the profile's default identity. It never gates the send - the
  // host's validity gate stays driven by `smtpFormValid` alone.
  const effectiveConnection =
    config.mode === "profile" && profile !== null
      ? { host: profile.host, username: profile.username }
      : { host: config.host, username: config.username };
  const identityWarning = senderIdentityWarning({
    host: effectiveConnection.host,
    username: effectiveConnection.username,
    senderAddress: config.senderAddress,
    profileSenderAddress: config.mode === "profile" ? (profile?.senderAddress ?? null) : null,
  });

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {m["compose.emailConnection"]()}
        </h3>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => updateConnection({ mode: "profile" })}
            className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
              config.mode === "profile" ? "border-primary bg-primary/5" : "hover:bg-muted"
            }`}
          >
            {m["compose.savedProfile"]()}
          </button>
          <button
            type="button"
            onClick={() => updateConnection({ mode: "inline" })}
            className={`flex-1 rounded-md border px-3 py-2 text-sm font-medium ${
              config.mode === "inline" ? "border-primary bg-primary/5" : "hover:bg-muted"
            }`}
          >
            {m["compose.enterDetails"]()}
          </button>
        </div>

        {config.mode === "profile" ? (
          <div className="mt-3 space-y-3">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                {m["compose.savedProfile"]()}
              </span>
              <select
                value={config.profileId ?? ""}
                onChange={(event) => {
                  setTestState({ kind: "idle" });
                  const nextId = event.target.value === "" ? null : event.target.value;
                  const next = profiles.find((p) => p.id === nextId) ?? null;
                  // The identity always reflects the chosen profile
                  // (ticket 01): prefill its defaults, and clear the fields
                  // when the profile carries none - a stale identity from a
                  // previous profile must never ride along silently. Every
                  // prefilled field stays editable per job without ever
                  // mutating the profile.
                  onChange({
                    ...config,
                    profileId: nextId,
                    senderName: next?.senderName ?? "",
                    senderAddress: next?.senderAddress ?? "",
                    replyTo: next?.replyTo ?? "",
                  });
                }}
                className={inputClass}
              >
                <option value="">{m["compose.chooseProfile"]()}</option>
                {profiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} · {p.host}:{p.port}
                  </option>
                ))}
              </select>
            </label>
            {profiles.length === 0 && (
              <p className="text-xs text-muted-foreground">
                {m["compose.noSavedProfilesHint"]()}{" "}
                <Link to="/settings" className="text-primary underline underline-offset-2">
                  {m["compose.settingsLink"]()}
                </Link>
                .
              </p>
            )}
            {profile !== null && (
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Plug className="size-3.5" />
                {profile.username} · {profile.host}:{profile.port}
              </p>
            )}
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                {m["compose.host"]()}
              </span>
              <input
                type="text"
                value={config.host}
                onChange={(event) => onChange({ ...config, host: event.target.value })}
                placeholder="smtp.gmail.com"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                {m["compose.portLabel"]()}
              </span>
              <input
                type="number"
                value={config.port}
                onChange={(event) => onChange({ ...config, port: event.target.value })}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                {m["compose.usernameLabel"]()}
              </span>
              <input
                type="text"
                value={config.username}
                onChange={(event) => onChange({ ...config, username: event.target.value })}
                placeholder="you@gmail.com"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                {m["compose.appPasswordLabel"]()}
              </span>
              <input
                type="password"
                value={config.password}
                onChange={(event) => onChange({ ...config, password: event.target.value })}
                placeholder={m["compose.appPasswordPlaceholder"]()}
                className={inputClass}
              />
            </label>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={config.saveAsProfile}
                  onChange={(event) => onChange({ ...config, saveAsProfile: event.target.checked })}
                  className="size-4 accent-primary"
                />
                {m["compose.saveAsProfile"]()}
              </label>
              {config.saveAsProfile && (
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={config.profileName}
                    onChange={(event) => onChange({ ...config, profileName: event.target.value })}
                    placeholder={m["compose.profileNamePlaceholder"]()}
                    className={inputClass}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={config.profileName.trim() === ""}
                    onClick={() => void saveProfile()}
                  >
                    {m["common.save"]()}
                  </Button>
                </div>
              )}
              {saveError !== null && <p className="mt-2 text-xs text-red-700">{saveError}</p>}
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={
              testState.kind === "testing" ||
              (config.mode === "profile"
                ? config.profileId === null
                : config.host.trim() === "" ||
                  config.username.trim() === "" ||
                  config.password === "")
            }
            onClick={() => void testConnection()}
          >
            {testState.kind === "testing" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Plug className="size-4" />
            )}
            {m["compose.testConnectionButton"]()}
          </Button>
          {testState.kind === "ok" && (
            <p className="flex items-center gap-1.5 text-xs text-emerald-700">
              <Check className="size-4" /> {m["smtp.connected"]()}
            </p>
          )}
          {testState.kind === "error" && (
            <p className="flex items-center gap-1.5 text-xs text-red-700">{testState.message}</p>
          )}
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {m["compose.senderIdentity"]()}
        </h3>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              {m["compose.senderName"]()}
            </span>
            <input
              type="text"
              value={config.senderName}
              onChange={(event) => onChange({ ...config, senderName: event.target.value })}
              placeholder="Yayasan X"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              {m["compose.senderAddress"]()}
            </span>
            <input
              type="email"
              value={config.senderAddress}
              onChange={(event) => onChange({ ...config, senderAddress: event.target.value })}
              placeholder="iym@example.org"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              {m["compose.replyTo"]()}
            </span>
            <input
              type="email"
              value={config.replyTo}
              onChange={(event) => onChange({ ...config, replyTo: event.target.value })}
              placeholder={m["compose.replyToPlaceholder"]()}
              className={inputClass}
            />
          </label>
        </div>
        {identityWarning !== null && (
          <p
            className="mt-3 flex items-start gap-2 rounded-md border border-amber-600/40 bg-amber-600/10 px-3 py-2 text-xs text-amber-900"
            role="status"
          >
            <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
            <span>
              {identityWarning.kind === "provider-domain-mismatch"
                ? m["compose.senderDomainMismatch"]({
                    provider: identityWarning.provider,
                    domain: identityWarning.accountDomain,
                    from: config.senderAddress,
                  })
                : m["compose.senderDiffersFromProfile"]({
                    address: identityWarning.profileAddress,
                  })}
            </span>
          </p>
        )}
      </div>

      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {m["compose.sendingRate"]()}
          </h3>
          <span className="font-mono text-sm">
            {m["compose.sendingRateMs"]({ ms: config.delayMs })}
          </span>
        </div>
        <input
          type="range"
          min={RATE_LIMIT_MIN_MS}
          max={RATE_LIMIT_MAX_MS}
          step={RATE_LIMIT_STEP_MS}
          value={config.delayMs}
          onChange={(event) => {
            const ms = Number(event.target.value);
            onChange({ ...config, delayMs: ms });
            commitRate(ms);
          }}
          className="mt-3 w-full accent-primary"
        />
        <p className="mt-1 text-xs text-muted-foreground">{m["compose.sendingRateHint"]()}</p>
      </div>
    </div>
  );
}

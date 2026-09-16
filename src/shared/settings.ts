/**
 * Settings domain constants shared by both processes, so the main process
 * and the renderer can never drift apart: the setting keys themselves and
 * the rate-limit bounds. Zero dependencies by design - the renderer imports
 * this module, so nothing here may import from `effect` or any other package.
 */

/** The settings rows both processes read and write by key. */
export const SETTING_KEYS = {
  rateLimitDelayMs: "rate_limit_delay_ms",
  templatesDir: "templates_dir",
  outputDir: "output_dir",
  libreofficeChecked: "libreoffice_checked",
  language: "language",
  // The update domain's bookkeeping (ADR-0011). Owned by the update
  // service, which reads and writes them through SqliteRepo directly -
  // nothing outside that module reads these rows.
  /** The version the profile last launched on - a change means it just updated. */
  lastRunVersion: "last_run_version",
  /** The version to announce in the one-time "what's new" notice, until dismissed. */
  updateNoticeVersion: "update_notice_version",
  /** The available version whose banner the user dismissed (a newer one re-nags). */
  updateDismissedVersion: "update_dismissed_version",
} as const;
export type SettingKey = (typeof SETTING_KEYS)[keyof typeof SETTING_KEYS];

/**
 * The UI locales the app ships in (ADR-0004). The renderer's system locale
 * is normalized against this list; anything else falls back to English.
 */
export const UI_LOCALES = ["en", "id"] as const;
export type UiLocale = (typeof UI_LOCALES)[number];
export const DEFAULT_UI_LOCALE: UiLocale = "en";

/**
 * Normalizes any locale string ("id", "id-ID", "EN_us") to a supported UI
 * locale, falling back to English. Shared by the main-process seed
 * (Electron `app.getLocale()`) and the renderer boot (`navigator.language`),
 * so both processes can never disagree on what a stored value means.
 */
export function normalizeUiLocale(raw: string | null): UiLocale {
  const normalized = (raw ?? "").split("-")[0]!.toLowerCase();
  return (UI_LOCALES as readonly string[]).includes(normalized)
    ? (normalized as UiLocale)
    : DEFAULT_UI_LOCALE;
}

/** The send-rate bounds (spec decision 8: slider 500-5000ms, step 100). */
export const RATE_LIMIT_MIN_MS = 500;
export const RATE_LIMIT_MAX_MS = 5000;
export const RATE_LIMIT_STEP_MS = 100;

/**
 * Parses the stored rate-limit setting into the delay the pacing gate
 * uses, clamping to the slider bounds and falling back to the default
 * when the row is absent or unparseable. Shared by the main-process gate
 * and the renderer's sliders so the two can never disagree on a value.
 */
export function parseRateLimitMs(raw: string | null): number {
  const parsed = raw === null ? NaN : Number(raw);
  if (!Number.isFinite(parsed)) return DEFAULT_RATE_LIMIT_DELAY_MS;
  return Math.min(RATE_LIMIT_MAX_MS, Math.max(RATE_LIMIT_MIN_MS, Math.round(parsed)));
}

/**
 * First-run defaults (spec decision 7). Shared so the main-process seed,
 * the read fallbacks, and the renderer's fallbacks cannot drift apart.
 */
export const DEFAULT_RATE_LIMIT_DELAY_MS = 1000;
export const DEFAULT_LIBREOFFICE_CHECKED = false;

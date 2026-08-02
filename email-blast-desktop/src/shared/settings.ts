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
} as const;
export type SettingKey = (typeof SETTING_KEYS)[keyof typeof SETTING_KEYS];

/** The send-rate bounds (spec decision 8: slider 500-5000ms, step 100). */
export const RATE_LIMIT_MIN_MS = 500;
export const RATE_LIMIT_MAX_MS = 5000;
export const RATE_LIMIT_STEP_MS = 100;

/**
 * First-run defaults (spec decision 7). Shared so the main-process seed,
 * the read fallbacks, and the renderer's fallbacks cannot drift apart.
 */
export const DEFAULT_RATE_LIMIT_DELAY_MS = 1000;
export const DEFAULT_LIBREOFFICE_CHECKED = false;

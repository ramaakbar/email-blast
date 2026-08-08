import { Context, Effect, Layer, Option, pipe } from "effect";
import { mkdirSync } from "fs";
import Database from "better-sqlite3";
import {
  DEFAULT_LIBREOFFICE_CHECKED,
  DEFAULT_RATE_LIMIT_DELAY_MS,
  DEFAULT_UI_LOCALE,
  normalizeUiLocale,
  RATE_LIMIT_MAX_MS,
  RATE_LIMIT_MIN_MS,
  SETTING_KEYS,
  type UiLocale,
} from "../../shared/settings";
import type { DefaultPaths } from "./default-paths";
import { SqliteRepo, type SqliteRepoShape } from "../db/repository";

/**
 * The settings the app lives by, typed instead of raw key/values:
 * the sending rate limit, the templates/output directories, the
 * first-launch LibreOffice check flag, and the UI language (ADR-0004).
 * Values persist in SQLite and round-trip through the Settings layer;
 * missing rows fall back to the defaults from spec decision 7.
 */

/**
 * Seeds the default settings on first run. INSERT OR IGNORE means a later
 * launch never clobbers user-changed values. Owned by the Settings domain;
 * the same constants back the read fallbacks, so seed and fallback cannot
 * drift apart. The UI language (ADR-0004) is seeded from the OS locale
 * normalized against the shipped locales, defaulting to English.
 */
export function seedSettings(
  db: Database.Database,
  defaults: DefaultPaths,
  systemLocale: string = DEFAULT_UI_LOCALE,
): void {
  const insert = db.prepare("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)");
  insert.run(SETTING_KEYS.rateLimitDelayMs, String(DEFAULT_RATE_LIMIT_DELAY_MS));
  insert.run(SETTING_KEYS.templatesDir, defaults.templatesDir);
  insert.run(SETTING_KEYS.outputDir, defaults.outputDir);
  insert.run(SETTING_KEYS.libreofficeChecked, String(DEFAULT_LIBREOFFICE_CHECKED));
  insert.run(SETTING_KEYS.language, normalizeUiLocale(systemLocale));
}

export interface SettingsShape {
  readonly getRateLimitDelayMs: () => Effect.Effect<number>;
  readonly setRateLimitDelayMs: (ms: number) => Effect.Effect<void>;
  readonly getTemplatesDir: () => Effect.Effect<string>;
  readonly setTemplatesDir: (dir: string) => Effect.Effect<void>;
  readonly getOutputDir: () => Effect.Effect<string>;
  readonly setOutputDir: (dir: string) => Effect.Effect<void>;
  readonly getLibreOfficeChecked: () => Effect.Effect<boolean>;
  readonly setLibreOfficeChecked: (checked: boolean) => Effect.Effect<void>;
  /** The persisted UI language (ADR-0004), normalized to a shipped locale. */
  readonly getLanguage: () => Effect.Effect<UiLocale>;
  readonly setLanguage: (locale: UiLocale) => Effect.Effect<void>;
  /** Creates the configured templates/output directories if absent. */
  readonly ensureDirectories: () => Effect.Effect<void>;
}

function readIntSetting(
  getSetting: (key: string) => Effect.Effect<Option.Option<string>>,
  key: string,
  fallback: number,
): Effect.Effect<number> {
  return pipe(
    getSetting(key),
    Effect.map(
      Option.match({
        onNone: () => fallback,
        onSome: (value) => {
          const parsed = Number(value);
          return Number.isFinite(parsed) ? Math.trunc(parsed) : fallback;
        },
      }),
    ),
  );
}

function readStringSetting(
  getSetting: (key: string) => Effect.Effect<Option.Option<string>>,
  key: string,
  fallback: string,
): Effect.Effect<string> {
  return pipe(getSetting(key), Effect.map(Option.getOrElse(() => fallback)));
}

function readBoolSetting(
  getSetting: (key: string) => Effect.Effect<Option.Option<string>>,
  key: string,
  fallback: boolean,
): Effect.Effect<boolean> {
  return pipe(
    getSetting(key),
    Effect.map(Option.match({ onNone: () => fallback, onSome: (value) => value === "true" })),
  );
}

function clampRate(ms: number): number {
  return Math.max(RATE_LIMIT_MIN_MS, Math.min(RATE_LIMIT_MAX_MS, ms));
}

export function makeSettings(repo: SqliteRepoShape, defaults: DefaultPaths): SettingsShape {
  const get = (key: string) => repo.getSetting(key);
  const set = (key: string, value: string) => repo.setSetting(key, value);

  return {
    getRateLimitDelayMs: () =>
      pipe(
        readIntSetting(get, SETTING_KEYS.rateLimitDelayMs, DEFAULT_RATE_LIMIT_DELAY_MS),
        // The generic settings.set IPC writes raw values, so the read path
        // clamps too - a stored rate outside 500-5000ms can never be served.
        Effect.map(clampRate),
      ),
    setRateLimitDelayMs: (ms) =>
      set(SETTING_KEYS.rateLimitDelayMs, String(clampRate(Math.round(ms)))),
    getTemplatesDir: () => readStringSetting(get, SETTING_KEYS.templatesDir, defaults.templatesDir),
    setTemplatesDir: (dir) => set(SETTING_KEYS.templatesDir, dir),
    getOutputDir: () => readStringSetting(get, SETTING_KEYS.outputDir, defaults.outputDir),
    setOutputDir: (dir) => set(SETTING_KEYS.outputDir, dir),
    getLibreOfficeChecked: () =>
      readBoolSetting(get, SETTING_KEYS.libreofficeChecked, DEFAULT_LIBREOFFICE_CHECKED),
    setLibreOfficeChecked: (checked) => set(SETTING_KEYS.libreofficeChecked, String(checked)),
    getLanguage: () =>
      pipe(
        readStringSetting(get, SETTING_KEYS.language, DEFAULT_UI_LOCALE),
        Effect.map((raw) => normalizeUiLocale(raw)),
      ),
    setLanguage: (locale) => set(SETTING_KEYS.language, locale),
    ensureDirectories: () =>
      Effect.gen(function* () {
        const templatesDir = yield* readStringSetting(
          get,
          SETTING_KEYS.templatesDir,
          defaults.templatesDir,
        );
        const outputDir = yield* readStringSetting(get, SETTING_KEYS.outputDir, defaults.outputDir);
        mkdirSync(templatesDir, { recursive: true });
        mkdirSync(outputDir, { recursive: true });
      }),
  };
}

/**
 * Typed settings access over the open database handle. Constructing this
 * layer seeds the default settings (once) and provides SqliteRepo alongside,
 * so a program can depend on either.
 */
export class Settings extends Context.Service<Settings, SettingsShape>()("Settings") {
  static readonly Live = (
    db: Database.Database,
    defaults: DefaultPaths,
    systemLocale: string = DEFAULT_UI_LOCALE,
  ): Layer.Layer<Settings | SqliteRepo> => {
    seedSettings(db, defaults, systemLocale);
    return Layer.provideMerge(
      Layer.effect(
        Settings,
        Effect.gen(function* () {
          const repo = yield* SqliteRepo;
          return makeSettings(repo, defaults);
        }),
      ),
      SqliteRepo.Live(db),
    );
  };
}

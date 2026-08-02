import { describe, expect, it } from "vitest";
import { Effect, Layer } from "effect";
import { existsSync } from "fs";
import { join } from "path";
import { openDatabase } from "./sqlite-repo";
import { seedSettings, Settings, type SettingsShape } from "./settings";
import { defaultPathsForHome } from "./default-paths";
import { tempDir } from "./test-helpers";

/**
 * Seam A (spec Testing Decisions): the settings round-trip through the
 * Effect Layer on a temp database with a temp home directory.
 */

function tempHome(): { home: string; templatesDir: string; outputDir: string } {
  const home = tempDir();
  return {
    home,
    templatesDir: join(home, "Documents", "EmailBlast", "templates"),
    outputDir: join(home, "Documents", "EmailBlast", "output"),
  };
}

/** Runs an Effect program that borrows the Settings service from a layer. */
function use<A, E>(
  layer: Layer.Layer<Settings>,
  f: (settings: SettingsShape) => Effect.Effect<A, E, never>,
): Promise<A> {
  return Effect.runPromise(
    Effect.gen(function* () {
      return yield* f(yield* Settings);
    }).pipe(Effect.provide(layer)),
  );
}

describe("Settings (Seam A)", () => {
  it("seeds the default settings on first run without clobbering later values", () => {
    const db = openDatabase(join(tempDir(), "test.db"));
    seedSettings(db, defaultPathsForHome("/Users/example"));

    const row = (key: string) =>
      db.prepare("SELECT value FROM settings WHERE key = ?").get(key) as
        | { value: string }
        | undefined;

    expect(row("rate_limit_delay_ms")?.value).toBe("1000");
    expect(row("templates_dir")?.value).toBe("/Users/example/Documents/EmailBlast/templates");
    expect(row("output_dir")?.value).toBe("/Users/example/Documents/EmailBlast/output");
    expect(row("libreoffice_checked")?.value).toBe("false");

    // Seeding again (a later launch) must not clobber user values.
    seedSettings(db, defaultPathsForHome("/Users/other"));
    expect(row("templates_dir")?.value).toBe("/Users/example/Documents/EmailBlast/templates");
    db.close();
  });

  it("seeds defaults and reads them back through the Effect Layer", async () => {
    const home = tempHome();
    const db = openDatabase(join(home.home, "test.db"));
    const layer = Settings.Live(db, home);

    await expect(use(layer, (s) => s.getRateLimitDelayMs())).resolves.toBe(1000);
    await expect(use(layer, (s) => s.getTemplatesDir())).resolves.toBe(home.templatesDir);
    await expect(use(layer, (s) => s.getOutputDir())).resolves.toBe(home.outputDir);
    await expect(use(layer, (s) => s.getLibreOfficeChecked())).resolves.toBe(false);
    db.close();
  });

  it("round-trips writes through the Effect Layer", async () => {
    const home = tempHome();
    const db = openDatabase(join(home.home, "test.db"));
    const layer = Settings.Live(db, home);

    await use(layer, (s) => s.setRateLimitDelayMs(2500));
    await expect(use(layer, (s) => s.getRateLimitDelayMs())).resolves.toBe(2500);

    await use(layer, (s) => s.setLibreOfficeChecked(true));
    await expect(use(layer, (s) => s.getLibreOfficeChecked())).resolves.toBe(true);

    await use(layer, (s) => s.setTemplatesDir("/tmp/custom-templates"));
    await expect(use(layer, (s) => s.getTemplatesDir())).resolves.toBe("/tmp/custom-templates");

    db.close();
  });

  it("clamps the rate limit on read, even when a raw value bypassed the setter", async () => {
    const home = tempHome();
    const db = openDatabase(join(home.home, "test.db"));
    const layer = Settings.Live(db, home);

    // The generic settings.set IPC writes raw values; the typed read still
    // serves only the spec'd 500-5000ms range.
    await use(layer, (s) => s.setRateLimitDelayMs(2500));
    db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run(
      "rate_limit_delay_ms",
      "50",
    );
    await expect(use(layer, (s) => s.getRateLimitDelayMs())).resolves.toBe(500);

    db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run(
      "rate_limit_delay_ms",
      "99999",
    );
    await expect(use(layer, (s) => s.getRateLimitDelayMs())).resolves.toBe(5000);
    db.close();
  });

  it("persists settings across a restart (reopen the same database file)", async () => {
    const home = tempHome();
    const dbPath = join(home.home, "test.db");

    const db1 = openDatabase(dbPath);
    const layer1 = Settings.Live(db1, home);
    await use(layer1, (s) => s.setRateLimitDelayMs(5000));
    db1.close();

    const db2 = openDatabase(dbPath);
    const layer2 = Settings.Live(db2, home);
    await expect(use(layer2, (s) => s.getRateLimitDelayMs())).resolves.toBe(5000);
    db2.close();
  });

  it("creates the default templates and output directories on first run", async () => {
    const home = tempHome();
    const db = openDatabase(join(home.home, "test.db"));
    const layer = Settings.Live(db, home);

    await use(layer, (s) => s.ensureDirectories());

    expect(existsSync(home.templatesDir)).toBe(true);
    expect(existsSync(home.outputDir)).toBe(true);

    // Idempotent on subsequent launches.
    await use(layer, (s) => s.ensureDirectories());
    expect(existsSync(home.templatesDir)).toBe(true);
    db.close();
  });
});

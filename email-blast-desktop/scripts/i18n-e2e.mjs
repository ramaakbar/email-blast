// E2E for ticket 24: the UI language in both locales against the packaged
// app. A first launch creates the schema in a temp userData dir; the seed
// then marks setup done and pins the language to English. The flow:
// 1. the shell renders in English (nav, Settings screen),
// 2. the Settings language switcher flips the UI to Bahasa Indonesia
//    instantly (no reload),
// 3. a relaunch with the same userData dir boots straight into Bahasa
//    Indonesia - the choice persisted through the settings store,
// 4. zero renderer console errors.
// The first launch's own seed is checked too: the OS-locale default it
// writes must be one of the two shipped locales (en fallback included).
import { accessSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { _electron } from "playwright-core";

const appDir = resolve(import.meta.dirname, "..", "out");
const executablePath = join(
  appDir,
  "Email Blast-darwin-arm64",
  "Email Blast.app",
  "Contents",
  "MacOS",
  "Email Blast",
);
try {
  accessSync(executablePath);
} catch {
  console.error("packaged app not found under out/ - run `pnpm package` first");
  process.exit(1);
}

const settingsPath = (userDataDir) => join(userDataDir, "email-blast.db");

function readSetting(userDataDir, key) {
  const db = new DatabaseSync(settingsPath(userDataDir));
  const row = db.prepare("SELECT value FROM settings WHERE key = ?").get(key);
  db.close();
  return row?.value ?? null;
}

function seedSettings(userDataDir, language) {
  const db = new DatabaseSync(settingsPath(userDataDir));
  db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run(
    "libreoffice_checked",
    "true",
  );
  db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run(
    "language",
    language,
  );
  db.close();
}

const userDataDir = mkdtempSync(join(tmpdir(), "email-blast-i18n-e2e-"));
let app = null;
const errors = [];
try {
  // First launch: the app creates the schema and seeds the defaults. The
  // welcome screen renders in the seeded language (en or id depending on
  // the OS locale), so accept both - the seeded row itself is asserted
  // below. The seeded language (the OS locale, normalized) must be a
  // shipped locale.
  app = await _electron.launch({ executablePath, args: [`--user-data-dir=${userDataDir}`] });
  const bootPage = await app.firstWindow();
  await bootPage.waitForSelector("text=/Get Started|Mulai/", { timeout: 15000 });
  await app.close();
  app = null;

  const seeded = readSetting(userDataDir, "language");
  if (seeded !== "en" && seeded !== "id") {
    throw new Error(`seeded OS-locale default is not a shipped locale: "${seeded}"`);
  }
  console.log(`first launch: OS locale default seeded as "${seeded}" (valid shipped locale)`);

  // Second launch: setup done, language pinned to English - the shell and
  // the Settings screen must render in English.
  seedSettings(userDataDir, "en");
  app = await _electron.launch({ executablePath, args: [`--user-data-dir=${userDataDir}`] });
  const page = await app.firstWindow();
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));

  await page.waitForSelector("aside a:has-text('Recipients')", { timeout: 15000 });
  console.log("en: app shell renders in English");

  await page.locator("aside a:has-text('Settings')").click();
  await page.waitForSelector("h1:text-is('Settings')", { timeout: 15000 });
  console.log("en: Settings screen renders in English");
  await page.waitForSelector("button:has-text('Bahasa Indonesia')");
  await page.waitForSelector("button:has-text('English')");
  console.log("en: language switcher shows both options");

  // Switch to Bahasa Indonesia - the UI flips instantly (setLocale with
  // reload: false), no navigation, no reload.
  await page.locator("button:has-text('Bahasa Indonesia')").click();
  await page.waitForSelector("h1:text-is('Pengaturan')", { timeout: 15000 });
  await page.waitForSelector("aside a:has-text('Penerima')");
  await page.waitForSelector("aside a:has-text('Generate')");
  await page.waitForSelector("aside a:has-text('Kirim')");
  console.log("id: switcher flipped the shell and Settings to Bahasa Indonesia instantly");

  const shot = join(import.meta.dirname, "i18n-e2e-id.png");
  await page.screenshot({ path: shot });
  console.log(`screenshot: ${shot}`);

  await app.close();
  app = null;

  // Third launch, same userData dir: the persisted choice applies on boot.
  app = await _electron.launch({ executablePath, args: [`--user-data-dir=${userDataDir}`] });
  const relaunched = await app.firstWindow();
  relaunched.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  relaunched.on("pageerror", (err) => errors.push(String(err)));
  await relaunched.waitForSelector("aside a:has-text('Penerima')", { timeout: 15000 });
  await relaunched.locator("aside a:has-text('Pengaturan')").click();
  await relaunched.waitForSelector("h1:text-is('Pengaturan')", { timeout: 15000 });
  console.log("id: relaunch boots into Bahasa Indonesia - the choice persisted");
  await app.close();
  app = null;

  if (errors.length) throw new Error(`renderer console errors:\n${errors.join("\n")}`);
  console.log("SMOKE PASS: both locales render, switcher flips instantly, choice persists, zero console errors");
} finally {
  if (app) await app.close().catch(() => {});
  rmSync(userDataDir, { recursive: true, force: true });
}

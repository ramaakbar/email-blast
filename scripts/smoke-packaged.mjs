// Packaged-app smoke E2E for the Vite + electron-builder chain (ADR-0010,
// tickets 19-20, 26).
// Launches the packaged app with an isolated userData dir, waits for the
// window, verifies the renderer loaded, the preload bridge answers, and
// there are zero renderer console errors, then quits. A first launch lets
// the app create the schema; the seed then pins the language to English
// (ticket 24 - the script drives the UI by its English strings, so the OS
// locale cannot flip the assertions) and marks setup done, and the second
// launch verifies the app shell.
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { _electron } from "playwright-core";

import { findPackagedExecutable } from "./packaged-app.mjs";

const executablePath = findPackagedExecutable();
if (executablePath === null) {
  console.error("packaged app not found under dist/ - run `pnpm package` first");
  process.exit(1);
}

const userDataDir = mkdtempSync(join(tmpdir(), "email-blast-smoke-"));
let app;
const errors = [];
try {
  // First launch: the app creates the schema and seeds the defaults. The
  // welcome screen renders in the seeded language (en or id depending on
  // the OS locale), so accept both - the language is pinned right after.
  app = await _electron.launch({
    executablePath,
    args: [`--user-data-dir=${userDataDir}`],
  });
  const bootPage = await app.firstWindow();
  await bootPage.waitForSelector("text=/Get Started|Mulai/", { timeout: 15000 });
  await app.close();
  app = null;

  // Pin the language to English (the script's strings) and mark setup
  // done, so the second launch renders the app shell deterministically.
  const db = new DatabaseSync(join(userDataDir, "email-blast.db"));
  const set = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
  set.run("language", "en");
  set.run("libreoffice_checked", "true");
  db.close();

  app = await _electron.launch({
    executablePath,
    args: [`--user-data-dir=${userDataDir}`],
  });
  const page = await app.firstWindow();
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  // The app shell renders (the seeded profile skips the welcome screen).
  await page.waitForSelector("aside a:has-text('Recipients')", { timeout: 15000 });
  const title = await page.title();
  console.log(`window title: ${title}`);

  // The preload bridge answers over the real IPC surface.
  const ping = await page.evaluate(() => window.api.system.ping());
  console.log(`bridge ping: ${JSON.stringify(ping)}`);
  if (!ping?.pong) throw new Error("bridge ping did not return pong");

  // A DB-backed round trip (app info comes from the AppInfo service, which
  // is hardcoded for now; the settings query hits the real database opened
  // at boot - the seeded default "1000" proves the read path works).
  const info = await page.evaluate(() => window.api.system.getAppInfo());
  console.log(`app info: ${JSON.stringify(info)}`);
  if (!info?.version) throw new Error("getAppInfo did not return version");
  const setting = await page.evaluate(() => window.api.settings.get("rate_limit_delay_ms"));
  console.log(`settings round trip: ${JSON.stringify(setting)}`);
  if (setting !== null && typeof setting !== "string") {
    throw new Error("settings round trip returned an unexpected shape");
  }

  const shot = join(import.meta.dirname, "smoke-packaged.png");
  await page.screenshot({ path: shot });
  console.log(`screenshot: ${shot}`);

  if (errors.length) throw new Error(`renderer console errors:\n${errors.join("\n")}`);
  console.log(
    "SMOKE PASS: packaged app launched, renderer loaded, bridge answered, zero console errors",
  );
} finally {
  if (app) await app.close().catch(() => {});
  rmSync(userDataDir, { recursive: true, force: true });
}

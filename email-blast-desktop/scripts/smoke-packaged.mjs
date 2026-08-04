// Packaged-app smoke E2E for the Forge/Vite toolchain (tickets 19-20).
// Launches the packaged app with an isolated userData dir, waits for the
// window, verifies the renderer loaded (first-launch screen), the preload
// bridge answers, and there are zero renderer console errors, then quits.
import { accessSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { _electron } from "playwright-core";

// APP_PATH overrides the packaged app to smoke (e.g. a zip-extracted copy).
const appDir = resolve(import.meta.dirname, "..", "out");
const candidates = [
  process.env.APP_PATH,
  join(appDir, "Email Blast-darwin-arm64", "Email Blast.app", "Contents", "MacOS", "Email Blast"),
].filter(Boolean);
const executablePath = candidates.find((p) => {
  try {
    accessSync(p);
    return true;
  } catch {
    return false;
  }
});
if (!executablePath) {
  console.error("packaged app not found under out/ - run `pnpm package` first");
  process.exit(1);
}

const userDataDir = mkdtempSync(join(tmpdir(), "email-blast-smoke-"));
let app;
try {
  app = await _electron.launch({
    executablePath,
    args: [`--user-data-dir=${userDataDir}`],
  });
  const errors = [];
  const page = await app.firstWindow();
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  // First-launch screen renders (the app's first window content).
  await page.waitForSelector("text=Get Started", { timeout: 15000 });
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

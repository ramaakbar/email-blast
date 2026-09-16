// Packaged-app update E2E for the auto-update chain (ticket 21, ADR-0011).
// Launches the packaged app against the REAL release feed and verifies the
// update domain end to end from the renderer: the state a profile reports,
// the one-time what's-new notice raised by a version change, a manual check,
// and dismissal. It is the app-side half of the round trip - the platform
// half (download + install) needs a published newer version on the feed.
//
// The feed has no releases until the first one is published, so a check is
// expected to answer `up-to-date` (electron-updater 404s on an empty feed
// and the service maps that to "nothing published", not to an error).
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { _electron } from "playwright-core";

import { findPackagedExecutable } from "./packaged-app.mjs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { version: appVersion } = require("../package.json");

const executablePath = findPackagedExecutable();
if (executablePath === null) {
  console.error("packaged app not found under dist/ - run `pnpm package` first");
  process.exit(1);
}

const failures = [];
const check = (label, condition, detail) => {
  if (condition) {
    console.log(`  ok   ${label}`);
  } else {
    failures.push(`${label}${detail === undefined ? "" : ` (${String(detail)})`}`);
    console.log(`  FAIL ${label}${detail === undefined ? "" : ` (${String(detail)})`}`);
  }
};

const userDataDir = mkdtempSync(join(tmpdir(), "email-blast-update-"));
let app;
try {
  // First launch: the app creates the schema and seeds the defaults. It is
  // closed straight away - the seeded rows are what the second launch reads.
  app = await _electron.launch({
    executablePath,
    args: [`--user-data-dir=${userDataDir}`],
  });
  const bootPage = await app.firstWindow();
  await bootPage.waitForSelector("text=/Get Started|Mulai/", { timeout: 15000 });
  await app.close();
  app = null;

  // Pin the language (the script asserts on English copy) and pretend this
  // profile last ran an older version, so boot raises the what's-new notice.
  const db = new DatabaseSync(join(userDataDir, "email-blast.db"));
  const set = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
  set.run("language", "en");
  set.run("libreoffice_checked", "true");
  set.run("last_run_version", "0.9.0");
  db.close();

  app = await _electron.launch({
    executablePath,
    args: [`--user-data-dir=${userDataDir}`],
  });
  const page = await app.firstWindow();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  await page.waitForSelector("aside a:has-text('Recipients')", { timeout: 15000 });

  console.log("\nwhat's-new notice");
  const noticeState = await page.evaluate(() => window.api.update.getState());
  check(
    "state.whatsNew is the version just moved to",
    noticeState.whatsNew === appVersion,
    JSON.stringify(noticeState),
  );
  check(
    "state.currentVersion is the packaged version",
    noticeState.currentVersion === appVersion,
    noticeState.currentVersion,
  );
  check(
    "state.canSelfInstall matches the platform",
    noticeState.canSelfInstall === (process.platform === "win32"),
    `${String(noticeState.canSelfInstall)} on ${process.platform}`,
  );
  // The notice is on screen, not just in the state.
  await page.waitForSelector(`[role="status"]:has-text("${appVersion}")`, { timeout: 10000 });
  console.log("  ok   the notice renders in the app shell");

  console.log("\nmanual check against the live feed");
  const checked = await page.evaluate(() => window.api.update.check());
  console.log(
    `  state: ${checked.status}${checked.availableVersion === null ? "" : ` -> ${checked.availableVersion}`}`,
  );
  check(
    "a check answers up-to-date or available",
    checked.status === "up-to-date" || checked.status === "available",
    checked.error ?? checked.status,
  );
  check(
    "the check reported the packaged version as current",
    checked.currentVersion === appVersion,
    checked.currentVersion,
  );
  if (checked.status === "available") {
    check(
      "an available version carries its release page",
      typeof checked.releaseUrl === "string" && checked.releaseUrl.length > 0,
      checked.releaseUrl,
    );
  }

  console.log("\ndismissal");
  const afterDismiss = await page.evaluate(() => window.api.update.dismiss("whatsNew"));
  check(
    "dismissing clears the what's-new notice",
    afterDismiss.whatsNew === null,
    String(afterDismiss.whatsNew),
  );
  const staleNotices = await page.locator(`[role="status"]:has-text("Updated to version")`).count();
  check("the notice leaves the screen", staleNotices === 0, `${staleNotices} still rendered`);

  check("no renderer console errors", errors.length === 0, errors.slice(0, 3).join(" | "));
} finally {
  if (app !== null) await app.close();
  rmSync(userDataDir, { recursive: true, force: true });
}

if (failures.length > 0) {
  console.error(`\nUPDATE CHECK FAIL: ${failures.length} failed assertion(s)`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log("\nUPDATE CHECK PASS");

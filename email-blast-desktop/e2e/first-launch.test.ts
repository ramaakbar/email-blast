import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  freshUserDataDir,
  launchApp,
  registerE2ECleanup,
  type E2ECleanupState,
} from "./harness";

/**
 * Seam B first launch (ticket 18): with LibreOffice absent, the welcome
 * screen shows the install guidance and Get Started stays disabled, and
 * Check Again re-checks - once the (stubbed) soffice appears, the screen
 * flips to found and lets the user continue. The detection is controlled
 * by the `EMAIL_BLAST_SOFFICE` seam: a forced path that does not exist
 * reads as absent, and one that does reads as installed.
 */

describe("Seam B: first launch without LibreOffice", () => {
  const state: E2ECleanupState = { session: null, smtp: null, userDataDir: "" };
  registerE2ECleanup(state);

  it("shows install guidance when LibreOffice is absent and Check Again re-checks", async () => {
    state.userDataDir = freshUserDataDir("eb-welcome-");
    // The forced soffice does not exist yet - the check reads it as absent.
    const stubSoffice = join(state.userDataDir, "soffice-stub");
    state.session = await launchApp(state.userDataDir, {
      env: { EMAIL_BLAST_SOFFICE: stubSoffice },
    });
    const { page } = state.session;
    await page.waitForSelector("text=LibreOffice is not installed", { timeout: 20_000 });

    // The install guidance is on screen (macOS shows the brew command).
    await page.waitForSelector("code:has-text('brew install --cask libreoffice')");
    await page.waitForSelector("a:has-text('libreoffice.org')");

    // Get Started is locked while LibreOffice is missing.
    const getStarted = page.getByRole("button", { name: "Get Started" });
    expect(await getStarted.isDisabled()).toBe(true);

    // Check Again re-checks: the stub appears, the screen flips to found.
    writeFileSync(stubSoffice, "");
    await page.getByRole("button", { name: "Check Again" }).click();
    await page.waitForSelector("text=LibreOffice found", { timeout: 20_000 });
    await page.getByText("soffice-stub").first().waitFor();

    // Get Started unlocks and completes the setup into the app shell.
    await page.getByRole("button", { name: "Get Started" }).click();
    await page.waitForSelector("aside a:has-text('Import')", { timeout: 20_000 });

    expect(state.session.errors, `renderer console errors:\n${state.session.errors.join("\n")}`).toEqual(
      [],
    );
  });
});

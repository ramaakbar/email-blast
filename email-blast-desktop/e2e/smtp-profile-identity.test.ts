import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  fillWorkspaceMessage,
  firstLaunchCreatesSchema,
  freshUserDataDir,
  importFixtureSpreadsheet,
  launchApp,
  registerE2ECleanup,
  seedDatabase,
  startSmtpCapture,
  type E2ECleanupState,
} from "./harness";
import { FIXTURE_RECIPIENTS, writeFixtureSpreadsheet, writeFixtureTemplate } from "./fixtures";

/**
 * Seam B for ticket 01: the SMTP Profile default Sender Identity. The
 * profile is created through the Settings dialog with a default identity,
 * the Send workspace prefills it from the chosen profile, the per-job
 * override delivers on the wire (verified on the SMTP capture server), the
 * soft warning appears without blocking, and the profile itself is never
 * mutated by the job. The second scenario pins the legacy behavior: a
 * profile without a default identity keeps the manually typed identity.
 */

async function seedWorkspace(state: E2ECleanupState): Promise<string> {
  const fixturesDir = join(state.userDataDir, "fixtures");
  mkdirSync(fixturesDir, { recursive: true });
  const xlsxPath = join(fixturesDir, "recipients.xlsx");
  writeFixtureSpreadsheet(xlsxPath, FIXTURE_RECIPIENTS);
  const templatesDir = join(state.userDataDir, "templates");
  const outputDir = join(state.userDataDir, "output");
  mkdirSync(templatesDir, { recursive: true });
  const docxPath = writeFixtureTemplate(templatesDir);
  seedDatabase(state.userDataDir, {
    settings: { templatesDir, outputDir },
    template: {
      id: "tpl-loa",
      name: "LOA",
      filePath: docxPath,
      slots: ["name", "instansi"],
      outputPattern: "LOA_{name}.pdf",
    },
  });
  return xlsxPath;
}

/** Walks the workspaces from the fresh app shell to the Send workspace's SMTP section. */
async function walkToSmtpStep(
  app: import("playwright-core").ElectronApplication,
  page: import("playwright-core").Page,
  xlsxPath: string,
): Promise<void> {
  await importFixtureSpreadsheet(app, page, xlsxPath);
  await page.click("aside a:has-text('Send')");
  await page.getByRole("button", { name: "From the imported list" }).click();
  await page.waitForSelector('input[aria-label="Select all on this page"]', { timeout: 20_000 });
  await page.getByRole("checkbox", { name: "Select all on this page" }).check();
  await page.waitForSelector("text=4 selected · 4 matching");
  await fillWorkspaceMessage(page, {
    subject: "Undangan Rapat Yayasan",
    bodyHtml: "<p>Dear {name}, from {instansi}, you are invited.</p>",
  });
}

describe("Seam B: SMTP profile default Sender Identity (ticket 01)", () => {
  const state: E2ECleanupState = { session: null, smtp: null, userDataDir: "" };
  registerE2ECleanup(state);

  it("prefills the profile identity, delivers the per-job override, warns softly, and never mutates the profile", async () => {
    state.userDataDir = freshUserDataDir("eb-identity-");
    state.smtp = await startSmtpCapture();
    const smtp = state.smtp;
    await firstLaunchCreatesSchema(state.userDataDir);
    const xlsxPath = await seedWorkspace(state);

    state.session = await launchApp(state.userDataDir);
    const { app, page } = state.session;
    await page.waitForSelector("aside a:has-text('Import')", { timeout: 20_000 });

    // ---- Settings: create the profile with a default Sender Identity ----
    await page.click("aside a:has-text('Settings')");
    // The header and the empty-state both show "Add profile"; either opens
    // the same dialog.
    await page.getByRole("button", { name: "Add profile" }).first().click();
    await page.getByLabel("Profile name").fill("Capture server");
    await page.getByLabel("SMTP host").fill("127.0.0.1");
    await page.getByLabel("Port").fill(String(smtp.port));
    await page.getByLabel("Username").fill("me");
    await page.getByLabel("App password").fill("secret");
    await page.getByLabel("Default sender name").fill("Yayasan X");
    await page.getByLabel("Default sender address").fill("iym@example.org");
    await page.getByLabel("Reply-to (optional)").fill("sekretariat@example.org");
    await page.getByRole("button", { name: "Save profile" }).click();
    await page.waitForSelector('text=Profile "Capture server" saved.', { timeout: 20_000 });
    // The profile row shows the stored default identity.
    await page.waitForSelector("text=sekretariat@example.org", { timeout: 20_000 });

    // ---- Send workspace: SMTP section ----
    await walkToSmtpStep(app, page, xlsxPath);

    // ---- Choosing the profile prefills the identity ----
    const captureOption = await page
      .locator("select option", { hasText: "Capture server" })
      .getAttribute("value");
    expect(captureOption).not.toBeNull();
    await page.getByLabel("Saved profile").selectOption(captureOption as string);
    expect(await page.getByLabel("Sender name").inputValue()).toBe("Yayasan X");
    expect(await page.getByLabel("Sender address").inputValue()).toBe("iym@example.org");
    expect(await page.getByLabel("Reply-to").inputValue()).toBe("sekretariat@example.org");

    // ---- Override the identity per job ----
    await page.getByLabel("Sender name").fill("Panitia Kampus");
    await page.getByLabel("Sender address").fill("panitia@example.org");
    await page.getByLabel("Reply-to").fill("panitia-reply@example.org");

    // The soft warning appears (differs from the profile default) but the
    // send stays possible - the warning never blocks.
    await page.waitForSelector("text=This From address differs from the profile's default", {
      timeout: 20_000,
    });
    await page.getByRole("button", { name: "Test Connection" }).click();
    await page.waitForSelector("text=Connected - the server accepted these credentials.", {
      timeout: 20_000,
    });

    // ---- Send ----
    await page.getByRole("button", { name: "Send 4 emails" }).click();
    await page.waitForSelector("text=All 4 emails sent.", { timeout: 60_000 });

    // The capture server saw the overridden identity on every mail:
    // envelope, From header, and Reply-To header.
    expect(smtp.captured).toHaveLength(4);
    for (const mail of smtp.captured) {
      expect(mail.from).toBe("panitia@example.org");
      expect(mail.raw).toContain("From: Panitia Kampus <panitia@example.org>");
      expect(mail.raw).toContain("Reply-To: panitia-reply@example.org");
    }

    // The job's edits never mutated the profile: Settings still shows the
    // original default identity.
    await page.click("aside a:has-text('Settings')");
    await page.waitForSelector("text=sekretariat@example.org", { timeout: 20_000 });

    expect(state.session.errors, `renderer console errors:\n${state.session.errors.join("\n")}`).toEqual(
      [],
    );
  });

  it("keeps a manually typed identity for a profile without a default identity", async () => {
    state.userDataDir = freshUserDataDir("eb-identity-legacy-");
    state.smtp = await startSmtpCapture();
    const smtp = state.smtp;
    await firstLaunchCreatesSchema(state.userDataDir);
    const xlsxPath = await seedWorkspace(state);

    state.session = await launchApp(state.userDataDir);
    const { app, page } = state.session;
    await page.waitForSelector("aside a:has-text('Import')", { timeout: 20_000 });

    // A legacy profile: connection details only, no default identity.
    await page.click("aside a:has-text('Settings')");
    await page.getByRole("button", { name: "Add profile" }).first().click();
    await page.getByLabel("Profile name").fill("Legacy");
    await page.getByLabel("SMTP host").fill("127.0.0.1");
    await page.getByLabel("Port").fill(String(smtp.port));
    await page.getByLabel("Username").fill("me");
    await page.getByLabel("App password").fill("secret");
    await page.getByRole("button", { name: "Save profile" }).click();
    await page.waitForSelector('text=Profile "Legacy" saved.', { timeout: 20_000 });

    // ---- Send workspace: SMTP section, typed identity first ----
    await walkToSmtpStep(app, page, xlsxPath);
    await page.getByLabel("Sender name").fill("Yayasan X");
    await page.getByLabel("Sender address").fill("iym@example.org");
    // Choosing the legacy profile must clear the pre-typed identity - the
    // fields always reflect the chosen profile, so a stale identity from
    // an earlier selection can never ride along silently.
    const legacyOption = await page
      .locator("select option", { hasText: "Legacy" })
      .getAttribute("value");
    expect(legacyOption).not.toBeNull();
    await page.getByLabel("Saved profile").selectOption(legacyOption as string);
    expect(await page.getByLabel("Sender name").inputValue()).toBe("");
    expect(await page.getByLabel("Sender address").inputValue()).toBe("");
    // The legacy profile still sends with a manually typed identity.
    await page.getByLabel("Sender name").fill("Yayasan X");
    await page.getByLabel("Sender address").fill("iym@example.org");
    // No warning: the profile has no default identity to anchor a
    // comparison, and the local host is not a known provider.
    expect(
      await page.locator("text=This From address differs from the profile's default").count(),
    ).toBe(0);
    expect(
      await page.locator("text=will likely be rejected").count(),
    ).toBe(0);

    // ---- Send with the typed identity ----
    await page.getByRole("button", { name: "Send 4 emails" }).click();
    await page.waitForSelector("text=All 4 emails sent.", { timeout: 60_000 });

    expect(smtp.captured).toHaveLength(4);
    for (const mail of smtp.captured) {
      expect(mail.from).toBe("iym@example.org");
      expect(mail.raw).toContain("From: Yayasan X <iym@example.org>");
    }

    expect(state.session.errors, `renderer console errors:\n${state.session.errors.join("\n")}`).toEqual(
      [],
    );
  });
});

import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  firstLaunchCreatesSchema,
  freshUserDataDir,
  importFixtureSpreadsheet,
  launchApp,
  registerE2ECleanup,
  seedDatabase,
  type E2ECleanupState,
} from "./harness";
import { FIXTURE_RECIPIENTS, writeFixtureSpreadsheet, writeFixtureTemplate } from "./fixtures";

/**
 * Seam B for ticket 03 (ADR 0005): the Message Template library. The
 * scenario walks the whole copy-on-pick cycle: a template is created in
 * the Templates screen's Messages tab (with the live preview interpolating
 * against imported recipients), picked in the wizard's message step (the
 * subject and body are copied in), the job's copy is edited, the edited
 * message is saved back as a NEW template, and re-picking the original
 * proves the job's edits never touched the library - and the new template
 * shows up in the library.
 */

async function seedWizard(state: E2ECleanupState): Promise<string> {
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

describe("Seam B: Message Templates (ticket 03)", () => {
  const state: E2ECleanupState = { session: null, smtp: null, userDataDir: "" };
  registerE2ECleanup(state);

  it("creates a template, picks it into a job, edits the copy freely, saves a new template, and never mutates the original", async () => {
    state.userDataDir = freshUserDataDir("eb-message-templates-");
    await firstLaunchCreatesSchema(state.userDataDir);
    const xlsxPath = await seedWizard(state);

    state.session = await launchApp(state.userDataDir);
    const { app, page } = state.session;
    await page.waitForSelector("aside a:has-text('Import')", { timeout: 20_000 });

    // The imported recipients seed the template editor's slot inventory
    // and live preview.
    await importFixtureSpreadsheet(app, page, xlsxPath);

    // ---- Templates screen: create a Message Template under Messages ----
    await page.click("aside a:has-text('Templates')");
    await page.getByRole("tab", { name: "Messages" }).click();
    await page.getByRole("button", { name: "Add message template" }).first().click();
    await page.getByLabel("Template name").fill("Undangan Rapat");
    await page.getByLabel("Subject").fill("Undangan Rapat {name}");
    await page.getByLabel(/HTML body/).fill("<p>Dear {name}, dari {instansi}, Anda diundang.</p>");
    // The live preview interpolates against the imported recipients: the
    // subject lines render on the page, the bodies in sandboxed iframes
    // (one per previewed recipient, in the imported list's name order -
    // so "any preview body" is the robust assertion).
    await page.waitForSelector("text=Live preview", { timeout: 20_000 });
    await page.waitForSelector("text=Undangan Rapat Budi Santoso", { timeout: 20_000 });
    const previewBodies = await Promise.all(
      page
        .frames()
        .filter((frame) => frame !== page.mainFrame())
        .map((frame) => frame.locator("body").innerText()),
    );
    expect(
      previewBodies.some((text) =>
        text.includes("Dear Budi Santoso, dari Yayasan X, Anda diundang."),
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Save as template" }).click();
    await page.waitForSelector('text=Message template "Undangan Rapat" saved.', {
      timeout: 20_000,
    });
    // The list shows the template with its subject preview.
    await page.waitForSelector("text=Undangan Rapat {name}", { timeout: 20_000 });

    // ---- Wizard: pick the template on the message step ----
    // The sidebar Send now opens the Send workspace; the old wizard stays
    // reachable at #/compose until ticket 07 retires it.
    await page.evaluate(() => {
      window.location.hash = "#/compose";
    });
    await page.waitForSelector('input[aria-label="Select all on this page"]', { timeout: 20_000 });
    await page.getByRole("checkbox", { name: "Select all on this page" }).check();
    await page.waitForSelector("text=4 recipients selected");
    await page.locator("footer").getByRole("button", { name: "Next" }).click();
    await page.getByLabel("Letter or certificate template").selectOption({ label: "LOA" });
    await page.waitForSelector("text=All 4 selected recipients have data for every required slot.");
    await page.locator("footer").getByRole("button", { name: "Next" }).click();

    // Pick the template: subject and body are copied into the job.
    await page.getByLabel("Message template").selectOption({ label: "Undangan Rapat" });
    expect(await page.getByLabel("Subject").inputValue()).toBe("Undangan Rapat {name}");
    expect(await page.getByLabel(/HTML body/).inputValue()).toBe(
      "<p>Dear {name}, dari {instansi}, Anda diundang.</p>",
    );

    // ---- Edit the job's copy freely ----
    await page.getByLabel("Subject").fill("Undangan Rapat REVISI {name}");
    await page
      .getByLabel(/HTML body/)
      .fill("<p>Dear {name}, ini versi yang diedit di dalam pekerjaan.</p>");

    // ---- Save the edited message as a NEW template ----
    await page.getByRole("button", { name: "Save as template" }).click();
    // The name field defaults to the subject; override it.
    await page.getByLabel("Template name").fill("Undangan Revisi");
    await page.getByRole("button", { name: "Save template" }).click();
    await page.waitForSelector('text=Saved as template "Undangan Revisi".', { timeout: 20_000 });

    // ---- Re-pick the ORIGINAL template: the job's edits never touched it ----
    await page.getByLabel("Message template").selectOption({ label: "Undangan Rapat" });
    expect(await page.getByLabel("Subject").inputValue()).toBe("Undangan Rapat {name}");
    expect(await page.getByLabel(/HTML body/).inputValue()).toBe(
      "<p>Dear {name}, dari {instansi}, Anda diundang.</p>",
    );

    // ---- The library now holds both templates, the original unchanged ----
    await page.click("aside a:has-text('Templates')");
    await page.getByRole("tab", { name: "Messages" }).click();
    await page.waitForSelector("text=Undangan Revisi", { timeout: 20_000 });
    // Open the original's detail panel: its subject is still the original.
    await page.locator("button", { hasText: "Undangan Rapat" }).first().click();
    await page.waitForSelector("text=Undangan Rapat {name}", { timeout: 20_000 });

    // ---- Library management: edit a template, then delete it ----
    await page.getByRole("button", { name: "Close details" }).click();
    await page.locator("button", { hasText: "Undangan Revisi" }).first().click();
    await page.getByRole("button", { name: "Edit", exact: true }).click();
    await page.getByLabel("Template name").fill("Undangan Revisi v2");
    await page.getByRole("button", { name: "Save changes" }).click();
    await page.waitForSelector("text=Message template saved.", { timeout: 20_000 });
    await page.waitForSelector("text=Undangan Revisi v2", { timeout: 20_000 });

    await page.locator("button", { hasText: "Undangan Revisi v2" }).first().click();
    await page.getByRole("button", { name: "Delete" }).click();
    // The confirm dialog is the role=dialog on screen; the panel's own
    // Delete button sits behind it, so scope to the dialog.
    await page.locator('[role="dialog"]').getByRole("button", { name: "Delete" }).click();
    await page.waitForSelector("text=Message template deleted.", { timeout: 20_000 });
    await page.waitForSelector("text=Undangan Revisi v2", { state: "detached", timeout: 20_000 });

    expect(
      state.session.errors,
      `renderer console errors:\n${state.session.errors.join("\n")}`,
    ).toEqual([]);
  });
});

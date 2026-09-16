import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  firstLaunchCreatesSchema,
  freshUserDataDir,
  importFixtureSpreadsheet,
  launchApp,
  registerE2ECleanup,
  seedDatabase,
  waitFor,
  type E2ECleanupState,
} from "./harness";
import { FIXTURE_RECIPIENTS, writeFixtureSpreadsheet, writeFixtureTemplate } from "./fixtures";

/**
 * Seam B for ticket 05: the Generate workspace. The first scenario proves
 * the split end to end - the sidebar shows Generate and Send, the
 * workspace generates a certificate batch with ZERO email configuration
 * (no message, SMTP, or send step anywhere), the PDFs land in the output
 * folder named by the template's pattern, the past Generate Job can be
 * reopened, and its PDFs re-downloaded through a native save dialog. The
 * Send workspace (ticket 06) is the send side. The second scenario
 * covers the failure side: a past job with failed recipients reopens
 * with the per-recipient failure list and their errors.
 */

async function seedWorkspace(
  state: E2ECleanupState,
): Promise<{ xlsxPath: string; outputDir: string }> {
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
  return { xlsxPath, outputDir };
}

describe("Seam B: Generate workspace (ticket 05)", () => {
  const state: E2ECleanupState = { session: null, smtp: null, userDataDir: "" };
  registerE2ECleanup(state);

  it("generates a batch with zero email configuration, reopens the past job, and re-downloads its PDFs", async () => {
    state.userDataDir = freshUserDataDir("eb-generate-workspace-");
    await firstLaunchCreatesSchema(state.userDataDir);
    const { xlsxPath, outputDir } = await seedWorkspace(state);

    state.session = await launchApp(state.userDataDir);
    const { app, page } = state.session;
    await page.waitForSelector("aside a:has-text('Import')", { timeout: 20_000 });

    // ---- The sidebar shows Generate and Send ----
    await page.waitForSelector("aside a:has-text('Generate')", { timeout: 20_000 });
    expect(await page.locator("aside a:has-text('Send')").count()).toBe(1);

    await importFixtureSpreadsheet(app, page, xlsxPath);

    // ---- Generate workspace: recipients + template ----
    await page.click("aside a:has-text('Generate')");
    await page.waitForSelector('input[aria-label="Select all on this page"]', { timeout: 20_000 });
    // No email steps exist anywhere in the workspace: no message editor,
    // no SMTP connection UI, no send action.
    expect(await page.getByLabel("Subject").count()).toBe(0);
    expect(await page.getByRole("button", { name: "Test Connection" }).count()).toBe(0);
    expect(await page.getByRole("button", { name: /Send/ }).count()).toBe(0);
    await page.getByRole("checkbox", { name: "Select all on this page" }).check();
    await page.waitForSelector("text=4 selected · 4 matching");
    await page.getByLabel("Letter or certificate template").selectOption({ label: "LOA" });
    await page.waitForSelector("text=All 4 selected recipients have data for every required slot.");

    // ---- Generate with live progress ----
    await page.getByRole("button", { name: "Generate PDFs" }).click();
    await page.waitForSelector("text=All 4 PDFs generated.", { timeout: 60_000 });
    const pdfNames = readdirSync(outputDir).toSorted();
    expect(pdfNames).toEqual([
      "LOA_andi_wijaya.pdf",
      "LOA_budi_santoso.pdf",
      "LOA_dewi_lestari.pdf",
      "LOA_sari_putri.pdf",
    ]);

    // ---- Past Generate Jobs: reopened, PDFs re-downloaded ----
    await page.waitForSelector("text=Past Generate Jobs", { timeout: 20_000 });
    const jobRow = page.locator("tbody tr", { hasText: "LOA" });
    await jobRow.waitFor({ timeout: 20_000 });
    await jobRow.getByRole("button", { name: "Reopen" }).click();
    // The reopened results render with the spot-check preview. The fresh
    // run's results are still on the page above with the same filename, so
    // scope the wait to the reopened job's section (identified by its
    // heading).
    const reopenedSection = page.locator("section", { hasText: "Job Results" });
    await reopenedSection.waitFor({ timeout: 20_000 });
    await reopenedSection.getByText("Spot-check", { exact: true }).waitFor({ timeout: 20_000 });
    // The preview loads the first generated PDF (table order) before Save
    // enables.
    await reopenedSection.getByText("LOA_andi_wijaya.pdf").waitFor({ timeout: 20_000 });

    // Re-download the previewed PDF through a patched native save dialog,
    // scoped to the reopened section (the fresh run has its own Save
    // button above).
    const savedDir = join(state.userDataDir, "re-downloaded");
    mkdirSync(savedDir, { recursive: true });
    const savedPdfPath = join(savedDir, "LOA_andi_wijaya.pdf");
    await app.evaluate(({ dialog }, path) => {
      dialog.showSaveDialog = async () => ({ canceled: false, filePath: path });
    }, savedPdfPath);
    await reopenedSection.getByRole("button", { name: "Save PDF" }).click();
    await waitFor(() => existsSync(savedPdfPath), {
      timeoutMs: 20_000,
      label: "re-downloaded PDF written to the chosen path",
    });
    expect(readdirSync(savedDir)).toEqual(["LOA_andi_wijaya.pdf"]);

    // ---- The Send workspace is the send side (ticket 06) ----
    await page.click("aside a:has-text('Send')");
    await page.waitForSelector("text=Recipient source", { timeout: 20_000 });
    // The job generated above is offered in the picker (with its counts).
    await page.waitForSelector("text=From a Generate Job", { timeout: 20_000 });
    await page.waitForSelector("text=From the imported list", { timeout: 20_000 });
    // The job generated above is offered in the picker (with its counts);
    // native select options are hidden to visibility checks, so read the
    // DOM directly.
    await page.waitForFunction(
      () =>
        [...document.querySelectorAll("select option")].some((option) =>
          option.textContent?.includes("LOA · 4 generated · 0 failed"),
        ),
      { timeout: 20_000 },
    );

    expect(
      state.session.errors,
      `renderer console errors:\n${state.session.errors.join("\n")}`,
    ).toEqual([]);
  });

  it("reopens a past job with failed recipients and lists their errors", async () => {
    state.userDataDir = freshUserDataDir("eb-generate-workspace-fail-");
    await firstLaunchCreatesSchema(state.userDataDir);

    // Seed: two recipients, a generate job where one succeeded and one
    // failed (missing slot data at generate time) - the reopen must show
    // the failure list with the error and the spot-check for the survivor.
    const templatesDir = join(state.userDataDir, "templates");
    const outputDir = join(state.userDataDir, "output");
    mkdirSync(templatesDir, { recursive: true });
    const docxPath = writeFixtureTemplate(templatesDir);
    const generatedPdf = join(outputDir, "LOA_budi_santoso.pdf");
    seedDatabase(state.userDataDir, {
      settings: { templatesDir, outputDir },
      template: {
        id: "tpl-loa",
        name: "LOA",
        filePath: docxPath,
        slots: ["name", "instansi"],
        outputPattern: "LOA_{name}.pdf",
      },
      recipients: [
        {
          id: "r-budi",
          name: "Budi Santoso",
          email: "budi@example.com",
          metadata: { instansi: "Yayasan X" },
        },
        {
          id: "r-sari",
          name: "Sari Putri",
          email: "sari@example.com",
          metadata: { instansi: "Yayasan X" },
        },
      ],
      generateJob: {
        id: "gj-failed",
        templateId: "tpl-loa",
        outputs: [{ recipientId: "r-budi", outputPath: generatedPdf }],
        failures: [
          {
            recipientId: "r-sari",
            errorMessage: "Recipient no longer exists in the database.",
          },
        ],
      },
    });

    state.session = await launchApp(state.userDataDir);
    const { app, page } = state.session;
    await page.waitForSelector("aside a:has-text('Generate')", { timeout: 20_000 });

    // ---- Reopen the failed job from Past Generate Jobs ----
    await page.click("aside a:has-text('Generate')");
    await page.waitForSelector("text=Past Generate Jobs", { timeout: 20_000 });
    const jobRow = page.locator("tbody tr", { hasText: "LOA" });
    await jobRow.getByRole("button", { name: "Reopen" }).click();
    // The results banner reports the failure, and the failure list names
    // the recipient with her error.
    await page.waitForSelector("text=1 generated, 1 failed", { timeout: 20_000 });
    // The failure list names the recipient and her error (the row also
    // carries her email between them).
    await page.waitForSelector("text=Sari Putri", { timeout: 20_000 });
    await page.waitForSelector("text=Recipient no longer exists in the database.", {
      timeout: 20_000,
    });
    // The surviving recipient still spot-checks and re-downloads.
    await page.waitForSelector("text=LOA_budi_santoso.pdf", { timeout: 20_000 });
    const savedDir = join(state.userDataDir, "re-downloaded-fail");
    mkdirSync(savedDir, { recursive: true });
    const savedPdfPath = join(savedDir, "LOA_budi_santoso.pdf");
    await app.evaluate(({ dialog }, path) => {
      dialog.showSaveDialog = async () => ({ canceled: false, filePath: path });
    }, savedPdfPath);
    await page.getByRole("button", { name: "Save PDF" }).click();
    await waitFor(() => existsSync(savedPdfPath), {
      timeoutMs: 20_000,
      label: "re-downloaded PDF from the failed job",
    });

    expect(
      state.session.errors,
      `renderer console errors:\n${state.session.errors.join("\n")}`,
    ).toEqual([]);
  });
});

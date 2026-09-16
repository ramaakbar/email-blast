import { readdirSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  fillWorkspaceMessage,
  fillWorkspaceSmtp,
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
 * Seam B happy path (ticket 18, re-routed through the workspaces in
 * ticket 07): import a fixture spreadsheet through the import page, walk
 * the Generate workspace (recipients -> template -> generate), jump to
 * the Send workspace through "Send these", send against the local SMTP
 * capture server, and verify the sent rows land in Logs with
 * per-recipient outcomes. Everything a Layer-seam test cannot see: the
 * IPC surface, the preload bridge, and the workspace wiring.
 */

describe("Seam B: happy path through the real window", () => {
  const state: E2ECleanupState = { session: null, smtp: null, userDataDir: "" };
  registerE2ECleanup(state);

  it("imports, generates, sends, and lands the outcomes in Logs", async () => {
    state.userDataDir = freshUserDataDir("eb-happy-");
    state.smtp = await startSmtpCapture();
    const smtp = state.smtp;
    // The first launch lets the app create the schema and seed defaults.
    await firstLaunchCreatesSchema(state.userDataDir);

    // Fixtures and dirs: the spreadsheet to import, the DOCX template the
    // generate pipeline fills, and the output dir the PDFs land in.
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

    state.session = await launchApp(state.userDataDir);
    const { app, page } = state.session;
    // The seeded profile skips the welcome screen; the app shell renders.
    await page.waitForSelector("aside a:has-text('Import')", { timeout: 20_000 });

    // ---- Import ----
    // The done-screen CTA lands on the Generate workspace.
    await importFixtureSpreadsheet(app, page, xlsxPath);

    // ---- Generate workspace: recipients + template ----
    await page.waitForSelector('input[aria-label="Select all on this page"]', { timeout: 20_000 });
    await page.getByRole("checkbox", { name: "Select all on this page" }).check();
    await page.waitForSelector("text=4 selected · 4 matching");
    await page.getByLabel("Letter or certificate template").selectOption({ label: "LOA" });
    await page.waitForSelector(
      "text=All 4 selected recipients have data for every required slot.",
    );
    await page.getByRole("button", { name: "Generate PDFs" }).click();
    await page.waitForSelector("text=All 4 PDFs generated.", { timeout: 60_000 });
    // The PDFs land in the seeded output dir, named by the output pattern.
    const pdfNames = readdirSync(outputDir).toSorted();
    expect(pdfNames).toEqual([
      "LOA_andi_wijaya.pdf",
      "LOA_budi_santoso.pdf",
      "LOA_dewi_lestari.pdf",
      "LOA_sari_putri.pdf",
    ]);

    // ---- Send workspace: "Send these" pre-links the job ----
    await page.getByRole("button", { name: "Send these" }).click();
    await page.waitForSelector("text=4 selected · 4 matching", { timeout: 20_000 });

    // ---- Message + inline SMTP against the capture server ----
    const subject = "Undangan Rapat Yayasan";
    await fillWorkspaceMessage(page, {
      subject,
      bodyHtml: "<p>Dear {name}, from {instansi}, you are invited.</p>",
    });
    await fillWorkspaceSmtp(page, smtp.port);

    // ---- Send ----
    await page.getByRole("button", { name: "Send 4 emails" }).click();
    await page.waitForSelector("text=All 4 emails sent.", { timeout: 60_000 });
    // Every recipient's mail landed on the capture server, personalized.
    expect(smtp.captured).toHaveLength(4);
    const byAddress = new Map(smtp.captured.map((mail) => [mail.to, mail]));
    await Promise.all(
      FIXTURE_RECIPIENTS.map((recipient) => {
        const mail = byAddress.get(recipient.email);
        expect(mail).toBeDefined();
        expect(mail?.from).toBe("iym@example.org");
        expect(mail?.raw).toContain(`Subject: ${subject}`);
        expect(mail?.raw).toContain(`Dear ${recipient.name}`);
        expect(mail?.raw).toContain(recipient.instansi);
        // The attachment lands named by the template's output pattern.
        expect(mail?.raw).toContain(
          `LOA_${recipient.name.toLowerCase().replace(/\s+/g, "_")}.pdf`,
        );
      }),
    );

    // ---- Logs ----
    await page.click("aside a:has-text('Logs')");
    const row = page.locator("tbody tr", { hasText: subject });
    await row.getByText("Completed", { exact: true }).waitFor({ timeout: 20_000 });
    await row.click();
    // The job detail confirms the per-recipient outcomes: all four sent.
    await page.waitForSelector("text=4 sent · 0 failed · 0 skipped", { timeout: 20_000 });
    await Promise.all(
      FIXTURE_RECIPIENTS.map((recipient) =>
        page.waitForSelector(`tbody tr:has-text('${recipient.name}') td:has-text('Sent')`),
      ),
    );

    expect(state.session.errors, `renderer console errors:\n${state.session.errors.join("\n")}`).toEqual(
      [],
    );
  });
});

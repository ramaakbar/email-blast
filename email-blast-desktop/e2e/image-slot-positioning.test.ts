import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { PDFDocument, StandardFonts } from "pdf-lib";
import {
  fillInlineSmtpStep,
  fillMessageStep,
  firstLaunchCreatesSchema,
  freshUserDataDir,
  importFixtureSpreadsheet,
  launchApp,
  registerE2ECleanup,
  seedDatabase,
  startSmtpCapture,
  type E2ECleanupState,
} from "./harness";
import {
  FIXTURE_RECIPIENTS,
  writeFixtureImageTemplate,
  writeFixtureSpreadsheet,
} from "./fixtures";
import { pageDrawOps } from "../src/main/services/test-helpers";

/**
 * Seam B for ticket 04: image slot text positioning. The scenario
 * registers an image template through the real Templates screen, opens
 * the position editor, sets coordinates, sizes, colors, and alignments
 * through the numeric controls, saves the template, generates certificates
 * through the wizard, and verifies the output PDF draws the slot text at
 * exactly the configured positions - the full editor -> persistence ->
 * rendering loop the layer seams cannot see.
 */

describe("Seam B: image slot positioning (ticket 04)", () => {
  const state: E2ECleanupState = { session: null, smtp: null, userDataDir: "" };
  registerE2ECleanup(state);

  it("positions slots in the editor, persists the layout, and renders the PDF at those coordinates", async () => {
    state.userDataDir = freshUserDataDir("eb-slot-positioning-");
    state.smtp = await startSmtpCapture();
    const smtp = state.smtp;
    await firstLaunchCreatesSchema(state.userDataDir);

    const fixturesDir = join(state.userDataDir, "fixtures");
    mkdirSync(fixturesDir, { recursive: true });
    const xlsxPath = join(fixturesDir, "recipients.xlsx");
    writeFixtureSpreadsheet(xlsxPath, FIXTURE_RECIPIENTS);
    const templatesDir = join(state.userDataDir, "templates");
    const outputDir = join(state.userDataDir, "output");
    mkdirSync(templatesDir, { recursive: true });
    const pngPath = writeFixtureImageTemplate(templatesDir);
    seedDatabase(state.userDataDir, { settings: { templatesDir, outputDir } });

    state.session = await launchApp(state.userDataDir);
    const { app, page } = state.session;
    await page.waitForSelector("aside a:has-text('Import')", { timeout: 20_000 });
    await importFixtureSpreadsheet(app, page, xlsxPath);

    // ---- Register the image template through the UI ----
    await page.click("aside a:has-text('Templates')");
    // The Add flow calls the native template picker; answer it with the fixture.
    await app.evaluate(({ dialog }, path) => {
      dialog.showOpenDialog = async () => ({ canceled: false, filePaths: [path] });
    }, pngPath);
    await page.getByRole("button", { name: "Add template" }).first().click();
    // Image templates start with no slot rows (DOCX auto-scans); add them.
    await page.getByRole("button", { name: "Add slot" }).click();
    await page.getByRole("textbox", { name: "Slot 1" }).fill("name");
    await page.getByRole("button", { name: "Add slot" }).click();
    await page.getByRole("textbox", { name: "Slot 2" }).fill("instansi");
    await page.getByLabel("Output pattern").fill("SERTIFIKAT_{name}.pdf");

    // ---- Position the slots: numeric controls, with the preview in sync ----
    await page.getByRole("button", { name: "Position text on image" }).click();
    const editor = page.locator("[data-slot-editor]");
    await editor.waitFor({ timeout: 20_000 });
    await editor.locator("img").waitFor({ timeout: 20_000 });
    // The first slot is selected by default; the controls drive the box.
    await editor.getByRole("spinbutton", { name: "X", exact: true }).fill("40");
    await editor.getByRole("spinbutton", { name: "Y", exact: true }).fill("140");
    await editor.getByRole("spinbutton", { name: "Font size", exact: true }).fill("36");
    await editor.getByRole("spinbutton", { name: "Max width", exact: true }).fill("150");
    await editor.getByLabel("Color", { exact: true }).fill("#cc0000");
    await editor.getByRole("radio", { name: "Align right" }).click();
    // Switch to the second slot and give it its own layout.
    await editor.locator("aside").getByText("{instansi}", { exact: true }).click();
    await editor.getByRole("spinbutton", { name: "X", exact: true }).fill("20");
    await editor.getByRole("spinbutton", { name: "Y", exact: true }).fill("100");
    await editor.getByRole("spinbutton", { name: "Font size", exact: true }).fill("24");
    await editor.getByRole("radio", { name: "Align left" }).click();
    // The numeric fields stay in sync with the boxes: the box reflects the
    // entered coordinates (scaled to the preview).
    await editor.getByRole("button", { name: "Done" }).click();
    await page.getByRole("button", { name: "Register template" }).click();
    await page.waitForSelector('text=Template "Sertifikat" registered.', { timeout: 20_000 });

    // ---- Compose: generate certificates for the imported recipients ----
    await page.click("aside a:has-text('Compose')");
    await page.waitForSelector('input[aria-label="Select all on this page"]', { timeout: 20_000 });
    await page.getByRole("checkbox", { name: "Select all on this page" }).check();
    await page.waitForSelector("text=4 recipients selected");
    await page.locator("footer").getByRole("button", { name: "Next" }).click();
    await page.getByLabel("Letter or certificate template").selectOption({ label: "Sertifikat" });
    await page.waitForSelector("text=All 4 selected recipients have data for every required slot.");
    await page.locator("footer").getByRole("button", { name: "Next" }).click();
    await fillMessageStep(page, {
      subject: "Sertifikat {name}",
      bodyHtml: "<p>Terlampir.</p>",
    });
    await fillInlineSmtpStep(page, smtp.port);
    await page.getByRole("button", { name: "Generate PDFs" }).click();
    await page.waitForSelector("text=All 4 PDFs generated.", { timeout: 60_000 });

    // ---- The rendered PDF draws the text at the configured coordinates ----
    const pdfBytes = readFileSync(join(outputDir, "SERTIFIKAT_budi_santoso.pdf"));
    const ops = await pageDrawOps(pdfBytes);
    const font = await PDFDocument.create().then((pdf) =>
      pdf.embedFont(StandardFonts.HelveticaBold),
    );

    const nameOp = ops.find((op) => op.text === "Budi Santoso");
    expect(nameOp).toBeDefined();
    // Right-aligned inside the 150px box at x=40, top at y=140, starting
    // at 36pt and auto-shrunk to fit the box.
    const nameWidth = font.widthOfTextAtSize("Budi Santoso", nameOp!.size);
    expect(nameOp!.size).toBeLessThanOrEqual(36);
    expect(nameWidth).toBeLessThanOrEqual(150);
    expect(nameOp!.x).toBeCloseTo(40 + 150 - nameWidth, 1);
    expect(nameOp!.y).toBeCloseTo(200 - 140 - 0.8 * nameOp!.size, 1);
    // #cc0000 -> 0.8 0 0 in PDF color space.
    expect(nameOp!.block).toMatch(/0\.8 0 0 rg/);

    const instansiOp = ops.find((op) => op.text === "Yayasan X");
    expect(instansiOp).toBeDefined();
    expect(instansiOp!.size).toBeLessThanOrEqual(24);
    expect(instansiOp!.x).toBeCloseTo(20, 1);
    expect(instansiOp!.y).toBeCloseTo(200 - 100 - 0.8 * instansiOp!.size, 1);
    // The untouched color stays the editor default #1A2421 (26/36/33).
    const ink = /([\d.]+) ([\d.]+) ([\d.]+) rg/.exec(instansiOp!.block);
    expect(ink).not.toBeNull();
    expect(Number(ink![1])).toBeCloseTo(26 / 255, 3);
    expect(Number(ink![2])).toBeCloseTo(36 / 255, 3);
    expect(Number(ink![3])).toBeCloseTo(33 / 255, 3);

    expect(state.session.errors, `renderer console errors:\n${state.session.errors.join("\n")}`).toEqual(
      [],
    );
  });
});

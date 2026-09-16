import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
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
import { FIXTURE_RECIPIENTS, writeFixtureImageTemplate, writeFixtureSpreadsheet } from "./fixtures";
import { pdfUsedFonts } from "../src/main/services/test-helpers";

/**
 * Seam B for ticket 11: per-slot font faces on image templates. The
 * scenario registers an image template through the real Templates
 * screen, opens the position editor, picks a bundled face for one slot
 * and uploads a fresh font file for another through the add-font flow,
 * saves, generates certificates, and verifies the output PDF embeds
 * BOTH faces - the full editor -> persistence -> upload -> rendering
 * loop, including the packaged app's bundled resources (the fonts ship
 * via electron-builder's extraResources entry, ADR-0010, so a packaging
 * regression fails this test).
 */

describe("Seam B: per-slot font faces (ticket 11)", () => {
  const state: E2ECleanupState = { session: null, smtp: null, userDataDir: "" };
  registerE2ECleanup(state);

  it("configures a bundled face and an uploaded face, generates, and embeds both in the PDF", async () => {
    state.userDataDir = freshUserDataDir("eb-slot-fonts-");
    await firstLaunchCreatesSchema(state.userDataDir);

    const fixturesDir = join(state.userDataDir, "fixtures");
    mkdirSync(fixturesDir, { recursive: true });
    const xlsxPath = join(fixturesDir, "recipients.xlsx");
    writeFixtureSpreadsheet(xlsxPath, FIXTURE_RECIPIENTS);
    // A font the bundled set does NOT contain: the add-font flow uploads
    // it and the picker must show it under its own family name.
    const uploadFontPath = join(fixturesDir, "The Seasons.ttf");
    copyFileSync(
      join(process.cwd(), "..", "fonts", "TheSeasons", "The Seasons.ttf"),
      uploadFontPath,
    );
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
    await app.evaluate(({ dialog }, path) => {
      dialog.showOpenDialog = async () => ({ canceled: false, filePaths: [path] });
    }, pngPath);
    await page.getByRole("button", { name: "Add template" }).first().click();
    await page.getByRole("button", { name: "Add slot" }).click();
    await page.getByRole("textbox", { name: "Slot 1" }).fill("name");
    await page.getByRole("button", { name: "Add slot" }).click();
    await page.getByRole("textbox", { name: "Slot 2" }).fill("instansi");
    await page.getByLabel("Output pattern").fill("SERTIFIKAT_{name}.pdf");

    // ---- The position editor: upload a font, then pick faces per slot ----
    await page.getByRole("button", { name: "Position text on image" }).click();
    const editor = page.locator("[data-slot-editor]");
    await editor.waitFor({ timeout: 20_000 });
    await editor.locator("img").waitFor({ timeout: 20_000 });

    // The add-font flow answers the native picker with the fixture file.
    await app.evaluate(({ dialog }, path) => {
      dialog.showOpenDialog = async () => ({ canceled: false, filePaths: [path] });
    }, uploadFontPath);
    await editor.getByRole("button", { name: "Add font…" }).click();
    await editor
      .getByRole("combobox", { name: "Font face" })
      .locator("option", { hasText: "The Seasons Bold" })
      .waitFor({ state: "attached", timeout: 20_000 });

    // Slot 1 (selected by default): the bundled Great Vibes - the face
    // every install ships, resolved from the packaged resources.
    await editor
      .getByRole("combobox", { name: "Font face" })
      .selectOption({ label: "Great Vibes" });
    await editor.getByRole("spinbutton", { name: "X", exact: true }).fill("10");
    await editor.getByRole("spinbutton", { name: "Y", exact: true }).fill("120");

    // Slot 2: the just-uploaded face.
    await editor.locator("aside").getByText("{instansi}", { exact: true }).click();
    await editor
      .getByRole("combobox", { name: "Font face" })
      .selectOption({ label: "The Seasons Bold" });
    await editor.getByRole("spinbutton", { name: "X", exact: true }).fill("10");
    await editor.getByRole("spinbutton", { name: "Y", exact: true }).fill("80");
    await editor.getByRole("button", { name: "Done" }).click();
    await page.getByRole("button", { name: "Register template" }).click();
    await page.waitForSelector('text=Template "Sertifikat" registered.', { timeout: 20_000 });

    // ---- Generate workspace: certificates for the imported recipients ----
    await page.click("aside a:has-text('Generate')");
    await page.waitForSelector('input[aria-label="Select all on this page"]', { timeout: 20_000 });
    await page.getByRole("checkbox", { name: "Select all on this page" }).check();
    await page.waitForSelector("text=4 selected · 4 matching");
    await page.getByLabel("Letter or certificate template").selectOption({ label: "Sertifikat" });
    await page.waitForSelector("text=All 4 selected recipients have data for every required slot.");
    await page.getByRole("button", { name: "Generate PDFs" }).click();
    await page.waitForSelector("text=All 4 PDFs generated.", { timeout: 60_000 });

    // ---- The PDF embeds both faces: the bundled Great Vibes and the upload ----
    const pdfBytes = readFileSync(join(outputDir, "SERTIFIKAT_budi_santoso.pdf"));
    const draws = await pdfUsedFonts(pdfBytes);
    expect(draws.some((draw) => draw.font.includes("GreatVibes-Regular"))).toBe(true);
    expect(draws.some((draw) => draw.font.includes("TheSeasons-Bd"))).toBe(true);
    // Both slots drew: one draw per slot, each in its own face.
    expect(draws).toHaveLength(2);

    expect(
      state.session.errors,
      `renderer console errors:\n${state.session.errors.join("\n")}`,
    ).toEqual([]);
  });
});

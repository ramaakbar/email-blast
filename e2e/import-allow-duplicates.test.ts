import { mkdirSync } from "node:fs";
import { join } from "node:path";
import type { Page } from "playwright-core";
import { describe, expect, it } from "vitest";
import {
  firstLaunchCreatesSchema,
  freshUserDataDir,
  launchApp,
  registerE2ECleanup,
  seedDatabase,
  type E2ECleanupState,
} from "./harness";
import { writeFixtureSpreadsheet, type FixtureRecipient } from "./fixtures";

/**
 * Seam B for ticket 09 (ADR 0007): the import allow-duplicates escape
 * hatch. A sheet whose four rows all carry one email is the Test Blast
 * shape - with the box off, within-file dedupe keeps a single row and the
 * preview reports the skipped count; with it on, every row imports and
 * the preview warning disappears because the preview is read against the
 * choice. Both scenarios assert the done screen AND the Recipients
 * directory count, so the whole wire path (read -> preview -> commit ->
 * list) is exercised.
 */

/** Four rows sharing one email - the Test Blast shape. */
const DUPLICATE_EMAIL_ROWS: readonly FixtureRecipient[] = [
  { name: "Budi Santoso", email: "test-blast@example.org", phone: "0811", instansi: "Yayasan X" },
  { name: "Sari Putri", email: "test-blast@example.org", phone: "0812", instansi: "Yayasan X" },
  { name: "Andi Wijaya", email: "test-blast@example.org", phone: "0813", instansi: "Sekolah Y" },
  { name: "Dewi Lestari", email: "test-blast@example.org", phone: "0814", instansi: "Sekolah Y" },
];

/** Writes the duplicate-email fixture into the test's userData dir. */
function writeDuplicateEmailFixture(userDataDir: string): string {
  const fixturesDir = join(userDataDir, "fixtures");
  mkdirSync(fixturesDir, { recursive: true });
  const xlsxPath = join(fixturesDir, "duplicates.xlsx");
  writeFixtureSpreadsheet(xlsxPath, DUPLICATE_EMAIL_ROWS);
  return xlsxPath;
}

/** Browses the fixture file on the import page and waits for the preview. */
async function openImportPreview(
  state: E2ECleanupState,
  xlsxPath: string,
): Promise<void> {
  const { app, page } = state.session as NonNullable<E2ECleanupState["session"]>;
  await app.evaluate(({ dialog }, path) => {
    dialog.showOpenDialog = async () => ({ canceled: false, filePaths: [path] });
  }, xlsxPath);
  await page.click("aside a:has-text('Import')");
  await page.getByRole("button", { name: /Browse/ }).click();
  await page.waitForSelector("text=Import recipients", { timeout: 20_000 });
}

/** Commits the preview and waits for the done screen. */
async function commitPreview(page: Page): Promise<void> {
  await page.getByRole("button", { name: "Import recipients" }).click();
  await page.waitForSelector("text=Import complete", { timeout: 20_000 });
}

describe("Seam B: import allow-duplicates (ticket 09)", () => {
  const state: E2ECleanupState = { session: null, smtp: null, userDataDir: "" };
  registerE2ECleanup(state);

  it("keeps one row of a duplicate-email sheet with the box off", async () => {
    state.userDataDir = freshUserDataDir("eb-blast-off-");
    await firstLaunchCreatesSchema(state.userDataDir);
    // The setup gate (libreoffice_checked) is pinned by every seeded run;
    // this scenario needs no seed rows, only the gate open.
    seedDatabase(state.userDataDir, {});
    const xlsxPath = writeDuplicateEmailFixture(state.userDataDir);

    state.session = await launchApp(state.userDataDir);
    await openImportPreview(state, xlsxPath);
    const { page } = state.session;

    // The preview reports the parse-time dedupe: 4 rows, 3 skipped.
    await page.waitForSelector("text=3 duplicates already skipped during parsing.", {
      timeout: 20_000,
    });

    await commitPreview(page);
    await page.waitForSelector("text=/Imported 1 recipients from .* 3 duplicates skipped/", {
      timeout: 20_000,
    });

    await page.locator("text=Go to Recipients").first().click();
    await page.waitForSelector("text=1 recipient in the directory", { timeout: 20_000 });
  });

  it("imports every row of a duplicate-email sheet with the box on", async () => {
    state.userDataDir = freshUserDataDir("eb-blast-on-");
    await firstLaunchCreatesSchema(state.userDataDir);
    seedDatabase(state.userDataDir, {});
    const xlsxPath = writeDuplicateEmailFixture(state.userDataDir);

    state.session = await launchApp(state.userDataDir);
    await openImportPreview(state, xlsxPath);
    const { page } = state.session;

    // The default-off preview warns about the duplicates.
    await page.waitForSelector("text=3 duplicates already skipped during parsing.", {
      timeout: 20_000,
    });

    // A mapping override must survive the re-read the toggle triggers.
    await page.getByLabel('Role of the "Instansi" column').selectOption({ label: "Skip" });

    // Toggle the escape hatch: the preview re-reads against the choice and
    // the warning disappears because nothing will be skipped.
    await page.getByLabel("Allow duplicate emails").check();
    await page.waitForSelector("text=Import recipients", { timeout: 20_000 });
    expect(await page.getByText(/duplicates already skipped during parsing/).count()).toBe(0);
    // The column-mapping override came back with the re-read.
    expect(
      await page.getByLabel('Role of the "Instansi" column').inputValue(),
    ).toBe("skip");

    await commitPreview(page);
    await page.waitForSelector("text=/Imported 4 recipients from .* 0 duplicates skipped/", {
      timeout: 20_000,
    });

    await page.locator("text=Go to Recipients").first().click();
    await page.waitForSelector("text=4 recipients in the directory", { timeout: 20_000 });
  });
});

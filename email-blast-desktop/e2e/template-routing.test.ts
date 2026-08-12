import { mkdirSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { Page } from "playwright-core";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
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
import {
  FIXTURE_ROUTED_RECIPIENTS,
  FIXTURE_ROUTED_RECIPIENTS_UNASSIGNED,
  writeFixtureTemplate,
  writeRoutedFixtureSpreadsheet,
  type RoutedFixtureRecipient,
} from "./fixtures";

/**
 * Seam B for ticket 08: the Template Assignment. The first scenario
 * proves the routing end to end - the imported "Template" column is
 * auto-suggested as the routing key, the Generate workspace assigns each
 * distinct value to a template with a default covering blank values, and
 * ONE job produces correctly routed PDFs (LOA letters carry the
 * instansi slot, SK letters do not) named by the job's shared pattern in
 * one output batch. The second scenario covers the fail-fast rule:
 * an unassigned value blocks generation with the affected recipient
 * listed by name, no file is produced, and assigning the value lets the
 * same job complete.
 */

async function seedRoutingWorkspace(
  state: E2ECleanupState,
  recipients: readonly RoutedFixtureRecipient[],
): Promise<{ xlsxPath: string; outputDir: string }> {
  const fixturesDir = join(state.userDataDir, "fixtures");
  mkdirSync(fixturesDir, { recursive: true });
  const xlsxPath = join(fixturesDir, "routed.xlsx");
  writeRoutedFixtureSpreadsheet(xlsxPath, recipients);
  const templatesDir = join(state.userDataDir, "templates");
  const outputDir = join(state.userDataDir, "output");
  mkdirSync(templatesDir, { recursive: true });
  // Two variants: LOA declares {name, instansi}, SK declares only {name}.
  const loaPath = writeFixtureTemplate(templatesDir, ["name", "instansi"], "LOA");
  const skPath = writeFixtureTemplate(templatesDir, ["name"], "SK");
  seedDatabase(state.userDataDir, {
    settings: { templatesDir, outputDir },
    template: {
      id: "tpl-loa",
      name: "LOA",
      filePath: loaPath,
      slots: ["name", "instansi"],
      outputPattern: "LOA_{name}.pdf",
    },
    extraTemplates: [
      {
        id: "tpl-sk",
        name: "SK",
        filePath: skPath,
        slots: ["name"],
        outputPattern: "SK_{name}.pdf",
      },
    ],
  });
  return { xlsxPath, outputDir };
}

/**
 * The first page's extracted text of a LibreOffice-converted PDF (the
 * same engine the app converts with) - the routing assertions read the
 * filled slot values out of the produced files.
 */
async function pdfText(pdfPath: string): Promise<string> {
  const loadingTask = getDocument({ data: new Uint8Array(readFileSync(pdfPath)) });
  const doc = await loadingTask.promise;
  try {
    const page = await doc.getPage(1);
    const content = await page.getTextContent();
    return content.items.map((item) => ("str" in item ? item.str : "")).join(" ");
  } finally {
    await loadingTask.destroy();
  }
}

/** The Generate workspace's shared setup: select all recipients, default template, routing column. */
async function startRoutedWorkspace(page: Page, expectedSelected: number): Promise<void> {
  await page.getByRole("checkbox", { name: "Select all on this page" }).check();
  await page.waitForSelector(`text=${expectedSelected} selected · ${expectedSelected} matching`);
  await page.getByLabel("Letter or certificate template").selectOption({ label: "LOA" });
  // The import auto-suggested the template column as the routing key
  // (the fixture's header is "template"); the workspace shows it as the
  // suggested option and the user confirms.
  await page.getByLabel("Route by column").selectOption({ label: "template (suggested)" });
  await page.waitForSelector("text=Assign each value to a template", { timeout: 20_000 });
}

describe("Seam B: Template Assignment routing (ticket 08)", () => {
  const state: E2ECleanupState = { session: null, smtp: null, userDataDir: "" };
  registerE2ECleanup(state);

  it("routes two variants through one job, named by the shared pattern, into one output batch", async () => {
    state.userDataDir = freshUserDataDir("eb-routing-");
    await firstLaunchCreatesSchema(state.userDataDir);
    const { xlsxPath, outputDir } = await seedRoutingWorkspace(state, FIXTURE_ROUTED_RECIPIENTS);

    state.session = await launchApp(state.userDataDir);
    const { app, page } = state.session;
    await page.waitForSelector("aside a:has-text('Import')", { timeout: 20_000 });

    await importFixtureSpreadsheet(app, page, xlsxPath);

    // ---- The Generate workspace: recipients, default template, routing ----
    await startRoutedWorkspace(page, 4);
    // The assignment UI lists the distinct values found in the data.
    await page.waitForSelector('select[aria-label="Template for \\"LOA\\""]', { timeout: 20_000 });
    await page.waitForSelector('select[aria-label="Template for \\"SK\\""]', { timeout: 20_000 });
    // Unassigned values block generation until every value has a template.
    expect(await page.getByRole("button", { name: "Generate PDFs" }).isDisabled()).toBe(true);
    await page.getByLabel('Template for "LOA"').selectOption({ label: "LOA" });
    await page.getByLabel('Template for "SK"').selectOption({ label: "SK" });
    await page.waitForSelector("text=Every template-column value is assigned to a template.", {
      timeout: 20_000,
    });
    // The default template (blank values) and the assigned variant show
    // their routed coverage.
    await page.waitForSelector(
      "text=All 1 recipients routed to this template have data for every required slot.",
      { timeout: 20_000 },
    );

    // ---- The job's shared output pattern ----
    const patternInput = page.getByLabel("Output naming pattern (shared by all templates)");
    await patternInput.fill("BATCH_{name}.pdf");
    expect(await page.getByRole("button", { name: "Generate PDFs" }).isDisabled()).toBe(false);

    // ---- Generate: one batch, correctly routed PDFs ----
    await page.getByRole("button", { name: "Generate PDFs" }).click();
    await page.waitForSelector("text=All 4 PDFs generated.", { timeout: 60_000 });
    expect(readdirSync(outputDir).toSorted()).toEqual([
      "BATCH_andi_wijaya.pdf",
      "BATCH_budi_santoso.pdf",
      "BATCH_dewi_lestari.pdf",
      "BATCH_sari_putri.pdf",
    ]);
    // The fill content proves the routing: LOA recipients carry the
    // instansi slot, the SK recipient's letter does not, and the blank
    // value landed on the default (LOA) template.
    const textOf = (name: string): Promise<string> => pdfText(join(outputDir, name));
    expect(await textOf("BATCH_budi_santoso.pdf")).toContain("Yayasan X");
    expect(await textOf("BATCH_sari_putri.pdf")).toContain("Yayasan X");
    expect(await textOf("BATCH_andi_wijaya.pdf")).toContain("Andi Wijaya");
    expect(await textOf("BATCH_andi_wijaya.pdf")).not.toContain("Sekolah Y");
    expect(await textOf("BATCH_dewi_lestari.pdf")).toContain("SMA Z");

    // No failed recipients: the results banner reports all generated and
    // no failure list renders.
    expect(await page.getByText("Failed recipients", { exact: false }).count()).toBe(0);

    expect(
      state.session.errors,
      `renderer console errors:\n${state.session.errors.join("\n")}`,
    ).toEqual([]);
  });

  it("fails fast with the affected recipient listed, then completes once the value is assigned", async () => {
    state.userDataDir = freshUserDataDir("eb-routing-failfast-");
    await firstLaunchCreatesSchema(state.userDataDir);
    const { xlsxPath, outputDir } = await seedRoutingWorkspace(
      state,
      FIXTURE_ROUTED_RECIPIENTS_UNASSIGNED,
    );

    state.session = await launchApp(state.userDataDir);
    const { app, page } = state.session;
    await page.waitForSelector("aside a:has-text('Import')", { timeout: 20_000 });

    await importFixtureSpreadsheet(app, page, xlsxPath);
    await startRoutedWorkspace(page, 5);

    // Assign LOA and SK but leave PIAGAM unassigned.
    await page.getByLabel('Template for "LOA"').selectOption({ label: "LOA" });
    await page.getByLabel('Template for "SK"').selectOption({ label: "SK" });
    await page
      .getByLabel("Output naming pattern (shared by all templates)")
      .fill("BATCH_{name}.pdf");
    // Fail fast: the warning names the affected recipient, and the start
    // action is blocked - no partial or wrong-template output.
    await page.waitForSelector(
      "text=1 recipient has a template-column value that is not assigned to any template.",
      {
        timeout: 20_000,
      },
    );
    await page.waitForSelector('text="PIAGAM" - 1 recipient: Fauziah Zahra', { timeout: 20_000 });
    expect(await page.getByRole("button", { name: "Generate PDFs" }).isDisabled()).toBe(true);
    expect(readdirSync(outputDir)).toEqual([]);

    // Assigning the remaining value unblocks the same job.
    await page.getByLabel('Template for "PIAGAM"').selectOption({ label: "SK" });
    await page.waitForSelector("text=Every template-column value is assigned to a template.", {
      timeout: 20_000,
    });
    await page.getByRole("button", { name: "Generate PDFs" }).click();
    await page.waitForSelector("text=All 5 PDFs generated.", { timeout: 60_000 });
    expect(readdirSync(outputDir).toSorted()).toEqual([
      "BATCH_andi_wijaya.pdf",
      "BATCH_budi_santoso.pdf",
      "BATCH_dewi_lestari.pdf",
      "BATCH_fauziah_zahra.pdf",
      "BATCH_sari_putri.pdf",
    ]);

    expect(
      state.session.errors,
      `renderer console errors:\n${state.session.errors.join("\n")}`,
    ).toEqual([]);
  });
});

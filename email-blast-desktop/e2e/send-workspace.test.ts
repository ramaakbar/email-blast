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
  startSmtpCapture,
  type E2ECleanupState,
} from "./harness";
import { FIXTURE_RECIPIENTS, writeFixtureSpreadsheet, writeFixtureTemplate } from "./fixtures";

/**
 * Seam B for ticket 06: the Send workspace. Scenario 1 covers the
 * "Send these" pre-link end to end - from Generate results the workspace
 * opens pre-linked to the job with its generated recipients selected, the
 * attachment filter and search narrow to a subset, and the send lands on
 * the SMTP capture server with the PDFs attached. Scenario 2 covers the
 * flagged failed-generate recipient: she is sendable, and her email goes
 * out without the attachment while the generated recipients keep theirs.
 * Scenario 3 covers the plain no-attachment send from the imported list.
 */

/** Fills the workspace's message editor (no wizard footer involved). */
async function fillWorkspaceMessage(
  page: import("playwright-core").Page,
  message: { readonly subject: string; readonly bodyHtml: string },
): Promise<void> {
  await page.getByLabel("Subject").fill(message.subject);
  await page.getByLabel(/HTML body/).fill(message.bodyHtml);
}

/** Fills the workspace's SMTP step in inline mode against the capture server. */
async function fillWorkspaceSmtp(
  page: import("playwright-core").Page,
  port: number,
): Promise<void> {
  await page.getByRole("button", { name: "Enter details (this job only)" }).click();
  await page.getByLabel("Host").fill("127.0.0.1");
  await page.getByLabel("Port (465 = implicit TLS, else STARTTLS)").fill(String(port));
  await page.getByLabel("Username (email address)").fill("me");
  await page.getByLabel("App password").fill("secret");
  await page.getByLabel("Sender name").fill("Yayasan X");
  await page.getByLabel("Sender address").fill("iym@example.org");
  await page.getByRole("button", { name: "Test Connection" }).click();
  await page.waitForSelector("text=Connected - the server accepted these credentials.", {
    timeout: 20_000,
  });
}

/** Seeds the workspace state shared by the job-send scenarios. */
async function seedJobSend(state: E2ECleanupState): Promise<{ outputDir: string }> {
  const templatesDir = join(state.userDataDir, "templates");
  const outputDir = join(state.userDataDir, "output");
  mkdirSync(templatesDir, { recursive: true });
  mkdirSync(outputDir, { recursive: true });
  const docxPath = writeFixtureTemplate(templatesDir);
  seedDatabase(state.userDataDir, {
    settings: { templatesDir, outputDir, rateLimitDelayMs: 50 },
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
      {
        id: "r-andi",
        name: "Andi Wijaya",
        email: "andi@example.com",
        metadata: { instansi: "Yayasan X" },
      },
      {
        id: "r-dewi",
        name: "Dewi Lestari",
        email: "dewi@example.com",
        metadata: { instansi: "Yayasan X" },
      },
    ],
    generateJob: {
      id: "gj-send",
      templateId: "tpl-loa",
      outputs: [
        { recipientId: "r-budi", outputPath: join(outputDir, "LOA_budi_santoso.pdf") },
        { recipientId: "r-sari", outputPath: join(outputDir, "LOA_sari_putri.pdf") },
        { recipientId: "r-andi", outputPath: join(outputDir, "LOA_andi_wijaya.pdf") },
        { recipientId: "r-dewi", outputPath: join(outputDir, "LOA_dewi_lestari.pdf") },
      ],
    },
  });
  return { outputDir };
}

describe("Seam B: Send workspace (ticket 06)", () => {
  const state: E2ECleanupState = { session: null, smtp: null, userDataDir: "" };
  registerE2ECleanup(state);

  it('"Send these" from Generate results pre-links the job, filters to a subset, and sends with attachments', async () => {
    state.userDataDir = freshUserDataDir("eb-send-workspace-");
    state.smtp = await startSmtpCapture();
    const smtp = state.smtp;
    await firstLaunchCreatesSchema(state.userDataDir);
    await seedJobSend(state);

    state.session = await launchApp(state.userDataDir);
    const { page } = state.session;
    await page.waitForSelector("aside a:has-text('Generate')", { timeout: 20_000 });

    // ---- Generate results: reopen the past job and hit "Send these" ----
    await page.click("aside a:has-text('Generate')");
    await page.waitForSelector("text=Past Generate Jobs", { timeout: 20_000 });
    const jobRow = page.locator("tbody tr", { hasText: "LOA" });
    await jobRow.getByRole("button", { name: "Reopen" }).click();
    const reopenedSection = page.locator("section", { hasText: "Job Results" });
    await reopenedSection.getByRole("button", { name: "Send these" }).click();

    // ---- The workspace opens pre-linked: job picked, recipients listed ----
    await page.waitForSelector("text=Recipients of this job", { timeout: 20_000 });
    // The job picker holds the pre-linked job.
    const jobSelect = page.getByLabel("Choose a Generate Job…");
    await jobSelect.waitFor({ timeout: 20_000 });
    expect(await jobSelect.inputValue()).toBe("gj-send");
    // All four generated recipients are pre-selected.
    await page.waitForSelector("text=4 selected · 4 matching", { timeout: 20_000 });
    // The pre-flight summary shows the attachment split.
    await page.waitForSelector("text=4 with PDF · 0 without", { timeout: 20_000 });

    // ---- The attachment filter narrows the table ----
    await page.getByLabel("Filter by attachment").selectOption("without");
    await page.waitForSelector("text=No recipients match this filter", { timeout: 20_000 });
    await page.getByLabel("Filter by attachment").selectOption("with");
    await page.waitForSelector("text=4 with PDF · 0 without", { timeout: 20_000 });
    await page.getByLabel("Filter by attachment").selectOption("all");

    // ---- Subset: search + select-all-matching narrows to one recipient ----
    await page.getByLabel("Search recipients").fill("sari");
    await page.getByRole("button", { name: "Select all 1" }).click();
    await page.waitForSelector("text=1 selected · 1 matching", { timeout: 20_000 });
    await page.getByLabel("Search recipients").fill("");
    await page.waitForSelector("text=1 selected · 4 matching", { timeout: 20_000 });

    // ---- Message + inline SMTP against the capture server ----
    const subject = "Undangan Rapat Yayasan";
    await fillWorkspaceMessage(page, {
      subject,
      bodyHtml: "<p>Dear {name}, from {instansi}, you are invited.</p>",
    });
    await fillWorkspaceSmtp(page, smtp.port);

    // The send section's summary mirrors the selection: one recipient,
    // one with attachment.
    await page.waitForSelector("text=1 with PDF · 0 without", { timeout: 20_000 });

    // ---- Send ----
    await page.getByRole("button", { name: "Send 1 email" }).click();
    await page.waitForSelector("text=All 1 emails sent.", { timeout: 60_000 });

    expect(smtp.captured).toHaveLength(1);
    const mail = smtp.captured[0];
    expect(mail.to).toBe("sari@example.com");
    expect(mail.raw).toContain(`Subject: ${subject}`);
    expect(mail.raw).toContain("Dear Sari Putri");
    // The attachment lands named by the template's output pattern.
    expect(mail.raw).toContain("LOA_sari_putri.pdf");

    expect(
      state.session.errors,
      `renderer console errors:\n${state.session.errors.join("\n")}`,
    ).toEqual([]);
  });

  it("flags a failed-generate recipient as sendable without the attachment", async () => {
    state.userDataDir = freshUserDataDir("eb-send-workspace-fail-");
    state.smtp = await startSmtpCapture();
    const smtp = state.smtp;
    await firstLaunchCreatesSchema(state.userDataDir);

    // Seed: one generate job where Budi and Sari generated, Andi failed.
    const templatesDir = join(state.userDataDir, "templates");
    const outputDir = join(state.userDataDir, "output");
    mkdirSync(templatesDir, { recursive: true });
    mkdirSync(outputDir, { recursive: true });
    const docxPath = writeFixtureTemplate(templatesDir);
    seedDatabase(state.userDataDir, {
      settings: { templatesDir, outputDir, rateLimitDelayMs: 50 },
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
        {
          id: "r-andi",
          name: "Andi Wijaya",
          email: "andi@example.com",
          metadata: { instansi: "Yayasan X" },
        },
      ],
      generateJob: {
        id: "gj-partial",
        templateId: "tpl-loa",
        outputs: [
          { recipientId: "r-budi", outputPath: join(outputDir, "LOA_budi_santoso.pdf") },
          { recipientId: "r-sari", outputPath: join(outputDir, "LOA_sari_putri.pdf") },
        ],
        failures: [{ recipientId: "r-andi", errorMessage: 'Missing data for slot "instansi".' }],
      },
    });

    state.session = await launchApp(state.userDataDir);
    const { page } = state.session;
    await page.waitForSelector("aside a:has-text('Send')", { timeout: 20_000 });

    // ---- Pick the job in the Send workspace ----
    await page.click("aside a:has-text('Send')");
    await page.getByLabel("Choose a Generate Job…").selectOption("gj-partial");
    await page.waitForSelector("text=Recipients of this job", { timeout: 20_000 });
    // The failed recipient is flagged with the attachment-less status.
    await page.waitForSelector(
      '[title="Generation failed - the message goes out without the PDF"]',
      { timeout: 20_000 },
    );
    // The attachment filter isolates exactly the attachment-less row.
    await page.getByLabel("Filter by attachment").selectOption("without");
    await page.waitForSelector("text=0 selected · 1 matching", { timeout: 20_000 });
    await page.getByRole("button", { name: "Select all 1" }).click();
    await page.waitForSelector("text=1 selected · 1 matching", { timeout: 20_000 });
    await page.getByLabel("Filter by attachment").selectOption("all");
    await page.waitForSelector("text=1 selected · 3 matching", { timeout: 20_000 });

    // ---- Select everyone: 2 with PDFs, 1 without ----
    await page.getByRole("checkbox", { name: "Select all on this page" }).check();
    await page.waitForSelector("text=3 selected · 3 matching", { timeout: 20_000 });
    await page.waitForSelector("text=2 with PDF · 1 without", { timeout: 20_000 });

    const subject = "Notifikasi Beasiswa";
    await fillWorkspaceMessage(page, {
      subject,
      bodyHtml: "<p>Dear {name}, your letter is ready.</p>",
    });
    await fillWorkspaceSmtp(page, smtp.port);

    await page.getByRole("button", { name: "Send 3 emails" }).click();
    await page.waitForSelector("text=All 3 emails sent.", { timeout: 60_000 });

    // Every recipient reached the server; the failed-generate recipient's
    // mail goes out WITHOUT the PDF, the generated ones keep theirs.
    expect(smtp.captured).toHaveLength(3);
    const byAddress = new Map(smtp.captured.map((mail) => [mail.to, mail]));
    expect(byAddress.get("budi@example.com")?.raw).toContain("LOA_budi_santoso.pdf");
    expect(byAddress.get("sari@example.com")?.raw).toContain("LOA_sari_putri.pdf");
    expect(byAddress.get("andi@example.com")?.raw).not.toContain("LOA_");
    expect(byAddress.get("andi@example.com")?.raw).toContain("Dear Andi Wijaya");

    expect(
      state.session.errors,
      `renderer console errors:\n${state.session.errors.join("\n")}`,
    ).toEqual([]);
  });

  it("sends a plain no-attachment message to recipients picked from the imported list", async () => {
    state.userDataDir = freshUserDataDir("eb-send-workspace-plain-");
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
    const docxPath = writeFixtureTemplate(templatesDir);
    seedDatabase(state.userDataDir, {
      settings: { templatesDir, outputDir, rateLimitDelayMs: 50 },
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
    await page.waitForSelector("aside a:has-text('Import')", { timeout: 20_000 });

    // Import the fixture spreadsheet (the helper lands on the old wizard,
    // which still exists until ticket 07 - then go to the Send workspace).
    await importFixtureSpreadsheet(app, page, xlsxPath);
    await page.click("aside a:has-text('Send')");

    // ---- Plain source: the imported list, no generate job anywhere ----
    await page.getByRole("button", { name: "From the imported list" }).click();
    await page.waitForSelector('input[aria-label="Select all on this page"]', { timeout: 20_000 });
    await page.getByRole("checkbox", { name: "Select all on this page" }).check();
    await page.waitForSelector("text=4 selected · 4 matching", { timeout: 20_000 });
    // No attachments exist for a plain send: the summary says so.
    await page.waitForSelector("text=0 with PDF · 4 without", { timeout: 20_000 });

    const subject = "Pengumuman Libur Nasional";
    await fillWorkspaceMessage(page, {
      subject,
      bodyHtml: "<p>Dear {name}, a friendly reminder from {instansi}.</p>",
    });
    await fillWorkspaceSmtp(page, smtp.port);

    await page.getByRole("button", { name: "Send 4 emails" }).click();
    await page.waitForSelector("text=All 4 emails sent.", { timeout: 60_000 });

    // Four plain messages, personalized, none carrying an attachment.
    expect(smtp.captured).toHaveLength(4);
    const byAddress = new Map(smtp.captured.map((mail) => [mail.to, mail]));
    await Promise.all(
      FIXTURE_RECIPIENTS.map((recipient) => {
        const mail = byAddress.get(recipient.email);
        expect(mail).toBeDefined();
        expect(mail?.raw).toContain(`Subject: ${subject}`);
        expect(mail?.raw).toContain(`Dear ${recipient.name}`);
        expect(mail?.raw).not.toContain("LOA_");
      }),
    );

    expect(
      state.session.errors,
      `renderer console errors:\n${state.session.errors.join("\n")}`,
    ).toEqual([]);
  });
});

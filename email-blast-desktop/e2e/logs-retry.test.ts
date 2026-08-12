import { mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  firstLaunchCreatesSchema,
  freshUserDataDir,
  launchApp,
  registerE2ECleanup,
  seedDatabase,
  startSmtpCapture,
  type E2ECleanupState,
} from "./harness";
import { writeFixtureTemplate } from "./fixtures";

/**
 * Seam B for ticket 07: the workspaces are the only paths - the old
 * Compose wizard is gone. Scenario 1 covers retry-from-Logs for a Send
 * Job: the per-recipient Retry and Retry All Failures both open the Send
 * workspace pre-filled with the failed recipients, the job's message, and
 * its SMTP identity (the inline password re-entered, as today), and the
 * re-send delivers. Scenario 2 covers retry-from-history for a Generate
 * Job: the Past Jobs Retry action pre-fills the Generate workspace with
 * the job's recipients and template, and the re-run generates every PDF.
 */

const RETRY_SUBJECT = "Undangan Retry";

async function seedSendRetry(state: E2ECleanupState): Promise<{ outputDir: string }> {
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
      id: "gj-retry",
      templateId: "tpl-loa",
      outputs: [
        { recipientId: "r-budi", outputPath: join(outputDir, "LOA_budi_santoso.pdf") },
        { recipientId: "r-sari", outputPath: join(outputDir, "LOA_sari_putri.pdf") },
        { recipientId: "r-andi", outputPath: join(outputDir, "LOA_andi_wijaya.pdf") },
      ],
    },
    sendJobs: [
      {
        id: "sj-retry",
        generateJobId: "gj-retry",
        status: "completed",
        subject: RETRY_SUBJECT,
        cursorIndex: 3,
        recipients: [
          { recipientId: "r-budi", status: "sent", messageId: "msg-budi" },
          { recipientId: "r-sari", status: "failed", errorMessage: "421 temporary failure" },
          { recipientId: "r-andi", status: "failed", errorMessage: "421 temporary failure" },
        ],
      },
    ],
    smtpPort: state.smtp!.port,
  });
  return { outputDir };
}

describe("Seam B: retry-from-Logs pre-fills the workspaces (ticket 07)", () => {
  const state: E2ECleanupState = { session: null, smtp: null, userDataDir: "" };
  registerE2ECleanup(state);

  it("retries a Send Job's failed recipients in the Send workspace, prefilled", async () => {
    state.userDataDir = freshUserDataDir("eb-logs-retry-");
    state.smtp = await startSmtpCapture();
    const smtp = state.smtp;
    await firstLaunchCreatesSchema(state.userDataDir);
    await seedSendRetry(state);

    state.session = await launchApp(state.userDataDir);
    const { page } = state.session;
    await page.waitForSelector("aside a:has-text('Logs')", { timeout: 20_000 });

    // ---- Logs: job detail, per-recipient Retry ----
    await page.click("aside a:has-text('Logs')");
    const row = page.locator("tbody tr", { hasText: RETRY_SUBJECT });
    await row.getByText("Completed", { exact: true }).waitFor({ timeout: 20_000 });
    await row.click();
    await page.waitForSelector("text=1 sent · 2 failed · 0 skipped", { timeout: 20_000 });
    const sariRow = page.locator("tbody tr", { hasText: "Sari Putri" });
    await sariRow.getByRole("button", { name: "Retry" }).click();

    // ---- The Send workspace opens pre-filled with Sari ----
    await page.waitForSelector("text=Retry pre-filled from Logs: 1 failed recipient", {
      timeout: 20_000,
    });
    // The source is the original generate job, picked.
    const jobSelect = page.getByLabel("Choose a Generate Job…");
    await jobSelect.waitFor({ timeout: 20_000 });
    expect(await jobSelect.inputValue()).toBe("gj-retry");
    await page.waitForSelector("text=1 selected · 3 matching", { timeout: 20_000 });
    // The message is the job's message.
    expect(await page.getByLabel("Subject").inputValue()).toBe(RETRY_SUBJECT);
    expect(await page.getByLabel(/HTML body/).inputValue()).toBe(
      "<p>Dear {name}, you are invited.</p>",
    );
    // The SMTP identity is the job's inline override; the password is
    // never carried, so the notice says it must be re-entered.
    expect(await page.getByLabel("Host").inputValue()).toBe("127.0.0.1");
    expect(await page.getByLabel("Port (465 = implicit TLS, else STARTTLS)").inputValue()).toBe(
      String(smtp.port),
    );
    expect(await page.getByLabel("Username (email address)").inputValue()).toBe("me");
    expect(await page.getByLabel("App password").inputValue()).toBe("");
    expect(await page.getByLabel("Sender name").inputValue()).toBe("Yayasan X");
    expect(await page.getByLabel("Sender address").inputValue()).toBe("iym@example.org");
    await page.waitForSelector(
      "text=Re-enter the app password to send again - passwords never leave this app.",
      { timeout: 20_000 },
    );

    // ---- The re-send delivers with the pre-filled identity ----
    await page.getByLabel("App password").fill("secret");
    await page.getByRole("button", { name: "Test Connection" }).click();
    await page.waitForSelector("text=Connected - the server accepted these credentials.", {
      timeout: 20_000,
    });
    await page.getByRole("button", { name: "Send 1 email" }).click();
    await page.waitForSelector("text=All 1 emails sent.", { timeout: 60_000 });
    expect(smtp.captured).toHaveLength(1);
    expect(smtp.captured[0]?.to).toBe("sari@example.com");
    expect(smtp.captured[0]?.raw).toContain(`Subject: ${RETRY_SUBJECT}`);
    expect(smtp.captured[0]?.raw).toContain("LOA_sari_putri.pdf");

    // ---- Back to Logs: Retry All Failures opens the workspace with both ----
    await page.click("aside a:has-text('Logs')");
    // The retry send above created a NEW job with the same subject; the
    // original is the row that still shows its two failures ("1 / 2 / 0").
    const originalRow = page
      .locator("tbody tr", { hasText: "Undangan Retry" })
      .filter({ hasText: "/ 2 /" });
    await originalRow.click();
    await page.getByRole("button", { name: "Retry All Failures (2)" }).click();
    await page.waitForSelector("text=Retry pre-filled from Logs: 2 failed recipients", {
      timeout: 20_000,
    });
    await page.waitForSelector("text=2 selected · 3 matching", { timeout: 20_000 });
    // Both retried recipients carry their generated attachments.
    await page.waitForSelector("text=2 with PDF · 0 without", { timeout: 20_000 });

    await page.getByLabel("App password").fill("secret");
    await page.getByRole("button", { name: "Send 2 emails" }).click();
    await page.waitForSelector("text=All 2 emails sent.", { timeout: 60_000 });
    expect(smtp.captured).toHaveLength(3);
    expect(smtp.captured.map((mail) => mail.to).toSorted()).toEqual(
      ["sari@example.com", "andi@example.com", "sari@example.com"].toSorted(),
    );

    expect(
      state.session.errors,
      `renderer console errors:\n${state.session.errors.join("\n")}`,
    ).toEqual([]);
  });

  it("retries a past Generate Job into the workspace prefilled with its recipients and template", async () => {
    state.userDataDir = freshUserDataDir("eb-generate-retry-");
    await firstLaunchCreatesSchema(state.userDataDir);

    // Seed: a generate job where Budi generated and Sari failed (missing
    // slot data at generate time) - the retry pre-fills both recipients
    // and the template, and the re-run generates everything.
    const templatesDir = join(state.userDataDir, "templates");
    const outputDir = join(state.userDataDir, "output");
    mkdirSync(templatesDir, { recursive: true });
    mkdirSync(outputDir, { recursive: true });
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
        outputs: [
          {
            recipientId: "r-budi",
            // Kept out of the output dir: the retry re-runs the job and
            // the assertion below pins exactly what the re-run produced.
            outputPath: join(state.userDataDir, "seeded", "LOA_budi_santoso.pdf"),
          },
        ],
        failures: [{ recipientId: "r-sari", errorMessage: 'Missing data for slot "instansi".' }],
      },
    });

    state.session = await launchApp(state.userDataDir);
    const { page } = state.session;
    await page.waitForSelector("aside a:has-text('Generate')", { timeout: 20_000 });

    // ---- Past Generate Jobs: Retry pre-fills the workspace ----
    await page.click("aside a:has-text('Generate')");
    await page.waitForSelector("text=Past Generate Jobs", { timeout: 20_000 });
    const jobRow = page.locator("tbody tr", { hasText: "LOA" });
    await jobRow.waitFor({ timeout: 20_000 });
    await jobRow.getByRole("button", { name: "Retry" }).click();

    // The workspace inputs carry the job's recipients and template.
    await page.waitForSelector("text=2 selected · 2 matching", { timeout: 20_000 });
    const templateSelect = page.getByLabel("Letter or certificate template");
    expect(await templateSelect.inputValue()).toBe("tpl-loa");
    // The generate panel is idle again, ready to re-run.
    await page.getByRole("button", { name: "Generate PDFs" }).click();
    await page.waitForSelector("text=All 2 PDFs generated.", { timeout: 60_000 });
    expect(readdirSync(outputDir).toSorted()).toEqual([
      "LOA_budi_santoso.pdf",
      "LOA_sari_putri.pdf",
    ]);

    expect(
      state.session.errors,
      `renderer console errors:\n${state.session.errors.join("\n")}`,
    ).toEqual([]);
  });
});

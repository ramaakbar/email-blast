import { mkdirSync } from "node:fs";
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
 * Seam B for ticket 10 (ADR 0008): recipient edits are live. Scenario 1
 * edits a recipient's address on the Recipients page through the new
 * `recipients.update` op. Scenario 2 fixes a failed row's email in Logs -
 * the dialog shows the current address, saves through the same op, and
 * hands off to the existing retry flow, which delivers to the corrected
 * address on the SMTP capture server. Scenario 3 proves edits apply to
 * live jobs: a paused job's pending recipient is edited on the Recipients
 * page, then the resume delivers exactly that recipient at the corrected
 * address while the sent outcome stays untouched.
 */

describe("Seam B: recipient edit + Logs fix email (ticket 10)", () => {
  const state: E2ECleanupState = { session: null, smtp: null, userDataDir: "" };
  registerE2ECleanup(state);

  it("edits a recipient's address on the Recipients page", async () => {
    state.userDataDir = freshUserDataDir("eb-recipient-edit-");
    await firstLaunchCreatesSchema(state.userDataDir);
    seedDatabase(state.userDataDir, {
      settings: { rateLimitDelayMs: 50 },
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
    });

    state.session = await launchApp(state.userDataDir);
    const { page } = state.session;
    await page.waitForSelector("aside a:has-text('Recipients')", { timeout: 20_000 });
    await page.click("aside a:has-text('Recipients')");

    const budiRow = page.locator("tbody tr", { hasText: "Budi Santoso" });
    await budiRow.waitFor({ timeout: 20_000 });
    await budiRow.getByRole("button", { name: "Edit" }).click();
    await page.waitForSelector("text=Edit recipient", { timeout: 20_000 });

    // The dialog is prefilled with the stored address fields.
    const emailInput = page.locator('input[type="email"]');
    expect(await emailInput.inputValue()).toBe("budi@example.com");
    expect(await page.locator('input[type="tel"]').inputValue()).toBe("");

    await emailInput.fill("budi.santoso@example.org");
    await page.getByRole("button", { name: "Save" }).click();

    // The directory row reflects the corrected address after the op.
    await budiRow.getByText("budi.santoso@example.org").waitFor({ timeout: 20_000 });
    expect(await budiRow.getByText("budi.santoso@example.org").count()).toBe(1);

    expect(
      state.session.errors,
      `renderer console errors:\n${state.session.errors.join("\n")}`,
    ).toEqual([]);
  });

  it("fixes a failed recipient's email in Logs and the retry lands on the corrected address", async () => {
    state.userDataDir = freshUserDataDir("eb-fix-email-");
    state.smtp = await startSmtpCapture();
    const smtp = state.smtp;
    await firstLaunchCreatesSchema(state.userDataDir);

    // Seed: a completed send job where Budi sent and Sari failed against
    // the wrong address - the fix flow edits the RECIPIENT row (live),
    // not the recorded outcome.
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
          email: "sari.bad@example.com",
          metadata: { instansi: "Yayasan X" },
        },
      ],
      generateJob: {
        id: "gj-fix",
        templateId: "tpl-loa",
        outputs: [
          { recipientId: "r-budi", outputPath: join(outputDir, "LOA_budi_santoso.pdf") },
          { recipientId: "r-sari", outputPath: join(outputDir, "LOA_sari_putri.pdf") },
        ],
      },
      sendJobs: [
        {
          id: "sj-fix",
          generateJobId: "gj-fix",
          status: "completed",
          subject: "Undangan Fix",
          cursorIndex: 2,
          recipients: [
            { recipientId: "r-budi", status: "sent", messageId: "msg-budi" },
            {
              recipientId: "r-sari",
              status: "failed",
              errorMessage: "421 rejected: sari.bad@example.com",
            },
          ],
        },
      ],
      smtpPort: smtp.port,
    });

    state.session = await launchApp(state.userDataDir);
    const { page } = state.session;
    await page.waitForSelector("aside a:has-text('Logs')", { timeout: 20_000 });
    await page.click("aside a:has-text('Logs')");
    const row = page.locator("tbody tr", { hasText: "Undangan Fix" });
    await row.getByText("Completed", { exact: true }).waitFor({ timeout: 20_000 });
    await row.click();
    await page.waitForSelector("text=1 sent · 1 failed · 0 skipped", { timeout: 20_000 });

    // ---- Fix email: the dialog shows the CURRENT address ----
    const sariRow = page.locator("tbody tr", { hasText: "Sari Putri" });
    await sariRow.getByRole("button", { name: "Fix email" }).click();
    await page.waitForSelector("text=Fix email address", { timeout: 20_000 });
    const emailInput = page.locator('input[type="email"]');
    await emailInput.waitFor({ timeout: 20_000 });
    expect(await emailInput.inputValue()).toBe("sari.bad@example.com");
    await emailInput.fill("sari@example.com");
    await page.getByRole("button", { name: "Save" }).click();

    // ---- Hand-off: the Send workspace opens pre-filled with Sari ----
    await page.waitForSelector("text=Retry pre-filled from Logs: 1 failed recipient", {
      timeout: 20_000,
    });
    await page.getByLabel("App password").fill("secret");
    await page.getByRole("button", { name: "Test Connection" }).click();
    await page.waitForSelector("text=Connected - the server accepted these credentials.", {
      timeout: 20_000,
    });
    await page.getByRole("button", { name: "Send 1 email" }).click();
    await page.waitForSelector("text=All 1 emails sent.", { timeout: 60_000 });

    // The retry delivered to the corrected address, with the attachment.
    expect(smtp.captured).toHaveLength(1);
    expect(smtp.captured[0]?.to).toBe("sari@example.com");
    expect(smtp.captured[0]?.raw).toContain(`Subject: Undangan Fix`);
    expect(smtp.captured[0]?.raw).toContain("LOA_sari_putri.pdf");

    expect(
      state.session.errors,
      `renderer console errors:\n${state.session.errors.join("\n")}`,
    ).toEqual([]);
  });

  it("resume after an edit delivers the pending recipient at the corrected address", async () => {
    state.userDataDir = freshUserDataDir("eb-pause-edit-resume-");
    state.smtp = await startSmtpCapture();
    const smtp = state.smtp;
    await firstLaunchCreatesSchema(state.userDataDir);

    // Seed: a PAUSED job - Budi already sent, Sari still pending against
    // the wrong address. The edit happens between the pause and the
    // resume, so the resume must read the corrected recipient row.
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
          email: "sari.bad@example.com",
          metadata: { instansi: "Yayasan X" },
        },
      ],
      generateJob: {
        id: "gj-pause",
        templateId: "tpl-loa",
        outputs: [
          { recipientId: "r-budi", outputPath: join(outputDir, "LOA_budi_santoso.pdf") },
          { recipientId: "r-sari", outputPath: join(outputDir, "LOA_sari_putri.pdf") },
        ],
      },
      sendJobs: [
        {
          id: "sj-pause",
          generateJobId: "gj-pause",
          status: "paused",
          subject: "Undangan Pause",
          cursorIndex: 1,
          recipients: [
            { recipientId: "r-budi", status: "sent", messageId: "msg-budi" },
            { recipientId: "r-sari", status: "pending" },
          ],
        },
      ],
      smtpPort: smtp.port,
    });

    state.session = await launchApp(state.userDataDir);
    const { page } = state.session;
    await page.waitForSelector("aside a:has-text('Recipients')", { timeout: 20_000 });

    // ---- Edit Sari's address on the Recipients page (paused job in DB) ----
    await page.click("aside a:has-text('Recipients')");
    const sariRow = page.locator("tbody tr", { hasText: "Sari Putri" });
    await sariRow.waitFor({ timeout: 20_000 });
    await sariRow.getByRole("button", { name: "Edit" }).click();
    await page.locator('input[type="email"]').fill("sari@example.com");
    await page.getByRole("button", { name: "Save" }).click();
    await sariRow.getByText("sari@example.com").waitFor({ timeout: 20_000 });

    // ---- Resume the paused job from Logs ----
    await page.click("aside a:has-text('Logs')");
    const row = page.locator("tbody tr", { hasText: "Undangan Pause" });
    await row.getByText("Paused", { exact: true }).waitFor({ timeout: 20_000 });
    await row.getByRole("button", { name: "Resume" }).click();
    await row.getByText("Completed", { exact: true }).waitFor({ timeout: 60_000 });

    // Exactly the pending recipient was delivered - at the corrected
    // address. Budi's sent outcome was not re-delivered.
    expect(smtp.captured).toHaveLength(1);
    expect(smtp.captured[0]?.to).toBe("sari@example.com");
    expect(smtp.captured[0]?.raw).toContain(`Subject: Undangan Pause`);

    // The recorded outcomes: Budi still sent (original message id), Sari
    // sent now - no failures, nothing skipped.
    await row.click();
    await page.waitForSelector("text=2 sent · 0 failed · 0 skipped", { timeout: 20_000 });
    await page.waitForSelector('tbody tr:has-text("Budi Santoso") td:has-text("Sent")', {
      timeout: 20_000,
    });
    await page.waitForSelector('tbody tr:has-text("Sari Putri") td:has-text("Sent")', {
      timeout: 20_000,
    });

    expect(
      state.session.errors,
      `renderer console errors:\n${state.session.errors.join("\n")}`,
    ).toEqual([]);
  });
});

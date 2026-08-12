import { mkdirSync } from "node:fs";
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
  waitFor,
  type E2ECleanupState,
} from "./harness";
import { FIXTURE_RECIPIENTS, writeFixtureSpreadsheet, writeFixtureTemplate } from "./fixtures";

/**
 * Seam B quit/resume (ticket 18, spec Testing Decisions "the quit dialog's
 * two branches"): send a real campaign through the Generate and Send
 * workspaces, then drive both branches of the close guard - [Keep
 * Sending] lets the send continue, and [Quit & Pause] quits with the job
 * paused at the persisted cursor. Relaunching on the same userData dir
 * recovers the job, and resuming from Logs delivers exactly the remaining
 * recipients - no skipped, and none double-sent.
 */

const SUBJECT = "Undangan Rapat - Gelombang 1";
// One more recipient than the base fixture so the send spans several
// 1000ms pacing gates before the quit lands.
const RECIPIENTS = [
  ...FIXTURE_RECIPIENTS,
  { name: "Rina Marlina", email: "rina@example.com", phone: "0815", instansi: "Kota C" },
];

describe("Seam B: quit mid-send, relaunch, resume from Logs", () => {
  const state: E2ECleanupState = { session: null, smtp: null, userDataDir: "" };
  registerE2ECleanup(state);

  it("delivers every recipient exactly once across both quit-dialog branches", async () => {
    state.userDataDir = freshUserDataDir("eb-quitresume-");
    const smtp = await startSmtpCapture();
    state.smtp = smtp;
    await firstLaunchCreatesSchema(state.userDataDir);

    const fixturesDir = join(state.userDataDir, "fixtures");
    mkdirSync(fixturesDir, { recursive: true });
    const xlsxPath = join(fixturesDir, "recipients.xlsx");
    writeFixtureSpreadsheet(xlsxPath, RECIPIENTS);
    const templatesDir = join(state.userDataDir, "templates");
    const outputDir = join(state.userDataDir, "output");
    mkdirSync(templatesDir, { recursive: true });
    const docxPath = writeFixtureTemplate(templatesDir);
    // 1000ms pacing makes the send span five gates - plenty of room to
    // drive both quit branches without the send finishing first.
    seedDatabase(state.userDataDir, {
      settings: { templatesDir, outputDir, rateLimitDelayMs: 1000 },
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

    // ---- Import + Generate workspace through the generate step ----
    await importFixtureSpreadsheet(app, page, xlsxPath);
    await page.waitForSelector('input[aria-label="Select all on this page"]', { timeout: 20_000 });
    await page.getByRole("checkbox", { name: "Select all on this page" }).check();
    await page.waitForSelector("text=5 selected · 5 matching");
    await page.getByLabel("Letter or certificate template").selectOption({ label: "LOA" });
    await page.waitForSelector(
      "text=All 5 selected recipients have data for every required slot.",
    );
    await page.getByRole("button", { name: "Generate PDFs" }).click();
    await page.waitForSelector("text=All 5 PDFs generated.", { timeout: 60_000 });

    // ---- Send workspace: message + inline SMTP against the capture server ----
    await page.getByRole("button", { name: "Send these" }).click();
    await page.waitForSelector("text=5 selected · 5 matching", { timeout: 20_000 });
    await fillWorkspaceMessage(page, {
      subject: SUBJECT,
      bodyHtml: "<p>Dear {name}, from {instansi}, you are invited.</p>",
    });
    await fillWorkspaceSmtp(page, smtp.port);
    await page.getByRole("button", { name: "Send 5 emails" }).click();
    // The progress event for the second recipient is emitted AFTER its
    // outcome + cursor persist, so each quit lands between recipients - a
    // clean boundary where nothing is in flight.
    await page.waitForSelector("text=2 sent · 0 failed · 3 pending", { timeout: 60_000 });

    // ---- Branch 1: [Keep Sending] - the close is prevented, the send continues ----
    await app.evaluate(({ dialog }) => {
      dialog.showMessageBox = async () => ({ response: 1, checkboxChecked: false });
    });
    // Close the window from main (not app.close(), which waits for the
    // process to exit - the guard's [Keep Sending] keeps the app alive).
    await app.evaluate(({ BrowserWindow }) => {
      BrowserWindow.getAllWindows()[0].close();
    });
    await page.waitForSelector("text=4 sent · 0 failed · 1 pending", { timeout: 30_000 });
    await page.waitForSelector("aside a:has-text('Logs')", { timeout: 20_000 });

    // ---- Branch 2: [Quit & Pause] - the app quits, the job pauses at the cursor ----
    await app.evaluate(({ dialog }) => {
      dialog.showMessageBox = async () => ({ response: 0, checkboxChecked: false });
    });
    await app.close();
    state.session = null;
    // Boot recovery on the next launch turns the stuck `sending` job
    // paused; the persisted cursor decides what the resume delivers.

    // ---- Relaunch: recovery + resume from Logs ----
    state.session = await launchApp(state.userDataDir);
    const page2 = state.session.page;
    // The one-time launch banner names the recovered job (exactly one
    // paused job exists after boot recovery).
    await page2.waitForSelector(`text=Send paused: ${SUBJECT} - 4 of 5 sent.`, {
      timeout: 20_000,
    });
    await page2.click("aside a:has-text('Logs')");
    const row = page2.locator("tbody tr", { hasText: SUBJECT });
    await row.getByText("Paused", { exact: true }).waitFor({ timeout: 20_000 });
    await row.locator("text=Paused - 4 of 5 sent").waitFor({ timeout: 20_000 });
    await row.getByRole("button", { name: "Resume" }).click();

    // The resume continues from the cursor: exactly the remaining
    // recipient is delivered, and none of the first four is re-sent.
    await waitFor(() => smtp.captured.length === 5, {
      timeoutMs: 90_000,
      label: "all five mails delivered after the resume",
    });
    const sentTo = smtp.captured.map((mail) => mail.to);
    expect(sentTo.toSorted()).toEqual(RECIPIENTS.map((r) => r.email).toSorted());
    await Promise.all(
      smtp.captured.map((mail) => expect(mail.raw).toContain(`Subject: ${SUBJECT}`)),
    );

    // The row completes; the banner retires itself; the job detail shows
    // the full per-recipient outcome with nothing skipped.
    await row.getByText("Completed", { exact: true }).waitFor({ timeout: 20_000 });
    await page2.waitForSelector("text=Send paused", { state: "detached", timeout: 20_000 });
    await row.click();
    await page2.waitForSelector("text=5 sent · 0 failed · 0 skipped", { timeout: 20_000 });
    await Promise.all(
      RECIPIENTS.map((recipient) =>
        page2.waitForSelector(`tbody tr:has-text('${recipient.name}') td:has-text('Sent')`),
      ),
    );

    expect(
      state.session.errors,
      `renderer console errors:\n${state.session.errors.join("\n")}`,
    ).toEqual([]);
  });
});

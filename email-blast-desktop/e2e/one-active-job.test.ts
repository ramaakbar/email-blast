import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { Page } from "playwright-core";
import {
  firstLaunchCreatesSchema,
  freshUserDataDir,
  launchApp,
  registerE2ECleanup,
  seedDatabase,
  startSmtpCapture,
  waitFor,
  type E2ECleanupState,
} from "./harness";
import type { Api, SendJob } from "../src/shared/ipc";

/**
 * Seam B one-active-job rule (ticket 18): while one send job is paused,
 * a second job's Resume is rejected in the UI with the explanatory
 * message. The rule is symmetric - a paused job blocks every other run -
 * so the only way out of the two-paused stalemate is finishing one job;
 * cancelling it (the wizard Cancel's IPC) frees the other to resume and
 * deliver. The in-memory control and the DB status guard both surface
 * through the bridge - this test watches the rendered Logs screen do it.
 */

/** The one-active rule through the bridge: run a job, capturing the rejection. */
function runSendThroughBridge(page: Page, jobId: string): Promise<{ ok: boolean; message: string }> {
  return page.evaluate(
    (id) =>
      (window as unknown as { api: Api }).api.send.runSend(id).then(
        () => ({ ok: true, message: "" }),
        (error: unknown) => ({ ok: false, message: String(error) }),
      ),
    jobId,
  );
}

/** Cancels a job through the bridge (the wizard Cancel button's IPC). */
function cancelSendThroughBridge(page: Page, jobId: string): Promise<SendJob> {
  return page.evaluate(
    (id) => (window as unknown as { api: Api }).api.send.cancelSend(id) as Promise<SendJob>,
    jobId,
  );
}

describe("Seam B: one active send at a time", () => {
  const state: E2ECleanupState = { session: null, smtp: null, userDataDir: "" };
  registerE2ECleanup(state);

  it("blocks a second run in the UI while another job is paused, then unblocks", async () => {
    state.userDataDir = freshUserDataDir("eb-oneactive-");
    const smtp = await startSmtpCapture();
    state.smtp = smtp;
    await firstLaunchCreatesSchema(state.userDataDir);

    // Two paused jobs over the same generate job, each with one recipient
    // already sent (cursor 1, one pending). The attachments are fake but
    // on disk, so each resume's pre-flight (SMTP connect + auth, confirmed
    // attachment) passes.
    const attachmentDir = join(state.userDataDir, "attachments");
    seedDatabase(state.userDataDir, {
      settings: { rateLimitDelayMs: 300 },
      template: {
        id: "tpl-loa",
        name: "LOA",
        filePath: join(state.userDataDir, "templates", "LOA.docx"),
        slots: ["name", "instansi"],
        outputPattern: "LOA_{name}.pdf",
      },
      recipients: [
        { id: "rec-budi", name: "Budi Santoso", email: "budi@example.com" },
        { id: "rec-sari", name: "Sari Putri", email: "sari@example.com" },
      ],
      generateJob: {
        id: "gen-1",
        templateId: "tpl-loa",
        outputs: [
          { recipientId: "rec-budi", outputPath: join(attachmentDir, "budi.pdf") },
          { recipientId: "rec-sari", outputPath: join(attachmentDir, "sari.pdf") },
        ],
      },
      smtpPort: smtp.port,
      sendJobs: [
        {
          id: "job-a",
          generateJobId: "gen-1",
          status: "paused",
          subject: "Undangan Rapat A",
          cursorIndex: 1,
          recipients: [
            { recipientId: "rec-budi", status: "sent", messageId: "msg-a1" },
            { recipientId: "rec-sari", status: "pending" },
          ],
        },
        {
          id: "job-b",
          generateJobId: "gen-1",
          status: "paused",
          subject: "Undangan Rapat B",
          cursorIndex: 1,
          recipients: [
            { recipientId: "rec-budi", status: "sent", messageId: "msg-b1" },
            { recipientId: "rec-sari", status: "pending" },
          ],
        },
      ],
    });

    state.session = await launchApp(state.userDataDir);
    const { page } = state.session;
    await page.waitForSelector("aside a:has-text('Logs')", { timeout: 20_000 });
    await page.click("aside a:has-text('Logs')");

    // Two paused rows; two paused jobs means no launch banner (it only
    // fires for exactly one).
    const rowA = page.locator("tbody tr", { hasText: "Undangan Rapat A" });
    const rowB = page.locator("tbody tr", { hasText: "Undangan Rapat B" });
    await rowA.getByText("Paused", { exact: true }).waitFor({ timeout: 20_000 });
    await rowB.getByText("Paused", { exact: true }).waitFor({ timeout: 20_000 });

    // The UI block: resuming B while A is paused fails with the message.
    // The blocked resume reverts to paused (B has a persisted cursor), so
    // its Resume button stays.
    await rowB.getByRole("button", { name: "Resume" }).click();
    await page.waitForSelector(
      "text=Another send is in progress or paused. Pause or finish it first.",
      { timeout: 20_000 },
    );
    await rowB.getByText("Paused", { exact: true }).waitFor({ timeout: 20_000 });

    // The same rule through the bridge, service-side.
    const blocked = await runSendThroughBridge(page, "job-b");
    expect(blocked.ok).toBe(false);
    expect(blocked.message).toContain("Another send is in progress or paused");

    // The rule is symmetric: while B is paused, A cannot run either. The
    // only way out of the two-paused stalemate is to finish one job, so
    // cancel A (the same IPC the wizard's Cancel button uses) - terminal
    // jobs stop counting as active.
    const cancelled = await cancelSendThroughBridge(page, "job-a");
    expect(cancelled.status).toBe("cancelled");
    // Cancel emits no progress/paused event, so the Logs table refreshes
    // on the next visit - step away and back to see the terminal badge.
    await page.click("aside a:has-text('Recipients')");
    await page.waitForSelector("tbody tr:has-text('Budi Santoso')", { timeout: 20_000 });
    await page.click("aside a:has-text('Logs')");
    await page
      .locator("tbody tr", { hasText: "Undangan Rapat A" })
      .getByText("Cancelled", { exact: true })
      .waitFor({ timeout: 20_000 });

    // Nothing active anymore: B's Resume now works and delivers its mail.
    await rowB.getByRole("button", { name: "Resume" }).click();
    await waitFor(() => smtp.captured.length === 1, {
      timeoutMs: 60_000,
      label: "job B delivers its recipient after A was cancelled",
    });
    expect(smtp.captured[0]?.to).toBe("sari@example.com");
    await rowB.getByText("Completed", { exact: true }).waitFor({ timeout: 20_000 });

    expect(state.session.errors, `renderer console errors:\n${state.session.errors.join("\n")}`).toEqual(
      [],
    );
  });
});

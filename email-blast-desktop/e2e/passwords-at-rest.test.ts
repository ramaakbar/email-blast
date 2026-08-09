import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { describe, expect, it } from "vitest";
import {
  closeSession,
  fillMessageStep,
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
 * Seam B for ticket 02: SMTP passwords encrypted at rest. The legacy
 * posture - a plaintext profile password and a plaintext inline override
 * stored with a past Send Job - is seeded directly into the database, and
 * the boot migration encrypts both in place. The app must keep working
 * afterwards: the migrated profile's stored credential passes Test
 * Connection and sends a campaign through the wizard, and the migrated
 * job's override resumes and delivers to the capture server. The second
 * scenario pins that newly created profiles are encrypted from the start.
 * On this platform safeStorage is available, so the at-rest assertions
 * read the ciphertext marker `enc:v1:`; the unavailable-keychain
 * degradation is covered by the unit suite.
 */

const LEGACY_PASSWORD = "secret";
const LEGACY_SUBJECT = "Undangan Rapat - Batch Legasi";
const WIZARD_SUBJECT = "Undangan Rapat - Profil Termigrasi";
// The legacy job's recipients are three of the fixture campaign's people:
// the later wizard import dedupes them (by email), so the compose picker
// ends up with exactly the four fixture recipients.
const LEGACY_RECIPIENTS = [
  { id: "rec-1", name: "Budi Santoso", email: "budi@example.com", metadata: { instansi: "Yayasan X" } },
  { id: "rec-2", name: "Sari Putri", email: "sari@example.com", metadata: { instansi: "Yayasan X" } },
  { id: "rec-3", name: "Andi Wijaya", email: "andi@example.com", metadata: { instansi: "Sekolah Y" } },
];

function storedPassword(userDataDir: string, id: string): string {
  const db = new DatabaseSync(join(userDataDir, "email-blast.db"));
  try {
    return (
      db.prepare("SELECT password FROM smtp_profiles WHERE id = ?").get(id) as {
        password: string;
      }
    ).password;
  } finally {
    db.close();
  }
}

function storedOverride(userDataDir: string, id: string): string {
  const db = new DatabaseSync(join(userDataDir, "email-blast.db"));
  try {
    return (
      db.prepare("SELECT smtp_override FROM send_jobs WHERE id = ?").get(id) as {
        smtp_override: string;
      }
    ).smtp_override;
  } finally {
    db.close();
  }
}

/** Seeds a pre-upgrade profile: connection details with a plaintext password. */
function seedLegacyProfile(userDataDir: string, smtpPort: number): void {
  const db = new DatabaseSync(join(userDataDir, "email-blast.db"));
  try {
    db.prepare(
      `INSERT INTO smtp_profiles (id, name, host, port, username, password)
       VALUES ('prof-legacy', 'Legacy Capture', '127.0.0.1', ?, 'me', ?)`,
    ).run(smtpPort, LEGACY_PASSWORD);
  } finally {
    db.close();
  }
}

describe("Seam B: SMTP passwords encrypted at rest (ticket 02)", () => {
  const state: E2ECleanupState = { session: null, smtp: null, userDataDir: "" };
  registerE2ECleanup(state);

  it("migrates legacy plaintext credentials at boot and keeps sending and Test Connection working", async () => {
    state.userDataDir = freshUserDataDir("eb-atrest-");
    state.smtp = await startSmtpCapture();
    const smtp = state.smtp;
    await firstLaunchCreatesSchema(state.userDataDir);

    // The pre-upgrade state, verbatim: a plaintext profile password and a
    // paused Send Job whose inline override carries a plaintext password.
    // The template is a real fixture DOCX so the wizard send below can
    // generate through it.
    seedLegacyProfile(state.userDataDir, smtp.port);
    const templatesDir = join(state.userDataDir, "templates");
    mkdirSync(templatesDir, { recursive: true });
    const docxPath = writeFixtureTemplate(templatesDir);
    const xlsxPath = join(state.userDataDir, "fixtures", "recipients.xlsx");
    mkdirSync(join(state.userDataDir, "fixtures"), { recursive: true });
    writeFixtureSpreadsheet(xlsxPath, FIXTURE_RECIPIENTS);
    seedDatabase(state.userDataDir, {
      settings: { rateLimitDelayMs: 1 },
      template: {
        id: "tpl-loa",
        name: "LOA",
        filePath: docxPath,
        slots: ["name", "instansi"],
        outputPattern: "LOA_{name}.pdf",
      },
      recipients: LEGACY_RECIPIENTS,
      generateJob: {
        id: "gen-1",
        templateId: "tpl-loa",
        outputs: LEGACY_RECIPIENTS.map((recipient, index) => ({
          recipientId: recipient.id,
          outputPath: join(state.userDataDir, `out-${index}.pdf`),
        })),
      },
      sendJobs: [
        {
          id: "job-legacy",
          generateJobId: "gen-1",
          status: "paused",
          subject: LEGACY_SUBJECT,
          cursorIndex: 0,
          recipients: LEGACY_RECIPIENTS.map((recipient) => ({
            recipientId: recipient.id,
            status: "pending" as const,
          })),
        },
      ],
      smtpPort: smtp.port,
    });

    // The migration runs at boot, before any window exists.
    state.session = await launchApp(state.userDataDir);
    const { app, page } = state.session;
    await page.waitForSelector("aside a:has-text('Import')", { timeout: 20_000 });

    // ---- The migrated profile still reads back with its password (masked) ----
    await page.click("aside a:has-text('Settings')");
    await page.waitForSelector("text=Legacy Capture", { timeout: 20_000 });
    // The masked dots prove hasPassword - the stored credential decrypted.
    await page.waitForSelector("text=••••••••", { timeout: 20_000 });

    // ---- Test Connection through the migrated stored credential ----
    await page.getByRole("button", { name: "Test Connection" }).click();
    await page.waitForSelector("text=Connected", { timeout: 20_000 });

    // ---- The migrated job's override resumes and delivers ----
    // Resumed first: a paused job counts as active, so the later wizard
    // send would be rejected by the one-active-job rule.
    await page.click("aside a:has-text('Logs')");
    await page.waitForSelector(`text=Send paused: ${LEGACY_SUBJECT} - 0 of 3 sent.`, {
      timeout: 20_000,
    });
    const row = page.locator("tbody tr", { hasText: LEGACY_SUBJECT });
    await row.getByRole("button", { name: "Resume" }).click();
    await waitFor(
      () => smtp.captured.filter((mail) => mail.raw.includes(LEGACY_SUBJECT)).length === 3,
      {
        timeoutMs: 90_000,
        label: "the legacy job's three mails delivered after the migration",
      },
    );
    await row.getByText("Completed", { exact: true }).waitFor({ timeout: 20_000 });

    // ---- Sending THROUGH the migrated profile: the wizard picks it and delivers ----
    await importFixtureSpreadsheet(app, page, xlsxPath);
    await page.waitForSelector('input[aria-label="Select all on this page"]', { timeout: 20_000 });
    await page.getByRole("checkbox", { name: "Select all on this page" }).check();
    await page.waitForSelector("text=4 recipients selected");
    await page.locator("footer").getByRole("button", { name: "Next" }).click();
    await page.getByLabel("Letter or certificate template").selectOption({ label: "LOA" });
    await page.waitForSelector("text=All 4 selected recipients have data for every required slot.");
    await page.locator("footer").getByRole("button", { name: "Next" }).click();
    await fillMessageStep(page, {
      subject: WIZARD_SUBJECT,
      bodyHtml: "<p>Dear {name}, from {instansi}, you are invited.</p>",
    });
    const captureOption = await page
      .locator("select option", { hasText: "Legacy Capture" })
      .getAttribute("value");
    expect(captureOption).not.toBeNull();
    await page.getByLabel("Saved profile").selectOption(captureOption as string);
    // The legacy profile carries no default identity, so the per-job
    // sender is typed manually - the legacy behavior the ticket keeps.
    await page.getByLabel("Sender name").fill("Yayasan X");
    await page.getByLabel("Sender address").fill("iym@example.org");
    // The profile's migrated password decrypts for the step's own
    // connection test too.
    await page.getByRole("button", { name: "Test Connection" }).click();
    await page.waitForSelector("text=Connected - the server accepted these credentials.", {
      timeout: 20_000,
    });
    await page.locator("footer").getByRole("button", { name: "Next" }).click();
    await page.getByRole("button", { name: "Generate PDFs" }).click();
    await page.waitForSelector("text=All 4 PDFs generated.", { timeout: 60_000 });
    await page.locator("footer").getByRole("button", { name: "Next" }).click();
    await page.getByRole("button", { name: "Send 4 emails" }).click();
    await page.waitForSelector("text=All 4 emails sent.", { timeout: 60_000 });
    const profileMails = smtp.captured.filter((mail) => mail.raw.includes(WIZARD_SUBJECT));
    expect(profileMails).toHaveLength(4);
    expect(profileMails.map((mail) => mail.to).toSorted()).toEqual(
      FIXTURE_RECIPIENTS.map((recipient) => recipient.email).toSorted(),
    );

    // ---- At rest: neither credential is readable plaintext anymore ----
    const errors = state.session.errors;
    await closeSession(state.session);
    state.session = null;
    const profilePassword = storedPassword(state.userDataDir, "prof-legacy");
    expect(profilePassword).toMatch(/^enc:v1:/);
    expect(profilePassword).not.toContain(LEGACY_PASSWORD);
    const override = storedOverride(state.userDataDir, "job-legacy");
    expect(override).toMatch(/^enc:v1:/);
    expect(override).not.toContain(LEGACY_PASSWORD);
    expect(override).not.toContain("127.0.0.1");

    expect(errors, `renderer console errors:\n${errors.join("\n")}`).toEqual([]);
  });

  it("stores newly created profiles encrypted from the start", async () => {
    state.userDataDir = freshUserDataDir("eb-atrest-new-");
    state.smtp = await startSmtpCapture();
    const smtp = state.smtp;
    await firstLaunchCreatesSchema(state.userDataDir);
    // The default language + setup-done settings, so the app shell renders.
    seedDatabase(state.userDataDir, {});

    state.session = await launchApp(state.userDataDir);
    const { page } = state.session;
    await page.waitForSelector("aside a:has-text('Import')", { timeout: 20_000 });

    await page.click("aside a:has-text('Settings')");
    await page.getByRole("button", { name: "Add profile" }).first().click();
    await page.getByLabel("Profile name").fill("New Capture");
    await page.getByLabel("SMTP host").fill("127.0.0.1");
    await page.getByLabel("Port").fill(String(smtp.port));
    await page.getByLabel("Username").fill("me");
    await page.getByLabel("App password").fill(LEGACY_PASSWORD);
    await page.getByRole("button", { name: "Save profile" }).click();
    await page.waitForSelector('text=Profile "New Capture" saved.', { timeout: 20_000 });

    const errors = state.session.errors;
    await closeSession(state.session);
    state.session = null;
    // The id is assigned by the app, so look the row up by name.
    const db = new DatabaseSync(join(state.userDataDir, "email-blast.db"));
    let stored: string;
    try {
      stored = (
        db.prepare("SELECT password FROM smtp_profiles WHERE name = 'New Capture'").get() as {
          password: string;
        }
      ).password;
    } finally {
      db.close();
    }
    expect(stored).toMatch(/^enc:v1:/);
    expect(stored).not.toContain(LEGACY_PASSWORD);

    expect(errors, `renderer console errors:\n${errors.join("\n")}`).toEqual([]);
  });
});

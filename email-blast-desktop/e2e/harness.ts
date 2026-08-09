import { accessSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { _electron, type ElectronApplication, type Page } from "playwright-core";
import { SMTPServer } from "smtp-server";
import { afterEach } from "vitest";

/**
 * Seam B harness (spec Testing Decisions): launching the packaged app with
 * Playwright's Electron driver, the local SMTP capture server, and the
 * database seeding between launches. The same patterns the ticket 17/19/20
 * manual scripts established - `--user-data-dir` isolates the SQLite DB
 * (macOS ignores HOME for userData), `--lang=en` pins the UI language so
 * the English-string selectors can never flip with the OS locale, and the
 * seed writes against the app-created schema so it can never drift from it.
 */

/** The packaged app binary, or a clear error telling the user to package. */
export function packagedExecutablePath(): string {
  const appDir = resolve(import.meta.dirname, "..", "out");
  const candidates = [
    process.env.APP_PATH,
    join(appDir, "Email Blast-darwin-arm64", "Email Blast.app", "Contents", "MacOS", "Email Blast"),
  ].filter((p): p is string => typeof p === "string" && p !== "");
  const found = candidates.find((p) => {
    try {
      accessSync(p);
      return true;
    } catch {
      return false;
    }
  });
  if (found === undefined) {
    throw new Error(
      "packaged app not found under out/ - run `pnpm package` before `pnpm test:e2e`",
    );
  }
  return found;
}

/** A fresh userData dir for one test; the app-created DB lives here. */
export function freshUserDataDir(prefix: string): string {
  return mkdtempSync(join(tmpdir(), prefix));
}

/** One launched app: the driver, the window, and its collected console errors. */
export interface AppSession {
  readonly app: ElectronApplication;
  readonly page: Page;
  readonly errors: string[];
}

export interface LaunchOptions {
  /** Extra env vars for the app process (e.g. the LibreOffice seam). */
  readonly env?: Record<string, string>;
}

/** Launches the packaged app against an isolated userData dir. */
export async function launchApp(
  userDataDir: string,
  opts: LaunchOptions = {},
): Promise<AppSession> {
  const app = await _electron.launch({
    executablePath: packagedExecutablePath(),
    args: [`--user-data-dir=${userDataDir}`, "--lang=en"],
    env: { ...process.env, ...opts.env } as Record<string, string>,
  });
  const page = await app.firstWindow();
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));
  return { app, page, errors };
}

/** Closes a session, tolerating an already-dead app. */
export async function closeSession(session: AppSession | null): Promise<void> {
  if (session === null) return;
  // A paused/active job makes the close guard show the quit dialog; answer
  // it with [Quit & Pause] so the close can never hang on a real modal.
  await session.app
    .evaluate(({ dialog }) => {
      dialog.showMessageBox = async () => ({ response: 0, checkboxChecked: false });
    })
    .catch(() => {});
  await session.app.close().catch(() => {});
}

/**
 * The first-launch dance every seeded test needs: launch on a fresh
 * userData dir so the app itself creates the schema and seeds the default
 * settings, wait for the welcome screen, close, seed, relaunch. Returns
 * nothing; the caller seeds between the two launches.
 */
export async function firstLaunchCreatesSchema(userDataDir: string): Promise<void> {
  const session = await launchApp(userDataDir);
  try {
    await session.page.waitForSelector("text=Get Started", { timeout: 20_000 });
  } finally {
    await closeSession(session);
  }
}

// ---- The SMTP capture server (the send pipeline's seam) ----

/** One delivered message, captured from the wire: envelope plus raw MIME. */
export interface CapturedMail {
  readonly from: string;
  readonly to: string;
  readonly raw: string;
}

export interface SmtpCapture {
  readonly port: number;
  readonly captured: CapturedMail[];
  close(): Promise<void>;
}

/** A real SMTP server accepting every credential and capturing each message. */
export async function startSmtpCapture(): Promise<SmtpCapture> {
  const captured: CapturedMail[] = [];
  const server = new SMTPServer({
    hideSTARTTLS: true,
    allowInsecureAuth: true,
    onAuth(auth, _session, callback) {
      callback(null, { user: auth.username });
    },
    onData(stream, session, callback) {
      const chunks: Buffer[] = [];
      stream.on("data", (chunk: Buffer) => chunks.push(chunk));
      stream.on("end", () => {
        captured.push({
          from:
            session.envelope.mailFrom === false ? "" : (session.envelope.mailFrom?.address ?? ""),
          to: session.envelope.rcptTo[0]?.address ?? "",
          raw: Buffer.concat(chunks).toString("utf8"),
        });
        callback(null);
      });
    },
  });
  await new Promise<void>((resolveListen, reject) => {
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => resolveListen());
  });
  const address = server.server.address();
  if (address === null || typeof address === "string") throw new Error("No ephemeral port");
  return {
    port: address.port,
    captured,
    close: () =>
      new Promise<void>((resolveClose) => server.close(() => resolveClose())).catch(() => {}),
  };
}

/** Polls until the predicate holds or the timeout elapses. */
export async function waitFor(
  predicate: () => boolean,
  opts: { readonly timeoutMs: number; readonly label: string },
): Promise<void> {
  const deadline = Date.now() + opts.timeoutMs;
  while (Date.now() < deadline) {
    if (predicate()) return;
    // Sequential polling is the point of a waitFor - there is nothing to
    // parallelize between two consecutive checks.
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolveWait) => setTimeout(resolveWait, 250));
  }
  throw new Error(`timed out waiting for: ${opts.label}`);
}

/** The mutable per-scenario state `registerE2ECleanup` tears down. */
export interface E2ECleanupState {
  session: AppSession | null;
  smtp: SmtpCapture | null;
  userDataDir: string;
}

/**
 * The vitest teardown every scenario shares: close the app (answering any
 * quit dialog with [Quit & Pause] so it can never hang), close the SMTP
 * capture, and remove the userData dir.
 */
export function registerE2ECleanup(state: E2ECleanupState): void {
  afterEach(async () => {
    await closeSession(state.session);
    if (state.smtp !== null) await state.smtp.close();
    if (state.userDataDir !== "") cleanupUserData(state.userDataDir);
  });
}

// ---- The wizard choreography the scenario tests share ----
//
// The selectors here are brittle by nature (they pin the wizard's
// English strings and layout) and must stay in sync with compose.tsx -
// one shared copy keeps a label change a single edit, not shotgun
// surgery across files.

/** Drives the import page end to end: pick the fixture (patched picker), preview, commit, and land on the wizard. */
export async function importFixtureSpreadsheet(
  app: ElectronApplication,
  page: Page,
  xlsxPath: string,
): Promise<void> {
  await app.evaluate(({ dialog }, path) => {
    dialog.showOpenDialog = async () => ({ canceled: false, filePaths: [path] });
  }, xlsxPath);
  await page.click("aside a:has-text('Import')");
  await page.getByRole("button", { name: /Browse/ }).click();
  await page.waitForSelector("text=Import recipients", { timeout: 20_000 });
  await page.getByRole("button", { name: "Import recipients" }).click();
  await page.waitForSelector("text=Import complete", { timeout: 20_000 });
  // The done-screen action is a Link (the toast also shows one).
  await page.locator("text=Go to Compose").first().click();
}

/** The wizard's message step: subject plus the HTML body with `{slot}` placeholders. */
export async function fillMessageStep(
  page: Page,
  message: { readonly subject: string; readonly bodyHtml: string },
): Promise<void> {
  await page.getByLabel("Subject").fill(message.subject);
  await page.getByLabel(/HTML body/).fill(message.bodyHtml);
  await page.locator("footer").getByRole("button", { name: "Next" }).click();
}

/** The wizard's SMTP step in inline mode against the capture server, with a live Test Connection. */
export async function fillInlineSmtpStep(page: Page, port: number): Promise<void> {
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
  await page.locator("footer").getByRole("button", { name: "Next" }).click();
}

// ---- Database seeding (against the app-created schema) ----

export interface SettingsSeed {
  readonly rateLimitDelayMs?: number;
  readonly outputDir?: string;
  readonly templatesDir?: string;
}

export interface TemplateSeed {
  readonly id: string;
  readonly name: string;
  readonly filePath: string;
  readonly slots: readonly string[];
  readonly outputPattern: string;
}

export interface RecipientSeed {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  /** Extra metadata bag entries, e.g. the template's `instansi` slot. */
  readonly metadata?: Record<string, string>;
}

export interface GenerateOutputSeed {
  readonly recipientId: string;
  /** The confirmed attachment path; the file must exist for a send pre-flight. */
  readonly outputPath: string;
}

export interface SendRecipientOutcomeSeed {
  readonly recipientId: string;
  readonly status: "sent" | "failed" | "pending" | "skipped";
  readonly messageId?: string | null;
  readonly errorMessage?: string | null;
}

export interface SendJobSeed {
  readonly id: string;
  readonly generateJobId: string;
  readonly status: "pending" | "sending" | "paused" | "completed" | "cancelled";
  readonly subject: string;
  /** The persisted cursor: how many recipients have an outcome. */
  readonly cursorIndex: number;
  readonly recipients: readonly SendRecipientOutcomeSeed[];
}

export interface DatabaseSeed {
  readonly settings?: SettingsSeed;
  readonly template?: TemplateSeed;
  readonly recipients?: readonly RecipientSeed[];
  readonly generateJob?: {
    readonly id: string;
    readonly templateId: string;
    readonly outputs: readonly GenerateOutputSeed[];
  };
  readonly sendJobs?: readonly SendJobSeed[];
  /** The capture port the seeded jobs' SMTP override points at. */
  readonly smtpPort?: number;
}

/**
 * Inserts rows into the database the app created on its first launch.
 * The settings are INSERT OR REPLACE'd over the boot defaults; the other
 * tables are only seeded (the tests' userData dirs are fresh). The SMTP
 * override is stored with the job row, matching what the wizard's inline
 * mode writes.
 */
export function seedDatabase(userDataDir: string, seed: DatabaseSeed): void {
  const db = new DatabaseSync(join(userDataDir, "email-blast.db"));
  try {
    const setSetting = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    // Language and setup-done are pinned for every seeded run - the suite
    // drives the UI by its English strings (ticket 24).
    setSetting.run("language", "en");
    setSetting.run("libreoffice_checked", "true");
    if (seed.settings?.rateLimitDelayMs !== undefined) {
      setSetting.run("rate_limit_delay_ms", String(seed.settings.rateLimitDelayMs));
    }
    if (seed.settings?.outputDir !== undefined) {
      setSetting.run("output_dir", seed.settings.outputDir);
    }
    if (seed.settings?.templatesDir !== undefined) {
      setSetting.run("templates_dir", seed.settings.templatesDir);
    }

    if (seed.template !== undefined) {
      db.prepare(
        "INSERT INTO templates (id, name, file_path, type, slots, output_pattern, created_at) VALUES (?, ?, ?, 'docx', ?, ?, datetime('now'))",
      ).run(
        seed.template.id,
        seed.template.name,
        seed.template.filePath,
        JSON.stringify(seed.template.slots),
        seed.template.outputPattern,
      );
    }

    if (seed.recipients !== undefined) {
      const insertRecipient = db.prepare(
        "INSERT INTO recipients (id, name, email, phone, metadata, import_batch, created_at) VALUES (?, ?, ?, NULL, ?, 'e2e', datetime('now'))",
      );
      for (const recipient of seed.recipients) {
        insertRecipient.run(
          recipient.id,
          recipient.name,
          recipient.email,
          JSON.stringify({ name: recipient.name, ...recipient.metadata }),
        );
      }
    }

    if (seed.generateJob !== undefined) {
      const { generateJob } = seed;
      db.prepare(
        "INSERT INTO generate_jobs (id, template_id, status, created_at, completed_at) VALUES (?, ?, 'generated', datetime('now'), datetime('now'))",
      ).run(generateJob.id, generateJob.templateId);
      const insertOutput = db.prepare(
        "INSERT INTO generate_job_recipients (job_id, recipient_id, status, output_path) VALUES (?, ?, 'generated', ?)",
      );
      for (const output of generateJob.outputs) {
        mkdirSync(dirname(output.outputPath), { recursive: true });
        writeFileSync(output.outputPath, "%PDF-1.4 fake");
        insertOutput.run(generateJob.id, output.recipientId, output.outputPath);
      }
    }

    if (seed.sendJobs !== undefined && seed.smtpPort !== undefined) {
      const override = JSON.stringify({
        host: "127.0.0.1",
        port: seed.smtpPort,
        username: "me",
        password: "secret",
      });
      // delay_ms is history on the row (the run loop reads the live
      // setting); the pacing only matters for the wizard-created jobs.
      const insertJob = db.prepare(
        `INSERT INTO send_jobs (id, generate_job_id, status, smtp_override, subject, body_html,
                                sender_name, sender_address, delay_ms, cursor_index, total_count, created_at, completed_at)
         VALUES (?, ?, ?, ?, ?, '<p>Dear {name}, you are invited.</p>', 'Yayasan X',
                 'iym@example.org', 1000, ?, ?, datetime('now'), NULL)`,
      );
      const insertRow = db.prepare(
        "INSERT INTO send_job_recipients (job_id, recipient_id, status, message_id, error_message, sent_at) VALUES (?, ?, ?, ?, ?, ?)",
      );
      for (const job of seed.sendJobs) {
        insertJob.run(
          job.id,
          job.generateJobId,
          job.status,
          override,
          job.subject,
          job.cursorIndex,
          job.recipients.length,
        );
        for (const row of job.recipients) {
          insertRow.run(
            job.id,
            row.recipientId,
            row.status,
            row.messageId ?? null,
            row.errorMessage ?? null,
            row.status === "sent" ? "2026-08-01 09:00:00" : null,
          );
        }
      }
    }
  } finally {
    db.close();
  }
}

/** Removes the test's userData dir after the app is closed. */
export function cleanupUserData(userDataDir: string): void {
  rmSync(userDataDir, { recursive: true, force: true });
}

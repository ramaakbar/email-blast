// Seam B for ticket 16: the Logs screens against the packaged app.
// A first launch lets the app create the schema in a temp userData dir;
// the seed then inserts real job history (one completed job with a failed
// recipient, one paused job with one recipient left) into that database.
// Drives the live UI: the list with its filters, the job detail, the
// retry pre-fill into the compose wizard, and Resume of the paused job
// against a local SMTP capture server. Zero renderer console errors.
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { _electron } from "playwright-core";
import { SMTPServer } from "smtp-server";

const appDir = resolve(import.meta.dirname, "..", "out");
const executablePath = join(
  appDir,
  "Email Blast-darwin-arm64",
  "Email Blast.app",
  "Contents",
  "MacOS",
  "Email Blast",
);

/** An SMTP capture server; the seeded jobs send through it. */
async function startCapturingServer() {
  const captured = [];
  const server = new SMTPServer({
    hideSTARTTLS: true,
    allowInsecureAuth: true,
    onAuth(auth, _session, callback) {
      callback(null, { user: auth.username });
    },
    onData(stream, _session, callback) {
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("end", () => {
        captured.push(Buffer.concat(chunks).toString("utf8"));
        callback(null);
      });
    },
  });
  await new Promise((resolveListen, reject) => {
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => resolveListen());
  });
  const { port } = server.server.address();
  return { server, port, captured };
}

/**
 * Seeds rows into the database the app already created on its first
 * launch (the real schema, so this script can never drift from it).
 * Overrides the boot-seeded settings with INSERT OR REPLACE.
 */
function seedDatabase(userDataDir, smtpPort) {
  const db = new DatabaseSync(join(userDataDir, "email-blast.db"));
  const set = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
  set.run("libreoffice_checked", "true");
  set.run("rate_limit_delay_ms", "1000");

  const recipients = [
    { id: "rec-budi", name: "Budi Santoso", email: "budi@example.com" },
    { id: "rec-sari", name: "Sari Putri", email: "sari@example.com" },
    { id: "rec-andi", name: "Andi Wijaya", email: "andi@example.com" },
  ];
  const insertRecipient = db.prepare(
    "INSERT INTO recipients (id, name, email, phone, metadata, import_batch, created_at) VALUES (?, ?, ?, NULL, ?, 'e2e', datetime('now'))",
  );
  for (const recipient of recipients) {
    insertRecipient.run(
      recipient.id,
      recipient.name,
      recipient.email,
      '{"name":"' + recipient.name + '"}',
    );
  }

  const templatePath = join(userDataDir, "template.png");
  writeFileSync(templatePath, "fake png");
  db.prepare(
    "INSERT INTO templates (id, name, file_path, type, slots, output_pattern, created_at) VALUES ('tpl-loa', 'LOA', ?, 'image', '[\"name\"]', 'LOA_{name}.pdf', datetime('now'))",
  ).run(templatePath);
  db.prepare(
    "INSERT INTO generate_jobs (id, template_id, status, created_at, completed_at) VALUES ('gen-1', 'tpl-loa', 'generated', '2026-08-01 09:00:00', '2026-08-01 09:00:30')",
  ).run();
  const attach = db.prepare(
    "INSERT INTO generate_job_recipients (job_id, recipient_id, status, output_path) VALUES ('gen-1', ?, 'generated', ?)",
  );
  for (const recipient of recipients) {
    const path = join(userDataDir, `attach-${recipient.id}.pdf`);
    writeFileSync(path, "%PDF-1.4 fake");
    attach.run(recipient.id, path);
  }

  const override = JSON.stringify({
    host: "127.0.0.1",
    port: smtpPort,
    username: "me",
    password: "secret",
  });
  const insertJob = db.prepare(
    `INSERT INTO send_jobs (id, generate_job_id, status, smtp_override, subject, body_html,
                            sender_name, sender_address, delay_ms, cursor_index, total_count, created_at, completed_at)
     VALUES (?, 'gen-1', ?, ?, ?, '<p>Dear {name}, you are invited.</p>', 'Yayasan X',
             'iym@example.org', 1000, ?, 3, ?, ?)`,
  );
  const insertRow = db.prepare(
    `INSERT INTO send_job_recipients (job_id, recipient_id, status, message_id, error_message, sent_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  );
  // Job A: completed, Budi failed (deterministic SMTP refusal), Sari and Andi sent.
  insertJob.run(
    "job-a",
    "completed",
    override,
    "Undangan Rapat - Batch 1",
    2,
    "2026-08-01 10:00:00",
    "2026-08-01 10:00:10",
  );
  insertRow.run(
    "job-a",
    "rec-budi",
    "failed",
    null,
    "SmtpSendFailed: 550 mailbox unavailable",
    null,
  );
  insertRow.run("job-a", "rec-sari", "sent", "msg-a1", null, "2026-08-01 10:00:05");
  insertRow.run("job-a", "rec-andi", "sent", "msg-a2", null, "2026-08-01 10:00:07");
  // Job B: paused, cursor 2 (Budi + Sari sent), Andi pending - the resume
  // delivers exactly Andi against the capture server.
  insertJob.run(
    "job-b",
    "paused",
    override,
    "Undangan Rapat - Batch 2",
    2,
    "2026-08-04 09:00:00",
    null,
  );
  insertRow.run("job-b", "rec-budi", "sent", "msg-b1", null, "2026-08-04 09:00:01");
  insertRow.run("job-b", "rec-sari", "sent", "msg-b2", null, "2026-08-04 09:00:02");
  insertRow.run("job-b", "rec-andi", "pending", null, null, null);
  db.close();
}

let smtp;
let app;
const errors = [];
const userDataDir = mkdtempSync(join(tmpdir(), "email-blast-logs-e2e-"));
try {
  smtp = await startCapturingServer();
  // First launch: the app itself creates the schema and seeds the default
  // settings in the fresh userData dir. The seed below then only inserts
  // rows - no schema copy to drift.
  app = await _electron.launch({ executablePath, args: [`--user-data-dir=${userDataDir}`] });
  const bootPage = await app.firstWindow();
  await bootPage.waitForSelector("text=Get Started", { timeout: 15000 });
  await app.close();
  app = null;

  seedDatabase(userDataDir, smtp.port);
  app = await _electron.launch({ executablePath, args: [`--user-data-dir=${userDataDir}`] });
  const page = await app.firstWindow();
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));

  const sidebar = (name) => page.locator(`aside a:has-text("${name}")`);

  // --- The list ---
  await sidebar("Logs").click();
  await page.waitForSelector("text=Undangan Rapat - Batch 2", { timeout: 15000 });
  await page.waitForSelector("text=Undangan Rapat - Batch 1");
  console.log("list: both jobs shown");
  await page.waitForSelector("text=Paused - 2 of 3 sent");
  console.log("list: paused job shows 'Paused - 2 of 3 sent' with Resume");
  await page.waitForSelector("button:has-text('Resume')");

  // --- Filters ---
  await page.selectOption('select[aria-label="Filter by status"]', "completed");
  await page.waitForSelector("text=Undangan Rapat - Batch 1");
  await page.waitForFunction(() => {
    const rows = document.querySelectorAll("tbody tr");
    return rows.length === 1;
  });
  console.log("filters: completed status narrows to the finished job");
  await page.selectOption('select[aria-label="Filter by status"]', "paused");
  await page.waitForFunction(() => document.querySelectorAll("tbody tr").length === 1);
  await page.waitForSelector("text=Undangan Rapat - Batch 2");
  console.log("filters: paused status narrows to the paused job");
  await page.selectOption('select[aria-label="Filter by status"]', "all");
  await page.fill('input[aria-label="Jobs created from"]', "2026-08-03");
  await page.waitForFunction(() => document.querySelectorAll("tbody tr").length === 1);
  await page.waitForSelector("text=Undangan Rapat - Batch 2");
  console.log("filters: date range excludes the older job");
  await page.fill('input[aria-label="Jobs created from"]', "2026-08-05");
  await page.waitForSelector("text=No jobs match your filters");
  console.log("filters: empty state for a range with nothing in it");
  await page.click("button:has-text('Clear')");
  await page.waitForFunction(() => document.querySelectorAll("tbody tr").length === 2);

  // --- Job detail ---
  await page.click("tbody tr:has-text('Undangan Rapat - Batch 1')");
  await page.waitForSelector("text=Retry All Failures (1)");
  await page.waitForSelector("text=me@127.0.0.1");
  await page.waitForSelector("text=LOA");
  await page.waitForSelector("text=SmtpSendFailed: 550 mailbox unavailable");
  console.log("detail: summary header (subject, template, SMTP) + the failed recipient's error");

  // --- Retry pre-fill ---
  // The per-row Retry button (scoped to the failed recipient's row -
  // an unscoped "Retry" match would click the header's Retry All first).
  await page.click('tbody tr:has-text("Budi Santoso") button:has-text("Retry")');
  await page.waitForSelector("text=Retry pre-filled from Logs: 1 failed recipient", {
    timeout: 15000,
  });
  await page.waitForSelector("text=1 recipient selected");
  console.log("retry: wizard opens pre-filled with the failed recipient");
  // The stepper's buttons; text= alone would match the header's
  // "write the message" paragraph first (case-insensitive substring).
  await page.click('ol button:has-text("Message")');
  await page.waitForSelector('input[placeholder^="LOA for"]');
  const subject = await page.inputValue('input[placeholder^="LOA for"]');
  if (subject !== "Undangan Rapat - Batch 1")
    throw new Error(`wrong pre-filled subject: ${subject}`);
  console.log("retry: the same subject is pre-filled");
  await page.click('ol button:has-text("SMTP")');
  await page.waitForSelector('input[placeholder="smtp.gmail.com"]');
  const host = await page.inputValue('input[placeholder="smtp.gmail.com"]');
  const username = await page.inputValue('input[placeholder="you@gmail.com"]');
  const password = await page.inputValue('input[placeholder="16-character app password"]');
  if (host !== "127.0.0.1") throw new Error(`wrong pre-filled host: ${host}`);
  if (username !== "me") throw new Error(`wrong pre-filled username: ${username}`);
  if (password !== "") throw new Error("the inline password must never be pre-filled");
  console.log("retry: the same inline SMTP is pre-filled, the password stays empty");

  // --- Resume the paused job ---
  await sidebar("Logs").click();
  await page.click("tbody tr:has-text('Undangan Rapat - Batch 2')");
  await page.waitForSelector("text=Paused - 2 of 3 sent");
  await page.click("button:has-text('Resume')");
  const deadline = Date.now() + 20000;
  while (smtp.captured.length === 0 && Date.now() < deadline) {
    await new Promise((resolveWait) => setTimeout(resolveWait, 250));
  }
  if (smtp.captured.length !== 1) throw new Error("resume did not deliver the pending recipient");
  if (!smtp.captured[0].includes("Subject: Undangan Rapat - Batch 2")) {
    throw new Error("resumed email carries the wrong subject");
  }
  await page.waitForSelector("text=Completed", { timeout: 15000 });
  await page.waitForSelector("text=3 sent · 0 failed · 0 skipped");
  // The per-recipient table must reflect the same snapshot: Andi sent.
  await page.waitForSelector("tbody tr:has-text('Andi Wijaya') td:has-text('Sent')");
  console.log("resume: the paused job delivered its last recipient and completed");

  await page.screenshot({ path: join(import.meta.dirname, "logs-e2e.png") });
  if (errors.length) throw new Error(`renderer console errors:\n${errors.join("\n")}`);
  console.log("SMOKE PASS: logs list, filters, detail, retry pre-fill, and resume all green");
} finally {
  if (app) await app.close().catch(() => {});
  if (smtp) await new Promise((resolveClose) => smtp.server.close(() => resolveClose()));
  rmSync(userDataDir, { recursive: true, force: true });
}

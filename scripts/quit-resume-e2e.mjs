// Seam A for ticket 17: quit/resume resilience against the packaged app.
// A first launch lets the app create the schema in a temp userData dir;
// the seed then inserts a send job stuck `sending` (the crash/quit
// posture: cursor persisted, last recipient pending) plus a second,
// never-run `pending` job. Drives the live UI: the boot recovery turns
// the stuck job `paused`, the one-time launch banner offers Resume, the
// resume delivers exactly the pending recipient against a local SMTP
// capture server (no double-send), and the one-active-job rule rejects a
// second run while the recovered job is paused. Zero renderer console
// errors.
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { _electron } from "playwright-core";
import { SMTPServer } from "smtp-server";

import { findPackagedExecutable } from "./packaged-app.mjs";

const executablePath = findPackagedExecutable();
if (executablePath === null) {
  console.error("packaged app not found under dist/ - run `pnpm package` first");
  process.exit(1);
}

/** An SMTP capture server; the resumed job sends through it. */
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
  // This script drives the UI by its English strings - pin the language so
  // a non-English OS locale cannot flip the assertions (ticket 24).
  set.run("language", "en");

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
  // Job B: interrupted mid-send - stuck `sending` with cursor 2 (Budi +
  // Sari sent, Andi pending). Boot recovery must turn it `paused`, and
  // the launch banner must point at it. Resume delivers exactly Andi.
  insertJob.run(
    "job-b",
    "sending",
    override,
    "Undangan Rapat - Batch 2",
    2,
    "2026-08-04 09:00:00",
    null,
  );
  insertRow.run("job-b", "rec-budi", "sent", "msg-b1", null, "2026-08-04 09:00:01");
  insertRow.run("job-b", "rec-sari", "sent", "msg-b2", null, "2026-08-04 09:00:02");
  insertRow.run("job-b", "rec-andi", "pending", null, null, null);
  // Job C: created but never run (cursor 0, one pending recipient) - the
  // one-active rule must reject its run while job B is paused.
  insertJob.run(
    "job-c",
    "pending",
    override,
    "Undangan Rapat - Batch 3",
    0,
    "2026-08-05 09:00:00",
    null,
  );
  insertRow.run("job-c", "rec-andi", "pending", null, null, null);
  db.close();
}

let smtp;
let app;
const errors = [];
const userDataDir = mkdtempSync(join(tmpdir(), "email-blast-quit-resume-e2e-"));
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

  // --- Boot recovery + one-time launch banner ---
  await page.waitForSelector("text=Send paused", { timeout: 15000 });
  await page.waitForSelector("text=Undangan Rapat - Batch 2 - 2 of 3 sent");
  console.log("boot: the interrupted `sending` job was recovered and the banner names it");

  // The recovered job reads as paused in Logs (the cursor is intact).
  await page.click('aside a:has-text("Logs")');
  await page.waitForSelector("text=Paused - 2 of 3 sent", { timeout: 15000 });
  console.log("boot: Logs shows the recovered job as paused with its delivered count");

  // --- One-active-job rule: a second run is rejected while it is paused ---
  const blocked = await page.evaluate(() =>
    window.api.send.runSend("job-c").then(
      () => ({ ok: true }),
      (error) => ({ ok: false, message: String(error) }),
    ),
  );
  if (blocked.ok || !blocked.message.includes("Another send is in progress or paused")) {
    throw new Error(`second run was not blocked with the message: ${JSON.stringify(blocked)}`);
  }
  console.log("block: a second send while the recovered job is paused is rejected");

  // --- Resume from the banner: exactly the pending recipient is sent ---
  // The banner is `main`'s first child; its Resume button is scoped there
  // because the Logs row of the paused job has an identical button.
  await page
    .locator("main > div:first-child")
    .filter({ hasText: "Send paused" })
    .getByRole("button", { name: "Resume" })
    .click();
  const deadline = Date.now() + 20000;
  while (smtp.captured.length === 0 && Date.now() < deadline) {
    await new Promise((resolveWait) => setTimeout(resolveWait, 250));
  }
  if (smtp.captured.length !== 1) {
    throw new Error("banner resume did not deliver exactly the pending recipient");
  }
  if (!smtp.captured[0].includes("Subject: Undangan Rapat - Batch 2")) {
    throw new Error("resumed email carries the wrong subject");
  }
  // The badge is scoped to the row: the status filter's dropdown also
  // contains the word "Completed".
  await page.waitForSelector(
    'tbody tr:has-text("Undangan Rapat - Batch 2") span:has-text("Completed")',
    { timeout: 15000 },
  );
  // The banner retired itself once the job completed.
  await page.waitForSelector("text=Send paused", { state: "detached", timeout: 15000 });
  // The job detail confirms the same snapshot: Andi sent, nothing re-sent.
  await page.click('tbody tr:has-text("Undangan Rapat - Batch 2")');
  await page.waitForSelector("text=3 sent · 0 failed · 0 skipped", { timeout: 15000 });
  await page.waitForSelector("tbody tr:has-text('Andi Wijaya') td:has-text('Sent')");
  console.log("resume: banner resume delivered the last recipient exactly once and completed");

  // --- With nothing active, a new send is allowed again ---
  const allowed = await page.evaluate(() =>
    window.api.send.runSend("job-c").then(
      () => ({ ok: true }),
      (error) => ({ ok: false, message: String(error) }),
    ),
  );
  if (!allowed.ok) throw new Error(`second run after completion was rejected: ${allowed.message}`);
  const deadline2 = Date.now() + 20000;
  while (smtp.captured.length < 2 && Date.now() < deadline2) {
    await new Promise((resolveWait) => setTimeout(resolveWait, 250));
  }
  if (smtp.captured.length !== 2) throw new Error("the unblocked job did not deliver its email");
  if (!smtp.captured[1].includes("Subject: Undangan Rapat - Batch 3")) {
    throw new Error("the unblocked job carries the wrong subject");
  }
  console.log("unblock: after completion a new send runs again");

  await page.screenshot({ path: join(import.meta.dirname, "quit-resume-e2e.png") });
  if (errors.length) throw new Error(`renderer console errors:\n${errors.join("\n")}`);
  console.log(
    "SMOKE PASS: boot recovery, launch banner, one-active block, and banner resume all green",
  );
} finally {
  if (app) await app.close().catch(() => {});
  if (smtp) await new Promise((resolveClose) => smtp.server.close(() => resolveClose()));
  rmSync(userDataDir, { recursive: true, force: true });
}

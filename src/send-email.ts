// send-emails-bun.ts
import path from "path";
import { mkdir, createWriteStream, existsSync } from "node:fs";
import * as XLSX from "xlsx";
import cliProgress from "cli-progress";
import nodemailer, { Transporter } from "nodemailer";

// =============== CONFIG ===============

// DRY_RUN=1 → don't actually send emails, just log
const DRY_RUN = Bun.env.DRY_RUN === "0";

// Default filenames / dirs
const DEFAULT_EXCEL = Bun.env.MAIL_EXCEL || "send-email.xlsx";
const ATTACH_DIR = Bun.env.MAIL_ATTACH_DIR || "attachments";
const LOG_FILE = Bun.env.MAIL_LOG_FILE || "emails.log";
const DEFAULT_FILE_EXT = Bun.env.MAIL_FILE_EXT || ".pdf";

// Concurrency / rate limiting (nodemailer pool)
const MAX_CONNECTIONS = Number(Bun.env.MAIL_MAX_CONN || 3);
const RATE_DELTA_MS = Number(Bun.env.MAIL_RATE_DELTA_MS || 1000);
const RATE_LIMIT = Number(Bun.env.MAIL_RATE_LIMIT || 1);

// =============== TYPES ===============

// Excel columns: No, name, email, subject, body, file
// "file" = prefix used for "<prefix>_<sanitized_name>.pdf"
type Recipient = {
  no?: string;
  name: string;
  email: string;
  subject?: string;
  body?: string;
  filePrefix?: string;
  file?: string; // resolved attachment path
};

// =============== HELPERS ===============

function getBaseDir(): string {
  const exeDir = path.dirname(process.execPath);
  if (Bun.env.MAIL_BASE_DIR) {
    return path.resolve(Bun.env.MAIL_BASE_DIR);
  }
  // For compiled exe: recommended to run from folder with files.
  // For dev: cwd is fine.
  return process.cwd() || exeDir;
}

function resolvePath(p: string): string {
  const base = getBaseDir();
  return path.isAbsolute(p) ? p : path.resolve(base, p);
}

function sanitizeFilename(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[^\w\s.-]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .toLowerCase();
}

function ensureDirSync(dir: string) {
  if (!existsSync(dir)) {
    mkdir(dir, { recursive: true }, () => {});
  }
}

function createTransporter(): Transporter {
  return nodemailer.createTransport({
    service: "gmail",
    pool: true,
    maxConnections: MAX_CONNECTIONS,
    rateDelta: RATE_DELTA_MS,
    rateLimit: RATE_LIMIT,
    auth: {
      user: Bun.env.SMTP_USER,
      pass: Bun.env.SMTP_PASS, // App Password
    },
  });
}

// =============== LOAD RECIPIENTS (Bun.file + XLSX.read) ===============

async function loadRecipientsFromExcel(
  excelPath: string,
): Promise<Recipient[]> {
  const f = Bun.file(excelPath);
  if (!(await f.exists())) {
    throw new Error(`Excel file not found at: ${excelPath}`);
  }

  const buf = await f.arrayBuffer();
  const workbook = XLSX.read(buf, { type: "array" });

  const sheetName = workbook.SheetNames[0];
  if (!sheetName) throw new Error("Excel has no sheets");

  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, {
    defval: "",
  });

  const recipients: Recipient[] = rows
    .map((row, idx) => {
      // normalize keys
      const lowered: Record<string, any> = {};
      Object.keys(row).forEach((k) => {
        lowered[k.toLowerCase()] = row[k];
      });

      const no = String(lowered["no"] ?? "").trim();
      const name = String(lowered["name"] ?? "").trim();
      const email = String(lowered["email"] ?? "").trim();
      const subject = String(lowered["subject"] ?? "").trim();
      const body = String(lowered["body"] ?? "").trim();
      const filePrefix = String(lowered["file"] ?? "").trim();

      if (!name || !email) {
        console.warn(`⚠️  Row ${idx + 2}: missing name/email. Skipped.`);
        return null;
      }

      return {
        no,
        name,
        email,
        subject,
        body,
        filePrefix,
      } as Recipient;
    })
    .filter(Boolean) as Recipient[];

  return recipients;
}

// =============== EMAIL BUILD & SEND ===============
async function sendEmail(
  transporter: Transporter,
  rec: Recipient,
): Promise<string> {
  let attachments: { filename: string; path: string }[] = [];

  if (rec.file) {
    if (!existsSync(rec.file)) {
      throw new Error(`Attachment not found: ${rec.file}`);
    }
    attachments = [
      {
        filename: path.basename(rec.file),
        path: rec.file,
      },
    ];
  }

  if (DRY_RUN) {
    console.log(
      `(DRY_RUN) Would send to ${rec.email} | subject="${
        rec.subject
      }" | attach=${attachments[0]?.filename || "-"}`,
    );
    return "<dry-run>";
  }

  const info = await transporter.sendMail({
    from: `"Indonesia Youth Movement" <iym@yuanabhaktinusantara.org>`,
    to: rec.email,
    subject: rec.subject,
    html: rec.body,
    attachments,
  });

  return (info.messageId || info.response || "").toString();
}

function formatEta(msRemaining: number) {
  const s = Math.max(0, Math.round(msRemaining / 1000));
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return mm ? `${mm}m ${ss}s` : `${ss}s`;
}

// =============== MAIN BULK SENDER ===============

async function sendBulkFromExcel(excelPath: string, delayMs = 0) {
  const baseDir = getBaseDir();
  const excelFull = resolvePath(excelPath);
  const attachDirFull = resolvePath(ATTACH_DIR);
  const logPath = resolvePath(LOG_FILE);

  console.log("📂 Base dir      :", baseDir);
  console.log("📄 Excel        :", excelFull);
  console.log("📁 Attach dir   :", attachDirFull);
  console.log("📝 Log file     :", logPath);
  console.log("🔧 DRY_RUN      :", DRY_RUN ? "YES" : "NO");

  ensureDirSync(attachDirFull);

  const recipients = await loadRecipientsFromExcel(excelFull);
  const total = recipients.length;
  if (!total) {
    console.log("ℹ️  No valid recipients in Excel.");
    return;
  }
  console.log(`📄 Total recipients: ${total}`);

  const transporter = createTransporter();

  // optional verify (slow, you can enable if needed)
  // if (!DRY_RUN) {
  //   await transporter.verify();
  //   console.log("📮 SMTP verified.");
  // }

  const bar = new cliProgress.SingleBar(
    {
      format:
        "📤 {bar} {percentage}% | {value}/{total} | ETA:{etaStr} | OK:{ok} Fail:{fail}",
      barCompleteChar: "█",
      barIncompleteChar: "░",
      hideCursor: true,
      fps: 30,
    },
    cliProgress.Presets.shades_classic,
  );

  let ok = 0;
  let fail = 0;
  const start = Date.now();

  const logStream = createWriteStream(logPath, { flags: "a" });
  bar.start(total, 0, { etaStr: "—", ok, fail });

  for (let i = 0; i < total; i++) {
    const rec = recipients[i];

    // resolve attachment path if filePrefix provided
    if (rec.filePrefix) {
      const safe = sanitizeFilename(rec.name);
      rec.file = path.join(
        attachDirFull,
        `${rec.filePrefix}_${safe}${DEFAULT_FILE_EXT}`,
      );
    }

    try {
      const msgId = await sendEmail(transporter, rec);
      ok++;
      logStream.write(
        `✅ ${new Date().toISOString()} - ${rec.email}: ${msgId} ${
          rec.file || ""
        }\n`,
      );
    } catch (err: any) {
      fail++;
      const msg = err?.message || String(err);
      logStream.write(
        `❌ ${new Date().toISOString()} - ${rec.email}: ${msg}\n`,
      );
      console.error(`❌ ${rec.email}: ${msg}`);
    }

    const done = i + 1;
    const elapsed = Date.now() - start;
    const avg = elapsed / done;
    const remaining = (total - done) * avg + delayMs * (total - done);
    bar.update(done, {
      etaStr: formatEta(remaining),
      ok,
      fail,
    });

    if (delayMs > 0) {
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }

  bar.stop();
  logStream.end();

  const durationSec = ((Date.now() - start) / 1000).toFixed(1);
  console.log(
    `\n🏁 Done in ${durationSec}s | OK:${ok} Fail:${fail} | Log: ${logPath}`,
  );
}

// =============== ENTRYPOINT ===============

// Usage (dev):
//   bun run send-emails-bun.ts LOA.xlsx
// After compile:
//   bun build send-emails-bun.ts --compile --outfile send-emails
//   ./send-emails LOA.xlsx
//
// Excel must contain columns (case-insensitive):
//   No | name | email | subject | body | file
// - "file" is prefix; actual attachment name = <prefix>_<sanitized_name>.pdf
// - Attachments must exist in ./attachments or MAIL_ATTACH_DIR

const excelArg = process.argv[2] || DEFAULT_EXCEL;

sendBulkFromExcel(excelArg).catch((e) => {
  console.error("❌ Fatal:", e);
  process.exit(1);
});

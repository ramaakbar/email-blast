const DRY_RUN = false; // set false kalau sudah yakin mau kirim beneran

import nodemailer, { Transporter } from "nodemailer";
import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";
import cliProgress from "cli-progress";

interface Recipient {
  name: string;
  email: string;
  file?: string; // absolute path to attachment (optional)
}

function createTransporter(): Transporter {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // gunakan App Password Gmail
    },
  });
}

function loadRecipientsFromExcel(filePath: string): Recipient[] {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const rows = XLSX.utils.sheet_to_json<Record<string, any>>(
    workbook.Sheets[sheetName],
    { defval: "" }
  );

  const recipients: Recipient[] = rows
    .map((r, idx) => {
      const name = String(r.name ?? "").trim();
      const email = String(r.email ?? "").trim();
      const fileName = String(r.file ?? "").trim(); // cukup nama file: Surat_Rama.pdf

      if (!name || !email) {
        console.warn(
          `⚠️  Baris ${idx + 2}: data kurang (name/email). Dilewati.`
        );
        return null as unknown as Recipient;
      }

      let fileAbs: string | undefined;
      if (fileName) {
        const resolved = path.resolve("./attachments", fileName);
        if (!fs.existsSync(resolved)) {
          console.warn(
            `⚠️  Lampiran tidak ditemukan untuk ${email}: ${resolved} — lanjut tanpa attachment.`
          );
        } else {
          fileAbs = resolved; // absolute path siap kirim
        }
      }

      return { name, email, file: fileAbs };
    })
    .filter(Boolean) as Recipient[];

  return recipients;
}

async function sendEmail(
  transporter: Transporter,
  recipient: Recipient
): Promise<string> {
  if (DRY_RUN) {
    // console.log(
    //   `(TEST) Email ke ${recipient.email} tidak dikirim (dry run mode)`
    // );
    return "<dry-run>";
  }

  const attachments = recipient.file
    ? [{ filename: path.basename(recipient.file), path: recipient.file }]
    : [];

  const html = `
    <div style="font-family: Arial, sans-serif; color: #222; line-height:1.5">
      <p>Halo <b>${recipient.name}</b>,</p>
      <p>Selamat! Anda lolos seleksi Bhakti Nusantara #7 – Pangandaran.</p>
      <p>Detail lebih lanjut ada pada lampiran.</p>
      <br/>
      <p>Salam hangat,<br/><b>Tim Bhakti Nusantara #7</b><br/>Indonesia Youth Movement</p>
      <hr/>
      <small style="color:#777">#MariBeraksiMembangunNegeri</small>
    </div>
  `;

  const info = await transporter.sendMail({
    from: `"Bhakti Nusantara #7" <${process.env.SMTP_USER}>`,
    to: recipient.email,
    subject: "Selamat! Anda Lolos Seleksi Bhakti Nusantara #7 🎉",
    html,
    attachments,
  });

  return (info.messageId || info.response || "").toString();
}

// ── Progress & ETA helper
function formatEta(msRemaining: number) {
  const s = Math.max(0, Math.round(msRemaining / 1000));
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return mm ? `${mm}m ${ss}s` : `${ss}s`;
}

async function sendBulkFromExcel(excelPath: string, delayMs = 600) {
  const transporter = createTransporter();

  try {
    await transporter.verify();
    console.log("📮 SMTP siap (verifikasi berhasil).");
  } catch (e) {
    console.error(
      "❌ SMTP gagal diverifikasi. Cek SMTP_USER/SMTP_PASS (App Password) dan akses akun Gmail:",
      (e as Error).message
    );
    process.exit(1);
  }

  const recipients = loadRecipientsFromExcel(excelPath);
  const total = recipients.length;
  if (!total) {
    console.log("ℹ️  Tidak ada penerima valid di Excel.");
    return;
  }
  console.log(`📄 Total penerima valid: ${total}`);

  const bar = new cliProgress.SingleBar(
    {
      format:
        "📤 {bar} {percentage}% | {value}/{total} | ETA: {etaStr} | OK:{ok} Fail:{fail}",
      barCompleteChar: "█",
      barIncompleteChar: "░",
      hideCursor: true,
      fps: 30,
    },
    cliProgress.Presets.shades_classic
  );

  let ok = 0;
  let fail = 0;
  const start = Date.now();
  bar.start(total, 0, { etaStr: "—", ok, fail });
  const logStream = fs.createWriteStream("emails.log", { flags: "a" });

  for (let i = 0; i < total; i++) {
    const r = recipients[i];
    try {
      const msgId = await sendEmail(transporter, r);
      ok++;
      logStream.write(
        `✅ ${new Date().toISOString()} - ${r.email}: ${msgId}\n`
      );
    } catch (err) {
      fail++;
      logStream.write(
        `❌ ${new Date().toISOString()} - ${r.email}: ${
          (err as Error).message
        }\n`
      );
    }

    const done = i + 1;
    const elapsed = Date.now() - start;
    const avgPerEmail = elapsed / done;
    const remaining = (total - done) * avgPerEmail + delayMs * (total - done);
    bar.update(done, { etaStr: formatEta(remaining), ok, fail });

    await new Promise((res) => setTimeout(res, delayMs)); // hindari rate limit
  }

  bar.stop();
  logStream.end();

  const durationSec = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n🏁 Selesai dalam ${durationSec}s | OK:${ok} Fail:${fail}`);
  console.log("📄 Detail log tersimpan di file: emails.log");
}

// Jalankan: ts-node sendEmailsFromExcel.ts recipients.xlsx
const excelArg = process.argv[2] || "temp.xlsx";
sendBulkFromExcel(excelArg).catch((e) => {
  console.error("❌ Fatal:", e);
  process.exit(1);
});

import nodemailer, { Transporter } from "nodemailer";
import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

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
      pass: process.env.SMTP_PASS, // App Password
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
      const fileCell = String(r.file ?? "").trim(); // nama file dari Excel

      if (!name || !email) {
        console.warn(
          `⚠️  Baris ${idx + 2}: data kurang (name/email). Dilewati.`
        );
        return null as unknown as Recipient;
      }

      let fileAbs: string | undefined;
      if (fileCell) {
        const candidate = path.resolve("./attachments", fileCell);
        if (!fs.existsSync(candidate)) {
          console.warn(
            `⚠️  Lampiran tidak ditemukan untuk ${email}: ${candidate} — lanjut tanpa attachment.`
          );
        } else {
          fileAbs = candidate; // simpan path absolut siap pakai
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
): Promise<void> {
  const attachments = recipient.file
    ? [
        {
          filename: path.basename(recipient.file),
          path: recipient.file, // sudah absolut
        },
      ]
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

  console.log(
    `✅ Terkirim ke ${recipient.email}: ${info.messageId || info.response}`
  );
}

async function sendBulkFromExcel(excelPath: string, delayMs = 600) {
  const transporter = createTransporter();

  // Verifikasi kredensial/akses SMTP dulu
  try {
    await transporter.verify();
    console.log("📮 SMTP siap (verify OK).");
  } catch (e) {
    console.error(
      "❌ SMTP verify gagal. Cek SMTP_USER/SMTP_PASS (App Password) dan akses Gmail:",
      (e as Error).message
    );
    process.exit(1);
  }

  const recipients = loadRecipientsFromExcel(excelPath);

  console.log(`📄 Total penerima valid: ${recipients.length}`);
  for (const r of recipients) {
    try {
      await sendEmail(transporter, r);
    } catch (err) {
      console.error(`❌ Gagal kirim ke ${r.email}:`, (err as Error).message);
    }
    await new Promise((res) => setTimeout(res, delayMs)); // rate limit friendly
  }
  console.log("🏁 Selesai.");
}

// Jalankan: ts-node sendEmailsFromExcel.ts recipients.xlsx
const excelArg = process.argv[2] || "temp.xlsx";
sendBulkFromExcel(excelArg).catch((e) => {
  console.error("❌ Fatal:", e);
  process.exit(1);
});

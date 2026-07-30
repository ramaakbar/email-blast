import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";
import cliProgress from "cli-progress";
import { Recipient } from "./type";
import readline from "readline";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { TEMPLATE_LOLOS, TEMPLATE_TIDAK } from "./const";
import { formatDateID, formatEta, sanitizeFilename } from "./utils";
import { promisify } from "util";
import { exec } from "child_process";
// @ts-ignore - package tidak punya typings resmi
const libre = require("libreoffice-convert"); // butuh LibreOffice terinstal
const convertAsync = promisify(libre.convert);

// === Pastikan folder output ada ===
ensureDir("./attachments");
ensureDir("./temp");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
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
      const no = String(r.no ?? "").trim();
      const name = String(r.name ?? "").trim();
      const email = String(r.email ?? "").trim();
      const instansi = String(r.instansi ?? "").trim();
      const keterangan = String(r.keterangan ?? "")
        .trim()
        .toLowerCase();

      if (!name || !email) {
        console.warn(
          `⚠️  Baris ${idx + 2}: data kurang (name/email). Dilewati.`
        );
        return null as unknown as Recipient;
      }

      return { no, name, email, instansi, keterangan };
    })
    .filter(Boolean) as Recipient[];

  return recipients;
}

async function generateLetterPDF(rec: Recipient): Promise<string> {
  const templatePath =
    rec.keterangan === "lolos" ? TEMPLATE_LOLOS : TEMPLATE_TIDAK;

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template tidak ditemukan: ${templatePath}`);
  }

  // Baca template DOCX
  const content = fs.readFileSync(templatePath, "binary");
  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

  // Data yang akan di-inject ke template
  const data = {
    no: rec.no,
    name: rec.name,
    instansi: rec.instansi || "-",
    keterangan: rec.keterangan,
    tanggal: formatDateID(new Date()),
  };

  doc.setData(data);

  try {
    doc.render();
  } catch (err: any) {
    throw new Error(
      `Gagal render template (${path.basename(templatePath)}): ${err.message}`
    );
  }

  const buf = doc.getZip().generate({ type: "nodebuffer" });
  const fileType = rec.keterangan === "lolos" ? "LOABN" : "SCREENINGRESULTBN";
  const safeName = sanitizeFilename(rec.name);
  // const outDocx = path.resolve("./temp", `${fileType}#7_${safeName}.docx`);
  const outPdf = path.resolve("./attachments", `${fileType}#7_${safeName}.pdf`);

  // fs.writeFileSync(outDocx, buf);

  // Konversi ke PDF (butuh LibreOffice)
  try {
    const pdfBuf = await convertAsync(buf, ".pdf", undefined);
    fs.writeFileSync(outPdf, pdfBuf);
    return outPdf;
  } catch (e: any) {
    console.warn(
      `⚠️  Konversi DOCX→PDF gagal untuk ${rec.email}. Kirim DOCX saja. Error: ${e.message}`
    );
    // fallback: kirim DOCX jika PDF gagal
    return "";
  }
}

async function sendBulkFromExcel(excelPath: string, delayMs = 600) {
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
      // 1) generate surat personal (PDF atau fallback DOCX)
      const letterPath = await generateLetterPDF(r);
      r.file = letterPath;

      ok++;
      logStream.write(`✅ ${new Date().toISOString()} - ${r.email}:\n`);
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

// Jalankan: ts-node sendEmailsFromExcel.withTemplates.ts recipients.xlsx

const excelArg = process.argv[2] || "LOA.xlsx";
sendBulkFromExcel(excelArg, 0).catch((e) => {
  console.error("❌ Fatal:", e);
  process.exit(1);
});

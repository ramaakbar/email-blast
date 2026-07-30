// generate-attachments-bulk.ts
import path from "path";
import * as XLSX from "xlsx";
import cliProgress from "cli-progress";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { mkdir, writeFile, rename, unlink } from "node:fs/promises";
import { existsSync, createWriteStream, mkdirSync } from "node:fs";
import crypto from "crypto";

// ========== CONFIG ==========

const EXCEL_DEFAULT = "pf.xlsx";
const ATTACH_DIR = "./attachments";
const TEMP_DIR = "./temp";
// const TEMPLATE_LOLOS = "./templates/lolos.docx";
// const TEMPLATE_SYARAT = "./templates/bersyarat.docx";
const TEMPLATE_FF = "./templates/ff.docx";
const TEMPLATE_SF_JAKARTA = "./templates/sf-jakarta.docx";
const TEMPLATE_SF_PADANG = "./templates/sf-padang.docx";
const TEMPLATE_PF_JAKARTA = "./templates/pf-jakarta.docx";
const TEMPLATE_PF_PADANG = "./templates/pf-padang.docx";
const TEMPLATE_PF_ALAHAN = "./templates/pf-alahan.docx";
const LOG_FILE = "generate-attachments.log";
const SOFFICE_CMD = process.env.SOFFICE_PATH || "soffice"; // override kalau path-nya beda

// ========== TYPES ==========

type Recipient = {
  no?: string;
  name: string;
  email: string;
  instansi?: string;
  keterangan: string;
};

type ConvertJob = {
  tmpDocx: string;
  outPdfPath: string;
  email: string;
  name: string;
};

// ========== UTIL ==========

function ensureDir(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function sanitizeFilename(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[^\w\s.-]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .toLowerCase();
}

function formatDateID(d: Date): string {
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatEta(msRemaining: number) {
  const s = Math.max(0, Math.round(msRemaining / 1000));
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return mm ? `${mm}m ${ss}s` : `${ss}s`;
}

// ========== LOAD EXCEL (Bun.file + XLSX.read) ==========

async function loadRecipientsFromExcel(filePath: string): Promise<Recipient[]> {
  const f = Bun.file(filePath);
  if (!(await f.exists())) {
    throw new Error(`Excel file not found at: ${filePath}`);
  }

  const buf = await f.arrayBuffer();
  const workbook = XLSX.read(buf, { type: "array" });

  const sheetName = workbook.SheetNames[0];
  if (!sheetName) throw new Error("Excel has no sheets.");

  const rows = XLSX.utils.sheet_to_json<Record<string, any>>(
    workbook.Sheets[sheetName],
    { defval: "" },
  );

  const recipients: Recipient[] = rows
    .map((r, idx) => {
      const lower: Record<string, any> = {};
      Object.keys(r).forEach((k) => {
        lower[k.toLowerCase()] = r[k];
      });

      const no = String(lower["no"] ?? "").trim();
      const name = String(lower["name"] ?? "").trim();
      const email = String(lower["email"] ?? "").trim();
      const instansi = String(lower["instansi"] ?? "").trim();
      const keterangan = String(lower["keterangan"] ?? "")
        .trim()
        .toLowerCase();

      if (!name) {
        console.warn(
          `⚠️  Baris ${idx + 2}: data kurang (name/email). Dilewati.`,
        );
        return null;
      }

      return { no, name, email, instansi, keterangan } as Recipient;
    })
    .filter(Boolean) as Recipient[];

  return recipients;
}

// ========== GENERATE 1 DOCX (TEMP) UNTUK 1 ORANG ==========

async function createLetterJob(rec: Recipient): Promise<ConvertJob> {
  // const templatePath =
    // rec.keterangan === "lolos" ? TEMPLATE_LOLOS : TEMPLATE_SYARAT;
  const templatePath =
    rec.keterangan === "fully funded" ? TEMPLATE_FF : rec.keterangan === "special funded jakarta" ? TEMPLATE_SF_JAKARTA : rec.keterangan === "special funded padang" ? TEMPLATE_SF_PADANG : rec.keterangan === "partial funded padang" ? TEMPLATE_PF_PADANG : rec.keterangan === "partial funded jakarta" ? TEMPLATE_PF_JAKARTA : rec.keterangan === "partial funded alahan" ? TEMPLATE_PF_ALAHAN : TEMPLATE_PF_JAKARTA;

  const templateFile = Bun.file(templatePath);
  if (!(await templateFile.exists())) {
    throw new Error(`Template tidak ditemukan: ${templatePath}`);
  }

  const contentBuf = Buffer.from(await templateFile.arrayBuffer());
  const zip = new PizZip(contentBuf);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

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
      `Gagal render template (${path.basename(templatePath)}): ${err.message}`,
    );
  }

  const docxBuf = doc.getZip().generate({ type: "nodebuffer" });

  const fileType = rec.keterangan === "lolos" ? "HSA_KBK" : "HS_KBK";
  const safeName = sanitizeFilename(rec.name);

  const outPdfPath = path.resolve(ATTACH_DIR, `${fileType}_${safeName}.pdf`);

  const tmpDocx = path.join(
    TEMP_DIR,
    `bn-${fileType}-${crypto.randomUUID()}.docx`,
  );

  await writeFile(tmpDocx, docxBuf);

  return { tmpDocx, outPdfPath, email: rec.email, name: rec.name };
}

// ========== BULK DOCX → PDF (1x soffice per folder) ==========

async function bulkConvertDocxToPdf(jobs: ConvertJob[]) {
  if (!jobs.length) return;

  // Group by output dir in case someday beda folder
  const groups = new Map<string, ConvertJob[]>();
  for (const job of jobs) {
    const dir = path.dirname(job.outPdfPath);
    if (!groups.has(dir)) groups.set(dir, []);
    groups.get(dir)!.push(job);
  }

  for (const [outDir, dirJobs] of groups.entries()) {
    await mkdir(outDir, { recursive: true });

    const files = dirJobs.map((j) => j.tmpDocx);
    const args = [
      SOFFICE_CMD,
      "--headless",
      "--convert-to",
      "pdf",
      "--outdir",
      outDir,
      ...files,
    ];

    const proc = Bun.spawn(args, {
      stdout: "pipe",
      stderr: "pipe",
    });

    const code = await proc.exited;
    const stderrText = await new Response(proc.stderr).text();

    if (code !== 0) {
      // bersihkan tmp kalau gagal
      await Promise.all(dirJobs.map((j) => unlink(j.tmpDocx).catch(() => {})));
      throw new Error(
        `LibreOffice gagal (code ${code}) untuk folder ${outDir}: ${stderrText}`,
      );
    }

    // Map-kan hasil ke nama final
    for (const job of dirJobs) {
      const produced = path.join(
        outDir,
        path.basename(job.tmpDocx).replace(/\.docx$/i, ".pdf"),
      )

      if (!existsSync(produced)) {
        console.error(
          `⚠️ PDF tidak ditemukan untuk ${job.tmpDocx}. Cek stdout/stderr LibreOffice.`,
        );
        continue;
      }

      if (produced !== job.outPdfPath) {
        await rename(produced, job.outPdfPath);
      }

      await unlink(job.tmpDocx).catch(() => {});
    }
  }
}

// ========== BULK GENERATOR (ONLY ATTACHMENTS) ==========

async function generateAttachmentsFromExcel(excelPath: string) {
  ensureDir(ATTACH_DIR);
  ensureDir(TEMP_DIR);

  const recipients = await loadRecipientsFromExcel(excelPath);
  const total = recipients.length;

  if (!total) {
    console.log("ℹ️  Tidak ada penerima valid di Excel.");
    return;
  }

  console.log(`📄 Total penerima valid: ${total}`);
  console.log("📁 Attachments dir:", path.resolve(ATTACH_DIR));
  console.log("🧩 Menggunakan batch LibreOffice (lebih cepat).");

  const logStream = createWriteStream(LOG_FILE, { flags: "a" });

  // Phase 1: generate DOCX temp (Docxtemplater)
  const barGen = new cliProgress.SingleBar(
    {
      format:
        "📝 Generate DOCX {bar} {percentage}% | {value}/{total} | ETA:{etaStr}",
      barCompleteChar: "█",
      barIncompleteChar: "░",
      hideCursor: true,
    },
    cliProgress.Presets.shades_classic,
  );

  let jobs: ConvertJob[] = [];
  let genFail = 0;
  const startGen = Date.now();
  barGen.start(total, 0, { etaStr: "—" });

  for (let i = 0; i < total; i++) {
    const r = recipients[i];
    try {
      const job = await createLetterJob(r);
      jobs.push(job);
    } catch (err: any) {
      genFail++;
      logStream.write(`❌ DOCX gagal untuk ${r.email}: ${err.message}\n`);
    }

    const done = i + 1;
    const elapsed = Date.now() - startGen;
    const avg = elapsed / done;
    const remaining = (total - done) * avg;
    barGen.update(done, { etaStr: formatEta(remaining) });
  }

  barGen.stop();

  console.log(
    `📝 DOCX OK: ${jobs.length}, Gagal: ${genFail} (detail di ${LOG_FILE})`,
  );

  if (!jobs.length) {
    logStream.end();
    console.log("⚠️ Tidak ada DOCX yang bisa dikonversi. Stop.");
    return;
  }

  // Phase 2: bulk convert DOCX → PDF
  const barPdf = new cliProgress.SingleBar(
    {
      format:
        "📄 Konversi PDF {bar} {percentage}% | {value}/{total} | ETA:{etaStr}",
      barCompleteChar: "█",
      barIncompleteChar: "░",
      hideCursor: true,
    },
    cliProgress.Presets.shades_classic,
  );

  const startPdf = Date.now();
  barPdf.start(jobs.length, 0, { etaStr: "—" });

  // Kita tidak punya progress per file dari soffice,
  // jadi kita update setelah selesai (anggap sekaligus).
  try {
    await bulkConvertDocxToPdf(jobs);
    barPdf.update(jobs.length, { etaStr: "0s" });
  } catch (err: any) {
    barPdf.stop();
    logStream.write(`❌ Konversi PDF gagal batch: ${err.message}\n`);
    logStream.end();
    console.error("❌ Konversi PDF gagal:", err.message);
    process.exit(1);
  }

  barPdf.stop();
  const pdfDuration = ((Date.now() - startPdf) / 1000).toFixed(1);

  // Log success per job
  for (const job of jobs) {
    if (existsSync(job.outPdfPath)) {
      logStream.write(`✅ PDF ${job.email} -> ${job.outPdfPath}\n`);
    } else {
      logStream.write(`⚠️ PDF hilang untuk ${job.email} (${job.tmpDocx})\n`);
    }
  }

  logStream.end();

  console.log(
    `📄 Konversi PDF selesai dalam ${pdfDuration}s. Lihat ${LOG_FILE} untuk detail.`,
  );
}

// ========== ENTRYPOINT ==========
//
// Jalankan (dev):
//   bun run generate-attachments-bulk.ts LOA.xlsx
//
// Setelah compile:
//   bun build generate-attachments-bulk.ts --compile --outfile gen-attach
//   ./gen-attach LOA.xlsx
//
// Pastikan:
//   - LibreOffice terinstal
//   - "soffice" ada di PATH (atau set SOFFICE_PATH)
//   - Template ada di ./templates/
//   - Excel punya kolom: no, name, email, instansi, keterangan

const excelArg = process.argv[2] || EXCEL_DEFAULT;

generateAttachmentsFromExcel(excelArg).catch((e) => {
  console.error("❌ Fatal:", e);
  process.exit(1);
});

import path from "path";
import * as XLSX from "xlsx";
import { PDFDocument, rgb } from "pdf-lib";
import { mkdir } from "node:fs/promises";
import fontkit from "@pdf-lib/fontkit";

// ========= CONFIG =========
const DEFAULT_TEMPLATE = process.env.CERT_TEMPLATE || "./templates/SERTIFIKAT_1.png";
const DEFAULT_EXCEL = process.env.CERT_EXCEL || "names.xlsx";
const OUTPUT_DIR = process.env.CERT_OUTPUT_DIR || "certificates";

const NAME_Y = process.env.CERT_NAME_Y ? Number(process.env.CERT_NAME_Y) : 1200;
const NAME_COLOR = rgb(0.15294118, 0.0627451, 0.04313725);
const NAME_GREENCOLOR = rgb(0.09, 0.267, 0.224);

const NAME_COLUMN = (process.env.CERT_NAME_COLUMN || "name").toLowerCase();
// ==== UTILS ====
type Recipient = { no: string; name: string };

function getBaseDir(): string {
  const exeDir = path.dirname(process.execPath);
  return process.env.CERT_BASE_DIR
    ? path.resolve(process.env.CERT_BASE_DIR)
    : process.cwd() || exeDir;
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

// ==== LOAD EXCEL ====
async function loadRecipients(excelPath: string): Promise<Recipient[]> {
  const excelFile = Bun.file(excelPath);
  if (!(await excelFile.exists())) throw new Error(`Excel not found: ${excelPath}`);

  const buf = await excelFile.arrayBuffer();
  const wb = XLSX.read(buf, { type: "array" });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  if (!sheet) throw new Error("Excel has no sheets.");

  const rows = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, {
    defval: "",
  });
  const out: Recipient[] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i],
      low: Record<string, any> = {};
    for (const k of Object.keys(row)) low[k.toLowerCase()] = row[k];
    const no = String(low["no"] ?? "").trim();
    const name = String(low[NAME_COLUMN] ?? low["name"] ?? "").trim();
    if (!name) continue;
    out.push({ no, name });
  }
  return out;
}

// ==== CORE RENDER (assets sudah di-preload) ====
type Assets = {
  templateBytes: Uint8Array;
  templateKind: "png" | "jpg";
  fontCustomBytes: ArrayBuffer;
  fontPoppinsBytes: ArrayBuffer;
};

async function generateCertificateFor(rec: Recipient, assets: Assets): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);

  // embed background (tiap dokumen harus embed lagi — ini by design pdf-lib)
  const bg =
    assets.templateKind === "png"
      ? await pdf.embedPng(assets.templateBytes)
      : await pdf.embedJpg(assets.templateBytes);

  // embed fonts from cached bytes (no disk I/O)
  const customFont = await pdf.embedFont(assets.fontCustomBytes, {
    subset: true,
  });
  const poppinsFont = await pdf.embedFont(assets.fontPoppinsBytes, {
    subset: true,
  });

  const w = bg.width,
    h = bg.height;
  const page = pdf.addPage([w, h]);

  page.drawImage(bg, { x: 0, y: 0, width: w, height: h });

  // nomor
  // const nomorText = `${rec.no}/12/BKS-IYM/VII/2026`;
  // page.drawText(nomorText, {
  //   x: (w - poppinsFont.widthOfTextAtSize(nomorText, 58)) / 2,
  //   y: 880,
  //   size: 65,
  //   font: poppinsFont,
  //   color: NAME_GREENCOLOR,
  // });

  // nama
  const nameSize = 140;
  page.drawText(rec.name, {
    x: (w - customFont.widthOfTextAtSize(rec.name, nameSize)) / 2,
    y: 715, // atau NAME_Y jika mau konfig
    size: nameSize,
    font: customFont,
    color: NAME_GREENCOLOR,
  });

  return await pdf.save();
}

// ==== SIMPLE CONCURRENCY LIMITER ====
function pLimit(concurrency: number) {
  let active = 0;
  const queue: (() => void)[] = [];
  const next = () => {
    active--;
    if (queue.length) queue.shift()!();
  };
  return async <T>(fn: () => Promise<T>) => {
    if (active >= concurrency) await new Promise<void>((res) => queue.push(res));
    active++;
    try {
      return await fn();
    } finally {
      next();
    }
  };
}

// ==== MAIN ====
async function main() {
  const baseDir = getBaseDir();
  const templatePath = resolvePath(process.argv[2] || DEFAULT_TEMPLATE);
  const excelPath = resolvePath(process.argv[3] || DEFAULT_EXCEL);
  const outputDir = resolvePath(OUTPUT_DIR);

  console.log("📂 Base dir      :", baseDir);
  console.log("🖼  Template     :", templatePath);
  console.log("📄 Excel        :", excelPath);
  console.log("📁 Output dir   :", outputDir);

  await mkdir(outputDir, { recursive: true });

  // PRELOAD assets ONCE (no I/O di hot path)
  const templateFile = Bun.file(templatePath);
  if (!(await templateFile.exists())) throw new Error(`Template not found: ${templatePath}`);
  const templateBytes = new Uint8Array(await templateFile.arrayBuffer());
  const ext = path.extname(templatePath).toLowerCase();
  const templateKind: "png" | "jpg" = ext === ".png" ? "png" : "jpg";

  const fontCustomBytes = await Bun.file(
    resolvePath("./fonts/TheSeasons/The Seasons.ttf"),
  ).arrayBuffer();
  const fontPoppinsBytes = await Bun.file(
    resolvePath("./fonts/Poppins/Poppins-Regular.ttf"),
  ).arrayBuffer();

  const assets: Assets = {
    templateBytes,
    templateKind,
    fontCustomBytes,
    fontPoppinsBytes,
  };

  // LOAD recipients
  const recipients = await loadRecipients(excelPath);
  if (!recipients.length) {
    console.log("ℹ️  No valid recipients found.");
    return;
  }
  console.log(`✅ Loaded ${recipients.length} recipients.`);

  // CONCURRENCY: gunakan jumlah CPU (atau set env CERT_CONCURRENCY)
  const concurrency = 4;
  const limit = pLimit(Math.max(1, concurrency));
  let ok = 0,
    fail = 0;

  // PARALLEL with limit
  const tasks = recipients.map((rec) =>
    limit(async () => {
      const safe = sanitizeFilename(rec.name);
      const outPath = path.join(outputDir, `${rec.name}.pdf`);
      try {
        const pdfBytes = await generateCertificateFor(rec, assets);
        await Bun.write(outPath, pdfBytes);
        ok++;
        if (ok % 50 === 0) console.log(`🎓 ${ok}/${recipients.length}...`);
      } catch (e: any) {
        fail++;
        console.error(`❌ "${rec.name}": ${e?.message || e}`);
      }
    }),
  );

  await Promise.all(tasks);

  console.log(`\n🏁 Done. Success: ${ok}, Failed: ${fail}. Files in: ${outputDir}`);
}

main().catch((err) => {
  console.error("❌ Fatal:", err);
  process.exit(1);
});

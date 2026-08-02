/**
 * Ticket 05 prototype: fill templates/ff.docx via docxtemplater + PizZip
 * (the exact libraries the existing CLI uses), then LibreOffice headless converts.
 *
 * Usage: bun fill.ts [count] [outdir]
 */
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const COUNT = Number(process.argv[2] ?? 3);
const OUTDIR = process.argv[3] ?? ".scratch/desktop-app/prototype-05/filled";
const TEMPLATE = "templates/ff.docx";

const real = [
  { name: "Budi Santoso", no: "001" },
  { name: "Siti Rahmah", no: "002" },
  { name: "Agus Wijaya", no: "003" },
];

mkdirSync(OUTDIR, { recursive: true });

const t0 = performance.now();
for (let i = 0; i < COUNT; i++) {
  const data = i < real.length ? real[i] : { name: `Peserta ${i + 1}`, no: String(i + 1).padStart(3, "0") };
  const zip = new PizZip(readFileSync(TEMPLATE));
  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
  doc.render(data);
  const buf = doc.getZip().generate({ type: "nodebuffer", compression: "DEFLATE" });
  writeFileSync(join(OUTDIR, `ff-${String(i + 1).padStart(3, "0")}.docx`), buf);
}
const elapsed = ((performance.now() - t0) / 1000).toFixed(2);
console.log(`filled ${COUNT} docs in ${elapsed}s (${(elapsed / COUNT).toFixed(3)}s/doc)`);

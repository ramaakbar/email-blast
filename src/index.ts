// /**
//  * sendEmailsFromExcel.withTemplates.ts
//  * Jalankan: npx ts-node sendEmailsFromExcel.withTemplates.ts recipients.xlsx
//  *
//  * ENV:
//  *   SMTP_USER, SMTP_PASS  (Gmail App Password)
//  *
//  * Struktur Excel (sheet pertama, header persis):
//  *   name | email | instansi | keterangan
//  *     - keterangan: "lolos" atau yang lain (akan pakai template_tidak_lolos)
//  *
//  * Folder yang dipakai:
//  *   ./templates/template-lolos.docx
//  *   ./templates/template-tidak-lolos.docx
//  *   ./attachments/           (PDF hasil akhir)
//  *   ./temp/                  (.docx hasil merge sebelum dikonversi)
//  *
//  * Output nama file PDF:
//  *   ./attachments/letterofacceptence_<nama_sanitized>.pdf
//  */

// import nodemailer, { Transporter } from "nodemailer";
// import fs from "fs";
// import path from "path";
// import * as XLSX from "xlsx";
// import cliProgress from "cli-progress";

// import { Recipient } from "./type";
// import { sanitizeFilename } from "./utils";

// const DRY_RUN = false; // set true untuk test tanpa kirim email

// // === Konstanta path template ===
// const TEMPLATE_DIR = "./templates";
// const TEMPLATE_LOLOS = path.resolve(TEMPLATE_DIR, "template-lolos.docx");
// const TEMPLATE_TIDAK = path.resolve(TEMPLATE_DIR, "template-tidak-lolos.docx");

// // === Pastikan folder output ada ===
// ensureDir("./attachments");
// ensureDir("./temp");

// function ensureDir(dir: string) {
//   if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
// }

// function createTransporter(): Transporter {
//   return nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS, // App Password Gmail
//     },
//   });
// }

// function loadRecipientsFromExcel(filePath: string): Recipient[] {
//   const workbook = XLSX.readFile(filePath);
//   const sheetName = workbook.SheetNames[0];
//   const rows = XLSX.utils.sheet_to_json<Record<string, any>>(
//     workbook.Sheets[sheetName],
//     { defval: "" }
//   );

//   const recipients: Recipient[] = rows
//     .map((r, idx) => {
//       const no = String(r.no ?? "").trim();
//       const name = String(r.name ?? "").trim();
//       const email = String(r.email ?? "").trim();
//       const instansi = String(r.instansi ?? "").trim();
//       const keterangan = String(r.keterangan ?? "")
//         .trim()
//         .toLowerCase();

//       if (!name || !email) {
//         console.warn(
//           `⚠️  Baris ${idx + 2}: data kurang (name/email). Dilewati.`
//         );
//         return null as unknown as Recipient;
//       }

//       return { no, name, email, instansi, keterangan };
//     })
//     .filter(Boolean) as Recipient[];

//   return recipients;
// }

// function buildEmailHTML(): string {
//   return `
//   <div style="font-family: Arial, sans-serif; color: #222; line-height:1.6">
//     <p>📢<b>PENGUMUMAN HASIL SELEKSI BERKAS</b> 📢</p>
//     <p><b>Fully Funded Indonesia Youth Movement Bhakti Nusantara#7 - Dusun Nyalindung, Pangandaran</b></p>
//     <p>Dear, Sobat IYM! 🌟</p>
//     <p>Melalui email ini, kami ingin menginformasikan hasil seleksi berkas pendaftaran untuk program Bhakti Nusantara #7 Dusun Nyalindung, Pangandaran.</p>
//     <p><b>Silakan cek hasil seleksi kamu melalui lampiran file di bawah ini ya! 📎</b></p>
//     <p>Terima kasih atas antusiasme dan dedikasi luar biasa yang telah kamu tunjukkan selama proses seleksi berlangsung. Kami sangat mengapresiasi semangat dan dedikasi yang telah kamu tunjukkan untuk berkontribusi melalui program ini.</p>
//     <p>Bagi kamu yang belum lolos kali ini, jangan berkecil hati 🌱<br/>
//     Masih ada banyak kesempatan di program IYM berikutnya. Teruslah berproses, percaya pada kemampuan diri sendiri, dan tetap semangat untuk memberi dampak positif bagi sekitar 💪✨</p>
//     <p>Terima kasih telah menjadi bagian dari perjalanan Bhakti Nusantara #7!</p>
//     <p>Jangan lupa untuk terus pantau media sosial Indonesia Youth Movement agar tidak ketinggalan informasi terbaru dan kesempatan menarik lainnya 🚀</p>
//     <br/>
//     <p style="color:#777"><i>[Harap jangan membalas pesan ini]</i></p>
//     <br/>
//     <p>Best Regards,<br/>
//     <b style="color: rgb(106, 168, 79);">Indonesia Youth Movement Committees</b></p>
//   </div>
//   `;
// }

// // === Generate DOCX dari template + konversi ke PDF ===
// // async function generateLetterPDF(rec: Recipient): Promise<string> {
// //   const templatePath =
// //     rec.keterangan === "lolos" ? TEMPLATE_LOLOS : TEMPLATE_TIDAK;

// //   if (!fs.existsSync(templatePath)) {
// //     throw new Error(`Template tidak ditemukan: ${templatePath}`);
// //   }

// //   // Baca template DOCX
// //   const content = fs.readFileSync(templatePath, "binary");
// //   const zip = new PizZip(content);
// //   const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

// //   // Data yang akan di-inject ke template
// //   const data = {
// //     no: rec.no,
// //     name: rec.name,
// //     instansi: rec.instansi || "-",
// //     keterangan: rec.keterangan,
// //     tanggal: formatDateID(new Date()),
// //   };

// //   doc.setData(data);

// //   try {
// //     doc.render();
// //   } catch (err: any) {
// //     throw new Error(
// //       `Gagal render template (${path.basename(templatePath)}): ${err.message}`
// //     );
// //   }

// //   const buf = doc.getZip().generate({ type: "nodebuffer" });

// //   const safeName = sanitizeFilename(rec.name);
// //   const outDocx = path.resolve("./temp", `LOABN#7_${safeName}.docx`);
// //   const outPdf = path.resolve("./attachments", `LOABN#7_${safeName}.pdf`);

// //   fs.writeFileSync(outDocx, buf);

// //   // Konversi ke PDF (butuh LibreOffice)
// //   try {
// //     const pdfBuf = await convertAsync(buf, ".pdf", undefined);
// //     fs.writeFileSync(outPdf, pdfBuf);
// //     return outPdf;
// //   } catch (e: any) {
// //     console.warn(
// //       `⚠️  Konversi DOCX→PDF gagal untuk ${rec.email}. Kirim DOCX saja. Error: ${e.message}`
// //     );
// //     // fallback: kirim DOCX jika PDF gagal
// //     return outDocx;
// //   }
// // }

// async function sendEmail(
//   transporter: Transporter,
//   recipient: Recipient
// ): Promise<string> {
//   if (DRY_RUN) {
//     return "<dry-run>";
//   }

//   if (!recipient.file || !fs.existsSync(recipient.file)) {
//     throw new Error("Attachment belum dibuat / tidak ditemukan.");
//   }

//   const attachments = [
//     {
//       filename: path.basename(recipient.file),
//       path: recipient.file,
//     },
//   ];

//   const html = buildEmailHTML();
//   const subject =
//     "BHAKTI NUSANTARA#7 PANGANDARAN - FULLY FUNDED DOCUMENT SCREENING RESULT";

//   const info = await transporter.sendMail({
//     from: `"Bhakti Nusantara #7" <${process.env.SMTP_USER}>`,
//     to: recipient.email,
//     subject,
//     html,
//     attachments,
//   });

//   return (info.messageId || info.response || "").toString();
// }

// // ── Progress & ETA helper
// function formatEta(msRemaining: number) {
//   const s = Math.max(0, Math.round(msRemaining / 1000));
//   const mm = Math.floor(s / 60);
//   const ss = s % 60;
//   return mm ? `${mm}m ${ss}s` : `${ss}s`;
// }

// async function sendBulkFromExcel(excelPath: string, delayMs = 600) {
//   const transporter = createTransporter();

//   // try {
//   //   await transporter.verify();
//   //   console.log("📮 SMTP siap (verifikasi berhasil).");
//   // } catch (e) {
//   //   console.error(
//   //     "❌ SMTP gagal diverifikasi. Cek SMTP_USER/SMTP_PASS (App Password) dan akses akun Gmail:",
//   //     (e as Error).message
//   //   );
//   //   process.exit(1);
//   // }

//   const recipients = loadRecipientsFromExcel(excelPath);
//   const total = recipients.length;
//   if (!total) {
//     console.log("ℹ️  Tidak ada penerima valid di Excel.");
//     return;
//   }
//   console.log(`📄 Total penerima valid: ${total}`);

//   const bar = new cliProgress.SingleBar(
//     {
//       format:
//         "📤 {bar} {percentage}% | {value}/{total} | ETA: {etaStr} | OK:{ok} Fail:{fail}",
//       barCompleteChar: "█",
//       barIncompleteChar: "░",
//       hideCursor: true,
//       fps: 30,
//     },
//     cliProgress.Presets.shades_classic
//   );

//   let ok = 0;
//   let fail = 0;
//   const start = Date.now();
//   bar.start(total, 0, { etaStr: "—", ok, fail });

//   const logStream = fs.createWriteStream("emails.log", { flags: "a" });

//   for (let i = 0; i < total; i++) {
//     const r = recipients[i];

//     try {
//       const safeName = sanitizeFilename(r.name);
//       const fileType = r.keterangan === "lolos" ? "LOABN" : "SCREENINGRESULTBN";
//       r.file = path.resolve("./attachments", `${fileType}#7_${safeName}.pdf`);
//       // 2) kirim email
//       const msgId = await sendEmail(transporter, r);
//       ok++;
//       logStream.write(
//         `✅ ${new Date().toISOString()} - ${r.email}: ${msgId}:${r.file}\n`
//       );
//     } catch (err) {
//       fail++;
//       logStream.write(
//         `❌ ${new Date().toISOString()} - ${r.email}: ${
//           (err as Error).message
//         }\n`
//       );
//     }

//     const done = i + 1;
//     const elapsed = Date.now() - start;
//     const avgPerEmail = elapsed / done;
//     const remaining = (total - done) * avgPerEmail + delayMs * (total - done);
//     bar.update(done, { etaStr: formatEta(remaining), ok, fail });

//     await new Promise((res) => setTimeout(res, delayMs)); // hindari rate limit
//   }

//   bar.stop();
//   logStream.end();

//   const durationSec = ((Date.now() - start) / 1000).toFixed(1);
//   console.log(`\n🏁 Selesai dalam ${durationSec}s | OK:${ok} Fail:${fail}`);
//   console.log("📄 Detail log tersimpan di file: emails.log");
// }

// // Jalankan: ts-node sendEmailsFromExcel.withTemplates.ts recipients.xlsx
// const excelArg = process.argv[2] || "LOA.xlsx";
// sendBulkFromExcel(excelArg).catch((e) => {
//   console.error("❌ Fatal:", e);
//   process.exit(1);
// });

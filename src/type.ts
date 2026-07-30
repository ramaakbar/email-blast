// ==== Tipe data ====
export interface Recipient {
  no: string;
  name: string;
  email: string;
  instansi: string;
  keterangan: "lolos" | "tidak lolos"; // "lolos" / lainnya
  file?: string; // absolute path attachment siap kirim (PDF/DOCX)
}

// ==== Util ====
export function sanitizeFilename(s: string): string {
  return s
    .normalize("NFKD")
    .replace(/[^\w\s.-]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .toLowerCase();
}

export function formatDateID(d = new Date()): string {
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatEta(msRemaining: number) {
  const s = Math.max(0, Math.round(msRemaining / 1000));
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return mm ? `${mm}m ${ss}s` : `${ss}s`;
}

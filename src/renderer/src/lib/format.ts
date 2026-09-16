/**
 * SQLite stores `datetime('now')` as UTC "YYYY-MM-DD HH:MM:SS". JS parses
 * space-separated stamps as local time, so normalize to an ISO UTC string
 * first and let Intl render it in the user's timezone. Shared by the
 * recipients, templates, and Logs screens so every stamp renders alike.
 */
export function formatTimestamp(sqliteUtc: string): string {
  const date = new Date(`${sqliteUtc.replace(" ", "T")}Z`);
  if (Number.isNaN(date.getTime())) return sqliteUtc;
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

/**
 * The elapsed time of a finished job, "12s" / "1m 23s" / "1h 05m" style -
 * null while the job has no completion stamp.
 */
export function formatDuration(startedAt: string, completedAt: string | null): string | null {
  if (completedAt === null) return null;
  const start = new Date(`${startedAt.replace(" ", "T")}Z`);
  const end = new Date(`${completedAt.replace(" ", "T")}Z`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  const seconds = Math.max(0, Math.round((end.getTime() - start.getTime()) / 1000));
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, "0")}m`;
}

/**
 * The UTC "YYYY-MM-DD HH:MM:SS" stamps bounding one local calendar day
 * (e.g. "2026-08-04"). The logs date filter compares against the UTC
 * creation stamps, so the user's local day is converted here - otherwise
 * a job created just after local midnight would fall on the previous UTC
 * day and silently drop out of a "from today" filter.
 */
/** A Date as the SQLite UTC "YYYY-MM-DD HH:MM:SS" stamp. */
function utcStamp(date: Date): string {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

export function localDayToUtcRange(date: string): { from: string; to: string } {
  // A date-only stamp with a time parses as local time (no Z suffix).
  return {
    from: utcStamp(new Date(`${date}T00:00:00`)),
    to: utcStamp(new Date(`${date}T23:59:59`)),
  };
}

/**
 * Extracts a user-facing message from an IPC rejection. Electron prefixes
 * rejected invokes with "Error invoking remote method '<channel>': Error: ",
 * which is internal noise for error banners.
 */
export function errorMessage(err: unknown, fallback: string): string {
  if (!(err instanceof Error)) return fallback;
  const stripped = err.message.replace(/^Error invoking remote method '[^']+': Error: /, "");
  return stripped === "" ? fallback : stripped;
}

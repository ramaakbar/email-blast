/**
 * Extracts a user-facing message from an IPC rejection. Electron prefixes
 * rejected invokes with "Error invoking remote method '<channel>': " - and
 * Effect's tagged errors (the domain services) serialize their
 * "Tag: detail" message right after it, without an "Error: " marker. Both
 * shapes are stripped. The tag itself stays in the result (it names the
 * failing phase, e.g. "SmtpAuthFailed:"); errors without a detail field
 * surface as just the tag.
 */
export function errorMessage(err: unknown, fallback: string): string {
  if (!(err instanceof Error)) return fallback;
  const stripped = err.message.replace(/^Error invoking remote method '[^']+': (?:Error: )?/, "");
  return stripped === "" ? fallback : stripped;
}

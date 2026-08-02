import { existsSync } from "fs";
import { join } from "path";

/**
 * LibreOffice detection for the first-launch check (spec decision 10).
 * DOCX-to-PDF conversion needs the `soffice` binary; the welcome screen
 * only lets the user continue when it is found.
 */

/** Install locations to probe, per platform. */
export function candidatePaths(platform: NodeJS.Platform): string[] {
  if (platform === "darwin") {
    return [
      "/Applications/LibreOffice.app/Contents/MacOS/soffice",
      "/opt/homebrew/bin/soffice",
      "/usr/local/bin/soffice",
    ];
  }
  if (platform === "win32") {
    const programFiles = process.env["ProgramFiles"] ?? "C:\\Program Files";
    return [join(programFiles, "LibreOffice", "program", "soffice.exe")];
  }
  return ["/usr/bin/soffice", "/usr/local/bin/soffice"];
}

/**
 * Returns the path of a usable `soffice` binary, or null when LibreOffice
 * is not installed. Probes the well-known install locations first, then
 * PATH (covers Homebrew on Intel macs and distro packages on Linux).
 */
export function findLibreOffice(platform: NodeJS.Platform = process.platform): string | null {
  for (const candidate of candidatePaths(platform)) {
    if (existsSync(candidate)) return candidate;
  }
  const executable = platform === "win32" ? "soffice.exe" : "soffice";
  const pathEntry = process.env["PATH"] ?? "";
  for (const dir of pathEntry.split(platform === "win32" ? ";" : ":")) {
    if (dir === "") continue;
    const candidate = join(dir, executable);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

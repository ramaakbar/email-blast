import { Context, Data, Effect, Layer } from "effect";
import { execFile } from "node:child_process";
import { existsSync } from "fs";
import { join } from "path";

/**
 * LibreOffice detection for the first-launch check (spec decision 10) and
 * the DOCX-to-PDF conversion of the generate pipeline (ticket 13).
 * The `soffice` binary must exist; the welcome screen only lets the user
 * continue when it is found, and the generate job fails typed when the
 * conversion invocation itself fails.
 */

/** A DOCX-to-PDF conversion that failed (soffice missing, invocation crashed). */
export class LibreOfficeFailed extends Data.TaggedError("LibreOfficeFailed")<{
  readonly message: string;
}> {}

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
 *
 * `EMAIL_BLAST_SOFFICE` (set, even to an empty string) overrides the probe:
 * a non-empty existing path is forced, anything else means absent. The E2E
 * suite uses it to drive the first-launch flow with a controllable
 * detection result - a stub path the test creates to flip Check Again from
 * missing to found - and CI can point it at a non-standard install.
 */
export function findLibreOffice(platform: NodeJS.Platform = process.platform): string | null {
  if ("EMAIL_BLAST_SOFFICE" in process.env) {
    const forced = process.env["EMAIL_BLAST_SOFFICE"] ?? "";
    return forced !== "" && existsSync(forced) ? forced : null;
  }
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

export interface LibreOfficeShape {
  /** A usable `soffice` binary path, or null when LibreOffice is missing. */
  readonly findLibreOffice: () => string | null;
  /**
   * Converts every given docx into `<outDir>/<basename>.pdf` in ONE
   * invocation. Fails job-level when the invocation itself fails.
   */
  readonly convertDocxToPdf: (
    soffice: string,
    docxFiles: readonly string[],
    outDir: string,
  ) => Effect.Effect<void, LibreOfficeFailed>;
}

export function makeLibreOfficeService(): LibreOfficeShape {
  return {
    findLibreOffice: () => findLibreOffice(),
    convertDocxToPdf: (soffice, docxFiles, outDir) =>
      Effect.tryPromise<void, LibreOfficeFailed>({
        try: (signal) =>
          new Promise<void>((resolve, reject) => {
            execFile(
              soffice,
              ["--headless", "--convert-to", "pdf", "--outdir", outDir, ...docxFiles],
              { timeout: 10 * 60 * 1000, maxBuffer: 16 * 1024 * 1024, signal },
              (error) => {
                if (error === null) resolve();
                else reject(error);
              },
            );
          }),
        catch: (error) =>
          new LibreOfficeFailed({
            message: `LibreOffice conversion failed${
              error instanceof Error && error.message !== "" ? `: ${error.message}` : ""
            }.`,
          }),
      }),
  };
}

/**
 * The LibreOffice capability service. Provided once by the root layer;
 * the first-launch check and the generate pipeline's env both read it.
 */
export class LibreOfficeService extends Context.Service<LibreOfficeService, LibreOfficeShape>()(
  "LibreOfficeService",
) {
  static readonly Live: Layer.Layer<LibreOfficeService> = Layer.sync(
    LibreOfficeService,
    makeLibreOfficeService,
  );
}

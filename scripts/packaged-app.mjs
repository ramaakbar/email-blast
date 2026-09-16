// The packaged app's location, owned in one place: electron-builder writes
// dist/mac-arm64/Email Blast.app (ADR-0010) and five callers need its binary
// - e2e/harness.ts and the four manual scripts. APP_PATH overrides the
// candidate (a zip-extracted copy or a mounted DMG).
import { accessSync } from "node:fs";
import { join, resolve } from "node:path";

const defaultExecutable = join(
  resolve(import.meta.dirname, "..", "dist"),
  "mac-arm64",
  "Email Blast.app",
  "Contents",
  "MacOS",
  "Email Blast",
);

/** The packaged app binary, or null when nothing is packaged yet. */
export function findPackagedExecutable() {
  const candidates = [process.env.APP_PATH, defaultExecutable].filter(
    (candidate) => typeof candidate === "string" && candidate !== "",
  );
  return (
    candidates.find((candidate) => {
      try {
        accessSync(candidate);
        return true;
      } catch {
        return false;
      }
    }) ?? null
  );
}

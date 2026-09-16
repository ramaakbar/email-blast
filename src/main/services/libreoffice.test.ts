import { describe, expect, it } from "vitest";
import { candidatePaths } from "./libreoffice";

describe("LibreOffice detection", () => {
  it("probes the macOS install locations first", () => {
    const paths = candidatePaths("darwin");
    expect(paths[0]).toBe("/Applications/LibreOffice.app/Contents/MacOS/soffice");
    expect(paths).toContain("/opt/homebrew/bin/soffice");
  });

  it("probes the Windows install location", () => {
    const paths = candidatePaths("win32");
    expect(paths[0]).toContain("LibreOffice");
    expect(paths[0]).toMatch(/soffice\.exe$/);
  });

  it("probes the Linux install locations", () => {
    const paths = candidatePaths("linux");
    expect(paths[0]).toBe("/usr/bin/soffice");
  });
});

import { mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { afterEach } from "vitest";
import PizZip from "pizzip";

/**
 * Shared Seam A test scaffolding: temp directories that are auto-removed
 * after each test, and the fixture DOCX builder both template and generate
 * tests use. Every test file uses these instead of rolling its own.
 */
const tempDirs: string[] = [];

export function tempDir(): string {
  const dir = mkdtempSync(join(tmpdir(), "eb-test-"));
  tempDirs.push(dir);
  return dir;
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) rmSync(dir, { recursive: true, force: true });
});

/**
 * Builds a minimal valid docx as a Node buffer: the document part with
 * the given body XML, plus optional header/footer parts wired through
 * `word/_rels/document.xml.rels` and the section properties - the same
 * shape Word writes.
 */
export function fixtureDocx(
  bodyXml: string,
  parts: { headerXml?: string; footerXml?: string } = {},
): Buffer {
  const zip = new PizZip();
  zip.file(
    "word/document.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<w:body>${bodyXml}${parts.headerXml !== undefined || parts.footerXml !== undefined ? `<w:sectPr>${parts.headerXml !== undefined ? '<w:headerReference w:type="default" r:id="h1"/>' : ""}${parts.footerXml !== undefined ? '<w:footerReference w:type="default" r:id="f1"/>' : ""}</w:sectPr>` : ""}</w:body>
</w:document>`,
  );
  if (parts.headerXml !== undefined) {
    zip.file(
      "word/header1.xml",
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">${parts.headerXml}</w:hdr>`,
    );
  }
  if (parts.footerXml !== undefined) {
    zip.file(
      "word/footer1.xml",
      `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">${parts.footerXml}</w:ftr>`,
    );
  }
  let documentRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">`;
  if (parts.headerXml !== undefined) {
    documentRels +=
      '<Relationship Id="h1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/>';
  }
  if (parts.footerXml !== undefined) {
    documentRels +=
      '<Relationship Id="f1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>';
  }
  documentRels += "</Relationships>";
  zip.file("word/_rels/document.xml.rels", documentRels);
  zip.file(
    "[Content_Types].xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
${parts.headerXml !== undefined ? '<Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/>' : ""}
${parts.footerXml !== undefined ? '<Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/>' : ""}
</Types>`,
  );
  zip.file(
    "_rels/.rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`,
  );
  return zip.generate({ type: "nodebuffer" });
}

/** Writes a fixture docx into a fresh temp dir and returns its path. */
export function writeFixture(
  bodyXml: string,
  parts: { headerXml?: string; footerXml?: string } = {},
): string {
  const path = join(tempDir(), "fixture.docx");
  writeFileSync(path, fixtureDocx(bodyXml, parts));
  return path;
}

import { mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { deflateSync, inflateSync } from "zlib";
import { afterEach } from "vitest";
import PizZip from "pizzip";
import { PDFDict, PDFDocument, PDFName } from "pdf-lib";

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

// ---- Image-template test utilities (ticket 04) ----
//
// One copy of the PNG builder and the PDF content-stream parser, shared by
// the Seam A service tests and the Seam B e2e scenario, so a fix to
// either lands everywhere at once.

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function crc32(buffer: Buffer): number {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let k = 0; k < 8; k++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type: string, data: Buffer): Buffer {
  const typeBuf = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([length, typeBuf, data, crc]);
}

/** A solid-black grayscale PNG of the given dimensions - a real image pdf-lib embeds. */
export function pngBytes(width: number, height: number): Buffer {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 0; // color type: grayscale
  // One scanline per row: a no-filter byte then the gray samples (black).
  const rows = Buffer.alloc(height * (1 + width));
  return Buffer.concat([
    PNG_SIGNATURE,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", deflateSync(rows)),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

/**
 * The decoded content streams of the first page. Streams loaded from file
 * arrive Flate-compressed (PDFRawStream), freshly built ones decode via
 * their own method; inflate with a raw fallback covers both.
 */
export async function pageStreams(pdfBytes: Uint8Array): Promise<string[]> {
  const pdf = await PDFDocument.load(pdfBytes);
  const pageNode = pdf.getPages()[0].node as {
    Contents(): unknown;
    context: { lookup(ref: unknown): unknown };
  };
  const contents = pageNode.Contents();
  const array = contents as { asArray?: () => unknown[] };
  const items: unknown[] = array.asArray ? array.asArray() : [contents];
  const streams: string[] = [];
  for (const item of items) {
    const stream = item as { decode?: () => Uint8Array; contents?: Uint8Array };
    const raw =
      typeof stream?.decode === "function"
        ? stream.decode()
        : (pageNode.context.lookup(item) as typeof stream)?.contents;
    if (raw === undefined) continue;
    let decoded: Uint8Array;
    try {
      decoded = inflateSync(raw);
    } catch {
      decoded = raw;
    }
    streams.push(Buffer.from(decoded).toString("utf8"));
  }
  return streams;
}

/**
 * The text a pdf-lib page drew, decoded from its content stream - the
 * plain-text check most assertions start from.
 */
export async function pageContentText(pdfBytes: Uint8Array): Promise<string> {
  const text = (await pageStreams(pdfBytes)).join("\n");
  // pdf-lib writes text for built-in fonts as hex strings (<42756469...>).
  return text.replace(/<([0-9A-Fa-f]+)>/g, (_match, hex: string) =>
    Buffer.from(hex, "hex").toString("utf8"),
  );
}

/**
 * The fonts a page's text draws use, paired with the drawn size - read
 * from the page's /Font resources and the content streams' Tf
 * operators. The content-stream parser cannot decode embedded-font text
 * (pdf-lib writes the font's own character codes), but the resource
 * names line up on both sides: a Type0 font with a descendant CIDFont
 * is an embedded custom face, a Type1 is one of the standard 14
 * (Helvetica-Bold). Used by the ticket-11 render tests and the e2e.
 */
export async function pdfUsedFonts(
  pdfBytes: Uint8Array,
): Promise<readonly { font: string; size: number }[]> {
  const pdf = await PDFDocument.load(pdfBytes);
  const page = pdf.getPages()[0];
  const resources = page.node.Resources();
  const fontDict = resources?.lookup(PDFName.of("Font"));
  const byResource = new Map<string, string>();
  if (fontDict instanceof PDFDict) {
    for (const [name, ref] of fontDict.entries()) {
      const obj = fontDict.context.lookup(ref);
      if (obj instanceof PDFDict) {
        const baseFont = obj.get(PDFName.of("BaseFont"))?.toString() ?? "";
        // The content streams write the name without its leading slash.
        byResource.set(String(name).replace(/^\//, ""), baseFont);
      }
    }
  }
  const draws: { font: string; size: number }[] = [];
  for (const stream of await pageStreams(pdfBytes)) {
    for (const match of stream.matchAll(/\/([\w-]+) ([\d.]+) Tf/g)) {
      const baseFont = byResource.get(match[1]);
      if (baseFont !== undefined) draws.push({ font: baseFont, size: Number(match[2]) });
    }
  }
  return draws;
}

/** One text draw inside the page content stream: size, baseline position, and text. */
export interface DrawOp {
  readonly size: number;
  readonly x: number;
  readonly y: number;
  readonly text: string;
  /** The raw BT..ET body, for color-operator assertions. */
  readonly block: string;
}

/**
 * The text draws of the first page, in stream order. Each pdf-lib
 * drawText call emits its own BT..ET block: a `Tf` font-size, a `Tm`
 * text matrix (pdf-lib positions with Tm, not Td), and a hex `Tj`
 * string; the color operator (`rg`) carries the drawn ink.
 */
export async function pageDrawOps(pdfBytes: Uint8Array): Promise<DrawOp[]> {
  const ops: DrawOp[] = [];
  for (const stream of await pageStreams(pdfBytes)) {
    for (const block of stream.split(/BT\b/).slice(1)) {
      const end = block.indexOf("ET");
      const body = end === -1 ? block : block.slice(0, end);
      const tf = /\/[\w-]+ ([\d.]+) Tf/.exec(body);
      const tm = /(-?[\d.]+) (-?[\d.]+) Tm/.exec(body);
      const td = /(-?[\d.]+) (-?[\d.]+) Td/.exec(body);
      const pos = tm ?? td;
      const tj = /<([0-9A-Fa-f]+)> Tj/.exec(body);
      if (tf === null || pos === null || tj === null) continue;
      ops.push({
        size: Number(tf[1]),
        x: Number(pos[1]),
        y: Number(pos[2]),
        text: Buffer.from(tj[1], "hex").toString("utf8"),
        block: body,
      });
    }
  }
  return ops;
}

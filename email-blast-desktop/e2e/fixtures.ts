import { writeFileSync } from "node:fs";
import * as XLSX from "@e965/xlsx";
import PizZip from "pizzip";
import { pngBytes } from "../src/main/services/test-helpers";

/**
 * Seam B fixtures (spec Testing Decisions): the spreadsheet a user imports
 * and the DOCX template the generate pipeline fills. Built at test time so
 * the suite is self-contained - nothing in the repo is mutated.
 */

/** One fixture recipient row: the address fields plus a metadata slot. */
export interface FixtureRecipient {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  /** The metadata slot the template's `{instansi}` placeholder fills with. */
  readonly instansi: string;
}

/** The fixture campaign: 4 recipients with distinct names and emails. */
export const FIXTURE_RECIPIENTS: readonly FixtureRecipient[] = [
  { name: "Budi Santoso", email: "budi@example.com", phone: "0811", instansi: "Yayasan X" },
  { name: "Sari Putri", email: "sari@example.com", phone: "0812", instansi: "Yayasan X" },
  { name: "Andi Wijaya", email: "andi@example.com", phone: "0813", instansi: "Sekolah Y" },
  { name: "Dewi Lestari", email: "dewi@example.com", phone: "0814", instansi: "Sekolah Y" },
];

/**
 * The Template Assignment fixture (ticket 08): a routing column plus the
 * metadata slot. Two recipients route to LOA, one to SK, and one has a
 * blank routing value (the default template's job). `routingColumn` is
 * the header the import mapping marks as the template role.
 */
export interface RoutedFixtureRecipient {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  /** The routing value; blank routes to the default template. */
  readonly template: string;
  /** The metadata slot the LOA variant's `{instansi}` placeholder fills with. */
  readonly instansi: string;
}

/** The routed fixture campaign: 2 LOA, 1 SK, 1 blank (default). */
export const FIXTURE_ROUTED_RECIPIENTS: readonly RoutedFixtureRecipient[] = [
  {
    name: "Budi Santoso",
    email: "budi@example.com",
    phone: "0811",
    template: "LOA",
    instansi: "Yayasan X",
  },
  {
    name: "Sari Putri",
    email: "sari@example.com",
    phone: "0812",
    template: "LOA",
    instansi: "Yayasan X",
  },
  {
    name: "Andi Wijaya",
    email: "andi@example.com",
    phone: "0813",
    template: "SK",
    instansi: "Sekolah Y",
  },
  {
    name: "Dewi Lestari",
    email: "dewi@example.com",
    phone: "0814",
    template: "",
    instansi: "SMA Z",
  },
];

/** The routed fixture with one unassigned value ("PIAGAM") for the fail-fast scenario. */
export const FIXTURE_ROUTED_RECIPIENTS_UNASSIGNED: readonly RoutedFixtureRecipient[] = [
  ...FIXTURE_ROUTED_RECIPIENTS,
  {
    name: "Fauziah Zahra",
    email: "fauziah@example.com",
    phone: "0815",
    template: "PIAGAM",
    instansi: "Kampus W",
  },
];

/** Writes the fixture spreadsheet: headers name/email/phone/template/instansi. */
export function writeRoutedFixtureSpreadsheet(
  path: string,
  rows: readonly RoutedFixtureRecipient[],
): void {
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet([...rows] as unknown as Record<string, string>[]);
  XLSX.utils.book_append_sheet(workbook, sheet, "Recipients");
  writeFileSync(path, XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }));
}

/** Writes the fixture spreadsheet: headers name/email/phone/instansi. */
export function writeFixtureSpreadsheet(path: string, rows: readonly FixtureRecipient[]): void {
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet([...rows] as unknown as Record<string, string>[]);
  XLSX.utils.book_append_sheet(workbook, sheet, "Recipients");
  // XLSX.writeFile falls into the browser save path in the ESM build
  // (documented in import.test.ts) - write the buffer ourselves.
  writeFileSync(path, XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }));
}

/**
 * A minimal valid DOCX whose body is one paragraph per slot, each holding
 * the literal `{slot}` placeholder - the shape docxtemplater fills and
 * the slot scanner picks up.
 */
export function fixtureDocx(slots: readonly string[]): Buffer {
  const zip = new PizZip();
  zip.file(
    "word/document.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:body>${slots
      .map((slot) => `<w:p><w:r><w:t xml:space="preserve">{${slot}}</w:t></w:r></w:p>`)
      .join("")}</w:body>
</w:document>`,
  );
  zip.file(
    "[Content_Types].xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
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

/**
 * Writes the fixture template into the given templates dir. `fileName`
 * defaults to LOA - the Template Assignment scenario (ticket 08) writes
 * a second variant under its own name.
 */
export function writeFixtureTemplate(
  dir: string,
  slots: readonly string[] = ["name", "instansi"],
  fileName: string = "LOA",
): string {
  const path = `${dir}/${fileName}.docx`;
  writeFileSync(path, fixtureDocx(slots));
  return path;
}

/** Writes a 300x200 certificate image into the given templates dir. */
export function writeFixtureImageTemplate(dir: string): string {
  const path = `${dir}/Sertifikat.png`;
  writeFileSync(path, pngBytes(300, 200));
  return path;
}

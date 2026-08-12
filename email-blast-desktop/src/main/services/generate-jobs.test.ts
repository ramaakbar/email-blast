import { describe, expect, it } from "vitest";
import { Effect, Option } from "effect";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { basename, join } from "path";
import { PDFDocument, StandardFonts, type PDFFont } from "pdf-lib";
import PizZip from "pizzip";
import type Database from "better-sqlite3";
import { openDatabase, makeSqliteRepo } from "../db/repository";
import { makeCredentialCrypto } from "./credential-crypto";
import { LibreOfficeFailed, makeGenerateJobService, type GenerateEnv } from "./generate-jobs";
import { makeProgressHub } from "./progress-hub";
import type { HubEvent } from "../../shared/ipc";
import type { SlotLayout } from "../../shared/ipc";
import { pageContentText, pageDrawOps, pngBytes, tempDir, writeFixture } from "./test-helpers";

/**
 * Seam A (spec Testing Decisions): the generate job lifecycle against the
 * real service on a temp database. DOCX fill runs through real
 * docxtemplater in-process; LibreOffice is stubbed at the batch-conversion
 * seam (one invocation per job, producing a real pdf per input file).
 * The generate pipeline has no clock-dependent steps (pacing and retry
 * live in the send pipeline, ticket 15), so TestClock plays no part here.
 */

/** A 1x1 PNG - real image bytes for the pdf-lib image-template path. */
const ONE_PX_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "base64",
);

/** A minimal real PDF the stub conversion "produces" from each input docx. */
async function tinyPdf(): Promise<Buffer> {
  const pdf = await PDFDocument.create();
  pdf.addPage([200, 200]);
  return Buffer.from(await pdf.save());
}

/** The batched-conversion seam: records every invocation, writes a pdf per input. */
interface StubConvertCall {
  readonly soffice: string;
  readonly files: readonly string[];
  readonly outDir: string;
  /**
   * The filled docx bytes, captured at conversion time - the batch dir is
   * cleaned up when the job finishes, so assertions read the capture.
   */
  readonly contents: readonly Buffer[];
}

function stubEnv(overrides: Partial<GenerateEnv> = {}): {
  env: GenerateEnv;
  calls: StubConvertCall[];
  outputDir: string;
} {
  const calls: StubConvertCall[] = [];
  const outputDir = join(tempDir(), "output");
  const env: GenerateEnv = {
    findLibreOffice: () => "/usr/bin/fake-soffice",
    convertDocxToPdf: (soffice, files, outDir) =>
      Effect.promise(async () => {
        calls.push({ soffice, files, outDir, contents: files.map((file) => readFileSync(file)) });
        const pdf = await tinyPdf();
        for (const file of files) {
          writeFileSync(join(outDir, basename(file).replace(/\.docx$/i, ".pdf")), pdf);
        }
      }),
    outputDir: () => Effect.succeed(outputDir),
    ...overrides,
  };
  return { env, calls, outputDir };
}

const P_LOA = `<w:p><w:r><w:t>Dear {name}, no {no}</w:t></w:r></w:p>`;

const RECIPIENT_ROWS = [
  {
    name: "Budi Santoso",
    email: "budi@example.com",
    phone: null,
    metadata: { no: "001", instansi: "SMK Negeri 1" },
    importBatch: "b1",
  },
  {
    name: "Sari Putri",
    email: "sari@example.com",
    phone: null,
    metadata: { no: "002", instansi: "SMA Negeri 2" },
    importBatch: "b1",
  },
  {
    name: "Andi Wijaya",
    email: "andi@example.com",
    phone: null,
    metadata: { no: "003", instansi: "SMK Negeri 3" },
    importBatch: "b1",
  },
];

function makeSvc() {
  const db = openDatabase(join(tempDir(), "generate.db"));
  const repo = makeSqliteRepo(
    db,
    makeCredentialCrypto(null, () => {}),
  );
  const hub = makeProgressHub();
  const stub = stubEnv();
  const service = makeGenerateJobService(repo, hub, stub.env);
  const events: HubEvent[] = [];
  hub.subscribe((event) => events.push(event));
  return { db, repo, hub, service, events, ...stub };
}

/** Inserts recipients synchronously and returns their ids in insertion order (rowid order). */
function seedRecipients(db: Database.Database): string[] {
  Effect.runSync(
    makeSqliteRepo(
      db,
      makeCredentialCrypto(null, () => {}),
    ).insertRecipients(RECIPIENT_ROWS),
  );
  return (db.prepare("SELECT id FROM recipients ORDER BY rowid").all() as { id: string }[]).map(
    (row) => row.id,
  );
}

/** Registers a docx template (with a real fixture file) and returns its id. */
function seedDocxTemplate(repo: ReturnType<typeof makeSqliteRepo>): string {
  const created = Effect.runSync(
    repo.insertTemplate({
      name: "Surat LOA",
      filePath: writeFixture(P_LOA),
      type: "docx",
      slots: ["name", "no"],
      outputPattern: "LOA_{no}_{name}.pdf",
      slotLayout: {},
    }),
  );
  return created.id;
}

/** Registers an image template pointing at a real 1x1 png and returns its id. */
function seedImageTemplate(repo: ReturnType<typeof makeSqliteRepo>): string {
  const pngPath = join(tempDir(), "sertifikat.png");
  writeFileSync(pngPath, ONE_PX_PNG);
  const created = Effect.runSync(
    repo.insertTemplate({
      name: "Sertifikat",
      filePath: pngPath,
      type: "image",
      slots: ["name"],
      outputPattern: "SERTIFIKAT_{name}.pdf",
      slotLayout: {},
    }),
  );
  return created.id;
}

describe("GenerateJobService start (Seam A)", () => {
  it("creates a pending job with one pending row per recipient", async () => {
    const { db, repo, service } = makeSvc();
    const [budi, sari] = seedRecipients(db);
    const templateId = seedDocxTemplate(repo);

    const job = await Effect.runPromise(service.start(templateId, [budi, sari]));

    expect(job.status).toBe("pending");
    expect(job.templateId).toBe(templateId);
    expect(job.templateName).toBe("Surat LOA");
    expect(job.total).toBe(2);
    expect(job.completedAt).toBeNull();
    expect(job.recipients).toEqual([
      {
        recipientId: budi,
        recipientName: "Budi Santoso",
        status: "pending",
        outputPath: null,
        errorMessage: null,
      },
      {
        recipientId: sari,
        recipientName: "Sari Putri",
        status: "pending",
        outputPath: null,
        errorMessage: null,
      },
    ]);

    const persisted = await Effect.runPromise(service.getStatus(job.id));
    expect(persisted).toEqual(Option.some(job));
  });

  it("fails when the template row no longer exists", async () => {
    const { db, service } = makeSvc();
    const [budi] = seedRecipients(db);
    await expect(
      Effect.runPromise(service.start("no-such-template", [budi])),
    ).rejects.toMatchObject({ _tag: "TemplateNotFound" });
  });

  it("fails for an empty or wholly-deleted recipient list", async () => {
    const { repo, service } = makeSvc();
    const templateId = seedDocxTemplate(repo);
    await expect(Effect.runPromise(service.start(templateId, []))).rejects.toMatchObject({
      _tag: "InvalidGenerateRequest",
    });
    await expect(Effect.runPromise(service.start(templateId, ["ghost-id"]))).rejects.toMatchObject({
      _tag: "InvalidGenerateRequest",
    });
  });
});

describe("GenerateJobService run - docx (Seam A)", () => {
  it("fills every letter, converts the batch in one invocation, and lands one PDF per recipient", async () => {
    const { db, repo, service, calls, outputDir } = makeSvc();
    const [budi, sari, andi] = seedRecipients(db);
    const templateId = seedDocxTemplate(repo);
    const job = await Effect.runPromise(service.start(templateId, [budi, sari, andi]));

    const done = await Effect.runPromise(service.run(job.id));

    expect(done.status).toBe("generated");
    expect(done.completedAt).not.toBeNull();
    expect(done.recipients.map((r) => [r.status, r.outputPath])).toEqual([
      ["generated", join(outputDir, "LOA_001_budi_santoso.pdf")],
      ["generated", join(outputDir, "LOA_002_sari_putri.pdf")],
      ["generated", join(outputDir, "LOA_003_andi_wijaya.pdf")],
    ]);
    for (const recipient of done.recipients) {
      expect(existsSync(recipient.outputPath as string)).toBe(true);
    }

    // One LibreOffice invocation for the whole batch, with all three letters.
    expect(calls).toHaveLength(1);
    expect(calls[0].files).toHaveLength(3);

    // The in-process fill really substituted the values into the docx.
    const zip = new PizZip(calls[0].contents[0]);
    const body = zip.file("word/document.xml")?.asText() ?? "";
    expect(body).toContain("Dear Budi Santoso, no 001");
  });

  it("streams one progress event per recipient in job order with running counts", async () => {
    const { db, repo, service, events } = makeSvc();
    const [budi, sari, andi] = seedRecipients(db);
    const templateId = seedDocxTemplate(repo);
    const job = await Effect.runPromise(service.start(templateId, [budi, sari, andi]));

    await Effect.runPromise(service.run(job.id));

    expect(events).toEqual([
      {
        kind: "generate-progress",
        jobId: job.id,
        current: 1,
        total: 3,
        status: "generated",
        recipientId: budi,
        error: null,
      },
      {
        kind: "generate-progress",
        jobId: job.id,
        current: 2,
        total: 3,
        status: "generated",
        recipientId: sari,
        error: null,
      },
      {
        kind: "generate-progress",
        jobId: job.id,
        current: 3,
        total: 3,
        status: "generated",
        recipientId: andi,
        error: null,
      },
    ]);
  });

  it("fails a recipient with missing slot data alone and continues the batch", async () => {
    const { db, repo, service, events } = makeSvc();
    const ids = seedRecipients(db);
    const [budi, sari] = ids;
    // A recipient whose row has no {no} - his letter cannot be filled.
    // Unique email so the row query below cannot pick up the seeded Andi.
    Effect.runSync(
      makeSqliteRepo(
        db,
        makeCredentialCrypto(null, () => {}),
      ).insertRecipients([
        {
          name: "Andi Wijaya",
          email: "andi-nomail@example.com",
          phone: null,
          metadata: { instansi: "SMK Negeri 3" },
          importBatch: "b1",
        },
      ]),
    );
    const andiId = (
      db.prepare("SELECT id FROM recipients WHERE email = 'andi-nomail@example.com'").get() as {
        id: string;
      }
    ).id;
    const templateId = seedDocxTemplate(repo);

    const job = await Effect.runPromise(service.start(templateId, [budi, sari, andiId]));
    const done = await Effect.runPromise(service.run(job.id));

    expect(done.status).toBe("generated");
    expect(done.recipients.map((r) => [r.status, r.errorMessage])).toEqual([
      ["generated", null],
      ["generated", null],
      ["failed", 'Missing data for slot "no".'],
    ]);
    expect(
      events.filter((e) => e.kind === "generate-progress").map((e) => [e.status, e.error]),
    ).toEqual([
      ["generated", null],
      ["generated", null],
      ["failed", 'Missing data for slot "no".'],
    ]);
  });

  it("suffixes colliding output names instead of overwriting", async () => {
    const { db, repo, service, outputDir } = makeSvc();
    const [budi] = seedRecipients(db);
    // A second recipient with identical slot values (same {no} and {name}).
    Effect.runSync(
      makeSqliteRepo(
        db,
        makeCredentialCrypto(null, () => {}),
      ).insertRecipients([
        {
          name: "Budi Santoso",
          email: "clone@example.com",
          phone: null,
          metadata: { no: "001" },
          importBatch: "b1",
        },
      ]),
    );
    const cloneId = (
      db.prepare("SELECT id FROM recipients WHERE email = 'clone@example.com'").get() as {
        id: string;
      }
    ).id;
    const templateId = seedDocxTemplate(repo);

    const job = await Effect.runPromise(service.start(templateId, [budi, cloneId]));
    const done = await Effect.runPromise(service.run(job.id));

    const paths = done.recipients.map((r) => r.outputPath);
    expect(paths).toEqual([
      join(outputDir, "LOA_001_budi_santoso.pdf"),
      join(outputDir, "LOA_001_budi_santoso-2.pdf"),
    ]);
    expect(existsSync(paths[0] as string)).toBe(true);
    expect(existsSync(paths[1] as string)).toBe(true);
  });

  it("fails the job when the template file is missing (TemplateNotFound)", async () => {
    const { db, repo, service } = makeSvc();
    const [budi] = seedRecipients(db);
    const templateId = Effect.runSync(
      repo.insertTemplate({
        name: "Ghost",
        filePath: join(tempDir(), "no-such-file.docx"),
        type: "docx",
        slots: ["name"],
        outputPattern: "LOA_{name}.pdf",
        slotLayout: {},
      }),
    ).id;

    const job = await Effect.runPromise(service.start(templateId, [budi]));
    await expect(Effect.runPromise(service.run(job.id))).rejects.toMatchObject({
      _tag: "TemplateNotFound",
    });
    // The job is back to pending - nothing was marked, nothing half-done.
    const status = await Effect.runPromise(service.getStatus(job.id));
    expect(Option.isSome(status) && status.value.status).toBe("pending");
    expect(
      Option.isSome(status) && status.value.recipients.every((r) => r.status === "pending"),
    ).toBe(true);
  });

  it("fails the job when LibreOffice is not installed", async () => {
    const { db, repo, service } = makeSvc();
    const [budi] = seedRecipients(db);
    const templateId = seedDocxTemplate(repo);
    const stub = stubEnv({ findLibreOffice: () => null });
    const serviceNoOffice = makeGenerateJobService(repo, makeProgressHub(), stub.env);
    const job = await Effect.runPromise(service.start(templateId, [budi]));

    await expect(Effect.runPromise(serviceNoOffice.run(job.id))).rejects.toMatchObject({
      _tag: "LibreOfficeFailed",
    });
    const status = await Effect.runPromise(service.getStatus(job.id));
    expect(Option.isSome(status) && status.value.status).toBe("pending");
  });

  it("fails the job when the batch conversion invocation fails", async () => {
    const { db, repo, service } = makeSvc();
    const [budi] = seedRecipients(db);
    const templateId = seedDocxTemplate(repo);
    const failing = stubEnv({
      convertDocxToPdf: () => Effect.fail(new LibreOfficeFailed({ message: "soffice crashed" })),
    });
    const failingService = makeGenerateJobService(repo, makeProgressHub(), failing.env);
    const job = await Effect.runPromise(service.start(templateId, [budi]));

    await expect(Effect.runPromise(failingService.run(job.id))).rejects.toMatchObject({
      _tag: "LibreOfficeFailed",
      message: "soffice crashed",
    });
  });

  it("marks recipients failed when the batch conversion silently skips their file", async () => {
    const { db, repo, service } = makeSvc();
    const [budi, sari] = seedRecipients(db);
    const templateId = seedDocxTemplate(repo);
    const partial = stubEnv({
      convertDocxToPdf: (_soffice, files, outDir) =>
        Effect.promise(async () => {
          // Only the first file converts; the second is silently skipped.
          const pdf = await tinyPdf();
          writeFileSync(join(outDir, basename(files[0]).replace(/\.docx$/i, ".pdf")), pdf);
        }),
    });
    const partialService = makeGenerateJobService(repo, makeProgressHub(), partial.env);
    const job = await Effect.runPromise(service.start(templateId, [budi, sari]));

    const done = await Effect.runPromise(partialService.run(job.id));

    expect(done.status).toBe("generated");
    expect(done.recipients.map((r) => [r.status, r.errorMessage])).toEqual([
      ["generated", null],
      ["failed", "LibreOffice produced no PDF for this letter."],
    ]);
    // The landed file is written into the partial stub's own output dir.
    expect(existsSync(join(partial.outputDir, "LOA_001_budi_santoso.pdf"))).toBe(true);
  });
});

describe("GenerateJobService run - image (Seam A)", () => {
  it("renders one PDF per recipient with the slot text overlaid", async () => {
    const { db, repo, service, outputDir } = makeSvc();
    const [budi, sari] = seedRecipients(db);
    const templateId = seedImageTemplate(repo);
    const job = await Effect.runPromise(service.start(templateId, [budi, sari]));

    const done = await Effect.runPromise(service.run(job.id));

    expect(done.status).toBe("generated");
    expect(done.recipients.map((r) => [r.status, r.outputPath])).toEqual([
      ["generated", join(outputDir, "SERTIFIKAT_budi_santoso.pdf")],
      ["generated", join(outputDir, "SERTIFIKAT_sari_putri.pdf")],
    ]);
    const text = await pageContentText(readFileSync(done.recipients[0].outputPath as string));
    expect(text).toContain("Budi Santoso");
  });
});

/** Registers an image template on a 300x200 canvas with the given layout. */
function seedPositionedTemplate(
  repo: ReturnType<typeof makeSqliteRepo>,
  slotLayout: Record<string, SlotLayout>,
): string {
  const pngPath = join(tempDir(), "sertifikat-300x200.png");
  writeFileSync(pngPath, pngBytes(300, 200));
  const created = Effect.runSync(
    repo.insertTemplate({
      name: "Sertifikat",
      filePath: pngPath,
      type: "image",
      slots: ["name", "instansi"],
      outputPattern: "SERTIFIKAT_{name}.pdf",
      slotLayout,
    }),
  );
  return created.id;
}

describe("GenerateJobService run - image slot positioning (ticket 04, Seam A)", () => {
  it("renders each configured slot at its position, size, color, and alignment", async () => {
    const { db, repo, service } = makeSvc();
    const [budi] = seedRecipients(db);
    const templateId = seedPositionedTemplate(repo, {
      name: { x: 0, y: 150, fontSize: 40, color: "#FF0000", align: "center", maxWidth: null },
      instansi: { x: 20, y: 100, fontSize: 24, color: "#00FF00", align: "right", maxWidth: 120 },
    });

    const job = await Effect.runPromise(service.start(templateId, [budi]));
    const done = await Effect.runPromise(service.run(job.id));
    const ops = await pageDrawOps(readFileSync(done.recipients[0].outputPath as string));
    const font = await loadFont();

    const nameOp = ops.find((op) => op.text === "Budi Santoso");
    expect(nameOp).toBeDefined();
    // Centered over the whole page width; the box top stays at y=150, so
    // the baseline is pageHeight - (y + 0.8 * fittedSize).
    const nameWidth = font.widthOfTextAtSize("Budi Santoso", nameOp!.size);
    expect(nameOp!.size).toBeLessThanOrEqual(40);
    expect(nameWidth).toBeLessThanOrEqual(300);
    expect(nameOp!.x).toBeCloseTo((300 - nameWidth) / 2, 1);
    expect(nameOp!.y).toBeCloseTo(200 - 150 - 0.8 * nameOp!.size, 1);
    expect(nameOp!.block).toContain("1 0 0 rg");

    const instansiOp = ops.find((op) => op.text === "SMK Negeri 1");
    expect(instansiOp).toBeDefined();
    // Right-aligned inside the 120px box at x=20; auto-shrunk to fit.
    const instansiWidth = font.widthOfTextAtSize("SMK Negeri 1", instansiOp!.size);
    expect(instansiOp!.size).toBeLessThanOrEqual(24);
    expect(instansiWidth).toBeLessThanOrEqual(120);
    expect(instansiOp!.x).toBeCloseTo(20 + 120 - instansiWidth, 1);
    expect(instansiOp!.y).toBeCloseTo(200 - 100 - 0.8 * instansiOp!.size, 1);
    expect(instansiOp!.block).toContain("0 1 0 rg");
  });

  it("auto-shrinks a long value to fit the configured slot width", async () => {
    const { db, repo, service } = makeSvc();
    const [budi] = seedRecipients(db);
    const templateId = seedPositionedTemplate(repo, {
      name: { x: 10, y: 120, fontSize: 40, color: "#000000", align: "left", maxWidth: 60 },
    });

    const job = await Effect.runPromise(service.start(templateId, [budi]));
    const done = await Effect.runPromise(service.run(job.id));
    const ops = await pageDrawOps(readFileSync(done.recipients[0].outputPath as string));
    const font = await loadFont();

    const nameOp = ops.find((op) => op.text === "Budi Santoso");
    expect(nameOp).toBeDefined();
    expect(nameOp!.size).toBeGreaterThanOrEqual(8);
    expect(nameOp!.size).toBeLessThan(40);
    expect(font.widthOfTextAtSize("Budi Santoso", nameOp!.size)).toBeLessThanOrEqual(60);
    expect(nameOp!.x).toBeCloseTo(10, 1);
  });

  it("keeps the legacy centered layout for a slot without configuration", async () => {
    const { db, repo, service } = makeSvc();
    const [budi] = seedRecipients(db);
    // Only "name" is configured; "instansi" must fall back to the legacy
    // centered draw at two-thirds down the page, fitted to the page width.
    const templateId = seedPositionedTemplate(repo, {
      name: { x: 0, y: 150, fontSize: 40, color: "#000000", align: "left", maxWidth: null },
    });

    const job = await Effect.runPromise(service.start(templateId, [budi]));
    const done = await Effect.runPromise(service.run(job.id));
    const ops = await pageDrawOps(readFileSync(done.recipients[0].outputPath as string));
    const font = await loadFont();

    const legacyOp = ops.find((op) => op.text === "SMK Negeri 1");
    expect(legacyOp).toBeDefined();
    expect(legacyOp!.y).toBeCloseTo(200 * 0.68, 1);
    const legacySize = Math.max(18, Math.min(140, 300 / Math.max(1, "SMK Negeri 1".length * 0.6)));
    expect(legacyOp!.size).toBeCloseTo(legacySize, 1);
    const legacyWidth = font.widthOfTextAtSize("SMK Negeri 1", legacyOp!.size);
    expect(legacyOp!.x).toBeCloseTo((300 - legacyWidth) / 2, 1);
    // The configured slot itself keeps its position.
    const nameOp = ops.find((op) => op.text === "Budi Santoso");
    expect(nameOp!.y).toBeCloseTo(200 - 150 - 0.8 * nameOp!.size, 1);
  });
});

/** The embedded bold font the renderer uses, for measuring drawn text. */
let cachedFont: PDFFont | null = null;
async function loadFont(): Promise<PDFFont> {
  if (cachedFont !== null) return cachedFont;
  const pdf = await PDFDocument.create();
  cachedFont = await pdf.embedFont(StandardFonts.HelveticaBold);
  return cachedFont;
}

describe("GenerateJobService gate, status, and re-run (Seam A)", () => {
  it("confirmedGoodAttachments returns only generated recipients with paths", async () => {
    const { db, repo, service } = makeSvc();
    const ids = seedRecipients(db);
    const templateId = seedDocxTemplate(repo);

    // Unrun job: nothing is confirmed good yet.
    const unrun = await Effect.runPromise(service.start(templateId, ids));
    await expect(Effect.runPromise(service.confirmedGoodAttachments(unrun.id))).resolves.toEqual(
      [],
    );

    const job = await Effect.runPromise(service.start(templateId, ids));
    await Effect.runPromise(service.run(job.id));
    const attachments = await Effect.runPromise(service.confirmedGoodAttachments(job.id));
    expect(attachments.map((a) => a.recipientId)).toEqual(ids);
    expect(attachments.every((a) => a.outputPath.endsWith(".pdf"))).toBe(true);
  });

  it("excludes failed recipients from the gate", async () => {
    const { db, repo, service } = makeSvc();
    const ids = seedRecipients(db);
    const templateId = seedDocxTemplate(repo);
    const job = await Effect.runPromise(service.start(templateId, ids));

    // Simulate a partial failure by deleting Andi's row before the run.
    const andiId = ids[2];
    await Effect.runPromise(
      makeSqliteRepo(
        db,
        makeCredentialCrypto(null, () => {}),
      ).deleteRecipients([andiId]),
    );
    const done = await Effect.runPromise(service.run(job.id));
    expect(done.recipients.find((r) => r.recipientId === andiId)?.status).toBe("failed");

    const attachments = await Effect.runPromise(service.confirmedGoodAttachments(job.id));
    expect(attachments.map((a) => a.recipientId)).toEqual([ids[0], ids[1]]);
  });

  it("run on an already-generated job is a no-op: no events, no duplicate files", async () => {
    const { db, repo, service, events, outputDir } = makeSvc();
    const [budi, sari] = seedRecipients(db);
    const templateId = seedDocxTemplate(repo);
    const job = await Effect.runPromise(service.start(templateId, [budi, sari]));

    await Effect.runPromise(service.run(job.id));
    const eventsAfterFirst = events.length;
    const filesAfterFirst = (
      await Effect.runPromise(
        service
          .getStatus(job.id)
          .pipe(Effect.map((opt) => (Option.isSome(opt) ? opt.value : null))),
      )
    )?.recipients.map((r) => r.outputPath);

    const rerun = await Effect.runPromise(service.run(job.id));

    expect(rerun.status).toBe("generated");
    expect(events).toHaveLength(eventsAfterFirst);
    for (const path of filesAfterFirst ?? []) {
      expect(existsSync(path as string)).toBe(true);
    }
    // Only the two originals in the output dir.
    const dirListing = await import("fs/promises").then((fs) => fs.readdir(outputDir));
    expect(dirListing.toSorted()).toEqual(["LOA_001_budi_santoso.pdf", "LOA_002_sari_putri.pdf"]);
  });

  it("run on an unknown job fails with GenerateJobNotFound", async () => {
    const { service } = makeSvc();
    await expect(Effect.runPromise(service.run("no-such-job"))).rejects.toMatchObject({
      _tag: "GenerateJobNotFound",
    });
  });

  it("getStatus reports per-recipient outcomes with reasons", async () => {
    const { db, repo, service } = makeSvc();
    const ids = seedRecipients(db);
    const templateId = seedDocxTemplate(repo);
    const job = await Effect.runPromise(service.start(templateId, ids));

    const andiId = ids[2];
    await Effect.runPromise(
      makeSqliteRepo(
        db,
        makeCredentialCrypto(null, () => {}),
      ).deleteRecipients([andiId]),
    );
    await Effect.runPromise(service.run(job.id));

    const status = await Effect.runPromise(service.getStatus(job.id));
    expect(Option.isSome(status)).toBe(true);
    const value = Option.getOrNull(status);
    expect(value?.status).toBe("generated");
    const andi = value?.recipients.find((r) => r.recipientId === andiId);
    expect(andi).toMatchObject({
      status: "failed",
      recipientName: "(deleted recipient)",
      errorMessage: "Recipient no longer exists in the database.",
    });
  });

  it("getRecipientPdf returns the generated file's bytes and null for the rest", async () => {
    const { db, repo, service } = makeSvc();
    const [budi, sari] = seedRecipients(db);
    const templateId = seedDocxTemplate(repo);
    const job = await Effect.runPromise(service.start(templateId, [budi, sari]));
    await Effect.runPromise(service.run(job.id));

    const pdf = await Effect.runPromise(service.getRecipientPdf(job.id, budi));
    expect(Option.isSome(pdf)).toBe(true);
    const value = Option.getOrNull(pdf);
    expect(value?.fileName).toBe("LOA_001_budi_santoso.pdf");
    expect(
      Buffer.from(value?.dataBase64 ?? "", "base64")
        .subarray(0, 4)
        .toString("ascii"),
    ).toBe("%PDF");

    await expect(Effect.runPromise(service.getRecipientPdf(job.id, sari))).resolves.toEqual(
      Option.some({ fileName: "LOA_002_sari_putri.pdf", dataBase64: expect.any(String) }),
    );
    await expect(Effect.runPromise(service.getRecipientPdf(job.id, "ghost"))).resolves.toEqual(
      Option.none(),
    );
  });
});

// ---- Ticket 08: Template Assignment routing (ADR 0006, Seam A) ----

/** Registers a docx template with arbitrary slots, body, and pattern. */
function seedRoutedTemplate(
  repo: ReturnType<typeof makeSqliteRepo>,
  fields: { name: string; slots: readonly string[]; pattern: string },
): string {
  const body = `<w:p><w:r><w:t>${fields.slots.map((s) => `{${s}}`).join(" ")}</w:t></w:r></w:p>`;
  const created = Effect.runSync(
    repo.insertTemplate({
      name: fields.name,
      filePath: writeFixture(body),
      type: "docx",
      slots: fields.slots,
      outputPattern: fields.pattern,
      slotLayout: {},
    }),
  );
  return created.id;
}

/** Inserts a recipient with the given metadata and returns its id. */
function seedRoutedRecipient(
  db: Database.Database,
  fields: { name: string; email: string; metadata: Record<string, string> },
): string {
  Effect.runSync(
    makeSqliteRepo(
      db,
      makeCredentialCrypto(null, () => {}),
    ).insertRecipients([
      {
        name: fields.name,
        email: fields.email,
        phone: null,
        metadata: fields.metadata,
        importBatch: "b1",
      },
    ]),
  );
  return (
    db.prepare("SELECT id FROM recipients WHERE email = ?").get(fields.email) as { id: string }
  ).id;
}

describe("GenerateJobService Template Assignment (ticket 08, Seam A)", () => {
  it("starts a routed job, records the assignment, and generates every recipient with its own template under one shared pattern", async () => {
    const { db, repo, service, calls, outputDir } = makeSvc();
    const budi = seedRoutedRecipient(db, {
      name: "Budi Santoso",
      email: "budi@example.com",
      metadata: { template: "LOA", instansi: "Yayasan X" },
    });
    const sari = seedRoutedRecipient(db, {
      name: "Sari Putri",
      email: "sari@example.com",
      metadata: { template: "SK" },
    });
    const andi = seedRoutedRecipient(db, {
      name: "Andi Wijaya",
      email: "andi@example.com",
      metadata: { template: "", instansi: "Sekolah Y" },
    });
    const dewi = seedRoutedRecipient(db, {
      name: "Dewi Lestari",
      email: "dewi@example.com",
      metadata: { instansi: "SMA Z" },
    });
    const loaId = seedRoutedTemplate(repo, {
      name: "LOA",
      slots: ["name", "instansi"],
      pattern: "LOA_{name}.pdf",
    });
    const skId = seedRoutedTemplate(repo, {
      name: "SK",
      slots: ["name"],
      pattern: "SK_{name}.pdf",
    });

    const job = await Effect.runPromise(
      service.start(loaId, [budi, sari, andi, dewi], {
        templateColumn: "template",
        assignment: { LOA: loaId, SK: skId },
        outputPattern: "BATCH_{name}.pdf",
      }),
    );

    // The job echoes its assignment.
    expect(job.templateColumn).toBe("template");
    expect(job.assignment).toEqual({ LOA: loaId, SK: skId });
    expect(job.outputPattern).toBe("BATCH_{name}.pdf");

    const done = await Effect.runPromise(service.run(job.id));

    expect(done.status).toBe("generated");
    // Blank values (Andi, Dewi) route to the default template (LOA).
    expect(done.recipients.map((r) => [r.recipientName, r.status, r.outputPath])).toEqual([
      ["Budi Santoso", "generated", join(outputDir, "BATCH_budi_santoso.pdf")],
      ["Sari Putri", "generated", join(outputDir, "BATCH_sari_putri.pdf")],
      ["Andi Wijaya", "generated", join(outputDir, "BATCH_andi_wijaya.pdf")],
      ["Dewi Lestari", "generated", join(outputDir, "BATCH_dewi_lestari.pdf")],
    ]);
    for (const recipient of done.recipients) {
      expect(existsSync(recipient.outputPath as string)).toBe(true);
    }

    // ONE LibreOffice invocation per routed template group: LOA first
    // (Budi, Andi, Dewi), then SK (Sari).
    expect(calls).toHaveLength(2);
    expect(calls[0].files).toHaveLength(3);
    expect(calls[1].files).toHaveLength(1);
    const zip = new PizZip(calls[0].contents[0]);
    expect(zip.file("word/document.xml")?.asText() ?? "").toContain("Budi Santoso Yayasan X");
    const skZip = new PizZip(calls[1].contents[0]);
    expect(skZip.file("word/document.xml")?.asText() ?? "").toContain("Sari Putri");

    // The audit trail: each job recipient records its routing value.
    const audit = db
      .prepare(
        "SELECT r.name, gjr.template_value FROM generate_job_recipients gjr JOIN recipients r ON r.id = gjr.recipient_id WHERE gjr.job_id = ? ORDER BY gjr.rowid",
      )
      .all(job.id) as { name: string; template_value: string | null }[];
    expect(audit).toEqual([
      { name: "Budi Santoso", template_value: "LOA" },
      { name: "Sari Putri", template_value: "SK" },
      { name: "Andi Wijaya", template_value: null },
      { name: "Dewi Lestari", template_value: null },
    ]);
  });

  it("fails fast with the affected recipients listed when a value is unassigned", async () => {
    const { db, repo, service } = makeSvc();
    const budi = seedRoutedRecipient(db, {
      name: "Budi Santoso",
      email: "budi@example.com",
      metadata: { template: "LOA" },
    });
    const sari = seedRoutedRecipient(db, {
      name: "Sari Putri",
      email: "sari@example.com",
      metadata: { template: "PIAGAM" },
    });
    const loaId = seedRoutedTemplate(repo, {
      name: "LOA",
      slots: ["name"],
      pattern: "LOA_{name}.pdf",
    });

    await expect(
      Effect.runPromise(
        service.start(loaId, [budi, sari], {
          templateColumn: "template",
          assignment: { LOA: loaId },
          outputPattern: "BATCH_{name}.pdf",
        }),
      ),
    ).rejects.toMatchObject({
      _tag: "InvalidGenerateRequest",
      message: expect.stringContaining("Sari Putri"),
    });
  });

  it("fails fast when an assigned template no longer exists", async () => {
    const { db, repo, service } = makeSvc();
    const budi = seedRoutedRecipient(db, {
      name: "Budi Santoso",
      email: "budi@example.com",
      metadata: { template: "LOA" },
    });
    const loaId = seedRoutedTemplate(repo, {
      name: "LOA",
      slots: ["name"],
      pattern: "LOA_{name}.pdf",
    });

    await expect(
      Effect.runPromise(
        service.start(loaId, [budi], {
          templateColumn: "template",
          assignment: { LOA: "ghost-template" },
          outputPattern: "BATCH_{name}.pdf",
        }),
      ),
    ).rejects.toMatchObject({ _tag: "InvalidGenerateRequest" });
  });

  it("rejects a job output pattern that one routed template cannot fill", async () => {
    const { db, repo, service } = makeSvc();
    const budi = seedRoutedRecipient(db, {
      name: "Budi Santoso",
      email: "budi@example.com",
      metadata: { template: "SK" },
    });
    const loaId = seedRoutedTemplate(repo, {
      name: "LOA",
      slots: ["name", "instansi"],
      pattern: "LOA_{name}.pdf",
    });
    const skId = seedRoutedTemplate(repo, {
      name: "SK",
      slots: ["name"],
      pattern: "SK_{name}.pdf",
    });

    await expect(
      Effect.runPromise(
        service.start(loaId, [budi], {
          templateColumn: "template",
          assignment: { SK: skId },
          // {instansi} exists on LOA but not on SK - the shared pattern
          // must be fillable by EVERY involved template.
          outputPattern: "BATCH_{name}_{instansi}.pdf",
        }),
      ),
    ).rejects.toMatchObject({
      _tag: "InvalidGenerateRequest",
      message: expect.stringContaining("{instansi}"),
    });
  });

  it("fails per-recipient when a routed template's slots are missing, and the batch continues", async () => {
    const { db, repo, service } = makeSvc();
    const budi = seedRoutedRecipient(db, {
      name: "Budi Santoso",
      email: "budi@example.com",
      metadata: { template: "LOA" },
    });
    const sari = seedRoutedRecipient(db, {
      name: "Sari Putri",
      email: "sari@example.com",
      metadata: { template: "LOA", instansi: "Sekolah Y" },
    });
    const loaId = seedRoutedTemplate(repo, {
      name: "LOA",
      slots: ["name", "instansi"],
      pattern: "LOA_{name}.pdf",
    });

    const job = await Effect.runPromise(
      service.start(loaId, [budi, sari], {
        templateColumn: "template",
        assignment: { LOA: loaId },
        outputPattern: "BATCH_{name}.pdf",
      }),
    );
    const done = await Effect.runPromise(service.run(job.id));

    expect(done.status).toBe("generated");
    expect(done.recipients.map((r) => [r.recipientName, r.status, r.errorMessage])).toEqual([
      ["Budi Santoso", "failed", 'Missing data for slot "instansi".'],
      ["Sari Putri", "generated", null],
    ]);
  });

  it("routed jobs without a template column behave exactly as before", async () => {
    const { db, repo, service, outputDir } = makeSvc();
    const [budi, sari] = seedRecipients(db);
    const templateId = seedDocxTemplate(repo);

    // The IPC layer maps a null template column to no routing draft at
    // all - the service then behaves exactly as before the ticket.
    const job = await Effect.runPromise(service.start(templateId, [budi, sari]));
    expect(job.templateColumn).toBeNull();
    expect(job.assignment).toBeNull();
    // The job records its output pattern - for a non-routed job it is the
    // template's own pattern, so the job owns its naming even if the
    // template is edited later.
    expect(job.outputPattern).toBe("LOA_{no}_{name}.pdf");

    const done = await Effect.runPromise(service.run(job.id));
    // Named by the template's own pattern, exactly like a legacy job.
    expect(done.recipients.map((r) => r.outputPath)).toEqual([
      join(outputDir, "LOA_001_budi_santoso.pdf"),
      join(outputDir, "LOA_002_sari_putri.pdf"),
    ]);
  });
});

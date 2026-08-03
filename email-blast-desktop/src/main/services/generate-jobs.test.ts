import { describe, expect, it } from "vitest";
import { Effect, Option } from "effect";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { basename, join } from "path";
import { inflateSync } from "zlib";
import { PDFDocument } from "pdf-lib";
import PizZip from "pizzip";
import type { DatabaseSync } from "node:sqlite";
import { openDatabase, makeSqliteRepo } from "./sqlite-repo";
import { LibreOfficeFailed, makeGenerateJobService, type GenerateEnv } from "./generate-jobs";
import { makeProgressHub } from "./progress-hub";
import type { HubEvent } from "../../shared/ipc";
import { tempDir, writeFixture } from "./test-helpers";

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
  const repo = makeSqliteRepo(db);
  const hub = makeProgressHub();
  const stub = stubEnv();
  const service = makeGenerateJobService(repo, hub, stub.env);
  const events: HubEvent[] = [];
  hub.subscribe((event) => events.push(event));
  return { db, repo, hub, service, events, ...stub };
}

/** Inserts recipients synchronously and returns their ids in insertion order (rowid order). */
function seedRecipients(db: DatabaseSync): string[] {
  Effect.runSync(makeSqliteRepo(db).insertRecipients(RECIPIENT_ROWS));
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
    }),
  );
  return created.id;
}

/**
 * The text a pdf-lib page drew, decoded from its content stream. The page
 * node and stream classes are pdf-lib internals (the public page API does
 * not expose content), so this walks the node surface: `Contents()` is a
 * `PDFArray` of refs, resolved through the page context. Streams loaded
 * from file arrive Flate-compressed (PDFRawStream), freshly built ones
 * decode via their own method; inflate with a raw fallback covers both.
 */
async function pageContentText(pdfBytes: Uint8Array): Promise<string> {
  const pdf = await PDFDocument.load(pdfBytes);
  const pageNode = pdf.getPages()[0].node as {
    Contents(): unknown;
    context: { lookup(ref: unknown): unknown };
  };
  const contents = pageNode.Contents();
  const array = contents as { asArray?: () => unknown[] };
  const items: unknown[] = array.asArray ? array.asArray() : [contents];
  let text = "";
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
    text += Buffer.from(decoded).toString("utf8");
  }
  // pdf-lib writes text for built-in fonts as hex strings (<42756469...>).
  return text.replace(/<([0-9A-Fa-f]+)>/g, (_match, hex: string) =>
    Buffer.from(hex, "hex").toString("utf8"),
  );
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
      makeSqliteRepo(db).insertRecipients([
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
      makeSqliteRepo(db).insertRecipients([
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
    await Effect.runPromise(makeSqliteRepo(db).deleteRecipients([andiId]));
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
    await Effect.runPromise(makeSqliteRepo(db).deleteRecipients([andiId]));
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

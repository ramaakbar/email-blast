import { Context, Data, Effect, Layer, Option, Result } from "effect";
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "fs";
import { readFile as readFileAsync } from "fs/promises";
import { tmpdir } from "os";
import { basename, dirname, extname, join } from "path";
import type Database from "better-sqlite3";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { m } from "@paraglide/messages";
import type { GenerateJob, Recipient, Template } from "../../shared/ipc";
import { fillOutputName, resolveSlotValue } from "../../shared/generate";
import type { DefaultPaths } from "./default-paths";
import { LibreOfficeService, LibreOfficeFailed } from "./libreoffice";
import { ProgressHub, type ProgressHubShape } from "./progress-hub";
import { Settings } from "./settings";
import {
  SqliteRepo,
  type GenerateJobRecipientRow,
  type GenerateJobWithRecipients,
  type SqliteRepoShape,
} from "../db/repository";

/**
 * The generate pipeline (ticket 13): one PDF per recipient against a
 * template, with per-recipient failures continuing the batch and progress
 * events streamed through the hub. DOCX letters fill in-process with
 * docxtemplater (the same engine that scanned the slots at registration),
 * then convert to PDF in ONE LibreOffice headless invocation for the whole
 * batch (verified ~0.21s/doc, ~6x faster than the send rate gate, so
 * generation is never the bottleneck). Image templates render with
 * pdf-lib: the background embeds once per document (pdf-lib's design),
 * every declared slot draws centered in a default stacked layout.
 *
 * Job-level failures (template file missing, LibreOffice missing or
 * crashing) fail the `run` effect itself and leave the job pending;
 * per-recipient failures (slot missing, fill/render error, conversion
 * skipping the file) mark that recipient failed with a reason and the
 * batch continues. The generate-then-send gate (`confirmedGoodAttachments`)
 * hands ticket 15 only recipients whose output is confirmed on disk.
 */

// ---- Errors ----

/** Running or inspecting a job whose id no longer exists. */
export class GenerateJobNotFound extends Data.TaggedError("GenerateJobNotFound")<{}> {}

/**
 * The template for a job is gone - the row was deleted, or the *file* was
 * moved/deleted after registration. Distinct from templates' own
 * TemplateUpdateNotFound (row missing at update time).
 */
export class TemplateNotFound extends Data.TaggedError("TemplateNotFound")<{
  readonly message: string;
}> {}

/** LibreOffice is not installed, or its batch conversion invocation failed. Owned by the libreoffice service. */
export { LibreOfficeFailed } from "./libreoffice";

/** A job request the pipeline cannot honor (no recipients, no template). */
export class InvalidGenerateRequest extends Data.TaggedError("InvalidGenerateRequest")<{
  readonly message: string;
}> {}

export type GenerateError =
  | GenerateJobNotFound
  | TemplateNotFound
  | LibreOfficeFailed
  | InvalidGenerateRequest;

// ---- Environment: what the pipeline needs from outside itself ----

/**
 * The generate env - the test seam. Tests build this object directly and
 * hand it to `makeGenerateJobService`; the Live layer builds it from the
 * LibreOfficeService (detection + conversion) and Settings (output dir).
 */
export interface GenerateEnv {
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
  /** Where the generated PDFs land (the settings output directory). */
  readonly outputDir: () => Effect.Effect<string>;
}

/**
 * The generate env as a Context service. Provided by the root layer;
 * constructing it provides LibreOfficeService alongside (Settings comes
 * from the consumer's own merge).
 */
export class GenerateEnvService extends Context.Service<GenerateEnvService, GenerateEnv>()(
  "GenerateEnvService",
) {
  static readonly Live: Layer.Layer<GenerateEnvService | LibreOfficeService, never, Settings> =
    Layer.provideMerge(
      Layer.effect(
        GenerateEnvService,
        Effect.gen(function* () {
          const libreOffice = yield* LibreOfficeService;
          const settings = yield* Settings;
          return {
            findLibreOffice: () => libreOffice.findLibreOffice(),
            convertDocxToPdf: (soffice, docxFiles, outDir) =>
              libreOffice.convertDocxToPdf(soffice, docxFiles, outDir),
            outputDir: () => settings.getOutputDir(),
          };
        }),
      ),
      LibreOfficeService.Live,
    );
}

// ---- The domain service ----

export interface GenerateJobServiceShape {
  /** Creates a pending job (nothing produced yet) for the template and recipient ids. */
  readonly start: (
    templateId: string,
    recipientIds: readonly string[],
  ) => Effect.Effect<GenerateJob, TemplateNotFound | InvalidGenerateRequest>;
  /**
   * Runs the job: fills and converts one PDF per recipient, streaming one
   * progress event per outcome. Resolves with the finished job; a
   * re-run of a finished job is a no-op. Job-level failures revert the
   * job to pending and fail the effect.
   */
  readonly run: (
    jobId: string,
  ) => Effect.Effect<GenerateJob, GenerateJobNotFound | TemplateNotFound | LibreOfficeFailed>;
  /** The full job snapshot, or none when the job id does not exist. */
  readonly getStatus: (jobId: string) => Effect.Effect<Option.Option<GenerateJob>>;
  /**
   * The generate-then-send gate: only recipients whose output is confirmed
   * generated on disk. Ticket 15's send step starts from this list, so
   * failed recipients can never receive a broken or empty attachment.
   */
  readonly confirmedGoodAttachments: (
    jobId: string,
  ) => Effect.Effect<readonly { recipientId: string; outputPath: string }[]>;
  /** The generated PDF bytes of one recipient (the spot-check preview), or none. */
  readonly getRecipientPdf: (
    jobId: string,
    recipientId: string,
  ) => Effect.Effect<Option.Option<{ fileName: string; dataBase64: string }>>;
}

/** The SQLite UTC stamp format, matching `datetime('now')`. */
function sqliteUtcNow(): string {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
}

/**
 * The final output path for a wanted name, suffixed on collision so no
 * generated PDF overwrites another. Null when no free name exists in the
 * attempt budget - the caller fails that recipient (a throw here would
 * defect the whole job instead of failing the one file).
 */
function uniquePath(target: string): string | null {
  if (!existsSync(target)) return target;
  const dir = dirname(target);
  const ext = extname(target);
  const stem = basename(target, ext);
  for (let i = 2; i < 1000; i++) {
    const candidate = join(dir, `${stem}-${i}${ext}`);
    if (!existsSync(candidate)) return candidate;
  }
  return null;
}

/**
 * The slot values for one recipient, or the first slot she cannot fill.
 * The pipeline never renders with a hole - missing data fails the
 * recipient before any file is produced.
 */
function resolveValues(
  template: Template,
  recipient: Recipient,
): { kind: "ok"; values: Record<string, string> } | { kind: "missing"; slot: string } {
  const values: Record<string, string> = {};
  for (const slot of template.slots) {
    const value = resolveSlotValue(recipient, slot);
    if (value === null) return { kind: "missing", slot };
    values[slot] = value;
  }
  return { kind: "ok", values };
}

/** Fills a DOCX template in-process; throws with the docxtemplater message on any tag problem. */
function fillDocx(templateBytes: Buffer, values: Record<string, string>): Buffer {
  const doc = new Docxtemplater(new PizZip(templateBytes));
  doc.render(values);
  return doc.getZip().generate({ type: "nodebuffer" });
}

/**
 * Renders one certificate PDF: the image background embedded full-page,
 * every declared slot drawn centered in a default stacked layout.
 * Per-slot text coordinates (CONTEXT.md places them at generate-job time)
 * are a later enhancement; the default centers every slot and fits long
 * values by shrinking the font.
 */
async function renderImagePdf(
  templateBytes: Uint8Array,
  kind: "png" | "jpg",
  slots: readonly string[],
  values: Record<string, string>,
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const background =
    kind === "png" ? await pdf.embedPng(templateBytes) : await pdf.embedJpg(templateBytes);
  const width = background.width;
  const height = background.height;
  const page = pdf.addPage([width, height]);
  page.drawImage(background, { x: 0, y: 0, width, height });
  const font = await pdf.embedFont(StandardFonts.HelveticaBold);
  const step = Math.max(60, height * 0.09);
  let y = height * 0.68;
  for (const slot of slots) {
    const value = values[slot];
    if (value === undefined) continue;
    // Shrink to fit the page width; never below a legible floor.
    const size = Math.max(18, Math.min(140, width / Math.max(1, value.length * 0.6)));
    const textWidth = font.widthOfTextAtSize(value, size);
    page.drawText(value, {
      x: (width - textWidth) / 2,
      y,
      size,
      font,
      color: rgb(0.1, 0.14, 0.13),
    });
    y -= step;
  }
  return pdf.save();
}

/** The domain shape of a loaded job row pair, with deleted-recipient names mended. */
export function toGenerateJob(loaded: GenerateJobWithRecipients): GenerateJob {
  return {
    id: loaded.job.id,
    templateId: loaded.job.templateId,
    templateName: loaded.job.templateName,
    status: loaded.job.status,
    total: loaded.recipients.length,
    createdAt: loaded.job.createdAt,
    completedAt: loaded.job.completedAt,
    recipients: loaded.recipients.map((row) => ({
      recipientId: row.recipientId,
      recipientName: row.recipientName ?? "(deleted recipient)",
      status: row.status,
      outputPath: row.outputPath,
      errorMessage: row.errorMessage,
    })),
  };
}

export function makeGenerateJobService(
  repo: SqliteRepoShape,
  hub: ProgressHubShape,
  env: GenerateEnv,
): GenerateJobServiceShape {
  const loadTemplate = (templateId: string): Effect.Effect<Template, TemplateNotFound> =>
    Effect.gen(function* () {
      const template = yield* repo.getTemplate(templateId);
      if (Option.isNone(template)) {
        return yield* Effect.fail(
          new TemplateNotFound({ message: m["generateJob.templateMissing"]() }),
        );
      }
      return template.value;
    });

  /** The per-recipient failure path shared by both pipelines. */
  const failRecipient = (
    state: { current: number; readonly total: number },
    jobId: string,
    recipientId: string,
    errorMessage: string,
  ): Effect.Effect<void> => finishRecipient(state, jobId, recipientId, "failed", { errorMessage });

  /** Persists one recipient's outcome and emits its progress event. */
  const finishRecipient = (
    state: { current: number; readonly total: number },
    jobId: string,
    recipientId: string,
    status: "generated" | "failed",
    result: { outputPath?: string; errorMessage?: string },
  ): Effect.Effect<void> =>
    Effect.gen(function* () {
      yield* repo.setGenerateRecipientResult(jobId, recipientId, {
        status,
        outputPath: result.outputPath ?? null,
        errorMessage: result.errorMessage ?? null,
      });
      state.current += 1;
      hub.emit({
        kind: "generate-progress",
        jobId,
        current: state.current,
        total: state.total,
        status,
        recipientId,
        error: result.errorMessage ?? null,
      });
    });

  /** The DOCX path: fill every letter in-process, convert the batch once, land the PDFs. */
  const runDocx = (
    jobId: string,
    template: Template,
    rows: readonly GenerateJobRecipientRow[],
    byId: Map<string, Recipient>,
    state: { current: number; readonly total: number },
    outputDir: string,
  ): Effect.Effect<void, LibreOfficeFailed> =>
    Effect.gen(function* () {
      const batchDir = join(tmpdir(), `email-blast-generate-${jobId}`);
      const pdfDir = join(batchDir, "pdf");
      mkdirSync(pdfDir, { recursive: true });
      try {
        const templateBytes = readFileSync(template.filePath);
        // One outcome per job row, kept in row order: fill failures are
        // known in phase 1, generated results only after the batch
        // conversion, so events are emitted in a single ordered pass at the
        // end - progress always streams in recipient order with correct
        // running counts.
        type Outcome =
          | { kind: "deleted" }
          | { kind: "missing"; slot: string }
          | { kind: "fill-error"; message: string }
          | { kind: "filled"; docxPath: string; values: Record<string, string> };
        const outcomes: { row: GenerateJobRecipientRow; outcome: Outcome }[] = [];
        // The filled letters, in fill order - the batch conversion input.
        const docxFiles: string[] = [];

        // Phase 1: fill in-process. A failing recipient is recorded and the
        // batch moves on; only the filled letters reach the conversion.
        for (const row of rows) {
          const recipient = byId.get(row.recipientId);
          if (recipient === undefined) {
            outcomes.push({ row, outcome: { kind: "deleted" } });
            continue;
          }
          const resolved = resolveValues(template, recipient);
          if (resolved.kind === "missing") {
            outcomes.push({ row, outcome: { kind: "missing", slot: resolved.slot } });
            continue;
          }
          const filled = yield* Effect.try<Buffer, unknown>({
            try: () => fillDocx(templateBytes, resolved.values),
            catch: (error) => error,
          }).pipe(Effect.result);
          if (Result.isFailure(filled)) {
            outcomes.push({
              row,
              outcome: {
                kind: "fill-error",
                message:
                  filled.failure instanceof Error ? filled.failure.message : String(filled.failure),
              },
            });
            continue;
          }
          const filledBytes = filled.success;
          // Index-based intermediate names: unique by construction, so the
          // batch conversion never collides; the final name comes from the
          // output pattern after conversion.
          const docxPath = join(batchDir, `${String(docxFiles.length + 1).padStart(4, "0")}.docx`);
          writeFileSync(docxPath, filledBytes);
          docxFiles.push(docxPath);
          outcomes.push({ row, outcome: { kind: "filled", docxPath, values: resolved.values } });
        }

        // Phase 2: ONE LibreOffice invocation for the whole batch.
        if (docxFiles.length > 0) {
          const soffice = env.findLibreOffice();
          if (soffice === null) {
            return yield* Effect.fail(
              new LibreOfficeFailed({
                message:
                  m["generateJob.libreOfficeMissing"](),
              }),
            );
          }
          yield* env.convertDocxToPdf(soffice, docxFiles, pdfDir);
        }

        // Phase 3: land each converted PDF at its final pattern name and
        // emit one event per recipient, in job order. A conversion that
        // silently skipped one letter fails only that recipient; the rest
        // of the batch completes.
        for (const { row, outcome } of outcomes) {
          if (outcome.kind === "deleted") {
            yield* failRecipient(
              state,
              jobId,
              row.recipientId,
              m["generateJob.recipientDeleted"](),
            );
          } else if (outcome.kind === "missing") {
            yield* failRecipient(
              state,
              jobId,
              row.recipientId,
              m["generateJob.missingSlotData"]({ slot: outcome.slot }),
            );
          } else if (outcome.kind === "fill-error") {
            yield* failRecipient(
              state,
              jobId,
              row.recipientId,
              m["generateJob.couldNotFill"]({ message: outcome.message }),
            );
          } else {
            const converted = join(pdfDir, `${basename(outcome.docxPath, ".docx")}.pdf`);
            if (!existsSync(converted)) {
              yield* failRecipient(
                state,
                jobId,
                row.recipientId,
                m["generateJob.noPdfProduced"](),
              );
              continue;
            }
            const wanted = join(outputDir, fillOutputName(template.outputPattern, outcome.values));
            const finalPath = uniquePath(wanted);
            if (finalPath === null) {
              yield* failRecipient(
                state,
                jobId,
                row.recipientId,
                m["generateJob.noFreeFileName"]({ name: wanted }),
              );
              continue;
            }
            // The rename can fail (permissions, full disk, antivirus
            // locking the file) - that recipient fails, the batch continues.
            const moveOutcome = yield* Effect.try({
              try: () => renameSync(converted, finalPath),
              catch: (error) => error,
            }).pipe(Effect.result);
            if (Result.isFailure(moveOutcome)) {
              const error = moveOutcome.failure;
              yield* failRecipient(
                state,
                jobId,
                row.recipientId,
                `Could not move the generated PDF into the output folder: ${
                  error instanceof Error ? error.message : String(error)
                }`,
              );
              continue;
            }
            yield* finishRecipient(state, jobId, row.recipientId, "generated", {
              outputPath: finalPath,
            });
          }
        }
      } finally {
        // The filled letters are intermediates; only the final PDFs persist.
        rmSync(batchDir, { recursive: true, force: true });
      }
    });

  /** The image path: embed the background once per document, draw every slot, save. */
  const runImage = (
    jobId: string,
    template: Template,
    rows: readonly GenerateJobRecipientRow[],
    byId: Map<string, Recipient>,
    state: { current: number; readonly total: number },
    outputDir: string,
  ): Effect.Effect<void, never> =>
    Effect.gen(function* () {
      const templateBytes = readFileSync(template.filePath);
      const kind: "png" | "jpg" = template.filePath.toLowerCase().endsWith(".png") ? "png" : "jpg";
      for (const row of rows) {
        const recipient = byId.get(row.recipientId);
        if (recipient === undefined) {
          yield* failRecipient(
            state,
            jobId,
            row.recipientId,
            m["generateJob.recipientDeleted"](),
          );
          continue;
        }
        const resolved = resolveValues(template, recipient);
        if (resolved.kind === "missing") {
          yield* failRecipient(
            state,
            jobId,
            row.recipientId,
            m["generateJob.missingSlotData"]({ slot: resolved.slot }),
          );
          continue;
        }
        const rendered = yield* Effect.tryPromise<Uint8Array, unknown>({
          try: () => renderImagePdf(templateBytes, kind, template.slots, resolved.values),
          catch: (error) => error,
        }).pipe(Effect.result);
        if (Result.isFailure(rendered)) {
          const error = rendered.failure;
          yield* finishRecipient(state, jobId, row.recipientId, "failed", {
            errorMessage: `Could not render the certificate: ${
              error instanceof Error ? error.message : String(error)
            }`,
          });
          continue;
        }
        const wanted = join(outputDir, fillOutputName(template.outputPattern, resolved.values));
        const finalPath = uniquePath(wanted);
        if (finalPath === null) {
          yield* failRecipient(
            state,
            jobId,
            row.recipientId,
            m["generateJob.noFreeFileName"]({ name: wanted }),
          );
          continue;
        }
        // The disk write can fail (permissions, full disk) - that is this
        // recipient's failure, not a defect that strands the whole job.
        const writeOutcome = yield* Effect.try({
          try: () => writeFileSync(finalPath, rendered.success),
          catch: (error) => error,
        }).pipe(Effect.result);
        if (Result.isFailure(writeOutcome)) {
          const error = writeOutcome.failure;
          yield* finishRecipient(state, jobId, row.recipientId, "failed", {
            errorMessage: `Could not render the certificate: ${
              error instanceof Error ? error.message : String(error)
            }`,
          });
          continue;
        }
        yield* finishRecipient(state, jobId, row.recipientId, "generated", {
          outputPath: finalPath,
        });
      }
    });

  const processJob = (
    jobId: string,
    loaded: GenerateJobWithRecipients,
  ): Effect.Effect<void, TemplateNotFound | LibreOfficeFailed> =>
    Effect.gen(function* () {
      const { job, recipients: rows } = loaded;
      const template = yield* loadTemplate(job.templateId);
      if (!existsSync(template.filePath)) {
        return yield* Effect.fail(
          new TemplateNotFound({
            message: m["generateJob.templateFileMissing"]({ path: template.filePath }),
          }),
        );
      }
      const recipients = yield* repo.getRecipientsByIds(rows.map((row) => row.recipientId));
      const byId = new Map(recipients.map((recipient) => [recipient.id, recipient]));
      const outputDir = yield* env.outputDir();
      mkdirSync(outputDir, { recursive: true });
      const state = { current: 0, total: rows.length };
      if (template.type === "docx") {
        yield* runDocx(jobId, template, rows, byId, state, outputDir);
      } else {
        yield* runImage(jobId, template, rows, byId, state, outputDir);
      }
    });

  return {
    start: (templateId, recipientIds) =>
      Effect.gen(function* () {
        const template = yield* loadTemplate(templateId);
        if (recipientIds.length === 0) {
          return yield* Effect.fail(
            new InvalidGenerateRequest({ message: m["generateJob.selectRecipients"]() }),
          );
        }
        const recipients = yield* repo.getRecipientsByIds(recipientIds);
        if (recipients.length === 0) {
          return yield* Effect.fail(
            new InvalidGenerateRequest({
              message: m["generateJob.noRecipientsExist"](),
            }),
          );
        }
        const jobId = yield* repo.insertGenerateJob(template.id);
        yield* repo.insertGenerateJobRecipients(
          jobId,
          recipients.map((recipient) => recipient.id),
        );
        const loaded = yield* repo.getGenerateJob(jobId);
        // The insert above just landed, so the row must exist.
        if (Option.isNone(loaded)) {
          return yield* Effect.fail(
            new InvalidGenerateRequest({ message: m["generateJob.jobCouldNotBeCreated"]() }),
          );
        }
        return toGenerateJob(loaded.value);
      }),

    run: (jobId) =>
      Effect.gen(function* () {
        const loaded = yield* repo.getGenerateJob(jobId);
        if (Option.isNone(loaded)) return yield* Effect.fail(new GenerateJobNotFound());
        // A finished (or in-flight) job is not re-run: generated stays
        // generated, so a duplicate Generate click can never double-produce.
        if (loaded.value.job.status !== "pending") return toGenerateJob(loaded.value);

        yield* repo.setGenerateJobStatus(jobId, "generating", null);
        const outcome = yield* processJob(jobId, loaded.value).pipe(Effect.result);
        if (Result.isFailure(outcome)) {
          // Job-level failure: nothing half-done is recorded. The job goes
          // back to pending so a retry re-runs the whole job. (The schema
          // has no failed status for generate jobs; the run call itself
          // carries the error.)
          yield* repo.setGenerateJobStatus(jobId, "pending", null);
          return yield* Effect.fail(outcome.failure);
        }
        yield* repo.setGenerateJobStatus(jobId, "generated", sqliteUtcNow());
        const final = yield* repo.getGenerateJob(jobId);
        if (Option.isNone(final)) return yield* Effect.fail(new GenerateJobNotFound());
        return toGenerateJob(final.value);
      }),

    getStatus: (jobId) => repo.getGenerateJob(jobId).pipe(Effect.map(Option.map(toGenerateJob))),

    confirmedGoodAttachments: (jobId) =>
      Effect.gen(function* () {
        const loaded = yield* repo.getGenerateJob(jobId);
        if (Option.isNone(loaded)) return [];
        return loaded.value.recipients
          .filter((row) => row.status === "generated" && row.outputPath !== null)
          .map((row) => ({ recipientId: row.recipientId, outputPath: row.outputPath as string }));
      }),

    getRecipientPdf: (jobId, recipientId) =>
      Effect.gen(function* () {
        const row = yield* repo.getGenerateRecipient(jobId, recipientId);
        if (Option.isNone(row)) return Option.none();
        const outputPath = row.value.outputPath;
        if (row.value.status !== "generated" || outputPath === null || !existsSync(outputPath)) {
          return Option.none();
        }
        const bytes = yield* Effect.tryPromise<Buffer, unknown>({
          try: () => readFileAsync(outputPath),
          catch: (error) => error,
        }).pipe(Effect.result);
        if (Result.isFailure(bytes)) return Option.none();
        return Option.some({
          fileName: basename(outputPath),
          dataBase64: bytes.success.toString("base64"),
        });
      }),
  };
}

/**
 * The generate domain service. Constructing this layer provides
 * GenerateEnv, LibreOffice, ProgressHub, Settings, and SqliteRepo
 * alongside, so a program can depend on either.
 */
export class GenerateJobService extends Context.Service<
  GenerateJobService,
  GenerateJobServiceShape
>()("GenerateJobService") {
  static readonly Live = (
    db: Database.Database,
    defaults: DefaultPaths,
  ): Layer.Layer<
    | GenerateJobService
    | GenerateEnvService
    | LibreOfficeService
    | ProgressHub
    | Settings
    | SqliteRepo,
    never,
    never
  > =>
    Layer.provideMerge(
      Layer.provideMerge(
        Layer.provideMerge(
          Layer.effect(
            GenerateJobService,
            Effect.gen(function* () {
              const repo = yield* SqliteRepo;
              const env = yield* GenerateEnvService;
              const hub = yield* ProgressHub;
              return makeGenerateJobService(repo, hub, env);
            }),
          ),
          GenerateEnvService.Live,
        ),
        ProgressHub.Live,
      ),
      Settings.Live(db, defaults),
    );
}

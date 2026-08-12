import { Context, Data, Effect, Layer, Option, Result, Schema } from "effect";
import { dialog } from "electron";
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "fs";
import { readFile as readFileAsync } from "fs/promises";
import { tmpdir } from "os";
import { basename, dirname, extname, join } from "path";
import type Database from "better-sqlite3";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { m } from "@paraglide/messages";
import type { Recipient, Template } from "../../shared/ipc";
import {
  GenerateJob,
  GenerateJobSummary,
  GeneratePdfPayload,
  GeneratePdfResponse,
  GenerateSavePdfResponse,
  GenerateStartPayload,
} from "../../shared/ipc";
import { WIRE } from "../../shared/wire";
import { makeOp } from "../ipc-core";
import { fillOutputName, resolveSlotValue } from "../../shared/generate";
import {
  recipientTemplateValue,
  resolveTemplateId,
  unassignedTemplateValues,
  validateJobOutputPattern,
} from "../../shared/template-assignment";
import {
  fitFontSize,
  LEGACY_TEXT_COLOR,
  parseHexColor,
  pdfBaselineY,
  slotTextX,
  type SlotLayoutConfig,
} from "../../shared/slot-layout";
import { DEFAULT_UI_LOCALE } from "../../shared/settings";
import type { DefaultPaths } from "./default-paths";
import { LibreOfficeService, LibreOfficeFailed } from "./libreoffice";
import { ProgressHub, type ProgressHubShape } from "./progress-hub";
import { Settings } from "./settings";
import type { CredentialCrypto } from "./credential-crypto";
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

/**
 * The Template Assignment a routed job is started with (ticket 08,
 * ADR 0006): the routing header, the value -> template-id mapping, and
 * the ONE output naming pattern the whole job shares. `start` validates
 * the assignment before anything is persisted - unassigned values fail
 * fast with the affected recipients listed, so no partial or
 * wrong-template output can ever be produced.
 */
export interface GenerateRoutingDraft {
  readonly templateColumn: string;
  readonly assignment: Record<string, string>;
  readonly outputPattern: string;
}

export interface GenerateJobServiceShape {
  /**
   * Creates a pending job (nothing produced yet) for the default
   * template and recipient ids. With `routing`, each recipient is
   * generated with the template its routing value points at (blank
   * values use the default); without it the job behaves exactly as
   * before - one template, its own output pattern.
   */
  readonly start: (
    templateId: string,
    recipientIds: readonly string[],
    routing?: GenerateRoutingDraft,
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
   * Every generate job, most recent first, with per-recipient outcome
   * counts - the workspace's Past Generate Jobs list.
   */
  readonly list: () => Effect.Effect<GenerateJobSummary[]>;
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

/** The pdf-lib ink of a "#RRGGBB" color; a malformed color falls back to the legacy ink. */
function ink(hex: string) {
  const c = parseHexColor(hex) ?? { r: 26, g: 36, b: 33 };
  return rgb(c.r / 255, c.g / 255, c.b / 255);
}

/**
 * Renders one certificate PDF: the image background embedded full-page,
 * every declared slot drawn in its configured position (ticket 04). A
 * slot without a configuration falls back to the centered stacked
 * default, so templates with no configuration at all keep the legacy
 * layout and a newly declared slot never vanishes. Configured slots
 * render single-line at the configured size, color, and alignment,
 * auto-shrinking to fit the slot width.
 */
async function renderImagePdf(
  templateBytes: Uint8Array,
  kind: "png" | "jpg",
  slots: readonly string[],
  values: Record<string, string>,
  slotLayout: SlotLayoutConfig,
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
    const layout = slotLayout[slot];
    if (layout === undefined) {
      // The legacy default: centered, stacked from two-thirds down the
      // page, fitted to the page width and never below a legible floor.
      const size = Math.max(18, Math.min(140, width / Math.max(1, value.length * 0.6)));
      const textWidth = font.widthOfTextAtSize(value, size);
      page.drawText(value, {
        x: (width - textWidth) / 2,
        y,
        size,
        font,
        color: ink(LEGACY_TEXT_COLOR),
      });
      y -= step;
      continue;
    }
    // The configured box: the top-left corner lives in image pixels
    // (CSS convention); the fitted size never grows past the configured
    // one and never falls below the legibility floor.
    const maxWidth = layout.maxWidth ?? width - layout.x;
    const fitted = fitFontSize({
      size: layout.fontSize,
      maxWidth,
      measureWidth: (size) => font.widthOfTextAtSize(value, size),
    });
    const textWidth = font.widthOfTextAtSize(value, fitted);
    const x = slotTextX({ x: layout.x, maxWidth, textWidth, align: layout.align });
    page.drawText(value, {
      x,
      y: pdfBaselineY({ pageHeight: height, y: layout.y, fontSize: fitted }),
      size: fitted,
      font,
      color: ink(layout.color),
    });
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
    templateColumn: loaded.job.templateColumn,
    assignment: loaded.job.templateAssignment,
    outputPattern: loaded.job.outputPattern,
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

  /**
   * The DOCX path: fill every letter in-process, convert the batch once,
   * land the PDFs. `outputPattern` is the naming pattern this batch's
   * files land under - the job's own pattern when it has a Template
   * Assignment, the template's pattern otherwise (ticket 08).
   */
  const runDocx = (
    jobId: string,
    template: Template,
    rows: readonly GenerateJobRecipientRow[],
    byId: Map<string, Recipient>,
    state: { current: number; readonly total: number },
    outputDir: string,
    outputPattern: string,
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
                message: m["generateJob.libreOfficeMissing"](),
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
              yield* failRecipient(state, jobId, row.recipientId, m["generateJob.noPdfProduced"]());
              continue;
            }
            const wanted = join(outputDir, fillOutputName(outputPattern, outcome.values));
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

  /**
   * The image path: embed the background once per document, draw every
   * slot, save. `outputPattern` is the job's shared pattern when the job
   * has a Template Assignment (ticket 08).
   */
  const runImage = (
    jobId: string,
    template: Template,
    rows: readonly GenerateJobRecipientRow[],
    byId: Map<string, Recipient>,
    state: { current: number; readonly total: number },
    outputDir: string,
    outputPattern: string,
  ): Effect.Effect<void, never> =>
    Effect.gen(function* () {
      const templateBytes = readFileSync(template.filePath);
      const kind: "png" | "jpg" = template.filePath.toLowerCase().endsWith(".png") ? "png" : "jpg";
      for (const row of rows) {
        const recipient = byId.get(row.recipientId);
        if (recipient === undefined) {
          yield* failRecipient(state, jobId, row.recipientId, m["generateJob.recipientDeleted"]());
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
          try: () =>
            renderImagePdf(
              templateBytes,
              kind,
              template.slots,
              resolved.values,
              template.slotLayout,
            ),
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
        const wanted = join(outputDir, fillOutputName(outputPattern, resolved.values));
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
      const recipients = yield* repo.getRecipientsByIds(rows.map((row) => row.recipientId));
      const byId = new Map(recipients.map((recipient) => [recipient.id, recipient]));
      const outputDir = yield* env.outputDir();
      mkdirSync(outputDir, { recursive: true });
      const state = { current: 0, total: rows.length };

      // The Template Assignment (ticket 08): every row resolves to the
      // template its routing value points at - the job's default
      // template for blank values. Rows that resolve to nothing (a
      // deleted recipient, or a value the assignment does not cover -
      // only reachable when the database was edited behind the service,
      // since start() rejects incomplete assignments) fail immediately;
      // the rest group by template, first-appearance order, and each
      // group runs its own pipeline with the job's shared pattern.
      type PlanEntry =
        | { kind: "fail"; row: GenerateJobRecipientRow; message: string }
        | { kind: "ok"; templateId: string; row: GenerateJobRecipientRow };
      const plan: PlanEntry[] = [];
      const groups = new Map<string, GenerateJobRecipientRow[]>();
      const groupOrder: string[] = [];
      for (const row of rows) {
        const recipient = byId.get(row.recipientId);
        if (recipient === undefined) {
          plan.push({
            kind: "fail",
            row,
            message: m["generateJob.recipientDeleted"](),
          });
          continue;
        }
        const templateId =
          job.templateColumn === null
            ? job.templateId
            : resolveTemplateId(
                recipientTemplateValue(recipient, job.templateColumn),
                job.templateId,
                job.templateAssignment ?? {},
              );
        if (templateId === null) {
          plan.push({
            kind: "fail",
            row,
            message: m["generateJob.unassignedTemplateValue"]({
              value: recipientTemplateValue(recipient, job.templateColumn as string) ?? "",
            }),
          });
          continue;
        }
        plan.push({ kind: "ok", templateId, row });
        const group = groups.get(templateId);
        if (group === undefined) {
          groups.set(templateId, [row]);
          groupOrder.push(templateId);
        } else {
          group.push(row);
        }
      }

      // Every involved template is validated before ANY recipient is
      // marked, so a job-level failure (template row or file gone) still
      // leaves nothing half-done, exactly as before routing existed.
      const loadedTemplates = new Map<string, Template>();
      for (const templateId of groupOrder) {
        const template = yield* loadTemplate(templateId);
        if (!existsSync(template.filePath)) {
          return yield* Effect.fail(
            new TemplateNotFound({
              message: m["generateJob.templateFileMissing"]({ path: template.filePath }),
            }),
          );
        }
        loadedTemplates.set(templateId, template);
      }

      // Unresolvable rows fail first (nothing generated yet, so the
      // running counts stay correct); then each group runs its pipeline.
      for (const entry of plan) {
        if (entry.kind !== "fail") continue;
        yield* failRecipient(state, jobId, entry.row.recipientId, entry.message);
      }
      for (const templateId of groupOrder) {
        const template = loadedTemplates.get(templateId) as Template;
        const pattern = job.outputPattern ?? template.outputPattern;
        if (template.type === "docx") {
          yield* runDocx(
            jobId,
            template,
            groups.get(templateId) as GenerateJobRecipientRow[],
            byId,
            state,
            outputDir,
            pattern,
          );
        } else {
          yield* runImage(
            jobId,
            template,
            groups.get(templateId) as GenerateJobRecipientRow[],
            byId,
            state,
            outputDir,
            pattern,
          );
        }
      }
    });

  return {
    start: (templateId, recipientIds, routing) =>
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

        // The Template Assignment (ticket 08): a job without a routing
        // draft behaves exactly as before - one template, its own
        // output pattern. A routed job is validated in full before
        // anything is persisted: unassigned values fail fast with the
        // affected recipients listed by name (ADR 0006), every assigned
        // template must exist, and the job's shared output pattern must
        // be fillable by EVERY involved template.
        let templateColumn: string | null = null;
        let assignmentJson: string | null = null;
        let outputPattern: string | null = template.outputPattern;
        if (routing !== undefined) {
          const column = routing.templateColumn.trim();
          if (column === "") {
            return yield* Effect.fail(
              new InvalidGenerateRequest({ message: m["generateJob.routingColumnRequired"]() }),
            );
          }
          const unassigned = unassignedTemplateValues(
            recipients,
            column,
            template.id,
            routing.assignment,
          );
          if (unassigned.length > 0) {
            const names = unassigned.flatMap((entry) => entry.recipientNames);
            return yield* Effect.fail(
              new InvalidGenerateRequest({
                message: m["generateJob.unassignedTemplateValues"]({
                  count: names.length,
                  names: names.join(", "),
                }),
              }),
            );
          }
          const assignedTemplates: Template[] = [];
          for (const id of new Set(Object.values(routing.assignment))) {
            const found = yield* repo.getTemplate(id);
            if (Option.isNone(found)) {
              return yield* Effect.fail(
                new InvalidGenerateRequest({ message: m["generateJob.templateMissing"]() }),
              );
            }
            assignedTemplates.push(found.value);
          }
          const patternError = validateJobOutputPattern(routing.outputPattern.trim(), [
            template,
            ...assignedTemplates,
          ]);
          if (patternError !== null) {
            return yield* Effect.fail(new InvalidGenerateRequest({ message: patternError }));
          }
          templateColumn = column;
          assignmentJson = JSON.stringify(routing.assignment);
          outputPattern = routing.outputPattern.trim();
        }

        const jobId = yield* repo.insertGenerateJob({
          templateId: template.id,
          templateColumn,
          templateAssignmentJson: assignmentJson,
          outputPattern,
        });
        yield* repo.insertGenerateJobRecipients(
          jobId,
          recipients.map((recipient) => ({
            recipientId: recipient.id,
            // The routing value at job start - the audit trail of which
            // template-column value routed this recipient.
            templateValue:
              templateColumn === null ? null : recipientTemplateValue(recipient, templateColumn),
          })),
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

    list: () =>
      repo.listGenerateJobs().pipe(
        Effect.map((rows) =>
          rows.map((row) => ({
            id: row.id,
            templateId: row.templateId,
            templateName: row.templateName,
            status: row.status,
            generatedCount: row.generatedCount,
            failedCount: row.failedCount,
            total: row.totalCount,
            createdAt: row.createdAt,
            completedAt: row.completedAt,
          })),
        ),
      ),

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
    credCrypto: CredentialCrypto,
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
      Settings.Live(db, defaults, DEFAULT_UI_LOCALE, credCrypto),
    );
}

/**
 * The Generate Job domain's IPC operations: start (with the optional
 * Template Assignment), run, status, the per-recipient PDF reads, the
 * past-jobs list, and the native save-dialog re-download.
 */
export const generateOperations = {
  startGenerate: makeOp(WIRE.generate.startGenerate, GenerateStartPayload, GenerateJob, (payload) =>
    Effect.gen(function* () {
      const { templateId, recipientIds, templateColumn, assignment, outputPattern } = payload;
      const service = yield* GenerateJobService;
      return yield* service.start(
        templateId,
        recipientIds,
        templateColumn === null
          ? undefined
          : {
              templateColumn,
              assignment: assignment ?? {},
              outputPattern: outputPattern ?? "",
            },
      );
    }),
  ),
  runGenerate: makeOp(WIRE.generate.runGenerate, Schema.String, GenerateJob, (jobId) =>
    Effect.gen(function* () {
      const service = yield* GenerateJobService;
      return yield* service.run(jobId);
    }),
  ),
  getGenerateStatus: makeOp(
    WIRE.generate.getGenerateStatus,
    Schema.String,
    Schema.NullOr(GenerateJob),
    (jobId) =>
      Effect.gen(function* () {
        const service = yield* GenerateJobService;
        return Option.getOrNull(yield* service.getStatus(jobId));
      }),
  ),
  getRecipientPdf: makeOp(
    WIRE.generate.getRecipientPdf,
    GeneratePdfPayload,
    Schema.NullOr(GeneratePdfResponse),
    (payload) =>
      Effect.gen(function* () {
        const { jobId, recipientId } = payload;
        const service = yield* GenerateJobService;
        return Option.getOrNull(yield* service.getRecipientPdf(jobId, recipientId));
      }),
  ),
  list: makeOp(WIRE.generate.list, null, Schema.Array(GenerateJobSummary), () =>
    Effect.gen(function* () {
      const service = yield* GenerateJobService;
      return yield* service.list();
    }),
  ),
  saveRecipientPdf: makeOp(
    WIRE.generate.saveRecipientPdf,
    GeneratePdfPayload,
    GenerateSavePdfResponse,
    (payload) =>
      Effect.gen(function* () {
        const { jobId, recipientId } = payload;
        const service = yield* GenerateJobService;
        const pdf = yield* service.getRecipientPdf(jobId, recipientId);
        if (Option.isNone(pdf)) return null;
        // The workspace's PDF re-download: a native save dialog prefilled
        // with the generated file's name, then the bytes written to the
        // chosen path. Null when the dialog is cancelled or the PDF is
        // gone; the renderer treats both as "no save", not as an error.
        const result = yield* Effect.promise(() =>
          dialog.showSaveDialog({
            defaultPath: pdf.value.fileName,
            filters: [{ name: m["dialogs.pdfFilter"](), extensions: ["pdf"] }],
          }),
        );
        if (result.canceled || result.filePath === undefined || result.filePath === "") {
          return null;
        }
        const write = yield* Effect.try({
          try: () =>
            writeFileSync(result.filePath as string, Buffer.from(pdf.value.dataBase64, "base64")),
          catch: (error) => error,
        }).pipe(Effect.result);
        if (Result.isFailure(write)) return yield* Effect.fail(write.failure);
        return result.filePath;
      }),
  ),
};

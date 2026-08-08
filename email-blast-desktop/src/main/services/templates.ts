import { Context, Data, Effect, Layer, Option } from "effect";
import { readFileSync } from "fs";
import Database from "better-sqlite3";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import type { Template } from "../../shared/ipc";
import { normalizeSlots, validateTemplate } from "../../shared/template-validation";
import {
  SqliteRepo,
  type SqliteRepoShape,
  type TemplateDraft,
  type TemplatePatch,
} from "../db/repository";

/**
 * The templates domain (ticket 12): registering DOCX letter and image
 * certificate templates with their user-declared slots and output
 * patterns. The file path and type are set once at creation; the name,
 * slots, and output pattern stay editable. Slot scanning reads the
 * `{placeholder}` tags out of a DOCX via docxtemplater (the same engine
 * that fills them at generate time, ticket 13), so the scanned slots and
 * the fill behavior can never drift apart.
 */

/** A template payload that fails validation (empty name, no slots, bad pattern). */
export class InvalidTemplate extends Data.TaggedError("InvalidTemplate")<{
  readonly message: string;
}> {}

/** A DOCX that could not be scanned (missing file, not a DOCX, corrupt). */
export class UnreadableDocx extends Data.TaggedError("UnreadableDocx")<{
  readonly message: string;
}> {}

/**
 * Updating a template whose id no longer exists (deleted in another
 * window, or gone since the list was fetched). Named so it can never be
 * confused with the generate pipeline's TemplateNotFound (ticket 13),
 * which means the template *file* is missing at generate time.
 */
export class TemplateUpdateNotFound extends Data.TaggedError("TemplateUpdateNotFound")<{}> {}

export interface TemplatesServiceShape {
  /** Every registered template, newest first. */
  readonly list: () => Effect.Effect<Template[]>;
  /** A single template by id, or none when no such id exists. */
  readonly get: (id: string) => Effect.Effect<Option.Option<Template>>;
  /** Registers a template; validates the name, slots, and output pattern. */
  readonly create: (draft: TemplateDraft) => Effect.Effect<Template, InvalidTemplate>;
  /** Edits the mutable fields of a template. */
  readonly update: (
    id: string,
    patch: TemplatePatch,
  ) => Effect.Effect<Template, InvalidTemplate | TemplateUpdateNotFound>;
  /** Deletes a template and returns how many rows were removed. */
  readonly delete: (id: string) => Effect.Effect<number>;
  /** Reads the `{placeholder}` slots out of a DOCX file. */
  readonly scanSlots: (docxPath: string) => Effect.Effect<string[], UnreadableDocx>;
}

/**
 * The tag report `getTags()` returns: the document part plus the header
 * and footer parts it knows about, each with its tags. getTags() is a
 * runtime API of docxtemplater that its bundled types do not declare,
 * so the parts we read are declared here.
 */
interface ScannedDocTags {
  readonly document: { readonly tags: Record<string, unknown> };
  readonly headers: readonly { readonly tags: Record<string, unknown> }[];
  readonly footers: readonly { readonly tags: Record<string, unknown> }[];
}

/**
 * The `{placeholder}` tags docxtemplater reports, flattened across the
 * document and its headers and footers, deduped in first-seen order.
 * Document order is preserved per part; a tag that appears in the header
 * and the document keeps the position of its first appearance.
 */
export function scanDocxSlots(docxPath: string): string[] {
  const content = readFileSync(docxPath);
  const doc = new Docxtemplater(new PizZip(content)) as Docxtemplater<PizZip> & {
    getTags(): ScannedDocTags;
  };
  const tags = doc.getTags();
  const seen = new Set<string>();
  const slots: string[] = [];
  const parts: Record<string, unknown>[] = [
    tags.document.tags,
    ...tags.headers.map((header) => header.tags),
    ...tags.footers.map((footer) => footer.tags),
  ];
  for (const part of parts) {
    for (const slot of Object.keys(part)) {
      if (seen.has(slot)) continue;
      seen.add(slot);
      slots.push(slot);
    }
  }
  return slots;
}

export function makeTemplatesService(repo: SqliteRepoShape): TemplatesServiceShape {
  return {
    list: () => repo.listTemplates(),
    get: (id) => repo.getTemplate(id),
    create: (draft) =>
      Effect.gen(function* () {
        const error = validateTemplate(draft.name, draft.slots, draft.outputPattern);
        if (error !== null) return yield* Effect.fail(new InvalidTemplate({ message: error }));
        return yield* repo.insertTemplate({
          name: draft.name.trim(),
          filePath: draft.filePath,
          type: draft.type,
          slots: normalizeSlots(draft.slots),
          outputPattern: draft.outputPattern.trim(),
        });
      }),
    update: (id, patch) =>
      Effect.gen(function* () {
        const error = validateTemplate(patch.name, patch.slots, patch.outputPattern);
        if (error !== null) return yield* Effect.fail(new InvalidTemplate({ message: error }));
        const updated = yield* repo.updateTemplate(id, {
          name: patch.name.trim(),
          slots: normalizeSlots(patch.slots),
          outputPattern: patch.outputPattern.trim(),
        });
        if (Option.isNone(updated)) return yield* Effect.fail(new TemplateUpdateNotFound());
        return updated.value;
      }),
    delete: (id) => repo.deleteTemplate(id),
    scanSlots: (docxPath) =>
      Effect.gen(function* () {
        if (!docxPath.toLowerCase().endsWith(".docx")) {
          return yield* Effect.fail(
            new UnreadableDocx({ message: "Slot scanning works on .docx files only." }),
          );
        }
        try {
          return scanDocxSlots(docxPath);
        } catch (error) {
          // The parse errors of PizZip/docxtemplater carry no file name, so
          // prefix the path to make the failure actionable for the user.
          return yield* Effect.fail(
            new UnreadableDocx({
              message: `Could not read "${docxPath}": ${error instanceof Error ? error.message : String(error)}`,
            }),
          );
        }
      }),
  };
}

/**
 * The templates domain service. Constructing this layer provides
 * SqliteRepo alongside, so a program can depend on either.
 */
export class TemplatesService extends Context.Service<TemplatesService, TemplatesServiceShape>()(
  "TemplatesService",
) {
  static readonly Live = (db: Database.Database): Layer.Layer<TemplatesService | SqliteRepo> =>
    Layer.provideMerge(
      Layer.effect(
        TemplatesService,
        Effect.gen(function* () {
          const repo = yield* SqliteRepo;
          return makeTemplatesService(repo);
        }),
      ),
      SqliteRepo.Live(db),
    );
}

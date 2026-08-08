import { Context, Data, Effect, Layer } from "effect";
import { readFile } from "fs/promises";
import Database from "better-sqlite3";
import * as XLSX from "@e965/xlsx";
import type {
  ColumnMapping,
  ColumnRole,
  ExcelRow,
  ImportCommitResponse,
  ImportPreview,
  ImportRecipient,
} from "../../shared/ipc";
import { m } from "@paraglide/messages";
import { SqliteRepo, type SqliteRepoShape } from "../db/repository";

/**
 * The import pipeline (ticket 10): parses a spreadsheet, auto-suggests the
 * column mapping, applies it, dedupes by lowercased email, and reports
 * skipped rows and warnings. `read` does all of that and hands the result
 * to the renderer as a preview; `commit` re-applies the user's final
 * mapping to the parsed rows, dedupes against existing recipients, and
 * persists everything as one import batch.
 */

/** A spreadsheet that could not be read (missing file, not an Excel file, corrupt). */
export class UnreadableExcel extends Data.TaggedError("UnreadableExcel")<{
  readonly message: string;
}> {}

export interface ImportServiceShape {
  /** Parses the file and returns the preview: rows, suggestion, recipients, report. */
  readonly read: (excelPath: string) => Effect.Effect<ImportPreview, UnreadableExcel>;
  /** Applies the final mapping, dedupes, and persists the batch. */
  readonly commit: (
    rows: readonly ExcelRow[],
    columnMapping: ColumnMapping,
  ) => Effect.Effect<ImportCommitResponse>;
}

/** Exact header synonyms for each role, matched case-insensitively. */
const ROLE_SYNONYMS: Record<"name" | "email" | "phone", readonly string[]> = {
  name: [
    "name",
    "nama",
    "full name",
    "full_name",
    "recipient",
    "recipient name",
    "recipient_name",
    "nama lengkap",
    "participant",
    "participant name",
    "peserta",
  ],
  email: ["email", "e-mail", "e mail", "email address", "email_address", "alamat email"],
  phone: [
    "phone",
    "phone number",
    "phone_number",
    "no hp",
    "no_hp",
    "nomor hp",
    "nomor_hp",
    "handphone",
    "whatsapp",
    "wa",
    "telephone",
    "telp",
  ],
};

/** Distinctive substrings for each role, used only when no exact synonym matched. */
const ROLE_SUBSTRINGS: Record<"name" | "email" | "phone", readonly string[]> = {
  name: ["name", "nama"],
  email: ["email"],
  phone: ["phone", "hp", "telp", "whatsapp"],
};

/**
 * Auto-suggests the column mapping: exact synonym matches first, substring
 * matches as a fallback, at most one column per role (first in sheet order);
 * every other column is metadata. Never suggests "skip" - that is always a
 * user decision.
 */
export function suggestMapping(columns: readonly string[]): ColumnMapping {
  const mapping: Record<string, ColumnRole> = Object.fromEntries(
    columns.map((column) => [column, "metadata"]),
  );
  const claimed = new Set<string>();

  for (const role of ["name", "email", "phone"] as const) {
    const exact: string[] = [];
    const substring: string[] = [];
    for (const column of columns) {
      const normalized = column.trim().toLowerCase();
      if (ROLE_SYNONYMS[role].includes(normalized)) exact.push(column);
      else if (ROLE_SUBSTRINGS[role].some((s) => normalized.includes(s))) substring.push(column);
    }
    const pick = [...exact, ...substring].find((column) => !claimed.has(column));
    if (pick !== undefined) {
      mapping[pick] = role;
      claimed.add(pick);
    }
  }
  return mapping;
}

/**
 * Applies the mapping to one parsed row. The first column mapped to each
 * role (in mapping insertion order, which is sheet order) wins; rows
 * without a name are dropped. Columns mapped to "skip" are ignored;
 * "metadata" columns land in the bag with their column name as the key.
 */
export function applyMapping(row: ExcelRow, mapping: ColumnMapping): ImportRecipient | null {
  const columnFor = (role: ColumnRole): string | undefined =>
    Object.entries(mapping).find(([, mapped]) => mapped === role)?.[0];

  const nameColumn = columnFor("name");
  const name = (nameColumn === undefined ? "" : (row[nameColumn] ?? "")).trim();
  if (name === "") return null;

  const emailColumn = columnFor("email");
  const phoneColumn = columnFor("phone");
  const email = emailColumn === undefined ? null : (row[emailColumn] ?? "").trim() || null;
  const phone = phoneColumn === undefined ? null : (row[phoneColumn] ?? "").trim() || null;

  const metadata: Record<string, string> = {};
  for (const [column, role] of Object.entries(mapping)) {
    if (role !== "metadata") continue;
    const value = (row[column] ?? "").trim();
    if (value !== "") metadata[column] = value;
  }
  return { name, email, phone, metadata };
}

/**
 * Dedupes by lowercased email, keeping the first occurrence. Rows without
 * an email are never duplicate candidates. `seed` pre-seeds the seen set -
 * empty at parse time, the existing recipients table at commit time.
 */
function dedupeRecipients(
  recipients: readonly ImportRecipient[],
  seed: ReadonlySet<string> = new Set(),
): { readonly deduped: ImportRecipient[]; readonly skipped: number } {
  const seen = new Set(seed);
  const deduped: ImportRecipient[] = [];
  let skipped = 0;
  for (const recipient of recipients) {
    if (recipient.email !== null) {
      const key = recipient.email.toLowerCase();
      if (seen.has(key)) {
        skipped++;
        continue;
      }
      seen.add(key);
    }
    deduped.push(recipient);
  }
  return { deduped, skipped };
}

interface ParsedSheet {
  readonly columns: string[];
  readonly rows: ExcelRow[];
  /** Headers that collapse onto an earlier one after trimming (e.g. "Nama" and "Nama "). */
  readonly droppedHeaders: string[];
}

/**
 * Reads the first sheet into a header row plus string cells.
 * The grid is parsed as array-of-arrays (not keyed objects) so the header
 * row is seen cell by cell: sheet_to_json keyed mode silently collapses
 * headers that differ only by whitespace, keeping the last column's data.
 * Here the first occurrence wins and the collision is reported so no data
 * vanishes silently.
 */
function parseWorkbook(buffer: Uint8Array): ParsedSheet {
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  if (sheetName === undefined) return { columns: [], rows: [], droppedHeaders: [] };

  const grid = XLSX.utils.sheet_to_json<unknown[]>(workbook.Sheets[sheetName], {
    header: 1,
    defval: "",
    raw: false,
  });

  // Surviving columns keep their original cell index, so dropping a
  // colliding header never shifts another column's data.
  const columns: string[] = [];
  const columnIndexes: number[] = [];
  const droppedHeaders: string[] = [];
  for (const [index, cell] of (grid[0] ?? []).entries()) {
    const header = String(cell ?? "").trim();
    if (header === "") continue;
    if (columns.includes(header)) droppedHeaders.push(header);
    else {
      columns.push(header);
      columnIndexes.push(index);
    }
  }

  const rows: ExcelRow[] = grid.slice(1).map((cells) => {
    const row: Record<string, string> = {};
    for (let i = 0; i < columns.length; i++) {
      const value = cells[columnIndexes[i]];
      row[columns[i]] = value === null || value === undefined ? "" : String(value);
    }
    return row;
  });
  return { columns, rows, droppedHeaders };
}

/** The parse-time half of `read`: suggest, map, dedupe, and report. */
function buildPreview(buffer: Uint8Array): ImportPreview {
  const { columns, rows, droppedHeaders } = parseWorkbook(buffer);
  const mapping = suggestMapping(columns);
  const mapped = rows.flatMap((row) => {
    const recipient = applyMapping(row, mapping);
    return recipient === null ? [] : [recipient];
  });
  const { deduped, skipped } = dedupeRecipients(mapped);

  const warnings: string[] = [];
  if (droppedHeaders.length > 0) {
    warnings.push(
      m["importService.duplicateHeaders"]({ headers: [...new Set(droppedHeaders)].map((h) => `"${h}"`).join(", ") }),
    );
  }
  const roles = new Set(Object.values(mapping));
  if (!roles.has("name")) {
    warnings.push(m["importService.noNameColumn"]());
  }
  if (!roles.has("email")) {
    warnings.push(m["importService.noEmailColumn"]());
  }
  if (rows.length !== mapped.length) {
    warnings.push(m["importService.rowsSkippedEmptyName"]({ count: rows.length - mapped.length }));
  }
  return {
    columns,
    rows,
    recipients: deduped,
    suggestedMapping: mapping,
    skippedDuplicates: skipped,
    warnings,
  };
}

export function makeImportService(repo: SqliteRepoShape): ImportServiceShape {
  return {
    read: (excelPath) =>
      Effect.gen(function* () {
        if (!/\.(xlsx|xls)$/i.test(excelPath)) {
          return yield* Effect.fail(
            new UnreadableExcel({ message: m["importService.notExcel"]() }),
          );
        }
        // The file read is async so a large sheet never blocks the event
        // loop; the parse itself is synchronous SheetJS work.
        const buffer = yield* Effect.tryPromise({
          try: () => readFile(excelPath),
          catch: (error) =>
            new UnreadableExcel({
              message: error instanceof Error ? error.message : String(error),
            }),
        });
        return buildPreview(buffer);
      }),
    commit: (rows, columnMapping) =>
      Effect.gen(function* () {
        const mapped = rows.flatMap((row) => {
          const recipient = applyMapping(row, columnMapping);
          return recipient === null ? [] : [recipient];
        });
        const existing = yield* repo.listRecipientEmails();
        const { deduped, skipped } = dedupeRecipients(mapped, existing);
        const batchId = crypto.randomUUID();
        yield* repo.insertRecipients(
          deduped.map((recipient) => ({ ...recipient, importBatch: batchId })),
        );
        return {
          imported: deduped.length,
          duplicatesSkipped: skipped,
          rowsSkippedNoName: rows.length - mapped.length,
          batchId,
        };
      }),
  };
}

/**
 * The import domain service. Constructing this layer provides SqliteRepo
 * alongside, so a program can depend on either.
 */
export class ImportService extends Context.Service<ImportService, ImportServiceShape>()(
  "ImportService",
) {
  static readonly Live = (db: Database.Database): Layer.Layer<ImportService | SqliteRepo> =>
    Layer.provideMerge(
      Layer.effect(
        ImportService,
        Effect.gen(function* () {
          const repo = yield* SqliteRepo;
          return makeImportService(repo);
        }),
      ),
      SqliteRepo.Live(db),
    );
}

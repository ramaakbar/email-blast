import { Schema } from "effect";
import { API_VERSION, IPC } from "./ipc-channels";

export { API_VERSION, IPC };

/**
 * The IPC contract between the renderer and the main process.
 *
 * This module is the single source of truth for the contract:
 * - `API_VERSION` guards against stale builds (dev-asserted between preload and main)
 * - `IPC` holds every channel name; the renderer never sees these strings,
 *   the preload maps them to the typed `window.api` object
 * - Effect `Schema`s define every payload; types are derived, never hand-written
 *
 * Versioning is additive-only: channels and fields are added, never removed
 * or renamed; fields demote to `optional` rather than delete.
 */

/**
 * `system.ping` response - proves the bridge works and reports the
 * main process's API_VERSION to the renderer.
 */
export const PingResponse = Schema.Struct({
  pong: Schema.Literal(true),
  apiVersion: Schema.Number,
});
export type PingResponse = Schema.Schema.Type<typeof PingResponse>;

/**
 * `system.getAppInfo` response - the static identity of the app,
 * shown in the Settings About section.
 */
export const GetAppInfoResponse = Schema.Struct({
  name: Schema.String,
  version: Schema.String,
});
export type GetAppInfoResponse = Schema.Schema.Type<typeof GetAppInfoResponse>;

/**
 * Renderer-to-main payloads, decoded at the main boundary (malformed calls
 * become typed ParseErrors). Single-argument calls carry the bare value;
 * multi-argument calls carry a tuple, mirroring `ipcRenderer.invoke(...args)`.
 */
export const SettingsGetPayload = Schema.String;
export const SettingsSetPayload = Schema.Tuple([Schema.String, Schema.String]);
export type SettingsSetPayload = Schema.Schema.Type<typeof SettingsSetPayload>;

// ---- Import domain (ticket 10) ----

/**
 * The role a parsed Excel column plays for the imported recipient:
 * the address fields, a pass-through metadata bag entry, or ignored.
 */
export const ColumnRole = Schema.Literals(["name", "email", "phone", "metadata", "skip"]);
export type ColumnRole = Schema.Schema.Type<typeof ColumnRole>;

/** One parsed Excel row: column header -> cell value, every value a string. */
export const ExcelRow = Schema.Record(Schema.String, Schema.String);
export type ExcelRow = Schema.Schema.Type<typeof ExcelRow>;

/** Excel column header -> role. The user's mapping overrides the suggestion. */
export const ColumnMapping = Schema.Record(Schema.String, ColumnRole);
export type ColumnMapping = Schema.Schema.Type<typeof ColumnMapping>;

/**
 * A recipient as produced by the import pipeline. No id yet - ids and the
 * import batch are assigned at commit, not at parse time.
 */
export const ImportRecipient = Schema.Struct({
  name: Schema.String,
  email: Schema.Union([Schema.Null, Schema.String]),
  phone: Schema.Union([Schema.Null, Schema.String]),
  metadata: Schema.Record(Schema.String, Schema.String),
});
export type ImportRecipient = Schema.Schema.Type<typeof ImportRecipient>;

/**
 * `import.read` response: the parsed sheet (headers + every row), the
 * recipients the auto-suggestion maps, the suggestion itself (the UI shows
 * it pre-selected and lets the user override), and the parse report.
 */
export const ImportPreview = Schema.Struct({
  columns: Schema.Array(Schema.String),
  rows: Schema.Array(ExcelRow),
  recipients: Schema.Array(ImportRecipient),
  suggestedMapping: ColumnMapping,
  skippedDuplicates: Schema.Number,
  warnings: Schema.Array(Schema.String),
});
export type ImportPreview = Schema.Schema.Type<typeof ImportPreview>;

/** `import.read` payload: the absolute path of the `.xlsx`/`.xls` file. */
export const ImportReadPayload = Schema.String;

/**
 * `import.commit` payload: the parsed rows from the preview plus the final
 * column mapping. The main process re-applies the mapping, dedupes against
 * existing recipients, and persists - the renderer never constructs
 * recipients itself.
 */
export const ImportCommitPayload = Schema.Struct({
  rows: Schema.Array(ExcelRow),
  columnMapping: ColumnMapping,
});
export type ImportCommitPayload = Schema.Schema.Type<typeof ImportCommitPayload>;

/** `import.commit` response: what actually landed, what was skipped, and the batch id. */
export const ImportCommitResponse = Schema.Struct({
  imported: Schema.Number,
  duplicatesSkipped: Schema.Number,
  /** Rows dropped because their name was empty under the final mapping. */
  rowsSkippedNoName: Schema.Number,
  batchId: Schema.String,
});
export type ImportCommitResponse = Schema.Schema.Type<typeof ImportCommitResponse>;

// ---- Recipients domain (ticket 11) ----

/**
 * A recipient as stored: the address fields, the metadata bag, and the
 * import batch it arrived in. `createdAt` is the SQLite `YYYY-MM-DD HH:MM:SS`
 * UTC stamp, formatted for display by the renderer.
 */
export const Recipient = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  email: Schema.Union([Schema.Null, Schema.String]),
  phone: Schema.Union([Schema.Null, Schema.String]),
  metadata: Schema.Record(Schema.String, Schema.String),
  importBatch: Schema.String,
  createdAt: Schema.String,
});
export type Recipient = Schema.Schema.Type<typeof Recipient>;

/**
 * `recipients.list` payload: optional search text (matched across name,
 * email, phone, and metadata values) and optional import-batch filter
 * (null = all batches), plus the 1-based page and its size.
 */
export const RecipientListPayload = Schema.Struct({
  search: Schema.Union([Schema.Null, Schema.String]),
  importBatch: Schema.Union([Schema.Null, Schema.String]),
  page: Schema.Number,
  pageSize: Schema.Number,
});
export type RecipientListPayload = Schema.Schema.Type<typeof RecipientListPayload>;

/** `recipients.list` response: one page of recipients plus the total that matched. */
export const PaginatedRecipients = Schema.Struct({
  items: Schema.Array(Recipient),
  total: Schema.Number,
  page: Schema.Number,
  pageSize: Schema.Number,
});
export type PaginatedRecipients = Schema.Schema.Type<typeof PaginatedRecipients>;

/**
 * `recipients.listBatches` response: one entry per distinct import batch,
 * labeled by its earliest import stamp and carrying its size.
 */
export const ImportBatch = Schema.Struct({
  id: Schema.String,
  createdAt: Schema.String,
  count: Schema.Number,
});
export type ImportBatch = Schema.Schema.Type<typeof ImportBatch>;

/** `recipients.delete` payload: the ids to delete. */
export const RecipientDeletePayload = Schema.Array(Schema.String);
export type RecipientDeletePayload = Schema.Schema.Type<typeof RecipientDeletePayload>;

/** `recipients.delete` response: how many rows were actually deleted. */
export const RecipientDeleteResponse = Schema.Struct({
  deleted: Schema.Number,
});
export type RecipientDeleteResponse = Schema.Schema.Type<typeof RecipientDeleteResponse>;

// ---- Templates domain (ticket 12) ----

/**
 * What a template renders into: a DOCX letter filled via docxtemplater,
 * or an image certificate stamped with text at the user-entered
 * coordinates (ticket 14 renders the images).
 */
export const TemplateType = Schema.Literals(["docx", "image"]);
export type TemplateType = Schema.Schema.Type<typeof TemplateType>;

/**
 * A registered template as stored: the file path (immutable after
 * creation), the user-declared slots, and the output pattern the
 * generated files are named after. `createdAt` is the SQLite UTC stamp.
 */
export const Template = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  filePath: Schema.String,
  type: TemplateType,
  slots: Schema.Array(Schema.String),
  outputPattern: Schema.String,
  createdAt: Schema.String,
});
export type Template = Schema.Schema.Type<typeof Template>;

/**
 * `templates.create` payload. `slots` are normalized by the main process
 * (trimmed, deduped); the pattern must reference at least one declared
 * slot and nothing else - otherwise the create fails before persisting.
 */
export const TemplateCreatePayload = Schema.Struct({
  name: Schema.String,
  filePath: Schema.String,
  type: TemplateType,
  slots: Schema.Array(Schema.String),
  outputPattern: Schema.String,
});
export type TemplateCreatePayload = Schema.Schema.Type<typeof TemplateCreatePayload>;

/**
 * `templates.update` payload: the mutable fields only - the file path and
 * type are set once at creation and cannot change. Fails with
 * TemplateNotFound when no such id exists.
 */
export const TemplateUpdatePayload = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  slots: Schema.Array(Schema.String),
  outputPattern: Schema.String,
});
export type TemplateUpdatePayload = Schema.Schema.Type<typeof TemplateUpdatePayload>;

/** `templates.delete` response: how many rows were actually deleted. */
export const TemplateDeleteResponse = Schema.Struct({
  deleted: Schema.Number,
});
export type TemplateDeleteResponse = Schema.Schema.Type<typeof TemplateDeleteResponse>;

/** `templates.scanSlots` response: the declared slots in document order. */
export const ScanSlotsResponse = Schema.Struct({
  slots: Schema.Array(Schema.String),
});
export type ScanSlotsResponse = Schema.Schema.Type<typeof ScanSlotsResponse>;

/**
 * The contextBridge-exposed API (`window.api`). Domains and methods are
 * added additively as later tickets land.
 */
export interface Api {
  system: {
    ping(): Promise<PingResponse>;
    /** Path of a usable `soffice` binary, or null when LibreOffice is missing. */
    checkLibreOffice(): Promise<string | null>;
    /** Opens a native folder picker; the chosen path, or null when cancelled. */
    pickFolder(): Promise<string | null>;
    /** Opens a native `.xlsx`/`.xls` picker; the chosen path, or null when cancelled. */
    pickExcelFile(): Promise<string | null>;
    /**
     * Opens a native template picker (`.docx`, `.png`, `.jpg`, `.jpeg`);
     * the chosen path, or null when cancelled.
     */
    pickTemplateFile(): Promise<string | null>;
    /** The absolute path of a dropped File (the deprecated `File.path` is not available with the sandbox on). */
    getPathForFile(file: File): string;
    getAppInfo(): Promise<GetAppInfoResponse>;
  };
  settings: {
    /** Raw setting value by key (persisted in SQLite), or null when unset. */
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
  };
  import: {
    /** Parses an Excel file and returns the import preview (rows, mapping suggestion, report). */
    read(excelPath: string): Promise<ImportPreview>;
    /** Applies the column mapping, dedupes against existing recipients, and persists the batch. */
    commit(payload: ImportCommitPayload): Promise<ImportCommitResponse>;
  };
  recipients: {
    /** One page of recipients matching the search text and import-batch filter. */
    list(payload: RecipientListPayload): Promise<PaginatedRecipients>;
    /** A single recipient by id, or null when no such id exists. */
    get(id: string): Promise<Recipient | null>;
    /** Deletes the given recipients and returns how many rows were removed. */
    delete(ids: string[]): Promise<RecipientDeleteResponse>;
    /** Every distinct import batch, newest first, with its size and stamp. */
    listBatches(): Promise<ImportBatch[]>;
  };
  templates: {
    /** Every registered template, newest first. */
    list(): Promise<Template[]>;
    /** A single template by id, or null when no such id exists. */
    get(id: string): Promise<Template | null>;
    /** Registers a new template; validates slots and the output pattern. */
    create(payload: TemplateCreatePayload): Promise<Template>;
    /** Edits the name, slots, and output pattern of a template. */
    update(payload: TemplateUpdatePayload): Promise<Template>;
    /** Deletes a template; returns how many rows were removed. */
    delete(id: string): Promise<TemplateDeleteResponse>;
    /**
     * Reads the `{placeholder}` slots out of a DOCX file (document,
     * headers, and footers), in document order. Fails for non-DOCX files.
     */
    scanSlots(docxPath: string): Promise<ScanSlotsResponse>;
  };
}

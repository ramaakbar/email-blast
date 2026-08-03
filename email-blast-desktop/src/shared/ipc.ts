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

// ---- Generate domain (ticket 13) ----

/** The lifecycle of a generate job (mirrors the generate_jobs table CHECK). */
export const GenerateJobStatus = Schema.Literals([
  "pending",
  "generating",
  "generated",
  "cancelled",
]);
export type GenerateJobStatus = Schema.Schema.Type<typeof GenerateJobStatus>;

/** The per-recipient outcome of a generate job (mirrors the join table CHECK). */
export const GenerateRecipientStatus = Schema.Literals(["pending", "generated", "failed"]);
export type GenerateRecipientStatus = Schema.Schema.Type<typeof GenerateRecipientStatus>;

/**
 * One recipient's outcome inside a generate job, joined with the name the
 * job started with (so a recipient deleted later still shows who the row
 * belonged to).
 */
export const GenerateJobRecipient = Schema.Struct({
  recipientId: Schema.String,
  recipientName: Schema.String,
  status: GenerateRecipientStatus,
  outputPath: Schema.Union([Schema.Null, Schema.String]),
  errorMessage: Schema.Union([Schema.Null, Schema.String]),
});
export type GenerateJobRecipient = Schema.Schema.Type<typeof GenerateJobRecipient>;

/**
 * A generate job as returned to the renderer: the job row plus every
 * per-recipient outcome, so one snapshot renders the whole status screen.
 */
export const GenerateJob = Schema.Struct({
  id: Schema.String,
  templateId: Schema.String,
  templateName: Schema.String,
  status: GenerateJobStatus,
  total: Schema.Number,
  createdAt: Schema.String,
  completedAt: Schema.Union([Schema.Null, Schema.String]),
  recipients: Schema.Array(GenerateJobRecipient),
});
export type GenerateJob = Schema.Schema.Type<typeof GenerateJob>;

/** `generate.start` payload: the template plus the recipient ids, in job order. */
export const GenerateStartPayload = Schema.Struct({
  templateId: Schema.String,
  recipientIds: Schema.Array(Schema.String),
});
export type GenerateStartPayload = Schema.Schema.Type<typeof GenerateStartPayload>;

/**
 * `generate-progress` event: one per recipient outcome, a delta the
 * renderer applies to its running state (SQLite stays the source of truth).
 * `kind` discriminates the hub event union the main process forwards.
 */
export const GenerateProgressEvent = Schema.Struct({
  kind: Schema.Literal("generate-progress"),
  jobId: Schema.String,
  current: Schema.Number,
  total: Schema.Number,
  status: Schema.Literals(["generated", "failed"]),
  recipientId: Schema.String,
  error: Schema.Union([Schema.Null, Schema.String]),
});
export type GenerateProgressEvent = Schema.Schema.Type<typeof GenerateProgressEvent>;

/** `generate.getRecipientPdf` payload: which job, which recipient. */
export const GeneratePdfPayload = Schema.Struct({
  jobId: Schema.String,
  recipientId: Schema.String,
});
export type GeneratePdfPayload = Schema.Schema.Type<typeof GeneratePdfPayload>;

/** `generate.getRecipientPdf` response: the PDF bytes for the spot-check preview. */
export const GeneratePdfResponse = Schema.Struct({
  fileName: Schema.String,
  dataBase64: Schema.String,
});
export type GeneratePdfResponse = Schema.Schema.Type<typeof GeneratePdfResponse>;

// ---- SMTP domain (ticket 14) ----

/**
 * A saved SMTP profile as returned to the renderer. The password never
 * crosses the bridge - `hasPassword` tells the UI to show a mask, and the
 * main process resolves the stored credential for `testProfile` and for
 * the send pipeline (future ticket) on its own side.
 */
export const SmtpProfile = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  host: Schema.String,
  port: Schema.Number,
  username: Schema.String,
  hasPassword: Schema.Boolean,
  createdAt: Schema.String,
});
export type SmtpProfile = Schema.Schema.Type<typeof SmtpProfile>;

/** `smtp.create` payload: every field is required, validated in the main process. */
export const SmtpProfileCreatePayload = Schema.Struct({
  name: Schema.String,
  host: Schema.String,
  port: Schema.Number,
  username: Schema.String,
  password: Schema.String,
});
export type SmtpProfileCreatePayload = Schema.Schema.Type<typeof SmtpProfileCreatePayload>;

/**
 * `smtp.update` payload. `password` null keeps the stored password - the
 * edit dialog never sees the stored value, so "leave blank to keep" is the
 * only safe way to change one field without re-entering the credential.
 */
export const SmtpProfileUpdatePayload = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  host: Schema.String,
  port: Schema.Number,
  username: Schema.String,
  password: Schema.Union([Schema.Null, Schema.String]),
});
export type SmtpProfileUpdatePayload = Schema.Schema.Type<typeof SmtpProfileUpdatePayload>;

/** `smtp.delete` response: how many rows were actually deleted. */
export const SmtpDeleteResponse = Schema.Struct({
  deleted: Schema.Number,
});
export type SmtpDeleteResponse = Schema.Schema.Type<typeof SmtpDeleteResponse>;

/**
 * `smtp.test` payload: the credentials of an inline profile (the compose
 * wizard's SMTP step tests before saving). For a saved profile the renderer
 * calls `testProfile(id)` instead - it does not hold the password.
 */
export const SmtpTestPayload = Schema.Struct({
  host: Schema.String,
  port: Schema.Number,
  username: Schema.String,
  password: Schema.String,
});
export type SmtpTestPayload = Schema.Schema.Type<typeof SmtpTestPayload>;

/** `recipients.listAll` payload: the same filters as `list`, without pagination. */
export const RecipientListAllPayload = Schema.Struct({
  search: Schema.Union([Schema.Null, Schema.String]),
  importBatch: Schema.Union([Schema.Null, Schema.String]),
});
export type RecipientListAllPayload = Schema.Schema.Type<typeof RecipientListAllPayload>;

// ---- Send domain (ticket 15) ----

/** The lifecycle of a send job (mirrors the send_jobs table CHECK). */
export const SendJobStatus = Schema.Literals([
  "pending",
  "sending",
  "paused",
  "completed",
  "cancelled",
]);
export type SendJobStatus = Schema.Schema.Type<typeof SendJobStatus>;

/** The per-recipient outcome of a send job (mirrors the join table CHECK). */
export const SendRecipientStatus = Schema.Literals(["pending", "sent", "failed", "skipped"]);
export type SendRecipientStatus = Schema.Schema.Type<typeof SendRecipientStatus>;

/**
 * `send.start` payload: the generate job whose confirmed attachments this
 * send delivers, the recipients (the generated-only handoff from step 5),
 * the SMTP identity (a saved profile id OR an inline override, never
 * both), the message, and the per-job rate limit - the value the
 * wizard's slider set, recorded on the job for history (the gate itself
 * reads the live setting every iteration, so a later change applies to
 * a running job without restart). The inline password crosses the
 * bridge exactly once, at start - afterwards it lives only in the
 * send_jobs row (plaintext at rest, the ticket-14 posture) and never
 * in any response.
 */
export const SendStartPayload = Schema.Struct({
  generateJobId: Schema.String,
  recipientIds: Schema.Array(Schema.String),
  smtpProfileId: Schema.Union([Schema.Null, Schema.String]),
  smtpOverride: Schema.Union([
    Schema.Null,
    Schema.Struct({
      host: Schema.String,
      port: Schema.Number,
      username: Schema.String,
      password: Schema.String,
    }),
  ]),
  subject: Schema.String,
  bodyHtml: Schema.String,
  senderName: Schema.String,
  senderAddress: Schema.String,
  delayMs: Schema.Number,
});
export type SendStartPayload = Schema.Schema.Type<typeof SendStartPayload>;

/**
 * The inline SMTP identity as the renderer may ever see it again - the
 * password stays in the main process, so `send.get-status` never echoes
 * a credential back over the bridge.
 */
export const SendSmtpOverrideInfo = Schema.Struct({
  host: Schema.String,
  port: Schema.Number,
  username: Schema.String,
});
export type SendSmtpOverrideInfo = Schema.Schema.Type<typeof SendSmtpOverrideInfo>;

/**
 * One recipient's outcome inside a send job, joined with the name the job
 * started with. `sent` carries the server message id, `failed` the error.
 */
export const SendJobRecipient = Schema.Struct({
  recipientId: Schema.String,
  recipientName: Schema.String,
  status: SendRecipientStatus,
  messageId: Schema.Union([Schema.Null, Schema.String]),
  errorMessage: Schema.Union([Schema.Null, Schema.String]),
  sentAt: Schema.Union([Schema.Null, Schema.String]),
});
export type SendJobRecipient = Schema.Schema.Type<typeof SendJobRecipient>;

/**
 * A send job as returned to the renderer: the job row (SMTP identity
 * without any credential, cursor, counts) plus every per-recipient
 * outcome, so one snapshot renders the whole send screen.
 */
export const SendJob = Schema.Struct({
  id: Schema.String,
  generateJobId: Schema.String,
  status: SendJobStatus,
  smtpProfileId: Schema.Union([Schema.Null, Schema.String]),
  /** The profile name at send time; "(deleted profile)" when it was removed. */
  smtpProfileName: Schema.Union([Schema.Null, Schema.String]),
  smtpOverride: Schema.Union([Schema.Null, SendSmtpOverrideInfo]),
  subject: Schema.String,
  bodyHtml: Schema.String,
  senderName: Schema.String,
  senderAddress: Schema.String,
  /** The pacing delay in ms; the gate itself reads the live setting. */
  delayMs: Schema.Number,
  /** The index of the next recipient the loop will process. */
  cursorIndex: Schema.Number,
  total: Schema.Number,
  createdAt: Schema.String,
  completedAt: Schema.Union([Schema.Null, Schema.String]),
  recipients: Schema.Array(SendJobRecipient),
});
export type SendJob = Schema.Schema.Type<typeof SendJob>;

/**
 * `send-progress` event: one per recipient outcome, a delta the renderer
 * applies to its running state (SQLite stays the source of truth).
 */
export const SendProgressEvent = Schema.Struct({
  kind: Schema.Literal("send-progress"),
  jobId: Schema.String,
  current: Schema.Number,
  total: Schema.Number,
  status: Schema.Literals(["sent", "failed"]),
  recipientId: Schema.String,
  messageId: Schema.Union([Schema.Null, Schema.String]),
  error: Schema.Union([Schema.Null, Schema.String]),
});
export type SendProgressEvent = Schema.Schema.Type<typeof SendProgressEvent>;

/**
 * `job-paused` event: the job stopped and is persisted as `paused` -
 * manually from the wizard, or automatically when a recipient exhausted
 * its retries. `lastIndex` is the cursor, i.e. how many recipients have a
 * persisted outcome.
 */
export const JobPausedEvent = Schema.Struct({
  kind: Schema.Literal("job-paused"),
  jobId: Schema.String,
  reason: Schema.Literals(["user", "retry-exhausted"]),
  lastIndex: Schema.Number,
});
export type JobPausedEvent = Schema.Schema.Type<typeof JobPausedEvent>;

/** Every job event the hub carries; `kind` discriminates the union. */
export const HubEvent = Schema.Union([GenerateProgressEvent, SendProgressEvent, JobPausedEvent]);
export type HubEvent = Schema.Schema.Type<typeof HubEvent>;

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
    /**
     * Every recipient matching the search text and import-batch filter,
     * unpaginated - the compose wizard's "select all matching" needs the
     * full list so generation holds every selected row's metadata.
     */
    listAll(filter: RecipientListAllPayload): Promise<Recipient[]>;
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
  generate: {
    /**
     * Creates a pending generate job for the template and recipient ids.
     * Nothing is produced yet - `runGenerate` does the work, so a job can
     * be created and inspected before any file is touched.
     */
    startGenerate(payload: GenerateStartPayload): Promise<GenerateJob>;
    /**
     * Runs the job: fills and converts one PDF per recipient with live
     * progress events. Resolves with the finished job; fails with a typed
     * GenerateError for job-level failures (template missing, LibreOffice
     * missing). Re-running a finished job is a no-op.
     */
    runGenerate(jobId: string): Promise<GenerateJob>;
    /** The full job snapshot: status plus every per-recipient outcome. */
    getGenerateStatus(jobId: string): Promise<GenerateJob | null>;
    /**
     * The generated PDF bytes of one recipient, for the spot-check
     * preview; null when the recipient has no generated output.
     */
    getRecipientPdf(payload: GeneratePdfPayload): Promise<GeneratePdfResponse | null>;
    /**
     * Subscribes to per-recipient generate progress. Returns an
     * unsubscribe function; events are deltas, the snapshot from
     * `getGenerateStatus` stays the source of truth.
     */
    onGenerateProgress(cb: (event: GenerateProgressEvent) => void): () => void;
  };
  smtp: {
    /** Every saved SMTP profile, newest first. Passwords never leave the main process. */
    list(): Promise<SmtpProfile[]>;
    /** A single profile by id, or null when no such id exists. */
    get(id: string): Promise<SmtpProfile | null>;
    /** Saves a new profile; validates the name, host, port, username, and password. */
    create(payload: SmtpProfileCreatePayload): Promise<SmtpProfile>;
    /** Edits a profile; a null password keeps the stored one. */
    update(payload: SmtpProfileUpdatePayload): Promise<SmtpProfile>;
    /** Deletes a profile; returns how many rows were removed. */
    delete(id: string): Promise<SmtpDeleteResponse>;
    /**
     * Connects and authenticates against the given SMTP server - the
     * inline test for unsaved credentials. Resolves when the server
     * accepts the credentials; rejects otherwise, with the rejection
     * message naming the failing phase (connect, auth, or SMTP error).
     */
    test(payload: SmtpTestPayload): Promise<void>;
    /**
     * Connects and authenticates using a saved profile's stored
     * credentials (the per-profile Test Connection in Settings).
     */
    testProfile(id: string): Promise<void>;
  };
  send: {
    /**
     * Creates a pending send job: the message, the SMTP identity (profile
     * or inline override), and the recipients to deliver to. Nothing is
     * sent yet - `runSend` does the work, so a job can be created and
     * inspected before any email leaves.
     */
    startSend(payload: SendStartPayload): Promise<SendJob>;
    /**
     * Runs the job: pre-flight (SMTP connect + auth, at least one
     * confirmed generated attachment) fails fast, then one email per
     * recipient at the live pacing rate with 3 retries (1s/2s/4s
     * backoff) per recipient. Resolves with the finished job; a
     * recipient that exhausts its retries pauses the job (persisted,
     * plus a `job-paused` event). Re-running a finished job is a no-op.
     */
    runSend(jobId: string): Promise<SendJob>;
    /** Pauses a sending job: persisted `paused`, the loop stops at the next checkpoint. */
    pauseSend(jobId: string): Promise<SendJob>;
    /** Marks a paused job `pending` so `runSend` can continue it from the cursor. */
    resumeSend(jobId: string): Promise<SendJob>;
    /**
     * Cancels a job (terminal): the remaining `pending` recipients become
     * `skipped` and the job `cancelled` in one transaction. The in-flight
     * recipient's send completes and its outcome persists.
     */
    cancelSend(jobId: string): Promise<SendJob>;
    /** The full job snapshot: status plus every per-recipient outcome. */
    getSendStatus(jobId: string): Promise<SendJob | null>;
    /**
     * Resets the `failed` recipients of a finished job to `pending` and
     * returns it to `pending`, so `runSend` retries exactly those - the
     * completion summary's Retry Failures action.
     */
    retryFailedSend(jobId: string): Promise<SendJob>;
    /**
     * Subscribes to per-recipient send progress. Returns an unsubscribe
     * function; events are deltas, the snapshot from `getSendStatus`
     * stays the source of truth.
     */
    onSendProgress(cb: (event: SendProgressEvent) => void): () => void;
    /**
     * Subscribes to job-paused events (manual pause or retry exhaustion).
     * Returns an unsubscribe function.
     */
    onJobPaused(cb: (event: JobPausedEvent) => void): () => void;
  };
}

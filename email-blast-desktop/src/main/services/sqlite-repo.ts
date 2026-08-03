import { Context, Effect, Layer, Option } from "effect";
import { DatabaseSync } from "node:sqlite";
import type {
  GenerateJobStatus,
  GenerateRecipientStatus,
  ImportBatch,
  Recipient,
  RecipientListPayload,
  SendJobStatus,
  SendRecipientStatus,
  Template,
} from "../../shared/ipc";

/**
 * The SQLite database of the app. Owns the schema (spec decision 7, verbatim)
 * and the raw settings key/value store. The full schema is created idempotently
 * on every open; settings rows are seeded once (INSERT OR IGNORE), so user
 * values survive every later launch.
 */
const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS recipients (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT,
    phone       TEXT,
    metadata    TEXT NOT NULL DEFAULT '{}',
    import_batch TEXT NOT NULL,
    created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_recipients_email ON recipients(email);
CREATE INDEX IF NOT EXISTS idx_recipients_import_batch ON recipients(import_batch);

CREATE TABLE IF NOT EXISTS templates (
    id              TEXT PRIMARY KEY,
    name            TEXT NOT NULL,
    file_path       TEXT NOT NULL,
    type            TEXT NOT NULL CHECK(type IN ('docx', 'image')),
    slots           TEXT NOT NULL DEFAULT '[]',
    output_pattern  TEXT NOT NULL,
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS generate_jobs (
    id              TEXT PRIMARY KEY,
    template_id     TEXT NOT NULL REFERENCES templates(id),
    status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK(status IN ('pending','generating','generated','cancelled')),
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    completed_at    TEXT
);

CREATE TABLE IF NOT EXISTS generate_job_recipients (
    job_id          TEXT NOT NULL REFERENCES generate_jobs(id),
    recipient_id    TEXT NOT NULL REFERENCES recipients(id),
    status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK(status IN ('pending','generated','failed')),
    output_path     TEXT,
    error_message   TEXT,
    PRIMARY KEY (job_id, recipient_id)
);

CREATE TABLE IF NOT EXISTS send_jobs (
    id              TEXT PRIMARY KEY,
    generate_job_id TEXT REFERENCES generate_jobs(id),
    channel         TEXT NOT NULL DEFAULT 'email'
                    CHECK(channel IN ('email', 'whatsapp')),
    status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK(status IN ('pending','sending','paused','completed','cancelled')),
    smtp_profile_id TEXT REFERENCES smtp_profiles(id),
    smtp_override   TEXT,
    subject         TEXT NOT NULL,
    body_html       TEXT NOT NULL,
    sender_name     TEXT NOT NULL,
    sender_address  TEXT NOT NULL,
    delay_ms        INTEGER NOT NULL DEFAULT 1000,
    cursor_index    INTEGER NOT NULL DEFAULT 0,
    total_count     INTEGER NOT NULL DEFAULT 0,
    created_at      TEXT NOT NULL DEFAULT (datetime('now')),
    completed_at    TEXT
);

CREATE TABLE IF NOT EXISTS send_job_recipients (
    job_id          TEXT NOT NULL REFERENCES send_jobs(id),
    recipient_id    TEXT NOT NULL REFERENCES recipients(id),
    status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK(status IN ('pending','sent','failed','skipped')),
    message_id      TEXT,
    error_message   TEXT,
    sent_at         TEXT,
    PRIMARY KEY (job_id, recipient_id)
);

CREATE TABLE IF NOT EXISTS smtp_profiles (
    id              TEXT PRIMARY KEY,
    name            TEXT NOT NULL,
    host            TEXT NOT NULL,
    port            INTEGER NOT NULL DEFAULT 587,
    username        TEXT NOT NULL,
    password        TEXT NOT NULL,
    created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS settings (
    key             TEXT PRIMARY KEY,
    value           TEXT NOT NULL
);
`;

/**
 * Opens (creating if absent) the database and applies the schema.
 * Idempotent - safe on every launch.
 *
 * Foreign keys are deliberately left unenforced: deleting a recipient or
 * template keeps historical job rows referencing it, so past job outcomes
 * survive (ticket 11 documented this against plain SQLite's default; the
 * `node:sqlite` driver enforces FKs by default, so it is turned off here
 * explicitly).
 */
export function openDatabase(dbPath: string): DatabaseSync {
  const db = new DatabaseSync(dbPath, { enableForeignKeyConstraints: false });
  db.exec(SCHEMA_SQL);
  return db;
}

/**
 * A recipient ready to be persisted: the fields from the import pipeline,
 * without the id (assigned here) or the row-level defaults.
 */
export interface RecipientDraft {
  readonly name: string;
  readonly email: string | null;
  readonly phone: string | null;
  readonly metadata: Record<string, string>;
  readonly importBatch: string;
}

export interface SqliteRepoShape {
  readonly getSetting: (key: string) => Effect.Effect<Option.Option<string>>;
  readonly setSetting: (key: string, value: string) => Effect.Effect<void>;
  /**
   * Every email currently in the recipients table, trimmed and lowercased -
   * the dedupe key the import commit checks against.
   */
  readonly listRecipientEmails: () => Effect.Effect<Set<string>>;
  /**
   * Inserts a whole import batch in one transaction. Ids are assigned here
   * and emails are normalized (trim + lowercase) so the dedupe key and the
   * stored value can never drift apart.
   */
  readonly insertRecipients: (recipients: RecipientDraft[]) => Effect.Effect<void>;
  /**
   * One page of recipients, newest first. `search` matches case-insensitively
   * across name, email, phone, and the serialized metadata bag (so custom
   * field values are searchable too); `importBatch` narrows to one batch.
   */
  readonly listRecipients: (
    filter: RecipientListPayload,
  ) => Effect.Effect<{ readonly items: Recipient[]; readonly total: number }>;
  /** A single recipient by id, or none when no such row exists. */
  readonly getRecipient: (id: string) => Effect.Effect<Option.Option<Recipient>>;
  /**
   * Deletes the given ids and returns how many rows were removed. Historical
   * job rows keep referencing the deleted ids (foreign keys are not
   * enforced by default in SQLite) so past job outcomes survive.
   */
  readonly deleteRecipients: (ids: readonly string[]) => Effect.Effect<number>;
  /** Every distinct import batch, newest first, with its stamp and size. */
  readonly listImportBatches: () => Effect.Effect<ImportBatch[]>;
  /**
   * Every recipient matching the search text and import-batch filter,
   * unpaginated - the compose wizard's select-all reads the full list so
   * generation holds every selected row's metadata.
   */
  readonly listAllRecipients: (filter: {
    readonly search: string | null;
    readonly importBatch: string | null;
  }) => Effect.Effect<Recipient[]>;
  /** Every registered template, newest first. Slots round-trip through JSON. */
  readonly listTemplates: () => Effect.Effect<Template[]>;
  /** A single template by id, or none when no such row exists. */
  readonly getTemplate: (id: string) => Effect.Effect<Option.Option<Template>>;
  /** Inserts a template; the id is assigned here. */
  readonly insertTemplate: (draft: TemplateDraft) => Effect.Effect<Template>;
  /**
   * Updates the mutable template fields (name, slots, output pattern).
   * Returns the updated template, or none when no such row exists.
   */
  readonly updateTemplate: (
    id: string,
    patch: TemplatePatch,
  ) => Effect.Effect<Option.Option<Template>>;
  /** Deletes a template and returns how many rows were removed. */
  readonly deleteTemplate: (id: string) => Effect.Effect<number>;
  /** Inserts a generate job row and returns its assigned id. */
  readonly insertGenerateJob: (templateId: string) => Effect.Effect<string>;
  /** Inserts one pending recipient row per id, in the given order. */
  readonly insertGenerateJobRecipients: (
    jobId: string,
    recipientIds: readonly string[],
  ) => Effect.Effect<void>;
  /**
   * Moves a generate job through its lifecycle. `completedAt` is written
   * when the job finishes; passing null clears it (e.g. back to pending
   * after a job-level failure).
   */
  readonly setGenerateJobStatus: (
    jobId: string,
    status: GenerateJobStatus,
    completedAt?: string | null,
  ) => Effect.Effect<void>;
  /**
   * The full generate job: the job row plus every recipient outcome joined
   * with the recipient's name (null after the recipient is deleted), in
   * job order. None when the job id does not exist.
   */
  readonly getGenerateJob: (
    jobId: string,
  ) => Effect.Effect<Option.Option<GenerateJobWithRecipients>>;
  /** Records one recipient's outcome inside a generate job. */
  readonly setGenerateRecipientResult: (
    jobId: string,
    recipientId: string,
    result: {
      status: Extract<GenerateRecipientStatus, "generated" | "failed">;
      outputPath: string | null;
      errorMessage: string | null;
    },
  ) => Effect.Effect<void>;
  /** The recipients with these ids, in the given order. */
  readonly getRecipientsByIds: (ids: readonly string[]) => Effect.Effect<Recipient[]>;
  /** One recipient row of a generate job, for the spot-check PDF read. */
  readonly getGenerateRecipient: (
    jobId: string,
    recipientId: string,
  ) => Effect.Effect<
    Option.Option<{ status: "pending" | "generated" | "failed"; outputPath: string | null }>
  >;
  /**
   * Every stored SMTP profile, newest first, with the password included -
   * the smtp service is the only consumer and strips it before anything
   * crosses the IPC bridge.
   */
  readonly listSmtpProfiles: () => Effect.Effect<SmtpStoredProfile[]>;
  /** A single stored profile by id, password included, or none. */
  readonly getSmtpProfile: (id: string) => Effect.Effect<Option.Option<SmtpStoredProfile>>;
  /** Inserts a profile; the id is assigned here. */
  readonly insertSmtpProfile: (draft: SmtpProfileDraft) => Effect.Effect<SmtpStoredProfile>;
  /**
   * Updates the mutable profile fields (name, host, port, username, and
   * password when given). Returns the updated row, or none when no such
   * id exists.
   */
  readonly updateSmtpProfile: (
    id: string,
    patch: SmtpProfilePatch,
  ) => Effect.Effect<Option.Option<SmtpStoredProfile>>;
  /** Deletes a profile and returns how many rows were removed. */
  readonly deleteSmtpProfile: (id: string) => Effect.Effect<number>;
  /** Inserts a send job row and returns its assigned id. */
  readonly insertSendJob: (draft: SendJobDraft) => Effect.Effect<string>;
  /** Inserts one pending recipient row per id, in the given order. */
  readonly insertSendJobRecipients: (
    jobId: string,
    recipientIds: readonly string[],
  ) => Effect.Effect<void>;
  /** Moves a send job through its lifecycle; null completedAt clears it. */
  readonly setSendJobStatus: (
    jobId: string,
    status: SendJobStatus,
    completedAt?: string | null,
  ) => Effect.Effect<void>;
  /**
   * The send pipeline's critical section: the per-recipient outcome and
   * the job cursor in ONE transaction, so a crash between them can never
   * leave a sent email un-advanced (double-send) or an advanced cursor
   * behind an un-sent recipient (skip).
   */
  readonly persistSendOutcome: (
    jobId: string,
    recipientId: string,
    result: {
      status: Extract<SendRecipientStatus, "sent" | "failed" | "skipped">;
      messageId: string | null;
      errorMessage: string | null;
      sentAt: string | null;
    },
    cursorIndex: number,
  ) => Effect.Effect<void>;
  /**
   * The full send job: the job row (with the profile name) plus every
   * recipient outcome joined with the recipient's name, in job order.
   * None when the job id does not exist.
   */
  readonly getSendJob: (jobId: string) => Effect.Effect<Option.Option<SendJobWithRecipients>>;
  /**
   * Cancel, terminal: in ONE transaction the remaining `pending`
   * recipients become `skipped` and the job `cancelled` (with
   * completedAt). Sent/failed rows keep their outcomes.
   */
  readonly cancelSendJob: (jobId: string) => Effect.Effect<void>;
  /**
   * Retry failures: in ONE transaction the `failed` recipients return to
   * `pending` (error cleared), the cursor rewinds to the first of them,
   * and the job returns to `pending` so the pipeline re-runs exactly
   * those. Returns how many recipients were reset.
   */
  readonly retryFailedSendJob: (jobId: string) => Effect.Effect<number>;
  /**
   * Whether ANY OTHER send job is active - `sending` or a paused-but-
   * unresumed job - the one-active-job rule (spec section 5). The job
   * itself is excluded so a paused job can always be resumed.
   */
  readonly anySendJobActiveExcept: (jobId: string) => Effect.Effect<boolean>;
}

/**
 * A template ready to be persisted: the fields from the registration form,
 * without the id (assigned here) or the created stamp.
 */
export interface TemplateDraft {
  readonly name: string;
  readonly filePath: string;
  readonly type: "docx" | "image";
  readonly slots: readonly string[];
  readonly outputPattern: string;
}

/** The mutable template fields; the file path and type never change. */
export interface TemplatePatch {
  readonly name: string;
  readonly slots: readonly string[];
  readonly outputPattern: string;
}

/** A generate job row as stored, with the template name for display. */
export interface GenerateJobWithRecipients {
  readonly job: {
    readonly id: string;
    readonly templateId: string;
    readonly templateName: string;
    readonly status: GenerateJobStatus;
    readonly createdAt: string;
    readonly completedAt: string | null;
  };
  readonly recipients: readonly GenerateJobRecipientRow[];
}

/** One generate-job recipient row as stored, name joined for display. */
export interface GenerateJobRecipientRow {
  readonly recipientId: string;
  readonly recipientName: string | null;
  readonly status: GenerateRecipientStatus;
  readonly outputPath: string | null;
  readonly errorMessage: string | null;
}

/**
 * An SMTP profile row as stored, password included. The smtp service maps
 * this to the shared `SmtpProfile` shape (password dropped, `hasPassword`
 * set) at its boundary, so the credential never leaves the main process.
 */
export interface SmtpStoredProfile {
  readonly id: string;
  readonly name: string;
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly createdAt: string;
}

/** A profile ready to be persisted: the form fields, without the id or stamp. */
export interface SmtpProfileDraft {
  readonly name: string;
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
}

/**
 * The mutable profile fields. `password` null keeps the stored one - the
 * edit dialog cannot see the stored value, so omitting it must not clear it.
 */
export interface SmtpProfilePatch {
  readonly name: string;
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string | null;
}

/**
 * A send job ready to be persisted: the compose wizard's channel config
 * plus the per-job pacing snapshot. `smtpOverride` is the serialized
 * inline credential JSON (plaintext at rest, the ticket-14 posture);
 * `cursorIndex` starts at 0 and `totalCount` is the recipient count.
 */
export interface SendJobDraft {
  readonly generateJobId: string;
  readonly smtpProfileId: string | null;
  readonly smtpOverrideJson: string | null;
  readonly subject: string;
  readonly bodyHtml: string;
  readonly senderName: string;
  readonly senderAddress: string;
  readonly delayMs: number;
  readonly totalCount: number;
}

/** A send job row as stored, with the profile name for display. */
export interface SendJobWithRecipients {
  readonly job: {
    readonly id: string;
    readonly generateJobId: string;
    readonly status: SendJobStatus;
    readonly smtpProfileId: string | null;
    readonly smtpProfileName: string | null;
    readonly smtpOverrideJson: string | null;
    readonly subject: string;
    readonly bodyHtml: string;
    readonly senderName: string;
    readonly senderAddress: string;
    readonly delayMs: number;
    readonly cursorIndex: number;
    readonly totalCount: number;
    readonly createdAt: string;
    readonly completedAt: string | null;
  };
  readonly recipients: readonly SendJobRecipientRow[];
}

/** One send-job recipient row as stored, name joined for display. */
export interface SendJobRecipientRow {
  readonly recipientId: string;
  readonly recipientName: string | null;
  readonly status: SendRecipientStatus;
  readonly messageId: string | null;
  readonly errorMessage: string | null;
  readonly sentAt: string | null;
}

function normalizeEmail(email: string | null): string | null {
  if (email === null) return null;
  const trimmed = email.trim();
  return trimmed === "" ? null : trimmed.toLowerCase();
}

/**
 * Escapes LIKE wildcards so user search text matches literally - a search
 * for "100%" finds only recipients whose field contains a literal "%".
 */
function escapeLike(term: string): string {
  return term.replace(/[\\%_]/g, (ch) => `\\${ch}`);
}

/** A recipients row as stored: the metadata bag still serialized. */
interface RecipientRow {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  metadata: string;
  import_batch: string;
  created_at: string;
}

/** A templates row as stored: the slots array still serialized as JSON. */
interface TemplateRow {
  id: string;
  name: string;
  file_path: string;
  type: "docx" | "image";
  slots: string;
  output_pattern: string;
  created_at: string;
}

/** An smtp_profiles row as stored. */
interface SmtpProfileRow {
  id: string;
  name: string;
  host: string;
  port: number;
  username: string;
  password: string;
  created_at: string;
}

function toSmtpStoredProfile(row: SmtpProfileRow): SmtpStoredProfile {
  return {
    id: row.id,
    name: row.name,
    host: row.host,
    port: row.port,
    username: row.username,
    password: row.password,
    createdAt: row.created_at,
  };
}

function toTemplate(row: TemplateRow): Template {
  return {
    id: row.id,
    name: row.name,
    filePath: row.file_path,
    type: row.type,
    slots: JSON.parse(row.slots) as string[],
    outputPattern: row.output_pattern,
    createdAt: row.created_at,
  };
}

function toRecipient(row: RecipientRow): Recipient {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    metadata: JSON.parse(row.metadata) as Record<string, string>,
    importBatch: row.import_batch,
    createdAt: row.created_at,
  };
}

export function makeSqliteRepo(db: DatabaseSync): SqliteRepoShape {
  return {
    getSetting: (key) =>
      Effect.sync(() => {
        const row = db.prepare("SELECT value FROM settings WHERE key = ?").get(key) as
          | { value: string }
          | undefined;
        return row === undefined ? Option.none() : Option.some(row.value);
      }),
    setSetting: (key, value) =>
      Effect.sync(() => {
        db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)").run(key, value);
      }),
    listRecipientEmails: () =>
      Effect.sync(() => {
        const rows = db
          .prepare("SELECT email FROM recipients WHERE email IS NOT NULL AND email != ''")
          .all() as { email: string }[];
        return new Set(rows.map((row) => row.email.trim().toLowerCase()));
      }),
    insertRecipients: (recipients) =>
      Effect.sync(() => {
        if (recipients.length === 0) return;
        const insert = db.prepare(
          "INSERT INTO recipients (id, name, email, phone, metadata, import_batch) VALUES (?, ?, ?, ?, ?, ?)",
        );
        db.exec("BEGIN");
        try {
          for (const recipient of recipients) {
            insert.run(
              crypto.randomUUID(),
              recipient.name,
              normalizeEmail(recipient.email),
              recipient.phone?.trim() === "" ? null : (recipient.phone?.trim() ?? null),
              JSON.stringify(recipient.metadata),
              recipient.importBatch,
            );
          }
          db.exec("COMMIT");
        } catch (error) {
          db.exec("ROLLBACK");
          throw error;
        }
      }),
    listRecipients: ({ search, importBatch, page, pageSize }) =>
      Effect.sync(() => {
        const clauses: string[] = [];
        const params: string[] = [];
        if (search !== null && search.trim() !== "") {
          const pattern = `%${escapeLike(search.trim())}%`;
          // The metadata bag is searched as its serialized JSON text: values
          // match literally, and so do field names (searching "instansi"
          // finds every row that has the field). JSON punctuation can match
          // too - a degenerate query like "," - which is the accepted
          // tradeoff for keeping the search index-free.
          clauses.push(
            "(name LIKE ? ESCAPE '\\' OR email LIKE ? ESCAPE '\\' OR phone LIKE ? ESCAPE '\\' OR metadata LIKE ? ESCAPE '\\')",
          );
          params.push(pattern, pattern, pattern, pattern);
        }
        if (importBatch !== null) {
          clauses.push("import_batch = ?");
          params.push(importBatch);
        }
        const where = clauses.length === 0 ? "" : ` WHERE ${clauses.join(" AND ")}`;

        const total = (
          db.prepare(`SELECT COUNT(*) AS n FROM recipients${where}`).get(...params) as {
            n: number;
          }
        ).n;
        // Newest imports first; same-second rows tiebreak by name, then id.
        const rows = db
          .prepare(
            `SELECT id, name, email, phone, metadata, import_batch, created_at FROM recipients${where} ORDER BY created_at DESC, name COLLATE NOCASE ASC, id ASC LIMIT ? OFFSET ?`,
          )
          .all(...params, pageSize, (page - 1) * pageSize) as unknown as RecipientRow[];
        return { items: rows.map(toRecipient), total };
      }),
    getRecipient: (id) =>
      Effect.sync(() => {
        const row = db
          .prepare(
            "SELECT id, name, email, phone, metadata, import_batch, created_at FROM recipients WHERE id = ?",
          )
          .get(id) as RecipientRow | undefined;
        return row === undefined ? Option.none() : Option.some(toRecipient(row));
      }),
    deleteRecipients: (ids) =>
      Effect.sync(() => {
        if (ids.length === 0) return 0;
        const placeholders = ids.map(() => "?").join(", ");
        const result = db
          .prepare(`DELETE FROM recipients WHERE id IN (${placeholders})`)
          .run(...ids);
        return Number(result.changes);
      }),
    listImportBatches: () =>
      Effect.sync(() => {
        return db
          .prepare(
            "SELECT import_batch AS id, MIN(created_at) AS createdAt, COUNT(*) AS count FROM recipients GROUP BY import_batch ORDER BY createdAt DESC, id",
          )
          .all() as ImportBatch[];
      }),
    listAllRecipients: ({ search, importBatch }) =>
      Effect.sync(() => {
        const clauses: string[] = [];
        const params: string[] = [];
        if (search !== null && search.trim() !== "") {
          const pattern = `%${escapeLike(search.trim())}%`;
          clauses.push(
            "(name LIKE ? ESCAPE '\\' OR email LIKE ? ESCAPE '\\' OR phone LIKE ? ESCAPE '\\' OR metadata LIKE ? ESCAPE '\\')",
          );
          params.push(pattern, pattern, pattern, pattern);
        }
        if (importBatch !== null) {
          clauses.push("import_batch = ?");
          params.push(importBatch);
        }
        const where = clauses.length === 0 ? "" : ` WHERE ${clauses.join(" AND ")}`;
        const rows = db
          .prepare(
            `SELECT id, name, email, phone, metadata, import_batch, created_at FROM recipients${where} ORDER BY created_at DESC, name COLLATE NOCASE ASC, id ASC`,
          )
          .all(...params) as unknown as RecipientRow[];
        return rows.map(toRecipient);
      }),
    listTemplates: () =>
      Effect.sync(() => {
        const rows = db
          .prepare(
            "SELECT id, name, file_path, type, slots, output_pattern, created_at FROM templates ORDER BY created_at DESC, name COLLATE NOCASE ASC, id ASC",
          )
          .all() as unknown as TemplateRow[];
        return rows.map(toTemplate);
      }),
    getTemplate: (id) =>
      Effect.sync(() => {
        const row = db
          .prepare(
            "SELECT id, name, file_path, type, slots, output_pattern, created_at FROM templates WHERE id = ?",
          )
          .get(id) as TemplateRow | undefined;
        return row === undefined ? Option.none() : Option.some(toTemplate(row));
      }),
    insertTemplate: (draft) =>
      Effect.sync(() => {
        const id = crypto.randomUUID();
        db.prepare(
          "INSERT INTO templates (id, name, file_path, type, slots, output_pattern) VALUES (?, ?, ?, ?, ?, ?)",
        ).run(
          id,
          draft.name,
          draft.filePath,
          draft.type,
          JSON.stringify(draft.slots),
          draft.outputPattern,
        );
        const row = db
          .prepare(
            "SELECT id, name, file_path, type, slots, output_pattern, created_at FROM templates WHERE id = ?",
          )
          .get(id) as TemplateRow | undefined;
        // The insert above just landed, so the row must exist.
        return toTemplate(row as TemplateRow);
      }),
    updateTemplate: (id, patch) =>
      Effect.sync(() => {
        const result = db
          .prepare("UPDATE templates SET name = ?, slots = ?, output_pattern = ? WHERE id = ?")
          .run(patch.name, JSON.stringify(patch.slots), patch.outputPattern, id);
        if (Number(result.changes) === 0) return Option.none();
        const row = db
          .prepare(
            "SELECT id, name, file_path, type, slots, output_pattern, created_at FROM templates WHERE id = ?",
          )
          .get(id) as TemplateRow | undefined;
        return row === undefined ? Option.none() : Option.some(toTemplate(row));
      }),
    deleteTemplate: (id) =>
      Effect.sync(() => {
        return Number(db.prepare("DELETE FROM templates WHERE id = ?").run(id).changes);
      }),
    insertGenerateJob: (templateId) =>
      Effect.sync(() => {
        const id = crypto.randomUUID();
        db.prepare("INSERT INTO generate_jobs (id, template_id) VALUES (?, ?)").run(id, templateId);
        return id;
      }),
    insertGenerateJobRecipients: (jobId, recipientIds) =>
      Effect.sync(() => {
        if (recipientIds.length === 0) return;
        const insert = db.prepare(
          "INSERT INTO generate_job_recipients (job_id, recipient_id) VALUES (?, ?)",
        );
        db.exec("BEGIN");
        try {
          for (const recipientId of recipientIds) insert.run(jobId, recipientId);
          db.exec("COMMIT");
        } catch (error) {
          db.exec("ROLLBACK");
          throw error;
        }
      }),
    setGenerateJobStatus: (jobId, status, completedAt = null) =>
      Effect.sync(() => {
        db.prepare("UPDATE generate_jobs SET status = ?, completed_at = ? WHERE id = ?").run(
          status,
          completedAt,
          jobId,
        );
      }),
    getGenerateJob: (jobId) =>
      Effect.sync(() => {
        const row = db
          .prepare(
            `SELECT gj.id, gj.template_id, COALESCE(t.name, '(deleted template)') AS template_name, gj.status, gj.created_at, gj.completed_at
             FROM generate_jobs gj LEFT JOIN templates t ON t.id = gj.template_id WHERE gj.id = ?`,
          )
          .get(jobId) as
          | {
              id: string;
              template_id: string;
              template_name: string;
              status: GenerateJobStatus;
              created_at: string;
              completed_at: string | null;
            }
          | undefined;
        if (row === undefined) return Option.none();
        // LEFT JOIN so a recipient deleted after the job started still shows
        // its row (name falls back to "(deleted recipient)" in the service).
        // Aliases are camelCase so the row keys match GenerateJobRecipientRow
        // verbatim - a snake_case/camelCase mismatch here would silently
        // null out every recipient name at runtime.
        const recipients = db
          .prepare(
            `SELECT gjr.recipient_id AS recipientId, r.name AS recipientName, gjr.status, gjr.output_path AS outputPath, gjr.error_message AS errorMessage
             FROM generate_job_recipients gjr
             LEFT JOIN recipients r ON r.id = gjr.recipient_id
             WHERE gjr.job_id = ? ORDER BY gjr.rowid`,
          )
          .all(jobId) as unknown as GenerateJobRecipientRow[];
        return Option.some({
          job: {
            id: row.id,
            templateId: row.template_id,
            templateName: row.template_name,
            status: row.status,
            createdAt: row.created_at,
            completedAt: row.completed_at,
          },
          recipients,
        });
      }),
    setGenerateRecipientResult: (jobId, recipientId, result) =>
      Effect.sync(() => {
        db.prepare(
          "UPDATE generate_job_recipients SET status = ?, output_path = ?, error_message = ? WHERE job_id = ? AND recipient_id = ?",
        ).run(result.status, result.outputPath, result.errorMessage, jobId, recipientId);
      }),
    getRecipientsByIds: (ids) =>
      Effect.sync(() => {
        if (ids.length === 0) return [];
        const placeholders = ids.map(() => "?").join(", ");
        const rows = db
          .prepare(
            `SELECT id, name, email, phone, metadata, import_batch, created_at FROM recipients WHERE id IN (${placeholders})`,
          )
          .all(...ids) as unknown as RecipientRow[];
        const byId = new Map(rows.map((row) => [row.id, toRecipient(row)]));
        // Preserve the requested order - it is the job's processing order.
        return ids.flatMap((id) => (byId.has(id) ? [byId.get(id) as Recipient] : []));
      }),
    getGenerateRecipient: (jobId, recipientId) =>
      Effect.sync(() => {
        const row = db
          .prepare(
            "SELECT status, output_path FROM generate_job_recipients WHERE job_id = ? AND recipient_id = ?",
          )
          .get(jobId, recipientId) as
          | { status: "pending" | "generated" | "failed"; output_path: string | null }
          | undefined;
        return row === undefined
          ? Option.none()
          : Option.some({ status: row.status, outputPath: row.output_path });
      }),
    listSmtpProfiles: () =>
      Effect.sync(() => {
        const rows = db
          .prepare(
            // rowid DESC breaks ties within the same creation second: the
            // most recently added profile comes first.
            "SELECT id, name, host, port, username, password, created_at FROM smtp_profiles ORDER BY created_at DESC, rowid DESC",
          )
          .all() as unknown as SmtpProfileRow[];
        return rows.map(toSmtpStoredProfile);
      }),
    getSmtpProfile: (id) =>
      Effect.sync(() => {
        const row = db
          .prepare(
            "SELECT id, name, host, port, username, password, created_at FROM smtp_profiles WHERE id = ?",
          )
          .get(id) as SmtpProfileRow | undefined;
        return row === undefined ? Option.none() : Option.some(toSmtpStoredProfile(row));
      }),
    insertSmtpProfile: (draft) =>
      Effect.sync(() => {
        const id = crypto.randomUUID();
        db.prepare(
          "INSERT INTO smtp_profiles (id, name, host, port, username, password) VALUES (?, ?, ?, ?, ?, ?)",
        ).run(id, draft.name, draft.host, draft.port, draft.username, draft.password);
        const row = db
          .prepare(
            "SELECT id, name, host, port, username, password, created_at FROM smtp_profiles WHERE id = ?",
          )
          .get(id) as SmtpProfileRow | undefined;
        // The insert above just landed, so the row must exist.
        return toSmtpStoredProfile(row as SmtpProfileRow);
      }),
    updateSmtpProfile: (id, patch) =>
      Effect.sync(() => {
        // null password keeps the stored one; the SQL COALESCE never sees the
        // empty string because the service rejects "" before persisting.
        const result = db
          .prepare(
            "UPDATE smtp_profiles SET name = ?, host = ?, port = ?, username = ?, password = COALESCE(?, password) WHERE id = ?",
          )
          .run(patch.name, patch.host, patch.port, patch.username, patch.password, id);
        if (Number(result.changes) === 0) return Option.none();
        const row = db
          .prepare(
            "SELECT id, name, host, port, username, password, created_at FROM smtp_profiles WHERE id = ?",
          )
          .get(id) as SmtpProfileRow | undefined;
        return row === undefined ? Option.none() : Option.some(toSmtpStoredProfile(row));
      }),
    deleteSmtpProfile: (id) =>
      Effect.sync(() => {
        return Number(db.prepare("DELETE FROM smtp_profiles WHERE id = ?").run(id).changes);
      }),
    insertSendJob: (draft) =>
      Effect.sync(() => {
        const id = crypto.randomUUID();
        db.prepare(
          `INSERT INTO send_jobs (id, generate_job_id, smtp_profile_id, smtp_override, subject, body_html, sender_name, sender_address, delay_ms, total_count)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        ).run(
          id,
          draft.generateJobId,
          draft.smtpProfileId,
          draft.smtpOverrideJson,
          draft.subject,
          draft.bodyHtml,
          draft.senderName,
          draft.senderAddress,
          draft.delayMs,
          draft.totalCount,
        );
        return id;
      }),
    insertSendJobRecipients: (jobId, recipientIds) =>
      Effect.sync(() => {
        if (recipientIds.length === 0) return;
        const insert = db.prepare(
          "INSERT INTO send_job_recipients (job_id, recipient_id) VALUES (?, ?)",
        );
        db.exec("BEGIN");
        try {
          for (const recipientId of recipientIds) insert.run(jobId, recipientId);
          db.exec("COMMIT");
        } catch (error) {
          db.exec("ROLLBACK");
          throw error;
        }
      }),
    setSendJobStatus: (jobId, status, completedAt = null) =>
      Effect.sync(() => {
        db.prepare("UPDATE send_jobs SET status = ?, completed_at = ? WHERE id = ?").run(
          status,
          completedAt,
          jobId,
        );
      }),
    persistSendOutcome: (jobId, recipientId, result, cursorIndex) =>
      Effect.sync(() => {
        db.exec("BEGIN");
        try {
          db.prepare(
            `UPDATE send_job_recipients SET status = ?, message_id = ?, error_message = ?, sent_at = ?
             WHERE job_id = ? AND recipient_id = ?`,
          ).run(
            result.status,
            result.messageId,
            result.errorMessage,
            result.sentAt,
            jobId,
            recipientId,
          );
          db.prepare("UPDATE send_jobs SET cursor_index = ? WHERE id = ?").run(cursorIndex, jobId);
          db.exec("COMMIT");
        } catch (error) {
          db.exec("ROLLBACK");
          throw error;
        }
      }),
    getSendJob: (jobId) =>
      Effect.sync(() => {
        const row = db
          .prepare(
            `SELECT sj.id, sj.generate_job_id AS generateJobId, sj.status,
                    sj.smtp_profile_id AS smtpProfileId, sp.name AS smtpProfileName,
                    sj.smtp_override AS smtpOverrideJson, sj.subject, sj.body_html AS bodyHtml,
                    sj.sender_name AS senderName, sj.sender_address AS senderAddress,
                    sj.delay_ms AS delayMs, sj.cursor_index AS cursorIndex,
                    sj.total_count AS totalCount, sj.created_at AS createdAt, sj.completed_at AS completedAt
             FROM send_jobs sj
             LEFT JOIN smtp_profiles sp ON sp.id = sj.smtp_profile_id
             WHERE sj.id = ?`,
          )
          .get(jobId) as
          | {
              id: string;
              generateJobId: string;
              status: SendJobStatus;
              smtpProfileId: string | null;
              smtpProfileName: string | null;
              smtpOverrideJson: string | null;
              subject: string;
              bodyHtml: string;
              senderName: string;
              senderAddress: string;
              delayMs: number;
              cursorIndex: number;
              totalCount: number;
              createdAt: string;
              completedAt: string | null;
            }
          | undefined;
        if (row === undefined) return Option.none();
        // LEFT JOIN so a recipient deleted after the job started still shows
        // its row (name falls back to "(deleted recipient)" in the service).
        const recipients = db
          .prepare(
            `SELECT sjr.recipient_id AS recipientId, r.name AS recipientName, sjr.status,
                    sjr.message_id AS messageId, sjr.error_message AS errorMessage, sjr.sent_at AS sentAt
             FROM send_job_recipients sjr
             LEFT JOIN recipients r ON r.id = sjr.recipient_id
             WHERE sjr.job_id = ? ORDER BY sjr.rowid`,
          )
          .all(jobId) as unknown as SendJobRecipientRow[];
        return Option.some({
          job: {
            id: row.id,
            generateJobId: row.generateJobId,
            status: row.status,
            smtpProfileId: row.smtpProfileId,
            smtpProfileName: row.smtpProfileName,
            smtpOverrideJson: row.smtpOverrideJson,
            subject: row.subject,
            bodyHtml: row.bodyHtml,
            senderName: row.senderName,
            senderAddress: row.senderAddress,
            delayMs: row.delayMs,
            cursorIndex: row.cursorIndex,
            totalCount: row.totalCount,
            createdAt: row.createdAt,
            completedAt: row.completedAt,
          },
          recipients,
        });
      }),
    cancelSendJob: (jobId) =>
      Effect.sync(() => {
        db.exec("BEGIN");
        try {
          db.prepare(
            "UPDATE send_job_recipients SET status = 'skipped' WHERE job_id = ? AND status = 'pending'",
          ).run(jobId);
          db.prepare(
            "UPDATE send_jobs SET status = 'cancelled', completed_at = datetime('now') WHERE id = ?",
          ).run(jobId);
          db.exec("COMMIT");
        } catch (error) {
          db.exec("ROLLBACK");
          throw error;
        }
      }),
    retryFailedSendJob: (jobId) =>
      Effect.sync(() => {
        db.exec("BEGIN");
        try {
          const reset = db
            .prepare(
              `UPDATE send_job_recipients SET status = 'pending', message_id = NULL, error_message = NULL, sent_at = NULL
             WHERE job_id = ? AND status = 'failed'`,
            )
            .run(jobId);
          // Rewind the cursor to the first retried recipient - its index
          // (how many rows precede it); the pipeline re-processes from
          // there, skipping rows already sent/skipped.
          db.prepare(
            `UPDATE send_jobs SET cursor_index = (
               SELECT COUNT(*) FROM send_job_recipients
               WHERE job_id = ? AND rowid < (
                 SELECT MIN(rowid) FROM send_job_recipients WHERE job_id = ? AND status = 'pending'
               )
             ), status = 'pending', completed_at = NULL WHERE id = ?`,
          ).run(jobId, jobId, jobId);
          db.exec("COMMIT");
          return Number(reset.changes);
        } catch (error) {
          db.exec("ROLLBACK");
          throw error;
        }
      }),
    anySendJobActiveExcept: (jobId) =>
      Effect.sync(() => {
        const row = db
          .prepare(
            "SELECT COUNT(*) AS n FROM send_jobs WHERE id != ? AND status IN ('sending', 'paused')",
          )
          .get(jobId) as { n: number };
        return row.n > 0;
      }),
  };
}

/**
 * Raw settings key/value access over the open database handle.
 * Domain services (Settings) and later tickets build on top of this.
 */
export class SqliteRepo extends Context.Service<SqliteRepo, SqliteRepoShape>()("SqliteRepo") {
  static readonly Live = (db: DatabaseSync): Layer.Layer<SqliteRepo> =>
    Layer.succeed(SqliteRepo, makeSqliteRepo(db));
}

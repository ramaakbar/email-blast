import { Context, Effect, Layer, Option } from "effect";
import { DatabaseSync } from "node:sqlite";
import type { ImportBatch, Recipient, RecipientListPayload, Template } from "../../shared/ipc";

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
 */
export function openDatabase(dbPath: string): DatabaseSync {
  const db = new DatabaseSync(dbPath);
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

import { Context, Effect, Layer, Option } from "effect";
import { DatabaseSync } from "node:sqlite";

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

export interface SqliteRepoShape {
  readonly getSetting: (key: string) => Effect.Effect<Option.Option<string>>;
  readonly setSetting: (key: string, value: string) => Effect.Effect<void>;
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

import { describe, expect, it, vi } from "vitest";
import { Effect, Layer, Option } from "effect";
import Database from "better-sqlite3";
import { join } from "path";
import type { SendJobStatus } from "../../shared/ipc";
import {
  migrateCredentialsAtRest,
  openDatabase,
  SqliteRepo,
  type SqliteRepoShape,
} from "./repository";
import { tempDir } from "../services/test-helpers";
import {
  CIPHERTEXT_PREFIX,
  isCiphertext,
  makeCredentialCrypto,
  type CredentialCrypto,
} from "../services/credential-crypto";

/**
 * The degraded-mode crypto (no keychain): plaintext storage, legacy
 * values pass through. Existing behavior tests assume the unencrypted
 * posture of earlier tickets; the at-rest tests below inject an
 * encrypting fake instead.
 */
const plainCrypto = makeCredentialCrypto(null, () => {});

/**
 * Seam A (spec Testing Decisions): SqliteRepo against a temp database file.
 * The full schema comes from spec decision 7.
 */

const ALL_TABLES = [
  "recipients",
  "templates",
  "message_templates",
  "generate_jobs",
  "generate_job_recipients",
  "send_jobs",
  "send_job_recipients",
  "smtp_profiles",
  "settings",
] as const;

/** Runs an Effect program that borrows the SqliteRepo service from a layer. */
function use<A, E>(
  layer: Layer.Layer<SqliteRepo>,
  f: (repo: SqliteRepoShape) => Effect.Effect<A, E, never>,
): Promise<A> {
  return Effect.runPromise(
    Effect.gen(function* () {
      return yield* f(yield* SqliteRepo);
    }).pipe(Effect.provide(layer)),
  );
}

describe("SqliteRepo (Seam A)", () => {
  it("creates the full schema on a fresh database", () => {
    const db = openDatabase(join(tempDir(), "test.db"));

    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name")
      .all()
      .map((row) => (row as { name: string }).name);

    for (const table of ALL_TABLES) {
      expect(tables, `table ${table} should exist`).toContain(table);
    }
    db.close();
  });

  it("round-trips get/set through the Effect Layer", async () => {
    const db = openDatabase(join(tempDir(), "test.db"));
    const layer = SqliteRepo.Live(db, plainCrypto);

    await expect(use(layer, (r) => r.getSetting("no-such-key"))).resolves.toEqual(Option.none());

    await use(layer, (r) => r.setSetting("rate_limit_delay_ms", "2500"));
    await expect(use(layer, (r) => r.getSetting("rate_limit_delay_ms"))).resolves.toEqual(
      Option.some("2500"),
    );

    // Overwrite.
    await use(layer, (r) => r.setSetting("rate_limit_delay_ms", "3000"));
    await expect(use(layer, (r) => r.getSetting("rate_limit_delay_ms"))).resolves.toEqual(
      Option.some("3000"),
    );
    db.close();
  });

  it("persists values across a reopen (restart)", () => {
    const dbPath = join(tempDir(), "test.db");

    const db1 = openDatabase(dbPath);
    db1
      .prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)")
      .run("rate_limit_delay_ms", "5000");
    db1.close();

    const db2 = openDatabase(dbPath);
    const row = db2
      .prepare("SELECT value FROM settings WHERE key = ?")
      .get("rate_limit_delay_ms") as { value: string };
    expect(row.value).toBe("5000");
    db2.close();
  });

  it("inserts recipients with their metadata bag and import batch, and lists existing emails", async () => {
    const db = openDatabase(join(tempDir(), "test.db"));
    const layer = SqliteRepo.Live(db, plainCrypto);

    await use(layer, (r) =>
      r.insertRecipients([
        {
          name: "Alice",
          email: "alice@example.com",
          phone: "0812",
          metadata: { instansi: "Kampus A", no: "1" },
          importBatch: "batch-1",
        },
        {
          name: "Bob",
          email: null,
          phone: null,
          metadata: {},
          importBatch: "batch-1",
        },
        {
          name: "Carol",
          email: "CAROL@example.com",
          phone: null,
          metadata: {},
          importBatch: "batch-2",
        },
      ]),
    );

    // Emails are lowercased on the way in, so the dedupe key is stable.
    await expect(use(layer, (r) => r.listRecipientEmails())).resolves.toEqual(
      new Set(["alice@example.com", "carol@example.com"]),
    );

    const alice = db
      .prepare(
        "SELECT id, name, email, phone, metadata, import_batch FROM recipients WHERE name = ?",
      )
      .get("Alice") as {
      id: string;
      name: string;
      email: string;
      phone: string;
      metadata: string;
      import_batch: string;
    };
    expect(alice.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(alice.email).toBe("alice@example.com");
    expect(alice.phone).toBe("0812");
    expect(alice.metadata).toBe('{"instansi":"Kampus A","no":"1"}');
    expect(alice.import_batch).toBe("batch-1");
    db.close();
  });

  it("inserts nothing when given an empty list, and survives a reopen", async () => {
    const dbPath = join(tempDir(), "test.db");
    const db1 = openDatabase(dbPath);
    const layer1 = SqliteRepo.Live(db1, plainCrypto);

    await use(layer1, (r) => r.insertRecipients([]));
    const count = db1.prepare("SELECT COUNT(*) AS n FROM recipients").get() as { n: number };
    expect(count.n).toBe(0);

    await use(layer1, (r) =>
      r.insertRecipients([
        { name: "Zoe", email: "zoe@example.com", phone: null, metadata: {}, importBatch: "b" },
      ]),
    );
    db1.close();

    const db2 = openDatabase(dbPath);
    const row = db2.prepare("SELECT import_batch FROM recipients WHERE name = ?").get("Zoe") as {
      import_batch: string;
    };
    expect(row.import_batch).toBe("b");
    db2.close();
  });

  it("opens an existing database unmodified (ticket 22 migration proof)", () => {
    const dbPath = join(tempDir(), "test.db");
    // The historical pre-ticket-22 format, verbatim: the hand-written
    // layer's SCHEMA_SQL. Seeding with it proves an existing user database
    // - built before Drizzle - opens with its tables and data intact and
    // its stored DDL untouched.
    const HISTORICAL_SCHEMA_SQL = `
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
    const legacy = new Database(dbPath);
    legacy.exec(HISTORICAL_SCHEMA_SQL);
    legacy
      .prepare(
        "INSERT INTO recipients (id, name, email, phone, metadata, import_batch, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
      )
      .run(
        "11111111-1111-4111-8111-111111111111",
        "Budi",
        "budi@example.com",
        null,
        '{"instansi":"Kampus A"}',
        "batch-1",
        "2026-08-01 09:00:00",
      );
    legacy
      .prepare("INSERT INTO settings (key, value) VALUES (?, ?)")
      .run("rate_limit_delay_ms", "2500");
    legacy.close();

    // The Drizzle layer opens the same file: data intact, tables intact,
    // and the historical stored DDL untouched (the bootstrap migration is
    // idempotent - it must never rewrite existing tables).
    const db = openDatabase(dbPath);
    const row = db
      .prepare(
        "SELECT name, email, metadata, import_batch, created_at FROM recipients WHERE id = ?",
      )
      .get("11111111-1111-4111-8111-111111111111") as {
      name: string;
      email: string;
      metadata: string;
      import_batch: string;
      created_at: string;
    };
    expect(row).toEqual({
      name: "Budi",
      email: "budi@example.com",
      metadata: '{"instansi":"Kampus A"}',
      import_batch: "batch-1",
      created_at: "2026-08-01 09:00:00",
    });
    expect(
      (
        db.prepare("SELECT value FROM settings WHERE key = ?").get("rate_limit_delay_ms") as {
          value: string;
        }
      ).value,
    ).toBe("2500");
    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name")
      .all()
      .map((tbl) => (tbl as { name: string }).name);
    for (const table of ALL_TABLES) {
      expect(tables, `table ${table} should exist`).toContain(table);
    }
    const recipientsDdl = db
      .prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'recipients'")
      .get() as { sql: string };
    expect(recipientsDdl.sql).toContain("CREATE TABLE recipients");
    expect(recipientsDdl.sql).not.toContain("`");
    db.close();
  });
});

describe("send job log queries (ticket 16)", () => {
  /**
   * Seeds one send job: its template + generate job, the recipients with
   * their outcomes, and the job status. The creation stamp can be
   * overridden so the date-range filter is testable.
   */
  async function seedSendJob(
    db: Database.Database,
    layer: Layer.Layer<SqliteRepo>,
    options: {
      subject: string;
      recipientOutcomes: Array<{
        recipientId: string;
        status: "sent" | "failed" | "skipped" | "pending";
      }>;
      jobStatus: SendJobStatus;
      smtpProfileId?: string | null;
      createdAt?: string;
    },
  ): Promise<{ jobId: string; templateId: string; templateName: string }> {
    const template = await use(layer, (r) =>
      r.insertTemplate({
        name: "LOA",
        filePath: join(tempDir(), "template.docx"),
        type: "docx",
        slots: ["name"],
        outputPattern: "LOA_{name}.pdf",
        slotLayout: {},
      }),
    );
    const generateJobId = await use(layer, (r) => r.insertGenerateJob({ templateId: template.id, templateColumn: null, templateAssignmentJson: null, outputPattern: null }));
    const jobId = await use(layer, (r) =>
      r.insertSendJob({
        generateJobId,
        smtpProfileId: options.smtpProfileId ?? null,
        smtpOverrideJson: options.smtpProfileId
          ? null
          : JSON.stringify({ host: "127.0.0.1", port: 587, username: "me", password: "secret" }),
        subject: options.subject,
        bodyHtml: "<p>body</p>",
        senderName: "Yayasan X",
        senderAddress: "iym@example.org",
        replyTo: null,
        delayMs: 1000,
        totalCount: options.recipientOutcomes.length,
      }),
    );
    await use(layer, (r) =>
      r.insertSendJobRecipients(
        jobId,
        options.recipientOutcomes.map((outcome) => outcome.recipientId),
      ),
    );
    // Persist the non-pending outcomes, advancing the cursor like the
    // send pipeline would. Sequential on purpose: each persist lands the
    // next cursor value, and the last one must win.
    let cursor = 0;
    for (const [index, outcome] of options.recipientOutcomes.entries()) {
      const status = outcome.status;
      if (status === "pending") continue;
      cursor = index + 1;
      // eslint-disable-next-line no-await-in-loop
      await use(layer, (r) =>
        r.persistSendOutcome(
          jobId,
          outcome.recipientId,
          {
            status,
            messageId: status === "sent" ? `msg-${index}` : null,
            errorMessage: status === "failed" ? "SmtpSendFailed: 550 mailbox unavailable" : null,
            sentAt: status === "sent" ? "2026-08-01 10:00:00" : null,
          },
          cursor,
        ),
      );
    }
    await use(layer, (r) =>
      r.setSendJobStatus(
        jobId,
        options.jobStatus,
        options.jobStatus === "completed" ? "2026-08-01 10:05:00" : null,
      ),
    );
    if (options.createdAt !== undefined) {
      db.prepare("UPDATE send_jobs SET created_at = ? WHERE id = ?").run(options.createdAt, jobId);
    }
    return { jobId, templateId: template.id, templateName: template.name };
  }

  it("lists send jobs most recent first with outcome counts and the template name", async () => {
    const db = openDatabase(join(tempDir(), "test.db"));
    const layer = SqliteRepo.Live(db, plainCrypto);
    await use(layer, (r) =>
      r.insertRecipients([
        { name: "Budi", email: "budi@example.com", phone: null, metadata: {}, importBatch: "b" },
        { name: "Sari", email: "sari@example.com", phone: null, metadata: {}, importBatch: "b" },
        { name: "Andi", email: "andi@example.com", phone: null, metadata: {}, importBatch: "b" },
      ]),
    );
    const recipientIds = (
      db.prepare("SELECT id FROM recipients ORDER BY rowid").all() as { id: string }[]
    ).map((row) => row.id);
    const first = await seedSendJob(db, layer, {
      subject: "Undangan A",
      recipientOutcomes: [
        { recipientId: recipientIds[0], status: "sent" },
        { recipientId: recipientIds[1], status: "failed" },
      ],
      jobStatus: "completed",
    });
    const second = await seedSendJob(db, layer, {
      subject: "Undangan B",
      recipientOutcomes: [{ recipientId: recipientIds[2], status: "pending" }],
      jobStatus: "pending",
    });

    const rows = await use(layer, (r) =>
      r.listSendJobs({ statusFilter: null, dateFrom: null, dateTo: null }),
    );
    // Most recent first; equal-second creation stamps break by rowid, so
    // the later insert always leads.
    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({
      id: second.jobId,
      status: "pending",
      subject: "Undangan B",
      sentCount: 0,
      failedCount: 0,
      skippedCount: 0,
      totalCount: 1,
      cursorIndex: 0,
      templateId: second.templateId,
      templateName: "LOA",
    });
    expect(rows[1]).toMatchObject({
      id: first.jobId,
      status: "completed",
      subject: "Undangan A",
      sentCount: 1,
      failedCount: 1,
      skippedCount: 0,
      totalCount: 2,
      cursorIndex: 2,
      templateId: first.templateId,
      templateName: "LOA",
      completedAt: "2026-08-01 10:05:00",
    });
    db.close();
  });

  it("filters send jobs by status and creation date", async () => {
    const db = openDatabase(join(tempDir(), "test.db"));
    const layer = SqliteRepo.Live(db, plainCrypto);
    await use(layer, (r) =>
      r.insertRecipients([
        { name: "Budi", email: "budi@example.com", phone: null, metadata: {}, importBatch: "b" },
        { name: "Sari", email: "sari@example.com", phone: null, metadata: {}, importBatch: "b" },
        { name: "Andi", email: "andi@example.com", phone: null, metadata: {}, importBatch: "b" },
      ]),
    );
    const recipientIds = (
      db.prepare("SELECT id FROM recipients ORDER BY rowid").all() as { id: string }[]
    ).map((row) => row.id);
    const older = await seedSendJob(db, layer, {
      subject: "July job",
      recipientOutcomes: [{ recipientId: recipientIds[0], status: "sent" }],
      jobStatus: "completed",
      createdAt: "2026-07-01 09:00:00",
    });
    const mid = await seedSendJob(db, layer, {
      subject: "August paused",
      recipientOutcomes: [{ recipientId: recipientIds[1], status: "pending" }],
      jobStatus: "paused",
      createdAt: "2026-08-02 09:00:00",
    });
    const latest = await seedSendJob(db, layer, {
      subject: "August done",
      recipientOutcomes: [{ recipientId: recipientIds[2], status: "sent" }],
      jobStatus: "completed",
      createdAt: "2026-08-04 09:00:00",
    });

    // Status alone.
    const completed = await use(layer, (r) =>
      r.listSendJobs({ statusFilter: "completed", dateFrom: null, dateTo: null }),
    );
    expect(completed.map((row) => row.id)).toEqual([latest.jobId, older.jobId]);

    // Date range alone: from 2026-08-01 00:00 UTC on, most recent first.
    const fromAugust = await use(layer, (r) =>
      r.listSendJobs({ statusFilter: null, dateFrom: "2026-08-01 00:00:00", dateTo: null }),
    );
    expect(fromAugust.map((row) => row.id)).toEqual([latest.jobId, mid.jobId]);

    // Both bounds, inclusive over the full UTC stamp.
    const julyAndEarlyAugust = await use(layer, (r) =>
      r.listSendJobs({
        statusFilter: null,
        dateFrom: "2026-07-01 00:00:00",
        dateTo: "2026-08-02 23:59:59",
      }),
    );
    expect(julyAndEarlyAugust.map((row) => row.id)).toEqual([mid.jobId, older.jobId]);

    // A bound inside the creation day still narrows by the stamp.
    const beforeLatest = await use(layer, (r) =>
      r.listSendJobs({ statusFilter: null, dateFrom: null, dateTo: "2026-08-04 08:59:59" }),
    );
    expect(beforeLatest.map((row) => row.id)).toEqual([mid.jobId, older.jobId]);

    // Status + date range combined.
    const pausedInRange = await use(layer, (r) =>
      r.listSendJobs({
        statusFilter: "paused",
        dateFrom: "2026-08-01 00:00:00",
        dateTo: "2026-08-03 23:59:59",
      }),
    );
    expect(pausedInRange.map((row) => row.id)).toEqual([mid.jobId]);

    // No match.
    const pending = await use(layer, (r) =>
      r.listSendJobs({ statusFilter: "pending", dateFrom: null, dateTo: null }),
    );
    expect(pending).toEqual([]);
    db.close();
  });

  it("getSendJob joins the template and the recipient email, surviving deleted recipients", async () => {
    const db = openDatabase(join(tempDir(), "test.db"));
    const layer = SqliteRepo.Live(db, plainCrypto);
    await use(layer, (r) =>
      r.insertRecipients([
        { name: "Budi", email: "budi@example.com", phone: null, metadata: {}, importBatch: "b" },
      ]),
    );
    const [recipientId] = (
      db.prepare("SELECT id FROM recipients ORDER BY rowid").all() as { id: string }[]
    ).map((row) => row.id);
    const seeded = await seedSendJob(db, layer, {
      subject: "Undangan",
      recipientOutcomes: [{ recipientId, status: "sent" }],
      jobStatus: "completed",
    });

    const loaded = await use(layer, (r) => r.getSendJob(seeded.jobId));
    expect(Option.isSome(loaded)).toBe(true);
    const value = Option.isSome(loaded) ? loaded.value : null;
    expect(value?.job.templateId).toBe(seeded.templateId);
    expect(value?.job.templateName).toBe("LOA");
    expect(value?.recipients[0]).toMatchObject({
      recipientId,
      recipientName: "Budi",
      recipientEmail: "budi@example.com",
      status: "sent",
      messageId: "msg-0",
    });

    // The history survives the recipient's deletion: the row stays, with
    // the joined name and email gone.
    db.prepare("DELETE FROM recipients WHERE id = ?").run(recipientId);
    const afterDelete = await use(layer, (r) => r.getSendJob(seeded.jobId));
    const afterValue = Option.isSome(afterDelete) ? afterDelete.value : null;
    expect(afterValue?.recipients[0]).toMatchObject({
      recipientId,
      recipientName: null,
      recipientEmail: null,
      status: "sent",
    });
    db.close();
  });
});

/**
 * A reversible fake keychain producing real `enc:v1:` ciphertext, so the
 * at-rest assertions match what the live safeStorage crypto writes. The
 * marker inside the base64 lets the tests tell which values a given fake
 * encrypted.
 */
function fakeCrypto(marker: string): CredentialCrypto {
  return {
    available: () => true,
    store: (plaintext) =>
      CIPHERTEXT_PREFIX + Buffer.from(`${marker}<${plaintext}>`).toString("base64"),
    read: (stored) => {
      if (!stored.startsWith(CIPHERTEXT_PREFIX)) return stored;
      const text = Buffer.from(stored.slice(CIPHERTEXT_PREFIX.length), "base64").toString();
      return text.startsWith(`${marker}<`) && text.endsWith(">")
        ? text.slice(marker.length + 1, -1)
        : "";
    },
  };
}

describe("credential encryption at rest (ticket 02)", () => {
  it("stores profile passwords encrypted and decrypts them on read", async () => {
    const db = openDatabase(join(tempDir(), "test.db"));
    const layer = SqliteRepo.Live(db, fakeCrypto("f"));

    const created = await use(layer, (r) =>
      r.insertSmtpProfile({
        name: "Gmail",
        host: "smtp.gmail.com",
        port: 587,
        username: "me@gmail.com",
        password: "hunter2",
        senderName: null,
        senderAddress: null,
        replyTo: null,
      }),
    );

    // At rest: the column holds ciphertext, never the plaintext.
    const row = db.prepare("SELECT password FROM smtp_profiles WHERE id = ?").get(created.id) as {
      password: string;
    };
    expect(row.password).not.toBe("hunter2");
    expect(isCiphertext(row.password)).toBe(true);

    // On read: the plaintext comes back to the service.
    const fetched = await use(layer, (r) => r.getSmtpProfile(created.id));
    expect(Option.isSome(fetched) ? fetched.value.password : null).toBe("hunter2");
    db.close();
  });

  it("stores the inline override blob encrypted and decrypts it on read", async () => {
    const db = openDatabase(join(tempDir(), "test.db"));
    const layer = SqliteRepo.Live(db, fakeCrypto("f"));

    const template = await use(layer, (r) =>
      r.insertTemplate({
        name: "LOA",
        filePath: join(tempDir(), "template.docx"),
        type: "docx",
        slots: ["name"],
        outputPattern: "LOA_{name}.pdf",
        slotLayout: {},
      }),
    );
    const generateJobId = await use(layer, (r) => r.insertGenerateJob({ templateId: template.id, templateColumn: null, templateAssignmentJson: null, outputPattern: null }));
    const jobId = await use(layer, (r) =>
      r.insertSendJob({
        generateJobId,
        smtpProfileId: null,
        smtpOverrideJson: JSON.stringify({
          host: "127.0.0.1",
          port: 587,
          username: "me",
          password: "secret",
        }),
        subject: "Undangan",
        bodyHtml: "<p>body</p>",
        senderName: "Yayasan X",
        senderAddress: "iym@example.org",
        replyTo: null,
        delayMs: 1000,
        totalCount: 0,
      }),
    );

    // At rest: the whole override blob is ciphertext; the password and
    // even the host are not readable from the database file.
    const row = db.prepare("SELECT smtp_override FROM send_jobs WHERE id = ?").get(jobId) as {
      smtp_override: string;
    };
    expect(row.smtp_override).not.toContain("secret");
    expect(row.smtp_override).not.toContain("127.0.0.1");
    expect(isCiphertext(row.smtp_override)).toBe(true);

    // On read: the pipeline sees the plaintext JSON exactly as before.
    const loaded = await use(layer, (r) => r.getSendJob(jobId));
    const overrideJson = Option.isSome(loaded) ? loaded.value.job.smtpOverrideJson : null;
    expect(overrideJson).toBe(
      JSON.stringify({ host: "127.0.0.1", port: 587, username: "me", password: "secret" }),
    );
    db.close();
  });

  it("keeps the stored password when an update patches with null", async () => {
    const db = openDatabase(join(tempDir(), "test.db"));
    const layer = SqliteRepo.Live(db, fakeCrypto("f"));

    const created = await use(layer, (r) =>
      r.insertSmtpProfile({
        name: "Gmail",
        host: "smtp.gmail.com",
        port: 587,
        username: "me@gmail.com",
        password: "hunter2",
        senderName: null,
        senderAddress: null,
        replyTo: null,
      }),
    );
    const updated = await use(layer, (r) =>
      r.updateSmtpProfile(created.id, {
        name: "Gmail",
        host: "smtp.gmail.com",
        port: 587,
        username: "me@gmail.com",
        password: null,
        senderName: null,
        senderAddress: null,
        replyTo: null,
      }),
    );
    expect(Option.isSome(updated) ? updated.value.password : null).toBe("hunter2");

    // The stored ciphertext is untouched by the null-password update.
    const row = db.prepare("SELECT password FROM smtp_profiles WHERE id = ?").get(created.id) as {
      password: string;
    };
    expect(row.password).not.toBe("hunter2");
    expect(isCiphertext(row.password)).toBe(true);
    db.close();
  });

  it("reads an unreadable ciphertext value as an unset password", async () => {
    const db = openDatabase(join(tempDir(), "test.db"));
    const layer = SqliteRepo.Live(db, fakeCrypto("f"));
    // A ciphertext blob this fake's key cannot open (e.g. the database
    // moved machines): the read must not hand the bytes to SMTP as the
    // password - the service sees an empty one and prompts to re-enter.
    db.prepare(
      `INSERT INTO smtp_profiles (id, name, host, port, username, password)
       VALUES ('p1', 'Gmail', 'smtp.gmail.com', 587, 'me@gmail.com', ?)`,
    ).run(`${CIPHERTEXT_PREFIX}${Buffer.from("from-another-keychain").toString("base64")}`);

    const fetched = await use(layer, (r) => r.getSmtpProfile("p1"));
    expect(Option.isSome(fetched) ? fetched.value.password : null).toBe("");
    db.close();
  });
});

/** The stored values of every profile password and override blob. */
function storedValues(db: Database.Database): { profiles: string[]; overrides: string[] } {
  return {
    profiles: (
      db.prepare("SELECT password FROM smtp_profiles ORDER BY rowid").all() as {
        password: string;
      }[]
    ).map((row) => row.password),
    overrides: (
      db
        .prepare(
          "SELECT smtp_override FROM send_jobs WHERE smtp_override IS NOT NULL ORDER BY rowid",
        )
        .all() as { smtp_override: string }[]
    ).map((row) => row.smtp_override),
  };
}

describe("migrateCredentialsAtRest (ticket 02)", () => {
  it("encrypts legacy plaintext values in place, leaving ciphertext untouched", () => {
    const db = openDatabase(join(tempDir(), "test.db"));
    // The `mk` marker tells which values this fake encrypted - the
    // migration's own rewrites vs the pre-seeded ciphertext rows.
    const crypto = fakeCrypto("mk");
    const insert = db.prepare(
      `INSERT INTO smtp_profiles (id, name, host, port, username, password)
       VALUES (?, 'Gmail', 'smtp.gmail.com', 587, 'me@gmail.com', ?)`,
    );
    insert.run("plain", "hunter2");
    insert.run(
      "already",
      `${CIPHERTEXT_PREFIX}${Buffer.from("mk<already-secret>").toString("base64")}`,
    );
    insert.run(
      "other-key",
      `${CIPHERTEXT_PREFIX}${Buffer.from("from-another-keychain").toString("base64")}`,
    );
    const jobInsert = db.prepare(
      `INSERT INTO send_jobs (id, status, smtp_override, subject, body_html, sender_name, sender_address, total_count)
       VALUES (?, 'pending', ?, 'S', '<p>B</p>', 'N', 'n@x.y', 0)`,
    );
    jobInsert.run("job-plain", JSON.stringify({ host: "127.0.0.1", password: "secret" }));
    jobInsert.run(
      "job-enc",
      `${CIPHERTEXT_PREFIX}${Buffer.from('mk<{"host":"x"}>').toString("base64")}`,
    );

    const log = vi.fn();
    migrateCredentialsAtRest(db, crypto, log);

    const { profiles, overrides } = storedValues(db);
    // The legacy plaintext became ciphertext; both ciphertext rows were
    // left as-is (idempotence across relaunches).
    expect(profiles[0]).toBe(crypto.store("hunter2"));
    expect(isCiphertext(profiles[1])).toBe(true);
    expect(profiles[2]).toBe(
      `${CIPHERTEXT_PREFIX}${Buffer.from("from-another-keychain").toString("base64")}`,
    );
    expect(overrides[0]).toBe(
      crypto.store(JSON.stringify({ host: "127.0.0.1", password: "secret" })),
    );
    expect(overrides[1]).toBe(
      `${CIPHERTEXT_PREFIX}${Buffer.from('mk<{"host":"x"}>').toString("base64")}`,
    );
    expect(log).toHaveBeenCalledWith(
      expect.stringContaining("migrated 1 profile password(s) and 1 inline override(s)"),
    );

    // Second run: nothing left to migrate, no rewrite log.
    log.mockClear();
    migrateCredentialsAtRest(db, crypto, log);
    expect(log).not.toHaveBeenCalled();
    db.close();
  });

  it("skips with a clear log when the keychain is unavailable", () => {
    const db = openDatabase(join(tempDir(), "test.db"));
    db.prepare(
      `INSERT INTO smtp_profiles (id, name, host, port, username, password)
       VALUES ('p1', 'Gmail', 'smtp.gmail.com', 587, 'me@gmail.com', 'hunter2')`,
    ).run();
    const log = vi.fn();
    migrateCredentialsAtRest(
      db,
      makeCredentialCrypto(null, () => {}),
      log,
    );
    expect(storedValues(db).profiles).toEqual(["hunter2"]);
    expect(log).toHaveBeenCalledWith(expect.stringContaining("safeStorage unavailable"));
    db.close();
  });
});

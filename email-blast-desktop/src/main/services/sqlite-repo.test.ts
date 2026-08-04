import { describe, expect, it } from "vitest";
import { Effect, Layer, Option } from "effect";
import type { DatabaseSync } from "node:sqlite";
import { join } from "path";
import type { SendJobStatus } from "../../shared/ipc";
import { openDatabase, SqliteRepo, type SqliteRepoShape } from "./sqlite-repo";
import { tempDir } from "./test-helpers";

/**
 * Seam A (spec Testing Decisions): SqliteRepo against a temp database file.
 * The full schema comes from spec decision 7.
 */

const ALL_TABLES = [
  "recipients",
  "templates",
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
    const layer = SqliteRepo.Live(db);

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
    const layer = SqliteRepo.Live(db);

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
    const layer1 = SqliteRepo.Live(db1);

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
});

describe("send job log queries (ticket 16)", () => {
  /**
   * Seeds one send job: its template + generate job, the recipients with
   * their outcomes, and the job status. The creation stamp can be
   * overridden so the date-range filter is testable.
   */
  async function seedSendJob(
    db: DatabaseSync,
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
      }),
    );
    const generateJobId = await use(layer, (r) => r.insertGenerateJob(template.id));
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
    const layer = SqliteRepo.Live(db);
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
    const layer = SqliteRepo.Live(db);
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
    const layer = SqliteRepo.Live(db);
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

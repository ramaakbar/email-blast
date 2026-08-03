import { describe, expect, it } from "vitest";
import { Effect, Layer, Option } from "effect";
import { join } from "path";
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

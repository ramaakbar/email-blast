import { describe, expect, it } from "vitest";
import { Effect, Layer, Option } from "effect";
import { join } from "path";
import { openDatabase, SqliteRepo, type RecipientDraft } from "../db/repository";
import { RecipientsService, type RecipientsServiceShape } from "./recipients";
import { makeCredentialCrypto } from "./credential-crypto";
import { tempDir } from "./test-helpers";

/**
 * Seam A (spec Testing Decisions): the recipients queries against a real
 * Effect Layer on a temp database. Rows are seeded through the repository's
 * own insert path, so the tests exercise the real storage shape.
 */

/** Runs an Effect program that borrows the RecipientsService from its layer. */
function use<A, E>(
  layer: Layer.Layer<RecipientsService | SqliteRepo>,
  f: (service: RecipientsServiceShape) => Effect.Effect<A, E, never>,
): Promise<A> {
  return Effect.runPromise(
    Effect.gen(function* () {
      return yield* f(yield* RecipientsService);
    }).pipe(Effect.provide(layer)),
  );
}

/** Seeds recipients through the repository (the same layer provides it). */
function seed(
  layer: Layer.Layer<RecipientsService | SqliteRepo>,
  drafts: RecipientDraft[],
): Promise<void> {
  return Effect.runPromise(
    Effect.gen(function* () {
      const repo = yield* SqliteRepo;
      yield* repo.insertRecipients(drafts);
    }).pipe(Effect.provide(layer)),
  );
}

/** Two import batches used across the suite. */
const BATCH_A = "11111111-1111-4111-8111-111111111111";
const BATCH_B = "22222222-2222-4222-8222-222222222222";

const SAMPLE_DRAFTS: RecipientDraft[] = [
  {
    name: "Alice",
    email: "alice@example.com",
    phone: "0812",
    metadata: { instansi: "Kampus A" },
    importBatch: BATCH_A,
  },
  { name: "Bob", email: "bob@example.com", phone: null, metadata: {}, importBatch: BATCH_A },
  {
    name: "Carol",
    email: null,
    phone: "0821",
    metadata: { instansi: "Kampus B" },
    importBatch: BATCH_A,
  },
  {
    name: "Dana",
    email: "dana@example.com",
    phone: null,
    metadata: { instansi: "Kampus B" },
    importBatch: BATCH_B,
  },
  { name: "Eve", email: "eve@example.com", phone: null, metadata: {}, importBatch: BATCH_B },
];

describe("RecipientsService get (Seam A)", () => {
  it("returns the full recipient for an existing id", async () => {
    const db = openDatabase(join(tempDir(), "recipients.db"));
    const layer = RecipientsService.Live(db, makeCredentialCrypto(null, () => {}));
    await seed(layer, SAMPLE_DRAFTS);

    const listed = await use(layer, (s) =>
      s.list({ search: "carol", importBatch: null, page: 1, pageSize: 25 }),
    );
    const carol = listed.items[0];
    expect(carol).toBeDefined();

    const fetched = await use(layer, (s) => s.get(carol.id));
    expect(fetched).toEqual(Option.some(carol));
    expect(fetched.pipe(Option.map((r) => r.metadata))).toEqual(
      Option.some({ instansi: "Kampus B" }),
    );
    db.close();
  });

  it("returns none for an unknown id", async () => {
    const db = openDatabase(join(tempDir(), "recipients.db"));
    const layer = RecipientsService.Live(db, makeCredentialCrypto(null, () => {}));
    await seed(layer, SAMPLE_DRAFTS);

    await expect(use(layer, (s) => s.get("no-such-id"))).resolves.toEqual(Option.none());
    db.close();
  });
});

describe("RecipientsService delete (Seam A)", () => {
  it("deletes the given ids, returns the count, and shrinks list totals", async () => {
    const db = openDatabase(join(tempDir(), "recipients.db"));
    const layer = RecipientsService.Live(db, makeCredentialCrypto(null, () => {}));
    await seed(layer, SAMPLE_DRAFTS);

    const page = await use(layer, (s) =>
      s.list({ search: null, importBatch: null, page: 1, pageSize: 25 }),
    );
    const [alice, bob] = page.items.filter((r) => ["Alice", "Bob"].includes(r.name));

    const deleted = await use(layer, (s) => s.delete([alice.id, bob.id, "no-such-id"]));
    expect(deleted).toBe(2);

    const after = await use(layer, (s) =>
      s.list({ search: null, importBatch: null, page: 1, pageSize: 25 }),
    );
    expect(after.total).toBe(3);
    expect(after.items.map((r) => r.name).toSorted()).toEqual(["Carol", "Dana", "Eve"]);

    // Deleting the same ids again removes nothing.
    await expect(use(layer, (s) => s.delete([alice.id, bob.id]))).resolves.toBe(0);
    db.close();
  });

  it("deletes nothing for an empty id list", async () => {
    const db = openDatabase(join(tempDir(), "recipients.db"));
    const layer = RecipientsService.Live(db, makeCredentialCrypto(null, () => {}));
    await seed(layer, SAMPLE_DRAFTS);

    await expect(use(layer, (s) => s.delete([]))).resolves.toBe(0);
    const after = await use(layer, (s) =>
      s.list({ search: null, importBatch: null, page: 1, pageSize: 25 }),
    );
    expect(after.total).toBe(5);
    db.close();
  });
});

describe("RecipientsService listBatches (Seam A)", () => {
  it("returns every import batch with its size and stamp, newest first", async () => {
    const db = openDatabase(join(tempDir(), "recipients.db"));
    const layer = RecipientsService.Live(db, makeCredentialCrypto(null, () => {}));
    await seed(layer, SAMPLE_DRAFTS);

    const batches = await use(layer, (s) => s.listBatches());
    expect(batches).toHaveLength(2);
    const counts = batches.map((b) => b.count).toSorted((a, b) => a - b);
    expect(counts).toEqual([2, 3]);
    for (const batch of batches) {
      expect(batch.createdAt).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    }
    // The two seeded batches land in the same second, so order is by id:
    // BATCH_A (3 recipients) sorts before BATCH_B (2).
    const byId = [...batches].toSorted((a, b) => (a.id < b.id ? -1 : 1));
    expect(byId.map((b) => b.count)).toEqual([3, 2]);
    db.close();
  });

  it("returns an empty list for an empty database", async () => {
    const db = openDatabase(join(tempDir(), "recipients.db"));
    const layer = RecipientsService.Live(db, makeCredentialCrypto(null, () => {}));

    await expect(use(layer, (s) => s.listBatches())).resolves.toEqual([]);
    db.close();
  });
});

describe("RecipientsService list (Seam A)", () => {
  it("returns an empty page for an empty database", async () => {
    const db = openDatabase(join(tempDir(), "recipients.db"));
    const layer = RecipientsService.Live(db, makeCredentialCrypto(null, () => {}));

    const page = await use(layer, (s) =>
      s.list({ search: null, importBatch: null, page: 1, pageSize: 25 }),
    );
    expect(page).toEqual({ items: [], total: 0, page: 1, pageSize: 25 });
    db.close();
  });

  it("paginates a seeded batch with the total across all matches", async () => {
    const db = openDatabase(join(tempDir(), "recipients.db"));
    const layer = RecipientsService.Live(db, makeCredentialCrypto(null, () => {}));
    await seed(layer, SAMPLE_DRAFTS);

    const first = await use(layer, (s) =>
      s.list({ search: null, importBatch: null, page: 1, pageSize: 2 }),
    );
    expect(first.total).toBe(5);
    // Same-second inserts share a stamp, so within a page the name order is the tiebreak.
    expect(first.items.map((r) => r.name)).toEqual(["Alice", "Bob"]);

    const last = await use(layer, (s) =>
      s.list({ search: null, importBatch: null, page: 3, pageSize: 2 }),
    );
    expect(last.items.map((r) => r.name)).toEqual(["Eve"]);
    expect(last.total).toBe(5);

    const beyond = await use(layer, (s) =>
      s.list({ search: null, importBatch: null, page: 9, pageSize: 2 }),
    );
    expect(beyond.items).toEqual([]);
    expect(beyond.total).toBe(5);
    db.close();
  });

  it("searches case-insensitively across name, email, phone, and metadata values", async () => {
    const db = openDatabase(join(tempDir(), "recipients.db"));
    const layer = RecipientsService.Live(db, makeCredentialCrypto(null, () => {}));
    await seed(layer, SAMPLE_DRAFTS);

    const byName = await use(layer, (s) =>
      s.list({ search: "bob", importBatch: null, page: 1, pageSize: 25 }),
    );
    expect(byName.items.map((r) => r.name)).toEqual(["Bob"]);

    const byEmail = await use(layer, (s) =>
      s.list({ search: "EXAMPLE.COM", importBatch: null, page: 1, pageSize: 25 }),
    );
    expect(byEmail.total).toBe(4);

    const byPhone = await use(layer, (s) =>
      s.list({ search: "0821", importBatch: null, page: 1, pageSize: 25 }),
    );
    expect(byPhone.items.map((r) => r.name)).toEqual(["Carol"]);

    // Custom-field values are searchable through the metadata bag.
    const byMetadata = await use(layer, (s) =>
      s.list({ search: "kampus", importBatch: null, page: 1, pageSize: 25 }),
    );
    expect(byMetadata.items.map((r) => r.name).toSorted()).toEqual(["Alice", "Carol", "Dana"]);
    db.close();
  });

  it("matches LIKE wildcards literally in the search text", async () => {
    const db = openDatabase(join(tempDir(), "recipients.db"));
    const layer = RecipientsService.Live(db, makeCredentialCrypto(null, () => {}));
    await seed(layer, [
      {
        name: "Grant",
        email: "grant@example.com",
        phone: null,
        metadata: { status: "100% funded" },
        importBatch: BATCH_A,
      },
      { name: "Hana", email: "hana@example.com", phone: null, metadata: {}, importBatch: BATCH_A },
    ]);

    const percent = await use(layer, (s) =>
      s.list({ search: "100%", importBatch: null, page: 1, pageSize: 25 }),
    );
    expect(percent.items.map((r) => r.name)).toEqual(["Grant"]);

    const underscore = await use(layer, (s) =>
      s.list({ search: "_", importBatch: null, page: 1, pageSize: 25 }),
    );
    expect(underscore.total).toBe(0);
    db.close();
  });

  it("filters by import batch and combines with search", async () => {
    const db = openDatabase(join(tempDir(), "recipients.db"));
    const layer = RecipientsService.Live(db, makeCredentialCrypto(null, () => {}));
    await seed(layer, SAMPLE_DRAFTS);

    const batchB = await use(layer, (s) =>
      s.list({ search: null, importBatch: BATCH_B, page: 1, pageSize: 25 }),
    );
    expect(batchB.items.map((r) => r.name)).toEqual(["Dana", "Eve"]);
    expect(batchB.total).toBe(2);

    const combined = await use(layer, (s) =>
      s.list({ search: "kampus", importBatch: BATCH_B, page: 1, pageSize: 25 }),
    );
    expect(combined.items.map((r) => r.name)).toEqual(["Dana"]);
    db.close();
  });

  it("round-trips the full recipient shape, metadata bag included", async () => {
    const db = openDatabase(join(tempDir(), "recipients.db"));
    const layer = RecipientsService.Live(db, makeCredentialCrypto(null, () => {}));
    await seed(layer, SAMPLE_DRAFTS);

    const page = await use(layer, (s) =>
      s.list({ search: null, importBatch: null, page: 1, pageSize: 25 }),
    );
    const alice = page.items.find((r) => r.name === "Alice");
    expect(alice).toMatchObject({
      id: expect.stringMatching(/^[0-9a-f-]{36}$/),
      name: "Alice",
      email: "alice@example.com",
      phone: "0812",
      metadata: { instansi: "Kampus A" },
      importBatch: BATCH_A,
      createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
    });
    db.close();
  });
});

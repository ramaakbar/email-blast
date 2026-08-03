import { describe, expect, it } from "vitest";
import { Effect, Layer } from "effect";
import { writeFileSync } from "fs";
import { join } from "path";
import * as XLSX from "@e965/xlsx";
import { openDatabase } from "./sqlite-repo";
import { ImportService, UnreadableExcel, type ImportServiceShape } from "./import";
import { tempDir } from "./test-helpers";
import type { ColumnMapping, ExcelRow } from "../../shared/ipc";

/**
 * Seam A (spec Testing Decisions): the import pipeline against a real
 * Effect Layer on a temp database. Fixture spreadsheets are generated with
 * the same xlsx engine the pipeline reads, so the tests exercise the real
 * parse path end to end.
 */

/** Writes a workbook whose first row is the header row. */
function writeWorkbook(filePath: string, rows: (string | number | boolean | null)[][]): void {
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, "Recipients");
  // XLSX.writeFile falls into the browser save path in the ESM build;
  // generate the bytes here and write them with fs instead.
  const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  writeFileSync(filePath, buffer);
}

/** Runs an Effect program that borrows the ImportService from its layer. */
function use<A, E>(
  layer: Layer.Layer<ImportService>,
  f: (service: ImportServiceShape) => Effect.Effect<A, E, never>,
): Promise<A> {
  return Effect.runPromise(
    Effect.gen(function* () {
      return yield* f(yield* ImportService);
    }).pipe(Effect.provide(layer)),
  );
}

describe("ImportService read (Seam A)", () => {
  it("parses a fixture spreadsheet into rows, recipients, and a mapping suggestion", async () => {
    const file = join(tempDir(), "recipients.xlsx");
    writeWorkbook(file, [
      ["Name", "Email", "Phone", "Instansi", "Keterangan"],
      ["Alice", "alice@example.com", "0812 3456", "Kampus A", "fully funded"],
      ["Bob", "bob@example.com", 8123456, "Kampus B", "special funded"],
      ["Carol", "carol@example.com", "", "Kampus C", ""],
    ]);
    const db = openDatabase(join(tempDir(), "import.db"));
    const layer = ImportService.Live(db);

    const preview = await use(layer, (s) => s.read(file));
    expect(preview.columns).toEqual(["Name", "Email", "Phone", "Instansi", "Keterangan"]);
    expect(preview.rows).toHaveLength(3);
    // Numeric cells are coerced to their formatted string.
    expect(preview.rows[1]).toMatchObject({ Phone: "8123456" });
    expect(preview.suggestedMapping).toEqual({
      Name: "name",
      Email: "email",
      Phone: "phone",
      Instansi: "metadata",
      Keterangan: "metadata",
    });
    expect(preview.recipients).toEqual([
      {
        name: "Alice",
        email: "alice@example.com",
        phone: "0812 3456",
        metadata: { Instansi: "Kampus A", Keterangan: "fully funded" },
      },
      {
        name: "Bob",
        email: "bob@example.com",
        phone: "8123456",
        metadata: { Instansi: "Kampus B", Keterangan: "special funded" },
      },
      {
        name: "Carol",
        email: "carol@example.com",
        phone: null,
        metadata: { Instansi: "Kampus C" },
      },
    ]);
    expect(preview.skippedDuplicates).toBe(0);
    expect(preview.warnings).toEqual([]);
    db.close();
  });

  it("suggests header synonyms case-insensitively, one column per role", async () => {
    const file = join(tempDir(), "synonyms.xlsx");
    writeWorkbook(file, [
      ["nama", "Alamat Email", "No HP", "WA", "Instansi"],
      ["Alice", "alice@example.com", "0811", "0811", "Kampus A"],
    ]);
    const db = openDatabase(join(tempDir(), "import.db"));
    const layer = ImportService.Live(db);

    const preview = await use(layer, (s) => s.read(file));
    expect(preview.suggestedMapping).toEqual({
      nama: "name",
      "Alamat Email": "email",
      "No HP": "phone",
      WA: "metadata",
      Instansi: "metadata",
    });
    db.close();
  });

  it("dedupes rows by lowercased email, keeping the first occurrence", async () => {
    const file = join(tempDir(), "dupes.xlsx");
    writeWorkbook(file, [
      ["Name", "Email"],
      ["Alice", "alice@example.com"],
      ["Alice Again", "ALICE@example.com"],
      ["Bob", "bob@example.com"],
      ["Carol", ""],
    ]);
    const db = openDatabase(join(tempDir(), "import.db"));
    const layer = ImportService.Live(db);

    const preview = await use(layer, (s) => s.read(file));
    expect(preview.skippedDuplicates).toBe(1);
    expect(preview.recipients.map((r) => r.name)).toEqual(["Alice", "Bob", "Carol"]);
    // The empty-email row is kept but never a duplicate candidate.
    expect(preview.recipients[2].email).toBeNull();
    db.close();
  });

  it("warns when no name or email column is recognizable but still parses the rows", async () => {
    const file = join(tempDir(), "opaque.xlsx");
    writeWorkbook(file, [
      ["Col A", "Col B"],
      ["x", "y"],
    ]);
    const db = openDatabase(join(tempDir(), "import.db"));
    const layer = ImportService.Live(db);

    const preview = await use(layer, (s) => s.read(file));
    expect(preview.warnings.some((w) => w.includes("name"))).toBe(true);
    expect(preview.warnings.some((w) => w.includes("email"))).toBe(true);
    expect(preview.suggestedMapping).toEqual({ "Col A": "metadata", "Col B": "metadata" });
    expect(preview.rows).toHaveLength(1);
    expect(preview.recipients).toHaveLength(0);
    db.close();
  });

  it("drops rows with an empty name and reports them in warnings", async () => {
    const file = join(tempDir(), "noname.xlsx");
    writeWorkbook(file, [
      ["Name", "Email"],
      ["", "ghost@example.com"],
      ["Alice", "alice@example.com"],
    ]);
    const db = openDatabase(join(tempDir(), "import.db"));
    const layer = ImportService.Live(db);

    const preview = await use(layer, (s) => s.read(file));
    expect(preview.recipients.map((r) => r.name)).toEqual(["Alice"]);
    expect(preview.warnings.some((w) => w.includes("1 row"))).toBe(true);
    db.close();
  });

  it("fails with a typed error on a missing file", async () => {
    const db = openDatabase(join(tempDir(), "import.db"));
    const layer = ImportService.Live(db);

    const error = await use(layer, (s) => s.read(join(tempDir(), "nope.xlsx"))).catch(
      (e: unknown) => e,
    );
    expect(error).toBeInstanceOf(UnreadableExcel);
    db.close();
  });

  it("fails with a typed error on a non-Excel file", async () => {
    const notExcel = join(tempDir(), "notes.txt");
    writeFileSync(notExcel, "just some text");
    const db = openDatabase(join(tempDir(), "import.db"));
    const layer = ImportService.Live(db);

    const error = await use(layer, (s) => s.read(notExcel)).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(UnreadableExcel);
    db.close();
  });

  it("keeps the first column and warns when headers collide after trimming", async () => {
    const file = join(tempDir(), "collision.xlsx");
    writeWorkbook(file, [
      ["Nama", "Nama ", "Email"],
      ["Alice", "Bob", "alice@example.com"],
    ]);
    const db = openDatabase(join(tempDir(), "import.db"));
    const layer = ImportService.Live(db);

    const preview = await use(layer, (s) => s.read(file));
    expect(preview.columns).toEqual(["Nama", "Email"]);
    // The second "Nama " column is dropped; the first occurrence's value wins.
    expect(preview.rows).toEqual([{ Nama: "Alice", Email: "alice@example.com" }]);
    expect(preview.warnings.some((w) => w.includes('"Nama" appear more than once'))).toBe(true);
    expect(preview.recipients).toEqual([
      { name: "Alice", email: "alice@example.com", phone: null, metadata: {} },
    ]);
    db.close();
  });
});

describe("ImportService commit (Seam A)", () => {
  it("persists recipients as one import batch with their metadata bag", async () => {
    const db = openDatabase(join(tempDir(), "import.db"));
    const layer = ImportService.Live(db);

    const rows: ExcelRow[] = [
      { Name: "Alice", Email: "alice@example.com", Instansi: "Kampus A" },
      { Name: "Bob", Email: "bob@example.com", Instansi: "Kampus B" },
      { Name: "Carol", Email: "carol@example.com", Instansi: "" },
    ];
    const mapping: ColumnMapping = {
      Name: "name",
      Email: "email",
      Instansi: "metadata",
    };

    const result = await use(layer, (s) => s.commit(rows, mapping));
    expect(result.imported).toBe(3);
    expect(result.duplicatesSkipped).toBe(0);
    expect(result.batchId).toMatch(/^[0-9a-f-]{36}$/);

    const stored = db
      .prepare("SELECT name, email, phone, metadata, import_batch FROM recipients ORDER BY name")
      .all() as {
      name: string;
      email: string;
      phone: string | null;
      metadata: string;
      import_batch: string;
    }[];
    expect(stored).toHaveLength(3);
    for (const row of stored) expect(row.import_batch).toBe(result.batchId);
    expect(stored[0]).toMatchObject({
      name: "Alice",
      email: "alice@example.com",
      phone: null,
      metadata: '{"Instansi":"Kampus A"}',
    });
    // Empty metadata values are not stored.
    expect(JSON.parse(stored[2].metadata)).toEqual({});
    db.close();
  });

  it("applies the user's overridden mapping, not the suggestion", async () => {
    const db = openDatabase(join(tempDir(), "import.db"));
    const layer = ImportService.Live(db);

    const rows: ExcelRow[] = [
      { Person: "Alice", Mail: "alice@example.com" },
      { Person: "Bob", Mail: "bob@example.com" },
    ];
    const mapping: ColumnMapping = { Person: "name", Mail: "email" };

    const result = await use(layer, (s) => s.commit(rows, mapping));
    expect(result.imported).toBe(2);

    const stored = db.prepare("SELECT name, email FROM recipients ORDER BY name").all() as {
      name: string;
      email: string;
    }[];
    expect(stored[0]).toEqual({ name: "Alice", email: "alice@example.com" });
    db.close();
  });

  it("skips duplicates within the batch and against existing recipients", async () => {
    const db = openDatabase(join(tempDir(), "import.db"));
    const layer = ImportService.Live(db);

    const rows: ExcelRow[] = [
      { Name: "Alice", Email: "alice@example.com" },
      { Name: "Bob", Email: "bob@example.com" },
    ];
    const mapping: ColumnMapping = { Name: "name", Email: "email" };

    const first = await use(layer, (s) => s.commit(rows, mapping));
    expect(first.imported).toBe(2);

    // Re-import: both already exist, plus a duplicate within the batch itself.
    const second = await use(layer, (s) =>
      s.commit(
        [
          { Name: "Alice", Email: "ALICE@example.com" },
          { Name: "Carol", Email: "carol@example.com" },
          { Name: "Carol Again", Email: "carol@example.com" },
        ],
        mapping,
      ),
    );
    // Alice exists in the DB; Carol Again duplicates Carol within the batch.
    expect(second.imported).toBe(1);
    expect(second.duplicatesSkipped).toBe(2);

    const count = db.prepare("SELECT COUNT(*) AS n FROM recipients").get() as { n: number };
    expect(count.n).toBe(3);
    db.close();
  });

  it("commits nothing when no column is mapped to name", async () => {
    const db = openDatabase(join(tempDir(), "import.db"));
    const layer = ImportService.Live(db);

    const result = await use(layer, (s) =>
      s.commit([{ A: "x", B: "y@example.com" }], { A: "metadata", B: "email" }),
    );
    expect(result).toEqual({
      imported: 0,
      duplicatesSkipped: 0,
      rowsSkippedNoName: 1,
      batchId: expect.any(String),
    });

    const count = db.prepare("SELECT COUNT(*) AS n FROM recipients").get() as { n: number };
    expect(count.n).toBe(0);
    db.close();
  });

  it("reports rows whose name is empty under the final mapping", async () => {
    const db = openDatabase(join(tempDir(), "import.db"));
    const layer = ImportService.Live(db);

    const result = await use(layer, (s) =>
      s.commit(
        [
          { Name: "Alice", Email: "alice@example.com" },
          { Name: "", Email: "ghost@example.com" },
        ],
        { Name: "name", Email: "email" },
      ),
    );
    expect(result).toEqual({
      imported: 1,
      duplicatesSkipped: 0,
      rowsSkippedNoName: 1,
      batchId: expect.any(String),
    });
    db.close();
  });

  it("stores skip-mapped columns nowhere, not even metadata", async () => {
    const db = openDatabase(join(tempDir(), "import.db"));
    const layer = ImportService.Live(db);

    const result = await use(layer, (s) =>
      s.commit([{ Name: "Alice", Email: "alice@example.com", Keterangan: "secret" }], {
        Name: "name",
        Email: "email",
        Keterangan: "skip",
      }),
    );
    expect(result.imported).toBe(1);

    const stored = db.prepare("SELECT metadata FROM recipients WHERE name = ?").get("Alice") as {
      metadata: string;
    };
    expect(JSON.parse(stored.metadata)).toEqual({});
    db.close();
  });

  it("persists a second import as its own batch", async () => {
    const db = openDatabase(join(tempDir(), "import.db"));
    const layer = ImportService.Live(db);
    const mapping: ColumnMapping = { Name: "name", Email: "email" };

    const first = await use(layer, (s) =>
      s.commit([{ Name: "Alice", Email: "alice@example.com" }], mapping),
    );
    const second = await use(layer, (s) =>
      s.commit([{ Name: "Dana", Email: "dana@example.com" }], mapping),
    );
    expect(first.batchId).not.toBe(second.batchId);

    const batches = db
      .prepare("SELECT DISTINCT import_batch FROM recipients ORDER BY import_batch")
      .all() as { import_batch: string }[];
    expect(batches).toHaveLength(2);
    db.close();
  });
});

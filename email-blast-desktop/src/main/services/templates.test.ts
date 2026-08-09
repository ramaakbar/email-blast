import { describe, expect, it } from "vitest";
import { Effect, Layer, Option } from "effect";
import { writeFileSync } from "fs";
import { join } from "path";
import { openDatabase, SqliteRepo } from "../db/repository";
import { TemplatesService, scanDocxSlots, type TemplatesServiceShape } from "./templates";
import { makeCredentialCrypto } from "./credential-crypto";
import { normalizeSlots, patternSlots, validateTemplate } from "../../shared/template-validation";
import { tempDir, writeFixture } from "./test-helpers";

/**
 * Seam A (spec Testing Decisions): the templates domain against a real
 * Effect Layer on a temp database, with slot scanning exercised on real
 * DOCX files built by a fixture builder (a minimal-but-valid docx zip
 * with a document part and optional header/footer parts).
 */

/** Runs an Effect program that borrows the TemplatesService from its layer. */
function use<A, E>(
  layer: Layer.Layer<TemplatesService | SqliteRepo>,
  f: (service: TemplatesServiceShape) => Effect.Effect<A, E, never>,
): Promise<A> {
  return Effect.runPromise(
    Effect.gen(function* () {
      return yield* f(yield* TemplatesService);
    }).pipe(Effect.provide(layer)),
  );
}

function templateLayer(): Layer.Layer<TemplatesService | SqliteRepo> {
  return TemplatesService.Live(
    openDatabase(join(tempDir(), "templates.db")),
    makeCredentialCrypto(null, () => {}),
  );
}

const P_LOA = `<w:p><w:r><w:t>Dear {name}, no {no}</w:t></w:r></w:p>`;

describe("scanDocxSlots (Seam A)", () => {
  it("returns the declared slots of a fixture docx in document order", () => {
    const path = writeFixture(P_LOA);
    expect(scanDocxSlots(path)).toEqual(["name", "no"]);
  });

  it("spans document, header, and footer, deduped by first appearance", () => {
    const path = writeFixture(P_LOA, {
      headerXml: `<w:p><w:r><w:t>Instansi {instansi}</w:t></w:r></w:p>`,
    });
    // {no} appears again in the footer but keeps its document position.
    const withFooter = writeFixture(P_LOA, {
      headerXml: `<w:p><w:r><w:t>Instansi {instansi}</w:t></w:r></w:p>`,
      footerXml: `<w:p><w:r><w:t>Page {no} of {total}</w:t></w:r></w:p>`,
    });
    expect(scanDocxSlots(path)).toEqual(["name", "no", "instansi"]);
    expect(scanDocxSlots(withFooter)).toEqual(["name", "no", "instansi", "total"]);
  });

  it("joins tags that Word split across runs", () => {
    // Word splits a tag when the user edits inside it: "{na" in one run, "me}" in the next.
    const path = writeFixture(
      `<w:p><w:r><w:t>Dear {na</w:t></w:r><w:r><w:t>me}, no {no}</w:t></w:r></w:p>`,
    );
    expect(scanDocxSlots(path)).toEqual(["name", "no"]);
  });

  it("returns an empty list for a docx with no placeholders", () => {
    const path = writeFixture(`<w:p><w:r><w:t>Plain letter, no slots.</w:t></w:r></w:p>`);
    expect(scanDocxSlots(path)).toEqual([]);
  });
});

describe("TemplatesService scanSlots (Seam A)", () => {
  it("fails for non-docx extensions", async () => {
    const layer = templateLayer();
    await expect(
      use(layer, (s) => s.scanSlots(join(tempDir(), "photo.png"))),
    ).rejects.toMatchObject({ _tag: "UnreadableDocx" });
  });

  it("fails with a readable message for a corrupt file", async () => {
    const layer = templateLayer();
    const corrupt = join(tempDir(), "corrupt.docx");
    writeFileSync(corrupt, "this is not a zip file");
    await expect(use(layer, (s) => s.scanSlots(corrupt))).rejects.toMatchObject({
      _tag: "UnreadableDocx",
      message: expect.stringMatching(/corrupt\.docx/),
    });
  });

  it("scans a real docx file through the service layer", async () => {
    const layer = templateLayer();
    const path = writeFixture(P_LOA);
    await expect(use(layer, (s) => s.scanSlots(path))).resolves.toEqual(["name", "no"]);
  });
});

describe("TemplatesService create (Seam A)", () => {
  it("round-trips a template through list and get", async () => {
    const layer = templateLayer();
    const docxPath = writeFixture(P_LOA);

    const created = await use(layer, (s) =>
      s.create({
        name: "Surat LOA",
        filePath: docxPath,
        type: "docx",
        slots: ["name", "no"],
        outputPattern: "LOA_{no}_{name}.pdf",
        slotLayout: {},
      }),
    );
    expect(created).toMatchObject({
      id: expect.stringMatching(/^[0-9a-f-]{36}$/),
      name: "Surat LOA",
      filePath: docxPath,
      type: "docx",
      slots: ["name", "no"],
      outputPattern: "LOA_{no}_{name}.pdf",
      createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
    });

    const listed = await use(layer, (s) => s.list());
    expect(listed).toEqual([created]);

    const fetched = await use(layer, (s) => s.get(created.id));
    expect(fetched).toEqual(Option.some(created));
    await expect(use(layer, (s) => s.get("no-such-id"))).resolves.toEqual(Option.none());
  });

  it("normalizes slots and trims the name and pattern", async () => {
    const layer = templateLayer();
    const docxPath = writeFixture(P_LOA);

    const created = await use(layer, (s) =>
      s.create({
        name: "  Surat LOA  ",
        filePath: docxPath,
        type: "docx",
        slots: [" name ", "no", "name", "", "  "],
        outputPattern: "  LOA_{name}.pdf  ",
        slotLayout: {},
      }),
    );
    expect(created.name).toBe("Surat LOA");
    expect(created.slots).toEqual(["name", "no"]);
    expect(created.outputPattern).toBe("LOA_{name}.pdf");
  });

  it("rejects a pattern that references an undeclared slot", async () => {
    const layer = templateLayer();
    await expect(
      use(layer, (s) =>
        s.create({
          name: "Typo",
          filePath: writeFixture(P_LOA),
          type: "docx",
          slots: ["name"],
          outputPattern: "LOA_{naem}.pdf",
          slotLayout: {},
        }),
      ),
    ).rejects.toMatchObject({
      _tag: "InvalidTemplate",
      message: 'The output pattern references "{naem}", which is not one of the template\'s slots.',
    });
  });

  it("rejects a pattern without any slot reference", async () => {
    const layer = templateLayer();
    await expect(
      use(layer, (s) =>
        s.create({
          name: "No pattern",
          filePath: writeFixture(P_LOA),
          type: "docx",
          slots: ["name"],
          outputPattern: "letter.pdf",
          slotLayout: {},
        }),
      ),
    ).rejects.toMatchObject({ _tag: "InvalidTemplate" });
  });

  it("rejects an empty slot list and an empty name", async () => {
    const layer = templateLayer();
    await expect(
      use(layer, (s) =>
        s.create({
          name: "No slots",
          filePath: writeFixture(P_LOA),
          type: "docx",
          slots: ["", "  "],
          outputPattern: "LOA_{name}.pdf",
          slotLayout: {},
        }),
      ),
    ).rejects.toMatchObject({ _tag: "InvalidTemplate" });

    await expect(
      use(layer, (s) =>
        s.create({
          name: "  ",
          filePath: writeFixture(P_LOA),
          type: "docx",
          slots: ["name"],
          outputPattern: "LOA_{name}.pdf",
          slotLayout: {},
        }),
      ),
    ).rejects.toMatchObject({ _tag: "InvalidTemplate" });
  });

  it("creates an image template with manually entered slots", async () => {
    const layer = templateLayer();
    const created = await use(layer, (s) =>
      s.create({
        name: "Sertifikat",
        filePath: "/tmp/sertifikat.png",
        type: "image",
        slots: ["nama", "instansi"],
        outputPattern: "SERTIFIKAT_{nama}.pdf",
        slotLayout: {},
      }),
    );
    expect(created.type).toBe("image");
    expect(created.slots).toEqual(["nama", "instansi"]);
    const listed = await use(layer, (s) => s.list());
    expect(listed.map((t) => t.name)).toEqual(["Sertifikat"]);
  });

  it("persists a slot layout given at create time and rejects an invalid one", async () => {
    const layer = templateLayer();
    const layout = {
      nama: { x: 0, y: 150, fontSize: 40, color: "#1A2421", align: "center", maxWidth: null },
    } as const;
    const created = await use(layer, (s) =>
      s.create({
        name: "Sertifikat",
        filePath: "/tmp/sertifikat.png",
        type: "image",
        slots: ["nama"],
        outputPattern: "SERTIFIKAT_{nama}.pdf",
        slotLayout: layout,
      }),
    );
    expect(created.slotLayout).toEqual(layout);
    await expect(
      use(layer, (s) =>
        s.create({
          name: "Buat",
          filePath: "/tmp/sertifikat.png",
          type: "image",
          slots: ["nama"],
          outputPattern: "SERTIFIKAT_{nama}.pdf",
          slotLayout: {
            nama: { x: 0, y: 150, fontSize: 40, color: "red", align: "center", maxWidth: null },
          },
        }),
      ),
    ).rejects.toMatchObject({ _tag: "InvalidTemplate" });
  });
});

describe("TemplatesService update (Seam A)", () => {
  it("updates the name, slots, and pattern and persists them", async () => {
    const layer = templateLayer();
    const created = await use(layer, (s) =>
      s.create({
        name: "Old name",
        filePath: "/tmp/sertifikat.png",
        type: "image",
        slots: ["nama"],
        outputPattern: "SERTIFIKAT_{nama}.pdf",
        slotLayout: {},
      }),
    );

    const updated = await use(layer, (s) =>
      s.update(created.id, {
        name: "New name",
        slots: ["nama", "tahun"],
        outputPattern: "SERTIFIKAT_{tahun}_{nama}.pdf",
        slotLayout: {},
      }),
    );
    expect(updated).toMatchObject({
      id: created.id,
      name: "New name",
      slots: ["nama", "tahun"],
      outputPattern: "SERTIFIKAT_{tahun}_{nama}.pdf",
      filePath: "/tmp/sertifikat.png", // the file is immutable
    });

    const fetched = await use(layer, (s) => s.get(created.id));
    expect(fetched).toEqual(Option.some(updated));
  });

  it("fails with TemplateNotFound for an unknown id", async () => {
    const layer = templateLayer();
    await expect(
      use(layer, (s) =>
        s.update("no-such-id", {
          name: "X",
          slots: ["name"],
          outputPattern: "LOA_{name}.pdf",
          slotLayout: {},
        }),
      ),
    ).rejects.toMatchObject({ _tag: "TemplateUpdateNotFound" });
  });

  it("round-trips the slot layout through update and get (ticket 04)", async () => {
    const layer = templateLayer();
    const created = await use(layer, (s) =>
      s.create({
        name: "Sertifikat",
        filePath: "/tmp/sertifikat.png",
        type: "image",
        slots: ["nama", "instansi"],
        outputPattern: "SERTIFIKAT_{nama}.pdf",
        slotLayout: {},
      }),
    );
    expect(created.slotLayout).toEqual({});

    const layout = {
      nama: { x: 0, y: 150, fontSize: 40, color: "#1A2421", align: "center", maxWidth: null },
      instansi: { x: 20, y: 100, fontSize: 24, color: "#00AA00", align: "right", maxWidth: 120 },
    } as const;
    const updated = await use(layer, (s) =>
      s.update(created.id, {
        name: "Sertifikat",
        slots: ["nama", "instansi"],
        outputPattern: "SERTIFIKAT_{nama}.pdf",
        slotLayout: layout,
      }),
    );
    expect(updated.slotLayout).toEqual(layout);

    const fetched = await use(layer, (s) => s.get(created.id));
    expect(Option.getOrNull(fetched)?.slotLayout).toEqual(layout);
  });

  it("clears the slot layout when updating with an empty record", async () => {
    const layer = templateLayer();
    const created = await use(layer, (s) =>
      s.create({
        name: "Sertifikat",
        filePath: "/tmp/sertifikat.png",
        type: "image",
        slots: ["nama"],
        outputPattern: "SERTIFIKAT_{nama}.pdf",
        slotLayout: {},
      }),
    );
    await use(layer, (s) =>
      s.update(created.id, {
        name: "Sertifikat",
        slots: ["nama"],
        outputPattern: "SERTIFIKAT_{nama}.pdf",
        slotLayout: {
          nama: { x: 0, y: 150, fontSize: 40, color: "#1A2421", align: "center", maxWidth: null },
        },
      }),
    );
    const cleared = await use(layer, (s) =>
      s.update(created.id, {
        name: "Sertifikat",
        slots: ["nama"],
        outputPattern: "SERTIFIKAT_{nama}.pdf",
        slotLayout: {},
      }),
    );
    expect(cleared.slotLayout).toEqual({});
  });

  it("rejects a slot layout with a malformed color", async () => {
    const layer = templateLayer();
    const created = await use(layer, (s) =>
      s.create({
        name: "Sertifikat",
        filePath: "/tmp/sertifikat.png",
        type: "image",
        slots: ["nama"],
        outputPattern: "SERTIFIKAT_{nama}.pdf",
        slotLayout: {},
      }),
    );
    await expect(
      use(layer, (s) =>
        s.update(created.id, {
          name: "Sertifikat",
          slots: ["nama"],
          outputPattern: "SERTIFIKAT_{nama}.pdf",
          slotLayout: {
            nama: { x: 0, y: 150, fontSize: 40, color: "red", align: "center", maxWidth: null },
          },
        }),
      ),
    ).rejects.toMatchObject({ _tag: "InvalidTemplate" });
  });

  it("still validates on update", async () => {
    const layer = templateLayer();
    const created = await use(layer, (s) =>
      s.create({
        name: "Valid",
        filePath: writeFixture(P_LOA),
        type: "docx",
        slots: ["name"],
        outputPattern: "LOA_{name}.pdf",
        slotLayout: {},
      }),
    );
    await expect(
      use(layer, (s) =>
        s.update(created.id, {
          name: "Valid",
          slots: ["name"],
          outputPattern: "LOA_{unknown}.pdf",
          slotLayout: {},
        }),
      ),
    ).rejects.toMatchObject({ _tag: "InvalidTemplate" });
  });
});

describe("TemplatesService delete (Seam A)", () => {
  it("deletes a template and reports the count", async () => {
    const layer = templateLayer();
    const created = await use(layer, (s) =>
      s.create({
        name: "Doomed",
        filePath: writeFixture(P_LOA),
        type: "docx",
        slots: ["name"],
        outputPattern: "LOA_{name}.pdf",
        slotLayout: {},
      }),
    );

    await expect(use(layer, (s) => s.delete(created.id))).resolves.toBe(1);
    await expect(use(layer, (s) => s.get(created.id))).resolves.toEqual(Option.none());
    await expect(use(layer, (s) => s.delete(created.id))).resolves.toBe(0);
  });

  it("deleting one template leaves the others", async () => {
    const layer = templateLayer();
    const [first, second] = await use(layer, (s) =>
      Effect.all([
        s.create({
          name: "First",
          filePath: writeFixture(P_LOA),
          type: "docx",
          slots: ["name"],
          outputPattern: "LOA_{name}.pdf",
          slotLayout: {},
        }),
        s.create({
          name: "Second",
          filePath: "/tmp/sertifikat.png",
          type: "image",
          slots: ["nama"],
          outputPattern: "SERTIFIKAT_{nama}.pdf",
          slotLayout: {},
        }),
      ]),
    );

    await use(layer, (s) => s.delete(first.id));
    const listed = await use(layer, (s) => s.list());
    expect(listed.map((t) => t.name)).toEqual(["Second"]);
    expect(second.id).toBeDefined();
  });
});

describe("template validation helpers", () => {
  it("normalizes slots: trim, drop empties, dedupe, keep order", () => {
    expect(normalizeSlots([" name ", "name", "", "no", "  ", "instansi", "name"])).toEqual([
      "name",
      "no",
      "instansi",
    ]);
    expect(normalizeSlots([])).toEqual([]);
  });

  it("extracts pattern references in pattern order", () => {
    expect(patternSlots("LOA_{no}_{name}.pdf")).toEqual(["no", "name"]);
    expect(patternSlots("plain.pdf")).toEqual([]);
    expect(patternSlots("x {name} y {name}")).toEqual(["name", "name"]);
  });

  it("validates the name, slots, and pattern together", () => {
    expect(validateTemplate("LOA", ["name"], "LOA_{name}.pdf")).toBeNull();
    expect(validateTemplate("", ["name"], "LOA_{name}.pdf")).toMatch(/name is required/);
    expect(validateTemplate("LOA", [], "LOA_{name}.pdf")).toMatch(/at least one slot/);
    expect(validateTemplate("LOA", ["name"], "LOA.pdf")).toMatch(/at least one slot/);
    expect(validateTemplate("LOA", ["name"], "LOA_{naem}.pdf")).toMatch(/"\{naem\}"/);
  });
});

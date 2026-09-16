import { describe, expect, it } from "vitest";
import { Effect, Layer, Option } from "effect";
import { join } from "path";
import { openDatabase, SqliteRepo } from "../db/repository";
import {
  MessageTemplatesService,
  type MessageTemplatesServiceShape,
} from "./message-templates";
import { makeCredentialCrypto } from "./credential-crypto";
import { validateMessageTemplate } from "../../shared/send";
import { tempDir } from "./test-helpers";

/**
 * Seam A (spec Testing Decisions): the Message Templates domain (ticket
 * 03) against a real Effect Layer on a temp database. The copy-on-pick
 * semantics themselves live in the renderer (the job owns its copy) and
 * are covered by the E2E suite; here the CRUD contract, validation, and
 * the list ordering are pinned.
 */

/** Runs an Effect program that borrows the MessageTemplatesService from its layer. */
function use<A, E>(
  layer: Layer.Layer<MessageTemplatesService | SqliteRepo>,
  f: (service: MessageTemplatesServiceShape) => Effect.Effect<A, E, never>,
): Promise<A> {
  return Effect.runPromise(
    Effect.gen(function* () {
      return yield* f(yield* MessageTemplatesService);
    }).pipe(Effect.provide(layer)),
  );
}

function layerAt(dbPath: string): Layer.Layer<MessageTemplatesService | SqliteRepo> {
  return MessageTemplatesService.Live(
    openDatabase(dbPath),
    makeCredentialCrypto(null, () => {}),
  );
}

function freshLayer(): Layer.Layer<MessageTemplatesService | SqliteRepo> {
  return layerAt(join(tempDir(), "message-templates.db"));
}

const DRAFT = {
  name: "Undangan Rapat",
  subject: "Undangan Rapat {name}",
  bodyHtml: "<p>Dear {name}, dari {instansi}, diundang.</p>",
};

describe("MessageTemplatesService create (Seam A)", () => {
  it("round-trips a template through list and get", async () => {
    const layer = freshLayer();

    const created = await use(layer, (s) => s.create(DRAFT));
    expect(created).toMatchObject({
      id: expect.stringMatching(/^[0-9a-f-]{36}$/),
      name: "Undangan Rapat",
      subject: "Undangan Rapat {name}",
      bodyHtml: "<p>Dear {name}, dari {instansi}, diundang.</p>",
      createdAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
      updatedAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
    });

    const listed = await use(layer, (s) => s.list());
    expect(listed).toEqual([created]);

    const fetched = await use(layer, (s) => s.get(created.id));
    expect(fetched).toEqual(Option.some(created));
    await expect(use(layer, (s) => s.get("no-such-id"))).resolves.toEqual(Option.none());
  });

  it("trims the name and keeps the subject and body verbatim", async () => {
    const layer = freshLayer();
    const created = await use(layer, (s) =>
      s.create({
        name: "  Undangan  ",
        subject: "  Subject with spaces  ",
        bodyHtml: "<p>  Body keeps its whitespace  </p>",
      }),
    );
    expect(created.name).toBe("Undangan");
    expect(created.subject).toBe("  Subject with spaces  ");
    expect(created.bodyHtml).toBe("<p>  Body keeps its whitespace  </p>");
  });

  it("rejects an empty name, subject, or body", async () => {
    const layer = freshLayer();
    await expect(use(layer, (s) => s.create({ ...DRAFT, name: "  " }))).rejects.toMatchObject({
      _tag: "InvalidMessageTemplate",
    });
    await expect(use(layer, (s) => s.create({ ...DRAFT, subject: "" }))).rejects.toMatchObject({
      _tag: "InvalidMessageTemplate",
    });
    await expect(use(layer, (s) => s.create({ ...DRAFT, bodyHtml: "  " }))).rejects.toMatchObject({
      _tag: "InvalidMessageTemplate",
    });
  });
});

describe("MessageTemplatesService update (Seam A)", () => {
  it("updates name, subject, and body and persists them", async () => {
    const layer = freshLayer();
    const created = await use(layer, (s) => s.create(DRAFT));

    const updated = await use(layer, (s) =>
      s.update(created.id, {
        name: "Undangan Baru",
        subject: "Undangan Baru {name}",
        bodyHtml: "<p>Dear {name}, versi baru.</p>",
      }),
    );
    expect(updated).toMatchObject({
      id: created.id,
      name: "Undangan Baru",
      subject: "Undangan Baru {name}",
      bodyHtml: "<p>Dear {name}, versi baru.</p>",
    });

    const fetched = await use(layer, (s) => s.get(created.id));
    expect(fetched).toEqual(Option.some(updated));
  });

  it("fails with MessageTemplateUpdateNotFound for an unknown id", async () => {
    const layer = freshLayer();
    await expect(
      use(layer, (s) => s.update("no-such-id", DRAFT)),
    ).rejects.toMatchObject({ _tag: "MessageTemplateUpdateNotFound" });
  });

  it("still validates on update", async () => {
    const layer = freshLayer();
    const created = await use(layer, (s) => s.create(DRAFT));
    await expect(
      use(layer, (s) => s.update(created.id, { ...DRAFT, name: "" })),
    ).rejects.toMatchObject({ _tag: "InvalidMessageTemplate" });
  });
});

describe("MessageTemplatesService delete (Seam A)", () => {
  it("deletes a template and reports the count", async () => {
    const layer = freshLayer();
    const created = await use(layer, (s) => s.create(DRAFT));

    await expect(use(layer, (s) => s.delete(created.id))).resolves.toBe(1);
    await expect(use(layer, (s) => s.get(created.id))).resolves.toEqual(Option.none());
    await expect(use(layer, (s) => s.delete(created.id))).resolves.toBe(0);
  });

  it("deleting one template leaves the others", async () => {
    const layer = freshLayer();
    const [first, second] = await use(layer, (s) =>
      Effect.all([
        s.create({ ...DRAFT, name: "First" }),
        s.create({ ...DRAFT, name: "Second" }),
      ]),
    );

    await use(layer, (s) => s.delete(first.id));
    const listed = await use(layer, (s) => s.list());
    expect(listed.map((t) => t.name)).toEqual(["Second"]);
    expect(second.id).toBeDefined();
  });
});

describe("MessageTemplatesService list (Seam A)", () => {
  it("orders by most recently edited first, name tiebreak within a second", async () => {
    const dbPath = join(tempDir(), "order.db");
    const layer = layerAt(dbPath);
    const [, beta] = await use(layer, (s) =>
      Effect.all([
        s.create({ ...DRAFT, name: "Alpha" }),
        s.create({ ...DRAFT, name: "Beta" }),
      ]),
    );
    // Both rows share the same creation second, so the name tiebreak
    // orders them deterministically.
    expect((await use(layer, (s) => s.list())).map((t) => t.name)).toEqual(["Alpha", "Beta"]);

    // A later edit (simulated with a future stamp, since real edits in
    // one test share the same second) moves Beta ahead of Alpha.
    const db = openDatabase(dbPath);
    db.prepare("UPDATE message_templates SET updated_at = '2099-01-01 00:00:00' WHERE id = ?").run(
      beta.id,
    );
    db.close();
    expect((await use(layer, (s) => s.list())).map((t) => t.name)).toEqual(["Beta", "Alpha"]);
  });
});

describe("validateMessageTemplate (shared)", () => {
  it("accepts a complete template and rejects empty fields", () => {
    expect(validateMessageTemplate("Undangan", "Subject {name}", "<p>{name}</p>")).toBeNull();
    expect(validateMessageTemplate("", "Subject", "<p>Body</p>")).toMatch(/name is required/);
    expect(validateMessageTemplate("Undangan", "  ", "<p>Body</p>")).toMatch(/Subject is required/);
    expect(validateMessageTemplate("Undangan", "Subject", "")).toMatch(/body is required/);
  });
});

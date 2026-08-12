import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";
import { Effect, Option } from "effect";
import { makeFontManager } from "./fonts";
import { tempDir } from "./test-helpers";

/**
 * The fonts domain service (ticket 11) at its own seam: bundled faces
 * resolve from a directory of real font files, uploads land in an
 * isolated app-data-style dir. The fixture bytes are the bundled Poppins
 * Regular the app ships, so the parse assertions run against real font
 * metadata.
 */
const FIXTURE_TTF_PATH = join(process.cwd(), "resources", "fonts", "Poppins-Regular.ttf");
const FIXTURE_TTF_BYTES = readFileSync(FIXTURE_TTF_PATH);

/** A font manager over a fresh temp uploads dir and the real bundled dir. */
function makeManager(uploadsDir: string) {
  return makeFontManager(uploadsDir, join(process.cwd(), "resources", "fonts"));
}

function run<A, E>(effect: Effect.Effect<A, E>): A {
  return Effect.runSync(effect);
}

describe("font manager", () => {
  it("lists the bundled set first, with their display metadata", () => {
    const manager = makeManager(tempDir());
    const faces = run(manager.list());
    expect(faces.slice(0, 7).map((face) => face.id)).toEqual([
      "bundled:great-vibes",
      "bundled:montserrat-regular",
      "bundled:montserrat-bold",
      "bundled:poppins-regular",
      "bundled:poppins-medium",
      "bundled:poppins-semibold",
      "bundled:poppins-bold",
    ]);
    expect(faces[0]).toMatchObject({ family: "Great Vibes", weight: null, weightLabel: null });
    expect(faces[6]).toMatchObject({ family: "Poppins", weight: "700", weightLabel: "Bold" });
  });

  it("adds an uploaded font: copies the file into the app data dir and parses its names", () => {
    const uploadsDir = join(tempDir(), "fonts");
    const manager = makeManager(uploadsDir);
    const face = run(manager.addFont(FIXTURE_TTF_PATH));
    expect(face).toMatchObject({
      family: "Poppins",
      weight: "400",
      weightLabel: "Regular",
      kind: "uploaded",
    });
    expect(face.id).toMatch(/^uploaded:/);
    // The copy exists under the app data dir and is byte-identical.
    const stored = readdirSync(uploadsDir);
    expect(stored).toHaveLength(1);
    expect(readFileSync(join(uploadsDir, stored[0]!))).toEqual(FIXTURE_TTF_BYTES);

    // The upload now appears in the list, after the bundled faces.
    const faces = run(manager.list());
    expect(faces.map((f) => f.id)).toContain(face.id);
    expect(faces.at(-1)!.id).toBe(face.id);
  });

  it("keeps each add of the same file as its own face", () => {
    const uploadsDir = join(tempDir(), "fonts");
    const manager = makeManager(uploadsDir);
    const first = run(manager.addFont(FIXTURE_TTF_PATH));
    const second = run(manager.addFont(FIXTURE_TTF_PATH));
    expect(first.id).not.toBe(second.id);
    expect(readdirSync(uploadsDir)).toHaveLength(2);
  });

  it("rejects a file that is not a TTF/OTF by extension", async () => {
    const manager = makeManager(tempDir());
    const path = join(tempDir(), "notes.txt");
    writeFileSync(path, "not a font");
    await expect(Effect.runPromise(manager.addFont(path))).rejects.toMatchObject({
      _tag: "InvalidFontFile",
    });
  });

  it("rejects a file that is not a readable font", async () => {
    const manager = makeManager(tempDir());
    const path = join(tempDir(), "fake.ttf");
    writeFileSync(path, "definitely not font bytes");
    await expect(Effect.runPromise(manager.addFont(path))).rejects.toMatchObject({
      _tag: "InvalidFontFile",
    });
  });

  it("rejects a missing file with the path in the message", async () => {
    const manager = makeManager(tempDir());
    await expect(Effect.runPromise(manager.addFont(join(tempDir(), "gone.ttf")))).rejects.toMatchObject(
      { _tag: "InvalidFontFile", message: expect.stringContaining("gone.ttf") },
    );
  });

  it("resolves a bundled face's bytes", () => {
    const manager = makeManager(tempDir());
    const bytes = run(manager.resolveBytes("bundled:poppins-regular"));
    expect(Option.isSome(bytes)).toBe(true);
    if (Option.isSome(bytes)) expect(bytes.value).toEqual(FIXTURE_TTF_BYTES);
  });

  it("resolves an uploaded face's bytes from the copy", () => {
    const uploadsDir = join(tempDir(), "fonts");
    const manager = makeManager(uploadsDir);
    const face = run(manager.addFont(FIXTURE_TTF_PATH));
    const bytes = run(manager.resolveBytes(face.id));
    expect(Option.isSome(bytes)).toBe(true);
    if (Option.isSome(bytes)) expect(bytes.value).toEqual(FIXTURE_TTF_BYTES);
  });

  it("falls back to none when the face id is unknown", () => {
    const manager = makeManager(tempDir());
    expect(Option.isNone(run(manager.resolveBytes("bundled:no-such-face")))).toBe(true);
    expect(Option.isNone(run(manager.resolveBytes("uploaded:no-such.ttf")))).toBe(true);
    expect(Option.isNone(run(manager.resolveBytes("other:poppins-regular")))).toBe(true);
  });

  it("falls back to none when the upload's file is gone (deleted from the app data dir)", () => {
    const uploadsDir = join(tempDir(), "fonts");
    const manager = makeManager(uploadsDir);
    const face = run(manager.addFont(FIXTURE_TTF_PATH));
    rmSync(join(uploadsDir, face.id.slice("uploaded:".length)));
    expect(Option.isNone(run(manager.resolveBytes(face.id)))).toBe(true);
  });

  it("falls back to none when the bundled dir has no such file", () => {
    const manager = makeFontManager(tempDir(), tempDir());
    expect(Option.isNone(run(manager.resolveBytes("bundled:poppins-regular")))).toBe(true);
  });

  it("resolves an unreadable upload as none instead of throwing", () => {
    const uploadsDir = join(tempDir(), "fonts");
    // A directory named like a font: readFileSync fails, resolution must
    // report the face as missing - the generate pipeline falls back to
    // Helvetica Bold instead of failing the recipient.
    mkdirSync(join(uploadsDir, "weird.ttf"), { recursive: true });
    const manager = makeManager(uploadsDir);
    expect(Option.isNone(run(manager.resolveBytes("uploaded:weird.ttf")))).toBe(true);
    expect(Option.isNone(run(manager.getFileData("uploaded:weird.ttf")))).toBe(true);
  });

  it("never resolves a path-traversal face id", () => {
    const uploadsDir = join(tempDir(), "fonts");
    mkdirSync(uploadsDir, { recursive: true });
    writeFileSync(join(uploadsDir, "innocent.ttf"), FIXTURE_TTF_BYTES);
    const manager = makeManager(uploadsDir);
    expect(
      Option.isNone(run(manager.resolveBytes("uploaded:../innocent.ttf"))),
    ).toBe(true);
    expect(Option.isNone(run(manager.resolveBytes("uploaded:sub/innocent.ttf")))).toBe(true);
  });

  it("serves the file payload for the preview, mime by extension", () => {
    const uploadsDir = join(tempDir(), "fonts");
    const manager = makeManager(uploadsDir);
    const face = run(manager.addFont(FIXTURE_TTF_PATH));
    const file = run(manager.getFileData(face.id));
    expect(Option.isSome(file)).toBe(true);
    if (Option.isSome(file)) {
      expect(file.value.mimeType).toBe("font/ttf");
      expect(Buffer.from(file.value.dataBase64, "base64")).toEqual(FIXTURE_TTF_BYTES);
    }
    expect(Option.isNone(run(manager.getFileData("bundled:no-such-face")))).toBe(true);
  });

  it("skips unreadable files when listing uploads", () => {
    const uploadsDir = join(tempDir(), "fonts");
    mkdirSync(uploadsDir, { recursive: true });
    writeFileSync(join(uploadsDir, "broken.ttf"), "garbage");
    const manager = makeManager(uploadsDir);
    const faces = run(manager.list());
    expect(faces.every((face) => face.kind === "bundled")).toBe(true);
    expect(faces).toHaveLength(7);
  });

  it("skips a stray directory named like a font instead of failing the list", () => {
    const uploadsDir = join(tempDir(), "fonts");
    mkdirSync(join(uploadsDir, "weird.ttf"), { recursive: true });
    const manager = makeManager(uploadsDir);
    const faces = run(manager.list());
    expect(faces).toHaveLength(7);
  });

  it("ensures the uploads dir when adding, even when it does not exist", () => {
    const uploadsDir = join(tempDir(), "does", "not", "exist", "yet");
    const manager = makeManager(uploadsDir);
    const face = run(manager.addFont(FIXTURE_TTF_PATH));
    expect(existsSync(join(uploadsDir, face.id.slice("uploaded:".length)))).toBe(true);
  });
});

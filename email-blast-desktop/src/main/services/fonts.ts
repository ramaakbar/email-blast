import { randomUUID } from "crypto";
import { Context, Data, Effect, Layer, Option, Schema } from "effect";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync } from "fs";
import { basename, extname, join } from "path";
import fontkit from "@pdf-lib/fontkit";
import { m } from "@paraglide/messages";
import { FontFaceInfo, FontFileResponse } from "../../shared/ipc";
import { WIRE } from "../../shared/wire";
import { makeOp } from "../ipc-core";

/**
 * The fonts domain (ticket 11): the faces slot layouts render with.
 * A small bundled set (Great Vibes, Montserrat, Poppins - all SIL OFL,
 * static weights where available) ships as app resources, and user
 * uploads (TTF/OTF) are copied into the app data dir. Every face has a
 * stable id; slot layouts persist that id, and resolution falls back to
 * the legacy Helvetica Bold when the id is unknown or its file is gone,
 * so a deleted upload can never break an existing template.
 *
 * The same file bytes flow to the renderer preview (fonts.getFile) and
 * to pdf-lib at generate time (GenerateEnv.findFontBytes) - the
 * preview-equals-PDF invariant of the fit-to-width math (ticket 04)
 * holds because both sides measure the very font the slot picked.
 */

/** A font file the user picked that is not a readable TTF/OTF. */
export class InvalidFontFile extends Data.TaggedError("InvalidFontFile")<{
  readonly message: string;
}> {}

/** The two directories the font manager works in. */
export interface FontDirs {
  /** The app data dir uploads are copied into (userData/fonts). */
  readonly fontsDir: string;
  /** The bundled faces' directory (resources/fonts in dev and packaged). */
  readonly bundledFontsDir: string;
}

/** One bundled face: the id slot layouts persist, plus the display metadata. */
interface BundledFace {
  readonly id: string;
  readonly family: string;
  readonly weight: string | null;
  readonly weightLabel: string | null;
  readonly fileName: string;
}

/**
 * The bundled set (ticket 11): Great Vibes (single weight), Montserrat
 * and Poppins (static weights where available), all SIL OFL so shipping
 * them inside the app is redistribution-safe. The file names live in
 * resources/fonts/ and ship via electron-builder's extraResources entry
 * (ADR-0010).
 */
const BUNDLED_FACES: readonly BundledFace[] = [
  {
    id: "bundled:great-vibes",
    family: "Great Vibes",
    weight: null,
    weightLabel: null,
    fileName: "GreatVibes-Regular.ttf",
  },
  {
    id: "bundled:montserrat-regular",
    family: "Montserrat",
    weight: "400",
    weightLabel: "Regular",
    fileName: "Montserrat-Regular.ttf",
  },
  {
    id: "bundled:montserrat-bold",
    family: "Montserrat",
    weight: "700",
    weightLabel: "Bold",
    fileName: "Montserrat-Bold.ttf",
  },
  {
    id: "bundled:poppins-regular",
    family: "Poppins",
    weight: "400",
    weightLabel: "Regular",
    fileName: "Poppins-Regular.ttf",
  },
  {
    id: "bundled:poppins-medium",
    family: "Poppins",
    weight: "500",
    weightLabel: "Medium",
    fileName: "Poppins-Medium.ttf",
  },
  {
    id: "bundled:poppins-semibold",
    family: "Poppins",
    weight: "600",
    weightLabel: "SemiBold",
    fileName: "Poppins-SemiBold.ttf",
  },
  {
    id: "bundled:poppins-bold",
    family: "Poppins",
    weight: "700",
    weightLabel: "Bold",
    fileName: "Poppins-Bold.ttf",
  },
];

const BUNDLED_BY_ID: Record<string, BundledFace> = Object.fromEntries(
  BUNDLED_FACES.map((face) => [face.id, face]),
);

/** The mime type of a stored font file, by extension. */
function fontMimeType(fileName: string): string {
  return extname(fileName).toLowerCase() === ".otf" ? "font/otf" : "font/ttf";
}

/** A stored file name that can never escape its directory. */
function isSafeStoredName(fileName: string): boolean {
  const ext = extname(fileName).toLowerCase();
  return (
    fileName !== "" &&
    basename(fileName) === fileName &&
    !fileName.includes("/") &&
    !fileName.includes("\\") &&
    (ext === ".ttf" || ext === ".otf")
  );
}

/**
 * The display metadata of a parsed font, or null when the bytes are not
 * a readable font: family from the name table, the CSS weight string
 * and display label where the font declares them (single-weight faces
 * like Great Vibes carry null).
 */
function parseFaceNames(bytes: Uint8Array): {
  family: string;
  weight: string | null;
  weightLabel: string | null;
} | null {
  try {
    const font = fontkit.create(bytes);
    const os2 = font["OS/2"] as { usWeightClass?: number } | undefined;
    const weightClass = os2?.usWeightClass;
    return {
      family: font.familyName ?? "Uploaded font",
      weight: typeof weightClass === "number" ? String(weightClass) : null,
      weightLabel:
        typeof font.subfamilyName === "string" && font.subfamilyName !== ""
          ? font.subfamilyName
          : null,
    };
  } catch {
    return null;
  }
}

/**
 * The face info of one stored upload file; null when the file cannot be
 * read or parsed (the list skips such files so a corrupt upload or a
 * stray directory never takes the whole picker down, and resolution
 * treats them as missing).
 */
function parseStoredFace(fileName: string, fontsDir: string): FontFaceInfo | null {
  let bytes: Uint8Array;
  try {
    bytes = readFileSync(join(fontsDir, fileName));
  } catch {
    return null;
  }
  const names = parseFaceNames(bytes);
  if (names === null) return null;
  return {
    id: `uploaded:${fileName}`,
    family: names.family,
    weight: names.weight,
    weightLabel: names.weightLabel,
    kind: "uploaded",
  };
}

export interface FontManagerShape {
  /**
   * Every available face: the bundled set first, then the uploads
   * scanned from the app data dir (each parsed for its family and
   * weight; unreadable files are skipped).
   */
  readonly list: () => Effect.Effect<FontFaceInfo[]>;
  /**
   * Registers an uploaded font file: validates it parses as a TTF/OTF,
   * copies it into the app data dir, and returns the new face. Fails
   * with InvalidFontFile when the file is missing or unreadable.
   */
  readonly addFont: (filePath: string) => Effect.Effect<FontFaceInfo, InvalidFontFile>;
  /** The face's file bytes, or none when the id is unknown or the file is gone. */
  readonly resolveBytes: (faceId: string) => Effect.Effect<Option.Option<Uint8Array>>;
  /** The face's bytes as a data-URL-ready payload (the renderer preview). */
  readonly getFileData: (faceId: string) => Effect.Effect<Option.Option<FontFileResponse>>;
}

export function makeFontManager(fontsDir: string, bundledFontsDir: string): FontManagerShape {
  /** The file path of a face id, or null for an unknown id. */
  const facePath = (faceId: string): string | null => {
    if (faceId.startsWith("bundled:")) {
      const face = BUNDLED_BY_ID[faceId];
      return face === undefined ? null : join(bundledFontsDir, face.fileName);
    }
    if (faceId.startsWith("uploaded:")) {
      const fileName = faceId.slice("uploaded:".length);
      return isSafeStoredName(fileName) ? join(fontsDir, fileName) : null;
    }
    return null;
  };

  return {
    list: () =>
      Effect.sync(() => {
        const bundled: FontFaceInfo[] = BUNDLED_FACES.map((face) => ({
          id: face.id,
          family: face.family,
          weight: face.weight,
          weightLabel: face.weightLabel,
          kind: "bundled",
        }));
        const uploaded: FontFaceInfo[] = [];
        if (existsSync(fontsDir)) {
          for (const entry of readdirSync(fontsDir)) {
            if (!isSafeStoredName(entry)) continue;
            const face = parseStoredFace(entry, fontsDir);
            if (face !== null) uploaded.push(face);
          }
        }
        // Uploads sort by file name so the picker order is stable.
        uploaded.sort((a, b) => a.id.localeCompare(b.id));
        return [...bundled, ...uploaded];
      }),
    addFont: (filePath) =>
      Effect.gen(function* () {
        const ext = extname(filePath).toLowerCase();
        if (ext !== ".ttf" && ext !== ".otf") {
          return yield* Effect.fail(
            new InvalidFontFile({ message: m["fontsService.invalidFontFile"]() }),
          );
        }
        let bytes: Uint8Array;
        try {
          bytes = readFileSync(filePath);
        } catch {
          return yield* Effect.fail(
            new InvalidFontFile({ message: m["fontsService.couldNotRead"]({ path: filePath }) }),
          );
        }
        const names = parseFaceNames(bytes);
        if (names === null) {
          return yield* Effect.fail(
            new InvalidFontFile({ message: m["fontsService.invalidFontFile"]() }),
          );
        }
        mkdirSync(fontsDir, { recursive: true });
        const stem = basename(filePath, extname(filePath)).replace(/[^A-Za-z0-9._-]/g, "_");
        const storageName = `${stem}-${randomUUID()}${ext}`;
        copyFileSync(filePath, join(fontsDir, storageName));
        return {
          id: `uploaded:${storageName}`,
          family: names.family,
          weight: names.weight,
          weightLabel: names.weightLabel,
          kind: "uploaded",
        };
      }),
    resolveBytes: (faceId) =>
      Effect.sync(() => {
        const path = facePath(faceId);
        if (path === null || !existsSync(path)) return Option.none();
        // The existence check is a race window and not a permission
        // check: an unreadable or just-deleted file must resolve as
        // missing (the renderers fall back to Helvetica Bold), never
        // throw through the generate pipeline.
        try {
          return Option.some(readFileSync(path));
        } catch {
          return Option.none();
        }
      }),
    getFileData: (faceId) =>
      Effect.sync(() => {
        const path = facePath(faceId);
        if (path === null || !existsSync(path)) return Option.none();
        try {
          return Option.some({
            mimeType: fontMimeType(path),
            dataBase64: readFileSync(path).toString("base64"),
          });
        } catch {
          return Option.none();
        }
      }),
  };
}

/**
 * The fonts domain service. No dependencies beyond the two directories,
 * so constructing it needs no Layer merge.
 */
export class FontManagerService extends Context.Service<FontManagerService, FontManagerShape>()(
  "FontManagerService",
) {
  static readonly Live = (dirs: FontDirs): Layer.Layer<FontManagerService> =>
    Layer.succeed(FontManagerService, makeFontManager(dirs.fontsDir, dirs.bundledFontsDir));
}

/**
 * The fonts domain's IPC operations: list every face, read a face's
 * bytes for the preview, and register an upload. The add-font file
 * picker itself is a system-domain dialog (systemOperations).
 */
export const fontsOperations = {
  list: makeOp(WIRE.fonts.list, null, Schema.Array(FontFaceInfo), () =>
    Effect.gen(function* () {
      const service = yield* FontManagerService;
      return yield* service.list();
    }),
  ),
  getFile: makeOp(WIRE.fonts.getFile, Schema.String, Schema.NullOr(FontFileResponse), (faceId) =>
    Effect.gen(function* () {
      const service = yield* FontManagerService;
      return Option.getOrNull(yield* service.getFileData(faceId));
    }),
  ),
  add: makeOp(WIRE.fonts.add, Schema.String, FontFaceInfo, (filePath) =>
    Effect.gen(function* () {
      const service = yield* FontManagerService;
      return yield* service.addFont(filePath);
    }),
  ),
};

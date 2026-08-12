import { describe, expect, it } from "vitest";
import type { SlotLayout } from "./ipc";
import {
  BASELINE_OFFSET,
  LEGACY_FONT_FACE,
  MIN_SLOT_FONT_SIZE,
  fitFontSize,
  normalizeSlotLayout,
  parseHexColor,
  pdfBaselineY,
  slotTextX,
  validateSlotLayout,
} from "./slot-layout";

/** A linear width model: every glyph is 1 unit wide per point of size. */
const linearMeasure = (text: string) => (size: number) => text.length * size;

describe("fitFontSize", () => {
  it("returns the requested size when the text already fits", () => {
    expect(fitFontSize({ size: 40, maxWidth: 300, measureWidth: linearMeasure("hello") })).toBe(40);
  });

  it("shrinks a long value to the largest size that fits the slot width", () => {
    // "Budi Santoso" = 12 glyphs; at 20pt the width is 240, at 21 it is 252.
    expect(
      fitFontSize({ size: 40, maxWidth: 250, measureWidth: linearMeasure("Budi Santoso") }),
    ).toBe(20);
  });

  it("fits exactly when the boundary is an integer size", () => {
    expect(fitFontSize({ size: 100, maxWidth: 200, measureWidth: linearMeasure("abcd") })).toBe(50);
  });

  it("never grows past the requested size", () => {
    expect(fitFontSize({ size: 12, maxWidth: 5000, measureWidth: linearMeasure("x") })).toBe(12);
  });

  it("clamps at the legibility floor instead of going invisible", () => {
    expect(
      fitFontSize({ size: 40, maxWidth: 4, measureWidth: linearMeasure("a very long name") }),
    ).toBe(MIN_SLOT_FONT_SIZE);
  });
});

describe("slotTextX", () => {
  it("left-aligns the text at the box x", () => {
    expect(slotTextX({ x: 10, maxWidth: 200, textWidth: 80, align: "left" })).toBe(10);
  });

  it("centers the text inside the box width", () => {
    expect(slotTextX({ x: 10, maxWidth: 200, textWidth: 80, align: "center" })).toBe(70);
  });

  it("right-aligns the text to the box's right edge", () => {
    expect(slotTextX({ x: 10, maxWidth: 200, textWidth: 80, align: "right" })).toBe(130);
  });
});

describe("pdfBaselineY", () => {
  it("converts a CSS top coordinate into the pdf-lib baseline", () => {
    expect(pdfBaselineY({ pageHeight: 1000, y: 680, fontSize: 40 })).toBe(
      1000 - (680 + 40 * BASELINE_OFFSET),
    );
  });
});

describe("parseHexColor", () => {
  it("parses #RRGGBB into 0..1 rgb components", () => {
    expect(parseHexColor("#1A2421")).toEqual({ r: 26, g: 36, b: 33 });
    expect(parseHexColor("#FF0000")).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("returns null for anything but six hex digits", () => {
    expect(parseHexColor("red")).toBeNull();
    expect(parseHexColor("#FFF")).toBeNull();
    expect(parseHexColor("#GG0000")).toBeNull();
    expect(parseHexColor("")).toBeNull();
  });
});

describe("validateSlotLayout", () => {
  const good: SlotLayout = {
    x: 10,
    y: 100,
    fontSize: 32,
    color: "#1A2421",
    align: "center",
    maxWidth: null,
    fontFace: LEGACY_FONT_FACE,
  };

  it("accepts an empty layout (no configuration)", () => {
    expect(validateSlotLayout({})).toBeNull();
  });

  it("accepts a well-formed per-slot layout", () => {
    expect(validateSlotLayout({ name: good })).toBeNull();
    expect(validateSlotLayout({ name: { ...good, maxWidth: 120 } })).toBeNull();
  });

  it("accepts a face id and treats null as the legacy face", () => {
    expect(validateSlotLayout({ name: { ...good, fontFace: "bundled:poppins-bold" } })).toBeNull();
    expect(validateSlotLayout({ name: { ...good, fontFace: null } })).toBeNull();
  });

  it("rejects a non-string, non-null font face", () => {
    // undefined reaches the validator when a layout was built by hand
    // without the field - the shape check must not silently accept it.
    expect(validateSlotLayout({ name: { ...good, fontFace: undefined as never } })).not.toBeNull();
    expect(validateSlotLayout({ name: { ...good, fontFace: 7 as never } })).not.toBeNull();
    expect(validateSlotLayout({ name: { ...good, fontFace: "" } })).not.toBeNull();
  });

  it("rejects a non-hex color", () => {
    expect(validateSlotLayout({ name: { ...good, color: "red" } })).not.toBeNull();
  });

  it("rejects a font size below the legibility floor", () => {
    expect(validateSlotLayout({ name: { ...good, fontSize: 2 } })).not.toBeNull();
  });

  it("rejects a non-positive max width", () => {
    expect(validateSlotLayout({ name: { ...good, maxWidth: 0 } })).not.toBeNull();
    expect(validateSlotLayout({ name: { ...good, maxWidth: -5 } })).not.toBeNull();
  });

  it("rejects negative coordinates", () => {
    expect(validateSlotLayout({ name: { ...good, x: -1 } })).not.toBeNull();
    expect(validateSlotLayout({ name: { ...good, y: -1 } })).not.toBeNull();
  });

  it("rejects a non-finite number", () => {
    expect(validateSlotLayout({ name: { ...good, fontSize: Number.NaN } })).not.toBeNull();
  });
});

describe("normalizeSlotLayout", () => {
  it("reads a row saved before fontFace existed as the legacy face", () => {
    const stored = {
      name: { x: 10, y: 100, fontSize: 32, color: "#1A2421", align: "center", maxWidth: null },
    };
    expect(normalizeSlotLayout(stored)).toEqual({ name: { ...stored.name, fontFace: null } });
  });

  it("keeps a stored face id", () => {
    const stored = {
      name: {
        x: 10,
        y: 100,
        fontSize: 32,
        color: "#1A2421",
        align: "center",
        maxWidth: null,
        fontFace: "bundled:great-vibes",
      },
    };
    expect(normalizeSlotLayout(stored)).toEqual(stored);
  });

  it("treats a malformed blob as an empty configuration", () => {
    expect(normalizeSlotLayout(null)).toEqual({});
    expect(normalizeSlotLayout("nope")).toEqual({});
    expect(normalizeSlotLayout([1, 2])).toEqual({});
  });
});

/**
 * Image-template slot layout math (ticket 04): the pure logic behind
 * per-slot text positioning on image Document Templates - the
 * fit-to-width auto-shrink, the alignment x-offset, the CSS-top to
 * pdf-lib-baseline conversion, and layout validation. Zero dependencies
 * by design (except the Paraglide catalog for the validation message,
 * exactly like template-validation.ts): the renderer imports this module
 * for the live drag preview and the main process uses it at generate
 * time, so the preview and the output PDF can never drift apart.
 *
 * Coordinate convention: a slot layout stores the TOP-LEFT corner of the
 * text box in image pixels, origin top-left (the CSS convention of the
 * preview). pdf-lib draws text with the origin bottom-left and `y` at
 * the text baseline, so generation converts with pdfBaselineY().
 */

import { m } from "@paraglide/messages";
import type { SlotLayout } from "./ipc";

/** The alignment options a slot text box supports. */
export const SLOT_ALIGNMENTS = ["left", "center", "right"] as const;

/**
 * The legacy certificate ink: the color unconfigured slots draw with, and
 * the default color of a newly configured slot. One constant so the
 * editor default, the legacy render branch, and the malformed-color
 * fallback can never drift apart.
 */
export const LEGACY_TEXT_COLOR = "#1A2421";

/**
 * The y (fraction of page height) the legacy centered-stacked layout
 * starts its first slot at; a newly configured slot's default box top.
 */
export const LEGACY_STACK_Y_FRACTION = 0.68;

/** A template's whole configuration: slot name -> its layout. */
export type SlotLayoutConfig = Record<string, SlotLayout>;

/** The smallest rendered size auto-shrink goes down to - a legibility floor. */
export const MIN_SLOT_FONT_SIZE = 8;

const isFiniteNumber = (value: number): boolean => Number.isFinite(value);

/**
 * The em-box fraction between the text box top and the baseline. Both the
 * preview (CSS line box) and the PDF conversion use the same factor, so a
 * box dragged in the preview lands at the same glyph position in the PDF.
 */
export const BASELINE_OFFSET = 0.8;

/**
 * The largest size in [MIN_SLOT_FONT_SIZE, size] whose text width fits
 * maxWidth - the single-line auto-shrink. `measureWidth` is injected
 * because the font lives at the call site (pdf-lib in main, canvas in the
 * renderer); the search is monotonic in size, so a binary search lands
 * the exact boundary. When even the floor overflows, the floor wins -
 * shrinking below it would make the text invisible, which is worse than a
 * slight overflow on absurd input.
 */
export function fitFontSize(args: {
  size: number;
  maxWidth: number;
  measureWidth: (size: number) => number;
}): number {
  const { size, maxWidth, measureWidth } = args;
  if (measureWidth(size) <= maxWidth) return size;
  if (measureWidth(MIN_SLOT_FONT_SIZE) > maxWidth) return MIN_SLOT_FONT_SIZE;
  let low = MIN_SLOT_FONT_SIZE;
  let high = size;
  while (high - low > 1) {
    const mid = Math.floor((low + high) / 2);
    if (measureWidth(mid) <= maxWidth) low = mid;
    else high = mid;
  }
  return low;
}

/**
 * The x of the text's left edge inside the box, honoring the alignment.
 * `textWidth` is the rendered width at the fitted size.
 */
export function slotTextX(args: {
  x: number;
  maxWidth: number;
  textWidth: number;
  align: SlotLayout["align"];
}): number {
  const { x, maxWidth, textWidth, align } = args;
  if (align === "center") return x + (maxWidth - textWidth) / 2;
  if (align === "right") return x + maxWidth - textWidth;
  return x;
}

/**
 * Converts the CSS-style top coordinate (origin top-left) into the
 * pdf-lib baseline y (origin bottom-left). The baseline sits
 * BASELINE_OFFSET em below the box top.
 */
export function pdfBaselineY(args: { pageHeight: number; y: number; fontSize: number }): number {
  const { pageHeight, y, fontSize } = args;
  return pageHeight - (y + fontSize * BASELINE_OFFSET);
}

/** Parses "#RRGGBB" into integer components, or null when malformed. */
export function parseHexColor(hex: string): { r: number; g: number; b: number } | null {
  const match = /^#([0-9a-fA-F]{6})$/.exec(hex);
  if (match === null) return null;
  const value = Number.parseInt(match[1], 16);
  return { r: (value >> 16) & 0xff, g: (value >> 8) & 0xff, b: value & 0xff };
}

/**
 * Validates a template's whole slot-layout config. Returns the
 * user-facing error message, or null when acceptable. The renderer uses
 * it for instant feedback and the main process re-validates at the
 * boundary, so the two can never drift (same pattern as validateTemplate).
 */
export function validateSlotLayout(layout: SlotLayoutConfig): string | null {
  for (const [slot, config] of Object.entries(layout)) {
    if (
      !isFiniteNumber(config.x) ||
      config.x < 0 ||
      !isFiniteNumber(config.y) ||
      config.y < 0 ||
      !isFiniteNumber(config.fontSize) ||
      config.fontSize < MIN_SLOT_FONT_SIZE ||
      !SLOT_ALIGNMENTS.includes(config.align) ||
      parseHexColor(config.color) === null ||
      (config.maxWidth !== null && (!isFiniteNumber(config.maxWidth) || config.maxWidth < 1))
    ) {
      return m["validation.slotLayoutInvalid"]({ slot: `{${slot}}` });
    }
  }
  return null;
}

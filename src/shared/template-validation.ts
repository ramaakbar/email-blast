/**
 * Template-domain pure logic shared by both processes: slot and pattern
 * validation, and the accepted template file extensions. Zero Effect
 * dependencies by design - the renderer imports this module. The only
 * import is the compiled Paraglide catalog (ADR-0004), plain generated
 * code with no runtime dependencies, so both processes can produce the
 * user's language for the same validation rules.
 *
 * The main process re-validates every create/update at the boundary; the
 * renderer uses the same functions for instant feedback, so the error
 * messages a user sees can never drift from what the main process rejects.
 */

import { m } from "@paraglide/messages";

/** The file extensions each template type accepts (native dialog filter + type detection). */
export const TEMPLATE_EXTENSIONS: Record<"docx" | "image", readonly string[]> = {
  docx: [".docx"],
  image: [".png", ".jpg", ".jpeg"],
};

/** The type a template file registers as, by its extension, or null when unsupported. */
export function templateTypeForFile(fileName: string): "docx" | "image" | null {
  const lower = fileName.toLowerCase();
  if (TEMPLATE_EXTENSIONS.docx.some((ext) => lower.endsWith(ext))) return "docx";
  if (TEMPLATE_EXTENSIONS.image.some((ext) => lower.endsWith(ext))) return "image";
  return null;
}

/** Trims, drops empties, and dedupes slots, preserving first-seen order. */
export function normalizeSlots(slots: readonly string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const raw of slots) {
    const slot = raw.trim();
    if (slot === "" || seen.has(slot)) continue;
    seen.add(slot);
    result.push(slot);
  }
  return result;
}

/** The `{slot}` references inside an output pattern, in pattern order. */
export function patternSlots(pattern: string): string[] {
  const matches = pattern.match(/\{([^{}]+)\}/g) ?? [];
  return matches.map((match) => match.slice(1, -1));
}

/**
 * Validates a template payload. Returns the user-facing error message,
 * or null when the payload is acceptable. The pattern must reference at
 * least one declared slot and nothing else - a pattern like
 * `LOA_{naem}.pdf` or a slot-less `letter.pdf` would silently overwrite
 * itself for every recipient, so it is rejected at registration.
 */
export function validateTemplate(
  name: string,
  slots: readonly string[],
  outputPattern: string,
): string | null {
  if (name.trim() === "") return m["validation.templateNameRequired"]();
  const normalized = normalizeSlots(slots);
  if (normalized.length === 0) return m["validation.templateNeedsSlot"]();
  const referenced = patternSlots(outputPattern);
  if (referenced.length === 0) {
    return m["validation.templatePatternNeedsSlot"]({ name: "{name}" });
  }
  for (const slot of referenced) {
    if (!normalized.includes(slot)) {
      return m["validation.templatePatternUnknownSlot"]({ slot: `{${slot}}` });
    }
  }
  return null;
}

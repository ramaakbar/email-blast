/**
 * Template Assignment (ticket 08, ADR 0006): the routing logic shared by
 * the import pipeline (the "template" column role), the Generate
 * workspace (assignment UI, per-template coverage, fail-fast warnings),
 * and the generate service (per-recipient template resolution and job
 * pattern validation). Zero Effect dependencies - the renderer imports
 * this module, so nothing here may import from `effect` or any other
 * package; the only import is the compiled Paraglide catalog, exactly
 * like `template-validation.ts`.
 *
 * The main process re-validates the assignment at start (never trusts the
 * renderer's report), so the two halves cannot drift apart.
 */

import { m } from "@paraglide/messages";
import type { SlotSource } from "./generate";
import { patternSlots } from "./template-validation";

/** Exact header synonyms for the template-column role, matched case-insensitively. */
const TEMPLATE_COLUMN_SYNONYMS = new Set([
  "template",
  "jenis",
  "kategori",
  "tipe",
  "type",
  "category",
  "kind",
]);

/** Distinctive substrings, used only when no exact synonym matched. */
const TEMPLATE_COLUMN_SUBSTRINGS: readonly string[] = ["template", "jenis", "kategori", "tipe"];

/**
 * Auto-suggests which Excel header is the template routing column: exact
 * synonym matches first, distinctive substrings as a fallback, null when
 * nothing looks like a routing column. The user always confirms - this is
 * the same suggestion-then-confirm shape as the import column mapping.
 */
export function suggestTemplateColumn(columns: readonly string[]): string | null {
  const exact: string[] = [];
  const substring: string[] = [];
  for (const column of columns) {
    const normalized = column.trim().toLowerCase();
    if (TEMPLATE_COLUMN_SYNONYMS.has(normalized)) exact.push(column);
    else if (TEMPLATE_COLUMN_SUBSTRINGS.some((s) => normalized.includes(s))) substring.push(column);
  }
  return exact[0] ?? substring[0] ?? null;
}

/**
 * The recipient's routing value for a column: the trimmed metadata bag
 * entry, or null when the key is absent or blank (blank values route to
 * the default template).
 */
export function recipientTemplateValue(recipient: SlotSource, column: string): string | null {
  const value = recipient.metadata[column];
  if (value === undefined || value.trim() === "") return null;
  return value.trim();
}

/**
 * The distinct non-blank values of a routing column across the recipients,
 * in first-seen order - the assignment UI lists exactly these.
 */
export function distinctTemplateValues(
  recipients: readonly SlotSource[],
  column: string,
): string[] {
  const seen = new Set<string>();
  const values: string[] = [];
  for (const recipient of recipients) {
    const value = recipientTemplateValue(recipient, column);
    if (value === null || seen.has(value)) continue;
    seen.add(value);
    values.push(value);
  }
  return values;
}

/**
 * Which template one routing value sends its recipient to: blank maps to
 * the default template, a mapped value to its assigned template, an
 * unmapped value to null (the fail-fast case - start refuses before any
 * file is produced).
 */
export function resolveTemplateId(
  value: string | null | undefined,
  defaultTemplateId: string,
  assignment: Readonly<Record<string, string>>,
): string | null {
  if (value === null || value === undefined || value.trim() === "") return defaultTemplateId;
  // An empty-string target is an unassigned value, not a mapping: the
  // UI's "Choose a template" placeholder writes "" when the user clears
  // an assignment, and that value must re-enter the fail-fast report
  // instead of counting as assigned.
  const assigned = assignment[value.trim()];
  return assigned === undefined || assigned === "" ? null : assigned;
}

/**
 * The recipients a template is responsible for: everyone whose routing
 * value resolves to it (the default template covers blank values).
 */
export function routedRecipients(
  recipients: readonly SlotSource[],
  column: string,
  templateId: string,
  defaultTemplateId: string,
  assignment: Readonly<Record<string, string>>,
): SlotSource[] {
  return recipients.filter(
    (recipient) =>
      resolveTemplateId(
        recipientTemplateValue(recipient, column),
        defaultTemplateId,
        assignment,
      ) === templateId,
  );
}

/** One unassigned routing value with the recipients that carry it, by name. */
export interface UnassignedValueEntry {
  readonly value: string;
  readonly count: number;
  readonly recipientNames: readonly string[];
}

/**
 * The unassigned values of a routing column - values present in the data
 * that no template is assigned to. The Generate workspace blocks the
 * start action while this list is non-empty; the main process refuses
 * the job for exactly the same reason, listing the affected recipients
 * by name (fail fast, no partial or wrong-template output).
 */
export function unassignedTemplateValues(
  recipients: readonly SlotSource[],
  column: string,
  defaultTemplateId: string,
  assignment: Readonly<Record<string, string>>,
): UnassignedValueEntry[] {
  const entries: UnassignedValueEntry[] = [];
  for (const value of distinctTemplateValues(recipients, column)) {
    if (resolveTemplateId(value, defaultTemplateId, assignment) !== null) continue;
    // One pass per value: both the count and the names come from the
    // same comparison, so they can never drift apart.
    const names: string[] = [];
    let count = 0;
    for (const recipient of recipients) {
      if (recipientTemplateValue(recipient, column) !== value) continue;
      count += 1;
      names.push(recipient.name);
    }
    entries.push({ value, count, recipientNames: names });
  }
  return entries;
}

/**
 * Validates a Generate Job's output naming pattern against the templates
 * its recipients may be routed to: the pattern must reference at least
 * one slot, and every referenced slot must be declared by EVERY involved
 * template - a job pattern mentioning a slot that one variant does not
 * declare would fail at fill time for that variant's recipients, so it is
 * rejected before generation. Returns the user-facing error message, or
 * null when the pattern is acceptable.
 */
export function validateJobOutputPattern(
  pattern: string,
  templates: readonly {
    readonly id: string;
    readonly name: string;
    readonly slots: readonly string[];
  }[],
): string | null {
  const referenced = patternSlots(pattern);
  if (referenced.length === 0) {
    return m["validation.templatePatternNeedsSlot"]({ name: "{name}" });
  }
  for (const slot of referenced) {
    const missing = templates.find((template) => !template.slots.includes(slot));
    if (missing !== undefined) {
      return m["validation.patternSlotMissingInTemplate"]({
        slot: `{${slot}}`,
        name: missing.name,
      });
    }
  }
  return null;
}

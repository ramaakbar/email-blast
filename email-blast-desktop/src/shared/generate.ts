/**
 * Generate-domain pure logic shared by both processes (ticket 13):
 * how a slot resolves against a recipient, the aggregate coverage check
 * the Generate workspace shows, and how the output pattern becomes a
 * file name. Zero dependencies by design - the renderer imports this
 * module, so nothing here may import from `effect` or any other package.
 *
 * The main process resolves slots again at fill time (never trusts the
 * renderer's coverage result), so the two halves cannot drift apart.
 */

/** The parts of a recipient the slot resolver knows about (duck-typed subset of `Recipient`). */
export interface SlotSource {
  readonly name: string;
  readonly email: string | null;
  readonly phone: string | null;
  readonly metadata: Record<string, string>;
}

/**
 * The value a slot fills with for one recipient: the address fields win
 * over the metadata bag, every other slot reads from the bag by key.
 * Returns null when the slot has no value anywhere.
 */
export function resolveSlotValue(recipient: SlotSource, slot: string): string | null {
  if (slot === "name") return recipient.name;
  if (slot === "email") return recipient.email;
  if (slot === "phone") return recipient.phone;
  const value = recipient.metadata[slot];
  return value === undefined || value.trim() === "" ? null : value;
}

/** One declared slot that some selected recipient cannot fill. */
export interface MissingSlotEntry {
  readonly slot: string;
  readonly missingCount: number;
  /** The ids of the recipients missing this slot (max a few shown in the UI). */
  readonly recipients: readonly string[];
}

/** The coverage report for a template's slots against a set of recipients. */
export interface SlotCoverage {
  readonly ok: boolean;
  /** How many recipients miss at least one slot. */
  readonly recipientsMissing: number;
  /** The gaps per slot, in declared slot order; empty when coverage is ok. */
  readonly slots: readonly MissingSlotEntry[];
}

/**
 * Checks that every selected recipient can fill every declared template
 * slot. The workspace blocks the start action while the report is not
 * ok, so generation fails fast instead of producing broken PDFs (user
 * story 15).
 */
export function slotCoverage(
  recipients: readonly SlotSource[],
  slots: readonly string[],
): SlotCoverage {
  const missing = new Map<string, { count: number; recipients: string[] }>();
  let recipientsMissing = 0;
  for (const recipient of recipients) {
    let recipientHasGap = false;
    for (const slot of slots) {
      if (resolveSlotValue(recipient, slot) !== null) continue;
      recipientHasGap = true;
      const entry = missing.get(slot) ?? { count: 0, recipients: [] };
      entry.count += 1;
      entry.recipients.push((recipient as { id?: string }).id ?? "");
      missing.set(slot, entry);
    }
    if (recipientHasGap) recipientsMissing += 1;
  }
  const entries: MissingSlotEntry[] = slots
    .filter((slot) => missing.has(slot))
    .map((slot) => {
      const entry = missing.get(slot) as { count: number; recipients: string[] };
      return { slot, missingCount: entry.count, recipients: entry.recipients };
    });
  return { ok: entries.length === 0, recipientsMissing, slots: entries };
}

/**
 * Turns one value into a safe file-name segment, mirroring the legacy CLI:
 * NFKD-normalized (diacritics fall apart), stripped of anything outside
 * letters/digits/whitespace/dots/dashes, whitespace collapsed to
 * underscores, lowercased.
 */
export function sanitizeFileNameSegment(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[^\w\s.-]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .toLowerCase();
}

/**
 * Fills the `{slot}` references of an output pattern with the sanitized
 * values for one recipient. Throws when a referenced slot has no value -
 * the pipeline checks slot coverage before calling this, so reaching a
 * missing value here is a programming error, not a user error.
 */
export function fillOutputName(pattern: string, values: Record<string, string>): string {
  return pattern.replace(/\{([^{}]+)\}/g, (_match, slot: string) => {
    const value = values[slot];
    if (value === undefined) {
      throw new Error(`Output pattern references "{${slot}}", which has no value.`);
    }
    return sanitizeFileNameSegment(value);
  });
}

/**
 * Send-domain pure logic shared by both processes (ticket 15): how the
 * subject and HTML body interpolate `{slot}` placeholders per recipient,
 * and the coverage report the Send workspace's message step previews.
 * Zero dependencies by design - the renderer imports this module, so
 * nothing here may import from `effect` or any other package.
 *
 * The main process interpolates again at send time (never trusts the
 * renderer's preview result), so the two halves cannot drift apart. An
 * unknown or missing slot throws a descriptive error - a message never
 * reaches a recipient with a silent literal `{slot}` left in it.
 */

import { m } from "@paraglide/messages";
import type { SlotSource } from "./generate";

/** The HTML-significant characters a value must escape before interpolation. */
const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escapes a value so it is safe to place inside HTML text or attributes. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch] ?? ch);
}

/**
 * The `{slot}` references of a message, unique and in document order.
 * The autocomplete and the coverage report both derive their inventory
 * from this - a slot the message uses but no recipient can fill is an
 * "unknown slot" the workspace blocks on.
 */
export function extractMessageSlots(text: string): string[] {
  const seen = new Set<string>();
  const slots: string[] = [];
  for (const match of text.matchAll(/\{([^{}]+)\}/g)) {
    const slot = match[1].trim();
    if (slot !== "" && !seen.has(slot)) {
      seen.add(slot);
      slots.push(slot);
    }
  }
  return slots;
}

/**
 * Every value one recipient can fill a message slot with: the address
 * fields plus every non-blank metadata key. Blank metadata values are
 * dropped so interpolation treats them as missing rather than emitting
 * an empty literal.
 */
export function messageValues(recipient: SlotSource): Record<string, string> {
  const values: Record<string, string> = {};
  if (recipient.name.trim() !== "") values.name = recipient.name;
  if (recipient.email !== null && recipient.email.trim() !== "") {
    values.email = recipient.email;
  }
  if (recipient.phone !== null && recipient.phone.trim() !== "") {
    values.phone = recipient.phone;
  }
  for (const [key, value] of Object.entries(recipient.metadata)) {
    if (value.trim() !== "") values[key] = value;
  }
  return values;
}

/**
 * The slots the message editor can suggest for a selection: the union of every
 * recipient's resolvable values. The address fields come first (name,
 * email, phone - the fields every message uses), then metadata keys in
 * first-seen order, so the suggestion list reads predictably.
 */
export function availableSlots(recipients: readonly SlotSource[]): string[] {
  const seen = new Set<string>();
  const seenOrder: string[] = [];
  for (const recipient of recipients) {
    for (const slot of Object.keys(messageValues(recipient))) {
      if (!seen.has(slot)) {
        seen.add(slot);
        seenOrder.push(slot);
      }
    }
  }
  const fieldFirst = ["name", "email", "phone"].filter((slot) => seen.has(slot));
  const rest = seenOrder.filter((slot) => !fieldFirst.includes(slot));
  return [...fieldFirst, ...rest];
}

/** One slot some recipient cannot fill, and how many recipients that is. */
export interface MissingMessageSlot {
  readonly slot: string;
  readonly missingCount: number;
}

/**
 * The coverage report for a message against a set of recipients.
 * `unknownSlots` are referenced by the message but fillable by no one
 * (a typo, or a slot from another campaign) - sending would fail every
 * recipient, so the workspace blocks on them. `missing` are fillable by
 * some but absent for others - those recipients fail individually at
 * send time and the batch continues, so the workspace only warns.
 */
export interface MessageCoverage {
  readonly ok: boolean;
  readonly unknownSlots: readonly string[];
  readonly missing: readonly MissingMessageSlot[];
}

export function messageCoverage(recipients: readonly SlotSource[], text: string): MessageCoverage {
  const inventory = availableSlots(recipients);
  const inventorySet = new Set(inventory);
  const unknownSlots = extractMessageSlots(text).filter((slot) => !inventorySet.has(slot));
  const missing: MissingMessageSlot[] = [];
  const known = extractMessageSlots(text).filter((slot) => inventorySet.has(slot));
  if (known.length > 0 && recipients.length > 0) {
    for (const slot of known) {
      const missingCount = recipients.filter(
        (recipient) => messageValues(recipient)[slot] === undefined,
      ).length;
      if (missingCount > 0) missing.push({ slot, missingCount });
    }
  }
  return { ok: unknownSlots.length === 0, unknownSlots, missing };
}

/**
 * Fills the `{slot}` references with the values for one recipient. When
 * `escape` is true (the HTML body) every value is HTML-escaped first, so
 * recipient data can never break the markup; the subject interpolates with
 * `escape: false` - subjects are plain text and would show a literal
 * `&amp;` for `&`. A slot without a value throws a descriptive error -
 * the pipeline fails that recipient instead of sending a broken message.
 */
export function interpolateMessage(
  text: string,
  values: Record<string, string>,
  escape = true,
): string {
  return text.replace(/\{([^{}]+)\}/g, (_match, slotRaw: string) => {
    const slot = slotRaw.trim();
    const value = values[slot];
    if (value === undefined) {
      throw new Error(`The message references "{${slot}}", which has no value for this recipient.`);
    }
    return escape ? escapeHtml(value) : value;
  });
}

/** Interpolates the subject: slot values verbatim, no HTML escaping. */
export function interpolateMessagePlain(text: string, values: Record<string, string>): string {
  return interpolateMessage(text, values, false);
}

/** Interpolates the HTML body: every slot value HTML-escaped. */
export function interpolateMessageHtml(text: string, values: Record<string, string>): string {
  return interpolateMessage(text, values, true);
}

/**
 * Validates a Message Template payload (ticket 03). Returns the
 * user-facing error message, or null when the payload is acceptable.
 * Only the name, subject, and body are checked - `{slot}` references are
 * recipient-dependent by design, so they are validated per recipient at
 * send time (messageCoverage), not at template save time. The main
 * process re-validates every create/update at the boundary; the renderer
 * uses the same function for instant feedback, so the error messages a
 * user sees can never drift from what the main process rejects.
 */
export function validateMessageTemplate(
  name: string,
  subject: string,
  bodyHtml: string,
): string | null {
  if (name.trim() === "") return m["validation.messageTemplateNameRequired"]();
  if (subject.trim() === "") return m["validation.messageSubjectRequired"]();
  if (bodyHtml.trim() === "") return m["validation.messageBodyRequired"]();
  return null;
}

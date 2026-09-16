import { m } from "@paraglide/messages";

/**
 * The edit-only validation of a recipient's address fields (ADR 0008,
 * ticket 10). Import stays permissive - the Excel rows may carry
 * anything - but an in-app edit is a deliberate correction, so it checks
 * the same rules import applies (name required, email/phone optional)
 * plus a light "must contain @" on the email. The renderer surfaces the
 * message verbatim.
 */

/** The validation error, or null when the fields are acceptable. */
export function validateRecipientEdit(name: string, email: string | null): string | null {
  if (name.trim() === "") return m["recipients.nameRequired"]();
  if (email !== null && !email.trim().includes("@")) {
    return m["recipients.emailMustContainAt"]();
  }
  return null;
}

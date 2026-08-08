import { m } from "@paraglide/messages";

/**
 * Validation for the SMTP profile form fields. The renderer disables the
 * save button with the same rule the main process enforces, so a form can
 * never submit something the service would reject - one source of truth,
 * like the template validation. The messages come from the shared catalog
 * (ADR-0004), so both processes produce the user's language.
 *
 * `password` null is allowed only on update (keep the stored credential);
 * create always passes a string, and an empty string is rejected.
 */
export function validateSmtpProfile(fields: {
  readonly name: string;
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string | null;
}): string | null {
  if (fields.name.trim() === "") return m["validation.smtpNameRequired"]();
  if (fields.host.trim() === "") return m["validation.smtpHostRequired"]();
  if (!Number.isInteger(fields.port) || fields.port < 1 || fields.port > 65535) {
    return m["validation.smtpPortInvalid"]();
  }
  if (fields.username.trim() === "") return m["validation.smtpUsernameRequired"]();
  if (fields.password !== null && fields.password === "") {
    return m["validation.smtpPasswordRequired"]();
  }
  return null;
}

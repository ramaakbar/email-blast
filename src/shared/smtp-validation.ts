import { m } from "@paraglide/messages";
import type { SmtpCredentials } from "./ipc";

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
  if (!isValidSmtpPort(fields.port)) {
    return m["validation.smtpPortInvalid"]();
  }
  if (fields.username.trim() === "") return m["validation.smtpUsernameRequired"]();
  if (fields.password !== null && fields.password === "") {
    return m["validation.smtpPasswordRequired"]();
  }
  return null;
}

/**
 * The credential slice of the SMTP form state: every field a string,
 * the port included (the input is `type="number"`, but the DOM value is
 * text). The renderer's `SmtpFormState` extends this interface, so the
 * four fields are declared once, in shared code.
 */
export interface SmtpCredentialForm {
  readonly host: string;
  readonly port: string;
  readonly username: string;
  readonly password: string;
}

/**
 * A usable SMTP port: a whole number in 1..65535. The one rule the
 * profile validator and the inline-credential parse share.
 */
function isValidSmtpPort(port: number): boolean {
  return Number.isInteger(port) && port >= 1 && port <= 65535;
}

/**
 * Parses the inline-credential form into the shared `SmtpCredentials`
 * wire shape, or the validation message when the fields are not a usable
 * credential. The renderer builds every inline payload - the connection
 * test, save-as-profile, and the send override - through this one
 * construction, so the string port is coerced exactly once, in shared
 * code, and the wire schema's `Type` stays the domain type (`port:
 * number`).
 */
export function parseSmtpCredentials(
  form: SmtpCredentialForm,
): SmtpCredentials | { readonly message: string } {
  if (form.host.trim() === "") return { message: m["validation.smtpHostRequired"]() };
  const port = Number(form.port);
  if (!isValidSmtpPort(port)) {
    return { message: m["validation.smtpPortInvalid"]() };
  }
  if (form.username.trim() === "") return { message: m["validation.smtpUsernameRequired"]() };
  if (form.password === "") return { message: m["validation.smtpPasswordRequired"]() };
  return { host: form.host, port, username: form.username, password: form.password };
}

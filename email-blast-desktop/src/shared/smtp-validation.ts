/**
 * Validation for the SMTP profile form fields. The renderer disables the
 * save button with the same rule the main process enforces, so a form can
 * never submit something the service would reject - one source of truth,
 * like the template validation.
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
  if (fields.name.trim() === "") return "Profile name is required.";
  if (fields.host.trim() === "") return "SMTP host is required.";
  if (!Number.isInteger(fields.port) || fields.port < 1 || fields.port > 65535) {
    return "Port must be a whole number between 1 and 65535.";
  }
  if (fields.username.trim() === "") return "Username is required.";
  if (fields.password !== null && fields.password === "") {
    return "App password is required.";
  }
  return null;
}

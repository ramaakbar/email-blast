import { Context, Data, Effect, Layer, Option } from "effect";
import nodemailer from "nodemailer";
import Database from "better-sqlite3";
import type { SmtpProfile } from "../../shared/ipc";
import { validateSmtpProfile } from "../../shared/smtp-validation";
import {
  SqliteRepo,
  type SqliteRepoShape,
  type SmtpProfileDraft,
  type SmtpProfilePatch,
  type SmtpStoredProfile,
} from "../db/repository";

/**
 * The SMTP domain (ticket 14): named profiles (host, port, username, app
 * password) persisted locally, listed with masked passwords, editable and
 * deletable, and a connection test that proves a profile works before a
 * campaign sends through it. The stored password never leaves the main
 * process - the public profile shape carries `hasPassword` instead, and
 * the send pipeline resolves the credential here through `getCredentials`.
 */

// ---- Errors ----

/** A profile payload that fails validation (empty name/host/username, bad port, no password). */
export class InvalidSmtpProfile extends Data.TaggedError("InvalidSmtpProfile")<{
  readonly message: string;
}> {}

/** Updating or testing a profile whose id no longer exists (deleted elsewhere). */
export class SmtpProfileNotFound extends Data.TaggedError("SmtpProfileNotFound")<{}> {}

/** The SMTP server could not be reached (DNS, refused, timeout, socket error). */
export class SmtpConnectFailed extends Data.TaggedError("SmtpConnectFailed")<{
  readonly message: string;
}> {}

/** The server rejected the credentials (wrong username or app password). */
export class SmtpAuthFailed extends Data.TaggedError("SmtpAuthFailed")<{
  readonly message: string;
}> {}

/** The server refused the exchange for another reason (TLS, protocol, policy). */
export class SmtpSendFailed extends Data.TaggedError("SmtpSendFailed")<{
  readonly message: string;
}> {}

/** An attachment file referenced by a message is missing or unreadable. */
export class AttachmentNotFound extends Data.TaggedError("AttachmentNotFound")<{
  readonly message: string;
}> {}

/**
 * The typed send-domain error union (spec decision 9). The connection
 * test produces the connect/auth/send buckets; the send pipeline's
 * per-recipient send adds AttachmentNotFound - a file confirmed at
 * generate time may be gone by send time.
 */
export type SendError = SmtpConnectFailed | SmtpAuthFailed | SmtpSendFailed | AttachmentNotFound;

// ---- Environment ----

/** The credentials a connection test runs against, inline or stored. */
export interface SmtpCredentials {
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
}

/** One email the send pipeline delivers through the given credentials. */
export interface SmtpMailMessage {
  readonly to: string;
  readonly subject: string;
  readonly html: string;
  readonly fromName: string;
  readonly fromAddress: string;
  readonly attachments: readonly { filename: string; path: string }[];
}

export interface SmtpServiceShape {
  /** Every saved profile, newest first, passwords masked. */
  readonly list: () => Effect.Effect<SmtpProfile[]>;
  /** A single profile by id, or none when no such id exists. */
  readonly get: (id: string) => Effect.Effect<Option.Option<SmtpProfile>>;
  /** Saves a new profile; validates every field including the password. */
  readonly create: (draft: SmtpProfileDraft) => Effect.Effect<SmtpProfile, InvalidSmtpProfile>;
  /** Edits a profile; a null password keeps the stored one. */
  readonly update: (
    id: string,
    patch: SmtpProfilePatch,
  ) => Effect.Effect<SmtpProfile, InvalidSmtpProfile | SmtpProfileNotFound>;
  /** Deletes a profile and returns how many rows were removed. */
  readonly delete: (id: string) => Effect.Effect<number>;
  /** Connects and authenticates against the given server (the inline test). */
  readonly test: (credentials: SmtpCredentials) => Effect.Effect<void, SendError>;
  /** Connects and authenticates with a saved profile's stored credentials. */
  readonly testProfile: (id: string) => Effect.Effect<void, SmtpProfileNotFound | SendError>;
  /**
   * Delivers one message and resolves with the server's message id - the
   * send pipeline's per-recipient delivery. One fresh connection per
   * send (no pooling): the job runner owns pacing, so nodemailer's pool
   * limiter stays off. A missing attachment file fails with
   * AttachmentNotFound before anything is sent.
   */
  readonly send: (
    credentials: SmtpCredentials,
    message: SmtpMailMessage,
  ) => Effect.Effect<string, SendError>;
  /**
   * The stored credentials of a saved profile - the send pipeline's
   * only path to a credential, which never crosses the IPC bridge.
   */
  readonly getCredentials: (id: string) => Effect.Effect<SmtpCredentials, SmtpProfileNotFound>;
}

/**
 * Connects and authenticates against an SMTP server, failing fast. Port 465
 * gets implicit TLS (the convention of every SMTP form), everything else
 * STARTTLS when the server offers it. Timeouts keep a bad host from hanging
 * the UI for minutes.
 */
export function verifySmtp(credentials: SmtpCredentials): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: credentials.host,
    port: credentials.port,
    secure: credentials.port === 465,
    auth: { user: credentials.username, pass: credentials.password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });
  // verify() resolves with `true`; the callers' Effect channel is `void`,
  // so the boolean is discarded before it can leak into the contract.
  return transporter
    .verify()
    .then(() => undefined)
    .finally(() => transporter.close());
}

/**
 * Maps a nodemailer failure onto the typed SendError taxonomy. Nodemailer
 * tags its own failures with `code` (EAUTH for rejected credentials, the
 * Node net/tls codes for unreachable servers, ENOENT for a missing
 * attachment file); everything else lands in the generic bucket so no
 * failure escapes untyped.
 */
export function classifySmtpError(error: unknown): SendError {
  const code =
    error instanceof Error && "code" in error ? String((error as { code?: unknown }).code) : "";
  const message = error instanceof Error ? error.message : String(error);
  if (code === "EAUTH") return new SmtpAuthFailed({ message });
  // nodemailer wraps a missing attachment file as ESTREAM, keeping the
  // fs ENOENT wording inside the message - match on both.
  if (code === "ENOENT" || message.includes("ENOENT")) return new AttachmentNotFound({ message });
  if (
    [
      "ECONNECTION",
      "ETIMEDOUT",
      "ENOTFOUND",
      "EHOSTUNREACH",
      "ECONNREFUSED",
      "ECONNRESET",
      "ESOCKET",
      "ETLS",
    ].includes(code)
  ) {
    return new SmtpConnectFailed({ message });
  }
  return new SmtpSendFailed({ message });
}

/**
 * Delivers one message through a fresh transporter (the same
 * connection settings as `verifySmtp`) and resolves with the server's
 * message id. `transporter.close()` in `finally` releases the socket
 * even when the send failed, so a per-recipient failure never leaks a
 * connection.
 */
export function sendSmtp(credentials: SmtpCredentials, message: SmtpMailMessage): Promise<string> {
  const transporter = nodemailer.createTransport({
    host: credentials.host,
    port: credentials.port,
    secure: credentials.port === 465,
    auth: { user: credentials.username, pass: credentials.password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 30_000,
  });
  return transporter
    .sendMail({
      from: `"${message.fromName.replace(/["\\]/g, "")}" <${message.fromAddress}>`,
      to: message.to,
      subject: message.subject,
      html: message.html,
      attachments: message.attachments as {
        filename: string;
        path: string;
      }[],
    })
    .then((info) => (info.messageId || info.response || "").toString())
    .finally(() => transporter.close());
}

/** The public profile shape: the stored row minus the password, plus the mask flag. */
function toPublicProfile(profile: SmtpStoredProfile): SmtpProfile {
  return {
    id: profile.id,
    name: profile.name,
    host: profile.host,
    port: profile.port,
    username: profile.username,
    hasPassword: profile.password !== "",
    createdAt: profile.createdAt,
  };
}

export function makeSmtpService(repo: SqliteRepoShape): SmtpServiceShape {
  return {
    list: () => repo.listSmtpProfiles().pipe(Effect.map((rows) => rows.map(toPublicProfile))),
    get: (id) => repo.getSmtpProfile(id).pipe(Effect.map(Option.map(toPublicProfile))),
    create: (draft) =>
      Effect.gen(function* () {
        const error = validateSmtpProfile({
          name: draft.name,
          host: draft.host,
          port: draft.port,
          username: draft.username,
          password: draft.password,
        });
        if (error !== null) return yield* Effect.fail(new InvalidSmtpProfile({ message: error }));
        const stored = yield* repo.insertSmtpProfile({
          name: draft.name.trim(),
          host: draft.host.trim(),
          port: draft.port,
          username: draft.username.trim(),
          password: draft.password,
        });
        return toPublicProfile(stored);
      }),
    update: (id, patch) =>
      Effect.gen(function* () {
        const error = validateSmtpProfile({
          name: patch.name,
          host: patch.host,
          port: patch.port,
          username: patch.username,
          password: patch.password,
        });
        if (error !== null) return yield* Effect.fail(new InvalidSmtpProfile({ message: error }));
        const updated = yield* repo.updateSmtpProfile(id, {
          name: patch.name.trim(),
          host: patch.host.trim(),
          port: patch.port,
          username: patch.username.trim(),
          password: patch.password,
        });
        if (Option.isNone(updated)) return yield* Effect.fail(new SmtpProfileNotFound());
        return toPublicProfile(updated.value);
      }),
    delete: (id) => repo.deleteSmtpProfile(id),
    test: (credentials) =>
      Effect.tryPromise({
        try: () => verifySmtp(credentials),
        catch: (error) => classifySmtpError(error),
      }),
    testProfile: (id) =>
      Effect.gen(function* () {
        const stored = yield* repo.getSmtpProfile(id);
        if (Option.isNone(stored)) return yield* Effect.fail(new SmtpProfileNotFound());
        const { host, port, username, password } = stored.value;
        yield* Effect.tryPromise({
          try: () => verifySmtp({ host, port, username, password }),
          catch: (error) => classifySmtpError(error),
        });
      }),
    send: (credentials, message) =>
      Effect.tryPromise({
        try: () => sendSmtp(credentials, message),
        catch: (error) => classifySmtpError(error),
      }),
    getCredentials: (id) =>
      Effect.gen(function* () {
        const stored = yield* repo.getSmtpProfile(id);
        if (Option.isNone(stored)) return yield* Effect.fail(new SmtpProfileNotFound());
        const { host, port, username, password } = stored.value;
        return { host, port, username, password };
      }),
  };
}

/**
 * The SMTP domain service. Constructing this layer provides SqliteRepo
 * alongside, so a program can depend on either.
 */
export class SmtpService extends Context.Service<SmtpService, SmtpServiceShape>()("SmtpService") {
  static readonly Live = (db: Database.Database): Layer.Layer<SmtpService | SqliteRepo> =>
    Layer.provideMerge(
      Layer.effect(
        SmtpService,
        Effect.gen(function* () {
          const repo = yield* SqliteRepo;
          return makeSmtpService(repo);
        }),
      ),
      SqliteRepo.Live(db),
    );
}

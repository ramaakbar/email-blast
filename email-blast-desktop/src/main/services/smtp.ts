import { Context, Data, Effect, Layer, Option } from "effect";
import nodemailer from "nodemailer";
import { DatabaseSync } from "node:sqlite";
import type { SmtpProfile } from "../../shared/ipc";
import { validateSmtpProfile } from "../../shared/smtp-validation";
import {
  SqliteRepo,
  type SqliteRepoShape,
  type SmtpProfileDraft,
  type SmtpProfilePatch,
  type SmtpStoredProfile,
} from "./sqlite-repo";

/**
 * The SMTP domain (ticket 14): named profiles (host, port, username, app
 * password) persisted locally, listed with masked passwords, editable and
 * deletable, and a connection test that proves a profile works before a
 * campaign sends through it. The stored password never leaves the main
 * process - the public profile shape carries `hasPassword` instead, and
 * the send pipeline (future ticket) resolves the credential here.
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

/**
 * The typed send-domain error union (spec decision 9). The send pipeline
 * extends it with AttachmentNotFound; the connection test produces the
 * connect/auth/send buckets.
 */
export type SendError = SmtpConnectFailed | SmtpAuthFailed | SmtpSendFailed;

// ---- Environment ----

/** The credentials a connection test runs against, inline or stored. */
export interface SmtpCredentials {
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
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
 * Node net/tls codes for unreachable servers); everything else lands in
 * the generic bucket so no failure escapes untyped.
 */
export function classifySmtpError(error: unknown): SendError {
  const code =
    error instanceof Error && "code" in error ? String((error as { code?: unknown }).code) : "";
  const message = error instanceof Error ? error.message : String(error);
  if (code === "EAUTH") return new SmtpAuthFailed({ message });
  if (
    ["ECONNECTION", "ETIMEDOUT", "ENOTFOUND", "EHOSTUNREACH", "ECONNREFUSED", "ECONNRESET", "ESOCKET", "ETLS"].includes(
      code,
    )
  ) {
    return new SmtpConnectFailed({ message });
  }
  return new SmtpSendFailed({ message });
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
  };
}

/**
 * The SMTP domain service. Constructing this layer provides SqliteRepo
 * alongside, so a program can depend on either.
 */
export class SmtpService extends Context.Service<SmtpService, SmtpServiceShape>()("SmtpService") {
  static readonly Live = (db: DatabaseSync): Layer.Layer<SmtpService | SqliteRepo> =>
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

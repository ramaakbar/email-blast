import { Context, Effect, Layer, Option } from "effect";
import Database from "better-sqlite3";
import { and, asc, count, desc, eq, gte, inArray, isNotNull, lte, ne, sql } from "drizzle-orm";
import type { SQL } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { existsSync } from "fs";
import { join } from "path";
import type {
  GenerateJobStatus,
  GenerateRecipientStatus,
  ImportBatch,
  MessageTemplate,
  Recipient,
  RecipientListPayload,
  SendJobStatus,
  SendRecipientStatus,
  Template,
} from "../../shared/ipc";
import {
  generateJobRecipients as gjr,
  generateJobs as gj,
  messageTemplates as mt,
  recipients as r,
  sendJobRecipients as sjr,
  sendJobs as sj,
  settings as s,
  smtpProfiles as sp,
  templates as t,
} from "./schema";
import { isCiphertext, type CredentialCrypto } from "../services/credential-crypto";

/**
 * The migrations folder applied on open (drizzle/): packaged builds get it
 * via forge's extraResource (resources/drizzle), dev and tests run from the
 * package root where it lives next to package.json.
 */
function resolveMigrationsFolder(): string {
  const packagedPath =
    process.resourcesPath !== undefined ? join(process.resourcesPath, "drizzle") : null;
  if (packagedPath !== null && existsSync(packagedPath)) return packagedPath;
  return join(process.cwd(), "drizzle");
}

/**
 * Opens (creating if absent) the database and applies pending migrations.
 * The bootstrap migration is idempotent, so an existing database opens
 * unmodified - tables, data, and format survive (ADR-0002, ticket 22).
 *
 * Foreign keys are deliberately left unenforced: deleting a recipient or
 * template keeps historical job rows referencing it, so past job outcomes
 * survive (ticket 11 documented this against plain SQLite's default).
 * better-sqlite3 v13 turns FK enforcement ON by default (the inverse of
 * raw SQLite and of the `node:sqlite` driver the old layer guarded
 * against), so it is turned off explicitly here.
 */
export function openDatabase(dbPath: string): Database.Database {
  const db = new Database(dbPath);
  db.exec("PRAGMA foreign_keys = OFF");
  migrate(drizzle(db), { migrationsFolder: resolveMigrationsFolder() });
  return db;
}

/**
 * Ticket 02's one-time upgrade: every legacy plaintext credential still in
 * the database is encrypted in place - profile passwords and the inline
 * override blobs stored with past Send Jobs - so a leaked database file
 * exposes no password. Runs once at boot, right after the schema
 * migration, before any service reads a credential.
 *
 * Values that already carry the ciphertext marker are untouched, so the
 * migration is idempotent across relaunches. When the OS keychain is
 * unavailable the migration is skipped with a clear log - the app
 * degrades to plaintext storage rather than crashing (graceful
 * degradation, ticket 02 acceptance).
 */
export function migrateCredentialsAtRest(
  db: Database.Database,
  credCrypto: CredentialCrypto,
  log: (message: string) => void = console.log,
): void {
  if (!credCrypto.available()) {
    log("[boot] safeStorage unavailable - SMTP passwords stay plaintext (graceful degradation)");
    return;
  }
  db.transaction(() => {
    let profiles = 0;
    for (const row of db
      .prepare("SELECT id, password FROM smtp_profiles")
      .all() as { id: string; password: string }[]) {
      if (isCiphertext(row.password)) continue;
      db.prepare("UPDATE smtp_profiles SET password = ? WHERE id = ?").run(
        credCrypto.store(row.password),
        row.id,
      );
      profiles++;
    }
    let overrides = 0;
    for (const row of db
      .prepare("SELECT id, smtp_override FROM send_jobs WHERE smtp_override IS NOT NULL")
      .all() as { id: string; smtp_override: string }[]) {
      if (isCiphertext(row.smtp_override)) continue;
      db.prepare("UPDATE send_jobs SET smtp_override = ? WHERE id = ?").run(
        credCrypto.store(row.smtp_override),
        row.id,
      );
      overrides++;
    }
    if (profiles + overrides > 0) {
      log(
        `[boot] migrated ${profiles} profile password(s) and ${overrides} inline override(s) to keychain-encrypted storage`,
      );
    }
  })();
}

/**
 * A recipient ready to be persisted: the fields from the import pipeline,
 * without the id (assigned here) or the row-level defaults.
 */
export interface RecipientDraft {
  readonly name: string;
  readonly email: string | null;
  readonly phone: string | null;
  readonly metadata: Record<string, string>;
  readonly importBatch: string;
}

export interface SqliteRepoShape {
  readonly getSetting: (key: string) => Effect.Effect<Option.Option<string>>;
  readonly setSetting: (key: string, value: string) => Effect.Effect<void>;
  /**
   * Every email currently in the recipients table, trimmed and lowercased -
   * the dedupe key the import commit checks against.
   */
  readonly listRecipientEmails: () => Effect.Effect<Set<string>>;
  /**
   * Inserts a whole import batch in one transaction. Ids are assigned here
   * and emails are normalized (trim + lowercase) so the dedupe key and the
   * stored value can never drift apart.
   */
  readonly insertRecipients: (recipients: RecipientDraft[]) => Effect.Effect<void>;
  /**
   * One page of recipients, newest first. `search` matches case-insensitively
   * across name, email, phone, and the serialized metadata bag (so custom
   * field values are searchable too); `importBatch` narrows to one batch.
   */
  readonly listRecipients: (
    filter: RecipientListPayload,
  ) => Effect.Effect<{ readonly items: Recipient[]; readonly total: number }>;
  /** A single recipient by id, or none when no such row exists. */
  readonly getRecipient: (id: string) => Effect.Effect<Option.Option<Recipient>>;
  /**
   * Deletes the given ids and returns how many rows were removed. Historical
   * job rows keep referencing the deleted ids (foreign keys are not
   * enforced by default in SQLite) so past job outcomes survive.
   */
  readonly deleteRecipients: (ids: readonly string[]) => Effect.Effect<number>;
  /** Every distinct import batch, newest first, with its stamp and size. */
  readonly listImportBatches: () => Effect.Effect<ImportBatch[]>;
  /**
   * Every recipient matching the search text and import-batch filter,
   * unpaginated - the compose wizard's select-all reads the full list so
   * generation holds every selected row's metadata.
   */
  readonly listAllRecipients: (filter: {
    readonly search: string | null;
    readonly importBatch: string | null;
  }) => Effect.Effect<Recipient[]>;
  /** Every registered template, newest first. Slots round-trip through JSON. */
  readonly listTemplates: () => Effect.Effect<Template[]>;
  /** A single template by id, or none when no such row exists. */
  readonly getTemplate: (id: string) => Effect.Effect<Option.Option<Template>>;
  /** Inserts a template; the id is assigned here. */
  readonly insertTemplate: (draft: TemplateDraft) => Effect.Effect<Template>;
  /**
   * Updates the mutable template fields (name, slots, output pattern).
   * Returns the updated template, or none when no such row exists.
   */
  readonly updateTemplate: (
    id: string,
    patch: TemplatePatch,
  ) => Effect.Effect<Option.Option<Template>>;
  /** Deletes a template and returns how many rows were removed. */
  readonly deleteTemplate: (id: string) => Effect.Effect<number>;
  /**
   * Every Message Template, most recently edited first. Copy-on-pick
   * (ADR 0005): Send Jobs never reference these rows, so nothing here
   * joins into the send domain.
   */
  readonly listMessageTemplates: () => Effect.Effect<MessageTemplate[]>;
  /** A single Message Template by id, or none when no such row exists. */
  readonly getMessageTemplate: (id: string) => Effect.Effect<Option.Option<MessageTemplate>>;
  /** Inserts a Message Template; the id is assigned here. */
  readonly insertMessageTemplate: (draft: MessageTemplateDraft) => Effect.Effect<MessageTemplate>;
  /**
   * Updates the mutable Message Template fields (name, subject, body).
   * Returns the updated row, or none when no such id exists.
   */
  readonly updateMessageTemplate: (
    id: string,
    patch: MessageTemplatePatch,
  ) => Effect.Effect<Option.Option<MessageTemplate>>;
  /** Deletes a Message Template and returns how many rows were removed. */
  readonly deleteMessageTemplate: (id: string) => Effect.Effect<number>;
  /** Inserts a generate job row and returns its assigned id. */
  readonly insertGenerateJob: (templateId: string) => Effect.Effect<string>;
  /** Inserts one pending recipient row per id, in the given order. */
  readonly insertGenerateJobRecipients: (
    jobId: string,
    recipientIds: readonly string[],
  ) => Effect.Effect<void>;
  /**
   * Moves a generate job through its lifecycle. `completedAt` is written
   * when the job finishes; passing null clears it (e.g. back to pending
   * after a job-level failure).
   */
  readonly setGenerateJobStatus: (
    jobId: string,
    status: GenerateJobStatus,
    completedAt?: string | null,
  ) => Effect.Effect<void>;
  /**
   * The full generate job: the job row plus every recipient outcome joined
   * with the recipient's name (null after the recipient is deleted), in
   * job order. None when the job id does not exist.
   */
  readonly getGenerateJob: (
    jobId: string,
  ) => Effect.Effect<Option.Option<GenerateJobWithRecipients>>;
  /** Records one recipient's outcome inside a generate job. */
  readonly setGenerateRecipientResult: (
    jobId: string,
    recipientId: string,
    result: {
      status: Extract<GenerateRecipientStatus, "generated" | "failed">;
      outputPath: string | null;
      errorMessage: string | null;
    },
  ) => Effect.Effect<void>;
  /** The recipients with these ids, in the given order. */
  readonly getRecipientsByIds: (ids: readonly string[]) => Effect.Effect<Recipient[]>;
  /** One recipient row of a generate job, for the spot-check PDF read. */
  readonly getGenerateRecipient: (
    jobId: string,
    recipientId: string,
  ) => Effect.Effect<
    Option.Option<{ status: "pending" | "generated" | "failed"; outputPath: string | null }>
  >;
  /**
   * Every stored SMTP profile, newest first, with the password included -
   * the smtp service is the only consumer and strips it before anything
   * crosses the IPC bridge.
   */
  readonly listSmtpProfiles: () => Effect.Effect<SmtpStoredProfile[]>;
  /** A single stored profile by id, password included, or none. */
  readonly getSmtpProfile: (id: string) => Effect.Effect<Option.Option<SmtpStoredProfile>>;
  /** Inserts a profile; the id is assigned here. */
  readonly insertSmtpProfile: (draft: SmtpProfileDraft) => Effect.Effect<SmtpStoredProfile>;
  /**
   * Updates the mutable profile fields (name, host, port, username, and
   * password when given). Returns the updated row, or none when no such
   * id exists.
   */
  readonly updateSmtpProfile: (
    id: string,
    patch: SmtpProfilePatch,
  ) => Effect.Effect<Option.Option<SmtpStoredProfile>>;
  /** Deletes a profile and returns how many rows were removed. */
  readonly deleteSmtpProfile: (id: string) => Effect.Effect<number>;
  /** Inserts a send job row and returns its assigned id. */
  readonly insertSendJob: (draft: SendJobDraft) => Effect.Effect<string>;
  /** Inserts one pending recipient row per id, in the given order. */
  readonly insertSendJobRecipients: (
    jobId: string,
    recipientIds: readonly string[],
  ) => Effect.Effect<void>;
  /** Moves a send job through its lifecycle; null completedAt clears it. */
  readonly setSendJobStatus: (
    jobId: string,
    status: SendJobStatus,
    completedAt?: string | null,
  ) => Effect.Effect<void>;
  /**
   * The send pipeline's critical section: the per-recipient outcome and
   * the job cursor in ONE transaction, so a crash between them can never
   * leave a sent email un-advanced (double-send) or an advanced cursor
   * behind an un-sent recipient (skip).
   */
  readonly persistSendOutcome: (
    jobId: string,
    recipientId: string,
    result: {
      status: Extract<SendRecipientStatus, "sent" | "failed" | "skipped">;
      messageId: string | null;
      errorMessage: string | null;
      sentAt: string | null;
    },
    cursorIndex: number,
  ) => Effect.Effect<void>;
  /**
   * The full send job: the job row (with the profile name) plus every
   * recipient outcome joined with the recipient's name, in job order.
   * None when the job id does not exist.
   */
  readonly getSendJob: (jobId: string) => Effect.Effect<Option.Option<SendJobWithRecipients>>;
  /**
   * The Logs table: every send job, most recent first, with the
   * per-recipient counts and the template it generated from - narrowed by
   * status and creation date (both optional). The date bounds are
   * inclusive UTC stamps compared against the job's creation stamp; the
   * renderer converts the user's local calendar days before calling.
   */
  readonly listSendJobs: (filter: {
    readonly statusFilter: SendJobStatus | null;
    readonly dateFrom: string | null;
    readonly dateTo: string | null;
  }) => Effect.Effect<SendJobSummaryRow[]>;
  /**
   * Cancel, terminal: in ONE transaction the remaining `pending`
   * recipients become `skipped` and the job `cancelled` (with
   * completedAt). Sent/failed rows keep their outcomes.
   */
  readonly cancelSendJob: (jobId: string) => Effect.Effect<void>;
  /**
   * Retry failures: in ONE transaction the `failed` recipients return to
   * `pending` (error cleared), the cursor rewinds to the first of them,
   * and the job returns to `pending` so the pipeline re-runs exactly
   * those. Returns how many recipients were reset.
   */
  readonly retryFailedSendJob: (jobId: string) => Effect.Effect<number>;
  /**
   * Whether ANY OTHER send job is active - `sending` or a paused-but-
   * unresumed job - the one-active-job rule (spec section 5). The job
   * itself is excluded so a paused job can always be resumed.
   */
  readonly anySendJobActiveExcept: (jobId: string) => Effect.Effect<boolean>;
  /**
   * Boot recovery (ticket 17): every job stuck `sending` - a hard crash,
   * power loss, or a quit that landed between recipients - becomes
   * `paused`; the row data and the persisted cursor are untouched, so a
   * later resume continues from where the loop stopped. Returns how many
   * jobs were recovered.
   */
  readonly recoverInterruptedSends: () => Effect.Effect<number>;
}

/**
 * A template ready to be persisted: the fields from the registration form,
 * without the id (assigned here) or the created stamp.
 */
export interface TemplateDraft {
  readonly name: string;
  readonly filePath: string;
  readonly type: "docx" | "image";
  readonly slots: readonly string[];
  readonly outputPattern: string;
}

/** The mutable template fields; the file path and type never change. */
export interface TemplatePatch {
  readonly name: string;
  readonly slots: readonly string[];
  readonly outputPattern: string;
}

/**
 * A Message Template ready to be persisted (ticket 03): the form fields,
 * without the id or the created/updated stamps. `bodyHtml` is the raw
 * HTML with `{slot}` placeholders - interpolation happens per recipient
 * at send time, never at save time.
 */
export interface MessageTemplateDraft {
  readonly name: string;
  readonly subject: string;
  readonly bodyHtml: string;
}

/** The mutable Message Template fields; every field is always updated. */
export interface MessageTemplatePatch {
  readonly name: string;
  readonly subject: string;
  readonly bodyHtml: string;
}

/** A generate job row as stored, with the template name for display. */
export interface GenerateJobWithRecipients {
  readonly job: {
    readonly id: string;
    readonly templateId: string;
    readonly templateName: string;
    readonly status: GenerateJobStatus;
    readonly createdAt: string;
    readonly completedAt: string | null;
  };
  readonly recipients: readonly GenerateJobRecipientRow[];
}

/** One generate-job recipient row as stored, name joined for display. */
export interface GenerateJobRecipientRow {
  readonly recipientId: string;
  readonly recipientName: string | null;
  readonly status: GenerateRecipientStatus;
  readonly outputPath: string | null;
  readonly errorMessage: string | null;
}

/**
 * An SMTP profile row as stored, password included as the DECRYPTED
 * plaintext - the column itself holds ciphertext (ticket 02). The smtp
 * service maps this to the shared `SmtpProfile` shape (password dropped,
 * `hasPassword` set) at its boundary, so the credential never leaves the
 * main process. The nullable Sender Identity fields (ticket 01) are the
 * profile's defaults; null means "not set", never an empty string.
 */
export interface SmtpStoredProfile {
  readonly id: string;
  readonly name: string;
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly senderName: string | null;
  readonly senderAddress: string | null;
  readonly replyTo: string | null;
  readonly createdAt: string;
}

/** A profile ready to be persisted: the form fields, without the id or stamp. */
export interface SmtpProfileDraft {
  readonly name: string;
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly senderName: string | null;
  readonly senderAddress: string | null;
  readonly replyTo: string | null;
}

/**
 * The mutable profile fields. `password` null keeps the stored one - the
 * edit dialog cannot see the stored value, so omitting it must not clear it.
 */
export interface SmtpProfilePatch {
  readonly name: string;
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string | null;
  readonly senderName: string | null;
  readonly senderAddress: string | null;
  readonly replyTo: string | null;
}

/**
 * A send job ready to be persisted: the compose wizard's channel config
 * plus the per-job pacing snapshot. `smtpOverride` is the serialized
 * inline credential JSON (plaintext at rest, the ticket-14 posture);
 * `cursorIndex` starts at 0 and `totalCount` is the recipient count.
 */
export interface SendJobDraft {
  readonly generateJobId: string;
  readonly smtpProfileId: string | null;
  readonly smtpOverrideJson: string | null;
  readonly subject: string;
  readonly bodyHtml: string;
  readonly senderName: string;
  readonly senderAddress: string;
  /** The per-job Reply-To (ticket 01); null when the job carries none. */
  readonly replyTo: string | null;
  readonly delayMs: number;
  readonly totalCount: number;
}

/** A send job row as stored, with the profile name and template joined for display. */
export interface SendJobWithRecipients {
  readonly job: {
    readonly id: string;
    readonly generateJobId: string;
    readonly status: SendJobStatus;
    readonly smtpProfileId: string | null;
    readonly smtpProfileName: string | null;
    readonly smtpOverrideJson: string | null;
    readonly templateId: string | null;
    readonly templateName: string | null;
    readonly subject: string;
    readonly bodyHtml: string;
    readonly senderName: string;
    readonly senderAddress: string;
    readonly replyTo: string | null;
    readonly delayMs: number;
    readonly cursorIndex: number;
    readonly totalCount: number;
    readonly createdAt: string;
    readonly completedAt: string | null;
  };
  readonly recipients: readonly SendJobRecipientRow[];
}

/** One send-job recipient row as stored, name and email joined for display. */
export interface SendJobRecipientRow {
  readonly recipientId: string;
  readonly recipientName: string | null;
  readonly recipientEmail: string | null;
  readonly status: SendRecipientStatus;
  readonly messageId: string | null;
  readonly errorMessage: string | null;
  readonly sentAt: string | null;
}

/** One Logs-table row: the job header plus the per-recipient outcome counts. */
export interface SendJobSummaryRow {
  readonly id: string;
  readonly status: SendJobStatus;
  readonly subject: string;
  readonly templateId: string | null;
  readonly templateName: string | null;
  readonly sentCount: number;
  readonly failedCount: number;
  readonly skippedCount: number;
  readonly totalCount: number;
  readonly cursorIndex: number;
  readonly createdAt: string;
  readonly completedAt: string | null;
}

function normalizeEmail(email: string | null): string | null {
  if (email === null) return null;
  const trimmed = email.trim();
  return trimmed === "" ? null : trimmed.toLowerCase();
}

function normalizePhone(phone: string | null | undefined): string | null {
  return phone?.trim() === "" ? null : (phone?.trim() ?? null);
}

/**
 * Escapes LIKE wildcards so user search text matches literally - a search
 * for "100%" finds only recipients whose field contains a literal "%".
 */
function escapeLike(term: string): string {
  return term.replace(/[\\%_]/g, (ch) => `\\${ch}`);
}

/**
 * The LIKE search over the recipient columns, case-insensitively over the
 * serialized metadata bag too (custom field values and field names match).
 * The ESCAPE clause keeps user search text literal; JSON punctuation can
 * match too - a degenerate query like "," - the accepted tradeoff for
 * keeping the search index-free.
 */
function recipientSearchClause(pattern: string): SQL {
  // The double backslash survives the template literal as one backslash:
  // ESCAPE '\' - a single `\'` here would collapse to an empty string.
  return sql`(name LIKE ${pattern} ESCAPE '\\' OR email LIKE ${pattern} ESCAPE '\\' OR phone LIKE ${pattern} ESCAPE '\\' OR metadata LIKE ${pattern} ESCAPE '\\')`;
}

/** A recipients row as stored: the metadata bag still serialized. */
interface RecipientRow {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  metadata: string;
  import_batch: string;
  created_at: string;
}

/** A templates row as stored: the slots array still serialized as JSON. */
interface TemplateRow {
  id: string;
  name: string;
  file_path: string;
  type: "docx" | "image";
  slots: string;
  output_pattern: string;
  created_at: string;
}

/** An smtp_profiles row as stored. */
interface SmtpProfileRow {
  id: string;
  name: string;
  host: string;
  port: number;
  username: string;
  password: string;
  default_sender_name: string | null;
  default_sender_address: string | null;
  default_reply_to: string | null;
  created_at: string;
}

function toSmtpStoredProfile(row: SmtpProfileRow, password: string): SmtpStoredProfile {
  return {
    id: row.id,
    name: row.name,
    host: row.host,
    port: row.port,
    username: row.username,
    password,
    senderName: row.default_sender_name,
    senderAddress: row.default_sender_address,
    replyTo: row.default_reply_to,
    createdAt: row.created_at,
  };
}

function toTemplate(row: TemplateRow): Template {
  return {
    id: row.id,
    name: row.name,
    filePath: row.file_path,
    type: row.type,
    slots: JSON.parse(row.slots) as string[],
    outputPattern: row.output_pattern,
    createdAt: row.created_at,
  };
}

/** A message_templates row as stored. */
interface MessageTemplateRow {
  id: string;
  name: string;
  subject: string;
  body_html: string;
  created_at: string;
  updated_at: string;
}

function toMessageTemplate(row: MessageTemplateRow): MessageTemplate {
  return {
    id: row.id,
    name: row.name,
    subject: row.subject,
    bodyHtml: row.body_html,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toRecipient(row: RecipientRow): Recipient {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    metadata: JSON.parse(row.metadata) as Record<string, string>,
    importBatch: row.import_batch,
    createdAt: row.created_at,
  };
}

/**
 * The recipient row columns, shared by every recipients query. Aliased to
 * the snake_case storage names so the result keys match RecipientRow
 * verbatim - a camelCase key here would silently null out every
 * import_batch and created_at at runtime.
 */
const recipientColumns = {
  id: r.id,
  name: r.name,
  email: r.email,
  phone: r.phone,
  metadata: r.metadata,
  import_batch: r.importBatch,
  created_at: r.createdAt,
} as const;

/** The template row columns, shared by every templates query (same alias rule). */
const templateColumns = {
  id: t.id,
  name: t.name,
  file_path: t.filePath,
  type: t.type,
  slots: t.slots,
  output_pattern: t.outputPattern,
  created_at: t.createdAt,
} as const;

/** The message_templates row columns, shared by every message-templates query (same alias rule). */
const messageTemplateColumns = {
  id: mt.id,
  name: mt.name,
  subject: mt.subject,
  body_html: mt.bodyHtml,
  created_at: mt.createdAt,
  updated_at: mt.updatedAt,
} as const;

/** The smtp_profiles row columns, shared by every smtp-profiles query (same alias rule). */
const smtpProfileColumns = {
  id: sp.id,
  name: sp.name,
  host: sp.host,
  port: sp.port,
  username: sp.username,
  password: sp.password,
  default_sender_name: sp.defaultSenderName,
  default_sender_address: sp.defaultSenderAddress,
  default_reply_to: sp.defaultReplyTo,
  created_at: sp.createdAt,
} as const;

export function makeSqliteRepo(
  db: Database.Database,
  credCrypto: CredentialCrypto,
): SqliteRepoShape {
  const dbx = drizzle(db);
  return {
    getSetting: (key) =>
      Effect.sync(() => {
        const row = dbx.select({ value: s.value }).from(s).where(eq(s.key, key)).get();
        return row === undefined ? Option.none() : Option.some(row.value);
      }),
    setSetting: (key, value) =>
      Effect.sync(() => {
        dbx
          .insert(s)
          .values({ key, value })
          .onConflictDoUpdate({ target: s.key, set: { value } })
          .run();
      }),
    listRecipientEmails: () =>
      Effect.sync(() => {
        const rows = dbx
          .select({ email: r.email })
          .from(r)
          .where(and(isNotNull(r.email), ne(r.email, "")))
          .all();
        return new Set(rows.map((row) => (row.email as string).trim().toLowerCase()));
      }),
    insertRecipients: (recipients) =>
      Effect.sync(() => {
        if (recipients.length === 0) return;
        dbx.transaction((tx) => {
          for (const recipient of recipients) {
            tx.insert(r)
              .values({
                id: crypto.randomUUID(),
                name: recipient.name,
                email: normalizeEmail(recipient.email),
                phone: normalizePhone(recipient.phone),
                metadata: JSON.stringify(recipient.metadata),
                importBatch: recipient.importBatch,
              })
              .run();
          }
        });
      }),
    listRecipients: ({ search, importBatch, page, pageSize }) =>
      Effect.sync(() => {
        const conditions: SQL[] = [];
        if (search !== null && search.trim() !== "") {
          conditions.push(recipientSearchClause(`%${escapeLike(search.trim())}%`));
        }
        if (importBatch !== null) {
          conditions.push(eq(r.importBatch, importBatch));
        }
        const where = conditions.length === 0 ? undefined : and(...conditions);
        const total = dbx.select({ n: count() }).from(r).where(where).get()?.n ?? 0;
        // Newest imports first; same-second rows tiebreak by name, then id.
        const rows = dbx
          .select(recipientColumns)
          .from(r)
          .where(where)
          .orderBy(desc(r.createdAt), sql`name COLLATE NOCASE ASC`, asc(r.id))
          .limit(pageSize)
          .offset((page - 1) * pageSize)
          .all() as unknown as RecipientRow[];
        return { items: rows.map(toRecipient), total };
      }),
    getRecipient: (id) =>
      Effect.sync(() => {
        const row = dbx.select(recipientColumns).from(r).where(eq(r.id, id)).get() as
          | RecipientRow
          | undefined;
        return row === undefined ? Option.none() : Option.some(toRecipient(row));
      }),
    deleteRecipients: (ids) =>
      Effect.sync(() => {
        if (ids.length === 0) return 0;
        return dbx
          .delete(r)
          .where(inArray(r.id, ids as string[]))
          .run().changes;
      }),
    listImportBatches: () =>
      Effect.sync(() => {
        return dbx
          .select({
            id: r.importBatch,
            createdAt: sql<string>`MIN(${r.createdAt})`,
            count: count(),
          })
          .from(r)
          .groupBy(r.importBatch)
          .orderBy(desc(sql`MIN(${r.createdAt})`), asc(r.importBatch))
          .all();
      }),
    listAllRecipients: ({ search, importBatch }) =>
      Effect.sync(() => {
        const conditions: SQL[] = [];
        if (search !== null && search.trim() !== "") {
          conditions.push(recipientSearchClause(`%${escapeLike(search.trim())}%`));
        }
        if (importBatch !== null) {
          conditions.push(eq(r.importBatch, importBatch));
        }
        const where = conditions.length === 0 ? undefined : and(...conditions);
        const rows = dbx
          .select(recipientColumns)
          .from(r)
          .where(where)
          .orderBy(desc(r.createdAt), sql`name COLLATE NOCASE ASC`, asc(r.id))
          .all() as unknown as RecipientRow[];
        return rows.map(toRecipient);
      }),
    listTemplates: () =>
      Effect.sync(() => {
        const rows = dbx
          .select(templateColumns)
          .from(t)
          .orderBy(desc(t.createdAt), sql`name COLLATE NOCASE ASC`, asc(t.id))
          .all() as unknown as TemplateRow[];
        return rows.map(toTemplate);
      }),
    getTemplate: (id) =>
      Effect.sync(() => {
        const row = dbx.select(templateColumns).from(t).where(eq(t.id, id)).get() as
          | TemplateRow
          | undefined;
        return row === undefined ? Option.none() : Option.some(toTemplate(row));
      }),
    insertTemplate: (draft) =>
      Effect.sync(() => {
        const id = crypto.randomUUID();
        dbx
          .insert(t)
          .values({
            id,
            name: draft.name,
            filePath: draft.filePath,
            type: draft.type,
            slots: JSON.stringify(draft.slots),
            outputPattern: draft.outputPattern,
          })
          .run();
        // The insert above just landed, so the row must exist.
        const row = dbx.select(templateColumns).from(t).where(eq(t.id, id)).get() as TemplateRow;
        return toTemplate(row);
      }),
    updateTemplate: (id, patch) =>
      Effect.sync(() => {
        const result = dbx
          .update(t)
          .set({
            name: patch.name,
            slots: JSON.stringify(patch.slots),
            outputPattern: patch.outputPattern,
          })
          .where(eq(t.id, id))
          .run();
        if (result.changes === 0) return Option.none();
        const row = dbx.select(templateColumns).from(t).where(eq(t.id, id)).get() as
          | TemplateRow
          | undefined;
        return row === undefined ? Option.none() : Option.some(toTemplate(row));
      }),
    deleteTemplate: (id) =>
      Effect.sync(() => {
        return dbx.delete(t).where(eq(t.id, id)).run().changes;
      }),
    listMessageTemplates: () =>
      Effect.sync(() => {
        // Most recently edited first; same-second rows tiebreak by name,
        // then id - the list reads predictably while names stay stable.
        const rows = dbx
          .select(messageTemplateColumns)
          .from(mt)
          .orderBy(desc(mt.updatedAt), sql`name COLLATE NOCASE ASC`, asc(mt.id))
          .all() as unknown as MessageTemplateRow[];
        return rows.map(toMessageTemplate);
      }),
    getMessageTemplate: (id) =>
      Effect.sync(() => {
        const row = dbx.select(messageTemplateColumns).from(mt).where(eq(mt.id, id)).get() as
          | MessageTemplateRow
          | undefined;
        return row === undefined ? Option.none() : Option.some(toMessageTemplate(row));
      }),
    insertMessageTemplate: (draft) =>
      Effect.sync(() => {
        const id = crypto.randomUUID();
        dbx
          .insert(mt)
          .values({
            id,
            name: draft.name,
            subject: draft.subject,
            bodyHtml: draft.bodyHtml,
          })
          .run();
        // The insert above just landed, so the row must exist.
        const row = dbx
          .select(messageTemplateColumns)
          .from(mt)
          .where(eq(mt.id, id))
          .get() as MessageTemplateRow;
        return toMessageTemplate(row);
      }),
    updateMessageTemplate: (id, patch) =>
      Effect.sync(() => {
        const result = dbx
          .update(mt)
          .set({
            name: patch.name,
            subject: patch.subject,
            bodyHtml: patch.bodyHtml,
            updatedAt: sql`(datetime('now'))`,
          })
          .where(eq(mt.id, id))
          .run();
        if (result.changes === 0) return Option.none();
        const row = dbx.select(messageTemplateColumns).from(mt).where(eq(mt.id, id)).get() as
          | MessageTemplateRow
          | undefined;
        return row === undefined ? Option.none() : Option.some(toMessageTemplate(row));
      }),
    deleteMessageTemplate: (id) =>
      Effect.sync(() => {
        return dbx.delete(mt).where(eq(mt.id, id)).run().changes;
      }),
    insertGenerateJob: (templateId) =>
      Effect.sync(() => {
        const id = crypto.randomUUID();
        dbx.insert(gj).values({ id, templateId }).run();
        return id;
      }),
    insertGenerateJobRecipients: (jobId, recipientIds) =>
      Effect.sync(() => {
        if (recipientIds.length === 0) return;
        dbx.transaction((tx) => {
          for (const recipientId of recipientIds) {
            tx.insert(gjr).values({ jobId, recipientId }).run();
          }
        });
      }),
    setGenerateJobStatus: (jobId, status, completedAt = null) =>
      Effect.sync(() => {
        dbx.update(gj).set({ status, completedAt }).where(eq(gj.id, jobId)).run();
      }),
    getGenerateJob: (jobId) =>
      Effect.sync(() => {
        const row = dbx
          .select({
            id: gj.id,
            templateId: gj.templateId,
            templateName: sql<string>`COALESCE(${t.name}, '(deleted template)')`,
            status: gj.status,
            createdAt: gj.createdAt,
            completedAt: gj.completedAt,
          })
          .from(gj)
          .leftJoin(t, eq(t.id, gj.templateId))
          .where(eq(gj.id, jobId))
          .get();
        if (row === undefined) return Option.none();
        // LEFT JOIN so a recipient deleted after the job started still shows
        // its row (name falls back to "(deleted recipient)" in the service).
        // ORDER BY rowid keeps the insertion order - the job's processing order.
        const recipients = dbx
          .select({
            recipientId: gjr.recipientId,
            recipientName: r.name,
            status: gjr.status,
            outputPath: gjr.outputPath,
            errorMessage: gjr.errorMessage,
          })
          .from(gjr)
          .leftJoin(r, eq(r.id, gjr.recipientId))
          .where(eq(gjr.jobId, jobId))
          .orderBy(sql`${gjr}.rowid`)
          .all() as unknown as GenerateJobRecipientRow[];
        return Option.some({
          job: {
            id: row.id,
            templateId: row.templateId,
            templateName: row.templateName,
            status: row.status,
            createdAt: row.createdAt,
            completedAt: row.completedAt,
          },
          recipients,
        });
      }),
    setGenerateRecipientResult: (jobId, recipientId, result) =>
      Effect.sync(() => {
        dbx
          .update(gjr)
          .set({
            status: result.status,
            outputPath: result.outputPath,
            errorMessage: result.errorMessage,
          })
          .where(and(eq(gjr.jobId, jobId), eq(gjr.recipientId, recipientId)))
          .run();
      }),
    getRecipientsByIds: (ids) =>
      Effect.sync(() => {
        if (ids.length === 0) return [];
        const rows = dbx
          .select(recipientColumns)
          .from(r)
          .where(inArray(r.id, ids as string[]))
          .all() as unknown as RecipientRow[];
        const byId = new Map(rows.map((row) => [row.id, toRecipient(row)]));
        // Preserve the requested order - it is the job's processing order.
        return ids.flatMap((id) => (byId.has(id) ? [byId.get(id) as Recipient] : []));
      }),
    getGenerateRecipient: (jobId, recipientId) =>
      Effect.sync(() => {
        const row = dbx
          .select({ status: gjr.status, outputPath: gjr.outputPath })
          .from(gjr)
          .where(and(eq(gjr.jobId, jobId), eq(gjr.recipientId, recipientId)))
          .get() as
          | { status: "pending" | "generated" | "failed"; outputPath: string | null }
          | undefined;
        return row === undefined
          ? Option.none()
          : Option.some({ status: row.status, outputPath: row.outputPath });
      }),
    listSmtpProfiles: () =>
      Effect.sync(() => {
        const rows = dbx
          .select(smtpProfileColumns)
          .from(sp)
          // rowid DESC breaks ties within the same creation second: the
          // most recently added profile comes first.
          .orderBy(desc(sp.createdAt), sql`${sp}.rowid DESC`)
          .all() as unknown as SmtpProfileRow[];
        return rows.map((row) => toSmtpStoredProfile(row, credCrypto.read(row.password)));
      }),
    getSmtpProfile: (id) =>
      Effect.sync(() => {
        const row = dbx.select(smtpProfileColumns).from(sp).where(eq(sp.id, id)).get() as
          | SmtpProfileRow
          | undefined;
        return row === undefined
          ? Option.none()
          : Option.some(toSmtpStoredProfile(row, credCrypto.read(row.password)));
      }),
    insertSmtpProfile: (draft) =>
      Effect.sync(() => {
        const id = crypto.randomUUID();
        dbx
          .insert(sp)
          .values({
            id,
            name: draft.name,
            host: draft.host,
            port: draft.port,
            username: draft.username,
            // Encrypted at rest (ticket 02); store() falls back to
            // plaintext only when the keychain is unusable.
            password: credCrypto.store(draft.password),
            defaultSenderName: draft.senderName,
            defaultSenderAddress: draft.senderAddress,
            defaultReplyTo: draft.replyTo,
          })
          .run();
        // The insert above just landed, so the row must exist.
        const row = dbx
          .select(smtpProfileColumns)
          .from(sp)
          .where(eq(sp.id, id))
          .get() as SmtpProfileRow;
        return toSmtpStoredProfile(row, credCrypto.read(row.password));
      }),
    updateSmtpProfile: (id, patch) =>
      Effect.sync(() => {
        // null password keeps the stored one: drizzle skips `undefined`
        // columns in the SET clause, so a null patch never clears it (the
        // service rejects "" before persisting, mirroring the old
        // COALESCE(?, password)). A given password is encrypted at rest
        // like the insert path.
        const result = dbx
          .update(sp)
          .set({
            name: patch.name,
            host: patch.host,
            port: patch.port,
            username: patch.username,
            password:
              patch.password === null || patch.password === undefined
                ? undefined
                : credCrypto.store(patch.password),
            defaultSenderName: patch.senderName,
            defaultSenderAddress: patch.senderAddress,
            defaultReplyTo: patch.replyTo,
          })
          .where(eq(sp.id, id))
          .run();
        if (result.changes === 0) return Option.none();
        const row = dbx.select(smtpProfileColumns).from(sp).where(eq(sp.id, id)).get() as
          | SmtpProfileRow
          | undefined;
        return row === undefined
          ? Option.none()
          : Option.some(toSmtpStoredProfile(row, credCrypto.read(row.password)));
      }),
    deleteSmtpProfile: (id) =>
      Effect.sync(() => {
        return dbx.delete(sp).where(eq(sp.id, id)).run().changes;
      }),
    insertSendJob: (draft) =>
      Effect.sync(() => {
        const id = crypto.randomUUID();
        dbx
          .insert(sj)
          .values({
            id,
            generateJobId: draft.generateJobId,
            smtpProfileId: draft.smtpProfileId,
            // The whole inline override blob is encrypted at rest (ticket
            // 02) - the host/port/username ride along with the password.
            smtpOverride:
              draft.smtpOverrideJson === null ? null : credCrypto.store(draft.smtpOverrideJson),
            subject: draft.subject,
            bodyHtml: draft.bodyHtml,
            senderName: draft.senderName,
            senderAddress: draft.senderAddress,
            replyTo: draft.replyTo,
            delayMs: draft.delayMs,
            totalCount: draft.totalCount,
          })
          .run();
        return id;
      }),
    insertSendJobRecipients: (jobId, recipientIds) =>
      Effect.sync(() => {
        if (recipientIds.length === 0) return;
        dbx.transaction((tx) => {
          for (const recipientId of recipientIds) {
            tx.insert(sjr).values({ jobId, recipientId }).run();
          }
        });
      }),
    setSendJobStatus: (jobId, status, completedAt = null) =>
      Effect.sync(() => {
        dbx.update(sj).set({ status, completedAt }).where(eq(sj.id, jobId)).run();
      }),
    persistSendOutcome: (jobId, recipientId, result, cursorIndex) =>
      Effect.sync(() => {
        dbx.transaction((tx) => {
          tx.update(sjr)
            .set({
              status: result.status,
              messageId: result.messageId,
              errorMessage: result.errorMessage,
              sentAt: result.sentAt,
            })
            .where(and(eq(sjr.jobId, jobId), eq(sjr.recipientId, recipientId)))
            .run();
          tx.update(sj).set({ cursorIndex }).where(eq(sj.id, jobId)).run();
        });
      }),
    getSendJob: (jobId) =>
      Effect.sync(() => {
        const row = dbx
          .select({
            id: sj.id,
            generateJobId: sj.generateJobId,
            status: sj.status,
            smtpProfileId: sj.smtpProfileId,
            smtpProfileName: sp.name,
            smtpOverrideJson: sj.smtpOverride,
            templateId: gj.templateId,
            templateName: t.name,
            subject: sj.subject,
            bodyHtml: sj.bodyHtml,
            senderName: sj.senderName,
            senderAddress: sj.senderAddress,
            replyTo: sj.replyTo,
            delayMs: sj.delayMs,
            cursorIndex: sj.cursorIndex,
            totalCount: sj.totalCount,
            createdAt: sj.createdAt,
            completedAt: sj.completedAt,
          })
          .from(sj)
          .leftJoin(sp, eq(sp.id, sj.smtpProfileId))
          .leftJoin(gj, eq(gj.id, sj.generateJobId))
          .leftJoin(t, eq(t.id, gj.templateId))
          .where(eq(sj.id, jobId))
          .get();
        if (row === undefined) return Option.none();
        // LEFT JOIN so a recipient deleted after the job started still shows
        // its row (name falls back to "(deleted recipient)" in the service).
        const recipients = dbx
          .select({
            recipientId: sjr.recipientId,
            recipientName: r.name,
            recipientEmail: r.email,
            status: sjr.status,
            messageId: sjr.messageId,
            errorMessage: sjr.errorMessage,
            sentAt: sjr.sentAt,
          })
          .from(sjr)
          .leftJoin(r, eq(r.id, sjr.recipientId))
          .where(eq(sjr.jobId, jobId))
          .orderBy(sql`${sjr}.rowid`)
          .all() as unknown as SendJobRecipientRow[];
        return Option.some({
          job: {
            id: row.id,
            // The column is nullable in the schema (mirroring the on-disk
            // format) but every insert provides it, so the repo's contract
            // keeps it non-null, as before.
            generateJobId: row.generateJobId as string,
            status: row.status,
            smtpProfileId: row.smtpProfileId,
            smtpProfileName: row.smtpProfileName,
            // Decrypted here so the send pipeline and the job detail read
            // the plaintext JSON exactly as before; an unreadable
            // ciphertext blob (keychain unavailable) reads as no override
            // (read() returns "" only for unreadable ciphertext - the
            // stored blob is never an empty string) and the job's send
            // fails at preflight with a clear error.
            smtpOverrideJson:
              row.smtpOverrideJson === null
                ? null
                : (credCrypto.read(row.smtpOverrideJson) || null),
            templateId: row.templateId,
            templateName: row.templateName,
            subject: row.subject,
            bodyHtml: row.bodyHtml,
            senderName: row.senderName,
            senderAddress: row.senderAddress,
            replyTo: row.replyTo,
            delayMs: row.delayMs,
            cursorIndex: row.cursorIndex,
            totalCount: row.totalCount,
            createdAt: row.createdAt,
            completedAt: row.completedAt,
          },
          recipients,
        });
      }),
    listSendJobs: (filter) =>
      Effect.sync(() => {
        // The date bounds are full UTC stamps bounding the user's local
        // calendar days (the renderer converts); string comparison works
        // because every stamp is the fixed-width "YYYY-MM-DD HH:MM:SS".
        const conditions: SQL[] = [];
        if (filter.statusFilter !== null) {
          conditions.push(eq(sj.status, filter.statusFilter));
        }
        if (filter.dateFrom !== null) {
          conditions.push(gte(sj.createdAt, filter.dateFrom));
        }
        if (filter.dateTo !== null) {
          conditions.push(lte(sj.createdAt, filter.dateTo));
        }
        const rows = dbx
          .select({
            id: sj.id,
            status: sj.status,
            subject: sj.subject,
            templateId: gj.templateId,
            templateName: t.name,
            sentCount: sql<number>`(SELECT COUNT(*) FROM ${sjr} WHERE ${sjr.jobId} = ${sj.id} AND ${sjr.status} = 'sent')`,
            failedCount: sql<number>`(SELECT COUNT(*) FROM ${sjr} WHERE ${sjr.jobId} = ${sj.id} AND ${sjr.status} = 'failed')`,
            skippedCount: sql<number>`(SELECT COUNT(*) FROM ${sjr} WHERE ${sjr.jobId} = ${sj.id} AND ${sjr.status} = 'skipped')`,
            totalCount: sj.totalCount,
            cursorIndex: sj.cursorIndex,
            createdAt: sj.createdAt,
            completedAt: sj.completedAt,
          })
          .from(sj)
          .leftJoin(gj, eq(gj.id, sj.generateJobId))
          .leftJoin(t, eq(t.id, gj.templateId))
          .where(conditions.length === 0 ? undefined : and(...conditions))
          .orderBy(desc(sj.createdAt), sql`${sj}.rowid DESC`)
          .all() as unknown as SendJobSummaryRow[];
        return rows;
      }),
    cancelSendJob: (jobId) =>
      Effect.sync(() => {
        dbx.transaction((tx) => {
          tx.update(sjr)
            .set({ status: "skipped" })
            .where(and(eq(sjr.jobId, jobId), eq(sjr.status, "pending")))
            .run();
          tx.update(sj)
            .set({ status: "cancelled", completedAt: sql`(datetime('now'))` })
            .where(eq(sj.id, jobId))
            .run();
        });
      }),
    retryFailedSendJob: (jobId) =>
      Effect.sync(() => {
        return dbx.transaction((tx) => {
          const reset = tx
            .update(sjr)
            .set({
              status: "pending",
              messageId: null,
              errorMessage: null,
              sentAt: null,
            })
            .where(and(eq(sjr.jobId, jobId), eq(sjr.status, "failed")))
            .run();
          // Rewind the cursor to the first retried recipient - its index
          // (how many rows precede it); the pipeline re-processes from
          // there, skipping rows already sent/skipped.
          tx.update(sj)
            .set({
              cursorIndex: sql`(SELECT COUNT(*) FROM ${sjr} WHERE ${sjr.jobId} = ${jobId} AND rowid < (SELECT MIN(rowid) FROM ${sjr} WHERE ${sjr.jobId} = ${jobId} AND ${sjr.status} = 'pending'))`,
              status: "pending",
              completedAt: null,
            })
            .where(eq(sj.id, jobId))
            .run();
          return reset.changes;
        });
      }),
    anySendJobActiveExcept: (jobId) =>
      Effect.sync(() => {
        const row = dbx
          .select({ n: count() })
          .from(sj)
          .where(and(ne(sj.id, jobId), inArray(sj.status, ["sending", "paused"])))
          .get();
        return (row?.n ?? 0) > 0;
      }),
    recoverInterruptedSends: () =>
      Effect.sync(() => {
        return dbx.update(sj).set({ status: "paused" }).where(eq(sj.status, "sending")).run().changes;
      }),
  };
}

/**
 * Raw settings key/value access over the open database handle.
 * Domain services (Settings) and later tickets build on top of this.
 */
export class SqliteRepo extends Context.Service<SqliteRepo, SqliteRepoShape>()("SqliteRepo") {
  static readonly Live = (
    db: Database.Database,
    credCrypto: CredentialCrypto,
  ): Layer.Layer<SqliteRepo> => Layer.succeed(SqliteRepo, makeSqliteRepo(db, credCrypto));
}

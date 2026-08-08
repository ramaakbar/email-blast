import { sql } from "drizzle-orm";
import { check, index, integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * The Drizzle schema mirroring the app's on-disk SQLite format (spec
 * decision 7, verbatim - the tables, columns, defaults, CHECK constraints,
 * and indexes the hand-written layer created). ADR-0002: the on-disk
 * database keeps its tables and format so existing user data opens
 * unmodified; this schema is the source of truth drizzle-kit diffs future
 * migrations against (drizzle/).
 *
 * The CHECK constraints are declared explicitly because drizzle's sqlite
 * `text({ enum })` mode is a TypeScript-only constraint: it emits no
 * column CHECK in the migration SQL. The original tables carried them, so
 * the mirrored schema does too.
 *
 * Foreign keys are deliberately unenforced at runtime (better-sqlite3
 * leaves them off by default): deleting a recipient or template keeps
 * historical job rows referencing it, so past job outcomes survive (ticket
 * 11 documented this; the node:sqlite driver enforced FKs by default, so
 * the old layer turned them off explicitly - the Drizzle layer never turns
 * them on).
 */

export const recipients = sqliteTable(
  "recipients",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    metadata: text("metadata").notNull().default("{}"),
    importBatch: text("import_batch").notNull(),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (table) => [
    index("idx_recipients_email").on(table.email),
    index("idx_recipients_import_batch").on(table.importBatch),
  ],
);

export const templates = sqliteTable(
  "templates",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    filePath: text("file_path").notNull(),
    type: text("type", { enum: ["docx", "image"] }).notNull(),
    slots: text("slots").notNull().default("[]"),
    outputPattern: text("output_pattern").notNull(),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (table) => [check("templates_type_check", sql`${table.type} IN ('docx', 'image')`)],
);

export const generateJobs = sqliteTable(
  "generate_jobs",
  {
    id: text("id").primaryKey(),
    templateId: text("template_id")
      .notNull()
      .references(() => templates.id),
    status: text("status", { enum: ["pending", "generating", "generated", "cancelled"] })
      .notNull()
      .default("pending"),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(datetime('now'))`),
    completedAt: text("completed_at"),
  },
  (table) => [
    check(
      "generate_jobs_status_check",
      sql`${table.status} IN ('pending', 'generating', 'generated', 'cancelled')`,
    ),
  ],
);

export const generateJobRecipients = sqliteTable(
  "generate_job_recipients",
  {
    jobId: text("job_id")
      .notNull()
      .references(() => generateJobs.id),
    recipientId: text("recipient_id")
      .notNull()
      .references(() => recipients.id),
    status: text("status", { enum: ["pending", "generated", "failed"] })
      .notNull()
      .default("pending"),
    outputPath: text("output_path"),
    errorMessage: text("error_message"),
  },
  (table) => [
    primaryKey({ columns: [table.jobId, table.recipientId] }),
    check(
      "generate_job_recipients_status_check",
      sql`${table.status} IN ('pending', 'generated', 'failed')`,
    ),
  ],
);

export const sendJobs = sqliteTable(
  "send_jobs",
  {
    id: text("id").primaryKey(),
    generateJobId: text("generate_job_id").references(() => generateJobs.id),
    channel: text("channel", { enum: ["email", "whatsapp"] })
      .notNull()
      .default("email"),
    status: text("status", { enum: ["pending", "sending", "paused", "completed", "cancelled"] })
      .notNull()
      .default("pending"),
    smtpProfileId: text("smtp_profile_id").references(() => smtpProfiles.id),
    smtpOverride: text("smtp_override"),
    subject: text("subject").notNull(),
    bodyHtml: text("body_html").notNull(),
    senderName: text("sender_name").notNull(),
    senderAddress: text("sender_address").notNull(),
    delayMs: integer("delay_ms").notNull().default(1000),
    cursorIndex: integer("cursor_index").notNull().default(0),
    totalCount: integer("total_count").notNull().default(0),
    createdAt: text("created_at")
      .notNull()
      .default(sql`(datetime('now'))`),
    completedAt: text("completed_at"),
  },
  (table) => [
    check("send_jobs_channel_check", sql`${table.channel} IN ('email', 'whatsapp')`),
    check(
      "send_jobs_status_check",
      sql`${table.status} IN ('pending', 'sending', 'paused', 'completed', 'cancelled')`,
    ),
  ],
);

export const sendJobRecipients = sqliteTable(
  "send_job_recipients",
  {
    jobId: text("job_id")
      .notNull()
      .references(() => sendJobs.id),
    recipientId: text("recipient_id")
      .notNull()
      .references(() => recipients.id),
    status: text("status", { enum: ["pending", "sent", "failed", "skipped"] })
      .notNull()
      .default("pending"),
    messageId: text("message_id"),
    errorMessage: text("error_message"),
    sentAt: text("sent_at"),
  },
  (table) => [
    primaryKey({ columns: [table.jobId, table.recipientId] }),
    check(
      "send_job_recipients_status_check",
      sql`${table.status} IN ('pending', 'sent', 'failed', 'skipped')`,
    ),
  ],
);

export const smtpProfiles = sqliteTable("smtp_profiles", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  host: text("host").notNull(),
  port: integer("port").notNull().default(587),
  username: text("username").notNull(),
  password: text("password").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});

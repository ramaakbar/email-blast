import { Context, Data, Effect, Latch, Layer, Option, Result } from "effect";
import { existsSync } from "fs";
import { basename } from "path";
import type Database from "better-sqlite3";
import type {
  Recipient,
  SendJob,
  SendJobRecipient,
  SendJobStatus,
  SendJobSummary,
  SendStartPayload,
} from "../../shared/ipc";
import {
  parseRateLimitMs,
  RATE_LIMIT_MAX_MS,
  RATE_LIMIT_MIN_MS,
  SETTING_KEYS,
} from "../../shared/settings";
import { interpolateMessageHtml, interpolateMessagePlain, messageValues } from "../../shared/send";
import type { DefaultPaths } from "./default-paths";
import { GenerateJobService, type GenerateJobServiceShape } from "./generate-jobs";
import { ProgressHub, type ProgressHubShape } from "./progress-hub";
import {
  AttachmentNotFound,
  SmtpAuthFailed,
  SmtpProfileNotFound,
  SmtpService,
  type SendError,
  type SmtpCredentials,
  type SmtpServiceShape,
} from "./smtp";
import {
  SqliteRepo,
  type SendJobSummaryRow,
  type SendJobWithRecipients,
  type SqliteRepoShape,
} from "../db/repository";
import { Settings } from "./settings";
import { m } from "@paraglide/messages";

/**
 * The send pipeline (ticket 15): one email per recipient against the job's
 * SMTP identity, paced by a live rate-limit gate, retried 1s/2s/4s on
 * transient failures, pausing (persisted) instead of dying when a
 * recipient exhausts its retries. The cursor persists in the same
 * transaction as every per-recipient outcome (send -> persist -> emit), so
 * a quit at any moment loses at most the in-flight recipient. The run
 * loop is deterministic under TestClock: every delay goes through
 * `Effect.sleep`, so Seam A drives real SMTP traffic with synthetic time.
 *
 * Pause and cancel handlers persist the new state and wake the run loop
 * through an in-memory control latch; the loop re-checks at the pacing
 * gate, so an in-flight SMTP call always completes and its outcome
 * persists (an in-flight recipient may be sent after a cancel - that is
 * the documented at-most-one window). Retries are an explicit 4-attempt
 * loop (t0, t0+1s, t0+3s, t0+7s) - the same timing as
 * `Schedule.exponential("1 second", 2) x 3`, but deterministic under
 * TestClock and free of Schedule edge cases.
 *
 * Job-level failures fail the `run` effect itself and leave the job
 * pending/paused (pre-flight connect/auth, no confirmed attachments);
 * per-recipient failures (missing slot data, no attachment, SMTP retries
 * exhausted) mark that recipient failed with a reason and, when the
 * retries were exhausted, pause the job so the user decides next.
 */

// ---- Errors ----

/** Running, pausing, or inspecting a job whose id no longer exists. */
export class SendJobNotFound extends Data.TaggedError("SendJobNotFound")<{}> {}

/** A request the pipeline cannot honor (empty message, invalid state, wrong phase). */
export class InvalidSendRequest extends Data.TaggedError("InvalidSendRequest")<{
  readonly message: string;
}> {}

/** The typed send-domain error union crosses from the smtp service untouched. */
export type { SendError } from "./smtp";

// ---- Environment: what the pipeline needs from outside itself ----

export interface SendEnv {
  /**
   * The shutdown latch; open means the app is quitting. The run loop
   * checks it at each pacing gate and stops between recipients, leaving
   * the job `sending` - ticket 17's quit/resume flow treats that state
   * as paused at boot and continues from the persisted cursor.
   */
  readonly quitLatch: Latch.Latch;
}

/** The real environment: a latch that stays closed until quit handling opens it. */
export function realSendEnv(): SendEnv {
  return { quitLatch: Latch.makeUnsafe(false) };
}

// ---- The in-memory control surface of one run ----

interface RunControl {
  readonly jobId: string;
  /** Set by the pause handler; the loop emits job-paused and stops. */
  pauseRequested: boolean;
  /** Set by the cancel handler (which already did the transaction). */
  cancelRequested: boolean;
  /** Released by pause/cancel so the pacing gate wakes mid-delay. */
  readonly wake: Latch.Latch;
}

// ---- The domain service ----

export interface SendJobServiceShape {
  /**
   * Creates a pending send job: the message, the SMTP identity (saved
   * profile id or inline override, never both), and the recipients.
   * Nothing is sent yet - `run` does the work.
   */
  readonly start: (
    payload: SendStartPayload,
  ) => Effect.Effect<SendJob, InvalidSendRequest | SmtpProfileNotFound | SendJobNotFound>;
  /**
   * Runs the job: pre-flight (SMTP connect + auth, at least one confirmed
   * generated attachment) fails fast, then one email per recipient at the
   * live pacing rate. Resolves with the finished job; a recipient that
   * exhausts its retries pauses the job (persisted + job-paused event).
   * Re-running a finished job is a no-op; running while any job is
   * `sending` is rejected (one active send at a time).
   */
  readonly run: (
    jobId: string,
  ) => Effect.Effect<
    SendJob,
    SendJobNotFound | InvalidSendRequest | SmtpProfileNotFound | SendError
  >;
  /** Pauses a sending job: persisted `paused`, the loop stops at the next checkpoint. */
  readonly pause: (jobId: string) => Effect.Effect<SendJob, SendJobNotFound | InvalidSendRequest>;
  /** Marks a paused job `pending` so `run` can continue it from the cursor. */
  readonly resume: (jobId: string) => Effect.Effect<SendJob, SendJobNotFound | InvalidSendRequest>;
  /**
   * Cancels a job (terminal): the remaining `pending` recipients become
   * `skipped` and the job `cancelled` in one transaction. The in-flight
   * recipient's send completes and its outcome persists.
   */
  readonly cancel: (jobId: string) => Effect.Effect<SendJob, SendJobNotFound | InvalidSendRequest>;
  /** The full job snapshot, or none when the job id does not exist. */
  readonly getStatus: (jobId: string) => Effect.Effect<Option.Option<SendJob>>;
  /**
   * Retry failures: the `failed` recipients of a finished job return to
   * `pending`, the cursor rewinds to the first of them, and the job
   * returns to `pending` so `run` re-delivers exactly those - the
   * completion summary's Retry Failures action.
   */
  readonly retryFailed: (
    jobId: string,
  ) => Effect.Effect<SendJob, SendJobNotFound | InvalidSendRequest>;
  /**
   * The Logs table: every send job, most recent first, with the
   * per-recipient outcome counts - optionally narrowed by status and
   * creation date.
   */
  readonly list: (filter: {
    readonly statusFilter: SendJobStatus | null;
    readonly dateFrom: string | null;
    readonly dateTo: string | null;
  }) => Effect.Effect<readonly SendJobSummary[]>;
}

/** The SQLite UTC stamp format, matching `datetime('now')`. */
function sqliteUtcNow(): string {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
}

/** The stored-error format: the tag plus the detail, readable in the log. */
function sendErrorMessage(error: SendError): string {
  const detail = "message" in error ? error.message : "";
  const tag = error["_tag"];
  return detail === "" ? tag : `${tag}: ${detail}`;
}

/** The shared SendJob shape of a loaded job row pair, names mended. */
export function toSendJob(loaded: SendJobWithRecipients): SendJob {
  const { job, recipients } = loaded;
  let smtpOverride: SendJob["smtpOverride"] = null;
  if (job.smtpOverrideJson !== null) {
    const parsed = JSON.parse(job.smtpOverrideJson) as {
      host: string;
      port: number;
      username: string;
    };
    smtpOverride = { host: parsed.host, port: parsed.port, username: parsed.username };
  }
  return {
    id: job.id,
    generateJobId: job.generateJobId,
    status: job.status,
    smtpProfileId: job.smtpProfileId,
    // A profile id with no joined name means the profile was deleted; a
    // null id means an inline override was used and there is no name.
    smtpProfileName:
      job.smtpProfileId === null ? null : (job.smtpProfileName ?? "(deleted profile)"),
    smtpOverride,
    templateId: job.templateId,
    templateName: job.templateName,
    subject: job.subject,
    bodyHtml: job.bodyHtml,
    senderName: job.senderName,
    senderAddress: job.senderAddress,
    delayMs: job.delayMs,
    cursorIndex: job.cursorIndex,
    total: job.totalCount,
    createdAt: job.createdAt,
    completedAt: job.completedAt,
    recipients: recipients.map(
      (row): SendJobRecipient => ({
        recipientId: row.recipientId,
        recipientName: row.recipientName ?? "(deleted recipient)",
        recipientEmail: row.recipientEmail,
        status: row.status,
        messageId: row.messageId,
        errorMessage: row.errorMessage,
        sentAt: row.sentAt,
      }),
    ),
  };
}

/** The shared Logs-table row shape of a stored summary row. */
export function toSendJobSummary(row: SendJobSummaryRow): SendJobSummary {
  return {
    id: row.id,
    status: row.status,
    subject: row.subject,
    templateId: row.templateId,
    templateName: row.templateName,
    sentCount: row.sentCount,
    failedCount: row.failedCount,
    skippedCount: row.skippedCount,
    total: row.totalCount,
    cursorIndex: row.cursorIndex,
    createdAt: row.createdAt,
    completedAt: row.completedAt,
  };
}

/**
 * Reverts a job that was just resumed (status `pending` with a persisted
 * cursor) back to `paused` when its run is rejected before it starts -
 * the wind-down or one-active checks. Without the revert, the Logs
 * Resume button (resume + run as two calls) could leave such a job
 * `pending` with no path to ever run it again; a fresh job (cursor 0,
 * created by the wizard's send) legitimately stays pending for its
 * "Try again".
 */
function revertResumedJob(
  repo: SqliteRepoShape,
  loaded: SendJobWithRecipients,
): Effect.Effect<void, never, never> {
  if (loaded.job.status !== "pending" || loaded.job.cursorIndex <= 0) {
    return Effect.void;
  }
  return repo.setSendJobStatus(loaded.job.id, "paused", null);
}

export function makeSendJobService(
  repo: SqliteRepoShape,
  hub: ProgressHubShape,
  generate: GenerateJobServiceShape,
  smtp: SmtpServiceShape,
  env: SendEnv,
): SendJobServiceShape {
  /** The control of the currently running send, if any - pause/cancel wake it. */
  let active: RunControl | null = null;

  const loadJob = (jobId: string): Effect.Effect<SendJobWithRecipients, SendJobNotFound> =>
    Effect.gen(function* () {
      const loaded = yield* repo.getSendJob(jobId);
      if (Option.isNone(loaded)) return yield* Effect.fail(new SendJobNotFound());
      return loaded.value;
    });

  /** The job snapshot after a write; the row must exist. */
  const reloadJob = (jobId: string): Effect.Effect<SendJob, SendJobNotFound> =>
    Effect.gen(function* () {
      const loaded = yield* repo.getSendJob(jobId);
      if (Option.isNone(loaded)) return yield* Effect.fail(new SendJobNotFound());
      return toSendJob(loaded.value);
    });

  const resolveCredentials = (
    loaded: SendJobWithRecipients,
  ): Effect.Effect<SmtpCredentials, SmtpProfileNotFound> =>
    Effect.gen(function* () {
      if (loaded.job.smtpProfileId !== null) {
        return yield* smtp.getCredentials(loaded.job.smtpProfileId);
      }
      // The job started with an inline override; the credential was stored
      // with the job row (plaintext at rest, the ticket-14 posture).
      const parsed = JSON.parse(loaded.job.smtpOverrideJson ?? "{}") as SmtpCredentials;
      return {
        host: parsed.host,
        port: parsed.port,
        username: parsed.username,
        password: parsed.password,
      };
    });

  /**
   * The pre-flight (spec decision 5): prove the SMTP identity connects
   * and authenticates, and that at least one recipient has a confirmed
   * generated attachment on disk. Any failure fails `run` fast and the
   * job stays pending/paused - nothing is sent.
   */
  const preflight = (
    loaded: SendJobWithRecipients,
    credentials: SmtpCredentials,
  ): Effect.Effect<void, SendError | InvalidSendRequest> =>
    Effect.gen(function* () {
      yield* smtp.test(credentials);
      const confirmed = yield* generate.confirmedGoodAttachments(loaded.job.generateJobId);
      if (confirmed.length === 0) {
        return yield* Effect.fail(
          new InvalidSendRequest({
            message:
              m["sendJob.noConfirmedAttachments"](),
          }),
        );
      }
      if (!confirmed.some((entry) => existsSync(entry.outputPath))) {
        return yield* Effect.fail(
          new InvalidSendRequest({
            message:
              m["sendJob.attachmentsMissingOnDisk"](),
          }),
        );
      }
    });

  /** The live rate-limit setting - the gate reads it fresh before every send. */
  const liveRateLimit = (): Effect.Effect<number, never, never> =>
    repo
      .getSetting(SETTING_KEYS.rateLimitDelayMs)
      .pipe(Effect.map((raw) => parseRateLimitMs(Option.getOrNull(raw))));

  /**
   * Persists the paused state and notifies the renderer - the one path
   * both manual pause and retry exhaustion end at. `lastIndex` is the
   * cursor: how many recipients have a persisted outcome.
   */
  const pausePath = (
    jobId: string,
    reason: "user" | "retry-exhausted",
    lastIndex: number,
  ): Effect.Effect<void, never, never> =>
    Effect.gen(function* () {
      yield* repo.setSendJobStatus(jobId, "paused", null);
      hub.emit({ kind: "job-paused", jobId, reason, lastIndex });
    });

  /**
   * One recipient's delivery. Deterministic failures (recipient deleted,
   * no email, missing slot data, no confirmed attachment) fail
   * immediately - retrying cannot fix them, and the batch continues.
   * Only the SMTP send itself retries: 3 retries at 1s/2s/4s backoff;
   * exhaustion returns `retry-exhausted` so the caller auto-pauses.
   */
  const deliverOne = (
    loaded: SendJobWithRecipients,
    recipient: Recipient | undefined,
    attachmentPath: string | undefined,
    credentials: SmtpCredentials,
  ): Effect.Effect<
    | { kind: "sent"; messageId: string }
    | { kind: "failed"; errorMessage: string }
    | { kind: "retry-exhausted"; errorMessage: string },
    never,
    never
  > =>
    Effect.gen(function* () {
      if (recipient === undefined) {
        return { kind: "failed", errorMessage: m["sendJob.recipientDeleted"]() };
      }
      if (recipient.email === null || recipient.email.trim() === "") {
        return { kind: "failed", errorMessage: m["sendJob.recipientNoEmail"]() };
      }
      if (attachmentPath === undefined || !existsSync(attachmentPath)) {
        return {
          kind: "failed",
          errorMessage: m["sendJob.noAttachmentForRecipient"](),
        };
      }
      let subject: string;
      let html: string;
      try {
        const values = messageValues(recipient);
        subject = interpolateMessagePlain(loaded.job.subject, values);
        html = interpolateMessageHtml(loaded.job.bodyHtml, values);
      } catch (error) {
        return {
          kind: "failed",
          errorMessage: error instanceof Error ? error.message : String(error),
        };
      }
      let lastError: SendError | null = null;
      for (const delay of [0, 1000, 2000, 4000]) {
        if (delay > 0) yield* Effect.sleep(delay);
        const attempt = yield* smtp
          .send(credentials, {
            to: recipient.email,
            subject,
            html,
            fromName: loaded.job.senderName,
            fromAddress: loaded.job.senderAddress,
            attachments: [{ filename: basename(attachmentPath), path: attachmentPath }],
          })
          .pipe(Effect.result);
        if (Result.isSuccess(attempt)) return { kind: "sent", messageId: attempt.success };
        lastError = attempt.failure;
        // Deterministic failures will not heal by waiting: rejected
        // credentials and a missing attachment file fail the recipient
        // immediately instead of stalling the batch through the backoff.
        if (
          attempt.failure instanceof SmtpAuthFailed ||
          attempt.failure instanceof AttachmentNotFound
        ) {
          return { kind: "failed", errorMessage: sendErrorMessage(attempt.failure) };
        }
      }
      return {
        kind: "retry-exhausted",
        errorMessage: m["sendJob.retriesExhausted"]({ message: sendErrorMessage(lastError as SendError) }),
      };
    });

  /**
   * The send loop: checkpoint -> pacing gate (delay -> send -> persist) ->
   * emit, per recipient. The checkpoint is the only place pause, cancel,
   * and the quit latch take effect; the cursor persist is one atomic
   * transaction with the outcome, so a quit at any moment loses at most
   * the in-flight recipient.
   */
  const sendLoop = (
    loaded: SendJobWithRecipients,
    credentials: SmtpCredentials,
    control: RunControl,
  ): Effect.Effect<void, never, never> =>
    Effect.gen(function* () {
      const { job, recipients: rows } = loaded;
      const recipients = yield* repo.getRecipientsByIds(rows.map((row) => row.recipientId));
      const byId = new Map(recipients.map((recipient) => [recipient.id, recipient]));
      const confirmed = yield* generate.confirmedGoodAttachments(job.generateJobId);
      const attachmentByRecipient = new Map(confirmed.map((c) => [c.recipientId, c.outputPath]));
      const total = rows.length;
      let current = job.cursorIndex;

      for (let i = job.cursorIndex; i < total; i++) {
        const row = rows[i];
        if (row.status !== "pending") continue;
        // Checkpoint: the only place the outside world changes the run.
        if (control.cancelRequested) return;
        if (env.quitLatch.isOpen()) return;
        if (control.pauseRequested) {
          yield* pausePath(job.id, "user", current);
          return;
        }
        // The pacing gate fires BEFORE each send (delay -> send ->
        // persist), so pausing mid-delay never leaves a half-sent email.
        // The wake latch interrupts the delay when pause/cancel arrives.
        const interval = yield* liveRateLimit();
        yield* Effect.race(Effect.sleep(interval), control.wake.await);
        // Re-check: pause/cancel may have fired during the delay.
        if (control.cancelRequested) return;
        if (env.quitLatch.isOpen()) return;
        if (control.pauseRequested) {
          yield* pausePath(job.id, "user", current);
          return;
        }

        const outcome = yield* deliverOne(
          loaded,
          byId.get(row.recipientId),
          attachmentByRecipient.get(row.recipientId),
          credentials,
        );
        // The critical section: outcome and cursor land in one
        // transaction, then the event is emitted. Never separated.
        yield* repo.persistSendOutcome(
          job.id,
          row.recipientId,
          {
            status: outcome.kind === "sent" ? "sent" : "failed",
            messageId: outcome.kind === "sent" ? outcome.messageId : null,
            errorMessage: outcome.kind === "sent" ? null : outcome.errorMessage,
            sentAt: outcome.kind === "sent" ? sqliteUtcNow() : null,
          },
          i + 1,
        );
        current = i + 1;
        hub.emit({
          kind: "send-progress",
          jobId: job.id,
          current,
          total,
          status: outcome.kind === "sent" ? "sent" : "failed",
          recipientId: row.recipientId,
          messageId: outcome.kind === "sent" ? outcome.messageId : null,
          error: outcome.kind === "sent" ? null : outcome.errorMessage,
        });

        if (outcome.kind === "retry-exhausted") {
          // The recipient failed every retry; the job pauses (persisted)
          // so the user decides - resume to continue the batch, or
          // cancel. The renderer is notified by the job-paused event.
          // A cancel or quit that landed while the retries ran stands:
          // its decision is never overwritten by the pause. A manual
          // pause is the reason that wins when both apply.
          if (control.cancelRequested || env.quitLatch.isOpen()) return;
          yield* pausePath(job.id, control.pauseRequested ? "user" : "retry-exhausted", current);
          return;
        }
      }

      // The last recipient's delivery may have outlived a cancel, pause,
      // or quit that fired mid-send: re-check before stamping the job
      // completed, so a terminal or paused decision is never overwritten.
      if (control.cancelRequested) return;
      if (env.quitLatch.isOpen()) return;
      if (control.pauseRequested) {
        yield* pausePath(job.id, "user", current);
        return;
      }
      yield* repo.setSendJobStatus(job.id, "completed", sqliteUtcNow());
    });

  return {
    start: (payload) =>
      Effect.gen(function* () {
        const hasProfile = payload.smtpProfileId !== null && payload.smtpProfileId !== "";
        const hasOverride = payload.smtpOverride !== null;
        if (payload.recipientIds.length === 0) {
          return yield* Effect.fail(
            new InvalidSendRequest({ message: m["sendJob.selectRecipients"]() }),
          );
        }
        if (payload.subject.trim() === "") {
          return yield* Effect.fail(new InvalidSendRequest({ message: m["sendJob.writeSubject"]() }));
        }
        if (payload.bodyHtml.trim() === "") {
          return yield* Effect.fail(new InvalidSendRequest({ message: m["sendJob.writeBody"]() }));
        }
        if (payload.senderName.trim() === "" || payload.senderAddress.trim() === "") {
          return yield* Effect.fail(
            new InvalidSendRequest({ message: m["sendJob.enterSender"]() }),
          );
        }
        if (hasProfile === hasOverride) {
          return yield* Effect.fail(
            new InvalidSendRequest({
              message: m["sendJob.chooseOneIdentity"](),
            }),
          );
        }
        const recipients = yield* repo.getRecipientsByIds(payload.recipientIds);
        if (recipients.length === 0) {
          return yield* Effect.fail(
            new InvalidSendRequest({ message: m["sendJob.noRecipientsExist"]() }),
          );
        }
        if (hasProfile) {
          const stored = yield* repo.getSmtpProfile(payload.smtpProfileId as string);
          if (Option.isNone(stored)) {
            return yield* Effect.fail(new SmtpProfileNotFound());
          }
        }
        const jobId = yield* repo.insertSendJob({
          generateJobId: payload.generateJobId,
          smtpProfileId: hasProfile ? (payload.smtpProfileId as string) : null,
          smtpOverrideJson: hasOverride ? JSON.stringify(payload.smtpOverride) : null,
          subject: payload.subject.trim(),
          bodyHtml: payload.bodyHtml,
          senderName: payload.senderName.trim(),
          senderAddress: payload.senderAddress.trim(),
          delayMs: Math.min(
            RATE_LIMIT_MAX_MS,
            Math.max(RATE_LIMIT_MIN_MS, Math.round(payload.delayMs)),
          ),
          totalCount: recipients.length,
        });
        yield* repo.insertSendJobRecipients(
          jobId,
          recipients.map((recipient) => recipient.id),
        );
        return yield* reloadJob(jobId);
      }),

    run: (jobId) =>
      Effect.gen(function* () {
        const loaded = yield* loadJob(jobId);
        // Terminal jobs are not re-run; a finished job stays finished.
        if (loaded.job.status === "completed" || loaded.job.status === "cancelled") {
          return toSendJob(loaded);
        }
        if (loaded.job.status === "sending") {
          return yield* Effect.fail(
            new InvalidSendRequest({ message: m["sendJob.alreadySending"]() }),
          );
        }
        // One active send at a time (spec section 5): a running OR a
        // paused-but-unresumed job blocks a new send; the job itself is
        // excluded so it can always be resumed.
        const anyActive = yield* repo.anySendJobActiveExcept(jobId);
        if (anyActive) {
          // A just-resumed job falls back to paused instead of being
          // orphaned as pending (the Logs Resume button has no other way
          // to re-trigger it); a fresh wizard job stays pending for its
          // "Try again".
          yield* revertResumedJob(repo, loaded);
          return yield* Effect.fail(
            new InvalidSendRequest({
              message: m["sendJob.anotherSendActive"](),
            }),
          );
        }
        // The previous run of THIS job may still be winding down: pause
        // returns as soon as the DB is paused, while the old loop only
        // stops at its next checkpoint (an in-flight SMTP call can take
        // seconds). Running again now would deliver the same cursor row
        // twice, so the in-memory control is the guard.
        if (active !== null) {
          yield* revertResumedJob(repo, loaded);
          return yield* Effect.fail(
            new InvalidSendRequest({
              message: m["sendJob.stillPausing"](),
            }),
          );
        }
        const priorStatus = loaded.job.status;
        // Flip to `sending` BEFORE the pre-flight: the DB status is the
        // atomic one-active guard (two concurrent `run` calls both pass
        // an in-memory check, but only the first lands this write), and
        // pause during the pre-flight becomes legal. A pre-flight failure
        // reverts the job to its prior state.
        yield* repo.setSendJobStatus(jobId, "sending", null);
        const control: RunControl = {
          jobId,
          pauseRequested: false,
          cancelRequested: false,
          wake: yield* Latch.make(),
        };
        active = control;
        try {
          const credentialsOutcome = yield* resolveCredentials(loaded).pipe(Effect.result);
          if (Result.isFailure(credentialsOutcome)) {
            yield* repo.setSendJobStatus(jobId, priorStatus, null);
            return yield* Effect.fail(credentialsOutcome.failure);
          }
          const outcome = yield* preflight(loaded, credentialsOutcome.success).pipe(Effect.result);
          if (Result.isFailure(outcome)) {
            yield* repo.setSendJobStatus(jobId, priorStatus, null);
            return yield* Effect.fail(outcome.failure);
          }
          yield* sendLoop(loaded, credentialsOutcome.success, control);
        } finally {
          if (active === control) active = null;
        }
        return yield* reloadJob(jobId);
      }),

    pause: (jobId) =>
      Effect.gen(function* () {
        const loaded = yield* loadJob(jobId);
        if (loaded.job.status === "paused") return toSendJob(loaded);
        if (loaded.job.status !== "sending") {
          return yield* Effect.fail(
            new InvalidSendRequest({ message: m["sendJob.onlySendingCanPause"]() }),
          );
        }
        yield* repo.setSendJobStatus(jobId, "paused", null);
        const control = active;
        if (control !== null && control.jobId === jobId) {
          control.pauseRequested = true;
          yield* control.wake.release;
        }
        return yield* reloadJob(jobId);
      }),

    resume: (jobId) =>
      Effect.gen(function* () {
        const loaded = yield* loadJob(jobId);
        if (loaded.job.status !== "paused") {
          return yield* Effect.fail(
            new InvalidSendRequest({ message: m["sendJob.onlyPausedCanResume"]() }),
          );
        }
        yield* repo.setSendJobStatus(jobId, "pending", null);
        return yield* reloadJob(jobId);
      }),

    cancel: (jobId) =>
      Effect.gen(function* () {
        const loaded = yield* loadJob(jobId);
        if (loaded.job.status === "cancelled") return toSendJob(loaded);
        if (loaded.job.status === "completed") {
          return yield* Effect.fail(
            new InvalidSendRequest({
              message: m["sendJob.finishedCannotCancel"](),
            }),
          );
        }
        // One transaction: remaining pending -> skipped, job -> cancelled.
        yield* repo.cancelSendJob(jobId);
        const control = active;
        if (control !== null && control.jobId === jobId) {
          control.cancelRequested = true;
          yield* control.wake.release;
        }
        return yield* reloadJob(jobId);
      }),

    getStatus: (jobId) => repo.getSendJob(jobId).pipe(Effect.map(Option.map(toSendJob))),

    retryFailed: (jobId) =>
      Effect.gen(function* () {
        const loaded = yield* loadJob(jobId);
        if (loaded.job.status !== "completed") {
          return yield* Effect.fail(
            new InvalidSendRequest({ message: m["sendJob.onlyFinishedCanRetry"]() }),
          );
        }
        const failed = loaded.recipients.filter((row) => row.status === "failed");
        if (failed.length === 0) {
          return yield* Effect.fail(
            new InvalidSendRequest({ message: m["sendJob.noFailedRecipients"]() }),
          );
        }
        yield* repo.retryFailedSendJob(jobId);
        return yield* reloadJob(jobId);
      }),

    list: (filter) =>
      repo.listSendJobs(filter).pipe(Effect.map((rows) => rows.map(toSendJobSummary))),
  };
}

/**
 * The send domain service. Constructing this layer provides GenerateJob,
 * Smtp, ProgressHub, Settings, and SqliteRepo alongside, so a program can
 * depend on either.
 */
export class SendJobService extends Context.Service<SendJobService, SendJobServiceShape>()(
  "SendJobService",
) {
  static readonly Live = (
    db: Database.Database,
    defaults: DefaultPaths,
  ): Layer.Layer<
    SendJobService | GenerateJobService | SmtpService | ProgressHub | Settings | SqliteRepo
  > =>
    Layer.provideMerge(
      Layer.provideMerge(
        Layer.effect(
          SendJobService,
          Effect.gen(function* () {
            const repo = yield* SqliteRepo;
            const hub = yield* ProgressHub;
            const generate = yield* GenerateJobService;
            const smtp = yield* SmtpService;
            return makeSendJobService(repo, hub, generate, smtp, realSendEnv());
          }),
        ),
        GenerateJobService.Live(db, defaults),
      ),
      SmtpService.Live(db),
    );
}

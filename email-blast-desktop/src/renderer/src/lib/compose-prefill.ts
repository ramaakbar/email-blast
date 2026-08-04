import type { SendJob } from "../../../shared/ipc";

/**
 * The compose wizard's pre-fill state (ticket 16's Logs retry): the same
 * recipients, template, message, and SMTP identity a finished job ran
 * with, so retrying a failure re-opens the wizard exactly as it was. The
 * wizard's `startSend` then creates a NEW job scoped to those recipients
 * - the original job's history stays untouched.
 *
 * The inline override's password is deliberately absent: the bridge
 * never echoes a stored credential back (ticket 15 - the password lives
 * only in the send_jobs row after `startSend`), so a retried inline job
 * asks the user to re-enter the app password at step 4.
 */
export interface ComposePrefill {
  readonly recipientIds: string[];
  readonly templateId: string | null;
  readonly message: { subject: string; bodyHtml: string };
  readonly smtp: {
    mode: "profile" | "inline";
    profileId: string | null;
    host: string;
    port: string;
    username: string;
    senderName: string;
    senderAddress: string;
  };
  readonly delayMs: number;
}

/** The pre-fill for retrying the given failed recipients of a job. */
export function buildRetryPrefill(job: SendJob, failedRecipientIds: string[]): ComposePrefill {
  const override = job.smtpOverride;
  return {
    recipientIds: failedRecipientIds,
    templateId: job.templateId,
    message: { subject: job.subject, bodyHtml: job.bodyHtml },
    smtp: {
      mode: job.smtpProfileId !== null ? "profile" : "inline",
      profileId: job.smtpProfileId,
      host: override?.host ?? "",
      port: override === null ? "587" : String(override.port),
      username: override?.username ?? "",
      senderName: job.senderName,
      senderAddress: job.senderAddress,
    },
    delayMs: job.delayMs,
  };
}

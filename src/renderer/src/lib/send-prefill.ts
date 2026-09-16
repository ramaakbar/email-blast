import type { SendJob } from "../../../shared/ipc";

/**
 * The Send workspace's pre-fill state, carried through the router's
 * location state. Two kinds:
 *
 * - `job`: the "Send these" pre-link (ticket 06) from Generate results -
 *   only the generate job id; the workspace picks the job and pre-selects
 *   its generated recipients.
 * - `retry`: the Logs retry (ticket 07) - the recipients, message, and
 *   SMTP identity a finished send job ran with, so retrying a failure
 *   re-opens the workspace exactly as it was. The workspace's send then
 *   creates a NEW job scoped to those recipients - the original job's
 *   history stays untouched.
 *
 * The inline override's password is deliberately absent from the retry:
 * the bridge never echoes a stored credential back (ticket 15 - the
 * password lives only in the send_jobs row after `startSend`), so a
 * retried inline job asks the user to re-enter the app password.
 */
export interface SendJobPreLinkPrefill {
  readonly kind: "job";
  readonly generateJobId: string;
}

export interface SendJobRetryPrefill {
  readonly kind: "retry";
  /** Null for plain sends with no generate job (no attachments). */
  readonly generateJobId: string | null;
  readonly recipientIds: string[];
  readonly message: { subject: string; bodyHtml: string };
  readonly smtp: {
    mode: "profile" | "inline";
    profileId: string | null;
    host: string;
    port: string;
    username: string;
    senderName: string;
    senderAddress: string;
    replyTo: string;
  };
  readonly delayMs: number;
}

export type SendPrefill = SendJobPreLinkPrefill | SendJobRetryPrefill;

/** The retry pre-fill for the given failed recipients of a send job. */
export function buildRetryPrefill(job: SendJob, recipientIds: string[]): SendJobRetryPrefill {
  const override = job.smtpOverride;
  return {
    kind: "retry",
    generateJobId: job.generateJobId,
    recipientIds,
    message: { subject: job.subject, bodyHtml: job.bodyHtml },
    smtp: {
      mode: job.smtpProfileId !== null ? "profile" : "inline",
      profileId: job.smtpProfileId,
      host: override?.host ?? "",
      port: override === null ? "587" : String(override.port),
      username: override?.username ?? "",
      senderName: job.senderName,
      senderAddress: job.senderAddress,
      replyTo: job.replyTo ?? "",
    },
    delayMs: job.delayMs,
  };
}

import type { SendJobStatus } from "../../../shared/ipc";

const STATUS_STYLES: Record<SendJobStatus, string> = {
  pending: "border-slate-600/40 bg-slate-600/10 text-slate-700",
  sending: "border-sky-600/40 bg-sky-600/10 text-sky-700",
  paused: "border-amber-600/40 bg-amber-600/10 text-amber-700",
  completed: "border-emerald-600/40 bg-emerald-600/10 text-emerald-700",
  cancelled: "border-rose-600/40 bg-rose-600/10 text-rose-700",
};

const STATUS_LABELS: Record<SendJobStatus, string> = {
  pending: "Pending",
  sending: "Sending",
  paused: "Paused",
  completed: "Completed",
  cancelled: "Cancelled",
};

/**
 * The send-job status badge shared by the Logs list and the job detail
 * header, styled like the template badges.
 */
export function SendStatusBadge({ status }: { status: SendJobStatus }) {
  return (
    <span
      className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

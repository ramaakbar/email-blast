import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Send,
  X,
} from "lucide-react";
import { m } from "@paraglide/messages";
import { toast } from "sonner";
import { PdfPreview } from "@/components/pdf-preview";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import type { GenerateJob, Recipient } from "../../../shared/ipc";

/**
 * The results view of a finished generate job, shared by the compose
 * wizard's step 5 and the Generate workspace (both for a fresh run and a
 * reopened past job): the all-generated / with-failures banner, the
 * per-recipient failure list with errors, and the spot-check preview with
 * prev/next navigation. The Save PDF button re-downloads the previewed
 * recipient's PDF through a native save dialog - the workspace's
 * "re-download" action, available on any finished job. When a handler is
 * given, the banner's "Send these" action jumps into the Send workspace
 * pre-linked to this job (ticket 06).
 */
export function GenerateResults({
  job,
  recipients,
  onSendThese,
}: {
  job: GenerateJob;
  /** Live recipient rows for the spot-check details; deleted recipients fall back to the job's names. */
  recipients: Recipient[];
  /** The Send workspace pre-link ("Send these"); optional in the wizard. */
  onSendThese?: (jobId: string) => void;
}) {
  const [spotIndex, setSpotIndex] = useState(0);
  const [spotPdf, setSpotPdf] = useState<{ fileName: string; dataBase64: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const generated = job.recipients.filter((r) => r.status === "generated");
  const failed = job.recipients.filter((r) => r.status === "failed");
  const spotRecipients = generated.map((g) => ({
    jobRecipient: g,
    recipient: recipients.find((r) => r.id === g.recipientId),
  }));
  const clampedIndex = Math.min(spotIndex, Math.max(0, spotRecipients.length - 1));
  const spot = spotRecipients[clampedIndex] ?? null;
  // The primitive identity of the previewed recipient, for the effect deps
  // below - never the derived `spot` object, which is fresh every render
  // and would re-fire the fetch on every render.
  const spotRecipientId = spot?.jobRecipient.recipientId ?? null;

  // Fetch the spot-check PDF whenever the job or the previewed recipient
  // changes. The body reads only the primitive `spotRecipientId`, so the
  // deps are complete without the derived `spot` object (fresh every
  // render - including it would re-fire the fetch on every render).
  useEffect(() => {
    if (spotRecipientId === null) {
      setSpotPdf(null);
      return;
    }
    let cancelled = false;
    window.api.generate
      .getRecipientPdf({ jobId: job.id, recipientId: spotRecipientId })
      .then((pdf) => {
        if (!cancelled) setSpotPdf(pdf);
      })
      .catch(() => {
        if (!cancelled) setSpotPdf(null);
      });
    return () => {
      cancelled = true;
    };
  }, [job.id, clampedIndex, spotRecipientId]);

  /** The re-download action: a native save dialog, then the PDF written there. */
  const saveSpotPdf = async (): Promise<void> => {
    if (spot === null || spotPdf === null) return;
    setSaving(true);
    try {
      await window.api.generate.saveRecipientPdf({
        jobId: job.id,
        recipientId: spot.jobRecipient.recipientId,
      });
    } catch (error) {
      toast.error(errorMessage(error, m["generate.couldNotSavePdf"]()));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div
        className={`flex items-center gap-2 rounded-md border p-3 text-sm ${
          failed.length === 0
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700"
            : "border-amber-500/40 bg-amber-500/10 text-amber-700"
        }`}
      >
        {failed.length === 0 ? (
          <>
            <Check className="size-4 shrink-0" />
            {m["compose.allGenerated"]({ count: generated.length })}
          </>
        ) : (
          <>
            <AlertTriangle className="size-4 shrink-0" />
            {m["compose.generatedWithFailures"]({
              generated: generated.length,
              failed: failed.length,
            })}
          </>
        )}
        {onSendThese !== undefined && generated.length > 0 && (
          <Button
            size="sm"
            className="ml-auto"
            onClick={() => onSendThese(job.id)}
            title={m["send.sendThese"]()}
          >
            <Send className="size-4" /> {m["send.sendThese"]()}
          </Button>
        )}
      </div>

      {failed.length > 0 && (
        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {m["compose.failedRecipientsTitle"]({ count: failed.length })}
          </h3>
          <ul className="mt-2 max-h-40 space-y-1 overflow-y-auto text-sm">
            {failed.map((f) => {
              const recipient = recipients.find((r) => r.id === f.recipientId);
              return (
                <li key={f.recipientId} className="flex items-start gap-2">
                  <X className="mt-0.5 size-3.5 shrink-0 text-destructive" />
                  <span>
                    <span className="font-medium">{recipient?.name ?? f.recipientName}</span>
                    {recipient?.email !== null && recipient?.email !== undefined && (
                      <span className="text-muted-foreground"> ({recipient.email})</span>
                    )}
                    <span className="text-destructive"> - {f.errorMessage}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {spotRecipients.length > 0 && (
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {m["compose.spotCheck"]()}
            </h3>
            <span className="text-xs text-muted-foreground">
              {m["compose.spotIndex"]({ index: clampedIndex + 1, total: spotRecipients.length })}
            </span>
          </div>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div>
              {spotPdf === null ? (
                <div className="flex h-48 items-center justify-center rounded-md border bg-muted/30 text-sm text-muted-foreground">
                  <Loader2 className="mr-2 size-4 animate-spin" /> {m["compose.loadingPreview"]()}
                </div>
              ) : (
                <PdfPreview dataBase64={spotPdf.dataBase64} />
              )}
              <p className="mt-1 truncate text-center font-mono text-xs text-muted-foreground">
                {spotPdf?.fileName ?? ""}
              </p>
            </div>
            {spot !== null && (
              <div className="flex flex-col justify-center gap-2 text-sm">
                <p className="font-medium">
                  {spot.recipient?.name ?? spot.jobRecipient.recipientName}
                </p>
                {spot.recipient?.email !== null && spot.recipient?.email !== undefined && (
                  <p className="text-muted-foreground">{spot.recipient.email}</p>
                )}
                {spot.recipient?.phone !== null && spot.recipient?.phone !== undefined && (
                  <p className="text-muted-foreground">{spot.recipient.phone}</p>
                )}
                <dl className="mt-1 space-y-1">
                  {Object.entries(spot.recipient?.metadata ?? {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">{key}</dt>
                      <dd className="truncate font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
          <div className="mt-3 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={clampedIndex <= 0}
              onClick={() => setSpotIndex((i) => Math.max(0, i - 1))}
            >
              <ChevronLeft className="size-4" /> {m["common.prev"]()}
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={clampedIndex >= spotRecipients.length - 1}
              onClick={() => setSpotIndex((i) => i + 1)}
            >
              {m["common.next"]()} <ChevronRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={spotPdf === null || saving}
              onClick={() => void saveSpotPdf()}
            >
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Download className="size-4" />
              )}
              {m["generate.savePdf"]()}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

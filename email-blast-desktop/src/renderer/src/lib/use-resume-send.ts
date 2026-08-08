import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { m } from "@paraglide/messages";
import { errorMessage } from "./error-message";

/**
 * Resume = mark the job pending, then run it - the same pair the wizard's
 * Resume uses. Shared by the Logs list and the job detail so the flow and
 * its failure handling can never drift. `resumingId` names the job whose
 * resume is in flight (at most one at a time, matching the one-active
 * send rule); a rejection surfaces through `resumeError`. The service
 * reverts a rejected resume back to `paused`, so the Resume button stays
 * available for a retry.
 */
export function useResumeSend(): {
  readonly resumingId: string | null;
  readonly resumeError: string | null;
  readonly dismissResumeError: () => void;
  readonly resume: (jobId: string) => Promise<void>;
} {
  const queryClient = useQueryClient();
  const [resumingId, setResumingId] = useState<string | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);

  const resume = useCallback(
    async (jobId: string): Promise<void> => {
      setResumeError(null);
      setResumingId(jobId);
      try {
        await window.api.send.resumeSend(jobId);
        await window.api.send.runSend(jobId);
      } catch (error) {
        setResumeError(errorMessage(error, m["sendJob.couldNotResumeJob"]()));
      } finally {
        setResumingId(null);
        void queryClient.invalidateQueries({ queryKey: ["logs"] });
      }
    },
    [queryClient],
  );

  const dismissResumeError = useCallback(() => setResumeError(null), []);

  return { resumingId, resumeError, dismissResumeError, resume };
}

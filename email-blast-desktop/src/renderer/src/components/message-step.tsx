import { Button } from "@/components/ui/button";
import { MessageEditor } from "@/components/message-editor";
import { m } from "@paraglide/messages";
import { Save } from "lucide-react";
import type { MessageTemplate, Recipient } from "../../../shared/ipc";

/**
 * The message step shared by the compose wizard's step 3 and the Send
 * workspace (ticket 06): the Message Template pick (copy-on-pick, ADR
 * 0005) plus the "Save as template" action, over the shared
 * MessageEditor with `{slot}` autocomplete and the live preview.
 */
export function MessageStep({
  recipients,
  message,
  onChange,
  messageTemplates,
  onPickTemplate,
  onSaveAsTemplate,
  saveAsPending,
}: {
  recipients: Recipient[];
  message: { subject: string; bodyHtml: string };
  onChange: (next: { subject: string; bodyHtml: string }) => void;
  messageTemplates: MessageTemplate[];
  onPickTemplate: (id: string) => void;
  onSaveAsTemplate: () => void;
  saveAsPending: boolean;
}) {
  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <div className="flex items-end gap-2">
        {messageTemplates.length > 0 && (
          <label className="block flex-1">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              {m["messages.pickLabel"]()}
            </span>
            <select
              aria-label={m["messages.pickLabel"]()}
              value=""
              onChange={(event) => {
                // Copy-on-pick (ADR 0005): choosing a template copies its
                // subject and body into the job; the select resets to the
                // placeholder because the job now owns its copy and the
                // pick is a one-shot action, not a live binding.
                const id = event.target.value;
                if (id !== "") onPickTemplate(id);
              }}
              className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring"
            >
              <option value="">{m["messages.pickPlaceholder"]()}</option>
              {messageTemplates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <Button variant="outline" onClick={onSaveAsTemplate} disabled={saveAsPending}>
          <Save className="size-4" /> {m["messages.saveAs"]()}
        </Button>
      </div>
      <MessageEditor recipients={recipients} message={message} onChange={onChange} />
    </div>
  );
}

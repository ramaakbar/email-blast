import { useState } from "react";
import { Loader2 } from "lucide-react";
import { m } from "@paraglide/messages";
import { Button } from "@/components/ui/button";

/**
 * The "Save as template" dialog (ticket 03): writes the job's current
 * message into the library as a new Message Template, from the Send
 * workspace (ticket 06). The name defaults to the subject, so the common
 * "one template per campaign" case needs only a confirm click.
 */
export function SaveAsTemplateDialog({
  defaultName,
  saving,
  onCancel,
  onSave,
}: {
  defaultName: string;
  saving: boolean;
  onCancel: () => void;
  onSave: (name: string) => void;
}) {
  const [name, setName] = useState(defaultName);
  const valid = name.trim() !== "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onMouseDown={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-as-title"
        className="w-full max-w-md rounded-lg border bg-card p-6 shadow-lg"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id="save-as-title" className="text-lg font-semibold">
          {m["messages.saveAsTitle"]()}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{m["messages.saveAsDescription"]()}</p>
        <label className="mt-4 block">
          <span className="mb-1 block text-xs font-medium text-muted-foreground">
            {m["messages.name"]()}
          </span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={m["messages.name"]()}
            autoFocus
            className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          />
        </label>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={saving}>
            {m["common.cancel"]()}
          </Button>
          <Button onClick={() => onSave(name.trim())} disabled={!valid || saving}>
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" /> {m["common.saving"]()}
              </>
            ) : (
              // "Save template" (distinct from the step's "Save as
              // template" opener, so the dialog's own action is
              // unambiguous in the UI and in tests).
              m["messages.saveTemplate"]()
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

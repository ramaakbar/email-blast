import { useMemo, useRef, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { m } from "@paraglide/messages";
import type { SlotSource } from "../../../shared/generate";
import {
  availableSlots,
  interpolateMessageHtml,
  interpolateMessagePlain,
  messageCoverage,
  messageValues,
} from "../../../shared/send";

/**
 * The message editor shared by the compose wizard's message step and the
 * Message Template dialog (ticket 03): the subject, the HTML body with
 * `{slot}` autocomplete, the coverage warnings (unknown slots block,
 * missing metadata warns), and the live 3-recipient preview - the same
 * editor in both places so the two halves can never drift apart. The
 * wizard passes its selected recipients; the template dialog passes the
 * imported recipients (the stand-in for a selection, since a template
 * must work for anyone). `emptyHint` replaces the coverage warnings and
 * preview when the recipient list is empty, so a fresh install does not
 * flag every slot of a first template as unknown.
 */
export function MessageEditor({
  recipients,
  message,
  onChange,
  emptyHint,
}: {
  recipients: SlotSource[];
  message: { subject: string; bodyHtml: string };
  onChange: (next: { subject: string; bodyHtml: string }) => void;
  emptyHint?: string;
}) {
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [completion, setCompletion] = useState<{
    start: number;
    query: string;
    index: number;
  } | null>(null);
  const suggestions = useMemo(() => {
    if (completion === null) return [];
    return availableSlots(recipients).filter((slot) => slot.startsWith(completion.query));
  }, [completion, recipients]);

  const report = useMemo(
    () => messageCoverage(recipients, `${message.subject} ${message.bodyHtml}`),
    [recipients, message],
  );

  // Recompute the {slot} completion state from the textarea's cursor:
  // open when the last "{" is after the last "}" before the cursor.
  const updateCompletion = (textarea: HTMLTextAreaElement): void => {
    const before = textarea.value.slice(0, textarea.selectionStart);
    const brace = before.lastIndexOf("{");
    const close = before.lastIndexOf("}");
    if (brace !== -1 && brace > close) {
      setCompletion((prev) => ({
        start: brace,
        query: before.slice(brace + 1),
        index: Math.min(prev?.index ?? 0, Math.max(0, availableSlots(recipients).length - 1)),
      }));
    } else {
      setCompletion(null);
    }
  };

  const insertSlot = (slot: string): void => {
    const textarea = bodyRef.current;
    if (textarea === null || completion === null) return;
    const cursor = textarea.selectionStart;
    const next =
      message.bodyHtml.slice(0, completion.start) + `{${slot}}` + message.bodyHtml.slice(cursor);
    onChange({ ...message, bodyHtml: next });
    setCompletion(null);
    // Restore focus and place the cursor after the inserted placeholder.
    requestAnimationFrame(() => {
      textarea.focus();
      const pos = completion.start + slot.length + 2;
      textarea.setSelectionRange(pos, pos);
    });
  };

  const onBodyKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (completion === null || suggestions.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCompletion({ ...completion, index: (completion.index + 1) % suggestions.length });
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCompletion({
        ...completion,
        index: (completion.index - 1 + suggestions.length) % suggestions.length,
      });
    } else if (event.key === "Enter" || event.key === "Tab") {
      event.preventDefault();
      insertSlot(suggestions[Math.min(completion.index, suggestions.length - 1)]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setCompletion(null);
    }
  };

  // The live preview: the first 2-3 recipients render the interpolated
  // subject and body; a missing or unknown slot shows a descriptive error
  // instead of a silent literal placeholder.
  const samples = recipients.slice(0, 3);
  const previews = samples.map((recipient) => {
    const values = messageValues(recipient);
    try {
      return {
        recipient,
        subject: interpolateMessagePlain(message.subject, values),
        body: interpolateMessageHtml(message.bodyHtml, values),
        error: null as string | null,
      };
    } catch (error) {
      return {
        recipient,
        subject: "",
        body: "",
        error: error instanceof Error ? error.message : String(error),
      };
    }
  });

  return (
    <div className="flex flex-col gap-4">
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-muted-foreground">
          {m["compose.subject"]()}
        </span>
        <input
          type="text"
          value={message.subject}
          onChange={(event) => onChange({ ...message, subject: event.target.value })}
          placeholder={m["compose.subjectPlaceholder"]({ name: "{name}", instansi: "{instansi}" })}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-xs font-medium text-muted-foreground">
          {m["compose.bodyLabel"]()}
        </span>
        <div className="relative">
          <textarea
            ref={bodyRef}
            value={message.bodyHtml}
            rows={9}
            onChange={(event) => {
              onChange({ ...message, bodyHtml: event.target.value });
              updateCompletion(event.target);
            }}
            onKeyDown={onBodyKeyDown}
            onSelect={(event) => updateCompletion(event.currentTarget)}
            onClick={(event) => updateCompletion(event.currentTarget)}
            placeholder={m["compose.bodyPlaceholder"]({ name: "{name}" })}
            className="w-full resize-y rounded-md border bg-background px-3 py-2 font-mono text-xs leading-relaxed outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          />
          {completion !== null && suggestions.length > 0 && (
            <ul className="absolute left-2 top-2 z-10 max-h-48 w-64 overflow-y-auto rounded-md border bg-popover py-1 shadow-lg">
              {suggestions.map((slot, i) => (
                <li key={slot}>
                  <button
                    type="button"
                    onMouseDown={(event) => {
                      event.preventDefault();
                      insertSlot(slot);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-1 text-left font-mono text-xs ${
                      i === completion.index ? "bg-accent" : ""
                    }`}
                  >
                    {"{"}
                    {slot}
                    {"}"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </label>

      {recipients.length === 0 && emptyHint !== undefined && (
        <p className="rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700">
          {emptyHint}
        </p>
      )}

      {recipients.length > 0 && report.unknownSlots.length > 0 && (
        <div className="flex items-start gap-2 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-700">
          <X className="mt-0.5 size-3.5 shrink-0" />
          <div>
            <p className="font-medium">
              {report.unknownSlots.length === 1
                ? m["compose.unknownSlotTitleOne"]({
                    list: report.unknownSlots.map((s) => `{${s}}`).join(", "),
                  })
                : m["compose.unknownSlotTitleOther"]({
                    list: report.unknownSlots.map((s) => `{${s}}`).join(", "),
                  })}
            </p>
            <p className="mt-1">{m["compose.unknownSlotHint"]()}</p>
          </div>
        </div>
      )}
      {recipients.length > 0 && report.unknownSlots.length === 0 && report.missing.length > 0 && (
        <div className="flex items-start gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700">
          <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
          <div>
            <p className="font-medium">
              {m["compose.missingSlotTitle"]({
                list: report.missing
                  .map((entry) => `{${entry.slot}} (${entry.missingCount})`)
                  .join(", "),
              })}
            </p>
            <p className="mt-1">{m["compose.missingSlotHint"]()}</p>
          </div>
        </div>
      )}

      {recipients.length > 0 && previews.length > 0 && (
        <div className="rounded-lg border bg-card p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {m["compose.livePreview"]()}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {previews.length === 1
              ? m["compose.livePreviewHintOne"]({ count: previews.length })
              : m["compose.livePreviewHintOther"]({ count: previews.length })}
          </p>
          <div className="mt-3 grid gap-3">
            {previews.map((preview) => (
              <div
                key={`${preview.recipient.name}-${preview.recipient.email ?? ""}`}
                className="rounded-md border bg-background p-3"
              >
                <p className="text-xs font-medium">
                  {preview.recipient.name}
                  {preview.recipient.email !== null && (
                    <span className="text-muted-foreground"> ({preview.recipient.email})</span>
                  )}
                </p>
                {preview.error !== null ? (
                  <p className="mt-2 flex items-start gap-1.5 text-xs text-red-700">
                    <X className="mt-0.5 size-3.5 shrink-0" />
                    {preview.error}
                  </p>
                ) : (
                  <>
                    <p className="mt-2 text-sm font-medium">{preview.subject}</p>
                    <iframe
                      title={m["compose.previewFor"]({ name: preview.recipient.name })}
                      sandbox=""
                      srcDoc={`<!doctype html><html><head><style>body{font-family:system-ui,sans-serif;font-size:13px;margin:0}</style></head><body>${preview.body}</body></html>`}
                      className="mt-1 h-28 w-full rounded border bg-white"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

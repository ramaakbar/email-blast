import { Link } from "@tanstack/react-router";
import { AlertTriangle, Check } from "lucide-react";
import { m } from "@paraglide/messages";
import { PatternPreview } from "@/components/pattern-preview";
import { TemplateBadge } from "@/components/template-badge";
import type { Recipient, Template } from "../../../shared/ipc";
import type { SlotCoverage } from "../../../shared/generate";

/**
 * The Document Template picker of the Generate workspace: one template
 * with slot-coverage validation against the selected recipients. The
 * coverage report comes from the parent (shared generate.ts logic), so
 * the host gates its own next action on it.
 */
export function TemplateStep({
  templates,
  template,
  onTemplateChange,
  selectedRecipients,
  coverage,
}: {
  templates: Template[];
  template: Template | null;
  onTemplateChange: (id: string | null) => void;
  selectedRecipients: Recipient[];
  coverage: SlotCoverage;
}) {
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-muted-foreground">
          {m["compose.templateLabel"]()}
        </span>
        <select
          value={template?.id ?? ""}
          onChange={(event) =>
            onTemplateChange(event.target.value === "" ? null : event.target.value)
          }
          className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring"
        >
          <option value="">{m["compose.chooseTemplate"]()}</option>
          {templates.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </label>

      {templates.length === 0 && (
        <p className="rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700">
          {m["compose.noTemplatesRegistered"]()}{" "}
          <Link to="/templates" className="underline underline-offset-2">
            {m["compose.registerTemplateLink"]()}
          </Link>{" "}
          {m["compose.noTemplatesRegisteredHint"]()}
        </p>
      )}

      {template !== null && (
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-semibold">{template.name}</h3>
                <TemplateBadge type={template.type} />
              </div>
              <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                {template.filePath}
              </p>
            </div>
          </div>
          <div className="mt-3 space-y-3">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {m["compose.requiredSlots"]()}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {template.slots.map((slot) => (
                  <code
                    key={slot}
                    className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-foreground"
                  >
                    {"{"}
                    {slot}
                    {"}"}
                  </code>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {m["compose.outputPattern"]()}
              </p>
              <p className="rounded-md border bg-background px-3 py-2">
                <PatternPreview pattern={template.outputPattern} slots={template.slots} />
              </p>
            </div>
          </div>
        </div>
      )}

      {template !== null && coverage.ok && (
        <p className="flex items-center gap-2 text-sm text-emerald-700">
          <Check className="size-4" />
          {m["compose.allCovered"]({ count: selectedRecipients.length })}
        </p>
      )}

      {template !== null && !coverage.ok && (
        <div className="flex items-start gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700">
          <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
          <div>
            <p className="font-medium">
              {m["compose.missingDataSummary"]({
                missing: coverage.recipientsMissing,
                count: selectedRecipients.length,
              })}
            </p>
            <ul className="mt-1 list-inside list-disc">
              {coverage.slots.map((entry) => (
                <li key={entry.slot}>
                  {entry.missingCount === 1
                    ? m["compose.slotMissingCountOne"]({
                        slot: `{${entry.slot}}`,
                        count: entry.missingCount,
                      })
                    : m["compose.slotMissingCountOther"]({
                        slot: `{${entry.slot}}`,
                        count: entry.missingCount,
                      })}
                </li>
              ))}
            </ul>
            <p className="mt-1">{m["compose.missingDataHint"]()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

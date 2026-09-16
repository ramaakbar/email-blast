import { AlertTriangle, Check } from "lucide-react";
import { m } from "@paraglide/messages";
import { plural } from "@/lib/plural";
import { PatternPreview } from "@/components/pattern-preview";
import { TemplateBadge } from "@/components/template-badge";
import type { Recipient, Template } from "../../../shared/ipc";
import { slotCoverage, type SlotCoverage } from "../../../shared/generate";
import {
  distinctTemplateValues,
  recipientTemplateValue,
  routedRecipients,
  suggestTemplateColumn,
  unassignedTemplateValues,
  validateJobOutputPattern,
  type UnassignedValueEntry,
} from "../../../shared/template-assignment";

/**
 * The Template Assignment panel of the Generate workspace (ticket 08,
 * ADR 0006): pick the routing column, assign every distinct value to a
 * Document Template (the TemplateStep selection above is the default
 * template, covering blank values), and set the ONE output naming
 * pattern the whole job shares. Unassigned values and per-template
 * slot-coverage gaps block generation - the host gates its start action
 * on `complete`.
 */

/** The routing facts the host page needs to gate the start action. */
export interface RoutingReport {
  /** The distinct non-blank values of the chosen column, first-seen order. */
  readonly values: readonly string[];
  /** Values with no assigned template, with the affected recipients by name. */
  readonly unassigned: readonly UnassignedValueEntry[];
  /** The shared output pattern's validation error, or null when acceptable. */
  readonly patternError: string | null;
  /** Every involved template (default first, then assigned in value order) with its routed coverage. */
  readonly templates: readonly {
    readonly template: Template;
    readonly count: number;
    readonly coverage: SlotCoverage;
  }[];
  /** True when the assignment is complete: no unassigned values, a valid pattern, full coverage. */
  readonly complete: boolean;
}

/** The metadata keys the selected recipients carry, as routing candidates. */
function candidateColumns(recipients: readonly Recipient[]): string[] {
  const seen = new Set<string>();
  const columns: string[] = [];
  for (const recipient of recipients) {
    for (const key of Object.keys(recipient.metadata)) {
      const value = recipient.metadata[key];
      if (value === undefined || value.trim() === "") continue;
      if (seen.has(key)) continue;
      seen.add(key);
      columns.push(key);
    }
  }
  return columns;
}

/**
 * The routing facts for the current workspace state - built by the host
 * page (it gates the start action on `complete`) and rendered by the
 * step. Pure: same inputs, same report.
 */
export function buildRoutingReport(
  recipients: readonly Recipient[],
  templates: readonly Template[],
  template: Template | null,
  templateColumn: string | null,
  assignment: Record<string, string>,
  jobPattern: string,
): RoutingReport {
  if (templateColumn === null || template === null) {
    return {
      values: [],
      unassigned: [],
      patternError: null,
      templates: [],
      complete: true,
    };
  }
  const values = distinctTemplateValues(recipients, templateColumn);
  const unassigned = unassignedTemplateValues(recipients, templateColumn, template.id, assignment);
  // The involved templates: the default first, then every assigned one
  // in value order - the pattern must be fillable by all of them.
  const byId = new Map(templates.map((t) => [t.id, t]));
  const involved: { template: Template; count: number; coverage: SlotCoverage }[] = [];
  const seen = new Set<string>([template.id]);
  involved.push({
    template,
    count: routedRecipients(recipients, templateColumn, template.id, template.id, assignment)
      .length,
    coverage: slotCoverage(
      routedRecipients(recipients, templateColumn, template.id, template.id, assignment),
      template.slots,
    ),
  });
  for (const value of values) {
    const templateId = assignment[value];
    if (templateId === undefined) continue;
    const routed = byId.get(templateId);
    if (routed === undefined || seen.has(templateId)) continue;
    seen.add(templateId);
    const routedRows = routedRecipients(
      recipients,
      templateColumn,
      templateId,
      template.id,
      assignment,
    );
    involved.push({
      template: routed,
      count: routedRows.length,
      coverage: slotCoverage(routedRows, routed.slots),
    });
  }
  const patternError = validateJobOutputPattern(
    jobPattern,
    involved.map((entry) => entry.template),
  );
  return {
    values,
    unassigned,
    patternError,
    templates: involved,
    complete:
      unassigned.length === 0 &&
      patternError === null &&
      involved.every((entry) => entry.coverage.ok),
  };
}

export function TemplateRoutingStep({
  templates,
  template,
  recipients,
  report,
  templateColumn,
  onTemplateColumnChange,
  assignment,
  onAssignmentChange,
  jobPattern,
  onJobPatternChange,
}: {
  templates: Template[];
  /** The default template - the TemplateStep selection; blank values route here. */
  template: Template | null;
  recipients: Recipient[];
  /** The report the host page built - the step renders it. */
  report: RoutingReport;
  templateColumn: string | null;
  onTemplateColumnChange: (column: string | null) => void;
  assignment: Record<string, string>;
  onAssignmentChange: (assignment: Record<string, string>) => void;
  jobPattern: string;
  onJobPatternChange: (pattern: string) => void;
}) {
  const columns = candidateColumns(recipients);
  const suggested = suggestTemplateColumn(columns);

  if (template === null) {
    return <p className="text-sm text-muted-foreground">{m["compose.chooseTemplateFirst"]()}</p>;
  }

  const unassignedCount = report.unassigned.reduce((sum, entry) => sum + entry.count, 0);

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <div>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted-foreground">
            {m["generate.routingColumnLabel"]()}
          </span>
          <select
            value={templateColumn ?? ""}
            onChange={(event) =>
              onTemplateColumnChange(event.target.value === "" ? null : event.target.value)
            }
            aria-label={m["generate.routingColumnLabel"]()}
            className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:border-ring"
          >
            <option value="">{m["generate.routingColumnNone"]()}</option>
            {/* The current column stays listed even when no selected
                recipient carries it (e.g. after a retry pre-fill), so the
                select never looks broken. */}
            {[
              ...columns,
              ...(templateColumn !== null && !columns.includes(templateColumn)
                ? [templateColumn]
                : []),
            ].map((column) => (
              <option key={column} value={column}>
                {column === suggested ? m["generate.routingColumnSuggested"]({ column }) : column}
              </option>
            ))}
          </select>
        </label>
        <p className="mt-1 text-xs text-muted-foreground">{m["generate.routingHint"]()}</p>
      </div>

      {templateColumn !== null && (
        <>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {m["generate.defaultTemplateLabel"]()}
              </h3>
              <TemplateBadge type={template.type} />
            </div>
            <p className="mt-1 text-sm font-medium">{template.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {m["generate.defaultTemplateHint"]({ column: templateColumn })}
            </p>
            <CoverageLine
              count={report.templates[0]?.count ?? 0}
              coverage={report.templates[0]?.coverage}
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {m["generate.assignmentTitle"]()}
            </h3>
            <p className="mb-2 mt-0.5 text-xs text-muted-foreground">
              {m["generate.assignmentHint"]()}
            </p>
            {report.values.length === 0 && (
              <p className="text-xs text-muted-foreground">
                {m["generate.allBlankValues"]({ column: templateColumn })}
              </p>
            )}
            <div className="space-y-1.5">
              {report.values.map((value) => (
                <div
                  key={value}
                  className="flex items-center gap-3 rounded-md border bg-card px-3 py-2"
                >
                  <span className="w-40 truncate font-mono text-xs" title={value}>
                    {value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {plural(
                      recipients.filter((r) => recipientTemplateValue(r, templateColumn) === value)
                        .length,
                      m["generate.valueCountOne"],
                      m["generate.valueCountOther"],
                    )}
                  </span>
                  <select
                    value={assignment[value] ?? ""}
                    aria-label={m["generate.assignedTo"]({ value })}
                    onChange={(event) =>
                      onAssignmentChange({
                        ...assignment,
                        [value]: event.target.value,
                      })
                    }
                    className="h-8 flex-1 rounded-md border bg-background px-2 text-sm outline-none focus-visible:border-ring"
                  >
                    <option value="">{m["compose.chooseTemplate"]()}</option>
                    {templates.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {report.unassigned.length > 0 && (
              <div className="mt-3 flex items-start gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700">
                <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                <div>
                  <p className="font-medium">
                    {plural(
                      unassignedCount,
                      m["generate.unassignedSummaryOne"],
                      m["generate.unassignedSummary"],
                    )}
                  </p>
                  <ul className="mt-1 list-inside list-disc">
                    {report.unassigned.map((entry) => (
                      <li key={entry.value}>
                        {entry.count === 1
                          ? m["generate.unassignedValueOne"]({
                              value: entry.value,
                              count: entry.count,
                              names: entry.recipientNames.join(", "),
                            })
                          : m["generate.unassignedValueOther"]({
                              value: entry.value,
                              count: entry.count,
                              names: entry.recipientNames.join(", "),
                            })}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {report.unassigned.length === 0 && (
              <p className="mt-3 flex items-center gap-2 text-sm text-emerald-700">
                <Check className="size-4" /> {m["generate.allValuesAssigned"]()}
              </p>
            )}
          </div>

          <div className="rounded-lg border bg-card p-4">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">
                {m["generate.patternLabel"]()}
              </span>
              <input
                value={jobPattern}
                onChange={(event) => onJobPatternChange(event.target.value)}
                placeholder={m["generate.jobPatternPlaceholder"]({ name: "{name}" })}
                className="h-9 w-full rounded-md border bg-background px-3 font-mono text-sm outline-none focus-visible:border-ring"
              />
            </label>
            <p className="mt-1 text-xs text-muted-foreground">{m["generate.patternHint"]()}</p>
            {jobPattern !== "" && (
              <p className="mt-2">
                <PatternPreview
                  pattern={jobPattern}
                  slots={[...new Set(report.templates.flatMap((entry) => entry.template.slots))]}
                />
              </p>
            )}
            {report.patternError !== null && (
              <p className="mt-2 flex items-start gap-2 text-xs text-amber-700">
                <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                <span>{report.patternError}</span>
              </p>
            )}
          </div>

          {report.templates.length > 1 && (
            <div className="space-y-2">
              {report.templates.slice(1).map((entry) => (
                <div key={entry.template.id} className="rounded-lg border bg-card p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{entry.template.name}</span>
                    <TemplateBadge type={entry.template.type} />
                    <span className="ml-auto text-xs text-muted-foreground">
                      {m["generate.valueCountOther"]({ count: entry.count })}
                    </span>
                  </div>
                  <CoverageLine count={entry.count} coverage={entry.coverage} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/** The per-template slot coverage line: ok, or the missing slots. */
function CoverageLine({ count, coverage }: { count: number; coverage: SlotCoverage | undefined }) {
  if (coverage === undefined) return null;
  if (coverage.ok) {
    return (
      <p className="mt-2 flex items-center gap-2 text-xs text-emerald-700">
        <Check className="size-3.5" />
        {m["generate.templateCoverageOk"]({ count })}
      </p>
    );
  }
  return (
    <div className="mt-2 flex items-start gap-2 text-xs text-amber-700">
      <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
      <div>
        <p className="font-medium">
          {m["generate.templateCoverageMissing"]({
            missing: coverage.recipientsMissing,
            count,
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
      </div>
    </div>
  );
}

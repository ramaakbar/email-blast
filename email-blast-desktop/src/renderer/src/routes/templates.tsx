import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, FileText, Loader2, Pencil, Plus, RefreshCw, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { m } from "@paraglide/messages";
import { ErrorBanner } from "@/components/error-banner";
import { PatternPreview } from "@/components/pattern-preview";
import { TemplateBadge } from "@/components/template-badge";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import { formatTimestamp } from "@/lib/format";
import type { Template, TemplateType } from "../../../shared/ipc";
import { templateTypeForFile, validateTemplate } from "../../../shared/template-validation";

export const Route = createFileRoute("/templates")({
  component: TemplatesPage,
});

/** The base file name without its extension, e.g. "LOA_2026.docx" -> "LOA_2026". */
function baseName(fileName: string): string {
  return fileName.replace(/\.[^.]+$/, "");
}

/** The template form, shared by the create and edit dialogs. */
type FormState =
  | {
      kind: "create";
      filePath: string;
      fileName: string;
      type: TemplateType;
    }
  | { kind: "edit"; template: Template };

/**
 * One editable slot row. Rows carry a stable id so removing a middle row
 * never rebinds another row's input node.
 */
interface SlotRow {
  id: string;
  value: string;
}

function makeSlotRows(values: readonly string[]): SlotRow[] {
  return values.map((value) => ({ id: crypto.randomUUID(), value }));
}

function TemplatesPage() {
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const listQuery = useQuery({
    queryKey: ["templates", "list"],
    queryFn: () => window.api.templates.list(),
  });

  const createMutation = useMutation({
    mutationFn: (payload: Parameters<typeof window.api.templates.create>[0]) =>
      window.api.templates.create(payload),
    onSuccess: (created) => {
      toast.success(m["templates.templateRegistered"]({ name: created.name }));
      setForm(null);
      void queryClient.invalidateQueries({ queryKey: ["templates"] });
    },
    onError: (err) => {
      setLoadError(errorMessage(err, m["templates.couldNotRegister"]()));
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: Parameters<typeof window.api.templates.update>[0]) =>
      window.api.templates.update(payload),
    onSuccess: (updated) => {
      toast.success(m["templates.templateSaved"]({ name: updated.name }));
      setForm(null);
      setSelectedId(null);
      void queryClient.invalidateQueries({ queryKey: ["templates"] });
    },
    onError: (err) => {
      setLoadError(errorMessage(err, m["templates.couldNotSave"]()));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => window.api.templates.delete(id),
    onSuccess: () => {
      toast.success(m["templates.templateDeleted"]());
      setSelectedId(null);
      setConfirmOpen(false);
      void queryClient.invalidateQueries({ queryKey: ["templates"] });
    },
    onError: (err) => {
      setConfirmOpen(false);
      setLoadError(errorMessage(err, m["templates.couldNotDelete"]()));
    },
  });

  // Escape closes whichever overlay is open: the form, then the confirm
  // dialog, then the detail panel.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (form !== null) setForm(null);
      else if (confirmOpen) setConfirmOpen(false);
      else if (selectedId !== null) setSelectedId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [form, confirmOpen, selectedId]);

  // The panel fetches the row by id (the spec's `get`) instead of reading
  // it from the list, so it stays correct while the list refetches.
  const detailQuery = useQuery({
    queryKey: ["templates", "detail", selectedId],
    queryFn: () => window.api.templates.get(selectedId as string),
    enabled: selectedId !== null,
  });

  const handleAddTemplate = async () => {
    const filePath = await window.api.system.pickTemplateFile();
    if (filePath === null) return;
    const fileName = filePath.split(/[\\/]/).pop() ?? filePath;
    const type = templateTypeForFile(fileName);
    if (type === null) {
      setLoadError(m["templates.unsupportedFile"]({ fileName }));
      return;
    }
    setLoadError(null);
    setForm({ kind: "create", filePath, fileName, type });
  };

  const templates = listQuery.data ?? [];
  // The panel fetches by id; narrow the query data to the selected row so
  // the edit callback hands a definite Template to the form.
  const detailTemplate = selectedId !== null ? detailQuery.data : null;

  return (
    <div className="relative flex h-full flex-col">
      <header className="flex items-center justify-between px-6 pb-4 pt-6">
        <div>
          <h1 className="text-2xl font-semibold">{m["templates.title"]()}</h1>
          <p className="text-sm text-muted-foreground">
            {templates.length === 1
              ? m["templates.countRegisteredOne"]({ count: templates.length })
              : m["templates.countRegisteredOther"]({ count: templates.length })}
          </p>
        </div>
        <Button onClick={() => void handleAddTemplate()}>
          <Plus className="size-4" /> {m["templates.addTemplate"]()}
        </Button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-4 px-6 pb-6">
        {loadError !== null && (
          <ErrorBanner message={loadError} onDismiss={() => setLoadError(null)} />
        )}

        {listQuery.isError && (
          <ErrorBanner message={errorMessage(listQuery.error, m["templates.couldNotLoad"]())} />
        )}

        {listQuery.isLoading && (
          <div className="flex flex-1 items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> {m["templates.loadingTemplates"]()}
          </div>
        )}

        {!listQuery.isLoading && !listQuery.isError && templates.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-10 text-center">
            <FileText className="size-10 text-muted-foreground" />
            <p className="text-sm font-medium">{m["templates.noTemplatesYet"]()}</p>
            <p className="max-w-sm text-xs text-muted-foreground">{m["templates.noTemplatesHint"]()}</p>
            <Button size="sm" className="mt-2" onClick={() => void handleAddTemplate()}>
              <Plus className="size-4" /> {m["templates.addTemplate"]()}
            </Button>
          </div>
        )}

        {!listQuery.isLoading && !listQuery.isError && templates.length > 0 && (
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() =>
                    setSelectedId((current) => (current === template.id ? null : template.id))
                  }
                  className={`flex flex-col gap-2 rounded-lg border bg-card p-4 text-left transition-colors hover:border-ring hover:bg-muted/40 ${
                    selectedId === template.id ? "border-ring bg-muted/40" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="truncate font-medium">{template.name}</h3>
                    <TemplateBadge type={template.type} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {template.slots.length === 1
                      ? m["templates.slotCountOne"]({
                          count: template.slots.length,
                          stamp: formatTimestamp(template.createdAt),
                        })
                      : m["templates.slotCountOther"]({
                          count: template.slots.length,
                          stamp: formatTimestamp(template.createdAt),
                        })}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {detailTemplate !== null && detailTemplate !== undefined && (
        <DetailPanel
          template={detailTemplate}
          onClose={() => setSelectedId(null)}
          onEdit={() => setForm({ kind: "edit", template: detailTemplate })}
          onDelete={() => setConfirmOpen(true)}
        />
      )}

      {form !== null && (
        <TemplateFormDialog
          form={form}
          saving={createMutation.isPending || updateMutation.isPending}
          onCancel={() => setForm(null)}
          onSave={(payload) => {
            if (form.kind === "create") createMutation.mutate(payload);
            else
              updateMutation.mutate({
                id: form.template.id,
                name: payload.name,
                slots: payload.slots,
                outputPattern: payload.outputPattern,
              });
          }}
        />
      )}

      {confirmOpen && selectedId !== null && (
        <ConfirmDeleteDialog
          name={detailQuery.data?.name ?? m["templates.thisTemplate"]()}
          pending={deleteMutation.isPending}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => deleteMutation.mutate(selectedId)}
        />
      )}
    </div>
  );
}

function DetailPanel({
  template,
  onClose,
  onEdit,
  onDelete,
}: {
  template: Template;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <aside className="absolute inset-y-0 right-0 z-20 flex w-96 flex-col border-l bg-card shadow-2xl">
      <header className="flex items-start justify-between gap-3 border-b px-5 py-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-lg font-semibold">{template.name}</h2>
            <TemplateBadge type={template.type} />
          </div>
          <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
            {template.filePath}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label={m["common.closeDetails"]()}>
          <X className="size-4" />
        </Button>
      </header>
      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{m["templates.registered"]()}</dt>
            <dd className="text-right">{formatTimestamp(template.createdAt)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">{m["templates.slots"]()}</dt>
            <dd className="text-right">{template.slots.length}</dd>
          </div>
        </dl>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {m["compose.requiredSlots"]()}
          </h3>
          {template.slots.length === 0 ? (
            <p className="text-sm text-muted-foreground">{m["templates.noSlotsDeclared"]()}</p>
          ) : (
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
          )}
        </section>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {m["compose.outputPattern"]()}
          </h3>
          <p className="rounded-md border bg-background px-3 py-2">
            <PatternPreview pattern={template.outputPattern} slots={template.slots} />
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{m["templates.outputPatternHint"]()}</p>
        </section>

        <div className="rounded-lg border border-muted bg-muted/40 p-3 text-xs text-muted-foreground">
          {m["templates.editExternallyHint"]()}
        </div>
      </div>
      <footer className="flex gap-2 border-t px-5 py-4">
        <Button variant="outline" className="flex-1" onClick={onEdit}>
          <Pencil className="size-4" /> {m["templates.edit"]()}
        </Button>
        <Button variant="destructive" className="flex-1" onClick={onDelete}>
          <Trash2 className="size-4" /> {m["common.delete"]()}
        </Button>
      </footer>
    </aside>
  );
}

/**
 * The create/edit form. For a new DOCX the slots auto-scan on open (and
 * on Rescan); the user can edit every slot before saving. Image templates
 * and edit mode start from manual entry.
 */
function TemplateFormDialog({
  form,
  saving,
  onCancel,
  onSave,
}: {
  form: FormState;
  saving: boolean;
  onCancel: () => void;
  onSave: (payload: {
    name: string;
    filePath: string;
    type: TemplateType;
    slots: string[];
    outputPattern: string;
  }) => void;
}) {
  const [name, setName] = useState(
    form.kind === "create" ? baseName(form.fileName) : form.template.name,
  );
  const [slotRows, setSlotRows] = useState<SlotRow[]>(() =>
    form.kind === "create" ? [] : makeSlotRows(form.template.slots),
  );
  const slots = slotRows.map((row) => row.value);
  const [pattern, setPattern] = useState(form.kind === "create" ? "" : form.template.outputPattern);
  // DOCX scans are async; stale results are dropped with a load token.
  const [scanState, setScanState] = useState<
    | { kind: "idle" }
    | { kind: "scanning" }
    | { kind: "scanned" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });
  const scanToken = useRef(0);
  // In edit mode a rescan replaces the user's current slots, so it asks
  // for confirmation first; create mode has nothing saved to lose.
  const [rescanConfirming, setRescanConfirming] = useState(false);

  const isDocx = form.kind === "create" ? form.type === "docx" : form.template.type === "docx";

  const runScan = useMemo(
    () => (docxPath: string) => {
      const token = ++scanToken.current;
      setScanState({ kind: "scanning" });
      window.api.templates
        .scanSlots(docxPath)
        .then((result) => {
          if (token !== scanToken.current) return;
          setSlotRows(makeSlotRows(result.slots));
          setScanState({ kind: "scanned" });
        })
        .catch((err: unknown) => {
          if (token !== scanToken.current) return;
          setScanState({
            kind: "error",
            message: errorMessage(err, m["templates.couldNotScan"]()),
          });
        });
    },
    [],
  );

  useEffect(() => {
    if (form.kind === "create" && form.type === "docx") runScan(form.filePath);
    // Invalidate any scan still in flight when the dialog closes or the
    // form changes, so a stale result can never overwrite the slots.
    const token = scanToken.current;
    return () => {
      scanToken.current = token + 1;
    };
  }, [form, runScan]);

  const error = validateTemplate(name, slots, pattern);
  const fileLabel =
    form.kind === "create" ? form.fileName : (form.template.filePath.split(/[\\/]/).pop() ?? "");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onMouseDown={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="template-form-title"
        className="flex max-h-[85vh] w-full max-w-lg flex-col rounded-lg border bg-card shadow-lg"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-3 border-b px-6 py-4">
          <div>
            <h2 id="template-form-title" className="text-lg font-semibold">
              {form.kind === "create" ? m["templates.addTitle"]() : m["templates.editTitle"]({ name: form.template.name })}
            </h2>
            <p className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="max-w-64 truncate font-mono">{fileLabel}</span>
              <TemplateBadge type={form.kind === "create" ? form.type : form.template.type} />
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel} aria-label={m["common.cancel"]()}>
            <X className="size-4" />
          </Button>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-4">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              {m["templates.templateName"]()}
            </span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Surat LOA"
              className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            />
          </label>

          <section>
            <div className="mb-1 flex items-baseline justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {m["templates.slots"]()}
              </h3>
              {isDocx && scanState.kind === "scanning" && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Loader2 className="size-3 animate-spin" /> {m["templates.scanning"]()}
                </span>
              )}
            </div>
            {isDocx && scanState.kind !== "scanning" && !rescanConfirming && (
              <button
                type="button"
                className="mb-2 flex items-center gap-1 text-xs text-muted-foreground underline-offset-2 hover:underline"
                onClick={() => {
                  if (form.kind === "create") {
                    runScan(form.filePath);
                  } else {
                    setRescanConfirming(true);
                  }
                }}
              >
                <RefreshCw className="size-3" /> {m["templates.rescanFromFile"]()}
              </button>
            )}
            {isDocx && form.kind === "edit" && rescanConfirming && (
              <span className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                {m["templates.rescanConfirm"]()}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 px-2"
                  onClick={() => {
                    setRescanConfirming(false);
                    runScan(form.template.filePath);
                  }}
                >
                  {m["templates.replaceSlots"]()}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2"
                  onClick={() => setRescanConfirming(false)}
                >
                  {m["templates.keepMySlots"]()}
                </Button>
              </span>
            )}
            <p className="mb-2 text-xs text-muted-foreground">
              {isDocx
                ? m["templates.docxSlotsHint"]({ placeholders: "{placeholders}" })
                : m["templates.imageSlotsHint"]()}
            </p>
            {scanState.kind === "error" && (
              <div className="mb-2 flex items-start gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700">
                <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
                <span className="flex-1">{scanState.message}</span>
                <span className="shrink-0 text-amber-700/70">{m["templates.slotsCanBeTyped"]()}</span>
              </div>
            )}
            <div className="space-y-1.5">
              {slotRows.map((row, index) => (
                <div key={row.id} className="flex items-center gap-2">
                  <code className="shrink-0 text-xs text-muted-foreground">{"{"}</code>
                  <input
                    type="text"
                    value={row.value}
                    onChange={(event) =>
                      setSlotRows(
                        slotRows.map((r) =>
                          r.id === row.id ? { ...r, value: event.target.value } : r,
                        ),
                      )
                    }
                    aria-label={m["templates.slotAria"]({ index: index + 1 })}
                    className="h-8 w-full rounded-md border bg-background px-2 font-mono text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  />
                  <code className="shrink-0 text-xs text-muted-foreground">{"}"}</code>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                    aria-label={m["templates.removeSlotAria"]({ index: index + 1 })}
                    onClick={() => setSlotRows(slotRows.filter((r) => r.id !== row.id))}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => setSlotRows([...slotRows, { id: crypto.randomUUID(), value: "" }])}
            >
              <Plus className="size-4" /> {m["templates.addSlot"]()}
            </Button>
          </section>

          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">
              {m["templates.outputPatternField"]()}
            </span>
            <input
              type="text"
              value={pattern}
              onChange={(event) => setPattern(event.target.value)}
              placeholder={m["templates.outputPatternPlaceholder"]({ no: "{no}", name: "{name}" })}
              className="h-9 w-full rounded-md border bg-background px-3 font-mono text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
            />
            {pattern.trim() !== "" && (
              <span className="mt-1.5 block rounded-md border bg-background px-3 py-2">
                <PatternPreview pattern={pattern} slots={slots} />
              </span>
            )}
            {error !== null && (
              <span className="mt-1.5 block text-xs text-destructive">{error}</span>
            )}
          </label>
        </div>

        <footer className="flex items-center justify-end gap-2 border-t px-6 py-4">
          <Button variant="outline" onClick={onCancel} disabled={saving}>
            {m["common.cancel"]()}
          </Button>
          <Button
            disabled={error !== null || saving}
            title={error ?? undefined}
            onClick={() =>
              onSave({
                name,
                filePath: form.kind === "create" ? form.filePath : form.template.filePath,
                type: form.kind === "create" ? form.type : form.template.type,
                slots,
                outputPattern: pattern,
              })
            }
          >
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" /> {m["common.saving"]()}
              </>
            ) : form.kind === "create" ? (
              m["templates.registerTemplate"]()
            ) : (
              m["templates.saveChanges"]()
            )}
          </Button>
        </footer>
      </div>
    </div>
  );
}

function ConfirmDeleteDialog({
  name,
  pending,
  onCancel,
  onConfirm,
}: {
  name: string;
  pending: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onMouseDown={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-delete-title"
        className="w-full max-w-sm rounded-lg border bg-card p-6 shadow-lg"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-delete-title" className="text-lg font-semibold">
          {m["templates.deleteTitle"]({ name })}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{m["templates.deleteDescription"]()}</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={pending}>
            {m["common.cancel"]()}
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={pending} autoFocus>
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> {m["common.deleting"]()}
              </>
            ) : (
              m["common.delete"]()
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

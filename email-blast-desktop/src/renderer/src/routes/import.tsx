import { useCallback, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  Loader2,
  RefreshCw,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type {
  ColumnMapping,
  ColumnRole,
  ExcelRow,
  ImportCommitResponse,
  ImportPreview,
} from "../../../shared/ipc";

export const Route = createFileRoute("/import")({
  component: ImportPage,
});

/** The preview table shows at most this many parsed rows. */
const PREVIEW_ROWS = 50;

/** Matches a full file name, not just an extension substring. */
const EXCEL_FILE_PATTERN = /\.(xlsx|xls)$/i;

const ROLE_OPTIONS: { value: ColumnRole; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "metadata", label: "Metadata" },
  { value: "skip", label: "Skip" },
];

const EXCLUSIVE_ROLES: ReadonlySet<ColumnRole> = new Set(["name", "email", "phone"]);

type ImportState =
  | { kind: "idle" }
  | { kind: "loading"; fileName: string }
  | {
      kind: "preview";
      fileName: string;
      preview: ImportPreview;
      mapping: ColumnMapping;
      committing: boolean;
    }
  | { kind: "done"; fileName: string; result: ImportCommitResponse };

function isExcelFile(fileName: string): boolean {
  return EXCEL_FILE_PATTERN.test(fileName);
}

/**
 * Extracts a user-facing message from an IPC rejection. Electron prefixes
 * rejected invokes with "Error invoking remote method '<channel>': Error: ",
 * which is internal noise for the error banner.
 */
function errorMessage(err: unknown, fallback: string): string {
  if (!(err instanceof Error)) return fallback;
  const stripped = err.message.replace(/^Error invoking remote method '[^']+': Error: /, "");
  return stripped === "" ? fallback : stripped;
}

function ImportPage() {
  const [state, setState] = useState<ImportState>({ kind: "idle" });
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  // Bumped on every load/reset; async resolutions only apply their result
  // when their token is still current, so a stale read or commit can never
  // clobber a newer screen state.
  const loadToken = useRef(0);

  const loadFile = useCallback(async (filePath: string, fileName: string) => {
    const token = ++loadToken.current;
    setError(null);
    setState({ kind: "loading", fileName });
    try {
      const preview = await window.api.import.read(filePath);
      if (token !== loadToken.current) return;
      setState({
        kind: "preview",
        fileName,
        preview,
        mapping: preview.suggestedMapping,
        committing: false,
      });
    } catch (err) {
      if (token !== loadToken.current) return;
      setState({ kind: "idle" });
      setError(errorMessage(err, "Could not read the file. It may not be a valid Excel file."));
    }
  }, []);

  /** Handles a drop anywhere on the page - dropping replaces the current file in any state. */
  const acceptDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setDragOver(false);
      const file = event.dataTransfer.files[0];
      if (file === undefined) return;
      if (!isExcelFile(file.name)) {
        setError(`"${file.name}" is not an Excel file. Choose a .xlsx or .xls file.`);
        return;
      }
      void loadFile(window.api.system.getPathForFile(file), file.name);
    },
    [loadFile],
  );

  const handleBrowse = useCallback(async () => {
    const filePath = await window.api.system.pickExcelFile();
    if (filePath === null) return;
    const fileName = filePath.split(/[\\/]/).pop() ?? filePath;
    void loadFile(filePath, fileName);
  }, [loadFile]);

  /** Assigns a role to a column; name/email/phone are exclusive, so assigning
   * one clears it from every other column. */
  const setRole = useCallback((column: string, role: ColumnRole) => {
    setState((prev) => {
      if (prev.kind !== "preview") return prev;
      const mapping: Record<string, ColumnRole> = { ...prev.mapping };
      if (EXCLUSIVE_ROLES.has(role)) {
        for (const [otherColumn, otherRole] of Object.entries(mapping)) {
          if (otherColumn !== column && otherRole === role) mapping[otherColumn] = "metadata";
        }
      }
      mapping[column] = role;
      return { ...prev, mapping };
    });
  }, []);

  const resetMapping = useCallback(() => {
    setState((prev) =>
      prev.kind === "preview" ? { ...prev, mapping: prev.preview.suggestedMapping } : prev,
    );
  }, []);

  const commit = useCallback(async () => {
    if (state.kind !== "preview") return;
    const { preview, mapping, fileName } = state;
    const token = loadToken.current;
    setState({ kind: "preview", fileName, preview, mapping, committing: true });
    try {
      const result = await window.api.import.commit({ rows: preview.rows, columnMapping: mapping });
      if (token !== loadToken.current) return; // the user moved on; the commit still landed
      setState({ kind: "done", fileName, result });
      toast.success(
        <div className="space-y-2">
          <p>
            Imported <span className="font-semibold">{result.imported}</span> recipients.{" "}
            <span className="font-semibold">{result.duplicatesSkipped}</span> duplicate
            {result.duplicatesSkipped === 1 ? "" : "s"} skipped.
          </p>
          <div className="flex gap-2">
            <Button asChild size="sm">
              <Link to="/compose">Go to Compose</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/recipients">Go to Recipients</Link>
            </Button>
          </div>
        </div>,
      );
    } catch (err) {
      if (token !== loadToken.current) return;
      setError(errorMessage(err, "Could not commit the import."));
      setState({ kind: "preview", fileName, preview, mapping, committing: false });
    }
  }, [state]);

  const reset = useCallback(() => {
    loadToken.current++;
    setError(null);
    setState({ kind: "idle" });
  }, []);

  return (
    <div
      className="mx-auto max-w-5xl space-y-6 p-6"
      onDragOver={(event) => event.preventDefault()}
      onDrop={acceptDrop}
    >
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Import</h1>
          <p className="text-sm text-muted-foreground">
            Load recipients from an Excel file, review the preview, and commit them to the database.
          </p>
        </div>
        {state.kind === "preview" && (
          <Button variant="outline" onClick={reset} disabled={state.committing}>
            <RefreshCw className="size-4" /> Import another file
          </Button>
        )}
      </header>

      {error !== null && (
        <div className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <span className="flex-1">{error}</span>
          <button
            type="button"
            className="text-xs underline-offset-2 hover:underline"
            onClick={() => setError(null)}
          >
            Dismiss
          </button>
        </div>
      )}

      {state.kind === "idle" && (
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-16 text-center transition-colors ${
            dragOver ? "border-primary bg-muted/50" : "border-border"
          }`}
        >
          <Upload className="size-10 text-muted-foreground" />
          <p className="text-sm font-medium">Drag and drop an Excel file here</p>
          <p className="text-xs text-muted-foreground">
            .xlsx or .xls, with the recipient list in the first sheet
          </p>
          <Button onClick={() => void handleBrowse()} className="mt-2">
            <FileSpreadsheet className="size-4" /> Browse…
          </Button>
        </div>
      )}

      {state.kind === "loading" && (
        <div className="flex items-center gap-2 py-16 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> Parsing {state.fileName}…
        </div>
      )}

      {state.kind === "preview" && (
        <PreviewContent
          fileName={state.fileName}
          preview={state.preview}
          mapping={state.mapping}
          committing={state.committing}
          onRoleChange={setRole}
          onResetMapping={resetMapping}
          onCommit={() => void commit()}
        />
      )}

      {state.kind === "done" && (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-emerald-600/40 bg-emerald-600/5 p-10 text-center">
          <CheckCircle2 className="size-10 text-emerald-600" />
          <h2 className="text-lg font-semibold">Import complete</h2>
          <p className="text-sm text-muted-foreground">
            Imported {state.result.imported} recipients from {state.fileName}.{" "}
            {state.result.duplicatesSkipped} duplicate
            {state.result.duplicatesSkipped === 1 ? "" : "s"} skipped.
          </p>
          {state.result.rowsSkippedNoName > 0 && (
            <p className="text-xs text-muted-foreground">
              {state.result.rowsSkippedNoName} row(s) skipped: the name column was empty for them.
            </p>
          )}
          <div className="mt-2 flex gap-2">
            <Button asChild>
              <Link to="/compose">Go to Compose</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/recipients">Go to Recipients</Link>
            </Button>
            <Button variant="outline" onClick={reset}>
              Import another file
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function PreviewContent({
  fileName,
  preview,
  mapping,
  committing,
  onRoleChange,
  onResetMapping,
  onCommit,
}: {
  fileName: string;
  preview: ImportPreview;
  mapping: ColumnMapping;
  committing: boolean;
  onRoleChange: (column: string, role: ColumnRole) => void;
  onResetMapping: () => void;
  onCommit: () => void;
}) {
  const nameColumn = preview.columns.find((column) => mapping[column] === "name");
  const emailColumn = preview.columns.find((column) => mapping[column] === "email");
  const phoneColumn = preview.columns.find((column) => mapping[column] === "phone");
  const shown = Math.min(preview.rows.length, PREVIEW_ROWS);

  return (
    <div className="space-y-6">
      {preview.warnings.length > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
          <ul className="space-y-1 text-sm">
            {preview.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <section>
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold">Preview</h2>
          <p className="text-xs text-muted-foreground">
            {fileName} - showing {shown} of {preview.rows.length} rows
          </p>
        </div>
        <PreviewTable columns={preview.columns} rows={preview.rows} />
        {preview.skippedDuplicates > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            {preview.skippedDuplicates} duplicate
            {preview.skippedDuplicates === 1 ? "" : "s"} already skipped during parsing.
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold">Column mapping</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Match each Excel column to a recipient field. Name, email, and phone can each be used
          once; other columns become metadata available to template placeholders.
        </p>
        <div className="space-y-1.5">
          {preview.columns.map((column) => (
            <div
              key={column}
              className="flex items-center gap-3 rounded-md border bg-card px-3 py-2"
            >
              <span className="w-64 truncate font-mono text-xs text-muted-foreground">
                {column}
              </span>
              <select
                value={mapping[column] ?? "metadata"}
                aria-label={`Role of the "${column}" column`}
                onChange={(event) => onRoleChange(column, event.target.value as ColumnRole)}
                className="h-8 rounded-md border bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              >
                {ROLE_OPTIONS.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Name: <span className="font-mono">{nameColumn ?? "none"}</span> · Email:{" "}
          <span className="font-mono">{emailColumn ?? "none"}</span> · Phone:{" "}
          <span className="font-mono">{phoneColumn ?? "none"}</span>
        </p>
      </section>

      <footer className="flex items-center justify-end gap-2 border-t pt-4">
        <Button variant="outline" onClick={onResetMapping}>
          Reset mapping
        </Button>
        <Button
          disabled={nameColumn === undefined || committing}
          title={nameColumn === undefined ? "Select a name column to import" : undefined}
          onClick={onCommit}
        >
          {committing ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Importing…
            </>
          ) : (
            <>Import recipients</>
          )}
        </Button>
      </footer>
    </div>
  );
}

function PreviewTable({
  columns,
  rows,
}: {
  columns: readonly string[];
  rows: readonly ExcelRow[];
}) {
  const visible = rows.slice(0, PREVIEW_ROWS);
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full border-collapse text-left text-xs">
        <thead className="bg-muted">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="max-w-48 truncate whitespace-nowrap border-b px-3 py-2 font-medium"
                title={column}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visible.map((row, index) => (
            // Static preview rows are never reordered, so the index is a stable key.
            // eslint-disable-next-line react/no-array-index-key
            <tr key={index} className="odd:bg-background even:bg-muted/30">
              {columns.map((column) => (
                <td
                  key={column}
                  className="max-w-48 truncate whitespace-nowrap border-b px-3 py-1.5"
                  title={row[column] ?? ""}
                >
                  {row[column] ?? ""}
                </td>
              ))}
            </tr>
          ))}
          {visible.length === 0 && (
            <tr>
              <td
                colSpan={Math.max(columns.length, 1)}
                className="px-3 py-8 text-center text-muted-foreground"
              >
                No data rows found in the first sheet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

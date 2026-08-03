import { AlertTriangle } from "lucide-react";

/**
 * The destructive error banner every screen shows for load and mutation
 * failures. Extracted after the third copy (import -> recipients ->
 * templates); screens pass a message and optionally a dismiss callback.
 */
export function ErrorBanner({ message, onDismiss }: { message: string; onDismiss?: () => void }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
      <AlertTriangle className="mt-0.5 size-4 shrink-0" />
      <span className="flex-1">{message}</span>
      {onDismiss !== undefined && (
        <button
          type="button"
          className="text-xs underline-offset-2 hover:underline"
          onClick={onDismiss}
        >
          Dismiss
        </button>
      )}
    </div>
  );
}

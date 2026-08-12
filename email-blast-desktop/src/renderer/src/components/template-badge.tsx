import type { TemplateType } from "../../../shared/ipc";

/**
 * The DOCX / Image type badge shown on template cards and in the
 * template previews. Shared so every screen renders it identically.
 */
export function TemplateBadge({ type }: { type: TemplateType }) {
  return type === "docx" ? (
    <span className="rounded-full border border-sky-600/40 bg-sky-600/10 px-2 py-0.5 text-xs font-medium text-sky-700">
      DOCX
    </span>
  ) : (
    <span className="rounded-full border border-amber-600/40 bg-amber-600/10 px-2 py-0.5 text-xs font-medium text-amber-700">
      Image
    </span>
  );
}

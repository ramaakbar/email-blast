import { createFileRoute } from "@tanstack/react-router";
import { ScreenPlaceholder } from "@/components/screen-placeholder";

export const Route = createFileRoute("/import")({
  component: ImportPage,
});

function ImportPage() {
  return (
    <ScreenPlaceholder
      title="Import"
      description="Drag and drop an Excel file to load recipients, review the preview, and commit them to the database."
    />
  );
}

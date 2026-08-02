import { createFileRoute } from "@tanstack/react-router";
import { ScreenPlaceholder } from "@/components/screen-placeholder";

export const Route = createFileRoute("/templates")({
  component: TemplatesPage,
});

function TemplatesPage() {
  return (
    <ScreenPlaceholder
      title="Templates"
      description="Register DOCX letter and image certificate templates with their placeholder slots and output patterns."
    />
  );
}

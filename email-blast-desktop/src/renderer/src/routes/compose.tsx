import { createFileRoute } from "@tanstack/react-router";
import { ScreenPlaceholder } from "@/components/screen-placeholder";

export const Route = createFileRoute("/compose")({
  component: ComposePage,
});

function ComposePage() {
  return (
    <ScreenPlaceholder
      title="Compose"
      description="The 6-step wizard: pick recipients, choose a template, write the message, configure SMTP, generate PDFs, and send."
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ScreenPlaceholder } from "@/components/screen-placeholder";

export const Route = createFileRoute("/recipients")({
  component: RecipientsPage,
});

function RecipientsPage() {
  return (
    <ScreenPlaceholder
      title="Recipients"
      description="Browse, search and manage all imported recipients, filtered by import batch."
    />
  );
}

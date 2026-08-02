import { createFileRoute } from "@tanstack/react-router";
import { ScreenPlaceholder } from "@/components/screen-placeholder";

export const Route = createFileRoute("/logs/$jobId")({
  component: JobDetailPage,
});

function JobDetailPage() {
  return (
    <ScreenPlaceholder
      title="Job Detail"
      description="Per-recipient outcomes for one job, with error messages and retry actions."
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ScreenPlaceholder } from "@/components/screen-placeholder";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <ScreenPlaceholder
      title="Settings"
      description="SMTP profiles, the sending rate limit, and default templates and output directories."
    />
  );
}

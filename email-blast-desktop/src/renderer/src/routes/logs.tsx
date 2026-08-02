import { Outlet, createFileRoute, useMatchRoute } from "@tanstack/react-router";
import { ScreenPlaceholder } from "@/components/screen-placeholder";

export const Route = createFileRoute("/logs")({
  component: LogsPage,
});

function LogsPage() {
  // /logs/$jobId renders as a child route; show the list placeholder only
  // when no job detail is selected.
  const matchRoute = useMatchRoute();
  const isJobDetail = matchRoute({ to: "/logs/$jobId" });

  return (
    <>
      {isJobDetail ? null : (
        <ScreenPlaceholder
          title="Logs"
          description="History of every generate and send job with status, counts, and per-recipient outcomes."
        />
      )}
      <Outlet />
    </>
  );
}

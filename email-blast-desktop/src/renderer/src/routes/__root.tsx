import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { FileText, History, Send, Settings, Upload, Users } from "lucide-react";

const NAV_ITEMS = [
  { to: "/import", label: "Import", icon: Upload },
  { to: "/recipients", label: "Recipients", icon: Users },
  { to: "/templates", label: "Templates", icon: FileText },
  { to: "/compose", label: "Compose", icon: Send },
  { to: "/logs", label: "Logs", icon: History },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="flex w-60 shrink-0 flex-col border-r bg-sidebar">
        <div className="flex h-14 items-center px-4 text-sm font-semibold tracking-tight">
          Email Blast
        </div>
        <nav className="flex-1 space-y-1 px-2 py-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              activeProps={{ className: "bg-muted text-foreground" }}
              inactiveProps={{
                className: "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              }}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

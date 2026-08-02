import { Button } from "@/components/ui/button";

export function ScreenPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="max-w-md text-center text-sm text-muted-foreground">{description}</p>
      <Button disabled variant="outline">
        Coming in a later milestone
      </Button>
    </div>
  );
}

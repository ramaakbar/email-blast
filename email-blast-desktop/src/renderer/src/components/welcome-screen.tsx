import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, FolderOpen, Loader2, Mail, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SETTING_KEYS } from "../../../shared/settings";

/**
 * The first-launch welcome/setup screen (spec decision 10). Shows the
 * LibreOffice check (with a download link and Check Again when missing)
 * and the default templates/output directories, and only lets the user
 * continue with Get Started once LibreOffice is found.
 */

const LO_DOWNLOAD_URL = "https://www.libreoffice.org/download/download-libreoffice/";
const isMac = typeof navigator !== "undefined" && /Mac/.test(navigator.userAgent);

function CheckRow({
  icon,
  label,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  detail: string;
}) {
  return (
    <li className="flex items-start gap-3">
      {icon}
      <div className="min-w-0">
        <p className="text-sm font-medium">{label}</p>
        <p className="truncate font-mono text-xs text-muted-foreground">{detail}</p>
      </div>
    </li>
  );
}

export function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
  const [loState, setLoState] = useState<"checking" | "found" | "missing">("checking");
  const [loPath, setLoPath] = useState<string | null>(null);
  const [templatesDir, setTemplatesDir] = useState<string | null>(null);
  const [outputDir, setOutputDir] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const check = useCallback(async () => {
    setLoState("checking");
    const path = await window.api.system.checkLibreOffice();
    setLoPath(path);
    setLoState(path === null ? "missing" : "found");
    const [templates, output] = await Promise.all([
      window.api.settings.get(SETTING_KEYS.templatesDir),
      window.api.settings.get(SETTING_KEYS.outputDir),
    ]);
    setTemplatesDir(templates ?? "");
    setOutputDir(output ?? "");
  }, []);

  useEffect(() => {
    void check();
  }, [check]);

  const handleGetStarted = async () => {
    setBusy(true);
    try {
      await window.api.settings.set(SETTING_KEYS.libreofficeChecked, "true");
      onComplete();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background p-8">
      <div className="w-full max-w-lg rounded-lg border bg-card p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <Mail className="size-8 text-primary" />
          <div>
            <h1 className="text-xl font-semibold">Welcome to Email Blast</h1>
            <p className="text-sm text-muted-foreground">
              One last check before you start sending.
            </p>
          </div>
        </div>

        <ul className="space-y-4">
          {loState === "checking" && (
            <CheckRow
              icon={<Loader2 className="mt-0.5 size-4 animate-spin text-muted-foreground" />}
              label="Checking for LibreOffice..."
              detail="Used to convert letters to PDF"
            />
          )}
          {loState === "found" && (
            <CheckRow
              icon={<CheckCircle2 className="mt-0.5 size-4 text-emerald-600" />}
              label="LibreOffice found"
              detail={loPath ?? ""}
            />
          )}
          {loState === "missing" && (
            <li className="flex items-start gap-3 rounded-md border border-destructive/40 bg-destructive/5 p-3">
              <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">LibreOffice is not installed</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Email Blast uses LibreOffice to convert filled letters to PDF.
                  {isMac ? " Install it with" : " Download it from"}
                </p>
                {isMac && (
                  <code className="mt-1 block rounded bg-muted px-2 py-1 font-mono text-xs">
                    brew install --cask libreoffice
                  </code>
                )}
                <a
                  className="mt-1 inline-block text-sm text-primary underline-offset-4 hover:underline"
                  href={LO_DOWNLOAD_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {LO_DOWNLOAD_URL}
                </a>
              </div>
              <Button variant="outline" size="sm" className="shrink-0" onClick={() => void check()}>
                Check Again
              </Button>
            </li>
          )}
          <CheckRow
            icon={<FolderOpen className="mt-0.5 size-4 text-muted-foreground" />}
            label="Templates folder"
            detail={templatesDir ?? "…"}
          />
          <CheckRow
            icon={<FolderOpen className="mt-0.5 size-4 text-muted-foreground" />}
            label="Output folder"
            detail={outputDir ?? "…"}
          />
        </ul>

        <Button
          className="mt-8 w-full"
          size="lg"
          disabled={loState !== "found" || busy}
          onClick={() => void handleGetStarted()}
        >
          {busy ? "Setting up…" : "Get Started"}
        </Button>
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import * as pdfjs from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// The pdf.js worker ships as a bundled asset; pointing the global worker
// source at it keeps rendering off the main thread in dev and packaged
// builds alike.
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

/**
 * Renders the first page of a PDF given as base64 bytes - the compose
 * wizard's spot-check preview. The canvas scales to fit its container
 * width; a failed render leaves the area blank rather than crashing the
 * wizard (the spot-check is a convenience, not the source of truth).
 */
export function PdfPreview({ dataBase64 }: { dataBase64: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    const render = async (): Promise<void> => {
      const canvas = canvasRef.current;
      if (canvas === null) return;
      const data = Uint8Array.from(atob(dataBase64), (char) => char.charCodeAt(0));
      // v6: the loading task owns destroy(); the proxy does not.
      const loadingTask = pdfjs.getDocument({ data });
      const doc = await loadingTask.promise;
      try {
        if (cancelled) return;
        const page = await doc.getPage(1);
        if (cancelled) return;
        const containerWidth = canvas.parentElement?.clientWidth ?? 400;
        const base = page.getViewport({ scale: 1 });
        const scale = containerWidth / base.width;
        const viewport = page.getViewport({ scale });
        canvas.width = Math.max(1, Math.floor(viewport.width));
        canvas.height = Math.max(1, Math.floor(viewport.height));
        // v6 renders onto the canvas element directly; the context is derived.
        await page.render({ canvas, viewport }).promise;
      } finally {
        void loadingTask.destroy();
      }
    };
    void render().catch(() => {
      // A preview failure is non-fatal; the spot-check stays blank.
    });
    return () => {
      cancelled = true;
    };
  }, [dataBase64]);

  return (
    <div className="flex items-start justify-center rounded-md border bg-muted/30 p-2">
      <canvas ref={canvasRef} className="h-auto max-w-full rounded-sm bg-white shadow-sm" />
    </div>
  );
}

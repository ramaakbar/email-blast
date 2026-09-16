import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { m } from "@paraglide/messages";
import type { FontFaceInfo } from "../../../shared/ipc";
import { errorMessage } from "./error-message";

/**
 * The slot editor's font faces (ticket 11): the available faces and a
 * per-face loader that registers the face in the document's font set.
 * The loader fetches the SAME file bytes the main process embeds at
 * generate time (fonts.getFile), so canvas measurement and the PDF
 * share one source of truth. Loaded faces cache per id; a face whose
 * file is gone resolves to null and the caller falls back to the legacy
 * Helvetica measurement - mirroring the main process's fallback.
 */

export interface FontFacesController {
  /** Every available face, or null while the first list is still loading. */
  readonly faces: readonly FontFaceInfo[] | null;
  /** Reloads the face list - after an upload lands, or on error retry. */
  readonly refresh: () => void;
  /** Starts loading a face into the document font set (idempotent per id). */
  readonly loadFace: (face: FontFaceInfo) => void;
  /**
   * The loaded face for an id: `undefined` while not loaded yet, `null`
   * when the file is missing or unreadable (use the legacy font),
   * otherwise the registered FontFace.
   */
  readonly loaded: (faceId: string) => FontFace | null | undefined;
}

export function useFontFaces(): FontFacesController {
  const [faces, setFaces] = useState<readonly FontFaceInfo[] | null>(null);
  const [reloadToken, setReloadToken] = useState(0);
  // faceId -> the pending load; a settled failure stores null in `loaded`.
  const pendingRef = useRef<Map<string, Promise<FontFace | null>>>(new Map());
  const loadedRef = useRef<Map<string, FontFace | null>>(new Map());
  const [, forceRender] = useReducer((count: number) => count + 1, 0);

  useEffect(() => {
    let cancelled = false;
    window.api.fonts
      .list()
      .then((list) => {
        if (cancelled) return;
        setFaces(list);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setFaces([]);
        console.error(errorMessage(err, m["templates.fontListFailed"]()));
      });
    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const loadFace = useCallback((face: FontFaceInfo) => {
    const pending = pendingRef.current.get(face.id);
    if (pending !== undefined) return;
    const promise = window.api.fonts
      .getFile(face.id)
      .then(async (file) => {
        if (file === null) return null;
        const fontFace = new FontFace(
          face.family,
          `url(data:${file.mimeType};base64,${file.dataBase64})`,
          face.weight === null ? {} : { weight: face.weight },
        );
        await fontFace.load();
        document.fonts.add(fontFace);
        return fontFace;
      })
      .catch(() => null);
    pendingRef.current.set(face.id, promise);
    void promise.then((fontFace) => {
      loadedRef.current.set(face.id, fontFace);
      // A settled load changes every measurement that uses this face.
      forceRender();
    });
  }, []);

  return {
    faces,
    refresh: () => setReloadToken((token) => token + 1),
    loadFace,
    loaded: (faceId) => loadedRef.current.get(faceId),
  };
}

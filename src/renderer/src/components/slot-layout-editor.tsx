import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlignCenter, AlignLeft, AlignRight, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { m } from "@paraglide/messages";
import type { FontFaceInfo, TemplateSlotLayout, SlotLayout } from "../../../shared/ipc";
import {
  fitFontSize,
  LEGACY_STACK_Y_FRACTION,
  LEGACY_TEXT_COLOR,
  MIN_SLOT_FONT_SIZE,
  slotTextX,
} from "../../../shared/slot-layout";
import { Button } from "@/components/ui/button";
import { errorMessage } from "@/lib/error-message";
import { useFontFaces } from "@/lib/font-faces";
import { cn } from "@/lib/utils";

/**
 * The image-template slot position editor (ticket 04): a live preview of
 * the template image with one draggable text box per slot, and numeric
 * inputs that stay in sync with the boxes. Coordinates are stored in
 * image pixels (CSS convention, origin top-left) and rendered scaled to
 * the preview; generation converts them into PDF space with the same
 * shared math, so the preview and the output PDF can never drift apart.
 * The preview draws each slot's name as its sample text, auto-shrunk to
 * the slot width exactly like generation shrinks the real values.
 * A slot with no saved configuration shows an ephemeral default box; it
 * is written to the template only when the user drags, types, or edits
 * it, so opening and saving the editor leaves unpositioned slots on the
 * legacy centered-stacked layout.
 */

/** The default box for a slot with no configuration yet, at the legacy first-slot spot. */
function defaultSlotLayout(pageHeight: number): SlotLayout {
  return {
    x: 0,
    y: Math.round(pageHeight * LEGACY_STACK_Y_FRACTION),
    fontSize: 48,
    color: LEGACY_TEXT_COLOR,
    align: "center",
    maxWidth: null,
    fontFace: null,
  };
}

/**
 * Measures a string at a size with the given loaded face (ticket 11) -
 * the same face generation embeds, so the fit-to-width math cannot
 * drift. A null face (unconfigured, unknown id, or still loading)
 * measures the legacy bold Helvetica approximation, exactly like the
 * PDF's fallback.
 */
function measureText(text: string, size: number, face: FontFaceInfo | null): number {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (ctx === null) return text.length * size * 0.6;
  ctx.font =
    face === null
      ? `bold ${size}px Helvetica, Arial, sans-serif`
      : `${face.weight === null ? "" : `${face.weight} `}${size}px "${face.family}"`;
  return ctx.measureText(text).width;
}

/** Clamps an image-pixel coordinate into the canvas. */
const clamp = (value: number, max: number): number => Math.max(0, Math.min(Math.round(value), max));

export function SlotLayoutEditor({
  imagePath,
  slots,
  layout,
  onChange,
  onClose,
}: {
  imagePath: string;
  slots: readonly string[];
  layout: TemplateSlotLayout;
  onChange: (next: TemplateSlotLayout) => void;
  onClose: () => void;
}) {
  const [image, setImage] = useState<{ url: string; width: number; height: number } | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(slots[0] ?? null);
  const [scale, setScale] = useState(1);
  const [addingFont, setAddingFont] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    slot: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  // The faces the face picker offers and the per-face loader behind the
  // preview measurement (ticket 11). Destructured so the effect deps
  // below are stable identities, not the fresh hook return object.
  const { faces: availableFaces, refresh: refreshFaces, loadFace, loaded: loadedFace } =
    useFontFaces();

  useEffect(() => {
    let cancelled = false;
    window.api.templates
      .getImage(imagePath)
      .then((result) => {
        if (cancelled || result === null) return;
        const url = `data:${result.mimeType};base64,${result.dataBase64}`;
        const img = new Image();
        img.addEventListener("load", () => {
          if (cancelled) return;
          setImage({ url, width: img.naturalWidth, height: img.naturalHeight });
        });
        img.src = url;
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setLoadError(errorMessage(err, m["templates.slotLayoutImageFailed"]()));
      });
    return () => {
      cancelled = true;
    };
  }, [imagePath]);

  // Scale the preview to fit the stage while keeping the aspect ratio.
  useEffect(() => {
    const stage = stageRef.current;
    if (stage === null || image === null) return;
    const fit = () => {
      const available = stage.clientWidth;
      const availableHeight = stage.clientHeight;
      setScale(Math.min(available / image.width, availableHeight / image.height));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [image]);

  // Escape closes only this editor; the page's own Escape handler skips
  // events originating inside the editor (data-slot-editor marker).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Every hook lives above the early returns - the loading and error
  // branches are plain JSX, never extra hook calls (rules-of-hooks).
  const pageWidth = image?.width ?? 0;
  const pageHeight = image?.height ?? 0;

  // The editable box of a slot: its saved config, or the ephemeral default
  // shown until the user actually touches the slot. Nothing is written to
  // the template until a drag, keystroke, or numeric edit materializes it,
  // so merely opening the editor and saving keeps unpositioned slots on
  // the legacy centered-stacked layout (ticket 04 acceptance).
  const configFor = useCallback(
    (slot: string): SlotLayout => layout[slot] ?? defaultSlotLayout(pageHeight),
    [layout, pageHeight],
  );

  const updateSlot = useCallback(
    (slot: string, patch: Partial<SlotLayout>) => {
      onChange({ ...layout, [slot]: { ...configFor(slot), ...patch } });
    },
    [layout, onChange, configFor],
  );

  // Face id -> info, for the picker and the measurement resolution.
  const facesById = useMemo(
    () => new Map((availableFaces ?? []).map((face) => [face.id, face])),
    [availableFaces],
  );

  /**
   * The face a slot's configured fontFace resolves to for measurement
   * and the preview box: null when unconfigured, unknown (upload
   * deleted), still loading, or failed to load - all the
   * legacy-Helvetica cases (a settled-null load means the file is
   * missing, and the PDF falls back to Helvetica Bold too). When a
   * pending load lands, the loader re-renders and the measurement
   * switches to the real face.
   */
  const measureFaceFor = (fontFace: string | null): FontFaceInfo | null => {
    if (fontFace === null) return null;
    const face = facesById.get(fontFace);
    const loaded = loadedFace(fontFace);
    return face !== undefined && loaded !== undefined && loaded !== null ? face : null;
  };

  // Load the faces the layout references plus the selected slot's face,
  // so their measurement and preview render use the real font.
  useEffect(() => {
    const wanted = new Set<string>();
    for (const config of Object.values(layout)) {
      if (config.fontFace !== null) wanted.add(config.fontFace);
    }
    if (selected !== null) {
      const config = layout[selected];
      if (config?.fontFace !== null && config?.fontFace !== undefined) wanted.add(config.fontFace);
    }
    for (const face of availableFaces ?? []) {
      if (wanted.has(face.id)) loadFace(face);
    }
  }, [layout, selected, availableFaces, loadFace]);

  const fitted = (slot: string): number => {
    const config = configFor(slot);
    const maxWidth = config.maxWidth ?? pageWidth - config.x;
    const face = measureFaceFor(config.fontFace);
    return fitFontSize({
      size: config.fontSize,
      maxWidth,
      measureWidth: (size) => measureText(slot, size, face),
    });
  };

  /** The native font picker, the upload, and a list refresh - the add-font flow. */
  const addFont = async (): Promise<void> => {
    try {
      const path = await window.api.system.pickFontFile();
      if (path === null) return;
      setAddingFont(true);
      const face = await window.api.fonts.add(path);
      refreshFaces();
      toast.success(m["templates.fontAdded"]({ family: face.family }));
    } catch (err) {
      toast.error(errorMessage(err, m["templates.fontAddFailed"]()));
    } finally {
      setAddingFont(false);
    }
  };

  if (loadError !== null) {
    return (
      <div
        data-slot-editor
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <div className="w-full max-w-sm rounded-lg border bg-card p-6 shadow-lg">
          <p className="text-sm text-destructive">{loadError}</p>
          <Button variant="outline" className="mt-4" onClick={onClose}>
            {m["common.close"]()}
          </Button>
        </div>
      </div>
    );
  }

  if (image === null) {
    return (
      <div
        data-slot-editor
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <p className="rounded-lg border bg-card px-6 py-4 text-sm text-muted-foreground">
          {m["templates.loadingTemplates"]()}
        </p>
      </div>
    );
  }

  return (
    <div
      data-slot-editor
      onMouseDown={(event) => event.stopPropagation()}
      className="fixed inset-0 z-50 flex flex-col bg-background"
    >
      <header className="flex items-center justify-between gap-3 border-b px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold">{m["templates.slotLayoutTitle"]()}</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{m["templates.slotLayoutHint"]()}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label={m["common.close"]()}>
          <X className="size-4" />
        </Button>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* The live preview: the image at its fitted scale, one draggable box per slot. */}
        <div
          ref={stageRef}
          className="relative flex min-w-0 flex-1 items-center justify-center overflow-auto bg-muted/40 p-6"
        >
          <div
            className="relative shrink-0 shadow-lg"
            style={{ width: pageWidth * scale, height: pageHeight * scale }}
          >
            <img
              src={image.url}
              alt=""
              draggable={false}
              className="block select-none"
              style={{ width: pageWidth * scale, height: pageHeight * scale }}
            />
            {slots.map((slot) => {
              const config = configFor(slot);
              const face = measureFaceFor(config.fontFace);
              const size = fitted(slot);
              const maxWidth = config.maxWidth ?? pageWidth - config.x;
              const textWidth = measureText(slot, size, face);
              // The same alignment math generation uses (shared/slot-layout).
              const left =
                slotTextX({ x: config.x, maxWidth, textWidth, align: config.align }) * scale;
              return (
                <div
                  key={slot}
                  role="button"
                  aria-label={slot}
                  tabIndex={0}
                  onPointerDown={(event) => {
                    event.preventDefault();
                    setSelected(slot);
                    const rect = (
                      event.currentTarget.parentElement as HTMLElement
                    ).getBoundingClientRect();
                    dragRef.current = {
                      slot,
                      offsetX: (event.clientX - rect.left) / scale - config.x,
                      offsetY: (event.clientY - rect.top) / scale - config.y,
                    };
                    event.currentTarget.setPointerCapture(event.pointerId);
                  }}
                  onPointerMove={(event) => {
                    const drag = dragRef.current;
                    if (drag === null || drag.slot !== slot) return;
                    const rect = (
                      event.currentTarget.parentElement as HTMLElement
                    ).getBoundingClientRect();
                    updateSlot(drag.slot, {
                      x: clamp((event.clientX - rect.left) / scale - drag.offsetX, pageWidth - 1),
                      y: clamp((event.clientY - rect.top) / scale - drag.offsetY, pageHeight - 1),
                    });
                  }}
                  onPointerUp={(event) => {
                    dragRef.current = null;
                    event.currentTarget.releasePointerCapture(event.pointerId);
                  }}
                  onPointerCancel={() => {
                    dragRef.current = null;
                  }}
                  onKeyDown={(event) => {
                    const step = event.shiftKey ? 10 : 1;
                    const moves: Record<string, [number, number]> = {
                      ArrowLeft: [-step, 0],
                      ArrowRight: [step, 0],
                      ArrowUp: [0, -step],
                      ArrowDown: [0, step],
                    };
                    const move = moves[event.key];
                    if (move === undefined) return;
                    event.preventDefault();
                    updateSlot(slot, {
                      x: clamp(config.x + move[0], pageWidth - 1),
                      y: clamp(config.y + move[1], pageHeight - 1),
                    });
                  }}
                  className={cn(
                    "absolute cursor-move select-none rounded-sm border border-dashed border-sky-500/80 outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                    selected === slot
                      ? "border-solid bg-sky-500/10"
                      : "opacity-80 hover:opacity-100",
                  )}
                  style={{
                    left,
                    top: config.y * scale,
                    width: textWidth * scale,
                    fontSize: size * scale,
                    lineHeight: 1,
                    color: config.color,
                    // The box renders in the slot's chosen face; the
                    // legacy look keeps the browser's default font.
                    fontFamily: face === null ? undefined : `"${face.family}"`,
                    fontWeight: face === null ? undefined : (face.weight ?? undefined),
                    whiteSpace: "nowrap",
                    padding: "0 2px",
                  }}
                >
                  {slot}
                </div>
              );
            })}
          </div>
        </div>

        {/* The control panel: slot list plus the selected slot's numeric inputs. */}
        <aside className="flex w-72 shrink-0 flex-col gap-4 overflow-y-auto border-l bg-card px-4 py-4">
          <section>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {m["templates.slots"]()}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelected(slot)}
                  className={cn(
                    "rounded-md border px-2 py-1 font-mono text-xs transition-colors",
                    selected === slot
                      ? "border-ring bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/50",
                  )}
                >
                  {"{"}
                  {slot}
                  {"}"}
                </button>
              ))}
            </div>
          </section>

          {selected !== null && (
            <SlotControls
              slot={selected}
              config={configFor(selected)}
              pageWidth={pageWidth}
              pageHeight={pageHeight}
              faces={availableFaces ?? null}
              addingFont={addingFont}
              onAddFont={() => void addFont()}
              onChange={(patch) => updateSlot(selected, patch)}
            />
          )}
        </aside>
      </div>

      <footer className="flex items-center justify-end gap-2 border-t px-6 py-3">
        <Button onClick={onClose}>{m["templates.slotLayoutDone"]()}</Button>
      </footer>
    </div>
  );
}

/** A labeled numeric input for one layout field. */
function NumberField({
  label,
  value,
  onApply,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onApply: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step ?? 1}
        onChange={(event) => {
          const next = Number(event.target.value);
          if (!Number.isFinite(next)) return;
          const clamped = Math.min(Math.max(next, min ?? 0), max ?? Number.MAX_SAFE_INTEGER);
          onApply(clamped);
        }}
        className="h-8 w-full rounded-md border bg-background px-2 font-mono text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
      />
    </label>
  );
}

/** The face picker plus the add-font flow of one slot (ticket 11). */
function FontFaceField({
  config,
  faces,
  addingFont,
  onAddFont,
  onChange,
}: {
  config: SlotLayout;
  faces: readonly FontFaceInfo[] | null;
  addingFont: boolean;
  onAddFont: () => void;
  onChange: (fontFace: string | null) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">
        {m["templates.slotFontFace"]()}
      </span>
      <div className="flex gap-2">
        <select
          value={config.fontFace ?? ""}
          onChange={(event) => onChange(event.target.value === "" ? null : event.target.value)}
          className="h-8 w-full min-w-0 rounded-md border bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        >
          <option value="">{m["templates.slotFontFaceDefault"]()}</option>
          {(faces ?? []).map((face) => (
            <option key={face.id} value={face.id}>
              {face.weightLabel === null ? face.family : `${face.family} ${face.weightLabel}`}
            </option>
          ))}
        </select>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 shrink-0 px-2"
          disabled={addingFont}
          onClick={onAddFont}
        >
          <Plus className="size-4" /> {m["templates.addFont"]()}
        </Button>
      </div>
    </label>
  );
}

/** The numeric fields of one slot; every change flows through onChange. */
function SlotControls({
  slot,
  config,
  pageWidth,
  pageHeight,
  faces,
  addingFont,
  onAddFont,
  onChange,
}: {
  slot: string;
  config: SlotLayout;
  pageWidth: number;
  pageHeight: number;
  faces: readonly FontFaceInfo[] | null;
  addingFont: boolean;
  onAddFont: () => void;
  onChange: (patch: Partial<SlotLayout>) => void;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <code className="text-foreground">
            {"{"}
            {slot}
            {"}"}
          </code>
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <NumberField
          label={m["templates.slotX"]()}
          value={config.x}
          max={pageWidth}
          onApply={(value) => onChange({ x: value })}
        />
        <NumberField
          label={m["templates.slotY"]()}
          value={config.y}
          max={pageHeight}
          onApply={(value) => onChange({ y: value })}
        />
      </div>
      <NumberField
        label={m["templates.slotFontSize"]()}
        value={config.fontSize}
        min={MIN_SLOT_FONT_SIZE}
        onApply={(value) => onChange({ fontSize: value })}
      />
      <FontFaceField
        config={config}
        faces={faces}
        addingFont={addingFont}
        onAddFont={onAddFont}
        onChange={(fontFace) => onChange({ fontFace })}
      />
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-muted-foreground">
          {m["templates.slotMaxWidth"]()}
        </span>
        <input
          type="number"
          value={config.maxWidth ?? ""}
          min={1}
          placeholder={m["templates.slotMaxWidthAuto"]()}
          onChange={(event) => {
            const raw = event.target.value;
            if (raw === "") {
              onChange({ maxWidth: null });
              return;
            }
            const next = Number(raw);
            if (Number.isFinite(next) && next >= 1) onChange({ maxWidth: next });
          }}
          className="h-8 w-full rounded-md border bg-background px-2 font-mono text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-muted-foreground">
          {m["templates.slotColor"]()}
        </span>
        <input
          type="color"
          value={config.color}
          onChange={(event) => onChange({ color: event.target.value })}
          className="h-8 w-full cursor-pointer rounded-md border bg-background px-1"
        />
      </label>
      <div>
        <span className="mb-1 block text-xs font-medium text-muted-foreground">
          {m["templates.slotAlign"]()}
        </span>
        <div className="flex gap-1" role="radiogroup" aria-label={m["templates.slotAlign"]()}>
          {(
            [
              ["left", AlignLeft],
              ["center", AlignCenter],
              ["right", AlignRight],
            ] as const
          ).map(([align, Icon]) => (
            <button
              key={align}
              type="button"
              role="radio"
              aria-checked={config.align === align}
              aria-label={m[
                `templates.slotAlign${align === "center" ? "Center" : align === "left" ? "Left" : "Right"}`
              ]()}
              onClick={() => onChange({ align })}
              className={cn(
                "flex h-8 flex-1 items-center justify-center rounded-md border transition-colors",
                config.align === align
                  ? "border-ring bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50",
              )}
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

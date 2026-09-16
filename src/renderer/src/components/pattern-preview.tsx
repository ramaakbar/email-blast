/**
 * The output pattern with every `{slot}` highlighted, so the user sees
 * exactly which slot fills which position. References to slots the
 * template does not declare render red. Shared by the Templates screen
 * and the Generate workspace so the rendering can never drift apart.
 */
export function PatternPreview({ pattern, slots }: { pattern: string; slots: readonly string[] }) {
  const parts: React.ReactNode[] = [];
  let key = 0;
  let last = 0;
  for (const match of pattern.matchAll(/\{([^{}]+)\}/g)) {
    const ref = match[1];
    const start = match.index ?? 0;
    if (start > last) parts.push(<span key={key++}>{pattern.slice(last, start)}</span>);
    const known = slots.some((slot) => slot.trim() === ref);
    parts.push(
      <code
        key={key++}
        className={`rounded bg-muted px-1 font-mono text-xs ${known ? "text-primary" : "text-destructive"}`}
      >
        {"{"}
        {ref}
        {"}"}
      </code>,
    );
    last = start + match[0].length;
  }
  if (last < pattern.length) parts.push(<span key={key++}>{pattern.slice(last)}</span>);
  return <span className="font-mono text-sm">{parts}</span>;
}

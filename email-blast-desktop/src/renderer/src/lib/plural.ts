/**
 * Selects the singular or plural catalog form by count. The catalog holds
 * `_one`/`_other` message pairs (the message-format plugin has no ICU
 * plural syntax); English grammar differs by count, Indonesian uses the
 * same form for both, so the pair resolves here in one place.
 */
export function plural(
  count: number,
  one: (inputs: { count: number }) => string,
  other: (inputs: { count: number }) => string,
): string {
  return count === 1 ? one({ count }) : other({ count });
}

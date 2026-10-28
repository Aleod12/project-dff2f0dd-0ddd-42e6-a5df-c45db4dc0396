/** True when a content value should be rendered. Empty strings, null, undefined and empty arrays are hidden. */
export function isPresent<T>(value: T | null | undefined | ""): value is T {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

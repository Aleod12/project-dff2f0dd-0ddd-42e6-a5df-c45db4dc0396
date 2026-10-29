import { useEffect, useState } from "react";

/** Tiny shared on/off flags between distant components (sticky bar ↔ header, transcript sheet ↔ sticky bar). */
export type UiFlag = "sticky-visible" | "sheet-open";

const flags: Record<UiFlag, boolean> = { "sticky-visible": false, "sheet-open": false };
const EVENT = "ui-flag";

export function setUiFlag(name: UiFlag, value: boolean) {
  if (flags[name] === value) return;
  flags[name] = value;
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent(EVENT));
}

export function useUiFlag(name: UiFlag) {
  const [value, setValue] = useState(false);
  useEffect(() => {
    const sync = () => setValue(flags[name]);
    sync();
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, [name]);
  return value;
}

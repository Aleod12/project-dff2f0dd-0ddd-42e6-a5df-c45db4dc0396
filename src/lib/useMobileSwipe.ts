import { useRef, useState } from "react";

/** Native full-width list slides; the 16px gap matches the mobile tracks. */
export function useMobileSwipe<T extends HTMLElement>(count: number) {
  const track = useRef<T>(null);
  const [current, setCurrent] = useState(0);
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setCurrent(Math.max(0, Math.min(count - 1, Math.round(el.scrollLeft / (el.clientWidth + 16)))));
  };
  const goTo = (index: number) => {
    const el = track.current;
    if (!el || index < 0 || index >= count) return;
    el.scrollTo({ left: index * (el.clientWidth + 16), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return { track, current, onScroll, goTo };
}
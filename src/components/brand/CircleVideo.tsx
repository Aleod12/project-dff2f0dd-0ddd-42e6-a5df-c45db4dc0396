import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = { src?: string; poster?: string; label: string; className?: string };

/** Round video. Loads only after the user presses play. Without src shows a neutral placeholder. */
export function CircleVideo({ src, poster, label, className }: Props) {
  const [playing, setPlaying] = useState(false);
  const base = cn("relative aspect-square w-full overflow-hidden rounded-full bg-surface shadow-photo", className);

  if (!src) {
    return (
      <div className={cn(base, "flex items-center justify-center")} role="img" aria-label={`${label} — видео скоро появится`}>
        <span className="text-sm text-muted-foreground">Видео скоро</span>
      </div>
    );
  }
  if (playing) {
    return (
      <div className={base}>
        <video src={src} poster={poster} controls autoPlay playsInline className="size-full object-cover" aria-label={label} />
      </div>
    );
  }
  return (
    <button type="button" onClick={() => setPlaying(true)} className={cn(base, "group")} aria-label={`Смотреть: ${label}`}>
      {poster && <img src={poster} alt="" className="size-full object-cover" loading="lazy" />}
      <span className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-cta transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="ml-1 size-6" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}

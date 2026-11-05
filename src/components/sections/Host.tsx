import { useRef, useState } from "react";
import { Pause, Play, X } from "lucide-react";
import { host } from "@/content/host";
import { CtaButton } from "@/components/brand/CtaButton";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { Island } from "@/components/layout/Island";
import { isPresent } from "@/lib/present";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { pauseOtherVideos } from "@/lib/exclusivePlay";
import { Transcript, TranscriptButton, TranscriptPanel } from "@/components/brand/TranscriptToggle";
import portrait480 from "@/assets/host/sergey-host-480.webp.asset.json";
import portrait864 from "@/assets/host/sergey-host-864.webp.asset.json";
import poster from "@/assets/host/welcome-poster.webp.asset.json";
import videoFile from "@/assets/host/welcome-video.mp4.asset.json";

type VideoState = "idle" | "playing" | "paused";

/** Round welcome video: poster only until click, then loads and plays with sound. Never autoplays. */
function RoundVideo({ className, circleClassName, captionClassName }: { className?: string; circleClassName?: string; captionClassName?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<VideoState>("idle");
  const v = host.video;

  const start = () => {
    setState("playing");
    requestAnimationFrame(() => ref.current?.play().catch(() => setState("paused")));
  };
  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  };
  const close = () => {
    const el = ref.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    setState("idle");
  };

  return (
    <figure className={cn("flex flex-col items-center gap-3", className)}>
      <div className={cn("relative size-60 rounded-full bg-sage shadow-island ring-4 ring-background", circleClassName)}>
        {state === "idle" ? (
          <button
            type="button"
            onClick={start}
            aria-label={v.playLabel}
            className="group relative block size-full overflow-hidden rounded-full focus-visible:outline-2"
          >
            <img
              src={poster.url}
              width={344}
              height={344}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
            <span className="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-cta transition-colors group-hover:bg-primary-hover">
              <Play className="ml-1 size-7" fill="currentColor" aria-hidden="true" />
            </span>
          </button>
        ) : (
          <>
            <video
              ref={ref}
              src={videoFile.url}
              poster={poster.url}
              preload="none"
              playsInline
              onClick={toggle}
              onPlay={() => {
                pauseOtherVideos(ref.current);
                setState("playing");
              }}
              onPause={() => setState((s) => (s === "idle" ? s : "paused"))}
              onEnded={close}
              className="size-full cursor-pointer rounded-full object-cover"
            />
            <button
              type="button"
              onClick={toggle}
              aria-label={state === "playing" ? v.pauseLabel : v.resumeLabel}
              className="absolute bottom-3 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-cta focus-visible:outline-2"
            >
              {state === "playing" ? (
                <Pause className="size-5" fill="currentColor" aria-hidden="true" />
              ) : (
                <Play className="ml-0.5 size-5" fill="currentColor" aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              onClick={close}
              aria-label={v.closeLabel}
              className="absolute right-2 top-2 flex size-10 items-center justify-center rounded-full bg-background text-foreground shadow-island focus-visible:outline-2"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
      <figcaption className={cn("text-center text-sm font-semibold text-muted-foreground", captionClassName)}>{v.caption}</figcaption>
    </figure>
  );
}

function Portrait() {
  return (
    <picture>
      {/* Phones get an empty source, so the portrait is never downloaded there. */}
      <source media="(max-width: 767px)" srcSet="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
      <img
      src={portrait864.url}
      srcSet={`${portrait480.url} 480w, ${portrait864.url} 864w`}
      sizes="(min-width: 1024px) 340px, 100vw"
      width={864}
      height={1080}
      alt={host.portraitAlt}
      loading="lazy"
      decoding="async"
      className="aspect-[4/5] w-full rounded-card object-cover shadow-island"
    />
    </picture>
  );
}

export function Host() {
  const [textOpen, setTextOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const numbers = host.numbers.filter((n) => isPresent(n.value));

  return (
    <Island id="host" tone="card" aria-labelledby={host.titleId}>
      <SectionTitle id={host.titleId} title={host.title} accent={host.accent} />
      {isPresent(host.eyebrow) && <p className="mt-5 text-center text-eyebrow">{host.eyebrow}</p>}

      <div className="mt-8 grid gap-10 md:mt-12 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-x-[136px]">
        {/* Desktop: portrait with the round video over its lower-right corner. */}
        {/* Desktop: portrait, then the round video below it (no overlap). Sticky only on viewports tall enough to fit it. */}
        <div className="hidden self-start lg:top-24 lg:flex lg:flex-col lg:items-center [@media(min-height:820px)]:lg:sticky">
          <div className="w-[340px]">
            <Portrait />
          </div>
          <RoundVideo className="mt-6" circleClassName="size-[200px]" captionClassName="max-w-[260px]" />
          <TranscriptButton open={textOpen} onToggle={() => setTextOpen((o) => !o)} controls="host-video-text" className="mt-1" />
          <TranscriptPanel id="host-video-text" open={textOpen} text={host.video.transcript} className="mt-3 w-full" />
        </div>

        <div className="flex min-w-0 flex-col gap-10">
          <p className="font-display text-2xl leading-snug md:text-[28px]">{host.intro}</p>

          {/* Phones/tablets: video, then portrait. */}
          <div className="flex flex-col items-center gap-8 lg:hidden">
            <RoundVideo />
            <Transcript text={host.video.transcript} className="-mt-4 max-w-[440px]" />
            <div className="hidden w-full max-w-[440px] md:block">
              <Portrait />
            </div>
          </div>

          <ol id="host-story" className="relative flex flex-col gap-7 md:rounded-card md:bg-surface md:p-8">
            <span aria-hidden="true" className="absolute bottom-10 left-[4px] top-3 md:top-10 w-px bg-gold md:left-[37px]" />
            {host.timeline.map((step, i) => (
              <li key={step.title} className={cn("relative pl-8", i > 0 && !storyOpen && "hidden md:list-item")}>
                <span aria-hidden="true" className="absolute left-0 top-2 size-2.5 rotate-45 bg-gold" />
                <h3 className="text-xl font-semibold text-primary md:text-2xl [font-variant-numeric:lining-nums_tabular-nums]">{step.title}</h3>
                <p className="mt-1 text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>

          <Button variant="link" aria-expanded={storyOpen} aria-controls="host-story" onClick={() => setStoryOpen((open) => !open)} className="-mt-6 h-auto min-h-11 justify-start self-start whitespace-normal px-0 text-left text-[15px] md:hidden">
            {host.storyToggle}
          </Button>

          {numbers.length > 0 && (
            <div>
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {numbers.map((n) => (
                  <div key={n.label} className="flex flex-col justify-start rounded-card bg-surface p-4 text-center">
                    <dt className="order-2 mt-1 text-sm leading-snug text-muted-foreground">{n.label}</dt>
                    <dd className="order-1 lining-nums font-display text-4xl font-semibold leading-none text-primary">{n.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-center text-sm italic text-muted-foreground">{host.numbersCaption}</p>
            </div>
          )}

          <div className="flex flex-col items-center gap-2 sm:items-start">
            <CtaButton href={host.cta.href} track={host.cta.track} variant="outline" block>
              {host.cta.label}
            </CtaButton>
            <p className="text-sm text-muted-foreground">{host.cta.note}</p>
          </div>
        </div>
      </div>
    </Island>
  );
}

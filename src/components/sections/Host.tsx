import { useRef, useState } from "react";
import { Pause, Play, X } from "lucide-react";
import { host } from "@/content/host";
import { CtaButton } from "@/components/brand/CtaButton";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { Island } from "@/components/layout/Island";
import { isPresent } from "@/lib/present";
import { cn } from "@/lib/utils";
import portrait480 from "@/assets/host/sergey-host-480.webp.asset.json";
import portrait864 from "@/assets/host/sergey-host-864.webp.asset.json";
import poster from "@/assets/host/welcome-poster.webp.asset.json";
import videoFile from "@/assets/host/welcome-video.mp4.asset.json";

type VideoState = "idle" | "playing" | "paused";

/** Round welcome video: poster only until click, then loads and plays with sound. Never autoplays. */
function RoundVideo({ className }: { className?: string }) {
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
      <div className="relative size-60 rounded-full bg-sage shadow-island ring-4 ring-background lg:size-[280px]">
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
              onPlay={() => setState("playing")}
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
      <figcaption className="text-sm font-semibold text-muted-foreground">{v.caption}</figcaption>
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
      sizes="(min-width: 1024px) 440px, 100vw"
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
  const numbers = host.numbers.filter((n) => isPresent(n.value));

  return (
    <Island id="host" tone="card" aria-labelledby={host.titleId}>
      <SectionTitle id={host.titleId} title={host.title} accent={host.accent} />

      <div className="mt-8 grid gap-10 md:mt-12 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-16">
        {/* Desktop: portrait with the round video over its lower-right corner. */}
        <div className="relative hidden self-start pb-20 lg:sticky lg:top-24 lg:block">
          <Portrait />
          <RoundVideo className="absolute -right-12 bottom-0" />
        </div>

        <div className="flex min-w-0 flex-col gap-10">
          <p className="font-display text-2xl leading-snug md:text-[28px]">{host.intro}</p>

          {/* Phones/tablets: video, then portrait. */}
          <div className="flex flex-col items-center gap-8 lg:hidden">
            <RoundVideo />
            <div className="hidden w-full max-w-[440px] md:block">
              <Portrait />
            </div>
          </div>

          <ol className="relative flex flex-col gap-7 md:rounded-card md:bg-surface md:p-8">
            <span aria-hidden="true" className="absolute bottom-10 left-[4px] top-3 md:top-10 w-px bg-gold md:left-[37px]" />
            {host.timeline.map((step) => (
              <li key={step.title} className="relative pl-8">
                <span aria-hidden="true" className="absolute left-0 top-2 size-2.5 rotate-45 bg-gold" />
                <h3 className="lining-nums text-xl font-semibold text-primary md:text-2xl">{step.title}</h3>
                <p className="mt-1 text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>

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

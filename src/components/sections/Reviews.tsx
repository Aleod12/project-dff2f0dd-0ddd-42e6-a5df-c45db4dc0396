import { useEffect, useRef, useState } from "react";
import { Pause, Play, X } from "lucide-react";
import { reviews, reviewTitle, type VideoReview } from "@/content/reviews";
import { CtaButton } from "@/components/brand/CtaButton";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { Island } from "@/components/layout/Island";
import { TranscriptButton, TranscriptPanel } from "@/components/brand/TranscriptToggle";
import { pauseOtherVideos } from "@/lib/exclusivePlay";
import { isPresent } from "@/lib/present";
import { cn } from "@/lib/utils";

const circle = "relative size-[180px] shrink-0 rounded-full bg-sage shadow-island ring-4 ring-background md:size-[200px]";

function PlayBadge() {
  return (
    <span className="absolute inset-0 m-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-cta transition-colors group-hover:bg-primary-hover">
      <Play className="ml-1 size-6" fill="currentColor" aria-hidden="true" />
    </span>
  );
}

function Poster({ r, onClick }: { r: VideoReview; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${reviews.playLabel}: ${reviewTitle(r)}, ${r.duration}`}
      className="group relative block size-full overflow-hidden rounded-full focus-visible:outline-2"
    >
      <img src={r.poster} width={r.size} height={r.size} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
      <PlayBadge />
    </button>
  );
}

/** Local round video: loads only after click; parent controls which one is active. */
function LocalVideo({ r, active, onActivate, onStop }: { r: VideoReview; active: boolean; onActivate: () => void; onStop: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (active) requestAnimationFrame(() => ref.current?.play().catch(() => setPlaying(false)));
  }, [active]);

  if (!active) return <Poster r={r} onClick={onActivate} />;

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  };

  return (
    <>
      <video
        ref={ref}
        src={r.video}
        poster={r.poster}
        preload="none"
        playsInline
        width={r.size}
        height={r.size}
        onClick={toggle}
        onPlay={() => {
          pauseOtherVideos(ref.current);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onEnded={onStop}
        className="size-full cursor-pointer rounded-full object-cover"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? reviews.pauseLabel : reviews.resumeLabel}
        className="absolute bottom-2 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-cta focus-visible:outline-2"
      >
        {playing ? <Pause className="size-5" fill="currentColor" aria-hidden="true" /> : <Play className="ml-0.5 size-5" fill="currentColor" aria-hidden="true" />}
      </button>
      <button
        type="button"
        onClick={onStop}
        aria-label={reviews.closeLabel}
        className="absolute right-1 top-1 flex size-10 items-center justify-center rounded-full bg-background text-foreground shadow-island focus-visible:outline-2"
      >
        <X className="size-5" aria-hidden="true" />
      </button>
    </>
  );
}

export function Reviews() {
  const [active, setActive] = useState<string | null>(null);
  const [dot, setDot] = useState(0);
  const [openText, setOpenText] = useState<string | null>(null);
  const track = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const item = el.firstElementChild as HTMLElement | null;
    const step = item ? item.offsetWidth + 16 : el.clientWidth;
    setDot(Math.round(el.scrollLeft / step));
  };
  const goTo = (i: number) => {
    const el = track.current;
    const item = el?.children[i] as HTMLElement | undefined;
    if (el && item) el.scrollTo({ left: item.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <Island id="reviews" tone="surface" aria-labelledby={reviews.titleId}>
      <SectionTitle id={reviews.titleId} title={reviews.title} accent={reviews.accent} />

      <div
        ref={track}
        role="list"
        onScroll={onScroll}
        className="-mx-5 mt-8 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:mt-12 md:grid md:grid-cols-4 md:gap-x-6 md:gap-y-8 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {reviews.videos.map((r) => {
          const panelId = `review-text-${r.id}`;
          const open = openText === r.id;
          return (
            <div key={r.id} role="listitem" data-review-video className="flex w-[260px] shrink-0 snap-center flex-col items-center gap-3 md:contents">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className={circle}>
                  <LocalVideo r={r} active={active === r.id} onActivate={() => setActive(r.id)} onStop={() => setActive(null)} />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="font-display text-lg font-semibold text-primary">{reviewTitle(r)}</p>
                  {isPresent(r.summary ?? "") && <p className="font-display text-lg italic leading-snug">«{r.summary}»</p>}
                  <p className="text-sm text-muted-foreground">{r.duration}</p>
                  {isPresent(r.transcript ?? "") && (
                    <TranscriptButton open={open} onToggle={() => setOpenText(open ? null : r.id)} controls={panelId} className="mt-1" />
                  )}
                </div>
              </div>
              {isPresent(r.transcript ?? "") && (
                <TranscriptPanel id={panelId} open={open} text={r.transcript!} className="w-full md:order-1 md:col-span-4 md:mx-auto md:max-w-[760px]" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-center gap-1 md:hidden" role="group" aria-label={reviews.dotsLabel}>
        {reviews.videos.map((r, i) => (
          <button
            key={r.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={reviews.dotLabel(i + 1)}
            aria-current={dot === i ? "true" : undefined}
            className="flex size-6 items-center justify-center"
          >
            <span aria-hidden="true" className={cn("size-2 rounded-full transition-colors", dot === i ? "bg-primary" : "bg-secondary")} />
          </button>
        ))}
      </div>

      <ul className="mx-auto mt-10 grid max-w-[900px] gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
        {reviews.quotes.map((q) => (
          <li key={q.name} data-review-quote className="flex flex-col gap-3 rounded-card bg-background p-6 shadow-island md:p-7">
            <span aria-hidden="true" className="font-display text-6xl leading-[0.6] text-gold">“</span>
            <blockquote className="text-[17px] leading-relaxed md:text-lg">{q.text}</blockquote>
            <p className="font-display text-xl font-semibold text-primary">{q.name}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col items-center gap-4 text-center">
        <p className="text-sm text-muted-foreground">{reviews.consent}</p>
        <CtaButton href={reviews.cta.href} track={reviews.cta.track} variant="ghost" className="text-base sm:text-lg">
          {reviews.cta.label}
        </CtaButton>
      </div>
    </Island>
  );
}

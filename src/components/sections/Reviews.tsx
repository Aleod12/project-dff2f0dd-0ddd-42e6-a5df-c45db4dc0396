import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, X } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { setUiFlag } from "@/lib/uiFlags";
import { reviews, reviewTitle, transcriptHeading, type VideoReview } from "@/content/reviews";
import { CtaButton } from "@/components/brand/CtaButton";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { Island } from "@/components/layout/Island";
import { TranscriptButton, TranscriptPanel } from "@/components/brand/TranscriptToggle";
import { pauseOtherVideos } from "@/lib/exclusivePlay";
import { isPresent } from "@/lib/present";
import { cn } from "@/lib/utils";
import { useMobileSwipe } from "@/lib/useMobileSwipe";
import { MobileSwipeNavigation } from "@/components/brand/MobileSwipeNavigation";

const circle = "relative size-[200px] shrink-0 rounded-full bg-sage shadow-island ring-4 ring-background md:size-[200px]";

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

/** True below 768px — there the transcript opens in a bottom sheet instead of inline. */
function useIsPhone() {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767.98px)");
    const sync = () => setPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return phone;
}

export function Reviews() {
  const quotesSwipe = useMobileSwipe<HTMLUListElement>(reviews.quotes.length);
  const [active, setActive] = useState<string | null>(null);
  const [dot, setDot] = useState(0);
  const [openText, setOpenText] = useState<string | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const isPhone = useIsPhone();
  const sheetReview = isPhone ? reviews.videos.find((r) => r.id === openText) : undefined;
  useEffect(() => {
    setUiFlag("sheet-open", Boolean(sheetReview));
  }, [sheetReview]);
  useEffect(() => () => setUiFlag("sheet-open", false), []);

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

      <div className="relative">
      <div
        ref={track}
        role="list"
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:mx-0 md:mt-12 md:grid md:grid-cols-3 md:mx-auto md:max-w-[760px] md:gap-x-6 md:gap-y-8 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {reviews.videos.map((r) => {
          const panelId = `review-text-${r.id}`;
          const open = openText === r.id;
          return (
            <div key={r.id} role="listitem" data-review-video className="flex w-full shrink-0 snap-center snap-always flex-col items-center gap-3 md:contents">
              <div className="flex flex-col items-center gap-3 text-center md:h-full">
                <div className={cn(circle, open && "ring-[3px] ring-gold")}>
                  <LocalVideo r={r} active={active === r.id} onActivate={() => setActive(r.id)} onStop={() => setActive(null)} />
                </div>
                <div className="flex flex-1 flex-col items-center gap-1">
                  <p className="font-display text-lg font-semibold text-primary">{reviewTitle(r)}</p>
                  {isPresent(r.summary ?? "") && <p className="font-display text-lg italic leading-snug">«{r.summary}»</p>}
                  <p className="text-sm text-muted-foreground">{r.duration}</p>
                  {isPresent(r.transcript ?? "") && (
                    <TranscriptButton open={open} onToggle={() => setOpenText(open ? null : r.id)} controls={panelId} className="mt-auto pt-1" />
                  )}
                </div>
              </div>
              {isPresent(r.transcript ?? "") && (
                <TranscriptPanel id={panelId} open={open} text={r.transcript!} label={transcriptHeading(reviewTitle(r), r.duration)} className="max-md:!hidden w-full md:order-1 md:col-span-3" />
              )}
            </div>
          );
        })}
      </div>
      {/* Phones: prev/next arrows on both sides of the circle (circle is 200px, its centre is 100px from the top). */}
      {[-1, 1].map((d) => {
        const target = dot + d;
        const disabled = target < 0 || target >= reviews.videos.length;
        const Icon = d < 0 ? ChevronLeft : ChevronRight;
        return (
          <button
            key={d}
            type="button"
            onClick={() => goTo(target)}
            disabled={disabled}
            aria-label={d < 0 ? reviews.prevLabel : reviews.nextLabel}
            className={cn(
              "absolute top-[78px] flex size-11 items-center justify-center rounded-full border border-primary bg-background text-primary transition-opacity disabled:opacity-30 focus-visible:outline-2 md:hidden",
              d < 0 ? "left-0" : "right-0",
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
          </button>
        );
      })}
      </div>

      <div className="mt-2 flex justify-center md:hidden" role="group" aria-label={reviews.dotsLabel}>
        {reviews.videos.map((r, i) => (
          <button
            key={r.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={reviews.dotLabel(i + 1)}
            aria-current={dot === i ? "true" : undefined}
            className="flex size-11 items-center justify-center"
          >
            <span aria-hidden="true" className={cn("h-2 w-2 rounded-full transition-all", dot === i ? "w-5 bg-primary" : "bg-primary/75")} />
          </button>
        ))}
      </div>

      <Drawer open={Boolean(sheetReview)} onOpenChange={(o) => !o && setOpenText(null)} shouldScaleBackground={false}>
        <DrawerContent className="max-h-[80dvh] border-border bg-background pb-[env(safe-area-inset-bottom)]">
          {sheetReview && (
            <>
              <div className="flex items-start justify-between gap-3 px-5 pt-3">
                <DrawerTitle className="font-display text-xl font-semibold leading-snug text-primary">
                  {transcriptHeading(reviewTitle(sheetReview), sheetReview.duration)}
                </DrawerTitle>
                <DrawerClose aria-label={reviews.sheetCloseLabel} className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary text-primary focus-visible:outline-2">
                  <X className="size-5" aria-hidden="true" />
                </DrawerClose>
              </div>
              <DrawerDescription className="sr-only">{reviewTitle(sheetReview)}</DrawerDescription>
              <div className="overflow-y-auto overscroll-contain px-5 pb-6 pt-3 text-[17px] leading-relaxed">
                <p>{sheetReview.transcript}</p>
              </div>
            </>
          )}
        </DrawerContent>
      </Drawer>

      <ul ref={quotesSwipe.track} onScroll={quotesSwipe.onScroll} className="mx-auto mt-10 flex max-w-[900px] snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] md:mt-14 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible [&::-webkit-scrollbar]:hidden">
        {reviews.quotes.map((q) => (
          <li key={q.name} data-review-quote className="flex w-full min-w-0 shrink-0 snap-start snap-always flex-col gap-4 rounded-card border border-border bg-background p-6 shadow-island md:p-7">
            <div className="flex items-center gap-3 border-b border-gold/50 pb-4">
              <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage font-display text-xl font-semibold text-primary">{q.name.charAt(0)}</span>
              <p className="font-display text-xl font-semibold text-primary">{q.name}</p>
              <span aria-hidden="true" className="ml-auto font-display text-5xl leading-[0.6] text-gold">“</span>
            </div>
            <blockquote className="text-[17px] leading-relaxed md:text-lg">{q.text}</blockquote>
          </li>
        ))}
      </ul>
      <MobileSwipeNavigation count={reviews.quotes.length} current={quotesSwipe.current} goTo={quotesSwipe.goTo} label={reviews.quoteDotsLabel} itemLabel={reviews.quoteDotLabel} />

      <div className="mt-8 flex flex-col items-center gap-4 text-center">
        <p className="text-[13px] text-muted-foreground">{reviews.consent}</p>
        <CtaButton href={reviews.cta.href} track={reviews.cta.track} variant="ghost" className="text-base sm:text-lg">
          {reviews.cta.label}
        </CtaButton>
      </div>
    </Island>
  );
}

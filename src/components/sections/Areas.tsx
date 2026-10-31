import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Compass, Heart, Leaf, Wallet } from "lucide-react";
import { areas, type AreaIcon } from "@/content/areas";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { Island } from "@/components/layout/Island";
import { isPresent } from "@/lib/present";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Icon keys used in the content file, resolved to components here. */
const icons: Record<AreaIcon, typeof Leaf> = {
  leaf: Leaf,
  wallet: Wallet,
  heart: Heart,
  compass: Compass,
};

/** Small uppercase label in front of every row. */
const rowLabel = "text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground";

/**
 * Two cards per row on desktop: a narrower measure reads better than four narrow columns.
 * Phones get one column with compact padding.
 */
export function Areas() {
  const items = areas.items.filter((item) => isPresent(item.title));
  const track = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);
  const goTo = (index: number) => {
    const el = track.current;
    const item = el?.children[index] as HTMLElement | undefined;
    if (el && item) el.scrollTo({ left: item.offsetLeft - el.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setCurrent(Math.max(0, Math.min(items.length - 1, Math.round(el.scrollLeft / (el.clientWidth + 16)))));
  };

  return (
    <Island id="areas" tone="sage" aria-labelledby={areas.titleId}>
      <SectionTitle id={areas.titleId} title={areas.title} accent={areas.accent} />

      {isPresent(areas.intro) && (
        <p className="mt-6 text-center text-muted-foreground md:mt-8">{areas.intro}</p>
      )}

      {items.length > 0 && (
        <ul ref={track} onScroll={onScroll} className="relative mt-7 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto [scrollbar-width:none] md:mt-12 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li
                key={item.title}
                className="flex w-full min-w-0 shrink-0 snap-start snap-always flex-col overflow-hidden rounded-card bg-background shadow-island"
              >
                <img
                  src={item.image.src}
                  srcSet={item.image.srcSet}
                  sizes="(min-width: 1280px) 560px, (min-width: 768px) calc((100vw - 116px) / 2), calc(100vw - 64px)"
                  width={item.image.width}
                  height={item.image.height}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="block aspect-video w-full object-cover md:aspect-[2/1]"
                />
                <div className="flex flex-1 flex-col gap-4 p-5 md:p-7">
                <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage text-primary"
                  >
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-2xl font-semibold leading-snug text-primary md:text-[26px]">
                    {item.title}
                  </h3>
                </div>

                <dl className="flex flex-col gap-3">
                  {isPresent(item.work) && (
                    <div>
                      <dt className={rowLabel}>{areas.labels.work}</dt>
                      <dd className="mt-1 text-muted-foreground">{item.work}</dd>
                    </div>
                  )}
                  {isPresent(item.goal) && (
                    <div>
                      <dt className={rowLabel}>{areas.labels.goal}</dt>
                      <dd className="mt-1 text-primary">{item.goal}</dd>
                    </div>
                  )}
                </dl>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {items.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1 md:hidden" role="group" aria-label={areas.navigation.label}>
          <Button variant="outline" size="icon" disabled={current === 0} onClick={() => goTo(current - 1)} aria-label={areas.navigation.previous} className="mr-auto size-11 rounded-full border-primary bg-background text-primary disabled:opacity-30">
            <ChevronLeft aria-hidden="true" />
          </Button>
          {items.map((item, index) => (
            <Button key={item.title} variant="ghost" size="icon" onClick={() => goTo(index)} aria-label={areas.navigation.item(index + 1)} aria-current={current === index ? "true" : undefined} className="size-11 rounded-full">
              <span aria-hidden="true" className={cn("h-2 rounded-full", current === index ? "w-5 bg-primary" : "w-2 bg-primary/75")} />
            </Button>
          ))}
          <Button variant="outline" size="icon" disabled={current === items.length - 1} onClick={() => goTo(current + 1)} aria-label={areas.navigation.next} className="ml-auto size-11 rounded-full border-primary bg-background text-primary disabled:opacity-30">
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      )}

    </Island>
  );
}

import { program, stageBadge } from "@/content/program";
import { CtaButton } from "@/components/brand/CtaButton";
import { FrequencyBadge } from "@/components/brand/FrequencyBadge";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { TelegramFallback } from "@/components/brand/TelegramFallback";
import { Island } from "@/components/layout/Island";
import { isPresent } from "@/lib/present";
import { cn } from "@/lib/utils";
import { useMobileSwipe } from "@/lib/useMobileSwipe";
import { MobileSwipeNavigation } from "@/components/brand/MobileSwipeNavigation";

/** Three stage columns on desktop, full-width swipe cards on phones; then how to join. */
export function Program() {
  const steps = program.join.steps;
  const swipe = useMobileSwipe<HTMLOListElement>(program.stages.length);
  return (
    <Island id="club" tone="light" aria-labelledby={program.titleId}>
      <SectionTitle id={program.titleId} title={program.title} accent={program.accent} />
      {isPresent(program.intro) && <p className="mt-6 text-center text-muted-foreground md:mt-8">{program.intro}</p>}

      <ol ref={swipe.track} onScroll={swipe.onScroll} className="relative mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] md:mt-14 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible [&::-webkit-scrollbar]:hidden">
        {/* Thin line with diamonds connecting the cards (desktop). */}
        <span aria-hidden="true" className="absolute left-[16%] right-[16%] top-0 hidden h-px bg-gold md:block" />
        {program.stages.map((s, i) => {
          const hl = "highlight" in s && s.highlight;
          return (
            <li key={s.title} className={cn("relative flex w-full min-w-0 shrink-0 snap-start snap-always flex-col gap-3 rounded-card p-5 md:p-6", hl ? "bg-sage" : "bg-surface")}>
              <span aria-hidden="true" className="absolute left-1/2 top-0 hidden size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gold md:block" />
              <p className="flex items-center gap-2 text-[15px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {hl && <span aria-hidden="true" className="size-2 rotate-45 bg-gold md:hidden" />}
                {s.label}
              </p>
              <h3 className="font-display text-2xl font-semibold leading-snug text-primary">{s.title}</h3>
              <ul className="flex flex-1 flex-col gap-2 leading-normal md:leading-[1.6]">
                {s.lines.map((l) => (
                  <li key={l} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rotate-45 bg-gold" />
                    {l}
                  </li>
                ))}
              </ul>
              <FrequencyBadge className="mt-2">{stageBadge(i)}</FrequencyBadge>
            </li>
          );
        })}
      </ol>
      <MobileSwipeNavigation count={program.stages.length} current={swipe.current} goTo={swipe.goTo} label={program.navigation.label} itemLabel={program.navigation.item} previous={program.navigation.previous} next={program.navigation.next} />

      {isPresent(program.recordings) && <p className="mx-auto mt-6 max-w-2xl text-balance text-center text-muted-foreground">{program.recordings}</p>}

      <div className="mt-12 md:mt-16">
        <h3 className="text-center font-display text-2xl font-semibold text-primary md:text-[28px]">{program.join.subtitle}</h3>
        <ol className="relative mt-7 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
          <span aria-hidden="true" className="absolute left-[16%] right-[16%] top-[5px] hidden h-px bg-gold md:block" />
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col md:items-center md:gap-3 md:text-center">
              <span aria-hidden="true" className="hidden h-3 items-center justify-center bg-background px-3 md:flex">
                <span className="size-2 rotate-45 bg-gold" />
              </span>
              <div className="flex flex-col gap-2">
                <h4 className="font-display text-xl font-semibold leading-snug text-primary md:text-[22px]">
                  <span className="lining-nums text-muted-foreground">{i + 1}.</span> {step.title}
                </h4>
                <p className="text-balance text-muted-foreground md:max-w-[28ch]">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-10 flex flex-col items-center gap-3 md:mt-12">
        <CtaButton href={program.cta.href} track={program.cta.track} block>{program.cta.label}</CtaButton>
        <TelegramFallback cta="vk-fallback-program" />
      </div>
    </Island>
  );
}

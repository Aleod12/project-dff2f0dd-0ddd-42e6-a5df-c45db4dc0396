import { ArrowRight } from "lucide-react";
import { intro } from "@/content/intro";
import { CtaButton } from "@/components/brand/CtaButton";
import { FrequencyBadge } from "@/components/brand/FrequencyBadge";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { Island } from "@/components/layout/Island";

/** «Знакомство с методом» (#intro): diagnostic as the main path, two quiet links, back to the club. */
export function Intro() {
  return (
    <Island id="intro" tone="surface" aria-labelledby={intro.titleId}>
      <SectionTitle id={intro.titleId} title={intro.title} accent={intro.accent} suffix={intro.titleSuffix} />
      <p className="mx-auto mt-6 max-w-2xl text-balance text-center text-muted-foreground md:mt-8">{intro.lead}</p>

      <div className="mx-auto mt-10 flex max-w-[880px] flex-col items-center gap-6 rounded-card bg-background p-6 text-center shadow-island md:p-10">
        <FrequencyBadge className="self-center">{intro.badge}</FrequencyBadge>
        <ol className="flex w-full flex-col items-center gap-3 md:flex-row md:justify-center md:gap-4">
          {intro.path.map((step, i) => (
            <li key={step} className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
              <span className="font-display text-xl font-semibold leading-snug text-primary md:text-[22px]">{step}</span>
              {i < intro.path.length - 1 && <ArrowRight aria-hidden="true" className="size-5 rotate-90 text-gold md:rotate-0" />}
            </li>
          ))}
        </ol>
        <CtaButton href={intro.main.href} track={intro.main.track}>{intro.main.label}</CtaButton>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-center md:flex-row md:flex-wrap md:justify-center md:gap-x-6">
        <p className="text-muted-foreground">{intro.moreLabel}</p>
        {intro.more.map((l) => (
          <a key={l.track} href={l.href} target="_blank" rel="noopener noreferrer" data-cta={l.track} className="tap-link font-medium text-primary underline underline-offset-4 hover:no-underline">
            {l.label}
          </a>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <p className="font-display text-2xl font-semibold text-primary">{intro.backLabel}</p>
        <CtaButton href={intro.join.href} track={intro.join.track} variant="outline">{intro.join.label}</CtaButton>
      </div>
    </Island>
  );
}

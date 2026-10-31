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
        <ol className="grid w-full divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {intro.path.map((step) => (
            <li key={step} className="flex flex-col items-center gap-3 py-5 first:pt-0 last:pb-0 md:px-6 md:py-0 md:first:pl-0 md:last:pr-0">
              <span aria-hidden="true" className="size-2 rotate-45 bg-gold" />
              <span className="font-display text-xl font-semibold leading-snug text-primary md:text-[21px]">{step}</span>
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

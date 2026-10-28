import { freeLadder } from "@/content/freeLadder";
import { Island } from "@/components/layout/Island";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { CtaButton } from "@/components/brand/CtaButton";
import { FrequencyBadge } from "@/components/brand/FrequencyBadge";
import { TelegramFallback } from "@/components/brand/TelegramFallback";
import { isPresent } from "@/lib/present";

/** Section 9 «Не готовы сразу? Начните бесплатно» (#free). */
export function FreeLadder() {
  const steps = freeLadder.steps;
  const last = steps.length - 1;
  return (
    <Island id="free" tone="surface" aria-labelledby={freeLadder.titleId}>
      <SectionTitle id={freeLadder.titleId} title={freeLadder.title} accent={freeLadder.accent} suffix={freeLadder.titleSuffix} />
      {isPresent(freeLadder.lead) && (
        <p className="mx-auto mt-4 max-w-xl text-balance text-center text-muted-foreground">{freeLadder.lead}</p>
      )}

      <ol className="relative mt-10 grid gap-8 md:mt-14 md:grid-cols-4 md:gap-x-6 md:gap-y-4">
        <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[5px] hidden h-px bg-gold md:block" />
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4 md:row-span-4 md:grid md:grid-rows-subgrid md:justify-items-center md:gap-y-4 md:text-center">
            <span aria-hidden="true" className="flex flex-col items-center pt-1 md:hidden">
              <span className="size-2 rotate-45 bg-gold" />
              {i !== last && <span className="-mb-8 mt-1 w-px flex-1 bg-gold/60" />}
            </span>
            <span aria-hidden="true" className="hidden h-3 items-center justify-center bg-surface px-3 md:flex">
              <span className="size-2 rotate-45 bg-gold" />
            </span>

            <div className="flex flex-1 flex-col items-start gap-3 md:contents">
              <div className="flex flex-col items-start gap-3 md:items-center md:self-end">
                {isPresent(step.badge) && <FrequencyBadge className="md:self-center">{step.badge}</FrequencyBadge>}
                <h3 className="font-display text-xl font-semibold leading-snug text-primary md:text-[22px]">{step.title}</h3>
              </div>
              <p className="text-base text-muted-foreground md:self-start">{step.text}</p>
              <CtaButton href={step.button.href} track={step.button.track} variant="outline" size="sm" className="mt-1 md:self-end">
                {step.button.label}
              </CtaButton>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex justify-center text-center">
        <TelegramFallback cta="vk-fallback-free" />
      </div>
    </Island>
  );
}

import { monthFormat } from "@/content/format";
import { CtaButton } from "@/components/brand/CtaButton";
import { FrequencyBadge } from "@/components/brand/FrequencyBadge";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { TelegramFallback } from "@/components/brand/TelegramFallback";
import { Island } from "@/components/layout/Island";
import { isPresent } from "@/lib/present";

/**
 * Format cards: two per row on desktop — four columns left single orphan words
 * in almost every card. On phones one column with compact padding.
 *
 * The steps sit on a thin gold line: horizontal across the row on desktop,
 * a vertical rail on the left on phones. Diamonds mask the line, so they read
 * as stops on the way, not as marks drawn over it.
 */
export function MonthFormat() {
  const cards = monthFormat.cards.filter((card) => isPresent(card.title));
  const steps = monthFormat.join.steps.filter((step) => isPresent(step.title));
  const lastStep = steps.length - 1;

  return (
    <Island id="format" tone="sage" aria-labelledby={monthFormat.titleId}>
      <SectionTitle
        id={monthFormat.titleId}
        title={monthFormat.title}
        accent={monthFormat.accent}
        suffix={monthFormat.titleSuffix}
      />

      {cards.length > 0 && (
        <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
          {cards.map((card) => (
            <li
              key={card.title}
              className="flex flex-col gap-3 rounded-card bg-background p-5 md:p-6"
            >
              {isPresent(card.badge) && <FrequencyBadge>{card.badge}</FrequencyBadge>}
              <h3 className="font-display text-2xl font-semibold leading-snug text-primary">
                {card.title}
              </h3>
              {isPresent(card.text) && (
                <p className="text-muted-foreground">{card.text}</p>
              )}
            </li>
          ))}
        </ul>
      )}

      {isPresent(monthFormat.join.subtitle) && (
        <div className="mt-12 md:mt-16">
          <h3 className="text-center font-display text-2xl font-semibold text-primary md:text-[28px]">
            {monthFormat.join.subtitle}
          </h3>

          {steps.length > 0 && (
            <ol className="relative mt-8 grid gap-6 md:mt-12 md:grid-cols-3 md:gap-6">
              {/* Desktop connector, behind the diamonds. */}
              <span
                aria-hidden="true"
                className="absolute left-[16%] right-[16%] top-[5px] hidden h-px bg-gold md:block"
              />

              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4 md:flex-col md:items-center md:gap-3 md:text-center">
                  {/* Phone rail: diamond, then the line down to the next one. */}
                  <span aria-hidden="true" className="flex flex-col items-center pt-1 md:hidden">
                    <span className="size-2 rotate-45 bg-gold" />
                    {i !== lastStep && <span className="-mb-6 mt-1 w-px flex-1 bg-gold/60" />}
                  </span>

                  {/* Desktop diamond, sitting on the connector line. */}
                  <span
                    aria-hidden="true"
                    className="hidden h-3 items-center justify-center bg-sage px-3 md:flex"
                  >
                    <span className="size-2 rotate-45 bg-gold" />
                  </span>

                  <div className="flex flex-col gap-2">
                    <h4 className="font-display text-xl font-semibold leading-snug text-primary md:text-[22px]">
                      <span className="lining-nums text-muted-foreground">{i + 1}.</span> {step.title}
                    </h4>
                    {isPresent(step.text) && (
                      <p className="text-balance text-muted-foreground md:max-w-[26ch]">{step.text}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      <div className="mt-10 flex flex-col items-center gap-3 md:mt-12">
        <CtaButton href={monthFormat.cta.href} track={monthFormat.cta.track} block>
          {monthFormat.cta.label}
        </CtaButton>
        <TelegramFallback cta="vk-fallback-format" />
      </div>
    </Island>
  );
}

import { Link } from "@tanstack/react-router";
import { pricing } from "@/content/pricing";
import { payments } from "@/content/payments";
import { Island } from "@/components/layout/Island";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { CtaButton } from "@/components/brand/CtaButton";
import { TelegramFallback } from "@/components/brand/TelegramFallback";
import { isPresent } from "@/lib/present";

/** Section 8 «Стоимость» (#price). */
export function Price() {
  return (
    <Island id="price" tone="plain" aria-labelledby={pricing.titleId}>
      <SectionTitle id={pricing.titleId} title={pricing.title} accent={pricing.accent} />

      <div className="mx-auto mt-10 flex max-w-[560px] flex-col items-center gap-6 rounded-[24px] bg-card px-5 py-8 text-center shadow-island sm:rounded-[32px] sm:px-10 sm:py-12">
        <div className="flex flex-col gap-1">
          <p className="font-display text-2xl font-semibold text-primary sm:text-3xl">{pricing.clubName}</p>
          <p className="text-muted-foreground">{pricing.period}</p>
          {isPresent(payments.streamStartDate) && (
            <p className="mt-1 text-sm font-medium">
              {pricing.startLabel} {payments.streamStartDate}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-display text-6xl font-semibold leading-none text-primary [font-variant-numeric:lining-nums] sm:text-7xl">
            {pricing.priceRub}
          </p>
          <p className="text-muted-foreground">{pricing.priceEurNote}</p>
        </div>

        <ul className="flex w-full flex-col gap-3 border-y border-border/70 py-6 text-left">
          {pricing.included.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rotate-45 bg-gold" />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex w-full flex-col gap-3">
          <CtaButton href={pricing.payRub.href} track={pricing.payRub.track} className="w-full">
            {pricing.payRub.label}
          </CtaButton>
          <CtaButton href={pricing.payEur.href} track={pricing.payEur.track} variant="outline" className="w-full">
            {pricing.payEur.label}
          </CtaButton>
        </div>

        <p className="text-sm text-muted-foreground">
          {pricing.offerNote.before}
          <Link to={pricing.offerNote.to} search={{ from: pricing.offerNote.from }} className="text-primary tap-link underline underline-offset-4 hover:no-underline">
            {pricing.offerNote.linkLabel}
          </Link>
        </p>
        {isPresent(payments.vatNote) && <p className="text-sm text-muted-foreground">{payments.vatNote}</p>}
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-center">
        <p>
          {pricing.questions.before}{" "}
          <a href={pricing.questions.href} target="_blank" rel="noopener noreferrer" data-cta={pricing.questions.track} className="font-medium text-primary tap-link underline underline-offset-4 hover:no-underline">
            {pricing.questions.linkLabel}
          </a>
        </p>
        <TelegramFallback cta="vk-fallback-price" />
      </div>
    </Island>
  );
}

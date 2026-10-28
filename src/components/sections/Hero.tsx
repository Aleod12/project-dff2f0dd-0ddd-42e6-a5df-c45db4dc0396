import { hero } from "@/content/hero";
import { isPresent } from "@/lib/present";
import { CtaButton } from "@/components/brand/CtaButton";
import { DiamondDivider } from "@/components/brand/DiamondDivider";
import { TelegramFallback } from "@/components/brand/TelegramFallback";
import { Container } from "@/components/layout/Container";
import photo860 from "@/assets/hero/sergey-hero-860.webp.asset.json";
import photo640 from "@/assets/hero/sergey-hero-640.webp.asset.json";
import photo430 from "@/assets/hero/sergey-hero-430.webp.asset.json";
import oliveLeft from "@/assets/hero/olive-left.webp.asset.json";
import oliveRight from "@/assets/hero/olive-right.webp.asset.json";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden pb-6 pt-2 md:pb-12 md:pt-6">
      <Container className="grid items-center gap-5 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
        {/* Photo in arch */}
        <div className="relative mx-auto w-full max-w-[460px] md:order-2">
          <img src={oliveLeft.url} alt="" aria-hidden="true" loading="lazy" width={560} height={1440}
            className="pointer-events-none absolute -left-16 top-0 h-full w-auto olive-fade opacity-70 mix-blend-multiply md:-left-28" />
          <img src={oliveRight.url} alt="" aria-hidden="true" loading="lazy" width={540} height={1440}
            className="pointer-events-none absolute -right-16 top-0 h-full w-auto olive-fade opacity-70 mix-blend-multiply md:-right-28" />
          <div className="relative mx-auto h-[32svh] max-h-[296px] w-[min(78%,260px)] overflow-hidden rounded-t-full bg-sage shadow-photo md:h-auto md:max-h-none md:w-full md:aspect-[43/52]">
            <img
              src={photo860.url}
              srcSet={`${photo430.url} 430w, ${photo640.url} 640w, ${photo860.url} 860w`}
              sizes="(min-width: 768px) 460px, 300px"
              width={860}
              height={940}
              alt={hero.photoAlt}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-x-0 top-[6%] h-auto w-full md:top-auto md:bottom-0"
            />
          </div>
        </div>

        {/* Text */}
        <div className="relative flex flex-col items-center gap-3 text-center md:order-1 md:items-start md:gap-5 md:text-left">
          <p className="text-eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className="flex flex-col gap-2 md:gap-3">
            <span className="text-[1.95rem] leading-[1.05] sm:text-h1">
              {hero.titleLead} <em className="italic">{hero.titleAccent}</em>
            </span>
            <span className="text-name text-base text-foreground sm:text-xl">{hero.titleName}</span>
          </h1>
          <div className="flex flex-col items-center gap-2 md:items-start">
            <DiamondDivider />
            <p className="font-display text-xl italic text-primary">{hero.signature}</p>
          </div>
          <p className="max-w-xl text-base font-medium md:text-xl">{hero.lead}</p>
          {isPresent(hero.sub) && <p className="hidden max-w-xl text-muted-foreground md:block">{hero.sub}</p>}
          <ul className="flex flex-col items-center gap-1.5 text-sm font-medium md:flex-row md:flex-wrap md:gap-x-6">
            {hero.facts.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-1 flex w-full flex-col gap-3 sm:w-auto md:flex-row md:flex-wrap">
            <CtaButton href={hero.primary.href} track={hero.primary.track} className="w-full sm:w-auto">{hero.primary.label}</CtaButton>
            <CtaButton href={hero.secondary.href} track={hero.secondary.track} variant="outline" className="w-full sm:w-auto">{hero.secondary.label}</CtaButton>
          </div>
          <TelegramFallback />
        </div>
      </Container>
    </section>
  );
}

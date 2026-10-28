import { hero } from "@/content/hero";
import { isPresent } from "@/lib/present";
import { CtaButton } from "@/components/brand/CtaButton";
import { TelegramFallback } from "@/components/brand/TelegramFallback";
import { Container } from "@/components/layout/Container";
import photo760 from "@/assets/hero/sergey-hero-circle-760.webp.asset.json";
import photo570 from "@/assets/hero/sergey-hero-circle-570.webp.asset.json";
import photo380 from "@/assets/hero/sergey-hero-circle-380.webp.asset.json";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden pb-6 pt-2 md:pb-12 md:pt-6">
      <Container className="grid items-center gap-5 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
        {/* Ready-made composition (circle + ring + photo on the page background colour): shown as is, never cropped. */}
        <div className="flex justify-center md:order-2 md:justify-end">
          <img
            src={photo760.url}
            srcSet={`${photo380.url} 380w, ${photo570.url} 570w, ${photo760.url} 760w`}
            sizes="(min-width: 768px) 520px, 300px"
            width={760}
            height={750}
            alt={hero.photoAlt}
            fetchPriority="high"
            decoding="async"
            className="block aspect-[760/750] h-auto w-[min(64vw,240px)] object-contain md:w-full md:max-w-[520px]"
          />
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
          <p className="-mt-1 font-display text-xl italic text-primary">{hero.signature}</p>
          <p className="max-w-xl text-base font-medium md:text-xl">{hero.lead}</p>
          {isPresent(hero.sub) && <p className="max-w-xl text-muted-foreground">{hero.sub}</p>}
          <ul className="flex flex-col items-center gap-2 text-base font-medium md:items-start">
            {hero.facts.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 rotate-45 bg-gold" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-1 flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-stretch">
            <CtaButton href={hero.primary.href} track={hero.primary.track} className="w-full md:w-auto">{hero.primary.label}</CtaButton>
            <CtaButton href={hero.secondary.href} track={hero.secondary.track} variant="outline" className="w-full md:w-auto">{hero.secondary.label}</CtaButton>
          </div>
          <TelegramFallback cta="vk-fallback-hero" className="text-[15px]" />
        </div>
      </Container>
    </section>
  );
}

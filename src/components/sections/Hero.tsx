import { CalendarDays, Headphones, UserRound, MessagesSquare } from "lucide-react";
import { hero } from "@/content/hero";
import { isPresent } from "@/lib/present";
import { CtaButton } from "@/components/brand/CtaButton";
import { TelegramFallback } from "@/components/brand/TelegramFallback";
import { Container } from "@/components/layout/Container";
import photo760 from "@/assets/hero/sergey-hero-circle-760.webp.asset.json";
import photo570 from "@/assets/hero/sergey-hero-circle-570.webp.asset.json";
import photo380 from "@/assets/hero/sergey-hero-circle-380.webp.asset.json";

const icons = { calendar: CalendarDays, headphones: Headphones, user: UserRound, messages: MessagesSquare };

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative overflow-hidden pb-6 pt-0 md:pb-12 md:pt-6">
      <Container className="grid items-center gap-3 md:grid-cols-[1.05fr_0.95fr] md:gap-12">
        {/* Ready-made composition (circle + ring + photo on the page background colour): shown as is, never cropped. */}
        <div className="relative flex flex-col items-center md:order-2 md:items-end">
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
          <p className="hero-motto font-signature text-[26px] leading-tight tracking-normal text-primary md:absolute md:-bottom-16 md:right-3 md:-rotate-6 md:text-[32px]">{hero.signature}</p>
        </div>

        {/* Text */}
        <div className="relative flex flex-col items-center gap-2 text-center md:order-1 md:items-start md:gap-5 md:text-left">
          <p className="text-eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className="flex flex-col gap-1 md:gap-3">
            <span className="text-[1.95rem] leading-[1.05] sm:text-h1">
              {hero.titleLead} <em className="italic">{hero.titleAccent}</em>
            </span>
            <span className="text-name text-base text-foreground sm:text-xl">{hero.titleName}</span>
          </h1>
          <p className="max-w-xl text-base font-medium md:text-xl">{hero.lead}</p>
          {isPresent(hero.subShort) && <p className="max-w-xl text-muted-foreground md:hidden">{hero.subShort}</p>}
          {isPresent(hero.sub) && <p className="hidden max-w-xl text-muted-foreground md:block">{hero.sub}</p>}
          <div className="flex w-full md:mt-1 flex-col gap-2 md:gap-3 md:w-auto md:flex-row md:items-stretch">
            <CtaButton href={hero.primary.href} track={hero.primary.track} className="w-full md:w-auto">{hero.primary.label}</CtaButton>
            <CtaButton href={hero.secondary.href} track={hero.secondary.track} variant="outline" className="w-full md:w-auto">{hero.secondary.label}</CtaButton>
          </div>
          <ul className="grid w-full grid-cols-2 gap-x-3 gap-y-3 md:grid-cols-4 md:gap-0">
            {hero.facts.map((fact) => {
              const Icon = icons[fact.icon];
              return (
                <li key={fact.icon} className="flex min-w-0 items-center justify-center gap-2 md:flex-col md:items-start md:justify-start md:px-3 md:first:pl-0 md:last:pr-0 md:[&+li]:border-l md:[&+li]:border-border">
                  <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sage text-primary">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                  <span className="max-w-[116px] text-left font-sans text-[15px] leading-snug">{fact.label}</span>
                </li>
              );
            })}
          </ul>
          <TelegramFallback cta="vk-fallback-hero" className="text-[15px]" />
        </div>
      </Container>
    </section>
  );
}

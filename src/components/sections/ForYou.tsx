import { pains } from "@/content/pains";
import { CtaButton } from "@/components/brand/CtaButton";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { Island } from "@/components/layout/Island";
import { cn } from "@/lib/utils";
import portrait160 from "@/assets/portrait/sergey-portrait-160.webp.asset.json";
import portrait240 from "@/assets/portrait/sergey-portrait-240.webp.asset.json";

/** One card per row on phones, two on tablets, three on desktop. The last row stays centered. */
const cardWidth = "w-full sm:w-[calc(50%-0.65rem)] lg:w-[calc(33.333%-0.9rem)]";

export function ForYou() {
  return (
    <Island id="for-you" tone="surface" aria-labelledby={pains.titleId}>
      <SectionTitle id={pains.titleId} title={pains.title} accent={pains.accent} suffix={pains.titleSuffix} />

      <ul className="mt-8 flex flex-wrap justify-center gap-5 md:mt-12">
        {pains.items.map((item, i) => (
          <li
            key={item.title}
            className={cn("flex flex-col gap-3 rounded-card bg-background p-6 shadow-island", cardWidth)}
          >
            <span aria-hidden="true" className="font-display text-4xl leading-none text-primary/40 sm:text-5xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-semibold sm:text-2xl">{item.title}</h3>
            <p className="text-muted-foreground">{item.text}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:gap-5 sm:text-left md:mt-12">
        <img
          src={portrait240.url}
          srcSet={`${portrait160.url} 160w, ${portrait240.url} 240w`}
          sizes="80px"
          width={240}
          height={240}
          alt={pains.hostNote.photoAlt}
          loading="lazy"
          decoding="async"
          className="size-16 shrink-0 rounded-full object-cover shadow-island sm:size-20"
        />
        <div className="flex flex-col gap-2">
          <p className="font-display text-lg italic sm:text-xl">{pains.hostNote.text}</p>
          <p className="text-sm font-semibold text-muted-foreground">{pains.hostNote.sign}</p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <CtaButton href={pains.cta.href} track={pains.cta.track} variant="ghost" className="text-base sm:text-lg">
          {pains.cta.label}
        </CtaButton>
      </div>
    </Island>
  );
}

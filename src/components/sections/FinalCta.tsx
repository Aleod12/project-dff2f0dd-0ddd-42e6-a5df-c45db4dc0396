import { finalCta } from "@/content/finalCta";
import { CtaButton } from "@/components/brand/CtaButton";
import { DiamondDivider } from "@/components/brand/DiamondDivider";
import { Container } from "@/components/layout/Container";
import portrait160 from "@/assets/portrait/sergey-portrait-160.webp.asset.json";
import portrait240 from "@/assets/portrait/sergey-portrait-240.webp.asset.json";

const focusLight = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground";

/** The only dark island: calm personal closing with one clear next step. */
export function FinalCta() {
  const c = finalCta;
  return (
    <section id="start" className="py-3 md:py-4" aria-labelledby={c.titleId}>
      <Container>
        <div className="rounded-island bg-primary px-5 py-20 text-primary-foreground sm:px-10 md:py-28">
          <div className="mx-auto flex max-w-[720px] flex-col items-center gap-6 text-center">
            <img
              src={portrait240.url}
              srcSet={`${portrait160.url} 160w, ${portrait240.url} 240w`}
              sizes="96px"
              width={240}
              height={240}
              alt={c.photoAlt}
              loading="lazy"
              decoding="async"
              className="size-24 rounded-full object-cover ring-2 ring-gold ring-offset-4 ring-offset-primary"
            />
            <div className="flex flex-col items-center gap-4">
              <h2 id={c.titleId} className="text-h2 text-balance !text-primary-foreground">
                {c.title} <em className="italic">{c.accent}</em>
              </h2>
              <DiamondDivider />
            </div>
            <p className="text-lg leading-relaxed">{c.text}</p>
            <div className="flex flex-col items-center gap-1">
              <p className="font-display text-xl italic">{c.sign}</p>
              <p className="font-display text-base italic">{c.motto}</p>
            </div>
            <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
              <CtaButton
                href={c.join.href}
                track={c.join.track}
                className={`w-full bg-primary-foreground text-primary shadow-none hover:bg-sage sm:w-auto ${focusLight}`}
              >
                {c.join.label}
              </CtaButton>
              <CtaButton
                href={c.test.href}
                track={c.test.track}
                variant="outline"
                className={`w-full border-primary-foreground text-primary-foreground hover:bg-primary-hover sm:w-auto ${focusLight}`}
              >
                {c.test.label}
              </CtaButton>
            </div>
            <p className="text-sm">
              {c.fallback.before}{" "}
              <a
                href={c.fallback.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={c.fallback.track}
                className={`font-medium underline underline-offset-4 hover:no-underline ${focusLight}`}
              >
                {c.fallback.label}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

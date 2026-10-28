import { faq } from "@/content/faq";
import { Island } from "@/components/layout/Island";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { TelegramFallback } from "@/components/brand/TelegramFallback";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/** Section 10 «Вопросы и ответы» (#faq). */
export function Faq() {
  return (
    <Island id="faq" tone="plain" aria-labelledby={faq.titleId}>
      <SectionTitle id={faq.titleId} title={faq.title} accent={faq.accent} />
      <Accordion type="single" collapsible className="mx-auto mt-10 max-w-[760px]">
        {faq.items.map((item, i) => (
          <AccordionItem key={item.q} value={`q${i}`} className="border-border/70">
            <AccordionTrigger className="py-5 text-left font-display text-xl font-semibold leading-snug text-primary hover:no-underline md:text-[22px]">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-base leading-relaxed">
              {item.a.map((p, j) =>
                p.href ? (
                  <a key={j} href={p.href} {...(p.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-primary underline underline-offset-4 hover:no-underline">{p.text}</a>
                ) : (
                  <span key={j}>{p.text}</span>
                ),
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-10 flex flex-col items-center gap-2 text-center">
        <p>
          {faq.more.before}{" "}
          <a href={faq.more.href} target="_blank" rel="noopener noreferrer" data-cta={faq.more.track} className="font-medium text-primary underline underline-offset-4 hover:no-underline">
            {faq.more.linkLabel}
          </a>
        </p>
        <TelegramFallback cta="vk-fallback-faq" />
      </div>
    </Island>
  );
}

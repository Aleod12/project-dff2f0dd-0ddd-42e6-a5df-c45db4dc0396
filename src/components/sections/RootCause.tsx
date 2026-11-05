import { rootCause } from "@/content/rootCause";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { Island } from "@/components/layout/Island";
import { cn } from "@/lib/utils";

const nodePos = [
  "lg:left-1/2 lg:top-0",
  "lg:left-full lg:top-1/2",
  "lg:left-1/2 lg:top-full",
  "lg:left-0 lg:top-1/2",
];
const labelPos = [
  "lg:bottom-full lg:left-1/2 lg:mb-5 lg:w-[260%] lg:max-w-[260px] lg:-translate-x-1/2 lg:text-center",
  "lg:left-full lg:top-1/2 lg:ml-4 lg:w-[calc(106.25%-16px)] lg:-translate-y-1/2 lg:text-left",
  "lg:top-full lg:left-1/2 lg:mt-5 lg:w-[280%] lg:max-w-[280px] lg:-translate-x-1/2 lg:text-center",
  "lg:right-full lg:top-1/2 lg:mr-4 lg:w-[calc(106.25%-16px)] lg:-translate-y-1/2 lg:text-right",
];

function GoldDivider() {
  return (
    <span aria-hidden="true" className="flex items-center justify-center gap-3">
      <span className="h-px w-10 bg-gold/70" />
      <span className="size-2 rotate-45 bg-gold" />
      <span className="h-px w-10 bg-gold/70" />
    </span>
  );
}

export function RootCause() {
  return (
    <Island id="why" tone="sage" aria-labelledby={rootCause.titleId}>
      <SectionTitle id={rootCause.titleId} title={rootCause.title} accent={rootCause.accent} suffix={rootCause.titleSuffix} />

      <div className="mt-10 grid gap-10 md:mt-14 md:gap-14 lg:grid-cols-[480px_1fr] lg:gap-x-12 lg:gap-y-0">
        <div className="flex flex-col gap-5">
          {rootCause.thesis.map((line, i) => (
            <p key={line} className={cn(i === rootCause.emphasizedIndex ? "text-lg font-medium text-primary md:text-xl" : "text-muted-foreground")}>
              {line}
            </p>
          ))}
        </div>

        <div className="flex min-w-0 flex-col items-center lg:row-span-2">
          <div data-loop className="relative w-full max-w-[520px] pl-7 lg:h-[440px] lg:pl-0">
            <span aria-hidden="true" className="absolute bottom-5 left-1 top-[11px] w-[30px] rounded-bl-[20px] border-b border-l border-primary/30 lg:hidden" />
            <span aria-hidden="true" className="absolute left-1 top-[11px] h-px w-[22px] bg-primary/30 lg:hidden" />
            <svg aria-hidden="true" viewBox="0 0 10 10" className="absolute left-6 top-[5px] size-3 lg:hidden">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-primary)" fillOpacity="0.7" />
            </svg>
            <div className="lg:absolute lg:left-1/2 lg:top-1/2 lg:aspect-square lg:w-[32%] lg:-translate-x-1/2 lg:-translate-y-1/2">
              <svg data-loop-circle aria-hidden="true" viewBox="0 0 200 200" className="absolute inset-0 hidden size-full overflow-visible lg:block" fill="none" stroke="var(--color-primary)" strokeOpacity="0.45" strokeWidth="1.5" strokeLinecap="round">
                <defs>
                  <marker id="rc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-primary)" fillOpacity="0.6" stroke="none" />
                  </marker>
                </defs>
                <path d="M 115.6 1.2 A 100 100 0 0 1 198.8 84.4" markerEnd="url(#rc-arrow)" />
                <path d="M 198.8 115.6 A 100 100 0 0 1 115.6 198.8" markerEnd="url(#rc-arrow)" />
                <path d="M 84.4 198.8 A 100 100 0 0 1 1.2 115.6" markerEnd="url(#rc-arrow)" />
                <path d="M 1.2 84.4 A 100 100 0 0 1 84.4 1.2" markerEnd="url(#rc-arrow)" />
              </svg>
              <ol className="relative flex flex-col gap-6 pb-6 lg:static lg:gap-0 lg:pb-0">
                {rootCause.nodes.map((node, i) => (
                  <li key={node.title} className={cn("relative flex gap-4 lg:static lg:block", nodePos[i])}>
                    {i < rootCause.nodes.length - 1 && <span aria-hidden="true" className="absolute left-[5px] top-6 h-[calc(100%+1.5rem)] w-px bg-primary/25 lg:hidden" />}
                    <span aria-hidden="true" className={cn("mt-[6px] size-[11px] shrink-0 rotate-45 bg-gold lg:absolute lg:mt-0 lg:-translate-x-1/2 lg:-translate-y-1/2", nodePos[i])} />
                    <div data-loop-label className={cn("flex flex-col gap-1.5 lg:absolute", labelPos[i])}>
                      <h3 className="text-lg font-semibold">{node.title}</h3>
                      <p className="text-[15px] leading-snug text-muted-foreground">{node.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 lg:items-start lg:justify-end lg:pb-2">
          <GoldDivider />
          <p className="max-w-[520px] text-balance text-center font-display text-lg italic text-primary md:text-xl lg:text-left">{rootCause.conclusion}</p>
        </div>
      </div>

      <div data-session className="mt-7 md:mt-10">
        <GoldDivider />
        <h3 className="mt-4 text-center font-display text-[28px] leading-tight md:text-[32px]">
          {rootCause.session.title} <em>{rootCause.session.accent}</em>{rootCause.session.suffix}
        </h3>
        <p className="mt-2 text-center text-[15px] leading-snug text-muted-foreground">{rootCause.session.intro}</p>
        <ol className="mt-6 grid gap-4 md:grid-cols-3 md:gap-x-5 md:gap-y-6 lg:grid-cols-6 lg:gap-x-4">
          {rootCause.session.steps.map((step, i) => (
            <li key={step.title} className="relative min-w-0 pl-7 md:pl-0 md:text-center">
              {i < rootCause.session.steps.length - 1 && <span aria-hidden="true" className="absolute bottom-[-16px] left-[5px] top-5 w-px bg-primary/30 md:hidden" />}
              <span className="text-[15px] leading-none text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <span aria-hidden="true" className="absolute left-0 top-[5px] size-[11px] rotate-45 bg-gold md:relative md:mx-auto md:my-3 md:block md:top-0" />
              {i < rootCause.session.steps.length - 1 && <span aria-hidden="true" className="absolute left-1/2 top-[34px] hidden w-[calc(100%+1rem)] border-t border-primary/30 lg:block" />}
              <h4 className="mt-1 text-[15px] font-semibold leading-snug md:mt-0">{step.title}</h4>
              <p className="mt-1 text-[15px] leading-[1.25] text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </Island>
  );
}

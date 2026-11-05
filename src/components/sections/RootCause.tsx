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
  "lg:bottom-full lg:left-1/2 lg:mb-6 lg:w-[260px] lg:-translate-x-1/2 lg:text-center",
  "lg:left-full lg:top-1/2 lg:ml-4 lg:w-[170px] lg:-translate-y-1/2 lg:text-left",
  "lg:top-full lg:left-1/2 lg:mt-6 lg:w-[260px] lg:-translate-x-1/2 lg:text-center",
  "lg:right-full lg:top-1/2 lg:mr-4 lg:w-[170px] lg:-translate-y-1/2 lg:text-right",
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
    <Island id="why" tone="sage" className="xl:px-4" aria-labelledby={rootCause.titleId}>
      <SectionTitle id={rootCause.titleId} title={rootCause.title} accent={rootCause.accent} suffix={rootCause.titleSuffix} />

      <div className="mt-10 grid gap-10 md:mt-14 md:gap-14 xl:grid-cols-[440px_1fr] xl:gap-x-0 xl:gap-y-0">
        <div className="flex flex-col gap-5 lg:mx-auto lg:max-w-[720px] xl:mx-0 xl:pr-6">
          {rootCause.thesis.map((line, i) => (
            <p key={line} className={cn(i === rootCause.emphasizedIndex ? "text-lg font-medium text-primary md:text-xl" : "text-muted-foreground")}>
              {line}
            </p>
          ))}
        </div>

        <div className="flex min-w-0 flex-col items-center xl:row-span-2">
          <div data-loop className="relative w-full max-w-[720px] pl-7 lg:h-[480px] lg:pl-0">
            <span aria-hidden="true" className="absolute bottom-5 left-1 top-[11px] w-[30px] rounded-bl-[20px] border-b border-l border-primary/30 lg:hidden" />
            <span aria-hidden="true" className="absolute left-1 top-[11px] h-px w-[22px] bg-primary/30 lg:hidden" />
            <svg aria-hidden="true" viewBox="0 0 10 10" className="absolute left-6 top-[5px] size-3 lg:hidden">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-primary)" fillOpacity="0.7" />
            </svg>
            <div className="lg:absolute lg:left-1/2 lg:top-1/2 lg:aspect-square lg:w-[260px] xl:w-[300px] lg:-translate-x-1/2 lg:-translate-y-1/2">
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
                      <h3 className={cn("text-lg font-semibold", (i === 1 || i === 3) && "lg:whitespace-nowrap")}>{node.title}</h3>
                      <p className="text-[15px] leading-snug text-muted-foreground">{node.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 xl:items-start xl:justify-end xl:pb-2 xl:pr-6">
          <GoldDivider />
          <p className="max-w-[520px] text-balance text-center font-display text-lg italic text-primary md:text-xl xl:text-left">{rootCause.conclusion}</p>
        </div>
      </div>

    </Island>
  );
}

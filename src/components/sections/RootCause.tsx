import { rootCause } from "@/content/rootCause";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { Island } from "@/components/layout/Island";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";

const tilePos = ["lg:col-start-1 lg:row-start-1", "lg:col-start-2 lg:row-start-1", "lg:col-start-2 lg:row-start-2", "lg:col-start-1 lg:row-start-2"];
const arrowPos = ["left-full top-1/2 -translate-y-1/2", "left-1/2 top-full -translate-x-1/2 rotate-90", "right-full top-1/2 -translate-y-1/2 rotate-180", "bottom-full left-1/2 -translate-x-1/2 -rotate-90"];

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

      <div className="mt-10 grid gap-10 md:mt-14 md:gap-14 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-center lg:gap-x-14 lg:gap-y-0">
        <div className="contents lg:order-1 lg:flex lg:min-w-0 lg:flex-col lg:gap-6">
        <div className="order-1 flex flex-col gap-5 lg:gap-4 lg:leading-normal">
          {rootCause.thesis.map((line, i) => (
            <p key={line} className={cn(i === rootCause.emphasizedIndex ? "text-lg font-medium text-primary md:text-xl lg:leading-normal" : "text-muted-foreground")}>
              {line}
            </p>
          ))}
        </div>
        <div className="order-3 flex flex-col items-center gap-5 lg:order-2 lg:items-start">
          <GoldDivider />
          <p className="max-w-[520px] text-balance text-center font-display text-lg italic text-primary md:text-xl lg:text-left lg:leading-normal">{rootCause.conclusion}</p>
        </div>
        </div>

        <div className="order-2 flex min-w-0 flex-col items-center">
          <div data-loop className="relative w-full max-w-[720px] pl-7 lg:pl-0">
            <span aria-hidden="true" className="absolute bottom-5 left-1 top-[11px] w-[30px] rounded-bl-[20px] border-b border-l border-primary/30 lg:hidden" />
            <span aria-hidden="true" className="absolute left-1 top-[11px] h-px w-[22px] bg-primary/30 lg:hidden" />
            <svg aria-hidden="true" viewBox="0 0 10 10" className="absolute left-6 top-[5px] size-3 lg:hidden">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-primary)" fillOpacity="0.7" />
            </svg>
            <div className="relative">
              <ol className="relative flex flex-col gap-6 pb-6 lg:grid lg:grid-cols-2 lg:auto-rows-fr lg:gap-10 lg:pb-0">
                {rootCause.nodes.map((node, i) => (
                  <li key={node.title} data-loop-tile={i + 1} className={cn("relative flex gap-4 lg:rounded-card lg:bg-background/70 lg:p-5 lg:gap-2.5", tilePos[i])}>
                    {i < rootCause.nodes.length - 1 && <span aria-hidden="true" className="absolute left-[5px] top-6 h-[calc(100%+1.5rem)] w-px bg-primary/25 lg:hidden" />}
                    <span aria-hidden="true" className="mt-[6px] size-[11px] shrink-0 rotate-45 bg-gold lg:size-[9px]" />
                    <div data-loop-label className="min-w-0 flex flex-col gap-1.5">
                      <h3 className="text-lg font-semibold lg:font-sans lg:text-[17px] lg:leading-snug">{node.title}</h3>
                      <p className="text-[15px] leading-snug text-muted-foreground">{node.text}</p>
                    </div>
                    <svg aria-hidden="true" viewBox="0 0 40 40" className={cn("absolute hidden size-10 overflow-visible lg:block", arrowPos[i])}>
                      <path d="M 2 20 H 37" fill="none" stroke="var(--color-primary)" strokeOpacity="0.45" strokeWidth="1.5" />
                      <path d="M 31 16 L 38 20 L 31 24 z" fill="var(--color-primary)" fillOpacity="0.6" />
                    </svg>
                  </li>
                ))}
              </ol>
              <span aria-hidden="true" className="absolute left-1/2 top-1/2 hidden size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-sage lg:flex">
                <RefreshCw className="size-[18px] text-primary" strokeWidth={1.5} />
              </span>
            </div>
          </div>
        </div>

      </div>

    </Island>
  );
}

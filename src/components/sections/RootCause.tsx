import { rootCause } from "@/content/rootCause";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { Island } from "@/components/layout/Island";
import { cn } from "@/lib/utils";

/**
 * Desktop loop diagram: the wrapper keeps the 520×420 ratio, so percentage positions of the
 * HTML nodes land exactly on the SVG coordinates (viewBox 0 0 520 420).
 * Node 1 top center with its label ABOVE the diamond, node 2 bottom right, node 3 bottom left —
 * the arrows run 1 → 2 → 3 → 1. All labels sit outside the loop.
 */
const nodePos = [
  "lg:left-[50%] lg:top-[26%] lg:w-[30%]",
  "lg:left-[77%] lg:top-[66%] lg:w-[36%]",
  "lg:left-[23%] lg:top-[66%] lg:w-[36%]",
];

export function RootCause() {
  const last = rootCause.nodes.length - 1;

  return (
    <Island tone="sage" aria-labelledby={rootCause.titleId}>
      <SectionTitle
        id={rootCause.titleId}
        title={rootCause.title}
        accent={rootCause.accent}
        suffix={rootCause.titleSuffix}
      />

      <div className="mt-10 flex flex-col gap-10 md:mt-14 md:gap-14 lg:flex-row lg:items-center lg:gap-12">
        {/* Thesis */}
        <div className="flex flex-col gap-5 lg:max-w-[440px]">
          {rootCause.thesis.map((line, i) => (
            <p
              key={line}
              className={cn(
                i === rootCause.emphasizedIndex ? "text-lg font-medium text-primary md:text-xl" : "text-muted-foreground",
              )}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Closed loop */}
        <div className="flex w-full flex-col items-center lg:flex-1">
          <div className="relative w-full max-w-[520px] pl-7 lg:aspect-[520/420] lg:pl-0">
            {/* Phones only: the return path from the last diamond back to the first one. */}
            <span
              aria-hidden="true"
              className="absolute bottom-[87px] left-[4px] top-[11px] w-[30px] rounded-bl-[20px] border-b border-l border-primary/30 lg:hidden"
            />
            {/* Short stroke with an arrow that points into the first node. */}
            <span aria-hidden="true" className="absolute left-[4px] top-[11px] h-px w-[22px] bg-primary/30 lg:hidden" />
            <svg aria-hidden="true" viewBox="0 0 10 10" className="absolute left-[24px] top-[5px] size-3 lg:hidden">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-primary)" fillOpacity="0.7" />
            </svg>
            <svg
              aria-hidden="true"
              viewBox="0 0 520 420"
              className="absolute inset-0 hidden size-full lg:block"
              fill="none"
              stroke="var(--color-primary)"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <defs>
                <marker
                  id="rc-arrow"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-primary)" fillOpacity="0.6" stroke="none" />
                </marker>
              </defs>
              <path d="M 274 112 C 435 125, 448 205, 402 266" markerEnd="url(#rc-arrow)" />
              <path d="M 388 286 C 320 324, 200 324, 132 286" markerEnd="url(#rc-arrow)" />
              <path d="M 116 266 C 40 190, 60 130, 242 116" markerEnd="url(#rc-arrow)" />
            </svg>

            <ol className="relative flex flex-col gap-6 pb-6 lg:h-full lg:gap-0 lg:pb-0">
              {rootCause.nodes.map((node, i) => (
                <li
                  key={node.title}
                  className={cn(
                    "relative flex gap-4 lg:absolute lg:flex-col lg:-translate-x-1/2 lg:items-center lg:gap-0 lg:text-center",
                    nodePos[i],
                  )}
                >
                  {/* Thin line between the nodes on phones; the last one has no continuation. */}
                  {i < last && (
                    <span
                      aria-hidden="true"
                      className="absolute left-[5px] top-6 h-[calc(100%+1.5rem)] w-px bg-primary/25 lg:hidden"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="mt-[6px] size-[11px] shrink-0 rotate-45 bg-gold lg:mt-0 lg:mb-8"
                  />
                  <div
                    className={cn(
                      "flex flex-col gap-1.5",
                      // Node 1: the label sits fully above the diamond, outside the loop.
                      i === 0 && "lg:absolute lg:bottom-full lg:left-1/2 lg:mb-6 lg:w-[240px] lg:-translate-x-1/2",
                    )}
                  >
                    <h3 className="text-lg font-semibold lg:text-xl">{node.title}</h3>
                    <p className="text-[15px] leading-snug text-muted-foreground">{node.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex w-full justify-center lg:mt-[72px]">
            <p className="max-w-[520px] text-balance text-center font-display text-xl italic">{rootCause.conclusion}</p>
          </div>
        </div>
      </div>
    </Island>
  );
}

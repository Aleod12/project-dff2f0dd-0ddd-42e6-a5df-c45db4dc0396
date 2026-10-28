import { rootCause } from "@/content/rootCause";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { Island } from "@/components/layout/Island";
import { cn } from "@/lib/utils";

/**
 * Desktop loop diagram: the wrapper keeps the 520×420 ratio, so percentage positions of the
 * HTML nodes land exactly on the SVG coordinates (viewBox 0 0 520 420).
 * Node 1 top center, node 2 bottom right, node 3 bottom left — the arrows run 1 → 2 → 3 → 1.
 */
const nodePos = [
  "lg:left-[50%] lg:top-[6.7%] lg:w-[30%]",
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
            {/* Phones only: the path that returns from the last link of the loop to the first. */}
            <span
              aria-hidden="true"
              className="absolute bottom-4 left-[4px] top-4 w-px bg-primary/25 lg:hidden"
            />
            <svg aria-hidden="true" viewBox="0 0 10 10" className="absolute left-0 top-1 size-2.5 lg:hidden">
              <path d="M 5 0 L 10 10 L 0 10 z" fill="var(--color-primary)" fillOpacity="0.6" />
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
              <path d="M 272 34 C 430 60, 440 180, 402 266" markerEnd="url(#rc-arrow)" />
              <path d="M 388 286 C 320 324, 200 324, 132 286" markerEnd="url(#rc-arrow)" />
              <path d="M 116 266 C 40 190, 60 80, 244 36" markerEnd="url(#rc-arrow)" />
            </svg>

            <ol className="relative flex flex-col gap-6 lg:h-full lg:gap-0">
              {rootCause.nodes.map((node, i) => (
                <li
                  key={node.title}
                  className={cn(
                    "relative flex gap-4 lg:absolute lg:-translate-x-1/2 lg:flex-col lg:items-center lg:gap-0 lg:text-center",
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
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg font-semibold">{node.title}</h3>
                    <p className="text-[15px] leading-snug text-muted-foreground">{node.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex w-full flex-col items-center gap-4">
            {/* Phones only: the caption for the return path drawn along the list. */}
            <p className="w-full pl-7 text-sm text-muted-foreground lg:hidden">{rootCause.loopLabel}</p>

            <p className="text-balance text-center font-display text-xl italic">{rootCause.conclusion}</p>
          </div>
        </div>
      </div>
    </Island>
  );
}

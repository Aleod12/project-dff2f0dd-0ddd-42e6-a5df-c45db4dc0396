import { meeting } from "@/content/meeting";
import { Island } from "@/components/layout/Island";
import { SectionTitle } from "@/components/brand/SectionTitle";

export function Meeting() {
  return (
    <Island id="meeting" tone="surface" aria-labelledby={meeting.titleId}>
      <SectionTitle id={meeting.titleId} title={meeting.title} accent={meeting.accent} suffix={meeting.titleSuffix} />
      <p className="mt-5 text-center text-[15px] leading-[1.55] text-muted-foreground">{meeting.intro}</p>
      <ol className="mx-auto mt-5 grid max-w-[1040px] gap-3 md:mt-7 md:grid-cols-2 md:gap-x-8 md:gap-y-8 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-11">
        {meeting.steps.map((step, i) => (
          <li key={step.title} className="relative flex min-w-0 items-start gap-4">
            {i < meeting.steps.length - 1 && <span aria-hidden="true" className="absolute bottom-[-12px] left-[21.5px] top-11 w-px bg-primary/25 md:hidden" />}
            <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-gold bg-surface font-display text-[22px] leading-none text-primary [font-variant-numeric:lining-nums_tabular-nums]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 max-w-[300px]">
              <h3 className="font-display text-[20px] leading-tight text-primary lg:text-[22px]">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.55] text-muted-foreground md:text-base">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Island>
  );
}

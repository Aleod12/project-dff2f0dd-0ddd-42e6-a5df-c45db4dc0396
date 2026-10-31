import { practices, showPractices } from "@/content/practices";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { Island } from "@/components/layout/Island";
import { isPresent } from "@/lib/present";

/** «Бонусные практики» (#practices): rendered only once the names are confirmed. */
export function Practices() {
  if (!showPractices()) return null;
  return (
    <Island id="practices" tone="surface" aria-labelledby={practices.titleId}>
      <SectionTitle id={practices.titleId} title={practices.title} accent={practices.accent} />
      {isPresent(practices.intro) && <p className="mx-auto mt-6 max-w-2xl text-balance text-center text-muted-foreground md:mt-8">{practices.intro}</p>}
      <ul className="mt-8 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5">
        {practices.items.map((p, i) => (
          <li key={i} className="flex items-start gap-5 rounded-card bg-background p-5 md:p-7">
            <span aria-hidden="true" className="font-display text-5xl font-semibold leading-none text-primary/35 lining-nums">{String(i + 1).padStart(2, "0")}</span>
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-2xl font-semibold leading-snug text-primary">{p.title}</h3>
              {isPresent(p.note) && <p className="text-muted-foreground">{p.note}</p>}
            </div>
          </li>
        ))}
      </ul>
    </Island>
  );
}

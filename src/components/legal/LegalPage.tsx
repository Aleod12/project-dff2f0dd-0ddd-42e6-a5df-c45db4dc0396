import type { LegalDoc } from "@/content/legal/types";
import { Island } from "@/components/layout/Island";
import { DiamondDivider } from "@/components/brand/DiamondDivider";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <Island tone="card">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-h2 text-balance">{doc.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Редакция от {doc.updated}</p>
        <DiamondDivider className="my-8" />
        <nav aria-label="Содержание" className="mb-10 rounded-2xl bg-sage p-5">
          <p className="text-eyebrow mb-3">Содержание</p>
          <ol className="flex flex-col gap-1.5 text-sm">
            {doc.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-primary underline-offset-4 hover:underline">{s.heading}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="flex flex-col gap-10">
          {doc.sections.map((s) => (
            <section key={s.id} id={s.id} className="flex flex-col gap-3">
              <h2 className="text-2xl md:text-3xl">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </Island>
  );
}

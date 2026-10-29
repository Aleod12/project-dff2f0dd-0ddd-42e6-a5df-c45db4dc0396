import { Fragment, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import type { LegalBlock, LegalDoc } from "@/content/legal/types";
import { legalDocs, legalInlineLinks, legalUi, type LegalFrom } from "@/content/legal/nav";
import { site } from "@/content/site";
import { listPlaceholders } from "@/lib/legalFrom";
import { Island } from "@/components/layout/Island";
import { DiamondDivider } from "@/components/brand/DiamondDivider";
import { LegalBackLink } from "./LegalBackLink";

const TOKEN_RE = /(\[ЗАПОЛНИТЬ:[^\]]*\]|\{(?:policyLink|policyLinkWith|offerLink|consentLink)\})/g;

/** Inline text: placeholders → <mark>, {xxxLink} → internal document link keeping ?from. */
export function LegalText({ text, from }: { text: string; from?: LegalFrom | undefined }) {
  const parts = text.split(TOKEN_RE);
  return (
    <>
      {parts.map((part, i): ReactNode => {
        if (part.startsWith("[ЗАПОЛНИТЬ:")) return <mark key={i} className="legal-placeholder">{part}</mark>;
        const token = part.match(/^\{(\w+)\}$/)?.[1];
        const link = token ? legalInlineLinks[token] : undefined;
        if (link)
          return (
            <Link key={i} to={legalDocs[link.doc].to} search={{ from }} className="text-primary tap-link underline underline-offset-4 hover:no-underline">
              {link.label}
            </Link>
          );
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

function Block({ block, from }: { block: LegalBlock; from?: LegalFrom | undefined }) {
  if (block.type === "p") return <p><LegalText text={block.text} from={from} /></p>;
  if (block.type === "list")
    return (
      <ul className="flex list-disc flex-col gap-2 pl-6 marker:text-primary">
        {block.items.map((it, i) => <li key={i}><LegalText text={it} from={from} /></li>)}
      </ul>
    );
  return (
    <>
      {/* ≥768px and print: a real table. */}
      <div className="hidden w-full min-w-0 md:block print:block" data-legal-table>
        <table className="w-full min-w-full table-auto border-collapse text-[15px] leading-normal">
          <thead>
            <tr>
              {block.columns.map((c) => (
                <th key={c} scope="col" className="border-b-2 border-primary/40 px-2 py-2 text-left align-bottom font-semibold text-primary">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((r, i) => (
              <tr key={i} className="legal-row border-b border-border">
                {r.map((cell, j) => <td key={j} className="px-2 py-3 align-top"><LegalText text={cell} from={from} /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <768px: each row is a card of «label: value» pairs. */}
      <ul className="flex flex-col gap-4 md:hidden print:hidden" data-legal-cards>
        {block.rows.map((r, i) => (
          <li key={i} className="rounded-2xl bg-surface p-4">
            <dl className="flex flex-col gap-3">
              {r.map((cell, j) => (
                <div key={j}>
                  <dt className="text-[15px] font-semibold text-primary">{block.columns[j]}</dt>
                  <dd><LegalText text={cell} from={from} /></dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

export function LegalPage({ doc, from }: { doc: LegalDoc; from?: LegalFrom | undefined }) {
  const placeholders = listPlaceholders(doc).length;
  const others = (Object.keys(legalDocs) as (keyof typeof legalDocs)[]).filter((k) => k !== doc.key);

  return (
    <Island tone="card" className="print:bg-transparent print:p-0 print:shadow-none">
      <article className="legal-doc mx-auto max-w-[72ch] text-[17px] leading-[1.7]">
        <LegalBackLink from={from} className="-ml-1 mb-6" />
        <h1 className="text-h2 text-balance">{doc.title}</h1>
        {doc.subtitle && <p className="mt-3 font-display text-xl italic text-primary">{doc.subtitle}</p>}
        <p className="mt-3 text-[15px] text-muted-foreground">
          {legalUi.updated} <LegalText text={doc.updated} from={from} />
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-11 items-center gap-2 rounded-md text-[15px] font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2"
          >
            <Printer className="size-[18px]" aria-hidden="true" />
            {legalUi.print}
          </button>
        </div>
        {placeholders > 0 && !site.siteUrl.trim() && (
          <p role="note" className="mt-4 inline-block rounded-full bg-sage px-4 py-1.5 text-[15px] font-medium print:hidden">
            {legalUi.draftNotice(placeholders)}
          </p>
        )}
        <DiamondDivider className="my-8" />
        <nav aria-label={legalUi.contents} className="mb-10 rounded-2xl bg-sage p-5 print:hidden">
          <p className="text-eyebrow mb-3">{legalUi.contents}</p>
          <ol className="flex flex-col gap-1 text-[15px]">
            {doc.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="inline-flex min-h-9 items-center text-primary underline-offset-4 hover:underline">{s.heading}</a>
              </li>
            ))}
          </ol>
        </nav>
        {doc.intro && <p className="mb-10 text-muted-foreground"><LegalText text={doc.intro} from={from} /></p>}
        <div className="flex flex-col gap-10">
          {doc.sections.map((s) => (
            <section key={s.id} id={s.id} className="flex flex-col gap-3">
              <h2 className="text-2xl md:text-3xl">{s.heading}</h2>
              {s.blocks.map((b, i) => <Block key={i} block={b} from={from} />)}
            </section>
          ))}
        </div>
        <nav aria-label={legalUi.otherDocs} className="mt-14 border-t border-border pt-8 print:hidden">
          <h2 className="text-2xl">{legalUi.otherDocs}</h2>
          <ul className="mt-3 flex flex-col gap-1">
            {others.map((k) => (
              <li key={k}>
                <Link to={legalDocs[k].to} search={{ from }} className="inline-flex min-h-11 items-center text-primary underline underline-offset-4 hover:no-underline">
                  {legalDocs[k].label}
                </Link>
              </li>
            ))}
          </ul>
          <LegalBackLink from={from} className="-ml-1 mt-6" />
        </nav>
      </article>
    </Island>
  );
}

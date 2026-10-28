import { legalFromValues, legalSectionNames, legalUi, type LegalFrom } from "@/content/legal/nav";
import type { LegalDoc } from "@/content/legal/types";

export function parseFrom(value: unknown): LegalFrom | undefined {
  return typeof value === "string" && (legalFromValues as readonly string[]).includes(value) ? (value as LegalFrom) : undefined;
}

export function backLabel(from?: LegalFrom | undefined): string {
  if (!from) return legalUi.backHome;
  if (from === "site-footer") return legalUi.backToSite;
  if (from === "checkout") return legalUi.backToCheckout;
  return legalUi.backToSection(legalSectionNames[from]);
}

/** Where «back» goes when there is no in-site history. */
export function backTarget(from?: LegalFrom | undefined): { to: "/" | "/payment/checkout"; hash?: string } {
  if (!from) return { to: "/" };
  if (from === "checkout") return { to: "/payment/checkout" };
  return { to: "/", hash: from };
}

export function backHref(from?: LegalFrom | undefined): string {
  const t = backTarget(from);
  return t.hash ? `${t.to}#${t.hash}` : t.to;
}

const FLAG = "cameFromSite";

/** Set by the root on every client-side navigation (true) and on a fresh page load (false). */
export function setCameFromSite(v: boolean) {
  try {
    window.sessionStorage.setItem(FLAG, v ? "1" : "0");
  } catch {
    /* private mode / in-app browsers */
  }
}

export function cameFromSite(): boolean {
  try {
    return window.sessionStorage.getItem(FLAG) === "1";
  } catch {
    return false;
  }
}

export const PLACEHOLDER_RE = /\[ЗАПОЛНИТЬ:[^\]]*\]/g;

/** Every placeholder in a document with the section it sits in. */
export function listPlaceholders(doc: LegalDoc): { section: string; text: string }[] {
  const out: { section: string; text: string }[] = [];
  const scan = (section: string, t: string) => (t.match(PLACEHOLDER_RE) ?? []).forEach((m) => out.push({ section, text: m }));
  scan("Редакция", doc.updated);
  if (doc.intro) scan("Вступление", doc.intro);
  for (const s of doc.sections)
    for (const b of s.blocks) {
      if (b.type === "p") scan(s.heading, b.text);
      else if (b.type === "list") b.items.forEach((i) => scan(s.heading, i));
      else [...b.columns, ...b.rows.flat()].forEach((c) => scan(s.heading, c));
    }
  return out;
}

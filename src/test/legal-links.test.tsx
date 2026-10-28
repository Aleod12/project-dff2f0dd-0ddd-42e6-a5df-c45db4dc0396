import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { legalFromValues } from "@/content/legal/nav";
import { privacy } from "@/content/legal/privacy";
import { consent } from "@/content/legal/consent";
import { offer } from "@/content/legal/offer";
import { LegalPage } from "@/components/legal/LegalPage";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { renderAt } from "./legal-render";

const DOC = /^\/(privacy|offer|consent)(\?|$)/;

function checkDocLinks(container: HTMLElement) {
  const anchors = [...container.querySelectorAll("a")].filter((a) => DOC.test(a.getAttribute("href") ?? ""));
  expect(anchors.length).toBeGreaterThan(0);
  for (const a of anchors) {
    const from = new URL(a.getAttribute("href")!, "http://x").searchParams.get("from");
    expect(legalFromValues as readonly string[]).toContain(from);
    expect(a.getAttribute("target")).toBeNull();
  }
}

describe("links to legal documents", () => {
  it("footer links carry from=site-footer, same tab, order Политика → Оферта → Согласие", async () => {
    const { container } = await renderAt("/", () => <SiteFooter />);
    checkDocLinks(container);
    const hrefs = [...container.querySelectorAll("a")].map((a) => a.getAttribute("href")).filter((h) => h && DOC.test(h));
    expect(hrefs).toEqual(["/privacy?from=site-footer", "/offer?from=site-footer", "/consent?from=site-footer"]);
  });

  it.each([privacy, consent, offer])("cross-links inside $key keep the original from", async (doc) => {
    const { container } = await renderAt(`/${doc.key}?from=price`, () => <LegalPage doc={doc} from="price" />);
    checkDocLinks(container);
    for (const a of container.querySelectorAll("a[href^='/privacy'],a[href^='/offer'],a[href^='/consent']"))
      expect(a.getAttribute("href")).toContain("from=price");
  });

  it("no source file links to a document with a raw href or target=_blank", () => {
    const files: string[] = [];
    const walk = (d: string) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(tsx?|ts)$/.test(e.name) && !p.includes(`${path.sep}test${path.sep}`)) files.push(p);
    });
    walk("src");
    for (const f of files) expect(fs.readFileSync(f, "utf8"), f).not.toMatch(/href=["'{`]+\/(privacy|offer|consent)/);
  });
});

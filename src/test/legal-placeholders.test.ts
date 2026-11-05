import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { privacy } from "@/content/legal/privacy";
import { consent } from "@/content/legal/consent";
import { offer } from "@/content/legal/offer";
import { listPlaceholders } from "@/lib/legalFrom";

const docs = { "/privacy": privacy, "/consent": consent, "/offer": offer };

describe("legal placeholders", () => {
  it("offer 2.2 reflects the agreed meetings, transformations and practices", () => {
    const section = offer.sections.find((item) => item.id === "s2");
    const included = section?.blocks.find((block) => block.type === "list");
    expect(included?.type).toBe("list");
    if (included?.type !== "list") throw new Error("Offer 2.2 inclusions missing");
    const text = included.items.join(" ");
    expect(text).toContain("4 онлайн-встречи");
    expect(text).toContain("4 бонусные трансформации в записи");
    expect(text).toContain("2 бонусные практики");
    expect(text).not.toMatch(/живые|4 бонусные аудиопрактики/i);
    expect(text).toContain("Исполнитель или привлечённый им специалист");
  });
  it("lists every [ЗАПОЛНИТЬ] and blocks release once siteUrl is set", () => {
    const all = Object.entries(docs).flatMap(([file, d]) => listPlaceholders(d).map((p) => ({ file, ...p })));
    console.info(`[ЗАПОЛНИТЬ] places: ${all.length}\n` + all.map((p) => `${p.file} | ${p.section} | ${p.text}`).join("\n"));
    if (site.siteUrl.trim()) expect(all, "Release blocker: legal documents still contain placeholders").toHaveLength(0);
    else expect(all.length).toBeGreaterThan(0);
  });

  it("bank details appear only in the offer", () => {
    const text = (d: object) => JSON.stringify(d);
    expect(text(offer)).toContain(site.legal.bank);
    expect(text(privacy)).not.toContain(site.legal.bank);
    expect(text(consent)).not.toContain(site.legal.bank);
  });
});

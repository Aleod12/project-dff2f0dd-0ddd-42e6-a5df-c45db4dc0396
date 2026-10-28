import { describe, expect, it } from "vitest";
import { pricing } from "@/content/pricing";
import { links } from "@/content/links";
import { pains } from "@/content/pains";
import { isPresent } from "@/lib/present";

describe("content rules", () => {
  it("price is 9 990 ₽ and 100 €", () => {
    expect(pricing.rub.amount).toBe("9 990 ₽");
    expect(pricing.eur.amount).toBe("100 €");
  });
  it("payment note says no auto-renewal", () => {
    expect(pricing.paymentNote).toContain("без автосписаний");
  });
  it("every link is an https URL", () => {
    for (const v of Object.values(links)) expect(v).toMatch(/^https:\/\//);
  });
  it("join goes to Sergey's Telegram for now", () => {
    expect(links.join).toBe("https://t.me/STabachnikov");
  });
  it("empty values are hidden", () => {
    expect(isPresent("")).toBe(false);
    expect(isPresent("   ")).toBe(false);
    expect(isPresent(undefined)).toBe(false);
    expect(isPresent([])).toBe(false);
    expect(isPresent("27")).toBe(true);
  });
  it("stream start is empty so the date block stays hidden", () => {
    expect(isPresent(pricing.streamStart)).toBe(false);
  });
  it("section 2 has exactly five pains, in the agreed order", () => {
    expect(pains.items.map((i) => i.title)).toEqual([
      "Устаёте, даже когда отдыхаете",
      "Тревога стала фоном",
      "В деньгах — стеклянный потолок",
      "В отношениях один и тот же сценарий",
      "Ощущение, что живёте не свою жизнь",
    ]);
  });
  it("every pain card has its own explanation line", () => {
    for (const item of pains.items) {
      expect(isPresent(item.text)).toBe(true);
    }
  });
  it("pain CTA is the free diagnostic in the bot", () => {
    expect(pains.cta.href).toBe(links.diagnostic);
    expect(pains.cta.track).toBe("pains-diagnostic");
    expect(pains.cta.label).toBe("Узнать, где именно блок — бесплатная диагностика, 2 минуты\u00A0→");
  });
  it("Sergey's note under the cards is signed and keeps the 27 years", () => {
    expect(pains.hostNote.sign).toBe("— Сергей Табачников");
    expect(pains.hostNote.text).toContain("27 лет в бизнесе");
  });
});

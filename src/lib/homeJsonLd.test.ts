import { describe, it, expect } from "vitest";
import { personJsonLd, serviceJsonLd } from "./homeJsonLd";
import { links } from "@/content/links";
import { payments } from "@/content/payments";
describe("home JSON-LD", () => {
  it("Person has name, job and 4 socials including MAX", () => {
    const p = personJsonLd();
    expect(p.name).toBe("Сергей Табачников");
    expect(p.jobTitle).toBe("Энергопрактик · Проводник");
    expect(p.sameAs).toHaveLength(4);
    expect(p.sameAs).toContain(links.maxProfile);
  });
  it("Service offers only 9990 RUB while euro is off", () => {
    expect(payments.eurEnabled).toBe(false);
    const o = serviceJsonLd().offers.map((x) => `${x.price} ${x.priceCurrency}`);
    expect(o).toEqual(["9990 RUB"]);
  });
});

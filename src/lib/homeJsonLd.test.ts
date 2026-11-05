import { describe, it, expect } from "vitest";
import { personJsonLd, serviceJsonLd } from "./homeJsonLd";
describe("home JSON-LD", () => {
  it("Person has name, job and 3 socials", () => {
    const p = personJsonLd();
    expect(p.name).toBe("Сергей Табачников");
    expect(p.jobTitle).toBe("Энергопрактик");
    expect(p.sameAs).toHaveLength(3);
  });
  it("Service offers 9990 RUB and 100 EUR", () => {
    const o = serviceJsonLd().offers.map((x) => `${x.price} ${x.priceCurrency}`);
    expect(o).toEqual(["9990 RUB", "100 EUR"]);
  });
});

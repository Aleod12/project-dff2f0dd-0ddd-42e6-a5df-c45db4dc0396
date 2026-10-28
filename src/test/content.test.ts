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
});

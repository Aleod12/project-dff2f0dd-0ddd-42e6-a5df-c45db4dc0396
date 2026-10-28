import { afterEach, describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { robotsTxt, sitemapPaths, sitemapXml } from "@/lib/seoFiles";

const original = site.siteUrl;
const setUrl = (v: string) => ((site as { siteUrl: string }).siteUrl = v);
afterEach(() => setUrl(original));

describe("robots.txt and sitemap", () => {
  it("robots allows all and blocks /payment/", () => {
    expect(robotsTxt()).toContain("Allow: /");
    expect(robotsTxt()).toContain("Disallow: /payment/");
  });
  it("without a domain: no Sitemap line and no sitemap", () => {
    setUrl("");
    expect(robotsTxt()).not.toContain("Sitemap:");
    expect(sitemapXml()).toBeNull();
  });
  it("with a domain: sitemap lists only the 4 public pages", () => {
    setUrl("https://example.ru");
    expect(robotsTxt()).toContain("Sitemap: https://example.ru/sitemap.xml");
    const xml = sitemapXml()!;
    expect(sitemapPaths).toEqual(["/", "/privacy", "/consent", "/offer"]);
    expect(xml).not.toContain("/payment");
    expect(xml.match(/<loc>/g)).toHaveLength(4);
  });
  it("address and bank details are not in the footer", async () => {
    const fs = await import("node:fs");
    const footer = fs.readFileSync("src/components/layout/SiteFooter.tsx", "utf8");
    expect(footer).not.toMatch(/address|bank/);
  });
});

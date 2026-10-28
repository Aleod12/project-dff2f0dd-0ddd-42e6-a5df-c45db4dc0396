import { afterEach, describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { pageSeo } from "./siteUrl";

const original = site.siteUrl;
const setUrl = (v: string) => ((site as { siteUrl: string }).siteUrl = v);
afterEach(() => setUrl(original));

describe("domain-dependent tags read site.siteUrl", () => {
  it("emits no canonical or og:url while the domain is empty", () => {
    setUrl("");
    expect(pageSeo("/privacy", "/media/a.webp")).toEqual({ meta: [], links: [] });
  });
  it("builds absolute canonical, og:url and og:image from siteUrl", () => {
    setUrl("https://example.ru/");
    const seo = pageSeo("/privacy", "/media/a.webp");
    expect(seo.links).toEqual([{ rel: "canonical", href: "https://example.ru/privacy" }]);
    expect(seo.meta).toContainEqual({ property: "og:url", content: "https://example.ru/privacy" });
    expect(seo.meta).toContainEqual({ property: "og:image", content: "https://example.ru/media/a.webp" });
  });
});

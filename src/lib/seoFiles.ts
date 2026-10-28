import { site } from "@/content/site";

/** Public pages for the sitemap. Payment pages are excluded on purpose. */
export const sitemapPaths = ["/", "/privacy", "/consent", "/offer"] as const;

const base = () => site.siteUrl.trim().replace(/\/+$/, "");

export function robotsTxt(): string {
  const lines = ["User-agent: *", "Allow: /", "Disallow: /payment/"];
  if (base()) lines.push("", `Sitemap: ${base()}/sitemap.xml`);
  return lines.join("\n") + "\n";
}

/** Null while the domain is unknown: a sitemap needs absolute URLs. */
export function sitemapXml(): string | null {
  if (!base()) return null;
  const urls = sitemapPaths.map((p) => `  <url><loc>${base()}${p === "/" ? "/" : p}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

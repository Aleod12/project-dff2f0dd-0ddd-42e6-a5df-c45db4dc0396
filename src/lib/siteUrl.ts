import { site } from "@/content/site";

/** site.siteUrl without trailing slash; empty until the domain exists. */
export const siteBase = () => site.siteUrl.trim().replace(/\/+$/, "");

/** Absolute URL when siteUrl is set, otherwise the path as is. */
export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  const base = siteBase();
  return base ? `${base}${path.startsWith("/") ? path : `/${path}`}` : path;
}

/**
 * Canonical link + og:url (+ og:image/twitter:image) for a page, all from site.siteUrl.
 * While siteUrl is empty nothing is emitted: relative canonical/OG URLs are invalid.
 */
export function pageSeo(path: string, image?: string) {
  const base = siteBase();
  if (!base) return { meta: [], links: [] };
  const url = absoluteUrl(path);
  const meta: { property?: string; name?: string; content: string }[] = [{ property: "og:url", content: url }];
  if (image) {
    meta.push({ property: "og:image", content: absoluteUrl(image) }, { name: "twitter:image", content: absoluteUrl(image) });
  }
  return { meta, links: [{ rel: "canonical", href: url }] };
}

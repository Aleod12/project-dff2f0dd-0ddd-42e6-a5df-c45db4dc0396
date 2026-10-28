import { site } from "@/content/site";
import { links } from "@/content/links";
import { hero } from "@/content/hero";
import { payments } from "@/content/payments";
import photo860 from "@/assets/hero/sergey-hero-860.webp.asset.json";

/** Absolute URL when siteUrl is set, otherwise the path as is. */
function url(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  const base = site.siteUrl.trim().replace(/\/+$/, "");
  return base ? `${base}${path.startsWith("/") ? path : `/${path}`}` : path;
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": url("/#person"),
    name: site.hostName,
    jobTitle: "Проводник, энергопрактик",
    image: url(photo860.url),
    sameAs: [links.telegramChannel, links.vkCommunity, links.youtube],
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: site.clubName,
    description: hero.lead,
    provider: { "@type": "Person", "@id": url("/#person"), name: site.hostName },
    offers: [
      { "@type": "Offer", price: String(payments.prices.rub), priceCurrency: "RUB", url: url("/#price") },
      { "@type": "Offer", price: String(payments.prices.eur), priceCurrency: "EUR", url: url("/#price") },
    ],
  };
}

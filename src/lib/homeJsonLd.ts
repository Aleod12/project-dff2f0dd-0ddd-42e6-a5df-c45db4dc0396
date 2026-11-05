import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/siteUrl";
import { links } from "@/content/links";
import { hero } from "@/content/hero";
import { payments } from "@/content/payments";
import photo860 from "@/assets/hero/sergey-hero-circle-760.webp.asset.json";

const url = absoluteUrl;

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": url("/#person"),
    name: site.hostName,
    jobTitle: site.roles,
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

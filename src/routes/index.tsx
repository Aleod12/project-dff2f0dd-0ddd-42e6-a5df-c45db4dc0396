import { createFileRoute } from "@tanstack/react-router";
import { pageSeo } from "@/lib/siteUrl";
import heroPhoto from "@/assets/hero/sergey-hero-circle-760.webp.asset.json";
import heroPhoto640 from "@/assets/hero/sergey-hero-circle-570.webp.asset.json";
import heroPhoto430 from "@/assets/hero/sergey-hero-circle-380.webp.asset.json";
import { Hero } from "@/components/sections/Hero";
import { ForYou } from "@/components/sections/ForYou";
import { RootCause } from "@/components/sections/RootCause";
import { Host } from "@/components/sections/Host";
import { Areas } from "@/components/sections/Areas";
import { Program } from "@/components/sections/Program";
import { Practices } from "@/components/sections/Practices";
import { Reviews } from "@/components/sections/Reviews";
import { Price } from "@/components/sections/Price";
import { Intro } from "@/components/sections/Intro";
import { FinalCta } from "@/components/sections/FinalCta";
import { Faq } from "@/components/sections/Faq";
import { faqJsonLd } from "@/content/faq";
import { personJsonLd, serviceJsonLd } from "@/lib/homeJsonLd";

const title = "Клуб «Трансформация» Сергея Табачникова";
const description =
  "Онлайн-клуб с Сергеем Табачниковым: 4 живые встречи, 4 сферы жизни — энергия и состояние, финансы, отношения, предназначение. Разовая оплата, без автосписаний.";

export const Route = createFileRoute("/")({
  head: () => {
    const seo = pageSeo("/", heroPhoto.url);
    return {
    links: [
      // LCP: start the hero photo download in parallel with CSS and fonts (same srcset/sizes as the <img>).
      {
        rel: "preload",
        as: "image",
        href: heroPhoto640.url,
        imageSrcSet: `${heroPhoto430.url} 380w, ${heroPhoto640.url} 570w, ${heroPhoto.url} 760w`,
        imageSizes: "(min-width: 768px) 520px, 300px",
        fetchPriority: "high",
      },
      ...seo.links,
    ],
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...seo.meta,
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(personJsonLd()) },
      { type: "application/ld+json", children: JSON.stringify(serviceJsonLd()) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd()) },
    ],
  };
  },
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <ForYou />
      <RootCause />
      <Program />
      <Areas />
      <Practices />
      <Host />
      <Reviews />
      <Price />
      <Intro />
      <Faq />
      <FinalCta />
    </>
  );
}

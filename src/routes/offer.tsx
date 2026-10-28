import { createFileRoute } from "@tanstack/react-router";
import { pageSeo } from "@/lib/siteUrl";
import { LegalPage } from "@/components/legal/LegalPage";
import { offer } from "@/content/legal/offer";

const title = "Публичная оферта — Клуб «Трансформация»";
const description = "Условия участия в онлайн-программе Клуб «Трансформация» Сергея Табачникова.";

export const Route = createFileRoute("/offer")({
  head: () => {
    const seo = pageSeo("/offer");
    return {
    links: seo.links,
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      ...seo.meta,
    ],
  };
  },
  component: () => <LegalPage doc={offer} />,
});

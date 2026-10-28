import { createFileRoute } from "@tanstack/react-router";
import { pageSeo } from "@/lib/siteUrl";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacy } from "@/content/legal/privacy";

const title = "Политика конфиденциальности — Клуб «Трансформация»";
const description = "Как обрабатываются персональные данные на сайте Клуба «Трансформация» Сергея Табачникова.";

export const Route = createFileRoute("/privacy")({
  head: () => {
    const seo = pageSeo("/privacy");
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
  component: () => <LegalPage doc={privacy} />,
});

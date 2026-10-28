import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";
import { offer } from "@/content/legal/offer";

const title = "Публичная оферта — Клуб «Трансформация»";
const description = "Условия участия в онлайн-программе Клуб «Трансформация» Сергея Табачникова.";

export const Route = createFileRoute("/offer")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: () => <LegalPage doc={offer} />,
});

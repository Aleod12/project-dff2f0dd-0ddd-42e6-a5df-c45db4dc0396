import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";
import { consent } from "@/content/legal/consent";

const title = "Согласие на обработку данных — Клуб «Трансформация»";
const description = "Текст согласия на обработку персональных данных для участников Клуба «Трансформация».";

export const Route = createFileRoute("/consent")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: () => <LegalPage doc={consent} />,
});

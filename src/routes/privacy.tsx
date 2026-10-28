import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacy } from "@/content/legal/privacy";

const title = "Политика конфиденциальности — Клуб «Трансформация»";
const description = "Как обрабатываются персональные данные на сайте Клуба «Трансформация» Сергея Табачникова.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: () => <LegalPage doc={privacy} />,
});

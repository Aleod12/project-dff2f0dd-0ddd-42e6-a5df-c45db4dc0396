import { createFileRoute } from "@tanstack/react-router";
import { pageSeo } from "@/lib/siteUrl";
import { parseFrom } from "@/lib/legalFrom";
import { LegalPage } from "@/components/legal/LegalPage";
import { consent } from "@/content/legal/consent";

const title = "Согласие на обработку персональных данных | Трансформация";
const description = "Текст согласия на обработку персональных данных для сайта Клуба «Трансформация» Сергея Табачникова.";

export const Route = createFileRoute("/consent")({
  validateSearch: (search: Record<string, unknown>): { from?: ReturnType<typeof parseFrom> | undefined } => ({ from: parseFrom(search["from"]) }),
  head: () => {
    const seo = pageSeo("/consent");
    return {
      links: seo.links,
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        ...seo.meta,
      ],
    };
  },
  component: Page,
});

function Page() {
  const { from } = Route.useSearch();
  return <LegalPage doc={consent} from={from} />;
}

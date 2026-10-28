import { createFileRoute } from "@tanstack/react-router";
import { pageSeo } from "@/lib/siteUrl";
import { parseFrom } from "@/lib/legalFrom";
import { LegalPage } from "@/components/legal/LegalPage";
import { privacy } from "@/content/legal/privacy";

const title = "Политика обработки персональных данных | Трансформация";
const description = "Политика ИП Табачникова С. Б. в отношении обработки персональных данных на сайте Клуба «Трансформация»: цели, сроки, права субъекта.";

export const Route = createFileRoute("/privacy")({
  validateSearch: (search: Record<string, unknown>): { from?: ReturnType<typeof parseFrom> | undefined } => ({ from: parseFrom(search["from"]) }),
  head: () => {
    const seo = pageSeo("/privacy");
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
  return <LegalPage doc={privacy} from={from} />;
}

import { createFileRoute } from "@tanstack/react-router";
import { pageSeo } from "@/lib/siteUrl";
import { parseFrom } from "@/lib/legalFrom";
import { LegalPage } from "@/components/legal/LegalPage";
import { offer } from "@/content/legal/offer";

const title = "Публичная оферта — Клуб «Трансформация»";
const description = "Договор об участии в онлайн-клубе «Трансформация»: что входит, стоимость, порядок оплаты, отказ от договора и реквизиты.";

export const Route = createFileRoute("/offer")({
  validateSearch: (search: Record<string, unknown>): { from?: ReturnType<typeof parseFrom> } => ({ from: parseFrom(search.from) }),
  head: () => {
    const seo = pageSeo("/offer");
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
  return <LegalPage doc={offer} from={from} />;
}

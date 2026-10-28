import { createFileRoute } from "@tanstack/react-router";
import { Island } from "@/components/layout/Island";
import { SectionTitle } from "@/components/brand/SectionTitle";
import { Signature } from "@/components/brand/Signature";
import { CtaButton } from "@/components/brand/CtaButton";
import { TelegramFallback } from "@/components/brand/TelegramFallback";
import { site } from "@/content/site";
import { links } from "@/content/links";

const title = "Клуб «Трансформация» Сергея Табачникова — месяц системной работы";
const description =
  "Месяц системной работы в 4 сферах: здоровье, финансы, отношения, предназначение. 4 живые встречи с Сергеем Табачниковым, без автосписаний.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

// Temporary home for stage 1. Sections are added one by one.
function Index() {
  return (
    <Island tone="surface" className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <SectionTitle as="h1" eyebrow={site.roles} title="Скоро" accent="здесь" />
      <p className="max-w-md text-muted-foreground">Страница Клуба «Трансформация» готовится. Уже сейчас Вы можете написать Сергею в Telegram.</p>
      <Signature />
      <CtaButton href={links.join} track="placeholder-join">{site.joinLabel}</CtaButton>
      <TelegramFallback />
    </Island>
  );
}

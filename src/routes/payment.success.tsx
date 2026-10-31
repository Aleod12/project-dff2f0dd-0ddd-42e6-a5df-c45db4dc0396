import { createFileRoute } from "@tanstack/react-router";
import { pricing } from "@/content/pricing";
import { PaymentPage, noindexMeta } from "@/components/layout/PaymentPage";
import { CtaButton } from "@/components/brand/CtaButton";

const title = "Спасибо — Клуб «Трансформация»";
const description = "Информация после оплаты участия в Клубе «Трансформация».";

export const Route = createFileRoute("/payment/success")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...noindexMeta,
    ],
  }),
  component: Success,
});

function Success() {
  const s = pricing.success;
  return (
    <PaymentPage title={s.title}>
      <p className="text-balance">{s.text}</p>
      <CtaButton href={s.write.href} track={s.write.track} className="w-full sm:w-auto">{s.write.label}</CtaButton>
    </PaymentPage>
  );
}

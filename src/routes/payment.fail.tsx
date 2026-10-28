import { createFileRoute } from "@tanstack/react-router";
import { pricing } from "@/content/pricing";
import { PaymentPage, noindexMeta } from "@/components/layout/PaymentPage";
import { CtaButton } from "@/components/brand/CtaButton";

const title = "Платёж не завершён — Клуб «Трансформация»";
const description = "Оплата участия в Клубе «Трансформация» не завершилась.";

export const Route = createFileRoute("/payment/fail")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      ...noindexMeta,
    ],
  }),
  component: Fail,
});

function Fail() {
  const f = pricing.fail;
  return (
    <PaymentPage title={f.title}>
      <p className="text-balance">{f.text}</p>
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <CtaButton href={f.retry.href} className="w-full sm:w-auto">{f.retry.label}</CtaButton>
        <CtaButton href={f.write.href} track={f.write.track} variant="outline" className="w-full sm:w-auto">{f.write.label}</CtaButton>
      </div>
    </PaymentPage>
  );
}

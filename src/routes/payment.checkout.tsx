import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { pricing } from "@/content/pricing";
import { payments, parseCurrency, formatPrice } from "@/content/payments";
import { createPayment } from "@/lib/payments.functions";
import { startCheckout, type CheckoutResult } from "@/lib/checkout";
import { PaymentPage, noindexMeta } from "@/components/layout/PaymentPage";
import { CtaButton } from "@/components/brand/CtaButton";

const title = "Оформление участия — Клуб «Трансформация»";
const description = "Оплата участия в Клубе «Трансформация» Сергея Табачникова.";

export const Route = createFileRoute("/payment/checkout")({
  validateSearch: (search: Record<string, unknown>) => ({ currency: parseCurrency(search["currency"]) }),
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
  component: Checkout,
});

function Checkout() {
  const { currency } = Route.useSearch();
  const c = pricing.checkout;
  const create = useServerFn(createPayment);
  const [state, setState] = useState<CheckoutResult | null>(payments.enabled ? null : { kind: "disabled" });

  useEffect(() => {
    if (!payments.enabled) return;
    startCheckout(payments, currency, (cur) => create({ data: { currency: cur } })).then((r) => {
      if (r.kind === "redirect") window.location.assign(r.url);
      setState(r);
    });
  }, [currency, create]);

  return (
    <PaymentPage title={c.title} accent={c.accent}>
      <dl className="w-full rounded-2xl bg-surface p-5 text-left">
        <dt className="text-eyebrow mb-2">{c.summaryLabel}</dt>
        <dd className="font-display text-2xl font-semibold text-primary">{pricing.clubName}</dd>
        <dd className="text-muted-foreground">{pricing.period}</dd>
        <dd className="mt-3 font-display text-4xl font-semibold text-primary [font-variant-numeric:lining-nums]">{formatPrice(currency)}</dd>
        <dd className="mt-1 text-sm">{c.noRenewal}</dd>
      </dl>
      <p className="text-[15px] text-muted-foreground">
        {c.offer.before}
        <Link to={c.offer.to} search={{ from: c.offer.from }} className="text-primary tap-link underline underline-offset-4 hover:no-underline">
          {c.offer.linkLabel}
        </Link>
      </p>

      {state === null || state.kind === "redirect" ? (
        <p className="text-muted-foreground" role="status">{c.redirecting}</p>
      ) : (
        <>
          <p className="text-balance">{state.kind === "disabled" ? c.disabledText : c.errorText}</p>
          <div className="flex w-full flex-col items-center gap-4">
            <CtaButton href={c.write.href} track={c.write.track} className="w-full sm:w-auto">{c.write.label}</CtaButton>
            <a href={c.back.href} className="text-sm font-medium text-primary tap-link underline underline-offset-4 hover:no-underline">{c.back.label}</a>
          </div>
        </>
      )}
    </PaymentPage>
  );
}

import type { Currency } from "@/content/payments";

export type CheckoutResult = { kind: "disabled" } | { kind: "redirect"; url: string } | { kind: "error" };

/** Decides what checkout does. With payments disabled the provider is never called. */
export async function startCheckout(
  config: { enabled: boolean },
  currency: Currency,
  create: (currency: Currency) => Promise<{ url: string }>,
): Promise<CheckoutResult> {
  if (!config.enabled) return { kind: "disabled" };
  try {
    const { url } = await create(currency);
    return { kind: "redirect", url };
  } catch {
    return { kind: "error" };
  }
}

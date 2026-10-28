/** Payment config. The only place where prices live. Turn on online payment by flipping `enabled` and setting `provider`. */
export type PaymentProvider = "robokassa" | "yookassa";
export type Currency = "rub" | "eur";

export const payments: {
  enabled: boolean;
  provider: PaymentProvider | null;
  prices: Record<Currency, number>;
  /** Shown only if not empty. */
  vatNote: string;
  /** Shown only if not empty. */
  streamStartDate: string;
} = {
  enabled: false,
  provider: null,
  prices: { rub: 9990, eur: 100 },
  vatNote: "",
  streamStartDate: "",
};

/** Anything other than "eur" falls back to rubles. */
export function parseCurrency(value: unknown): Currency {
  return value === "eur" ? "eur" : "rub";
}

/** 9990 → «9 990 ₽», 100 → «100 €». */
export function formatPrice(currency: Currency, prices = payments.prices): string {
  const n = String(prices[currency]).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
  return currency === "rub" ? `${n}\u00A0₽` : `${n}\u00A0€`;
}

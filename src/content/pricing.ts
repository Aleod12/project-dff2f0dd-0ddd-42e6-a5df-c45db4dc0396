import { links } from "./links";

export const pricing = {
  rub: { amount: "9 990 ₽", href: links.payRub, label: "Оплатить в рублях" },
  eur: { amount: "100 €", href: links.payEur, label: "Оплатить из-за рубежа", note: "для зарубежных карт" },
  paymentNote: "Разовый платёж · без автосписаний",
  /** Next stream start date. Empty = block hidden. */
  streamStart: "",
};

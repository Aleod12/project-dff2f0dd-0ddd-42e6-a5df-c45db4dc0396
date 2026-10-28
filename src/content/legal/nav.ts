import type { LegalDocKey } from "./types";

/** Allowed values of ?from= on document pages. Anything else is ignored. */
export const legalFromValues = ["hero", "for-you", "host", "club", "format", "reviews", "price", "free", "faq", "start", "site-footer", "checkout"] as const;
export type LegalFrom = (typeof legalFromValues)[number];

export const legalSectionNames: Record<Exclude<LegalFrom, "site-footer" | "checkout">, string> = {
  hero: "Начало",
  "for-you": "Этот клуб для Вас",
  host: "Ведущий клуба",
  club: "Что даст клуб",
  format: "Как устроен месяц",
  reviews: "Истории участников",
  price: "Стоимость",
  free: "Начните бесплатно",
  faq: "Вопросы и ответы",
  start: "В начало пути",
};

export const legalUi = {
  backToSection: (name: string) => `Вернуться к разделу «${name}»`,
  backToSite: "Вернуться на сайт",
  backToCheckout: "Вернуться к оформлению",
  backHome: "На главную",
  updated: "Редакция от",
  print: "Распечатать / сохранить в PDF",
  contents: "Содержание",
  otherDocs: "Другие документы",
  draftNotice: (n: number) => `Черновик: в документе ${n} мест для заполнения`,
};

export const legalDocs: Record<LegalDocKey, { to: "/privacy" | "/consent" | "/offer"; label: string }> = {
  privacy: { to: "/privacy", label: "Политика в отношении обработки персональных данных" },
  offer: { to: "/offer", label: "Публичная оферта" },
  consent: { to: "/consent", label: "Согласие на обработку персональных данных" },
};

/** Labels for inline document links inside texts. */
export const legalInlineLinks: Record<string, { doc: LegalDocKey; label: string }> = {
  policyLink: { doc: "privacy", label: "Политика в отношении обработки персональных данных" },
  policyLinkWith: { doc: "privacy", label: "Политикой в отношении обработки персональных данных" },
  offerLink: { doc: "offer", label: "Публичная оферта" },
  consentLink: { doc: "consent", label: "Согласие на обработку персональных данных" },
};

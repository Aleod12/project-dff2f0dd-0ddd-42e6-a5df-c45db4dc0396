import type { LegalDocKey } from "./types";

/** Allowed values of ?from= on document pages. Anything else is ignored. */
export const legalFromValues = ["hero", "for-you", "why", "club", "meeting", "areas", "practices", "host", "reviews", "price", "intro", "faq", "site-footer", "checkout"] as const;
/** Old section ids still arriving in links: mapped to their new sections. */
export const legacyFrom: Record<string, LegalFrom> = { format: "club", free: "intro", start: "faq" };
export type LegalFrom = (typeof legalFromValues)[number];

export const legalSectionNames: Record<Exclude<LegalFrom, "site-footer" | "checkout">, string> = {
  hero: "Начало",
  "for-you": "Этот клуб для Вас",
  why: "Почему ситуации повторяются",
  club: "Как устроена программа",
  meeting: "Процесс трансформационной сессии",
  areas: "С чем работаем",
  practices: "Бонусные практики",
  host: "Ведущий клуба",
  reviews: "Истории участников",
  price: "Стоимость",
  intro: "Знакомство с методом",
  faq: "Вопросы и ответы",
};

/** 1 место, 2–4 места, 5+ мест (11–14 — «мест»). */
const placesWord = (n: number) => {
  const d = n % 10, dd = n % 100;
  if (d === 1 && dd !== 11) return "место";
  if (d >= 2 && d <= 4 && (dd < 12 || dd > 14)) return "места";
  return "мест";
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
  draftNotice: (n: number) => `Черновик: в документе ${n} ${placesWord(n)} для заполнения`,
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

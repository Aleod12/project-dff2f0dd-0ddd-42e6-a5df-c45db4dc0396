import { links } from "./links";
import { formatPrice } from "./payments";

/** Section 8 «Стоимость» and the /payment/* pages. Prices come from payments.ts only. */
export const pricing = {
  titleId: "price-title",
  title: "Стоимость",
  accent: "участия",
  clubName: "Клуб «Трансформация»",
  period: "1 месяц + 2 недели архива",
  startLabel: "Старт потока:",
  priceRub: formatPrice("rub"),
  priceEurNote: `или ${formatPrice("eur")} — для зарубежных карт`,
  included: [
    "4 живые онлайн-встречи",
    "Закрытый канал потока и сопровождение",
    "Бонусные медитации и практики",
    "Записи всех встреч + 2 недели доступа к архиву",
    "Разовый платёж, без автосписаний",
  ],
  payRub: { label: `Оплатить ${formatPrice("rub")}`, href: "/payment/checkout?currency=rub", track: "pay-rub" },
  payEur: { label: `Оплатить ${formatPrice("eur")}`, href: "/payment/checkout?currency=eur", track: "pay-eur" },
  offerNote: { before: "Нажимая «Оплатить», Вы принимаете условия ", linkLabel: "публичной оферты", to: "/offer", from: "price" },
  questions: { before: "Остались вопросы?", linkLabel: "Напишите мне", href: links.club, track: "price-write" },

  checkout: {
    title: "Оформление",
    accent: "участия",
    summaryLabel: "Ваш заказ",
    noRenewal: "Разовый платёж, без автосписаний",
    disabledText: "Онлайн-оплата подключается. Пока Вы можете вступить в клуб, написав мне в Telegram.",
    redirecting: "Переходим на страницу оплаты…",
    errorText: "Не удалось открыть страницу оплаты. Напишите мне — помогу с оплатой.",
    write: { label: "Написать в Telegram", href: links.club, track: "checkout-write" },
    back: { label: "Вернуться к стоимости", href: "/#price" },
    offer: { before: "Условия участия — в ", linkLabel: "публичной оферте", to: "/offer", from: "checkout" },
  },
  success: {
    title: "Спасибо!",
    text: "Как только платёж подтвердится, Вы получите ссылку в закрытый канал потока и дату первой встречи. Если что-то пошло не так — напишите мне.",
    write: { label: "Написать в Telegram", href: links.club, track: "success-write" },
  },
  fail: {
    title: "Платёж не завершён",
    text: "Попробуйте ещё раз или напишите мне — помогу с оплатой.",
    retry: { label: "Вернуться к оплате", href: "/#price" },
    write: { label: "Написать в Telegram", href: links.club, track: "fail-write" },
  },
} as const;

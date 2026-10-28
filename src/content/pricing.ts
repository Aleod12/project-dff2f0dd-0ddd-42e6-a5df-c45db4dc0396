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
    "4 живые встречи с Сергеем",
    "Закрытый канал потока и сопровождение",
    "Бонусные медитации и практики",
    "Ещё 2 недели доступа к архиву",
    "Разовый платёж, без автосписаний",
  ],
  payRub: { label: `Оплатить ${formatPrice("rub")}`, href: "/payment/checkout?currency=rub", track: "pay-rub" },
  payEur: { label: `Оплатить ${formatPrice("eur")}`, href: "/payment/checkout?currency=eur", track: "pay-eur" },
  offerNote: { before: "Нажимая «Оплатить», Вы принимаете условия ", linkLabel: "публичной оферты", href: "/offer" },
  questions: { before: "Остались вопросы?", linkLabel: "Напишите Сергею", href: links.club, track: "price-write" },

  checkout: {
    title: "Оформление",
    accent: "участия",
    summaryLabel: "Ваш заказ",
    noRenewal: "Разовый платёж, без автосписаний",
    disabledText: "Онлайн-оплата подключается. Пока Вы можете вступить в клуб через личные сообщения Сергея.",
    redirecting: "Переходим на страницу оплаты…",
    errorText: "Не удалось открыть страницу оплаты. Напишите Сергею — поможем с оплатой.",
    write: { label: "Написать Сергею", href: links.club, track: "checkout-write" },
    back: { label: "Вернуться к стоимости", href: "/#price" },
  },
  success: {
    title: "Спасибо!",
    text: "Как только платёж подтвердится, Вы получите ссылку в закрытый канал потока и дату первой встречи. Если что-то пошло не так — напишите Сергею.",
    write: { label: "Написать Сергею", href: links.club, track: "success-write" },
  },
  fail: {
    title: "Платёж не завершён",
    text: "Попробуйте ещё раз или напишите Сергею — поможем с оплатой.",
    retry: { label: "Вернуться к оплате", href: "/#price" },
    write: { label: "Написать Сергею", href: links.club, track: "fail-write" },
  },
} as const;

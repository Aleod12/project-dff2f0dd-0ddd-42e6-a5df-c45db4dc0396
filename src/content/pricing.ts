import { links } from "./links";
import { formatPrice } from "./payments";
import { areaList } from "./areas";

/** Section 8 «Стоимость» and the /payment/* pages. Prices come from payments.ts only. */
export const pricing = {
  titleId: "price-title",
  title: "Стоимость",
  accent: "участия",
  clubName: "Клуб «Трансформация»",
  period: "Участие на 1 месяц + 14 дней доступа к записям",
  startLabel: "Старт потока:",
  priceRub: formatPrice("rub"),
  priceEurNote: `или ${formatPrice("eur")} — для зарубежных карт`,
  included: [
    "4 онлайн-встречи — раз в неделю",
    `Трансформация по 4 сферам жизни: ${areaList}`,
    "4 бонусные трансформации в записи — по тем же сферам",
    "2 бонусные практики",
    "Закрытый канал и сопровождение",
    "Записи всех встреч: месяц + 14 дней доступа",
    "Индивидуальное итоговое сканирование поля — после клуба",
    "Разовый платёж, без автосписаний",
  ],
  payRub: { label: `Оплатить ${formatPrice("rub")}`, href: "/payment/checkout?currency=rub", track: "pay-rub" },
  payEur: { label: `Оплатить ${formatPrice("eur")}`, href: "/payment/checkout?currency=eur", track: "pay-eur" },
  abroad: { label: "Оплата из-за рубежа — напишите в службу заботы, подскажем удобный способ", href: links.care, track: "price-abroad" },
  offerNote: { before: "Нажимая «Оплатить», Вы принимаете условия ", linkLabel: "публичной оферты", to: "/offer", from: "price" },
  questions: { before: "Остались вопросы?", linkLabel: "Напишите в службу заботы", href: links.care, track: "price-write" },

  checkout: {
    title: "Оформление",
    accent: "участия",
    summaryLabel: "Ваш заказ",
    noRenewal: "Разовый платёж, без автосписаний",
    disabledText: "Онлайн-оплата подключается. Пока Вы можете вступить в клуб, написав в службу заботы в Telegram.",
    redirecting: "Переходим на страницу оплаты…",
    errorText: "Не удалось открыть страницу оплаты. Напишите в службу заботы — поможем с оплатой.",
    write: { label: "Написать в службу заботы", href: links.care, track: "checkout-write" },
    back: { label: "Вернуться к стоимости", href: "/#price" },
    offer: { before: "Условия участия — в ", linkLabel: "публичной оферте", to: "/offer", from: "checkout" },
  },
  success: {
    title: "Спасибо!",
    text: "Как только платёж подтвердится, Вы получите ссылку в закрытый канал потока и дату первой встречи. Если что-то пошло не так — напишите в службу заботы.",
    write: { label: "Написать в службу заботы", href: links.care, track: "success-write" },
  },
  fail: {
    title: "Платёж не завершён",
    text: "Попробуйте ещё раз или напишите в службу заботы — поможем с оплатой.",
    retry: { label: "Вернуться к оплате", href: "/#price" },
    write: { label: "Написать в службу заботы", href: links.care, track: "fail-write" },
  },
} as const;

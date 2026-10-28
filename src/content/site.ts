import { links } from "./links";

export const site = {
  clubName: "Клуб «Трансформация»",
  hostName: "Сергей Табачников",
  hostNameGenitive: "Сергея Табачникова",
  roles: "Проводник • Энергопрактик",
  signature: "Путь к Силе Души",
  joinLabel: "Вступить в Клуб",
  /** Every «Вступить в Клуб» leads to the price block. */
  joinHref: "/#price",
  fallbackLabel: "Нет Telegram?",
  fallbackLinkLabel: "Напишите во ВКонтакте",
  disclaimer:
    "Практики, которые проводятся в Клубе, не являются медицинской или психотерапевтической помощью и не заменяют консультацию врача или психотерапевта.",
  nav: [
    { label: "Клуб", hash: "club" },
    { label: "Ведущий", hash: "host" },
    { label: "Стоимость", hash: "price" },
    { label: "Вопросы", hash: "faq" },
  ],
  legal: {
    entity: "ИП Табачников Сергей Борисович",
    inn: "742402286284",
    ogrnip: "308742431800021",
    email: "tsergey.soul@gmail.com",
    phone: "+7 995 125-68-00",
    phoneHref: "tel:+79951256800",
    /** Filled later, shown only in the offer. Empty = hidden. */
    address: "",
    bank: "",
  },
  socials: [
    { label: "Telegram", href: links.telegramChannel },
    { label: "ВКонтакте", href: links.vkCommunity },
    { label: "YouTube", href: links.youtube },
  ],
  legalPages: [
    { label: "Политика конфиденциальности", to: "/privacy" },
    { label: "Согласие на обработку данных", to: "/consent" },
    { label: "Публичная оферта", to: "/offer" },
  ],
} as const;

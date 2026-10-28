import { links } from "./links";

export const site = {
  /** Public site address without trailing slash, e.g. "https://example.ru". Empty until the domain exists: then robots.txt has no Sitemap line and sitemap.xml is not served. */
  siteUrl: "",
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
    { label: "Отзывы", hash: "reviews" },
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
    /** Shown ONLY in the offer, never in the footer. */
    address: "457040, Челябинская обл., г. Южноуральск, ул. Мира, д. 49, кв. 11",
    bank: "р/с 40802810507110011057, ПАО «Челиндбанк», г. Челябинск, к/с 30101810400000000711, БИК 047501711",
  },
  socials: [
    { label: "Telegram", href: links.telegramChannel, track: "footer-telegram" },
    { label: "ВКонтакте", href: links.vkCommunity, track: "footer-vk" },
    { label: "YouTube", href: links.youtube, track: "footer-youtube" },
  ],
  legalPages: [
    { label: "Политика в отношении обработки персональных данных", to: "/privacy" },
    { label: "Публичная оферта", to: "/offer" },
    { label: "Согласие на обработку персональных данных", to: "/consent" },
  ],
} as const;

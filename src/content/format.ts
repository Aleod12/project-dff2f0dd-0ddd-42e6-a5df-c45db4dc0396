import { site } from "./site";

/** Section 6 «Как устроен месяц в клубе» — the concrete format and the three steps to join. */
export const monthFormat = {
  /** Heading id, so the section can be labelled by it. */
  titleId: "format-title",
  title: "Как устроен",
  accent: "месяц",
  /** Plain words right after the italic accent. */
  titleSuffix: " в клубе",

  /** Empty value hides the badge or the line. */
  cards: [
    {
      badge: "Раз в неделю",
      title: "Живая встреча с Сергеем",
      text: "Онлайн, лично с Сергеем: 4 встречи за месяц.",
    },
    {
      badge: "Весь месяц",
      title: "Закрытый канал потока",
      text: "Отдельное пространство Вашей группы и сопровождение Сергея.",
    },
    {
      badge: "Бонус",
      title: "Медитации и практики",
      text: "Дополнительные медитации и точечные трансформации между встречами.",
    },
    {
      badge: "После потока",
      title: "Архив +2 недели",
      text: "Ещё две недели доступа к материалам после окончания месяца.",
    },
  ],

  /** How joining works: three steps in order. */
  join: {
    subtitle: "Как присоединиться",
    steps: [
      {
        title: "Нажмите «Вступить в Клуб»",
        text: "Выберите оплату в рублях или в евро.",
      },
      {
        title: "Оплатите участие",
        text: "На защищённой странице платёжного сервиса. Чек придёт на e-mail.",
      },
      {
        title: "Получите доступ",
        text: "Ссылку в закрытый канал потока и дату первой встречи.",
      },
    ],
  },

  cta: {
    label: "Вступить в Клуб",
    href: site.joinHref,
    track: "format-join",
  },
} as const;

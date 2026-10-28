import { links } from "./links";

/** Section 2 «Этот клуб для Вас, если…» — reader recognizes themselves. */
export const pains = {
  /** Heading id, so the section can be labelled by it. */
  titleId: "for-you-title",
  title: "Этот клуб для",
  accent: "Вас",
  /** Plain text right after the italic accent word. */
  titleSuffix: ", если…",
  /** Cards are numbered 01–05 by their order here. */
  items: [
    {
      title: "Устаёте, даже когда отдыхаете",
      text: "Просыпаетесь уже разбитым, выходные не восстанавливают, на новое просто нет сил.",
    },
    {
      title: "Тревога стала фоном",
      text: "Мысли по кругу, напряжение в теле и страх будущего, даже когда всё вроде бы в порядке.",
    },
    {
      title: "В деньгах — стеклянный потолок",
      text: "Только начинаете расти — и следует откат. Больше усилий уже не даёт большего результата.",
    },
    {
      title: "В отношениях один и тот же сценарий",
      text: "Вина, спасательство, тот же типаж людей или повторение семейной истории.",
    },
    {
      title: "Ощущение, что живёте не свою жизнь",
      text: "Внешне всё есть, а внутри пустота, и непонятно, куда двигаться дальше.",
    },
  ],
  /** First-person note under the cards, with Sergey's real portrait. */
  hostNote: {
    text: "Я знаю это изнутри: 27 лет в бизнесе, и однажды драйв просто закончился. Тогда я начал искать не советы, а первопричины.",
    sign: "— Сергей Табачников",
    photoAlt: "Сергей Табачников",
  },
  cta: {
    label: "Узнать, где именно блок — бесплатная диагностика, 2 минуты →",
    href: links.diagnostic,
    track: "pains-diagnostic",
  },
} as const;

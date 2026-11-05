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
      text: "Просыпаетесь уже без сил, выходные не восстанавливают, а на новое просто не хватает энергии.",
    },
    {
      title: "Тревога стала постоянным фоном",
      text: "Мысли крутятся по кругу, в теле напряжение, и трудно расслабиться, даже когда внешне всё спокойно.",
    },
    {
      title: "В деньгах нет желаемого движения",
      text: "Работаете, стараетесь, но финансовая ситуация не меняется так, как хотелось бы. Больше усилий уже не даёт большего результата.",
    },
    {
      title: "В отношениях всё повторяется",
      text: "Снова возникают похожие конфликты и обиды: тот же типаж людей или повторение семейной истории.",
    },
    {
      title: "Кажется, что живёте не свою жизнь",
      text: "Внешне многое в порядке, но внутри не хватает радости, ясности и понимания, куда двигаться дальше.",
    },
  ],
  /** First-person note under the cards, with Sergey's real portrait. */
  hostNote: {
    text: "Я знаю это изнутри: однажды драйв просто закончился, хотя внешне всё было. Тогда я начал искать не советы, а первопричины.",
    sign: "— Сергей Табачников",
    photoAlt: "Сергей Табачников",
  },
  cta: {
    /** Non-breaking space before the arrow so it never wraps onto a line of its own. */
    label: "Узнать, где именно блок — бесплатная диагностика, 2 минуты\u00A0→",
    href: links.diagnostic,
    track: "pains-diagnostic",
  },
} as const;

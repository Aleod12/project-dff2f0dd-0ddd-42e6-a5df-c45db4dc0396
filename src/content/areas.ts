import { links } from "./links";

/** Section 5 «Что даст Вам клуб» — four areas of work: what we take on and the direction, no promises. */
export const areas = {
  /** Heading id, so the section can be labelled by it. */
  titleId: "club-title",
  title: "Что даст Вам",
  accent: "клуб",

  /** One muted line under the title. Empty value hides it. */
  intro: "Месяц работы охватывает четыре сферы жизни.",

  /** Row labels repeated in every card. */
  labels: {
    work: "С чем работаем",
    goal: "К чему идём",
  },

  /** Icon is a key resolved to a component in the section file. */
  items: [
    {
      icon: "leaf",
      title: "Здоровье и энергия",
      work: "хроническая усталость, зажимы в теле, фоновое напряжение",
      goal: "больше сил и спокойный ресурс в теле",
    },
    {
      icon: "wallet",
      title: "Финансы",
      work: "стеклянный потолок, откаты после роста, страх масштаба",
      goal: "внутреннее разрешение расти без отката",
    },
    {
      icon: "heart",
      title: "Отношения",
      work: "созависимость, спасательство, повторяющиеся сценарии",
      goal: "отношения без вины и роли спасателя",
    },
    {
      icon: "compass",
      title: "Предназначение",
      work: "ощущение чужой колеи и потерянного смысла",
      goal: "внутренняя опора и свой вектор",
    },
  ],

  cta: {
    label: "Вступить в Клуб",
    href: links.join,
    track: "club-areas",
  },
} as const;

export type AreaIcon = (typeof areas.items)[number]["icon"];

/** Section «С чем работаем» (#areas) — four areas of work: what we take on and the direction, no promises. */
export const areas = {
  /** Heading id, so the section can be labelled by it. */
  titleId: "areas-title",
  title: "С чем",
  accent: "работаем",

  /** One muted line under the title. Empty value hides it. */
  intro: "Четыре сферы жизни — в каждой ищем первопричину повторяющихся ситуаций.",

  /** Row labels repeated in every card. */
  labels: {
    work: "С чем работаем",
    goal: "К чему идём",
  },

  /** Icon is a key resolved to a component in the section file. */
  items: [
    {
      icon: "leaf",
      title: "Энергия и состояние",
      work: "хроническая усталость, напряжение в теле, фоновая тревога",
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

} as const;

export type AreaIcon = (typeof areas.items)[number]["icon"];

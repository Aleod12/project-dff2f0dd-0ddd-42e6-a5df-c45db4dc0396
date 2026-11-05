import energy400 from "@/assets/areas/area-energy-400.webp.asset.json";
import energy800 from "@/assets/areas/area-energy-800.webp.asset.json";
import finance400 from "@/assets/areas/area-finance-400.webp.asset.json";
import finance800 from "@/assets/areas/area-finance-800.webp.asset.json";
import relations400 from "@/assets/areas/area-relations-400.webp.asset.json";
import relations800 from "@/assets/areas/area-relations-800.webp.asset.json";
import purpose400 from "@/assets/areas/area-purpose-400.webp.asset.json";
import purpose800 from "@/assets/areas/area-purpose-800.webp.asset.json";

const areaImage = (small: { url: string }, large: { url: string }) => ({
  src: large.url,
  srcSet: `${small.url} 400w, ${large.url} 800w`,
  width: 800,
  height: 600,
});

/** Section «С чем работаем» (#areas) — four areas of work: what we take on and the direction, no promises. */
export const areas = {
  /** Heading id, so the section can be labelled by it. */
  titleId: "areas-title",
  title: "С чем",
  accent: "работаем",
  navigation: {
    previous: "Предыдущая сфера",
    next: "Следующая сфера",
    label: "Сферы жизни",
    item: (number: number) => `Сфера ${number}`,
  },

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
      title: "Состояние и энергия",
      image: areaImage(energy400, energy800),
      work: "усталость, которая не проходит после отдыха, тревога и мысли по кругу",
      goal: "больше сил и внутреннего спокойствия",
    },
    {
      icon: "wallet",
      title: "Финансы",
      image: areaImage(finance400, finance800),
      work: "стараетесь, а в деньгах нет желаемого движения",
      goal: "внутреннее разрешение расти",
    },
    {
      icon: "heart",
      title: "Отношения",
      image: areaImage(relations400, relations800),
      work: "похожие конфликты, обиды и ситуации, которые повторяются",
      goal: "отношения без старых повторяющихся сценариев",
    },
    {
      icon: "compass",
      title: "Предназначение",
      image: areaImage(purpose400, purpose800),
      work: "ощущение, что живёте не свою жизнь, не хватает радости и ясности",
      goal: "внутренняя опора и движение по своему пути",
    },
  ],

} as const;

export type AreaIcon = (typeof areas.items)[number]["icon"];

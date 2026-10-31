import { site } from "./site";
import { links } from "./links";

export const hero = {
  eyebrow: "Проводник • Энергопрактик",
  titleLead: "Клуб",
  titleAccent: "«Трансформация»",
  titleName: "Сергея Табачникова",
  signature: "Путь к Силе Души",
  lead: "Когда хочется перемен, а привычные ситуации снова повторяются.",
  sub: "Месяц глубокой работы со мной: 4 живые встречи, работа с первопричинами по четырём сферам жизни и личное итоговое сканирование.",
  facts: ["4 живые встречи со мной", "Личное итоговое сканирование", "Разовая оплата, без автосписаний"],
  primary: { label: "Вступить в Клуб", href: site.joinHref, track: "hero-join" },
  secondary: { label: "Бесплатная диагностика · 2 мин", href: links.diagnostic, track: "hero-diagnostic" },
  photoAlt: "Сергей Табачников — ведущий клуба «Трансформация»",
};

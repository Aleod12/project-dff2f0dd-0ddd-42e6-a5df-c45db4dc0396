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
  facts: [
    { icon: "calendar", label: "4 живые встречи" },
    { icon: "headphones", label: "4 бонусные практики" },
    { icon: "user", label: "Итоговое сканирование" },
    { icon: "messages", label: "Закрытый канал" },
  ],
  primary: { label: "Вступить в Клуб", href: site.joinHref, track: "hero-join" },
  secondary: { label: "Бесплатная диагностика · 2 мин", href: links.diagnostic, track: "hero-diagnostic" },
  photoAlt: "Сергей Табачников — ведущий клуба «Трансформация»",
} as const;

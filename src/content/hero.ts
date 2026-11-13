import { site } from "./site";
import { links } from "./links";
import { areaList } from "./areas";

export const hero = {
  eyebrow: "Энергопрактик · Проводник",
  titleLead: "Клуб",
  titleAccent: "«Трансформация»",
  titleName: "Сергея Табачникова",
  signature: "Путь к Силе Души",
  lead: "Когда усталость, сомнения и привычные переживания мешают двигаться дальше.",
  sub: `Месяц глубокой работы: 4 онлайн-встречи по 4 сферам жизни — ${areaList}. А также бонусные трансформации в записи и индивидуальное итоговое сканирование.`,
  subShort: `Месяц глубокой работы в группе: ${areaList}.`,
  facts: [
    { icon: "calendar", label: "4 онлайн-встречи" },
    { icon: "play", label: "4 бонусные трансформации" },
    { icon: "headphones", label: "2 бонусные практики" },
    { icon: "user", label: "Итоговое сканирование" },
  ],
  primary: { label: "Вступить в Клуб", href: site.joinHref, track: "hero-join" },
  secondary: { label: "Бесплатная диагностика · 2 мин", href: links.diagnostic, track: "hero-diagnostic" },
  photoAlt: "Сергей Табачников — ведущий клуба «Трансформация»",
} as const;

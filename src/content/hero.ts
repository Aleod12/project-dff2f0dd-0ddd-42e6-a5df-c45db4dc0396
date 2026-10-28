import { site } from "./site";
import { links } from "./links";

export const hero = {
  eyebrow: "Проводник • Энергопрактик",
  titleLead: "Клуб",
  titleAccent: "«Трансформация»",
  titleName: "Сергея Табачникова",
  signature: "Путь к Силе Души",
  lead: "Месяц системной работы: снимаем зажимы — меняем сценарии.",
  sub: "Для тех, кто устал ходить по кругу старых решений.",
  facts: ["4 живые онлайн-встречи", "4 сферы жизни", "Разовая оплата, без автосписаний"],
  primary: { label: "Вступить в Клуб", href: site.joinHref, track: "hero-join" },
  secondary: { label: "Бесплатная диагностика · 2 мин", href: links.diagnostic, track: "hero-diagnostic" },
  photoAlt: "Сергей Табачников — ведущий клуба «Трансформация»",
};

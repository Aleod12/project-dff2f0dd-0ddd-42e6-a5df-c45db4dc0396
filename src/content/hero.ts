import { links } from "./links";

export const hero = {
  eyebrow: "Проводник • Энергопрактик",
  titleLead: "Клуб",
  titleAccent: "«Трансформация»",
  titleName: "Сергея Табачникова",
  signature: "Путь к Силе Души",
  lead: "Месяц системной работы: снимаем зажимы — меняем сценарии.",
  sub: "Для тех, кто устал ходить по кругу старых решений.",
  facts: ["4 живые встречи с Сергеем", "4 сферы жизни", "Разовая оплата, без автосписаний"],
  primary: { label: "Вступить в Клуб", href: links.join, track: "hero-join" },
  secondary: { label: "Сначала — бесплатная диагностика, 2 минуты", href: links.diagnostic, track: "hero-diagnostic" },
  photoAlt: "Сергей Табачников — ведущий клуба «Трансформация»",
};

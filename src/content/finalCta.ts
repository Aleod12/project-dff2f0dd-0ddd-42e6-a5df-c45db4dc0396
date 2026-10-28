import { links } from "./links";
import { site } from "./site";

export const finalCta = {
  titleId: "start-title",
  title: "Ваш путь начинается с",
  accent: "одного шага",
  text: "Если Вы устали ходить по кругу старых решений и чувствуете готовность увидеть первопричину своей ситуации — я рядом. Начните с бесплатной диагностики или присоединяйтесь к ближайшему потоку клуба.",
  sign: "— Сергей Табачников",
  motto: site.signature,
  photoAlt: "Сергей Табачников",
  join: { label: site.joinLabel, href: "#price", track: "final-join" },
  test: { label: "Бесплатная диагностика · 2 мин", href: links.diagnostic, track: "final-test" },
  fallback: { before: site.fallbackLabel, label: site.fallbackLinkLabel, href: links.vkMessages, track: "final-vk" },
} as const;

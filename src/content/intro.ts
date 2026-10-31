import { links } from "./links";
import { site } from "./site";

/** Section «Знакомство с методом» (#intro). */
export const intro = {
  titleId: "intro-title",
  title: "Хотите сначала",
  accent: "почувствовать",
  titleSuffix: " метод?",
  lead: "Начните с диагностики: за 2 минуты увидите, где сейчас уходит энергия — в теле, в эмоциях или в повторяющемся сценарии. По результату можно записаться на личное сканирование со мной — оно проходит один раз.",
  badge: "без оплаты",
  path: [
    { title: "Диагностика", note: "2 минуты" },
    { title: "Результат по трём шкалам", note: "" },
    { title: "Личное сканирование", note: "30 минут в Zoom, один раз" },
  ],
  main: { label: "Пройти диагностику", href: links.diagnostic, track: "intro-test" },
  moreLabel: "Ещё способы познакомиться:",
  more: [
    { label: "Аудиопрактика «Трансформация» (около часа)", href: links.audioPractice, track: "intro-practice" },
    { label: "Открытые онлайн-встречи — в моём Telegram-канале", href: links.telegramChannel, track: "intro-channel" },
  ],
  backLabel: "Готовы к глубокой работе?",
  join: { label: "Вступить в Клуб", href: site.joinHref, track: "intro-join" },
};

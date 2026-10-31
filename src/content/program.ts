import { site } from "./site";

/** Section «Как устроена программа» (#club): three stages + how to join. */
export const program = {
  titleId: "club-title",
  title: "Как устроена",
  accent: "программа",
  intro: "Месяц работы в группе — от первой встречи до личного итога.",
  navigation: {
    label: "Этапы программы",
    item: (number: number) => `Этап ${number}`,
    previous: "Предыдущий этап",
    next: "Следующий этап",
  },
  /** Duration of the final scanning. Empty → stage 3 badge says «каждому участнику». */
  finalScanDuration: "",
  stages: [
    {
      label: "ЭТАП 1",
      title: "Основная работа",
      lines: ["4 живые онлайн-встречи со мной, раз в неделю", "Глубокие трансформации по четырём сферам жизни", "Время встреч согласовываем вместе с группой"],
      badge: "4 встречи",
    },
    {
      label: "ЭТАП 2",
      title: "Поддержка",
      lines: ["Сразу после оплаты — вход в закрытый канал", "4 бонусные практики — доступны сразу", "Моё сопровождение в канале"],
      badge: "весь месяц",
    },
    {
      label: "ЭТАП 3",
      title: "Личный итог",
      lines: ["Индивидуальное итоговое сканирование со мной", "После месяца работы в группе", "Входит в стоимость участия"],
      badge: "каждому участнику",
      highlight: true,
    },
  ],
  recordings: "Все встречи записываются: записи и материалы доступны месяц и ещё 14 дней после.",
  join: {
    subtitle: "Как присоединиться",
    steps: [
      { title: "Нажмите «Вступить в Клуб»", text: "И перейдите к оплате." },
      { title: "Оплатите участие", text: "На защищённой странице платёжного сервиса. Чек придёт на e-mail." },
      { title: "Сразу получите доступ", text: "Ссылку в закрытый канал, 4 бонусные практики и дату первой встречи." },
    ],
  },
  cta: { label: "Вступить в Клуб", href: site.joinHref, track: "program-join" },
};

/** Badge of a stage: the final one shows the scanning duration once it is known. */
export function stageBadge(i: number, duration = program.finalScanDuration): string {
  const s = program.stages[i]!;
  return "highlight" in s && s.highlight && duration.trim() ? duration : s.badge;
}

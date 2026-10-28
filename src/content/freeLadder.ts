import { links } from "./links";

/** Section 9 «Начните бесплатно» (#free). Empty badge = hidden. */
const practiceDuration = "";

export const freeLadder = {
  titleId: "free-title",
  title: "Не готовы сразу?",
  accent: "Начните",
  titleSuffix: " бесплатно",
  lead: "Познакомьтесь с Сергеем и методом без оплаты — в своём темпе.",
  /** Duration of the audio practice — fill in later. */
  practiceDuration,
  steps: [
    {
      badge: "2 минуты",
      title: "Диагностика",
      text: "5 вопросов в Telegram-боте покажут, где сейчас уходит энергия: в теле, в эмоциях или в повторяющемся сценарии.",
      button: { label: "Пройти диагностику", href: links.diagnostic, track: "free-test" },
    },
    {
      badge: practiceDuration,
      title: "Аудиопрактика «Трансформация»",
      text: "Авторская практика центрирования и снятия фонового напряжения. Понадобятся наушники и спокойное время.",
      button: { label: "Послушать практику", href: links.audioPractice, track: "free-practice" },
    },
    {
      badge: "30 минут · Zoom",
      title: "Сканирование",
      text: "Личная встреча с Сергеем: ищем корень Вашего блока и намечаем маршрут к ресурсу. Запись — после диагностики.",
      button: { label: "Записаться", href: links.scanning, track: "free-scan" },
    },
    {
      badge: "Раз в месяц",
      title: "Открытые встречи",
      text: "Бесплатная онлайн-встреча для всех. Ссылка публикуется в Telegram-канале Сергея.",
      button: { label: "Перейти в канал", href: links.telegramChannel, track: "free-channel" },
    },
  ],
};

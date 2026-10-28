import { links } from "./links";
import poster1 from "@/assets/reviews/review-1-poster.webp.asset.json";
import poster2 from "@/assets/reviews/review-2-poster.webp.asset.json";
import poster3 from "@/assets/reviews/review-3-poster.webp.asset.json";
import video1 from "@/assets/reviews/review-1.mp4.asset.json";
import video2 from "@/assets/reviews/review-2.mp4.asset.json";
import video3 from "@/assets/reviews/review-3.mp4.asset.json";

export type VideoReview = {
  id: string;
  name: string;
  age?: string;
  summary?: string;
  fallbackLabel: string;
  duration: string;
  video?: string;
  /** Empty poster shows a neutral circle with the play button. */
  poster: string;
  posterSize?: number;
  embedUrl?: string;
};

export type QuoteReview = { name: string; text: string };

export const reviews = {
  titleId: "reviews-title",
  title: "Истории",
  accent: "участников",
  playLabel: "Смотреть видеоотзыв",
  pauseLabel: "Пауза",
  resumeLabel: "Продолжить",
  closeLabel: "Закрыть видео",
  modalCloseLabel: "Закрыть",
  dotsLabel: "Видеоотзывы",
  dotLabel: (n: number) => `Видеоотзыв ${n}`,
  videos: [
    { id: "v1", name: "", summary: "", fallbackLabel: "Видеоотзыв участницы", duration: "29 сек", video: video1.url, poster: poster1.url, posterSize: 400 },
    { id: "v2", name: "", summary: "", fallbackLabel: "Видеоотзыв участника", duration: "51 сек", video: video2.url, poster: poster2.url, posterSize: 344 },
    { id: "v3", name: "", summary: "", fallbackLabel: "Видеоотзыв участницы", duration: "39 сек", video: video3.url, poster: poster3.url, posterSize: 400 },
    {
      id: "v4",
      name: "",
      summary: "",
      fallbackLabel: "Видеоотзыв участницы",
      duration: "1 мин 24 сек",
      // review_vk_poster.jpg not received yet — empty until uploaded.
      poster: "",
      embedUrl: "https://vk.ru/video_ext.php?oid=-236528362&id=456239041&hash=videos-236528362&autoplay=1",
    },
  ] as VideoReview[],
  quotes: [
    {
      name: "Татьяна",
      text: "Хочу сказать огромное спасибо за труд и помощь. Пройдя первую трансформацию, было ощущение, будто заново родилась. Продолжая проходить трансформации — жизнь заиграла новыми красками.",
    },
    {
      name: "Ольга",
      text: "Огромная благодарность за эти ощущения, погружение. Каждая трансформация — это очень глубокая работа, до которой самостоятельно очень сложно добраться.",
    },
  ] as QuoteReview[],
  consent: "Отзывы опубликованы с согласия участников.",
  cta: {
    label: "Узнать, где именно блок — бесплатная диагностика, 2 минуты\u00A0→",
    href: links.diagnostic,
    track: "reviews-test",
  },
};

/** Name (with age if set), or the fallback label when the name is empty. */
export const reviewTitle = (r: VideoReview) => {
  if (!r.name.trim()) return r.fallbackLabel;
  return r.age?.trim() ? `${r.name}, ${r.age}` : r.name;
};

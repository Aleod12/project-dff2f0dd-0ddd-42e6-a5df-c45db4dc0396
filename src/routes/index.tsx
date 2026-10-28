import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { ForYou } from "@/components/sections/ForYou";

const title = "Клуб «Трансформация» Сергея Табачникова — месяц системной работы";
const description =
  "Онлайн-клуб с Сергеем Табачниковым: 4 живые встречи, 4 сферы жизни — здоровье, финансы, отношения, предназначение. Разовая оплата, без автосписаний.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return <Hero />;
}

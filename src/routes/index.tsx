import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { ForYou } from "@/components/sections/ForYou";
import { RootCause } from "@/components/sections/RootCause";
import { Host } from "@/components/sections/Host";
import { Areas } from "@/components/sections/Areas";
import { MonthFormat } from "@/components/sections/MonthFormat";
import { Price } from "@/components/sections/Price";

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
  return (
    <>
      <Hero />
      <ForYou />
      <RootCause />
      <Host />
      <Areas />
      <MonthFormat />
      <Price />
    </>
  );
}

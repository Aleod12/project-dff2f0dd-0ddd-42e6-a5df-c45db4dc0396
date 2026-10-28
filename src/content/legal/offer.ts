import { site } from "../site";
import type { LegalDoc } from "./types";

const l = site.legal;
const fill = (v: string, label: string) => (v.trim() ? v : `[ЗАПОЛНИТЬ: ${label}]`);

export const offer: LegalDoc = {
  title: "Публичная оферта",
  updated: "[ЗАПОЛНИТЬ: дата]",
  sections: [
    { id: "general", heading: "1. Общие положения", paragraphs: [
      `${l.entity} (далее — Исполнитель) предлагает заключить договор на участие в онлайн-программе «${site.clubName}» на условиях настоящей оферты.`,
    ] },
    { id: "subject", heading: "2. Предмет договора", paragraphs: [
      "Исполнитель проводит месячную онлайн-программу: 4 живые встречи (раз в неделю), бонусные медитации, закрытый канал группы, сопровождение, доступ к архиву ещё 2 недели после потока.",
      site.disclaimer,
    ] },
    { id: "price", heading: "3. Стоимость и оплата", paragraphs: [
      "Стоимость участия — 9 990 ₽ или 100 € для зарубежных карт. Оплата разовая, автоматических списаний нет.",
      "[ЗАПОЛНИТЬ: способ оплаты, момент акцепта.]",
    ] },
    { id: "refund", heading: "4. Возврат", paragraphs: ["[ЗАПОЛНИТЬ: условия возврата.]"] },
    { id: "requisites", heading: "5. Реквизиты Исполнителя", paragraphs: [
      `${l.entity}, ИНН ${l.inn}, ОГРНИП ${l.ogrnip}.`,
      `Адрес: ${fill(l.address, "адрес")}.`,
      `Банковские реквизиты: ${fill(l.bank, "банковские реквизиты")}.`,
      `E-mail: ${l.email}. Телефон: ${l.phone}.`,
    ] },
  ],
};

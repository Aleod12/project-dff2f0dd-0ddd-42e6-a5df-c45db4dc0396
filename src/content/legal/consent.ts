import { site } from "../site";
import type { LegalDoc } from "./types";

const l = site.legal;

export const consent: LegalDoc = {
  title: "Согласие на обработку персональных данных",
  updated: "[ЗАПОЛНИТЬ: дата]",
  sections: [
    { id: "subject", heading: "1. Кому даётся согласие", paragraphs: [
      `Я даю согласие ${l.entity} (ИНН ${l.inn}, ОГРНИП ${l.ogrnip}) на обработку моих персональных данных.`,
    ] },
    { id: "data", heading: "2. Перечень данных", paragraphs: ["[ЗАПОЛНИТЬ: имя, контакт в мессенджере, e-mail, телефон.]"] },
    { id: "purpose", heading: "3. Цели и действия", paragraphs: ["[ЗАПОЛНИТЬ: цели обработки и перечень действий с данными.]"] },
    { id: "term", heading: "4. Срок и отзыв", paragraphs: [
      `Согласие действует до его отзыва. Отозвать согласие можно, написав на ${l.email}.`,
    ] },
  ],
};

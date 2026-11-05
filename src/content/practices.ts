/** Section «Бонусные практики» (#practices). Hidden until Sergey confirms the names. */
export const practices: { confirmed: boolean; titleId: string; title: string; accent: string; intro: string; items: { title: string; note: string }[] } = {
  confirmed: false,
  titleId: "practices-title",
  title: "Бонусные",
  accent: "практики",
  intro: "Бонусные практики для самостоятельной работы между встречами — в закрытом канале.",
  items: [
    { title: "", note: "" },
    { title: "", note: "" },
  ],
};

export function showPractices(p = practices): boolean {
  return p.confirmed && p.items.length === 2 && p.items.every((i) => i.title.trim() !== "");
}

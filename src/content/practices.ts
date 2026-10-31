/** Section «Бонусные практики» (#practices). Hidden until Sergey confirms the names. */
export const practices: { confirmed: boolean; titleId: string; title: string; accent: string; intro: string; items: { title: string; note: string }[] } = {
  confirmed: false,
  titleId: "practices-title",
  title: "Бонусные",
  accent: "практики",
  intro: "Аудиопрактики для самостоятельной работы между встречами. Доступны сразу после входа в канал.",
  items: [
    { title: "", note: "" },
    { title: "", note: "" },
    { title: "", note: "" },
    { title: "", note: "" },
  ],
};

export function showPractices(p = practices): boolean {
  return p.confirmed && p.items.length === 4 && p.items.every((i) => i.title.trim() !== "");
}

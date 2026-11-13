/** Section 3 — recurring situations and the path of a club meeting. */
export const rootCause = {
  /** Heading id, so the section can be labelled by it. */
  titleId: "root-cause-title",
  title: "Почему ситуации",
  accent: "повторяются",
  /** Plain words right after the italic accent. */
  titleSuffix: "?",

  /** Short thesis. The paragraph at `emphasizedIndex` is shown larger and in the primary color. */
  thesis: [
    "Вы принимаете решения, стараетесь, пробуете новое — а жизнь снова возвращается в привычную колею.",
    "Дело не в силе воли. Внешние усилия не помогают, если причина глубже — в привычных реакциях и внутренних установках.",
    "Советы вроде «просто отдохните» или «думайте позитивно» помогают ненадолго и не касаются первопричины.",
  ],
  emphasizedIndex: 1,

  /** Four links of the same closed loop, in order. */
  nodes: [
    {
      title: "Знакомая ситуация",
      text: "то, что уже не раз случалось",
    },
    {
      title: "Привычная реакция",
      text: "эмоция или мысль, которая включается сама",
    },
    {
      title: "Повторяющееся поведение",
      text: "действуем так же, как раньше",
    },
    {
      title: "Похожий результат",
      text: "тот же конфликт, та же усталость",
    },
  ],

  /** One line under the diagram. */
  conclusion: "Иногда внешние обстоятельства меняются, а привычные реакции и убеждения остаются прежними. На встречах клуба я обращаю внимание на внутренние ограничения и жизненные запросы, которые человек хочет исследовать и изменить.",
} as const;

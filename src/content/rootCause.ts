/** Section 3 «Почему действия не меняют сценарий» — the problem has a hidden root, not a lack of effort. */
export const rootCause = {
  /** Heading id, so the section can be labelled by it. */
  titleId: "root-cause-title",
  title: "Почему действия",
  accent: "не меняют",
  /** Plain words right after the italic accent. */
  titleSuffix: " сценарий",

  /** Short thesis. The paragraph at `emphasizedIndex` is shown larger and in the primary color. */
  thesis: [
    "Вы принимаете решения, стараетесь, пробуете новое — а жизнь снова возвращается в привычную колею.",
    "Дело не в силе воли. Логика и внешние усилия не помогают, если корень напряжения глубже — в подсознательных программах и зажатой энергии.",
    "Советы вроде «просто отдохните» или «думайте позитивно» лишь приглушают симптом и не касаются первопричины.",
  ],
  emphasizedIndex: 1,

  /** Three links of the same closed loop, in order. */
  nodes: [
    {
      title: "Внутреннее напряжение",
      text: "зажим в теле и фоновая тревога, к которым Вы привыкли",
    },
    {
      title: "Скрытая программа",
      text: "убеждение или семейный сценарий, который включается сам",
    },
    {
      title: "Повторяющийся результат",
      text: "тот же откат, тот же конфликт, та же усталость",
    },
  ],

  /** Small label by the return arrow on phones. */
  loopLabel: "и круг замыкается",

  /** One line under the diagram. */
  conclusion: "Круг замыкается. В клубе мы работаем с первым звеном — через тело и состояние.",
} as const;

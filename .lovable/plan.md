# Content + structure update (approved by Sergey)

Design system, tokens, fonts, components and payment architecture stay as they are. Tests follow the new copy.

## 1. New home order
Hero → For you → Why → **Как устроена программа (#club)** → **С чем работаем (#areas)** → **Бонусные практики (#practices, hidden)** → Ведущий (#host, moved) → Истории участников (#reviews) → Стоимость (#price) → **Знакомство с методом (#intro)** → FAQ → Final CTA (#start).
- Header (desktop): Программа, Ведущий, Отзывы, Стоимость, Вопросы.
- Island tones reassigned so no two neighbours match, both with and without the practices section; #start remains the only dark island. Sticky bar logic unchanged.

## 2. Section changes
- **Hero**: new lead, sub (also on mobile) and 3 facts; buttons unchanged.
- **Why**: new conclusion; node 1 text without «зажим».
- **Как устроена программа** (replaces «Как устроен месяц»): title, muted line, 3 stage cards (row with thin line + gold diamonds on desktop, stacked on mobile), stage 3 highlighted on sage with a gold diamond, badge shows `finalScanDuration` or «каждому участнику»; recordings line; «Как присоединиться» 3 exact steps; «Вступить в Клуб» + Telegram fallback.
- **С чем работаем**: new title/muted line, card 1 renamed «Энергия и состояние»; bottom CTA and fallback removed.
- **Бонусные практики**: new content file `{ confirmed: false, items: 4 × {title, note} }`; rendered only when confirmed and all titles filled; 2×2 / 1 column, light numbers 01–04, no images/icons.
- **Ведущий**: moved only.
- **Истории участников**: male review (review-2) removed with its files/import/tests; 3 videos in order 3, 4, 1, centered on desktop. Fix desktop «Читать текст» so the full-width panel appears with gold ring on the active circle; mobile bottom sheet kept. Quote cards: initial avatar (40px sage circle, primary letter) + name on top, text below, gold quote mark top-right, 24px gap.
- **Стоимость**: new included list (7 items, exact order), new period line; `payments.eurEnabled = false` hides € button and «или 100 €» line and shows «Оплата из-за рубежа — напишите мне, подскажу удобный способ» linking to the Telegram DM (links.club). € price stays in config.
- **Знакомство с методом** (replaces free-steps section): title, lead, one wide card with «без оплаты» badge and horizontal 3-step path (stacked on phones), «Пройти диагностику» (intro-test); «Ещё способы познакомиться:» with two text links (intro-practice, intro-channel); «Готовы к глубокой работе?» + outline «Вступить в Клуб» → #price (intro-join). Word «бесплатно» at most once.
- **FAQ**: Q2, Q3, Q6 rewritten; new Q «Что такое итоговое сканирование?»; JSON-LD follows automatically.
- **Final CTA**: new text.

## 3. Global replacements
Search all content (including legal) for «точечн… трансформац…», «системн… работ…», «в удобное для Вас время», «зажим…», «Начните бесплатно», «без оплаты — в своём темпе»; rewrite in context. Offer 2.2 gets the two new items with `[ЗАПОЛНИТЬ]` for scanning duration/timing. Report every occurrence (file + old → new).

## 4. Checks and report
- Tests updated/added: new order and anchors, stage 3 badge fallback, practices hidden rule, 3 reviews without review-2, desktop transcript panel visible after click, eurEnabled toggling, intro data-cta and «бесплатно» count, no «зажим» anywhere, FAQ/JSON-LD.
- No horizontal scroll at 360/390/768/1024/1280/1440; header anchors land with titles visible; AA contrast on new cards.
- Screenshots 1280 and 390 of listed sections. «Бонусные практики» is hidden, so its screenshot will be taken in a temporary in-browser preview only (no change left on the site).
- List of changed files.

## Technical notes
- New: `src/content/program.ts`, `practices.ts`, `intro.ts`; `sections/Program.tsx`, `Practices.tsx`, `Intro.tsx`. Remove `format.ts`/`MonthFormat.tsx`, `freeLadder.ts`/`FreeLadder.tsx` (join steps move into program.ts).
- data-cta of the old sections replaced by unique new ones (program-join, vk-fallback-program, etc.); old fallback ids for areas/free removed.
- Transcript bug: inspect the desktop panel's breakpoint/visibility class after the mobile sheet rework and restore the panel rendering ≥768px.

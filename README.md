# Клуб Трансформация

Plan only — do not write code yet.

PROJECT
A website that sells «Трансформационный клуб» (Club «Трансформация») led by Sergey Tabachnikov — «Проводник • Энергопрактик». The expert IS the brand: his real face, name and voice must be present from the first screen and throughout the page (unlike typical competitor sites that hide the expert at the bottom).
Sergey's personal motto «Путь к Силе Души» is used as a small italic signature near his name, not as the main headline.
All user-facing copy in Russian, addressing the reader as «Вы» (capitalized). Tone: calm, warm, respectful, honest, zero pressure.

AUDIENCE
Entrepreneurs and leaders 40–45+, men and women: chronic fatigue, background anxiety, "glass ceiling" in money, repeating scenarios in relationships, the feeling of "living not my own life". Sergey himself has 27 years in business (production, textile factory, retail chain) — he speaks their language.

PRODUCT
Club «Трансформация»: 1 month of systematic work in 4 areas — Здоровье, Финансы, Отношения, Предназначение. 4 live online meetings (once a week) with Sergey, bonus meditations, a private channel for the group, personal support, +2 weeks of archive access. Price 9 990 ₽ or 100 € (foreign cards), one-time payment, no auto-renewal.
Free soft entry for those not ready: 2-minute diagnostic test, audio practice, 30-minute personal «Сканирование» in Zoom (only after the test), monthly open online meetings.

HOW CONVERSION WORKS (important constraints)
- No payment, no forms and no personal data collection on the site in v1. Every CTA is an external link to Telegram (bot or Sergey's DM). Next to main CTAs: a small fallback link to VK for people without Telegram.
- No fake urgency (no countdown timers, no crossed-out prices), no guarantees, no medical promises, no pseudo-science claims, no "№1". A visible disclaimer: practices are not medical or psychotherapeutic help.
- Only real photos of Sergey. No AI-generated people, no stock faces, no esoteric clichés (chakras, glowing auras, galaxies).

PAGES
/ (main landing), /privacy, /consent, /offer, 404.

HOME SECTIONS (propose layout and content elements for each, keep this order)
1. Hero — Sergey's photo (transparent PNG cut-out on a warm light background), eyebrow «Трансформационный клуб», H1 with the club name and Sergey's name, subline «Месяц системной работы: снимаем зажимы — меняем сценарии», fact row (4 живые встречи · 4 сферы жизни · без автосписаний), primary CTA «Вступить в Клуб», secondary CTA «Сначала — бесплатная диагностика, 2 минуты».
2. «Этот клуб для Вас, если…» — 5 numbered pain cards.
3. «Почему действия не меняют сценарий» — the root-cause idea (inner tension and subconscious programs, not lack of effort).
4. «Ведущий клуба» — Sergey's story: 27 years in business → crisis of emptiness → search → his method; a round welcome video; numbers from his practice.
5. «Что даст Вам клуб» — the 4 areas.
6. «Как устроен месяц в клубе» — format cards with frequency badges (Раз в неделю / Каждый день / Бонус / После потока).
7. Reviews — round video reviews + text quotes.
8. Price — 9 990 ₽ / 100 €, what's included, «без автосписаний», CTA, «Нет Telegram?» fallback.
9. «Не готовы сразу? Начните бесплатно» — 4-step free ladder.
10. FAQ.
11. Final CTA.
Footer: IP requisites, legal links, disclaimer, socials (Telegram, VK, YouTube only).

DESIGN DIRECTION
Calm premium, lots of air, warm light wall with olive-branch shadows (matches existing photos). Sections as rounded "islands" on the background.
Colors: background #FBF7F1, surface/wall #F3ECE2, text #1F2A26, primary (headings, buttons) #41665B, secondary blocks #A9BFB3 and light sage #E3EBE6, accent gold #E3C765 ONLY for thin lines, small icons and the signature divider — never for text on light backgrounds.
Fonts with Cyrillic: headings Cormorant Garamond (uppercase with letter-spacing for the name, italic for accent words), body Manrope.
Signature element: thin line with a small diamond in the center (──◆──) under section titles.
Headline pattern: plain word + italic serif accent word.
Mobile-first, flawless at 360px, WCAG AA contrast.

DELIVERABLE OF THIS PLAN
1. Section-by-section layout proposal (desktop and mobile).
2. Component and content-file structure (all copy and links in src/content/*.ts).
3. Design tokens you will create.
4. Assets you will need from me (sizes, formats).
5. Your questions before building.
Then wait for my approval. We will build one section at a time.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/dff2f0dd-0ddd-42e6-a5df-c45db4dc0396).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

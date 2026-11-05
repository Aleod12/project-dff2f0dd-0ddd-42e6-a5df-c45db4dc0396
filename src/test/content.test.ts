import { describe, expect, it, vi } from "vitest";
import { faq, faqJsonLd, answerText } from "@/content/faq";
import { payments, formatPrice, parseCurrency } from "@/content/payments";
import { site } from "@/content/site";
import { hero } from "@/content/hero";
import { startCheckout } from "@/lib/checkout";
import { pricing } from "@/content/pricing";
import { links } from "@/content/links";
import { pains } from "@/content/pains";
import { rootCause } from "@/content/rootCause";
import { host } from "@/content/host";
import { areas } from "@/content/areas";
import { program, stageBadge } from "@/content/program";
import { practices, showPractices } from "@/content/practices";
import { intro } from "@/content/intro";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { isPresent } from "@/lib/present";

describe("content rules", () => {
  it("hero facts use the client-approved labels and order", () => {
    expect(hero.facts.map((fact) => fact.label)).toEqual([
      "4 онлайн-встречи",
      "4 бонусные трансформации",
      "2 бонусные практики",
      "Итоговое сканирование",
    ]);
  });
  it("hero final scanning is not described as personal", () => {
    expect(hero.sub).not.toMatch(/личн/i);
  });
  it("prices come only from payments.ts: 9990 ₽ and 100 €", () => {
    expect(payments.prices).toEqual({ rub: 9990, eur: 100 });
    expect(pricing.priceRub).toBe(formatPrice("rub"));
    expect(pricing.payRub.label).toBe(`Оплатить ${formatPrice("rub")}`);
    expect(pricing.payEur.label).toBe(`Оплатить ${formatPrice("eur")}`);
    expect(formatPrice("rub", { rub: 12000, eur: 1 })).toBe("12\u00A0000\u00A0₽");
  });
  it("price list says no auto-renewal", () => {
    expect(pricing.included).toContain("Разовый платёж, без автосписаний");
  });
  it("price list is the agreed seven items in order", () => {
    expect(pricing.included).toEqual([
      "4 живые встречи со мной — раз в неделю",
      "Глубокие трансформации по четырём сферам жизни",
      "4 бонусные практики — сразу после входа в канал",
      "Закрытый канал и моё сопровождение",
      "Записи всех встреч: месяц + 14 дней доступа",
      "Личное итоговое сканирование",
      "Разовый платёж, без автосписаний",
    ]);
    expect(pricing.period).toBe("Участие на 1 месяц + 14 дней доступа к записям");
  });
  it("euro payment is off until the provider is confirmed; € price kept", () => {
    expect(payments.eurEnabled).toBe(false);
    expect(payments.prices.eur).toBe(100);
    expect(pricing.abroad.label).toBe("Оплата из-за рубежа — напишите мне, подскажу удобный способ");
    expect(pricing.abroad.href).toBe(links.club);
  });
  it("unknown checkout currency falls back to rubles", () => {
    expect(parseCurrency("usd")).toBe("rub");
    expect(parseCurrency("eur")).toBe("eur");
  });
  it("every «Вступить в Клуб» points to #price", () => {
    expect(site.joinHref).toBe("/#price");
    expect(hero.primary.href).toBe("/#price");
    expect(program.cta.href).toBe("/#price");
    expect(intro.join.href).toBe("/#price");
  });
  it("checkout with payments disabled never calls createPayment", async () => {
    const create = vi.fn();
    const r = await startCheckout({ enabled: false }, "rub", create);
    expect(r.kind).toBe("disabled");
    expect(create).not.toHaveBeenCalled();
  });
  it("every link is an https URL", () => {
    for (const v of Object.values(links)) expect(v).toMatch(/^https:\/\//);
  });
  it("«Написать в Telegram» goes to Sergey's Telegram", () => {
    expect(links.club).toBe("https://t.me/STabachnikov");
  });
  it("empty values are hidden", () => {
    expect(isPresent("")).toBe(false);
    expect(isPresent("   ")).toBe(false);
    expect(isPresent(undefined)).toBe(false);
    expect(isPresent([])).toBe(false);
    expect(isPresent("27")).toBe(true);
  });
  it("stream start is empty so the date block stays hidden", () => {
    expect(isPresent(payments.streamStartDate)).toBe(false);
  });
  it("section 2 has exactly five pains, in the agreed order", () => {
    expect(pains.items.map((i) => i.title)).toEqual([
      "Устаёте, даже когда отдыхаете",
      "Тревога стала фоном",
      "В деньгах — стеклянный потолок",
      "В отношениях один и тот же сценарий",
      "Ощущение, что живёте не свою жизнь",
    ]);
  });
  it("every pain card has its own explanation line", () => {
    for (const item of pains.items) {
      expect(isPresent(item.text)).toBe(true);
    }
  });
  it("pain CTA is the free diagnostic in the bot", () => {
    expect(pains.cta.href).toBe(links.diagnostic);
    expect(pains.cta.track).toBe("pains-diagnostic");
    expect(pains.cta.label).toBe("Узнать, где именно блок — бесплатная диагностика, 2 минуты\u00A0→");
  });
  it("Sergey's note under the cards is signed and keeps the 27 years", () => {
    expect(pains.hostNote.sign).toBe("— Сергей Табачников");
    expect(pains.hostNote.text).toBe("Я знаю это изнутри: однажды драйв просто закончился, хотя внешне всё было. Тогда я начал искать не советы, а первопричины.");
  });

  it("header order follows the approved section anchors", () => {
    expect(site.nav.map((n) => n.label)).toEqual(["Программа", "Ведущий", "Отзывы", "Стоимость", "Вопросы"]);
    expect(site.nav.map((n) => n.hash)).toEqual(["club", "host", "reviews", "price", "faq"]);
  });
  it("section 3 has three links of the loop, in the agreed order", () => {
    expect(rootCause.nodes.map((n) => n.title)).toEqual([
      "Внутреннее напряжение",
      "Скрытая программа",
      "Повторяющийся результат",
    ]);
    for (const node of rootCause.nodes) expect(isPresent(node.text)).toBe(true);
  });
  it("section 3 emphasizes the paragraph about the hidden root", () => {
    expect(rootCause.thesis[rootCause.emphasizedIndex]).toContain("Дело не в силе воли");
    expect(rootCause.thesis).toHaveLength(3);
  });
  it("section 3 closes the loop without inventing new promises", () => {
    expect(rootCause.conclusion).toBe(
      "Круг замыкается. В клубе мы работаем с первопричиной — через тело и состояние.",
    );
  });
  it("section 4 scan CTA goes to the bot scanning link", () => {
    expect(host.cta.href).toBe(links.scanning);
    expect(host.cta.track).toBe("host-scan");
  });
  it("section 4 practice numbers match the agreed draft", () => {
    expect(host.numbers.map((n) => n.value)).toEqual(["27 лет", "150+", "120+", "10"]);
    expect(host.numbersCaption).toBe("по моей практике");
  });
  it("section 5 has the four areas in the agreed order, both rows filled", () => {
    expect(areas.items.map((i) => i.title)).toEqual([
      "Энергия и состояние",
      "Финансы",
      "Отношения",
      "Предназначение",
    ]);
    for (const item of areas.items) {
      expect(isPresent(item.work)).toBe(true);
      expect(isPresent(item.goal)).toBe(true);
    }
  });
  it("section 5 names the direction without promising a result", () => {
    expect(areas.items.map((i) => i.goal)).toEqual([
      "больше сил и спокойный ресурс в теле",
      "внутреннее разрешение расти без отката",
      "отношения без вины и роли спасателя",
      "внутренняя опора и свой вектор",
    ]);
  });
  it("program: three stages with exact badges; final badge falls back while duration is empty", () => {
    expect(program.stages.map((s) => s.title)).toEqual(["Основная работа", "Поддержка", "Личный итог"]);
    expect(program.finalScanDuration).toBe("");
    expect([0, 1, 2].map((i) => stageBadge(i))).toEqual(["4 встречи", "весь месяц", "каждому участнику"]);
    expect(stageBadge(2, "60 минут")).toBe("60 минут");
    expect(program.join.steps.map((s) => s.title)).toEqual(["Нажмите «Вступить в Клуб»", "Оплатите участие", "Сразу получите доступ"]);
    expect(program.cta.track).toBe("program-join");
  });
  it("practices stay hidden until confirmed with four names", () => {
    expect(practices.confirmed).toBe(false);
    expect(showPractices()).toBe(false);
    const items = [1, 2, 3, 4].map((n) => ({ title: `П${n}`, note: "" }));
    expect(showPractices({ ...practices, confirmed: true, items })).toBe(true);
    expect(showPractices({ ...practices, confirmed: true, items: [...items.slice(0, 3), { title: "", note: "" }] })).toBe(false);
  });
});

describe("intro section", () => {
  it("diagnostic is the main path, two quiet links, join back to price", () => {
    expect(intro.main).toEqual({ label: "Пройти диагностику", href: links.diagnostic, track: "intro-test" });
    expect(intro.more.map((m) => [m.href, m.track])).toEqual([[links.audioPractice, "intro-practice"], [links.telegramChannel, "intro-channel"]]);
    expect(intro.join.track).toBe("intro-join");
  });
  it("«бесплатно» appears at most once", () => {
    expect((JSON.stringify(intro).match(/бесплатн/gi) ?? []).length).toBeLessThanOrEqual(1);
  });
});

describe("banned words", () => {
  const isTestPath = (path: string) => /[\\/]test[\\/]/.test(path);
  it("excludes test directories with Windows and Linux separators, but scans content", () => {
    expect(isTestPath("C:\\project\\src\\test\\content.test.ts")).toBe(true);
    expect(isTestPath("/project/src/test/content.test.ts")).toBe(true);
    expect(isTestPath("/project/src/content/intro.ts")).toBe(false);
  });
  it("no «зажим», «точечн… трансформац», «системн… работ», «в удобное для Вас время» in the site", () => {
    const walk = (d: string): string[] => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
    const hits = walk(join(process.cwd(), "src"))
      .filter((f) => /\.(tsx?)$/.test(f) && !isTestPath(f))
      .filter((f) => /зажим|точечн\S* трансформац|системн\S* работ|в удобное для Вас время/i.test(readFileSync(f, "utf8")));
    expect(hits).toEqual([]);
  });
});

describe("section 10 faq", () => {
  it("has 10 questions and matching FAQPage data", () => {
    expect(faq.items).toHaveLength(11);
    expect(faqJsonLd().mainEntity).toHaveLength(11);
  });
  it("no answer mentions the MAX platform", () => {
    const all = faq.items.map((i) => `${i.q} ${answerText(i.a)}`).join(" ");
    expect(all).not.toMatch(/МАКС|MAX/i);
  });
  it("missed-meeting answer names recordings and the archive window", () => {
    expect(answerText(faq.items[3]!.a)).toBe("Все встречи записываются — записи остаются в закрытом канале потока. Доступ: 1 месяц + 2 недели архива, чтобы спокойно пересмотреть материалы.");
  });
  it("auto-renewal answer repeats one-time payment", () => {
    expect(answerText(faq.items[4]!.a)).toBe("Нет. Вы оплачиваете ровно один месяц участия разовым платежом, без автосписаний. Продление — только по Вашему решению.");
  });
  it("«no Telegram» answer links «ВКонтакте» to VK messages", () => {
    expect(answerText(faq.items[6]!.a)).toBe("Напишите мне во ВКонтакте — подскажу.");
    expect(faq.items[6]!.a.find((p) => p.href)).toEqual({ text: "ВКонтакте", href: links.vkMessages });
  });
  it("stream answer has no date line while the date is empty", () => {
    expect(faq.items[8]!.a[0]!.text).toBe("Дату старта я сообщаю в Telegram-канале и при вступлении в клуб.");
  });
});

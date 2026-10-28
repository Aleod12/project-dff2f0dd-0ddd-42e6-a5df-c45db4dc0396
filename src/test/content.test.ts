import { describe, expect, it, vi } from "vitest";
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
import { monthFormat } from "@/content/format";
import { isPresent } from "@/lib/present";

describe("content rules", () => {
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
  it("price list promises recordings plus two weeks of archive", () => {
    expect(pricing.included).toContain("Записи всех встреч + 2 недели доступа к архиву");
    expect(pricing.included.some((s) => s.startsWith("Ещё 2 недели"))).toBe(false);
  });
  it("unknown checkout currency falls back to rubles", () => {
    expect(parseCurrency("usd")).toBe("rub");
    expect(parseCurrency("eur")).toBe("eur");
  });
  it("every «Вступить в Клуб» points to #price", () => {
    expect(site.joinHref).toBe("/#price");
    expect(hero.primary.href).toBe("/#price");
    expect(areas.cta.href).toBe("/#price");
    expect(monthFormat.cta.href).toBe("/#price");
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
    expect(pains.hostNote.text).toContain("27 лет в бизнесе");
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
      "Круг замыкается. В клубе мы работаем с первым звеном — через тело и состояние.",
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
      "Здоровье и энергия",
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
  it("section 5 button is the club link with its own tracking tag", () => {
    expect(areas.cta.href).toBe(site.joinHref);
    expect(areas.cta.track).toBe("club-areas");
    expect(areas.cta.label).toBe("Вступить в Клуб");
  });
  it("section 6 has the four format cards in the agreed order, each with a frequency badge", () => {
    expect(monthFormat.cards.map((c) => c.title)).toEqual([
      "Живая встреча",
      "Закрытый канал потока",
      "Медитации и практики",
      "Архив +2 недели",
    ]);
    expect(monthFormat.cards.map((c) => c.badge)).toEqual([
      "Раз в неделю",
      "Весь месяц",
      "Бонус",
      "После потока",
    ]);
    for (const card of monthFormat.cards) expect(isPresent(card.text)).toBe(true);
  });
  it("archive card says all recordings stay available two weeks longer", () => {
    expect(monthFormat.cards[3]!.text).toBe("Записи всех встреч и материалы остаются доступны ещё две недели после окончания месяца.");
  });
  it("section 6 joining is three steps in the agreed order", () => {
    expect(monthFormat.join.subtitle).toBe("Как присоединиться");
    expect(monthFormat.join.steps.map((s) => s.title)).toEqual([
      "Нажмите «Вступить в Клуб»",
      "Оплатите участие",
      "Получите доступ",
    ]);
    expect(monthFormat.join.steps[1].text).toContain("Чек придёт на e-mail");
  });
  it("section 6 button is the club link with its own tracking tag", () => {
    expect(monthFormat.cta.href).toBe(site.joinHref);
    expect(monthFormat.cta.track).toBe("format-join");
  });
});

import { freeLadder } from "@/content/freeLadder";
describe("section 9 free ladder", () => {
  it("has four steps with their own bot/channel links and tags", () => {
    expect(freeLadder.steps.map((s) => s.button.track)).toEqual(["free-test", "free-practice", "free-scan", "free-channel"]);
    expect(freeLadder.steps[0]!.button.href).toBe(links.diagnostic);
    expect(freeLadder.steps[3]!.button.href).toBe(links.telegramChannel);
  });
  it("practice badge shows «около часа»", () => {
    expect(freeLadder.steps[1]!.badge).toBe("около часа");
  });
});

import { faq, faqJsonLd, answerText } from "@/content/faq";
describe("section 10 faq", () => {
  it("has 10 questions and matching FAQPage data", () => {
    expect(faq.items).toHaveLength(10);
    expect(faqJsonLd().mainEntity).toHaveLength(10);
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

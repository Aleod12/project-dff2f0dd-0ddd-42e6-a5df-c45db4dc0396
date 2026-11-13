import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { privacy } from "@/content/legal/privacy";
import { consent } from "@/content/legal/consent";
import { offer } from "@/content/legal/offer";
import type { LegalDoc } from "@/content/legal/types";

/**
 * Guardrails from the crash test of a competitor's legal documents (13.11.2026).
 * Each test blocks a known unlawful or misleading pattern from coming back in a future edit.
 */
const sectionsText = (sections: LegalDoc["sections"]) =>
  sections.flatMap((s) => s.blocks.flatMap((b) => (b.type === "p" ? [b.text] : b.type === "list" ? b.items : [...b.columns, ...b.rows.flat()]))).join("\n");
const textOf = (doc: LegalDoc) => [doc.intro ?? "", sectionsText(doc.sections)].join("\n");
const section = (doc: LegalDoc, id: string) => {
  const s = doc.sections.find((x) => x.id === id);
  if (!s) throw new Error(`${doc.key}: section ${id} missing`);
  return sectionsText([s]);
};
const all = [privacy, consent, offer].map((d) => ({ key: d.key, text: textOf(d) }));

describe("legal guardrails", () => {
  it("1. visiting the site is never treated as consent", () => {
    for (const d of all) expect(d.text, d.key).not.toMatch(/безоговорочн\w* согласи|(использовани\w*|посещени\w*) Сайта означает|согласи\w* в момент начала использования/i);
    expect(section(privacy, "s1")).toMatch(/Посещение Сайта само по себе не считается согласием/);
  });

  it("2. no excessive data: passport, birth date/place, home address are not collected", () => {
    const table = privacy.sections.find((s) => s.id === "s2")?.blocks.find((b) => b.type === "table");
    if (table?.type !== "table") throw new Error("privacy purposes table missing");
    const dataColumn = table.rows.map((r) => r[2]).join(" ");
    expect(dataColumn).not.toMatch(/паспорт|дата рождения|место рождения|адрес (места )?проживания|регистрации по месту/i);
    expect(section(privacy, "s2")).toMatch(/не запрашивает паспортные данные/);
    expect(section(offer, "s6")).toMatch(/Паспортные данные и подпись на бумаге не требуются/);
  });

  it("3. advertising needs its own consent: never bundled with payment, the policy or the general consent", () => {
    expect(section(offer, "s8")).toMatch(/Оплата участия не означает согласия на рекламные рассылки/);
    expect(section(privacy, "s2")).toMatch(/рекламные рассылки[^.]*\.[^.]*только с отдельного согласия/);
    expect(section(consent, "s2")).toMatch(/не даёт права направлять мне рекламные рассылки/);
    for (const d of all) expect(d.text, d.key).not.toMatch(/(даёт|дает|выражает) согласие на (получение )?реклам/i);
  });

  it("4. no mandatory pre-trial claim and no shortened consumer deadlines", () => {
    for (const d of all) expect(d.text, d.key).not.toMatch(/обязательным является предъявление претензии|досудебн\w* порядок обязател|в течение 3 \(трёх\) (календарных )?дней/i);
    expect(section(offer, "s9")).toMatch(/вправе обратиться в суд по своему выбору/);
    expect(section(offer, "s6")).toMatch(/отказаться от договора в любое время/);
    expect(section(offer, "s6")).toMatch(/10 дней со дня получения заявления/);
  });

  it("5. cross-border transfer is described honestly for the foreign services we use", () => {
    const s6 = section(privacy, "s6");
    expect(s6).toMatch(/Telegram/);
    expect(s6).toMatch(/Zoom/);
    expect(s6).toMatch(/ст\. 12 Закона/);
    expect(s6).not.toMatch(/не осуществляет трансграничн/i);
  });

  it("6. the cookie section matches the code: no cookies, no analytics or third-party counters", () => {
    expect(section(privacy, "s3")).toMatch(/не использует файлы cookie/);
    expect(section(privacy, "s3")).toMatch(/sessionStorage/);
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        if (statSync(p).isDirectory()) {
          if (!["test", "ui"].includes(name)) walk(p);
        } else if (/\.(ts|tsx)$/.test(name) && !/\.test\.tsx?$/.test(name)) files.push(p);
      }
    };
    walk(join(process.cwd(), "src"));
    const code = files.map((f) => readFileSync(f, "utf8")).join("\n");
    expect(code).not.toMatch(/document\.cookie|mc\.yandex|metrika|googletagmanager|gtag\(|google-analytics|tildacdn|tilda-stat/i);
  });

  it("offer: no fixed fines, no subscription trick, no educational-services framing", () => {
    const o = textOf(offer);
    expect(o).not.toMatch(/штраф|абонентск/i);
    expect(o).not.toMatch(/образовательн\w* услуг/i);
    expect(o).toMatch(/не являются образовательной деятельностью/);
    expect(o).toMatch(/ст\. 1301 ГК РФ/);
  });

  it("offer: a refusal by the Executor always refunds the unprovided part", () => {
    expect(section(offer, "s5")).toMatch(/возвращается стоимость неоказанных услуг/);
  });

  it("privacy: every service that receives data is listed — including Planerka used by the bot for booking", () => {
    const s5 = section(privacy, "s5");
    for (const service of [/Робокасса/, /Telegram-бот/, /Планёрка/, /Zoom/, /хостинг-провайдер/]) expect(s5).toMatch(service);
  });
});

/** All external links of the site. Change a link here only. */
export const links = {
  /** «Вступить в Клуб». Later replaced by payment links. */
  join: "https://t.me/STabachnikov",
  /** Payment slots for the price block (₽ / €). Both go to Sergey's DM for now. */
  payRub: "https://t.me/STabachnikov",
  payEur: "https://t.me/STabachnikov",
  diagnostic: "https://t.me/st_soulpower_bot?start=test_site",
  audioPractice: "https://t.me/st_soulpower_bot?start=trans_site",
  scanning: "https://t.me/st_soulpower_bot?start=scan_site",
  telegramChannel: "https://t.me/SergeySsoul",
  vkMessages: "https://vk.me/ts.soul",
  vkCommunity: "https://vk.ru/ts.soul",
  youtube: "https://www.youtube.com/@st.soulpower",
} as const;

export type LinkKey = keyof typeof links;

/** All external links of the site. Change a link here only. */
export const links = {
  /** Sergey's Telegram DM — used only for «Написать Сергею». */
  club: "https://t.me/STabachnikov",
  diagnostic: "https://t.me/st_soulpower_bot?start=test_site",
  audioPractice: "https://t.me/st_soulpower_bot?start=trans_site",
  scanning: "https://t.me/st_soulpower_bot?start=scan_site",
  telegramChannel: "https://t.me/SergeySsoul",
  vkMessages: "https://vk.me/ts.soul",
  vkCommunity: "https://vk.ru/ts.soul",
  youtube: "https://www.youtube.com/@st.soulpower",
} as const;

export type LinkKey = keyof typeof links;

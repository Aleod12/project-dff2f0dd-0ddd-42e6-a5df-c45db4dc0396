/** All external links of the site. Change a link here only. */
export const links = {
  /** Sergey's Telegram DM — used for «Написать в Telegram». */
  club: "https://t.me/STabachnikov",
  /** Служба заботы. ВРЕМЕННО — личка Сергея; заменить на ссылку бота службы заботы. */
  care: "https://t.me/STabachnikov",
  diagnostic: "https://t.me/st_soulpower_bot?start=test_site",
  audioPractice: "https://t.me/st_soulpower_bot?start=trans_site",
  scanning: "https://t.me/st_soulpower_bot?start=scan_site",
  telegramChannel: "https://t.me/SergeySsoul",
  vkMessages: "https://vk.me/ts.soul",
  vkCommunity: "https://vk.ru/ts.soul",
  maxProfile: "https://max.ru/u/f9LHodD0cOKxtbdXtw0XWZ3u5rYQBaeG2Ybf2mBzJGPPdCOvma__utTlA1g",
  youtube: "https://www.youtube.com/@st.soulpower",
} as const;

export type LinkKey = keyof typeof links;

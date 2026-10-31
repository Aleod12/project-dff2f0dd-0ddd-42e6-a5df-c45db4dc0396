<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- All user-facing copy and every external link live in `src/content/*.ts` (links only in `links.ts`); components hold no copy — so texts can change without touching layout.
- Empty content values hide their element (use `isPresent` from `src/lib/present.ts`); never invent placeholder facts.
- All colors/fonts/shadows are tokens in `src/styles.css`; components use semantic classes only. No dark theme.
- Header, footer and mobile sticky CTA are mounted once in `src/routes/__root.tsx`; home sections go in `src/components/sections/`, one file each.
- No forms or personal data on the site. «Вступить в Клуб» CTAs scroll to #price; prices and the on/off switch live only in `src/content/payments.ts`; online payment goes through `createPayment` (server, stub until a provider is connected) and is confirmed only by a signed provider notification — so turning payment on never touches the design.
- Fonts are self-hosted woff2 in public/fonts (@font-face in src/styles.css); never load Google Fonts — no visitor IP transfer to Google.
- Area photo sources and responsive variants are mapped in content items, not presentation components, so media can change independently of layout.
- robots.txt and sitemap.xml are generated server routes from site.siteUrl (src/lib/seoFiles.ts); while siteUrl is empty there is no Sitemap line and sitemap.xml returns 404.
- Uploaded photos/videos are self-hosted in public/media and their .asset.json `url` points to /media/<file> — the production Node server cannot serve Lovable's asset CDN paths.
- Production build for own Node hosting: `NITRO_PRESET=node-server npm run build`, run `node .output/server/index.mjs` (PORT env); the Lovable editor build keeps its own preset.
- Canonical, og:url and og:image come only from `pageSeo()` in src/lib/siteUrl.ts (reads site.siteUrl; emits nothing while empty) — so one domain value drives every absolute URL.
- Legal documents are block data in src/content/legal/*.ts rendered by LegalPage; every link to /privacy|/offer|/consent carries a whitelisted ?from= (src/content/legal/nav.ts) so the back link can return to the origin section; release is blocked by a test while [ЗАПОЛНИТЬ] remains and siteUrl is set.

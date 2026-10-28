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

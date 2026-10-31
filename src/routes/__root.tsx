import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useRouterState,
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { setCameFromSite } from "@/lib/legalFrom";
import { showStickyCta } from "@/lib/stickyCta";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { Island } from "@/components/layout/Island";
import { DiamondDivider } from "@/components/brand/DiamondDivider";

function NotFoundComponent() {
  useEffect(() => {
    document.title = "Страница не найдена — Клуб «Трансформация»";
  }, []);
  return (
    <Island tone="surface" className="flex flex-col items-center gap-6 text-center">
      <meta name="robots" content="noindex, nofollow" />
      <p className="font-display text-7xl text-secondary">404</p>
      <h1 className="text-h2">
        Страница <em className="italic">не найдена</em>
      </h1>
      <DiamondDivider />
      <p className="max-w-md text-muted-foreground">Возможно, ссылка устарела. Давайте вернёмся на главную.</p>
      <Link to="/" className="inline-flex min-h-12 items-center rounded-full bg-primary px-7 font-semibold text-primary-foreground shadow-cta hover:bg-primary-hover">
        На главную
      </Link>
    </Island>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-app items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl">Страница не загрузилась</h1>
        <p className="mt-2 text-sm text-muted-foreground">Что-то пошло не так. Попробуйте обновить страницу.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
          >
            Попробовать снова
          </button>
          <a href="/" className="inline-flex min-h-11 items-center rounded-full border border-primary px-5 text-sm font-semibold text-primary hover:bg-sage">
            На главную
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "color-scheme", content: "light" },
      { title: "Клуб «Трансформация» — Сергей Табачников" },
      { name: "description", content: "Месяц глубокой работы с Сергеем Табачниковым: энергия и состояние, финансы, отношения, предназначение." },
      { name: "author", content: "Сергей Табачников" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ru_RU" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#FBF7F1" },
    ],
    links: [
      // Self-hosted fonts: preload the two Cyrillic files used on the first screen.
      { rel: "preload", href: "/fonts/cormorant-garamond-normal-cyrillic.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/manrope-normal-cyrillic.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useRouterState({ select: (s) => s.location });
  const firstLoad = useRef(true);
  // Flag for «back» on document pages: false after a fresh load, true after any in-site navigation in this tab.
  useEffect(() => {
    setCameFromSite(!firstLoad.current);
    firstLoad.current = false;
  }, [location.href]);
  // First load with /#anchor: put the section in place instantly after hydration, then enable smooth scrolling for clicks.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    const raf = requestAnimationFrame(() => document.documentElement.classList.add("smooth-scroll"));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-app flex-col">
        <SiteHeader />
        <main className="flex-1 pt-3">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      {showStickyCta(location.pathname) && <MobileStickyCta />}
    </QueryClientProvider>
  );
}

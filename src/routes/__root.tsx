import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { Island } from "@/components/layout/Island";
import { DiamondDivider } from "@/components/brand/DiamondDivider";

function NotFoundComponent() {
  return (
    <Island tone="surface" className="flex flex-col items-center gap-6 text-center">
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
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
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Клуб «Трансформация» — Сергей Табачников" },
      { name: "description", content: "Месяц системной работы с Сергеем Табачниковым: здоровье, финансы, отношения, предназначение." },
      { name: "author", content: "Сергей Табачников" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ru_RU" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#FBF7F1" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;500;600&display=swap&subset=cyrillic",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
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

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main className="pt-3">
        <Outlet />
      </main>
      <SiteFooter />
      <MobileStickyCta />
    </QueryClientProvider>
  );
}

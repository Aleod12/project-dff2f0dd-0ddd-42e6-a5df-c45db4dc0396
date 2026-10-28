import { Link } from "@tanstack/react-router";
import { site } from "@/content/site";
import { CtaButton } from "@/components/brand/CtaButton";
import { Container } from "./Container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 pt-[env(safe-area-inset-top)] border-b border-border/60 bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-3 sm:gap-4">
        <Link to="/" className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap max-[359px]:w-min max-[359px]:whitespace-normal text-name text-xs leading-tight text-primary sm:text-base" aria-label={`${site.hostName} — на главную`}>
          {site.hostName}
        </Link>
        <nav aria-label="Разделы" className="hidden lg:block">
          <ul className="flex items-center gap-6 whitespace-nowrap text-sm lg:gap-8 font-medium">
            {site.nav.map((item) => (
              <li key={item.hash}>
                <Link to="/" hash={item.hash} className="inline-flex min-h-11 items-center text-foreground transition-colors hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <CtaButton href={site.joinHref} track="header-join" size="sm">
          {site.joinLabel}
        </CtaButton>
      </Container>
    </header>
  );
}

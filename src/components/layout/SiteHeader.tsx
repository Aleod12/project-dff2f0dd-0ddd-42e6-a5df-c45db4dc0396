import { Link } from "@tanstack/react-router";
import { site } from "@/content/site";
import { CtaButton } from "@/components/brand/CtaButton";
import { Container } from "./Container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="shrink-0 whitespace-nowrap text-name text-xs leading-tight text-primary sm:text-base" aria-label={`${site.hostName} — на главную`}>
          {site.hostName}
        </Link>
        <nav aria-label="Разделы" className="hidden md:block">
          <ul className="flex items-center gap-6 whitespace-nowrap text-sm lg:gap-8 font-medium">
            {site.nav.map((item) => (
              <li key={item.hash}>
                <Link to="/" hash={item.hash} className="text-foreground transition-colors hover:text-primary">
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

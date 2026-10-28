import { Link } from "@tanstack/react-router";
import { site } from "@/content/site";
import { DiamondDivider } from "@/components/brand/DiamondDivider";
import { Signature } from "@/components/brand/Signature";
import { Container } from "./Container";

export function SiteFooter() {
  const l = site.legal;
  return (
    <footer id="site-footer" className="mt-8 pb-8">
      <Container>
        <div className="rounded-island bg-surface px-5 py-12 sm:px-10">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <p className="text-name text-primary">{site.hostName}</p>
              <p className="text-sm text-muted-foreground">{site.roles}</p>
              <Signature className="text-lg" />
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <p className="font-semibold">{l.entity}</p>
              <p>ИНН {l.inn}</p>
              <p>ОГРНИП {l.ogrnip}</p>
              <a href={`mailto:${l.email}`} className="text-primary underline underline-offset-4 hover:no-underline">{l.email}</a>
              <a href={l.phoneHref} className="text-primary underline underline-offset-4 hover:no-underline">{l.phone}</a>
            </div>

            <div className="flex flex-col gap-6 text-sm">
              <ul className="flex flex-col gap-2">
                {site.legalPages.map((p) => (
                  <li key={p.to}>
                    <Link to={p.to} className="text-foreground underline-offset-4 hover:text-primary hover:underline">{p.label}</Link>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-wrap gap-3" aria-label="Соцсети">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center rounded-full border border-primary px-4 font-medium text-primary hover:bg-sage">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <DiamondDivider className="my-8 justify-center" />
          <p className="mx-auto max-w-3xl text-center text-sm text-muted-foreground">{site.disclaimer}</p>
          <p className="mt-4 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} {site.hostName}</p>
        </div>
      </Container>
    </footer>
  );
}

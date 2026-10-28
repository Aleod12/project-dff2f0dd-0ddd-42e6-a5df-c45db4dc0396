import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold transition-colors focus-visible:outline-2 min-h-12 px-7 py-3 text-base",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-cta hover:bg-primary-hover",
        outline: "border border-primary text-primary bg-transparent hover:bg-sage",
        ghost: "text-primary underline underline-offset-4 hover:no-underline px-0 min-h-0",
      },
      size: {
        md: "",
        sm: "min-h-10 px-4 py-2 text-sm whitespace-nowrap sm:px-5",
      },
      block: { true: "w-full sm:w-auto", false: "" },
    },
    defaultVariants: { variant: "primary", size: "md", block: false },
  },
);

type Props = VariantProps<typeof ctaVariants> & {
  href: string;
  children: React.ReactNode;
  /** Tag for future analytics */
  track?: string;
  className?: string;
};

const isInternal = (href: string) => href.startsWith("/") || href.startsWith("#");

/** Smooth-scroll to an anchor on the current page instead of reloading. */
function scrollToAnchor(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  const hashAt = href.indexOf("#");
  if (hashAt < 0) return;
  const path = href.slice(0, hashAt) || window.location.pathname;
  if (path !== window.location.pathname) return;
  const target = document.getElementById(href.slice(hashAt + 1));
  if (!target) return;
  e.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  window.history.replaceState(null, "", href.slice(hashAt));
}

/** CTA link. External links (Telegram / VK) open in a new tab; internal ones stay on the site. */
export function CtaButton({ href, children, track, variant, size, block, className }: Props) {
  const cls = cn(ctaVariants({ variant, size, block }), className);
  if (isInternal(href)) {
    return (
      <a href={href} data-cta={track} className={cls} onClick={(e) => scrollToAnchor(e, href)}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" data-cta={track} className={cls}>
      {children}
    </a>
  );
}

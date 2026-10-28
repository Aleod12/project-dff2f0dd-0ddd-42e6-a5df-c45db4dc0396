import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { CtaButton } from "@/components/brand/CtaButton";
import { cn } from "@/lib/utils";

/** Phone-only fixed CTA: appears after the first screen, hides while the footer is visible. */
export function MobileStickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const onScroll = () =>
      setPastHero(hero ? hero.getBoundingClientRect().bottom <= 0 : window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const footer = document.getElementById("site-footer");
    const io = footer ? new IntersectionObserver(([e]) => setFooterVisible(!!e?.isIntersecting)) : null;
    if (footer && io) io.observe(footer);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const show = pastHero && !footerVisible;
  return (
    <div
      aria-hidden={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 p-3 backdrop-blur transition-transform duration-300 md:hidden",
        show ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
    >
      <CtaButton href={site.joinHref} track="sticky-join" className="w-full">
        {site.joinLabel}
      </CtaButton>
    </div>
  );
}

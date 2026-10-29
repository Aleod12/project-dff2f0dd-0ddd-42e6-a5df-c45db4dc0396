import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { CtaButton } from "@/components/brand/CtaButton";
import { cn } from "@/lib/utils";

/** Phone-only fixed CTA: appears after the first screen, hides while the footer is visible. */
export function MobileStickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      setPastHero(hero ? hero.getBoundingClientRect().bottom <= 0 : window.scrollY > window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target));
      setFooterVisible(visible.size > 0);
    });
    // Hide while the footer, the price block (where the button leads) or the final section is on screen.
    // The home sections may render a few frames after this bar (client navigation back to "/"), so wait for them.
    let frame = 0;
    let tries = 0;
    const observe = () => {
      const price = document.getElementById("price");
      if (!price && tries++ < 120) {
        frame = requestAnimationFrame(observe);
        return;
      }
      ["site-footer", "price", "start"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) io.observe(el);
      });
      onScroll();
    };
    observe();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const sheetOpen = useUiFlag("sheet-open");
  const show = pastHero && !footerVisible && !sheetOpen;
  useEffect(() => {
    setUiFlag("sticky-visible", show);
  }, [show]);
  useEffect(() => () => setUiFlag("sticky-visible", false), []);
  return (
    <div
      aria-hidden={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 md:hidden",
        show ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
    >
      <CtaButton href={site.joinHref} track="sticky-join" className="w-full">
        {site.joinLabel}
      </CtaButton>
    </div>
  );
}

import { useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { LegalFrom } from "@/content/legal/nav";
import { backHref, backLabel, backTarget, cameFromSite } from "@/lib/legalFrom";
import { cn } from "@/lib/utils";

/** Quiet inline «back» link: history back when the visitor came from our site in this tab, otherwise to the origin section. */
export function LegalBackLink({ from, className }: { from?: LegalFrom | undefined; className?: string }) {
  const router = useRouter();
  const navigate = useNavigate();
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (cameFromSite() && window.history.length > 1) router.history.back();
    else void navigate(backTarget(from));
  };
  return (
    <a
      href={backHref(from)}
      onClick={onClick}
      data-legal-back
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-md font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 print:hidden",
        className,
      )}
    >
      <ArrowLeft className="size-[18px] shrink-0" aria-hidden="true" />
      <span>{backLabel(from)}</span>
    </a>
  );
}

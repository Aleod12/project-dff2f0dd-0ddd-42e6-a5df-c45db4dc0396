import { cn } from "@/lib/utils";

/** Signature element: ──◆── in gold. Decorative. */
export function DiamondDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex items-center gap-3", className)}>
      <span className="h-px w-12 bg-gold" />
      <span className="size-2 rotate-45 bg-gold" />
      <span className="h-px w-12 bg-gold" />
    </div>
  );
}

import { cn } from "@/lib/utils";

export function FrequencyBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex w-fit self-start items-center rounded-full bg-secondary px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.06em] text-secondary-foreground", className)}>
      {children}
    </span>
  );
}

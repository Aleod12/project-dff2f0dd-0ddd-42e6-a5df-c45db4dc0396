import { cn } from "@/lib/utils";

export function FrequencyBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex w-fit self-start items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground", className)}>
      {children}
    </span>
  );
}

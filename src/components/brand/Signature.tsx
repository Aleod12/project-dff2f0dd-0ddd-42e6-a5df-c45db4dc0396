import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Signature({ className }: { className?: string }) {
  return <p className={cn("font-display text-xl italic text-primary", className)}>{site.signature}</p>;
}

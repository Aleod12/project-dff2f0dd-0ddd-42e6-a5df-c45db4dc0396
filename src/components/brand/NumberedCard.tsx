import { cn } from "@/lib/utils";

export function NumberedCard({ index, title, text, className }: { index: number; title: string; text?: string; className?: string }) {
  return (
    <article className={cn("flex flex-col gap-3 rounded-2xl bg-card p-6 shadow-island", className)}>
      <span aria-hidden="true" className="font-display text-4xl text-secondary">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="text-2xl">{title}</h3>
      {text && <p className="text-muted-foreground">{text}</p>}
    </article>
  );
}

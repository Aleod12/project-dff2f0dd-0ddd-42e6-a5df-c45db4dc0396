import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export const transcriptLabels = { open: "Читать текст", close: "Скрыть текст" };

type ButtonProps = { open: boolean; onToggle: () => void; controls: string; className?: string };

/** Small text button of a transcript disclosure. */
export function TranscriptButton({ open, onToggle, controls, className }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={controls}
      className={cn("text-sm font-semibold text-primary underline underline-offset-4 hover:no-underline", className)}
    >
      {open ? transcriptLabels.close : transcriptLabels.open}
    </button>
  );
}

/** Transcript text: always in the HTML, collapsed visually when closed. */
export function TranscriptPanel({ id, open, text, label, className }: { id: string; open: boolean; text: string; label?: string; className?: string }) {
  return (
    <div id={id} className={cn(open ? "block" : "hidden", "rounded-card bg-background p-5 text-left text-[17px] leading-relaxed shadow-island md:p-7", className)}>
      {label && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-muted-foreground">{label}</p>}
      <p>{text}</p>
    </div>
  );
}

/** Self-contained disclosure: button plus panel right under it. */
export function Transcript({ text, className }: { text: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={cn("flex w-full flex-col items-center gap-3", className)}>
      <TranscriptButton open={open} onToggle={() => setOpen((o) => !o)} controls={id} />
      <TranscriptPanel id={id} open={open} text={text} />
    </div>
  );
}

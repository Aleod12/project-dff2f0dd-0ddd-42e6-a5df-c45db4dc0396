import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  count: number;
  current: number;
  goTo: (index: number) => void;
  label: string;
  itemLabel: (number: number) => string;
  previous?: string;
  next?: string;
};

export function MobileSwipeNavigation({ count, current, goTo, label, itemLabel, previous, next }: Props) {
  return (
    <div className="mt-3 flex items-center justify-center gap-1 md:hidden" role="group" aria-label={label}>
      {previous && <Button variant="outline" size="icon" disabled={current === 0} onClick={() => goTo(current - 1)} aria-label={previous} className="mr-auto size-11 rounded-full border-primary bg-background text-primary disabled:opacity-30"><ChevronLeft aria-hidden="true" /></Button>}
      {Array.from({ length: count }, (_, index) => (
        <Button key={index} variant="ghost" size="icon" onClick={() => goTo(index)} aria-label={itemLabel(index + 1)} aria-current={current === index ? "true" : undefined} className="size-11 rounded-full">
          <span aria-hidden="true" className={cn("h-2 rounded-full", current === index ? "w-5 bg-primary" : "w-2 bg-primary/75")} />
        </Button>
      ))}
      {next && <Button variant="outline" size="icon" disabled={current === count - 1} onClick={() => goTo(current + 1)} aria-label={next} className="ml-auto size-11 rounded-full border-primary bg-background text-primary disabled:opacity-30"><ChevronRight aria-hidden="true" /></Button>}
    </div>
  );
}
import { links } from "@/content/links";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function TelegramFallback({ cta, className }: { cta: string; className?: string }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {site.fallbackLabel}{" "}
      <a href={links.vkMessages} target="_blank" rel="noopener noreferrer" data-cta={cta} className="inline-flex min-h-11 items-center font-medium text-primary underline underline-offset-4 hover:no-underline">
        {site.fallbackLinkLabel}
      </a>
    </p>
  );
}

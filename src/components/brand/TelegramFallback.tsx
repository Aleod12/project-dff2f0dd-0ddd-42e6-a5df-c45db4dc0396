import { links } from "@/content/links";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function TelegramFallback({ className }: { className?: string }) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {site.fallbackLabel}{" "}
      <a href={links.vkMessages} target="_blank" rel="noopener noreferrer" data-cta="vk-fallback" className="font-medium text-primary underline underline-offset-4 hover:no-underline">
        {site.fallbackLinkLabel}
      </a>
    </p>
  );
}

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold transition-colors focus-visible:outline-2 min-h-12 px-7 py-3 text-base",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-cta hover:bg-primary-hover",
        outline: "border border-primary text-primary bg-transparent hover:bg-sage",
        ghost: "text-primary underline underline-offset-4 hover:no-underline px-0 min-h-0",
      },
      size: {
        md: "",
        sm: "min-h-10 px-4 py-2 text-sm whitespace-nowrap sm:px-5",
      },
      block: { true: "w-full sm:w-auto", false: "" },
    },
    defaultVariants: { variant: "primary", size: "md", block: false },
  },
);

type Props = VariantProps<typeof ctaVariants> & {
  href: string;
  children: React.ReactNode;
  /** Tag for future analytics */
  track?: string;
  className?: string;
};

/** External CTA link (Telegram / VK). Opens in a new tab. */
export function CtaButton({ href, children, track, variant, size, block, className }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" data-cta={track} className={cn(ctaVariants({ variant, size, block }), className)}>
      {children}
    </a>
  );
}

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

const islandVariants = cva("section-island rounded-island px-5 py-14 sm:px-10 md:py-20", {
  variants: {
    tone: {
      surface: "bg-surface",
      sage: "bg-sage",
      card: "bg-card shadow-island",
      light: "bg-background shadow-island",
      plain: "bg-transparent",
    },
  },
  defaultVariants: { tone: "surface" },
});

type Props = VariantProps<typeof islandVariants> & { id?: string; children: React.ReactNode; className?: string; "aria-labelledby"?: string };

/** Rounded "island" section on the warm background. */
export function Island({ id, tone, children, className, ...rest }: Props) {
  return (
    <section id={id} className="py-3 md:py-4" {...rest}>
      <Container>
        <div className={cn(islandVariants({ tone }), className)}>{children}</div>
      </Container>
    </section>
  );
}

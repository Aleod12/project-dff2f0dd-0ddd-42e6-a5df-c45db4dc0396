import { cn } from "@/lib/utils";
import { DiamondDivider } from "./DiamondDivider";

type Props = {
  /** Plain part */
  title: string;
  /** Italic serif accent word(s) */
  accent?: string;
  /** Accent goes before the title when true */
  accentFirst?: boolean;
  eyebrow?: string;
  align?: "center" | "left";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionTitle({ title, accent, accentFirst, eyebrow, align = "center", as: Tag = "h2", className }: Props) {
  const acc = accent ? <em className="italic">{accent}</em> : null;
  return (
    <div className={cn("flex flex-col gap-4", align === "center" ? "items-center text-center" : "items-start", className)}>
      {eyebrow && <p className="text-eyebrow">{eyebrow}</p>}
      <Tag className="text-h2 text-balance">
        {accentFirst ? (
          <>
            {acc} {title}
          </>
        ) : (
          <>
            {title} {acc}
          </>
        )}
      </Tag>
      <DiamondDivider />
    </div>
  );
}

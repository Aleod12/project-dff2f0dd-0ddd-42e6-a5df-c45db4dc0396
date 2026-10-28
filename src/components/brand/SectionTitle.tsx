import { cn } from "@/lib/utils";
import { DiamondDivider } from "./DiamondDivider";

type Props = {
  /** Plain part */
  title: string;
  /** Italic serif accent word(s) */
  accent?: string;
  /** Accent goes before the title when true */
  accentFirst?: boolean;
  /** Plain text right after the accent word(s) */
  suffix?: string;
  /** Heading id, so a section can point at it with aria-labelledby */
  id?: string;
  eyebrow?: string;
  align?: "center" | "left";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionTitle({ title, accent, accentFirst, suffix, id, eyebrow, align = "center", as: Tag = "h2", className }: Props) {
  const acc = accent ? <em className="italic">{accent}</em> : null;
  return (
    <div className={cn("flex flex-col gap-4", align === "center" ? "items-center text-center" : "items-start", className)}>
      {eyebrow && <p className="text-eyebrow">{eyebrow}</p>}
      <Tag id={id} className="text-h2 text-balance">
        {accentFirst ? (
          <>
            {acc} {title}
            {suffix}
          </>
        ) : (
          <>
            {title} {acc}
            {suffix}
          </>
        )}
      </Tag>
      <DiamondDivider />
    </div>
  );
}

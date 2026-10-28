import { Island } from "@/components/layout/Island";
import { DiamondDivider } from "@/components/brand/DiamondDivider";

/** Shared frame for /payment/* pages. */
export function PaymentPage({ title, accent, children }: { title: string; accent?: string; children: React.ReactNode }) {
  return (
    <Island tone="plain">
      <div className="mx-auto flex max-w-[560px] flex-col items-center gap-6 rounded-[24px] bg-card px-5 py-10 text-center shadow-island sm:rounded-[32px] sm:px-10 sm:py-12">
        <h1 className="text-h2 text-balance">
          {title} {accent && <em className="italic">{accent}</em>}
        </h1>
        <DiamondDivider />
        {children}
      </div>
    </Island>
  );
}

export const noindexMeta = [{ name: "robots", content: "noindex, nofollow" }];

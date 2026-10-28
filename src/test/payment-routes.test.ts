import { describe, expect, it } from "vitest";
import { Route as checkout } from "@/routes/payment.checkout";
import { Route as success } from "@/routes/payment.success";
import { Route as fail } from "@/routes/payment.fail";
import { pricing } from "@/content/pricing";

describe("payment pages", () => {
  it.each([["checkout", checkout], ["success", success], ["fail", fail]])("/payment/%s is noindex", (_n, route) => {
    const head = (route.options.head as () => { meta: { name?: string; content?: string }[] })();
    expect(head.meta).toContainEqual({ name: "robots", content: "noindex, nofollow" });
  });
  it("success page never claims payment is confirmed", () => {
    expect(pricing.success.text.toLowerCase()).not.toContain("оплата подтверждена");
  });
});

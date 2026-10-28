import { describe, expect, it, beforeEach } from "vitest";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { offer } from "@/content/legal/offer";
import { LegalPage } from "@/components/legal/LegalPage";
import { parseFrom } from "@/lib/legalFrom";
import { showStickyCta } from "@/lib/stickyCta";
import { renderAt } from "./legal-render";

beforeEach(() => window.sessionStorage.clear());

describe("LegalBackLink", () => {
  it("renders at the top and the bottom with the section label", async () => {
    await renderAt("/offer?from=price", () => <LegalPage doc={offer} from="price" />);
    const links = await screen.findAllByRole("link", { name: "Вернуться к разделу «Стоимость»" });
    expect(links).toHaveLength(2);
  });

  it("footer and checkout labels", async () => {
    await renderAt("/offer", () => <LegalPage doc={offer} from="site-footer" />);
    expect(await screen.findAllByRole("link", { name: "Вернуться на сайт" })).toHaveLength(2);
  });

  it("unknown from → «На главную»", async () => {
    const from = parseFrom("evil");
    expect(from).toBeUndefined();
    await renderAt("/offer?from=evil", () => <LegalPage doc={offer} from={from} />);
    expect(await screen.findAllByRole("link", { name: "На главную" })).toHaveLength(2);
  });

  it("without in-site history navigates to /#<from>", async () => {
    const { router } = await renderAt("/offer?from=price", () => <LegalPage doc={offer} from="price" />);
    const [top] = await screen.findAllByRole("link", { name: "Вернуться к разделу «Стоимость»" });
    expect(top.getAttribute("href")).toBe("/#price");
    fireEvent.click(top);
    await waitFor(() => expect(router.state.location.pathname).toBe("/"));
    expect(router.state.location.hash).toBe("price");
  });
});

describe("mobile sticky bar", () => {
  it("exists only on the home page", () => {
    expect(showStickyCta("/")).toBe(true);
    for (const p of ["/privacy", "/offer", "/consent", "/payment/checkout", "/payment/success", "/payment/fail"]) expect(showStickyCta(p)).toBe(false);
  });
});

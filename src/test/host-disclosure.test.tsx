import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Host } from "@/components/sections/Host";

describe("Host story disclosure", () => {
  it("starts closed and can be opened and closed again", () => {
    render(<Host />);
    const toggle = screen.getByRole("button", { name: "Читать мою историю полностью" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
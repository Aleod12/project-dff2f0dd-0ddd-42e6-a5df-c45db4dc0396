import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Reviews } from "@/components/sections/Reviews";
import { reviews } from "@/content/reviews";

describe("Reviews section", () => {
  it("renders 4 videos and 2 quotes", () => {
    const { container } = render(<Reviews />);
    expect(container.querySelectorAll("[data-review-video]")).toHaveLength(4);
    expect(container.querySelectorAll("[data-review-quote]")).toHaveLength(2);
  });

  it("shows the fallback label when the name is empty", () => {
    render(<Reviews />);
    expect(reviews.videos[1]!.name).toBe("");
    expect(screen.getByText("Видеоотзыв участника")).toBeInTheDocument();
    expect(screen.getAllByText("Видеоотзыв участницы")).toHaveLength(3);
  });

  it("does not put the VK iframe in the page before click", () => {
    render(<Reviews />);
    expect(document.querySelector("iframe")).toBeNull();
    const buttons = screen.getAllByRole("button", { name: /Смотреть видеоотзыв/ });
    fireEvent.click(buttons[3]!);
    expect(document.querySelector("iframe")?.getAttribute("src")).toContain("vk.ru/video_ext.php");
  });
});

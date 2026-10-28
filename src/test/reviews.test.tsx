import { fireEvent, render, screen } from "@testing-library/react";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { Reviews } from "@/components/sections/Reviews";
import { reviews } from "@/content/reviews";
import { pauseOtherVideos } from "@/lib/exclusivePlay";

function filesIn(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? filesIn(p) : [p];
  });
}

describe("Reviews section", () => {
  it("renders 4 videos in the order 3, 4, 1, 2", () => {
    const { container } = render(<Reviews />);
    expect(container.querySelectorAll("[data-review-video]")).toHaveLength(4);
    expect(reviews.videos.map((v) => v.id)).toEqual(["v3", "v4", "v1", "v2"]);
  });

  it("renders 2 quotes", () => {
    const { container } = render(<Reviews />);
    expect(container.querySelectorAll("[data-review-quote]")).toHaveLength(2);
  });

  it("shows the fallback label when the name is empty", () => {
    render(<Reviews />);
    expect(screen.getByText("Видеоотзыв участника")).toBeInTheDocument();
    expect(screen.getAllByText("Видеоотзыв участницы")).toHaveLength(3);
  });

  it("has no VK player anywhere in src", () => {
    const hit = filesIn(join(process.cwd(), "src"))
      .filter((f) => /\.(tsx?|css|json)$/.test(f) && !f.endsWith("reviews.test.tsx"))
      .filter((f) => readFileSync(f, "utf8").includes("vk.ru/video_ext"));
    expect(hit).toEqual([]);
  });

  it("transcript button toggles aria-expanded, one open at a time", () => {
    render(<Reviews />);
    const [first, second] = screen.getAllByRole("button", { name: "Читать текст" });
    expect(first).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(first!);
    expect(first).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(second!);
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(first).toHaveAttribute("aria-expanded", "false");
  });

  it("transcripts are in the HTML even when collapsed", () => {
    const { container } = render(<Reviews />);
    expect(container.textContent).toContain("Очень много нового узнал о себе, о своей душе.");
  });
});

describe("Only one video plays at a time", () => {
  it("starting a video pauses all others", () => {
    const a = document.createElement("video");
    const b = document.createElement("video");
    document.body.append(a, b);
    Object.defineProperty(a, "paused", { value: false });
    Object.defineProperty(b, "paused", { value: false });
    const pauseA = vi.spyOn(a, "pause").mockImplementation(() => {});
    const pauseB = vi.spyOn(b, "pause").mockImplementation(() => {});
    pauseOtherVideos(b);
    expect(pauseA).toHaveBeenCalledOnce();
    expect(pauseB).not.toHaveBeenCalled();
    a.remove();
    b.remove();
  });
});

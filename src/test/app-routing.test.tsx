import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import homeSource from "../routes/index.tsx?raw";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("places Meeting immediately after Program on the home page", () => {
    const sections = [...homeSource.matchAll(/<([A-Z]\w*)\s*\/>/g)].map((match) => match[1]);
    const programIndex = sections.indexOf("Program");
    expect(programIndex).toBeGreaterThanOrEqual(0);
    expect(sections[programIndex + 1]).toBe("Meeting");
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});

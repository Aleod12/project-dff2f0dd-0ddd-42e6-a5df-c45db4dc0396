import { render } from "@testing-library/react";
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import type { ReactNode } from "react";

/** Renders a component inside a minimal router at the given URL. */
export async function renderAt(url: string, ui: () => ReactNode) {
  const root = createRootRoute({ component: ui });
  const router = createRouter({ routeTree: root, history: createMemoryHistory({ initialEntries: [url] }) });
  await router.load();
  const utils = render(<RouterProvider router={router} />);
  return { router, ...utils };
}

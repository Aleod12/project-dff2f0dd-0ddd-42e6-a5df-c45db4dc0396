import { createFileRoute } from "@tanstack/react-router";
import { sitemapXml } from "@/lib/seoFiles";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const xml = sitemapXml();
        if (!xml) return new Response("Sitemap is available once the site domain is set.", { status: 404 });
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});

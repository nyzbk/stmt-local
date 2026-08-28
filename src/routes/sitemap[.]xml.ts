import { createFileRoute } from "@tanstack/react-router";

const PATHS: Array<{ path: string; lastmod: string; changefreq: string; priority: string }> = [
  { path: "/", lastmod: "2026-08-28", changefreq: "weekly", priority: "1.0" },
  { path: "/how-it-works", lastmod: "2026-08-28", changefreq: "weekly", priority: "0.9" },
  { path: "/faq", lastmod: "2026-08-28", changefreq: "weekly", priority: "0.8" },
  { path: "/use-cases", lastmod: "2026-08-28", changefreq: "weekly", priority: "0.8" },
  { path: "/use-cases/accountant", lastmod: "2026-08-28", changefreq: "monthly", priority: "0.7" },
  { path: "/use-cases/budget", lastmod: "2026-08-28", changefreq: "monthly", priority: "0.7" },
  { path: "/use-cases/multi-page", lastmod: "2026-08-28", changefreq: "monthly", priority: "0.7" },
  { path: "/about", lastmod: "2026-08-28", changefreq: "monthly", priority: "0.5" },
  { path: "/contact", lastmod: "2026-08-28", changefreq: "monthly", priority: "0.5" },
  { path: "/privacy", lastmod: "2026-08-28", changefreq: "monthly", priority: "0.4" },
  { path: "/terms", lastmod: "2026-08-28", changefreq: "monthly", priority: "0.4" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const origin = "https://stmt-local.vercel.app";
        void request;
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PATHS.map(
  (p) => `  <url>
    <loc>${origin}${p.path}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
).join("\n")}
</urlset>
`;
        return new Response(body, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

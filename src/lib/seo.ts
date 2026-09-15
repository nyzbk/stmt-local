import { SITE } from "./site";

export function pageHead(opts: { title: string; description: string; path: string }) {
  const url = opts.path === "/" ? `${SITE.origin}/` : `${SITE.origin}${opts.path}`;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:image", content: `${SITE.origin}/og.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
      { name: "twitter:image", content: `${SITE.origin}/og.jpg` },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: opts.title,
          description: opts.description,
          url,
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.origin },
        }),
      },
    ],
  };
}

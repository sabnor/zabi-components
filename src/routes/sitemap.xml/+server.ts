import type { RequestHandler } from "./$types";
import { SITE_URL, layers } from "$lib/marketing/content";

export const prerender = true;

export const GET: RequestHandler = () => {
    const paths = [
        "/",
        "/docs",
        "/theming",
        ...layers.flatMap((layer) =>
            layer.names.map((name) => `/components/${name}`),
        ),
    ];

    const urls = paths
        .map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`)
        .join("\n");

    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        { headers: { "Content-Type": "application/xml" } },
    );
};

// Generates public/sitemap.xml and public/rss.xml from the routes and blog posts.
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { SITE_URL } from "../src/data/index.js";

const POSTS_DIR = new URL("../src/posts/", import.meta.url);

// Same frontmatter format as src/lib/posts.js
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return {};
  return Object.fromEntries(
    m[1]
      .split("\n")
      .filter(Boolean)
      .map((l) => {
        const i = l.indexOf(":");
        return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
      })
  );
}

const escapeXml = (s = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const posts = readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => ({
    slug: f.replace(/\.md$/, ""),
    ...parseFrontmatter(readFileSync(new URL(f, POSTS_DIR), "utf8").replace(/\r\n/g, "\n")),
  }))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const latest = posts[0]?.date;

const urls = [
  { loc: "/", lastmod: latest },
  { loc: "/blog", lastmod: latest },
  ...posts.map((p) => ({ loc: `/blog/${p.slug}`, lastmod: p.date })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${SITE_URL}${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}\n  </url>`
  )
  .join("\n")}
</urlset>
`;

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kevin Joseph — Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Thoughts on frontend engineering, design systems, and the craft of building interfaces.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${posts
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid>${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.description)}</description>
${(p.tags || "")
  .split(",")
  .map((t) => t.trim())
  .filter(Boolean)
  .map((t) => `      <category>${escapeXml(t)}</category>`)
  .join("\n")}
    </item>`
  )
  .join("\n")}
  </channel>
</rss>
`;

writeFileSync("public/sitemap.xml", sitemap);
writeFileSync("public/rss.xml", rss);
console.log(`Generated public/sitemap.xml (${urls.length} URLs) and public/rss.xml (${posts.length} posts)`);

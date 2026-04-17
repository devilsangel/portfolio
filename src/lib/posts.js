const modules = import.meta.glob("../posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { data: {}, content: raw };
  const data = Object.fromEntries(
    m[1]
      .split("\n")
      .filter(Boolean)
      .map((l) => {
        const i = l.indexOf(":");
        return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
      })
  );
  return { data, content: m[2] };
}

export const posts = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.replace("../posts/", "").replace(".md", "");
    const { data, content } = parseFrontmatter(raw);
    return { slug, content, ...data };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export function getPost(slug) {
  return posts.find((p) => p.slug === slug) ?? null;
}

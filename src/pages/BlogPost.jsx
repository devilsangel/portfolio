import { useParams, Link } from "react-router-dom";
import { marked } from "marked";
import { getPost, formatDate } from "../lib/posts";
import { usePageMeta } from "../hooks/usePageMeta";
import NotFound from "./NotFound";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  usePageMeta(
    post
      ? { title: post.title, description: post.description, path: `/blog/${post.slug}` }
      : { title: "Post not found" }
  );

  if (!post) {
    return <NotFound heading="Post not found" backTo="/blog" backLabel="Back to blog" />;
  }

  return (
    <article className="px-5 md:px-9 lg:px-14 pt-32 pb-24 max-w-2xl mx-auto">
      {/* Back link */}
      <Link
        to="/blog"
        className="font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2 mb-12 transition-colors duration-200"
        style={{ color: "#A89B8F" }}
      >
        ← All posts
      </Link>

      {/* Header */}
      <header className="mb-10">
        {post.tags && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {post.tags.split(",").map((t) => (
              <span
                key={t}
                className="font-mono uppercase tracking-wide px-2.5 py-0.5 border rounded-sm"
                style={{
                  borderColor: "#E4DDD5",
                  color: "#8A7F73",
                  fontSize: "10px",
                }}
              >
                {t.trim()}
              </span>
            ))}
          </div>
        )}
        <h1
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-4"
          style={{ color: "#1A1714", letterSpacing: "-1.5px" }}
        >
          {post.title}
        </h1>
        <p
          className="text-base leading-relaxed mb-5"
          style={{ color: "#6B6058" }}
        >
          {post.description}
        </p>
        <span
          className="font-mono text-xs tracking-wide"
          style={{ color: "#A89B8F" }}
        >
          {formatDate(post.date)}
        </span>
        <div className="h-px mt-8" style={{ background: "#E4DDD5" }} />
      </header>

      {/* Body */}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: marked(post.content) }}
      />
    </article>
  );
}

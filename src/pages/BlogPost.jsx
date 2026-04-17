import { useParams, Link } from "react-router-dom";
import { marked } from "marked";
import { getPost } from "../lib/posts";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) {
    return (
      <div className="px-5 md:px-9 lg:px-14 pt-40 pb-24 max-w-4xl mx-auto text-center">
        <p
          className="font-mono text-sm uppercase tracking-widest mb-4"
          style={{ color: "#BF4A2F" }}
        >
          404
        </p>
        <h1
          className="font-serif text-3xl font-semibold mb-6"
          style={{ color: "#1A1714" }}
        >
          Post not found
        </h1>
        <Link
          to="/blog"
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: "#8A7F73" }}
        >
          ← Back to blog
        </Link>
      </div>
    );
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

import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { posts } from "../lib/posts";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogList() {
  return (
    <section className="px-5 md:px-9 lg:px-14 pt-32 pb-24 max-w-4xl mx-auto">
      <Reveal>
        <div className="mb-12 md:mb-16">
          <span
            className="font-mono text-sm tracking-wider block mb-3"
            style={{ color: "#BF4A2F" }}
          >
            Writing
          </span>
          <h1
            className="font-serif text-3xl md:text-5xl font-semibold mb-4"
            style={{ color: "#1A1714", letterSpacing: "-1.5px" }}
          >
            Blog<span style={{ color: "#BF4A2F" }}>.</span>
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#8A7F73" }}>
            Thoughts on frontend engineering, design systems, and the craft of
            building interfaces.
          </p>
        </div>
      </Reveal>

      <div className="flex flex-col gap-px" style={{ borderColor: "#E4DDD5" }}>
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <Link
              to={`/blog/${post.slug}`}
              className="group block py-8 border-b"
              style={{ borderColor: "#E4DDD5" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <h2
                    className="font-serif text-xl md:text-2xl font-semibold mb-2 transition-colors duration-200"
                    style={{ color: "#1A1714", letterSpacing: "-0.5px" }}
                  >
                    <span className="group-hover:text-[#BF4A2F] transition-colors duration-200">
                      {post.title}
                    </span>
                  </h2>
                  <p
                    className="text-sm leading-relaxed mb-3 max-w-xl"
                    style={{ color: "#6B6058" }}
                  >
                    {post.description}
                  </p>
                  {post.tags && (
                    <div className="flex flex-wrap gap-1.5">
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
                </div>
                <span
                  className="font-mono text-xs tracking-wide shrink-0 mt-1"
                  style={{ color: "#A89B8F" }}
                >
                  {formatDate(post.date)}
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

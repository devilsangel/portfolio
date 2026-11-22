import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { posts, formatDate } from "../lib/posts";

export default function LatestPosts() {
  const latest = posts.slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section
      id="writing"
      className="px-5 md:px-9 lg:px-14 pt-20 md:pt-28 max-w-6xl mx-auto"
    >
      <Reveal>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
          <div className="max-w-xl">
            <span
              className="font-mono text-sm tracking-wider block mb-3"
              style={{ color: "#BF4A2F" }}
            >
              03
            </span>
            <h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-3.5"
              style={{ color: "#1A1714", letterSpacing: "-1px" }}
            >
              Latest Writing<span style={{ color: "#BF4A2F" }}>.</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "#8A7F73" }}>
              Notes on frontend architecture, design systems, and shipping
              interfaces.
            </p>
          </div>
          <Link
            to="/blog"
            className="font-mono text-xs uppercase tracking-widest shrink-0 transition-colors duration-200 text-[#8A7F73] hover:text-[#BF4A2F]"
          >
            All posts →
          </Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
        {latest.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.1} className="h-full">
            <Link
              to={`/blog/${post.slug}`}
              className="group h-full flex flex-col p-5 md:p-7 border rounded-xl transition-colors duration-300 border-[#E4DDD5] hover:border-[#BF4A2F55]"
              style={{ background: "#FDFCFA" }}
            >
              <span
                className="font-mono text-xs tracking-wide mb-4"
                style={{ color: "#A89B8F" }}
              >
                {formatDate(post.date)}
              </span>
              <h3
                className="font-serif text-xl font-semibold mb-2 transition-colors duration-200 text-[#1A1714] group-hover:text-[#BF4A2F]"
                style={{ letterSpacing: "-0.5px" }}
              >
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#6B6058" }}>
                {post.description}
              </p>
              <span
                className="font-mono uppercase tracking-widest mt-auto"
                style={{ color: "#BF4A2F", fontSize: "10px" }}
              >
                Read →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

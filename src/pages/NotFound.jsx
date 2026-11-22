import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";

export default function NotFound({
  heading = "Page not found",
  backTo = "/",
  backLabel = "Back home",
}) {
  usePageMeta({ title: heading });
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
        {heading}
      </h1>
      <Link
        to={backTo}
        className="font-mono text-xs uppercase tracking-widest transition-colors duration-200 text-[#8A7F73] hover:text-[#2C2621]"
      >
        ← {backLabel}
      </Link>
    </div>
  );
}

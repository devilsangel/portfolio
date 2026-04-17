import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function MobileMenu({ open, onClose, scrollTo }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8"
      style={{
        background: "rgba(250,247,242,0.97)",
        backdropFilter: "blur(16px)",
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-6 text-2xl cursor-pointer bg-transparent border-none"
        style={{ color: "#2C2621" }}
      >
        ✕
      </button>
      {["Work", "About", "Contact"].map((l) => (
        <a
          key={l}
          href="#"
          onClick={(e) => { e.preventDefault(); scrollTo(l.toLowerCase()); onClose(); }}
          className="font-serif text-3xl font-semibold"
          style={{ color: "#2C2621" }}
        >
          {l}
        </a>
      ))}
      <Link
        to="/blog"
        onClick={onClose}
        className="font-serif text-3xl font-semibold"
        style={{ color: "#2C2621" }}
      >
        Blog
      </Link>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); scrollTo("contact"); onClose(); }}
        className="font-mono text-xs uppercase tracking-widest px-7 py-3 border mt-4"
        style={{ borderColor: "#2C2621", color: "#2C2621" }}
      >
        Let's Talk
      </a>
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";

  function scrollTo(id) {
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} scrollTo={scrollTo} />
      <nav
        className={`fixed top-0 left-0 right-0 z-40 flex justify-between items-center transition-all duration-300 px-5 md:px-9 lg:px-14 ${scrolled ? "py-3.5 border-b" : "py-5 border-b border-transparent"}`}
        style={{
          background: scrolled ? "rgba(250,247,242,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderColor: scrolled ? "#E4DDD5" : "transparent",
        }}
      >
        <Link
          to="/"
          className="font-serif text-base font-normal"
          style={{ color: "#2C2621", letterSpacing: "0.5px" }}
        >
          kevin joseph
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-9">
          {["Work", "About", "Contact"].map((l) => (
            <a
              key={l}
              href="#"
              onClick={(e) => { e.preventDefault(); scrollTo(l.toLowerCase()); }}
              className="relative font-mono text-xs uppercase tracking-widest text-[#8A7F73] hover:text-[#2C2621] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#2C2621] after:transition-all after:duration-200 hover:after:w-full"
            >
              {l}
            </a>
          ))}
          <Link
            to="/blog"
            className={`relative font-mono text-xs uppercase tracking-widest transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:transition-all after:duration-200 hover:after:w-full ${
              pathname.startsWith("/blog")
                ? "text-[#BF4A2F] after:w-full after:bg-[#BF4A2F]"
                : "text-[#8A7F73] hover:text-[#2C2621] after:w-0 after:bg-[#2C2621]"
            }`}
          >
            Blog
          </Link>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
            className="font-mono text-xs uppercase tracking-widest px-5 py-2.5 border rounded-sm transition-all duration-200 text-[#2C2621] hover:bg-[#2C2621] hover:text-[#FAF7F2]"
            style={{ borderColor: "#2C2621" }}
          >
            Let's Talk
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden flex flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer"
        >
          <span className="block w-5 h-px" style={{ background: "#2C2621" }} />
          <span className="block w-5 h-px" style={{ background: "#2C2621" }} />
          <span className="block w-3.5 h-px" style={{ background: "#2C2621" }} />
        </button>
      </nav>
    </>
  );
}

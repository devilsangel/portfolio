import { useState } from "react";
import Reveal from "./Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(null);

  const copy = () => {
    navigator.clipboard.writeText("josephkevin1995@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const links = [
    {
      label: "Email",
      value: copied ? "Copied!" : "josephkevin1995@gmail.com",
      action: copy,
      isButton: true,
    },
    { label: "LinkedIn", value: "Profile →", href: "https://linkedin.com" },
    { label: "GitHub", value: "Repos →", href: "https://github.com" },
  ];

  return (
    <section
      id="contact"
      className="px-5 md:px-9 lg:px-14 pt-20 md:pt-28 pb-12 max-w-6xl mx-auto text-center"
    >
      <Reveal>
        <span
          className="font-mono text-sm tracking-wider block mb-3"
          style={{ color: "#BF4A2F" }}
        >
          03
        </span>
      </Reveal>

      <Reveal delay={0.1}>
        <h2
          className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-5"
          style={{ color: "#1A1714", letterSpacing: "-2px" }}
        >
          Let's create
          <br />
          <span className="font-serif italic font-extralight">
            something remarkable
          </span>
          <span style={{ color: "#BF4A2F" }}>.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.2}>
        <p
          className="text-base leading-relaxed max-w-lg mx-auto mb-11"
          style={{ color: "#8A7F73" }}
        >
          I'm exploring senior frontend roles — especially teams building
          ambitious products where craft and engineering depth matter.
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          {links.map((link, i) => {
            const isH = hovered === i;
            const El = link.isButton ? "button" : "a";
            const extra = link.isButton
              ? { onClick: link.action }
              : {
                  href: link.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                };
            return (
              <El
                key={link.label}
                {...extra}
                className="flex flex-col items-center gap-2 px-8 md:px-11 py-5 md:py-6 border rounded-lg w-full sm:w-auto cursor-pointer"
                style={{
                  background: isH ? "#2C2621" : "transparent",
                  color: isH ? "#FAF7F2" : "#2C2621",
                  borderColor: isH ? "#2C2621" : "#E0D9D1",
                  transform: isH ? "translateY(-3px)" : "translateY(0)",
                  transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <span
                  className="font-mono uppercase tracking-widest"
                  style={{
                    color: isH ? "#BF4A2F" : "#A89B8F",
                    fontSize: "10px",
                    transition: "color 0.35s",
                  }}
                >
                  {link.label}
                </span>
                <span className="text-sm font-medium">{link.value}</span>
              </El>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.4}>
        <footer
          className="flex flex-col sm:flex-row justify-between items-center mt-16 md:mt-24 pt-6 border-t gap-3 font-mono text-xs tracking-wide"
          style={{ borderColor: "#E4DDD5", color: "#A89B8F" }}
        >
          <span>© 2026 Kevin Joseph</span>
          <span>Designed & built with React</span>
        </footer>
      </Reveal>
    </section>
  );
}

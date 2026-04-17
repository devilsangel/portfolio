import { useState, useEffect } from "react";
import DotGrid from "./DotGrid";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 250);
  }, []);

  const enter = (i) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(44px)",
    transition: `all 1s cubic-bezier(0.22,1,0.36,1) ${0.35 + i * 0.18}s`,
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-5 md:px-9 lg:px-14 pt-24 lg:pt-28 pb-20 overflow-hidden"
    >
      <div className="hidden md:block">
        <DotGrid />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center max-w-6xl mx-auto w-full">
        {/* Left */}
        <div className="lg:col-span-3">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-5 md:mb-7 flex items-center gap-3.5"
            style={{ color: "#8A7F73", ...enter(0) }}
          >
            <span
              className="inline-block w-6 md:w-9 h-px"
              style={{ background: "#BF4A2F" }}
            />
            Frontend Engineer · 7 years
          </p>

          <h1
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-5 md:mb-7"
            style={{ color: "#1A1714", letterSpacing: "-1.5px", ...enter(1) }}
          >
            I build
            <span
              className="font-serif italic font-extralight"
              style={{ color: "#BF4A2F" }}
            >
              {" "}
              interfaces{" "}
            </span>
            that feel as good as they perform
            <span style={{ color: "#BF4A2F" }}>.</span>
          </h1>

          <p
            className="text-base leading-relaxed max-w-lg mb-8 md:mb-10"
            style={{ color: "#6B6058", ...enter(2) }}
          >
            Software engineer specializing in scalable frontend architectures,
            design systems, and state management. Currently exploring senior
            roles where craft and engineering depth matter.
          </p>

          <div className="flex flex-wrap gap-3 items-center" style={enter(3)}>
            <a
              href="#work"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-6 py-3.5 rounded-sm"
              style={{ background: "#2C2621", color: "#FAF7F2" }}
            >
              Selected Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 3v10M4 9l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#contact"
              className="font-mono text-xs uppercase tracking-wider px-6 py-3.5 border rounded-sm transition-all duration-200 text-[#8A7F73] hover:bg-[#2C2621] hover:text-[#FAF7F2] hover:border-[#2C2621]"
              style={{ borderColor: "#D6CFC6" }}
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Right card */}
        <div className="lg:col-span-2 flex lg:justify-end" style={enter(2)}>
          <div
            className="w-full max-w-xs lg:max-w-sm p-6 md:p-8 rounded-lg border"
            style={{
              borderColor: "#E4DDD5",
              background: "rgba(250,247,242,0.85)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex items-center gap-2.5 mb-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#3DB87A",
                  boxShadow: "0 0 8px #3DB87A55",
                }}
              />
              <span className="text-sm font-semibold" style={{ color: "#2C2621" }}>
                Open to opportunities
              </span>
            </div>
            <div className="h-px my-4" style={{ background: "#E4DDD5" }} />
            {[
              { label: "Focus", value: "Angular · React · TypeScript" },
              { label: "Location", value: "United States" },
              { label: "Experience", value: "7 years frontend" },
            ].map((f) => (
              <div key={f.label} className="flex justify-between items-center py-2">
                <span
                  className="font-mono uppercase tracking-widest"
                  style={{ color: "#A89B8F", fontSize: "10px" }}
                >
                  {f.label}
                </span>
                <span className="text-sm font-medium" style={{ color: "#2C2621" }}>
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useRef } from "react";
import Reveal from "./Reveal";
import { PROJECTS } from "../data";

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const onMove = (e) => {
    if (!ref.current || window.innerWidth < 640) return;
    const r = ref.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - r.top) / r.height - 0.5) * -8,
      y: ((e.clientX - r.left) / r.width - 0.5) * 8,
    });
  };

  return (
    <Reveal delay={index * 0.1}>
      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={onMove}
        onMouseLeave={() => {
          setHovered(false);
          setTilt({ x: 0, y: 0 });
        }}
        className="relative p-5 md:p-7 border rounded-xl cursor-default"
        style={{
          borderColor: "#E4DDD5",
          background: "#FDFCFA",
          transform: hovered
            ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.01)`
            : "perspective(800px) rotateX(0) rotateY(0) scale(1)",
          transition: hovered
            ? "transform 0.1s ease-out"
            : "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 md:mb-5">
          <span
            className="font-serif text-sm font-semibold"
            style={{ color: project.accent }}
          >
            {project.id}
          </span>
          <span
            className="font-mono uppercase tracking-widest"
            style={{ color: project.accent, fontSize: "10px" }}
          >
            {project.subtitle}
          </span>
        </div>

        {/* Visual */}
        <div
          className="w-full rounded-md flex items-center justify-center mb-4 md:mb-5 border transition-colors duration-500"
          style={{
            aspectRatio: "16/9",
            background: `linear-gradient(160deg, ${project.accent}0D, ${project.accent}05)`,
            borderColor: hovered ? project.accent + "44" : "#E4DDD5",
          }}
        >
          <span
            className="font-serif text-6xl md:text-7xl font-extralight italic transition-opacity duration-500"
            style={{
              color: project.accent,
              opacity: hovered ? 0.45 : 0.15,
            }}
          >
            {project.title.charAt(0)}
          </span>
        </div>

        {/* Info */}
        <h3
          className="font-serif text-xl md:text-2xl font-semibold mb-2"
          style={{ color: "#1A1714", letterSpacing: "-0.5px" }}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B6058" }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="font-mono uppercase tracking-wide px-3 py-1 border rounded-sm"
              style={{
                borderColor: "#E4DDD5",
                color: "#8A7F73",
                fontSize: "10px",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Hover glow */}
        {hovered && (
          <div
            className="absolute -inset-px rounded-xl pointer-events-none"
            style={{
              border: `1px solid ${project.accent}33`,
              boxShadow: `0 8px 40px ${project.accent}12`,
            }}
          />
        )}
      </div>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      className="px-5 md:px-9 lg:px-14 py-20 md:py-28 max-w-6xl mx-auto"
    >
      <Reveal>
        <div className="mb-10 md:mb-14 max-w-xl">
          <span
            className="font-mono text-sm tracking-wider block mb-3"
            style={{ color: "#BF4A2F" }}
          >
            01
          </span>
          <h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-3.5"
            style={{ color: "#1A1714", letterSpacing: "-1px" }}
          >
            Selected Work<span style={{ color: "#BF4A2F" }}>.</span>
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#8A7F73" }}>
            Projects that represent my approach — thoughtful architecture, clean
            code, and polished experiences.
          </p>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

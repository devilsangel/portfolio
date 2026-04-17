import Reveal from "./Reveal";
import { SKILLS, TOOLS, EXPERIENCE } from "../data";

function SkillRow({ skill, index }) {
  return (
    <Reveal delay={0.12 + index * 0.06}>
      <div
        className="flex justify-between items-center py-3 border-b transition-all duration-300 hover:pl-3"
        style={{ borderColor: "#E4DDD5" }}
      >
        <span className="text-base font-medium" style={{ color: "#2C2621" }}>
          {skill.name}
        </span>
        <div className="flex items-center gap-1">
          {Array.from({ length: skill.years }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full hidden md:block"
              style={{
                background: "#BF4A2F",
                opacity: 0.3 + (i / skill.years) * 0.7,
              }}
            />
          ))}
          <span className="font-mono text-xs ml-2" style={{ color: "#A89B8F" }}>
            {skill.years}y
          </span>
        </div>
      </div>
    </Reveal>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="px-5 md:px-9 lg:px-14 py-20 md:py-28 max-w-6xl mx-auto"
      style={{ background: "#F3EEE8" }}
    >
      <Reveal>
        <div className="mb-9 md:mb-14 max-w-xl">
          <span
            className="font-mono text-sm tracking-wider block mb-3"
            style={{ color: "#BF4A2F" }}
          >
            02
          </span>
          <h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold"
            style={{ color: "#1A1714", letterSpacing: "-1px" }}
          >
            Skills & Journey<span style={{ color: "#BF4A2F" }}>.</span>
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Skills */}
        <div>
          <Reveal delay={0.1}>
            <h3
              className="font-mono text-xs uppercase tracking-widest mb-6"
              style={{ color: "#BF4A2F" }}
            >
              Core Technologies
            </h3>
          </Reveal>
          {SKILLS.map((s, i) => (
            <SkillRow key={s.name} skill={s} index={i} />
          ))}

          <Reveal delay={0.4}>
            <h3
              className="font-mono text-xs uppercase tracking-widest mb-6 mt-10"
              style={{ color: "#BF4A2F" }}
            >
              Tools & Workflow
            </h3>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-4 py-2 border rounded"
                  style={{
                    background: "#FAF7F2",
                    borderColor: "#E0D9D1",
                    color: "#6B6058",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Experience */}
        <div>
          <Reveal delay={0.1}>
            <h3
              className="font-mono text-xs uppercase tracking-widest mb-6"
              style={{ color: "#BF4A2F" }}
            >
              Experience
            </h3>
          </Reveal>

          {EXPERIENCE.map((exp, i) => (
            <Reveal key={i} delay={0.18 + i * 0.12}>
              <div
                className="relative pl-7 mb-8 border-l"
                style={{ borderColor: "#E0D9D1" }}
              >
                <div
                  className="absolute -left-1.5 top-1 w-3 h-3 rounded-full border-2 flex items-center justify-center"
                  style={{ background: "#F3EEE8", borderColor: "#BF4A2F" }}
                >
                  <div className="w-1 h-1 rounded-full" style={{ background: "#BF4A2F" }} />
                </div>
                <span
                  className="font-mono text-xs tracking-wider block mb-1.5"
                  style={{ color: "#A89B8F" }}
                >
                  {exp.period}
                </span>
                <h4
                  className="font-serif text-lg md:text-xl font-semibold mb-1"
                  style={{ color: "#1A1714" }}
                >
                  {exp.role}
                </h4>
                <span className="text-sm font-medium block mb-2.5" style={{ color: "#BF4A2F" }}>
                  {exp.company}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "#8A7F73" }}>
                  {exp.summary}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.5}>
            <div
              className="mt-9 p-5 md:p-7 rounded-lg border"
              style={{ background: "#FAF7F2", borderColor: "#E4DDD5" }}
            >
              <svg
                width="24"
                height="18"
                viewBox="0 0 24 18"
                fill="none"
                className="mb-3 opacity-25"
              >
                <path
                  d="M0 18V10.8C0 4.44 3.72 1.08 9 0l1.2 2.4C6.36 3.6 4.8 6 4.56 9H9v9H0zm13.5 0V10.8c0-6.36 3.72-9.72 9-10.8L23.7 2.4C19.86 3.6 18.3 6 18.06 9H22.5v9h-9z"
                  fill="#BF4A2F"
                />
              </svg>
              <p
                className="font-serif text-base italic leading-relaxed font-normal"
                style={{ color: "#4A433C" }}
              >
                The best frontend work is invisible — users shouldn't notice the
                architecture, they should just feel the experience.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

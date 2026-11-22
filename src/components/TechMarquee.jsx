import { SKILLS, TOOLS } from "../data";

const ITEMS = [...SKILLS.map((s) => s.name), ...TOOLS];

function Row({ hidden }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-5 md:px-7 whitespace-nowrap">{item}</span>
          <span style={{ color: "#BF4A2F" }}>·</span>
        </span>
      ))}
    </div>
  );
}

export default function TechMarquee() {
  const fade = "linear-gradient(to right, transparent, black 12%, black 88%, transparent)";
  return (
    <div
      className="overflow-hidden py-4 md:py-5 border-t font-mono text-xs uppercase tracking-widest"
      style={{ borderColor: "#E4DDD5", color: "#A89B8F", maskImage: fade, WebkitMaskImage: fade }}
    >
      <div className="marquee marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}

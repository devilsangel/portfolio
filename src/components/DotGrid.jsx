import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const BASE = [168, 155, 140];
const ACCENT = [191, 74, 47];
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",");

export default function DotGrid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const spacing = 32,
      baseR = 1.5,
      maxR = 6,
      influence = 160;
    // Idle ripple: wavelength ~260px, one crest every ~5s
    const waveK = (Math.PI * 2) / 260,
      waveSpeed = 1.25;
    let cols, rows, w, h;
    let raf = null,
      onScreen = true;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      cols = Math.floor(w / spacing) + 1;
      rows = Math.floor(h / spacing) + 1;
    };

    const draw = (ts = 0) => {
      const t = ts / 1000;
      ctx.clearRect(0, 0, w, h);
      const { x: mx, y: my } = mouseRef.current;
      // Two ripple origins drifting slowly on Lissajous paths
      const origins = reducedMotion
        ? []
        : [
            { x: w * (0.3 + 0.2 * Math.sin(t * 0.07)), y: h * (0.45 + 0.25 * Math.cos(t * 0.05)) },
            { x: w * (0.75 + 0.15 * Math.cos(t * 0.06)), y: h * (0.6 + 0.2 * Math.sin(t * 0.08)) },
          ];

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + spacing / 2,
            y = j * spacing + spacing / 2;

          // Ambient wave: sharpen sin peaks so only thin crests light up
          let wave = 0;
          for (const o of origins) {
            const s = Math.sin(Math.hypot(x - o.x, y - o.y) * waveK - t * waveSpeed);
            wave = Math.max(wave, s > 0 ? s ** 6 : 0);
          }
          let radius = baseR + 1 * wave,
            alpha = 0.12 + 0.2 * wave,
            tint = wave * 0.5;

          const dist = Math.hypot(mx - x, my - y);
          if (dist < influence) {
            const k = 1 - dist / influence,
              ease = k * k * (3 - 2 * k);
            radius = Math.max(radius, baseR + (maxR - baseR) * ease);
            alpha = Math.max(alpha, 0.12 + 0.6 * ease);
            tint = Math.max(tint, ease);
          }
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${mix(BASE, ACCENT, tint)},${alpha})`;
          ctx.fill();
        }
      }
    };

    const loop = (ts) => {
      draw(ts);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (raf == null && onScreen && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf != null) cancelAnimationFrame(raf);
      raf = null;
    };

    const onResize = () => {
      resize();
      draw(performance.now());
    };
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0]?.clientX : e.clientX;
      const cy = e.touches ? e.touches[0]?.clientY : e.clientY;
      if (cx != null) mouseRef.current = { x: cx - r.left, y: cy - r.top };
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      onScreen ? start() : stop();
    });

    resize();
    draw(performance.now());
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    io.observe(canvas);
    start();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("touchmove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        pointerEvents: "auto",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 80%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 80%, transparent 100%)",
      }}
    />
  );
}

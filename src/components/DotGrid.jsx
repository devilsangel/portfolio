import { useEffect, useRef } from "react";

export default function DotGrid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const spacing = 32,
      baseR = 1.5,
      maxR = 6,
      influence = 160;
    let cols, rows;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      cols = Math.floor(canvas.offsetWidth / spacing) + 1;
      rows = Math.floor(canvas.offsetHeight / spacing) + 1;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      const cx = e.touches ? e.touches[0]?.clientX : e.clientX;
      const cy = e.touches ? e.touches[0]?.clientY : e.clientY;
      if (cx != null) mouseRef.current = { x: cx - r.left, y: cy - r.top };
    };
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("touchmove", onMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const { x: mx, y: my } = mouseRef.current;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + spacing / 2,
            y = j * spacing + spacing / 2;
          const dist = Math.hypot(mx - x, my - y);
          let radius = baseR,
            alpha = 0.12,
            color = "168,155,140";
          if (dist < influence) {
            const t = 1 - dist / influence,
              ease = t * t * (3 - 2 * t);
            radius = baseR + (maxR - baseR) * ease;
            alpha = 0.12 + 0.6 * ease;
            color = `${Math.round(168 + 23 * ease)},${Math.round(155 - 81 * ease)},${Math.round(140 - 93 * ease)}`;
          }
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color},${alpha})`;
          ctx.fill();
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        pointerEvents: "auto",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 50%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 50%, transparent 100%)",
      }}
    />
  );
}

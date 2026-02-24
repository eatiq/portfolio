'use client';

import { useEffect, useRef, useState } from 'react';

const GRADIENT_COLORS = [
  [99, 102, 241],   // Indigo
  [139, 92, 246],   // Purple
  [236, 72, 153],   // Pink
  [34, 197, 94],    // Green
  [251, 146, 60],   // Orange
  [59, 130, 246],   // Blue
  [99, 102, 241],   // Indigo (loop)
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getColor(t: number): [number, number, number] {
  const segments = GRADIENT_COLORS.length - 1;
  const seg = Math.min(Math.floor(t * segments), segments - 1);
  const localT = (t * segments) - seg;
  const c1 = GRADIENT_COLORS[seg];
  const c2 = GRADIENT_COLORS[seg + 1];
  return [
    Math.round(lerp(c1[0], c2[0], localT)),
    Math.round(lerp(c1[1], c2[1], localT)),
    Math.round(lerp(c1[2], c2[2], localT)),
  ];
}

export default function AmbientGradient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const container = containerRef.current;
    if (!container) return;

    const orb1 = container.children[0] as HTMLElement;
    const orb2 = container.children[1] as HTMLElement;

    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      const c1 = getColor(progress);
      const c2 = getColor((progress + 0.35) % 1);

      // Opacity ramp: visible immediately, peaks in middle, fades at very bottom
      let opacity = 0.55;
      if (progress < 0.02) opacity = lerp(0.4, 0.55, progress / 0.02);
      else if (progress > 0.95) opacity = lerp(0.55, 0.2, (progress - 0.95) / 0.05);

      orb1.style.background = `radial-gradient(circle at 30% 30%, rgba(${c1[0]}, ${c1[1]}, ${c1[2]}, 0.7) 0%, rgba(${c1[0]}, ${c1[1]}, ${c1[2]}, 0.25) 35%, transparent 65%)`;
      orb1.style.opacity = String(opacity);

      orb2.style.background = `radial-gradient(circle at 70% 70%, rgba(${c2[0]}, ${c2[1]}, ${c2[2]}, 0.7) 0%, rgba(${c2[0]}, ${c2[1]}, ${c2[2]}, 0.25) 35%, transparent 65%)`;
      orb2.style.opacity = String(opacity);
    }

    // Run immediately
    update();

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div
        className="absolute -top-[200px] -left-[200px] w-[900px] h-[900px]"
        style={{
          filter: 'blur(90px)',
          opacity: 0.4,
          transition: 'background 0.6s ease, opacity 0.4s ease',
        }}
      />
      <div
        className="absolute -bottom-[200px] -right-[200px] w-[900px] h-[900px]"
        style={{
          filter: 'blur(90px)',
          opacity: 0.4,
          transition: 'background 0.6s ease, opacity 0.4s ease',
        }}
      />
    </div>
  );
}

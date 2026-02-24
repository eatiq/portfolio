'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const GRADIENT_COLORS = [
  { r: 99, g: 102, b: 241 },   // Indigo
  { r: 139, g: 92, b: 246 },   // Purple
  { r: 236, g: 72, b: 153 },   // Pink
  { r: 34, g: 197, b: 94 },    // Green
  { r: 251, g: 146, b: 60 },   // Orange
  { r: 59, g: 130, b: 246 },   // Blue
  { r: 99, g: 102, b: 241 },   // Indigo (loop back)
];

function interpolateColor(
  colors: { r: number; g: number; b: number }[],
  t: number
): { r: number; g: number; b: number } {
  const segments = colors.length - 1;
  const segment = Math.min(Math.floor(t * segments), segments - 1);
  const localT = (t * segments) - segment;

  const c1 = colors[segment];
  const c2 = colors[segment + 1];

  return {
    r: Math.round(c1.r + (c2.r - c1.r) * localT),
    g: Math.round(c1.g + (c2.g - c1.g) * localT),
    b: Math.round(c1.b + (c2.b - c1.b) * localT),
  };
}

export default function AmbientGradient() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 30,
    restDelta: 0.001,
  });

  const [color1, setColor1] = useState('99, 102, 241');
  const [color2, setColor2] = useState('236, 72, 153');
  const [opacity, setOpacity] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v: number) => {
      // Cancel any pending frame
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const c1 = interpolateColor(GRADIENT_COLORS, v);
        const c2 = interpolateColor(GRADIENT_COLORS, (v + 0.35) % 1);
        setColor1(`${c1.r}, ${c1.g}, ${c1.b}`);
        setColor2(`${c2.r}, ${c2.g}, ${c2.b}`);

        // Fade in/out at edges
        let o = 0.18;
        if (v < 0.05) o = (v / 0.05) * 0.18;
        else if (v > 0.95) o = ((1 - v) / 0.05) * 0.18;
        setOpacity(o);
      });
    });

    return () => {
      unsubscribe();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [smoothProgress]);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Top-left orb */}
      <div
        className="absolute -top-[200px] -left-[200px] w-[800px] h-[800px]"
        style={{
          opacity,
          background: `radial-gradient(circle at 50% 50%, rgba(${color1}, 0.4) 0%, rgba(${color1}, 0.1) 40%, transparent 70%)`,
          filter: 'blur(80px)',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Bottom-right orb */}
      <div
        className="absolute -bottom-[200px] -right-[200px] w-[800px] h-[800px]"
        style={{
          opacity,
          background: `radial-gradient(circle at 50% 50%, rgba(${color2}, 0.4) 0%, rgba(${color2}, 0.1) 40%, transparent 70%)`,
          filter: 'blur(80px)',
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  );
}

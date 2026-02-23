'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const GRADIENT_COLORS = [
  { r: 59, g: 130, b: 246 },   // Blue
  { r: 139, g: 92, b: 246 },   // Purple
  { r: 236, g: 72, b: 153 },   // Pink
  { r: 34, g: 197, b: 94 },    // Green
  { r: 251, g: 146, b: 60 },   // Orange
  { r: 59, g: 130, b: 246 },   // Blue (loop back)
];

function interpolateColor(
  colors: { r: number; g: number; b: number }[],
  t: number
): string {
  const segments = colors.length - 1;
  const segment = Math.min(Math.floor(t * segments), segments - 1);
  const localT = (t * segments) - segment;

  const c1 = colors[segment];
  const c2 = colors[segment + 1];

  const r = Math.round(c1.r + (c2.r - c1.r) * localT);
  const g = Math.round(c1.g + (c2.g - c1.g) * localT);
  const b = Math.round(c1.b + (c2.b - c1.b) * localT);

  return `${r}, ${g}, ${b}`;
}

export default function AmbientGradient() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 30,
    restDelta: 0.001,
  });

  // We'll use a motion value to drive the gradient via CSS custom properties
  const opacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 0.12, 0.12, 0]);

  return (
    <>
      {/* Top-left orb */}
      <motion.div
        className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none -z-10"
        style={{ opacity }}
      >
        <GradientOrb progress={smoothProgress} offsetPhase={0} position="top-left" />
      </motion.div>

      {/* Bottom-right orb */}
      <motion.div
        className="fixed bottom-0 right-0 w-[600px] h-[600px] pointer-events-none -z-10"
        style={{ opacity }}
      >
        <GradientOrb progress={smoothProgress} offsetPhase={0.33} position="bottom-right" />
      </motion.div>
    </>
  );
}

function GradientOrb({
  progress,
  offsetPhase,
  position,
}: {
  progress: ReturnType<typeof useSpring>;
  offsetPhase: number;
  position: 'top-left' | 'bottom-right';
}) {
  const color = useTransform(progress, (v: number) => {
    const t = (v + offsetPhase) % 1;
    return interpolateColor(GRADIENT_COLORS, t);
  });

  const background = useTransform(
    color,
    (c: string) =>
      `radial-gradient(circle at ${
        position === 'top-left' ? '30% 30%' : '70% 70%'
      }, rgba(${c}, 0.15) 0%, transparent 70%)`
  );

  return (
    <motion.div
      className="w-full h-full blur-3xl"
      style={{ background }}
    />
  );
}

'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * AmbientGradient — a fixed, full-screen background layer that subtly shifts
 * color as the user scrolls through the page. The effect is barely perceptible:
 * soft radial gradients that drift between cool blues, warm purples, and muted
 * teals. Designed to add depth without competing with content.
 */
export default function AmbientGradient() {
  const { scrollYProgress } = useScroll();

  // Smooth out the scroll value so color transitions feel organic
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 40,
    restDelta: 0.001,
  });

  // Map scroll progress to hue rotation (0 → 360 over full page scroll)
  const hueRotate = useTransform(smoothProgress, [0, 1], [0, 60]);

  // Shift the vertical position of the gradient orb as user scrolls
  const orbY = useTransform(smoothProgress, [0, 0.5, 1], ['20%', '50%', '80%']);
  const orbX = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], ['30%', '60%', '40%', '70%', '35%']);

  // Second orb moves in the opposite direction for depth
  const orb2Y = useTransform(smoothProgress, [0, 0.5, 1], ['70%', '40%', '20%']);
  const orb2X = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], ['65%', '35%', '55%', '30%', '60%']);

  // Opacity pulses very subtly
  const opacity1 = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [0.03, 0.05, 0.04, 0.03]);
  const opacity2 = useTransform(smoothProgress, [0, 0.4, 0.7, 1], [0.02, 0.04, 0.05, 0.03]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary gradient orb — cool blue to purple */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(139, 92, 246, 0.3) 40%, transparent 70%)',
          left: orbX,
          top: orbY,
          x: '-50%',
          y: '-50%',
          opacity: opacity1,
          filter: `hue-rotate(${hueRotate}deg) blur(80px)`,
        }}
      />

      {/* Secondary gradient orb — teal to emerald */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.5) 0%, rgba(52, 211, 153, 0.2) 40%, transparent 70%)',
          left: orb2X,
          top: orb2Y,
          x: '-50%',
          y: '-50%',
          opacity: opacity2,
          filter: `hue-rotate(${hueRotate}deg) blur(100px)`,
        }}
      />
    </div>
  );
}

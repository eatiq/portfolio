'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Ambient scroll gradient — soft color orbs that shift as the user scrolls.
 *
 * Key design decisions:
 * - Three orbs (top-left, center-right, bottom-left) so color is visible
 *   behind content in the middle of the viewport, not just the edges.
 * - Colors are applied via inline style with CSS transition (1.2s ease)
 *   so the browser handles interpolation smoothly — no per-frame JS color math.
 * - Scroll position is sampled and only triggers a style update when the
 *   color segment changes (every ~17% of scroll), eliminating flicker.
 * - Large blur radius (120px) keeps the effect soft and atmospheric.
 */

const PALETTE = [
  { r: 99, g: 102, b: 241 },   // Indigo
  { r: 139, g: 92, b: 246 },   // Purple
  { r: 236, g: 72, b: 153 },   // Pink
  { r: 34, g: 197, b: 94 },    // Green
  { r: 251, g: 146, b: 60 },   // Orange
  { r: 59, g: 130, b: 246 },   // Blue
];

function colorAt(index: number) {
  const c = PALETTE[((index % PALETTE.length) + PALETTE.length) % PALETTE.length];
  return c;
}

function rgbaStr(c: { r: number; g: number; b: number }, a: number) {
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${a})`;
}

export default function AmbientGradient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSegmentRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const container = containerRef.current;
    if (!container) return;

    const orbs = Array.from(container.children) as HTMLElement[];

    function applyColors(segment: number) {
      // Each orb gets a different color from the palette, offset by position
      const c0 = colorAt(segment);
      const c1 = colorAt(segment + 2);
      const c2 = colorAt(segment + 4);

      orbs[0].style.background = `radial-gradient(circle at 30% 40%, ${rgbaStr(c0, 0.45)} 0%, ${rgbaStr(c0, 0.12)} 40%, transparent 70%)`;
      orbs[1].style.background = `radial-gradient(circle at 60% 50%, ${rgbaStr(c1, 0.35)} 0%, ${rgbaStr(c1, 0.1)} 40%, transparent 70%)`;
      orbs[2].style.background = `radial-gradient(circle at 40% 60%, ${rgbaStr(c2, 0.4)} 0%, ${rgbaStr(c2, 0.1)} 40%, transparent 70%)`;
    }

    // Apply initial colors
    applyColors(0);

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;

        const progress = Math.min(scrollTop / docHeight, 1);
        // Divide scroll into segments — one per palette color
        const segment = Math.floor(progress * PALETTE.length);

        if (segment !== lastSegmentRef.current) {
          lastSegmentRef.current = segment;
          applyColors(segment);
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted]);

  if (!mounted) return null;

  const orbBase: React.CSSProperties = {
    position: 'absolute',
    filter: 'blur(120px)',
    opacity: 0.35,
    transition: 'background 1.2s ease',
    willChange: 'background',
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Top-left orb */}
      <div
        style={{
          ...orbBase,
          top: '-10%',
          left: '-10%',
          width: '60%',
          height: '60%',
        }}
      />
      {/* Center-right orb — ensures color behind main content area */}
      <div
        style={{
          ...orbBase,
          top: '20%',
          right: '-10%',
          width: '55%',
          height: '55%',
        }}
      />
      {/* Bottom-left orb */}
      <div
        style={{
          ...orbBase,
          bottom: '-10%',
          left: '-5%',
          width: '60%',
          height: '60%',
        }}
      />
    </div>
  );
}

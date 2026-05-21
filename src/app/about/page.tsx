'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import FadeIn from '@/components/animations/FadeIn';
import PageTransition from '@/components/animations/PageTransition';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import { assets } from '@/lib/assets';

const FULL_NAME = 'Ehsan Atiq';

type ArtifactSize = 'sm' | 'md' | 'lg';

type ArtifactCfg = {
  size: ArtifactSize;
  top: string;
  rotate: number;
  enterFrom: 'left' | 'right';
};

const ARTIFACT_DIMENSIONS: Record<ArtifactSize, { w: number; h: number }> = {
  sm: { w: 100, h: 130 },
  md: { w: 150, h: 180 },
  lg: { w: 190, h: 230 },
};

type Stop = {
  marker: string;
  place: string;
  title: string;
  body: string;
  isPresent?: boolean;
  artifact?: ArtifactCfg;
};

const stops: Stop[] = [
  {
    marker: 'Then',
    place: 'Abu Dhabi',
    title: 'Beginnings',
    body: 'Born and raised. A city stacked with cultures taught me to look closely and read across them.',
    artifact: { size: 'md', top: '25%', rotate: -7, enterFrom: 'right' },
  },
  {
    marker: 'After',
    place: 'Elsewhere',
    title: 'Two more countries, plenty of travel',
    body: 'Three countries lived in. Plenty more passed through. All of it leeches into the work.',
    artifact: { size: 'lg', top: '30%', rotate: 8, enterFrom: 'left' },
  },
  {
    marker: 'High school',
    place: 'Self-taught',
    title: 'YouTube past midnight',
    body: 'Endless tutorials, late nights, the obsessive phase you don\u2019t fully come back from.',
    artifact: { size: 'sm', top: '45%', rotate: -12, enterFrom: 'left' },
  },
  {
    marker: 'Undergrad',
    place: 'First real clients',
    title: 'A music publication, an MTV brief',
    body: 'Rebranded a music publication working with clients including MTV and Vh1. Design got real.',
    artifact: { size: 'md', top: '20%', rotate: 6, enterFrom: 'right' },
  },
  {
    marker: '2016',
    place: 'Snoop',
    title: 'A CCTV app, #2 on Product Hunt',
    body: 'Co-founded Snoop. Watching strangers actually use the thing rewired me. UX stopped being a side thing.',
    artifact: { size: 'lg', top: '30%', rotate: -5, enterFrom: 'left' },
  },
  {
    marker: 'Seattle',
    place: 'Microsoft',
    title: 'Cross-country to Copilot',
    body: 'Drove across the country to join Microsoft. Years on Copilot\u2019s shopping experience and Windows Search \u2014 designing at the intersection of AI and everyday product.',
    artifact: { size: 'md', top: '25%', rotate: 9, enterFrom: 'right' },
  },
  {
    marker: 'Today',
    place: 'Bay Area',
    title: 'Designing at Meta',
    body: 'Still chasing the same thing \u2014 making someone\u2019s day a little easier.',
    isPresent: true,
    artifact: { size: 'lg', top: '35%', rotate: -6, enterFrom: 'right' },
  },
];

function HeroName() {
  const chars = FULL_NAME.split('');
  return (
    <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter leading-none text-foreground drop-shadow-[0_2px_30px_rgba(0,0,0,0.25)] text-center md:text-left">
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 40, rotate: -8 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{
            delay: 0.15 + i * 0.04,
            type: 'spring',
            stiffness: 220,
            damping: 16,
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h1>
  );
}

function StopArtifact({
  cfg,
  rowIndex,
  targetRef,
}: {
  cfg: ArtifactCfg;
  rowIndex: number;
  targetRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { w, h } = ARTIFACT_DIMENSIONS[cfg.size];

  // Entry direction: 'right' starts just outside the right gutter; 'left' starts
  // far across the page on the left and sails all the way over to its rest spot.
  const fromX = cfg.enterFrom === 'left' ? -1100 : 320;
  const startRotate = cfg.enterFrom === 'left' ? cfg.rotate - 28 : cfg.rotate + 28;

  // Vary the vertical approach per row so directions feel random (some drift
  // down from above, some rise up from below, some come in level).
  const yMode = (rowIndex * 7 + (cfg.enterFrom === 'left' ? 3 : 0)) % 3;
  const startY = yMode === 0 ? 70 : yMode === 1 ? -70 : 20;

  // Scroll progress is tied to this artifact's own row entering the viewport.
  // Each row owns a discrete scroll window, so artifacts trigger one at a time
  // as you actually scroll past each milestone.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 90%', 'start 40%'],
  });

  // Single smooth lerp from start point to rest. No keyframes, no zigzag.
  const x = useTransform(scrollYProgress, [0, 1], [fromX, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [startY, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [startRotate, cfg.rotate]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  return (
    <motion.div
      className="hidden xl:block absolute pointer-events-none z-0"
      style={{
        right: `-${w + 40}px`,
        top: cfg.top,
        width: w,
        height: h,
        x,
        y,
        rotate,
        opacity,
      }}
    >
      <div className="w-full h-full rounded-xl bg-foreground/[0.04] border border-foreground/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center">
        <span className="text-[9px] uppercase tracking-[0.25em] text-foreground/30 font-mono">
          Artifact
        </span>
      </div>
    </motion.div>
  );
}

function StopRow({ stop, index }: { stop: Stop; index: number }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={wrapperRef} className="relative">
      {stop.artifact && (
        <StopArtifact cfg={stop.artifact} rowIndex={index} targetRef={wrapperRef} />
      )}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 grid grid-cols-[96px_1fr] md:grid-cols-[200px_60px_1fr] gap-4 md:gap-8 py-24 md:py-40"
      >
        <div className="text-right">
          <div className="text-sm uppercase tracking-[0.2em] text-foreground/40">{stop.marker}</div>
          <div className="text-base md:text-lg font-medium text-foreground/70 mt-1.5">{stop.place}</div>
        </div>

        <div className="hidden md:flex justify-center pt-2">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
            className={`w-5 h-5 rounded-full border-2 ${
              stop.isPresent
                ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.15)]'
                : 'bg-background border-foreground'
            }`}
          />
        </div>

        <div>
          <h3 className="text-3xl md:text-4xl font-semibold tracking-tight leading-snug mb-4">
            {stop.title}
          </h3>
          <p className="text-lg md:text-xl leading-relaxed text-foreground/60 max-w-xl">
            {stop.body}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 60%', 'end 80%'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <PageTransition>
      <Navigation />

      {/* Hero — full-bleed photo, name overlaid, fades into the timeline */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={assets.about.photo1}
            alt="Ehsan Atiq"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-end pb-32 md:pb-40 px-6 md:px-12">
          <HeroName />
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-foreground/40 animate-[fadeIn_0.6s_ease-in-out_1.2s_both]">
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Journey track */}
      <section className="px-6 md:px-12 pt-8 md:pt-12 pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-20 md:mb-32 text-center">
              A map of how I got here.
            </h2>
          </FadeIn>

          <div ref={trackRef} className="relative">
            <div className="hidden md:block absolute left-[261px] top-0 bottom-0 w-px bg-foreground/10" />
            <motion.div
              style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
              className="hidden md:block absolute left-[261px] top-0 bottom-0 w-px bg-foreground"
            />

            {stops.map((stop, i) => (
              <StopRow key={stop.marker + stop.title} stop={stop} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
}

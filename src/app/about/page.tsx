'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import FadeIn from '@/components/animations/FadeIn';
import PageTransition from '@/components/animations/PageTransition';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import { assets } from '@/lib/assets';

const FULL_NAME = 'Ehsan Atiq';

type ArtifactSize = 'sm' | 'md' | 'lg';

// Media for a stop's artifact. `src` accepts either an R2 URL (see lib/assets)
// or a local path under /public (e.g. '/artifacts/snoop.png'). `width`/`height`
// are the source's intrinsic pixel size — used to preserve aspect ratio so the
// artifact is never cropped.
type ArtifactMedia = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  width: number;
  height: number;
  poster?: string;
};

type ArtifactCfg = {
  size: ArtifactSize;
  top: string;
  rotate: number;
  enterFrom: 'left' | 'right';
  // Extra horizontal nudge (px) past the default rest position, used to stagger
  // multiple artifacts in the same stop so they don't stack vertically.
  offsetX?: number;
  media?: ArtifactMedia;
};

// Target longest edge (px) per size tier. An artifact's actual width/height are
// derived from its source aspect ratio and scaled so the longer side hits this
// value — giving consistent visual weight without cropping.
const ARTIFACT_LONGEST_EDGE: Record<ArtifactSize, number> = {
  sm: 170,
  md: 230,
  lg: 290,
};

// Box used for the placeholder card when an artifact has no media yet.
const PLACEHOLDER_RATIO = 0.72; // width / height (portrait)

function artifactDimensions(cfg: ArtifactCfg): { w: number; h: number } {
  const longest = ARTIFACT_LONGEST_EDGE[cfg.size];
  if (!cfg.media) {
    return { w: Math.round(longest * PLACEHOLDER_RATIO), h: longest };
  }
  const { width, height } = cfg.media;
  const scale = longest / Math.max(width, height);
  return { w: Math.round(width * scale), h: Math.round(height * scale) };
}

const SCROLL_SPRING = {
  stiffness: 120,
  damping: 30,
  mass: 0.25,
};

type Stop = {
  marker: string;
  place: string;
  title: string;
  body: string;
  isPresent?: boolean;
  artifacts?: ArtifactCfg[];
  cta?: { label: string; href: string };
};

const stops: Stop[] = [
  {
    marker: '1990s',
    place: 'Abu Dhabi & Hyderabad',
    title: 'Beginnings',
    body: 'Born between two cities that never quite agreed with each other. I learned to read a room before I could read a book.',
    artifacts: [
      {
        size: 'md', top: '14%', rotate: -7, enterFrom: 'right',
        media: {
          type: 'image',
          src: '/artifacts/abu-dhabi-refreshments.png',
          alt: 'Refreshments 2000 juice shop in Abu Dhabi',
          width: 768, height: 1024,
        },
      },
      {
        size: 'sm', top: '56%', rotate: 8, enterFrom: 'left',
        media: {
          type: 'image',
          src: '/artifacts/abu-dhabi-dome.png',
          alt: 'A domed mausoleum with a green tiled cupola against a hazy sky',
          width: 584, height: 822,
        },
      },
    ],
  },
  {
    marker: 'Early 2010s',
    place: 'Self-taught',
    title: 'YouTube past midnight',
    body: 'Pirated Photoshop, a slow connection, and YouTube past midnight. I spent those nights editing my own face into something cooler, chasing clout one composite at a time.',
    artifacts: [
      {
        size: 'md', top: '18%', rotate: -10, enterFrom: 'left',
        media: {
          type: 'image',
          src: '/artifacts/youtube-surreal-composite.png',
          alt: 'Early Photoshop composite \u2014 a surreal dreamscape of dinosaurs, an elephant, and a moon',
          width: 900, height: 900,
        },
      },
      {
        size: 'sm', top: '52%', rotate: 9, enterFrom: 'right',
        media: {
          type: 'image',
          src: '/artifacts/youtube-smoothie-edit.png',
          alt: 'Early Photoshop edit \u2014 a glitchy portrait behind a row of smoothies',
          width: 604, height: 453,
        },
      },
    ],
  },
  {
    marker: 'Mid 2010s',
    place: 'First real clients',
    title: 'A music publication, an MTV brief',
    body: 'Rebranded a music publication and somehow ended up with MTV and Vh1 in the room. Design got real, fast.',
    cta: { label: 'Read more', href: '/work/awaaz' },
    artifacts: [
      {
        size: 'lg', top: '16%', rotate: 6, enterFrom: 'right',
        media: {
          type: 'image',
          src: '/artifacts/music-pub-vuja-de.png',
          alt: 'vuj\u00e0 d\u00e9 episode 13 gig poster for Martin Roth',
          width: 723, height: 1024,
        },
      },
      {
        size: 'md', top: '54%', rotate: -8, enterFrom: 'left',
        media: {
          type: 'image',
          src: '/artifacts/music-pub-bass-sanskriti.png',
          alt: 'Bass Sanskriti at the Farm gig poster',
          width: 723, height: 1024,
        },
      },
    ],
  },
  {
    marker: '2016',
    place: 'Snoop',
    title: 'A CCTV app, #2 on Product Hunt',
    body: 'Co-founded Snoop. Watching strangers actually use the thing rewired me. UX stopped being a side thing.',
    artifacts: [
      {
        size: 'lg', top: '30%', rotate: -5, enterFrom: 'left',
        media: {
          type: 'image',
          src: '/artifacts/snoop-cast-watch.png',
          alt: 'Snoop app screen \u2014 choose to either cast or watch',
          width: 392, height: 696,
        },
      },
    ],
  },
  {
    marker: '2018',
    place: 'SCAD',
    title: 'Across an ocean to art school',
    body: 'Crossed an ocean to study the thing I\u2019d been faking on instinct. Turns out it has rules. Some of them are even right.',
    cta: { label: 'Read more', href: '/work/sublime' },
    artifacts: [
      {
        size: 'lg', top: '28%', rotate: -6, enterFrom: 'left',
        media: {
          type: 'image',
          src: '/artifacts/scad-projection.png',
          alt: 'Kaleidoscopic light projection mapped onto a tower at night',
          width: 650, height: 986,
        },
      },
    ],
  },
  {
    marker: '2018',
    place: 'Google',
    title: 'Interning at Google',
    body: 'My first taste of scale. I pitched an AR walking-navigation concept that became the basis for what shipped as Live View.',
    artifacts: [
      {
        size: 'md', top: '22%', rotate: 7, enterFrom: 'right',
        media: {
          type: 'image',
          src: '/artifacts/google-visual-relaxation.png',
          alt: 'AR walking-navigation concept \u2014 a Visual Relaxation route guiding the user straight ahead',
          width: 540, height: 956,
        },
      },
    ],
  },
  {
    marker: '2018',
    place: 'Samsung',
    title: 'Then Samsung',
    body: 'Designing for something people physically hold. A 2px change suddenly mattered to millions of thumbs.',
    artifacts: [
      {
        size: 'md', top: '40%', rotate: -10, enterFrom: 'left',
        media: {
          type: 'image',
          src: '/artifacts/samsung-fold.png',
          alt: 'A Samsung Galaxy Fold held open, showing the home screen',
          width: 568, height: 646,
        },
      },
    ],
  },
  {
    marker: '2019',
    place: 'Carter\u2019s',
    title: 'Retail, at real scale',
    body: 'Designed for exhausted parents shopping one-handed at 2am. Nothing humbles a pretty mockup faster.',
    cta: { label: 'Read more', href: '/work/carters' },
    artifacts: [
      {
        size: 'md', top: '14%', rotate: 5, enterFrom: 'right',
        media: {
          type: 'image',
          src: '/artifacts/carters-product.png',
          alt: 'Carter\u2019s app product page \u2014 a striped pique polo for toddlers',
          width: 460, height: 1024,
        },
      },
      {
        size: 'md', top: '42%', rotate: -7, enterFrom: 'left', offsetX: 64,
        media: {
          type: 'image',
          src: '/artifacts/carters-home.png',
          alt: 'Carter\u2019s app home screen \u2014 a personalized \u201cHey Stacey!\u201d greeting with delivery tracking',
          width: 455, height: 1024,
        },
      },
    ],
  },
  {
    marker: '2021',
    place: 'Microsoft',
    title: 'Cross-country to Copilot',
    body: 'Drove across the country with everything I owned to work on Copilot and Windows Search, designing for AI back when it still felt like a bet.',
    artifacts: [
      {
        size: 'md', top: '25%', rotate: 9, enterFrom: 'right',
        media: {
          type: 'image',
          src: '/artifacts/microsoft-windows-search.png',
          alt: 'Windows Search results showing the Halo Infinite best match',
          width: 1004, height: 970,
        },
      },
    ],
  },
  {
    marker: 'Now',
    place: 'Bay Area',
    title: 'Designing at Meta',
    body: 'Still chasing the same thing: making someone\u2019s day a little easier.',
    isPresent: true,
    artifacts: [
      {
        size: 'md', top: '14%', rotate: -6, enterFrom: 'right',
        media: {
          type: 'image',
          src: '/artifacts/meta-ai-search.png',
          alt: 'Meta AI search results for things to do in San Francisco',
          width: 473, height: 1024,
        },
      },
      {
        size: 'md', top: '42%', rotate: 7, enterFrom: 'left', offsetX: 64,
        media: {
          type: 'image',
          src: '/artifacts/meta-ai-skincare.png',
          alt: 'Meta search for skincare with a sponsored CeraVe result',
          width: 472, height: 1024,
        },
      },
    ],
  },
];

function HeroName({ start }: { start: boolean }) {
  const chars = FULL_NAME.split('');
  return (
    <h1 className="text-6xl md:text-[8rem] font-bold tracking-tighter leading-none text-foreground drop-shadow-[0_2px_30px_rgba(0,0,0,0.25)] text-center md:text-left">
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 40, rotate: -8 }}
          animate={start ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 40, rotate: -8 }}
          transition={{
            // Name begins a beat after the photo settles, so the reveal reads
            // as one motion: image fades in, then the letters rise to meet it.
            delay: 0.25 + i * 0.04,
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
  const { w, h } = artifactDimensions(cfg);
  const shouldReduceMotion = useReducedMotion();

  // Artifacts rest just past the description's right edge (REST_LEFT px into the
  // gutter) and are clipped by the parent stage, so nothing is visible over the
  // text. Entry travel is kept short:
  //   'left'  — starts fully tucked behind the description edge, then slides out.
  //   'right' — starts off the right of the gutter, then slides left to rest.
  const restLeft = 24 + (cfg.offsetX ?? 0);
  const fromX = cfg.enterFrom === 'left' ? -(restLeft + w + 24) : 220;
  const startRotate = cfg.enterFrom === 'left' ? cfg.rotate - 18 : cfg.rotate + 18;

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
  const smoothProgress = useSpring(scrollYProgress, SCROLL_SPRING);

  // Single smooth lerp from start point to rest. No keyframes, no zigzag.
  const x = useTransform(smoothProgress, [0, 1], [shouldReduceMotion ? 0 : fromX, 0]);
  const y = useTransform(smoothProgress, [0, 1], [shouldReduceMotion ? 0 : startY, 0]);
  const rotate = useTransform(smoothProgress, [0, 1], [
    shouldReduceMotion ? cfg.rotate : startRotate,
    cfg.rotate,
  ]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 1], [0, 1, 1]);

  return (
    <motion.div
      className="absolute pointer-events-none z-0"
      style={{
        left: `${restLeft}px`,
        top: cfg.top,
        width: w,
        height: h,
        x,
        y,
        rotate,
        opacity,
        willChange: 'transform, opacity',
      }}
    >
      {cfg.media ? (
        <div className="relative w-full h-full rounded-xl overflow-hidden border border-foreground/10 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
          {cfg.media.type === 'video' ? (
            <video
              src={cfg.media.src}
              poster={cfg.media.poster}
              autoPlay
              loop
              muted
              playsInline
              aria-label={cfg.media.alt}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={cfg.media.src}
              alt={cfg.media.alt}
              fill
              sizes="(min-width: 1280px) 290px, 1px"
              className="object-cover"
            />
          )}
        </div>
      ) : (
        <div className="w-full h-full rounded-xl bg-foreground/[0.04] border border-foreground/10 shadow-[0_2px_10px_rgba(0,0,0,0.05)] flex items-center justify-center">
          <span className="text-[9px] uppercase tracking-[0.25em] text-foreground/30 font-mono">
            Artifact
          </span>
        </div>
      )}
    </motion.div>
  );
}

// Render a marker, shrinking a trailing decade "s" (e.g. 1990s, 2020s) so it
// doesn't read as a full-size capital next to the year digits.
function renderMarker(marker: string) {
  const match = marker.match(/^(.*\d)(s)$/);
  if (!match) return marker;
  return (
    <>
      {match[1]}
      <span className="text-[0.65em] tracking-normal">{match[2]}</span>
    </>
  );
}

function StopRow({ stop, index }: { stop: Stop; index: number }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={wrapperRef} className="relative">
      {/* Artifact stage: begins at the description's right edge and clips its
          overflow horizontally, so artifacts are only ever visible in the gutter
          and slide in/out from behind that edge rather than flying across the
          text. The stage is taller than the row (300px slack top/bottom) so tall
          artifacts are never clipped vertically; the inner box is sized exactly
          to the row so each artifact's `top` percentage still resolves correctly. */}
      <div
        className="hidden xl:block absolute left-full overflow-hidden pointer-events-none z-0"
        style={{ top: '-300px', bottom: '-300px', right: '-50vw' }}
      >
        <div className="absolute left-0 right-0" style={{ top: '300px', bottom: '300px' }}>
          {stop.artifacts?.map((cfg, i) => (
            <StopArtifact
              key={`${stop.marker}-artifact-${i}`}
              cfg={cfg}
              rowIndex={index * 3 + i}
              targetRef={wrapperRef}
            />
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px -15% 0px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 grid grid-cols-[96px_1fr] md:grid-cols-[200px_60px_1fr] gap-4 md:gap-8 py-32 md:py-56"
      >
        <div className="text-right">
          <div className="text-sm uppercase tracking-[0.2em] text-foreground/40">{renderMarker(stop.marker)}</div>
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
          {stop.cta && (
            <Link
              href={stop.cta.href}
              className="group mt-5 inline-flex items-center gap-1.5 text-base md:text-lg font-medium text-foreground transition-opacity hover:opacity-70"
            >
              {stop.cta.label}
              <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Full-bleed hero photo, name overlaid. The photo fades + settles in once the
// image actually finishes loading (rather than popping in), and the name reveal
// is gated on that same event so text and image arrive as one coordinated beat.
function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Images served from cache can finish loading before React attaches `onLoad`,
  // so check `complete` on mount to avoid the animation never firing.
  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <motion.img
          ref={imgRef}
          src={assets.about.photo1}
          alt="Ehsan Atiq"
          onLoad={() => setLoaded(true)}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
          animate={
            loaded
              ? { opacity: 1, scale: 1 }
              : shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.08 }
          }
          transition={{
            opacity: { duration: 1, ease: 'easeOut' },
            scale: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-end pb-32 md:pb-40 px-6 md:px-12">
        <HeroName start={loaded} />
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-foreground/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6, delay: loaded ? 0.9 : 0 }}
      >
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
      </motion.div>
    </section>
  );
}

export default function AboutPage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 60%', 'end 80%'],
  });
  const smoothTrackProgress = useSpring(scrollYProgress, SCROLL_SPRING);
  const lineScaleY = useTransform(smoothTrackProgress, [0, 1], [0, 1]);

  return (
    <PageTransition>
      <Navigation />

      {/* Hero — full-bleed photo, name overlaid, fades into the timeline */}
      <HeroSection />

      {/* Journey track */}
      <section className="px-6 md:px-12 pt-8 md:pt-12 pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="mb-20 md:mb-32 text-center">
              <p className="text-2xl md:text-3xl leading-relaxed text-foreground max-w-4xl mx-auto mb-16 md:mb-24">
                I’m a product of my experiences. Of the places that made me and the one I call home. Of the family that raised me, the values they handed down, and the beliefs I’ve chosen to keep. Design is just where all of that ends up.
              </p>
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight max-w-4xl mx-auto">
                I’ve never taken the straight path. Here’s the actual one.
              </h2>
            </div>
          </FadeIn>

          <div ref={trackRef} className="relative xl:-translate-x-44">
            <div className="hidden md:block absolute left-[261px] top-0 bottom-0 w-px bg-foreground/10" />
            <motion.div
              style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
              className="hidden md:block absolute left-[261px] top-0 bottom-0 w-px bg-foreground will-change-transform"
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

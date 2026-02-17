'use client';

import { useState, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';
import PageTransition from '@/components/animations/PageTransition';

const PatternConstruction = dynamic(
  () => import('@/components/experiments/PatternConstruction'),
  { ssr: false }
);
const ArabicCalligraphy = dynamic(
  () => import('@/components/experiments/ArabicCalligraphy'),
  { ssr: false }
);
const RaymarchedMashrabiya = dynamic(
  () => import('@/components/experiments/RaymarchedMashrabiya'),
  { ssr: false }
);
const InfiniteZellige = dynamic(
  () => import('@/components/experiments/InfiniteZellige'),
  { ssr: false }
);

type Experiment = {
  id: string;
  title: string;
  description: string;
  tech: string;
  component: React.ComponentType;
};

const experiments: Experiment[] = [
  {
    id: 'pattern-construction',
    title: 'Scroll-Driven Pattern Construction',
    description:
      'Step-by-step construction of an 8-pointed Islamic star pattern. Scroll to build.',
    tech: 'SVG + Framer Motion',
    component: PatternConstruction,
  },
  {
    id: 'arabic-calligraphy',
    title: 'Generative Arabic Calligraphy',
    description:
      'Animated reed-pen calligraphy writing Arabic script with ink physics.',
    tech: 'Canvas 2D',
    component: ArabicCalligraphy,
  },
  {
    id: 'raymarched-mashrabiya',
    title: 'Raymarched Mashrabiya',
    description:
      '3D Islamic lattice screen with volumetric light filtering through. Pure shader math.',
    tech: 'GLSL Raymarching',
    component: RaymarchedMashrabiya,
  },
  {
    id: 'infinite-zellige',
    title: 'Infinite Zellige Zoom',
    description:
      'Fractal Islamic tilework you can zoom into forever. Each tile contains the pattern.',
    tech: 'GLSL Fractal Shader',
    component: InfiniteZellige,
  },
];

function ExperimentCard({
  experiment,
  onExpand,
}: {
  experiment: Experiment;
  onExpand: () => void;
}) {
  const Component = experiment.component;

  return (
    <motion.div
      layout
      className="relative group rounded-2xl border border-foreground/10 overflow-hidden bg-background"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-foreground/5">
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center text-foreground/30">
              Loading...
            </div>
          }
        >
          <Component />
        </Suspense>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight truncate">
              {experiment.title}
            </h3>
            <p className="text-sm text-foreground/50 mt-1 line-clamp-2">
              {experiment.description}
            </p>
          </div>
          <button
            onClick={onExpand}
            className="shrink-0 p-2 rounded-lg border border-foreground/10 hover:border-foreground/30 hover:bg-foreground/5 transition-colors"
            aria-label="Expand to fullscreen"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 3h6m0 0v6m0-6L14 10M9 21H3m0 0v-6m0 6l7-7" />
            </svg>
          </button>
        </div>
        <div className="mt-3">
          <span className="text-xs px-2 py-1 rounded-full bg-accent-teal/10 text-accent-teal font-medium">
            {experiment.tech}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function FullscreenView({
  experiment,
  onClose,
}: {
  experiment: Experiment;
  onClose: () => void;
}) {
  const Component = experiment.component;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background"
    >
      <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            {experiment.title}
          </h2>
          <p className="text-sm text-foreground/50">{experiment.tech}</p>
        </div>
        <button
          onClick={onClose}
          className="p-3 rounded-xl border border-foreground/10 hover:border-foreground/30 bg-background/80 backdrop-blur-sm transition-colors"
          aria-label="Close fullscreen"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="w-full h-full">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center text-foreground/30">
              Loading...
            </div>
          }
        >
          <Component />
        </Suspense>
      </div>
    </motion.div>
  );
}

export default function SandboxPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleExpand = useCallback((id: string) => {
    setExpandedId(id);
  }, []);

  const handleClose = useCallback(() => {
    setExpandedId(null);
  }, []);

  const expandedExperiment = experiments.find((e) => e.id === expandedId);

  return (
    <PageTransition>
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <header className="px-6 md:px-12 pt-32 pb-8 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
          Sandbox
        </h1>
        <p className="text-lg text-foreground/60 mt-3 max-w-2xl tracking-tight">
          Visual experiments exploring Islamic geometry, Middle Eastern
          aesthetics, and cultural identity. Click the expand icon on any
          experiment to view it fullscreen.
        </p>
      </header>

      <main className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {experiments.map((experiment) => (
            <ExperimentCard
              key={experiment.id}
              experiment={experiment}
              onExpand={() => handleExpand(experiment.id)}
            />
          ))}
        </div>
      </main>

      <AnimatePresence>
        {expandedExperiment && (
          <FullscreenView
            experiment={expandedExperiment}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
    </PageTransition>
  );
}

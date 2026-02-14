'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';

type CaseStudySectionProps = {
  label?: string;
  title: string;
  children: ReactNode;
  delay?: number;
};

export default function CaseStudySection({ label, title, children, delay = 0.1 }: CaseStudySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.3'],
  });

  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 20 });
  const rawY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const y = useSpring(rawY, { stiffness: 80, damping: 20, mass: 0.8 });

  // The label number slides in from the left
  const rawLabelX = useTransform(scrollYProgress, [0, 1], [-20, 0]);
  const labelX = useSpring(rawLabelX, { stiffness: 100, damping: 20 });

  return (
    <div ref={ref} className="mb-16 md:mb-24">
      <motion.div style={{ opacity, y }}>
        {label && (
          <motion.span
            className="text-sm font-semibold text-foreground/40 uppercase tracking-wider mb-4 block"
            style={{ x: labelX }}
          >
            {label}
          </motion.span>
        )}
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
          {title}
        </h3>
      </motion.div>
      <motion.div
        style={{ opacity, y }}
        className="space-y-4 text-foreground/70 leading-relaxed"
      >
        {children}
      </motion.div>
    </div>
  );
}

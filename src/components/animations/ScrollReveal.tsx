'use client';

import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  width?: 'full' | 'content';
}

export default function ScrollReveal({
  children,
  className = '',
  width = 'full',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 20 });
  const rawY = useTransform(scrollYProgress, [0, 0.6], [40, 0]);
  const y = useSpring(rawY, { stiffness: 100, damping: 20, mass: 0.8 });
  const rawBlur = useTransform(scrollYProgress, [0, 0.6], [6, 0]);
  const blur = useSpring(rawBlur, { stiffness: 100, damping: 20 });
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <div
      ref={ref}
      className={`${width === 'full' ? 'w-full' : ''} ${className}`}
    >
      <motion.div
        style={{
          opacity,
          y,
          filter,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

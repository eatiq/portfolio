'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  className = '',
}: FadeInProps) {
  const directionOffset = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { y: 0, x: 24 },
    right: { y: 0, x: -24 },
    none: { y: 0, x: 0 },
  };

  const offset = directionOffset[direction];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: offset.y,
        x: offset.x,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


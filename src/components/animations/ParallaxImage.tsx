'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxImageProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

export default function ParallaxImage({
  children,
  className = '',
  offset = 50,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const y = useSpring(rawY, { stiffness: 100, damping: 30, mass: 0.5 });
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);
  const scale = useSpring(rawScale, { stiffness: 100, damping: 30, mass: 0.5 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y, scale, opacity }}>
        {children}
      </motion.div>
    </div>
  );
}

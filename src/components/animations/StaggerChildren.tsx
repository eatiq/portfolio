'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayStart?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerDelay: number; delayStart: number }) => ({
    opacity: 1,
    transition: {
      delayChildren: custom.delayStart,
      staggerChildren: custom.staggerDelay,
    },
  }),
};

export const staggerItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      mass: 0.8,
    },
  },
};

export default function StaggerChildren({
  children,
  className = '',
  staggerDelay = 0.08,
  delayStart = 0.1,
}: StaggerChildrenProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={{ staggerDelay, delayStart }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

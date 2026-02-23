'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import VideoPlayer from './VideoPlayer';

type ProjectShowcaseProps = {
  src: string;
  title: string;
  description: string;
  index: number;
  layout?: 'landscape' | 'portrait';
  aspectRatio?: 'auto' | 'square';
};

export default function ProjectShowcase({
  src,
  title,
  description,
  index,
  layout = 'portrait',
  aspectRatio = 'auto',
}: ProjectShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 20 });
  const rawY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });

  // Alternate gradient color for visual variety
  const isReverse = index % 2 === 1;

  const gradientOrb = (
    <motion.div
      className="absolute -z-10 w-64 h-64 rounded-full opacity-20 blur-3xl"
      style={{
        background: isReverse
          ? 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );

  const videoContainer = (
    <div className="rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl">
      <VideoPlayer src={src} aspectRatio={aspectRatio} />
    </div>
  );

  const titleBlock = (
    <div>
      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 leading-tight">
        {title}
      </h3>
      <motion.div
        className="h-1 bg-gradient-to-r from-foreground/20 to-transparent rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: layout === 'landscape' ? '40%' : '60%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </div>
  );

  const techTags = (
    <div className="flex flex-wrap gap-2 pt-4">
      {getTechTags(description).map((tag, idx) => (
        <motion.span
          key={tag}
          className="px-3 py-1 text-xs font-medium rounded-full bg-foreground/5 border border-foreground/10 text-foreground/60"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: idx * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );

  if (layout === 'landscape') {
    return (
      <motion.div
        ref={containerRef}
        style={{ opacity, y }}
        className="relative overflow-hidden"
      >
        <div className="space-y-8">
          <div className="relative overflow-hidden">
            {gradientOrb}
            {videoContainer}
          </div>
          <div className="space-y-6 max-w-3xl">
            {titleBlock}
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
              {description}
            </p>
            {techTags}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, y }}
      className="relative overflow-hidden"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`}
      >
        <div
          className={`lg:col-span-7 relative ${
            isReverse ? 'lg:col-start-6' : 'lg:col-start-1'
          }`}
        >
          {gradientOrb}
          {videoContainer}
        </div>

        <div
          className={`lg:col-span-5 space-y-6 ${
            isReverse ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8'
          }`}
        >
          {titleBlock}
          <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
            {description}
          </p>
          {techTags}
        </div>
      </div>
    </motion.div>
  );
}

// Helper to extract technology mentions from description
function getTechTags(description: string): string[] {
  const techKeywords = [
    'SwiftUI',
    'AVKit',
    'Vision',
    'Metal',
    'Object Detection',
    'Face Recognition',
    'Llama API',
    'React',
    'Canvas API',
    'Web Audio API',
  ];

  return techKeywords.filter((keyword) =>
    description.toLowerCase().includes(keyword.toLowerCase())
  );
}

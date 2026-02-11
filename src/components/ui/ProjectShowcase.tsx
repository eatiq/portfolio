'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import VideoPlayer from './VideoPlayer';

type ProjectShowcaseProps = {
  src: string;
  title: string;
  description: string;
  index: number;
};

export default function ProjectShowcase({
  src,
  title,
  description,
  index,
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

  // Alternate layout for visual variety
  const isReverse = index % 2 === 1;

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, y }}
      className="relative"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
          isReverse ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Video Section */}
        <div
          className={`lg:col-span-7 relative ${
            isReverse ? 'lg:col-start-6' : 'lg:col-start-1'
          }`}
        >
          {/* Decorative gradient orb */}
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

          {/* Video container with subtle border and shadow */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10 rounded-3xl transform translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300" />
            <div className="relative rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl">
              <VideoPlayer src={src} />
            </div>
          </div>


        </div>

        {/* Content Section */}
        <div
          className={`lg:col-span-5 space-y-6 ${
            isReverse ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8'
          }`}
        >
          {/* Title with gradient underline */}
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 leading-tight">
              {title}
            </h3>
            <motion.div
              className="h-1 bg-gradient-to-r from-foreground/20 to-transparent rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '60%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
            {description}
          </p>

          {/* Tech tags or decorative element */}
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
    'AI',
    'Object Detection',
    'Face Recognition',
  ];

  return techKeywords.filter((keyword) =>
    description.toLowerCase().includes(keyword.toLowerCase())
  );
}

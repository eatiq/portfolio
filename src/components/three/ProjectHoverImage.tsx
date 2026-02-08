'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type ProjectHoverImageProps = {
  activeProject: string | null;
  projectImages: Record<string, string>;
};

export default function ProjectHoverImage({ activeProject, projectImages }: ProjectHoverImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring-based smooth following with inertia
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.5 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX - 160);
    mouseY.set(e.clientY - 100);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence mode="wait">
        {activeProject && projectImages[activeProject] && (
          <motion.div
            key={activeProject}
            className="absolute w-[320px] h-[200px] overflow-hidden rounded-lg"
            style={{
              x: springX,
              y: springY,
            }}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 30,
              mass: 0.8,
            }}
          >
            {/* Gradient overlay for the glass/refraction look */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10 z-10 mix-blend-overlay" />
            
            {/* Placeholder with project-specific gradient since we don't have real images yet */}
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{
                background: projectImages[activeProject],
              }}
            >
              <span className="text-white/60 text-sm font-medium tracking-wider uppercase">
                {activeProject.replace('-', ' ')}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

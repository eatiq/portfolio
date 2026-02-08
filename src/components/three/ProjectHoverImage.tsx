'use client';

import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type ProjectHoverImageProps = {
  activeProject: string | null;
  projectImages: Record<string, string>;
};

export default function ProjectHoverImage({ activeProject, projectImages }: ProjectHoverImageProps) {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring-based smooth following with inertia
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.5 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX + 20);
    mouseY.set(e.clientY - 100);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence mode="wait">
        {activeProject && projectImages[activeProject] && (
          <motion.div
            key={activeProject}
            className="absolute w-[320px] h-[200px] overflow-hidden rounded-lg shadow-2xl"
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
            {/* Subtle glass overlay for the refraction look */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10 z-10 mix-blend-overlay" />
            
            {/* Real project thumbnail image */}
            <img
              src={projectImages[activeProject]}
              alt={activeProject.replace('-', ' ')}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
}

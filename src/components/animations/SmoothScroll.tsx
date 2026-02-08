'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const initLenis = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default;
        
        const lenis = new Lenis({
          duration: 0.6,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1.2,
          touchMultiplier: 1.5,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      } catch (e) {
        console.warn('Smooth scroll not available:', e);
      }
    };

    initLenis();

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}

'use client';

import FadeIn from '@/components/animations/FadeIn';
import ProjectHoverImage from '@/components/three/ProjectHoverImage';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { assets } from '@/lib/assets';

type SelectedWorkItem = {
  company: string;
  project: string;
  slug: string;
};

interface SelectedWorksProps {
  items?: SelectedWorkItem[];
}

// Real project thumbnail images from R2
const projectImages: Record<string, string> = {
  'meta-ai': assets.homepage.metaThumb,
  'copilot-shopping': assets.homepage.copilotThumb,
  'windows-search': assets.homepage.windowsThumb,
};

export default function SelectedWorks({
  items = [
    { company: 'Meta', project: 'Facebook Search + Meta AI', slug: 'meta-ai' },
    { company: 'Microsoft', project: 'Copilot Shopping', slug: 'copilot-shopping' },
    { company: 'Microsoft', project: 'Windows Search', slug: 'windows-search' },
  ],
}: SelectedWorksProps) {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const handleHoverStart = useCallback((slug: string) => {
    setActiveProject(slug);
    window.dispatchEvent(new CustomEvent('projectHoverStart'));
  }, []);

  const handleHoverEnd = useCallback(() => {
    setActiveProject(null);
    window.dispatchEvent(new CustomEvent('projectHoverEnd'));
  }, []);

  return (
    <div className="w-full">
      <FadeIn delay={0.1}>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-10">
          Selected works
        </h2>
      </FadeIn>

      <ProjectHoverImage activeProject={activeProject} projectImages={projectImages} />

      <ul className="space-y-2 md:space-y-0">
        {items.map((item, idx) => (
          <FadeIn key={`${item.company}-${item.project}`} delay={0.15 + idx * 0.1}>
            <li>
              <Link
                href={`/work/${item.slug}`}
                className="group block"
                onMouseEnter={() => handleHoverStart(item.slug)}
                onMouseLeave={handleHoverEnd}
              >
                <motion.div
                  className="py-5 md:py-7 border-b border-foreground/[0.06] flex flex-wrap items-baseline gap-x-4 transition-colors group-hover:border-foreground/20"
                  whileHover={{ x: 12 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  <span className="text-xl md:text-3xl font-extrabold tracking-tight group-hover:text-foreground transition-colors">
                    {item.company}
                  </span>
                  <motion.span
                    className="text-foreground/20 group-hover:text-foreground/40 transition-colors"
                    animate={activeProject === item.slug ? { rotate: 90 } : { rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    //
                  </motion.span>
                  <span className="text-xl md:text-3xl tracking-tight text-foreground/60 group-hover:text-foreground/90 transition-colors">
                    {item.project}
                  </span>

                  {/* Arrow indicator on hover */}
                  <motion.span
                    className="ml-auto text-foreground/0 group-hover:text-foreground/50 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 5l7 7-7 7"></path>
                    </svg>
                  </motion.span>
                </motion.div>
              </Link>
            </li>
          </FadeIn>
        ))}
      </ul>
    </div>
  );
}

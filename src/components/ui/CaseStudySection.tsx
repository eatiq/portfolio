'use client';

import FadeIn from '@/components/animations/FadeIn';
import { ReactNode } from 'react';

type CaseStudySectionProps = {
  label?: string;
  title: string;
  children: ReactNode;
  delay?: number;
};

export default function CaseStudySection({ label, title, children, delay = 0.1 }: CaseStudySectionProps) {
  return (
    <div className="mb-16 md:mb-24">
      <FadeIn delay={delay}>
        {label && (
          <span className="text-sm text-foreground/30 font-mono mb-2 block">
            {label}
          </span>
        )}
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
          {title}
        </h3>
      </FadeIn>
      <FadeIn delay={delay + 0.05}>
        <div className="space-y-4 text-foreground/70 leading-relaxed">
          {children}
        </div>
      </FadeIn>
    </div>
  );
}

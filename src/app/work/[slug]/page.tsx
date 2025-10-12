'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import UnlockPrompt from '@/components/ui/UnlockPrompt';
import LockedContent from '@/components/ui/LockedContent';

type ProjectData = {
  company: string;
  title: string;
  description: string;
  role: string;
  year: string;
  duration: string;
  isLocked?: boolean;
  unlockCode?: string;
};

const projects: Record<string, ProjectData> = {
  'meta-ai': {
    company: 'Meta',
    title: 'Facebook Search + Meta AI',
    description: 'Designing the next generation of AI-powered search experiences for billions of users across Facebook platforms.',
    role: 'Product Designer',
    year: '2024',
    duration: '6 months',
    isLocked: true,
    unlockCode: 'demo123',
  },
  'copilot-shopping': {
    company: 'Microsoft',
    title: 'Copilot Shopping',
    description: 'Creating intelligent shopping experiences within Microsoft Copilot, helping users discover and purchase products through natural conversations.',
    role: 'Product Designer',
    year: '2023',
    duration: '8 months',
    isLocked: true,
    unlockCode: 'demo123',
  },
  'windows-search': {
    company: 'Microsoft',
    title: 'Windows Search',
    description: 'Redesigning the search experience for over a billion Windows devices, making it faster, smarter, and more intuitive.',
    role: 'Product Designer',
    year: '2023',
    duration: '1 year',
    isLocked: true,
    unlockCode: 'demo123',
  },
};

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects[slug];
  
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleUnlock = (code: string) => {
    if (code === project?.unlockCode) {
      setIsUnlocked(true);
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-12">
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-4">Project not found</h1>
          <Link href="/" className="text-foreground/60 hover:text-foreground transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <FadeIn delay={0.1}>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-12"
          >
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
            Back
          </Link>
        </FadeIn>

        {/* Project header */}
        <div className="mb-0">
          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6">
              {project.title}
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="text-xl md:text-2xl text-foreground/80 tracking-tight leading-relaxed mb-8 ">
              {project.description}
            </p>
          </FadeIn>

        </div>

        {/* Unlock prompt - shown when locked */}
        {project.isLocked && !isUnlocked && (
          <UnlockPrompt onUnlock={handleUnlock} error={hasError} />
        )}

        {/* Project content - locked/blurred when not unlocked */}
        <LockedContent isLocked={!!(project.isLocked && !isUnlocked)} delay={0.5}>
          <FadeIn delay={0.5}>
            <div className="aspect-[9/16] max-h-[800px] rounded-4xl overflow-hidden mx-auto">
              <video 
                src="https://pub-138dacc1f93142a69067812529622fe3.r2.dev/video1.mov" 
                controls
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </LockedContent>

        <LockedContent isLocked={!!(project.isLocked && !isUnlocked)} delay={0.6}>
          <FadeIn delay={0.6}>
            <div className="aspect-[9/16] max-h-[800px] rounded-4xl overflow-hidden mx-auto">
              <video 
                src="https://pub-138dacc1f93142a69067812529622fe3.r2.dev/video1.mov" 
                controls
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </LockedContent>

      </div>
    </div>
  );
}


'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import VideoSwiper from '@/components/ui/VideoSwiper';
import VideoOverlay from '@/components/ui/VideoOverlay';
import VideoSidebar from '@/components/ui/VideoSidebar';

export const runtime = 'edge';

type ProjectData = {
  company: string;
  title: string;
  description: string;
  role: string;
  year: string;
  duration: string;
  isLocked?: boolean;
  unlockCode?: string;
  videos: Array<{ id: string; url: string }>;
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
    videos: [
      { id: 'video-1', url: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/video1.mov' },
      { id: 'video-2', url: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/video1.mov' },
      { id: 'video-3', url: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/video1.mov' },
    ],
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
    videos: [
      { id: 'video-1', url: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/video1.mov' },
    ],
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
    videos: [
      { id: 'video-1', url: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/video1.mov' },
    ],
  },
};

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects[slug];
  
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
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

  const isLocked = !!(project.isLocked && !isUnlocked);

  return (
    <VideoSwiper videos={project.videos} isLocked={isLocked}>
      {(currentIndex) => (
        <>
          {/* Mobile Overlay */}
          <VideoOverlay
            title={project.title}
            description={project.description}
            company={project.company}
            isLocked={isLocked}
            unlockCode={project.unlockCode}
            onUnlock={handleUnlock}
          />

          {/* Desktop Sidebar */}
          <VideoSidebar
            title={project.title}
            description={project.description}
            company={project.company}
            isLocked={isLocked}
            unlockCode={project.unlockCode}
            onUnlock={handleUnlock}
          />

        </>
      )}
    </VideoSwiper>
  );
}


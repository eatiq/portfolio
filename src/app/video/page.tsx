'use client';

import FadeIn from '@/components/animations/FadeIn';
import PageTransition from '@/components/animations/PageTransition';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';

type VideoItem = {
  title: string;
  description: string;
  videoUrl?: string;
};

type VideoChapter = {
  title: string;
  narrative: string;
  items: VideoItem[];
};

const chapters: VideoChapter[] = [
  {
    title: 'Early Work',
    narrative: 'It all started with my love for After Effects, I minored in motion design and had to do a lot of assignments.',
    items: [
      { title: 'Motion Design Assignment', description: 'One of my assignments for my motion design class.' },
      { title: 'Google Cloud Next 2018', description: 'Promo video for Google Cloud Next 2018 at Moscone Center, San Francisco.' },
    ],
  },
  {
    title: 'Professional Work',
    narrative: 'My design job had me making videos that explained features, where I really started honing my camera work and direction.',
    items: [
      { title: 'Conquer the Hustle', description: 'A vignette for a Samsung Galaxy Fold feature for the calendar app.' },
      { title: 'Offline Edge', description: 'Hackathon winner for a feature that helped browse pages in places that have limited to no data coverage.' },
    ],
  },
  {
    title: 'Personal & Documentary',
    narrative: 'It led me to the point where I realized how gratifying it was for me to capture and document parts of my own life. Videos started becoming my time capsule.',
    items: [
      { title: 'Cross Country Road Trip', description: 'Capturing a cross country road trip I did to move to Seattle and join Microsoft.' },
      { title: 'Coming Back to India', description: 'Coming back to India post COVID.' },
    ],
  },
  {
    title: 'More Recent Work',
    narrative: 'I have a lot more of where that came from.',
    items: [
      { title: 'One Night in Mexico City', description: 'A short film capturing the energy of Mexico City.' },
      { title: 'Motion Reel', description: 'My Motion Reel has a mix of personal and work related projects.' },
      { title: 'Year in Review', description: 'A quick recap of the year that went by for me.' },
    ],
  },
];

export default function VideoPage() {
  return (
    <PageTransition>
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Video
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed">
              Video making is my creative outlet. It helps me express myself in the 
              truest sense. Let me take you through a quick journey of how I got 
              started which includes some pieces of work and where I have ended up 
              to this point.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Chapters */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-5xl mx-auto">
          {chapters.map((chapter, chapterIdx) => (
            <div key={chapter.title} className="mb-24 md:mb-32">
              <FadeIn delay={0.1}>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-sm text-foreground/30 font-mono">
                    {String(chapterIdx + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground/60">
                    {chapter.title}
                  </h2>
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <p className="text-xl md:text-2xl font-medium tracking-tight leading-snug mb-10 max-w-3xl">
                  {chapter.narrative}
                </p>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {chapter.items.map((item, idx) => (
                  <FadeIn key={item.title} delay={0.1 + idx * 0.05}>
                    <div className="group rounded-2xl border border-foreground/10 overflow-hidden hover:border-foreground/20 transition-colors">
                      {/* Video placeholder */}
                      <div className="aspect-video bg-foreground/5 flex items-center justify-center">
                        <div className="text-foreground/20 text-sm">Video</div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-semibold tracking-tight mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-foreground/60 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}

          {/* Instagram CTA */}
          <FadeIn delay={0.1}>
            <div className="text-center py-12 border border-foreground/10 rounded-2xl">
              <p className="text-foreground/60 mb-4">
                If you are interested in seeing more, check out my short form content.
              </p>
              <a
                href="https://www.instagram.com/ehsanatiq/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-foreground hover:opacity-70 transition-opacity font-medium"
              >
                View on Instagram →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Page Navigation */}
      <section className="px-6 md:px-12 pb-12">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/motion" className="text-foreground/50 hover:text-foreground transition-colors">
            ← Back to Motion
          </Link>
          <Link href="/about" className="text-foreground/50 hover:text-foreground transition-colors">
            Next: About →
          </Link>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
}

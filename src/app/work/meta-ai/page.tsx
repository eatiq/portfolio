'use client';

import CaseStudyLayout from '@/components/ui/CaseStudyLayout';
import PageTransition from '@/components/animations/PageTransition';

export default function MetaAIPage() {
  const videos = [
    {
      src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/video1.mov',
      caption:
        'From watching to shopping— circling objects in a video to surface contextual results for products and places utilizing Apple\u2019s Vision Framework along with Llama API for auto-generated text summaries',
    },
  ];

  return (
    <CaseStudyLayout
      company="Meta"
      title="Facebook Search + Meta AI"
      year="2024–Present"
      role="Product Designer"
      responsibilities={[
        'End to end product design',
        'Search experience design',
        'AI integration design',
        'Cross-functional collaboration',
      ]}
      overview={
        <>
          <p>
            At Meta, I work on Facebook Search and the integration of Meta AI into the
            search experience. The goal is to design the next generation of AI-powered
            search for billions of users across Facebook platforms, making it more
            intuitive, conversational, and useful.
          </p>
          <p>
            This involves rethinking how people discover content, people, and information
            on one of the world&apos;s largest social platforms — balancing the power of AI
            with the simplicity users expect.
          </p>
        </>
      }
      nextProject={{ label: 'Copilot Shopping', href: '/work/copilot-shopping' }}
      locked
      combination={[24, 8, 16]}
    >
      {/* Prototype Videos */}
      <div className="mb-16 md:mb-24">
        <h2 className="text-2xl md:text-3xl font-semibold mb-12">Prototypes</h2>

        <div className="space-y-16">
          {videos.map((video, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-3 rounded-2xl overflow-hidden w-full max-w-sm mx-auto">
                <video
                  src={video.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-2xl"
                />
              </div>
              <p className="text-sm text-foreground/50 text-center max-w-2xl">
                {video.caption}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* More coming soon */}
      <div className="p-8 rounded-xl border border-foreground/10 text-center mb-16 md:mb-24">
        <p className="text-foreground/50 text-lg">
          More prototypes and detailed case study content will be added as the project progresses.
        </p>
      </div>
    </CaseStudyLayout>
  );
}

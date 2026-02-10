'use client';

import CaseStudyLayout from '@/components/ui/CaseStudyLayout';
import CaseStudySection from '@/components/ui/CaseStudySection';
import VideoPlayer from '@/components/ui/VideoPlayer';

export default function MetaAIPage() {
  const videos = [
    {
      src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/vivint-floaty.mov',
      caption:
        'Ambient AI commerce \u2014 a floating agent that initiates contextual sales conversations without disrupting the browsing experience',
    },
    {
      src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/circletosearch.mp4',
      caption:
        'Draw to Search \u2014 A SwiftUI + AVKit prototype where long-pressing freezes the frame and lets you draw over anything. The enclosed region gets extracted and classified through Apple\u2019s Vision framework, then routed to a search API. The whole transition \u2014 from full-bleed video to floating card with results \u2014 uses matched geometry to keep things feeling continuous, with a Metal shader driving the background blur',
    },
    {
      src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/pillstosearch.mp4',
      caption:
        'Pause the video and AI does the rest \u2014 the frame runs through object detection and face recognition, picking up people, places, and products. Each one gets a tappable pill overlay pinned to the subject, with anchor points that follow their position across frames',
    },
  ];

  return (
    <CaseStudyLayout
      company="Meta"
      title="Facebook Search + Meta AI"
      year="2024 - Present"
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
      {/* Intro Section */}
      <CaseStudySection title="Things I've Been Building">
        <p>
          My day-to-day at Meta lives at the intersection of design and engineering.
          I work primarily in Cursor, prototyping interactions in SwiftUI and shipping
          production diffs in Swift and Meta&apos;s proprietary Bloks framework. Below
          are some of the concepts I&apos;ve been exploring:
        </p>
      </CaseStudySection>

      {/* Prototype Videos */}
      <div className="mb-16 md:mb-24">
        <div className="space-y-16">
          {videos.map((video, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-3 rounded-2xl overflow-hidden w-full max-w-sm mx-auto">
                <VideoPlayer src={video.src} />
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
          More prototypes added over time. For in-depth case studies, reach out.
        </p>
      </div>
    </CaseStudyLayout>
  );
}

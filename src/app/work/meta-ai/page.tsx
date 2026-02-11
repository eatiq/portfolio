'use client';

import CaseStudyLayout from '@/components/ui/CaseStudyLayout';
import CaseStudySection from '@/components/ui/CaseStudySection';
import ProjectShowcase from '@/components/ui/ProjectShowcase';

export default function MetaAIPage() {
  const projects = [
    {
      src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/vivint-floaty.mov',
      title: 'Ambient AI Commerce',
      description:
        'A floating agent that initiates contextual sales conversations without disrupting the browsing experience. The AI seamlessly integrates into the interface, providing helpful suggestions at the right moment.',
    },
    {
      src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/circletosearch.mp4',
      title: 'Draw to Search',
      description:
        'A SwiftUI + AVKit prototype where long-pressing freezes the frame and lets you draw over anything. The enclosed region gets extracted and classified through Apple\'s Vision framework, then routed to a search API. The whole transition — from full-bleed video to floating card with results — uses matched geometry to keep things feeling continuous, with a Metal shader driving the background blur.',
    },
    {
      src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/pillstosearch.mp4',
      title: 'Intelligent Frame Analysis',
      description:
        'Pause the video and AI does the rest — the frame runs through object detection and face recognition, picking up people, places, and products. Each one gets a tappable pill overlay pinned to the subject, with anchor points that follow their position across frames.',
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
            on one of the world\'s largest social platforms — balancing the power of AI
            with the simplicity users expect.
          </p>
        </>
      }
      nextProject={{ label: 'Copilot Shopping', href: '/work/copilot-shopping' }}
      locked
      combination={[24, 8, 16]}
    >
      {/* Intro Section */}
      <CaseStudySection title="Things I\'ve Been Building">
        <p>
          My day-to-day at Meta lives at the intersection of design and engineering.
          I work primarily in Cursor, prototyping interactions in SwiftUI and shipping
          production diffs in Swift and Meta\'s proprietary Bloks framework. Below
          are some of the concepts I\'ve been exploring:
        </p>
      </CaseStudySection>

      {/* Prototype Showcases */}
      <div className="space-y-32 mb-16 md:mb-24">
        {projects.map((project, index) => (
          <ProjectShowcase
            key={index}
            src={project.src}
            title={project.title}
            description={project.description}
            index={index}
          />
        ))}
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

'use client';

import CaseStudyLayout from '@/components/ui/CaseStudyLayout';
import CaseStudySection from '@/components/ui/CaseStudySection';
import ProjectShowcase from '@/components/ui/ProjectShowcase';
import ContentSwitcher from '@/components/ui/ContentSwitcher';

const allPrototypes = [
  {
    src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/dearalgorithm.mp4',
    title: 'Dear Algorithm',
    description:
      'Dear Algorithm \u2014 a personalization layer for Facebook Search. Users pick their interests across topics, content style, and mood, and the algorithm reshapes around them. The intro features a spiral particle animation on a cosmic dark UI, with each selection lighting up in a unique color.',
    layout: 'portrait' as const,
  },
  {
    src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/aisearchoverview.mp4',
    title: 'Sizzler — AI Video Editor',
    description:
      'Sizzler \u2014 type a prompt, add a clip and a track, and the AI handles the edit. It writes the copy, breaks it into beat-synced segments, and drops animated text overlays onto a multi-layer timeline. Spring pop animations and Web Audio API beat detection keep everything in rhythm.',
    layout: 'landscape' as const,
  },
  {
    src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/grid-auravanish.mp4',
    title: 'Ad Transparency with Meta AI',
    description:
      'Long-pressing an ad activates Meta AI to deliver a concise advertiser report, empowering customers with transparency and trust at a glance.',
    layout: 'portrait' as const,
  },
  {
    src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/vivint-floaty.mov',
    title: 'Ambient AI Commerce',
    description:
      'A floating agent that initiates contextual sales conversations without disrupting the browsing experience. The AI seamlessly integrates into the interface, providing helpful suggestions at the right moment.',
    layout: 'portrait' as const,
    aspectRatio: 'square' as const,
  },
];

const shopEverythingProjects = [
  {
    src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/agentic-checkout.mp4',
    title: 'Browse, Refine, Buy',
    description:
      'From Reels to receipt \u2014 tap \u2018Shop similar\u2019 on a detected product and land in a river-like browsing experience with floating product cards. Refine with freeform text or category pills, compare items side-by-side with AI-generated pros and cons, and check out through a verified merchant flow \u2014 all without leaving the app.',
  },
  {
    src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/videosearch.mp4',
    title: 'Conversational Video Search',
    description:
      'The entry point into Shop Everything. While watching a Reel, users can pause and ask Meta AI about anything on screen. The AI identifies products, people, and context — then surfaces shoppable results inline. No tab switching, no leaving the video.',
  },
  {
    src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/pillstosearch.mp4',
    title: 'Intelligent Frame Analysis',
    description:
      'Once the video is paused, AI runs object detection and face recognition across the frame. Every recognized item — clothing, accessories, furniture — gets a tappable pill pinned directly to it. Users tap to see product matches, pricing, and purchase options without breaking their flow.',
  },
  {
    src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/circletosearch.mp4',
    title: 'Draw to Search',
    description:
      'For items the AI doesn\'t auto-detect, users can long-press and draw around anything in the frame. The selection gets extracted, classified, and matched to products — turning any moment in a video into a shopping opportunity. The gesture feels native and the transition from video to results is seamless.',
  },
];

const TABS = [
  { id: 'case-study', label: 'Case Study' },
  { id: 'experiments', label: 'Experiments' },
];

export default function MetaAIPage() {
  return (
    <CaseStudyLayout
      company="Meta"
      title="Facebook Search + Meta AI"
      year="2024 - Present"
      role="Product Designer & Builder"
      responsibilities={[
        'End to end product design',
        'AI-powered search experiences',
        'Prototyping & shipping with code',
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
      <ContentSwitcher tabs={TABS} defaultTab="case-study">
        {(activeTab) =>
          activeTab === 'experiments' ? (
            <PrototypesContent />
          ) : (
            <ShopEverythingContent />
          )
        }
      </ContentSwitcher>
    </CaseStudyLayout>
  );
}

function PrototypesContent() {
  return (
    <>
      <CaseStudySection title="Things I've Been Building">
        <p>
          My day-to-day at Meta lives at the intersection of design and engineering.
          I work primarily in Cursor, prototyping interactions in SwiftUI and shipping
          production diffs in Swift and Meta&apos;s proprietary Bloks framework. Below
          are some of the concepts I&apos;ve been exploring:
        </p>
      </CaseStudySection>

      <div className="space-y-32 mb-16 md:mb-24">
        {allPrototypes.map((project, index) => (
          <ProjectShowcase
            key={project.title}
            src={project.src}
            title={project.title}
            description={project.description}
            index={index}
            layout={project.layout}
            aspectRatio={project.aspectRatio}
          />
        ))}
      </div>

      <div className="p-8 rounded-xl border border-foreground/10 text-center mb-16 md:mb-24">
        <p className="text-foreground/50 text-lg">
          More prototypes added over time. For in-depth case studies, reach out.
        </p>
      </div>
    </>
  );
}

function ShopEverythingContent() {
  return (
    <>
      <CaseStudySection title="Shop Everything">
        <p>
          What if you could buy anything you see in a video — without ever leaving it?
          Shop Everything reimagines commerce on Facebook by turning passive video
          watching into an active shopping experience, powered by Meta AI.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Problem">
        <p>
          Users frequently discover products in Reels and video content but have no
          direct path to purchase. The existing flow — screenshot, reverse image search,
          hope for the best — is fragmented and full of friction. Creators tag products
          manually, but coverage is low and the experience feels bolted on.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Approach">
        <p>
          Rather than relying on manual tagging, we designed a system where AI does
          the heavy lifting. The core idea: any frame in any video becomes shoppable.
          Multiple complementary interaction patterns — conversational search,
          automatic detection, freeform selection, and an end-to-end agentic checkout
          flow — handle different levels of user intent, from casual curiosity to
          deliberate purchase.
        </p>
      </CaseStudySection>

      <div className="space-y-32 mb-16 md:mb-24">
        {shopEverythingProjects.map((project, index) => (
          <ProjectShowcase
            key={project.title}
            src={project.src}
            title={project.title}
            description={project.description}
            index={index}
          />
        ))}
      </div>

      <CaseStudySection title="Outcome">
        <p>
          Together, these patterns create a layered shopping experience — from
          AI-initiated suggestions to user-driven exploration, all the way through to
          agentic checkout. The prototypes demonstrated that contextual, in-video
          commerce could feel native rather than intrusive, opening a path toward
          making every piece of video content on Facebook shoppable by default.
        </p>
      </CaseStudySection>
    </>
  );
}

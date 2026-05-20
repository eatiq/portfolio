'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import CaseStudyLayout from '@/components/ui/CaseStudyLayout';
import CaseStudySection from '@/components/ui/CaseStudySection';
import ProjectShowcase from '@/components/ui/ProjectShowcase';
import ContentSwitcher from '@/components/ui/ContentSwitcher';
import StatGrid from '@/components/ui/StatGrid';
import PullQuote from '@/components/ui/PullQuote';
import FadeIn from '@/components/animations/FadeIn';

const allPrototypes = [
  {
    src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/experiment_mar17_2026.mp4',
    title: 'AR Try-On',
    description:
      'What if you could grab a pair of sunglasses from a sponsored post? This prototype takes users from a Ray-Ban ad to a live AR try-on with face tracking, price, reviews, and a purchase path \u2014 all in one seamless flow.',
    layout: 'portrait' as const,
  },
  {
    src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/sidekick_debug_tool.mp4',
    title: 'Sidekick \u2014 An Internal Debugging Tool',
    description:
      'Designers across the org were picking up SwiftUI but struggling to spin up their own component variations fast enough. Sidekick is a cloud-deployed debug drawer I built to fix that \u2014 minimal, resizable, packed with pre-built components so anyone could drop it into a prototype and start iterating immediately. Over 100 designers adopted it.',
    layout: 'portrait' as const,
  },
  {
    src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/dearalgorithm.mp4',
    title: 'Dear Algorithm',
    description:
      'Dear Algorithm \u2014 a personalization layer for Facebook Search. Users pick their interests across topics, content style, and mood, and the algorithm reshapes around them. The intro features a spiral particle animation on a cosmic dark UI, with each selection lighting up in a unique color.',
    layout: 'portrait' as const,
  },
  {
    src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/aisearchoverview.mp4',
    title: 'Sizzler: AI Video Editor',
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
      'The entry point into Shop Everything. While watching a Reel, users can pause and ask Meta AI about anything on screen. The AI identifies products, people, and context, then surfaces shoppable results inline. No tab switching, no leaving the video.',
  },
  {
    src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/pillstosearch.mp4',
    title: 'Intelligent Frame Analysis',
    description:
      'Once the video is paused, AI runs object detection and face recognition across the frame. Every recognized item (clothing, accessories, furniture) gets a tappable pill pinned directly to it. Users tap to see product matches, pricing, and purchase options without breaking their flow.',
  },
];

const drawToSearchPrototype = {
  src: 'https://pub-138dacc1f93142a69067812529622fe3.r2.dev/circletosearch.mp4',
  title: 'Draw to Search',
  description:
    'For items the AI doesn\'t auto-detect, users can long-press and draw around anything in the frame. The selection gets extracted, classified, and matched to products, turning any moment in a video into a shopping opportunity. The gesture feels native and the transition from video to results is seamless.',
};

const TABS = [
  { id: 'shop-everything', label: 'Shop Everything' },
  { id: 'search-go-big', label: 'Search Go Big' },
  { id: 'experiments', label: 'Experiments' },
  { id: 'ai4p', label: 'AI4P' },
];

type PlaceholderMediaProps = {
  label: string;
  caption?: string;
  aspect?: 'video' | 'square' | 'portrait';
};

function PlaceholderMedia({ label, caption, aspect = 'video' }: PlaceholderMediaProps) {
  const aspectClass = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
  }[aspect];

  return (
    <figure className="mb-16 md:mb-24">
      <div className={`w-full ${aspectClass} bg-foreground/[0.04] border border-dashed border-foreground/15 rounded-xl flex items-center justify-center`}>
        <div className="text-center px-6">
          <div className="text-xs uppercase tracking-wider text-foreground/30 mb-2">
            Placeholder
          </div>
          <div className="text-sm text-foreground/50">{label}</div>
        </div>
      </div>
      {caption && (
        <figcaption className="text-sm text-foreground/40 mt-3 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function MetaAIPage() {
  const [activeTab, setActiveTab] = useState<string>('shop-everything');
  const switcherRef = useRef<HTMLDivElement>(null);

  const tabIndex = TABS.findIndex((t) => t.id === activeTab);
  const prevTab = tabIndex > 0 ? TABS[tabIndex - 1] : null;
  const nextTab = tabIndex < TABS.length - 1 ? TABS[tabIndex + 1] : null;

  const goToTab = (tabId: string) => {
    setActiveTab(tabId);
    switcherRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const prevProject = prevTab
    ? { label: prevTab.label, onClick: () => goToTab(prevTab.id) }
    : undefined;

  const nextProject = nextTab
    ? { label: nextTab.label, onClick: () => goToTab(nextTab.id) }
    : { label: 'Copilot Shopping', href: '/work/copilot-shopping' };

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
            At Meta, I work on Facebook Search and the integration of Meta AI
            into the search experience. The goal is to design the next
            generation of AI-powered search for billions of users across
            Facebook platforms, making it more intuitive, conversational, and
            useful.
          </p>
          <p>
            Across 2024 and 2025, this has spanned monetization design for a
            complete SERP redesign, 0&rarr;1 vision work on shoppable video
            reaching the CEO, and a self-initiated AI prototyping program that
            upskilled 40+ designers. Each tab below covers one of those
            threads.
          </p>
        </>
      }
      prevProject={prevProject}
      nextProject={nextProject}
      locked
      combination={[24, 8, 16]}
    >
      <div ref={switcherRef} className="scroll-mt-24">
        <ContentSwitcher
          tabs={TABS}
          activeTab={activeTab}
          onChange={setActiveTab}
        >
          {(currentTab) => {
            switch (currentTab) {
              case 'search-go-big':
                return <SearchGoBigContent />;
              case 'ai4p':
                return <AI4PContent />;
              case 'experiments':
                return <ExperimentsContent />;
              case 'shop-everything':
              default:
                return <ShopEverythingContent />;
            }
          }}
        </ContentSwitcher>
      </div>
    </CaseStudyLayout>
  );
}

function ExperimentsContent() {
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
            compact
          />
        ))}
      </div>
    </>
  );
}

function ShopEverythingContent() {
  return (
    <>
      <CaseStudySection title="Shop Everything">
        <p>
          What if you could buy anything you see in a video, without ever leaving it?
          Shop Everything is Meta&apos;s bet on that future: a 0&rarr;1 vision
          spanning Facebook and Instagram, designed to turn passive video watching
          into an active shopping experience powered by Meta AI.
        </p>
      </CaseStudySection>

      <StatGrid
        stats={[
          {
            value: '24hr',
            label: (
              <>
                First sizzle
                <br />
                reel cut
              </>
            ),
          },
          { value: '10+', label: 'Interactive prototypes' },
          { value: 'MZ', label: 'Leadership audience' },
          { value: '$XXB', label: 'Projected by 2029' },
        ]}
      />

      <CaseStudySection title="Problem">
        <p>
          Users frequently discover products in Reels and video content but have no
          direct path to purchase. The existing flow (screenshot, reverse image search,
          hope for the best) is fragmented and full of friction. Creators tag products
          manually, but coverage is low and the experience feels bolted on.
        </p>
      </CaseStudySection>

      <figure className="mb-16 md:mb-24">
        <div className="rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl">
          <Image
            src="/work/meta-ai/current-flow-friction.png"
            alt="Today's broken shopping flow: a user spots a pegboard in a Reel, screenshots it, reverse-image-searches in a separate tab, and lands on a generic IKEA product page."
            width={1024}
            height={614}
            className="w-full h-auto"
            priority
          />
        </div>
        <figcaption className="text-sm text-foreground/40 mt-3 text-center">
          Today&apos;s flow: Reel &rarr; identified products &rarr; product page. Two jumps, and the exact item from the video rarely makes the list.
        </figcaption>
      </figure>

      <CaseStudySection title="Approach">
        <p>
          Rather than relying on manual tagging, we designed a system where AI does
          the heavy lifting. The core idea: any frame in any video becomes shoppable.
          Multiple complementary interaction patterns (conversational search,
          automatic detection, freeform selection, and an end-to-end agentic checkout
          flow) handle different levels of user intent, from casual curiosity to
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
            compact
          />
        ))}
      </div>

      <CaseStudySection title="Outcome">
        <p>
          Together, these patterns create a layered shopping experience, from
          AI-initiated suggestions to user-driven exploration, all the way through to
          agentic checkout. The prototypes demonstrated that contextual, in-video
          commerce could feel native rather than intrusive, opening a path toward
          making every piece of video content on Facebook shoppable by default.
        </p>
      </CaseStudySection>

      <div className="my-16 md:my-24 border-t border-foreground/10" />

      <CaseStudySection title="Behind the Work">
        <p>
          The product story above is what leadership saw. The story behind
          it is how it got built: in 24 hours, with a brand-new workflow,
          and with stakes that ran all the way up the company.
        </p>
        <p>
          When Shop Everything needed to move from strategy doc to
          something MZ, Cox, Tom Alison, Wendy Owen, and Adam Mosseri could
          actually evaluate, the team needed prototypes leadership could
          tap through and feel. There was no design language, no component
          library, no precedent for a 0&rarr;1 initiative at this scale.
          The first cut of the sizzle reel was due in 24 hours.
        </p>
        <p>
          The vision was never Facebook-only either. It had to feel
          cohesive across Instagram too, not like two products bolted
          together. Every prototype had to read as platform-level, not
          surface-level.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Vibe Coding as the Method">
        <p>
          I opted to build prototypes in Cursor as the production method,
          building <strong className="text-foreground"> 10+ distinct interactive prototypes</strong> in SwiftUI instead
          of Figma mockups. Each one was a functional experience leadership
          could navigate themselves, not a static deck. This was among the
          first times FM presented a vibe-coded prototype to Tom Alison,
          setting the precedent for how the org now approaches vision work.
        </p>
      </CaseStudySection>

      <div className="mb-16 md:mb-24">
        <ProjectShowcase
          src={drawToSearchPrototype.src}
          title={drawToSearchPrototype.title}
          description={drawToSearchPrototype.description}
          index={0}
          compact
        />
      </div>

      <FadeIn>
        <div className="mb-16 md:mb-24 text-foreground/70 leading-relaxed">
          <p>
            My motion design background meant the sizzle reel didn&apos;t
            need a separate production team. One person, end to end,
            combining After Effects with prototype recordings. My front-end
            engineering background meant the prototypes had real
            interactions, real data patterns, real responsiveness that
            leadership could immediately trust.
          </p>
        </div>
      </FadeIn>

      <FadeIn>
        <figure className="mb-16 md:mb-24">
          <div className="aspect-video rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/JPD7NW557uQ?rel=0&modestbranding=1&controls=0&autoplay=1&mute=1&loop=1&playlist=JPD7NW557uQ&playsinline=1&iv_load_policy=3"
              title="Vibe Coding sizzle"
              allow="autoplay; encrypted-media; picture-in-picture"
              className="w-full h-full pointer-events-none"
            />
          </div>
        </figure>
      </FadeIn>

      <CaseStudySection title="Outcome at the Top">
        <p>
          The prototypes were presented as finalized experiences to MZ.
          Cox showcased the work in a company-wide Q&amp;A. Instagram
          leadership specifically requested my support for a Mosseri
          review, which extended the influence of the work beyond
          Facebook Monetization. Shop Everything was elevated from an
          org initiative to a company priority, with revenue projected
          at <strong className="text-foreground">$XXB by 2029</strong>.
        </p>
        <p>
          The downstream effect: FM adopted vibe coding broadly, and I
          was asked to build the AI4P program to scale the workflow
          across the org, which is its own story.
        </p>
      </CaseStudySection>

      <div className="mb-16 md:mb-24">
        <PullQuote
          quote="Ehsan initiated and scaled a new AI prototyping approach that drove leadership alignment and resulted in directly influencing a high-visibility project showcased to leadership including Wendy, Tom, Cox, MZ, and Mosseri."
          author="Tiffany Tam"
          role="Manager, Facebook Monetization Design"
        />
      </div>

      <CaseStudySection title="Reflection">
        <p>
          <strong className="text-foreground">What worked:</strong> Going
          AI-native from day one &mdash; Cursor had never been used to
          present design prototypes to leadership. A traditional Figma
          workflow would surface two or three polished concepts; vibe
          coding surfaced ten interactive ones. Owning the full stack
          (concept, prototype, motion, edit) meant the sizzle reel
          didn&apos;t bottleneck on handoffs.
        </p>
        <p>
          <strong className="text-foreground">What I learned:</strong> At
          the highest levels of leadership, the <em>feel</em> of a
          prototype matters more than the logic of a deck. People align
          on futures they can experience. AI tools don&apos;t replace
          design judgment; they compress the distance between judgment
          and artifact. The taste and framing still have to come from
          the designer.
        </p>
      </CaseStudySection>
    </>
  );
}

function SearchGoBigContent() {
  return (
    <>
      <CaseStudySection title="Search Go Big">
        <p>
          In January 2025, Meta funded a company-wide initiative to build a
          next-generation search experience: a complete redesign of the Search
          Results Page into a content-first grid. When the new grid
          launched, every existing ad format broke. Ad performance dropped
          <strong className="text-foreground"> ~42% EBR</strong> as a result of this pivot.
        </p>
        <p>
          As the sole designer for Search Ads monetization, my job was to
          recover that revenue while the surface itself kept changing: four
          major design pivots in six months, each requiring me to rethink
          ad formats from scratch.
        </p>
      </CaseStudySection>

      <StatGrid
        stats={[
          { value: '2.5B', label: 'Searches / day' },
          { value: '36', label: 'Experiments launched' },
          { value: '$650M', label: 'Revenue delivered' },
          { value: 'Solo', label: 'Designer on monetization' },
        ]}
      />

      <CaseStudySection title="The Challenge">
        <p>
          The organic Search team pivoted the grid four times based on
          leadership feedback: Masonry, Standard, Horizontal + Vertical, Minimal.
          Each pivot meant the ad format work had to adapt or restart. I was
          also new to Meta, ramping on a complex codebase while being expected
          to deliver P0 outcomes, and some of the fixes I needed couldn&apos;t
          wait weeks for engineering bandwidth.
        </p>
      </CaseStudySection>

      <figure className="mb-16 md:mb-24">
        <div className="rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl">
          <Image
            src="/work/meta-ai/sgb-problem.png"
            alt="Four mobile Search results screens side by side showing the Masonry, Standard, Horizontal + Vertical, and Minimal grid variants the organic Search team pivoted between."
            width={1024}
            height={614}
            className="w-full h-auto"
          />
        </div>
        <figcaption className="text-sm text-foreground/40 mt-3 text-center">
          Four grids in roughly a year: Masonry &rarr; Standard &rarr; Horizontal + Vertical &rarr; Minimal. Every pivot reset the ad format work.
        </figcaption>
      </figure>

      <CaseStudySection title="Approach">
        <p>
          I established a rapid experimentation cadence (design, prototype,
          test, measure, iterate) and set up recurring syncs with the
          organic Search designers so I&apos;d hear about pivots before
          they hit me. Format exploration started with
          vertical content cards (which underperformed) before I landed on a
          horizontal ad card that recovered <strong className="text-foreground">+20% EBR</strong> on
          its own.
        </p>
        <p>
          From there, smaller wins compounded: an album (2&times;2) format
          (+4%), a shortened conversion journey (+5%), text below ads (+3%),
          and disabled video autoplay (+2%). In parallel, I designed Position
          One Ads (+8% EBR, +13% Ad Score) and Instant Intent Ads (+10% on
          comet, +2% on SERP).
        </p>
      </CaseStudySection>

      <figure className="mb-16 md:mb-24">
        <div className="rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl">
          <Image
            src="/work/meta-ai/sgb-variations.png"
            alt="Explorations of different large horizontal ad card variants tested across the Search grid."
            width={1024}
            height={614}
            className="w-full h-auto"
          />
        </div>
        <figcaption className="text-sm text-foreground/40 mt-3 text-center">
          A range of experiments we ran to help determine the right level of density and visual weight.
        </figcaption>
      </figure>

      <figure className="mb-16 md:mb-24">
        <div className="rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl">
          <Image
            src="/work/meta-ai/sgb-largeformats.png"
            alt="New ad formats tested in the Search grid: large horizontal card, 2×2 album, and top position ads, all grounded in prior UXR."
            width={1024}
            height={614}
            className="w-full h-auto"
          />
        </div>
        <figcaption className="text-sm text-foreground/40 mt-3 text-center">
          UXR-grounded formats like the large card, 2&times;2 album, and top position ads recovered meaningful EBR.
        </figcaption>
      </figure>

      <CaseStudySection title="Shipping Code to Unblock">
        <p>
          Not every opportunity gets engineering bandwidth. Alongside the
          experiments above, I kept finding fixes the roadmap had skipped
          and sometimes shipping the code myself was the only way to
          to act on them. One example: on the Pages tab, ads were still
          rendering in a legacy feed format taking up roughly 10&times;
          more viewport area than the surrounding organic results.
          Traffic was too low to ever win engineering bandwidth, so I
          designed a smaller, text-based ad unit, ran it through review,
          and shipped it via AI-powered diffs.
        </p>
      </CaseStudySection>

      <figure className="mb-16 md:mb-24">
        <div className="rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl">
          <Image
            src="/work/meta-ai/sgb-page1.png"
            alt="The Pages tab in Facebook Search rendering ads in a legacy feed format that took up roughly 10× more viewport area than the surrounding organic results."
            width={1024}
            height={614}
            className="w-full h-auto"
          />
        </div>
        <figcaption className="text-sm text-foreground/40 mt-3 text-center">
          Before: legacy feed ad format on the Pages tab, ~10&times; the viewport weight of the organic results around it.
        </figcaption>
      </figure>

      <FadeIn>
        <div className="mb-16 md:mb-24 space-y-4 text-foreground/70 leading-relaxed">
          <p>
            The change contributed a{' '}
            <strong className="text-foreground">+0.8% revenue lift at Main Search</strong>,
            feeding directly into the EBR recovery above. The bigger
            story was the unlock: a designer could now drive a launch
            from idea to shipped experiment without waiting on a full
            engineering cycle.
          </p>
        </div>
      </FadeIn>

      <figure className="mb-16 md:mb-24">
        <div className="rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl">
          <Image
            src="/work/meta-ai/sgb-page2.png"
            alt="The redesigned Pages tab ad: a smaller, text-based unit consistent with the rest of the page, shipped via AI-powered diffs."
            width={1024}
            height={614}
            className="w-full h-auto"
          />
        </div>
        <figcaption className="text-sm text-foreground/40 mt-3 text-center">
          After: a smaller, text-based ad unit consistent with the rest of the page, shipped via AI-powered diffs.
        </figcaption>
      </figure>

      <figure className="mb-16 md:mb-24">
        <div className="rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl">
          <Image
            src="/work/meta-ai/page-diff.png"
            alt="The actual code diff that shipped the new Pages tab ad format, authored end-to-end with AI-powered diffs."
            width={1024}
            height={614}
            className="w-full h-auto"
          />
        </div>
        <figcaption className="text-sm text-foreground/40 mt-3 text-center">
          The diff itself; authored end to end using AI and shipped without waiting on engineering bandwidth.
        </figcaption>
      </figure>

      <CaseStudySection title="Results">
        <p>
          Over 36 experiments, ad revenue recovered from -42% to +5% EBR by
          year&apos;s end, and the team exceeded its $620M revenue target by
          $30M+. On a product handling 2.5 billion queries per day, even
          a 1% EBR improvement is meaningful. Sweating the small
          optimizations mattered.
        </p>
      </CaseStudySection>

      <StatGrid
        columns={3}
        stats={[
          { value: '-42% → +5%', label: 'EBR recovery' },
          { value: '+20%', label: 'Large ad card' },
          { value: '+8%', label: 'Position One Ads' },
          { value: '9.61%', label: 'EBR vs 5.1% target' },
          { value: '+45%', label: 'Search DAU (US/CA)' },
          { value: '+11.7%', label: 'L7 retention' },
        ]}
      />

      <CaseStudySection title="Peer Voices">
        <p className="text-foreground/50 mb-2">
          What partners said about the work:
        </p>
      </CaseStudySection>

      <div className="-mt-8 mb-16 md:mb-24">
        <PullQuote
          quote="Ehsan provided strong design input to key experiments like Top Position Ads and Instant Intent Ads, and helped unblock the Async Ads launch which was critical to hitting our latency goals."
          author="George Xu"
          role="Engineering Lead, Search Ads"
        />
        <PullQuote
          quote="We relied heavily on Ehsan's expertise and intuition when our design directions hit monetization use cases. He partnered effectively in the face of ambiguity."
          author="Jon Berkas"
          role="Organic Search Design"
        />
        <PullQuote
          quote="As a new Meta hire, Ehsan was thrown into the deep end rather quickly. Throughout it all he was a great partner and learned very quickly."
          author="Nur Muhammad Khabir"
          role="Organic Search Design"
        />
      </div>

      <CaseStudySection title="Reflection">
        <p>
          <strong className="text-foreground">What worked:</strong> Running 36
          experiments meant decisions were always backed by data. No
          arguments about taste when you have EBR numbers. Recurring 1:1s
          with organic designers meant I was never surprised by pivots. And
          shipping code myself when it mattered compressed feedback loops
          from weeks to days.
        </p>
        <p>
          <strong className="text-foreground">What I learned:</strong> On a
          product doing 2.5B queries a day, the small optimizations are the
          ones that move the needle. Cross-functional trust is the ultimate
          accelerator. Once engineering and organic design trusted my
          judgment, the feedback loops compressed from days to hours.
        </p>
      </CaseStudySection>
    </>
  );
}

function AI4PContent() {
  return (
    <>
      <CaseStudySection title="AI for Prototyping (AI4P)">
        <p>
          By mid-2025, AI-assisted coding tools like Cursor were changing how
          a small group of Meta designers worked, producing interactive,
          code-based prototypes at unprecedented speed. The
          problem was that adoption was extremely uneven. Leadership was
          starting to expect interactive prototypes for vision work, but
          most designers had no coding background and no clear path to
          learn.
        </p>
        <p>
          After my own success vibe-coding the Shop Everything prototypes
          that reached MZ and Cox, I realized this wasn&apos;t just a
          personal skill advantage. It was an organizational capability
          that could be systematically taught and scaled. So I built the
          program no one had asked me to build.
        </p>
      </CaseStudySection>

      <StatGrid
        stats={[
          { value: '40+', label: 'Designers supported' },
          { value: '5+', label: 'Orgs reached' },
          { value: '100%', label: 'FM diff activation' },
          { value: '4+', label: 'Video tutorials' },
        ]}
      />

      <CaseStudySection title="The Gap">
        <p>
          There was no curriculum, no support system, and no mentorship
          layer. The Cursor pilot group was feeding infrastructure feedback
          back to the tools team, but the education side was empty. Most
          designers didn&apos;t know where to start; the few who did were
          self-teaching slowly and in isolation. I saw the gap and decided
          to fill it, on top of my P0 work on Search Go Big.
        </p>
      </CaseStudySection>

      <CaseStudySection title="The Program">
        <p>
          AI4P came together as a five-part program: a written curriculum
          and progression milestones; weekly open office hours where anyone
          could bring a prototype and a question; a library of video
          tutorials covering specific workflows like SwiftUI prototyping,
          vibe-coding internal tools, sizzle reels from prototypes, and
          shipping a first diff; deep 1:1 mentorship with three formal
          mentees and many more informal ones; and cross-org expansion
          through formal sessions for FM/Verticals designers.
        </p>
      </CaseStudySection>

      <PlaceholderMedia
        label="AI4P curriculum overview and progression milestones"
        aspect="video"
      />

      <PlaceholderMedia
        label="Tutorial library: vibe-coding workflows, sizzle reels, first diff"
        aspect="video"
      />

      <CaseStudySection title="Impact">
        <p>
          By end of H2 2025, I&apos;d personally supported 40+ designers
          1:1. FM became the first org to reach 100% diff activation.
          Five product designers were shipping coded prototypes
          independently, designers who&apos;d never opened a terminal
          six months earlier. The program created its own gravity:
          designers who learned from me started teaching others, and
          other orgs began requesting similar programs.
        </p>
      </CaseStudySection>

      <CaseStudySection title="Peer Voices">
        <p className="text-foreground/50 mb-2">
          What participants and partners said about the program:
        </p>
      </CaseStudySection>

      <div className="-mt-8 mb-16 md:mb-24">
        <PullQuote
          quote="Ehsan was instrumental in helping me personally and the org at large learn to vibe code. He kicked off the Ads Manager prototype that our team ran with, enabling 5 PDs to quickly start building coded prototypes for H2 '25 and H1 '26."
          author="Michael Kopack"
          role="Product Design, Ads"
        />
        <PullQuote
          quote="Ehsan is a trusted mentor, supporting junior designers' and peers' growth and development. His approachable, inspiring mentorship style yields stronger, more confident design outputs."
          author="Greg Hirshland"
          role="Product Design"
        />
      </div>

      <CaseStudySection title="Reflection">
        <p>
          <strong className="text-foreground">What worked:</strong> Leading
          by example. The Shop Everything success gave the program
          credibility from day one. People saw what was possible and
          wanted in. Office hours with no prerequisites meant nobody
          was embarrassed to be a beginner. And every session was about
          building something real, never abstract coding exercises.
        </p>
        <p>
          <strong className="text-foreground">What I learned:</strong>{' '}
          Teaching is the highest-leverage activity a senior IC can do.
          One hour of teaching saves a hundred hours of org-wide
          struggling. Program building is also a leadership signal
          that transcends your job title. People remember the person
          who built the thing that helped them level up.
        </p>
      </CaseStudySection>
    </>
  );
}

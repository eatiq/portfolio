'use client';

import CaseStudyLayout from '@/components/ui/CaseStudyLayout';
import CaseStudySection from '@/components/ui/CaseStudySection';
import ParallaxImage from '@/components/animations/ParallaxImage';
import AnimatedCounter from '@/components/animations/AnimatedCounter';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { assets } from '@/lib/assets';

export default function WindowsSearchPage() {
  return (
    <CaseStudyLayout
      company="Microsoft"
      title="Windows Search"
      year="2024"
      link="https://www.support.microsoft.com/search"
      role="Product Designer"
      responsibilities={[
        'Core search UX design',
        'Monetization vertical design',
        'Partner integration design',
        'Motion design & guidelines',
      ]}
      overview={
        <>
          <p>
            Windows Search is a critical feature of the operating system, used by nearly 
            a billion daily active users. My work spanned multiple verticals within the 
            search experience.
          </p>
        </>
      }
      prevProject={{ label: 'Copilot Shopping', href: '/work/copilot-shopping' }}
      nextProject={{ label: 'Archives', href: '/work/archives' }}
    >
      {/* Hero Image */}
      <ParallaxImage className="mb-16 md:mb-24 rounded-2xl overflow-hidden">
        <img src={assets.windows.hero} alt="Windows Search hero" className="w-full rounded-2xl" />
      </ParallaxImage>

      {/* Scope */}
      <CaseStudySection label="01" title="Scope of Work">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-foreground/10">
            <h4 className="font-semibold mb-2">Core Search Functions</h4>
            <p className="text-sm">Natural language parsing, semantic search, and latency optimizations.</p>
          </div>
          <div className="p-5 rounded-xl border border-foreground/10">
            <h4 className="font-semibold mb-2">Monetization</h4>
            <p className="text-sm">Content browsing experience powered by Bing, refreshed daily like a Google Doodle.</p>
          </div>
          <div className="p-5 rounded-xl border border-foreground/10">
            <h4 className="font-semibold mb-2">Partner Integration</h4>
            <p className="text-sm">Helping partners integrate their services into the Windows search box.</p>
          </div>
          <div className="p-5 rounded-xl border border-foreground/10">
            <h4 className="font-semibold mb-2">Motion Design</h4>
            <p className="text-sm">Establishing motion guidelines and improving UX with purposeful animations.</p>
          </div>
        </div>
      </CaseStudySection>

      <ParallaxImage className="mb-8 md:mb-12 rounded-2xl overflow-hidden">
        <img src={assets.windows.scope} alt="Windows Search scope overview" className="w-full rounded-2xl" />
      </ParallaxImage>
      <ScrollReveal>
        <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Overview of the Windows Search experience</p>
      </ScrollReveal>

      {/* Case Study: Loading Indicator */}
      <CaseStudySection label="02" title="Creating a Loading Indicator">
        <p>
          Windows Search integrates various providers — local files, apps, web results — 
          each with differing response speeds. Users experienced confusion when local 
          documents didn&apos;t appear immediately, leading them to abandon their search 
          entirely because they assumed the documents simply weren&apos;t there.
        </p>
      </CaseStudySection>

      <ParallaxImage className="mb-8 md:mb-12 rounded-2xl overflow-hidden">
        <img src={assets.windows.loadingStates} alt="Loading states exploration" className="w-full rounded-2xl" />
      </ParallaxImage>

      {/* Process */}
      <CaseStudySection label="03" title="Process">
        <p>
          The initial exploration involved using a shimmer effect as a placeholder along 
          with progressive disclosure of providers as they returned results. However, a 
          key realization changed the direction entirely: search returns results in 
          milliseconds, making most animations too fast to even notice.
        </p>
        <p>
          This led to simplifying the approach. Text-based loading indicators were dropped 
          in favor of a progress bar — a widely recognized pattern that remains visible 
          even at the millisecond range.
        </p>
      </CaseStudySection>

      {/* Videos showing the shimmer and variants */}
      <ScrollReveal>
        <div className="mb-8 md:mb-12 rounded-2xl overflow-hidden">
          <video src={assets.windows.videoShimmer} autoPlay loop muted playsInline className="w-full rounded-2xl" />
        </div>
        <p className="text-sm text-foreground/50 mb-8 text-center">Shimmer effect exploration</p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="mb-8 md:mb-12 rounded-2xl overflow-hidden">
          <video src={assets.windows.videoShimVar} autoPlay loop muted playsInline className="w-full rounded-2xl" />
        </div>
        <p className="text-sm text-foreground/50 mb-8 text-center">Shimmer variants</p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="mb-8 md:mb-12 rounded-2xl overflow-hidden">
          <video src={assets.windows.videoDropdown} autoPlay loop muted playsInline className="w-full rounded-2xl" />
        </div>
        <p className="text-sm text-foreground/50 mb-8 text-center">Dropdown animation</p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="mb-8 md:mb-12 rounded-2xl overflow-hidden">
          <video src={assets.windows.videoProviderbar} autoPlay loop muted playsInline className="w-full rounded-2xl" />
        </div>
        <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Provider bar loading</p>
      </ScrollReveal>

      <CaseStudySection label="" title="">
        <p>
          The placement was carefully considered. Since user attention naturally goes to 
          the &ldquo;Best Match&rdquo; result at the top, the progress bar was placed at the top 
          edge of the search panel. It only triggers when the user completes typing, 
          avoiding unnecessary visual noise during active input.
        </p>
      </CaseStudySection>

      <ScrollReveal>
        <div className="mb-8 md:mb-12 rounded-2xl overflow-hidden">
          <video src={assets.windows.videoTopEdge} autoPlay loop muted playsInline className="w-full rounded-2xl" />
        </div>
        <p className="text-sm text-foreground/50 mb-8 text-center">Top edge progress bar placement</p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="mb-8 md:mb-12 rounded-2xl overflow-hidden">
          <video src={assets.windows.videoTopWkey} autoPlay loop muted playsInline className="w-full rounded-2xl" />
        </div>
        <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Progress bar with Windows key activation</p>
      </ScrollReveal>

      {/* Solution */}
      <CaseStudySection label="04" title="Solution">
        <p>
          The final solution was a subtle top-edge progress indicator aligned with 
          Windows 11 design principles. The timing parameters were fine-tuned to feel 
          natural and responsive, and the solution was implemented directly in code.
        </p>
      </CaseStudySection>

      <ScrollReveal>
        <div className="mb-8 md:mb-12 rounded-2xl overflow-hidden">
          <video src={assets.windows.videoFinal} autoPlay loop muted playsInline className="w-full rounded-2xl" />
        </div>
        <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Final solution — the loading indicator in action</p>
      </ScrollReveal>

      <ParallaxImage className="mb-8 md:mb-12 rounded-2xl overflow-hidden">
        <img src={assets.windows.searchBox} alt="Windows Search box design" className="w-full rounded-2xl" />
      </ParallaxImage>

      <ParallaxImage className="mb-8 md:mb-12 rounded-2xl overflow-hidden">
        <img src={assets.windows.details} alt="Design details" className="w-full rounded-2xl" />
      </ParallaxImage>

      <ParallaxImage className="mb-16 md:mb-24 rounded-2xl overflow-hidden">
        <img src={assets.windows.final} alt="Final design" className="w-full rounded-2xl" />
      </ParallaxImage>

      {/* Learnings */}
      <CaseStudySection label="05" title="Learnings">
        <blockquote className="border-l-2 border-foreground/20 pl-6 italic text-lg">
          &ldquo;This project reinforced the importance of subtle design solutions, even 
          for large-scale problems. Sometimes the most impactful design work is the 
          kind that users never consciously notice.&rdquo;
        </blockquote>
      </CaseStudySection>

      <ParallaxImage className="mb-16 md:mb-24 rounded-2xl overflow-hidden">
        <img src={assets.windows.learnings} alt="Learnings" className="w-full rounded-2xl" />
      </ParallaxImage>

      {/* Impact */}
      <CaseStudySection label="06" title="Impact">
        <div className="p-6 rounded-xl border border-foreground/10">
          <div className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            ~<AnimatedCounter value={1000000000} className="tabular-nums" />
          </div>
          <p className="text-sm text-foreground/50">Active Windows devices benefiting from the improved search experience</p>
        </div>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}

'use client';

import CaseStudyLayout from '@/components/ui/CaseStudyLayout';
import CaseStudySection from '@/components/ui/CaseStudySection';
import FadeIn from '@/components/animations/FadeIn';

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

      {/* Image placeholder */}
      <FadeIn delay={0.1}>
        <div className="mb-16 md:mb-24 rounded-2xl border border-foreground/10 aspect-[16/9] bg-foreground/5 flex items-center justify-center">
          <span className="text-foreground/20 text-sm">Windows Search overview visual</span>
        </div>
      </FadeIn>

      {/* Case Study: Loading Indicator */}
      <CaseStudySection label="02" title="Creating a Loading Indicator">
        <p>
          Windows Search integrates various providers — local files, apps, web results — 
          each with differing response speeds. Users experienced confusion when local 
          documents didn&apos;t appear immediately, leading them to abandon their search 
          entirely because they assumed the documents simply weren&apos;t there.
        </p>
      </CaseStudySection>

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
        <p>
          The placement was carefully considered. Since user attention naturally goes to 
          the &ldquo;Best Match&rdquo; result at the top, the progress bar was placed at the top 
          edge of the search panel. It only triggers when the user completes typing, 
          avoiding unnecessary visual noise during active input.
        </p>
        <p>
          Multiple variants were explored with different thicknesses and padding from the 
          edges to find the right balance of visibility and subtlety.
        </p>
      </CaseStudySection>

      {/* Image placeholder */}
      <FadeIn delay={0.1}>
        <div className="mb-16 md:mb-24 rounded-2xl border border-foreground/10 aspect-[16/9] bg-foreground/5 flex items-center justify-center">
          <span className="text-foreground/20 text-sm">Loading indicator exploration visual</span>
        </div>
      </FadeIn>

      {/* Solution */}
      <CaseStudySection label="04" title="Solution">
        <p>
          The final solution was a subtle top-edge progress indicator aligned with 
          Windows 11 design principles. The timing parameters were fine-tuned to feel 
          natural and responsive, and the solution was implemented directly in code.
        </p>
      </CaseStudySection>

      {/* Learnings */}
      <CaseStudySection label="05" title="Learnings">
        <blockquote className="border-l-2 border-foreground/20 pl-6 italic text-lg">
          &ldquo;This project reinforced the importance of subtle design solutions, even 
          for large-scale problems. Sometimes the most impactful design work is the 
          kind that users never consciously notice.&rdquo;
        </blockquote>
      </CaseStudySection>

      {/* Impact */}
      <CaseStudySection label="06" title="Impact">
        <div className="p-6 rounded-xl border border-foreground/10">
          <p className="text-3xl md:text-4xl font-bold tracking-tight mb-2">~1B</p>
          <p className="text-sm text-foreground/50">Active Windows devices benefiting from the improved search experience</p>
        </div>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}

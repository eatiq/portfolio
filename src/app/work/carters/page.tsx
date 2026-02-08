'use client';

import CaseStudyLayout from '@/components/ui/CaseStudyLayout';
import CaseStudySection from '@/components/ui/CaseStudySection';
import FadeIn from '@/components/animations/FadeIn';

export default function CartersPage() {
  return (
    <CaseStudyLayout
      company="Carter's"
      title="Mobile App Redesign"
      year="2021"
      link="https://apps.apple.com/us/app/carters/id1275723118"
      role="Sole Product Designer"
      responsibilities={[
        'End to end app redesign',
        'User research & interviews',
        'Design system development',
        'Prototyping & motion design',
      ]}
      overview={
        <>
          <p>
            Carter&apos;s, a leading name in children&apos;s apparel, recruited me directly from 
            SCAD as part of their founding UX design team. I established design processes, 
            conducted research studies, and ran workshops with leadership.
          </p>
          <p>
            As the sole designer, I redesigned the entire app from home to checkout over 
            approximately 10 months of work, which was affected by the pandemic.
          </p>
        </>
      }
      prevProject={{ label: 'Archives', href: '/work/archives' }}
    >
      {/* Scope */}
      <CaseStudySection label="01" title="App Redesign Scope">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-foreground/10">
            <h4 className="font-semibold mb-2">Home Page</h4>
            <p className="text-sm">Dynamic layouts for different authentication levels.</p>
          </div>
          <div className="p-5 rounded-xl border border-foreground/10">
            <h4 className="font-semibold mb-2">Product Detail Page</h4>
            <p className="text-sm">Unique metadata display and product information hierarchy.</p>
          </div>
          <div className="p-5 rounded-xl border border-foreground/10">
            <h4 className="font-semibold mb-2">Search Experience</h4>
            <p className="text-sm">Simplified search with minimal filters and third-party suggestions.</p>
          </div>
          <div className="p-5 rounded-xl border border-foreground/10">
            <h4 className="font-semibold mb-2">Gamification</h4>
            <p className="text-sm">Baby milestones tied to rewards to drive engagement.</p>
          </div>
        </div>
      </CaseStudySection>

      {/* Image placeholder */}
      <FadeIn delay={0.1}>
        <div className="mb-16 md:mb-24 rounded-2xl border border-foreground/10 aspect-[16/9] bg-foreground/5 flex items-center justify-center">
          <span className="text-foreground/20 text-sm">App redesign overview visual</span>
        </div>
      </FadeIn>

      {/* Problem */}
      <CaseStudySection label="02" title="The Problem: Cart & Checkout">
        <p>
          The original app was essentially a web view of the desktop site, leading to 
          a cumbersome experience on mobile. The cart and checkout flow suffered from 
          multiple issues:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>Complexity: cumbersome cart and checkout process</li>
          <li>Inefficiency: lack of mobile-first design patterns</li>
          <li>Technical issues: missing images and failed orders from third-party setup</li>
        </ul>
        <blockquote className="border-l-2 border-foreground/20 pl-6 italic text-lg mt-6">
          &ldquo;To streamline the cart and checkout experience by reducing friction, 
          simplifying the user journey, ensuring key details are easy to find and 
          guide customers naturally through the process.&rdquo;
        </blockquote>
      </CaseStudySection>

      {/* Research */}
      <CaseStudySection label="03" title="Research">
        <p>
          We conducted 12 hour-long interviews with mothers at different parenting 
          stages. Two key insights emerged:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="p-5 rounded-xl border border-foreground/10">
            <h4 className="font-semibold mb-2">Convenience is Key</h4>
            <p className="text-sm">Moms wanted a quick, hassle-free checkout — they were often shopping with one hand while holding a child.</p>
          </div>
          <div className="p-5 rounded-xl border border-foreground/10">
            <h4 className="font-semibold mb-2">Trust & Clarity</h4>
            <p className="text-sm">Sizing, reviews, and honest descriptions mattered deeply. Pictures were the most important reference point.</p>
          </div>
        </div>
      </CaseStudySection>

      {/* Image placeholder */}
      <FadeIn delay={0.1}>
        <div className="mb-16 md:mb-24 rounded-2xl border border-foreground/10 aspect-[16/9] bg-foreground/5 flex items-center justify-center">
          <span className="text-foreground/20 text-sm">Research & exploration visual</span>
        </div>
      </FadeIn>

      {/* Solution */}
      <CaseStudySection label="04" title="Solution">
        <p>
          The final design introduced a dramatically shorter cart with a sticky checkout 
          button and a drawer paradigm for checkout — removing the need for a separate 
          screen entirely. The design system being developed in parallel was integrated 
          throughout.
        </p>
        <p>
          The engineering team built the MVP in a couple of months. User feedback 
          confirmed that customers appreciated the reduced information density and the 
          drawer paradigm. An interesting finding was that customers built their carts 
          over multiple days, which informed further simplification.
        </p>
      </CaseStudySection>

      {/* Impact */}
      <CaseStudySection label="05" title="Impact">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-foreground/10">
            <p className="text-3xl md:text-4xl font-bold tracking-tight mb-2">4.8/5</p>
            <p className="text-sm text-foreground/50">App Store rating after redesign</p>
          </div>
          <div className="p-6 rounded-xl border border-foreground/10">
            <p className="text-3xl md:text-4xl font-bold tracking-tight mb-2">↑ Revenue</p>
            <p className="text-sm text-foreground/50">Revenue per visit increase owing to the redesign</p>
          </div>
        </div>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}

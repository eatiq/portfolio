'use client';

import CaseStudyLayout from '@/components/ui/CaseStudyLayout';
import CaseStudySection from '@/components/ui/CaseStudySection';
import FadeIn from '@/components/animations/FadeIn';

export default function CopilotShoppingPage() {
  return (
    <CaseStudyLayout
      company="Microsoft"
      title="Shopping on Microsoft Copilot"
      year="2023"
      link="https://www.copilot.microsoft.com"
      role="Sole Product Designer"
      responsibilities={[
        'Vision and strategy',
        'Executive pitch and presentation',
        'End to end product design',
        'Motion design',
      ]}
      overview={
        <>
          <p>
            Copilot is the first foray for Microsoft into the world of AI. It had been 
            long running as a tented project before it was released to the public in 
            February 2023. During beta release, we found that shopping related queries 
            were one of the most popular use cases.
          </p>
          <p>
            I was part of the shopping design team at the time and was chosen to lead 
            this vertical. The following case study explores how shopping recommendations 
            and large data sets could be effectively integrated within an AI-powered chat.
          </p>
        </>
      }
      prevProject={{ label: 'Meta AI', href: '/work/meta-ai' }}
      nextProject={{ label: 'Windows Search', href: '/work/windows-search' }}
    >
      {/* Problem */}
      <CaseStudySection label="01" title="Chat isn&apos;t ideal for shopping">
        <p>
          The core challenge was that a conversational chat interface is fundamentally 
          not designed for shopping. Users received long paragraphs of text that lacked 
          images, pricing, and product metadata — the very things shoppers need to make 
          decisions.
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>Users received long paragraphs of text lacking images, pricing, and metadata</li>
          <li>Customers loved to compare products side by side</li>
          <li>Customers wanted to be told which products are best, with clear advantages</li>
          <li>Displaying large data sets in a limited chat interface space was challenging</li>
          <li>The engineering team had attempted solutions without design support</li>
        </ul>
      </CaseStudySection>

      {/* Image placeholder */}
      <FadeIn delay={0.1}>
        <div className="mb-16 md:mb-24 rounded-2xl border border-foreground/10 aspect-[16/9] bg-foreground/5 flex items-center justify-center">
          <span className="text-foreground/20 text-sm">Case study visual</span>
        </div>
      </FadeIn>

      {/* Process */}
      <CaseStudySection label="02" title="Process">
        <p>
          The process began with an initial exploration based on the engineering team&apos;s 
          prior attempts. I researched existing paradigms, including Cortana&apos;s virtual 
          assistant chat interfaces, to understand what had been tried before.
        </p>
        <p>
          A key insight emerged early: <strong>&ldquo;Less is more — let the customer decide.&rdquo;</strong> 
          This principle guided the design through multiple layout explorations.
        </p>
        <p>
          We conducted a user survey presenting four layout options (A, B, C, D). Options 
          A and D were the most preferred. A follow-up qualitative study confirmed that 
          7 out of 10 participants preferred Concept D — the horizontal layout — which 
          became the foundation of the final design.
        </p>
        <p>
          The design was then refined with product attributes, summarized reviews, and 
          filter pills to give users quick access to the information they needed.
        </p>
      </CaseStudySection>

      {/* Image placeholder */}
      <FadeIn delay={0.1}>
        <div className="mb-16 md:mb-24 rounded-2xl border border-foreground/10 aspect-[16/9] bg-foreground/5 flex items-center justify-center">
          <span className="text-foreground/20 text-sm">Process exploration visual</span>
        </div>
      </FadeIn>

      {/* Solution */}
      <CaseStudySection label="03" title="A well rounded, shopping answer">
        <p>
          The final solution introduced a horizontal format layout that displayed product 
          images, metadata, and GPT-generated summaries in a scannable format. Key 
          features included:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>Horizontal product tiles with images, pricing, and key attributes</li>
          <li>Digested reviews — a GPT-powered summary of public reviews</li>
          <li>Progressive disclosure via overlay for comparison tables and product detail pages</li>
          <li>Adapted layouts for mobile and Edge browser (narrower format)</li>
          <li>Product carousel optimized for mobile interaction</li>
        </ul>
      </CaseStudySection>

      {/* Image placeholder */}
      <FadeIn delay={0.1}>
        <div className="mb-16 md:mb-24 rounded-2xl border border-foreground/10 aspect-[16/9] bg-foreground/5 flex items-center justify-center">
          <span className="text-foreground/20 text-sm">Final solution visual</span>
        </div>
      </FadeIn>

      {/* Impact */}
      <CaseStudySection label="04" title="Impact">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-foreground/10">
            <p className="text-3xl md:text-4xl font-bold tracking-tight mb-2">~5M+</p>
            <p className="text-sm text-foreground/50">Daily active users upon launch</p>
          </div>
          <div className="p-6 rounded-xl border border-foreground/10">
            <p className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Top use case</p>
            <p className="text-sm text-foreground/50">Shopping queries were a contributing factor to user growth</p>
          </div>
        </div>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}

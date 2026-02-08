'use client';

import CaseStudyLayout from '@/components/ui/CaseStudyLayout';
import CaseStudySection from '@/components/ui/CaseStudySection';
import ParallaxImage from '@/components/animations/ParallaxImage';

export default function MetaAIPage() {
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
    >
      {/* Context */}
      <CaseStudySection label="01" title="The Challenge">
        <p>
          Facebook Search serves billions of queries across a diverse set of intents — 
          from finding people and groups to discovering posts, videos, and marketplace 
          listings. With the introduction of Meta AI, the opportunity emerged to 
          fundamentally transform how search works on the platform.
        </p>
        <p>
          The challenge was to integrate AI capabilities in a way that enhances the 
          existing search experience without disrupting the patterns that billions of 
          users have come to rely on.
        </p>
      </CaseStudySection>

      {/* Image placeholder with parallax */}
      <ParallaxImage className="mb-16 md:mb-24 rounded-2xl overflow-hidden">
        <div className="rounded-2xl border border-foreground/10 aspect-[16/9] bg-foreground/5 flex items-center justify-center">
          <span className="text-foreground/20 text-sm">Case study visual — coming soon</span>
        </div>
      </ParallaxImage>

      {/* Approach */}
      <CaseStudySection label="02" title="Approach">
        <p>
          Working closely with engineering, research, and product teams, I focused on 
          understanding the diverse search intents on Facebook and identifying where AI 
          could add the most value. This involved extensive user research, competitive 
          analysis, and rapid prototyping.
        </p>
        <p>
          The design process emphasized progressive enhancement — layering AI capabilities 
          on top of the existing search infrastructure rather than replacing it entirely. 
          This approach allowed us to ship iteratively and measure impact at each stage.
        </p>
      </CaseStudySection>

      {/* Image placeholder with parallax */}
      <ParallaxImage className="mb-16 md:mb-24 rounded-2xl overflow-hidden">
        <div className="rounded-2xl border border-foreground/10 aspect-[16/9] bg-foreground/5 flex items-center justify-center">
          <span className="text-foreground/20 text-sm">Design exploration visual — coming soon</span>
        </div>
      </ParallaxImage>

      {/* Note */}
      <CaseStudySection label="03" title="More Details Coming Soon">
        <div className="p-8 rounded-xl border border-foreground/10 text-center">
          <p className="text-foreground/50 text-lg">
            This case study is currently being developed. Detailed process documentation, 
            visuals, and impact metrics will be added as the project progresses.
          </p>
        </div>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}

'use client';

import CaseStudyLayout from '@/components/ui/CaseStudyLayout';
import CaseStudySection from '@/components/ui/CaseStudySection';
import ParallaxImage from '@/components/animations/ParallaxImage';
import AnimatedCounter from '@/components/animations/AnimatedCounter';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { assets } from '@/lib/assets';

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
      {/* Hero Image */}
      <ParallaxImage className="mb-16 md:mb-24 rounded-2xl overflow-hidden">
        <img src={assets.copilot.hero} alt="Copilot Shopping hero" className="w-full rounded-2xl" />
      </ParallaxImage>

      {/* Overview Image */}
      <img src={assets.copilot.overview} alt="Copilot Shopping overview" className="w-full rounded-2xl mb-16 md:mb-24" />

      {/* Problem */}
      <CaseStudySection label="01" title="Chat isn&apos;t ideal for shopping">
        <p>
          For shopping queries, we found that users often received long paragraphs of text, 
          which, while informative, lacked crucial elements like images, pricing, and metadata, 
          making it difficult to lead to a buying decision — it didn&apos;t give a sense of a shoppable product.
        </p>
      </CaseStudySection>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.copilot.problemChatResponse} alt="Initial responses for shopping prompts were lengthy, lacked visual aids and metadata" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Initial responses for shopping prompts were lengthy, lacked visual aids and metadata.</p>

      <CaseStudySection label="" title="">
        <p>
          We had some preliminary research that was done as part of other Microsoft Shopping 
          products and we had some insights about our customers&apos; preferences:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li><strong>Customers loved to compare products</strong> — They enjoyed examining the various attributes of an item and comparing with others to make an informed decision.</li>
          <li><strong>Tell me which products are the best</strong> — They wouldn&apos;t object to being informed about the superior option, provided the advantages were explained clearly.</li>
        </ul>
      </CaseStudySection>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.copilot.problemMsStartShopping} alt="Microsoft Start shopping was a product that we used for research" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Microsoft Start shopping was a product that we used for research</p>

      <CaseStudySection label="" title="Displaying large data sets">
        <p>
          Copilot would be the first time that GPT goodness was being grounded in real time search data. 
          This generated an overwhelming number of data points but restricted to the limited space of the 
          chat interface. During beta pre-launch, our customers indicated that a table format for such 
          longer sets of data is preferred.
        </p>
        <p>
          Our engineering team had a head start in trying to figure how to incorporate images and displaying 
          this table but were doing so without any design support. We also had executive feedback to 
          incorporate newer functionalities like filter/sort, reviews etc.
        </p>
      </CaseStudySection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        <ParallaxImage className="rounded-2xl overflow-hidden">
          <img src={assets.copilot.problemEngAttempt1} alt="Early engineering attempt 1" className="w-full rounded-2xl" />
        </ParallaxImage>
        <ParallaxImage className="rounded-2xl overflow-hidden">
          <img src={assets.copilot.problemEngAttempt2} alt="Early engineering attempt 2" className="w-full rounded-2xl" />
        </ParallaxImage>
      </div>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Early attempts made by the engineering team with no design support</p>

      {/* Solution */}
      <CaseStudySection label="02" title="A well rounded, shopping answer">
        <p>
          The final design features a layout that accommodated varying amounts of product information 
          in a horizontal format to clearly display images, metadata, and GPT summaries.
        </p>
        <p>
          Throughout the process, we learnt about the capabilities of GPT, one of the ideas that I 
          added as part of the final solution was a digested review — a summary of all the publicly 
          available reviews.
        </p>
      </CaseStudySection>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.copilot.solutionFinal} alt="Final Solution - A short intro and conclusion helps tie the natural response of the assistant together" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Final Solution — A short intro and conclusion helps tie the natural response of the assistant together.</p>

      <img src={assets.copilot.solutionDetails} alt="Details of the final answer" className="w-full rounded-2xl mb-3" />
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Details of the final answer</p>

      <img src={assets.copilot.solutionTileVariants} alt="Horizontal Product tile variants" className="w-full rounded-2xl mb-3" />
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Horizontal Product tile variants</p>

      <CaseStudySection label="" title="More to what meets the eye">
        <p>
          Through user testing we consistently found that progressive disclosure of information worked 
          best to handle larger data sets. I utilized an overlay to display further details such as the 
          comparison table and even a product detail page.
        </p>
      </CaseStudySection>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.copilot.solutionComparisonTable} alt="Comparison table and detailed attributes as part of an overlay" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Comparison table and detailed attributes as part of an overlay</p>

      {/* Videos */}
      <div className="mb-16 md:mb-24 space-y-3">
        <div className="rounded-2xl overflow-hidden">
          <video src={assets.copilot.videoTableCompar} autoPlay loop muted playsInline className="w-full rounded-2xl" />
        </div>
        <p className="text-sm text-foreground/50 text-center">Comparison table interaction</p>
      </div>

      <div className="mb-16 md:mb-24 space-y-3">
        <div className="rounded-2xl overflow-hidden">
          <video src={assets.copilot.videoTablePdp} autoPlay loop muted playsInline className="w-full rounded-2xl" />
        </div>
        <p className="text-sm text-foreground/50 text-center">Product detail page interaction</p>
      </div>

      <CaseStudySection label="" title="Adapted for different formats">
        <p>
          The design had to be adapted for a narrower format, for mobile and the Edge web browser. 
          I decided to focus on the image and metadata which gives a sense of the product, truncating 
          the summary with the ability to see more if necessary.
        </p>
      </CaseStudySection>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.copilot.solutionEdgeBrowser} alt="Clicking on any product opens the respective web page on the left" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Clicking on any product opens the respective web page on the left</p>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.copilot.solutionMobileCarousel} alt="For the mobile version, going with a product carousel made best sense" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">For the mobile version, going with a product carousel made best sense</p>

      {/* Process */}
      <CaseStudySection label="03" title="Initial exploration">
        <p>
          To begin I used the engineering team&apos;s attempts to base my explorations. I began by going 
          through existing research for Cortana the virtual assistant that also utilized chat-like 
          interfaces. I found an insight that was helpful:
        </p>
        <blockquote className="border-l-2 border-foreground/20 pl-4 my-4 italic text-foreground/70">
          Insight: Less is more, let the customer decide. Most customers don&apos;t want to be overwhelmed 
          with information up front and would much rather choose how much information is visible to 
          them with explicit inputs.
        </blockquote>
      </CaseStudySection>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.copilot.processExploration} alt="I developed multiple layouts of information, some made sense, some absolutely did not" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">I developed multiple layouts of information, some made sense, some absolutely did not</p>

      <CaseStudySection label="" title="Feedback and user survey">
        <p>
          After presenting these initial ideas and going through an initial review with my stakeholders, 
          I had a good idea of which options had potential. I decided to narrow down to four options and 
          conduct a user survey using our internal tool.
        </p>
      </CaseStudySection>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.copilot.processSurveyOptions} alt="Option A and C look into a vertical layout" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-8 text-center">Option A and C look into a vertical layout of the image and information whereas B and D look at a horizontal layout</p>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.copilot.processSurveyResults} alt="Concept A and D were the most preferred" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Result Screenshots — Concept A and D (outlined in green) from the above screenshot were the most preferred</p>

      <CaseStudySection label="" title="Qualitative study">
        <p>
          The results from the survey were encouraging. Just to be sure I wanted to run a qualitative 
          user test so that I can be double sure and have some additional user insights.
        </p>
      </CaseStudySection>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.copilot.processQualitativeStudy} alt="Three concepts with the same information that were used to validate" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-8 text-center">Three concepts with the same information that were used to validate the internal feedback tool</p>

      <img src={assets.copilot.processQualitativeResults} alt="Results from the qualitative study" className="w-full rounded-2xl mb-3" />
      <p className="text-sm text-foreground/50 mb-8 text-center">Results from the qualitative study</p>

      <CaseStudySection label="" title="">
        <p>
          Most participants (7 out of 10) had a clear preference for Concept D (Horizontal Layout). 
          One of the reasons that was mentioned was that information in rows is easier to read as 
          that&apos;s the natural manner of how our eyes go about reading a sentence.
        </p>
        <blockquote className="border-l-2 border-foreground/20 pl-4 my-4 italic text-foreground/70">
          &ldquo;I think it looks simple and kind of easy to go through the information. It would 
          definitely help go through the information, kind of more distinct.&rdquo;
          <footer className="text-sm mt-2 not-italic text-foreground/40">— Male participant, 30</footer>
        </blockquote>
        <blockquote className="border-l-2 border-foreground/20 pl-4 my-4 italic text-foreground/70">
          &ldquo;I don&apos;t need to search by myself separately. I can get those details in that place 
          when I click on it so I feel like that would be sufficient.&rdquo;
          <footer className="text-sm mt-2 not-italic text-foreground/40">— Female participant, 35</footer>
        </blockquote>
      </CaseStudySection>

      <CaseStudySection label="" title="Refinement">
        <p>
          Now that it was validated that the horizontally laid out concept was the most preferred, 
          I started fine tuning that direction. At this stage, I was exploring newer ideas such as 
          adding attributes in a row below, incorporating a summarized review and more.
        </p>
      </CaseStudySection>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.copilot.processRefinement} alt="Adding highlights: Trying out different pieces of information such as attributes, accolades in the form of a pill" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Adding highlights: Trying out different pieces of information such as attributes, accolades in the form of a pill</p>

      {/* Impact */}
      <CaseStudySection label="04" title="Impact and learnings">
        <p>
          Upon launch, Copilot attracted ~5M+ daily active users, demonstrating its immediate 
          popularity and relevance. Shopping queries had a contributing factor to the same.
        </p>
        <p>
          Working on this project helped me understand the complexities of integrating design with 
          AI-generated content in the e-commerce space. It was a high-stakes, fast-paced project 
          that challenged me to balance stakeholder needs and deliver a design but all in all 
          it&apos;s a time I was excited.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="p-6 rounded-xl border border-foreground/10">
            <div className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              ~<AnimatedCounter value={5000000} suffix="+" className="tabular-nums" />
            </div>
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

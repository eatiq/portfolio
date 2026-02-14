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
            a billion daily active users. Given its crucial nature, most work that happens 
            on search is scrutinized heavily, going through multiple release cycles before 
            making it to production.
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

      {/* Overview */}
      <CaseStudySection label="Overview" title="">
        <p>
          During my time on the Windows design team, I worked on core search functions like 
          natural language parsing, semantic search and optimizations to address latency.
        </p>
      </CaseStudySection>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.windows.scope} alt="Different variants of the search box depending on the type of query" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Different variants of the search box depending on the type of query</p>

      <CaseStudySection label="" title="">
        <p>
          I also worked on the monetization vertical within Windows Search, primarily focused 
          on the content browsing experience powered by Bing. I helped design experiments to 
          increase engagement and track growth.
        </p>
      </CaseStudySection>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.windows.overview} alt="The content browsing experience refreshed everyday similar to the Google Doodle" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">The content browsing experience refreshed everyday similar to the Google Doodle</p>

      <CaseStudySection label="" title="">
        <p>
          Another role that I carried out involved helping partners integrate their services 
          into the search box. I worked with them through their process and educated them on 
          the best practices before eventually reviewing their proposed designs.
        </p>
      </CaseStudySection>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.windows.searchBox} alt="Different elements to help integrate Microsoft Store apps within the search box" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Different elements to help integrate Microsoft Store apps within the search box</p>

      <CaseStudySection label="" title="">
        <p>
          Finally, one of my larger efforts involved incorporating motion design into the search 
          box, as I was the only designer with the required skill. Apart from establishing the 
          motion guidelines, I focused on improving overall UX by adding animations with the 
          intent to make the search experience better. The following is one such case study:
        </p>
      </CaseStudySection>

      {/* Case Study */}
      <CaseStudySection label="Case study" title="Creating a loading indicator">
        <p>
          This motion design project taught me the complexities of shipping at scale, working 
          with legacy code and arriving at a solution from an idea all the way to handing off code.
        </p>
      </CaseStudySection>

      {/* Problem */}
      <CaseStudySection label="Problem" title="">
        <p>
          Windows Search integrates various providers or data indexes such as local applications, 
          locally indexed files, cloud storage files, web results etc. When a user searches, the 
          engine attempts to find matches across all these providers and give a result. Now these 
          providers have differing speeds, which results in certain providers (like applications, 
          web results..) to be shown more than others because they come in quicker.
        </p>
      </CaseStudySection>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.windows.calculatorSearch} alt="Windows Search showing Calculator app results across multiple providers" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Windows Search showing results across multiple providers — apps, documents, web, and settings</p>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.windows.loadingStates} alt="Provider speeds were in the milliseconds range" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Provider speeds were in the milliseconds range, which in practice is very hard for customers to decipher</p>

      <CaseStudySection label="" title="">
        <p>
          We ran a research study that revealed our customers often experienced confusion when 
          local documents did not appear immediately in search results. This frequently led users 
          to abandon their search because their documents wouldn&apos;t show up immediately.
        </p>
        <p>
          To improve this we brainstormed and one proposed solution I had was to implement a 
          loading indicator when searches would take too long. This would inform users that the 
          search was ongoing, and they could expect results to appear shortly.
        </p>
      </CaseStudySection>

      {/* Process */}
      <CaseStudySection label="Process" title="Initial exploration">
        <p>
          I began by investigating the constraints of the search box, utilizing existing research 
          materials and specifications provided by my PM. This gave me a clear understanding of 
          what an initial attempt at a loader might be, looking at some commonly used paradigms.
        </p>
      </CaseStudySection>

      <div className="mb-3 rounded-2xl overflow-hidden">
        <video src={assets.windows.videoShimmer} autoPlay loop muted playsInline className="w-full rounded-2xl" />
      </div>
      <p className="text-sm text-foreground/50 mb-8 text-center">My first idea was the shimmer effect, an animating placeholder that helps create an illusion of loading</p>

      <div className="mb-3 rounded-2xl overflow-hidden">
        <video src={assets.windows.videoShimVar} autoPlay loop muted playsInline className="w-full rounded-2xl" />
      </div>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Different variants of the shimmer I tried using speed and scale</p>

      <CaseStudySection label="" title="">
        <p>
          My PM partner had asked if we could show to the user which provider was being searched 
          at a given point in time. I considered using progressive disclosure of information to 
          clearly indicate this without overwhelming the user.
        </p>
      </CaseStudySection>

      <div className="mb-3 rounded-2xl overflow-hidden">
        <video src={assets.windows.videoDropdown} autoPlay loop muted playsInline className="w-full rounded-2xl" />
      </div>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">This idea begins by displaying all the different providers, then drops down to show content as they finish loading.</p>

      <CaseStudySection label="" title="">
        <p>
          At this point, I realized that search returned results in the milliseconds range, which 
          suggests most of these animations that I shared above would be too fast to notice. The 
          human eye generally requires about a second to register movement.
        </p>
      </CaseStudySection>

      <div className="mb-3 rounded-2xl overflow-hidden">
        <video src={assets.windows.videoProviderbar} autoPlay loop muted playsInline className="w-full rounded-2xl" />
      </div>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">This concept accurately reflects the speed at which search returned results. You easily miss the loader at the bottom left corner and there is a noticeable stutter while loading.</p>

      {/* Simplifying the approach */}
      <CaseStudySection label="" title="Simplifying the approach">
        <p>
          I dropped the idea of showing text and realized we needed something that was clearly 
          visible in the millisecond range. The progress bar came to mind, as it is widely 
          recognized by users and conveys a sense of loading without the need for text.
        </p>
      </CaseStudySection>

      <div className="mb-3 rounded-2xl overflow-hidden">
        <video src={assets.windows.videoTopEdge} autoPlay loop muted playsInline className="w-full rounded-2xl" />
      </div>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">First version of the progress bar, common and effectively visible at higher load times</p>

      <CaseStudySection label="" title="">
        <p>
          We preferred displaying the progress bar at the top edge because of the customer&apos;s 
          attention went to Best Match usually. Now, I was looking at implementation details such 
          as when to trigger the animation, how it would behave while a user is typing.
        </p>
      </CaseStudySection>

      <div className="mb-3 rounded-2xl overflow-hidden">
        <video src={assets.windows.videoTopWkey} autoPlay loop muted playsInline className="w-full rounded-2xl" />
      </div>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">The progress bar is triggered only when the user completes typing. A blue dot on the left of the file name also indicates which file loaded last.</p>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.windows.details} alt="Multiple variants of the progress bar" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Multiple variants of the progress bar, experimenting with different thicknesses and padding from the edges</p>

      {/* Solution */}
      <CaseStudySection label="Solution" title="">
        <p>
          We had multiple reviews with our stakeholders and decided on the most subtle 
          implementation keeping in line with the Windows 11 design principles. The final 
          solution incorporated a few more tweaks and changes to the motion parameters to 
          ensure it was both effective and non-intrusive.
        </p>
      </CaseStudySection>

      <div className="mb-3 rounded-2xl overflow-hidden">
        <video src={assets.windows.videoFinal} autoPlay loop muted playsInline className="w-full rounded-2xl" />
      </div>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Final Design: A refined top edge progress indicator that is subtle yet effective.</p>

      <ParallaxImage className="mb-3 rounded-2xl overflow-hidden">
        <img src={assets.windows.final} alt="Implementation Details" className="w-full rounded-2xl" />
      </ParallaxImage>
      <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Implementation Details: Specific parameters on when and how long the loader should be displayed.</p>

      <CaseStudySection label="" title="">
        <p>
          The next step was to implement the design in code and fine-tune the timing to ensure 
          it was smooth. I dedicated extra time to this task, looking at existing references and 
          tried out different parameters to ensure that the animation ran smooth.
        </p>
      </CaseStudySection>

      {/* Learnings */}
      <CaseStudySection label="Learnings" title="">
        <p>
          This project reinforced the importance of subtle design solutions, even for large-scale 
          problems. Working on this taught me invaluable lessons about cross-functional collaboration 
          with product partners, design system leaders, and engineering teams, as well as the 
          complexities involved with large-scale design implementation.
        </p>
      </CaseStudySection>

      <ParallaxImage className="mb-16 md:mb-24 rounded-2xl overflow-hidden">
        <img src={assets.windows.learnings} alt="Learnings" className="w-full rounded-2xl" />
      </ParallaxImage>

      {/* Impact */}
      <CaseStudySection label="" title="Impact">
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

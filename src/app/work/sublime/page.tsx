'use client';

import CaseStudyLayout from '@/components/ui/CaseStudyLayout';
import CaseStudySection from '@/components/ui/CaseStudySection';
import ParallaxImage from '@/components/animations/ParallaxImage';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function SublimePage() {
  return (
    <CaseStudyLayout
      company="Personal"
      title="The Sublime within Islam"
      year="2018"
      link="https://ehsanswonderfulportfolio.on.drv.tw/ehsthetic/sublime.html"
      role="Designer & Researcher"
      responsibilities={[
        'Digital Illustration',
        'Motion Design',
        'Academic Research',
        'Projection Mapping',
      ]}
      overview={
        <>
          <p>
            This project explores the philosophical branch of Aesthetics within the context 
            of Islamic Artistic Expression. It is an attempt at grasping my identity as it 
            stems from a variety of experiences and influences growing up in an Islamic 
            environment in Abu Dhabi.
          </p>
          <p>
            The correlation of Islamic Artforms with the Western philosophical idea of the 
            Sublime is something that has not been attributed much in the past. This project 
            consists of a research paper and a visual exploration of the same.
          </p>
          <div className="flex flex-wrap gap-6 mt-4 text-sm text-foreground/50">
            <div><span className="text-foreground/70 font-medium">Execution:</span> 3 months</div>
            <div><span className="text-foreground/70 font-medium">Conceptualization:</span> 4 months</div>
            <div><span className="text-foreground/70 font-medium">Tools:</span> Illustrator, After Effects, Final Cut Pro</div>
          </div>
        </>
      }
      prevProject={{ label: "Carter's", href: '/work/carters' }}
      nextProject={{ label: 'Archives', href: '/work/archives' }}
    >
      {/* Project Montage Video */}
      <ScrollReveal>
        <div className="mb-2 rounded-2xl overflow-hidden aspect-video">
          <iframe
            src="https://www.youtube.com/embed/c7U9KxcIv8E"
            title="The Sublime within Islam — Project Montage"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Project Montage</p>
      </ScrollReveal>

      {/* Section 1: Identity */}
      <CaseStudySection label="01" title="A Problem of Identity, of Association">
        <p>
          My formative years of education have been in the post 9/11 era where Islam has 
          been in turmoil ever since. Being singled out for practising one&apos;s own faith 
          is against basic human morals.
        </p>
        <p>
          I simply asked myself, what am I doing to help change this perception of Muslims 
          in the modern world? Why isn&apos;t the beauty within Islam being shown to the world? 
          Thinking my immediate capabilities as a practitioner of design, I dwelled on this 
          matter further and wondered, <strong>How can I use Design to change the perception 
          of Muslims in the contemporary world?</strong>
        </p>
        <p>
          My self-imposed prompt only served as a question that I try and mentally address 
          every time I started working on an aspect of this project. To think aesthetically 
          pleasing artifacts can solve issues of perception is quite farfetched. The scale 
          is much beyond the realms of design and requires a holistic, global effort.
        </p>
      </CaseStudySection>

      {/* Placeholder: muslim2.jpg */}
      <ScrollReveal>
        <div className="mb-2 rounded-2xl overflow-hidden bg-foreground/5 aspect-[16/10] flex items-center justify-center">
          <p className="text-foreground/30 text-sm">Image: Identity context</p>
        </div>
        <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">The question of identity and association</p>
      </ScrollReveal>

      {/* Section 2: Golden Age */}
      <CaseStudySection label="02" title="Trying to Re-live the Golden Age">
        <p>
          The Golden Age of Islam was a period in history where various fields such as Art, 
          Science, and Philosophy flourished within the Islamic Caliphates. Economic development 
          occurred at a rampant rate and all in all there was an overall encouragement in the 
          notion of seeking knowledge. It was during this time that there was a peak in the 
          interest of developing the Art of Islam, the three notable elements of which are 
          Calligraphy, the Arabesque, and Geometric Patterns.
        </p>
        <p>
          Being brought up in Abu Dhabi, the environment was such that I was constantly 
          surrounded by these fascinating Islamic Geometric Patterns. Appreciative of how 
          it always was so pleasing to the eyes but I never made an effort to delve into 
          finding the true essence of the same. There was something about this form of 
          expression that always spoke to me.
        </p>
        <blockquote className="border-l-2 border-foreground/20 pl-6 italic text-lg">
          &ldquo;Islamic Geometric Patterns are something so timeless that they have managed 
          to survive millennia and still manage to capture the imagination of millions around 
          the world, irrespective of cultural lines.&rdquo;
        </blockquote>
      </CaseStudySection>

      {/* Section 3: Research */}
      <CaseStudySection label="03" title="Attributing the Sublime to Abstraction">
        <p>
          To go about this exploration I really wanted to be grounded in research. I wanted 
          to know what went in the minds of the Artisans that were making these geometric 
          patterns. Seeking help I contacted religious scholars and even the experts in the 
          field of Islamic Philosophy. I ran into more dead ends as Islamic Philosophers 
          never really spoke about Aesthetics as a philosophical branch.
        </p>
        <p>
          One thing that I knew was that Islam was all about the Sublime. When I really 
          dwelled upon Islamic Geometric Patterns, I found its characteristics in accordance 
          with what would be considered Sublime. It only made sense for me to attribute them 
          together and strike comparisons. The following paper is the result which was done 
          in a period of nearly two months and was submitted for review by the Islamic Art 
          Society of the United States.
        </p>
        <a
          href="https://ehsanswonderfulportfolio.on.drv.tw/ehsthetic/images/sublime/pattern.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-3 rounded-lg border border-foreground/20 text-sm hover:bg-foreground/5 transition-colors"
        >
          View Research Paper →
        </a>
      </CaseStudySection>

      {/* Placeholder: islam1.jpg, islam2.jpg */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div className="rounded-2xl overflow-hidden bg-foreground/5 aspect-square flex items-center justify-center">
            <p className="text-foreground/30 text-sm">Image: Islamic pattern 1</p>
          </div>
          <div className="rounded-2xl overflow-hidden bg-foreground/5 aspect-square flex items-center justify-center">
            <p className="text-foreground/30 text-sm">Image: Islamic pattern 2</p>
          </div>
        </div>
        <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Islamic Geometric Patterns — the foundation of the visual exploration</p>
      </ScrollReveal>

      {/* Section 4: Visual Exploration */}
      <CaseStudySection label="04" title="An Attempt to Conceive the Inconceivable">
        <p>
          I proceeded to then apply context to the research and visually explore each of 
          the features that the Islamic Geometric Patterns represent. As much as I wanted 
          to stick to the convention of compound shapes and tessellations, I felt the need 
          to interpret them in a unique manner that was more reflective of the current age. 
          I felt I needed to make them my own.
        </p>
        <p>
          The visual styles I have used vary greatly amongst each example. It was me 
          attempting to explore different ideas and trying to visually represent factors 
          and focus on each of the individual characteristic that I discussed in my research 
          paper. The first exploration consisted of attempting to illustrate still images 
          of the Geometric Patterns.
        </p>
        <p>
          The second exploration involved incorporating motion onto these still patterns. 
          The idea of making these patterns dynamic and constantly changing was something 
          that was persistently lodged in my head. There was scope to represent more 
          subtleties when motion was factored in — making it ever-changing in a manner 
          where every frame gives a slightly different interpretation of the initial pattern.
        </p>
      </CaseStudySection>

      {/* Pattern Illustrations Placeholder Grid */}
      <ScrollReveal>
        <div className="grid grid-cols-3 gap-4 mb-2">
          {['pp1', 'pp3', 'pp4', 'pp5', 'pp6', 'pp7', 'pp8', 'pp9', 'pp2'].map((name) => (
            <div key={name} className="rounded-xl overflow-hidden bg-foreground/5 aspect-square flex items-center justify-center">
              <p className="text-foreground/30 text-xs">{name}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Still pattern explorations — each representing a different characteristic of the Sublime</p>
      </ScrollReveal>

      {/* YouTube Playlist — Motion Explorations */}
      <ScrollReveal>
        <div className="mb-2 rounded-2xl overflow-hidden aspect-video">
          <iframe
            src="https://www.youtube.com/embed/videoseries?list=PLCFJg2sJ5AOicI6bSE5eMjw7O3fjGTpCC"
            title="Sublime — Motion Explorations Playlist"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Motion explorations — dynamic, ever-changing interpretations of Islamic Geometric Patterns</p>
      </ScrollReveal>

      {/* Individual Motion Videos */}
      <ScrollReveal>
        <div className="mb-2 rounded-2xl overflow-hidden aspect-video">
          <iframe
            src="https://www.youtube.com/embed/DV0GKOWeb2A"
            title="Sublime — Pattern Animation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Animated geometric pattern — created in Illustrator, animated in After Effects</p>
      </ScrollReveal>

      {/* Section 5: Application */}
      <CaseStudySection label="05" title="Now What?">
        <p>
          I was persistent on trying to have a pragmatic application of these designs. 
          They were aesthetically pleasing and had a symbolic connotation but I just had 
          this feeling that this project was meant for more.
        </p>
        <p>
          I realized since this project stemmed from Islam, a religion that is grounded 
          in being charitable as one of its pillars — it needs to give back in some manner. 
          I started to print out some of the still images on pieces of 24&quot; &times; 24&quot; steel. 
          I used the material with the intention of having some of the metal shine through 
          as a means of being able to reflect on yourself.
        </p>
        <p>
          With the help of my friends I was able to search for interested buyers through 
          Instagram. I got a lot of positive responses from people looking to purchase 
          these pieces. I don&apos;t have any intentions of making money through this channel, 
          so I would like to take the profits and donate it to local causes in Savannah 
          that are in need of the same.
        </p>
      </CaseStudySection>

      {/* Print/Steel Placeholders */}
      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
          {['print1', 'print2', 'print3', 'print4', 'print5', 'print6'].map((name) => (
            <div key={name} className="rounded-xl overflow-hidden bg-foreground/5 aspect-square flex items-center justify-center">
              <p className="text-foreground/30 text-xs">{name}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Patterns printed on 24&quot; &times; 24&quot; steel — sold to donate to local causes</p>
      </ScrollReveal>

      {/* Section 6: Projection Mapping */}
      <CaseStudySection label="06" title="Bringing It to Life">
        <p>
          The still images were able to translate themselves into something useful. At 
          this point, it was only logical for me to figure out an application of the 
          animations as well. The animated patterns were used in a projection mapping 
          installation, bringing the geometric explorations into physical space.
        </p>
      </CaseStudySection>

      {/* Application/Projection Placeholders */}
      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
          {['app1', 'app2', 'app3', 'app4', 'app5', 'app6'].map((name) => (
            <div key={name} className="rounded-xl overflow-hidden bg-foreground/5 aspect-[4/3] flex items-center justify-center">
              <p className="text-foreground/30 text-xs">{name}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">Projection mapping installation — bringing the patterns into physical space</p>
      </ScrollReveal>

      {/* Recognition */}
      <CaseStudySection label="07" title="Recognition">
        <p>
          This project was awarded a <strong>Communication Arts Design Annual</strong> award, 
          recognizing the intersection of cultural research, digital illustration, and 
          motion design. It remains one of the most personally meaningful projects in 
          my body of work — a direct expression of identity, heritage, and the belief 
          that design can bridge cultural understanding.
        </p>
      </CaseStudySection>
    </CaseStudyLayout>
  );
}

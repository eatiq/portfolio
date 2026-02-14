'use client';

import CaseStudyLayout from '@/components/ui/CaseStudyLayout';
import CaseStudySection from '@/components/ui/CaseStudySection';
import ParallaxImage from '@/components/animations/ParallaxImage';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { assets } from '@/lib/assets';

export default function AwaazPage() {
  return (
    <CaseStudyLayout
      company="Personal"
      title="Project Awaaz"
      year="2014"
      role="Graphic Designer"
      responsibilities={[
        'Poster Design',
        'Visual Identity',
      ]}
      overview={
        <>
          <p>
            Awaaz is a word in Urdu that literally translates to Sound — or even Voice.
            This is a collection of graphic artwork primarily based around music, created
            for various events and artists over the years.
          </p>
          <p>
            Since its beginning in 2014, this project helped define my design style.
            This helped me find my Awaaz.
          </p>
        </>
      }
      prevProject={{ label: 'The Sublime within Islam', href: '/work/sublime' }}
      nextProject={{ label: 'Archives', href: '/work/archives' }}
    >
      {/* Cover */}
      <ParallaxImage className="mb-16 md:mb-24 rounded-2xl overflow-hidden">
        <img src={assets.awaaz.cover} alt="Project Awaaz — a collection of event posters" className="w-full rounded-2xl" />
      </ParallaxImage>

      {/* The Work */}
      <CaseStudySection label="The Work" title="A Broad Spectrum of Styles">
        <p>
          The artwork covers a broad spectrum of visual styles — each piece trying to
          capture the essence of the music being played on that particular night. Some
          are minimal, while others are quite loud.
        </p>
      </CaseStudySection>

      {/* Poster Grid — 2 columns */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div className="rounded-2xl overflow-hidden">
            <img src={assets.awaaz.dnb} alt="DnB event poster" className="w-full rounded-2xl" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={assets.awaaz.ben} alt="Ben event poster" className="w-full rounded-2xl" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={assets.awaaz.adbrown} alt="AD Brown event poster" className="w-full rounded-2xl" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={assets.awaaz.trash} alt="Trash event poster" className="w-full rounded-2xl" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={assets.awaaz.tri} alt="Tri event poster" className="w-full rounded-2xl" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={assets.awaaz.jody} alt="Jody Wisternoff India Tour poster" className="w-full rounded-2xl" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={assets.awaaz.martinroth} alt="Martin Roth event poster" className="w-full rounded-2xl" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={assets.awaaz.bscumbia} alt="Bass Sanskriti event poster" className="w-full rounded-2xl" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={assets.awaaz.abstrakt} alt="Abstrakt event poster" className="w-full rounded-2xl" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={assets.awaaz.afm} alt="AFM (Arnold From Mumbai) event poster" className="w-full rounded-2xl" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={assets.awaaz.aidc} alt="All India Dub Conference poster" className="w-full rounded-2xl" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={assets.awaaz.aidcAlt} alt="AIDC alternate poster" className="w-full rounded-2xl" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={assets.awaaz.anky} alt="Animated poster — Anky" className="w-full rounded-2xl" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={assets.awaaz.minusone} alt="Animated poster — Minus One" className="w-full rounded-2xl" />
          </div>
        </div>
        <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">
          Event posters — each capturing the mood and genre of the night
        </p>
      </ScrollReveal>
    </CaseStudyLayout>
  );
}

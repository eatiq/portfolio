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
<<<<<<< Updated upstream
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
=======
          {[
            'awaaz_dnb',
            'awaaz_ben',
            'awaaz_adbrown',
            'awaaz_trash',
            'awaaz_tri',
            'awaaz_jody',
            'awaaz_martinroth',
            'awaaz_bscumbia',
            'abstrakt',
            'afm',
            'aidc',
            'sundaze',
            'awaaz_anky',
            'awaaz_minusone',
          ].map((name) => (
            <div
              key={name}
              className="rounded-2xl overflow-hidden bg-foreground/5 aspect-[3/4] flex items-center justify-center"
            >
              <p className="text-foreground/30 text-sm">{name}</p>
            </div>
          ))}
>>>>>>> Stashed changes
        </div>
        <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">
          Event posters — each capturing the mood and genre of the night
        </p>
      </ScrollReveal>

<<<<<<< Updated upstream
      {/* Motion */}
      <CaseStudySection label="Motion" title="In Motion">
        <p>
          Some of the artwork was also animated to form motion flyers — adding
          another dimension to the visual identity of each event.
        </p>
        <a
          href="https://vimeo.com/225840309"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-3 rounded-lg border border-foreground/20 text-sm hover:bg-foreground/5 transition-colors"
        >
          View Motion Flyers →
        </a>
      </CaseStudySection>

      {/* GIFs */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div className="rounded-2xl overflow-hidden">
            <img src={assets.awaaz.anky} alt="Animated poster — Anky" className="w-full rounded-2xl" />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={assets.awaaz.minusone} alt="Animated poster — Minus One" className="w-full rounded-2xl" />
          </div>
        </div>
        <p className="text-sm text-foreground/50 mb-16 md:mb-24 text-center">
          Animated poster explorations
        </p>
      </ScrollReveal>

      {/* Bottom Cover */}
      <ParallaxImage className="mb-16 md:mb-24 rounded-2xl overflow-hidden">
        <img src={assets.awaaz.bottomCover} alt="Printed posters" className="w-full rounded-2xl" />
      </ParallaxImage>
=======
>>>>>>> Stashed changes
    </CaseStudyLayout>
  );
}

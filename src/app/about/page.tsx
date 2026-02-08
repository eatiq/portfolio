'use client';

import FadeIn from '@/components/animations/FadeIn';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';

export default function AboutPage() {
  return (
    <div>
      <Navigation />

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 relative">
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-baseline justify-between gap-4">
          <FadeIn delay={0.2}>
            <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter leading-none bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Ehsan
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter leading-none bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
              Atiq
            </h1>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 flex flex-col items-center gap-2 text-foreground/40 animate-[fadeIn_0.6s_ease-in-out_0.8s_both]">
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Bio Content */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-4xl mx-auto space-y-16 md:space-y-24">
          <FadeIn delay={0.1}>
            <p className="text-2xl md:text-4xl font-medium tracking-tight leading-snug">
              Born and raised in Abu Dhabi and now living in my third country, I&apos;ve 
              travelled a fair bit across the world and now call the Bay Area my home. 
              All that I have seen is engrained within me.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-2xl md:text-4xl font-medium tracking-tight leading-snug text-foreground/70">
              Undoubtedly, I am a product of a third culture which is a huge influence 
              and leeches into the designs I make.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-2xl md:text-4xl font-medium tracking-tight leading-snug">
              My design journey started in high school, where I would obsessively watch 
              YouTube tutorials. During undergrad, I had the incredible opportunity to 
              re-brand a music publication working with clients such as MTV and Vh1. 
              This experience ignited my passion for design.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-2xl md:text-4xl font-medium tracking-tight leading-snug text-foreground/70">
              My computer science degree deeply influenced my design philosophy, and in 
              2016, I co-founded Snoop, a CCTV app that reached the #2 spot on Product 
              Hunt. This really cemented my love for UX and my pursuit of it as a career.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-2xl md:text-4xl font-medium tracking-tight leading-snug">
              It took me a while but I realized that my true passion lies within people. 
              Problem solving in order to make someone&apos;s life a little easier is something 
              that motivates me. I am truly fascinated when people find unusual yet 
              brilliant solutions to the most mundane of problems. Similarly, I want to 
              use my abilities to find creative solutions and serve the people of today.
            </p>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}

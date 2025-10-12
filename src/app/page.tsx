'use client';

import FadeIn from '@/components/animations/FadeIn';
import SelectedWorks from '@/components/ui/SelectedWorks';

export default function Home() {
  const scrollToSection = () => {
    document.getElementById('work-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-12 relative">
        <div className="max-w-4xl w-full">
          <FadeIn delay={0.2}>
            <h1 className="text-5xl font-medium md:text-8xl tracking-tighter leading-normal">
              Ehsan Atiq
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <p className="text-xl md:text-2xl text-foreground/80 tracking-tight leading-normal text-gray-600">
              I am a front end developer turned product designer with over ten years 
              of experience. I operate at the intersection of design and code, currently at Meta.
            </p>
          </FadeIn>
        </div>

        {/* Scroll Down Arrow */}
        <button
          onClick={scrollToSection}
          className="absolute bottom-12 flex flex-col items-center gap-2 text-foreground/40 hover:text-foreground transition-colors group animate-[fadeIn_0.6s_ease-in-out_0.6s_both]"
          aria-label="Scroll to next section"
        >
          <span className="text-sm">Scroll</span>
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
        </button>
      </section>

      {/* Work Section */}
      <section id="work-section" className="min-h-screen flex items-center justify-center px-12 py-24">
        <div className="max-w-5xl w-full">
          <SelectedWorks />
        </div>
      </section>
    </div>
  );
}

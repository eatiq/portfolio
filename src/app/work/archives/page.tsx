'use client';

import FadeIn from '@/components/animations/FadeIn';
import PageTransition from '@/components/animations/PageTransition';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';

type ArchiveProject = {
  company: string;
  title: string;
  year: string;
  description: string;
  slug?: string;
};

const archiveProjects: ArchiveProject[] = [
  {
    company: "Carter's",
    title: 'Mobile App Redesign',
    year: '2021',
    description:
      "Carter's, a leading name in children's apparel, recruited me directly from SCAD as part of their founding UX design team. I was the sole designer who redesigned the entire app — from home to checkout — over ~10 months, helping them achieve a 4.8/5 App Store rating.",
    slug: 'carters',
  },
  {
    company: 'Personal',
    title: 'Sublime',
    year: '2019',
    description: 'My thesis and projection mapping installation — an exploration of light, space, and identity.',
  },
  {
    company: 'Personal',
    title: 'Snoop',
    year: '2016',
    description: 'A CCTV app that I co-founded, which reached the #2 spot on Product Hunt.',
  },
];

export default function ArchivesPage() {
  return (
    <PageTransition>
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              From the Archives
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed">
              Projects that showcase my background and earlier work. These represent 
              important milestones in my design journey.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Projects */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-5xl mx-auto space-y-8">
          {archiveProjects.map((project, idx) => (
            <FadeIn key={project.title} delay={0.1 + idx * 0.1}>
              <div className="group p-6 md:p-8 rounded-2xl border border-foreground/10 hover:border-foreground/20 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-foreground/50 font-medium">{project.company}</span>
                      <span className="text-foreground/20">·</span>
                      <span className="text-sm text-foreground/50">{project.year}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                      {project.title}
                    </h2>
                  </div>
                  {project.slug && (
                    <Link
                      href={`/work/${project.slug}`}
                      className="text-sm text-foreground/50 hover:text-foreground transition-colors whitespace-nowrap"
                    >
                      View case study →
                    </Link>
                  )}
                </div>
                <p className="text-foreground/60 leading-relaxed max-w-3xl">
                  {project.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Back */}
      <section className="px-6 md:px-12 pb-12">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="text-foreground/50 hover:text-foreground transition-colors">
            ← Back to Home
          </Link>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
}

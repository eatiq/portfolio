'use client';

import FadeIn from '@/components/animations/FadeIn';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { ReactNode } from 'react';

type CaseStudyLayoutProps = {
  company: string;
  title: string;
  year: string;
  link?: string;
  role: string;
  responsibilities: string[];
  overview: ReactNode;
  children: ReactNode;
  prevProject?: { label: string; href: string };
  nextProject?: { label: string; href: string };
};

export default function CaseStudyLayout({
  company,
  title,
  year,
  link,
  role,
  responsibilities,
  overview,
  children,
  prevProject,
  nextProject,
}: CaseStudyLayoutProps) {
  return (
    <div>
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-foreground/50 font-medium">{company}</span>
              <span className="text-foreground/20">·</span>
              <span className="text-sm text-foreground/50">{year}</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              {title}
            </h1>
          </FadeIn>

          {link && (
            <FadeIn delay={0.3}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/40 hover:text-foreground transition-colors underline underline-offset-4"
              >
                {link}
              </a>
            </FadeIn>
          )}
        </div>
      </section>

      {/* Overview + Role */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <FadeIn delay={0.1}>
                <h2 className="text-sm font-semibold text-foreground/40 uppercase tracking-wider mb-4">
                  Overview
                </h2>
                <div className="text-lg md:text-xl leading-relaxed text-foreground/80 space-y-4">
                  {overview}
                </div>
              </FadeIn>
            </div>

            <div>
              <FadeIn delay={0.2}>
                <h2 className="text-sm font-semibold text-foreground/40 uppercase tracking-wider mb-4">
                  Role
                </h2>
                <p className="text-foreground/80 font-medium mb-4">{role}</p>
                <ul className="space-y-1">
                  {responsibilities.map((r) => (
                    <li key={r} className="text-sm text-foreground/60">{r}</li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 md:px-12">
        <div className="max-w-4xl mx-auto border-t border-foreground/10" />
      </div>

      {/* Case Study Content */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </section>

      {/* Page Navigation */}
      <section className="px-6 md:px-12 pb-12">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {prevProject ? (
            <Link href={prevProject.href} className="text-foreground/50 hover:text-foreground transition-colors">
              ← {prevProject.label}
            </Link>
          ) : (
            <Link href="/" className="text-foreground/50 hover:text-foreground transition-colors">
              ← Back to Home
            </Link>
          )}
          {nextProject && (
            <Link href={nextProject.href} className="text-foreground/50 hover:text-foreground transition-colors">
              {nextProject.label} →
            </Link>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

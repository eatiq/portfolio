'use client';

import FadeIn from '@/components/animations/FadeIn';
import Link from 'next/link';

type SelectedWorkItem = {
  company: string;
  project: string;
  slug: string;
};

interface SelectedWorksProps {
  items?: SelectedWorkItem[];
}

export default function SelectedWorks({
  items = [
    { company: 'Meta', project: 'Facebook Search + Meta AI', slug: 'meta-ai' },
    { company: 'Microsoft', project: 'Copilot Shopping', slug: 'copilot-shopping' },
    { company: 'Microsoft', project: 'Windows Search', slug: 'windows-search' },
  ],
}: SelectedWorksProps) {
  return (
    <div className="w-full">
      <FadeIn delay={0.1}>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-10">
          Selected works
        </h2>
      </FadeIn>

      <ul className="space-y-5 md:space-y-7">
        {items.map((item, idx) => (
          <FadeIn key={`${item.company}-${item.project}`} delay={0.15 + idx * 0.1}>
            <li>
              <Link 
                href={`/work/${item.slug}`}
                className="text-xl md:text-3xl leading-tight flex flex-wrap items-baseline gap-x-4 hover:opacity-60 transition-opacity group"
              >
                <span className="font-extrabold tracking-tight">
                  {item.company}
                </span>
                <span className="text-foreground/50">//</span>
                <span className="tracking-tight">{item.project}</span>
              </Link>
            </li>
          </FadeIn>
        ))}
      </ul>
    </div>
  );
}



'use client';

import FadeIn from '@/components/animations/FadeIn';
import PageTransition from '@/components/animations/PageTransition';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';

type MotionItem = {
  title: string;
  description: string;
  videoUrl?: string;
};

const fullPrototypes: MotionItem[] = [
  {
    title: 'Microsoft Live Shopping',
    description: 'Browsing through live streams and having a clear view of the product offers available along with a smart timed introduction of products.',
  },
  {
    title: 'Google Maps Live View',
    description: 'Prototype utilizing the camera and gyroscope data, the idea is to suggest different activities depending on which direction you choose to start walking towards, along with spontaneous recommendations.',
  },
  {
    title: 'Microsoft Start Shopping',
    description: 'Walkthrough of a product detail page featuring multiple merchants including price insights such as a higher/lower price, further.',
  },
  {
    title: "Carter's Cart and Checkout",
    description: 'Stressing on having minimal distraction on the product cards and a simplified checkout flow contained within the drawer.',
  },
  {
    title: "Carter's Redesigned Search",
    description: 'Simplified search and search results page with minimal filters to help guide more attention towards product images and help onboard a third party for suggestions.',
  },
  {
    title: "Carter's Redesigned Home",
    description: 'Final home design that is enabled through motion with appear on scroll, starting from broader offers at the top ending with editorials at the bottom.',
  },
  {
    title: "Carter's Favorites to Purchase",
    description: 'A quick example of a lottie animation of a broken heart + sunburst that I created was implemented in the app.',
  },
];

const microInteractions: MotionItem[] = [
  {
    title: 'Microsoft Cashback — Activation',
    description: 'Fun little animation to show when activating cash back making use of the program\'s blue tag logo.',
  },
  {
    title: 'Microsoft Cashback — Boost',
    description: 'Utilizing an overlay animation, along with text and confetti-ish icons to help really sell the boost.',
  },
  {
    title: 'Microsoft Cashback — Card Drop',
    description: 'Card dropping animation, color change to indicate success along with the confetti to drop to accentuate the message.',
  },
  {
    title: "Carter's Order Completion",
    description: 'A rocket taking off indicating success in the state yet utilizing the theme of child-like illustrations to go with the theme of the Carter\'s app.',
  },
  {
    title: 'Microsoft Live Shopping — Entry Point',
    description: 'This card was an entry point on the Edge browser new tab page, the idea was to look at some products at offer when hovering over.',
  },
  {
    title: 'Microsoft Edge New Tab Page',
    description: 'Another entry point in a crowded page utilizing subtle motion to indicate the trending nature of the product.',
  },
  {
    title: 'Windows Shopping Concept',
    description: 'Drag and drop products to a universal cart on Windows task bar to either save or go through a Microsoft Wallet purchase flow.',
  },
];

const logoAnimations: MotionItem[] = [
  { title: 'Poker App Splash Screen', description: 'Splash screen animation for a Poker app.' },
  { title: "Carter's Logo Drop", description: "Carter's three logo drop splash animation." },
  { title: "Carter's Logo Animation", description: "Carter's logo animation — this one has some audio going on too." },
];

const animationLoops: MotionItem[] = [
  { title: 'Heart', description: 'Heart micro-interaction.' },
  { title: 'Heart Break', description: 'Heart break micro-interaction.' },
  { title: 'Burst', description: 'Burst micro-interaction.' },
  { title: 'Coupon', description: 'Coupon animation.' },
  { title: 'Rocket', description: 'Rocket animation loop.' },
];

function MotionSection({ title, items, startDelay = 0 }: { title: string; items: MotionItem[]; startDelay?: number }) {
  return (
    <div className="mb-20 md:mb-32">
      <FadeIn delay={startDelay}>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10 text-foreground/60">
          {title}
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {items.map((item, idx) => (
          <FadeIn key={item.title} delay={startDelay + 0.05 + idx * 0.05}>
            <div className="group rounded-2xl border border-foreground/10 overflow-hidden hover:border-foreground/20 transition-colors">
              {/* Video placeholder */}
              <div className="aspect-[4/3] bg-foreground/5 flex items-center justify-center">
                <div className="text-foreground/20 text-sm">Video</div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

export default function MotionPage() {
  return (
    <PageTransition>
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Motion
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed mb-4">
              This is a page dedicated to the motion work I&apos;ve done over the years. 
              All of the work featured below have minimal explanation and serve as a 
              demonstration of skill. For detailed processes, please refer to the case 
              studies available on the home page.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Link 
              href="/" 
              className="text-foreground/50 hover:text-foreground transition-colors text-sm underline underline-offset-4"
            >
              View case studies →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-5xl mx-auto">
          <MotionSection title="Full Prototypes" items={fullPrototypes} startDelay={0.1} />
          <MotionSection title="Micro-interactions" items={microInteractions} startDelay={0.1} />
          <MotionSection title="Logo Animations" items={logoAnimations} startDelay={0.1} />
          <MotionSection title="Animation Loops" items={animationLoops} startDelay={0.1} />
        </div>
      </section>

      {/* Page Navigation */}
      <section className="px-6 md:px-12 pb-12">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-foreground/50 hover:text-foreground transition-colors">
            ← Back to Home
          </Link>
          <Link href="/video" className="text-foreground/50 hover:text-foreground transition-colors">
            Next: Video →
          </Link>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
}

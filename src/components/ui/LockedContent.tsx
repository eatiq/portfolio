'use client';

import FadeIn from '@/components/animations/FadeIn';

type LockedContentProps = {
  isLocked: boolean;
  children: React.ReactNode;
  delay?: number;
};

export default function LockedContent({ isLocked, children, delay = 0.5 }: LockedContentProps) {
  if (!isLocked) {
    return <div className="mb-12">{children}</div>;
  }

  return (
    <FadeIn delay={delay}>
      <div className="mb-12 w-fit mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-foreground/10">
          <div className="blur-lg select-none pointer-events-none">
            {children}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-foreground/10">
              <svg 
                className="w-6 h-6 text-foreground/60" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}


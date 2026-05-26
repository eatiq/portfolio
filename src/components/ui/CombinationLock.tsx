'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useCombinationLock } from '@/hooks/useCombinationLock';
import CombinationDial from './CombinationDial';

type CombinationLockProps = {
  combination: [number, number, number];
  storageKey?: string;
  children: React.ReactNode;
};

const STEP_LABELS = ['Turn right', 'Turn left', 'Turn right'];
const FOCUS_DURATION_S = 0.7;
const DIAL_SETTLE_MS = 350;
const EASE_FOCUS = [0.22, 1, 0.36, 1] as const;

export default function CombinationLock({
  combination,
  storageKey = 'case-study-lock',
  children,
}: CombinationLockProps) {
  const [lockState, setLockState] = useState<'locked' | 'unlocking' | 'unlocked'>('locked');
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);
  // Default to a generous height so returning visitors (who skip the lock UI
  // entirely) never see a clipped wrapper before measurement lands.
  const [contentHeight, setContentHeight] = useState<number>(100000);
  const [lockUIHeight, setLockUIHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const lockUIRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(storageKey) === 'unlocked') {
      setLockState('unlocked');
    }
    setHasCheckedStorage(true);
  }, [storageKey]);

  // Keep the wrapper and lock UI heights in sync with their actual content so
  // the focus animation has accurate targets and resizes (e.g. images loading)
  // don't clip content after unlock.
  useLayoutEffect(() => {
    if (!hasCheckedStorage) return;
    const updateHeights = () => {
      if (contentRef.current) {
        const next = contentRef.current.scrollHeight;
        if (next > 0) setContentHeight(next);
      }
      if (lockUIRef.current) {
        const next = lockUIRef.current.scrollHeight;
        if (next > 0) setLockUIHeight(next);
      }
    };
    updateHeights();
    const observer = new ResizeObserver(updateHeights);
    if (contentRef.current) observer.observe(contentRef.current);
    if (lockUIRef.current) observer.observe(lockUIRef.current);
    return () => observer.disconnect();
  }, [hasCheckedStorage]);

  const handleUnlock = () => {
    setTimeout(() => {
      setLockState('unlocking');
      setTimeout(() => {
        setLockState('unlocked');
        sessionStorage.setItem(storageKey, 'unlocked');
      }, FOCUS_DURATION_S * 1000);
    }, DIAL_SETTLE_MS);
  };

  const {
    dialRotation,
    currentNumber,
    step,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useCombinationLock({ combination, onUnlock: handleUnlock });

  // Prevent flash of locked state for returning visitors
  if (!hasCheckedStorage) return null;

  const isRevealed = lockState !== 'locked';
  const isUnlocking = lockState === 'unlocking';

  // Only animate during the unlock transition. Other state changes (initial
  // mount, ResizeObserver updates after unlock) should snap silently so
  // child animations like FadeIn/ScrollFade keep their natural cadence.
  const focusTransition = isUnlocking
    ? { duration: FOCUS_DURATION_S, ease: EASE_FOCUS }
    : { duration: 0 };
  const gradientTransition = isUnlocking
    ? { duration: 0.45, ease: 'easeOut' as const }
    : { duration: 0 };
  const lockInnerTransition = isUnlocking
    ? { duration: 0.35, ease: EASE_FOCUS }
    : { duration: 0 };

  return (
    <div className="relative">
      {/* Preview wrapper — same tree for locked, unlocking, and unlocked so
          children (and their FadeIn / ScrollFade animations) never remount. */}
      <motion.div
        className="relative overflow-hidden"
        initial={false}
        animate={{ maxHeight: isRevealed ? contentHeight : 100 }}
        transition={focusTransition}
      >
        <motion.div
          ref={contentRef}
          initial={false}
          animate={{
            filter: isRevealed ? 'blur(0px)' : 'blur(4px)',
            opacity: isRevealed ? 1 : 0.4,
          }}
          style={{
            userSelect: isRevealed ? 'auto' : 'none',
            pointerEvents: isRevealed ? 'auto' : 'none',
          }}
          transition={focusTransition}
        >
          {children}
        </motion.div>
        <motion.div
          className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-background to-transparent pointer-events-none"
          initial={false}
          animate={{ opacity: isRevealed ? 0 : 1 }}
          transition={gradientTransition}
        />
      </motion.div>

      {/* Lock UI — container collapses to 0 while inner contents fade in
          place. Always mounted so reveals stay stable. */}
      <motion.div
        className="overflow-hidden"
        initial={false}
        animate={{ height: isRevealed ? 0 : lockUIHeight || 'auto' }}
        style={{ pointerEvents: isRevealed ? 'none' : 'auto' }}
        aria-hidden={isRevealed}
        transition={focusTransition}
      >
        <motion.div
          ref={lockUIRef}
          className="flex flex-col items-center pb-20 pt-4"
          initial={false}
          animate={{
            opacity: isRevealed ? 0 : 1,
            y: isRevealed ? 16 : 0,
          }}
          transition={lockInnerTransition}
        >
          {/* Lock icon */}
          <div className="w-12 h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-6">
            <svg
              className="w-5 h-5 text-foreground/40"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h3 className="text-lg font-semibold tracking-tight mb-2">
            Protected Content
          </h3>
          <p className="text-sm text-foreground/40 mb-8 text-center max-w-xs">
            Enter the combination to unlock this case study
          </p>

          {/* Step progress */}
          <div className="flex items-center gap-3 mb-10 text-sm font-mono">
            {[0, 1, 2].map((i) => (
              <span key={i} className="flex items-center gap-3">
                <span
                  className={`transition-colors duration-300 ${
                    step > i
                      ? 'text-foreground'
                      : step === i
                        ? 'text-foreground/70'
                        : 'text-foreground/30'
                  }`}
                >
                  {step > i ? '\u2713' : '\u2022\u2022'}
                </span>
                {i < 2 && <span className="text-foreground/20">&ndash;</span>}
              </span>
            ))}
          </div>

          {/* Dial */}
          <CombinationDial
            rotation={dialRotation}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          />

          {/* Current number readout */}
          <div className="mt-8 text-3xl font-mono font-bold tracking-widest text-foreground/80">
            {String(currentNumber).padStart(2, '0')}
          </div>

          {/* Step progress dots */}
          <div className="flex items-center gap-2.5 mt-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  step > i
                    ? 'bg-foreground scale-100'
                    : step === i
                      ? 'bg-foreground/40 scale-110'
                      : 'bg-foreground/15'
                }`}
              />
            ))}
          </div>

          {/* Current instruction */}
          <p className="mt-4 text-sm text-foreground/40">
            {step < 3 && STEP_LABELS[step]}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

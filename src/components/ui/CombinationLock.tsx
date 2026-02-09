'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCombinationLock } from '@/hooks/useCombinationLock';
import CombinationDial from './CombinationDial';

type CombinationLockProps = {
  combination: [number, number, number];
  storageKey?: string;
  children: React.ReactNode;
};

const STEP_LABELS = ['Turn right to', 'Turn left to', 'Turn right to'];

export default function CombinationLock({
  combination,
  storageKey = 'case-study-lock',
  children,
}: CombinationLockProps) {
  const [lockState, setLockState] = useState<'locked' | 'unlocking' | 'unlocked'>('locked');
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(storageKey) === 'unlocked') {
      setLockState('unlocked');
    }
    setHasCheckedStorage(true);
  }, [storageKey]);

  const handleUnlock = () => {
    setTimeout(() => {
      setLockState('unlocking');
      setTimeout(() => {
        setLockState('unlocked');
        localStorage.setItem(storageKey, 'unlocked');
      }, 800);
    }, 600);
  };

  const {
    dialRotation,
    currentNumber,
    step,
    isUnlocked,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useCombinationLock({ combination, onUnlock: handleUnlock });

  // Prevent flash of locked state for returning visitors
  if (!hasCheckedStorage) return null;

  if (lockState === 'unlocked') {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Blurred content preview */}
      <div className="relative max-h-[500px] overflow-hidden">
        <div className="blur-sm select-none pointer-events-none opacity-40">
          {children}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Lock interface */}
      <AnimatePresence mode="wait">
        {lockState === 'locked' && !isUnlocked && (
          <motion.div
            key="lock-ui"
            className="flex flex-col items-center pb-20 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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

            {/* Combination display */}
            <div className="flex items-center gap-3 mb-10 text-sm font-mono">
              {combination.map((num, i) => (
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
                    {num}
                  </span>
                  {i < 2 && <span className="text-foreground/20">–</span>}
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
              {step < 3 && (
                <>
                  {STEP_LABELS[step]}{' '}
                  <span className="text-foreground/70 font-mono font-medium">
                    {combination[step as 0 | 1 | 2]}
                  </span>
                </>
              )}
            </p>
          </motion.div>
        )}

        {/* Unlock success state */}
        {(isUnlocked || lockState === 'unlocking') && (
          <motion.div
            key="unlock-success"
            className="flex flex-col items-center py-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-foreground/60"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M8 11V7a4 4 0 018 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="mt-4 text-sm text-foreground/50">Unlocked</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

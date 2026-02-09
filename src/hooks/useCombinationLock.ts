'use client';

import { useMotionValue, animate } from 'framer-motion';
import { useState, useRef, useCallback } from 'react';

const DEGREES_PER_NUMBER = 9; // 360 / 40
const TOTAL_NUMBERS = 40;

type CombinationStep = 0 | 1 | 2 | 3;

type UseCombinationLockProps = {
  combination: [number, number, number];
  onUnlock: () => void;
};

function normalizeNumber(rotation: number): number {
  const mod = ((rotation % 360) + 360) % 360;
  return Math.round(mod / DEGREES_PER_NUMBER) % TOTAL_NUMBERS;
}

function snapRotation(rotation: number): number {
  return Math.round(rotation / DEGREES_PER_NUMBER) * DEGREES_PER_NUMBER;
}

export function useCombinationLock({ combination, onUnlock }: UseCombinationLockProps) {
  const dialRotation = useMotionValue(0);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [step, setStep] = useState<CombinationStep>(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const isDraggingRef = useRef(false);
  const prevAngleRef = useRef(0);
  const cumulativeRotationRef = useRef(0);
  const dragStartRotationRef = useRef(0);

  const getDragDirection = useCallback((): 'cw' | 'ccw' | null => {
    const net = cumulativeRotationRef.current - dragStartRotationRef.current;
    if (net > 5) return 'cw';
    if (net < -5) return 'ccw';
    return null;
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isUnlocked) return;
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;

    // Sync with current animated value in case snap animation was mid-flight
    cumulativeRotationRef.current = dialRotation.get();
    dragStartRotationRef.current = cumulativeRotationRef.current;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    prevAngleRef.current =
      Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
  }, [isUnlocked, dialRotation]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;

      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const angle =
        Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      let delta = angle - prevAngleRef.current;

      // Handle wrapping around ±180°
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;

      prevAngleRef.current = angle;
      cumulativeRotationRef.current += delta;

      // Detent snapping: pull toward nearest number position while dragging
      const raw = cumulativeRotationRef.current;
      const nearest = Math.round(raw / DEGREES_PER_NUMBER) * DEGREES_PER_NUMBER;
      const distToNearest = nearest - raw;
      const snappedRotation = raw + distToNearest * 0.35;

      dialRotation.set(snappedRotation);
      setCurrentNumber(normalizeNumber(cumulativeRotationRef.current));
    },
    [dialRotation],
  );

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const rotation = cumulativeRotationRef.current;
    const snapped = snapRotation(rotation);
    const number = normalizeNumber(snapped);

    cumulativeRotationRef.current = snapped;
    animate(dialRotation, snapped, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    });
    setCurrentNumber(number);

    const direction = getDragDirection();
    if (!direction) return;

    // Step 0: Turn right (CW) to first number
    if (step === 0 && direction === 'cw' && number === combination[0]) {
      setStep(1);
    }
    // Step 1: Turn left (CCW) to second number
    else if (step === 1 && direction === 'ccw' && number === combination[1]) {
      setStep(2);
    }
    // Step 2: Turn right (CW) to third number → unlock
    else if (step === 2 && direction === 'cw' && number === combination[2]) {
      setStep(3);
      setIsUnlocked(true);
      onUnlock();
    }
  }, [step, combination, dialRotation, getDragDirection, onUnlock]);

  const reset = useCallback(() => {
    setStep(0);
    setCurrentNumber(0);
    setIsUnlocked(false);
    cumulativeRotationRef.current = 0;
    dialRotation.set(0);
  }, [dialRotation]);

  return {
    dialRotation,
    currentNumber,
    step,
    isUnlocked,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    reset,
  };
}

'use client';

import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

function formatNumber(value: number, latest: number): string {
  if (value >= 1000000000) {
    const b = latest / 1000000000;
    if (b < 0.1) return '0';
    return `${b.toFixed(b >= 1 ? 0 : 1)}B`;
  }
  if (value >= 1000000) {
    const m = latest / 1000000;
    if (m < 0.1) return '0';
    return `${m.toFixed(m >= 1 ? 0 : 1)}M`;
  }
  if (value >= 1000) {
    const k = latest / 1000;
    if (k < 0.1) return '0';
    return `${k.toFixed(0)}K`;
  }
  return `${Math.round(latest)}`;
}

function formatTarget(value: number): string {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(0)}B`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(0)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return `${value}`;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '200px' });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 40,
    damping: 25,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValue, setDisplayValue] = useState(
    `${prefix}${formatTarget(value)}${suffix}`
  );

  useEffect(() => {
    if (isInView && !hasAnimated) {
      // Reset to 0 first, then animate to target
      motionValue.set(0);
      // Small delay to ensure the 0 is registered before animating
      requestAnimationFrame(() => {
        motionValue.set(value);
      });
      setHasAnimated(true);
    }
  }, [isInView, motionValue, value, hasAnimated]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      const formatted = formatNumber(value, latest);
      setDisplayValue(`${prefix}${formatted}${suffix}`);
    });
    return unsubscribe;
  }, [springValue, value, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}

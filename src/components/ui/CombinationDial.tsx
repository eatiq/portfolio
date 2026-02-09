'use client';

import { MotionValue, motion } from 'framer-motion';
import { useMemo } from 'react';

type CombinationDialProps = {
  rotation: MotionValue<number>;
  size?: number;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
};

const TOTAL_NUMBERS = 40;
const DEG_PER_NUM = 360 / TOTAL_NUMBERS;

function buildTicks() {
  return Array.from({ length: TOTAL_NUMBERS }, (_, i) => {
    const rad = -(i * DEG_PER_NUM * Math.PI) / 180; // CCW like a real lock
    const isMajor = i % 10 === 0;
    const isMedium = i % 5 === 0;
    const outerR = 125;
    const innerR = isMajor ? 107 : isMedium ? 112 : 117;

    return {
      x1: outerR * Math.sin(rad),
      y1: -outerR * Math.cos(rad),
      x2: innerR * Math.sin(rad),
      y2: -innerR * Math.cos(rad),
      strokeWidth: isMajor ? 2 : isMedium ? 1.5 : 0.8,
      opacity: isMajor ? 0.8 : isMedium ? 0.6 : 0.4,
    };
  });
}

function buildNumbers() {
  const result: {
    x: number;
    y: number;
    value: number;
    angleDeg: number;
    fontSize: number;
    opacity: number;
    fontWeight: number;
  }[] = [];

  for (let i = 0; i < TOTAL_NUMBERS; i += 2) {
    const deg = -(i * DEG_PER_NUM); // CCW like a real lock
    const rad = (deg * Math.PI) / 180;
    const r = 96;
    const isMajor = i % 10 === 0;

    result.push({
      x: r * Math.sin(rad),
      y: -r * Math.cos(rad),
      value: i,
      angleDeg: deg,
      fontSize: isMajor ? 16 : 13,
      opacity: isMajor ? 0.95 : 0.65,
      fontWeight: isMajor ? 700 : 400,
    });
  }

  return result;
}

export default function CombinationDial({
  rotation,
  size = 280,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: CombinationDialProps) {
  const ticks = useMemo(buildTicks, []);
  const numbers = useMemo(buildNumbers, []);

  return (
    <svg
      viewBox="-155 -155 310 310"
      width={size}
      height={size}
      className="cursor-grab active:cursor-grabbing select-none touch-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <defs>
        <radialGradient id="dial-housing" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </radialGradient>
        <radialGradient id="dial-face" cx="50%" cy="42%" r="50%">
          <stop offset="0%" stopColor="#2e2e2e" />
          <stop offset="60%" stopColor="#222" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </radialGradient>
        <radialGradient id="dial-hub" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#333" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </radialGradient>
        <filter id="dial-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.4" />
        </filter>
        <filter id="indicator-glow">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="2"
            floodColor="#fff"
            floodOpacity="0.25"
          />
        </filter>
      </defs>

      {/* Outer housing */}
      <circle cx="0" cy="0" r="150" fill="url(#dial-housing)" />
      <circle
        cx="0"
        cy="0"
        r="150"
        fill="none"
        stroke="#444"
        strokeWidth="0.5"
      />

      {/* Housing inner rim highlight */}
      <circle
        cx="0"
        cy="0"
        r="133"
        fill="none"
        stroke="#333"
        strokeWidth="0.5"
      />

      {/* Subtle overhead light reflection on housing */}
      <path
        d="M -100,-110 A 145,145 0 0,1 100,-110"
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Rotating dial group */}
      <motion.g
        className="[transform-box:fill-box] origin-center"
        style={{ rotate: rotation }}
        filter="url(#dial-shadow)"
      >
        {/* Dial face */}
        <circle cx="0" cy="0" r="130" fill="url(#dial-face)" />

        {/* Knurled edge */}
        <circle
          cx="0"
          cy="0"
          r="131"
          fill="none"
          stroke="#444"
          strokeWidth="2.5"
          strokeDasharray="1.2 2.4"
        />

        {/* Decorative concentric rings */}
        <circle
          cx="0"
          cy="0"
          r="128"
          fill="none"
          stroke="#333"
          strokeWidth="0.3"
        />
        <circle
          cx="0"
          cy="0"
          r="82"
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="0.3"
        />

        {/* Tick marks */}
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="#999"
            strokeWidth={t.strokeWidth}
            opacity={t.opacity}
            strokeLinecap="round"
          />
        ))}

        {/* Numbers */}
        {numbers.map((n) => (
          <text
            key={n.value}
            x={n.x}
            y={n.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ccc"
            fontSize={n.fontSize}
            fontWeight={n.fontWeight}
            opacity={n.opacity}
            style={{ fontFamily: 'var(--font-main), system-ui, sans-serif' }}
            transform={`rotate(${n.angleDeg} ${n.x} ${n.y})`}
          >
            {n.value}
          </text>
        ))}

        {/* Center hub */}
        <circle cx="0" cy="0" r="28" fill="url(#dial-hub)" />
        <circle
          cx="0"
          cy="0"
          r="28"
          fill="none"
          stroke="#444"
          strokeWidth="0.5"
        />
        <circle cx="0" cy="0" r="10" fill="#2a2a2a" />
        <circle
          cx="0"
          cy="0"
          r="10"
          fill="none"
          stroke="#3a3a3a"
          strokeWidth="0.5"
        />
      </motion.g>

      {/* Fixed indicator triangle at top */}
      <polygon
        points="0,-137 -7,-151 7,-151"
        fill="#e0e0e0"
        filter="url(#indicator-glow)"
      />
    </svg>
  );
}

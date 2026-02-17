'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

const COLOR_PRIMARY = '#D4A449';
const COLOR_SECONDARY = '#4C90C8';
const COLOR_GUIDE = 'rgba(212, 219, 229, 0.22)';
const COLOR_CONSTRUCTION = 'rgba(212, 219, 229, 0.12)';

const NUM_POINTS = 8;
const TWO_PI = Math.PI * 2;

type Point = { x: number; y: number };
type Line = { x1: number; y1: number; x2: number; y2: number };

function buildPolygonPath(points: Point[]) {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
}

function radialPoint(cx: number, cy: number, r: number, angle: number): Point {
  return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
}

function generateFullPattern(cx: number, cy: number, outerR: number) {
  const innerR = outerR * 0.382;
  const midR = outerR * 0.691;
  const ringR1 = outerR * 0.88;
  const ringR2 = outerR * 0.54;
  const ringR3 = outerR * 0.28;

  const guideCircles = [
    { cx, cy, r: outerR },
    { cx, cy, r: ringR1 },
    { cx, cy, r: midR },
    { cx, cy, r: ringR2 },
    { cx, cy, r: innerR },
    { cx, cy, r: ringR3 },
  ];

  const constructionCircles: { cx: number; cy: number; r: number }[] = [];
  for (let i = 0; i < NUM_POINTS; i++) {
    const angle = (i * TWO_PI) / NUM_POINTS - Math.PI / 2;
    constructionCircles.push({
      cx: cx + Math.cos(angle) * outerR,
      cy: cy + Math.sin(angle) * outerR,
      r: outerR * 0.52,
    });
  }

  const outerPoints: { x: number; y: number }[] = [];
  const innerPoints: { x: number; y: number }[] = [];
  const midPoints: { x: number; y: number }[] = [];
  const ringPointsA: Point[] = [];
  const ringPointsB: Point[] = [];
  const ringPointsC: Point[] = [];

  for (let i = 0; i < NUM_POINTS; i++) {
    const outerAngle = (i * TWO_PI) / NUM_POINTS - Math.PI / 2;
    const innerAngle = outerAngle + Math.PI / NUM_POINTS;
    const midAngle = outerAngle + Math.PI / (NUM_POINTS * 2);
    outerPoints.push({
      x: cx + Math.cos(outerAngle) * outerR,
      y: cy + Math.sin(outerAngle) * outerR,
    });
    innerPoints.push({
      x: cx + Math.cos(innerAngle) * innerR,
      y: cy + Math.sin(innerAngle) * innerR,
    });
    midPoints.push({
      x: cx + Math.cos(midAngle) * midR,
      y: cy + Math.sin(midAngle) * midR,
    });
    ringPointsA.push(radialPoint(cx, cy, ringR1, outerAngle));
    ringPointsB.push(radialPoint(cx, cy, ringR2, midAngle));
    ringPointsC.push(radialPoint(cx, cy, ringR3, outerAngle));
  }

  let starPath = '';
  for (let i = 0; i < NUM_POINTS; i++) {
    const nextI = (i + 1) % NUM_POINTS;
    if (i === 0) starPath += `M ${outerPoints[i].x} ${outerPoints[i].y} `;
    starPath += `L ${innerPoints[i].x} ${innerPoints[i].y} `;
    starPath += `L ${outerPoints[nextI].x} ${outerPoints[nextI].y} `;
  }
  starPath += 'Z';

  const innerStarPath = buildInnerStar(cx, cy, innerR * 1.15, innerR * 0.55);
  const microStarPath = buildInnerStar(cx, cy, ringR3 * 1.04, ringR3 * 0.72);
  const outerOctagonPath = buildPolygonPath(outerPoints);
  const ringAPath = buildPolygonPath(ringPointsA);
  const ringBPath = buildPolygonPath(ringPointsB);
  const ringCPath = buildPolygonPath(ringPointsC);

  const constructionLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < NUM_POINTS; i++) {
    constructionLines.push({
      x1: outerPoints[i].x,
      y1: outerPoints[i].y,
      x2: outerPoints[(i + 3) % NUM_POINTS].x,
      y2: outerPoints[(i + 3) % NUM_POINTS].y,
    });
    constructionLines.push({
      x1: outerPoints[i].x,
      y1: outerPoints[i].y,
      x2: cx,
      y2: cy,
    });
    constructionLines.push({
      x1: ringPointsA[i].x,
      y1: ringPointsA[i].y,
      x2: ringPointsB[i].x,
      y2: ringPointsB[i].y,
    });
  }

  const midConstructionLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < NUM_POINTS; i++) {
    const nextI = (i + 1) % NUM_POINTS;
    midConstructionLines.push({
      x1: outerPoints[i].x,
      y1: outerPoints[i].y,
      x2: innerPoints[i].x,
      y2: innerPoints[i].y,
    });
    midConstructionLines.push({
      x1: innerPoints[i].x,
      y1: innerPoints[i].y,
      x2: outerPoints[nextI].x,
      y2: outerPoints[nextI].y,
    });
    midConstructionLines.push({
      x1: ringPointsB[i].x,
      y1: ringPointsB[i].y,
      x2: ringPointsB[nextI].x,
      y2: ringPointsB[nextI].y,
    });
  }

  const kiteShapes: string[] = [];
  for (let i = 0; i < NUM_POINTS; i++) {
    const nextI = (i + 1) % NUM_POINTS;
    const midOuterAngle =
      ((i * TWO_PI) / NUM_POINTS + ((i + 1) * TWO_PI) / NUM_POINTS) / 2 -
      Math.PI / 2;
    const midPoint = {
      x: cx + Math.cos(midOuterAngle) * outerR * 0.72,
      y: cy + Math.sin(midOuterAngle) * outerR * 0.72,
    };
    kiteShapes.push(
      `M ${innerPoints[i].x} ${innerPoints[i].y} L ${outerPoints[nextI].x} ${outerPoints[nextI].y} L ${midPoint.x} ${midPoint.y} L ${outerPoints[i].x} ${outerPoints[i].y} Z`
    );
  }

  const interlaceLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < NUM_POINTS; i++) {
    const nextI = (i + 1) % NUM_POINTS;
    const prevI = (i + NUM_POINTS - 1) % NUM_POINTS;
    interlaceLines.push({
      x1: midPoints[i].x,
      y1: midPoints[i].y,
      x2: midPoints[(i + 2) % NUM_POINTS].x,
      y2: midPoints[(i + 2) % NUM_POINTS].y,
    });
    interlaceLines.push({
      x1: innerPoints[i].x,
      y1: innerPoints[i].y,
      x2: midPoints[i].x,
      y2: midPoints[i].y,
    });
    interlaceLines.push({
      x1: innerPoints[i].x,
      y1: innerPoints[i].y,
      x2: midPoints[prevI].x,
      y2: midPoints[prevI].y,
    });
  }

  const detailLines: Line[] = [];
  for (let i = 0; i < NUM_POINTS; i++) {
    const nextI = (i + 1) % NUM_POINTS;
    const farI = (i + 2) % NUM_POINTS;
    detailLines.push({
      x1: ringPointsA[i].x,
      y1: ringPointsA[i].y,
      x2: innerPoints[farI].x,
      y2: innerPoints[farI].y,
    });
    detailLines.push({
      x1: midPoints[i].x,
      y1: midPoints[i].y,
      x2: ringPointsC[nextI].x,
      y2: ringPointsC[nextI].y,
    });
    detailLines.push({
      x1: ringPointsC[i].x,
      y1: ringPointsC[i].y,
      x2: ringPointsC[nextI].x,
      y2: ringPointsC[nextI].y,
    });
  }

  const webLines: Line[] = [];
  for (let i = 0; i < NUM_POINTS; i++) {
    webLines.push({
      x1: outerPoints[i].x,
      y1: outerPoints[i].y,
      x2: outerPoints[(i + 2) % NUM_POINTS].x,
      y2: outerPoints[(i + 2) % NUM_POINTS].y,
    });
    webLines.push({
      x1: ringPointsA[i].x,
      y1: ringPointsA[i].y,
      x2: ringPointsA[(i + 3) % NUM_POINTS].x,
      y2: ringPointsA[(i + 3) % NUM_POINTS].y,
    });
  }

  const rosettePetals: string[] = [];
  for (let i = 0; i < NUM_POINTS; i++) {
    const angle1 = (i * TWO_PI) / NUM_POINTS - Math.PI / 2;
    const angle2 = ((i + 1) * TWO_PI) / NUM_POINTS - Math.PI / 2;
    const petalR = innerR * 0.9;
    const cp1 = {
      x: cx + Math.cos(angle1) * petalR * 1.4,
      y: cy + Math.sin(angle1) * petalR * 1.4,
    };
    const cp2 = {
      x: cx + Math.cos(angle2) * petalR * 1.4,
      y: cy + Math.sin(angle2) * petalR * 1.4,
    };
    const end = {
      x: cx + Math.cos((angle1 + angle2) / 2) * petalR * 0.5,
      y: cy + Math.sin((angle1 + angle2) / 2) * petalR * 0.5,
    };
    rosettePetals.push(
      `M ${cx} ${cy} Q ${cp1.x} ${cp1.y} ${end.x} ${end.y} Q ${cp2.x} ${cp2.y} ${cx} ${cy} Z`
    );
  }

  return {
    guideCircles,
    constructionCircles,
    outerPoints,
    innerPoints,
    midPoints,
    ringPointsA,
    ringPointsB,
    ringPointsC,
    starPath,
    innerStarPath,
    microStarPath,
    outerOctagonPath,
    ringAPath,
    ringBPath,
    ringCPath,
    constructionLines,
    midConstructionLines,
    kiteShapes,
    interlaceLines,
    detailLines,
    webLines,
    rosettePetals,
  };
}

function buildInnerStar(cx: number, cy: number, outerR: number, innerR: number) {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < NUM_POINTS; i++) {
    const outerAngle = (i * TWO_PI) / NUM_POINTS - Math.PI / 2;
    const innerAngle = outerAngle + Math.PI / NUM_POINTS;
    points.push({
      x: cx + Math.cos(outerAngle) * outerR,
      y: cy + Math.sin(outerAngle) * outerR,
    });
    points.push({
      x: cx + Math.cos(innerAngle) * innerR,
      y: cy + Math.sin(innerAngle) * innerR,
    });
  }
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
}

export default function PatternConstruction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const isDragging = useRef(false);

  const handleInteraction = useCallback((clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const y = clientY - rect.top;
    setProgress(Math.max(0, Math.min(1, y / rect.height)));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setProgress((prev) => Math.max(0, Math.min(1, prev + e.deltaY * 0.001)));
    };
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      handleInteraction(e.clientY);
    };
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging.current) handleInteraction(e.clientY);
    };
    const onMouseUp = () => { isDragging.current = false; };
    const onTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      handleInteraction(e.touches[0].clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging.current) {
        e.preventDefault();
        handleInteraction(e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => { isDragging.current = false; };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [handleInteraction]);

  const cx = 200;
  const cy = 200;
  const outerR = 140;
  const pattern = generateFullPattern(cx, cy, outerR);

  const phase = (start: number, end: number) =>
    Math.max(0, Math.min(1, (progress - start) / (end - start)));

  const p1 = phase(0, 0.12);
  const p2 = phase(0.1, 0.25);
  const p3 = phase(0.22, 0.35);
  const p4 = phase(0.32, 0.45);
  const p5 = phase(0.42, 0.55);
  const p6 = phase(0.52, 0.65);
  const p7 = phase(0.62, 0.75);
  const p8 = phase(0.72, 0.85);
  const p9 = phase(0.82, 0.95);
  const p10 = phase(0.88, 1.0);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center cursor-ns-resize select-none relative"
      style={{ touchAction: 'none' }}
    >
      <svg viewBox="0 0 400 400" className="w-full h-full max-w-[400px] max-h-[400px]">
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLOR_PRIMARY} stopOpacity={0.06 * p10} />
            <stop offset="100%" stopColor={COLOR_PRIMARY} stopOpacity={0} />
          </radialGradient>
        </defs>

        {p10 > 0 && (
          <circle cx={cx} cy={cy} r={outerR * 1.2} fill="url(#centerGlow)" />
        )}

        {/* Phase 1: Guide circles */}
        {pattern.guideCircles.map((circle, i) => {
          const delay = i * 0.2;
          const localP = Math.max(0, Math.min(1, (p1 - delay) * 2.5));
          const circumference = circle.r * TWO_PI;
          return (
            <circle
              key={`guide-${i}`}
              cx={circle.cx}
              cy={circle.cy}
              r={circle.r}
              fill="none"
              stroke={COLOR_GUIDE}
              strokeWidth="0.5"
              opacity={localP * 0.6}
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - localP)}
            />
          );
        })}

        {/* Phase 2: Construction circles at outer vertices */}
        {pattern.constructionCircles.map((circle, i) => {
          const delay = i / pattern.constructionCircles.length;
          const localP = Math.max(0, Math.min(1, (p2 - delay) * 2));
          const circumference = circle.r * TWO_PI;
          return (
            <circle
              key={`const-${i}`}
              cx={circle.cx}
              cy={circle.cy}
              r={circle.r}
              fill="none"
              stroke={COLOR_CONSTRUCTION}
              strokeWidth="0.3"
              opacity={localP * 0.4}
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - localP)}
            />
          );
        })}

        {/* Phase 3: Radial construction lines */}
        {pattern.constructionLines.map((line, i) => {
          const delay = i / pattern.constructionLines.length;
          const localP = Math.max(0, Math.min(1, (p3 - delay) * 2.5));
          const len = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
          return (
            <line
              key={`cl-${i}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={COLOR_CONSTRUCTION}
              strokeWidth="0.4"
              opacity={localP * 0.3}
              strokeDasharray={len}
              strokeDashoffset={len * (1 - localP)}
            />
          );
        })}

        {/* Phase 4: Intersection points and ring anchors */}
        {pattern.outerPoints.map((pt, i) => (
          <circle
            key={`outer-pt-${i}`}
            cx={pt.x}
            cy={pt.y}
            r={2.5}
            fill={COLOR_PRIMARY}
            opacity={p4}
          />
        ))}

        {pattern.innerPoints.map((pt, i) => (
          <circle
            key={`inner-pt-${i}`}
            cx={pt.x}
            cy={pt.y}
            r={2}
            fill={COLOR_SECONDARY}
            opacity={p4}
          />
        ))}

        {pattern.midPoints.map((pt, i) => (
          <circle
            key={`mid-pt-${i}`}
            cx={pt.x}
            cy={pt.y}
            r={1.5}
            fill={COLOR_PRIMARY}
            opacity={p4 * 0.6}
          />
        ))}
        {pattern.ringPointsB.map((pt, i) => (
          <circle
            key={`ring-b-pt-${i}`}
            cx={pt.x}
            cy={pt.y}
            r={1.3}
            fill={COLOR_SECONDARY}
            opacity={p4 * 0.7}
          />
        ))}

        {/* Phase 5: Star outline connection lines and ring meshes */}
        {pattern.midConstructionLines.map((line, i) => {
          const delay = i / pattern.midConstructionLines.length;
          const localP = Math.max(0, Math.min(1, (p5 - delay) * 2.5));
          const len = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
          return (
            <line
              key={`mcl-${i}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={COLOR_PRIMARY}
              strokeWidth="0.5"
              opacity={localP * 0.35}
              strokeDasharray={len}
              strokeDashoffset={len * (1 - localP)}
            />
          );
        })}

        {pattern.detailLines.map((line, i) => {
          const delay = i / pattern.detailLines.length;
          const localP = Math.max(0, Math.min(1, (p5 - delay) * 2.2));
          const len = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
          return (
            <line
              key={`detail-${i}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={COLOR_SECONDARY}
              strokeWidth="0.45"
              opacity={localP * 0.25}
              strokeDasharray={len}
              strokeDashoffset={len * (1 - localP)}
            />
          );
        })}

        {/* Phase 6: Main star path and outer ring traces */}
        <path
          d={pattern.starPath}
          fill="none"
          stroke={COLOR_PRIMARY}
          strokeWidth="1.2"
          strokeLinejoin="round"
          opacity={p6}
          strokeDasharray="2000"
          strokeDashoffset={2000 * (1 - p6)}
        />
        <path
          d={pattern.outerOctagonPath}
          fill="none"
          stroke={COLOR_PRIMARY}
          strokeWidth="0.75"
          strokeOpacity={p6 * 0.35}
          strokeDasharray="1200"
          strokeDashoffset={1200 * (1 - p6)}
        />
        <path
          d={pattern.ringAPath}
          fill="none"
          stroke={COLOR_SECONDARY}
          strokeWidth="0.55"
          strokeOpacity={p6 * 0.35}
          strokeDasharray="1200"
          strokeDashoffset={1200 * (1 - p6)}
        />

        {/* Phase 7: Inner stars and dense center rings */}
        <path
          d={pattern.innerStarPath}
          fill="none"
          stroke={COLOR_SECONDARY}
          strokeWidth="0.8"
          strokeLinejoin="round"
          opacity={p7}
          strokeDasharray="2000"
          strokeDashoffset={2000 * (1 - p7)}
        />
        <path
          d={pattern.microStarPath}
          fill="none"
          stroke={COLOR_PRIMARY}
          strokeWidth="0.6"
          strokeLinejoin="round"
          opacity={p7 * 0.9}
          strokeDasharray="1000"
          strokeDashoffset={1000 * (1 - p7)}
        />
        <path
          d={pattern.ringBPath}
          fill="none"
          stroke={COLOR_SECONDARY}
          strokeWidth="0.5"
          strokeOpacity={p7 * 0.4}
          strokeDasharray="1000"
          strokeDashoffset={1000 * (1 - p7)}
        />
        <path
          d={pattern.ringCPath}
          fill="none"
          stroke={COLOR_PRIMARY}
          strokeWidth="0.45"
          strokeOpacity={p7 * 0.45}
          strokeDasharray="1000"
          strokeDashoffset={1000 * (1 - p7)}
        />

        {/* Phase 8: Interlace weaving lines + outer web */}
        {pattern.interlaceLines.map((line, i) => {
          const delay = i / pattern.interlaceLines.length;
          const localP = Math.max(0, Math.min(1, (p8 - delay) * 2));
          const len = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
          return (
            <line
              key={`il-${i}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={COLOR_SECONDARY}
              strokeWidth="0.6"
              opacity={localP * 0.5}
              strokeDasharray={len}
              strokeDashoffset={len * (1 - localP)}
            />
          );
        })}
        {pattern.webLines.map((line, i) => {
          const delay = i / pattern.webLines.length;
          const localP = Math.max(0, Math.min(1, (p8 - delay) * 2.2));
          const len = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
          return (
            <line
              key={`web-${i}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={COLOR_PRIMARY}
              strokeWidth="0.45"
              opacity={localP * 0.3}
              strokeDasharray={len}
              strokeDashoffset={len * (1 - localP)}
            />
          );
        })}

        {/* Phase 9: Kite fills */}
        {pattern.kiteShapes.map((path, i) => {
          const delay = i / pattern.kiteShapes.length;
          const localP = Math.max(0, Math.min(1, (p9 - delay * 0.5) * 2));
          return (
            <path
              key={`kite-${i}`}
              d={path}
              fill={i % 2 === 0 ? COLOR_SECONDARY : COLOR_PRIMARY}
              opacity={localP * 0.12}
              stroke={i % 2 === 0 ? COLOR_SECONDARY : COLOR_PRIMARY}
              strokeWidth="0.4"
              strokeOpacity={localP * 0.3}
            />
          );
        })}

        {/* Phase 10: Rosette petals in center */}
        {pattern.rosettePetals.map((path, i) => {
          const delay = i / pattern.rosettePetals.length;
          const localP = Math.max(0, Math.min(1, (p10 - delay * 0.5) * 2));
          return (
            <path
              key={`rosette-${i}`}
              d={path}
              fill={i % 2 === 0 ? COLOR_PRIMARY : COLOR_SECONDARY}
              opacity={localP * 0.1}
              stroke={i % 2 === 0 ? COLOR_PRIMARY : COLOR_SECONDARY}
              strokeWidth="0.5"
              strokeOpacity={localP * 0.4}
            />
          );
        })}
      </svg>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="h-1 w-32 rounded-full bg-foreground/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress * 100}%`,
              background: `linear-gradient(90deg, ${COLOR_SECONDARY}, ${COLOR_PRIMARY})`,
            }}
          />
        </div>
      </div>

      <div className="absolute top-4 right-4 text-xs text-foreground/30">
        Scroll or drag
      </div>
    </div>
  );
}

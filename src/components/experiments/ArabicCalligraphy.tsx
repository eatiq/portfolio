'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const INK_WARM = '#C89D3D';
const INK_COOL = '#3E8E96';
const GUIDE_COLOR = 'rgba(181, 193, 206, 0.24)';
const HINT_COLOR = 'rgba(212, 219, 229, 0.56)';

type StrokePoint = { x: number; y: number; pressure: number };
type InkPoint = StrokePoint & { time: number };
type Mode = 'learn' | 'create';
type StylePreset = 'naskh' | 'diwani' | 'kufi';

type StrokeDef = {
  points: StrokePoint[];
  baseWidth: number;
  color: string;
  tension?: number;
};

type DotDef = { x: number; y: number; r: number; color: string; delayMs: number };
type GuideLine = { y: number; label: string };
type UserStroke = { points: InkPoint[]; color: string };

type SceneDef = {
  strokes: StrokeDef[];
  dots: DotDef[];
  guides: GuideLine[];
};

type PhraseDef = { label: string; text: string };

type CalligraphySettings = {
  style: StylePreset;
  detail: number;
  contrast: number;
  speed: number;
  flourish: number;
  wetness: number;
  bleed: number;
  drag: number;
  grain: number;
  drying: number;
  nibAngle: number;
  ambient: number;
  showGuides: boolean;
};

const CURATED_PHRASES: PhraseDef[] = [
  { label: 'Peace', text: 'سلام' },
  { label: 'Light', text: 'نور' },
  { label: 'Life', text: 'حياة' },
  { label: 'Mercy', text: 'رحمة' },
  { label: 'Identity', text: 'هوية' },
  { label: 'Patience', text: 'صبر' },
  { label: 'Beauty', text: 'جمال' },
  { label: 'Love', text: 'محبة' },
  { label: 'Language of Dhad', text: 'لغة الضاد' },
  { label: 'In the name of God', text: 'بسم الله' },
];

const NON_CONNECTING = new Set(['ا', 'د', 'ذ', 'ر', 'ز', 'و', 'ة']);

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function sampleQuadratic(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  segments: number,
  pressureAt: (t: number) => number
) {
  const points: StrokePoint[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const mt = 1 - t;
    points.push({
      x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
      y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
      pressure: pressureAt(t),
    });
  }
  return points;
}

function sampleCubic(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
  segments: number,
  pressureAt: (t: number) => number
) {
  const points: StrokePoint[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const mt = 1 - t;
    points.push({
      x:
        mt * mt * mt * p0.x +
        3 * mt * mt * t * p1.x +
        3 * mt * t * t * p2.x +
        t * t * t * p3.x,
      y:
        mt * mt * mt * p0.y +
        3 * mt * mt * t * p1.y +
        3 * mt * t * t * p2.y +
        t * t * t * p3.y,
      pressure: pressureAt(t),
    });
  }
  return points;
}

function addStroke(
  strokes: StrokeDef[],
  points: StrokePoint[],
  baseWidth: number,
  color: string,
  tension: number
) {
  strokes.push({ points, baseWidth, color, tension });
}

function pushDot(
  dots: DotDef[],
  x: number,
  y: number,
  r: number,
  color: string,
  delayMs: number
) {
  dots.push({ x, y, r, color, delayMs });
}

function buildLetter(
  ch: string,
  x: number,
  baseline: number,
  scale: number,
  settings: CalligraphySettings,
  delayMs: number
) {
  const strokes: StrokeDef[] = [];
  const dots: DotDef[] = [];
  const segments = Math.floor(20 + settings.detail * 34);
  const asc = settings.style === 'diwani' ? 1.16 : settings.style === 'kufi' ? 0.88 : 1;
  const curveSoftness =
    settings.style === 'kufi' ? 0.22 : settings.style === 'diwani' ? 0.96 : 0.68;
  const tilt = settings.style === 'diwani' ? -0.24 : settings.style === 'kufi' ? -0.03 : -0.12;
  const widthTone = 0.92 + settings.contrast * 0.7;

  const primary = (points: StrokePoint[], width: number, warm = true) =>
    addStroke(strokes, points, width * widthTone, warm ? INK_WARM : INK_COOL, 1);

  switch (ch) {
    case 'ا':
    case 'ل': {
      const tall = ch === 'ل' ? 108 : 94;
      primary(
        sampleCubic(
          { x, y: baseline + 4 * scale },
          { x: x + 4 * scale * tilt, y: baseline - 28 * scale },
          { x: x + 7 * scale * tilt, y: baseline - (tall - 14) * scale * asc },
          { x: x + 8 * scale * tilt, y: baseline - tall * scale * asc },
          segments,
          (t) => 0.24 + Math.sin(t * Math.PI) * 0.72
        ),
        9.2 * scale
      );
      return { strokes, dots, advance: ch === 'ل' ? 28 : 22 };
    }
    case 'س':
    case 'ص':
    case 'ض': {
      primary(
        sampleCubic(
          { x, y: baseline + 2 * scale },
          { x: x - 26 * scale, y: baseline + 24 * scale * curveSoftness },
          { x: x - 56 * scale, y: baseline - 16 * scale * curveSoftness },
          { x: x - 84 * scale, y: baseline + 2 * scale },
          segments,
          (t) => 0.3 + Math.sin(t * Math.PI) * 0.55
        ),
        ch === 'ص' || ch === 'ض' ? 10.2 * scale : 9 * scale
      );
      for (let i = 0; i < 3; i++) {
        primary(
          sampleQuadratic(
            { x: x - (14 + i * 22) * scale, y: baseline + 2 * scale },
            { x: x - (22 + i * 22) * scale, y: baseline - (12 + i) * scale * curveSoftness },
            { x: x - (30 + i * 22) * scale, y: baseline + 2 * scale },
            Math.floor(segments * 0.45),
            (t) => 0.2 + (1 - Math.abs(t - 0.5) * 2) * 0.45
          ),
          5.6 * scale,
          false
        );
      }
      if (ch === 'ض') {
        pushDot(dots, x - 36 * scale, baseline - 35 * scale, 1.7 * scale, INK_COOL, delayMs + 800);
      }
      return { strokes, dots, advance: 84 };
    }
    case 'م': {
      primary(
        sampleCubic(
          { x, y: baseline + 2 * scale },
          { x: x - 18 * scale, y: baseline + 24 * scale * curveSoftness },
          { x: x - 48 * scale, y: baseline + 14 * scale },
          { x: x - 62 * scale, y: baseline - 4 * scale * curveSoftness },
          segments,
          (t) => 0.3 + Math.sin(t * Math.PI) * 0.52
        ),
        9.3 * scale
      );
      primary(
        sampleCubic(
          { x: x - 62 * scale, y: baseline - 4 * scale * curveSoftness },
          { x: x - 70 * scale, y: baseline - 44 * scale * curveSoftness },
          { x: x - 30 * scale, y: baseline - 36 * scale * curveSoftness },
          { x: x - 22 * scale, y: baseline + 4 * scale },
          segments,
          (t) => 0.24 + (1 - t) * 0.56
        ),
        8.4 * scale,
        false
      );
      return { strokes, dots, advance: 63 };
    }
    case 'ن': {
      primary(
        sampleQuadratic(
          { x, y: baseline + 2 * scale },
          { x: x - 20 * scale, y: baseline + 20 * scale * curveSoftness },
          { x: x - 40 * scale, y: baseline + 2 * scale },
          segments,
          (t) => 0.35 + (1 - t) * 0.3
        ),
        7.4 * scale
      );
      pushDot(dots, x - 21 * scale, baseline - 23 * scale, 1.7 * scale, INK_COOL, delayMs + 650);
      return { strokes, dots, advance: 42 };
    }
    case 'و': {
      primary(
        sampleCubic(
          { x, y: baseline - 2 * scale },
          { x: x - 8 * scale, y: baseline + 28 * scale },
          { x: x - 30 * scale, y: baseline + 12 * scale },
          { x: x - 30 * scale, y: baseline - 4 * scale },
          segments,
          (t) => 0.28 + Math.sin(t * Math.PI) * 0.5
        ),
        8.4 * scale,
        false
      );
      return { strokes, dots, advance: 34 };
    }
    case 'ر':
    case 'د': {
      primary(
        sampleQuadratic(
          { x, y: baseline + 2 * scale },
          { x: x - 18 * scale, y: baseline + 12 * scale * curveSoftness },
          { x: x - 30 * scale, y: baseline - 2 * scale },
          segments,
          (t) => 0.24 + (1 - t) * 0.5
        ),
        7.2 * scale
      );
      return { strokes, dots, advance: ch === 'ر' ? 30 : 29 };
    }
    case 'ح':
    case 'ج': {
      primary(
        sampleCubic(
          { x, y: baseline + 2 * scale },
          { x: x - 24 * scale, y: baseline + 22 * scale * curveSoftness },
          { x: x - 54 * scale, y: baseline + 14 * scale },
          { x: x - 60 * scale, y: baseline - 6 * scale * curveSoftness },
          segments,
          (t) => 0.3 + Math.sin(t * Math.PI) * 0.52
        ),
        8.8 * scale
      );
      if (ch === 'ج') {
        pushDot(dots, x - 45 * scale, baseline + 18 * scale, 1.8 * scale, INK_COOL, delayMs + 700);
      }
      return { strokes, dots, advance: 58 };
    }
    case 'ب': {
      primary(
        sampleQuadratic(
          { x, y: baseline + 3 * scale },
          { x: x - 24 * scale, y: baseline + 20 * scale * curveSoftness },
          { x: x - 50 * scale, y: baseline + 3 * scale },
          segments,
          (t) => 0.28 + (1 - t) * 0.36
        ),
        7.6 * scale
      );
      pushDot(dots, x - 24 * scale, baseline + 18 * scale, 1.8 * scale, INK_COOL, delayMs + 680);
      return { strokes, dots, advance: 50 };
    }
    case 'ي': {
      primary(
        sampleCubic(
          { x, y: baseline + 2 * scale },
          { x: x - 22 * scale, y: baseline + 22 * scale * curveSoftness },
          { x: x - 52 * scale, y: baseline + 12 * scale },
          { x: x - 66 * scale, y: baseline + 2 * scale },
          segments,
          (t) => 0.26 + Math.sin(t * Math.PI) * 0.5
        ),
        7.8 * scale
      );
      pushDot(dots, x - 30 * scale, baseline + 19 * scale, 1.5 * scale, INK_COOL, delayMs + 650);
      pushDot(dots, x - 40 * scale, baseline + 21 * scale, 1.5 * scale, INK_COOL, delayMs + 700);
      return { strokes, dots, advance: 56 };
    }
    case 'ة': {
      primary(
        sampleCubic(
          { x: x - 4 * scale, y: baseline - 1 * scale },
          { x: x - 24 * scale, y: baseline + 16 * scale },
          { x: x - 34 * scale, y: baseline - 16 * scale },
          { x: x - 14 * scale, y: baseline - 14 * scale },
          segments,
          (t) => 0.26 + Math.sin(t * Math.PI) * 0.42
        ),
        6.6 * scale
      );
      pushDot(dots, x - 17 * scale, baseline - 25 * scale, 1.4 * scale, INK_COOL, delayMs + 620);
      pushDot(dots, x - 9 * scale, baseline - 23 * scale, 1.4 * scale, INK_COOL, delayMs + 680);
      return { strokes, dots, advance: 30 };
    }
    case 'ه': {
      primary(
        sampleCubic(
          { x, y: baseline + 2 * scale },
          { x: x - 22 * scale, y: baseline + 20 * scale },
          { x: x - 44 * scale, y: baseline - 6 * scale * curveSoftness },
          { x: x - 16 * scale, y: baseline - 8 * scale },
          segments,
          (t) => 0.26 + Math.sin(t * Math.PI) * 0.48
        ),
        7.8 * scale
      );
      return { strokes, dots, advance: 40 };
    }
    case 'غ': {
      primary(
        sampleCubic(
          { x, y: baseline + 2 * scale },
          { x: x - 24 * scale, y: baseline + 22 * scale * curveSoftness },
          { x: x - 54 * scale, y: baseline + 12 * scale },
          { x: x - 58 * scale, y: baseline - 8 * scale * curveSoftness },
          segments,
          (t) => 0.28 + Math.sin(t * Math.PI) * 0.5
        ),
        8.8 * scale
      );
      pushDot(dots, x - 30 * scale, baseline - 33 * scale, 1.7 * scale, INK_COOL, delayMs + 780);
      return { strokes, dots, advance: 56 };
    }
    default: {
      primary(
        sampleQuadratic(
          { x, y: baseline + 2 * scale },
          { x: x - 18 * scale, y: baseline + 8 * scale },
          { x: x - 38 * scale, y: baseline + 1 * scale },
          segments,
          (t) => 0.24 + (1 - t) * 0.35
        ),
        6.2 * scale
      );
      return { strokes, dots, advance: 38 };
    }
  }
}

function generatePhraseScene(
  width: number,
  height: number,
  settings: CalligraphySettings,
  phrase: string
): SceneDef {
  const scale = Math.min(width, height) / 430;
  const baseline = height * 0.62;
  const guides: GuideLine[] = [
    { y: baseline, label: 'baseline' },
    { y: baseline - 40 * scale, label: 'x-height' },
    { y: baseline - 102 * scale, label: 'ascender' },
  ];
  const strokes: StrokeDef[] = [];
  const dots: DotDef[] = [];

  let x = width - 44 * scale;
  let delay = 180;
  const words = phrase.trim().split(/\s+/);

  words.forEach((word) => {
    const chars = Array.from(word);
    chars.forEach((char) => {
      const { strokes: nextStrokes, dots: nextDots, advance } = buildLetter(
        char,
        x,
        baseline,
        scale,
        settings,
        delay
      );
      nextStrokes.forEach((s) => strokes.push(s));
      nextDots.forEach((d) => dots.push(d));
      x -= advance * scale;
      delay += 160;
      if (NON_CONNECTING.has(char)) x -= 4 * scale;
    });
    x -= 28 * scale;
  });

  if (x < 16 * scale) {
    const shift = 16 * scale - x;
    strokes.forEach((stroke) => {
      stroke.points = stroke.points.map((point) => ({ ...point, x: point.x + shift }));
    });
    dots.forEach((dot) => {
      dot.x += shift;
    });
  }

  return { strokes, dots, guides };
}

function drawStrokeSegment(
  ctx: CanvasRenderingContext2D,
  points: StrokePoint[],
  endIndex: number,
  baseWidth: number,
  color: string,
  nibAngle: number,
  contrast: number,
  tension = 1
) {
  if (endIndex < 2) return;
  const end = Math.min(endIndex, points.length);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (let i = 1; i < end; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const tangent = Math.atan2(curr.y - prev.y, curr.x - prev.x);
    const nibFactor = 0.35 + Math.abs(Math.sin(tangent - nibAngle)) * 0.65;
    const pressure = Math.max(0.08, curr.pressure);
    const width = pressure * baseWidth * nibFactor * (0.72 + contrast * 0.88) * tension;

    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(curr.x, curr.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.globalAlpha = 0.88;
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawUserStroke(
  ctx: CanvasRenderingContext2D,
  points: InkPoint[],
  color: string,
  now: number,
  settings: CalligraphySettings
) {
  if (points.length < 2) return;

  const nibAngle = -Math.PI * (settings.nibAngle * 0.42 + 0.08);
  const dryingMs = 700 + settings.drying * 4200;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const age = now - curr.time;
    const dryFactor = clamp(1 - age / dryingMs, 0.08, 1);
    const tangent = Math.atan2(curr.y - prev.y, curr.x - prev.x);
    const nibFactor = 0.32 + Math.abs(Math.sin(tangent - nibAngle)) * 0.7;
    const width =
      (3.6 + settings.detail * 8.2) *
      (1 + settings.wetness * 0.45) *
      curr.pressure *
      nibFactor *
      (0.8 + settings.contrast * 0.9);

    if (settings.bleed > 0.02) {
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(curr.x, curr.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = width * (1 + settings.bleed * 1.75);
      ctx.globalAlpha = dryFactor * settings.bleed * 0.2;
      ctx.shadowBlur = settings.bleed * 10;
      ctx.shadowColor = color;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(curr.x, curr.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.globalAlpha = 0.74 + dryFactor * 0.24;
    ctx.stroke();

    if (settings.grain > 0.03 && i % 3 === 0) {
      const specks = Math.floor(settings.grain * 3);
      for (let s = 0; s < specks; s++) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * width * 0.75;
        ctx.beginPath();
        ctx.arc(curr.x + Math.cos(a) * r, curr.y + Math.sin(a) * r, Math.random() * 0.9 + 0.25, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.14 * settings.grain;
        ctx.fill();
      }
    }
  }
  ctx.globalAlpha = 1;
}

function drawAmbientLayer(
  ctx: CanvasRenderingContext2D,
  dots: DotDef[],
  elapsed: number,
  pointer: { x: number; y: number; width: number; height: number },
  intensity: number
) {
  if (intensity <= 0.01 || dots.length === 0) return;
  const px = pointer.width > 0 ? pointer.x / pointer.width - 0.5 : 0;
  const py = pointer.height > 0 ? pointer.y / pointer.height - 0.5 : 0;

  dots.forEach((dot, i) => {
    const phase = elapsed * 0.0018 + i * 0.9;
    const pulse = 1 + Math.sin(phase) * 0.24;
    const shiftX = px * 14 * intensity;
    const shiftY = py * 8 * intensity;
    const r = dot.r * (1.3 + intensity) * pulse;

    ctx.beginPath();
    ctx.arc(dot.x + shiftX, dot.y + shiftY, r * 2.4, 0, Math.PI * 2);
    ctx.fillStyle = dot.color;
    ctx.globalAlpha = 0.028 * intensity;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(dot.x + shiftX, dot.y + shiftY, r, 0, Math.PI * 2);
    ctx.strokeStyle = dot.color;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.18 * intensity;
    ctx.stroke();
  });
  ctx.globalAlpha = 1;
}

export default function ArabicCalligraphy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const sceneRef = useRef<SceneDef>({ strokes: [], dots: [], guides: [] });
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const userStrokesRef = useRef<UserStroke[]>([]);
  const activeStrokeRef = useRef<UserStroke | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const colorIdxRef = useRef(0);

  const [mode, setMode] = useState<Mode>('learn');
  const [phrase, setPhrase] = useState(CURATED_PHRASES[0].text);
  const [settings, setSettings] = useState<CalligraphySettings>({
    style: 'naskh',
    detail: 0.72,
    contrast: 0.62,
    speed: 0.48,
    flourish: 0.68,
    wetness: 0.58,
    bleed: 0.3,
    drag: 0.3,
    grain: 0.4,
    drying: 0.45,
    nibAngle: 0.55,
    ambient: 0.52,
    showGuides: false,
  });

  const regenerateScene = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio, 2);
    sizeRef.current = { width: rect.width, height: rect.height, dpr };
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    sceneRef.current = generatePhraseScene(rect.width, rect.height, settings, phrase);
  }, [phrase, settings]);

  const animate = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, width, height);

      const { strokes, dots, guides } = sceneRef.current;
      const speedFactor = 0.6 + (1 - settings.speed) * 1.1;
      const totalDuration = 5000 * speedFactor;
      const strokeDuration = totalDuration / Math.max(strokes.length, 1);
      const nibAngle =
        settings.style === 'diwani'
          ? -Math.PI * 0.28
          : settings.style === 'kufi'
            ? -Math.PI * 0.12
            : -Math.PI * 0.2;

      if (settings.showGuides) {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        guides.forEach((guide) => {
          ctx.beginPath();
          ctx.moveTo(28, guide.y);
          ctx.lineTo(width - 28, guide.y);
          ctx.strokeStyle = GUIDE_COLOR;
          ctx.globalAlpha = 0.42;
          ctx.stroke();
        });
        ctx.restore();
        ctx.globalAlpha = 1;
      }

      if (mode === 'learn') {
        strokes.forEach((stroke, index) => {
          const strokeStart = index * strokeDuration * 0.7;
          const strokeElapsed = elapsed - strokeStart;
          if (strokeElapsed <= 0) return;
          const progress = Math.min(1, strokeElapsed / strokeDuration);
          const endIndex = Math.floor(easeInOutCubic(progress) * stroke.points.length);
          drawStrokeSegment(
            ctx,
            stroke.points,
            endIndex,
            stroke.baseWidth,
            stroke.color,
            nibAngle,
            settings.contrast,
            stroke.tension
          );
        });
      } else {
        strokes.forEach((stroke) => {
          drawStrokeSegment(
            ctx,
            stroke.points,
            stroke.points.length,
            stroke.baseWidth * 0.7,
            stroke.color,
            nibAngle,
            settings.contrast * 0.6,
            (stroke.tension ?? 1) * 0.84
          );
        });
        ctx.fillStyle = HINT_COLOR;
        ctx.font = '12px sans-serif';
        ctx.fillText('Trace over the faint phrase using touch or cursor', 18, 24);
      }

      dots.forEach((dot) => {
        const p = clamp((elapsed - dot.delayMs) / 560, 0, 1);
        if (mode === 'learn' && p <= 0) return;
        const eased = mode === 'learn' ? easeInOutCubic(p) : 1;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r * eased, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.globalAlpha = mode === 'learn' ? 0.74 * eased : 0.48;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      const now = performance.now();
      userStrokesRef.current.forEach((stroke) =>
        drawUserStroke(ctx, stroke.points, stroke.color, now, settings)
      );
      if (activeStrokeRef.current) {
        drawUserStroke(ctx, activeStrokeRef.current.points, activeStrokeRef.current.color, now, settings);
      }

      drawAmbientLayer(ctx, dots, elapsed, { ...pointerRef.current, width, height }, settings.ambient);
      if (mode === 'learn' && elapsed > totalDuration + 1700) startTimeRef.current = timestamp;

      animationRef.current = requestAnimationFrame(animate);
    },
    [mode, settings]
  );

  useEffect(() => {
    regenerateScene();
    startTimeRef.current = 0;
  }, [regenerateScene]);

  useEffect(() => {
    const onResize = () => regenerateScene();
    window.addEventListener('resize', onResize);
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [animate, regenerateScene]);

  const updateSetting = <K extends keyof CalligraphySettings>(
    key: K,
    value: CalligraphySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const getPointerPos = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const pos = getPointerPos(e.clientX, e.clientY);
    pointerRef.current = pos;
    if (mode !== 'create') return;

    e.currentTarget.setPointerCapture(e.pointerId);
    const color = colorIdxRef.current % 2 === 0 ? INK_WARM : INK_COOL;
    colorIdxRef.current += 1;
    activeStrokeRef.current = {
      color,
      points: [{ x: pos.x, y: pos.y, pressure: 0.56, time: performance.now() }],
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const pos = getPointerPos(e.clientX, e.clientY);
    pointerRef.current = pos;
    if (mode !== 'create' || !activeStrokeRef.current) return;

    const points = activeStrokeRef.current.points;
    const last = points[points.length - 1];
    const now = performance.now();
    const follow = 1 - settings.drag * 0.72;
    const x = last ? last.x + (pos.x - last.x) * follow : pos.x;
    const y = last ? last.y + (pos.y - last.y) * follow : pos.y;
    const dt = Math.max(1, now - (last?.time ?? now));
    const speed = Math.hypot(x - (last?.x ?? x), y - (last?.y ?? y)) / dt;
    const pressure = clamp(0.86 - speed * 0.86 + settings.wetness * 0.2, 0.2, 1);
    points.push({ x, y, pressure, time: now });
  };

  const finishStroke = () => {
    if (!activeStrokeRef.current) return;
    if (activeStrokeRef.current.points.length > 1) {
      userStrokesRef.current.push(activeStrokeRef.current);
    }
    activeStrokeRef.current = null;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (mode !== 'create') return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // no-op
    }
    finishStroke();
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative cursor-pointer"
      style={{ touchAction: 'none' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={finishStroke}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="absolute top-3 right-3 text-xs text-foreground/35">
        {mode === 'learn' ? 'Auto learn sequence' : 'Draw with touch or cursor'}
      </div>

      <div className="absolute left-3 top-3 rounded-lg border border-foreground/10 bg-background/70 backdrop-blur-sm px-2 py-1.5 text-[11px] flex items-center gap-2">
        <span className="text-foreground/55">Mode</span>
        <button
          type="button"
          onClick={() => setMode('learn')}
          className={`px-2 py-0.5 rounded border transition-colors ${mode === 'learn' ? 'border-accent-teal/50 text-accent-teal bg-accent-teal/10' : 'border-foreground/20 text-foreground/65'}`}
        >
          Learn
        </button>
        <button
          type="button"
          onClick={() => setMode('create')}
          className={`px-2 py-0.5 rounded border transition-colors ${mode === 'create' ? 'border-accent-teal/50 text-accent-teal bg-accent-teal/10' : 'border-foreground/20 text-foreground/65'}`}
        >
          Create
        </button>
      </div>

      <div className="absolute left-3 right-3 bottom-3 rounded-lg border border-foreground/10 bg-background/70 backdrop-blur-sm p-2.5 text-[11px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
          <label className="flex items-center gap-2 text-foreground/70">
            <span className="w-16 shrink-0">Phrase</span>
            <select
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              className="w-full bg-transparent border border-foreground/15 rounded px-2 py-1"
            >
              {CURATED_PHRASES.map((p) => (
                <option key={p.text} value={p.text}>
                  {p.text} - {p.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-foreground/70">
            <span className="w-16 shrink-0">Style</span>
            <select
              value={settings.style}
              onChange={(e) => updateSetting('style', e.target.value as StylePreset)}
              className="w-full bg-transparent border border-foreground/15 rounded px-2 py-1"
            >
              <option value="naskh">Naskh</option>
              <option value="diwani">Diwani</option>
              <option value="kufi">Kufi</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="flex items-center gap-2 text-foreground/70">
            <span className="w-16 shrink-0">Guides</span>
            <input
              type="checkbox"
              checked={settings.showGuides}
              onChange={(e) => updateSetting('showGuides', e.target.checked)}
            />
          </label>
          <label className="flex items-center gap-2 text-foreground/70">
            <span className="w-16 shrink-0">Detail</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={settings.detail}
              onChange={(e) => updateSetting('detail', Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="flex items-center gap-2 text-foreground/70">
            <span className="w-16 shrink-0">Contrast</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={settings.contrast}
              onChange={(e) => updateSetting('contrast', Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="flex items-center gap-2 text-foreground/70">
            <span className="w-16 shrink-0">Wetness</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={settings.wetness}
              onChange={(e) => updateSetting('wetness', Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="flex items-center gap-2 text-foreground/70">
            <span className="w-16 shrink-0">Bleed</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={settings.bleed}
              onChange={(e) => updateSetting('bleed', Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="flex items-center gap-2 text-foreground/70">
            <span className="w-16 shrink-0">Drag</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={settings.drag}
              onChange={(e) => updateSetting('drag', Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="flex items-center gap-2 text-foreground/70">
            <span className="w-16 shrink-0">Grain</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={settings.grain}
              onChange={(e) => updateSetting('grain', Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="flex items-center gap-2 text-foreground/70">
            <span className="w-16 shrink-0">Drying</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={settings.drying}
              onChange={(e) => updateSetting('drying', Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="flex items-center gap-2 text-foreground/70">
            <span className="w-16 shrink-0">Nib</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={settings.nibAngle}
              onChange={(e) => updateSetting('nibAngle', Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="flex items-center gap-2 text-foreground/70">
            <span className="w-16 shrink-0">Speed</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={settings.speed}
              onChange={(e) => updateSetting('speed', Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="flex items-center gap-2 text-foreground/70">
            <span className="w-16 shrink-0">Ambient</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={settings.ambient}
              onChange={(e) => updateSetting('ambient', Number(e.target.value))}
              className="w-full"
            />
          </label>
          <label className="flex items-center gap-2 text-foreground/70">
            <span className="w-16 shrink-0">Flourish</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={settings.flourish}
              onChange={(e) => updateSetting('flourish', Number(e.target.value))}
              className="w-full"
            />
          </label>
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={() => {
              startTimeRef.current = 0;
            }}
            className="px-2 py-1 rounded border border-foreground/20 text-foreground/70 hover:bg-foreground/5"
          >
            Replay
          </button>
          <button
            type="button"
            onClick={() => {
              userStrokesRef.current = [];
              activeStrokeRef.current = null;
            }}
            className="px-2 py-1 rounded border border-foreground/20 text-foreground/70 hover:bg-foreground/5"
          >
            Clear ink
          </button>
        </div>
      </div>
    </div>
  );
}

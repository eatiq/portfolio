'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// Vertex shader
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader — Generative Islamic Geometric Pattern
// Inspired by the tessellated, kaleidoscopic patterns from the Sublime project.
// Uses hexagonal symmetry, rotational repetition, and smooth morphing.
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uHoverStrength;
  uniform vec3 uColorBg;
  uniform vec3 uColorLine;
  uniform vec3 uColorAccent;

  varying vec2 vUv;

  #define PI 3.14159265359
  #define TAU 6.28318530718

  // Rotation matrix
  mat2 rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
  }

  // Smooth min for organic blending
  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  // Line segment SDF
  float sdSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
  }

  // Hexagonal tiling coordinate transform
  vec4 hexCoord(vec2 uv) {
    vec2 r = vec2(1.0, 1.732);
    vec2 h = r * 0.5;
    vec2 a = mod(uv, r) - h;
    vec2 b = mod(uv - h, r) - h;
    vec2 gv = dot(a, a) < dot(b, b) ? a : b;
    vec2 id = uv - gv;
    return vec4(gv.x, gv.y, id.x, id.y);
  }

  // Star pattern — 6-fold symmetry, core of Islamic geometric design
  float starPattern(vec2 p, float time, float morph) {
    float d = 1e10;
    float angle = PI / 3.0; // 60 degrees for hexagonal symmetry

    // Rotate the whole pattern slowly
    p *= rot(time * 0.05);

    for (int i = 0; i < 6; i++) {
      float a = float(i) * angle;
      vec2 dir = vec2(cos(a), sin(a));

      // Main radial lines
      float seg = sdSegment(p, vec2(0.0), dir * (0.5 + morph * 0.15));
      d = min(d, seg);

      // Cross-connecting lines (interlace pattern)
      float a2 = a + angle * 0.5;
      vec2 dir2 = vec2(cos(a2), sin(a2));
      vec2 offset = dir * (0.2 + morph * 0.08);
      float seg2 = sdSegment(p, offset, offset + dir2 * (0.25 + morph * 0.1));
      d = min(d, seg2);

      // Inner rosette lines
      float a3 = a + angle * (0.25 + morph * 0.1);
      vec2 dir3 = vec2(cos(a3), sin(a3));
      float seg3 = sdSegment(p, vec2(0.0), dir3 * (0.2 + morph * 0.05));
      d = min(d, seg3);
    }

    return d;
  }

  // Concentric ring pattern
  float ringPattern(vec2 p, float time) {
    float r = length(p);
    float rings = sin(r * 20.0 - time * 0.5) * 0.5 + 0.5;
    return smoothstep(0.48, 0.5, rings);
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;

    float time = uTime * 0.3;

    // Mouse influence — creates a ripple/warp near the cursor
    vec2 mouseUV = (uMouse - 0.5) * aspect;
    float mouseDist = distance(p, mouseUV);
    float mouseWave = sin(mouseDist * 15.0 - time * 2.0) * exp(-mouseDist * 3.0);
    float mouseInfluence = smoothstep(0.6, 0.0, mouseDist) * uHoverStrength;

    // Warp UVs with mouse interaction
    vec2 warpedP = p + normalize(p - mouseUV + 0.001) * mouseWave * 0.03 * uHoverStrength;

    // Scale for the hex tiling
    float scale = 3.5 + sin(time * 0.2) * 0.3;
    vec2 hexUV = warpedP * scale;

    // Get hex cell coordinates
    vec4 hex = hexCoord(hexUV);
    vec2 cellP = hex.xy;
    vec2 cellId = hex.zw;

    // Morph factor — varies per cell and over time
    float cellHash = fract(sin(dot(cellId, vec2(127.1, 311.7))) * 43758.5453);
    float morph = sin(time * 0.4 + cellHash * TAU) * 0.5 + 0.5;

    // Add mouse proximity morph boost
    float cellCenter = length((cellId / scale) - mouseUV);
    float mouseBoost = smoothstep(0.4, 0.0, cellCenter) * uHoverStrength;
    morph = mix(morph, 1.0, mouseBoost * 0.6);

    // Compute the star pattern distance
    float starD = starPattern(cellP, time + cellHash * 2.0, morph);

    // Line rendering with anti-aliasing
    float lineWidth = 0.015 + mouseInfluence * 0.008;
    float lineAlpha = 1.0 - smoothstep(lineWidth, lineWidth + 0.008, starD);

    // Subtle glow around lines
    float glow = exp(-starD * 40.0) * 0.3;
    glow += exp(-starD * 15.0) * 0.15 * uHoverStrength;

    // Ring pattern overlay (subtle, only visible on hover)
    float rings = ringPattern(cellP, time) * mouseInfluence * 0.15;

    // Base color — very subtle, almost invisible in default state
    float baseVisibility = 0.04 + uHoverStrength * 0.25;

    // Compose final color
    vec3 color = uColorBg;

    // Add the geometric pattern lines
    vec3 lineColor = mix(uColorLine, uColorAccent, morph * 0.4 + mouseInfluence * 0.3);
    color = mix(color, lineColor, lineAlpha * baseVisibility);

    // Add glow
    color += uColorAccent * glow * baseVisibility * 1.5;

    // Add rings
    color += uColorLine * rings;

    // Subtle vignette
    float vignette = 1.0 - smoothstep(0.3, 1.5, length(uv - 0.5) * 1.8);
    color *= mix(0.97, 1.0, vignette);

    // Very subtle grain
    float grain = fract(sin(dot(uv * (uTime + 1.0), vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.008;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetHoverStrength = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uHoverStrength: { value: 0 },
      uColorBg: { value: new THREE.Color('#0a0a0a') },
      uColorLine: { value: new THREE.Color('#333333') },
      uColorAccent: { value: new THREE.Color('#6b4c9a') },
    }),
    []
  );

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      uniforms.uColorBg.value.set('#0a0a0a');
      uniforms.uColorLine.value.set('#2a2a2a');
      uniforms.uColorAccent.value.set('#7c5cbf');
    } else {
      uniforms.uColorBg.value.set('#ffffff');
      uniforms.uColorLine.value.set('#d0d0d0');
      uniforms.uColorAccent.value.set('#8b6cc1');
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight,
      };
    };

    const handleResize = () => {
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    handleResize();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [uniforms]);

  // Listen for custom hover events from the SelectedWorks component
  useEffect(() => {
    const handleHoverStart = () => {
      targetHoverStrength.current = 1;
    };
    const handleHoverEnd = () => {
      targetHoverStrength.current = 0;
    };

    window.addEventListener('projectHoverStart', handleHoverStart);
    window.addEventListener('projectHoverEnd', handleHoverEnd);
    return () => {
      window.removeEventListener('projectHoverStart', handleHoverStart);
      window.removeEventListener('projectHoverEnd', handleHoverEnd);
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = state.clock.elapsedTime;

    // Smooth mouse interpolation for fluid movement
    const currentMouse = material.uniforms.uMouse.value;
    currentMouse.x = THREE.MathUtils.lerp(currentMouse.x, mouseRef.current.x, 0.08);
    currentMouse.y = THREE.MathUtils.lerp(currentMouse.y, mouseRef.current.y, 0.08);

    // Smooth hover strength interpolation
    const currentStrength = material.uniforms.uHoverStrength.value;
    material.uniforms.uHoverStrength.value = THREE.MathUtils.lerp(
      currentStrength,
      targetHoverStrength.current,
      0.04
    );
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function WebGLBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}

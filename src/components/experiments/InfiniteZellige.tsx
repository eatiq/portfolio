'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uZoom;
  uniform vec2 uPan;
  uniform vec2 uResolution;

  varying vec2 vUv;

  #define PI 3.14159265359

  vec3 gold = vec3(0.769, 0.588, 0.173);
  vec3 teal = vec3(0.102, 0.478, 0.427);
  vec3 rose = vec3(0.710, 0.388, 0.416);
  vec3 cream = vec3(0.96, 0.94, 0.88);
  vec3 dark = vec3(0.08, 0.06, 0.04);

  mat2 rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
  }

  // Single zellige tile pattern
  vec3 zelligeTile(vec2 p, float level) {
    // Tile repetition
    vec2 id = floor(p);
    vec2 f = fract(p) - 0.5;

    float d = 1.0;
    vec3 tileColor = cream;

    // 8-pointed star
    for (int i = 0; i < 4; i++) {
      float angle = float(i) * PI / 4.0 + level * 0.1;
      vec2 rf = f * rot(angle);
      float sq = max(abs(rf.x), abs(rf.y));
      d = min(d, sq);
    }

    // Star fill
    float starMask = smoothstep(0.2, 0.19, d);

    // Color based on position and level
    float colorIndex = mod(id.x + id.y + level, 3.0);
    vec3 starColor;
    if (colorIndex < 1.0) starColor = gold;
    else if (colorIndex < 2.0) starColor = teal;
    else starColor = rose;

    // Grout lines
    float grout = smoothstep(0.02, 0.0, abs(f.x - 0.0) * (1.0 - starMask))
                + smoothstep(0.02, 0.0, abs(f.y - 0.0) * (1.0 - starMask));

    // Cross shapes between stars
    float cross = max(
      smoothstep(0.12, 0.11, abs(f.x)) * smoothstep(0.45, 0.25, abs(f.y)),
      smoothstep(0.12, 0.11, abs(f.y)) * smoothstep(0.45, 0.25, abs(f.x))
    );

    // Diamond shapes
    float diamond = smoothstep(0.32, 0.31, abs(f.x) + abs(f.y));
    diamond *= (1.0 - starMask);

    // Compose
    tileColor = cream * 0.9;
    tileColor = mix(tileColor, starColor * 0.8, starMask);

    vec3 crossColor = colorIndex < 1.5 ? teal : gold;
    tileColor = mix(tileColor, crossColor * 0.6, cross * (1.0 - starMask) * 0.8);

    vec3 diamondColor = colorIndex < 1.5 ? rose : teal;
    tileColor = mix(tileColor, diamondColor * 0.5, diamond * 0.5);

    // Grout darkening
    tileColor = mix(tileColor, dark, grout * 0.5);

    // Tile edge outline
    float edge = smoothstep(0.49, 0.48, max(abs(f.x), abs(f.y)));
    tileColor = mix(dark * 0.5, tileColor, edge);

    return tileColor;
  }

  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    // Apply zoom and pan
    float zoom = uZoom;
    uv = uv / zoom + uPan;

    float time = uTime * 0.1;

    // Fractal zoom levels
    vec3 color = vec3(0.0);
    float totalWeight = 0.0;

    // Determine which fractal level we're seeing based on zoom
    float zoomLevel = log2(zoom);
    float baseTileScale = 4.0;

    // Render two adjacent levels and blend
    for (int level = 0; level < 3; level++) {
      float levelScale = baseTileScale * pow(4.0, float(level));
      float levelZoomThreshold = pow(4.0, float(level));

      // Weight based on how close this level is to the current zoom
      float weight = 1.0 - abs(zoomLevel - float(level) * 2.0) * 0.3;
      weight = clamp(weight, 0.0, 1.0);

      if (weight > 0.01) {
        vec2 tileUV = uv * levelScale / zoom;
        tileUV += time * 0.1 * float(level + 1);

        vec3 levelColor = zelligeTile(tileUV, float(level));

        // Shift colors slightly per level for visual distinction
        float hueShift = float(level) * 0.3;
        levelColor = mix(levelColor, levelColor.gbr, hueShift * 0.2);

        color += levelColor * weight;
        totalWeight += weight;
      }
    }

    color /= max(totalWeight, 0.001);

    // Subtle vignette
    float vig = 1.0 - length(vUv - 0.5) * 0.5;
    color *= vig;

    // Warm tone adjustment
    color.r *= 1.05;
    color.b *= 0.95;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ZelligeScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const zoomRef = useRef(1.0);
  const panRef = useRef({ x: 0, y: 0 });
  const targetZoomRef = useRef(1.0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uZoom: { value: 1.0 },
      uPan: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight,
      });
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetZoomRef.current *= e.deltaY > 0 ? 0.92 : 1.08;
      targetZoomRef.current = Math.max(0.2, Math.min(50, targetZoomRef.current));
    };

    const handleDblClick = () => {
      targetZoomRef.current = 1.0;
      panRef.current = { x: 0, y: 0 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
      canvas.addEventListener('dblclick', handleDblClick);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (canvas) {
        canvas.removeEventListener('wheel', handleWheel);
        canvas.removeEventListener('dblclick', handleDblClick);
      }
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uMouse.value.set(mouse.x, mouse.y);
    mat.uniforms.uResolution.value.set(viewport.width, viewport.height);

    // Smooth zoom interpolation
    zoomRef.current = THREE.MathUtils.lerp(
      zoomRef.current,
      targetZoomRef.current,
      0.08
    );
    mat.uniforms.uZoom.value = zoomRef.current;

    // Pan toward mouse at higher zoom levels
    if (zoomRef.current > 2) {
      const panStrength = Math.min((zoomRef.current - 2) * 0.02, 0.5);
      panRef.current.x = THREE.MathUtils.lerp(
        panRef.current.x,
        (mouse.x - 0.5) * panStrength,
        0.02
      );
      panRef.current.y = THREE.MathUtils.lerp(
        panRef.current.y,
        (mouse.y - 0.5) * panStrength,
        0.02
      );
    }
    mat.uniforms.uPan.value.set(panRef.current.x, panRef.current.y);
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

export default function InfiniteZellige() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <ZelligeScene />
      </Canvas>
      <div className="absolute top-4 right-4 text-xs text-foreground/30">
        Scroll to zoom / Double-click to reset
      </div>
    </div>
  );
}

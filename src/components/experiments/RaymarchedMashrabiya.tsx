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
  uniform vec2 uResolution;

  varying vec2 vUv;

  #define PI 3.14159265359

  // Rotate 2D
  mat2 rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
  }

  // SDF for a box
  float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
  }

  // SDF for a cylinder
  float sdCylinder(vec3 p, float r, float h) {
    vec2 d = abs(vec2(length(p.xz), p.y)) - vec2(r, h);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
  }

  // Hexagonal tiling for mashrabiya pattern
  float hexPattern(vec2 p) {
    vec2 q = vec2(p.x * 2.0 / sqrt(3.0), p.y + p.x / sqrt(3.0));
    vec2 pi = floor(q);
    vec2 pf = fract(q);

    float v = mod(pi.x + pi.y, 3.0);
    float ca = step(1.0, v);
    float cb = step(2.0, v);
    vec2 ma = step(pf.xy, pf.yx);

    float e = dot(ma, 1.0 - pf.yx + ca * (pf.x + pf.y - 1.0) + cb * (pf.yx - 2.0 * pf.xy));
    return e;
  }

  // Islamic star pattern SDF
  float islamicPattern(vec2 p, float scale) {
    p *= scale;
    vec2 id = floor(p);
    vec2 f = fract(p) - 0.5;

    float d = 1.0;

    // 8-pointed star via rotated squares
    for (int i = 0; i < 4; i++) {
      float angle = float(i) * PI / 4.0;
      vec2 rf = f * rot(angle);
      float sq = max(abs(rf.x), abs(rf.y)) - 0.18;
      d = min(d, sq);
    }

    // Octagonal frame
    float oct = max(abs(f.x) + abs(f.y) - 0.45, -(abs(f.x) + abs(f.y) - 0.35));
    d = min(d, oct);

    return d;
  }

  // Mashrabiya lattice SDF
  float mashrabiyaSDF(vec3 p) {
    // Main panel
    float panel = sdBox(p, vec3(2.0, 3.0, 0.1));

    // Pattern cutouts
    vec2 patternUV = p.xy * 2.5;
    float pattern = islamicPattern(patternUV, 1.0);

    // Holes through the panel
    float holes = max(panel, -pattern + 0.01);

    // Add frame border
    float frame = sdBox(p, vec3(2.1, 3.1, 0.12)) - 0.02;
    float innerFrame = sdBox(p, vec3(1.9, 2.9, 0.15));
    frame = max(frame, -innerFrame);

    return min(holes, frame);
  }

  // Scene SDF
  float map(vec3 p) {
    return mashrabiyaSDF(p);
  }

  // Calculate normal
  vec3 calcNormal(vec3 p) {
    vec2 e = vec2(0.001, 0.0);
    return normalize(vec3(
      map(p + e.xyy) - map(p - e.xyy),
      map(p + e.yxy) - map(p - e.yxy),
      map(p + e.yyx) - map(p - e.yyx)
    ));
  }

  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= uResolution.x / uResolution.y;

    // Light direction influenced by mouse
    vec3 lightDir = normalize(vec3(
      (uMouse.x - 0.5) * 2.0,
      (uMouse.y - 0.5) * 2.0 + 0.5,
      1.0
    ));

    // Camera setup
    vec3 ro = vec3(0.0, 0.0, 4.0);
    vec3 rd = normalize(vec3(uv, -1.5));

    // Raymarching
    float t = 0.0;
    float hit = 0.0;
    vec3 p;

    for (int i = 0; i < 80; i++) {
      p = ro + rd * t;
      float d = map(p);
      if (d < 0.001) {
        hit = 1.0;
        break;
      }
      if (t > 20.0) break;
      t += d;
    }

    // Accent colors
    vec3 gold = vec3(0.769, 0.588, 0.173);
    vec3 teal = vec3(0.102, 0.478, 0.427);
    vec3 bg = vec3(0.02, 0.02, 0.03);

    vec3 color = bg;

    if (hit > 0.5) {
      vec3 n = calcNormal(p);
      float diff = max(dot(n, lightDir), 0.0);
      float spec = pow(max(dot(reflect(-lightDir, n), -rd), 0.0), 32.0);

      // Pattern-based coloring
      vec2 patUV = p.xy * 2.5;
      float pat = islamicPattern(patUV, 1.0);

      vec3 matColor = mix(gold, teal, smoothstep(-0.05, 0.05, pat));
      color = matColor * (0.15 + diff * 0.6) + vec3(1.0) * spec * 0.3;
    } else {
      // Volumetric light rays through the lattice
      float rays = 0.0;
      float rt = 0.0;
      for (int i = 0; i < 40; i++) {
        vec3 rp = ro + rd * rt;
        float d = map(rp);
        if (d > 0.05) {
          float lightDist = length(rp.xy);
          rays += 0.025 * exp(-lightDist * 0.5) / (1.0 + rt * 0.1);
        }
        rt += 0.15;
        if (rt > 8.0) break;
      }

      vec3 lightColor = mix(gold, teal, 0.5 + 0.5 * sin(uTime * 0.3));
      color += lightColor * rays * 1.5;

      // Subtle background glow
      float glow = exp(-length(uv) * 1.2);
      color += lightColor * glow * 0.08;
    }

    // Vignette
    float vig = 1.0 - length(vUv - 0.5) * 0.8;
    color *= vig;

    // Tone mapping
    color = color / (1.0 + color);
    color = pow(color, vec3(0.9));

    gl_FragColor = vec4(color, 1.0);
  }
`;

function MashrabiyaScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
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
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uMouse.value.set(mouse.x, mouse.y);
    mat.uniforms.uResolution.value.set(viewport.width, viewport.height);
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

export default function RaymarchedMashrabiya() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <MashrabiyaScene />
      </Canvas>
    </div>
  );
}

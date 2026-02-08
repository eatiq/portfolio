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

// Fragment shader - creates a smooth noise-based distortion effect
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uHoverStrength;
  uniform vec3 uColor1;
  uniform vec3 uColor2;

  varying vec2 vUv;

  // Simplex-style noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    
    // Mouse influence - creates a ripple/distortion around the cursor
    vec2 mouseUV = uMouse;
    float dist = distance(uv, mouseUV);
    float mouseInfluence = smoothstep(0.5, 0.0, dist) * uHoverStrength;
    
    // Noise-based distortion
    float time = uTime * 0.15;
    float noise1 = snoise(uv * 3.0 + time);
    float noise2 = snoise(uv * 5.0 - time * 0.7);
    float noise3 = snoise(uv * 8.0 + vec2(time * 0.3, -time * 0.5));
    
    // Combine noises with mouse influence
    float combinedNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
    combinedNoise += mouseInfluence * 2.0;
    
    // Distort UVs
    vec2 distortedUV = uv + vec2(
      snoise(uv * 4.0 + time) * 0.02 * (1.0 + mouseInfluence * 3.0),
      snoise(uv * 4.0 - time) * 0.02 * (1.0 + mouseInfluence * 3.0)
    );
    
    // Create subtle gradient with noise
    float gradient = distortedUV.y * 0.3 + combinedNoise * 0.08;
    
    // Very subtle color variation - almost monochrome
    vec3 color = mix(uColor1, uColor2, gradient);
    
    // Add subtle grain
    float grain = fract(sin(dot(uv * uTime, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.015;
    
    // Vignette
    float vignette = 1.0 - smoothstep(0.4, 1.4, length(uv - 0.5) * 1.5);
    color *= mix(0.95, 1.0, vignette);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [hoverStrength, setHoverStrength] = useState(0);
  const targetHoverStrength = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uHoverStrength: { value: 0 },
      uColor1: { value: new THREE.Color('#0a0a0a') },
      uColor2: { value: new THREE.Color('#111111') },
    }),
    []
  );

  useEffect(() => {
    // Check for dark mode
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      uniforms.uColor1.value.set('#0a0a0a');
      uniforms.uColor2.value.set('#141414');
    } else {
      uniforms.uColor1.value.set('#ffffff');
      uniforms.uColor2.value.set('#f0f0f0');
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    material.uniforms.uMouse.value.set(mouse.x, mouse.y);
    
    // Smooth hover strength interpolation
    const currentStrength = material.uniforms.uHoverStrength.value;
    material.uniforms.uHoverStrength.value = THREE.MathUtils.lerp(
      currentStrength,
      targetHoverStrength.current,
      0.05
    );
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
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

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { fluidConfig } from './config';
import FluidGrain from './FluidGrain';
import './fluid.css';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColorBg;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 3.0;
    
    // Organic fluid distortion loop
    for(float i = 1.0; i < 5.0; i++) {
      p.x += 0.6 / i * cos(i * 2.5 * p.y + uTime * 0.8);
      p.y += 0.6 / i * cos(i * 1.5 * p.x + uTime * 0.8);
    }
    
    // Compute raw fluid value between 0 and 1
    float mixValue = cos(p.y + p.x) * 0.5 + 0.5;
    
    // Push the intensity down so the dark background dominates
    // pow(x, 2.5) means low values stay very low, and only peaks become bright
    float fluidIntensity = pow(mixValue, 2.5);
    
    // Create the vibrant glowing accent color
    vec3 accentColor = mix(uColor1, uColor2, mixValue);
    
    // Mix the dark background with the bright accent based on intensity
    vec3 finalColor = mix(uColorBg, accentColor, fluidIntensity);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function FluidShader() {
  const { viewport } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color(fluidConfig.colors.color1) },
    uColor2: { value: new THREE.Color(fluidConfig.colors.color2) },
    uColorBg: { value: new THREE.Color(fluidConfig.colors.bg) }
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      // Apply the speed multiplier from config
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime() * fluidConfig.animation.speed;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function FluidBackground({ isDiscreet = false }: { isDiscreet?: boolean }) {
  return (
    <>
      <FluidGrain />
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: isDiscreet ? 0.35 : 1,
        transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <Canvas>
          <FluidShader />
        </Canvas>
      </div>
    </>
  );
}

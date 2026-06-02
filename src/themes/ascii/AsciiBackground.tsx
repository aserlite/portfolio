import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AsciiRenderer } from '@react-three/drei';
import * as THREE from 'three';
import './Ascii.module.css';

function AsciiScene() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.5, 0.4, 100, 16]} />
        <meshStandardMaterial color="#00ff00" />
      </mesh>
    </>
  );
}

export default function AsciiBackground({ isDiscreet = false }: { isDiscreet?: boolean }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={['black']} />
        <AsciiScene />
        <AsciiRenderer fgColor="#00ff00" bgColor="#000000" invert={true} resolution={0.15} />
      </Canvas>
      {isDiscreet && (
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'rgba(0, 0, 0, 0.5)', 
          zIndex: 10,
          pointerEvents: 'none'
        }} />
      )}
    </div>
  );
}

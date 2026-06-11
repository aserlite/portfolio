import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import styles from './Blueprint.module.css';

function BlueprintGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.IcosahedronGeometry>(null);

  const intensityRef = useRef(0);
  const originalPositions = useRef<Float32Array | null>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const mouseSpeed = useRef(0);
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (geomRef.current) {
      originalPositions.current = geomRef.current.attributes.position.array.slice() as Float32Array;
    }

    let lastTime = performance.now();
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);

      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;

      const dx = nx - lastMouse.current.x;
      const dy = ny - lastMouse.current.y;

      const speed = Math.sqrt(dx * dx + dy * dy) / (dt / 1000);

      mouse.current = { x: nx, y: ny };
      mouseSpeed.current = Math.min(speed * 0.5, 1.5);

      lastMouse.current = { x: nx, y: ny };
      lastTime = now;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;

      meshRef.current.rotation.x += (mouse.current.y * 0.2 - meshRef.current.rotation.x) * 0.02;
      meshRef.current.rotation.y += (mouse.current.x * 0.2 - meshRef.current.rotation.y) * 0.02;
    }

    intensityRef.current = THREE.MathUtils.lerp(intensityRef.current, mouseSpeed.current, 0.1);
    mouseSpeed.current = THREE.MathUtils.lerp(mouseSpeed.current, 0, 0.05);

    if (geomRef.current && originalPositions.current && intensityRef.current > 0.005) {
      const positions = geomRef.current.attributes.position.array as Float32Array;
      const orig = originalPositions.current;
      const time = state.clock.getElapsedTime();

      for (let i = 0; i < positions.length; i += 3) {
        const x = orig[i];
        const y = orig[i + 1];
        const z = orig[i + 2];

        const offset =
          Math.sin(x * 5 + time * 5) * Math.cos(y * 5 + time * 4) * 0.4 * intensityRef.current;

        const length = Math.sqrt(x * x + y * y + z * z);
        const nx = x / length;
        const ny = y / length;
        const nz = z / length;

        positions[i] = x + nx * offset;
        positions[i + 1] = y + ny * offset;
        positions[i + 2] = z + nz * offset;
      }
      geomRef.current.attributes.position.needsUpdate = true;
    } else if (geomRef.current && originalPositions.current) {
      const positions = geomRef.current.attributes.position.array as Float32Array;
      const orig = originalPositions.current;
      let changed = false;
      for (let i = 0; i < positions.length; i++) {
        if (Math.abs(positions[i] - orig[i]) > 0.001) {
          positions[i] = THREE.MathUtils.lerp(positions[i], orig[i], 0.1);
          changed = true;
        }
      }
      if (changed) geomRef.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry ref={geomRef} args={[2.5, 2]} />
      <meshBasicMaterial color="#38bdf8" wireframe={true} transparent={true} opacity={0.25} />
    </mesh>
  );
}

export default function BlueprintBackground() {
  const gridRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isContact = location.pathname === '/contact';

  useEffect(() => {
    const handleScroll = () => {
      if (gridRef.current) {
        const scrolled = window.scrollY;
        gridRef.current.style.backgroundPosition = `-1px calc(-1px - ${scrolled * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div ref={gridRef} className={styles.blueprintGrid} />
      {(isHome || isContact) && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        >
          <Canvas camera={{ position: [0, 0, 5] }}>
            <BlueprintGeometry />
          </Canvas>
        </div>
      )}
    </>
  );
}


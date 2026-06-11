import { useRef, useMemo, MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import styles from './Highway.module.css';

interface CarProps {
  id: number;
  lane: number;
  targetSpeed: number;
  startZ: number;
  color: string;
  carsState: MutableRefObject<{ id: number; lane: number; z: number; actualSpeed: number }[]>;
}

function Car({ id, lane, targetSpeed, startZ, color, carsState }: CarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const zPos = useRef(startZ);
  const actualSpeed = useRef(targetSpeed);

  const xPos = lane * 1.5;

  useFrame((_, delta) => {
    if (groupRef.current) {
      let speedLimit = targetSpeed;
      
      for (const other of carsState.current) {
        if (other.id !== id && other.lane === lane) {
          const dist = zPos.current - other.z;
          if (dist > -2 && dist < 8) {
             speedLimit = Math.min(speedLimit, other.actualSpeed);
             if (dist < 4) {
               speedLimit = Math.min(speedLimit, other.actualSpeed * 0.5);
             }
             if (dist < 2.5 && dist > -2) {
               zPos.current = other.z + 2.5;
               actualSpeed.current = other.actualSpeed;
             }
          }
        }
      }

      actualSpeed.current = THREE.MathUtils.lerp(actualSpeed.current, speedLimit, 0.1);
      zPos.current -= actualSpeed.current * delta * 15;
      
      if (zPos.current < -30) {
        const carsInLane = carsState.current.filter(c => c.lane === lane && c.id !== id);
        const maxZ = carsInLane.length > 0 ? Math.max(...carsInLane.map(c => c.z)) : 30;
        zPos.current = Math.max(30, maxZ + 5 + Math.random() * 5);
        actualSpeed.current = targetSpeed;
      }
      
      const myState = carsState.current.find(c => c.id === id);
      if (myState) {
        myState.z = zPos.current;
        myState.actualSpeed = actualSpeed.current;
      }
      
      groupRef.current.position.z = zPos.current;
    }
  });

  return (
    <group ref={groupRef} position={[xPos, 0, startZ]}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.9, 0.5, 2.2]} />
        <meshStandardMaterial color={color} roughness={1.0} metalness={0.1} />
      </mesh>
      
      <mesh position={[0, 0.8, -0.2]} castShadow>
        <boxGeometry args={[0.8, 0.4, 1.2]} />
        <meshStandardMaterial color="#111" roughness={0.1} />
      </mesh>

      <mesh position={[0.3, 0.4, -1.1]}>
        <boxGeometry args={[0.2, 0.1, 0.1]} />
        <meshBasicMaterial color="#ffffee" />
      </mesh>
      <mesh position={[-0.3, 0.4, -1.1]}>
        <boxGeometry args={[0.2, 0.1, 0.1]} />
        <meshBasicMaterial color="#ffffee" />
      </mesh>

      <mesh position={[0.3, 0.4, 1.1]}>
        <boxGeometry args={[0.2, 0.1, 0.1]} />
        <meshBasicMaterial color="#ff1100" />
      </mesh>
      <mesh position={[-0.3, 0.4, 1.1]}>
        <boxGeometry args={[0.2, 0.1, 0.1]} />
        <meshBasicMaterial color="#ff1100" />
      </mesh>
    </group>
  );
}

function Traffic() {
  const cars = useMemo(() => {
    const items = [];
    const colors = ['#ffffff', '#ff3333', '#3366ff', '#ffcc00', '#00ff88', '#aaaaaa'];
    
    for (let i = 0; i < 10; i++) {
      const lane = Math.floor(Math.random() * 3) - 1;
      const carsInLane = items.filter(c => c.lane === lane);
      const maxZ = carsInLane.length > 0 ? Math.max(...carsInLane.map(c => c.startZ)) : -30;
      
      items.push({
        id: i,
        lane,
        targetSpeed: 1 + Math.random() * 1.5,
        startZ: maxZ + 6 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return items;
  }, []);

  const carsState = useRef(
    cars.map(c => ({ id: c.id, lane: c.lane, z: c.startZ, actualSpeed: c.targetSpeed }))
  );

  return (
    <>
      {cars.map((car) => (
        <Car key={car.id} {...car} carsState={carsState} />
      ))}
    </>
  );
}

function Environment() {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (linesRef.current) {
      linesRef.current.position.z -= 10 * delta;
      if (linesRef.current.position.z < -4) {
        linesRef.current.position.z = 0;
      }
    }
  });

  return (
    <group>
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 100]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      <group ref={linesRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <group key={i} position={[0, 0, (i - 10) * 4]}>
            <mesh position={[-0.75, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.2, 2.5]} />
              <meshBasicMaterial color="#ffffff" opacity={0.9} transparent />
            </mesh>
            <mesh position={[0.75, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.2, 2.5]} />
              <meshBasicMaterial color="#ffffff" opacity={0.9} transparent />
            </mesh>
          </group>
        ))}
      </group>

      <mesh position={[-15, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 100]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      <mesh position={[15, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 100]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
    </group>
  );
}

export default function HighwayBackground() {
  return (
    <div className={styles.highwayForceBundle} style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', background: '#020202' }}>
      <Canvas shadows>
        <OrthographicCamera 
          makeDefault 
          position={[30, 25, 30]} 
          zoom={60} 
          near={-100} 
          far={500} 
          onUpdate={(c) => c.lookAt(0, 0, 0)}
        />
        <color attach="background" args={['#020202']} />
        
        <ambientLight intensity={1.0} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[0, 5, -10]} intensity={2} color="#ff4500" distance={20} />
        <pointLight position={[0, 5, 10]} intensity={2} color="#ffffff" distance={20} />

        <fog attach="fog" args={['#020202', 10, 60]} />

        <Environment />
        <Traffic />
      </Canvas>
    </div>
  );
}

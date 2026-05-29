import { Canvas, useThree } from '@react-three/fiber';

function FullScreenPlane() {
  const { viewport } = useThree();
  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <meshNormalMaterial />
    </mesh>
  );
}

export default function FluidBackground() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      pointerEvents: 'none'
    }}>
      <Canvas>
        <FullScreenPlane />
      </Canvas>
    </div>
  );
}

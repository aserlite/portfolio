import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Lidar.module.css';

const vertexShader = `
uniform sampler2D uTexture;
varying vec2 vUv;
varying float vElevation;

void main() {
  vUv = uv;
  vec4 color = texture2D(uTexture, vUv);
  float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  vec3 pos = position;
  pos.z = (luminance - 0.5) * 4.0;
  vElevation = luminance;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = (4.0 * luminance + 1.0) * (15.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
varying vec2 vUv;
varying float vElevation;

void main() {
  vec3 color = vec3(0.0, 1.0, 0.8);
  float dist = distance(gl_PointCoord, vec2(0.5));
  if (dist > 0.5) discard;
  float alpha = smoothstep(0.1, 0.8, vElevation) * 0.8;
  gl_FragColor = vec4(color, alpha);
}
`;

function PointCloud({ video }: { video: HTMLVideoElement }) {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const pointsRef = useRef<THREE.Points>(null);
  
  const videoTexture = useMemo(() => {
    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;
    return texture;
  }, [video]);

  const uniforms = useMemo(() => ({
    uTexture: { value: videoTexture }
  }), [videoTexture]);

  const { planeWidth, planeHeight, widthSegments, heightSegments } = useMemo(() => {
    const aspect = (video.videoWidth || 16) / (video.videoHeight || 9);
    const baseHeight = 10;
    return {
      planeWidth: baseHeight * aspect,
      planeHeight: baseHeight,
      widthSegments: Math.round(150 * aspect),
      heightSegments: 150
    };
  }, [video]);

  return (
    <points ref={pointsRef} rotation={[0, Math.PI, 0]} scale={[1.2, 1.2, 1.2]}>
      <planeGeometry args={[planeWidth, planeHeight, widthSegments, heightSegments]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function LidarBackground() {
  const { setTheme } = useTheme();
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let mounted = true;

    async function initCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'user', 
            width: { ideal: 640 }, 
            height: { ideal: 480 } 
          } 
        });
        
        if (!mounted) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        const video = document.createElement('video');
        video.srcObject = stream;
        video.crossOrigin = 'Anonymous';
        video.playsInline = true;
        video.muted = true;
        await video.play();
        
        setVideoElement(video);
        setPermissionGranted(true);
      } catch (err) {
        console.warn('Lidar theme: Webcam access denied or unavailable.', err);
        if (mounted) {
          setTheme('fluid');
        }
      }
    }

    initCamera();

    return () => {
      mounted = false;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setVideoElement(prev => {
        if (prev) {
          prev.pause();
          prev.srcObject = null;
        }
        return null;
      });
    };
  }, [setTheme]);

  if (!permissionGranted || !videoElement) {
    return null;
  }

  return (
    <div className={styles.forceBundle} style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', background: '#01050a' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <PointCloud video={videoElement} />
      </Canvas>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(1, 5, 10, 0.7)' }} />
    </div>
  );
}

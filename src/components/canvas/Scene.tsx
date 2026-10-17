import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import StudioEnvironment from './StudioEnvironment';
import OutfitModel from './OutfitModel';
import CameraRig from './CameraRig';
import { useCustomizerStore } from '../../store/useCustomizerStore';

export default function Scene() {
  const controlsRef = useRef<any>(null);
  const { autoRotate } = useCustomizerStore();

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
          powerPreference: 'high-performance',
        }}
        camera={{
          fov: 38,
          near: 0.1,
          far: 25,
          position: [0, 0.75, 3.2],
        }}
        className="w-full h-full"
      >
        {/* ThreadLab Studio Stage & Lights */}
        <StudioEnvironment />

        {/* Dynamic Camera Rig (Interpolates smoothly between presets) */}
        <CameraRig controlsRef={controlsRef} />

        {/* Orbit Controls (Constrained so user cannot dip below studio floor) */}
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          minDistance={1.0}
          maxDistance={5.0}
          minPolarAngle={Math.PI / 4} // ~45 deg down
          maxPolarAngle={Math.PI / 2 + 0.04} // cannot go below floor
          autoRotate={autoRotate}
          autoRotateSpeed={1.5}
        />

        {/* 3D Garment Model / Atelier Mannequin */}
        <OutfitModel />
      </Canvas>
    </div>
  );
}

import React, { Suspense, useEffect } from 'react';
import ProceduralGarment from './ProceduralGarment';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useCustomizerStore } from '../../store/useCustomizerStore';

function CustomGLBLoader({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const { hoodieColor } = useCustomizerStore();

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          // Non-destructive material cloning
          const mat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
          const name = (mesh.name || '').toLowerCase();

          if (
            name.includes('hoodie') ||
            name.includes('jacket') ||
            name.includes('top') ||
            name.includes('shirt') ||
            name.includes('vest')
          ) {
            mat.color = new THREE.Color(hoodieColor);
            mat.roughness = 0.8;
          }
          mesh.material = mat;
        }
      }
    });
  }, [scene, hoodieColor]);

  return <primitive object={scene} position={[0, -0.4, 0]} scale={1.2} />;
}

export default function OutfitModel() {
  const { modelSource, customModelUrl } = useCustomizerStore();

  return (
    <Suspense
      fallback={
        <Html center>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 border border-white/10 backdrop-blur-md text-[11px] font-mono text-white/70">
            <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
            COMPILING 3D TEXTURES & SHADERS...
          </div>
        </Html>
      }
    >
      {modelSource === 'CUSTOM_UPLOAD' && customModelUrl ? (
        <CustomGLBLoader url={customModelUrl} />
      ) : (
        <ProceduralGarment />
      )}
    </Suspense>
  );
}

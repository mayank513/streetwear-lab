import React, { Suspense, useMemo, useEffect, useRef } from 'react';
import { useGLTF, useTexture, Decal, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useCustomizerStore } from '../../store/useCustomizerStore';
import ProceduralGarment from './ProceduralGarment';

// Preload the models
useGLTF.preload('/models/hoodie.glb');
useGLTF.preload('/models/tshirt.glb');

interface GLTFGarmentProps {
  modelPath: string;
  targetHeight: number;
  yOffset: number;
  chestDecalPos: [number, number, number];
  chestDecalRot?: [number, number, number];
}

function GLTFGarmentModel({
  modelPath,
  targetHeight,
  yOffset,
  chestDecalPos,
  chestDecalRot = [0, 0, 0],
}: GLTFGarmentProps) {
  const { scene } = useGLTF(modelPath);
  const { hoodieColor, hoodieGraphic, graphicScale, finishType, windRipple } = useCustomizerStore();
  const groupRef = useRef<THREE.Group>(null);
  const targetMeshRef = useRef<THREE.Mesh>(null);

  // Load active chest decal texture
  const decalTexture = useTexture(hoodieGraphic);
  decalTexture.anisotropy = 8;

  // Clone scene so multiple mounts don't collide
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Normalize, scale, and center model using Box3
  const { normalizedScale, centerOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = targetHeight / (maxDim || 1);

    return {
      normalizedScale: scale,
      centerOffset: [
        -center.x * scale,
        -center.y * scale + yOffset,
        -center.z * scale,
      ] as [number, number, number],
    };
  }, [clonedScene, targetHeight, yOffset]);

  // Update fabric dye color dynamically whenever hoodieColor changes!
  useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          // If array of materials or single material
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

          materials.forEach((mat) => {
            if ((mat as THREE.MeshStandardMaterial).isMeshStandardMaterial || (mat as THREE.Material).type.includes('Material')) {
              const stdMat = mat as THREE.MeshStandardMaterial;
              // Set the dye color directly
              stdMat.color.set(hoodieColor);
              stdMat.roughness = 0.88;
              stdMat.metalness = 0.02;
              stdMat.needsUpdate = true;
            }
          });
        }
      }
    });
  }, [clonedScene, hoodieColor]);

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* 3D Garment Model Mesh */}
      <group position={centerOffset} scale={normalizedScale}>
        <primitive object={clonedScene} />
      </group>

      {/* Chest Decal Projection Plane (Overlayed onto chest) */}
      <mesh
        ref={targetMeshRef}
        position={chestDecalPos}
        rotation={chestDecalRot}
      >
        <planeGeometry args={[graphicScale * 1.3, graphicScale * 0.9]} />
        <meshPhysicalMaterial
          map={decalTexture}
          transparent
          alphaTest={0.05}
          roughness={finishType === 'puff' ? 0.3 : 0.85}
          metalness={finishType === 'puff' ? 0.15 : 0.02}
          clearcoat={finishType === 'puff' ? 0.6 : 0}
          clearcoatRoughness={0.25}
          polygonOffset
          polygonOffsetFactor={-2}
        />
      </mesh>
    </group>
  );
}

export default function OutfitModel() {
  const { modelSource, customModelUrl } = useCustomizerStore();

  return (
    <Suspense
      fallback={
        <Html center>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/85 border border-[#d4ff00]/40 backdrop-blur-md text-[11px] font-mono text-white/80 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
            COMPILING 3D DYE SHADERS...
          </div>
        </Html>
      }
    >
      {modelSource === 'HOODIE_3D' && (
        <GLTFGarmentModel
          modelPath="/models/hoodie.glb"
          targetHeight={1.45}
          yOffset={0.48}
          chestDecalPos={[0, 0.52, 0.28]}
        />
      )}

      {modelSource === 'TSHIRT_3D' && (
        <GLTFGarmentModel
          modelPath="/models/tshirt.glb"
          targetHeight={1.35}
          yOffset={0.42}
          chestDecalPos={[0, 0.48, 0.24]}
        />
      )}

      {modelSource === 'PROCEDURAL_CO_ORD' && <ProceduralGarment />}

      {modelSource === 'CUSTOM_UPLOAD' && customModelUrl && (
        <GLTFGarmentModel
          modelPath={customModelUrl}
          targetHeight={1.4}
          yOffset={0.45}
          chestDecalPos={[0, 0.5, 0.28]}
        />
      )}
    </Suspense>
  );
}

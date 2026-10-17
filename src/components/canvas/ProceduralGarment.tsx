import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Decal, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useCustomizerStore, JEANS_WASH_PRESETS } from '../../store/useCustomizerStore';
import { createFleeceTexture, createDenimTexture } from '../../utils/textureGenerators';

export default function ProceduralGarment() {
  const {
    hoodieColor,
    hoodieGraphic,
    graphicScale,
    finishType,
    jeansWash,
    distressLevel,
    displayMode,
    explodeFactor,
    windRipple,
    showGhostMannequin,
  } = useCustomizerStore();

  const groupRef = useRef<THREE.Group>(null);
  const chestMeshRef = useRef<THREE.Mesh>(null);

  // Generate procedural fabric normal bump textures
  const fleeceTexture = useMemo(() => createFleeceTexture(), []);
  const denimTexture = useMemo(() => createDenimTexture(), []);

  // Compute active denim wash color
  const currentJeansPreset = useMemo(() => {
    return JEANS_WASH_PRESETS.find((p) => p.id === jeansWash) || JEANS_WASH_PRESETS[0];
  }, [jeansWash]);

  // Cloth kinematics & gentle idle wave animation
  useFrame((state) => {
    if (groupRef.current && windRipple) {
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.012;
      groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.025;
    }
  });

  // Tailoring explosion offsets
  const exp = explodeFactor;

  const showHoodie = displayMode === 'FULL_COMBO' || displayMode === 'HOODIE_ONLY';
  const showJeans = displayMode === 'FULL_COMBO' || displayMode === 'JEANS_ONLY';

  // Load decal texture safely
  const decalTexture = useTexture(hoodieGraphic);
  decalTexture.anisotropy = 8;

  // PBR Material for 480 GSM French Terry Fleece
  const fleeceMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(hoodieColor),
      roughness: 0.82,
      metalness: 0.03,
      sheen: 0.65,
      sheenRoughness: 0.55,
      sheenColor: new THREE.Color(0xffffff),
      bumpMap: fleeceTexture,
      bumpScale: 0.018,
    });
  }, [hoodieColor, fleeceTexture]);

  // PBR Material for 14.5oz Carpenter Twill Denim
  const denimMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(currentJeansPreset.hex),
      roughness: 0.72,
      metalness: 0.06,
      bumpMap: denimTexture,
      bumpScale: 0.025,
      sheen: 0.25,
      sheenColor: new THREE.Color(0x99aacc),
    });
  }, [currentJeansPreset, denimTexture]);

  // Brass hardware material for grommets, rivets, and aglets
  const brassMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#c9933b',
      metalness: 0.92,
      roughness: 0.25,
    });
  }, []);

  // Matte graphite mannequin material
  const mannequinMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#1a1c23',
      roughness: 0.4,
      metalness: 0.3,
    });
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* ────────────────────────────────────────────────────────── */}
      {/* GHOST MANNEQUIN ATELIER BUST & PEDESTAL STAND             */}
      {/* ────────────────────────────────────────────────────────── */}
      {showGhostMannequin && (
        <group>
          {/* Mannequin Neck / Collar Block */}
          <mesh position={[0, 1.82, 0]} material={mannequinMaterial} castShadow>
            <cylinderGeometry args={[0.08, 0.09, 0.2, 32]} />
          </mesh>
          <mesh position={[0, 1.93, 0]} material={brassMaterial}>
            <cylinderGeometry args={[0.095, 0.095, 0.025, 32]} />
          </mesh>

          {/* Mannequin Torso Core */}
          <mesh position={[0, 1.35, 0]} material={mannequinMaterial}>
            <cylinderGeometry args={[0.22, 0.18, 0.75, 32]} />
          </mesh>

          {/* Mannequin Stand Pole & Heavy Cast Base */}
          <mesh position={[0, -0.6, 0]} material={mannequinMaterial}>
            <cylinderGeometry args={[0.025, 0.025, 1.5, 16]} />
          </mesh>
          <mesh position={[0, -1.33, 0]} material={mannequinMaterial} receiveShadow>
            <cylinderGeometry args={[0.45, 0.48, 0.04, 32]} />
          </mesh>
        </group>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* HEAVYWEIGHT 480 GSM BOXY OVERSIZED HOODIE                   */}
      {/* ────────────────────────────────────────────────────────── */}
      {showHoodie && (
        <group>
          {/* 1. Main Boxy Torso with Drop Shoulders */}
          <mesh
            ref={chestMeshRef}
            position={[0, 1.36 + exp * 0.05, 0]}
            material={fleeceMaterial}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[0.39, 0.38, 0.76, 32, 1, false]} />
            
            {/* Decal Projector on Chest */}
            <Decal
              position={[0, 0.08, 0.38]}
              rotation={[0, 0, 0]}
              scale={[graphicScale * 1.1, graphicScale * 0.85, 0.2]}
            >
              <meshPhysicalMaterial
                map={decalTexture}
                transparent
                polygonOffset
                polygonOffsetFactor={-4}
                roughness={finishType === 'puff' ? 0.35 : 0.85}
                metalness={finishType === 'puff' ? 0.12 : 0.02}
                clearcoat={finishType === 'puff' ? 0.5 : 0}
                clearcoatRoughness={0.2}
              />
            </Decal>
          </mesh>

          {/* 2. Ribbed Bottom Hem Waistband */}
          <mesh
            position={[0, 0.94 - exp * 0.25, 0]}
            material={fleeceMaterial}
            castShadow
          >
            <cylinderGeometry args={[0.36, 0.36, 0.1, 32]} />
          </mesh>

          {/* 3. Anatomical Oversized Hood */}
          <group position={[0, 1.82 + exp * 0.5, -0.05]}>
            {/* Hood Dome */}
            <mesh material={fleeceMaterial} castShadow>
              <sphereGeometry args={[0.26, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
            </mesh>
            {/* Hood Face Opening Collar Ring */}
            <mesh position={[0, -0.04, 0.1]} rotation={[Math.PI / 6, 0, 0]} material={fleeceMaterial}>
              <torusGeometry args={[0.18, 0.04, 16, 32]} />
            </mesh>
            {/* Brass Drawstring Eyelets */}
            <mesh position={[-0.08, -0.12, 0.22]} rotation={[0, 0, 0]} material={brassMaterial}>
              <torusGeometry args={[0.012, 0.005, 8, 16]} />
            </mesh>
            <mesh position={[0.08, -0.12, 0.22]} rotation={[0, 0, 0]} material={brassMaterial}>
              <torusGeometry args={[0.012, 0.005, 8, 16]} />
            </mesh>
          </group>

          {/* 4. Tubular Cotton Drawstrings with Brass Aglets */}
          <group position={[0, 1.68, 0.24 + exp * 0.3]}>
            {/* Left Drawstring */}
            <mesh position={[-0.08, -0.16, 0]} rotation={[0, 0, 0.05]}>
              <cylinderGeometry args={[0.007, 0.007, 0.32, 12]} />
              <meshStandardMaterial color="#f0eee8" roughness={0.7} />
            </mesh>
            <mesh position={[-0.09, -0.32, 0]} material={brassMaterial}>
              <cylinderGeometry args={[0.009, 0.009, 0.04, 12]} />
            </mesh>

            {/* Right Drawstring */}
            <mesh position={[0.08, -0.18, 0]} rotation={[0, 0, -0.06]}>
              <cylinderGeometry args={[0.007, 0.007, 0.35, 12]} />
              <meshStandardMaterial color="#f0eee8" roughness={0.7} />
            </mesh>
            <mesh position={[0.09, -0.36, 0]} material={brassMaterial}>
              <cylinderGeometry args={[0.009, 0.009, 0.04, 12]} />
            </mesh>
          </group>

          {/* 5. Kangaroo Pouch Pocket (Beveled 3D Offset) */}
          <group position={[0, 1.15, 0.35 + exp * 0.4]}>
            <mesh material={fleeceMaterial} castShadow>
              <boxGeometry args={[0.46, 0.26, 0.08]} />
            </mesh>
            {/* Left Pocket Slant Entrance */}
            <mesh position={[-0.23, 0.02, 0.01]} rotation={[0, 0, -Math.PI / 6]} material={fleeceMaterial}>
              <boxGeometry args={[0.08, 0.2, 0.07]} />
            </mesh>
            {/* Right Pocket Slant Entrance */}
            <mesh position={[0.23, 0.02, 0.01]} rotation={[0, 0, Math.PI / 6]} material={fleeceMaterial}>
              <boxGeometry args={[0.08, 0.2, 0.07]} />
            </mesh>
          </group>

          {/* 6. Oversized Drop-Shoulder Sleeves */}
          {/* Left Sleeve */}
          <group position={[-0.45 - exp * 0.45, 1.38, 0]} rotation={[0, 0, 0.28]}>
            <mesh material={fleeceMaterial} castShadow>
              <cylinderGeometry args={[0.18, 0.13, 0.62, 24]} />
            </mesh>
            {/* Ribbed Wrist Cuff */}
            <mesh position={[0, -0.34, 0]} material={fleeceMaterial}>
              <cylinderGeometry args={[0.11, 0.11, 0.09, 24]} />
            </mesh>
          </group>

          {/* Right Sleeve */}
          <group position={[0.45 + exp * 0.45, 1.38, 0]} rotation={[0, 0, -0.28]}>
            <mesh material={fleeceMaterial} castShadow>
              <cylinderGeometry args={[0.18, 0.13, 0.62, 24]} />
            </mesh>
            {/* Ribbed Wrist Cuff */}
            <mesh position={[0, -0.34, 0]} material={fleeceMaterial}>
              <cylinderGeometry args={[0.11, 0.11, 0.09, 24]} />
            </mesh>
          </group>
        </group>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* 14.5 OZ WIDE-LEG BAGGY CARPENTER DENIM                      */}
      {/* ────────────────────────────────────────────────────────── */}
      {showJeans && (
        <group>
          {/* 1. High-Waistband & Belt Loops */}
          <group position={[0, 0.91 + exp * 0.1, 0]}>
            <mesh material={denimMaterial} castShadow>
              <cylinderGeometry args={[0.33, 0.34, 0.09, 32]} />
            </mesh>
            {/* Embossed Brass Fly Button */}
            <mesh position={[0, 0.01, 0.345]} rotation={[Math.PI / 2, 0, 0]} material={brassMaterial}>
              <cylinderGeometry args={[0.018, 0.018, 0.012, 16]} />
            </mesh>
            {/* Fly Placket Line */}
            <mesh position={[0, -0.09, 0.34]} material={denimMaterial}>
              <boxGeometry args={[0.02, 0.14, 0.01]} />
            </mesh>
            {/* Belt Loops */}
            {[-0.22, -0.09, 0.09, 0.22].map((x, i) => (
              <mesh key={i} position={[x, 0, 0.34]} material={denimMaterial}>
                <boxGeometry args={[0.015, 0.08, 0.01]} />
              </mesh>
            ))}
          </group>

          {/* 2. Pelvis / Seat Construction */}
          <mesh position={[0, 0.77, 0]} material={denimMaterial} castShadow>
            <cylinderGeometry args={[0.34, 0.35, 0.22, 32]} />
          </mesh>

          {/* 3. Left Wide-Leg with Ankle Stacking Folds */}
          <group position={[-0.19 - exp * 0.25, 0.25, 0]}>
            {/* Thigh & Knee Cylinder */}
            <mesh material={denimMaterial} castShadow>
              <cylinderGeometry args={[0.185, 0.195, 0.92, 24]} />
            </mesh>

            {/* Slashed Knee Distress Cut (if enabled) */}
            {distressLevel === 'slashed' && (
              <group position={[0, -0.05, 0.195]}>
                <mesh>
                  <boxGeometry args={[0.18, 0.035, 0.01]} />
                  <meshBasicMaterial color="#000000" />
                </mesh>
                {/* Frayed Cotton Fringe Threads */}
                <mesh position={[0, 0, 0.005]}>
                  <boxGeometry args={[0.19, 0.01, 0.012]} />
                  <meshStandardMaterial color="#dcd8cf" roughness={0.9} />
                </mesh>
              </group>
            )}

            {/* Lower Leg / Ankle Stacking Accordion Folds */}
            <group position={[0, -0.65, 0]}>
              <mesh position={[0, 0.12, 0]} rotation={[0.05, 0, 0]} material={denimMaterial} castShadow>
                <cylinderGeometry args={[0.205, 0.215, 0.25, 24]} />
              </mesh>
              <mesh position={[0, -0.08, 0.02]} rotation={[-0.08, 0, 0]} material={denimMaterial}>
                <cylinderGeometry args={[0.218, 0.225, 0.22, 24]} />
              </mesh>
              {/* Hem Cuff */}
              <mesh position={[0, -0.22, 0.03]} material={denimMaterial}>
                <cylinderGeometry args={[0.222, 0.222, 0.06, 24]} />
              </mesh>
            </group>
          </group>

          {/* 4. Right Wide-Leg with Ankle Stacking Folds */}
          <group position={[0.19 + exp * 0.25, 0.25, 0]}>
            {/* Thigh & Knee Cylinder */}
            <mesh material={denimMaterial} castShadow>
              <cylinderGeometry args={[0.185, 0.195, 0.92, 24]} />
            </mesh>

            {/* Slashed Knee Distress Cut (if enabled) */}
            {distressLevel === 'slashed' && (
              <group position={[0, -0.05, 0.195]}>
                <mesh>
                  <boxGeometry args={[0.18, 0.035, 0.01]} />
                  <meshBasicMaterial color="#000000" />
                </mesh>
                {/* Frayed Cotton Fringe Threads */}
                <mesh position={[0, 0, 0.005]}>
                  <boxGeometry args={[0.19, 0.01, 0.012]} />
                  <meshStandardMaterial color="#dcd8cf" roughness={0.9} />
                </mesh>
              </group>
            )}

            {/* Lower Leg / Ankle Stacking Accordion Folds */}
            <group position={[0, -0.65, 0]}>
              <mesh position={[0, 0.12, 0]} rotation={[0.05, 0, 0]} material={denimMaterial} castShadow>
                <cylinderGeometry args={[0.205, 0.215, 0.25, 24]} />
              </mesh>
              <mesh position={[0, -0.08, 0.02]} rotation={[-0.08, 0, 0]} material={denimMaterial}>
                <cylinderGeometry args={[0.218, 0.225, 0.22, 24]} />
              </mesh>
              {/* Hem Cuff */}
              <mesh position={[0, -0.22, 0.03]} material={denimMaterial}>
                <cylinderGeometry args={[0.222, 0.222, 0.06, 24]} />
              </mesh>
            </group>
          </group>

          {/* 5. Utility Carpenter Hammer Loop & Workwear Tool Pocket */}
          <group position={[-0.38 - exp * 0.4, 0.35, 0]} rotation={[0, 0, -0.08]}>
            {/* Carpenter Tool Pocket */}
            <mesh material={denimMaterial} castShadow>
              <boxGeometry args={[0.03, 0.28, 0.18]} />
            </mesh>
            {/* Carpenter Fabric Loop */}
            <mesh position={[-0.02, -0.18, 0]} rotation={[0, 0, Math.PI / 4]} material={denimMaterial}>
              <torusGeometry args={[0.06, 0.014, 8, 16, Math.PI]} />
            </mesh>
            {/* Reinforcing Brass Pocket Rivet */}
            <mesh position={[0.01, 0.12, 0.08]} rotation={[0, Math.PI / 2, 0]} material={brassMaterial}>
              <cylinderGeometry args={[0.008, 0.008, 0.008, 12]} />
            </mesh>
          </group>

          {/* 6. Front Angled Slanted Pockets */}
          <mesh position={[-0.24, 0.74, 0.24]} rotation={[0, 0, Math.PI / 5]} material={denimMaterial}>
            <boxGeometry args={[0.02, 0.15, 0.14]} />
          </mesh>
          <mesh position={[0.24, 0.74, 0.24]} rotation={[0, 0, -Math.PI / 5]} material={denimMaterial}>
            <boxGeometry args={[0.02, 0.15, 0.14]} />
          </mesh>
        </group>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* SARTORIAL EXPLODED LEADER CALLOUTS                         */}
      {/* ────────────────────────────────────────────────────────── */}
      {exp > 0.15 && (
        <group>
          {/* Leader line to Anatomical Hood */}
          <line>
            <bufferGeometry
              attach="geometry"
              {...(() => {
                const geom = new THREE.BufferGeometry();
                const pts = new Float32Array([
                  0, 1.82 + exp * 0.5, 0,
                  0.7, 1.82 + exp * 0.5 + 0.1, 0
                ]);
                geom.setAttribute('position', new THREE.BufferAttribute(pts, 3));
                return geom;
              })()}
            />
            <lineBasicMaterial color="#d4ff00" opacity={0.6} transparent />
          </line>
        </group>
      )}
    </group>
  );
}

import { useMemo } from 'react';
import { ContactShadows } from '@react-three/drei';
import { useCustomizerStore } from '../../store/useCustomizerStore';

export default function StudioEnvironment() {
  const { lightingPreset } = useCustomizerStore();

  const lightingConfig = useMemo(() => {
    switch (lightingPreset) {
      case 'MINIMAL_LOFT':
        return {
          keyColor: '#ffffff',
          keyIntensity: 1.4,
          rimColor: '#e0e7ff',
          rimIntensity: 1.0,
          ambientColor: '#ffffff',
          ambientIntensity: 0.8,
        };
      case 'HIGH_CONTRAST':
        return {
          keyColor: '#fff5ea',
          keyIntensity: 2.2,
          rimColor: '#d4ff00',
          rimIntensity: 1.8,
          ambientColor: '#12141a',
          ambientIntensity: 0.3,
        };
      case 'GOLDEN_HOUR':
        return {
          keyColor: '#ffb272',
          keyIntensity: 1.8,
          rimColor: '#8099ff',
          rimIntensity: 1.4,
          ambientColor: '#3d2620',
          ambientIntensity: 0.6,
        };
      case 'CYBER_DARK':
      default:
        return {
          keyColor: '#fff4e0',
          keyIntensity: 1.2,
          rimColor: '#60a5fa',
          rimIntensity: 1.5,
          ambientColor: '#181b22',
          ambientIntensity: 0.65,
        };
    }
  }, [lightingPreset]);

  return (
    <>
      {/* Studio Lighting */}
      <ambientLight color={lightingConfig.ambientColor} intensity={lightingConfig.ambientIntensity} />

      {/* Main Key Light */}
      <directionalLight
        position={[3.5, 4.5, 3.5]}
        color={lightingConfig.keyColor}
        intensity={lightingConfig.keyIntensity}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={12}
        shadow-camera-left={-2}
        shadow-camera-right={2}
        shadow-camera-top={3}
        shadow-camera-bottom={-2}
        shadow-bias={-0.0005}
      />

      {/* Cool Rim Light (catches edges of heavy fabric) */}
      <directionalLight
        position={[-3.5, 3.0, -3.0]}
        color={lightingConfig.rimColor}
        intensity={lightingConfig.rimIntensity}
      />

      {/* Front Soft Fill Light */}
      <directionalLight
        position={[0, 1.5, 3.0]}
        color="#ffffff"
        intensity={0.4}
      />

      {/* Studio Stage Contact Floor Shadow */}
      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.7}
        scale={6}
        blur={2.4}
        far={3}
        resolution={512}
        color="#000000"
      />

      {/* Circular Studio Pedestal Floor */}
      <mesh position={[0, -1.36, 0]} receiveShadow>
        <cylinderGeometry args={[2.2, 2.3, 0.04, 64]} />
        <meshStandardMaterial
          color="#101217"
          roughness={0.88}
          metalness={0.12}
        />
      </mesh>

      {/* Outer Studio Ring Accent */}
      <mesh position={[0, -1.355, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.21, 2.23, 64]} />
        <meshBasicMaterial color="#ffffff" opacity={0.15} transparent />
      </mesh>
    </>
  );
}

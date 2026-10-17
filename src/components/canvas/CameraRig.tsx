import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CameraViewPreset } from '../../types/apparel';
import { useCustomizerStore } from '../../store/useCustomizerStore';

interface CameraRigPreset {
  pos: [number, number, number];
  target: [number, number, number];
}

const VIEW_PRESETS: Record<CameraViewPreset, CameraRigPreset> = {
  FULL_FIT: {
    pos: [0, 0.75, 3.2],
    target: [0, 0.35, 0],
  },
  CHEST_MACRO: {
    pos: [0, 1.45, 1.15],
    target: [0, 1.45, 0],
  },
  BACK_VIEW: {
    pos: [0, 1.45, -1.25],
    target: [0, 1.45, 0],
  },
  DENIM_STACKS: {
    pos: [0.65, -0.35, 1.35],
    target: [0, -0.65, 0],
  },
};

export default function CameraRig({ controlsRef }: { controlsRef: React.RefObject<any> }) {
  const { activeView } = useCustomizerStore();
  const { camera } = useThree();

  const targetPos = useRef(new THREE.Vector3(...VIEW_PRESETS.FULL_FIT.pos));
  const targetLook = useRef(new THREE.Vector3(...VIEW_PRESETS.FULL_FIT.target));
  const isTransitioning = useRef(true);

  useEffect(() => {
    const preset = VIEW_PRESETS[activeView] || VIEW_PRESETS.FULL_FIT;
    targetPos.current.set(...preset.pos);
    targetLook.current.set(...preset.target);
    isTransitioning.current = true;
  }, [activeView]);

  useFrame((_, delta) => {
    if (!isTransitioning.current) return;

    // Smooth exponential lerp
    const lerpSpeed = Math.min(delta * 4.5, 0.15);
    camera.position.lerp(targetPos.current, lerpSpeed);

    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLook.current, lerpSpeed);
      controlsRef.current.update();
    }

    // Stop transitioning once close enough to prevent fighting user mouse drag
    if (camera.position.distanceTo(targetPos.current) < 0.02) {
      isTransitioning.current = false;
    }
  });

  return null;
}

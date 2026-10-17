export type CameraViewPreset = 'FULL_FIT' | 'CHEST_MACRO' | 'BACK_VIEW' | 'DENIM_STACKS';

export type ModelSource = 'PROCEDURAL' | 'SKETCHFAB_PACK' | 'CUSTOM_UPLOAD';

export type FinishType = 'flat' | 'puff';

export type JeansWash = 'RAW_INDIGO' | 'ACID_BLACK' | 'DIRTY_BLEACH';

export type DistressLevel = 'clean' | 'slashed';

export type GarmentDisplayMode = 'FULL_COMBO' | 'HOODIE_ONLY' | 'JEANS_ONLY';

export type StudioLightingPreset = 'CYBER_DARK' | 'MINIMAL_LOFT' | 'HIGH_CONTRAST' | 'GOLDEN_HOUR';

export interface ColorSwatch {
  name: string;
  hex: string;
  pantone: string;
  desc: string;
}

export interface GraphicBadge {
  id: string;
  name: string;
  url: string;
  category: 'Cyber' | 'Brutalist' | 'Gothic' | 'Industrial' | 'Custom';
  description: string;
}

export interface DecalPlacement {
  id: 'CHEST_CENTER' | 'CHEST_LEFT' | 'BACK_GIANT' | 'KANGAROO_POCKET';
  name: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export interface SartorialComponent {
  id: string;
  name: string;
  category: 'HOODIE' | 'JEANS';
  karigarCut: string;
  fabricCode: string;
  gsm: number;
  explodeDirection: [number, number, number];
}

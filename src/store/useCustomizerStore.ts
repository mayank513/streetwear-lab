import { create } from 'zustand';
import { 
  CameraViewPreset, 
  ModelSource,
  FinishType, 
  JeansWash, 
  DistressLevel, 
  GarmentDisplayMode, 
  StudioLightingPreset,
  ColorSwatch,
  GraphicBadge
} from '../types/apparel';
import { GRAPHIC_PRESETS } from '../utils/textureGenerators';

export const HOODIE_COLOR_PRESETS: ColorSwatch[] = [
  { name: 'Washed Onyx', hex: '#161616', pantone: 'PANTONE 19-4004 TCX', desc: 'Vintage sun-faded pigment black' },
  { name: 'Ecru Chalk', hex: '#E2DCD2', pantone: 'PANTONE 11-0601 TCX', desc: 'Raw unbleached organic terry' },
  { name: 'Oxblood Archive', hex: '#44141E', pantone: 'PANTONE 19-1725 TCX', desc: 'Deep aged bordeaux fleece' },
  { name: 'Vintage Moss', hex: '#263328', pantone: 'PANTONE 19-0414 TCX', desc: 'Military garment-dyed olive' },
  { name: 'Cyber Blue', hex: '#0D2742', pantone: 'PANTONE 19-3952 TCX', desc: 'Night sky electric cobalt' },
  { name: 'Acid Volt', hex: '#C2EB00', pantone: 'PANTONE 13-0540 TCX', desc: 'High-visibility safety volt' },
];

export const JEANS_WASH_PRESETS: { id: JeansWash; name: string; hex: string; desc: string; twillScale: number }[] = [
  { id: 'ACID_BLACK', name: 'Acid Black Wash', hex: '#1C1D21', desc: 'Stone-tumbled and marble-bleached black denim', twillScale: 14 },
  { id: 'RAW_INDIGO', name: '14.5oz Raw Selvedge', hex: '#111D33', desc: 'Unwashed deep indigo rope-dyed shuttle twill', twillScale: 18 },
  { id: 'DIRTY_BLEACH', name: 'Dirty Sun Bleach', hex: '#636974', desc: 'Tinted sulfur bleach with vintage warm caste', twillScale: 10 },
];

interface CustomizerState {
  // Hoodie Options
  hoodieColor: string;
  hoodieGraphic: string;
  activeGraphicId: string;
  graphicScale: number;
  finishType: FinishType;

  // Jeans Options
  jeansWash: JeansWash;
  distressLevel: DistressLevel;

  // Viewport & Studio
  modelSource: ModelSource;
  customModelUrl: string | null;
  customModelName: string | null;
  activeView: CameraViewPreset;
  displayMode: GarmentDisplayMode;
  explodeFactor: number; // 0 to 1
  windRipple: boolean;
  autoRotate: boolean;
  lightingPreset: StudioLightingPreset;
  showGhostMannequin: boolean;
  zenMode: boolean;

  // Modals & UI
  isTechPackOpen: boolean;
  isRepositoriesOpen: boolean;
  isOrderSuccessOpen: boolean;

  // Graphic Library
  badges: GraphicBadge[];

  // Actions
  setModelSource: (source: ModelSource) => void;
  setCustomModel: (file: File) => void;
  setHoodieColor: (color: string) => void;
  setHoodieGraphic: (url: string, id: string) => void;
  setGraphicScale: (scale: number) => void;
  setFinishType: (finish: FinishType) => void;
  setJeansWash: (wash: JeansWash) => void;
  setDistressLevel: (level: DistressLevel) => void;
  setActiveView: (view: CameraViewPreset) => void;
  setDisplayMode: (mode: GarmentDisplayMode) => void;
  setExplodeFactor: (factor: number) => void;
  setWindRipple: (val: boolean) => void;
  setAutoRotate: (val: boolean) => void;
  setLightingPreset: (preset: StudioLightingPreset) => void;
  setShowGhostMannequin: (val: boolean) => void;
  setZenMode: (val: boolean) => void;
  toggleZenMode: () => void;
  setIsTechPackOpen: (val: boolean) => void;
  setIsRepositoriesOpen: (val: boolean) => void;
  setIsOrderSuccessOpen: (val: boolean) => void;
  uploadCustomGraphic: (file: File) => void;

  // Calculated Pricing
  getBasePrice: () => number;
  getPuffAddonPrice: () => number;
  getDistressAddonPrice: () => number;
  getTotalPrice: () => number;
}

export const useCustomizerStore = create<CustomizerState>((set, get) => ({
  hoodieColor: '#161616',
  hoodieGraphic: GRAPHIC_PRESETS[0].url,
  activeGraphicId: GRAPHIC_PRESETS[0].id,
  graphicScale: 0.35,
  finishType: 'puff', // Default to puff print for instant tactile wow factor

  jeansWash: 'ACID_BLACK',
  distressLevel: 'clean',

  modelSource: 'HOODIE_3D', // Default to real 3D Hoodie model that changes color dynamically!
  customModelUrl: null,
  customModelName: null,

  activeView: 'FULL_FIT',
  displayMode: 'FULL_COMBO',
  explodeFactor: 0,
  windRipple: true,
  autoRotate: false,
  lightingPreset: 'CYBER_DARK',
  showGhostMannequin: true,
  zenMode: false,

  isTechPackOpen: false,
  isRepositoriesOpen: false,
  isOrderSuccessOpen: false,

  badges: GRAPHIC_PRESETS,

  setModelSource: (modelSource) => set({ modelSource }),
  setCustomModel: (file: File) => {
    const url = URL.createObjectURL(file);
    set({
      customModelUrl: url,
      customModelName: file.name,
      modelSource: 'CUSTOM_UPLOAD',
    });
  },

  setHoodieColor: (hoodieColor) => set({ hoodieColor }),
  setHoodieGraphic: (hoodieGraphic, activeGraphicId) => set({ hoodieGraphic, activeGraphicId }),
  setGraphicScale: (graphicScale) => set({ graphicScale }),
  setFinishType: (finishType) => set({ finishType }),
  setJeansWash: (jeansWash) => set({ jeansWash }),
  setDistressLevel: (distressLevel) => set({ distressLevel }),
  setActiveView: (activeView) => set({ activeView }),
  setDisplayMode: (displayMode) => set({ displayMode }),
  setExplodeFactor: (explodeFactor) => set({ explodeFactor }),
  setWindRipple: (windRipple) => set({ windRipple }),
  setAutoRotate: (autoRotate) => set({ autoRotate }),
  setLightingPreset: (lightingPreset) => set({ lightingPreset }),
  setShowGhostMannequin: (showGhostMannequin) => set({ showGhostMannequin }),
  setZenMode: (zenMode) => set({ zenMode }),
  toggleZenMode: () => set((state) => ({ zenMode: !state.zenMode })),
  setIsTechPackOpen: (isTechPackOpen) => set({ isTechPackOpen }),
  setIsRepositoriesOpen: (isRepositoriesOpen) => set({ isRepositoriesOpen }),
  setIsOrderSuccessOpen: (isOrderSuccessOpen) => set({ isOrderSuccessOpen }),

  uploadCustomGraphic: (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        const customBadge: GraphicBadge = {
          id: `custom-${Date.now()}`,
          name: file.name.substring(0, 16),
          url: result,
          category: 'Custom',
          description: 'User uploaded graphic badge',
        };
        set((state) => ({
          badges: [customBadge, ...state.badges],
          hoodieGraphic: result,
          activeGraphicId: customBadge.id,
        }));
      }
    };
    reader.readAsDataURL(file);
  },

  getBasePrice: () => 7999,
  getPuffAddonPrice: () => (get().finishType === 'puff' ? 500 : 0),
  getDistressAddonPrice: () => (get().distressLevel === 'slashed' ? 800 : 0),
  getTotalPrice: () => {
    return get().getBasePrice() + get().getPuffAddonPrice() + get().getDistressAddonPrice();
  },
}));

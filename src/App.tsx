import { useEffect, useState } from 'react';
import Scene from './components/canvas/Scene';
import SketchfabViewer from './components/canvas/SketchfabViewer';
import Header from './components/ui/Header';
import CameraDock from './components/ui/CameraDock';
import CustomizerDrawer from './components/ui/CustomizerDrawer';
import TechPackModal from './components/ui/TechPackModal';
import RepositoriesModal from './components/ui/RepositoriesModal';
import OrderSuccessModal from './components/ui/OrderSuccessModal';
import { useCustomizerStore } from './store/useCustomizerStore';

export default function App() {
  const { toggleZenMode, modelSource, setCustomModel } = useCustomizerStore();
  const [isDragOver, setIsDragOver] = useState(false);

  // Keyboard shortcut listener ('H' key toggles Zen / Cinema mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'h' || e.key === 'H') {
        toggleZenMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleZenMode]);

  // Drag and drop handler for custom .glb / .gltf files
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.glb') || file.name.endsWith('.gltf')) {
        setCustomModel(file);
      }
    }
  };

  return (
    <main
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative w-screen h-screen bg-[#0b0c10] overflow-hidden select-none"
    >
      {/* 3D WebGL Canvas Layer (Switches between Sketchfab Embed and Three.js Studio) */}
      <div className="absolute inset-0 z-0">
        {modelSource === 'SKETCHFAB_PACK' ? <SketchfabViewer /> : <Scene />}
      </div>

      {/* Top Header Navigation */}
      <Header />

      {/* ThreadLab Camera Preset Dock (Bottom Left - for Three.js studio) */}
      {modelSource !== 'SKETCHFAB_PACK' && <CameraDock />}

      {/* Studio Customizer HUD Drawer (Right Side) */}
      <CustomizerDrawer />

      {/* Production Tech Pack Specification Modal */}
      <TechPackModal />

      {/* Curated 3D Models Directory Modal */}
      <RepositoriesModal />

      {/* Order Confirmed Modal */}
      <OrderSuccessModal />

      {/* Drag & Drop Visual Overlay */}
      {isDragOver && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center border-4 border-dashed border-[#d4ff00] pointer-events-none">
          <div className="text-xl font-bold font-['Space_Grotesk'] text-[#d4ff00] mb-2">
            DROP .GLB / .GLTF 3D MODEL HERE
          </div>
          <div className="text-xs font-mono text-white/60">
            Instantly loads your custom 3D garment into the ThreadLab Atelier shader stage
          </div>
        </div>
      )}
    </main>
  );
}

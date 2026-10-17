import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  EyeOff, 
  Box, 
  Camera,
  Layers,
  Shirt,
  Sparkles
} from 'lucide-react';
import { useCustomizerStore } from '../../store/useCustomizerStore';
import { downloadFashionBundle } from '../../utils/bundleExporter';

export default function Header() {
  const { 
    displayMode, 
    setDisplayMode, 
    modelSource,
    setModelSource,
    zenMode, 
    toggleZenMode, 
    setIsTechPackOpen,
    setIsRepositoriesOpen 
  } = useCustomizerStore();

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadFashionBundle();
    } finally {
      setIsDownloading(false);
    }
  };

  const captureScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
      alert('Screenshot capture is available in the 3D Studio canvas mode.');
      return;
    }
    const link = document.createElement('a');
    link.download = `threadlab-streetwear-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (zenMode) {
    return (
      <div className="fixed top-4 left-4 z-50 transition-opacity duration-300">
        <button
          onClick={toggleZenMode}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white/70 hover:text-white backdrop-blur-md text-xs font-mono transition-all shadow-lg cursor-pointer"
          title="Exit Zen Mode (H)"
        >
          <Eye size={13} className="text-[#d4ff00]" />
          <span>EXIT CINEMA (H)</span>
        </button>
      </div>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-[#0A0A0C]/95 via-[#0A0A0C]/70 to-transparent backdrop-blur-[6px] pointer-events-none">
      {/* Brand & Edition Wordmark */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-[#d4ff00] rounded-[2px] animate-pulse" />
          <span className="font-extrabold tracking-[0.2em] text-white text-sm sm:text-base font-['Space_Grotesk']">
            THREADLAB
          </span>
          <span className="text-[#d4ff00] font-mono text-xs opacity-70">//</span>
          <span className="text-white/40 tracking-[0.15em] text-xs font-mono font-medium">
            ATELIER 480
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded border border-white/10 bg-white/[0.03] text-[11px] font-mono text-white/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>DROP 01 // 2026 EDITION</span>
        </div>
      </div>

      {/* 3D Model Mode Switcher (ThreadLab Segmented Controls) */}
      <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#12141a]/90 border border-white/10 backdrop-blur-md pointer-events-auto shadow-2xl">
        <button
          onClick={() => setModelSource('HOODIE_3D')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
            modelSource === 'HOODIE_3D'
              ? 'bg-[#d4ff00] text-black font-bold shadow-[0_0_12px_rgba(212,255,0,0.3)]'
              : 'text-white/60 hover:text-white'
          }`}
          title="3D Heavyweight Oversized Hoodie (.GLB)"
        >
          <Sparkles size={12} />
          <span>3D HOODIE</span>
        </button>

        <button
          onClick={() => setModelSource('TSHIRT_3D')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
            modelSource === 'TSHIRT_3D'
              ? 'bg-[#d4ff00] text-black font-bold shadow-[0_0_12px_rgba(212,255,0,0.3)]'
              : 'text-white/60 hover:text-white'
          }`}
          title="3D Oversized Streetwear T-Shirt (.GLB)"
        >
          <Shirt size={12} />
          <span>3D T-SHIRT</span>
        </button>

        <button
          onClick={() => setModelSource('PROCEDURAL_CO_ORD')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
            modelSource === 'PROCEDURAL_CO_ORD'
              ? 'bg-[#d4ff00] text-black font-bold shadow-[0_0_12px_rgba(212,255,0,0.3)]'
              : 'text-white/60 hover:text-white'
          }`}
          title="Full Co-ord with Baggy Carpenter Denim"
        >
          <Layers size={12} />
          <span>FULL CO-ORD</span>
        </button>

        <button
          onClick={() => setModelSource('SKETCHFAB_PACK')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
            modelSource === 'SKETCHFAB_PACK'
              ? 'bg-[#d4ff00] text-black font-bold shadow-[0_0_12px_rgba(212,255,0,0.3)]'
              : 'text-white/60 hover:text-white'
          }`}
          title="Sketchfab Tactical Clothing Pack (Marko1937)"
        >
          <Box size={12} />
          <span>SKETCHFAB PACK</span>
        </button>
      </div>

      {/* Action Tools */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Curated 3D Repositories Modal Launcher */}
        <button
          onClick={() => setIsRepositoriesOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-all cursor-pointer"
          title="Curated Free 3D Models Directory"
        >
          <Box size={13} className="text-[#d4ff00]" />
          <span>3D REPOS</span>
        </button>

        {/* Tech Pack Spec Sheet */}
        <button
          onClick={() => setIsTechPackOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-all cursor-pointer"
          title="Atelier Production Tech Pack"
        >
          <FileText size={13} className="text-[#d4ff00]" />
          <span className="hidden sm:inline">TECH PACK</span>
        </button>

        {/* Screenshot Camera */}
        <button
          onClick={captureScreenshot}
          className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 hover:text-white text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5"
          title="Save Studio Snapshot"
        >
          <Camera size={13} />
          <span className="hidden sm:inline">SNAP</span>
        </button>

        {/* Download Bundle ZIP */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d4ff00] hover:bg-[#b8de00] text-black font-semibold text-xs font-mono transition-all cursor-pointer shadow-[0_0_15px_rgba(212,255,0,0.25)]"
          title="Download Blueprint & Assets Bundle (.zip)"
        >
          <Download size={13} className={isDownloading ? 'animate-bounce' : ''} />
          <span className="hidden sm:inline">{isDownloading ? 'PACKING...' : 'BUNDLE.ZIP'}</span>
        </button>

        {/* Zen Cinema Toggle */}
        <button
          onClick={toggleZenMode}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/70 hover:text-white text-xs font-mono transition-all cursor-pointer"
          title="Toggle Zen Mode (H)"
        >
          <EyeOff size={14} />
        </button>
      </div>
    </header>
  );
}

import React, { useRef } from 'react';
import { ExternalLink, Download, Upload, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { useCustomizerStore } from '../../store/useCustomizerStore';

export default function SketchfabViewer() {
  const { setModelSource, setCustomModel, zenMode } = useCustomizerStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomModel(file);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#0a0c10] overflow-hidden">
      {/* Official Sketchfab Interactive 3D WebGL Embed */}
      <iframe
        title="Clothing Asset Pack by Marko1937"
        src="https://sketchfab.com/models/74d6c1687d764468a9a427732ca664ab/embed?autostart=1&internal=1&tracking=0&ui_ar=0&ui_infos=0&ui_snapshots=1&ui_stop=0&ui_theatre=1&ui_watermark=0"
        className="w-full h-full border-0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
      />

      {/* Floating Model Attribution & Actions (Hidden in Zen Mode) */}
      {!zenMode && (
        <div className="absolute top-20 left-6 z-30 max-w-md bg-[#0f1117]/85 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-2xl text-white font-mono pointer-events-auto">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-[#d4ff00] font-semibold">
                SKETCHFAB 3D ASSET PACK
              </span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/60">
              CC-BY 4.0
            </span>
          </div>

          <h3 className="text-base font-bold text-white font-['Space_Grotesk'] tracking-wide">
            Clothing Asset Pack
          </h3>
          <p className="text-[11px] text-white/50 mt-1 line-clamp-2">
            Tactical jackets, pants, balaclavas, and bags by creator <strong>Marko1937</strong> with 4K materials and realistic folds.
          </p>

          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10">
            {/* Direct Sketchfab Download Link */}
            <a
              href="https://sketchfab.com/3d-models/clothing-asset-pack-74d6c1687d764468a9a427732ca664ab#download"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs text-white transition-all cursor-pointer"
            >
              <Download size={13} className="text-[#d4ff00]" />
              <span>DOWNLOAD FILE</span>
              <ExternalLink size={10} className="text-white/40" />
            </a>

            {/* Load Downloaded .GLB directly into Atelier Shader Pipeline */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#d4ff00] hover:bg-[#b8de00] text-black font-semibold text-xs transition-all cursor-pointer shadow-[0_0_12px_rgba(212,255,0,0.2)]"
            >
              <Upload size={13} />
              <span>LOAD .GLB FILE</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".glb,.gltf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Switch back to Atelier 3D Customizer */}
          <button
            onClick={() => setModelSource('PROCEDURAL')}
            className="w-full mt-2 py-1.5 text-center text-[10px] text-white/50 hover:text-[#d4ff00] transition-colors cursor-pointer flex items-center justify-center gap-1"
          >
            <RefreshCw size={11} />
            <span>SWITCH TO ATELIER 480 HOODIE & JEANS STUDIO</span>
          </button>
        </div>
      )}
    </div>
  );
}

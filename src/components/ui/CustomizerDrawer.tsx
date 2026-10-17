import React, { useRef, useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Wind, 
  Sun, 
  Sliders, 
  Check, 
  Scissors,
  Layers,
  ShieldCheck,
  Palette
} from 'lucide-react';
import { 
  useCustomizerStore, 
  HOODIE_COLOR_PRESETS, 
  JEANS_WASH_PRESETS 
} from '../../store/useCustomizerStore';
import { StudioLightingPreset, FinishType } from '../../types/apparel';

export default function CustomizerDrawer() {
  const {
    hoodieColor,
    setHoodieColor,
    hoodieGraphic,
    setHoodieGraphic,
    activeGraphicId,
    graphicScale,
    setGraphicScale,
    finishType,
    setFinishType,
    jeansWash,
    setJeansWash,
    distressLevel,
    setDistressLevel,
    explodeFactor,
    setExplodeFactor,
    windRipple,
    setWindRipple,
    autoRotate,
    setAutoRotate,
    lightingPreset,
    setLightingPreset,
    showGhostMannequin,
    setShowGhostMannequin,
    badges,
    uploadCustomGraphic,
    getTotalPrice,
    getBasePrice,
    getPuffAddonPrice,
    getDistressAddonPrice,
    setIsOrderSuccessOpen,
    zenMode,
    modelSource,
    setModelSource,
  } = useCustomizerStore();

  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'HOODIE' | 'DENIM' | 'GRAPHICS' | 'EXPLODE' | 'STUDIO'>('HOODIE');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-switch to interactive 3D model if on Sketchfab embed
  const handleColorChange = (hex: string) => {
    setHoodieColor(hex);
    if (modelSource === 'SKETCHFAB_PACK') {
      setModelSource('HOODIE_3D');
    }
  };

  if (zenMode) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadCustomGraphic(file);
    }
  };

  const activeColorObj = HOODIE_COLOR_PRESETS.find((c) => c.hex.toLowerCase() === hoodieColor.toLowerCase()) || {
    name: 'Custom Atelier Dye',
    pantone: 'BESPOKE COLORWAY',
    desc: 'Custom formulation pigment',
  };

  return (
    <div
      className={`fixed top-18 bottom-6 right-6 z-30 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-[360px] sm:w-[410px]' : 'w-12'
      }`}
    >
      {/* Collapsed Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-[#12141a]/95 border border-white/10 text-white flex items-center justify-center hover:bg-[#181b22] hover:border-[#d4ff00]/40 transition-all shadow-2xl cursor-pointer"
          title="Open Customizer HUD"
        >
          <Sliders size={18} className="text-[#d4ff00]" />
        </button>
      )}

      {/* Main Studio Drawer Panel */}
      {isOpen && (
        <div className="w-full h-full flex flex-col bg-[#0f1117]/90 border border-white/10 rounded-2xl backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-start justify-between bg-white/[0.02]">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#d4ff00]/15 text-[#d4ff00] border border-[#d4ff00]/30 tracking-wider">
                  BESPOKE STUDIO
                </span>
                <span className="text-[11px] font-mono text-white/40">ARTISANAL CUT</span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-wide mt-1 font-['Space_Grotesk']">
                HEAVYWEIGHT CO-ORD
              </h2>
              <p className="text-[11px] text-white/50 font-mono">
                480 GSM French Terry & 14.5oz Selvedge Denim
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              title="Collapse Panel"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Section Tabs */}
          <div className="grid grid-cols-5 p-1 bg-black/40 border-b border-white/10 text-[10px] font-mono">
            <button
              onClick={() => setActiveTab('HOODIE')}
              className={`py-2 rounded-md transition-all cursor-pointer text-center ${
                activeTab === 'HOODIE' ? 'bg-[#1e222d] text-[#d4ff00] font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              HOODIE
            </button>
            <button
              onClick={() => setActiveTab('GRAPHICS')}
              className={`py-2 rounded-md transition-all cursor-pointer text-center ${
                activeTab === 'GRAPHICS' ? 'bg-[#1e222d] text-[#d4ff00] font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              DECAL
            </button>
            <button
              onClick={() => setActiveTab('DENIM')}
              className={`py-2 rounded-md transition-all cursor-pointer text-center ${
                activeTab === 'DENIM' ? 'bg-[#1e222d] text-[#d4ff00] font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              DENIM
            </button>
            <button
              onClick={() => setActiveTab('EXPLODE')}
              className={`py-2 rounded-md transition-all cursor-pointer text-center ${
                activeTab === 'EXPLODE' ? 'bg-[#1e222d] text-[#d4ff00] font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              EXPLODE
            </button>
            <button
              onClick={() => setActiveTab('STUDIO')}
              className={`py-2 rounded-md transition-all cursor-pointer text-center ${
                activeTab === 'STUDIO' ? 'bg-[#1e222d] text-[#d4ff00] font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              STUDIO
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* ──────────────────────────────────────────────────────── */}
            {/* TAB 1: HOODIE FABRIC & DYE                               */}
            {/* ──────────────────────────────────────────────────────── */}
            {activeTab === 'HOODIE' && (
              <div className="space-y-4">
                {/* Active 3D Model Selector Indicator */}
                <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
                    <span className="text-white/60 text-[10px]">3D CANVAS:</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setModelSource('HOODIE_3D')}
                      className={`px-2 py-0.5 rounded text-[10px] transition-all cursor-pointer ${
                        modelSource === 'HOODIE_3D'
                          ? 'bg-[#d4ff00] text-black font-bold'
                          : 'text-white/60 hover:text-white bg-white/5'
                      }`}
                    >
                      3D HOODIE
                    </button>
                    <button
                      onClick={() => setModelSource('TSHIRT_3D')}
                      className={`px-2 py-0.5 rounded text-[10px] transition-all cursor-pointer ${
                        modelSource === 'TSHIRT_3D'
                          ? 'bg-[#d4ff00] text-black font-bold'
                          : 'text-white/60 hover:text-white bg-white/5'
                      }`}
                    >
                      3D TEE
                    </button>
                    <button
                      onClick={() => setModelSource('PROCEDURAL_CO_ORD')}
                      className={`px-2 py-0.5 rounded text-[10px] transition-all cursor-pointer ${
                        modelSource === 'PROCEDURAL_CO_ORD'
                          ? 'bg-[#d4ff00] text-black font-bold'
                          : 'text-white/60 hover:text-white bg-white/5'
                      }`}
                    >
                      CO-ORD
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/70 mb-2">
                    <span>FABRIC DYE FORMULATION</span>
                    <span className="text-[#d4ff00] text-[11px]">{activeColorObj.pantone}</span>
                  </div>

                  {/* Circular Swatches */}
                  <div className="grid grid-cols-6 gap-2.5">
                    {HOODIE_COLOR_PRESETS.map((swatch) => {
                      const isSelected = hoodieColor.toLowerCase() === swatch.hex.toLowerCase();
                      return (
                        <button
                          key={swatch.name}
                          onClick={() => handleColorChange(swatch.hex)}
                          className={`group relative aspect-square rounded-full flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'ring-2 ring-[#d4ff00] ring-offset-2 ring-offset-[#0f1117] scale-105'
                              : 'hover:scale-105 border border-white/10'
                          }`}
                          style={{ backgroundColor: swatch.hex }}
                          title={`${swatch.name} — ${swatch.pantone}`}
                        >
                          {isSelected && <Check size={14} className={swatch.hex === '#E2DCD2' ? 'text-black' : 'text-[#d4ff00]'} />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-2.5 p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] font-mono">
                    <span className="text-white font-semibold">{activeColorObj.name}: </span>
                    <span className="text-white/50">{activeColorObj.desc}</span>
                  </div>
                </div>

                {/* Custom Color Input */}
                <div>
                  <label className="flex items-center justify-between text-xs font-mono text-white/70 mb-1.5">
                    <span>BESPOKE HEX CODE</span>
                    <span className="text-white/40">{hoodieColor.toUpperCase()}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={hoodieColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="w-9 h-9 rounded-lg border border-white/10 bg-transparent cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={hoodieColor.toUpperCase()}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-white tracking-widest focus:border-[#d4ff00] outline-none"
                    />
                  </div>
                </div>

                {/* French Terry Specifications Card */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-[11px] font-mono">
                  <div className="flex justify-between text-white/50">
                    <span>WEIGHT / GSM</span>
                    <span className="text-white">480 GSM (Extra Heavy)</span>
                  </div>
                  <div className="flex justify-between text-white/50">
                    <span>WEAVE</span>
                    <span className="text-white">3-End Diagonal Loopback</span>
                  </div>
                  <div className="flex justify-between text-white/50">
                    <span>SILHOUETTE</span>
                    <span className="text-white">Extreme Drop-Shoulder Boxy</span>
                  </div>
                </div>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────── */}
            {/* TAB 2: GRAPHICS & PUFF PRINT                             */}
            {/* ──────────────────────────────────────────────────────── */}
            {activeTab === 'GRAPHICS' && (
              <div className="space-y-4">
                {/* Finish Type (Flat vs Puff) */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/70 mb-2">
                    <span>PRINT FINISH TYPE</span>
                    <span className="text-[#d4ff00]">
                      {finishType === 'puff' ? '3D RELIEF (+₹500)' : 'FLAT SCREEN'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setFinishType('flat')}
                      className={`p-2.5 rounded-xl border text-xs font-mono text-left transition-all cursor-pointer ${
                        finishType === 'flat'
                          ? 'border-[#d4ff00] bg-[#d4ff00]/10 text-white font-semibold'
                          : 'border-white/10 bg-white/[0.02] text-white/60 hover:text-white'
                      }`}
                    >
                      <div className="font-bold">FLAT SCREEN</div>
                      <div className="text-[10px] text-white/40 mt-0.5">Zero hand-feel pigment</div>
                    </button>
                    <button
                      onClick={() => setFinishType('puff')}
                      className={`p-2.5 rounded-xl border text-xs font-mono text-left transition-all cursor-pointer relative overflow-hidden ${
                        finishType === 'puff'
                          ? 'border-[#d4ff00] bg-[#d4ff00]/10 text-white font-semibold'
                          : 'border-white/10 bg-white/[0.02] text-white/60 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>3D PUFF PRINT</span>
                        <span className="text-[10px] text-[#d4ff00]">+₹500</span>
                      </div>
                      <div className="text-[10px] text-white/40 mt-0.5">Raised rubberized foam</div>
                    </button>
                  </div>
                </div>

                {/* Graphic Decal Presets */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/70 mb-2">
                    <span>SELECT STREETWEAR MOTIF</span>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[#d4ff00] hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
                    >
                      <Upload size={12} />
                      <span>UPLOAD CUSTOM</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {badges.map((badge) => {
                      const isSelected = activeGraphicId === badge.id;
                      return (
                        <button
                          key={badge.id}
                          onClick={() => setHoodieGraphic(badge.url, badge.id)}
                          className={`p-2 rounded-xl border flex flex-col items-center gap-2 text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#d4ff00] bg-[#d4ff00]/10 shadow-[0_0_12px_rgba(212,255,0,0.15)]'
                              : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                          }`}
                        >
                          <div className="w-16 h-16 rounded-lg bg-black/60 p-1 flex items-center justify-center overflow-hidden border border-white/5">
                            <img
                              src={badge.url}
                              alt={badge.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <div>
                            <div className="text-[11px] font-mono text-white font-medium truncate max-w-[130px]">
                              {badge.name}
                            </div>
                            <div className="text-[9px] font-mono text-white/40">
                              {badge.category}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Graphic Scale Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/70 mb-1.5">
                    <span>DECAL SCALE</span>
                    <span className="text-white/50">{Math.round(graphicScale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.18"
                    max="0.65"
                    step="0.01"
                    value={graphicScale}
                    onChange={(e) => setGraphicScale(parseFloat(e.target.value))}
                    className="w-full h-1.5 rounded-lg bg-white/10 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────── */}
            {/* TAB 3: DENIM WASH & DISTRESS                             */}
            {/* ──────────────────────────────────────────────────────── */}
            {activeTab === 'DENIM' && (
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-mono text-white/70 mb-2">DENIM WASH & SHUTTLE WEAVE</div>
                  <div className="space-y-2">
                    {JEANS_WASH_PRESETS.map((preset) => {
                      const isSelected = jeansWash === preset.id;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => setJeansWash(preset.id)}
                          className={`w-full p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#d4ff00] bg-[#d4ff00]/10'
                              : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                          }`}
                        >
                          <div
                            className="w-8 h-8 rounded-full border border-white/20 shrink-0"
                            style={{ backgroundColor: preset.hex }}
                          />
                          <div className="flex-1">
                            <div className="text-xs font-mono font-bold text-white flex items-center justify-between">
                              <span>{preset.name}</span>
                              {isSelected && <Check size={14} className="text-[#d4ff00]" />}
                            </div>
                            <div className="text-[10px] font-mono text-white/40 mt-0.5">
                              {preset.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Distress Level (Clean vs Slashed) */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/70 mb-2">
                    <span>ATELIER DISTRESS TREATMENT</span>
                    <span className="text-[#d4ff00]">
                      {distressLevel === 'slashed' ? 'SLASHED (+₹800)' : 'CLEAN FINISH'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setDistressLevel('clean')}
                      className={`p-2.5 rounded-xl border text-xs font-mono text-left transition-all cursor-pointer ${
                        distressLevel === 'clean'
                          ? 'border-[#d4ff00] bg-[#d4ff00]/10 text-white font-semibold'
                          : 'border-white/10 bg-white/[0.02] text-white/60 hover:text-white'
                      }`}
                    >
                      <div className="font-bold">CLEAN RAW</div>
                      <div className="text-[10px] text-white/40 mt-0.5">Uncut selvedge</div>
                    </button>
                    <button
                      onClick={() => setDistressLevel('slashed')}
                      className={`p-2.5 rounded-xl border text-xs font-mono text-left transition-all cursor-pointer ${
                        distressLevel === 'slashed'
                          ? 'border-[#d4ff00] bg-[#d4ff00]/10 text-white font-semibold'
                          : 'border-white/10 bg-white/[0.02] text-white/60 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>SLASHED KNEES</span>
                        <span className="text-[10px] text-[#d4ff00]">+₹800</span>
                      </div>
                      <div className="text-[10px] text-white/40 mt-0.5">Frayed cotton fringe</div>
                    </button>
                  </div>
                </div>

                {/* Carpenter Denim Construction Notes */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-[11px] font-mono">
                  <div className="flex justify-between text-white/50">
                    <span>HARDWARE</span>
                    <span className="text-white">Solid Brass Coin Button & Rivets</span>
                  </div>
                  <div className="flex justify-between text-white/50">
                    <span>DETAILS</span>
                    <span className="text-white">Hammer Loop & Utility Tool Pocket</span>
                  </div>
                  <div className="flex justify-between text-white/50">
                    <span>HEM DRAWS</span>
                    <span className="text-white">Triple Accordion Ankle Stacking</span>
                  </div>
                </div>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────── */}
            {/* TAB 4: SARTORIAL EXPLODED VIEW                           */}
            {/* ──────────────────────────────────────────────────────── */}
            {activeTab === 'EXPLODE' && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/70 mb-2">
                    <span>SARTORIAL DECONSTRUCTION</span>
                    <span className="text-[#d4ff00]">{Math.round(explodeFactor * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={explodeFactor}
                    onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
                    className="w-full h-1.5 rounded-lg bg-white/10 cursor-pointer"
                  />
                  <p className="text-[10px] font-mono text-white/40 mt-1.5">
                    Drag the slider to deconstruct the hoodie and jeans in 3D space, demonstrating karigar cut layers.
                  </p>
                </div>

                {/* Sartorial Layer Breakdown */}
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] font-mono flex items-center justify-between">
                    <span className="text-white/80">01. Anatomical Hood Dome</span>
                    <span className="text-xs text-[#d4ff00]">Z-Offset +0.50</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] font-mono flex items-center justify-between">
                    <span className="text-white/80">02. Kangaroo Pouch Front</span>
                    <span className="text-xs text-[#d4ff00]">Y-Offset +0.40</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] font-mono flex items-center justify-between">
                    <span className="text-white/80">03. Drop Shoulder Sleeves</span>
                    <span className="text-xs text-[#d4ff00]">X-Offset ±0.45</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] font-mono flex items-center justify-between">
                    <span className="text-white/80">04. Carpenter Hammer Loop</span>
                    <span className="text-xs text-[#d4ff00]">Lateral ±0.35</span>
                  </div>
                </div>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────── */}
            {/* TAB 5: STUDIO & ENVIRONMENT                              */}
            {/* ──────────────────────────────────────────────────────── */}
            {activeTab === 'STUDIO' && (
              <div className="space-y-4">
                {/* Lighting Presets */}
                <div>
                  <div className="text-xs font-mono text-white/70 mb-2">STUDIO LIGHTING MOOD</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'CYBER_DARK', name: 'CYBER DARK' },
                      { id: 'MINIMAL_LOFT', name: 'MINIMAL LOFT' },
                      { id: 'HIGH_CONTRAST', name: 'HIGH CONTRAST' },
                      { id: 'GOLDEN_HOUR', name: 'GOLDEN HOUR' },
                    ].map((light) => {
                      const isSelected = lightingPreset === light.id;
                      return (
                        <button
                          key={light.id}
                          onClick={() => setLightingPreset(light.id as StudioLightingPreset)}
                          className={`p-2.5 rounded-xl border text-xs font-mono text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#d4ff00] bg-[#d4ff00]/10 text-white font-bold'
                              : 'border-white/10 bg-white/[0.02] text-white/60 hover:text-white'
                          }`}
                        >
                          {light.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Physics & Kinematics Toggles */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-white/70 mb-1">STAGE KINEMATICS</div>

                  {/* Wind Ripple */}
                  <button
                    onClick={() => setWindRipple(!windRipple)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between text-xs font-mono cursor-pointer hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-2 text-white">
                      <Wind size={14} className={windRipple ? 'text-[#d4ff00]' : 'text-white/40'} />
                      <span>Cloth Wave Kinematics</span>
                    </div>
                    <span className={`text-[11px] ${windRipple ? 'text-[#d4ff00]' : 'text-white/40'}`}>
                      {windRipple ? 'ACTIVE' : 'PAUSED'}
                    </span>
                  </button>

                  {/* Turntable Auto-Rotate */}
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between text-xs font-mono cursor-pointer hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-2 text-white">
                      <RotateCcw size={14} className={autoRotate ? 'text-[#d4ff00]' : 'text-white/40'} />
                      <span>Studio 360° Turntable</span>
                    </div>
                    <span className={`text-[11px] ${autoRotate ? 'text-[#d4ff00]' : 'text-white/40'}`}>
                      {autoRotate ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  {/* Ghost Mannequin Toggle */}
                  <button
                    onClick={() => setShowGhostMannequin(!showGhostMannequin)}
                    className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between text-xs font-mono cursor-pointer hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-2 text-white">
                      <ShieldCheck size={14} className={showGhostMannequin ? 'text-[#d4ff00]' : 'text-white/40'} />
                      <span>Ghost Mannequin Mount</span>
                    </div>
                    <span className={`text-[11px] ${showGhostMannequin ? 'text-[#d4ff00]' : 'text-white/40'}`}>
                      {showGhostMannequin ? 'VISIBLE' : 'HIDDEN'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Bottom Pricing & Checkout Bar */}
          <div className="p-4 border-t border-white/10 bg-[#0A0A0C]/95">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs font-mono text-white/50">TOTAL BESPOKE ESTIMATE</span>
              <div className="text-right">
                <span className="text-xl font-extrabold text-white font-mono tracking-tight">
                  ₹{getTotalPrice().toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-white/40 font-mono block">INCL. ALL TAXES & CRAFT</span>
              </div>
            </div>

            <button
              onClick={() => setIsOrderSuccessOpen(true)}
              className="w-full py-3 px-4 rounded-xl bg-[#d4ff00] hover:bg-[#bce400] active:scale-[0.99] text-black font-extrabold text-xs font-mono tracking-wider transition-all shadow-[0_0_20px_rgba(212,255,0,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>CONFIRM SPEC & ORDER</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

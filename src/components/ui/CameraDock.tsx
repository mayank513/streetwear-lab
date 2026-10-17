import React from 'react';
import { CameraViewPreset } from '../../types/apparel';
import { useCustomizerStore } from '../../store/useCustomizerStore';

const CAMERA_BUTTONS: { id: CameraViewPreset; label: string; num: string }[] = [
  { id: 'FULL_FIT', num: '01', label: 'FULL FIT' },
  { id: 'CHEST_MACRO', num: '02', label: 'CHEST MACRO' },
  { id: 'BACK_VIEW', num: '03', label: 'BACK SILHOUETTE' },
  { id: 'DENIM_STACKS', num: '04', label: 'DENIM STACKS' },
];

export default function CameraDock() {
  const { activeView, setActiveView, zenMode } = useCustomizerStore();

  if (zenMode) return null;

  return (
    <div className="fixed bottom-6 left-6 z-30 flex flex-col gap-3 pointer-events-none">
      {/* Subtle Editorial Watermark Badge */}
      <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 tracking-[0.2em] uppercase select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff00]/60" />
        <span>EDITION // 2026 DROP 01</span>
        <span>·</span>
        <span>ATELIER 480</span>
      </div>

      {/* Floating ThreadLab Camera Pill Dock */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#101217]/85 border border-white/10 backdrop-blur-xl shadow-2xl pointer-events-auto">
        {CAMERA_BUTTONS.map((btn) => {
          const isActive = activeView === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setActiveView(btn.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-white text-black font-semibold shadow-md scale-[1.02]'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              <span className={`text-[10px] ${isActive ? 'text-black/60' : 'text-[#d4ff00]'}`}>
                {btn.num}
              </span>
              <span>{btn.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

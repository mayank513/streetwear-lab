import { Check, X, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { useCustomizerStore, HOODIE_COLOR_PRESETS, JEANS_WASH_PRESETS } from '../../store/useCustomizerStore';

export default function OrderSuccessModal() {
  const {
    isOrderSuccessOpen,
    setIsOrderSuccessOpen,
    hoodieColor,
    finishType,
    jeansWash,
    distressLevel,
    getTotalPrice,
    getBasePrice,
    getPuffAddonPrice,
    getDistressAddonPrice,
    activeGraphicId,
    badges,
  } = useCustomizerStore();

  if (!isOrderSuccessOpen) return null;

  const activeColor = HOODIE_COLOR_PRESETS.find((c) => c.hex.toLowerCase() === hoodieColor.toLowerCase()) || {
    name: 'Bespoke Atelier Dye',
  };
  const activeWash = JEANS_WASH_PRESETS.find((w) => w.id === jeansWash) || JEANS_WASH_PRESETS[0];
  const activeBadge = badges.find((b) => b.id === activeGraphicId) || badges[0];

  const orderId = `TL-ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-lg bg-[#0d0f14] border border-[#d4ff00]/40 rounded-2xl shadow-[0_0_50px_rgba(212,255,0,0.15)] flex flex-col overflow-hidden text-white font-mono">
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-[#d4ff00]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d4ff00] text-black flex items-center justify-center font-bold">
              <Check size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-wide font-['Space_Grotesk'] text-white">
                BESPOKE SPEC CONFIRMED
              </h3>
              <p className="text-[11px] text-[#d4ff00]">ORDER #{orderId} TRANSMITTED TO ATELIER</p>
            </div>
          </div>
          <button
            onClick={() => setIsOrderSuccessOpen(false)}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex justify-between text-white/60">
              <span>HOODIE SPEC</span>
              <span className="text-white font-semibold">480 GSM ({activeColor.name})</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>GRAPHIC MOTIF</span>
              <span className="text-white font-semibold">{activeBadge.name} ({finishType.toUpperCase()})</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>JEANS SPEC</span>
              <span className="text-white font-semibold">14.5oz ({activeWash.name})</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>DISTRESS TREATMENT</span>
              <span className="text-white font-semibold">{distressLevel === 'slashed' ? 'Hand-Slashed Knees' : 'Clean'}</span>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-1.5 border-t border-white/10 pt-3">
            <div className="flex justify-between text-white/50">
              <span>Base Co-ord Package:</span>
              <span className="text-white">₹{getBasePrice().toLocaleString('en-IN')}</span>
            </div>
            {finishType === 'puff' && (
              <div className="flex justify-between text-[#d4ff00]">
                <span>+ 3D Rubber Puff Print:</span>
                <span>₹{getPuffAddonPrice().toLocaleString('en-IN')}</span>
              </div>
            )}
            {distressLevel === 'slashed' && (
              <div className="flex justify-between text-[#d4ff00]">
                <span>+ Hand Slashed Knees:</span>
                <span>₹{getDistressAddonPrice().toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold border-t border-white/10 pt-2 text-white">
              <span>Total Amount:</span>
              <span className="text-[#d4ff00]">₹{getTotalPrice().toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-white/60">
            <Clock size={16} className="text-[#d4ff00] shrink-0" />
            <span>Estimated handcrafting & karigar tailoring time: <strong>5-7 business days</strong>. Tracking number will be emailed.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] flex justify-end">
          <button
            onClick={() => setIsOrderSuccessOpen(false)}
            className="w-full py-2.5 rounded-xl bg-[#d4ff00] hover:bg-[#b8de00] text-black font-bold text-xs tracking-wider transition-all cursor-pointer"
          >
            RETURN TO 3D STUDIO
          </button>
        </div>
      </div>
    </div>
  );
}

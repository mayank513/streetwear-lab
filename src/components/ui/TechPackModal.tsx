import { X, Printer, Download, CheckCircle2 } from 'lucide-react';
import { useCustomizerStore, HOODIE_COLOR_PRESETS, JEANS_WASH_PRESETS } from '../../store/useCustomizerStore';

export default function TechPackModal() {
  const {
    isTechPackOpen,
    setIsTechPackOpen,
    hoodieColor,
    finishType,
    jeansWash,
    distressLevel,
    getTotalPrice,
    activeGraphicId,
    badges,
  } = useCustomizerStore();

  if (!isTechPackOpen) return null;

  const activeColor = HOODIE_COLOR_PRESETS.find((c) => c.hex.toLowerCase() === hoodieColor.toLowerCase()) || {
    name: 'Bespoke Atelier Dye',
    pantone: 'PANTONE BESPOKE',
  };

  const activeWash = JEANS_WASH_PRESETS.find((w) => w.id === jeansWash) || JEANS_WASH_PRESETS[0];
  const activeBadge = badges.find((b) => b.id === activeGraphicId) || badges[0];

  const handlePrint = () => {
    window.print();
  };

  const downloadJSONSpec = () => {
    const specData = {
      brand: 'THREADLAB // ATELIER 480',
      edition: 'DROP 01 // 2026',
      timestamp: new Date().toISOString(),
      hoodie: {
        item: 'Heavyweight Boxy Oversized Hoodie (480 GSM)',
        fabric: '100% Combed Ringspun French Terry Loopback Cotton',
        colorway: activeColor.name,
        pantone: activeColor.pantone,
        hex: hoodieColor,
        printFinish: finishType === 'puff' ? '3D High-Density Rubber Puff Print' : 'Flat Water-Based Discharge Screen',
        activeGraphic: activeBadge.name,
        measurementsCm: {
          chestWidth: 68,
          bodyLength: 72,
          dropShoulder: 64,
          sleeveLength: 56,
          hoodHeight: 38,
        },
      },
      jeans: {
        item: 'Wide-Leg Baggy Carpenter Denim Jeans (14.5 oz)',
        fabric: '14.5oz Japanese Kurabo Selvedge Shuttle Twill',
        wash: activeWash.name,
        distressing: distressLevel === 'slashed' ? 'Hand-Slashed Knee Cuts with Raw Frayed Cotton Fringe' : 'Pristine Clean Selvedge Finish',
        measurementsCm: {
          waist: 84,
          legOpening: 54,
          inseam: 82,
          outseam: 112,
        },
      },
      totalPriceINR: getTotalPrice(),
    };

    const blob = new Blob([JSON.stringify(specData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tech-pack-spec-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-3xl max-h-[90vh] bg-[#0d0f14] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white font-mono">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#d4ff00]" />
            <div>
              <h3 className="text-base font-bold tracking-wider font-['Space_Grotesk']">
                ATELIER PRODUCTION TECH PACK & SPEC SHEET
              </h3>
              <p className="text-[11px] text-white/40">
                THREADLAB // SPEC ID: TL-2026-DROP01-ORD480
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTechPackOpen(false)}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Top atelier meta bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
            <div>
              <span className="text-white/40 block text-[10px]">COLLECTION</span>
              <span className="font-bold text-white">EDITION 2026 DROP 01</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px]">GARMENT FIT</span>
              <span className="font-bold text-[#d4ff00]">OVERSIZED BOXY / STACKED</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px]">COMBINED WEIGHT</span>
              <span className="font-bold text-white">480 GSM + 14.5 OZ</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px]">TOTAL PRICE</span>
              <span className="font-bold text-[#d4ff00]">₹{getTotalPrice().toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Section 1: Heavyweight Hoodie Specs */}
          <div className="border border-white/10 rounded-xl p-4 bg-white/[0.01] space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-bold text-sm text-white">GARMENT 01: OVERSIZED BOXY HOODIE</span>
              <span className="text-[11px] text-[#d4ff00]">{activeColor.pantone}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-white/70">
                <p><strong className="text-white">Fabrication:</strong> 100% Combed Ringspun French Terry (Loopback reverse)</p>
                <p><strong className="text-white">Weight:</strong> 480 GSM Heavyweight Fleece</p>
                <p><strong className="text-white">Colorway:</strong> {activeColor.name} ({hoodieColor})</p>
                <p><strong className="text-white">Graphic Motif:</strong> {activeBadge.name}</p>
                <p><strong className="text-white">Print Execution:</strong> {finishType === 'puff' ? '3D Rubberized Puff Print (+₹500)' : 'Flat Screen Print'}</p>
              </div>

              {/* Measurements Table */}
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1 text-[11px]">
                <div className="font-bold text-white mb-1.5">3D Pattern Cut Dimensions (Size L):</div>
                <div className="flex justify-between text-white/50"><span>Chest Pit-to-Pit:</span><span className="text-white">68 cm</span></div>
                <div className="flex justify-between text-white/50"><span>Body Length:</span><span className="text-white">72 cm</span></div>
                <div className="flex justify-between text-white/50"><span>Drop Shoulder Seam:</span><span className="text-white">64 cm</span></div>
                <div className="flex justify-between text-white/50"><span>Sleeve Inseam:</span><span className="text-white">56 cm</span></div>
              </div>
            </div>
          </div>

          {/* Section 2: Carpenter Denim Specs */}
          <div className="border border-white/10 rounded-xl p-4 bg-white/[0.01] space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-bold text-sm text-white">GARMENT 02: WIDE-LEG CARPENTER DENIM</span>
              <span className="text-[11px] text-[#d4ff00]">{activeWash.name}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-white/70">
                <p><strong className="text-white">Denim Shuttle:</strong> 14.5oz Kurabo Selvedge Twill</p>
                <p><strong className="text-white">Wash Treatment:</strong> {activeWash.desc}</p>
                <p><strong className="text-white">Distressing:</strong> {distressLevel === 'slashed' ? 'Hand-Slashed Knee Cuts with Exposed Weft Fringe (+₹800)' : 'Clean Raw Uncut Finish'}</p>
                <p><strong className="text-white">Hardware:</strong> Embossed Solid Brass Fly Button & Double Rivets</p>
              </div>

              {/* Denim Measurements */}
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1 text-[11px]">
                <div className="font-bold text-white mb-1.5">Denim Pattern Dimensions:</div>
                <div className="flex justify-between text-white/50"><span>Waist Band:</span><span className="text-white">84 cm (32-34")</span></div>
                <div className="flex justify-between text-white/50"><span>Leg Opening (Hem):</span><span className="text-white">54 cm (Wide Baggy)</span></div>
                <div className="flex justify-between text-white/50"><span>Inseam Length:</span><span className="text-white">82 cm</span></div>
                <div className="flex justify-between text-white/50"><span>Outseam Length:</span><span className="text-white">112 cm (Stacked Folds)</span></div>
              </div>
            </div>
          </div>

          {/* Section 3: Karigar / Tailoring Sewing Notes */}
          <div className="p-4 rounded-xl bg-[#d4ff00]/5 border border-[#d4ff00]/20 space-y-2 text-[11px]">
            <span className="font-bold text-[#d4ff00] block">MASTER KARIGAR / ATELIER SEWING INSTRUCTIONS:</span>
            <ul className="list-disc pl-4 space-y-1 text-white/70">
              <li>Reinforce front kangaroo pouch edges with bar-tack stitching at stress points.</li>
              <li>Dual drawstring brass eyelets must be centered 3.5cm from hood rim collar seam.</li>
              <li>Denim carpenter hammer loop reinforced with triple-stitched bar-tacks and solid brass coin rivets.</li>
              <li>Pre-shrunk cold water wash applied prior to final puff-print screen cure.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
          <div className="text-[11px] text-white/40">
            PRINT-READY DIGITAL PRODUCTION DOCUMENT
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={downloadJSONSpec}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs cursor-pointer"
            >
              <Download size={14} />
              <span>EXPORT JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#d4ff00] hover:bg-[#b8de00] text-black font-bold text-xs cursor-pointer"
            >
              <Printer size={14} />
              <span>PRINT TECH PACK</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

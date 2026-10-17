import { X, ExternalLink, Download, Sparkles, FolderDown } from 'lucide-react';
import { useCustomizerStore } from '../../store/useCustomizerStore';

const FREE_REPOSITORIES = [
  {
    name: 'Sketchfab (Free CC-BY 3D Streetwear)',
    category: 'Hoodies & Baggy Cargo',
    desc: 'Filter for downloadable .gltf / .glb models with PBR textures and rigging.',
    url: 'https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount&q=oversized+hoodie',
    tags: ['GLTF', 'GLB', 'PBR Fabrics', 'CC-BY License'],
  },
  {
    name: 'Sketchfab (Baggy Jeans & Skater Denim)',
    category: 'Skater Denim & Cargo',
    desc: 'Wide-leg baggy jeans with stacked ankle folds and carpenter straps.',
    url: 'https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount&q=baggy+jeans',
    tags: ['Denim Twill', 'CC0 / CC-BY', 'Ready-to-use'],
  },
  {
    name: 'Poly Pizza',
    category: 'Low-Poly / Stylized Streetwear',
    desc: 'Completely free, unencumbered CC0 public domain 3D sneakers, caps, and jackets.',
    url: 'https://poly.pizza/',
    tags: ['Public Domain', 'CC0', 'Instant GLTF'],
  },
  {
    name: 'Ready Player Me Developer Assets',
    category: 'Standard Rigged Apparel',
    desc: 'Direct developer access to rigged modular streetwear garments and avatar fits.',
    url: 'https://readyplayer.me/',
    tags: ['Rigged', 'Modular', 'Avatar Ready'],
  },
  {
    name: 'Kenney 3D & OpenGameArt',
    category: 'Mannequins & Pedestals',
    desc: 'Clean mid-poly mannequin busts, studio display plinths, and clothing bases.',
    url: 'https://kenney.nl/assets/category:3D',
    tags: ['CC0', 'Mannequins', 'Pedestals'],
  },
  {
    name: 'Khronos glTF Sample Assets',
    category: 'Reference PBR Sheen & Clearcoat',
    desc: 'Official glTF 2.0 reference clothing demonstrating realistic fabric sheen.',
    url: 'https://github.com/KhronosGroup/glTF-Sample-Assets',
    tags: ['Khronos', 'Sheen Spec', 'PBR Reference'],
  },
];

export default function RepositoriesModal() {
  const { isRepositoriesOpen, setIsRepositoriesOpen } = useCustomizerStore();

  if (!isRepositoriesOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl max-h-[85vh] bg-[#0d0f14] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white font-mono">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#d4ff00]" />
            <div>
              <h3 className="text-base font-bold tracking-wider font-['Space_Grotesk']">
                CURATED FREE 3D MODELS DIRECTORY
              </h3>
              <p className="text-[11px] text-white/40">
                Direct sources for downloadable CC-BY & CC0 .GLB / .GLTF 3D streetwear assets
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsRepositoriesOpen(false)}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="p-3 rounded-xl bg-[#d4ff00]/10 border border-[#d4ff00]/20 text-xs text-white/80">
            <span className="font-bold text-[#d4ff00] block mb-1">PRO-TIP: HOW TO USE CUSTOM 3D MODELS</span>
            Download any <code className="bg-black/50 px-1.5 py-0.5 rounded text-[#d4ff00]">.glb</code> or <code className="bg-black/50 px-1.5 py-0.5 rounded text-[#d4ff00]">.gltf</code> model and place it into <code className="bg-black/50 px-1.5 py-0.5 rounded text-[#d4ff00]">/public/models/outfit.glb</code>. The app automatically detects and maps node meshes!
          </div>

          <div className="space-y-3">
            {FREE_REPOSITORIES.map((repo, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">{repo.name}</span>
                    <span className="text-[10px] text-[#d4ff00] bg-[#d4ff00]/10 px-1.5 py-0.5 rounded">
                      {repo.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50">{repo.desc}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {repo.tags.map((t, i) => (
                      <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] text-white/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#d4ff00] hover:text-black text-white/80 text-xs font-mono transition-colors"
                >
                  <span>BROWSE</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] flex justify-end">
          <button
            onClick={() => setIsRepositoriesOpen(false)}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

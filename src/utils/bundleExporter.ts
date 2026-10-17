import JSZip from 'jszip';

export async function downloadFashionBundle() {
  const zip = new JSZip();

  // 1. Architectural blueprint markdown
  const blueprintMD = `# THREADLAB // ATELIER 480: Gen-Z 3D Fashion Platform Blueprint
Architectural reference, PBR shader configurations, and 3D garment pipeline for Oversized Boxy Hoodie and Baggy Carpenter Denim.

## Specifications:
- Garments: 480 GSM Heavyweight French Terry Loopback & 14.5oz Raw Selvedge Shuttle Twill
- Silhouette: Extreme drop shoulder boxy crop & wide-leg skate carpenter stacking
- Kinematics: Real-time vertex cloth wave ripple & exploded sartorial assembly breakdown
- Tech Stack: Three.js r170+, React 19, R3F, Zustand, Tailwind CSS v4
`;
  zip.file('ATELIER_BLUEPRINT.md', blueprintMD);

  // 2. Sample Tech Pack Manifest JSON
  const sampleTechPack = {
    brand: 'THREADLAB // ATELIER 480',
    collection: 'EDITION // 2026 DROP 01',
    garments: [
      {
        item: 'Heavyweight Boxy Oversized Hoodie',
        code: 'TL-HD-480-BLK',
        fabric: '100% Combed Ringspun French Terry Loopback Cotton',
        gsm: 480,
        pantone: 'PANTONE 19-4004 TCX (Washed Onyx)',
        measurements: {
          chestWidthCm: 68,
          bodyLengthCm: 72,
          sleeveInseamCm: 56,
          dropShoulderCm: 64,
          hoodHeightCm: 38
        },
        constructionNotes: 'Double needle cover-stitch seams, self-fabric 2x2 ribbing at hem and cuffs, brass aglets and grommets'
      },
      {
        item: 'Wide-Leg Baggy Carpenter Denim Jeans',
        code: 'TL-JN-145-ACID',
        fabric: '14.5oz Japanese Kurabo Loom Selvedge Denim',
        wash: 'Acid Tumbled Stone Bleach',
        measurements: {
          waistCm: 84,
          legOpeningCm: 54,
          inseamCm: 82,
          outseamCm: 112
        },
        constructionNotes: 'Embossed heavy brass coin button, reinforced carpenter hammer loop, double-needle utility tool pocket'
      }
    ]
  };
  zip.file('sample_tech_pack.json', JSON.stringify(sampleTechPack, null, 2));

  // 3. Free 3D Models Directory
  const modelsDirectoryMD = `# Curated Free 3D Streetwear Models Directory

1. Sketchfab (CC-BY / CC0 Free Downloads):
   - Oversized Hoodies: https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount&q=oversized+hoodie
   - Baggy Jeans: https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount&q=baggy+jeans

2. Poly Pizza (Public Domain CC0 Streetwear):
   - https://poly.pizza/

3. Ready Player Me Developer Outfits:
   - https://readyplayer.me/

4. Kenney 3D Mannequins:
   - https://kenney.nl/assets/category:3D
`;
  zip.file('FREE_3D_MODELS_DIRECTORY.md', modelsDirectoryMD);

  // Generate ZIP and trigger browser download
  const content = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = 'antigravity_3d_fashion_bundle.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}

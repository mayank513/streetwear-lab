# Gen-Z 3D Fashion Platform: Oversized Hoodie & Baggy Jeans Studio

A comprehensive architectural blueprint, procedural 3D garment pipeline, and implementation reference for building an interactive Gen-Z streetwear clothing configurator inspired by ThreadLab on Antigravity IDE.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The implementation plan incorporates both **Free Downloadable 3D Model Repositories (GLTF/GLB)** and a **Zero-Dependency Procedural 3D Garment Engine**, allowing you to build and preview the garments immediately without waiting for custom 3D scans or external asset hosting.

- **Target Garments**: Heavyweight Boxy Oversized Hoodie (480 GSM) and Wide-Leg Baggy Carpenter/Skater Denim Jeans.
- **Aesthetic Direction**: Minimalist Luxury Gen-Z / Cyber-Streetwear (Clean neutral stone canvas, brutalist typography, tactile loopback fleece, vintage acid wash, and raised puff print screen graphics).
- **Environment & IDE**: Antigravity IDE (Vite + React 19 + Three.js r160+ + Tailwind CSS v4).
- **Downloadable Package**: Pre-bundled `.zip` file containing this entire technical blueprint, asset manifests, and starter code ready for download.

---

### 1. Overview & Core Concept

- **What It Does**: A real-time 3D digital sartorial platform where users can inspect, customize, and configure bespoke streetwear garments in a 360° interactive studio with cloth wave animation, exploded sartorial layer breakdown, wash/fabric switches, and custom puff-print decal placement.
- **Target Audience / Persona**: Gen-Z fashion enthusiasts, independent streetwear labels, custom apparel brands, and 3D web designers building next-generation digital ateliers.
- **Key Value**: Delivers the fluid interactive feel of Dribbble's *ThreadLab* fashion visualizer directly in the browser with physical materials, accurate garment silhouettes, zero render stalls, and direct exportable production tech packs.

---

### 2. User Experience & Visual Design

#### A. Key User Flows
1. **Interactive 3D Viewport**: Full-immersion 3D stage featuring the configured garment mounted on a studio mannequin bust or invisible ghost silhouette with smooth orbit damping.
2. **Collapsible Bottom Dock (ThreadLab UX)**: All configuration tabs (Garment Silhouette, Wash & Color, Graphic Decals, Fit & Drape, 3D Kinematics) are unified into a floating bottom dock with a one-click Zen / Cinema mode toggle (`▾ Hide Dock`).
3. **Exploded Sartorial Decomposition**: Users drag an explosion slider to see the garment break apart in 3D space (Hood, Interlining, Kangaroo Pouch, Sleeves, Carpenter Loops, Rivets) demonstrating tailoring craft.
4. **Interactive Fabric & Wash Studio**: Seamless real-time switching between Vintage Washed Denim, Raw Indigo, Heavyweight 480GSM French Terry Fleece, Acid Bleached, and Sun-Faded Pigment Dyed Cotton.
5. **Decal / Puff-Print Customizer**: Apply Y2K chrome stars, cyber-tribal motifs, or brutalist vector typography directly onto the chest, back, and denim pockets with physical tactile puff relief.
6. **Bespoke Tech Pack & Spec Export**: Generate a printable/downloadable garment specification sheet with 3D measurements, fabric codes, and karigar/tailoring cut notes.

#### B. Visual Identity & Theme
- **Color Palette (60-30-10 Rule)**:
  - *Dominant Neutral Canvas (60%)*: Deep obsidian and graphite `#0b0c10` / `#12141a`.
  - *Structural Surfaces (30%)*: Subdued card backgrounds and hairline borders (`border border-white/10`).
  - *Disciplined Accent (10%)*: Acid volt `#d4ff00`, chrome silver `#e5e7eb`, or raw brass `#d4af37`.
- **Typography**:
  - *Display / Brand*: `Plus Jakarta Sans` (Heavy 700/800) or `Outfit` with wide letter-spacing (`tracking-[0.15em]`).
  - *Body / Technical Data*: `Plus Jakarta Sans` paired with tabular figures (`font-mono tabular-nums`).
- **Zero-Pill Discipline**: Metadata displayed as clean unboxed text separated by subtle bullets (`·`); interactive tabs styled as segmented toggles without candy pill badges.

---

### 3. Key Product Decisions & Trade-Offs

- **Hybrid 3D Pipeline (Procedural + External GLTF Loader)**:
  - *Chosen Approach*: Implement a procedural 3D model generator using Three.js built-in geometries (`ExtrudeGeometry`, `CylinderGeometry`, `TorusGeometry`, `TubeGeometry`) alongside a drag-and-drop `GLTFLoader` hook.
  - *Why*: Procedural generation works instantly with zero external network dependencies and 0% risk of 404 broken asset links, while the loader allows designers to import their own Marvelous Designer / CLO3D exports whenever ready.
- **Physical PBR Rendering with RoomEnvironment**:
  - *Chosen Approach*: Generate procedural studio environment reflections using `PMREMGenerator` and `RoomEnvironment` with ACESFilmic tone mapping.
  - *Why*: Brushed denim twill, metallic rivets, and heavy cotton fleece require physical reflections to look rich and tactile rather than flat or plastic.
- **Collapsible Bottom Dock Layout**:
  - *Chosen Approach*: Pin all controls to a unified bottom dock (`max-w-4xl`, centered, `bottom: 20px`) with zero mid-screen floating cards.
  - *Why*: Ensures the central 3D viewport remains 100% unobstructed for camera orbiting, mobile gestures, and screenshot capture.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                         Antigravity IDE Shell                          │
├────────────────────────────────────────────────────────────────────────┤
│  Top Navigation (Brand Wordmark · Nav Links · Download Plan Zip CTA)   │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│                      Three.js WebGL Viewport                           │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  - Camera: PerspectiveCamera with smooth exponential damping     │  │
│  │  - Lights: Warm Directional Key + Cool Rim Light + Ground Shadow │  │
│  │  - Environment: PMREMGenerator + RoomEnvironment                │  │
│  │  - Models: Oversized 480GSM Hoodie & Baggy Skate Carpenter Denim  │  │
│  │  - Dynamic Vertex Wind Ripple & Exploded Sartorial Kinematics    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│               [ ▾ Zen Mode / Cinema Toggle (H key) ]                   │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                Sartorial Bottom Dock (Tabs)                      │  │
│  │  [Silhouette] [Fabric & Wash] [Decals] [Fit & Drape] [3D Studio] │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

#### A. Procedural Three.js Garment Blueprint
- **Oversized Boxy Hoodie**:
  - Drop-shoulder torso assembled with `CylinderGeometry` modified with radial tapering and flared hem.
  - Anatomical hood constructed via `TorusGeometry` arc and hemisphere cap with extruded face opening.
  - Front kangaroo pouch with beveled perimeter and subtle drop shadow offset (`+0.005 Z`).
  - Tubular drawstrings generated with `CatmullRomCurve3` and `TubeGeometry` with metallic brass aglets.
  - Tactile 480 GSM French Terry procedural normal map (`CanvasTexture` with alternating knitted loops).
- **Baggy Carpenter Denim**:
  - Wide straight leg geometry with generous ankle stacking folds.
  - High-waist band with belt loops, fly placket, and embossed brass coin button.
  - Lateral utility carpenter strap and angled workwear front pockets.
  - Procedural 3x1 twill weave normal map with dual-color acid wash gradient.

#### B. Shaders & Material Specs
```typescript
// Heavyweight French Terry Cotton (480 GSM)
const hoodieMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color(config.color),
  roughness: 0.78,
  metalness: 0.02,
  sheen: 0.6,
  sheenRoughness: 0.5,
  sheenColor: new THREE.Color(0xffffff),
  bumpMap: fleeceBumpTexture,
  bumpScale: 0.015,
});

// Washed Carpenter Denim (14.5 oz)
const denimMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color(config.denimWash),
  roughness: 0.62,
  metalness: 0.05,
  bumpMap: denimTwillTexture,
  bumpScale: 0.02,
});
```

---

### 5. Curated Free 3D Models Directory (Direct Repositories & Download Sources)

For developers who want ready-made `.glb` / `.gltf` 3D fashion models to drop directly into Three.js:

1. **Sketchfab (Free Downloadable with CC-BY / CC0 License)**:
   - *Oversized Hoodies*: Search filtered for free downloadable `.gltf` / `.glb` files:  
     `https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount&q=oversized+hoodie`
   - *Baggy Jeans & Streetwear Cargo*:  
     `https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount&q=baggy+jeans`
   - *Tip*: Look for models tagged with "Rigged" or "PBR" for instant animation support.

2. **Poly Pizza (Public Domain CC0 Streetwear Assets)**:
   - `https://poly.pizza/`
   - Completely free, unencumbered 3D models of sneakers, caps, accessories, and stylized apparel.

3. **Ready Player Me Developer Assets**:
   - `https://readyplayer.me/`
   - Direct access to standardized `.glb` rigged streetwear models including oversized hoodies and baggy cargo pants.

4. **Kenney 3D & OpenGameArt**:
   - `https://kenney.nl/assets/category:3D`
   - Clean low/mid-poly mannequins, studio pedestals, and clothing bases.

5. **CGTrader & TurboSquid (Free Filter)**:
   - `https://www.cgtrader.com/free-3d-models/clothing`
   - `https://www.turbosquid.com/Search/3D-Models/free/clothing`
   - Filter by format: `glTF` or `FBX` (which can be converted to `.glb` using Blender).

6. **Khronos glTF Sample Models**:
   - `https://github.com/KhronosGroup/glTF-Sample-Assets`
   - Official reference glTF 2.0 assets showcasing PBR sheen, clearcoat, and anisotropy.

---

### 6. Antigravity IDE Implementation Checklist & Download Bundle

- [x] **Downloadable ZIP Bundle**: Available at `/antigravity_3d_fashion_bundle.zip` (contains full markdown guide, asset directory JSON manifest, and Three.js studio starter snippet).
- [x] **Step 1: Scaffolding**: Setup Vite + React + Three.js (`npm install three @types/three lucide-react motion jszip`).
- [x] **Step 2: Studio Scene**: Initialize WebGLRenderer with `ACESFilmicToneMapping` and `RoomEnvironment`.
- [x] **Step 3: Procedural Models**: Implement 8-part Oversized Hoodie and 6-part Baggy Denim meshes.
- [x] **Step 4: Kinematics**: Add cloth wind displacement and exploded view slider transitions.
- [x] **Step 5: Bottom Dock**: Build collapsible ThreadLab-style control dock with zero viewport occlusion.
- [x] **Step 6: Tech Pack Export**: Enable instant digital tech pack generation for atelier production.

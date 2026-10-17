# THREADLAB // ATELIER 480 — Gen-Z 3D Streetwear Studio

An editorial 3D streetwear clothing configurator and bespoke atelier platform inspired by Phenomenon Studio's *ThreadLab*. Dedicated to heavyweight boxy oversized hoodies (480 GSM) and wide-leg baggy carpenter/skater selvedge denim.

![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19.0-blue.svg)
![Three.js](https://img.shields.io/badge/Three.js-r173-black.svg)
![Tailwind](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8.svg)

---

## ⚡ Key Highlights & Features

- **Hybrid 3D Garment Architecture**:
  - **Zero-Dependency Procedural 3D Garment Engine**: 8-part Anatomical Oversized Boxy Hoodie (480 GSM) and 6-part Baggy Carpenter Denim (14.5 oz) with French Terry loopback & 3x1 twill procedural normal bump maps.
  - **Sketchfab Asset Pack Integration**: Direct 3D inspection of creator Marko1937's 4K tactical clothing pack (jackets, pants, bags).
  - **Custom `.glb` / `.gltf` Drag & Drop**: Non-destructive node traversal and material mapping for Marvelous Designer / CLO3D exports.
- **3D Raised Puff Print `<Decal />`**: Tactile rubberized foam finish with procedural surface relief and custom image file upload.
- **Dynamic ThreadLab Camera Rig**: Smooth exponential lerp interpolation between editorial angles:
  - `01. FULL FIT`
  - `02. CHEST MACRO`
  - `03. BACK SILHOUETTE`
  - `04. DENIM STACKS`
- **Sartorial Deconstruction Slider**: 0% to 100% exploded assembly slider displaying internal karigar cut layers.
- **Editorial Customizer HUD**:
  - Colorway swatches & bespoke HEX dye formulation.
  - Washes: Acid Black, 14.5oz Raw Selvedge Indigo, Dirty Sun Bleach.
  - Distress treatments: Clean raw finish vs Hand-slashed knees with exposed fringe (+₹800).
  - Real-time dynamic INR price calculator (₹7,999 base + addons).
- **Production Tech Pack Generator**: Complete pattern cut dimensions, Karigar tailoring notes, and printable / JSON specification export.
- **In-Browser Bundle ZIP Exporter**: Downloads full project blueprint, 3D directory manifest, and sample tech pack.
- **Zen / Cinema Mode (`H` key)**: One-click full-screen unobstructed 3D stage view.

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **3D Graphics**: Three.js (r173) + `@react-three/fiber` + `@react-three/drei`
- **State Management**: Zustand
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Packaging**: JSZip

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/mayank513/streetwear-lab.git
cd streetwear-lab
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build Production Bundle
```bash
npm run build
```

---

## 📄 License
MIT License. Created for the Gen-Z Streetwear & 3D Fashion Atelier community.

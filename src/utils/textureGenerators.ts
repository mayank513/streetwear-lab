import * as THREE from 'three';

// Procedural SVG graphics converted to data URLs for reliable zero-asset loading
export const GRAPHIC_PRESETS = [
  {
    id: 'cyber-star',
    name: 'Y2K Cyber Star',
    category: 'Cyber' as const,
    description: 'Brushed chrome 4-point star with celestial crosshair ring',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
        <defs>
          <linearGradient id="chrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="45%" stop-color="#cccccc"/>
            <stop offset="50%" stop-color="#111111"/>
            <stop offset="55%" stop-color="#e5e7eb"/>
            <stop offset="100%" stop-color="#999999"/>
          </linearGradient>
          <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#d4ff00"/>
            <stop offset="100%" stop-color="#ffffff"/>
          </linearGradient>
        </defs>
        <circle cx="256" cy="256" r="230" fill="none" stroke="url(#chrome)" stroke-width="3" stroke-dasharray="12 12"/>
        <circle cx="256" cy="256" r="160" fill="none" stroke="#d4ff00" stroke-width="1.5" opacity="0.6"/>
        <line x1="256" y1="20" x2="256" y2="492" stroke="url(#chrome)" stroke-width="2"/>
        <line x1="20" y1="256" x2="492" y2="256" stroke="url(#chrome)" stroke-width="2"/>
        <!-- 4-point flared star -->
        <path d="M256,40 Q256,220 74,256 Q256,292 256,472 Q256,292 438,256 Q256,220 256,40 Z" fill="url(#chrome)" stroke="#d4ff00" stroke-width="3"/>
        <circle cx="256" cy="256" r="28" fill="#12141a" stroke="url(#neon)" stroke-width="4"/>
        <circle cx="256" cy="256" r="10" fill="#d4ff00"/>
      </svg>
    `)}`
  },
  {
    id: 'brutalist-paradox',
    name: 'PARADOX // 480 GSM',
    category: 'Brutalist' as const,
    description: 'Atelier industrial typography with tech coordinates and spec matrix',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300" width="600" height="300">
        <rect width="600" height="300" fill="#0c0d12" rx="12" stroke="#d4ff00" stroke-width="4"/>
        <text x="30" y="70" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="44" fill="#ffffff" letter-spacing="4">PARADOX</text>
        <text x="30" y="115" font-family="'JetBrains Mono', monospace" font-size="20" fill="#d4ff00" letter-spacing="2">ATELIER ARCHIVE // 480 GSM</text>
        <line x1="30" y1="135" x2="570" y2="135" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <!-- Barcode lines -->
        <g fill="#ffffff">
          <rect x="30" y="155" width="4" height="65"/>
          <rect x="38" y="155" width="8" height="65"/>
          <rect x="52" y="155" width="3" height="65"/>
          <rect x="60" y="155" width="12" height="65"/>
          <rect x="78" y="155" width="4" height="65"/>
          <rect x="88" y="155" width="6" height="65"/>
          <rect x="100" y="155" width="2" height="65"/>
          <rect x="108" y="155" width="10" height="65"/>
          <rect x="124" y="155" width="5" height="65"/>
          <rect x="135" y="155" width="8" height="65"/>
          <rect x="149" y="155" width="3" height="65"/>
          <rect x="158" y="155" width="12" height="65"/>
          <rect x="176" y="155" width="6" height="65"/>
          <rect x="188" y="155" width="4" height="65"/>
          <rect x="198" y="155" width="14" height="65"/>
          <rect x="218" y="155" width="4" height="65"/>
        </g>
        <text x="30" y="245" font-family="'JetBrains Mono', monospace" font-size="13" fill="#888899">SPEC: FR-TERRY-480 / BOX-CUT</text>
        <text x="440" y="245" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="16" fill="#d4ff00">DROP 01 // 2026</text>
      </svg>
    `)}`
  },
  {
    id: 'cyber-tribal',
    name: 'Cyber Barb Cross',
    category: 'Gothic' as const,
    description: 'Y2K cybernetic tribal cross with chrome chrome sheen',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
        <defs>
          <radialGradient id="tribalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="70%" stop-color="#d4ff00"/>
            <stop offset="100%" stop-color="#222222"/>
          </radialGradient>
        </defs>
        <!-- Tribal center spike -->
        <path d="M256 30 L275 180 L420 180 L295 240 L350 400 L256 290 L162 400 L217 240 L92 180 L237 180 Z" fill="url(#tribalGlow)" stroke="#0c0d12" stroke-width="4"/>
        <path d="M256 120 L265 210 L350 210 L280 250 L310 330 L256 270 L202 330 L232 250 L162 210 L247 210 Z" fill="#0e1017"/>
        <circle cx="256" cy="245" r="14" fill="#d4ff00"/>
      </svg>
    `)}`
  },
  {
    id: 'acid-biohazard',
    name: 'Acid Biohazard Symbol',
    category: 'Industrial' as const,
    description: 'Nuclear acid volt graphic badge',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
        <circle cx="256" cy="256" r="240" fill="#000000" stroke="#d4ff00" stroke-width="10"/>
        <circle cx="256" cy="256" r="220" fill="none" stroke="#d4ff00" stroke-width="2" stroke-dasharray="6 6"/>
        <path d="M256 120 A80 80 0 0 0 176 200 A80 80 0 0 0 256 280 A80 80 0 0 0 336 200 A80 80 0 0 0 256 120 Z" fill="none" stroke="#d4ff00" stroke-width="22"/>
        <circle cx="256" cy="256" r="32" fill="#d4ff00"/>
        <text x="256" y="440" font-family="'JetBrains Mono', monospace" font-size="30" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="6">TOXIC // 480GSM</text>
      </svg>
    `)}`
  }
];

// Generates procedural normal/bump canvas texture for 480 GSM French Terry Loopback Cotton
export function createFleeceTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 512, 512);

    // Render loop rows
    for (let y = 0; y < 512; y += 4) {
      for (let x = 0; x < 512; x += 4) {
        const jitter = (Math.random() - 0.5) * 35;
        const shade = Math.floor(128 + jitter);
        ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
        ctx.beginPath();
        ctx.arc(x + 2, y + 2, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(16, 16);
  return texture;
}

// Generates procedural normal/bump canvas texture for 3x1 Twill Selvedge Denim (14.5 oz)
export function createDenimTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 512, 512);

    // Diagonal twill ribs
    for (let i = -512; i < 1024; i += 5) {
      ctx.strokeStyle = (i % 10 === 0) ? 'rgba(210,210,210,0.45)' : 'rgba(70,70,70,0.45)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 512, 512);
      ctx.stroke();
    }

    // Salt-and-pepper stone wash noise
    const imgData = ctx.getImageData(0, 0, 512, 512);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 28;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }
    ctx.putImageData(imgData, 0, 0);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 12);
  return texture;
}

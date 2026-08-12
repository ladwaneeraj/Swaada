/**
 * Generates art-directed SVG placeholder images for every image
 * slot in src/data/swaada.ts. These are deliberate botanical
 * compositions in the site palette — meant to be replaced with
 * real photography of Swaada (see public/images/README.md).
 *
 * Run: node scripts/gen-placeholders.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(OUT, { recursive: true });

// Palette
const P = {
  forest: "#1c352a",
  deep: "#14261e",
  leaf: "#2f5d46",
  moss: "#48705a",
  sage: "#8aa587",
  sageLight: "#aec3a8",
  cream: "#f4efe6",
  sand: "#e7ddcb",
  brown: "#5b4636",
  terracotta: "#c26e4f",
  clay: "#a55b40",
  charcoal: "#26241f",
  gold: "#d9a441",
};

// Seeded pseudo-random so output is stable between runs
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const leafPath = (s = 1) =>
  `M0 0 C ${28 * s} ${-34 * s}, ${64 * s} ${-30 * s}, ${86 * s} ${-2 * s} ` +
  `C ${64 * s} ${26 * s}, ${26 * s} ${30 * s}, 0 0 Z`;

function leaf(x, y, rot, s, fill, opacity = 1) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})">
    <path d="${leafPath(s)}" fill="${fill}" opacity="${opacity}"/>
    <path d="M4 0 L ${80 * s} ${-2 * s}" stroke="${P.deep}" stroke-opacity="0.18" stroke-width="${1.6 * s}" fill="none"/>
  </g>`;
}

function frond(x, y, rot, s, fill, opacity = 1) {
  let leaves = "";
  for (let i = 0; i < 6; i++) {
    const t = i / 5;
    leaves += leaf(90 * s * t, -6 * s * t, -24 + i * 9, s * (0.42 - t * 0.05), fill, opacity);
    leaves += leaf(90 * s * t, 6 * s * t, 200 - i * 9, s * (0.4 - t * 0.05), fill, opacity);
  }
  return `<g transform="translate(${x} ${y}) rotate(${rot})">
    <path d="M0 0 C ${60 * s} ${-8 * s}, ${110 * s} ${-6 * s}, ${150 * s} ${-18 * s}" stroke="${fill}" stroke-width="${3 * s}" fill="none" opacity="${opacity}"/>
    ${leaves}
  </g>`;
}

function monstera(x, y, rot, s, fill, opacity = 1) {
  // Stylised monstera silhouette with slits
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" opacity="${opacity}">
    <path fill="${fill}" d="M0 0 C -70 -40 -78 -140 0 -170 C 78 -140 70 -40 0 0 Z"/>
    <g stroke="${P.deep}" stroke-opacity="0.35" stroke-width="7" stroke-linecap="round">
      <path d="M0 -14 L 0 -156" stroke-opacity="0.25"/>
      <path d="M-8 -40 L -46 -62"/><path d="M-8 -78 L -50 -100"/><path d="M-8 -116 L -38 -134"/>
      <path d="M8 -40 L 46 -62"/><path d="M8 -78 L 50 -100"/><path d="M8 -116 L 38 -134"/>
    </g>
  </g>`;
}

function cup(x, y, s, tone) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="64" rx="96" ry="16" fill="${P.deep}" opacity="0.25"/>
    <path d="M-70 0 a70 70 0 0 0 140 0 Z" fill="${tone}"/>
    <ellipse cx="0" cy="0" rx="70" ry="16" fill="${P.sand}"/>
    <ellipse cx="0" cy="0" rx="52" ry="11" fill="${P.brown}"/>
    <path d="M70 8 q34 4 26 30 q-8 24 -34 18" stroke="${tone}" stroke-width="10" fill="none"/>
    <path d="M-16 -22 q8 -14 0 -26 M8 -20 q8 -14 0 -26" stroke="${P.cream}" stroke-width="5" fill="none" opacity="0.7" stroke-linecap="round"/>
  </g>`;
}

function plate(x, y, s, food) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="10" rx="120" ry="26" fill="${P.deep}" opacity="0.22"/>
    <ellipse cx="0" cy="0" rx="115" ry="30" fill="${P.cream}"/>
    <ellipse cx="0" cy="-3" rx="92" ry="23" fill="${P.sand}"/>
    ${food}
  </g>`;
}

function grain(id) {
  return `<filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0"/></filter>`;
}

function scene({ name, w, h, base, glowX = 0.72, glowY = 0.24, seed = 7, motif = "", density = 1, tone = P.leaf }) {
  const r = rng(seed);
  const cornerLeaves = () => {
    let out = "";
    const n = Math.round(7 * density);
    for (let i = 0; i < n; i++) {
      const left = r() > 0.5;
      const x = left ? r() * w * 0.2 : w - r() * w * 0.2;
      const y = r() > 0.5 ? r() * h * 0.3 : h - r() * h * 0.3;
      out += leaf(x, y, r() * 360, 0.8 + r() * 1.6, r() > 0.6 ? P.moss : tone, 0.55 + r() * 0.4);
    }
    return out;
  };
  return {
    name,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0" stop-color="${base[0]}"/><stop offset="1" stop-color="${base[1]}"/>
    </linearGradient>
    <radialGradient id="glow" cx="${glowX}" cy="${glowY}" r="0.85">
      <stop offset="0" stop-color="${P.gold}" stop-opacity="0.5"/>
      <stop offset="0.45" stop-color="${P.gold}" stop-opacity="0.12"/>
      <stop offset="1" stop-color="${P.gold}" stop-opacity="0"/>
    </radialGradient>
    ${grain("g-" + name)}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  ${frond(-30, h * 0.9, -18, 1.6 * density, P.moss, 0.8)}
  ${frond(w, h * 0.16, 160, 1.4 * density, tone, 0.7)}
  ${monstera(w * 0.12, h * 1.06, 14, 1.1 * density, P.forest, 0.9)}
  ${monstera(w * 0.94, h * 1.1, -12, 1.35 * density, P.deep, 0.85)}
  ${cornerLeaves()}
  ${motif}
  <rect width="${w}" height="${h}" filter="url(#g-${name})"/>
</svg>`,
  };
}

const W = 1600, H = 1067; // 3:2
const V = 1200, VH = 1600; // portrait

const foodMotifs = {
  pizza: plate(0, 0, 1, `<circle cx="0" cy="-6" r="74" fill="${P.clay}"/><circle cx="0" cy="-6" r="62" fill="${P.gold}" opacity="0.85"/><g fill="${P.terracotta}"><circle cx="-24" cy="-22" r="9"/><circle cx="20" cy="-30" r="9"/><circle cx="28" cy="6" r="9"/><circle cx="-12" cy="10" r="9"/></g><g stroke="${P.cream}" stroke-width="4" opacity="0.8"><path d="M-62 -6 L62 -6"/><path d="M0 -68 L0 56"/><path d="M-44 -50 L44 38"/><path d="M44 -50 L-44 38"/></g>`),
  pasta: plate(0, 0, 1, `<g stroke="${P.gold}" stroke-width="9" fill="none" stroke-linecap="round"><path d="M-58 -8 q 20 -26 46 -8 q 26 18 52 -6"/><path d="M-52 6 q 24 -20 50 -4 q 24 16 48 -8"/><path d="M-44 20 q 20 -16 44 -4 q 22 12 40 -6"/></g><circle cx="30" cy="-26" r="10" fill="${P.terracotta}"/><circle cx="-20" cy="-24" r="10" fill="${P.terracotta}"/>${leaf(-6, -40, -30, 0.28, P.leaf)}`),
  sandwich: plate(0, 0, 1, `<g transform="rotate(-6)"><rect x="-66" y="-40" width="132" height="16" rx="8" fill="${P.sand}"/><rect x="-62" y="-24" width="124" height="10" rx="5" fill="${P.leaf}"/><rect x="-64" y="-14" width="128" height="12" rx="6" fill="${P.terracotta}"/><rect x="-60" y="-2" width="120" height="10" rx="5" fill="${P.gold}"/><rect x="-66" y="8" width="132" height="16" rx="8" fill="${P.sand}"/></g>`),
  wrap: plate(0, 0, 1, `<g transform="rotate(-10)"><rect x="-78" y="-22" width="156" height="44" rx="22" fill="${P.sand}"/><path d="M40 -22 a22 22 0 0 1 0 44" fill="${P.cream}"/><g stroke-width="8" stroke-linecap="round"><path d="M48 -12 q14 12 0 26" stroke="${P.leaf}" fill="none"/><path d="M60 -8 q10 8 0 18" stroke="${P.terracotta}" fill="none"/></g></g>`),
  fastfood: plate(0, 0, 1, `<g><rect x="-54" y="-34" width="108" height="18" rx="9" fill="${P.gold}"/><rect x="-58" y="-16" width="116" height="10" rx="5" fill="${P.leaf}"/><rect x="-56" y="-6" width="112" height="14" rx="7" fill="${P.clay}"/><rect x="-54" y="8" width="108" height="16" rx="8" fill="${P.sand}"/><g fill="${P.cream}" opacity="0.9"><circle cx="-30" cy="-40" r="2.5"/><circle cx="-6" cy="-43" r="2.5"/><circle cx="20" cy="-40" r="2.5"/></g></g>`),
  beverages: `<g transform="translate(0 0)"><g transform="translate(-60 0)"><rect x="-34" y="-70" width="68" height="130" rx="14" fill="${P.sageLight}" opacity="0.9"/><rect x="-34" y="-16" width="68" height="76" rx="14" fill="${P.terracotta}" opacity="0.85"/><rect x="-6" y="-96" width="12" height="40" rx="6" fill="${P.brown}"/></g><g transform="translate(70 14)"><rect x="-30" y="-56" width="60" height="110" rx="12" fill="${P.sage}" opacity="0.9"/><rect x="-30" y="-6" width="60" height="60" rx="12" fill="${P.gold}" opacity="0.9"/>${leaf(0, -66, -60, 0.3, P.leaf)}</g></g>`,
  coffee: cup(0, 0, 1, P.terracotta),
};

const scenes = [
  // Hero — wide, dense, warm light top-right
  scene({ name: "hero", w: 2000, h: 1250, base: [P.forest, P.deep], seed: 11, density: 1.5 }),
  // Hero foreground layer — transparent, leaves only
  { name: "hero-foreground", svg: `<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="1250" viewBox="0 0 2000 1250">${monstera(120, 1330, 18, 2.1, P.deep, 0.96)}${monstera(1920, 1360, -16, 2.5, "#0e1b15", 0.97)}${frond(-60, 1180, -24, 3, P.forest, 0.95)}${frond(2060, 1120, 204, 2.6, P.forest, 0.95)}</svg>` },
  scene({ name: "story-large", w: W, h: H, base: [P.leaf, P.forest], seed: 21, motif: cup(W * 0.55, H * 0.62, 1.1, P.clay) }),
  scene({ name: "story-small-a", w: 1000, h: 1250, base: [P.moss, P.forest], seed: 22, density: 0.8, motif: monstera(500, 1000, 0, 1.6, P.deep, 0.95) }),
  scene({ name: "story-small-b", w: 1000, h: 800, base: [P.sage, P.leaf], seed: 23, density: 0.7, glowX: 0.3, motif: plate(500, 480, 0.9, `<circle cx="0" cy="-8" r="52" fill="${P.terracotta}" opacity="0.9"/>${leaf(-8, -20, -40, 0.3, P.forest)}`) }),
  scene({ name: "nursery", w: 2000, h: 1200, base: [P.forest, P.deep], seed: 31, density: 1.6, glowX: 0.2, motif: `${[0,1,2,3,4].map(i => `<g transform="translate(${420 + i * 300} ${980 + (i % 2) * 30})"><path d="M-60 0 L60 0 L44 110 L-44 110 Z" fill="${i % 2 ? P.terracotta : P.clay}"/>${frond(0, 6, -90 + (i - 2) * 10, 0.9, i % 2 ? P.moss : P.leaf)}</g>`).join("")}` }),
  scene({ name: "coffee-moment", w: 2200, h: 1100, base: [P.charcoal, P.deep], seed: 41, glowX: 0.78, glowY: 0.3, density: 0.9, motif: cup(1100, 780, 1.7, P.terracotta) }),
  // Green Escape panels
  scene({ name: "escape-entrance", w: V, h: VH, base: [P.leaf, P.deep], seed: 51, density: 1.1, motif: `<path d="M340 1600 L340 700 A260 260 0 0 1 860 700 L860 1600" fill="none" stroke="${P.sand}" stroke-width="26" opacity="0.85"/>` }),
  scene({ name: "escape-plants", w: V, h: VH, base: [P.moss, P.forest], seed: 52, density: 1.5 }),
  scene({ name: "escape-seating", w: V, h: VH, base: [P.forest, P.deep], seed: 53, motif: `<g transform="translate(600 1230)"><ellipse cx="0" cy="120" rx="330" ry="40" fill="${P.deep}" opacity="0.4"/><rect x="-260" y="-10" width="520" height="26" rx="13" fill="${P.brown}"/><rect x="-220" y="16" width="20" height="120" fill="${P.brown}"/><rect x="200" y="16" width="20" height="120" fill="${P.brown}"/>${cup(-90, -40, 0.5, P.terracotta)}${cup(110, -36, 0.44, P.clay)}</g>` }),
  scene({ name: "escape-cafe", w: V, h: VH, base: [P.leaf, P.forest], seed: 54, glowX: 0.3, density: 1.2, motif: `<g stroke="${P.gold}" opacity="0.8"><path d="M200 260 Q 600 380 1000 260" fill="none" stroke-width="6"/><g fill="${P.gold}">${[0,1,2,3,4].map(i => `<circle cx="${280 + i * 160}" cy="${320 + Math.sin(i) * 30}" r="10"/>`).join("")}</g></g>` }),
  scene({ name: "escape-food", w: V, h: VH, base: [P.clay, P.forest], seed: 55, motif: plate(600, 900, 1.5, `<circle cx="0" cy="-6" r="64" fill="${P.gold}" opacity="0.9"/><g fill="${P.terracotta}"><circle cx="-20" cy="-20" r="9"/><circle cx="22" cy="-14" r="9"/><circle cx="0" cy="14" r="9"/></g>`) }),
  scene({ name: "escape-coffee", w: V, h: VH, base: [P.brown, P.charcoal], seed: 56, motif: cup(600, 940, 1.5, P.terracotta) }),
  scene({ name: "escape-evening", w: V, h: VH, base: ["#3a2f26", P.charcoal], seed: 57, glowX: 0.5, glowY: 0.18, motif: `<g fill="${P.gold}">${[...Array(14)].map((_, i) => `<circle cx="${140 + ((i * 173) % 940)}" cy="${240 + ((i * 97) % 300)}" r="${4 + (i % 3) * 2}" opacity="${0.35 + (i % 4) * 0.15}"/>`).join("")}</g>` }),
  // Food category cards
  scene({ name: "food-pizza", w: 1200, h: 900, base: [P.forest, P.deep], seed: 61, density: 0.6, motif: foodMotifs.pizza && `<g transform="translate(600 470)">${foodMotifs.pizza}</g>` }),
  scene({ name: "food-pasta", w: 1200, h: 900, base: [P.leaf, P.forest], seed: 62, density: 0.6, motif: `<g transform="translate(600 470)">${foodMotifs.pasta}</g>` }),
  scene({ name: "food-sandwich", w: 1200, h: 900, base: [P.moss, P.forest], seed: 63, density: 0.6, motif: `<g transform="translate(600 470)">${foodMotifs.sandwich}</g>` }),
  scene({ name: "food-wrap", w: 1200, h: 900, base: [P.forest, P.deep], seed: 64, density: 0.6, motif: `<g transform="translate(600 470)">${foodMotifs.wrap}</g>` }),
  scene({ name: "food-fastfood", w: 1200, h: 900, base: [P.leaf, P.deep], seed: 65, density: 0.6, motif: `<g transform="translate(600 470)">${foodMotifs.fastfood}</g>` }),
  scene({ name: "food-beverages", w: 1200, h: 900, base: [P.moss, P.deep], seed: 66, density: 0.6, motif: `<g transform="translate(600 480)">${foodMotifs.beverages}</g>` }),
  scene({ name: "food-coffee", w: 1200, h: 900, base: [P.brown, P.charcoal], seed: 67, density: 0.6, motif: `<g transform="translate(600 480)">${foodMotifs.coffee}</g>` }),
  // Gallery
  scene({ name: "gallery-cafe-1", w: 1000, h: 1400, base: [P.forest, P.deep], seed: 71, density: 1.1 }),
  scene({ name: "gallery-food-1", w: 1000, h: 750, base: [P.clay, P.forest], seed: 72, density: 0.6, motif: plate(500, 460, 1, `<circle cx="0" cy="-6" r="58" fill="${P.gold}" opacity="0.9"/>`) }),
  scene({ name: "gallery-coffee-1", w: 1000, h: 750, base: [P.brown, P.charcoal], seed: 73, density: 0.6, motif: cup(500, 480, 0.9, P.terracotta) }),
  scene({ name: "gallery-plants-1", w: 1000, h: 1400, base: [P.moss, P.forest], seed: 74, density: 1.5 }),
  scene({ name: "gallery-outdoor-1", w: 1000, h: 750, base: [P.sage, P.leaf], seed: 75, density: 1 }),
  scene({ name: "gallery-people-1", w: 1000, h: 750, base: [P.leaf, P.forest], seed: 76, density: 0.8, motif: `<g fill="${P.sand}" opacity="0.85"><circle cx="430" cy="430" r="34"/><path d="M370 560 q60 -70 120 0 Z"/><circle cx="580" cy="440" r="34"/><path d="M520 570 q60 -70 120 0 Z"/></g>` }),
  scene({ name: "gallery-evening-1", w: 1000, h: 1400, base: ["#3a2f26", P.charcoal], seed: 77, glowY: 0.15, motif: `<g fill="${P.gold}">${[...Array(10)].map((_, i) => `<circle cx="${120 + ((i * 191) % 760)}" cy="${200 + ((i * 131) % 320)}" r="${4 + (i % 3) * 2}" opacity="0.5"/>`).join("")}</g>` }),
  scene({ name: "gallery-plants-2", w: 1000, h: 750, base: [P.leaf, P.forest], seed: 78, density: 1.6 }),
  scene({ name: "gallery-cafe-2", w: 1000, h: 750, base: [P.forest, P.deep], seed: 79, density: 0.9, motif: cup(500, 500, 0.7, P.clay) }),
  // Instagram grid
  ...[1, 2, 3, 4, 5, 6].map((i) =>
    scene({
      name: `insta-${i}`, w: 900, h: 900,
      base: i % 2 ? [P.leaf, P.deep] : [P.moss, P.forest],
      seed: 80 + i, density: 0.7 + (i % 3) * 0.3,
      motif: i === 2 ? cup(450, 560, 0.8, P.terracotta) : i === 4 ? plate(450, 560, 0.9, `<circle cx="0" cy="-6" r="52" fill="${P.gold}" opacity="0.9"/>`) : "",
    })
  ),
];

for (const s of scenes) {
  writeFileSync(join(OUT, `${s.name}.svg`), s.svg);
}
console.log(`Wrote ${scenes.length} placeholder images to public/images`);

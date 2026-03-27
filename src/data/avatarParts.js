/*
 * Avatar parts catalog for blocky Roblox-style SVG avatar.
 * Each part is an SVG fragment rendered in a 120x160 viewBox.
 * Categories: hair, face, hat, glasses
 * Colors: bodyColor, shirtColor, hairColor are picked from palettes.
 */

export const HAIR_STYLES = [
  {
    id: "short",
    name: "Corto",
    price: 0,
    levelRequired: 1,
    render: (color) =>
      `<rect x="30" y="18" width="60" height="18" rx="6" fill="${color}"/>
       <rect x="28" y="26" width="64" height="8" rx="3" fill="${color}"/>`,
  },
  {
    id: "long",
    name: "Largo",
    price: 0,
    levelRequired: 1,
    render: (color) =>
      `<rect x="28" y="18" width="64" height="18" rx="6" fill="${color}"/>
       <rect x="26" y="26" width="14" height="30" rx="4" fill="${color}"/>
       <rect x="80" y="26" width="14" height="30" rx="4" fill="${color}"/>`,
  },
  {
    id: "ponytail",
    name: "Coletas",
    price: 30,
    levelRequired: 3,
    render: (color) =>
      `<rect x="30" y="18" width="60" height="16" rx="6" fill="${color}"/>
       <circle cx="28" cy="28" r="10" fill="${color}"/>
       <circle cx="92" cy="28" r="10" fill="${color}"/>`,
  },
  {
    id: "mohawk",
    name: "Mohicano",
    price: 50,
    levelRequired: 5,
    render: (color) =>
      `<rect x="48" y="6" width="24" height="28" rx="5" fill="${color}"/>
       <rect x="44" y="22" width="32" height="12" rx="4" fill="${color}"/>`,
  },
  {
    id: "curly",
    name: "Rizado",
    price: 40,
    levelRequired: 4,
    render: (color) =>
      `<circle cx="38" cy="24" r="10" fill="${color}"/>
       <circle cx="60" cy="20" r="12" fill="${color}"/>
       <circle cx="82" cy="24" r="10" fill="${color}"/>
       <circle cx="50" cy="28" r="9" fill="${color}"/>
       <circle cx="70" cy="28" r="9" fill="${color}"/>`,
  },
  {
    id: "spiky",
    name: "De Punta",
    price: 60,
    levelRequired: 6,
    render: (color) =>
      `<polygon points="35,30 42,8 49,30" fill="${color}"/>
       <polygon points="47,30 55,4 63,30" fill="${color}"/>
       <polygon points="59,30 67,8 75,30" fill="${color}"/>
       <polygon points="71,30 78,12 85,30" fill="${color}"/>`,
  },
];

export const FACE_STYLES = [
  {
    id: "smile",
    name: "Sonrisa",
    price: 0,
    levelRequired: 1,
    render: () =>
      `<circle cx="48" cy="42" r="4" fill="#1a1a3e"/>
       <circle cx="72" cy="42" r="4" fill="#1a1a3e"/>
       <path d="M48,52 Q60,62 72,52" stroke="#1a1a3e" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
  },
  {
    id: "happy",
    name: "Feliz",
    price: 0,
    levelRequired: 1,
    render: () =>
      `<circle cx="48" cy="42" r="4" fill="#1a1a3e"/>
       <circle cx="72" cy="42" r="4" fill="#1a1a3e"/>
       <ellipse cx="60" cy="54" rx="10" ry="6" fill="#1a1a3e"/>
       <ellipse cx="60" cy="53" rx="8" ry="4" fill="#ff6b9d"/>`,
  },
  {
    id: "cool",
    name: "Cool",
    price: 20,
    levelRequired: 2,
    render: () =>
      `<rect x="43" y="39" width="10" height="5" rx="1" fill="#1a1a3e"/>
       <rect x="67" y="39" width="10" height="5" rx="1" fill="#1a1a3e"/>
       <path d="M50,54 L60,58 L70,54" stroke="#1a1a3e" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
  },
  {
    id: "wink",
    name: "Guiño",
    price: 35,
    levelRequired: 3,
    render: () =>
      `<circle cx="48" cy="42" r="4" fill="#1a1a3e"/>
       <path d="M67,42 L77,42" stroke="#1a1a3e" stroke-width="3" stroke-linecap="round"/>
       <path d="M48,52 Q60,62 72,52" stroke="#1a1a3e" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
  },
  {
    id: "surprised",
    name: "Sorpresa",
    price: 45,
    levelRequired: 5,
    render: () =>
      `<circle cx="48" cy="42" r="5" fill="#1a1a3e"/>
       <circle cx="48" cy="42" r="2" fill="white"/>
       <circle cx="72" cy="42" r="5" fill="#1a1a3e"/>
       <circle cx="72" cy="42" r="2" fill="white"/>
       <ellipse cx="60" cy="56" rx="6" ry="7" fill="#1a1a3e"/>`,
  },
];

export const HAT_STYLES = [
  { id: null, name: "Ninguno", price: 0, levelRequired: 1, render: () => "" },
  {
    id: "cap",
    name: "Gorra",
    price: 25,
    levelRequired: 2,
    render: (color) =>
      `<rect x="26" y="18" width="68" height="12" rx="4" fill="${color || "#ff4444"}"/>
       <rect x="22" y="26" width="40" height="6" rx="2" fill="${color || "#ff4444"}"/>`,
  },
  {
    id: "crown",
    name: "Corona",
    price: 100,
    levelRequired: 8,
    render: () =>
      `<polygon points="32,22 38,6 46,18 54,2 62,18 70,6 76,22" fill="#ffd700"/>
       <rect x="32" y="18" width="44" height="8" rx="2" fill="#ffd700"/>
       <circle cx="42" cy="16" r="3" fill="#ff1493"/>
       <circle cx="54" cy="10" r="3" fill="#00bfff"/>
       <circle cx="66" cy="16" r="3" fill="#00ff88"/>`,
  },
  {
    id: "wizard",
    name: "Mago",
    price: 80,
    levelRequired: 7,
    render: () =>
      `<polygon points="60,0 32,26 88,26" fill="#764ba2"/>
       <circle cx="60" cy="4" r="4" fill="#ffd700"/>
       <circle cx="50" cy="16" r="2" fill="#ffd700" opacity="0.7"/>
       <circle cx="68" cy="12" r="2.5" fill="#ffd700" opacity="0.5"/>`,
  },
  {
    id: "helmet",
    name: "Casco",
    price: 60,
    levelRequired: 5,
    render: () =>
      `<ellipse cx="60" cy="22" rx="34" ry="18" fill="#888"/>
       <rect x="30" y="22" width="60" height="8" rx="2" fill="#666"/>
       <rect x="40" y="26" width="40" height="4" rx="1" fill="#aaa"/>`,
  },
  {
    id: "bunny",
    name: "Orejas Conejo",
    price: 45,
    levelRequired: 4,
    render: () =>
      `<ellipse cx="42" cy="10" rx="7" ry="16" fill="#ffb6c1"/>
       <ellipse cx="42" cy="10" rx="4" ry="12" fill="#ff69b4"/>
       <ellipse cx="78" cy="10" rx="7" ry="16" fill="#ffb6c1"/>
       <ellipse cx="78" cy="10" rx="4" ry="12" fill="#ff69b4"/>`,
  },
  {
    id: "party",
    name: "Fiesta",
    price: 30,
    levelRequired: 3,
    render: () =>
      `<polygon points="60,0 44,24 76,24" fill="#ff1493"/>
       <circle cx="60" cy="2" r="4" fill="#ffd700"/>
       <rect x="48" y="8" width="4" height="2" rx="1" fill="#00ff88"/>
       <rect x="56" y="14" width="4" height="2" rx="1" fill="#00bfff"/>
       <rect x="64" y="10" width="4" height="2" rx="1" fill="#ffd700"/>`,
  },
  {
    id: "headphones",
    name: "Audífonos",
    price: 70,
    levelRequired: 6,
    render: () =>
      `<path d="M28,36 Q28,14 60,14 Q92,14 92,36" stroke="#333" stroke-width="5" fill="none"/>
       <rect x="22" y="30" width="12" height="16" rx="4" fill="#667eea"/>
       <rect x="86" y="30" width="12" height="16" rx="4" fill="#667eea"/>`,
  },
];

export const GLASSES_STYLES = [
  { id: null, name: "Ninguno", price: 0, levelRequired: 1, render: () => "" },
  {
    id: "round",
    name: "Redondas",
    price: 20,
    levelRequired: 2,
    render: () =>
      `<circle cx="48" cy="42" r="9" stroke="#333" stroke-width="2" fill="none"/>
       <circle cx="72" cy="42" r="9" stroke="#333" stroke-width="2" fill="none"/>
       <line x1="57" y1="42" x2="63" y2="42" stroke="#333" stroke-width="2"/>`,
  },
  {
    id: "sunglasses",
    name: "De Sol",
    price: 40,
    levelRequired: 4,
    render: () =>
      `<rect x="38" y="36" width="20" height="14" rx="3" fill="#1a1a3e" opacity="0.85"/>
       <rect x="62" y="36" width="20" height="14" rx="3" fill="#1a1a3e" opacity="0.85"/>
       <line x1="58" y1="42" x2="62" y2="42" stroke="#333" stroke-width="2"/>
       <line x1="38" y1="42" x2="30" y2="38" stroke="#333" stroke-width="2"/>
       <line x1="82" y1="42" x2="90" y2="38" stroke="#333" stroke-width="2"/>`,
  },
  {
    id: "stars",
    name: "Estrellas",
    price: 75,
    levelRequired: 7,
    render: () =>
      `<polygon points="48,34 50,40 56,40 51,44 53,50 48,46 43,50 45,44 40,40 46,40" fill="#ffd700"/>
       <polygon points="72,34 74,40 80,40 75,44 77,50 72,46 67,50 69,44 64,40 70,40" fill="#ffd700"/>
       <line x1="56" y1="42" x2="64" y2="42" stroke="#ffd700" stroke-width="2"/>`,
  },
];

export const BODY_COLORS = [
  "#6C63FF", "#ff1493", "#00bfff", "#00ff88",
  "#ffd700", "#ff6b6b", "#a855f7", "#f97316",
];

export const SHIRT_COLORS = [
  "#ff1493", "#6C63FF", "#00ff88", "#00bfff",
  "#ffd700", "#ff4444", "#a855f7", "#1a1a3e",
];

export const HAIR_COLORS = [
  "#6C63FF", "#ff1493", "#ffd700", "#333333",
  "#8B4513", "#FF6347", "#00bfff", "#a855f7",
];

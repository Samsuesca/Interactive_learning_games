import { useState, useEffect, useRef, useMemo } from "react";

/* ───────── DATOS DEL JUEGO ───────── */

const SHAPES = [
  // ── Figuras 2D ──
  {
    id: "triangulo",
    name: "Triángulo",
    type: "2D",
    category: "Polígono",
    sides: 3,
    formula: "A = (b × h) / 2",
    perimeter: "P = a + b + c",
    description: "Polígono de tres lados y tres ángulos. La suma de sus ángulos internos siempre es 180°.",
    fun: "Es la figura más resistente estructuralmente, por eso se usa en puentes y techos.",
    emoji: "🔺",
    color: "#ef5350",
    gradient: "linear-gradient(135deg, #ef5350, #f44336)",
  },
  {
    id: "cuadrado",
    name: "Cuadrado",
    type: "2D",
    category: "Polígono regular",
    sides: 4,
    formula: "A = l²",
    perimeter: "P = 4l",
    description: "Polígono con 4 lados iguales y 4 ángulos rectos (90°).",
    fun: "Es el único rectángulo que también es un rombo.",
    emoji: "🟧",
    color: "#FFA726",
    gradient: "linear-gradient(135deg, #FFA726, #FF9800)",
  },
  {
    id: "rectangulo",
    name: "Rectángulo",
    type: "2D",
    category: "Polígono",
    sides: 4,
    formula: "A = b × h",
    perimeter: "P = 2(b + h)",
    description: "Polígono con 4 ángulos rectos. Lados opuestos son iguales y paralelos.",
    fun: "La pantalla que estás usando ahora mismo probablemente es un rectángulo.",
    emoji: "📐",
    color: "#42A5F5",
    gradient: "linear-gradient(135deg, #42A5F5, #1E88E5)",
  },
  {
    id: "rombo",
    name: "Rombo",
    type: "2D",
    category: "Polígono",
    sides: 4,
    formula: "A = (D × d) / 2",
    perimeter: "P = 4l",
    description: "Polígono con 4 lados iguales. Sus diagonales se cortan perpendicularmente.",
    fun: "El símbolo de diamante en las cartas de póker es un rombo.",
    emoji: "💠",
    color: "#7E57C2",
    gradient: "linear-gradient(135deg, #7E57C2, #5E35B1)",
  },
  {
    id: "trapecio",
    name: "Trapecio",
    type: "2D",
    category: "Polígono",
    sides: 4,
    formula: "A = (B + b) × h / 2",
    perimeter: "P = a + b + c + d",
    description: "Cuadrilátero con exactamente un par de lados paralelos (bases).",
    fun: "El músculo trapecio de tu espalda tiene esta forma.",
    emoji: "⏢",
    color: "#26A69A",
    gradient: "linear-gradient(135deg, #26A69A, #00897B)",
  },
  {
    id: "pentagono",
    name: "Pentágono",
    type: "2D",
    category: "Polígono regular",
    sides: 5,
    formula: "A = (P × a) / 2",
    perimeter: "P = 5l",
    description: "Polígono de 5 lados. La suma de sus ángulos internos es 540°.",
    fun: "El edificio del Departamento de Defensa de EE.UU. tiene forma pentagonal.",
    emoji: "⬟",
    color: "#EC407A",
    gradient: "linear-gradient(135deg, #EC407A, #D81B60)",
  },
  {
    id: "hexagono",
    name: "Hexágono",
    type: "2D",
    category: "Polígono regular",
    sides: 6,
    formula: "A = (3√3 / 2) × l²",
    perimeter: "P = 6l",
    description: "Polígono de 6 lados iguales. Cada ángulo interno mide 120°.",
    fun: "Las abejas construyen sus panales con hexágonos porque es la forma más eficiente.",
    emoji: "⬡",
    color: "#FFCA28",
    gradient: "linear-gradient(135deg, #FFCA28, #FFB300)",
  },
  {
    id: "octagono",
    name: "Octágono",
    type: "2D",
    category: "Polígono regular",
    sides: 8,
    formula: "A = 2(1+√2) × l²",
    perimeter: "P = 8l",
    description: "Polígono de 8 lados iguales. Cada ángulo interno mide 135°.",
    fun: "Las señales de PARE/STOP en todo el mundo tienen forma octagonal.",
    emoji: "🛑",
    color: "#78909C",
    gradient: "linear-gradient(135deg, #78909C, #546E7A)",
  },
  {
    id: "circulo",
    name: "Círculo",
    type: "2D",
    category: "Figura curva",
    sides: 0,
    formula: "A = π × r²",
    perimeter: "C = 2π × r",
    description: "Conjunto de puntos equidistantes a un centro. No tiene lados ni vértices.",
    fun: "π (pi) es un número irracional: tiene infinitos decimales sin patrón.",
    emoji: "⭕",
    color: "#66BB6A",
    gradient: "linear-gradient(135deg, #66BB6A, #43A047)",
  },
  {
    id: "paralelogramo",
    name: "Paralelogramo",
    type: "2D",
    category: "Polígono",
    sides: 4,
    formula: "A = b × h",
    perimeter: "P = 2(a + b)",
    description: "Cuadrilátero con dos pares de lados paralelos. Los ángulos opuestos son iguales.",
    fun: "El cuadrado, el rectángulo y el rombo son todos paralelogramos especiales.",
    emoji: "▱",
    color: "#5C6BC0",
    gradient: "linear-gradient(135deg, #5C6BC0, #3F51B5)",
  },
  // ── Figuras 3D (Volúmenes) ──
  {
    id: "cubo",
    name: "Cubo",
    type: "3D",
    category: "Poliedro regular",
    sides: 6,
    formula: "V = l³",
    perimeter: "Sup = 6l²",
    description: "Sólido con 6 caras cuadradas iguales, 12 aristas y 8 vértices.",
    fun: "Un dado estándar es un cubo perfecto. ¡Cada cara tiene la misma probabilidad!",
    emoji: "🎲",
    color: "#FF7043",
    gradient: "linear-gradient(135deg, #FF7043, #E64A19)",
  },
  {
    id: "esfera",
    name: "Esfera",
    type: "3D",
    category: "Sólido de revolución",
    sides: 0,
    formula: "V = (4/3)π × r³",
    perimeter: "Sup = 4π × r²",
    description: "Sólido donde todos los puntos de su superficie están a igual distancia del centro.",
    fun: "La Tierra no es una esfera perfecta: está ligeramente achatada en los polos.",
    emoji: "🌍",
    color: "#29B6F6",
    gradient: "linear-gradient(135deg, #29B6F6, #0288D1)",
  },
  {
    id: "cilindro",
    name: "Cilindro",
    type: "3D",
    category: "Sólido de revolución",
    sides: 3,
    formula: "V = π × r² × h",
    perimeter: "Sup = 2πr(r + h)",
    description: "Sólido con dos bases circulares paralelas unidas por una superficie curva.",
    fun: "Las latas de refresco son cilindros. Se diseñan así para maximizar volumen con mínimo material.",
    emoji: "🥫",
    color: "#AB47BC",
    gradient: "linear-gradient(135deg, #AB47BC, #8E24AA)",
  },
  {
    id: "cono",
    name: "Cono",
    type: "3D",
    category: "Sólido de revolución",
    sides: 2,
    formula: "V = (1/3)π × r² × h",
    perimeter: "Sup = πr(r + g)",
    description: "Sólido con base circular que se estrecha hasta un punto llamado vértice o ápice.",
    fun: "Los conos de tráfico se inventaron en 1914 y originalmente eran de concreto.",
    emoji: "📐",
    color: "#F06292",
    gradient: "linear-gradient(135deg, #F06292, #E91E63)",
  },
  {
    id: "piramide",
    name: "Pirámide",
    type: "3D",
    category: "Poliedro",
    sides: 5,
    formula: "V = (1/3) × Ab × h",
    perimeter: "Sup = Ab + Al",
    description: "Sólido con base poligonal y caras triangulares que convergen en un vértice.",
    fun: "La Gran Pirámide de Giza fue la estructura más alta del mundo por 3,800 años.",
    emoji: "🔺",
    color: "#FDD835",
    gradient: "linear-gradient(135deg, #FDD835, #F9A825)",
  },
  {
    id: "prisma",
    name: "Prisma",
    type: "3D",
    category: "Poliedro",
    sides: 5,
    formula: "V = Ab × h",
    perimeter: "Sup = 2Ab + Al",
    description: "Sólido con dos bases poligonales iguales y paralelas, unidas por caras rectangulares.",
    fun: "Un prisma de vidrio descompone la luz blanca en los colores del arcoíris.",
    emoji: "🔷",
    color: "#4DB6AC",
    gradient: "linear-gradient(135deg, #4DB6AC, #00897B)",
  },
];

const SHAPES_2D = SHAPES.filter((s) => s.type === "2D");
const SHAPES_3D = SHAPES.filter((s) => s.type === "3D");
const EMOJIS = ["🔺", "⬡", "🎲", "⭕", "🔷", "📐", "🌍", "🛑"];

/* ───────── UTILIDADES ───────── */

const shuffle = (a) => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

const pill = (bg, c = "#fff") => ({
  display: "inline-block",
  background: bg,
  color: c,
  borderRadius: 30,
  padding: "10px 22px",
  fontWeight: 700,
  fontSize: 15,
  border: "none",
  cursor: "pointer",
  transition: "all .2s",
});

const circ = (bg) => ({
  ...pill(bg),
  width: 44,
  height: 44,
  padding: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  fontSize: 20,
});

/* ───────── DIBUJO SVG DE FIGURAS ───────── */

function ShapeSVG({ shapeId, size = 120, color }) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const r = s * 0.38;
  const fillColor = color || "#667eea";
  const strokeColor = "rgba(0,0,0,0.15)";

  const polygon = (n, rotation = -Math.PI / 2) => {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const angle = rotation + (2 * Math.PI * i) / n;
      pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    }
    return pts.join(" ");
  };

  const shapes = {
    triangulo: (
      <polygon
        points={polygon(3)}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
      />
    ),
    cuadrado: (
      <rect
        x={cx - r * 0.75}
        y={cy - r * 0.75}
        width={r * 1.5}
        height={r * 1.5}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
        rx={2}
      />
    ),
    rectangulo: (
      <rect
        x={cx - r}
        y={cy - r * 0.6}
        width={r * 2}
        height={r * 1.2}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
        rx={2}
      />
    ),
    rombo: (
      <polygon
        points={`${cx},${cy - r} ${cx + r * 0.7},${cy} ${cx},${cy + r} ${cx - r * 0.7},${cy}`}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
      />
    ),
    trapecio: (
      <polygon
        points={`${cx - r * 0.5},${cy - r * 0.6} ${cx + r * 0.5},${cy - r * 0.6} ${cx + r},${cy + r * 0.6} ${cx - r},${cy + r * 0.6}`}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
      />
    ),
    pentagono: (
      <polygon
        points={polygon(5)}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
      />
    ),
    hexagono: (
      <polygon
        points={polygon(6)}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
      />
    ),
    octagono: (
      <polygon
        points={polygon(8)}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
      />
    ),
    circulo: (
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
      />
    ),
    paralelogramo: (
      <polygon
        points={`${cx - r * 0.6},${cy - r * 0.5} ${cx + r},${cy - r * 0.5} ${cx + r * 0.6},${cy + r * 0.5} ${cx - r},${cy + r * 0.5}`}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
      />
    ),
    cubo: (
      <g>
        <polygon
          points={`${cx - r * 0.55},${cy - r * 0.15} ${cx + r * 0.25},${cy - r * 0.15} ${cx + r * 0.25},${cy + r * 0.7} ${cx - r * 0.55},${cy + r * 0.7}`}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={2}
        />
        <polygon
          points={`${cx - r * 0.55},${cy - r * 0.15} ${cx - r * 0.2},${cy - r * 0.7} ${cx + r * 0.6},${cy - r * 0.7} ${cx + r * 0.25},${cy - r * 0.15}`}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={2}
          opacity={0.8}
        />
        <polygon
          points={`${cx + r * 0.25},${cy - r * 0.15} ${cx + r * 0.6},${cy - r * 0.7} ${cx + r * 0.6},${cy + r * 0.15} ${cx + r * 0.25},${cy + r * 0.7}`}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={2}
          opacity={0.6}
        />
      </g>
    ),
    esfera: (
      <g>
        <circle cx={cx} cy={cy} r={r} fill={fillColor} stroke={strokeColor} strokeWidth={2} />
        <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.3} fill="none" stroke={strokeColor} strokeWidth={1.5} strokeDasharray="4 3" />
        <ellipse cx={cx} cy={cy} rx={r * 0.3} ry={r} fill="none" stroke={strokeColor} strokeWidth={1.5} strokeDasharray="4 3" />
        <circle cx={cx - r * 0.25} cy={cy - r * 0.25} r={r * 0.12} fill="rgba(255,255,255,0.4)" />
      </g>
    ),
    cilindro: (
      <g>
        <rect
          x={cx - r * 0.65}
          y={cy - r * 0.5}
          width={r * 1.3}
          height={r * 1.2}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={2}
        />
        <ellipse cx={cx} cy={cy + r * 0.7} rx={r * 0.65} ry={r * 0.25} fill={fillColor} stroke={strokeColor} strokeWidth={2} />
        <ellipse cx={cx} cy={cy - r * 0.5} rx={r * 0.65} ry={r * 0.25} fill={fillColor} stroke={strokeColor} strokeWidth={2} opacity={0.85} />
      </g>
    ),
    cono: (
      <g>
        <polygon
          points={`${cx},${cy - r * 0.85} ${cx + r * 0.7},${cy + r * 0.55} ${cx - r * 0.7},${cy + r * 0.55}`}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={2}
        />
        <ellipse cx={cx} cy={cy + r * 0.55} rx={r * 0.7} ry={r * 0.25} fill={fillColor} stroke={strokeColor} strokeWidth={2} />
      </g>
    ),
    piramide: (
      <g>
        <polygon
          points={`${cx},${cy - r * 0.85} ${cx + r * 0.8},${cy + r * 0.5} ${cx - r * 0.05},${cy + r * 0.75}`}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={2}
        />
        <polygon
          points={`${cx},${cy - r * 0.85} ${cx - r * 0.75},${cy + r * 0.4} ${cx - r * 0.05},${cy + r * 0.75}`}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={2}
          opacity={0.75}
        />
        <polygon
          points={`${cx - r * 0.75},${cy + r * 0.4} ${cx + r * 0.8},${cy + r * 0.5} ${cx - r * 0.05},${cy + r * 0.75}`}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={2}
          opacity={0.55}
        />
      </g>
    ),
    prisma: (
      <g>
        <polygon
          points={`${cx - r * 0.6},${cy - r * 0.3} ${cx},${cy - r * 0.8} ${cx + r * 0.6},${cy - r * 0.3} ${cx + r * 0.6},${cy + r * 0.6} ${cx},${cy + r * 0.1} ${cx - r * 0.6},${cy + r * 0.6}`}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={2}
        />
        <line x1={cx} y1={cy - r * 0.8} x2={cx} y2={cy + r * 0.1} stroke={strokeColor} strokeWidth={1.5} />
        <polygon
          points={`${cx},${cy + r * 0.1} ${cx + r * 0.6},${cy + r * 0.6} ${cx + r * 0.6},${cy - r * 0.3}`}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={1.5}
          opacity={0.6}
        />
      </g>
    ),
  };

  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} style={{ display: "block" }}>
      {shapes[shapeId] || <circle cx={cx} cy={cy} r={r} fill={fillColor} />}
    </svg>
  );
}

/* ───────── COMPONENTES COMPARTIDOS ───────── */

function Confetti({ active }) {
  const [ps, setPs] = useState([]);
  useEffect(() => {
    if (!active) { setPs([]); return; }
    setPs(
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#F9A825", "#AB47BC"][i % 6],
        size: Math.random() * 8 + 4,
      }))
    );
    const t = setTimeout(() => setPs([]), 1500);
    return () => clearTimeout(t);
  }, [active]);
  if (!ps.length) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999 }}>
      <style>{`@keyframes gFall{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}`}</style>
      {ps.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: -10,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.id % 3 === 0 ? "50%" : "2px",
            animation: `gFall 1.5s ${p.delay}s ease-out forwards`,
          }}
        />
      ))}
    </div>
  );
}

function Stars({ score, total }) {
  const n = total > 0 ? (score / total >= 0.9 ? 3 : score / total >= 0.6 ? 2 : score / total > 0 ? 1 : 0) : 0;
  return (
    <div style={{ display: "flex", gap: 4, justifyContent: "center", fontSize: 32 }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ opacity: i < n ? 1 : 0.25 }}>
          {i < n ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}

function PBar({ value, max }) {
  return (
    <div style={{ width: "100%", height: 10, background: "#e0e0e0", borderRadius: 5, overflow: "hidden" }}>
      <div
        style={{
          width: `${max > 0 ? (value / max) * 100 : 0}%`,
          height: "100%",
          background: "linear-gradient(90deg, #667eea, #764ba2)",
          borderRadius: 5,
          transition: "width 0.5s",
        }}
      />
    </div>
  );
}

function OptionButton({ text, sel, cor, onClick }) {
  const isC = text === cor;
  const isS = sel === text;
  let bg = "white", border = "#ddd", color = "#333";
  if (sel !== null) {
    if (isC) { bg = "#c8e6c9"; border = "#66BB6A"; color = "#2e7d32"; }
    else if (isS) { bg = "#ffcdd2"; border = "#ef5350"; color = "#c62828"; }
  }
  return (
    <button
      onClick={onClick}
      style={{
        background: bg,
        border: `2px solid ${border}`,
        borderRadius: 16,
        padding: "14px 10px",
        fontSize: 15,
        fontWeight: 600,
        color,
        cursor: sel !== null ? "default" : "pointer",
        transition: "all 0.3s",
        transform: isS ? "scale(1.04)" : "scale(1)",
        boxShadow: isS ? "0 4px 15px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.06)",
        width: "100%",
        textAlign: "left",
      }}
    >
      {sel !== null && isC && "✅ "}
      {sel !== null && isS && !isC && "❌ "}
      {text}
    </button>
  );
}

/* ───────── MODO EXPLORAR (GALERÍA) ───────── */

function ExploreMode({ onBack }) {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = filter === "all" ? SHAPES : filter === "2D" ? SHAPES_2D : SHAPES_3D;

  if (selected) {
    const s = selected;
    return (
      <div style={{ animation: "fadeIn .3s" }}>
        <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <button onClick={() => setSelected(null)} style={pill("rgba(255,255,255,0.85)", "#333")}>
            ◀ Volver
          </button>
          <span style={{
            background: s.type === "2D" ? "linear-gradient(135deg,#667eea,#764ba2)" : "linear-gradient(135deg,#FF7043,#E64A19)",
            color: "#fff", borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 700
          }}>
            {s.type}
          </span>
        </div>

        <div style={{
          background: "white",
          borderRadius: 24,
          padding: 24,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <ShapeSVG shapeId={s.id} size={160} color={s.color} />
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#333", margin: "0 0 4px" }}>{s.name}</h2>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>{s.category}</div>

          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6, marginBottom: 16 }}>{s.description}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            <div style={{
              background: "linear-gradient(135deg,#667eea22,#764ba222)",
              borderRadius: 14, padding: 14, textAlign: "center",
            }}>
              <div style={{ fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>
                {s.type === "2D" ? "Área" : "Volumen"}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#333" }}>{s.formula}</div>
            </div>
            <div style={{
              background: "linear-gradient(135deg,#66BB6A22,#43A04722)",
              borderRadius: 14, padding: 14, textAlign: "center",
            }}>
              <div style={{ fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>
                {s.type === "2D" ? "Perímetro" : "Superficie"}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#333" }}>{s.perimeter}</div>
            </div>
          </div>

          {s.sides > 0 && (
            <div style={{
              background: "#f8f8f8", borderRadius: 12, padding: "10px 14px",
              fontSize: 14, color: "#555", marginBottom: 12,
            }}>
              {s.type === "2D" ? `${s.sides} lados` : `${s.sides} caras`}
            </div>
          )}

          <div style={{
            background: "linear-gradient(135deg,#FFF8E1,#FFF3E0)",
            borderRadius: 14, padding: 14, fontSize: 13,
            color: "#795548", lineHeight: 1.5, textAlign: "left",
          }}>
            <span style={{ fontWeight: 700 }}>💡 Dato curioso: </span>
            {s.fun}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <button onClick={onBack} style={pill("rgba(255,255,255,0.85)", "#333")}>◀ Menú</button>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "#333", margin: 0 }}>🔍 Explorar</h2>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
        {[["all", "Todas"], ["2D", "2D"], ["3D", "3D"]].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            style={{
              ...pill(filter === key ? "linear-gradient(135deg,#667eea,#764ba2)" : "rgba(255,255,255,0.85)",
                filter === key ? "#fff" : "#555"),
              fontSize: 13,
              padding: "8px 18px",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {filtered.map((s) => (
          <div
            key={s.id}
            onClick={() => setSelected(s)}
            style={{
              background: "white",
              borderRadius: 18,
              padding: 16,
              textAlign: "center",
              cursor: "pointer",
              transition: "all .2s",
              boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
              border: `2px solid ${s.color}22`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)"; }}
          >
            <ShapeSVG shapeId={s.id} size={80} color={s.color} />
            <div style={{ fontSize: 14, fontWeight: 700, color: "#333", marginTop: 8 }}>{s.name}</div>
            <div style={{
              fontSize: 10, fontWeight: 600, color: "#fff", marginTop: 6,
              background: s.type === "2D" ? "linear-gradient(135deg,#667eea,#764ba2)" : "linear-gradient(135deg,#FF7043,#E64A19)",
              borderRadius: 10, padding: "2px 10px", display: "inline-block",
            }}>
              {s.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────── MODO APRENDER (FLASHCARDS) ───────── */

function LearnMode({ onBack }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState(new Set());

  const shape = SHAPES[idx];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <button onClick={onBack} style={pill("rgba(255,255,255,0.85)", "#333")}>◀ Menú</button>
        <span style={{ fontSize: 13, color: "#888", fontWeight: 600 }}>
          {idx + 1} / {SHAPES.length} · {learned.size} aprendidas
        </span>
      </div>

      <PBar value={idx + 1} max={SHAPES.length} />

      <div
        onClick={() => setFlipped(!flipped)}
        style={{
          perspective: 800,
          cursor: "pointer",
          margin: "20px 0",
          height: 340,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
          }}
        >
          {/* FRONT */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              background: shape.gradient,
              borderRadius: 24,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: 12, marginBottom: 16 }}>
              <ShapeSVG shapeId={shape.id} size={120} color="rgba(255,255,255,0.9)" />
            </div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{shape.name}</div>
            <div style={{ fontSize: 14, opacity: 0.9, marginTop: 4 }}>{shape.category} · {shape.type}</div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 12 }}>Toca para ver fórmulas →</div>
          </div>

          {/* BACK */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
              borderRadius: 24,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#333",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{shape.name}</div>

            <div style={{
              background: "white", borderRadius: 16, padding: 14,
              width: "100%", marginBottom: 10, textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}>
              <div style={{ fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase" }}>
                {shape.type === "2D" ? "Área" : "Volumen"}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#667eea", marginTop: 4 }}>
                {shape.formula}
              </div>
            </div>

            <div style={{
              background: "white", borderRadius: 16, padding: 14,
              width: "100%", marginBottom: 10, textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}>
              <div style={{ fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase" }}>
                {shape.type === "2D" ? "Perímetro" : "Superficie"}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#66BB6A", marginTop: 4 }}>
                {shape.perimeter}
              </div>
            </div>

            <div style={{ fontSize: 13, color: "#666", lineHeight: 1.5, textAlign: "center", marginTop: 4 }}>
              {shape.description}
            </div>
            <div style={{ fontSize: 12, opacity: 0.6, marginTop: 8 }}>← Toca para ver la figura</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
        <button
          onClick={() => { setIdx(Math.max(0, idx - 1)); setFlipped(false); }}
          disabled={idx === 0}
          style={{ ...circ(idx === 0 ? "#ccc" : "#667eea"), opacity: idx === 0 ? 0.4 : 1 }}
        >
          ◀
        </button>

        <button
          onClick={() => {
            setLearned((prev) => {
              const s = new Set(prev);
              if (s.has(shape.id)) s.delete(shape.id); else s.add(shape.id);
              return s;
            });
          }}
          style={pill(learned.has(shape.id) ? "linear-gradient(135deg,#66BB6A,#43A047)" : "rgba(255,255,255,0.85)",
            learned.has(shape.id) ? "#fff" : "#555")}
        >
          {learned.has(shape.id) ? "✅ Aprendida" : "Marcar aprendida"}
        </button>

        <button
          onClick={() => { setIdx(Math.min(SHAPES.length - 1, idx + 1)); setFlipped(false); }}
          disabled={idx === SHAPES.length - 1}
          style={{ ...circ(idx === SHAPES.length - 1 ? "#ccc" : "#667eea"), opacity: idx === SHAPES.length - 1 ? 0.4 : 1 }}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

/* ───────── GENERADOR DE PREGUNTAS ───────── */

function makeQuestions(count) {
  const types = [
    // Tipo 1: ¿Cuál es la fórmula de área/volumen de X?
    (item) => {
      const label = item.type === "2D" ? "área" : "volumen";
      const cor = item.formula;
      let opts = [cor];
      const pool = SHAPES.filter((s) => s.id !== item.id && s.type === item.type);
      while (opts.length < 4 && pool.length > 0) {
        const r = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
        if (!opts.includes(r.formula)) opts.push(r.formula);
      }
      const poolAll = SHAPES.filter((s) => s.id !== item.id);
      while (opts.length < 4) {
        const r = poolAll[Math.floor(Math.random() * poolAll.length)];
        if (!opts.includes(r.formula)) opts.push(r.formula);
      }
      return { question: `¿Cuál es la fórmula del ${label} del ${item.name}?`, cor, opts: shuffle(opts), showShape: true, item };
    },
    // Tipo 2: ¿Qué figura es esta? (mostrar SVG)
    (item) => {
      const cor = item.name;
      let opts = [cor];
      const pool = SHAPES.filter((s) => s.id !== item.id);
      while (opts.length < 4) {
        const r = pool[Math.floor(Math.random() * pool.length)];
        if (!opts.includes(r.name)) opts.push(r.name);
      }
      return { question: "¿Qué figura es esta?", cor, opts: shuffle(opts), showShape: true, item };
    },
    // Tipo 3: ¿Cuántos lados/caras tiene X?
    (item) => {
      if (item.sides === 0) return null;
      const label = item.type === "2D" ? "lados" : "caras";
      const cor = `${item.sides} ${label}`;
      let opts = [cor];
      const candidates = item.type === "2D" ? [3, 4, 5, 6, 8] : [2, 3, 4, 5, 6];
      for (const c of shuffle(candidates)) {
        const v = `${c} ${label}`;
        if (!opts.includes(v) && opts.length < 4) opts.push(v);
      }
      return { question: `¿Cuántos ${label} tiene el ${item.name}?`, cor, opts: shuffle(opts), showShape: false, item };
    },
    // Tipo 4: ¿Esta figura es 2D o 3D?
    (item) => {
      const cor = item.type;
      return {
        question: `¿El ${item.name} es una figura 2D o 3D?`,
        cor,
        opts: shuffle(["2D", "3D", "Ambas", "Ninguna"]),
        showShape: true,
        item,
      };
    },
    // Tipo 5: ¿A qué categoría pertenece X?
    (item) => {
      const cor = item.category;
      const allCats = [...new Set(SHAPES.map((s) => s.category))];
      let opts = [cor];
      for (const c of shuffle(allCats)) {
        if (!opts.includes(c) && opts.length < 4) opts.push(c);
      }
      while (opts.length < 4) opts.push("Ninguna de las anteriores");
      return { question: `¿A qué categoría pertenece el ${item.name}?`, cor, opts: shuffle(opts), showShape: true, item };
    },
  ];

  const questions = [];
  const pool = shuffle([...SHAPES]);

  for (let i = 0; i < count; i++) {
    const item = pool[i % pool.length];
    const typeIdx = Math.floor(Math.random() * types.length);
    const q = types[typeIdx](item);
    if (q) questions.push(q);
    else {
      const fallback = types[1](item);
      questions.push(fallback);
    }
  }

  return shuffle(questions).slice(0, count);
}

/* ───────── MODO QUIZ ───────── */

const TOTAL_Q = 15;

function QuizMode({ onBack }) {
  const [qs] = useState(() => makeQuestions(TOTAL_Q));
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [sc, setSc] = useState(0);
  const [str, setStr] = useState(0);
  const [bStr, setBStr] = useState(0);
  const [conf, setConf] = useState(0);
  const [done, setDone] = useState(false);

  const pick = (o) => {
    if (sel !== null) return;
    setSel(o);
    const isC = o === qs[qi].cor;
    if (isC) {
      setSc((s) => s + 1);
      setStr((s) => {
        const n = s + 1;
        setBStr((b) => Math.max(b, n));
        return n;
      });
      setConf((c) => c + 1);
    } else {
      setStr(0);
    }
    setTimeout(() => {
      if (qi + 1 >= TOTAL_Q) setDone(true);
      else { setQi((i) => i + 1); setSel(null); }
    }, 1200);
  };

  if (done) {
    const pct = sc / TOTAL_Q;
    const msg = pct >= 0.9 ? "¡Experta en geometría!" : pct >= 0.6 ? "¡Muy bien!" : "¡Sigue practicando!";
    return (
      <div style={{ textAlign: "center" }}>
        <Confetti active={conf} />
        <div style={{ fontSize: 64, marginBottom: 8 }}>🎉</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#333" }}>¡Quiz terminado!</h2>
        <Stars score={sc} total={TOTAL_Q} />
        <div style={{
          background: "linear-gradient(135deg,#667eea,#764ba2)",
          borderRadius: 20, padding: 20, margin: "16px 0",
          color: "white", textAlign: "center",
        }}>
          <div style={{ fontSize: 36, fontWeight: 800 }}>{sc}/{TOTAL_Q}</div>
          <div style={{ fontSize: 14, opacity: 0.9 }}>respuestas correctas</div>
          <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>🔥 Mejor racha: {bStr}</div>
        </div>
        <div style={{ fontSize: 16, color: "#555", marginBottom: 16 }}>{msg}</div>
        <button onClick={onBack} style={pill("linear-gradient(135deg,#667eea,#764ba2)")}>Volver al menú</button>
      </div>
    );
  }

  const q = qs[qi];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <button onClick={onBack} style={pill("rgba(255,255,255,0.85)", "#333")}>◀ Menú</button>
        <span style={{ fontSize: 13, color: "#888", fontWeight: 600 }}>
          {qi + 1}/{TOTAL_Q} · ✅ {sc} {str > 1 && `· 🔥${str}`}
        </span>
      </div>
      <PBar value={qi + 1} max={TOTAL_Q} />
      <Confetti active={conf} />

      <div style={{
        background: "white",
        borderRadius: 20,
        padding: 20,
        margin: "16px 0",
        boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
        textAlign: "center",
      }}>
        {q.showShape && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <ShapeSVG shapeId={q.item.id} size={100} color={q.item.color} />
          </div>
        )}
        <div style={{ fontSize: 16, fontWeight: 700, color: "#333", lineHeight: 1.4 }}>{q.question}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.opts.map((o) => (
          <OptionButton key={o} text={o} sel={sel} cor={q.cor} onClick={() => pick(o)} />
        ))}
      </div>
    </div>
  );
}

/* ───────── MODO DESAFÍO ───────── */

function ChallengeMode({ onBack }) {
  const [qs] = useState(() => makeQuestions(96));
  const [qi, setQi] = useState(0);
  const [sel, setSel] = useState(null);
  const [sc, setSc] = useState(0);
  const [str, setStr] = useState(0);
  const [tm, setTm] = useState(60);
  const [st, setSt] = useState("ready");
  const [conf, setConf] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (st !== "playing") return;
    ref.current = setInterval(() => {
      setTm((t) => {
        if (t <= 1) {
          clearInterval(ref.current);
          setSt("done");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, [st]);

  const start = () => {
    setSt("playing");
    setTm(60);
    setSc(0);
    setStr(0);
    setQi(0);
    setSel(null);
  };

  const pick = (o) => {
    if (sel !== null || st !== "playing") return;
    setSel(o);
    const isC = o === qs[qi].cor;
    if (isC) {
      setSc((s) => s + 1);
      setStr((s) => s + 1);
      setConf((c) => c + 1);
    } else {
      setStr(0);
    }
    setTimeout(() => {
      if (qi + 1 >= qs.length) { clearInterval(ref.current); setSt("done"); }
      else { setQi((i) => i + 1); setSel(null); }
    }, 600);
  };

  const tc = tm <= 10 ? "#ef5350" : tm <= 30 ? "#FFA726" : "#66BB6A";

  if (st === "ready") {
    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={onBack} style={{ ...pill("rgba(255,255,255,0.85)", "#333"), marginBottom: 20, alignSelf: "flex-start" }}>◀ Menú</button>
        <div style={{ fontSize: 64, marginBottom: 12 }}>⚡</div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#333" }}>Desafío Relámpago</h2>
        <p style={{ fontSize: 14, color: "#666", margin: "8px 0 24px", lineHeight: 1.5 }}>
          Responde tantas preguntas como puedas en 60 segundos sobre figuras geométricas, fórmulas y propiedades.
        </p>
        <div style={{
          background: "linear-gradient(135deg,#667eea22,#764ba222)",
          borderRadius: 16, padding: 16, marginBottom: 24, fontSize: 14, color: "#555",
        }}>
          ⏱️ 60 segundos · 📝 Preguntas variadas · 🔥 Acumula rachas
        </div>
        <style>{`@keyframes gPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}`}</style>
        <button
          onClick={start}
          style={{
            ...pill("linear-gradient(135deg,#667eea,#764ba2)"),
            fontSize: 18,
            padding: "14px 40px",
            animation: "gPulse 1.5s infinite",
          }}
        >
          ¡Empezar! 🚀
        </button>
      </div>
    );
  }

  if (st === "done") {
    const msg = sc >= 15 ? "¡Increíble!" : sc >= 10 ? "¡Muy rápida!" : sc >= 5 ? "¡Bien!" : "¡Practica más!";
    return (
      <div style={{ textAlign: "center" }}>
        <Confetti active={conf} />
        <div style={{ fontSize: 64, marginBottom: 8 }}>🏆</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#333" }}>¡Tiempo!</h2>
        <Stars score={sc} total={Math.max(sc, 15)} />
        <div style={{
          background: "linear-gradient(135deg,#667eea,#764ba2)",
          borderRadius: 20, padding: 20, margin: "16px 0", color: "white",
        }}>
          <div style={{ fontSize: 36, fontWeight: 800 }}>{sc}</div>
          <div style={{ fontSize: 14, opacity: 0.9 }}>respuestas correctas en 60s</div>
        </div>
        <div style={{ fontSize: 16, color: "#555", marginBottom: 16 }}>{msg}</div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={start} style={pill("linear-gradient(135deg,#667eea,#764ba2)")}>Reintentar ⚡</button>
          <button onClick={onBack} style={pill("rgba(255,255,255,0.85)", "#333")}>Menú</button>
        </div>
      </div>
    );
  }

  const q = qs[qi];

  return (
    <div>
      <Confetti active={conf} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{
          fontSize: 28, fontWeight: 800, color: tc,
          animation: tm <= 10 ? "gPulse 0.5s infinite" : "none",
        }}>
          ⏱️ {tm}s
        </div>
        <span style={{ fontSize: 13, color: "#888", fontWeight: 600 }}>
          ✅ {sc} {str > 1 && `· 🔥${str}`}
        </span>
      </div>

      <div style={{
        width: "100%", height: 6, background: "#e0e0e0", borderRadius: 3, overflow: "hidden", marginBottom: 14,
      }}>
        <div style={{
          width: `${(tm / 60) * 100}%`, height: "100%", background: tc,
          borderRadius: 3, transition: "width 1s linear, background 0.5s",
        }} />
      </div>

      <div style={{
        background: "white", borderRadius: 20, padding: 18, marginBottom: 12,
        boxShadow: "0 4px 16px rgba(0,0,0,0.07)", textAlign: "center",
      }}>
        {q.showShape && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <ShapeSVG shapeId={q.item.id} size={80} color={q.item.color} />
          </div>
        )}
        <div style={{ fontSize: 15, fontWeight: 700, color: "#333" }}>{q.question}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {q.opts.map((o) => (
          <OptionButton key={o} text={o} sel={sel} cor={q.cor} onClick={() => pick(o)} />
        ))}
      </div>
    </div>
  );
}

/* ───────── COMPONENTE PRINCIPAL ───────── */

export default function FigurasGeometricas() {
  const [screen, setScreen] = useState("menu");
  const [floats, setFloats] = useState([]);

  useEffect(() => {
    if (screen !== "menu") return;
    const iv = setInterval(() => {
      setFloats((f) =>
        [
          ...f,
          {
            id: Date.now(),
            emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
            x: Math.random() * 80 + 10,
          },
        ].slice(-8)
      );
    }, 1800);
    return () => clearInterval(iv);
  }, [screen]);

  const screens = {
    explore: ExploreMode,
    learn: LearnMode,
    quiz: QuizMode,
    challenge: ChallengeMode,
  };

  const Screen = screens[screen];

  if (Screen) {
    return (
      <div style={gameCtn}>
        <Screen onBack={() => setScreen("menu")} />
      </div>
    );
  }

  const modes = [
    {
      key: "explore",
      icon: "🔍",
      title: "Explorar Figuras",
      desc: "Galería visual de figuras 2D y 3D con propiedades y fórmulas",
      gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    },
    {
      key: "learn",
      icon: "📚",
      title: "Aprende",
      desc: "Flashcards con figuras, fórmulas y datos curiosos",
      gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
    },
    {
      key: "quiz",
      icon: "🧠",
      title: "Quiz",
      desc: "15 preguntas sobre figuras, fórmulas y propiedades",
      gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
    },
    {
      key: "challenge",
      icon: "⚡",
      title: "Desafío Relámpago",
      desc: "¡60 segundos para demostrar cuánto sabes!",
      gradient: "linear-gradient(135deg, #F9A825, #f12711)",
    },
  ];

  return (
    <div style={gameCtn}>
      {floats.map((f) => (
        <div
          key={f.id}
          style={{
            position: "fixed",
            left: `${f.x}%`,
            bottom: -40,
            fontSize: 28,
            opacity: 0.15,
            pointerEvents: "none",
            animation: "gFloat 4s ease-out forwards",
          }}
        >
          {f.emoji}
        </div>
      ))}
      <style>{`@keyframes gFloat{0%{transform:translateY(0);opacity:0.15}100%{transform:translateY(-600px);opacity:0}}`}</style>

      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 56, marginBottom: 4 }}>📐</div>
        <h1 style={{
          fontSize: 26, fontWeight: 900, margin: 0,
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Figuras Geométricas
        </h1>
        <p style={{ fontSize: 14, color: "#888", margin: "4px 0 0" }}>
          Aprende figuras 2D, polígonos y volúmenes 3D
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => setScreen(m.key)}
            style={{
              background: m.gradient,
              border: "none",
              borderRadius: 20,
              padding: "20px 22px",
              color: "white",
              cursor: "pointer",
              transition: "transform .2s",
              boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              gap: 16,
              textAlign: "left",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <span style={{ fontSize: 36 }}>{m.icon}</span>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800 }}>{m.title}</div>
              <div style={{ fontSize: 13, opacity: 0.9, marginTop: 2, lineHeight: 1.3 }}>{m.desc}</div>
            </div>
          </button>
        ))}
      </div>

      <div style={{ fontSize: 12, color: "#bbb", textAlign: "center", marginTop: 20 }}>
        {SHAPES_2D.length} figuras 2D · {SHAPES_3D.length} volúmenes 3D · ¡A aprender! 📐
      </div>
    </div>
  );
}

const gameCtn = {
  fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  maxWidth: 480,
  margin: "0 auto",
  padding: "24px 12px",
  minHeight: "100vh",
  background: "linear-gradient(180deg, #f0f0ff 0%, #fff5f5 50%, #f0f4ff 100%)",
};

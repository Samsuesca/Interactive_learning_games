import { useState } from "react";
import useGameRewards from "../../hooks/useGameRewards";
import { GameShell, QuizMode, ChallengeMode, LearnMode } from "../../engine";
import { OptionButton } from "../../components/game";
import { pill } from "../../components/game/utils";

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

/* ───────── QUESTION TYPES ───────── */

const QUESTION_TYPES = [
  {
    prompt: (item) => `¿Cuál es la fórmula del ${item.type === "2D" ? "área" : "volumen"} del ${item.name}?`,
    answer: (item) => item.formula,
  },
  {
    prompt: (item) => `¿Qué figura es esta? (${item.type})`,
    answer: (item) => item.name,
  },
  {
    prompt: (item) => `¿A qué categoría pertenece el ${item.name}?`,
    answer: (item) => item.category,
  },
  {
    prompt: (item) => `¿Cuál es la fórmula del ${item.type === "2D" ? "perímetro" : "superficie"} del ${item.name}?`,
    answer: (item) => item.perimeter,
  },
];

/* ───────── CUSTOM QUESTION RENDERER ───────── */

function renderShapeQuestion(q, { selected, pick }) {
  return (
    <>
      <div style={{
        background: "white",
        borderRadius: 20,
        padding: 20,
        boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
        textAlign: "center",
        width: "100%",
        maxWidth: 400,
      }}>
        {q.item && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <ShapeSVG shapeId={q.item.id} size={100} color={q.item.color} />
          </div>
        )}
        <div style={{ fontSize: 16, fontWeight: 700, color: "#333", lineHeight: 1.4 }}>{q.prompt}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 400 }}>
        {q.options.map((o) => (
          <OptionButton key={o} text={o} selected={selected} correct={q.correct} onClick={() => pick(o)} />
        ))}
      </div>
    </>
  );
}

/* ───────── MODO EXPLORAR (GALERÍA) - game-specific ───────── */

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

/* ───────── WIRED LEARN MODE ───────── */

function FGLearnMode(props) {
  return (
    <LearnMode
      {...props}
      data={SHAPES}
      frontGradient="linear-gradient(135deg,#667eea,#764ba2)"
      backGradient="linear-gradient(135deg,#f5f7fa,#c3cfe2)"
      progressGradient="linear-gradient(90deg,#667eea,#764ba2)"
      navColor="#667eea"
      renderFront={(shape) => (
        <>
          <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: 12, marginBottom: 16 }}>
            <ShapeSVG shapeId={shape.id} size={120} color="rgba(255,255,255,0.9)" />
          </div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>{shape.name}</div>
          <div style={{ fontSize: 14, opacity: 0.9, marginTop: 4 }}>{shape.category} · {shape.type}</div>
        </>
      )}
      renderBack={(shape) => (
        <div style={{ color: "#333", textAlign: "center", width: "100%" }}>
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
        </div>
      )}
    />
  );
}

/* ───────── WIRED QUIZ MODE ───────── */

function FGQuizMode(props) {
  return (
    <QuizMode
      {...props}
      data={SHAPES}
      questionTypes={QUESTION_TYPES}
      count={15}
      questionGradient="linear-gradient(135deg,#667eea,#764ba2)"
      progressGradient="linear-gradient(90deg,#667eea,#764ba2)"
      renderQuestion={renderShapeQuestion}
    />
  );
}

/* ───────── WIRED CHALLENGE MODE ───────── */

function FGChallengeMode(props) {
  return (
    <ChallengeMode
      {...props}
      data={SHAPES}
      questionTypes={QUESTION_TYPES}
      questionGradient="linear-gradient(135deg,#667eea,#764ba2)"
      renderQuestion={renderShapeQuestion}
    />
  );
}

/* ───────── MAIN COMPONENT ───────── */

export default function FigurasGeometricas() {
  const { saveQuiz, saveChallenge, saveLearned } = useGameRewards("figuras-geometricas");

  return (
    <GameShell
      config={{
        id: "figuras-geometricas",
        title: "Figuras Geométricas",
        icon: "📐",
        gradient: "linear-gradient(180deg, #f0f0ff 0%, #fff5f5 50%, #f0f4ff 100%)",
        titleGradient: "linear-gradient(135deg, #667eea, #764ba2)",
        subtitle: "Aprende figuras 2D, polígonos y volúmenes 3D",
        footer: `${SHAPES_2D.length} figuras 2D · ${SHAPES_3D.length} volúmenes 3D · ¡A aprender! 📐`,
        emojis: ["🔺", "⬡", "🎲", "⭕", "🔷", "📐", "🌍", "🛑"],
        modes: [
          { key: "explore", icon: "🔍", title: "Explorar Figuras", desc: "Galería visual de figuras 2D y 3D con propiedades y fórmulas", gradient: "linear-gradient(135deg, #667eea, #764ba2)", component: ExploreMode },
          { key: "learn", icon: "📚", title: "Aprende", desc: "Flashcards con figuras, fórmulas y datos curiosos", gradient: "linear-gradient(135deg, #f093fb, #f5576c)", component: FGLearnMode },
          { key: "quiz", icon: "🧠", title: "Quiz", desc: "15 preguntas sobre figuras, fórmulas y propiedades", gradient: "linear-gradient(135deg, #4facfe, #00f2fe)", component: FGQuizMode },
          { key: "challenge", icon: "⚡", title: "Desafío Relámpago", desc: "¡60 segundos para demostrar cuánto sabes!", gradient: "linear-gradient(135deg, #F9A825, #f12711)", component: FGChallengeMode },
        ],
      }}
      progressHooks={{ saveQuiz, saveChallenge, saveLearned }}
    />
  );
}

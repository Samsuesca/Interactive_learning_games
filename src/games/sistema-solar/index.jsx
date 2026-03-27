import { useState, useEffect, useMemo } from "react";
import useGameRewards from "../../hooks/useGameRewards";
import { GameShell, QuizMode, ChallengeMode, LearnMode } from "../../engine";
import { Confetti } from "../../components/game";
import { pill } from "../../components/game/utils";

// =================== SOLAR SYSTEM DATA ===================
const SOLAR_SYSTEM = [
  {
    name: "Sol",
    symbol: "☀️",
    type: "Estrella",
    distanceAU: 0,
    distanceKm: "0 km",
    diameter: "1,392,700 km",
    mass: "333,000x Tierra",
    gravity: "274 m/s²",
    moons: 0,
    orbitalPeriod: "-",
    rotationPeriod: "25 días",
    temperature: "5,500°C",
    atmosphere: "Hidrógeno, Helio",
    fact: "Contiene el 99.86% de la masa del sistema solar",
    color: "#FFD700",
    radius: 28,
    orbitRadius: 0,
    orbitSpeed: 0,
  },
  {
    name: "Mercurio",
    symbol: "☿️",
    type: "Planeta rocoso",
    distanceAU: 0.39,
    distanceKm: "57.9 millones km",
    diameter: "4,879 km",
    mass: "0.055x Tierra",
    gravity: "3.7 m/s²",
    moons: 0,
    orbitalPeriod: "88 días",
    rotationPeriod: "59 días",
    temperature: "167°C (promedio)",
    atmosphere: "Casi inexistente",
    fact: "Un día en Mercurio dura más que su año: 176 días terrestres de sol a sol",
    color: "#b0b0b0",
    radius: 5,
    orbitRadius: 60,
    orbitSpeed: 88,
  },
  {
    name: "Venus",
    symbol: "♀️",
    type: "Planeta rocoso",
    distanceAU: 0.72,
    distanceKm: "108.2 millones km",
    diameter: "12,104 km",
    mass: "0.815x Tierra",
    gravity: "8.87 m/s²",
    moons: 0,
    orbitalPeriod: "225 días",
    rotationPeriod: "243 días",
    temperature: "464°C",
    atmosphere: "CO₂, Nitrógeno",
    fact: "Gira en sentido contrario a los demás planetas y es el más caliente del sistema solar",
    color: "#e8c56d",
    radius: 8,
    orbitRadius: 90,
    orbitSpeed: 225,
  },
  {
    name: "Tierra",
    symbol: "🌍",
    type: "Planeta rocoso",
    distanceAU: 1.0,
    distanceKm: "149.6 millones km",
    diameter: "12,742 km",
    mass: "1x Tierra",
    gravity: "9.81 m/s²",
    moons: 1,
    orbitalPeriod: "365 días",
    rotationPeriod: "24 horas",
    temperature: "15°C (promedio)",
    atmosphere: "Nitrógeno, Oxígeno",
    fact: "Es el único planeta conocido con vida y el 71% de su superficie es agua",
    color: "#4a90d9",
    radius: 8,
    orbitRadius: 120,
    orbitSpeed: 365,
  },
  {
    name: "Marte",
    symbol: "♂️",
    type: "Planeta rocoso",
    distanceAU: 1.52,
    distanceKm: "227.9 millones km",
    diameter: "6,779 km",
    mass: "0.107x Tierra",
    gravity: "3.72 m/s²",
    moons: 2,
    orbitalPeriod: "687 días",
    rotationPeriod: "24.6 horas",
    temperature: "-65°C (promedio)",
    atmosphere: "CO₂, Nitrógeno, Argón",
    fact: "Tiene el volcán más grande del sistema solar: el Olympus Mons con 21.9 km de altura",
    color: "#c0392b",
    radius: 6,
    orbitRadius: 155,
    orbitSpeed: 687,
  },
  {
    name: "Júpiter",
    symbol: "♃",
    type: "Gigante gaseoso",
    distanceAU: 5.20,
    distanceKm: "778.5 millones km",
    diameter: "139,820 km",
    mass: "317.8x Tierra",
    gravity: "24.79 m/s²",
    moons: 95,
    orbitalPeriod: "12 años",
    rotationPeriod: "9.9 horas",
    temperature: "-110°C",
    atmosphere: "Hidrógeno, Helio",
    fact: "Su Gran Mancha Roja es una tormenta que ha durado más de 350 años",
    color: "#d4956a",
    radius: 18,
    orbitRadius: 205,
    orbitSpeed: 4333,
  },
  {
    name: "Saturno",
    symbol: "♄",
    type: "Gigante gaseoso",
    distanceAU: 9.58,
    distanceKm: "1,434 millones km",
    diameter: "116,460 km",
    mass: "95.2x Tierra",
    gravity: "10.44 m/s²",
    moons: 146,
    orbitalPeriod: "29 años",
    rotationPeriod: "10.7 horas",
    temperature: "-140°C",
    atmosphere: "Hidrógeno, Helio",
    fact: "Sus anillos están hechos de hielo y roca y se extienden hasta 282,000 km desde el planeta",
    color: "#c9a96e",
    radius: 15,
    orbitRadius: 260,
    orbitSpeed: 10759,
  },
  {
    name: "Urano",
    symbol: "♅",
    type: "Gigante helado",
    distanceAU: 19.18,
    distanceKm: "2,871 millones km",
    diameter: "50,724 km",
    mass: "14.5x Tierra",
    gravity: "8.87 m/s²",
    moons: 28,
    orbitalPeriod: "84 años",
    rotationPeriod: "17.2 horas",
    temperature: "-195°C",
    atmosphere: "Hidrógeno, Helio, Metano",
    fact: "Gira de lado con una inclinación de 98°, como si rodara alrededor del Sol",
    color: "#73c2c6",
    radius: 12,
    orbitRadius: 310,
    orbitSpeed: 30687,
  },
  {
    name: "Neptuno",
    symbol: "♆",
    type: "Gigante helado",
    distanceAU: 30.07,
    distanceKm: "4,495 millones km",
    diameter: "49,244 km",
    mass: "17.1x Tierra",
    gravity: "11.15 m/s²",
    moons: 16,
    orbitalPeriod: "165 años",
    rotationPeriod: "16.1 horas",
    temperature: "-200°C",
    atmosphere: "Hidrógeno, Helio, Metano",
    fact: "Tiene los vientos más fuertes del sistema solar, alcanzando 2,100 km/h",
    color: "#3b5998",
    radius: 11,
    orbitRadius: 355,
    orbitSpeed: 60190,
  },
  {
    name: "Plutón",
    symbol: "♇",
    type: "Planeta enano",
    distanceAU: 39.48,
    distanceKm: "5,906 millones km",
    diameter: "2,377 km",
    mass: "0.002x Tierra",
    gravity: "0.62 m/s²",
    moons: 5,
    orbitalPeriod: "248 años",
    rotationPeriod: "6.4 días",
    temperature: "-230°C",
    atmosphere: "Nitrógeno, Metano, CO",
    fact: "Fue reclasificado como planeta enano en 2006 y tiene un corazón de hielo en su superficie",
    color: "#a08060",
    radius: 4,
    orbitRadius: 390,
    orbitSpeed: 90560,
  },
  {
    name: "Ceres",
    symbol: "⚳",
    type: "Planeta enano",
    distanceAU: 2.77,
    distanceKm: "413.7 millones km",
    diameter: "939 km",
    mass: "0.00016x Tierra",
    gravity: "0.28 m/s²",
    moons: 0,
    orbitalPeriod: "4.6 años",
    rotationPeriod: "9 horas",
    temperature: "-105°C",
    atmosphere: "Muy tenue, vapor de agua",
    fact: "Es el objeto más grande del cinturón de asteroides y tiene puntos brillantes de sal en su superficie",
    color: "#808590",
    radius: 4,
    orbitRadius: 180,
    orbitSpeed: 1682,
  },
];

const PLANETS_ONLY = SOLAR_SYSTEM.filter((d) => d.type !== "Estrella");

// =================== QUESTION TYPES ===================
const QUESTION_TYPES = [
  {
    prompt: (item) => `¿Qué tipo de cuerpo celeste es ${item.symbol} ${item.name}?`,
    answer: (item) => item.type,
  },
  {
    prompt: (item) => `¿Cuántas lunas tiene ${item.symbol} ${item.name}?`,
    answer: (item) => String(item.moons),
  },
  {
    prompt: (item) => `¿Cuál es la temperatura de ${item.symbol} ${item.name}?`,
    answer: (item) => item.temperature,
  },
  {
    prompt: (item) => `¿Cuál es el período orbital de ${item.symbol} ${item.name}?`,
    answer: (item) => item.orbitalPeriod,
  },
];

// =================== TYPE COLOR BADGE ===================
const TYPE_COLORS = {
  Estrella: { bg: "#fff3cd", text: "#856404", border: "#ffc107" },
  "Planeta rocoso": { bg: "#d4edda", text: "#155724", border: "#28a745" },
  "Gigante gaseoso": { bg: "#cce5ff", text: "#004085", border: "#007bff" },
  "Gigante helado": { bg: "#d1ecf1", text: "#0c5460", border: "#17a2b8" },
  "Planeta enano": { bg: "#e2d5f1", text: "#4a2072", border: "#7c4dff" },
};

function TypeBadge({ type }) {
  const tc = TYPE_COLORS[type] || { bg: "#eee", text: "#333", border: "#ccc" };
  return (
    <span
      style={{
        display: "inline-block",
        background: tc.bg,
        color: tc.text,
        border: `1px solid ${tc.border}`,
        borderRadius: 12,
        padding: "2px 10px",
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {type}
    </span>
  );
}

// =================== EXPLORE MODE ===================
function ExploreMode({ onBack }) {
  const [selected, setSelected] = useState(null);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, []);

  const SVG_W = 460;
  const SVG_H = 460;
  const CX = SVG_W / 2;
  const CY = SVG_H / 2;

  // Filter out Ceres for the orbit display (put it as a clickable dot in the asteroid belt)
  const orbitBodies = SOLAR_SYSTEM.filter((d) => d.name !== "Ceres");
  const ceres = SOLAR_SYSTEM.find((d) => d.name === "Ceres");

  const item = selected !== null ? SOLAR_SYSTEM.find((d) => d.name === selected) : null;

  const keyframesCSS = useMemo(() => {
    let css = `@keyframes glow{0%,100%{filter:drop-shadow(0 0 8px #FFD700)}50%{filter:drop-shadow(0 0 20px #FFA500)}}`;
    css += `@keyframes twinkle{0%,100%{opacity:0.3}50%{opacity:1}}`;
    orbitBodies
      .filter((d) => d.orbitRadius > 0)
      .forEach((d) => {
        const dur = Math.max(8, d.orbitSpeed / 80);
        css += `@keyframes orbit-${d.name}{0%{transform:rotate(${Math.random() * 360}deg) translateX(${d.orbitRadius * 0.45}px) rotate(-${Math.random() * 360}deg)}100%{transform:rotate(${Math.random() * 360 + 360}deg) translateX(${d.orbitRadius * 0.45}px) rotate(-${Math.random() * 360 + 360}deg)}}`;
        css += `.planet-${d.name}{animation:orbit-${d.name} ${dur}s linear infinite}`;
      });
    if (ceres) {
      const dur = Math.max(8, ceres.orbitSpeed / 80);
      css += `@keyframes orbit-${ceres.name}{0%{transform:rotate(${Math.random() * 360 + 120}deg) translateX(${ceres.orbitRadius * 0.45}px) rotate(-${Math.random() * 360 + 120}deg)}100%{transform:rotate(${Math.random() * 360 + 480}deg) translateX(${ceres.orbitRadius * 0.45}px) rotate(-${Math.random() * 360 + 480}deg)}}`;
      css += `.planet-${ceres.name}{animation:orbit-${ceres.name} ${dur}s linear infinite}`;
    }
    return css;
  }, []);

  // Generate random stars
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        cx: Math.random() * SVG_W,
        cy: Math.random() * SVG_H,
        r: Math.random() * 1.2 + 0.3,
        delay: Math.random() * 3,
      })),
    [],
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "0 8px" }}>
      <style>{keyframesCSS}</style>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 420,
          alignItems: "center",
        }}
      >
        <button onClick={onBack} style={pill("#e0e0e0", "#333")}>
          ← Menú
        </button>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#aaa" }}>🔭 Toca un planeta</span>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: SVG_W,
          aspectRatio: "1",
          borderRadius: 24,
          overflow: "hidden",
          background: "radial-gradient(ellipse at center, #0c0c2e 0%, #050518 100%)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          position: "relative",
        }}
      >
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" height="100%">
          {/* Background stars */}
          {stars.map((s, i) => (
            <circle
              key={i}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              fill="white"
              opacity={0.5}
              style={{ animation: `twinkle ${2 + s.delay}s ease-in-out ${s.delay}s infinite` }}
            />
          ))}

          {/* Orbit lines */}
          {orbitBodies
            .filter((d) => d.orbitRadius > 0)
            .map((d) => (
              <circle
                key={`orbit-${d.name}`}
                cx={CX}
                cy={CY}
                r={d.orbitRadius * 0.45}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={0.8}
                strokeDasharray="3 5"
              />
            ))}

          {/* Ceres orbit (asteroid belt visual) */}
          {ceres && (
            <circle
              cx={CX}
              cy={CY}
              r={ceres.orbitRadius * 0.45}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={4}
              strokeDasharray="1 6"
            />
          )}

          {/* Sun */}
          <circle
            cx={CX}
            cy={CY}
            r={24}
            fill="#FFD700"
            style={{ animation: "glow 3s ease-in-out infinite", cursor: "pointer" }}
            onClick={() => setSelected("Sol")}
          />
          <circle cx={CX} cy={CY} r={18} fill="#FFA500" opacity={0.5} style={{ pointerEvents: "none" }} />

          {/* Planets (animated via CSS class on foreignObject-like groups) */}
          {orbitBodies
            .filter((d) => d.orbitRadius > 0)
            .map((d) => {
              const isSelected = selected === d.name;
              return (
                <g
                  key={d.name}
                  style={{
                    transformOrigin: `${CX}px ${CY}px`,
                  }}
                  className={`planet-${d.name}`}
                >
                  {/* The planet circle positioned at orbit distance from center */}
                  <g transform={`translate(${CX}, ${CY})`}>
                    {/* Saturn rings */}
                    {d.name === "Saturno" && (
                      <ellipse
                        cx={0}
                        cy={0}
                        rx={d.radius * 1.8}
                        ry={d.radius * 0.5}
                        fill="none"
                        stroke="#d4a76a"
                        strokeWidth={2.5}
                        opacity={0.7}
                        style={{ pointerEvents: "none" }}
                      />
                    )}
                    <circle
                      r={d.radius}
                      fill={d.color}
                      stroke={isSelected ? "#fff" : "transparent"}
                      strokeWidth={isSelected ? 2 : 0}
                      style={{ cursor: "pointer", filter: isSelected ? "brightness(1.3)" : "none" }}
                      onClick={() => setSelected(d.name)}
                    />
                    {/* Planet name */}
                    <text
                      y={d.radius + 12}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.7)"
                      fontSize={8}
                      fontWeight="600"
                      style={{ pointerEvents: "none" }}
                    >
                      {d.name}
                    </text>
                  </g>
                </g>
              );
            })}

          {/* Ceres */}
          {ceres && (
            <g
              style={{ transformOrigin: `${CX}px ${CY}px` }}
              className={`planet-${ceres.name}`}
            >
              <g transform={`translate(${CX}, ${CY})`}>
                <circle
                  r={ceres.radius}
                  fill={ceres.color}
                  stroke={selected === ceres.name ? "#fff" : "transparent"}
                  strokeWidth={selected === ceres.name ? 2 : 0}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelected(ceres.name)}
                />
                <text
                  y={ceres.radius + 10}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.6)"
                  fontSize={7}
                  fontWeight="600"
                  style={{ pointerEvents: "none" }}
                >
                  Ceres
                </text>
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Info card */}
      {item ? (
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            background: "linear-gradient(135deg, #1a1a4e, #2d1b69)",
            borderRadius: 20,
            padding: 20,
            color: "white",
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: item.name === "Sol" ? "radial-gradient(#FFD700, #FF8C00)" : item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                boxShadow: `0 0 20px ${item.color}66`,
              }}
            >
              {item.symbol}
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{item.name}</div>
              <TypeBadge type={item.type} />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              fontSize: 13,
            }}
          >
            <InfoRow label="📏 Distancia" value={item.distanceAU > 0 ? `${item.distanceAU} AU` : "-"} />
            <InfoRow label="🌐 Diámetro" value={item.diameter} />
            <InfoRow label="⚖️ Masa" value={item.mass} />
            <InfoRow label="🏋️ Gravedad" value={item.gravity} />
            <InfoRow label="🌙 Lunas" value={String(item.moons)} />
            <InfoRow label="🔄 Órbita" value={item.orbitalPeriod} />
            <InfoRow label="🌀 Rotación" value={item.rotationPeriod} />
            <InfoRow label="🌡️ Temperatura" value={item.temperature} />
          </div>

          <div
            style={{
              marginTop: 10,
              fontSize: 12,
              opacity: 0.8,
              lineHeight: 1.4,
            }}
          >
            💨 <strong>Atmósfera:</strong> {item.atmosphere}
          </div>

          <div
            style={{
              marginTop: 10,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: "10px 14px",
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            💡 <em>{item.fact}</em>
          </div>
        </div>
      ) : (
        <div
          style={{
            fontSize: 14,
            color: "#888",
            textAlign: "center",
            padding: 16,
          }}
        >
          Selecciona un cuerpo celeste para ver su información
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        borderRadius: 10,
        padding: "6px 10px",
      }}
    >
      <div style={{ fontSize: 11, opacity: 0.7 }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: 13 }}>{value}</div>
    </div>
  );
}

// =================== MAIN COMPONENT ===================
export default function SistemaSolar() {
  const { progress, saveQuiz, saveChallenge, saveLearned } = useGameRewards("sistema-solar");

  return (
    <GameShell
      config={{
        id: "sistema-solar",
        title: "Sistema Solar",
        icon: "🪐",
        gradient: "linear-gradient(180deg,#0c0c2e 0%,#1a1a4e 50%,#2d1b69 100%)",
        titleGradient: "linear-gradient(135deg,#f39c12,#e74c3c)",
        subtitle: "Explora los planetas y el espacio",
        footer: "11 cuerpos celestes · Explorar · Quiz · Desafío",
        emojis: ["🌍", "🪐", "☀️", "🌙", "⭐", "🚀"],
        extraProps: {
          data: SOLAR_SYSTEM,
          questionTypes: QUESTION_TYPES,
        },
        modes: [
          {
            key: "explore",
            icon: "🔭",
            title: "Explorar",
            desc: "Recorre el sistema solar interactivo",
            gradient: "linear-gradient(135deg,#0c3547,#1a6b8a)",
            component: ExploreMode,
          },
          {
            key: "learn",
            icon: "📚",
            title: "Aprender",
            desc: "Tarjetas con datos de cada planeta",
            gradient: "linear-gradient(135deg,#11998e,#38ef7d)",
            component: SolarLearnMode,
          },
          {
            key: "quiz",
            icon: "🧠",
            title: "Quiz",
            desc: "Pon a prueba tu conocimiento espacial",
            gradient: "linear-gradient(135deg,#6c5ce7,#a29bfe)",
            component: SolarQuizMode,
          },
          {
            key: "challenge",
            icon: "⚡",
            title: "Desafío",
            desc: "¡60 segundos para brillar como una estrella!",
            gradient: "linear-gradient(135deg,#e17055,#d63031)",
            component: SolarChallengeMode,
          },
        ],
      }}
      progressHooks={{ saveQuiz, saveChallenge, saveLearned }}
    />
  );
}

// =================== LEARN MODE WRAPPER ===================
function SolarLearnMode({ onBack, saveLearned }) {
  return (
    <LearnMode
      data={SOLAR_SYSTEM}
      onBack={onBack}
      saveLearned={saveLearned}
      frontGradient="linear-gradient(135deg,#0c3547,#1a6b8a)"
      backGradient="linear-gradient(135deg,#2d1b69,#1a1a4e)"
      progressGradient="linear-gradient(90deg,#f39c12,#e74c3c)"
      navColor="#1a6b8a"
      renderFront={(item) => (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background:
                item.name === "Sol"
                  ? "radial-gradient(#FFD700, #FF8C00)"
                  : item.color,
              margin: "0 auto 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              boxShadow: `0 0 30px ${item.color}88`,
            }}
          >
            {item.symbol}
          </div>
          <div style={{ fontSize: 26, fontWeight: 800 }}>{item.name}</div>
          <TypeBadge type={item.type} />
          {item.name === "Saturno" && (
            <div style={{ fontSize: 11, marginTop: 6, opacity: 0.7 }}>
              ♄ Famoso por sus anillos
            </div>
          )}
        </div>
      )}
      renderBack={(item) => (
        <div style={{ fontSize: 13, lineHeight: 1.7, width: "100%", maxWidth: 320 }}>
          <div style={{ fontSize: 18, fontWeight: 800, textAlign: "center", marginBottom: 10 }}>
            {item.symbol} {item.name}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            <BackItem label="Distancia" value={item.distanceAU > 0 ? `${item.distanceAU} AU` : "Centro"} />
            <BackItem label="Diámetro" value={item.diameter} />
            <BackItem label="Lunas" value={String(item.moons)} />
            <BackItem label="Temperatura" value={item.temperature} />
            <BackItem label="Órbita" value={item.orbitalPeriod} />
            <BackItem label="Gravedad" value={item.gravity} />
          </div>
          <div
            style={{
              marginTop: 8,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 10,
              padding: "8px 10px",
              fontSize: 12,
              textAlign: "center",
            }}
          >
            💡 {item.fact}
          </div>
        </div>
      )}
    />
  );
}

function BackItem({ label, value }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "4px 8px" }}>
      <div style={{ fontSize: 10, opacity: 0.7 }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: 12 }}>{value}</div>
    </div>
  );
}

// =================== QUIZ MODE WRAPPER ===================
function SolarQuizMode({ onBack, saveQuiz }) {
  return (
    <QuizMode
      data={SOLAR_SYSTEM}
      questionTypes={QUESTION_TYPES}
      count={12}
      questionGradient="linear-gradient(135deg,#1a1a4e,#2d1b69)"
      progressGradient="linear-gradient(90deg,#f39c12,#e74c3c)"
      onBack={onBack}
      saveQuiz={saveQuiz}
    />
  );
}

// =================== CHALLENGE MODE WRAPPER ===================
function SolarChallengeMode({ onBack, saveChallenge }) {
  return (
    <ChallengeMode
      data={SOLAR_SYSTEM}
      questionTypes={QUESTION_TYPES}
      timeLimit={60}
      poolSize={88}
      questionGradient="linear-gradient(135deg,#1a1a4e,#2d1b69)"
      onBack={onBack}
      saveChallenge={saveChallenge}
    />
  );
}

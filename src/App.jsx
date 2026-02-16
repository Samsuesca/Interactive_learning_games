import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ExploraColombia from "./games/explora-colombia";
import CapitalesSudamerica from "./games/capitales-sudamerica";
import FigurasGeometricas from "./games/figuras-geometricas";

const games = [
  {
    path: "/explora-colombia",
    title: "Explora Colombia",
    desc: "Aprende los departamentos, capitales y regiones de Colombia con mapas, tarjetas, quiz y desafíos.",
    icon: "🇨🇴",
    gradient: "linear-gradient(135deg, #F9A825, #f12711)",
    component: ExploraColombia,
  },
  {
    path: "/capitales-sudamerica",
    title: "Capitales de Sudamérica",
    desc: "Aprende las capitales de los 12 países sudamericanos con mapa, tarjetas y quiz.",
    icon: "🌎",
    gradient: "linear-gradient(135deg, #11998e, #38ef7d)",
    component: CapitalesSudamerica,
  },
  {
    path: "/figuras-geometricas",
    title: "Figuras Geométricas",
    desc: "Aprende figuras 2D, polígonos y volúmenes 3D con fórmulas, propiedades y quiz interactivos.",
    icon: "📐",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    component: FigurasGeometricas,
  },
];

function Home() {
  return (
    <div style={homeCtn}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 56 }}>🎮</div>
        <h1 style={titleStyle}>Juegos para Aprender</h1>
        <p style={{ fontSize: 16, color: "#777", margin: "4px 0 0" }}>
          ¡Elige un juego y empieza a aprender jugando!
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 420 }}>
        {games.map((g) => (
          <Link to={g.path} key={g.path} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: g.gradient,
                borderRadius: 20,
                padding: "24px 22px",
                color: "white",
                cursor: "pointer",
                transition: "transform 0.2s",
                boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                gap: 18,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <span style={{ fontSize: 44 }}>{g.icon}</span>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{g.title}</div>
                <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4, lineHeight: 1.4 }}>{g.desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ fontSize: 12, color: "#bbb", textAlign: "center", marginTop: 16 }}>
        Hecho con ❤️ para aprender jugando
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {games.map((g) => (
          <Route key={g.path} path={g.path} element={<g.component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

const homeCtn = {
  fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  maxWidth: 480,
  margin: "0 auto",
  padding: "40px 16px",
  minHeight: "100vh",
  background: "linear-gradient(180deg, #fef9f0 0%, #fff5f5 50%, #f0f4ff 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 20,
};

const titleStyle = {
  fontSize: 32,
  fontWeight: 900,
  margin: 0,
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

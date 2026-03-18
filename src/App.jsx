import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import GameErrorBoundary from "./components/GameErrorBoundary";
import { getAllProgress } from "./hooks/useGameProgress";

const ExploraColombia = lazy(() => import("./games/explora-colombia"));
const CapitalesSudamerica = lazy(() => import("./games/capitales-sudamerica"));
const BanderasMundo = lazy(() => import("./games/banderas-mundo"));
const QueAnimalSoy = lazy(() => import("./games/que-animal-soy"));
const FigurasGeometricas = lazy(() => import("./games/figuras-geometricas"));
const MonumentosFamosos = lazy(() => import("./games/monumentos-famosos"));
const PalabrasRevueltas = lazy(() => import("./games/palabras-revueltas"));

const games = [
  {
    path: "/explora-colombia",
    title: "Explora Colombia",
    desc: "Aprende los departamentos, capitales y regiones de Colombia con mapas, tarjetas, quiz y desafios.",
    icon: "\u{1F1E8}\u{1F1F4}",
    gradient: "linear-gradient(135deg, #F9A825, #f12711)",
    component: ExploraColombia,
  },
  {
    path: "/capitales-sudamerica",
    title: "Capitales de Sudamerica",
    desc: "Aprende las capitales de los 12 paises sudamericanos con mapa, tarjetas y quiz.",
    icon: "\u{1F30E}",
    gradient: "linear-gradient(135deg, #11998e, #38ef7d)",
    component: CapitalesSudamerica,
  },
  {
    path: "/banderas-mundo",
    title: "Banderas del Mundo",
    desc: "Aprende las banderas, capitales y datos de 50 paises de todo el mundo.",
    icon: "\u{1F30D}",
    gradient: "linear-gradient(135deg, #0052D4, #6FB1FC)",
    component: BanderasMundo,
  },
  {
    path: "/que-animal-soy",
    title: "\u00BFQue Animal Soy?",
    desc: "Adivina el animal con 5 pistas progresivas. \u00A1Menos pistas, mas puntos!",
    icon: "\u{1F43E}",
    gradient: "linear-gradient(135deg, #f5af19, #f12711)",
    component: QueAnimalSoy,
  },
  {
    path: "/figuras-geometricas",
    title: "Figuras Geometricas",
    desc: "Aprende figuras 2D, poligonos y volumenes 3D con formulas, propiedades y quiz interactivos.",
    icon: "\u{1F4D0}",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    component: FigurasGeometricas,
  },
  {
    path: "/monumentos-famosos",
    title: "Monumentos Famosos",
    desc: "Ubica los monumentos mas iconicos del mundo en un mapa interactivo.",
    icon: "\u{1F3DB}\u{FE0F}",
    gradient: "linear-gradient(135deg, #FF8F00, #F4511E)",
    component: MonumentosFamosos,
  },
  {
    path: "/palabras-revueltas",
    title: "Palabras Revueltas",
    desc: "Ordena las letras y forma la palabra correcta. Animales, frutas, paises y mas.",
    icon: "\u{1F524}",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    component: PalabrasRevueltas,
  },
];

// Issue #2: Update document title based on current route
function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const game = games.find((g) => g.path === location.pathname);
    if (game) {
      document.title = `${game.title} - Juegos para Aprender`;
    } else {
      document.title = "Juegos para Aprender";
    }
  }, [location.pathname]);

  return null;
}

function LoadingSpinner() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      background: "linear-gradient(180deg, #fef9f0 0%, #fff5f5 50%, #f0f4ff 100%)",
      gap: 16,
    }}>
      <div style={{
        width: 48,
        height: 48,
        border: "4px solid #e0e0e0",
        borderTopColor: "#764ba2",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <p style={{ color: "#888", fontSize: 15, margin: 0 }}>Cargando juego...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

function ProgressBadge({ progress }) {
  if (!progress || !progress.quizTotal) return null;
  return (
    <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
      <span style={{ background: "rgba(255,255,255,0.25)", borderRadius: 10, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>
        \u{1F9E0} {progress.quizBest}/{progress.quizTotal}
      </span>
      {progress.challengeBest > 0 && (
        <span style={{ background: "rgba(255,255,255,0.25)", borderRadius: 10, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>
          \u26A1 {progress.challengeBest}
        </span>
      )}
      {progress.bestStreak > 0 && (
        <span style={{ background: "rgba(255,255,255,0.25)", borderRadius: 10, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>
          \u{1F525} {progress.bestStreak}
        </span>
      )}
    </div>
  );
}

function Home() {
  const [progress, setProgress] = useState({});
  useEffect(() => { setProgress(getAllProgress()); }, []);

  return (
    <div style={homeCtn}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 56 }}>\u{1F3AE}</div>
        <h1 style={titleStyle}>Juegos para Aprender</h1>
        <p style={{ fontSize: 16, color: "#777", margin: "4px 0 0" }}>
          \u00A1Elige un juego y empieza a aprender jugando!
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 420 }}>
        {games.map((g) => {
          const p = progress[g.path.slice(1)];
          return (
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
                  <ProgressBadge progress={p} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div style={{ fontSize: 12, color: "#bbb", textAlign: "center", marginTop: 16 }}>
        Hecho con \u2764\u{FE0F} para aprender jugando
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <TitleUpdater />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {games.map((g) => (
            <Route key={g.path} path={g.path} element={
              <GameErrorBoundary icon={g.icon}>
                <g.component />
              </GameErrorBoundary>
            } />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

const homeCtn = {
  fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  maxWidth: 640,
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

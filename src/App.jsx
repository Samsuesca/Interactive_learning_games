import { lazy, Suspense, useState, useEffect, useMemo, useCallback } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import GameErrorBoundary from "./components/GameErrorBoundary";
import { getAllProgress } from "./hooks/useGameProgress";
import usePlayerProfile from "./hooks/usePlayerProfile";
import useDailyLogin from "./hooks/useDailyLogin";
import ACHIEVEMENTS from "./data/achievements";
import AvatarDisplay from "./components/roblox/AvatarDisplay";
import CoinDisplay from "./components/roblox/CoinDisplay";
import LevelBadge from "./components/roblox/LevelBadge";
import DailyLoginPopup from "./components/roblox/DailyLoginPopup";
import LevelUpPopup from "./components/roblox/LevelUpPopup";
import { calculateDailyLoginXP } from "./services/xpService";

const ExploraColombia = lazy(() => import("./games/explora-colombia"));
const CapitalesSudamerica = lazy(() => import("./games/capitales-sudamerica"));
const BanderasMundo = lazy(() => import("./games/banderas-mundo"));
const QueAnimalSoy = lazy(() => import("./games/que-animal-soy"));
const FigurasGeometricas = lazy(() => import("./games/figuras-geometricas"));
const MonumentosFamosos = lazy(() => import("./games/monumentos-famosos"));
const PalabrasRevueltas = lazy(() => import("./games/palabras-revueltas"));
const CapitalesEuropa = lazy(() => import("./games/capitales-europa"));
const SistemaSolar = lazy(() => import("./games/sistema-solar"));
const TablasMultiplicar = lazy(() => import("./games/tablas-multiplicar"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));

const CATEGORIES = [
  { key: "all", label: "Todos", icon: "🎮" },
  { key: "geography", label: "Geografía", icon: "🌍" },
  { key: "science", label: "Ciencias", icon: "🔬" },
  { key: "math", label: "Matemáticas", icon: "🧮" },
  { key: "language", label: "Lenguaje", icon: "📝" },
];

const games = [
  {
    path: "/explora-colombia",
    title: "Explora Colombia",
    desc: "Aprende los departamentos, capitales y regiones de Colombia con mapas, tarjetas, quiz y desafíos.",
    icon: "🇨🇴",
    gradient: "linear-gradient(135deg, #F9A825, #f12711)",
    component: ExploraColombia,
    category: "geography",
  },
  {
    path: "/capitales-sudamerica",
    title: "Capitales de Sudamérica",
    desc: "Aprende las capitales de los 12 países sudamericanos con mapa, tarjetas y quiz.",
    icon: "🌎",
    gradient: "linear-gradient(135deg, #11998e, #38ef7d)",
    component: CapitalesSudamerica,
    category: "geography",
  },
  {
    path: "/capitales-europa",
    title: "Capitales de Europa",
    desc: "Descubre las capitales de 30 países europeos con mapa interactivo y desafíos.",
    icon: "🇪🇺",
    gradient: "linear-gradient(135deg, #003399, #1a5276)",
    component: CapitalesEuropa,
    category: "geography",
    isNew: true,
  },
  {
    path: "/banderas-mundo",
    title: "Banderas del Mundo",
    desc: "Aprende las banderas, capitales y datos de 50 países de todo el mundo.",
    icon: "🌍",
    gradient: "linear-gradient(135deg, #0052D4, #6FB1FC)",
    component: BanderasMundo,
    category: "geography",
  },
  {
    path: "/monumentos-famosos",
    title: "Monumentos Famosos",
    desc: "Ubica los monumentos más icónicos del mundo en un mapa interactivo.",
    icon: "🏛️",
    gradient: "linear-gradient(135deg, #FF8F00, #F4511E)",
    component: MonumentosFamosos,
    category: "geography",
  },
  {
    path: "/que-animal-soy",
    title: "¿Qué Animal Soy?",
    desc: "Adivina el animal con 5 pistas progresivas. ¡Menos pistas, más puntos!",
    icon: "🐾",
    gradient: "linear-gradient(135deg, #f5af19, #f12711)",
    component: QueAnimalSoy,
    category: "science",
  },
  {
    path: "/sistema-solar",
    title: "Sistema Solar",
    desc: "Explora los planetas, el Sol y los cuerpos celestes del sistema solar.",
    icon: "🪐",
    gradient: "linear-gradient(135deg, #1a1a4e, #2d1b69)",
    component: SistemaSolar,
    category: "science",
    isNew: true,
  },
  {
    path: "/figuras-geometricas",
    title: "Figuras Geométricas",
    desc: "Aprende figuras 2D, polígonos y volúmenes 3D con fórmulas, propiedades y quiz interactivos.",
    icon: "📐",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    component: FigurasGeometricas,
    category: "math",
  },
  {
    path: "/tablas-multiplicar",
    title: "Tablas de Multiplicar",
    desc: "Domina las tablas del 1 al 12 con juegos, quiz y desafíos contra reloj.",
    icon: "✖️",
    gradient: "linear-gradient(135deg, #1a237e, #3949ab)",
    component: TablasMultiplicar,
    category: "math",
    isNew: true,
  },
  {
    path: "/palabras-revueltas",
    title: "Palabras Revueltas",
    desc: "Ordena las letras y forma la palabra correcta. Animales, frutas, países y más.",
    icon: "🔤",
    gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    component: PalabrasRevueltas,
    category: "language",
  },
];

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const game = games.find((g) => g.path === location.pathname);
    if (game) {
      document.title = `${game.title} - Juegos para Aprender`;
    } else if (location.pathname === "/dashboard") {
      document.title = "Mi Progreso - Juegos para Aprender";
    } else if (location.pathname === "/profile") {
      document.title = "Mi Perfil - Juegos para Aprender";
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
      background: "linear-gradient(180deg, #0a0a1a 0%, #1a1a3e 50%, #0f0f2e 100%)",
      gap: 16,
    }}>
      <div style={{
        width: 48,
        height: 48,
        border: "4px solid rgba(102,126,234,0.2)",
        borderTopColor: "#764ba2",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <p style={{ color: "#8888bb", fontSize: 15, margin: 0 }}>Cargando juego...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

function ProgressBadge({ progress }) {
  if (!progress || !progress.quizTotal) return null;
  return (
    <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
      <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 10, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>
        🧠 {progress.quizBest}/{progress.quizTotal}
      </span>
      {progress.challengeBest > 0 && (
        <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 10, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>
          ⚡ {progress.challengeBest}
        </span>
      )}
      {progress.bestStreak > 0 && (
        <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 10, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>
          🔥 {progress.bestStreak}
        </span>
      )}
    </div>
  );
}

function AchievementSummary({ progress }) {
  const count = ACHIEVEMENTS.filter(
    (a) => a.id !== "collector" && a.check(progress)
  ).length;
  const total = ACHIEVEMENTS.length;
  if (count === 0) return null;

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      background: "rgba(102,126,234,0.15)",
      border: "1px solid rgba(102,126,234,0.3)",
      borderRadius: 14, padding: "10px 18px", color: "#a5b4fc", fontSize: 13, fontWeight: 600,
    }}>
      <span>🏅 {count}/{total} logros</span>
      <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, maxWidth: 120 }}>
        <div style={{ width: `${(count / total) * 100}%`, height: "100%", background: "linear-gradient(90deg, #ffd700, #ffa000)", borderRadius: 3, transition: "width 0.5s" }} />
      </div>
    </div>
  );
}

/* ===== Player Header Bar ===== */
function PlayerHeader({ avatar, coins, xp }) {
  return (
    <div style={headerBar}>
      <Link to="/profile" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
        <AvatarDisplay avatar={avatar} size={36} glow />
      </Link>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <CoinDisplay coins={coins} compact />
        <LevelBadge xp={xp} compact />
      </div>
    </div>
  );
}

function Home() {
  const [progress, setProgress] = useState({});
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const { avatar, coins, xp, addCoins, addXP } = usePlayerProfile();
  const daily = useDailyLogin();
  const [levelUpData, setLevelUpData] = useState(null);

  useEffect(() => { setProgress(getAllProgress()); }, []);

  const handleDailyClaim = useCallback(() => {
    const { coins: reward } = daily.claim();
    addCoins(reward);
    const result = addXP(calculateDailyLoginXP());
    if (result.leveledUp) setLevelUpData(result.newLevel);
    daily.dismiss();
  }, [daily, addCoins, addXP]);

  const filtered = useMemo(() => {
    let list = games;
    if (category !== "all") list = list.filter((g) => g.category === category);
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (g) => g.title.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q)
      );
    }
    return list;
  }, [category, search]);

  return (
    <div style={homeCtn}>
      {/* Player Header */}
      <PlayerHeader avatar={avatar} coins={coins} xp={xp} />

      <div style={{ textAlign: "center", marginBottom: 4 }}>
        <div style={{ fontSize: 56 }}>🎮</div>
        <h1 style={titleStyle}>Juegos para Aprender</h1>
        <p style={{ fontSize: 16, color: "#8888bb", margin: "4px 0 0" }}>
          ¡Elige un juego y empieza a aprender jugando!
        </p>
      </div>

      {/* Dashboard + Profile + Achievement summary */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 420 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <Link to="/dashboard" style={{ textDecoration: "none", flex: 1 }}>
            <div style={navCard}>
              <span style={{ fontSize: 24 }}>📊</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#e0e0ff" }}>Mi Progreso</div>
                <div style={{ fontSize: 11, color: "#8888bb" }}>Estadísticas y logros</div>
              </div>
            </div>
          </Link>
          <Link to="/profile" style={{ textDecoration: "none", flex: 1 }}>
            <div style={{ ...navCard, borderColor: "rgba(255,215,0,0.3)" }}>
              <span style={{ fontSize: 24 }}>👤</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#e0e0ff" }}>Mi Perfil</div>
                <div style={{ fontSize: 11, color: "#8888bb" }}>Avatar y tienda</div>
              </div>
            </div>
          </Link>
        </div>
        <AchievementSummary progress={progress} />
      </div>

      {/* Search bar */}
      <div style={{ width: "100%", maxWidth: 420 }}>
        <input
          type="text"
          placeholder="🔍 Buscar juego..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 14,
            border: "1px solid rgba(102,126,234,0.3)",
            fontSize: 15,
            outline: "none",
            background: "rgba(30,30,63,0.8)",
            color: "#e0e0ff",
            boxSizing: "border-box",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#667eea")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(102,126,234,0.3)")}
        />
      </div>

      {/* Category filters */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: 420 }}>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            style={{
              background: category === c.key ? "linear-gradient(135deg,#667eea,#764ba2)" : "rgba(255,255,255,0.05)",
              color: category === c.key ? "white" : "#8888bb",
              border: category === c.key ? "none" : "1px solid rgba(102,126,234,0.2)",
              borderRadius: 20,
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: 4,
              boxShadow: category === c.key ? "0 0 15px rgba(102,126,234,0.4)" : "none",
            }}
          >
            <span>{c.icon}</span> {c.label}
          </button>
        ))}
      </div>

      {/* Games grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 420 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", color: "#8888bb", padding: "24px 0", fontSize: 15 }}>
            No se encontraron juegos
          </div>
        )}
        {filtered.map((g, i) => {
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
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 0 20px rgba(0,0,0,0.3), 0 6px 25px rgba(0,0,0,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  position: "relative",
                  overflow: "hidden",
                  animation: `fadeSlideIn 0.3s ease ${i * 0.05}s both`,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(102,126,234,0.4), 0 10px 35px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(0,0,0,0.3), 0 6px 25px rgba(0,0,0,0.2)";
                }}
              >
                {g.isNew && (
                  <div style={{
                    position: "absolute", top: 10, right: 12,
                    background: "linear-gradient(135deg, #ffd700, #ffa000)", color: "#1a1a3e",
                    fontSize: 10, fontWeight: 800, padding: "3px 8px",
                    borderRadius: 8, letterSpacing: 0.5,
                    boxShadow: "0 0 10px rgba(255,215,0,0.4)",
                  }}>
                    NUEVO
                  </div>
                )}
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

      <div style={{ fontSize: 12, color: "#555", textAlign: "center", marginTop: 16 }}>
        Hecho con ❤️ para aprender jugando · {games.length} juegos
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Daily Login Popup */}
      {daily.showPopup && (
        <DailyLoginPopup
          streak={daily.streak}
          reward={daily.reward}
          onClaim={handleDailyClaim}
          onDismiss={daily.dismiss}
        />
      )}

      {/* Level Up Popup */}
      {levelUpData && (
        <LevelUpPopup
          level={levelUpData}
          onClose={() => setLevelUpData(null)}
        />
      )}
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
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
  padding: "24px 16px",
  minHeight: "100vh",
  background: "linear-gradient(180deg, #0a0a1a 0%, #1a1a3e 50%, #0f0f2e 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
};

const titleStyle = {
  fontSize: 32,
  fontWeight: 900,
  margin: 0,
  background: "linear-gradient(135deg, #667eea, #a855f7, #ff1493)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "none",
};

const headerBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  maxWidth: 420,
  padding: "8px 4px",
  marginBottom: 8,
};

const navCard = {
  background: "rgba(30,30,63,0.8)",
  border: "1px solid rgba(102,126,234,0.3)",
  borderRadius: 14,
  padding: "12px 14px",
  display: "flex",
  alignItems: "center",
  gap: 10,
  cursor: "pointer",
  transition: "all 0.2s",
  boxShadow: "0 0 10px rgba(102,126,234,0.1)",
};

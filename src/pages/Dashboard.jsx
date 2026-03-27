import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllProgress } from "../hooks/useGameProgress";
import useAchievements from "../hooks/useAchievements";

const GAME_LIST = [
  { id: "explora-colombia", name: "Explora Colombia", icon: "🇨🇴" },
  { id: "capitales-sudamerica", name: "Capitales Sudamérica", icon: "🌎" },
  { id: "banderas-mundo", name: "Banderas del Mundo", icon: "🌍" },
  { id: "que-animal-soy", name: "¿Qué Animal Soy?", icon: "🐾" },
  { id: "figuras-geometricas", name: "Figuras Geométricas", icon: "📐" },
  { id: "monumentos-famosos", name: "Monumentos Famosos", icon: "🏛️" },
  { id: "palabras-revueltas", name: "Palabras Revueltas", icon: "🔤" },
  { id: "capitales-europa", name: "Capitales de Europa", icon: "🇪🇺" },
  { id: "sistema-solar", name: "Sistema Solar", icon: "🪐" },
  { id: "tablas-multiplicar", name: "Tablas de Multiplicar", icon: "✖️" },
];

const CATEGORIES = {
  inicio: "Inicio",
  quiz: "Quiz",
  general: "General",
  desafio: "Desafío",
  aprender: "Aprender",
  especial: "Especial",
};

function sumField(progress, field) {
  return Object.values(progress).reduce((sum, g) => sum + (g[field] || 0), 0);
}

function maxField(progress, field) {
  return Object.values(progress).reduce(
    (best, g) => Math.max(best, g[field] || 0),
    0
  );
}

/* ---------- small reusable pieces ---------- */

function StatCard({ icon, value, label }) {
  return (
    <div style={styles.statCard}>
      <div style={{ fontSize: 28 }}>{icon}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: "#333" }}>{value}</div>
      <div style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function MiniBar({ value, max, color }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={styles.miniBarTrack}>
      <div
        style={{
          ...styles.miniBarFill,
          width: `${pct}%`,
          background: color || "linear-gradient(90deg,#667eea,#764ba2)",
        }}
      />
    </div>
  );
}

function AchievementCard({ achievement, isUnlocked }) {
  return (
    <div
      style={{
        ...styles.achieveCard,
        background: isUnlocked
          ? "linear-gradient(135deg,#667eea 0%,#764ba2 100%)"
          : "#e8e8e8",
        opacity: isUnlocked ? 1 : 0.55,
        transform: isUnlocked ? "scale(1)" : "scale(0.95)",
      }}
      title={isUnlocked ? `${achievement.title}: ${achievement.desc}` : "???"}
    >
      <div style={{ fontSize: 30, lineHeight: 1 }}>
        {isUnlocked ? achievement.icon : "🔒"}
      </div>
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          color: isUnlocked ? "#fff" : "#999",
          marginTop: 4,
          textAlign: "center",
          lineHeight: 1.2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "100%",
          padding: "0 2px",
        }}
      >
        {isUnlocked ? achievement.title : "???"}
      </div>
    </div>
  );
}

function GameStatCard({ game, data }) {
  const played = data.gamesPlayed || 0;
  const quizLabel =
    data.quizTotal > 0 ? `${data.quizBest}/${data.quizTotal}` : "—";
  const challengeLabel = data.challengeBest > 0 ? data.challengeBest : "—";
  const learnedLabel = data.learnedCount > 0 ? data.learnedCount : "—";

  return (
    <div style={styles.gameCard}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 28 }}>{game.icon}</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#333" }}>
            {game.name}
          </div>
          <div style={{ fontSize: 11, color: "#999" }}>
            {played > 0 ? `${played} partida${played !== 1 ? "s" : ""}` : "Sin jugar"}
          </div>
        </div>
      </div>

      {played > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          <div style={styles.gameStat}>
            <div style={{ fontSize: 11, color: "#888" }}>Quiz</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#667eea" }}>
              {quizLabel}
            </div>
          </div>
          <div style={styles.gameStat}>
            <div style={{ fontSize: 11, color: "#888" }}>Desafío</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#f5576c" }}>
              {challengeLabel}
            </div>
          </div>
          <div style={styles.gameStat}>
            <div style={{ fontSize: 11, color: "#888" }}>Aprendidos</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#11998e" }}>
              {learnedLabel}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            color: "#bbb",
            fontSize: 13,
            padding: "6px 0",
          }}
        >
          Juega para ver tus estadísticas
        </div>
      )}
    </div>
  );
}

/* ---------- main component ---------- */

export default function Dashboard() {
  const progress = getAllProgress();
  const { achievements, unlocked, total, unlockedCount } = useAchievements();
  const [filter, setFilter] = useState("all");

  const totalGames = sumField(progress, "gamesPlayed");
  const totalLearned = sumField(progress, "learnedCount");
  const bestStreak = maxField(progress, "bestStreak");
  const bestChallenge = maxField(progress, "challengeBest");

  const filteredAchievements =
    filter === "all"
      ? achievements
      : achievements.filter((a) => a.category === filter);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 26, margin: 0, color: "#333" }}>
          📊 Mi Progreso
        </h1>
        <p style={{ fontSize: 13, color: "#888", margin: "6px 0 0" }}>
          Tu resumen de aprendizaje
        </p>
      </div>

      {/* Overall Stats Row */}
      <div style={styles.statsRow}>
        <StatCard icon="🎮" value={totalGames} label="Partidas" />
        <StatCard icon="📚" value={totalLearned} label="Aprendidos" />
        <StatCard icon="🔥" value={bestStreak} label="Mejor racha" />
        <StatCard icon="⚡" value={bestChallenge} label="Mejor desafío" />
      </div>

      {/* Achievement progress */}
      <div style={styles.section}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <h2 style={{ fontSize: 18, margin: 0, color: "#333" }}>
            🏅 Logros
          </h2>
          <span style={{ fontSize: 13, color: "#667eea", fontWeight: 600 }}>
            {unlockedCount}/{total}
          </span>
        </div>
        <MiniBar value={unlockedCount} max={total} />

        {/* Category filters */}
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            margin: "12px 0",
          }}
        >
          <button
            onClick={() => setFilter("all")}
            style={{
              ...styles.filterBtn,
              background: filter === "all" ? "#667eea" : "#f0f0f0",
              color: filter === "all" ? "#fff" : "#666",
            }}
          >
            Todos
          </button>
          {Object.entries(CATEGORIES).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                ...styles.filterBtn,
                background: filter === key ? "#667eea" : "#f0f0f0",
                color: filter === key ? "#fff" : "#666",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Achievement grid */}
        <div style={styles.achieveGrid}>
          {filteredAchievements.map((a) => (
            <AchievementCard
              key={a.id}
              achievement={a}
              isUnlocked={unlocked.has(a.id)}
            />
          ))}
        </div>
      </div>

      {/* Per-game stats */}
      <div style={styles.section}>
        <h2 style={{ fontSize: 18, margin: "0 0 12px", color: "#333" }}>
          🎮 Estadísticas por Juego
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {GAME_LIST.map((game) => (
            <GameStatCard
              key={game.id}
              game={game}
              data={progress[game.id] || {}}
            />
          ))}
        </div>
      </div>

      {/* Back button */}
      <div style={{ textAlign: "center", marginTop: 24, paddingBottom: 32 }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <button style={styles.backBtn}>← Volver al Inicio</button>
        </Link>
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

const styles = {
  container: {
    fontFamily: "'Segoe UI',system-ui,-apple-system,sans-serif",
    maxWidth: 640,
    margin: "0 auto",
    padding: "24px 16px",
    minHeight: "100vh",
    background: "linear-gradient(180deg,#fef9f0 0%,#f0f4ff 100%)",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: 8,
    marginBottom: 20,
  },
  statCard: {
    background: "#fff",
    borderRadius: 14,
    padding: "14px 6px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  section: {
    background: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  },
  miniBarTrack: {
    width: "100%",
    height: 8,
    background: "#e8e8e8",
    borderRadius: 4,
    overflow: "hidden",
  },
  miniBarFill: {
    height: "100%",
    borderRadius: 4,
    transition: "width 0.6s ease",
  },
  filterBtn: {
    border: "none",
    borderRadius: 20,
    padding: "5px 12px",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  achieveGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(76px, 1fr))",
    gap: 8,
  },
  achieveCard: {
    width: "100%",
    aspectRatio: "1",
    borderRadius: 14,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s",
    boxSizing: "border-box",
    padding: 4,
  },
  gameCard: {
    background: "#fafafa",
    borderRadius: 14,
    padding: 14,
    border: "1px solid #eee",
  },
  gameStat: {
    textAlign: "center",
    background: "#fff",
    borderRadius: 8,
    padding: "6px 4px",
  },
  backBtn: {
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "#fff",
    border: "none",
    borderRadius: 24,
    padding: "12px 32px",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(102,126,234,0.35)",
    transition: "transform 0.2s",
  },
};

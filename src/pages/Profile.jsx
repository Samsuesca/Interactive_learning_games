import { Link } from "react-router-dom";
import usePlayerProfile from "../hooks/usePlayerProfile";
import AvatarBuilder from "../components/roblox/AvatarBuilder";
import AvatarDisplay from "../components/roblox/AvatarDisplay";
import CoinDisplay from "../components/roblox/CoinDisplay";
import LevelBadge from "../components/roblox/LevelBadge";
import NeonButton from "../components/roblox/NeonButton";
import ShopModal from "../components/roblox/ShopModal";
import { useState } from "react";

export default function Profile() {
  const {
    profile,
    level,
    coins,
    xp,
    avatar,
    unlockedItems,
    updateAvatar,
    spendCoins,
    unlockItem,
  } = usePlayerProfile();

  const [showBuilder, setShowBuilder] = useState(false);
  const [showShop, setShowShop] = useState(false);

  const handleBuy = (item) => {
    if (spendCoins(item.price)) {
      unlockItem(`${item.category}_${item.partId}`);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 26,
            margin: 0,
            color: "#fff",
            fontWeight: 900,
            textShadow: "0 0 15px rgba(102,126,234,0.5)",
          }}
        >
          👤 Mi Perfil
        </h1>
      </div>

      {/* Avatar Card */}
      <div style={styles.card}>
        <div style={{ textAlign: "center" }}>
          <AvatarDisplay avatar={avatar} size={160} glow />
        </div>
        <div style={{ marginTop: 16 }}>
          <LevelBadge xp={xp} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginTop: 16,
          }}
        >
          <CoinDisplay coins={coins} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginTop: 16,
            flexWrap: "wrap",
          }}
        >
          <NeonButton color="purple" onClick={() => setShowBuilder(true)}>
            ✨ Personalizar
          </NeonButton>
          <NeonButton color="gold" onClick={() => setShowShop(true)}>
            🛒 Tienda
          </NeonButton>
        </div>
      </div>

      {/* Stats card */}
      <div style={styles.card}>
        <h3
          style={{
            color: "#a5b4fc",
            fontSize: 16,
            margin: "0 0 12px",
            fontWeight: 700,
          }}
        >
          📊 Estadísticas
        </h3>
        <div style={styles.statsGrid}>
          <div style={styles.stat}>
            <div style={{ fontSize: 24 }}>💰</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#ffd700" }}>
              {coins}
            </div>
            <div style={{ fontSize: 11, color: "#8888bb" }}>Monedas</div>
          </div>
          <div style={styles.stat}>
            <div style={{ fontSize: 24 }}>⚡</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#a5b4fc" }}>
              {xp}
            </div>
            <div style={{ fontSize: 11, color: "#8888bb" }}>XP Total</div>
          </div>
          <div style={styles.stat}>
            <div style={{ fontSize: 24 }}>{level.icon}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#00ff88" }}>
              {level.level}
            </div>
            <div style={{ fontSize: 11, color: "#8888bb" }}>Nivel</div>
          </div>
          <div style={styles.stat}>
            <div style={{ fontSize: 24 }}>🎒</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#ff1493" }}>
              {unlockedItems.length}
            </div>
            <div style={{ fontSize: 11, color: "#8888bb" }}>Items</div>
          </div>
        </div>
      </div>

      {/* Back */}
      <div style={{ textAlign: "center", marginTop: 20, paddingBottom: 32 }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <NeonButton color="dark">← Volver al Inicio</NeonButton>
        </Link>
      </div>

      {/* Modals */}
      {showBuilder && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            overflow: "auto",
          }}
        >
          <AvatarBuilder
            avatar={avatar}
            unlockedItems={unlockedItems}
            level={level.level}
            onUpdate={updateAvatar}
            onClose={() => setShowBuilder(false)}
          />
        </div>
      )}

      {showShop && (
        <ShopModal
          coins={coins}
          level={level.level}
          unlockedItems={unlockedItems}
          onBuy={handleBuy}
          onClose={() => setShowShop(false)}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI',system-ui,-apple-system,sans-serif",
    maxWidth: 480,
    margin: "0 auto",
    padding: "24px 16px",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0a0a1a 0%, #1a1a3e 50%, #0f0f2e 100%)",
  },
  card: {
    background: "rgba(30,30,63,0.8)",
    border: "1px solid rgba(102,126,234,0.3)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    boxShadow: "0 0 20px rgba(102,126,234,0.1)",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: 8,
  },
  stat: {
    textAlign: "center",
    background: "rgba(0,0,0,0.2)",
    borderRadius: 12,
    padding: "10px 4px",
  },
};

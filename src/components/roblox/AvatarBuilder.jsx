import { useState } from "react";
import AvatarDisplay from "./AvatarDisplay";
import NeonButton from "./NeonButton";
import {
  HAIR_STYLES,
  FACE_STYLES,
  HAT_STYLES,
  GLASSES_STYLES,
  BODY_COLORS,
  SHIRT_COLORS,
  HAIR_COLORS,
} from "../../data/avatarParts";

const TABS = [
  { key: "hair", label: "💇 Pelo", items: HAIR_STYLES, colorKey: "hairColor", colors: HAIR_COLORS },
  { key: "face", label: "😊 Cara", items: FACE_STYLES },
  { key: "hat", label: "🎩 Sombrero", items: HAT_STYLES },
  { key: "glasses", label: "👓 Gafas", items: GLASSES_STYLES },
  { key: "body", label: "👤 Cuerpo", colorKey: "bodyColor", colors: BODY_COLORS },
  { key: "shirt", label: "👕 Camiseta", colorKey: "shirtColor", colors: SHIRT_COLORS },
];

export default function AvatarBuilder({
  avatar,
  unlockedItems,
  level,
  onUpdate,
  onClose,
}) {
  const [tab, setTab] = useState("hair");
  const [preview, setPreview] = useState({ ...avatar });

  const activeTab = TABS.find((t) => t.key === tab);

  const isUnlocked = (category, id) => {
    if (id === null) return true;
    const key = `${category}_${id}`;
    return unlockedItems.includes(key);
  };

  const selectItem = (key, value) => {
    setPreview((p) => ({ ...p, [key]: value }));
  };

  const handleSave = () => {
    onUpdate(preview);
    onClose();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{ color: "#fff", fontSize: 20, margin: 0, fontWeight: 900 }}>
          ✨ Personalizar Avatar
        </h2>
        <button onClick={onClose} style={styles.closeBtn}>✕</button>
      </div>

      {/* Avatar Preview */}
      <div style={styles.previewArea}>
        <AvatarDisplay avatar={preview} size={140} glow />
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              ...styles.tab,
              background: tab === t.key
                ? "linear-gradient(135deg, #667eea, #764ba2)"
                : "rgba(255,255,255,0.05)",
              color: tab === t.key ? "#fff" : "#8888bb",
              boxShadow: tab === t.key ? "0 0 10px rgba(102,126,234,0.4)" : "none",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Items or Colors */}
      <div style={styles.itemsGrid}>
        {activeTab.items &&
          activeTab.items.map((item) => {
            const unlocked = isUnlocked(tab, item.id);
            const isSelected =
              preview[tab] === item.id ||
              (item.id === null && !preview[tab]);
            return (
              <button
                key={item.id || "none"}
                onClick={() => unlocked && selectItem(tab, item.id)}
                style={{
                  ...styles.itemBtn,
                  border: isSelected
                    ? "2px solid #667eea"
                    : "1px solid rgba(255,255,255,0.1)",
                  boxShadow: isSelected ? "0 0 12px rgba(102,126,234,0.5)" : "none",
                  opacity: unlocked ? 1 : 0.4,
                  cursor: unlocked ? "pointer" : "not-allowed",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: "#e0e0ff" }}>
                  {unlocked ? item.name : "🔒"}
                </div>
                {!unlocked && (
                  <div style={{ fontSize: 10, color: "#ff6b6b" }}>
                    Nv.{item.levelRequired}
                  </div>
                )}
              </button>
            );
          })}

        {/* Color palette */}
        {activeTab.colors && (
          <div style={styles.colorRow}>
            {activeTab.colors.map((color) => (
              <button
                key={color}
                onClick={() => selectItem(activeTab.colorKey, color)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: color,
                  border:
                    preview[activeTab.colorKey] === color
                      ? "3px solid #fff"
                      : "2px solid rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  boxShadow:
                    preview[activeTab.colorKey] === color
                      ? `0 0 12px ${color}`
                      : "none",
                  transition: "all 0.2s",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <NeonButton color="green" onClick={handleSave}>
          ✅ Guardar
        </NeonButton>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "linear-gradient(135deg, #1e1e3f, #2a2a5a)",
    borderRadius: 24,
    padding: "20px 16px",
    maxWidth: 420,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  closeBtn: {
    background: "rgba(255,255,255,0.1)",
    border: "none",
    color: "#fff",
    fontSize: 18,
    borderRadius: "50%",
    width: 32,
    height: 32,
    cursor: "pointer",
  },
  previewArea: {
    textAlign: "center",
    padding: "16px 0",
    background: "rgba(0,0,0,0.2)",
    borderRadius: 16,
    marginBottom: 16,
  },
  tabs: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
    marginBottom: 14,
  },
  tab: {
    border: "none",
    borderRadius: 14,
    padding: "6px 12px",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  itemsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 8,
  },
  itemBtn: {
    background: "rgba(255,255,255,0.04)",
    borderRadius: 12,
    padding: "10px 6px",
    textAlign: "center",
    transition: "all 0.2s",
  },
  colorRow: {
    gridColumn: "1 / -1",
    display: "flex",
    gap: 8,
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "8px 0",
  },
};

import { useState } from "react";
import SHOP_ITEMS, { SHOP_CATEGORIES } from "../../data/shopItems";
import NeonButton from "./NeonButton";
import { coinSvg } from "./CoinDisplay";

export default function ShopModal({
  coins,
  level,
  unlockedItems,
  onBuy,
  onClose,
}) {
  const [filter, setFilter] = useState("all");

  const items =
    filter === "all"
      ? SHOP_ITEMS
      : SHOP_ITEMS.filter((item) => item.category === filter);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9998,
        background: "rgba(0,0,0,0.7)",
        animation: "flyIn 0.3s ease",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #1e1e3f, #2a2a5a)",
          border: "2px solid rgba(102,126,234,0.4)",
          borderRadius: 24,
          padding: "24px 20px",
          maxWidth: 400,
          width: "92%",
          maxHeight: "80vh",
          overflow: "auto",
          boxShadow: "0 0 30px rgba(102,126,234,0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h2 style={{ color: "#fff", fontSize: 20, margin: 0, fontWeight: 900 }}>
            🛒 Tienda
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                color: "#ffd700",
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              {coinSvg} {coins}
            </span>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "#fff",
                fontSize: 18,
                borderRadius: "50%",
                width: 32,
                height: 32,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Category filters */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          {SHOP_CATEGORIES.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                background: filter === key
                  ? "linear-gradient(135deg, #667eea, #764ba2)"
                  : "rgba(255,255,255,0.06)",
                color: filter === key ? "#fff" : "#8888bb",
                border: "none",
                borderRadius: 16,
                padding: "5px 12px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          {items.map((item) => {
            const owned = unlockedItems.includes(`${item.category}_${item.partId}`);
            const canAfford = coins >= item.price;
            const meetsLevel = level >= item.levelRequired;
            const canBuy = !owned && canAfford && meetsLevel;

            return (
              <div
                key={item.id}
                style={{
                  background: owned
                    ? "rgba(0,255,136,0.1)"
                    : "rgba(255,255,255,0.04)",
                  border: owned
                    ? "1px solid rgba(0,255,136,0.3)"
                    : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 14,
                  padding: 12,
                  textAlign: "center",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: "#e0e0ff", marginBottom: 6 }}>
                  {item.name}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#8888bb",
                    marginBottom: 8,
                    textTransform: "capitalize",
                  }}
                >
                  {item.category}
                </div>

                {owned ? (
                  <div style={{ fontSize: 12, color: "#00ff88", fontWeight: 600 }}>
                    ✅ Adquirido
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                        fontSize: 14,
                        fontWeight: 700,
                        color: canAfford ? "#ffd700" : "#ff4444",
                        marginBottom: 4,
                      }}
                    >
                      {coinSvg} {item.price}
                    </div>
                    {!meetsLevel && (
                      <div style={{ fontSize: 10, color: "#ff6b6b", marginBottom: 4 }}>
                        🔒 Nivel {item.levelRequired}
                      </div>
                    )}
                    <NeonButton
                      color={canBuy ? "gold" : "dark"}
                      size="sm"
                      disabled={!canBuy}
                      onClick={() => canBuy && onBuy(item)}
                    >
                      Comprar
                    </NeonButton>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

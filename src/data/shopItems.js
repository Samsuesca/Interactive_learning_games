import {
  HAIR_STYLES,
  FACE_STYLES,
  HAT_STYLES,
  GLASSES_STYLES,
} from "./avatarParts";

function buildShopItems(parts, category) {
  return parts
    .filter((p) => p.price > 0)
    .map((p) => ({
      id: `${category}_${p.id}`,
      category,
      name: p.name,
      price: p.price,
      levelRequired: p.levelRequired,
      partId: p.id,
    }));
}

const SHOP_ITEMS = [
  ...buildShopItems(HAIR_STYLES, "hair"),
  ...buildShopItems(FACE_STYLES, "face"),
  ...buildShopItems(HAT_STYLES, "hat"),
  ...buildShopItems(GLASSES_STYLES, "glasses"),
];

export default SHOP_ITEMS;

export const SHOP_CATEGORIES = [
  { key: "all", label: "Todo", icon: "🛒" },
  { key: "hair", label: "Pelo", icon: "💇" },
  { key: "face", label: "Cara", icon: "😊" },
  { key: "hat", label: "Sombreros", icon: "🎩" },
  { key: "glasses", label: "Gafas", icon: "👓" },
];

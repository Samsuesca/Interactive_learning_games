import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";
import { getLevelForXP } from "../services/xpService";

const STORAGE_KEY = "ilg_player";

const DEFAULT_PROFILE = {
  coins: 0,
  xp: 0,
  avatar: {
    hair: "short",
    hairColor: "#6C63FF",
    face: "smile",
    bodyColor: "#6C63FF",
    shirtColor: "#ff1493",
    hat: null,
    glasses: null,
  },
  unlockedItems: [
    "hair_short",
    "hair_long",
    "face_smile",
    "face_happy",
    "body_#6C63FF",
    "body_#ff1493",
    "body_#00bfff",
    "shirt_#ff1493",
    "shirt_#6C63FF",
    "shirt_#00ff88",
  ],
  achievementsSeen: [],
  createdAt: null,
};

export default function usePlayerProfile() {
  const [profile, setProfile] = useLocalStorage(STORAGE_KEY, {
    ...DEFAULT_PROFILE,
    createdAt: new Date().toISOString(),
  });

  const addCoins = useCallback(
    (amount) => {
      setProfile((prev) => ({ ...prev, coins: (prev.coins || 0) + amount }));
    },
    [setProfile],
  );

  const spendCoins = useCallback(
    (amount) => {
      if ((profile.coins || 0) < amount) return false;
      setProfile((prev) => ({ ...prev, coins: prev.coins - amount }));
      return true;
    },
    [profile.coins, setProfile],
  );

  const addXP = useCallback(
    (amount) => {
      const oldXP = profile.xp || 0;
      const newXP = oldXP + amount;
      const oldLevel = getLevelForXP(oldXP);
      const newLevel = getLevelForXP(newXP);
      setProfile((prev) => ({ ...prev, xp: (prev.xp || 0) + amount }));
      if (newLevel.level > oldLevel.level) {
        return { leveledUp: true, newLevel: newLevel };
      }
      return { leveledUp: false };
    },
    [profile.xp, setProfile],
  );

  const updateAvatar = useCallback(
    (parts) => {
      setProfile((prev) => ({
        ...prev,
        avatar: { ...prev.avatar, ...parts },
      }));
    },
    [setProfile],
  );

  const unlockItem = useCallback(
    (itemId) => {
      setProfile((prev) => ({
        ...prev,
        unlockedItems: prev.unlockedItems.includes(itemId)
          ? prev.unlockedItems
          : [...prev.unlockedItems, itemId],
      }));
    },
    [setProfile],
  );

  const markAchievementSeen = useCallback(
    (achievementId) => {
      setProfile((prev) => ({
        ...prev,
        achievementsSeen: prev.achievementsSeen.includes(achievementId)
          ? prev.achievementsSeen
          : [...prev.achievementsSeen, achievementId],
      }));
    },
    [setProfile],
  );

  const level = getLevelForXP(profile.xp || 0);

  return {
    profile,
    level,
    coins: profile.coins || 0,
    xp: profile.xp || 0,
    avatar: profile.avatar || DEFAULT_PROFILE.avatar,
    unlockedItems: profile.unlockedItems || DEFAULT_PROFILE.unlockedItems,
    achievementsSeen: profile.achievementsSeen || [],
    addCoins,
    spendCoins,
    addXP,
    updateAvatar,
    unlockItem,
    markAchievementSeen,
  };
}

export function getPlayerProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { ...DEFAULT_PROFILE };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

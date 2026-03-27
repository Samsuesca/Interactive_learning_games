import { useState, useCallback, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";
import { getDailyReward } from "../services/coinService";

const STORAGE_KEY = "ilg_daily";

function isConsecutiveDay(prev, now) {
  const p = new Date(prev);
  const n = new Date(now);
  p.setHours(0, 0, 0, 0);
  n.setHours(0, 0, 0, 0);
  const diff = (n - p) / (1000 * 60 * 60 * 24);
  return diff >= 1 && diff < 2;
}

function isSameDay(a, b) {
  return new Date(a).toDateString() === new Date(b).toDateString();
}

export default function useDailyLogin() {
  const [data, setData] = useLocalStorage(STORAGE_KEY, {
    lastDate: null,
    streak: 0,
    claimed: false,
  });

  const today = new Date().toDateString();
  const [dismissed, setDismissed] = useState(false);

  const status = useMemo(() => {
    if (!data.lastDate) {
      return { canClaim: true, streak: 1, isNewUser: true };
    }
    if (isSameDay(data.lastDate, today)) {
      return { canClaim: !data.claimed, streak: data.streak, isNewUser: false };
    }
    const consecutive = isConsecutiveDay(data.lastDate, today);
    const newStreak = consecutive ? data.streak + 1 : 1;
    return { canClaim: true, streak: newStreak, isNewUser: false };
  }, [data, today]);

  const reward = getDailyReward(status.streak);

  const claim = useCallback(() => {
    const streak = status.streak;
    setData({
      lastDate: today,
      streak: streak > 7 ? 1 : streak,
      claimed: true,
    });
    return { coins: reward, streak };
  }, [status.streak, reward, today, setData]);

  const showPopup = status.canClaim && !dismissed;

  return {
    streak: status.streak,
    reward,
    canClaim: status.canClaim,
    claimed: data.claimed && isSameDay(data.lastDate, today),
    showPopup,
    dismiss: () => setDismissed(true),
    claim,
  };
}

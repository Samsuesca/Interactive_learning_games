import { useState, useCallback } from "react";

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const next = typeof value === "function" ? value(storedValue) : value;
        setStoredValue(next);
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* quota exceeded — silently ignore */
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
}

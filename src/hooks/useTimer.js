import { useState, useRef, useCallback, useEffect } from "react";

export default function useTimer(initialTime = 60) {
  const [time, setTime] = useState(initialTime);
  const [status, setStatus] = useState("idle"); // idle | running | done
  const ref = useRef(null);

  const start = useCallback(() => {
    setTime(initialTime);
    setStatus("running");
  }, [initialTime]);

  const stop = useCallback(() => {
    clearInterval(ref.current);
    setStatus("done");
  }, []);

  const reset = useCallback(() => {
    clearInterval(ref.current);
    setTime(initialTime);
    setStatus("idle");
  }, [initialTime]);

  useEffect(() => {
    if (status !== "running") return;
    ref.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(ref.current);
          setStatus("done");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, [status]);

  return { time, status, start, stop, reset };
}

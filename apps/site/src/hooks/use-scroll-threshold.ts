"use client";

import { useEffect, useState } from "react";

export function useScrollThreshold(threshold: number) {
  const [passedThreshold, setPassedThreshold] = useState(false);

  useEffect(() => {
    function updateState() {
      setPassedThreshold(window.scrollY > threshold);
    }

    updateState();
    window.addEventListener("scroll", updateState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateState);
    };
  }, [threshold]);

  return passedThreshold;
}
